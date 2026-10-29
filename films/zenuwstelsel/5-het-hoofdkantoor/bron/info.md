# Het hoofdkantoor — bronmap

Voldoet aan: prompt v13 (29 okt 2026, lichte remake 2.0)

| Veld | Waarde |
|---|---|
| Bestand | **preview 2.0:** films/zenuwstelsel/5-het-hoofdkantoor-nieuw.html (audio in `5-het-hoofdkantoor/audio/`); de oude film films/zenuwstelsel/5-het-hoofdkantoor.html (1.2) blijft online tot Kamiel de nieuwe goedkeurt |
| Reeks / nummer | Zenuwstelsel, film 5 |
| Doelgroep / niveau | 5 vwo, één niveau (`alleen: 'vwo'`, geen havo/vwo-knop) |
| Versie / datum | **2.0 · 29 oktober 2026** — lichte remake in de donkere stijl (Part C); 1.2 · 28 okt 2026; 1.1 · 5 okt 2026 |
| Prompt | v13 |
| Voldoet aan | prompt v13 (29 okt 2026, lichte remake). De 'bewust niet'-punten van 1.2 zijn opgelost: Part C donker (navy, Fraunces/Source Sans 3/IBM Plex Mono, betekeniskleuren), FILMDATA-speler, hersenen in zijaanzicht en doorsnede opnieuw getekend in de bronmap (beeldbankobjecten later, keuze Kamiel 29 okt), temperatuurregeling in a5 ingesproken en in beeld. Bewust niet: geen B15 (lichte remake met de oude stem); de homunculus blijft een schematisch mannetje (Penfield-verhoudingen) |
| Herkomst | lichte remake, keuze Kamiel 29 okt 2026 (keuzeblad 'Regeling: jouw keuzes'); script, vragen, opties en volgorde uit 1.2; stem = de oude takes, alleen a5 opnieuw |
| Stem / model | Roos (ElevenLabs, eleven_multilingual_v2); stem-invoer a5 in `stem/invoer.md` |
| Duur | 349 s gesproken (13 takes); speler met vragen aan 7:21, met vragen uit 5:08 |
| Beeldstijl | Part C: Schema (navy) met een keuken als cold open (personage uit het castboek, zomeroutfit, geen naam), hersenen in zijaanzicht als rode draad, lichaam uit `lib_anatomie.js`, huid en hoofd-doorsnede uit `bibliotheek/lib_bio.js` |
| Audio-opslag | 13 losse mp3's in `../audio/` (`s00 q1 a1 s21 q2 a2 q3 a3 q4 a4 q5 a5 s70`); oude takes uit 1.2 (`window.FILM_AUDIO`), a5 nieuw (−17 LUFS) |
| Werkmap | `remake-2026-10/` (zie 'Versie 2.0' hieronder) |


## Versie 2.0 · lichte remake (29 okt 2026) — waar wat zit en hoe je hem aanpast

Bouwvorm: FILMDATA-straat (zoals Zenuwstelsel 9 en DNA 1). Alles in `remake-2026-10/`:
- `film/segments.json` (uit `maak_segs.py`: oude ondertiteltekst + oude woordtijden uit `oud_film.json`, a5 uit `nieuw_a5.json`), `film/words/<id>.json`, `film/film.py` (titel, vragen met uitleg, begrippen + normwaarde en negatieve terugkoppeling), `film/sections.html` (checkvragen 1–6, docentdeel).
- `film/teken_z5.js` (nieuwe tekeningen: `z5Brein` zijaanzicht met kwabben, groeven, primaire en associatieve schors, motorische strook per lichaamsdeel, diepe structuren; `z5Doorsnede`; `z5Boven`; `z5Slak` en `z5Basilair`; `z5Homunculus`; `z5Knop` thermostaat 35–42 °C; `z5Baan` baan met impuls), `film/scenes_z5.js` (een scène per segment-id).
- `eng/` = engine (lib.js, scenes_kop.js, lib_cast.js, lib_anatomie.js, lib_bio.js, lib_voeding.js, lib_hormonen.js, page.html, fonts.css, player.js van Gedrag 5 + build_data.py, build.py, stills.py, silalign.py). **Aanpassing aan de speler:** gesproken vraagalinea's (`q1`–`q5`, veld `vraag: true`) vallen bij Vragen uit helemaal weg (`/*VRAAGSEG*/` in `buildTimeline`; `build_data.py` geeft het veld door). Opties lichten tijdens de gesproken vraag op in `vraagScene`.
- Bouwen: werkmap met `film/` naast `eng/`, audio als `film/audio/<id>.mp3` (kopie uit `../audio/`), dan `bash film/bouw.sh` en `bash film/installeer.sh` (zet het donker-regeltje en schrijft `films/zenuwstelsel/5-het-hoofdkantoor-nieuw.html`). Stills: `python3 eng/stills.py film <map> <id>:<t> …`. Daarna in de repo de scripts uit CLAUDE.md.
- Storyboard: `remake-2026-10/storyboard/` (24 keyframes 960×540 + `storyboard.json`).

Regelnummers in `5-het-hoofdkantoor-nieuw.html` (11481 regels): FILMDATA r. 144 · `z5Brein` r. 10817 · `z5Doorsnede` 10882 · `z5Boven` 10899 · `z5Basilair` 10921 · `z5Homunculus` 10932 · `z5Knop` 10963 · `keuken` 11001 · `vraagScene` 11025 · scènes `s00` 11037, `a1` 11059, `s21` 11090, `a2` 11135, `a3` 11150, `a4` 11175, `a5` 11206, `s70` 11270 · speler (VRAAGSEG) 11322.

