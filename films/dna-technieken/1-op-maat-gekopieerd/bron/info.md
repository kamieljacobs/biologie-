# Op maat gekopieerd — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/dna-technieken/1-op-maat-gekopieerd/index.html (audio: `narration.mp3` ernaast). Eerder een Claude-artifact: https://claude.ai/code/artifact/be1e7bbe-e856-4496-9531-669af4fd4a28 |
| Reeks / nummer | DNA-technieken, film 1 (kop: “Uitlegfilm · PCR · havo en vwo”; titelkaart: “Uitlegfilm bij het practicum DNA-profielen vergelijken”). Hoort bij de PCR-stap van het practicum `tools/dna-profielen/`; vervolg is film 2 “Op lengte gesorteerd” (gel) |
| Doelgroep / niveau | havo + vwo; hoofdstuk 3 is verdieping (`verd: true`), met een knop “Sla de verdieping over” voor havo. Geen havo/vwo-schakelaar |
| Versie / datum | onbekend (niet in de HTML) |
| Stem / model | Roos (ElevenLabs, footer); model onbekend (niet in de HTML) |
| Duur | 9:34 (`narration.mp3`, 574,1 s; `OMG_TL.duration` = 574,046 s), zonder de bedenktijd van 8 s bij elk van de 6 vragen |
| Beeldstijl | Eigen ontwerp “Labjournaal” van vóór de Part C-stijlkaart: donkere werkbank (#0D1418) met ruitjes, krijtkleurige tekst, alles op één canvas van 1920 × 1080; vaste beeldsystemen: gel op een lichtbak, PCR-buisje, chromosoom 12, moleculenveld, laddermodel met basen + temperatuurbalk, strengenbord, turflijst, grafieken. Kleurcode: primer amber, lang product blauw (`ink`), op maat groen (`ok`), STR roze, Taq paars. Lettertypen Instrument Serif, IBM Plex Sans en Plex Mono ingebed |
| Audio-opslag | één doorlopende take als los bestand `narration.mp3` naast de HTML (niet als base64), met stiltes op de plekken van de hoofdstukkaarten. De 8 blobs (001–008.woff2) zijn alleen lettertypen |
| Reconstructie | 2026-10-12, uit de artifact-versie, verhuisd naar de site |

## Opbouw

| Begin | Hoofdstuk | Regels | Type | Kernbeeld |
|---|---|---|---|---|
| 0:01 | 0 Koude opening (lijst: “Opening”) | 5 | — | jouw gel uit het practicum (M50, Sp, NC) met de heldere band van 172 bp in baan Sp; buisje met een paar honderd stippen; chromosoom 12 met loep; daarna titelkaart |
| 0:23 | 1 Wat zit er in het buisje? | 20 | onderdelen en functie | inzoomen in het buisje: moleculenveld (template, primers, Taq, nucleotiden, Mg²⁺); wat is een STR (TCTA ×16 vs ×14); templatebeeld met primerplaatsen; Taq uit hete bron; tweeluik “verlengen kan alleen vanaf een primer” |
| 1:58 | 2 Eén cyclus | 20 | proces in stappen | laddermodel met basen en temperatuurbalk: denatureren 95 °C (waterstofbruggen breken één voor één), gewoon enzym vs Taq, annealing 55–60 °C met mismatch-primer, verlengen 72 °C, 5′/3′, schema van beide strengen |
| 3:35 | 3 Van te lang naar precies goed (verdieping) | 24 | proces in tijd | strengenbord: één molecuul door cyclus 1–3, lange producten met rafelig 3′-uiteinde, strengen op maat, liniaal 172; turflijst; samenvatting r23–24 voor iedereen |
| 5:43 | 4 Tellen | 17 | kwantitatief model | turflijst lange producten; lineaire en exponentiële grafiek; 2¹⁰ ≈ duizend; zee van groene stippen met 60 blauwe; model vs werkelijkheid met plateau |
| 7:21 | 5 Gevoelig voor besmetting | 11 | toepassing / controle | rek met buisjes (Sp, Eig, A, B, C, NC), pipet; gel met band in NC; vreemd DNA in het NC-buisje; nieuwe pipetpunt per buisje |
| 8:17 | 6 Terug naar de gel | 11 | terug naar de opening | gel en buisje → wolken moleculen op maat; STR in het product; allel 14 (164 bp) naast 16 (172 bp); meerdere STR’s; eindkaart |

Begintijden = `OMG_TL.chapters[].t` (begin van de hoofdstukkaart, 3 s). Type-letters A–I uit de prompt staan niet in de HTML; de typering hierboven is beschrijvend.

## Vragen

### Voorspelvragen in de film (`OMG_TL.questions`)

| Nr | Plek | Vraag | Opties | Juist | Niveau |
|---|---|---|---|---|---|
| V1 | H1, 1:39 | Wat gebeurt er als je de primers vergeet? | A. Het polymerase kopieert dan gewoon al het DNA. / B. Er wordt niets gekopieerd. / C. Het begint op willekeurige plekken: je ziet een vage veeg. | B | basis |
| V2 | H2, 2:24 | Wat doet die hitte verder met het DNA? | A. Het valt in kleine stukjes. / B. Vrijwel niets: de strengen blijven heel. / C. Het is daarna onbruikbaar, net als een enzym na verhitten. | B | basis |
| V3 | H3, 4:36 | Waar stopt het polymerase deze keer? | A. Waar de STR ophoudt: het weet waar het stuk eindigt. / B. Aan het eind van de template-streng. / C. Het telt honderdtweeënzeventig nucleotiden en stopt dan. | B | verdieping |
| V4 | H4, 6:10 | Hoeveel lange producten zijn er na 30 cycli, uit dat ene molecuul? | A. Zestig. / B. Nul: ze worden later op maat geknipt. / C. Ruim een miljard. | A | basis |
| V5 | H5, 7:42 | Wat betekent een band in de negatieve controle, op de hoogte van een allel? | A. Goed teken: de PCR werkt. / B. Er is DNA in de PCR gekomen dat daar niet hoort. / C. Primers en polymerase maken ook zonder template DNA. | B | basis |
| V6 | H6, 8:59 | Een ander allel heeft 14 herhalingen in plaats van 16. Waar komt die band? | A. Even ver: het zijn dezelfde primers. / B. Verder. / C. Minder ver. | B | basis |

De gesproken vraag begint steeds met “Wat denk je: …”; het antwoord met “Antwoord B: …”. De afleiders staan in het docentdeel als misconcepties (de tabel “De zes voorspelvragen”).

### Checkvragen (CE-stijl) op de pagina

- **A** Haarwortel, vWA een paar honderd keer: a) waarom zonder PCR geen band; b) waarom na PCR één scherpe band en geen veeg. *Antwoord:* te weinig moleculen om na kleuring te zien; alleen het stuk tussen de primers wordt gekopieerd, bijna alles is op maat en even lang, lange producten te weinig.
- **B** vWA: lengte = 108 + 4 × n, allelen 14 en 17. *Antwoord:* 164 en 176 bp; 164 komt het verst; primers liggen buiten de STR.
- **C** Eén molecuul: aantal na 20 cycli; waarom na 40 veel minder dan 2⁴⁰. *Antwoord:* 2²⁰ = 1 048 576; te weinig polymerase, strengen op maat binden weer aan elkaar (ook goed: primers op, Taq verliest activiteit; niet goed: nucleotiden op).
- **D** (verdieping) Na drie cycli: 2 moleculen op maat en 6 lange producten; na 30 cycli 60 lange producten (lineair); ze verdwijnen niet maar vallen in het niet.
- **E** Vier buisjes, één pipetpunt, band van 172 bp in de negatieve controle. *Antwoord:* water i.p.v. DNA; besmetting via de pipetpunt; andere banden onbetrouwbaar, PCR overdoen.
- **F** a) Waarom Taq; b) annealing bij 40 °C i.p.v. ~57 °C. *Antwoord:* Taq overleeft 95 °C, werkt snel rond 72 °C; bij 40 °C binden primers ook half: extra banden of een veeg.

