# Op lengte gesorteerd — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/dna-technieken/2-op-lengte-gesorteerd/index.html (audio: `gelfilm.mp3` ernaast). Eerder een Claude-artifact: https://claude.ai/code/artifact/fb8446f3-3585-4363-ace0-f6e2af17ccc8 |
| Reeks / nummer | DNA-technieken, film 2 (kop: “Uitlegfilm · gel-elektroforese · havo en vwo”; titelkaart: “Uitlegfilm bij het practicum DNA-profielen vergelijken”). Hoort bij de stap Gelfoto van het practicum `tools/dna-profielen/`; vervolg op film 1 “Op maat gekopieerd” (PCR), waarnaar de meta-regel linkt |
| Doelgroep / niveau | havo + vwo, één niveau; geen verdieping, geen voorspelvragen (`questions: []`) |
| Versie / datum | onbekend (niet in de HTML) |
| Stem / model | Roos (ElevenLabs, footer); model onbekend (niet in de HTML) |
| Duur | 3:59 (`gelfilm.mp3`, 239,6 s; `OLG_TL.duration` = 239,589 s) |
| Beeldstijl | Zelfde eigen ontwerp “Labjournaal” als film 1 (van vóór de Part C-stijlkaart): donkere werkbank met ruitjes, alles op één canvas van 1920 × 1080; centrale beeld is de gelfoto van het practicum (9 banen: M50, Eig, Sp, A, B, C, PC, NC, AL) plus een gelbak van bovenaf, putje in doorsnede, agarose-netwerk in een loep, uitsneden van de gel, mini-gels en samenvattingskaartjes. Kleur per locus (TPOX geel, AMEL paars, D8 lichtblauw, vWA roze, D3 groen). Lettertypen Instrument Serif, IBM Plex Sans en Plex Mono ingebed |
| Audio-opslag | één doorlopende take als los bestand `gelfilm.mp3` naast de HTML (niet als base64), met stiltes van ± 2,8 s op de plekken van de hoofdstukkaarten. De 8 blobs (001–008.woff2) zijn alleen lettertypen (dezelfde als in film 1) |
| Reconstructie | 2026-10-12, uit de artifact-versie, verhuisd naar de site |

## Opbouw

| Begin | Hoofdstuk | Regels | Type | Kernbeeld |
|---|---|---|---|---|
| 0:01 | 0 Opening (geen kaart) | 3 | — | gelfoto ‘ontwikkelt’; banen gegroepeerd, één band (Sp 140 bp) = DNA van één lengte; “Hoe lees je zo’n foto? En kun je hem vertrouwen?”; titelkaart |
| 0:16 | 1 Hoe de gel werkt | 9 | mechanisme | gelbak van bovenaf met elektroden en putjes; rechts per regel een detail: agarose-netwerk, putje met laadbuffer, DNA met negatieve fosfaatgroepen naar +, putjes goed/fout geplaatst, kort glipt / lang blijft haken, één baan versneld, kopieën → één band, 1% tegen 4%, kleuren en blauw licht |
| 1:07 | 2 Lengte aflezen | 8 | vaardigheid stap voor stap | uitsnede M50 / Sp / AL; marker als staafjes; band tussen 100 en 150 → ± 140 bp; stappen worden naar boven kleiner; lengtegebieden per STR; formulekaart 88 + 4 × n → allel 13; allelladder |
| 2:00 | 3 Profielen vergelijken | 8 | toepassing | twee allelen per STR (mini-gel, homo/heterozygoot); amelogenine; lijnen door de banden van het spoor; verdachte B valt af, A past; kansladder (1 op 16 → 1 op 20 000 → 1 op een miljard) |
| 2:53 | 4 Controles en rare banden | 8 | betrouwbaarheid | NC met primer-dimeren en (tijdelijk) besmetting, PC met vinkjes en (tijdelijk) leeg; inzoom stotterband (n − 1, 4 bp korter); mengsel met drie banden (Eig, Mix, A) |
| 3:46 | 5 Samengevat (geen kaart) | 2 | samenvatting | vier kaartjes: sorteren, aflezen, controles, vergelijken; eindkaart |

Begintijden = `OLG_TL.chapters[].t`. Hoofdstukken 1–4 hebben een kaart van 2,2 s (`card: true`, “HOOFDSTUK n VAN 4”); Opening en Samengevat niet. Type-letters A–I uit de prompt staan niet in de HTML; de typering hierboven is beschrijvend.

## Vragen

### Voorspelvragen in de film

