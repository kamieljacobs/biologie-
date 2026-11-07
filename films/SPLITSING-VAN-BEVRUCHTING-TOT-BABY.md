# Splitsing 'Van bevruchting tot baby' in drie films (plan 7 nov 2026)

Kamiel (7 nov 2026): remake van Van bevruchting tot baby (`films/voortplanting/1-precies-op-tijd.html`, 18:55, alleen vwo). De film bevat uitspraak- en animatiefoutjes, is te groot en mag in kleinere stukken. De hele voortplantingslijn moet een logisch geheel worden. Kamiel ging akkoord met het voorstel hieronder en vroeg om prompts voor de vervolgchats.

## Waarom
- De titel belooft 'van bevruchting tot baby', maar de helft van de film gaat over wat vóór de bevruchting gebeurt (hormonen, cyclus).
- De groei van embryo tot baby ontbreekt juist.
- Overlap: H8 (SRY, Wolff/Müller) hoort bij Sekse, gender en diversiteit; H10–H11 (pil, morning-afterpil, abortuspil, hiv, ivf/ICSI) staan grotendeels al in Anticonceptie, soa's en voortplantingstechniek; hiv in T-helpercellen staat in de afweerfilm T-cellen en virussen.
- Alleen vwo: kleinere films kunnen een havo-basis met vwo-blokken krijgen.

## De lijn Voortplanting (volgorde in HOOFDSTUKKEN en in de klas)

| # | Film | Map | Inhoud | Uit de oude film |
|---|---|---|---|---|
| 1 | Celdeling (bestaat) | `celdeling/` | meiose | — |
| 2 | Geslachtsorganen en puberteit (bestaat) | `2-geslachtsorganen-puberteit/` | bouw, startsein | — |
| 3 | **De cyclus** (nieuw) | `cyclus/` | eiwit- vs steroïdhormoon; terugkoppeling bij de man (bodybuildervraag); follikelwedstrijd; LH-piek (positieve terugkoppeling); gele lichaam; menstruatie; grafiekvraag; kort: zo werkt de pil (terugkoppeling als toepassing) | H2, H3, H4, s45–s46 (pil, onttrekkingsbloeding) |
| 4 | **Bevruchting** (nieuw) | `bevruchting/` | de eicel die al bij oma wachtte (cold open); eicel tegenover zaadcel (cytoplasma, poollichaampjes); de tocht en capacitatie; zona pellucida, acrosoomreactie, corticale reactie; zygote; klieving tot blastocyste | cold open s01, H1, H5, s29–s30 (tot de blastocyste) |
| 5 | **Zwanger** (nieuw) | `zwanger/` | innesteling; hCG houdt het gele lichaam in leven; zwangerschapstest; placenta (dichtbij maar gescheiden, wat er wel/niet doorheen gaat); nieuw: embryo → foetus (tijdlijn in weken, vruchtvliezen en vruchtwater, navelstreng); geboorte met de oxytocinelus; eventueel borstvoeding (volgens het boek) | s30 (innesteling) –s33, H7, H9 |
| 6 | Anticonceptie, soa's en voortplantingstechniek (bestaat) | `3-anticonceptie-…/` | gericht aanvullen met wat nog ontbreekt: morning-afterpil (LH-piek uitstellen), abortuspil (mifepriston), hCG-injectie bij ivf, chlamydia → eileiders → buitenbaarmoederlijke zwangerschap | s47, s50–s54 waar het er nog niet in staat |
| 7 | Sekse, gender en diversiteit (bestaat) | `4-sekse-gender-diversiteit/` | gericht: buizen van Wolff/Müller, anti-Müllerhormoon, DHT als vwo-blok, als het er nog niet goed in staat | H8 |

Hiv in T-helpercellen (s48–s49) vervalt: staat in afweer film 3.

Open keuzes (standaard tenzij Kamiel anders zegt):
- Pil: kort in De cyclus (één alinea, als toepassing van terugkoppeling); de methodes blijven in film 6.
- Zwanger: inhoud volgens het boek (Nectar § 4.1 Nieuw leven, BvJ havo § 2.4 Zwanger); vraag Kamiel aan het begin van die chat welke onderdelen het boek heeft (vruchtvliezen, weken-tijdlijn, fasen van de bevalling, borstvoeding).