## Begrippen

- **template** — De DNA-streng die wordt gekopieerd: eerst het DNA uit het spoor, later ook de kopieën zelf.
- **primer** — Kort stukje enkelstrengs DNA (± 20 nucleotiden) dat op één plek past. Het is het begin (5′-uiteinde) van elke nieuwe streng.
- **DNA-polymerase (Taq)** — Enzym dat nucleotiden aan het 3′-uiteinde vastzet. Taq komt uit Thermus aquaticus en overleeft 95 °C.
- **denatureren** — Stap 1, 95 °C: de waterstofbruggen breken en de strengen gaan uit elkaar. De strengen zelf blijven heel.
- **primers binden (annealing)** — Stap 2, 55–60 °C: primers blijven zitten waar alle basen passen.
- **verlengen (extensie)** — Stap 3, 72 °C: Taq verlengt de primer, telkens met een passende nucleotide.
- **5′- en 3′-uiteinde** — De twee verschillende uiteinden van een streng. Nieuwe nucleotiden komen er altijd bij aan het 3′-uiteinde.
- **lang product** — Kopie van een origineel: begint bij een primer en loopt door tot de verlengstap voorbij is. Er komen er maar twee per cyclus bij (lineair).
- **streng / molecuul op maat** — Van primer tot primer. Ontstaat als een kopie van een kopie wordt gemaakt. Moleculen op maat heten ook korte producten en verdubbelen elke cyclus (exponentieel).
- **plateau** — In het echt vlakt de hoeveelheid DNA af, onder meer omdat het polymerase te veel templates tegelijk krijgt en strengen op maat weer aan elkaar binden.
- **negatieve controle** — Hetzelfde PCR-mengsel met water in plaats van DNA. Een band hierin betekent besmetting.
- **STR en allel** — Short tandem repeat: een korte herhaling (hier TCTA). Allelen verschillen in het aantal herhalingen, dus in de lengte van het product.