Geen (`OLG_TL.questions` is leeg; de Leerling/Klas-knoppen worden daarom niet getoond). Het docentdeel zegt: “Geen voorspelvragen: de film loopt door. Er zijn wel checkvragen hieronder.”

### Checkvragen (CE-stijl) op de pagina

- **A** Gel 4%, band tussen 150 en 200, dichter bij 150. *Antwoord:* ± 168 bp; vWA (164–184); n = (168 − 108) / 4 = 15.
- **B** Waarom de putjes bij de zwarte elektrode? *Antwoord:* DNA is negatief en loopt naar + (rood); omgekeerd loopt het de buffer in en zie je geen banden.
- **C** STR-producten 60–220 bp op 1% agarose. *Antwoord:* banden op een kluitje ver in de gel, 4 bp niet te onderscheiden; grote gaatjes.
- **D** D8S1179: felle band 140 bp, zwakke 136 bp. *Antwoord:* allel 13 (homozygoot); 136 is een stotterband.
- **E** NC gel 1: vage vlek ± 46 bp; NC gel 2: scherpe band 176 bp. *Antwoord:* gel 1 in orde (primer-dimeren); gel 2 besmet, PCR overdoen.
- **F** D3S1358: spoor 200 / 204 / 208 (zwak), eigenaar 200 + 208, A 200 + 204. *Antwoord:* mengsel; A past op deze STR, extra band door de eigenaar; vergelijk alle STR’s.

## Begrippen

- **agarosegel** — Plak agarose: een netwerk van lange suikerketens met kleine gaatjes. Hoe meer agarose, hoe kleiner de gaatjes.
- **elektroforese** — DNA met elektrische spanning door een gel laten bewegen. De stukken worden gesorteerd op lengte: hoe korter, hoe verder.
- **putje en laadbuffer** — In het putje pipetteer je het PCR-product met laadbuffer. Die is zwaar (glycerol), zodat het monster naar de bodem zakt, en bevat blauwe kleurstof.
- **marker** — Mengsel van DNA-stukken met bekende lengte (hier 50, 100, 150 … bp). Daarmee lees je de lengte van een band af.
- **allelladder** — Mengsel van alle allelen van de STR-kit. Ligt een band even hoog als een ladderband, dan is het hetzelfde allel.
- **band** — Heel veel kopieën van één lengte die even ver door de gel zijn gekomen.
- **basenpaar (bp)** — Eenheid voor de lengte van dubbelstrengs DNA.
- **homozygoot / heterozygoot** — Twee dezelfde allelen: één band, extra fel. Twee verschillende allelen: twee banden.
- **amelogenine** — Stuk DNA op het X- en het Y-chromosoom: X geeft 106 bp, Y 112 bp. Alleen X is een vrouw, X en Y een man.
- **negatieve controle** — PCR-mengsel met water in plaats van DNA. Hoort leeg te zijn, op primer-dimeren na. Een echte band betekent besmetting.
- **positieve controle** — DNA met een bekend profiel. Zie je precies die banden, dan werkten de PCR en de gel.
- **stotterband** — Zwakke band precies één herhaling (4 bp) onder een sterke band. Ontstaat bij de PCR en is geen allel.
- **primer-dimeer** — Twee primers die aan elkaar plakken en samen gekopieerd worden: een vage vlek onderaan (± 46 bp).
- **mengsel** — DNA van meer personen in één monster: bij een STR meer dan twee banden, vaak verschillend van sterkte.

Geen vwo-markering.

## Docentdeel

Ondertitel: “De film duurt 3:59 en hoort bij de stap Gelfoto van het practicum DNA-profielen vergelijken. Hij gebruikt dezelfde kit, marker en getallen: vijf loci, lengte = flank + 4 × n, een marker van 50 bp en een allelladder.”

- **Zo gebruik je de film**: Leerling kijkt vóór het aflezen van de eigen gel; Klas: pauzeer na H2 (checkvraag A), na H3 checkvraag F; geen voorspelvragen; **vereenvoudiging**: forensische labs gebruiken capillaire elektroforese met fluorescente primers, niet agarose; sneltoetsen.
- **Leerdoelen** (7): DNA naar + door fosfaatgroepen, putjes bij −; sorteren op lengte, één band per lengte; 3–4% agarose voor korte STR-producten; lengte schatten met de marker (markerbanden vlak bij de band); STR en allel bepalen met flank + 4 × n; profielen vergelijken (homo/heterozygoot, uitsluiten bij één verschil); controles, stotterbanden, primer-dimeren, mengsels.
- **Checkvragen A–F**, **Begrippen**, **Transcript** (uitklapbaar, per hoofdstuk).
- Footer: “Model: vereenvoudigd en niet op schaal; fictieve profielen met de kit en allelfrequenties van het practicum.”
- Geen getallentabel met bronnen. De kit in de code (`KIT`, gelijk aan het practicum):