## Niveau: minder detail, minder termen (Kamiel 7 nov 2026)
Kamiel: de oude film was soms té moeilijk, door veel biologie op detailniveau en veel nieuwe termen. Dat moet minder. Per film:
- **Termenlijst eerst**: zet vóór het script alle vakbegrippen op een rij en geef per begrip aan of het in het boek staat (Nectar H4 / BvJ havo H2) of in de syllabus. Alleen die begrippen krijgen hun naam in de stem. Een begrip daarbuiten leg je uit zonder de naam te noemen, of het gaat naar een vwo-blok of naar het docentdeel. Mik op hooguit ± 8–10 nieuwe begrippen per film. Leg de lijst samen met de twijfelscènes aan Kamiel voor.
- **Eén nieuw begrip tegelijk**: niet twee nieuwe namen in één zin, en elk begrip eerst in beeld en in gewone woorden voordat de naam valt.
- **Mechanisme boven moleculair detail**: houd het verhaal (signaal → reactie → terugkoppeling) en laat moleculaire tussenstappen weg of zet ze in een vwo-blok. Kandidaten uit de oude film: de tweecellen-oestrogeensynthese met aromatase, inhibine, het membraanreceptor-signaal met kettingreactie en transporteiwitten, cholesterol bij capacitatie, corticale korrels en de calciumgolf, anti-Müllerhormoon en DHT, mifepriston. Controleer per kandidaat in het boek of het erin staat voordat je het schrapt.
- **Getallen spaarzaam**: alleen getallen die het verhaal dragen (bijv. ± 400 eisprongen in een leven), niet elke tussenstap.
- Bij twijfel kiest de eenvoudigere versie; wat afvalt kan in het docentdeel of in Les 2.

## Werkwijze per nieuwe film
- Soort: lichte remake (CLAUDE.md 'Gericht of remake'): het oude script (`films/voortplanting/1-precies-op-tijd/bron/script.md`) is het geraamte, kritisch nagelopen; nieuw beeld en nieuwe stem op de nieuwste prompt (`films/PROMPT_v13.md` of nieuwer), havo-basis + vwo-blokken, bronnenlogboek, frisse beeldreview. B15: uitzonderingsregel `lichte-remake` in `films/logboek/b15_uitzonderingen.jsonl` (reden: splitsing van Van bevruchting tot baby).
- Bouwvorm: FILMDATA-straat met de speler van `films/gedrag/5-emotieregulatie/bron/src/player.js`; voorbeeld lichte remake: `films/voortplanting/celdeling/bron/` en `2-geslachtsorganen-puberteit/bron/`.
- Fouten van de oude film: lees Kamiels reviewopmerkingen bij `films/voortplanting/1-precies-op-tijd.html` uit Firebase (adres staat in de prompt van de chat) en neem de punten mee die bij jouw film horen. Uitspraakfouten: approved uitspraak in `films/UITSPRAAK.md` + `films/uitspraak.json`, en het woord ook testen in de andere films waar het voorkomt (vaste regel).
- Bekende beeldfout: het hoofdkijkje over het gezicht (TODO.md) wordt een zoomcirkel naast het hoofd. Gezichten blijven heel.
- Personages: geen namen in stem of beeld; de oma-lijn (Linda, oma Ria, Noor) via `personages/LEVENSLOOP.md`.
- Hormoonkleuren gelijk aan Les 2 (`tools/docent/voortplanting-2/`, `HK()`): FSH groen, LH goud, oestrogeen koraal, progesteron paars, testosteron teal, hCG oker; navelstreng naar zuurstof (slagaders blauw, ader rood).
- Vragen: elke film ± 3 vragen; hergebruik de goede vragen van de oude film (q08, q15, q23, q28, q34, q42, q56) bij de film waar ze horen.
- Oefeningen (`oefenen.json`) en begrippen: de oude `1-precies-op-tijd/oefenen.json` en `glossary.json` verdelen over de nieuwe films.
- Parallel werken mag (drie mappen), maar gedeelde bestanden (`index.html`, `jaarplanner-dekking.json`, `sessie/reviewlijst.json`, `films/nieuwste.json`, UITSPRAAK-bestanden) pas aan het eind van een chat, direct na `git fetch` + rebase. ElevenLabs: wacht een geweigerde take af, nooit opnieuw genereren.
- De oude film blijft online tot alle drie de nieuwe films goedgekeurd zijn.