Geen vwo-markering in de begrippenlijst; lang product / streng op maat horen inhoudelijk bij de verdieping (H3).

## Docentdeel

Ondertitel: “De film duurt 9:34, zonder de bedenktijd bij de vragen. Hij hoort bij de PCR-stap van het practicum DNA-profielen vergelijken en gebruikt dezelfde getallen: vWA, lengte = 108 + 4 × n, het bloedspoor in baan Sp.”

- **Zo gebruik je de film**: modi Leerling (8 s bedenktijd, daarna verder) en Klas (wacht op Verder); havo slaat H3 over met de knop; sneltoetsen (spatie, pijltjes ±5 s, C, F, A/B/C).
- **Leerdoelen** (8): waarom PCR; onderdelen van het mengsel en hun functie (template, primers, Taq, nucleotiden, buffer met Mg²⁺); drie stappen en temperaturen (95 / 55–60 / 72 °C); product begrensd door de primers, lengte hangt af van het aantal herhalingen; (verdieping) strengen in de eerste drie cycli; (verdieping) exponentieel vs lineair; 2ⁿ en plateau; besmetting en negatieve controle.
- **De zes voorspelvragen**: tabel met antwoord en afleiders (misconcepties), zie “Vragen”.
- **Checkvragen A–F**, **Begrippen**, **Transcript** (uitklapbaar, per hoofdstuk, met de voorspelvragen ertussen).
- Footer: “Model: vereenvoudigd en niet op schaal; elke cyclus een perfecte verdubbeling, tenzij anders vermeld.”
- Geen getallentabel met bronnen. Getallen in de film: 172 bp (vWA, 16 herhalingen, 108 + 4 × 16), 164 bp (14 herhalingen), primers ± 20 nt, 95 / 55–60 / 72 °C, “vaak wel duizend nucleotiden”, 2¹⁰ ≈ duizend, 2³⁰ ≈ ruim een miljard, 60 lange producten na 30 cycli.

## Techniek: waar zit wat in de HTML

Regelnummers gelden voor `film.src.html` (uitgepakt met `scripts/filmbron.py`; 3107 regels).