**Een alinea opnieuw inspreken:** nieuwe mp3 als `../audio/<id>.mp3`, woordtijden in `film/words/<id>.json` (Scribe of `silalign.py`), tekst in `segments.json` (`display`), opnieuw bouwen; de scènes hangen aan woorden via `q.at(woord, n)` / `q.on(woord, n, duur)`.

Kleuren (tabel 'gelijktrekken' 29 okt): zenuwsignaal teal, bewegen (motorisch) koraal, primaire zintuigschors teal, associatieve schors oker, focus goud, hypothalamus/hormonen paars, hypofyse licht paars, warmte koraal, koud teal, negatieve terugkoppeling groen.

## Opbouw (versie 1.x; tijden van de oude speler)

| Begin | Hoofdstuk | Segmenten | Type (docentdeel) | Kernbeeld (docentdeel) |
|---|---|---|---|---|
| 0:00 | Cold open | s00 | — | wereld: zaterdagochtend, radio speelt, voet tikt mee, kippenvel op de arm; vraag ‘wie regelt dat?’ |
| 0:20 | 1 Drie delen | q1, a1 | structuur | plattegrond met grote hersenen, vier kwabben, kleine hersenen, hersenstam; doorsnede met grijze en witte stof en de hersenbalk |
| 1:25 | 2 Horen en herkennen | s21, q2, a2 | functie | slakkenhuis (plek per toon op het basilair membraan) → gehoorzenuw → hersenstam → thalamus → primaire gehoorschors met dezelfde volgorde van laag naar hoog; associatieve schors herkent; zien, voelen en bewegen per kwab |
| 3:12 | 3 Kruislings | q3, a3 | structuur en functie | bovenaanzicht met kruisende banen; homunculus op de strook motorische schors |
| 4:04 | 4 De maat houden | q4, a4 | functie | plan, kopie, terugmelding en bijsturen; tikken op de tel met en zonder kleine hersenen |
| 4:56 | 5 Vanzelf | q5, a5 | regulatie | verlengde merg (ademhaling, hartslag), middenrif; hypothalamus, hypofyse en autonoom zenuwstelsel; kippenvel bij het refrein |
| 5:51 | 6 Samenvatting | s70 | — | plattegrond van de hersenen met samenvattingspaneel rechts (`#p-recap`), gebieden lichten op ankerwoorden op |

Begintijden = begin van de hoofdstukkaart in de speler, zonder wachttijd bij de vragen (zoals in de hoofdstuklijst op de pagina). Type-letters A–I uit de prompt staan niet in de HTML; de typering hierboven is die uit de tabel “Per hoofdstuk” in het docentdeel.

## Vragen

### Voorspelvragen in de film (`plan.questions`)

| Nr | Plek | Vraag | Opties | Juist | Misconceptie-optie | Niveau |
|---|---|---|---|---|---|---|
| V1 | H1 Drie delen, 0:23 | Je luistert naar een nummer dat je kent. Hoeveel van je hersenen doet mee? | A. Ongeveer tien procent / B. Eén hersenhelft / C. Gebieden verspreid door je hele hersenen | C | A | basis (5 vwo) |
| V2 | H2 Horen en herkennen, 2:35 | Gezonde oren en primaire gehoorschors, maar de associatieve schors eromheen is aan beide kanten beschadigd. Wat merkt hij bij zijn lievelingsnummer? | A. Hij hoort niets / B. Hij hoort tonen, maar herkent het nummer niet / C. Hij hoort en herkent het gewoon | B | A | basis (5 vwo) |
| V3 | H3 Kruislings, 3:15 | Je tikt de maat met je rechterhand. Welke hersenhelft stuurt die hand? | A. De rechterhelft / B. De linkerhelft / C. Allebei evenveel | B | A | basis (5 vwo) |
| V4 | H4 De maat houden, 4:07 | Schade aan de kleine hersenen, maar de arm kan nog bewegen. Wat gaat er mis? | A. Niets, de kleine hersenen doen weinig / B. Bewegingen worden onhandig en slecht getimed / C. Hij raakt toch verlamd | B | A | basis (5 vwo) |
| V5 | H5 Vanzelf, 4:59 | Je slaapt en denkt nergens aan. Wat houdt je ademhaling gaande? | A. Je grote hersenen / B. Je hersenstam / C. Niets: je longen ademen vanzelf | B | C | basis (5 vwo) |

Alle antwoordsegmenten beginnen met “Het goede antwoord is …”. De gesproken vraag begint met “Wat denk je?”.

### Checkvragen op de pagina

1. Een tijdschrift schrijft: 'Je gebruikt maar tien procent van je hersenen.' Weerleg dit met twee argumenten. Gebruik dat de hersenen ongeveer 2 % van je lichaamsgewicht zijn en ongeveer 20 % van je energie gebruiken. Leg ook uit waar in de grote hersenen grijze en waar witte stof ligt, en waaruit elk bestaat.  
   *Antwoord:* Argument 1: er is bijna geen hersengebied dat je kunt beschadigen zonder dat er een functie uitvalt. Argument 2: de hersenen kosten veel energie (een vijfde) bij een klein gewicht; een orgaan dat grotendeels niets doet zou in de evolutie niet zo duur zijn gebleven. Grijze stof ligt buiten (de hersenschors) en bestaat vooral uit cellichamen; witte stof ligt binnen en bestaat uit axonen met myeline.