## Inpassen (laatste chat, na de drie films)
- Films 6 en 7 gericht aanvullen (zie tabel).
- `HOOFDSTUKKEN.voortplanting.films` in de volgorde van de tabel; oude film eruit (oude versie naar de git-geschiedenis volgens 'Gericht of remake').
- Les 2 Voortplanting (`tools/docent/voortplanting-2/`, hoort nu bij de oude film): `uitleg`-knoppen per nieuwe film naar het passende scherm; filmlinks in de les bijwerken.
- Oefentoets Voortplanting (`tools/toets-bron/voortplanting/`), jaarplanner (`jaarplanner.html`, Nijmegen én Groesbeek), `jaarplanner-dekking.json`, `planner/reeksen.json`, medaillons (`img/kunst/films/`), `scripts/reviewlijst.py`, `scripts/nieuwste_films.py`, `scripts/oefenen.py`, `scripts/controle.py`.

## Inpassen deel 1: films 6 en 7 aanvullen (voorstel 7 nov 2026, wacht op Kamiel)
Kamiel 7 nov 2026: de drie nieuwe films bestaan nog niet; daarom nu alleen films 6 en 7 gericht aanvullen. De rest van 'Inpassen' (lijn, Les 2, toets, planner, dekking, oude film eruit) wacht op de drie films. Soort: **gericht** (B15-uitzondering `gericht`), alleen de genoemde alinea's opnieuw inspreken of inplakken.

**Wat er al in staat:** film 6 heeft de morning-afterpil (stelt de eisprong uit, geen abortuspil) en chlamydia → littekens → eileider dicht → onvruchtbaar. Film 7 noemt testosteron en 'een hormoon waardoor de aanleg van baarmoeder en eileiders verdwijnt', zonder namen, en verwijst voor de rest naar de oude film.

**Film 6 · Anticonceptie, soa's en voortplantingstechniek**
- s05: alleen de verwijzing 'In de film Van bevruchting tot baby' → 'In de film De cyclus' (inplakken; chip in beeld idem). Zie vraag 3.
- nieuw s05b (havo + vwo, na s05): *De morning-afterpil voorkomt dus een zwangerschap. Een abortuspil beëindigt een zwangerschap die er al is, in de eerste weken. Het middel blokkeert het hormoon progesteron. Progesteron houdt het slijmvlies van de baarmoeder in stand. Zonder werkend progesteron laat het slijmvlies los, met het embryo erin. Een tweede middel laat de baarmoeder daarna samentrekken.* (naam mifepriston alleen in het docentdeel)
- s09, inplakken na 'kan onvruchtbaar worden.': *Of er komt nog net een zaadcel door, maar het veel grotere embryo blijft steken in de eileider. Dat heet een buitenbaarmoederlijke zwangerschap. Die is gevaarlijk en moet altijd behandeld worden.*
- s13, inplakken na 'en dus heb je meer eicellen.': *Zijn de follikels groot genoeg, dan krijgt de vrouw één prik met hCG. Dat hormoon lijkt op LH, en doet de LH-piek na: de eicellen rijpen af, maar komen nog niet vrij.*
- oefenen.json: q56 deel 2 uit de oude film (waarom is een zwangerschapstest vlak na de hCG-prik niet betrouwbaar?) als oefening.
- Nieuwe namen in de stem: abortuspil, buitenbaarmoederlijke zwangerschap (hCG, LH-piek en progesteron kennen ze dan uit De cyclus en Zwanger).