| Locus | Chromosoom | Flank | Lengtegebied (bp) | Allelen |
|---|---|---|---|---|
| TPOX | 2 | 36 | 68–84 | 8–12 |
| amelogenine | X/Y | — | 106 (X), 112 (Y) | X, Y |
| D8S1179 | 8 | 88 | 128–152 | 10–16 |
| vWA | 12 | 108 | 164–184 | 14–19 |
| D3S1358 | 3 | 140 | 196–212 | 14–18 |

Profielen (`PROFILES`): Eig XX, TPOX 8/11, D8 12/15, vWA 17/17, D3 15/17 · Sp en A XY, 8/10, 13/14, 16/16, 15/16 · B als Sp maar TPOX 8/11 · C XY, 9/11, 11/15, 15/18, 14/17 · PC XX, 8/8, 13/13, 17/18, 14/15. Kansladder H3 (`RMP_ROWS`): TPOX 1 op 16 → + D8S1179 1 op 120 → + vWA 1 op 2 700 → + D3S1358 1 op 20 000 (berekend met de allelfrequenties van het practicum; bron onbekend, niet in de HTML).

## Techniek: waar zit wat in de HTML

Regelnummers gelden voor `film.src.html` (uitgepakt met `scripts/filmbron.py`; 2298 regels).

- **Pagina** (r. 1–311): sitenavigatie r. 2 (toegevoegd bij de verhuizing), `<title>`/description r. 3–4 (in `<body>`), fonts r. 6–13 (blobs 001–008), CSS tot r. 232. Kop/lede/meta r. 235–238 (duur “3:59”, “4 hoofdstukken” en links naar het practicum en film 1 **hard** erin), uitlegblokjes r. 240–244, docentdeel r. 245–263 (leerdoelen r. 254, checkvragen r. 255–262, begrippen r. 263), transcript r. 264–309, footer r. 310.
- **Engine** (één IIFE, r. 312–2291), een afgeleide van die van film 1:
  - r. 317–472 tekenhulpen (`COL` met extra kleuren blue/dye/red/neg), `drawTaq`.
  - r. 473–664 gedeelde scènehulpen: `N_CHAP = 4` r. 481; `cue(id)` r. 493 (zelfde API als film 1: `q.s(i)`, `q.e(i)`, `q.at`, `q.ph`, `q.next`, `q.w`). **Woordtijden geschat** (`wordTimeIn` r. 515) en gebaseerd op `lines[].say` als die er is (getallen voluit), anders op `text`. `CARD_SUB` r. 577, `chapterCard` r. 583, `titleCard` r. 616, `header` r. 628, `drawFrame` r. 640 (hoofdstukken met `card: false` krijgen een korte cross-fade zonder kaart).
  - r. 665–845 de gel: `KIT` r. 672, `PROFILES` r. 684, `profileBands` r. 696 (homozygoot = dubbel zo fel, stotterband op n − 1 met 10 % intensiteit, primer-dimeer 46 bp), `LANE_BANDS` r. 716, `gelGeo` r. 727, `drawGelPhoto` r. 804 (gecachete laag), hulpen `laneBox`, `dimLanes`, `bandRing`, `bandFlash`, `guideLine`, `laneTag`; `FULL_G` r. 851.
  - Scènes: `SCENES.H0` r. 854, `H1` r. 1205 (gelbak `BOX`/`drawGelBox` r. 939–999, helpers tot r. 1204), `H2` r. 1373 (`ZOOM_G` r. 1347), `H3` r. 1558 (`MINI`, `RMP_ROWS` r. 1540–1556), `H4` r. 1757 (`CTRL_G`, `STUT_G`, `MIX_BANDS`, `MIX_G` r. 1718–1755), `H5` r. 1927 (`sumCard` r. 1918).
  - **Speler** `omgMount` r. 2007 (`window.OLG` r. 2289): dezelfde speler als film 1, met `opts.title`; de vraag-, modus- en skiplogica is aanwezig maar slapend (geen `questions`, `skip_verdieping` ontbreekt). localStorage-sleutels krijgen voorvoegsel `olg-` (r. 1999), zodat ze niet botsen met film 1 in het practicum.
