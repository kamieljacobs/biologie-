# Verrassend simpel — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/archief-evolutie/2-verrassend-simpel.html |
| Reeks / nummer | Evolutie, deel 2 van 9 (eyebrow "Biologie · Evolutie · deel 2") |
| Doelgroep / niveau | 5/6 vwo (badge op de pagina); één niveau, geen havo/vwo-schakelaar of vwo-blokken |
| Versie / datum | versie 0.1 · 4 oktober 2026 (footer) |
| Stem / model | Roos (ElevenLabs, eleven_multilingual_v2) |
| Duur | 6:52 (411,82 s; blob 001.mp3, gelijk aan `TL.total` = 411.82) |
| Beeldstijl | ouder eigen ontwerp, vóór Part C: canvas 1920×1080, donkerblauwe ondergrond (#0F1B2D), Literata + Public Sans, amber als accentkleur, platte vereenvoudigde tekeningen; het eiland Daphne Major met 120 getekende vinken (1 getekende vink = ongeveer 10 echte), histogrammen van snaveldiepte en een grafiek van het gemiddelde, allemaal berekend uit een deterministische simulatie (`SIM`, seed 20261004) |
| Audio-opslag | één doorlopende take: 1 mp3 (blob 001.mp3, als base64 data-URI in `au.src`) met 18 gesproken stukken ("takes") en de stiltes voor titel-, hoofdstuk- en eindkaarten en vragen al ingebakken |
| Reconstructie | 2026-10-12, uit de gepubliceerde HTML |

## Opbouw
Hoofdstukken zoals in `CH` (de knoppen onder de speler). Hoofdstuktype volgens het docentdeel: F (populaties en evolutie) met G (de Grants als historisch experiment).

| Begin | Hoofdstuk | Takes | Vraag | Kernbeeld |
|---|---|---|---|---|
| 0:00 | Daphne Major, 1977 (cold open) | d1_cold, d2_intro | – | Daphne Major 1977: 120 getekende vinken, teller 1200 naar 180, de zaden raken op, "Wat hebben de overlevers gemeen?"; daarna de Grants die vanaf 1973 snaveldiepte meten |
| 0:39 | Variatie | d3_variatie | – | histogram van snaveldiepte: de meeste rond het gemiddelde, een paar klein, een paar groot |
| 1:01 | Waar komt variatie vandaan? | d4_mutatie, d5_recombinatie | – | mutatie als kopieerfout (droog en nat jaar dezelfde nieuwe varianten); recombinatie: ouders, jongen met nieuwe combinaties |
| 1:45 | Overproductie | d6_overproductie | – | groeicurve "als alle jongen overleven" tegenover wat het eiland kan voeden; Malthus 1798 |
| 2:06 | Selectie | d7_droogte, d8_selectie | q1 | Tribulus: alleen een diepe snavel kraakt ze; vraag 1; droogte 1977 in de simulatie, het gemiddelde schuift omhoog |
| 2:58 | Erfelijkheid | d9_erfelijk, d10_gemeten | q2 | ouders en jongen; vraag 2; de jongen van 1978, opgeschoven mét variatie, "GEMETEN" |
| 3:43 | De vier ingrediënten | d11_vier, d12_fitness | – | de vier ingrediënten: "Meer is het niet. Natuurlijke selectie"; fitness = nakomelingen die zelf overleven (kleine tamme vink fitness 4, grote sterke vink 0) |
| 4:25 | Geen richting | d13_elnino, d14_omkeer | q3 | El Niño 1983, overal kleine zachte zaden; vraag 3; grafiek van de gemiddelde snaveldiepte die omkeert |
| 5:09 | Terug naar Darwin en Wallace | d15_duiven, d16_eilanden | – | duivenfokker kiest de langste staart; twee eilanden (harde zaden, insecten) drijven uiteen, notenkraker en pincet |
| 5:52 | Wat het niet is | d17_misvattingen, d18_slot | – | drie misvattingen met "Nee."; slot: één seizoen, "4 miljard jaar?", vermelding Hardy-Weinberg voor vwo |

Kaarten (tekst in `CARDS`): title = "Verrassend simpel" / "Evolutie · deel 2"; card1 = "1 · Variatie" / "Wat je kunt meten"; card2 = "2 · Waar komt variatie vandaan?" / "Mutatie en recombinatie"; card3 = "3 · Overproductie" / "Meer jongen dan zaden"; card4 = "4 · Selectie" / "Daphne Major, 1977"; card5 = "5 · Erfelijkheid" / "De jongen van 1978"; card6 = "6 · De vier ingrediënten" / "Natuurlijke selectie"; card7 = "7 · Geen richting" / "El Niño, 1983"; card8 = "8 · Terug naar Darwin en Wallace" / "Kunstmatige selectie en de eilanden"; card9 = "9 · Wat het niet is" / "Drie misvattingen"; end = "Wordt vervolgd" / "Deel 3 · Hoe weten we dat?" / "Fossielen, DNA en vier miljard jaar".

## Vragen
Alle vragen zijn voorspelvragen die de film onderbreken (segment `q`, 11,5 s stilte in de audio). Er zijn geen aparte controlevragen. Niveau: allemaal 5/6 vwo.

**q1** · 2:24.5 · hoofdstuk "Selectie" · na take d7_droogte  
Droogte: alleen grote, harde zaden zijn over. Welke vinken overleven het vaakst?  
- A. De sterkste en snelste vinken. — feedback: "Kracht helpt niet bij een zaad dat je snavel niet open krijgt. Kijk naar de simulatie."
- B. De vinken met de diepste snavels. **(juist)** — feedback: "Klopt. Alleen een diepe snavel kraakt de harde zaden. Kracht of snelheid helpt hier niet."
- C. Dat is toeval: elke vink heeft evenveel kans. — feedback: "Er zit toeval in, maar de kans hangt sterk af van de snavel. Kijk naar de simulatie."

**q2** · 3:11.8 · hoofdstuk "Erfelijkheid" · na take d9_erfelijk  
Snaveldiepte is erfelijk. Hoe zien de snavels van de jongen van 1978 eruit?  
- A. Alle jongen hebben nu grote snavels; de kleine zijn weg. — feedback: "Recombinatie en mutaties houden variatie in stand. Het gemiddelde schuift, de spreiding blijft."
- B. Net als vóór de droogte: het effect verdwijnt weer. — feedback: "De kleine snavels hebben geen jongen gekregen. Hun varianten zijn zeldzamer geworden."
- C. De hele verdeling is een stukje opgeschoven naar groter, mét variatie. **(juist)** — feedback: "Klopt. De jongen lijken op hun ouders, maar verschillen onderling nog steeds."

**q3** · 4:40.5 · hoofdstuk "Geen richting" · na take d13_elnino  
Na het natte El Niño-jaar zijn kleine, zachte zaden overal. Wat verwacht je?  
- A. De selectie keert om: kleinere snavels zijn nu in het voordeel. **(juist)** — feedback: "Klopt. Kleine zaden eet je sneller met een kleine snavel. De richting van de selectie hangt af van de omgeving."
- B. De snavels worden nog groter: evolutie gaat door in dezelfde richting. — feedback: "Evolutie heeft geen richting van zichzelf. Een grote snavel is nu juist een nadeel."
- C. Er verandert niets: de populatie is al aangepast. — feedback: ""Aangepast" is altijd aangepast aan iets. Verandert dat iets, dan verandert de selectie."

## Begrippen
Begrippenlijst op de pagina (toegevoegd 16 okt 2026, sectie "Begrippen" tussen Hoofdstukken en Kleuren in deze reeks; gekozen uit wat de film zelf behandelt, definities op havo-niveau in de woorden van de film):

- **populatie**: Alle individuen van één soort die in hetzelfde gebied leven en zich onderling voortplanten, zoals de grondvinken op Daphne Major.
- **variatie**: In een populatie is geen individu precies hetzelfde: metingen, zoals de snaveldiepte, vormen een verdeling rond een gemiddelde.
- **mutatie**: Toevallige kopieerfout in het DNA. Een mutatie ontstaat niet omdat een dier haar nodig heeft. Mutaties leveren nieuwe varianten.
- **recombinatie**: Bij het maken van geslachtscellen worden de varianten van vader en moeder opnieuw gecombineerd, zodat elk jong een nieuwe combinatie heeft.
- **erfelijkheid**: Erfelijke verschillen gaan over op de nakomelingen: jongen lijken op hun ouders.
- **overproductie**: Er worden meer jongen geboren dan er kunnen overleven, omdat er bijvoorbeeld maar zoveel voedsel is (de gedachte van Malthus).
- **natuurlijke selectie**: Variatie, erfelijkheid, overproductie en verschil in overleving en voortplanting: de omgeving bepaalt welke varianten de meeste nakomelingen krijgen.
- **fitness**: Het aantal nakomelingen dat een individu krijgt dat zelf weer overleeft. Niet: kracht of conditie.
- **evolutie**: De erfelijke eigenschappen van een populatie veranderen van generatie op generatie. Populaties evolueren, individuen niet.
- **kunstmatige selectie**: De mens kiest welke dieren of planten nakomelingen krijgen, zoals een duivenfokker. Het mechanisme is hetzelfde als bij natuurlijke selectie.

Vóór 16 okt 2026 geen begrippenlijst op de pagina (onbekend, niet in de HTML). Wel een legenda "Kleuren in deze reeks":

- #F0B64A: de populatie, het gemiddelde, de selectiedruk
- #86CF86: jongen, nieuwe generatie
- #E57C5B: sterft, of: een mutatie (nieuwe variant)
- #B8E0A0: kleine, zachte zaden
- #C9A96E: grote, harde zaden (Tribulus)
- #6FB7E8: regen, El Niño

## Docentdeel
Uitklapblokken onder "Voor de docent". **Hoe deze film uitlegt** (letterlijk overgenomen):

- Hoofdstuktype F (populaties en evolutie) met type G (de Grants als historisch experiment). De as is tijd, in jaren en generaties, op één eiland. Het hart is een echte, deterministische simulatie: 120 getekende vinken (1 getekende vink = ongeveer 10 echte) met erfelijke snaveldiepte, zaden met een hardheid, en seizoenen waarin elke vink zaden probeert te kraken. De droogte van 1977 en het natte jaar 1983 zijn gescripte verstoringen; wie overleeft, hoe de verdeling verschuift, hoe de jongen van 1978 eruitzien en hoe de twee eilanden uiteendrijven komt uit de simulatie, niet uit een tekening. De histogrammen en de grafiek van het gemiddelde zijn uit de simulatie berekend.
- Misvattingen die aan bod komen: individuen passen zich aan (vraag 2 optie A, hoofdstuk 9); de sterkste overleeft (vraag 1 optie A, fitness); evolutie heeft een richting of doel (vraag 3 optie B, hoofdstuk 7); mutaties ontstaan omdat ze nodig zijn (hoofdstuk 2, droog versus nat jaar).
- Niet in deze film, wel verwezen: Hardy-Weinberg (vwo-examenstof, eigen aflevering), genetische drift, seksuele selectie, soortvorming.

**Getallen en bronnen** (overgenomen):

| Wat | In de film | Werkelijk | Bron / opmerking |
|---|---|---|---|
| Populatie 1977 | ongeveer 1200 → minder dan 200 | G. fortis op Daphne Major: ongeveer 1200 begin 1977 naar ongeveer 180 eind 1977 | Boag & Grant 1981, Science; afgerond |
| Snaveldiepte | gemiddeld ongeveer 9,4 mm; overlevers dieper; jongen 1978 dieper | overlevers gemiddeld ruim 0,5 mm dieper dan de populatie ervoor; jongen van 1978 gemiddeld dieper dan de jongen van 1976 | Boag & Grant 1981; exacte waarden niet gecontroleerd vanuit deze sessie |
| Simulatie | 120 vinken, 9 % overleeft de droogte, gemiddelde 9,4 → 10,7 mm | sterker dan de echte verschuiving (model met weinig individuen) | gelabeld "simulatie" in beeld |
| Start veldwerk Grants | 1973 | 1973 | Grant & Grant, *40 Years of Evolution* (2014) |
| El Niño | 1983, maandenlange regen | 1982–83; daarna selectie richting kleinere snavels in 1984–85 | Gibbs & Grant 1987, Nature |
| Legsels | 3–4 eieren, meerdere legsels per jaar | 2–5 eieren; in natte jaren meerdere legsels | Grant & Grant; afgerond |
| Tribulus | grote, harde zaden | Tribulus cistoides, vruchten met harde omhulsels | idem |
| Malthus | 1798, Darwin las het in 1838 | Essay on the Principle of Population 1798; Darwin las het in september 1838 | Darwin, Autobiography |

**Timing en uitspraak (QA)**: "Woordtijden zijn in deze versie geschat uit pauzedetectie en zinslengte, niet uit de timestamps van de stem. De ondertitels lopen per zinsdeel; de cues per woord kunnen enkele tienden van seconden afwijken. Bij de volledige bouw gebruiken we woordtimestamps." Daaronder een tabel die bij het laden uit `RISK` wordt gevuld (risicowoord, invoer voor de stem, tijd):

| Risicowoord | Invoer voor de stem | Take |
|---|---|---|
| Daphne Major | Daphne Major (Engels) | d1_cold |
| Galápagos | Galápagos | d1_cold |
| Peter en Rosemary Grant | Rosemary Grant (Engels) | d2_intro |
| DNA | DNA | d4_mutatie |
| recombinatie | recombinatie | d5_recombinatie |
| Malthus | Maltus | d6_overproductie |
| Tribulus | Tribulus | d7_droogte |
| fitness | fitness | d12_fitness |
| El Niño | El Ninjo | d13_elnino |
| Hardy-Weinberg | Hardy-Wainberg | d18_slot |

Footer: "Stem: Roos (ElevenLabs, eleven_multilingual_v2). Aflevering 2, versie 0.1 · 4 oktober 2026. Vinken en eiland zijn vereenvoudigde tekeningen; de simulatie is deterministisch (vaste seed) en aan de audiotijd gekoppeld."

## Techniek: waar zit wat in de HTML
Regelnummers gelden voor `film.src.html` (uitgepakt met `scripts/filmbron.py`, 707 regels); in de gepubliceerde HTML zijn ze gelijk, omdat de blob op één regel staat.

- **Tijdlijn en tekst**: `const TL = {…}` (r. 185, één lange JSON-regel). `TL.total` = 411.82 s. `TL.takes.<id>` heeft `start`/`end` (absolute seconden in de mp3), `phrases` (ondertitels: `text`, `start`, `end`) en `words` (per woord `w`, `start`, `end`). `TL.segments` is de volgorde van 37 segmenten met `kind`: `sil` (stilte), `take` (gesproken), `card` (titel-/hoofdstuk-/eindkaart, 3,5 s; titel 4,5 s, eind 5 s) en `q` (vraag, 11,5 s).
- **Ondertitels**: `caption(t)` (r. 652) zoekt in alle `phrases` de frase met `start-0.05 ≤ t < end+0.15`. De ondertitels zijn dus precies de `phrases`-teksten.
- **Cues voor animatie**: `cue(takeId, woord, n)` (r. 209) geeft de begintijd van het n-de voorkomen van een woord in die take; alle cues staan in `const C = {…}` (r. 211). Scènes gebruiken `C.x`, `seg(id).start/end` en `ramp`/`ease` om in te faden. Alle animatie is dus aan de audiotijd (`au.currentTime`) gekoppeld; er is geen eigen klok.
- **Woordtijden zijn geschat** (docentdeel QA): uit pauzedetectie en zinslengte, niet uit timestamps van ElevenLabs. Ze kunnen enkele tienden van seconden afwijken.
- **Scènes**: `render(t)` (r. 364) kiest via `segAt(t)` het segment: kaart → `card()` met tekst uit `CARDS` (r. 327); vraag → de eindstand van de voorafgaande take, gedimd (r. 368); take → `SCENE[takeId](t)` (scènes vanaf r. 360).
- **Simulaties** (vooraf berekend bij het laden, vaste seed): r. 274: `SIM`.
- **Takes per scènefunctie**:
  - `d1_cold` → r. 373
  - `d2_intro` → r. 392
  - `d3_variatie` → r. 402
  - `d4_mutatie` → r. 418
  - `d5_recombinatie` → r. 436
  - `d6_overproductie` → r. 450
  - `d7_droogte` → r. 469
  - `d8_selectie` → r. 489
  - `d9_erfelijk` → r. 509
  - `d10_gemeten` → r. 521
  - `d11_vier` → r. 534
  - `d12_fitness` → r. 542
  - `d13_elnino` → r. 553
  - `d14_omkeer` → r. 568
  - `d15_duiven` → r. 584
  - `d16_eilanden` → r. 595
  - `d17_misvattingen` → r. 612
  - `d18_slot` → r. 623
- **Vragen**: `QDEFS` (r. 191): `text`, `options[{k,text}]`, `correct`, `explain{k: tekst}`. Speler-logica: `QSEGS` (r. 641): aftellen van `start+1` tot `start+9` s, daarna onthulling. `gate(t)` (r. 672) pauzeert de audio op `cdEnd` tot er een antwoord is (Leerling) of tot de docent op Verder drukt (Klas), tenzij "automatisch door" aan staat. `questionUI(t)` (r. 658) tekent de opties en de feedback.
- **Audio**: `<audio id="au">`; r. 637: `au.src="data:audio/mpeg;base64,@@BLOB:001.mp3@@"`. Eén bestand; er is geen koppeling per segment, alleen de absolute tijden in `TL`.
- **Pagina-onderdelen**: hoofdstukken `CH` (r. 690), transcript `TRN` + `QAFTER` (r. 694–695; de transcripttekst wordt uit `phrases` opgebouwd), uitspraaktabel `RISK` (r. 697), docentdeel als HTML (r. 153–180), seekbalk `max` en de tijd "0:00 / …" hard in de HTML (r. 120).
- **Speler**: Leerling/Klas (`?modus=klas` in de URL zet Klas), "automatisch door", CC (C), volledig scherm (F), spatie, pijltjes ±5 s. Geen Havo/Vwo-schakelaar en geen toetsfunctie.

## Zo pas je deze film aan
1. **Tekst op het scherm**: staat als letterlijke strings in de `SCENE.<take>`-functies (zie de lijst hierboven), hoofdstuk- en eindkaarten in `CARDS`. Een wijziging daar raakt de audio niet.
2. **Ondertitel zonder audiowijziging** (bijv. tikfout): pas `text` in de juiste `phrases` aan. De transcript-tekst wordt daaruit opgebouwd. Laat `words` gelijk lopen (de `cue()`-functie zoekt daarin), anders vallen animaties terug op het begin van de take (console: "cue missing").
3. **Een zin opnieuw opnemen**: er is maar één mp3. Knip het nieuwe fragment in 001.mp3 op de plek van de oude take (de take loopt van `TL.takes.<id>.start` tot `.end`). Is de nieuwe opname even lang, dan hoef je alleen `phrases` en `words` binnen die take bij te werken. Is ze langer of korter, dan schuiven alle latere `start`/`end` in `takes`, `phrases`, `words` en `segments` met het verschil mee, en ook `TL.total`, de seekbalk (`max` en de vaste tekst "0:00 / …" in r. 120) en de tijden in het docentdeel. Daarna `python3 scripts/filmbron.py inpakken`.
4. **Een vraag aanpassen**: alleen `QDEFS` wijzigen (tekst, opties, `correct`, `explain`). De pauze in de audio (11,5 s) blijft gelijk. Een vraag erbij of eraf betekent stilte in de mp3 toevoegen of weghalen plus een `q`-segment, en `QAFTER`, `CH`-tags en de `sceneBehindQ`/`back`-koppeling aanpassen.
5. **Let op**: kaarten en vragen zijn stiltes ín de mp3, geen pauzes van de speler. Een kaart langer maken = stilte bijvoegen in de audio en alle latere tijden verschuiven. De `C`-cues rekenen zichzelf opnieuw uit, maar de scènes gebruiken ook vaste offsets na een cue (bijv. `C.x+2.0`).

## Aandachtspunten
- Gemaakt vóór Prompt v4/Part C: geen Micro/Macro/Schema-stijlkaart, geen begrippenlijst (toegevoegd 16 okt 2026), geen havo/vwo-blokken, terwijl de reeks volgens de afspraken ook voor havo bedoeld is. De badge zegt alleen "5/6 vwo".
- Woordtijden zijn geschat; het docentdeel zegt zelf "Bij de volledige bouw gebruiken we woordtimestamps". Dat is nog niet gebeurd.
- Deze film heeft drie voorspelvragen, de andere delen 1, 3, 4 en 5 hebben er vier.
- Het docentdeel zegt bij de snaveldiepte zelf: "exacte waarden niet gecontroleerd vanuit deze sessie". De simulatie geeft een sterkere verschuiving (9,4 naar 10,7 mm, 9 % overleeft) dan in werkelijkheid; in beeld staat wel het label "simulatie".
- Hardy-Weinberg wordt in d18_slot als vwo-examenstof genoemd ("En voor vwo: …"); verder geen havo/vwo-splitsing in de film.
- Controle: 18 takes, 3 vragen, 11 kaarten; som van alle segmenten = 411,781 s, mp3 = 411,820 s (verschil 0,039 s, staart van de eindkaart). De stiltes in de mp3 (silencedetect) vallen op de kaart- en vraagsegmenten. Alle `cue()`-aanroepen met een vast woord vinden hun woord.

## Wijzigingen
- 15 okt 2026 — Speler: de knop Vragen aan/uit (onthouden in `bk-vragen`, ook `?vragen=uit`) werkt nu altijd, ook na spoelen, in pauze en als je hem halverwege omzet. Bij Vragen uit vallen weg: de vraag zelf, de gesproken vraagzin(nen) ervoor (zinnen op '?', 'Wat denk je?', 'Denk even na.', 'Eerst een voorspelling.') en een los antwoord direct erna ('Antwoord B.', 'Ja.', 'Nee.', 'Precies.'); gewone uitlegzinnen blijven staan. De tijdbalk, tijd en hoofdstuktijden tonen de ingekorte duur. Code: `bkBouw()` maakt `BK.k` (stukken die de speler overslaat); regelnummers in de spelercode zijn daardoor een paar regels verschoven. Hoofdstukkaarten (card1, card2, …) duren 2,2 s in plaats van 3,5 s: de speler slaat het stille midden van de kaart over (in- en uitfaden blijven; de mp3 is niet veranderd). Korte inhoudelijke antwoorden zoals 'Analoog.' of 'Twee.' blijven staan.

## Wijziging 16 okt 2026: begrippenlijst
Nieuw blok `<section>` met `<h2 class="gl-kop">Begrippen</h2>` en `<div id="glossary">` (kaartjes `<div class="term"><b>begrip</b><p>uitleg</p></div>`, vwo-begrippen met `class="term vwo"` en `<i>vwo</i>`), vlak vóór "Kleuren in deze reeks"; opmaak in `<style id="glossary-stijl">` vlak voor `</head>` (licht: wit kaartje met `--line`, donker: zoals de hoofdengine). De kop "Begrippen" is een `<h2 class="gl-kop">` met dezelfde opmaak als op de voorbeeldpagina (Fraunces 700, 30px, regelhoogte 1,5, marge 0 0 12px; het lettertype zit als `@font-face` 'Fraunces Begrippen' in `#glossary-stijl`, kleur = tekstkleur van deze pagina). Begrip toevoegen of wijzigen: pas het kaartje in `#glossary` aan en de lijst hierboven. Regelnummers elders in dit bestand zijn enkele tientallen regels verschoven.