**Film 7 · Sekse, gender en diversiteit** (verwerkt ook Kamiels 4 reviewopmerkingen: waar gaat het over, lagen beïnvloeden elkaar, chromosomen twee keer slordig getekend)
- s04 helemaal opnieuw (havo + vwo), laag drie uitgebreid, begin en slot duidelijker:
  *Antwoord cee. Tot ongeveer week zes ziet de aanleg van de geslachtsorganen er bij elk embryo hetzelfde uit. Hoe groeit die aanleg uit tot het lichaam van een jongen of van een meisje? Dat gaat in lagen, en elke laag zet de volgende in gang. Laag een: de chromosomen. Van je moeder krijg je altijd een X-chromosoom. Van je vader een X of een Y: dat hangt af van de zaadcel die de eicel bevrucht. Zo ben je XX of XY. Laag twee: één gen. Op het Y-chromosoom ligt het SRY-gen. Rond week zeven gaat dat gen aan, en dan wordt de aanleg een zaadbal. Is er geen Y, en dus geen SRY, dan gaan andere genen aan en wordt de aanleg een eierstok. Laag drie: hormonen. Elk embryo heeft twee stelsels buisjes: één dat zaadleiders kan worden, en één dat eileiders en een baarmoeder kan worden. De jonge zaadballen maken testosteron. Daardoor groeien de zaadleiders uit. En ze maken een tweede hormoon, waardoor de aanleg van baarmoeder en eileiders verdwijnt. Zijn er geen zaadballen, dan ontbreken die hormonen. Dan verdwijnt de aanleg van de zaadleiders, en groeien eileiders en baarmoeder uit. Voor de buisjes van een jongen zijn dus twee signalen nodig. Voor die van een meisje is het ontbreken ervan genoeg. Laag vier: de geslachtsorganen, de primaire geslachtskenmerken. Van buiten: een penis en balzak, of een clitoris en schaamlippen. Ze groeien uit dezelfde aanleg. Daarom lijken ze bij een jong embryo zo op elkaar. Laag vijf komt pas jaren later: de puberteit. De hypothalamus en de hypofyse geven het startsein. De zaadballen maken dan meer testosteron, de eierstokken meer oestrogeen. Zo ontstaan de secundaire geslachtskenmerken, zoals borsten en bredere heupen, of een lage stem en baardgroei. Chromosoom, gen, klier, hormoon, geslachtsorgaan: elke laag hangt af van de laag ervoor.*
- nieuw s05b (vwo, na s05): *Die twee stelsels buisjes hebben een naam: de buizen van Wolff, en de buizen van Müller. Het tweede hormoon uit de zaadbal heet daarom anti-Müllerhormoon: het laat de buizen van Müller verdwijnen. Testosteron houdt de buizen van Wolff in stand. Die worden bijbal, zaadleider en zaadblaasjes. Voor de penis en de balzak is nog één stap nodig. In de aanleg wordt testosteron omgezet in een sterkere vorm: dihydrotestosteron, kortweg DHT. Zonder DHT blijven de uitwendige geslachtsorganen meer op die van een meisje lijken.* (Sertoli- en Leydigcellen niet bij naam.)
- beeld: twee stelsels buisjes uit `lib_bio` (aanleg geslachtsorganen, uit de oude film); chromosomen bij t ± 49 en ± 138 netjes (zusterchromatiden gelijk dik); docentdeel regel 135 (verwijzing naar de oude film) herschrijven.
- vraag q42 uit de oude film (XY, testosteronreceptor werkt niet: zaadballen? baarmoeder? zaadleiders?) als vwo-vraag na s05b of als oefening, zie vraag 4.

**Vragen aan Kamiel**
1. Staan de buizen van Wolff en Müller in het boek? Voorstel: havo zonder namen (s04), vwo met namen (s05b).
2. Abortuspil in film 6 voor iedereen (havo + vwo), zakelijk, zonder de naam mifepriston?
3. Verwijzing in film 6 nu al naar 'De cyclus' (die film bestaat nog niet) of pas bij Inpassen deel 2?
4. q42 in film 7 als vwo-vraag, of alleen als oefening?