- **Pagina** (r. 1–395): sitenavigatie r. 2 (toegevoegd bij de verhuizing), `<title>`/description r. 3–4 (staan in `<body>`, erfenis van het artifact), fonts r. 6–13 (blobs 001–008), speler-CSS onder `.omg` r. 14–168, pagina-CSS r. 170–231. Kop/lede/meta r. 235–238 (duur “9:34”, “6 hoofdstukken”, “6 voorspelvragen” en de link naar het practicum staan er **hard** in), uitlegblokjes r. 240–244, docentdeel r. 245–270 (voorspelvragentabel r. 254–261, checkvragen r. 262–269, begrippen r. 270), transcript r. 271–393, footer r. 394.
- **Engine** (één IIFE, r. 396–3099):
  - r. 401–972 tekenhulpen en vaste beeldsystemen: `COL`/`FONT` r. 411–428, `drawGel` r. 550, `drawTube` r. 579, `drawChromosome` r. 615, strengenmodel (`PCR`, `runCycles`, `countsAfter`, `boardMap`, `drawStrand`, `drawMolecule`) r. 645–811, `drawTally` r. 814, `drawTempBar` r. 856, `drawLadder` r. 896, `drawTaq` r. 923, `drawQuestionCard` r. 939.
  - r. 973–1156 gedeelde scènehulpen: `cue(id)` r. 992 geeft per hoofdstuk `q.s(i)`/`q.e(i)` (begin/eind van regel i), `q.at(i,f)`, `q.ph(i,j,f)` (frase j), `q.next(i)`, `q.w(i,'woord',f)`. **Woordtijden worden geschat** (`wordTimeIn` r. 1013: lettergrepen verdeeld over de `parts` van de regel); er zijn geen echte woordtijden. `CARD_SUB` (ondertitels van de hoofdstukkaarten) r. 1072, `chapterCard` r. 1080, `titleCard` r. 1102, `header` r. 1120, `drawFrame(ctx,t)` r. 1133 (kiest het hoofdstuk op `t`, doet de overgangen en de kaart).
  - Scènes, elk een functie van de filmtijd `t`: `SCENES.H0` r. 1177 (`H0_GEL` r. 1162), `H1` r. 1484, `H2` r. 1745 (`H2` basen r. 1683), `H3` r. 1988 (`H3S = runCycles(3,5)` r. 1924), `H4` r. 2236, `H5` r. 2517, `H6` r. 2643. Binnen een scène hangt alles aan regelnummers (`s(5)`, `e(18)`) en een paar ankerwoorden.
  - **Speler** `omgMount(root, opts)` r. 2818–3096 (`window.OMG` r. 3098): bouwt de UI, één `Audio` met `opts.audioSrc`; `tick` volgt `audio.currentTime`; bij `questions[].t` pauzeert hij (`ask`), na 8 s (`OMG_ASK_SECONDS` r. 2807) of klik op Verder gaat hij door (`resumeQ`); de antwoordregel verdwijnt na `t1` + 0,9 s van de regel `after_line + 1`. Ondertitels: `captionAt` (toont `lines[].text` van `t0` − 0,12 tot `t1` + 0,8 s). Skipknop zichtbaar tussen `skip_verdieping.from_t` en `to_t`. localStorage-sleutels `omg-cc` en `omg-mode`.
- **Tijdlijn** `const OMG_TL` (r. 3103, één JSON-regel): `duration`, `lead` 1,0, `card` 3,0, `chapters[]` (`id`, `title`, `t` = begin kaart, `t_first` = einde kaart, `t_end`), `lines[]` (108 × `ch`, `i`, `t0`, `t1`, `parts` = spraakdelen [begin, eind], `text`, `verd`), `questions[]` (`ch`, `t`, `after_line`, `q`, `options` [[letter, tekst]], `answer`), `skip_verdieping` {from_t 215,431, to_t 329,685}. Volgens het commentaar komt dit uit `narration/timeline.json` (werkbestand, niet in de repo).
- **Audio**: `const AUDIO_SRC = "narration.mp3"` r. 3104; `OMG.mount(#film, {audioSrc, timeline: OMG_TL})` r. 3105.
- **Ankerwoorden** (`q.w(regel, woord)`) per hoofdstuk: H0 r2 heldere, honderdtweeënzeventig; r3 paar; r4 chromosoom, honderdduizenden · H1 r2 PCR; r6 herhaald, kort; r7 verschilt, zestien (in `drawStrExplain`, r. 1441); r5 STR; r9 ene, past, primer, vóór; r10 andere, erachter, past; r20 tussen · H2 r9 Een; r12 valt; r13 verlengen; r19 wijzen · H3 r2 te; r6 voorbij; r9 lang; r12 bouwt; r15 Het; r17 maat; r21 polymerase; r22 twee · H4 r2 model; r3 twee, vier, zes; r7 lineaire; r9 verdubbelen; r10 Moleculen, exponentiële; r11 ongeveer; r15 langzamer; r16 plakken, strengen; r17 plateau · H5 r2 hetzelfde, negatieve, water; r3 band; r5 gekopieerd, juiste, primers; r11 nieuwe · H6 r2 miljard; r4 komen, scherpe; r6 hele; r7 veertien; r8 korter; r9 Verschillen, moeder, vader; r10 Daarom, meerdere. Een woord dat niet (meer) voorkomt valt terug op het begin van de regel.
- **QA**: geen `renderAt`-API; `drawFrame(ctx, t)` is deterministisch maar zit binnen de IIFE.

## Zo pas je deze film aan