2. Beschrijf de weg van een geluid van je oor tot het moment dat je weet: 'dit is mijn nummer'. Noem daarbij de thalamus, de primaire gehoorschors en de associatieve schors, en wat elk doet. In welke kwab ligt de gehoorschors?  
   *Antwoord:* In het slakkenhuis trilt het basilair membraan op een eigen plek per toon (begin: hoog, top: laag); daar worden zintuigcellen geprikkeld → gehoorzenuw → hersenstam → thalamus (schakelstation) → primaire gehoorschors (toonhoogte, luidheid) → associatieve schors eromheen (koppelt aan wat je kent: herkennen). De gehoorschors ligt in de slaapkwab.
3. Na een beroerte in de linkerhersenhelft kan iemand zijn rechterhand slecht bewegen, maar zijn rug wel. Verklaar beide met de kruising van banen en met de verdeling van de motorische schors.  
   *Antwoord:* De motorische banen kruisen in de hersenstam, dus de linker motorische schors stuurt de rechterlichaamshelft. De hand heeft een groot stuk motorische schors (fijne bewegingen), de rug een klein stuk; schade treft daardoor eerder en sterker de hand. (De romp wordt bovendien vanuit beide helften aangestuurd.)
4. Een drummer heeft een kleine hersenbloeding gehad in de kleine hersenen. Hij kan nog met beide armen slaan, maar 'loopt achter de tel aan'. Verklaar dit met de taak van de kleine hersenen.  
   *Antwoord:* De motorische schors maakt het plan; de kleine hersenen vergelijken een kopie van dat plan met de terugmelding uit spieren en gewrichten en sturen bij. Zonder die correctie lukt bewegen nog, maar onnauwkeurig en slecht getimed: net te laat.
5. Bij iemand is het verlengde merg beschadigd. Een ander heeft schade aan de hypothalamus. Noem voor elk twee functies die in gevaar komen, en leg uit welke van de twee direct levensbedreigend is.  
   *Antwoord:* Verlengde merg: ademhaling en hartslag (en bloeddruk); direct levensbedreigend omdat ademen niet vanzelf door de longen gebeurt. Hypothalamus: temperatuur, honger, dorst, aansturing van de hypofyse (hormonen) en het autonome zenuwstelsel; ernstig, maar niet direct dodelijk zoals uitval van de ademhaling.

## Begrippen