**Extra film 'Wie ben je? Gender en oriëntatie'** (Kamiel 7 nov 2026: 'ja lijkt me goed'): niet in film 7 zelf (die blijft klein), maar als extra film buiten het PTA (`HOOFDSTUKKEN.extra.komt`, thema voortplanting). Opzet: wanneer genderidentiteit ontstaat (± 2–3 jaar); hoe onderzoekers het bestuderen en wat wel/niet bekend is (tweelingonderzoek, meisjes met AGS, hersenonderzoek); seksuele oriëntatie als apart spoor; begrippen die leerlingen verwarren (intersekse, transgender, non-binair). Zakelijk en beschrijvend; geen standpunt over beleids- en behandelvragen (puberteitsremmers e.d.), hooguit feitelijk dat er verschillende standpunten zijn, in het docentdeel. Film 7 krijgt later één verwijszin. Eigen chat; fase 1 klaar 7 nov 2026 (zie Stand).

Kosten: ± 2.700 credits TTS (s04 van film 7 helemaal, twee nieuwe alinea's, drie stukjes inplakken), woordtijden met silalign.

## Stand
| Film | Stand |
|---|---|
| De cyclus | gebouwd 7 nov 2026 (versie 1.0): `voortplanting/cyclus/index.html` met bronmap; 7:34 vwo / 7:09 havo met vragen; 4 vragen, 1 vwo-blok; ± 5.550 credits stem. **Wacht op Kamiels review**; sinds 7 nov 2026 (Kamiel: 'als ze af zijn moeten ze erbij') in `HOOFDSTUKKEN` als film 3, oude film blijft tot Zwanger af is. Open: uitspraakwachtlijst (`bron/uitspraak.md`), één `?` in het bronnenlogboek, oefeningen volgorde-cyclus, uitleg-bodybuilder en uitleg-pil verhuisd (zonder inhibine, Leydig en Sertoli) |
| Bevruchting | gebouwd 7 nov 2026 (versie 1.0): `voortplanting/bevruchting/index.html` met bronmap; 6:53 vwo / 6:01 havo met vragen; 4 vragen (q07, q13 nieuw: vruchtbare dagen, q18 vwo, q25 nieuw: klieving), 1 vwo-blok; 8 nieuwe namen (geen blastocyste/capacitatie/corticale reactie in de stem, Kamiels keuze T1–T4); nieuwe tekeningen `bvMantel` en `bvKlieving` (kandidaten bibliotheek); ± 5.360 credits stem + 309 transcriptie. **Wacht op Kamiels review**; sinds 7 nov 2026 in `HOOFDSTUKKEN` als film 4 (lijst in de volgorde van de tabel; Anticonceptie = film 6, Sekse = film 7). Open: uitspraakwachtlijst (zona pellucida, acrosoom, klievingsdelingen; blind goed terug), één `?` in het bronnenlogboek ('de helft de verkeerde eileider'), oefeningen nieuw geschreven (volgorde-bevruchting, twee uitlegopdrachten); schema-eicel van de oude film niet overgenomen |
| Zwanger | concept klaar (7 nov 2026): termenlijst, script en storyboard in `voortplanting/zwanger/bron/concept.md`; boek heeft alle vier (vruchtvliezen, tijdlijn, fasen bevalling, borstvoeding); geen Firebase-opmerkingen bij de oude film. **Wacht op Kamiels keuring van 5 twijfelscènes**, daarna stem en beeld |
| Extra film Wie ben je? Gender en oriëntatie | fase 1 klaar (7 nov 2026): bronnenlogboek (27 bronnen, ook uit de tweede chat), B15 (dossier wint nipt 55–52; keuzes door Claude op Kamiels verzoek), script v1 (± 910 woorden) in `extra/wie-ben-je-gender-en-orientatie/bron/`. Wacht op: `twijfel.md` en `variant-d.md` van de tweede chat (niet gepusht), Kamiels oordeel over T1/T3/T5/T6, derde hersenreview. Daarna stem, bouw, site, verwijszin film 4 |
| Inpassen deel 1 (films 6 en 7) | voorstel 7 nov 2026, wacht op Kamiels antwoorden |
| Inpassen deel 2 (lijn, Les 2, toets, planner, oude film eruit) | wacht op de drie films |