1. **Het practicum loopt mee.** `tools/dna-profielen/index.html` bevat een eigen, (op 2026-10-12) byte-gelijke kopie van de volledige engine + speler van deze film (r. 722–3418 daar, `window.OMG`) en van `OMG_TL` (r. 3421 daar), en speelt `../../films/dna-technieken/1-op-maat-gekopieerd/narration.mp3` af (`FILMS.pcr`, r. ±9298, met vaste `fallback: '9:34'`). Elke wijziging aan de scènes, de speler, `OMG_TL` of de audio moet je ook in het practicum doorvoeren, anders loopt het practicum achter (bij nieuwe audio met oude tijdlijn zelfs uit de pas). Hernoem of verplaats `narration.mp3` niet zonder het pad in het practicum aan te passen.
2. **Tekst in beeld wijzigen**: zoek de tekst in de scènefunctie van het hoofdstuk (`SCENES.Hn`) of in `CARD_SUB`/`titleCard`; titels van hoofdstukken in `OMG_TL.chapters[].title`. Ondertiteltekst wijzigen zonder nieuwe audio kan in `OMG_TL.lines[].text` én in het transcript op de pagina (r. 271–393), maar dan klopt de ondertitel niet meer met wat Roos zegt.
3. **Een regel opnieuw inspreken**: de audio is één doorlopende take. Een nieuwe regel betekent `narration.mp3` opnieuw monteren (stuk eruit, nieuw stuk erin) en daarna in `OMG_TL` alle `t0`/`t1`/`parts` vanaf die regel, de `chapters[].t/t_first/t_end`, `questions[].t`, `skip_verdieping` en `duration` opschuiven. Is de nieuwe regel even lang, dan alleen `t0`/`t1`/`parts` van die regel. Scènes hoeven niet mee (ze hangen aan regelnummers), zolang de ankerwoorden blijven bestaan en het aantal regels per hoofdstuk niet verandert; een regel erbij of eraf verschuift alle `s(i)`-verwijzingen in die scène.
4. **Vraag aanpassen**: `OMG_TL.questions[n]` (`q`, `options`, `answer` als letter) én de tabel in het docentdeel (r. 254–261) en het transcript. De gesproken vraag- en antwoordregel staan in de audio. De pauze valt op `questions[].t` (net na de vraagregel); de antwoordregel is `lines` met `i = after_line + 1`.
5. **Duur of aantallen veranderd**: werk “9:34”, “6 hoofdstukken” en “6 voorspelvragen” bij in de meta-regel (r. 238) en het docentdeel (r. 246), plus `fallback` in het practicum.
6. **Inpakken**: werk in een tijdelijke map met `python3 scripts/filmbron.py uitpakken|inpakken|controleer`; de mp3 staat los en hoort er niet in.

## Aandachtspunten

- Gesproken vragen beginnen al met “Wat denk je:” (Kamiels latere keuze); het vraagkaartje in beeld heet wel “Voorspel · wat denk jij?”.
- Uitspraaklijst: de regel met “vijfennegentig graden” (H2 r3) is opgenomen vóór of zonder de latere afspraak “vijf en neguntig graden”; of het goed klinkt is niet uit de HTML af te leiden (stem-invoer onbekend). Ook “template”, “PCR”, “DNA” en “drie-accent-uiteinde” staan op de uitspraaklijst: even naluisteren.
- Geen versie/datum op de pagina; H0 heet in de tijdlijn “Koude opening” en in de hoofdstuklijst “Opening”. Verdieping wordt alleen met een knop en een gestreept tijdlijnsegment gemarkeerd, niet met een havo/vwo-schakelaar.
- Docentdeel heeft geen getallentabel met bronnen (wel een modeldisclaimer in de footer).
- `<title>` en `<meta name="description">` staan na de navigatiebalk in `<body>` (artifact-skelet); werkt in browsers, maar is formeel geen geldige head.

## Wijzigingen
- 15 okt 2026 — Speler: de knop Vragen aan/uit (onthouden in `bk-vragen`, ook `?vragen=uit`) werkt nu altijd, ook na spoelen, in pauze en als je hem halverwege omzet. Bij Vragen uit vallen weg: de vraag zelf, de gesproken vraagzin(nen) ervoor (zinnen op '?', 'Wat denk je?', 'Denk even na.', 'Eerst een voorspelling.') en een los antwoord direct erna ('Antwoord B.', 'Ja.', 'Nee.', 'Precies.'); gewone uitlegzinnen blijven staan. De tijdbalk, tijd en hoofdstuktijden tonen de ingekorte duur. Code: `bkBouw()` maakt `BK.k` (stukken die de speler overslaat); regelnummers in de spelercode zijn daardoor een paar regels verschoven. Hoofdstukkaart 2,2 s in plaats van 3,0 s: de speler slaat het stille midden van de kaart over (narration.mp3 ongewijzigd). Fout hersteld: bij de vraag in H6 knipte Vragen uit de hele antwoordregel weg, ook de uitleg 'Minder herhalingen geeft een korter product…'; nu alleen 'Antwoord B: verder.'