- **Tijdlijn** `const OLG_TL` (r. 2294, één JSON-regel): `duration` 239,589, `lead` 0,8, `card` 2,2, `chapters[]` (met `card` true/false), `lines[]` (38 × `ch`, `i`, `t0`, `t1`, `parts`, `text`, soms `say`), `questions: []`.
- **Audio**: `const AUDIO_SRC = "gelfilm.mp3"` r. 2295; `OLG.mount(#film, {audioSrc, timeline: OLG_TL, title})` r. 2296.
- **Ankerwoorden** (`q.w`): H1 r1 agarose, gaatjes; r2 laadbuffer; r6 hoe; r8 drie · H2 r1 vijftig, honderd, honderdvijftig, enzovoort (uit `say`). De overige scènes hangen aan regelbegin/-eind en frasen (`q.ph`). Verdwijnt een ankerwoord, dan valt het beeldmoment terug op het begin van de regel.

## Zo pas je deze film aan

1. **Het practicum loopt mee.** `tools/dna-profielen/index.html` bevat een eigen, (op 2026-10-12) byte-gelijke kopie van de volledige engine + speler van deze film (r. 3427–5398 daar, `window.OLG`) en van `OLG_TL` (r. 5401 daar), en speelt `../../films/dna-technieken/2-op-lengte-gesorteerd/gelfilm.mp3` af (`FILMS.gel`, r. ±9299, met vaste `fallback: '3:59'`). Elke wijziging aan de scènes, de speler, `OLG_TL` of de audio moet je ook in het practicum doorvoeren, anders loopt het practicum achter. Hernoem of verplaats `gelfilm.mp3` niet zonder het pad in het practicum aan te passen.
2. **Kit of profielen wijzigen**: `KIT`, `PROFILES`, `RMP_ROWS`, `MIX_BANDS` en de getallen in de tekst (140 bp, 88 + 4 × n, allel 13) moeten blijven kloppen met het practicum en met film 1 (Sp vWA 16/16 = 172 bp). Een ander profiel verandert de gelfoto in alle hoofdstukken.
3. **Een regel opnieuw inspreken**: één doorlopende take. Monteer het nieuwe stuk in `gelfilm.mp3` en schuif in `OLG_TL` alle latere `t0`/`t1`/`parts`, `chapters[].t/t_first/t_end` en `duration` op. Bij getallen: zet de uitgeschreven stem-invoer in `say` (die gebruikt `wordTimeIn`) en de cijfers in `text` (ondertitel). Werk het transcript op de pagina bij.
4. **Tekst in beeld wijzigen**: in de scènefunctie (`SCENES.Hn`) of `CARD_SUB`/`titleCard`; hoofdstuktitels in `OLG_TL.chapters[].title`. Een regel toevoegen of verwijderen verschuift de regelnummers waaraan de scène hangt.
5. **Voorspelvragen toevoegen** kan zonder spelercode: vul `OLG_TL.questions` (zelfde vorm als film 1: `ch`, `t`, `after_line`, `q`, `options`, `answer`); de Leerling/Klas-knoppen verschijnen dan vanzelf. De gesproken vraag en het antwoord moeten wel in de audio.
6. **Inpakken**: werk in een tijdelijke map met `python3 scripts/filmbron.py uitpakken|inpakken|controleer`; de mp3 staat los en hoort er niet in.

## Aandachtspunten

- Geen voorspelvragen, in afwijking van de prompt (v4/Part C) en van film 1; bewust zo gekozen volgens het docentdeel.
- Opening en Samengevat hebben geen hoofdstukkaart; de hoofdstuklijst toont ze met “0” en “·”.
- Uitspraak: in de stem-invoer staat “iks en ei” voor X en Y; getallen worden voluit ingevoerd (“honderdveertig”, “achtentachtig”). “DNA”, “PCR” en “STR’s” staan als gewone tekst; naluisteren tegen de uitspraaklijst.
- Geen versie/datum op de pagina; docentdeel zonder getallentabel met bronnen; de kansen in de kansladder staan zonder bron.
- `<title>` en `<meta name="description">` staan na de navigatiebalk in `<body>` (artifact-skelet).

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

Weg: de wijspijl naar het kaartje 'één band = DNA van één bepaalde lengte' (opening; kaartje staat direct naast de band) en de wijspijl naar '13' bij de allelladder (H2; '13' staat direct naast de ladderband). Hulplijnen tussen banden (zelfde hoogte) en pijlen voor looprichting zijn gebleven (Kamiel: "die lijntjes naar begrippen moeten sowieso weg"; zie `films/BEELDAFSPRAKEN.md`). Gecontroleerd op contactbladen. Regelnummers elders in dit bestand kunnen een paar regels verschoven zijn.
