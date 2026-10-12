# Hoe weten we dat? — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/evolutie/3-hoe-weten-we-dat.html |
| Reeks / nummer | Evolutie, deel 3 van 9 (eyebrow "Biologie · Evolutie · deel 3") |
| Doelgroep / niveau | 5/6 vwo (badge op de pagina); één niveau, geen havo/vwo-schakelaar of vwo-blokken |
| Versie / datum | versie 0.1 · 4 oktober 2026 (footer) |
| Stem / model | Roos (ElevenLabs, eleven_multilingual_v2) |
| Duur | 6:22 (381,86 s; blob 001.mp3, gelijk aan `TL.total` = 381.86) |
| Beeldstijl | ouder eigen ontwerp, vóór Part C: canvas 1920×1080, donkerblauwe ondergrond (#0F1B2D), Literata + Public Sans, amber als accentkleur, platte vereenvoudigde tekeningen; één dier, de walvis, als rode draad; een sedimentatiesimulatie (lagen stapelen), skeletten met gekleurde botten (homologie), een DNA-vergelijking (`DNACMP`, seed 7), een moleculaire-klok-simulatie (`CLOCK`, twee lijnen van 100 letters, vier herhalingen) en een cladogram dat uit drie kenmerken opbouwt |
| Audio-opslag | één doorlopende take: 1 mp3 (blob 001.mp3, als base64 data-URI in `au.src`) met 16 gesproken stukken ("takes") en de stiltes voor titel-, hoofdstuk- en eindkaarten en vragen al ingebakken |
| Reconstructie | 2026-10-12, uit de gepubliceerde HTML |

## Opbouw
Hoofdstukken zoals in `CH` (de knoppen onder de speler). Hoofdstuktype volgens het docentdeel: G (redeneren: voorspelling, waarneming, conclusie) met een stuk H.

| Begin | Hoofdstuk | Takes | Vraag | Kernbeeld |
|---|---|---|---|---|
| 0:00 | De walvis (cold open) | e1_cold | – | een zoogdier van 30 meter in zee; Darwin 1859: "van landdieren"; "Hoe bewijs je dat, zonder tijdmachine?" |
| 0:20 | Drie sporen | e2_intro | – | voorspellingen: sporen in de grond, in het lichaam, in het DNA |
| 0:39 | Lagen en fossielen | e3_lagen, e4_kantel, e5_reeks | q1 | sedimentatiesimulatie, relatieve en absolute datering ("GEMETEN"); gekantelde lagen en vraag 1; fossielenreeks Pakicetus, Ambulocetus, Rodhocetus, Basilosaurus |
| 2:02 | Hetzelfde skelet | e6_homoloog, e7_haai, e8_analoog | q2 | walvisvin, mensenarm en hondenpoot (homoloog); haaienvin en vraag 2; analoog; bekkenbotjes (rudimentair); walvisembryo met achterpootknoppen |
| 3:11 | In het DNA | e9_dna, e10_nijlpaard | q3 | DNA-vergelijking: meer tijd, meer verschillen; vraag 3; walvis en nijlpaard, hetzelfde ingevoegde stukje op dezelfde plek |
| 3:59 | De moleculaire klok | e11_klok, e12_vraag, e13_klopt | q4 | klok-simulatie (lijn A en B); vraag 4; klok en fossielen geven allebei ongeveer 50 miljoen jaar, "BEWIJS" |
| 4:57 | Stambomen | e14_stamboom | – | cladogram: elk nieuw kenmerk is een vertakking; lees aan de vertakkingen, niet aan de volgorde van de namen |
| 5:26 | Uitzoomen | e15_uitzoomen, e16_slot | – | uitzoomen van walvis naar al het leven: hetzelfde DNA, dezelfde code, dezelfde 20 aminozuren; slot met de vraag naar de eerste voorouder (deel 4) |

Kaarten (tekst in `CARDS`): title = "Hoe weten we dat?" / "Evolutie · deel 3"; card1 = "1 · Lagen en fossielen" / "In de grond"; card2 = "2 · Hetzelfde skelet" / "In het lichaam"; card3 = "3 · In het DNA" / "Wie is familie?"; card4 = "4 · De moleculaire klok" / "Mutaties tellen"; card5 = "5 · Stambomen" / "Een cladogram lezen"; card6 = "6 · Uitzoomen" / "Van walvis tot al het leven"; end = "Wordt vervolgd" / "Deel 4 · Hoe ontstaat leven uit niet-leven?".

## Vragen
Alle vragen zijn voorspelvragen die de film onderbreken (segment `q`, 11,5 s stilte in de audio). Er zijn geen aparte controlevragen. Niveau: allemaal 5/6 vwo.

**q1** · 1:12.7 · hoofdstuk "Lagen en fossielen" · na take e4_kantel  
De lagen zijn na het afzetten gekanteld. Welke laag is het oudst?  
- A. De laag die nu het diepst ligt: dieper is altijd ouder. — feedback: ""Dieper is ouder" geldt voor de stapel zoals hij is afgezet. Na kanteling ligt de oudste laag opzij."
- B. De laag die het eerst is afgezet: hier de linker, want de stapel is gekanteld. **(juist)** — feedback: "Klopt. Je leest de volgorde van afzetting; de kanteling zet je in gedachten terug."
- C. Dat kun je na kanteling niet meer weten. — feedback: "Het kan wel: de lagen liggen nog in hun oorspronkelijke volgorde, alleen gedraaid."

**q2** · 2:32.5 · hoofdstuk "Hetzelfde skelet" · na take e7_haai  
Walvisvin en haaienvin: zelfde functie, van buiten gelijk, van binnen botten tegenover kraakbeenstralen. Homoloog of analoog?  
- A. Homoloog: ze hebben dezelfde functie. — feedback: "Functie zegt niets over verwantschap. Kijk naar de bouw."
- B. Homoloog: ze lijken van buiten op elkaar. — feedback: "Uiterlijk zegt niets over verwantschap. Kijk naar de bouw van binnen."
- C. Analoog: dezelfde functie, een andere bouw. **(juist)** — feedback: "Klopt. Zelfde functie door dezelfde eisen van het zwemmen, niet door een gezamenlijke voorouder met zo'n vin."

**q3** · 3:30.8 · hoofdstuk "In het DNA" · na take e9_dna  
Welk dier is op grond van DNA het naaste familielid van de walvis?  
- A. De zeehond: ook een zoogdier dat in zee leeft. — feedback: "Uiterlijk en leefwijze zeggen niets over verwantschap. De zeehond is een roofdier, verwant aan honden en beren."
- B. Het nijlpaard. **(juist)** — feedback: "Klopt. Het nijlpaard; walvissen horen bij de evenhoevigen."
- C. De koe. — feedback: "Dichtbij, maar het nijlpaard deelt nog meer DNA met de walvis."

**q4** · 4:28.7 · hoofdstuk "De moleculaire klok" · na take e12_vraag  
Twee soorten verschillen in 2 % van hun DNA, twee andere in 4 %. Welke splitsing is ouder?  
- A. De 4 %: ongeveer twee keer zo oud. **(juist)** — feedback: "Klopt. Verschillen stapelen zich gemiddeld gelijkmatig op, dus twee keer zoveel verschil is ongeveer twee keer zoveel tijd."
- B. De 2 %: minder verschil betekent meer tijd om te verbeteren. — feedback: "Mutaties "verbeteren" niet; ze stapelen zich op. Meer tijd geeft meer verschil."
- C. Dat kun je uit percentages niet afleiden. — feedback: "Het kan wel, ongeveer, als de klok gelijkmatig tikt. Dat is precies wat de simulatie laat zien."

## Begrippen
Geen begrippenlijst op de pagina (onbekend, niet in de HTML). Wel een legenda "Kleuren in deze reeks":

- #F0B64A: de bewijslijn, het antwoord; in skeletten: het bovenarmbot
- #6FB7E8: gemeten waarden, de onderarmbotten
- #86CF86: handwortelbeentjes; het nijlpaard als antwoord
- #DCCBA6: fossielen en botten
- #E57C5B: een verschil in DNA; een restant (rudimentair)

## Docentdeel
Uitklapblokken onder "Voor de docent". **Hoe deze film uitlegt** (letterlijk overgenomen):

- Hoofdstuktype G (redeneren: voorspelling, waarneming, conclusie) met een stuk H. De as is één dier, de walvis, waar alle bewijslijnen op worden losgelaten; de film eindigt met het argument dat onafhankelijke methoden hetzelfde antwoord geven. Twee echte simulaties: sedimentatie (lagen stapelen, een dier raakt bedolven in de laag van zijn tijd) en de moleculaire klok (twee lijnen van 100 letters, elke generatie een kleine kans op een mutatie per letter; vier herhalingen, de verschillen groeien gemiddeld lineair, met spreiding). Het cladogram bouwt zich op uit drie gedeelde kenmerken.
- Misvattingen: dieper is altijd ouder (vraag 1); gelijke functie of uiterlijk betekent verwantschap (vraag 2 en 3, de zeehond); DNA-verschillen "verbeteren" in plaats van zich op te stapelen (vraag 4); een stamboom lees je aan de volgorde van de namen (hoofdstuk 5).
- Gegeven, niet uitgelegd: radioactieve datering ("dat is gemeten"). Niet in deze film: biogeografie (deel 1), het ontstaan van het leven (deel 4), de grote mijlpalen (deel 5).

**Getallen en bronnen** (overgenomen):

| Wat | In de film | Werkelijk | Bron / opmerking |
|---|---|---|---|
| Pakicetus | 50 miljoen jaar, zoogdier zo groot als een wolf, walvisoor | ongeveer 50–49 Ma (vroeg-Eoceen), Pakistan; verdikt oorbot (involucrum) | Thewissen e.a. 2001, Nature |
| Ambulocetus | 48 miljoen jaar, zoogdier dat leefde als een krokodil | ongeveer 49–47 Ma; amfibisch levend zoogdier, vorm en leefwijze lijken op die van een krokodil (convergentie) | Thewissen e.a. 1994, Science |
| Rodhocetus | 46 miljoen jaar | ongeveer 47–46 Ma | Gingerich e.a. 2001, Science |
| Basilosaurus | 40 miljoen jaar, piepkleine achterpoten | ongeveer 41–34 Ma; achterpoten enkele decimeters bij een dier van 15–18 m | Gingerich e.a. 1990, Science |
| Walvis–nijlpaard | naaste verwant; ingevoegde stukjes DNA op dezelfde plek; splitsing ongeveer 50 miljoen jaar | SINE-inserties gedeeld door walvissen en nijlpaarden; moleculaire schattingen ongeveer 55–50 Ma | Nikaido e.a. 1999, PNAS; "ongeveer" in de film |
| Embryo | achterpootknoppen in de vierde week, verdwijnen daarna | bij dolfijnen rond dag 24–28; verdwijnen rond dag 48 | Thewissen e.a. 2006, PNAS; afgerond |
| Bekkenbotjes | twee botjes, los van de wervelkolom, zonder poten | klopt; bij baleinwalvissen soms met een rudimentair dijbeen | vereenvoudigd |
| Eerste zoogdieren / eerste leven | 200 miljoen / bijna 4 miljard jaar | ongeveer 225–200 Ma; sporen van leven ongeveer 3,7–3,5 Ga | afgerond |
| Lagen in de simulatie | 52–44 miljoen jaar, vijf lagen | illustratieve waarden | gelabeld als simulatie |

**Timing en uitspraak (QA)**: "Woordtijden zijn in deze versie geschat uit pauzedetectie en zinslengte, niet uit de timestamps van de stem. De ondertitels lopen per zinsdeel; de cues per woord kunnen enkele tienden van seconden afwijken. Bij de volledige bouw gebruiken we woordtimestamps." Daaronder een tabel die bij het laden uit `RISK` wordt gevuld (risicowoord, invoer voor de stem, tijd):

| Risicowoord | Invoer voor de stem | Take |
|---|---|---|
| Pakicetus | Pakicetus | e5_reeks |
| Ambulocetus | Ambulocetus | e5_reeks |
| Rodhocetus | Rodhocetus | e5_reeks |
| Basilosaurus | Basilosaurus | e5_reeks |
| homoloog / analoog | homoloog, analoog | e6_homoloog |
| rudimentair | rudimentair | e8_analoog |
| DNA | DNA | e9_dna |
| cladogram | cladogram | e14_stamboom |
| aminozuren | aminozuren | e15_uitzoomen |

Footer: "Stem: Roos (ElevenLabs, eleven_multilingual_v2). Aflevering 3, versie 0.1 · 4 oktober 2026. Dieren en skeletten zijn vereenvoudigde tekeningen; de simulaties zijn deterministisch (vaste seed) en aan de audiotijd gekoppeld."

## Techniek: waar zit wat in de HTML
Regelnummers gelden voor `film.src.html` (uitgepakt met `scripts/filmbron.py`, 628 regels); in de gepubliceerde HTML zijn ze gelijk, omdat de blob op één regel staat.

- **Tijdlijn en tekst**: `const TL = {…}` (r. 185, één lange JSON-regel). `TL.total` = 381.86 s. `TL.takes.<id>` heeft `start`/`end` (absolute seconden in de mp3), `phrases` (ondertitels: `text`, `start`, `end`) en `words` (per woord `w`, `start`, `end`). `TL.segments` is de volgorde van 33 segmenten met `kind`: `sil` (stilte), `take` (gesproken), `card` (titel-/hoofdstuk-/eindkaart, 3,5 s; titel 4,5 s, eind 5 s) en `q` (vraag, 11,5 s).
- **Ondertitels**: `caption(t)` (r. 574) zoekt in alle `phrases` de frase met `start-0.05 ≤ t < end+0.15`. De ondertitels zijn dus precies de `phrases`-teksten.
- **Cues voor animatie**: `cue(takeId, woord, n)` (r. 210) geeft de begintijd van het n-de voorkomen van een woord in die take; alle cues staan in `const C = {…}` (r. 212). Scènes gebruiken `C.x`, `seg(id).start/end` en `ramp`/`ease` om in te faden. Alle animatie is dus aan de audiotijd (`au.currentTime`) gekoppeld; er is geen eigen klok.
- **Woordtijden zijn geschat** (docentdeel QA): uit pauzedetectie en zinslengte, niet uit timestamps van ElevenLabs. Ze kunnen enkele tienden van seconden afwijken.
- **Scènes**: `render(t)` (r. 330) kiest via `segAt(t)` het segment: kaart → `card()` met tekst uit `CARDS` (r. 276); vraag → de eindstand van de voorafgaande take, gedimd (r. 334); take → `SCENE[takeId](t)` (scènes vanaf r. 326).
- **Simulaties** (vooraf berekend bij het laden, vaste seed): r. 234: `CLOCK`; r. 244: `DNACMP`.
- **Takes per scènefunctie**:
  - `e1_cold` → r. 339
  - `e2_intro` → r. 351
  - `e3_lagen` → r. 360 (`sedimentScene`, gedeeld)
  - `e4_kantel` → r. 382
  - `e5_reeks` → r. 390
  - `e6_homoloog` → r. 405 (`limbScene`, gedeeld)
  - `e7_haai` → r. 405 (`limbScene`, gedeeld)
  - `e8_analoog` → r. 424
  - `e9_dna` → r. 439 (`dnaScene`, gedeeld)
  - `e10_nijlpaard` → r. 451
  - `e11_klok` → r. 460 (`clockScene`, gedeeld)
  - `e12_vraag` → r. 485
  - `e13_klopt` → r. 494
  - `e14_stamboom` → r. 508
  - `e15_uitzoomen` → r. 527
  - `e16_slot` → r. 545
- **Vragen**: `QDEFS` (r. 191): `text`, `options[{k,text}]`, `correct`, `explain{k: tekst}`. Speler-logica: `QSEGS` (r. 563): aftellen van `start+1` tot `start+9` s, daarna onthulling. `gate(t)` (r. 594) pauzeert de audio op `cdEnd` tot er een antwoord is (Leerling) of tot de docent op Verder drukt (Klas), tenzij "automatisch door" aan staat. `questionUI(t)` (r. 580) tekent de opties en de feedback.
- **Audio**: `<audio id="au">`; r. 559: `au.src="data:audio/mpeg;base64,@@BLOB:001.mp3@@"`. Eén bestand; er is geen koppeling per segment, alleen de absolute tijden in `TL`.
- **Pagina-onderdelen**: hoofdstukken `CH` (r. 611), transcript `TRN` + `QAFTER` (r. 615–616; de transcripttekst wordt uit `phrases` opgebouwd), uitspraaktabel `RISK` (r. 618), docentdeel als HTML (r. 152–180), seekbalk `max` en de tijd "0:00 / …" hard in de HTML (r. 120).
- **Speler**: Leerling/Klas (`?modus=klas` in de URL zet Klas), "automatisch door", CC (C), volledig scherm (F), spatie, pijltjes ±5 s. Geen Havo/Vwo-schakelaar en geen toetsfunctie.

## Zo pas je deze film aan
1. **Tekst op het scherm**: staat als letterlijke strings in de `SCENE.<take>`-functies (zie de lijst hierboven), hoofdstuk- en eindkaarten in `CARDS`. Een wijziging daar raakt de audio niet.
2. **Ondertitel zonder audiowijziging** (bijv. tikfout): pas `text` in de juiste `phrases` aan. De transcript-tekst wordt daaruit opgebouwd. Laat `words` gelijk lopen (de `cue()`-functie zoekt daarin), anders vallen animaties terug op het begin van de take (console: "cue missing").
3. **Een zin opnieuw opnemen**: er is maar één mp3. Knip het nieuwe fragment in 001.mp3 op de plek van de oude take (de take loopt van `TL.takes.<id>.start` tot `.end`). Is de nieuwe opname even lang, dan hoef je alleen `phrases` en `words` binnen die take bij te werken. Is ze langer of korter, dan schuiven alle latere `start`/`end` in `takes`, `phrases`, `words` en `segments` met het verschil mee, en ook `TL.total`, de seekbalk (`max` en de vaste tekst "0:00 / …" in r. 120) en de tijden in het docentdeel. Daarna `python3 scripts/filmbron.py inpakken`.
4. **Een vraag aanpassen**: alleen `QDEFS` wijzigen (tekst, opties, `correct`, `explain`). De pauze in de audio (11,5 s) blijft gelijk. Een vraag erbij of eraf betekent stilte in de mp3 toevoegen of weghalen plus een `q`-segment, en `QAFTER`, `CH`-tags en de `sceneBehindQ`/`back`-koppeling aanpassen.
5. **Let op**: kaarten en vragen zijn stiltes ín de mp3, geen pauzes van de speler. Een kaart langer maken = stilte bijvoegen in de audio en alle latere tijden verschuiven. De `C`-cues rekenen zichzelf opnieuw uit, maar de scènes gebruiken ook vaste offsets na een cue (bijv. `C.x+2.0`).

## Aandachtspunten
- Gemaakt vóór Prompt v4/Part C: geen Micro/Macro/Schema-stijlkaart, geen begrippenlijst, geen havo/vwo-blokken, terwijl de reeks volgens de afspraken ook voor havo bedoeld is. De badge zegt alleen "5/6 vwo".
- Woordtijden zijn geschat; het docentdeel zegt zelf "Bij de volledige bouw gebruiken we woordtimestamps". Dat is nog niet gebeurd.
- Radioactieve datering wordt alleen gegeven ("dat is gemeten"), niet uitgelegd. Dat is bewust zo, staat ook zo in het docentdeel.
- Controle: 16 takes, 4 vragen, 8 kaarten; som van alle segmenten = 381,806 s, mp3 = 381,858 s (verschil 0,052 s, staart van de eindkaart). De stiltes in de mp3 (silencedetect) vallen op de kaart- en vraagsegmenten. Alle `cue()`-aanroepen met een vast woord vinden hun woord.