- **grote hersenen** — grootste deel van de hersenen, uit twee hersenhelften; buitenkant is de hersenschors.
- **hersenhelften** — de linker- en rechterhelft van de grote hersenen; elke helft werkt vooral met de andere lichaamshelft.
- **hersenbalk** — brede band witte stof (zo'n tweehonderd miljoen axonen) die de twee hersenhelften verbindt.
- **hersenkwabben** — de vier delen van elke hersenhelft: voorhoofdskwab, wandbeenkwab, slaapkwab en achterhoofdskwab.
- **voorhoofdskwab** — kwab vooraan; bevat de motorische schors en veel associatieve schors (plannen, kiezen, je inhouden).
- **wandbeenkwab** — kwab bovenop, achter de centrale groeve; bevat de gevoelsschors.
- **slaapkwab** — kwab opzij; bevat de primaire gehoorschors.
- **achterhoofdskwab** — kwab achteraan; bevat de primaire schors voor zien.
- **kleine hersenen** — deel achter onder de grote hersenen; zorgt voor coördinatie, timing en evenwicht door bewegingen bij te sturen.
- **hersenstam** — deel onder de grote hersenen dat overgaat in het ruggenmerg; alle banen lopen erdoor; regelt onder meer ademhaling en hartslag.
- **verlengde merg** — onderste deel van de hersenstam met centra voor ademhaling en hartslag.
- **grijze stof** — weefsel met vooral cellichamen van neuronen; in de grote hersenen de hersenschors aan de buitenkant, plus kernen diep binnenin (zoals de thalamus).
- **witte stof** — weefsel met vooral axonen met een myelineschede; verbindt hersengebieden met elkaar.
- **hersenschors** — dunne laag grijze stof (2–4 mm) aan de buitenkant van de grote hersenen.
- **primaire schors** — schorsgebied waar impulsen van een zintuig binnenkomen of waar bewegingsopdrachten beginnen.
- **associatieve schors** — schorsgebied rond de primaire gebieden dat informatie koppelt aan wat je al weet en er betekenis aan geeft.
- **slakkenhuis** — deel van het binnenoor waarin geluidstrillingen worden omgezet in impulsen.
- **basilair membraan** — vlies in het slakkenhuis met de zintuigcellen; smal en stijf bij het begin (hoge tonen), breed en slap bij de top (lage tonen).
- **thalamus** — schakelstation diep in de hersenen; bijna alle zintuiglijke impulsen (niet die van reuk) gaan erdoor naar de schors.
- **kruising** — banen van en naar de grote hersenen kruisen in de hersenstam: de linkerhelft werkt met de rechterlichaamshelft.
- **homunculus** — tekening van het lichaam waarin elk deel zo groot is als zijn stuk motorische (of gevoels)schors.
- **hypothalamus** — klein gebied net boven de hersenstam; houdt temperatuur, honger en dorst op peil, stuurt het autonome zenuwstelsel en via de hypofyse hormonen.
- **hypofyse** — hormoonklier onder de hypothalamus, die er door wordt aangestuurd.

Geen vwo-markering: de hele film is 5 vwo.

## Docentdeel

Film 5 laat zien wat de hersenen doen in de eerste seconden van een nummer dat je kent. De rode draad is de plattegrond: een zijaanzicht van de linkerhersenhelft waarop per hoofdstuk een afdeling oplicht. De centrale puzzel is "waar zit de baas?"; het antwoord is dat er geen baas is: gebieden werken tegelijk en zijn via witte stof verbonden. Niveau: 5 vwo, CE-stof.

**Per hoofdstuk**: zie “Opbouw” hierboven (Type en Kernbeeld); misconcepties per hoofdstuk:

- 1 Drie delen: je gebruikt maar tien procent van je hersenen
- 2 Horen en herkennen: horen en herkennen zijn hetzelfde
- 3 Kruislings: de helft aan dezelfde kant stuurt die kant
- 4 De maat houden: bewegen is alleen de motorische schors
- 5 Vanzelf: ademen doen je longen vanzelf

**De feiten en getallen**

| Feit | Waarde | Bron | In de film |
|---|---|---|---|
| neuronen, massa, energie | 86 ± 8 miljard neuronen; 1,2–1,4 kg (≈ 2 % van het lichaamsgewicht); wakker een vijfde van de energie; schors 2–4 mm; witte stof ongeveer de helft van het volume | [Human brain (Wikipedia)](https://en.wikipedia.org/wiki/Human_brain) | checkvraag 1; "een dunne laag" |
| thalamus, kruising, hersenstam, hypothalamus | schakelstation (reuk uitgezonderd); banen kruisen in de hersenstam; verlengde merg regelt ademhaling, hartslag en bloeddruk; hypothalamus stuurt de hypofyse en regelt homeostase | [Human brain (Wikipedia)](https://en.wikipedia.org/wiki/Human_brain) | hoofdstuk 2, 3 en 5 |
| hersenbalk | 200–300 miljoen axonen (meestal ≈ 200–250 miljoen genoemd); grootste witte-stofstructuur | [Corpus callosum (Wikipedia)](https://en.wikipedia.org/wiki/Corpus_callosum) | "zo'n tweehonderd miljoen axonen" |
| kleine hersenen | ≈ 10 % van het volume; ongeveer 69 van de 86 miljard neuronen (≈ 80 %); schade geeft onnauwkeurige, slecht getimede bewegingen, geen verlamming | [Cerebellum (Wikipedia)](https://en.wikipedia.org/wiki/Cerebellum); 69 van 86 miljard: Azevedo e.a. 2009, zoals besproken in [Von Bartheld e.a. 2016](https://pmc.ncbi.nlm.nih.gov/articles/PMC5063692/) | "een tiende", "ongeveer vier vijfde"; V4 |
| slakkenhuis | basilair membraan smal en stijf bij het begin (hoge tonen), breed en slap bij de top (lage tonen); deze volgorde blijft bewaard tot in de gehoorschors | handboekfeit; nagekeken in de onafhankelijke controle van het script | hoofdstuk 2 |
| tien-procentmythe | bijna geen gebied te beschadigen zonder functieverlies; tot 20 % van de energie bij 2 % van het gewicht | [Ten percent of the brain myth (Wikipedia)](https://en.wikipedia.org/wiki/Ten_percent_of_the_brain_myth) | V1 |
| gehoorschors | bovenkant slaapkwab; tonen geordend van laag naar hoog; schade aan één kant geeft licht verlies, aan beide kanten corticale doofheid | [Auditory cortex (Wikipedia)](https://en.wikipedia.org/wiki/Auditory_cortex) | hoofdstuk 2 |
| auditieve agnosie | wel horen, niet herkennen; bij schade aan beide kanten; soms alleen muziek | [Auditory agnosia (Wikipedia)](https://en.wikipedia.org/wiki/Auditory_agnosia) | V2 |
| homunculus | schorsoppervlak hangt af van hoe rijk een deel bezenuwd is, niet van de grootte; Penfield, 1937 | [Cortical homunculus (Wikipedia)](https://en.wikipedia.org/wiki/Cortical_homunculus) | hoofdstuk 3 |
| kippenvel bij muziek | sympathische activatie (huidgeleiding, pupil) en dopamine in het beloningssysteem | [Frisson (Wikipedia)](https://en.wikipedia.org/wiki/Frisson) | alleen de autonome kant |

**Vereenvoudigingen en wat ontbreekt**

Grijze stof zit niet alleen in de schors: diep binnenin liggen ook kernen van grijze stof (thalamus, basale kernen); de doorsnede laat er twee zien. Het hart klopt uit zichzelf (sinusknoop); het verlengde merg regelt alleen het tempo. De plattegrond is een schema: de primaire gehoorschors ligt grotendeels verborgen in de groeve tussen slaap- en wandbeenkwab; thalamus, hypothalamus en hypofyse liggen diep en zijn gestippeld door de schors heen getekend. De associatieve gebieden zijn als vlekken getekend. De route van het gehoor is ingekort (er liggen meer schakelstations in de hersenstam). "Grijs rekent, wit verbindt" is een ezelsbruggetje, geen definitie. De romp wordt vanuit beide helften aangestuurd; de kruising geldt vooral voor armen, benen en gevoel. Taalcentra (Broca, Wernicke) en het limbisch systeem komen niet voor. De verdeling "links logisch, rechts creatief" komt ook niet voor; beide helften doen aan bijna alles mee, wel met accenten. Kippenvel bij muziek gaat ook samen met dopamine in het beloningssysteem (film 4); de film noemt alleen de autonome kant. Brug naar film 4: wankelen na te veel alcohol is een teken dat de kleine hersenen minder goed werken.

**Leerdoelen**

Bouw van de hersenen met kwabben (V1, C1) · grijze en witte stof (C1) · route van een zintuigprikkel (C2) · primaire en associatieve schors per kwab (V2, C2) · kruising (V3, C3) · homunculus: precisie, niet grootte (C3) · kleine hersenen (V4, C4) · hersenstam en hypothalamus (V5, C5) · verdeelde functies, geen baas (V1, C1).

## Techniek: waar zit wat in de HTML

Regelnummers gelden voor `film.src.html` (uitgepakt met `scripts/filmbron.py`; zelfde regelnummers als de film-HTML zelf, 942 regels).

- **`window.FILM_AUDIO`** (r. 519): object `{segment-id: 'data:audio/mpeg;base64,…'}`, één mp3 per gesproken segment. Koppeling id → blob: s00=001.mp3, q1=002.mp3, a1=003.mp3, s21=004.mp3, q2=005.mp3, a2=006.mp3, q3=007.mp3, a3=008.mp3, q4=009.mp3, a4=010.mp3, q5=011.mp3, a5=012.mp3, s70=013.mp3.
- **`window.FILM`** (r. 520, één lange JSON-regel) met drie delen:
  - `plan`: `title`, `subtitle`, `series`, `next` (worden door de speler niet gebruikt; de zichtbare titels staan als HTML in `#card-title`/`#card-end` en de `<h1>`), `chapters` (6× `{n,title,verdieping}`), `timeline` (26 items: narration/title/card/countdown/end; kaarten hebben een vaste `dur`, narration-items krijgen hun duur uit `timing`), `questions` ({q, opts[3], correct, misconception}), `cues` (`[woord, n-de keer, soort, tekst]` per segment; soorten: beat, number, recap, term).
  - `timing[<id>]`: `duration` (s), `speech` ([begin, eind] van de spraak), `phrases` (ondertitelfrasen met `t0`/`t1`), `words` (elk woord met `t0`/`t1`). Bron van de woordtijden (vermoedelijk ElevenLabs-alignment): onbekend (niet in de HTML).
  - `segments[]`: `{id, chapter, text}` — volledige tekst per segment; **niet gebruikt door de speler** (alleen documentatie).
- **Speler** (IIFE vanaf r. 524): bouwt `SEGS` uit `plan.timeline` (starttijden opgeteld; narration-duur = `timing.duration`), zet `window.FILM_SEGS` en `window.FILM_CUES` (r. 574). `FILM_CUES` is een opgeloste cuetabel met absolute tijden voor QA; de scènes lezen de cues niet, maar zoeken hun eigen ankerwoorden op met `wt(id, woord, n)` (begintijd van het n-de voorkomen van dat woord in `timing[id].words`).
- **Audio**: `AUD[id]=new Audio(FILM_AUDIO[id])` (r. 584). De klok (`tick`) volgt `audio.currentTime` tijdens een narration-segment; kaarten en aftellingen lopen op de wandklok. Aan het eind van een fragment springt de speler naar het volgende segment.
- **Scènes**: `render(T)` kiest per segment op `scene`: `sceneWorld` r. 689, `sceneMicro` r. 703, `sceneRecap` r. 827, `sceneCard` r. 840, `sceneQuestion` r. 848, `sceneReveal` r. 863, `render` r. 872, `tick` r. 890. `sceneMicro` verdeelt per segment: a1→microBouw, s21→microHoren, a2→microHerkennen, a3→microKruis, a4→microMaat, a5→microVanzelf.
- **Ondertitels**: `renderCaption` toont de lopende frase uit `timing[id].phrases` (frasen < 18 tekens worden met de volgende samengevoegd); in staande stand op de telefoon in `#capband` onder het beeld.
- **Vragen**: `sceneQuestion` toont `plan.questions[n]` tijdens het q-segment en de aftelling; opties lichten op op vaste fracties 0,30/0,55/0,80 van de duur van het q-segment. `sceneReveal` legt de vraag over het begin van het a-segment en kleurt het juiste antwoord op het woord “antwoord” (tot 3,2 s erna).
- **Modi**: Leerling (wacht na de aftelling tot er een optie getikt is), Klas (`?modus=klas`; knop “verder”), vinkje “automatisch door”. Ondertitels (C), stem aan/uit (M), volledig scherm (F, met nep-fullscreen voor iPhone). Geen havo/vwo-schakelaar.
- **Pagina onder de speler**: hoofdstuklijst (gegenereerd uit `plan.chapters`), Begrippen r. 428, Transcript r. 454, Checkvragen r. 477, Voor de docent r. 485, Credits r. 514.
- **QA**: `window.FILM_API.renderAt(T)` (r. 936) rendert deterministisch één frame.

**Ankerwoorden per segment** (woorden waarop beeld of cues getimed zijn, gevonden in de code en in `plan.cues`; mogelijk niet volledig): 

- `s00`: baas, kippenvel, radio, refrein, tikt, Twee, Waar, Wie
- `q1`: —
- `a1`: achterhoofdskwab, Buiten, cellichamen, doorsnede, fabel, Grijs, grijze, grote, hersenbalk, hersenbalk (2e), hersenstam, kleine, kwabben, myeline, ruggenmerg, slaapkwab, verbindt, voorhoofdskwab, wandbeenkwab, witte + “antwoord” (reveal)
- `s21`: achterhoofdskwab, associatieve, basilair, betekenis, gehoorschors, gehoorzenuw, groeve, hersenstam, hoge, laag, lage, oor, slaapkwab, slakkenhuis, thalamus, toonhoogte, volgorde, voorhoofdskwab, voorhoofdskwab (2e), wandbeenkwab
- `q2`: —
- `a2`: geleerd, herkennen, losse, tonen + “antwoord” (reveal)
- `q3`: —
- `a3`: groot, handen, homunculus, kruisen, kruislings, lippen, mannetje, rechterhand, rug, strook, Tikken, tong + “antwoord” (reveal)
- `q4`: —
- `a4`: bij, Daardoor, evenwicht, kopie, schokkerig, spieren, tel, tiende, tik, vijfde + “antwoord” (reveal)
- `q5`: —
- `a5`: ademhaling, autonome, haartjes, hart, hypofyse, hypothalamus, Kippenvel, middenrif, refrein, temperatuur, verlengde + “antwoord” (reveal)
- `s70`: associatieve, baas, gehoorschors, geleerd, hersenstam, kippenvel, kleine, Links, Lippen, witte

## Zo pas je deze film aan

1. **Tekst in beeld wijzigen** (labels, termen, kaarten): zoek de tekst in de SVG-lagen (`#world`, `#micro`) of in `#cards`; titel- en eindkaart staan als HTML in `#card-title` / `#card-end`. Vraagteksten en opties wijzig je in `plan.questions` (let op: de gesproken vraag in het q-fragment noemt de opties ook).
2. **Eén alinea opnieuw inspreken**: elk segment is een eigen mp3. Vervang alleen het blob van dat segment (zie tabel hierboven) met dezelfde naam, en vervang in `window.FILM.timing[<id>]` `duration`, `speech`, `phrases` en `words` door de nieuwe tijden (ElevenLabs met timestamps). Pas `segments[].text` en het transcript op de pagina mee aan. De andere segmenten blijven ongemoeid; de starttijden schuiven vanzelf op.
3. **Let op de ankerwoorden**: de animatie hangt aan woorden via `wt()`. Verdwijnt of verandert een ankerwoord (lijst hierboven), dan geeft `wt` 0 terug en springt dat beeldmoment naar het begin van het segment. Een a-segment moet het woord “antwoord” bevatten (reveal), en het n-de voorkomen telt (`wt(id,woord,2)`).
4. **Vraag aanpassen**: `plan.questions[n]` (`q`, `opts`, `correct` 0-gebaseerd, `misconception`); het q- en a-fragment opnieuw inspreken als de gesproken tekst niet meer klopt. De aftelling (`cdN`, 8 s) staat in `plan.timeline`.
5. **Kaarten en pauzes**: de duur van titel-, hoofdstuk- en eindkaart en de aftellingen staat als `dur` in `plan.timeline`.
6. **Inpakken**: werk in een tijdelijke map met `python3 scripts/filmbron.py uitpakken|inpakken|controleer`; zet geen uitgepakte mappen in de repo.

## Aandachtspunten

- Versie 1.1 (5 oktober 2026): de enige film naast film 1 met een tweede versie; welke wijziging 1.1 bracht is onbekend (niet in de HTML).
- Credits linken naar `reeks.html`, dat niet in de repo staat (dode link). `plan.series` zegt “film 5 van 7”, films 1–4 nog “van 6”.
- Docentdeel noemt expliciet wat ontbreekt (Broca/Wernicke, limbisch systeem); de slakkenhuis-tonotopie is ‘handboekfeit, nagekeken in de onafhankelijke controle’ zonder externe link.
- Velden die de speler niet gebruikt: `questions[].misconception`, `segments[]`, `plan.series/next`.
- Verbeterd 12-10-2026: dode link `reeks.html` → `../../index.html#regeling`.

## Wachtlijst opnieuw inspreken

**Verwerkt in 2.0 (29 okt 2026):** a5 is opnieuw ingesproken en de regelkring staat in beeld; de risicowoorden hieronder staan nog op de luisterlijst (`stem/invoer.md`).

- **a5 — antwoord op vraag 5, Vanzelf (blob 012.mp3), 15-10-2026, aanvulling na vergelijking met Gewoon Uitgelegd.** Erbij: na „temperatuur, honger, dorst.” de temperatuurregeling als regelkring (temperatuurzintuigen → hypothalamus vergelijkt met normwaarde ≈ 37 °C → zweetklieren en wijde huidvaten of nauwe huidvaten en rillen; negatieve terugkoppeling). Vijf zinnen.
  - Hele segment a5 opnieuw opnemen (blob 012.mp3), `timing.a5`, `segments[].text` en transcript bijwerken. Ca. 25 s langer; s70 en de eindkaart schuiven vanzelf op.
  - Ankerwoorden blijven staan: `temperatuur` en `hypothalamus` komen nu vaker voor, maar `T()` pakt het eerste voorkomen (vóór de aanvulling). In de nieuwe zinnen staan geen „hart”, „autonome”, „hypofyse”, „refrein” of „Kippenvel”. Let op: microVanzelf laat ‘op peil’ op `temperatuur` beginnen; het beeld voor de nieuwe regelkring moet op een nieuw ankerwoord (bv. `normwaarde`, `zweetklieren`, `rillen`, `terugkoppeling`).
- **Beeld nodig**: kleine regelkring naast de hypothalamus op de plattegrond: sensor (temperatuurzintuigen) → hypothalamus met normwaarde „≈ 37 °C” → effectoren; twee takken „te warm: zweetklieren, huidvaten wijd” en „te koud: huidvaten nauw, rillen”; label „negatieve terugkoppeling” met een min-teken op de terugkoppelpijl. (Kan dezelfde regelkringstijl gebruiken als in de Regelkring-tool.)
- **Risicowoorden (uitspraaktest)**
  - *hypothalamus* — bestaand (komt al in de film voor), geen nieuw risicowoord. Bekende voorkeur: klemtoon op „tha” (hy-po-THA-la-mus); stem-invoer „hypoTHAlamus”. Nu ook in de nieuwe zin „De hypothalamus vergelijkt…”: zelfde invoer gebruiken zodat het hele segment gelijk klinkt.
  - *zevenendertig graden* — IPA [ˈzeːvə(n)ənˌdɛrtəx ˈɣradən]. Gezien Kamiels keuze bij „vijf en neguntig graden”: stem-invoer „zeven en dertig graden” (niet „37 graden” als cijfers, niet aaneengeschreven); ondertitel „zevenendertig” of „37 °C”.
  - *negatieve terugkoppeling* — terugkoppeling met klemtoon op „rug” [təˈrʏxkɔpəlɪŋ] (online IPA niet gevonden; koppeling = kop-pe-ling). Stem-invoer: als geschreven; fout? „te-rug-koppeling”.
  - *temperatuurzintuigen* — temperatuur [tɛm.pə.raːˈtyːr] ([kaikki/Wiktionary](https://kaikki.org/dictionary/Dutch/meaning/t/te/temperatuur.html)); lange samenstelling, klemtoon op „tuur”. Stem-invoer: als geschreven; struikelt de stem, dan „temperatuur-zintuigen”.
  - *zweetklieren* — [ˈzʋeːt.kliːrən] ([kaikki/Wiktionary](https://kaikki.org/dictionary/Dutch/meaning/z/zw/zweetklier.html)); laag risico, als geschreven.
  - *normwaarde, huidvaten, rillen* — laag risico, als geschreven.

## Wijzigingen
- **2.0 · 29 okt 2026** — lichte remake in de donkere stijl (keuze Kamiel 29 okt; preview `5-het-hoofdkantoor-nieuw.html`, de oude 1.2 blijft online). Credits: a5 1130 (take) + 0 (Scribe) = **1130**.
  - *Alles:* Part C donker, FILMDATA-speler (snelheid, Vragen aan/uit, Leerling/Klas), lettertypes en kleuren van Part C; vraagkaarten van de speler; ondertitelkast.
  - *s00:* keuken op Schema-navy (aanrecht 87 cm, radio ± 50 cm), personage uit het castboek in zomeroutfit (1,60 m, geen naam), noten uit de radio, tikboogjes bij de voet, mond zingt (`praat`), kippenvel als zoomcirkel met de huid uit de beeldbank (`huidBlok`, `kip`), hersenen in een zoomcirkel náást het hoofd.
  - *q1–q5:* vraagkaart al tijdens de gesproken vraag; opties lichten op als ze genoemd worden; bij Vragen uit valt de hele alinea weg.
  - *a1:* zijaanzicht (nieuw getekend: groeven, kwabben, kleine hersenen, hersenstam, ruggenmerg); '10 %' doorgestreept bij 'fabel'; kwab voor kwab goud met de naam erbij; bovenaanzicht met de hersenbalk als inzet; dwarse doorsnede met grijze stof (schors), witte stof en hersenbalk.
  - *s21:* slakkenhuis + uitgerold basilair membraan met een golf op de plek van de toon (hoog bij het begin, laag bij de top); impuls langs gehoorzenuw → hersenstam → thalamus → primaire gehoorschors; tonotopie in een zoomcirkel; associatieve schors (oker); daarna zien (teal), centrale groeve (goud), bewegen (koraal), voelen (teal), associatieve schors en plannen/kiezen/inhouden.
  - *a2:* associatieve schors gearceerd koraal (beschadigd), noten blijven los; horen ✓, herkennen ✗.
  - *a3:* bovenaanzicht met kruisende banen (koraal bewegen, teal voelen) naar de handen; motorische strook per lichaamsdeel (been, romp, arm, hand, gezicht, lippen, tong) en een homunculus met grote handen, lippen en tong.
  - *a4:* bevel (koraal), kopie (goud), terugmelding (teal), bijsturen (groen); tikken op de tel met en zonder kleine hersenen; staafjes 'een tiende' en 'vier vijfde'.
  - *a5:* **opnieuw ingesproken** met de temperatuurregeling (wachtlijst 15 okt; vijf zinnen ná de hormonen, zie `stem/invoer.md`). Beeld: ademhaling (lichaam uit `lib_anatomie.js`, middenrif, signaal uit de hersenstam, hersenen in zoomcirkel), hypothalamus en hypofyse in de mediane doorsnede uit de beeldbank, **nieuwe regelkring als levend model (type D)**: grafiek lichaamstemperatuur met verstoring (te warm koraal, te koud teal) en terugkeer naar de normwaarde 37 °C, sensor (temperatuurzintuigen), regelcentrum (hypothalamus met thermostaatknop: gouden wijzer = normwaarde, boog = lichaamstemperatuur), effectoren in de huid (zweten, vaten wijd/nauw, rillen), negatieve terugkoppeling (−); refrein: hart sneller, kippenvel, automatische afdelingen.
  - *s70:* gebieden lichten op op de ankerwoorden, verbindingen van witte stof, samenvattingspaneel, 'geen baas' als annotatiehaak.
  - *Pagina:* checkvraag 6 (temperatuurregeling), begrippen normwaarde en negatieve terugkoppeling, docentdeel met niveau-A-bronnen in plaats van Wikipedia.
  - *Lege plekken:* uitspraak van a5 niet door een mens beluisterd (wachtlijst in `stem/invoer.md`); `index.html`, REVIEW en datum nog niet aangepast (doet de hoofdsessie bij goedkeuring).
- **1.2 · 28 okt 2026** — opwaardering prompt v13 (B14, zonder keuring; Regeling-batch). Geen nieuwe opname. Details en open vragen: `opwaardering-v13.md`; vakinhoud: `bronnen.md`.
  - *s00 (cold open):* poppetje (rond hoofd met smiley, blokvormig lijf) vervangen door castpersonage Noor ('jij', zomeroutfit zodat het kippenvel op de blote arm klopt; geen naam in beeld of stem). Mond: `blij`, bij 'refrein' wisselend `praat` open/dicht; de rechtervoet (alleen de schoen) is een los beeld dat bij 'tikt' op de hiel kantelt (`#w-foot2`, draaipunt `NOOR_HIEL`). lib_cast.js afgeschermd in de film (`window.CASTSVG`).
  - *s00:* realistische maten (aanrecht 87 cm = 210 px): Noor 1,60 m (was ± 2,3 m naast het aanrecht), radio ± 50 cm breed (was ± 1,25 m); de noten starten bij de kleinere radio. Huid in de kippenvel-inzet = huid van Noor.
  - *s00 (lens 'Wie regelt dat?'):* de lens met de hersenen lag óp het hoofd, over het gezicht (BEELDAFSPRAKEN: niet in het hoofd over het gezicht heen). Nu een zoomcirkel náást het hoofd (links, boven het raam) met een ring om het hoofd en twee lijnen ernaartoe (`lensLijnen`).
  - *Speler (ondertitels):* bij Vragen uit flitste na de sprong nog even ‘Het goede antwoord is …’; `renderCaption` laat die frase en ‘Wat denk je?’ nu weg bij Vragen uit.
  - *Credits:* versie 1.2.
  - *Let op:* regelnummers in ‘Techniek’ gelden voor 1.1; vóór `window.FILM_AUDIO` staan nu twee extra scripts (±850 regels). Zoek op functienaam.
- 15 okt 2026 — Speler: de knop Vragen aan/uit (onthouden in `bk-vragen`, ook `?vragen=uit`) werkt nu altijd, ook na spoelen, in pauze en als je hem halverwege omzet. Bij Vragen uit vallen weg: de vraag zelf, de gesproken vraagzin(nen) ervoor (zinnen op '?', 'Wat denk je?', 'Denk even na.', 'Eerst een voorspelling.') en een los antwoord direct erna ('Antwoord B.', 'Ja.', 'Nee.', 'Precies.'); gewone uitlegzinnen blijven staan. De tijdbalk, tijd en hoofdstuktijden tonen de ingekorte duur. Code: `bkBouw()` maakt `BK.k` (stukken die de speler overslaat); regelnummers in de spelercode zijn daardoor een paar regels verschoven. Hoofdstukkaart 2,2 s in plaats van 3,0 s (duur van de `card`-stukken in `SEGS`).

## Wijziging 16 okt 2026: begrippen als kaartjesraster
Het begrippenblok ziet er nu uit als in de hoofdengine (bv. `films/cellen/van-molecuul-tot-biosfeer.html`): onder de kop "Begrippen" een `<div id="glossary">` met per begrip een kaartje `<div class="term"><b>begrip</b><p>uitleg</p></div>` (raster `repeat(auto-fill,minmax(260px,1fr))`). Volgorde en tekst van de begrippen zijn ongewijzigd; extra kolommen (bron, hoofdstuknummer) staan klein onder de uitleg in `<p class="gl-meta">`. De opmaak staat in `<style id="glossary-stijl">` vlak voor `</head>` (kleuren via de variabelen van deze pagina). Nieuw begrip: voeg een kaartje toe in `#glossary`. Omgezet met een script; regelnummers verderop in dit bestand kunnen enkele regels verschoven zijn. De kop "Begrippen" is een `<h2 class="gl-kop">` met dezelfde opmaak als op de voorbeeldpagina (Fraunces 700, 30px, regelhoogte 1,5, marge 0 0 12px; het lettertype zit als `@font-face` 'Fraunces Begrippen' in `#glossary-stijl`, kleur = tekstkleur van deze pagina).
