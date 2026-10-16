# Stambomen lezen en kansen berekenen — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/erfelijkheid/6-stambomen-en-kansrekenen.html |
| Reeks / nummer | Erfelijkheid · film 6 van 6 (op de site: § 3.5) |
| Doelgroep / niveau | vwo bovenbouw (geen havo-/vwo-blokken) |
| Versie / datum | onbekend (niet in de HTML) |
| Stem / model | Roos (ElevenLabs); model onbekend (niet in de HTML) |
| Duur | 4:05 (006.mp3 = 245,66 s; `TL.total` = 245,604 s). De kop zegt "± 4 minuten". |
| Beeldstijl | Volgens codecommentaar "stijlkaart biologiefilms, look Schema": navy, gedempte vullingen, lichte randen, goud = focus; fonts Fraunces / Source Sans 3 / IBM Plex Mono. Schema-look (navy) met stambomen (vierkant/rondje, ingekleurd = aangedaan), mini-stambomen per stap, kansbalken en een 4×4-oppervlaktemodel; NIVEAU-kruimelpad hier familie › persoon › allel (in plaats van organisme › cel › chromosoom). UI-laag: kruimelpaden NIVEAU en WEERGAVE (echt › symbool › schema), legenda, scènetitels linksboven. |
| Audio-opslag | 1 doorlopende take (15 alinea's p01–p13) als base64 in de HTML (blob 006.mp3, `window.__AUDIO_B64__`); 5 fonts als data-URI (blobs 001–005.woff2) |
| Reconstructie | 2026-10-12, uit de gepubliceerde HTML |

## Opbouw
Hoofdstuktypes A–I uit de prompt: niet vastgesteld (de typedefinities staan niet in de HTML); de functie staat erbij.

| Begin | Hoofdstuk | Functie / kernbeeld | Scène |
|---|---|---|---|
| 0:00 | Is Sanne drager? | haak (Is Sanne drager? 'niet ½') | `s1` |
| 0:17 | De taal van een stamboom | notatie (symbolen en generaties, stamboom van Sanne) | `s2` |
| 0:46 | Stap 1: dominant of recessief | stappenplan stap 1 (dominant of recessief; Huntington als dominant patroon) | `s3` |
| 1:17 | Stap 2 en 3 | stappenplan stap 2 en 3 (autosomaal of X; genotypen invullen, A_) | `s4` |
| 1:57 | Twee derde, niet een half | simulatie (300 kinderen van twee dragers → ⅔) | `s5` |
| 2:29 | Product- en somregel | rekenregels (productregel, somregel, toeval heeft geen geheugen) | `s6` |
| 3:04 | Sanne en Tom | toepassing (Sanne × Tom = ⅙, dragerschapstest) | `s7` |
| 3:42 | Stappenplan | stappenplan als samenvatting | `s8` |

## Vragen
| Plek | Vraag (zoals op het scherm) | Opties | Juiste antwoord | Vorm |
|---|---|---|---|---|
| 1:58–2:09 (r. 400) | VOORSPEL: Sanne is gezond. Kans dat zij drager (Aa) is? | open | ⅔ | aftelklok 5 s in een stilte van 6 s |
| 3:05–3:16 (r. 449) | VOORSPEL: Kans dat het kind van Sanne en Tom taaislijmziekte heeft? | open | ⅙ (⅔ × ½ × ½) | aftelklok 5 s in een stilte van 6 s |

Alle vragen: niveau vwo bovenbouw. Het antwoord wordt steeds in de eerstvolgende alinea gesproken.

## Begrippen
Zoals op de pagina (geen vwo-markering; de hele film is vwo):
- stamboom — schema van een familie; vierkant = man, rondje = vrouw, ingekleurd = heeft de eigenschap
- drager — persoon met één recessief allel (Aa) die de eigenschap zelf niet heeft
- A_ — notatie voor een gezond persoon van wie je alleen weet dat er minstens één A is (AA of Aa)
- autosomaal — het gen ligt op een van de chromosomen 1–22, niet op X of Y
- productregel — kans dat onafhankelijke gebeurtenissen allemaal gebeuren = product van de kansen
- somregel — kans dat de ene óf de andere (elkaar uitsluitende) gebeurtenis gebeurt = som van de kansen
- voorwaardelijke kans — kans als je al iets weet; een gezond kind van twee dragers is met kans ⅔ drager

## Docentdeel
Inklapbaar blok "Voor de docent" met:
- **Hoe de film het uitlegt**: De film start met Sanne, gezond, met een broer met taaislijmziekte. De misvatting 'kans op drager is ½' wordt meteen benoemd. Daarna de symbolen, een stappenplan (1 dominant/recessief, 2 autosomaal/X, 3 genotypen, 4 kans) en een simulatie van 300 kinderen van twee dragers: door de zieke kinderen weg te halen, zie je dat ⅔ van de gezonde kinderen drager is. De product- en somregel worden met een oppervlaktemodel (4×4-raster) en een staafverdeling getoond. Tot slot Sanne × Tom (drager): ⅔ × ½ × ½ = ⅙, en wat een dragerschapstest verandert (¼ of 0).
- **Misvattingen**: Een gezond kind van twee dragers is met kans ½ drager (het is ⅔); Na een ziek kind is de kans voor het volgende kind kleiner (toeval heeft geen geheugen); Een eigenschap die een generatie overslaat, is dominant
- **Pauzemomenten**: Kans dat Sanne drager is? (⅔); Kans dat het kind van Sanne en Tom ziek is? (⅙)
- **Vereenvoudigd**: Dat de grootouders geen genotype krijgen dan A_ is correct: je weet alleen dat één grootouder aan elke kant het allel doorgaf; Stap 2 laat alleen het X-recessieve criterium zien; bij dominant X-chromosomaal geldt: een aangedane vader heeft alleen aangedane dochters

## Techniek: waar zit wat in de HTML
Regelnummers in `film.src.html` (uitgepakt met `scripts/filmbron.py`). Films 2–6 delen dezelfde bouwvorm: de regels 73–285 (kern, tekenhulpen, "shared library for films 2-6" r. 153, ongebruikte enzymsimulatie `runSim` r. 227) zijn in alle vijf identiek, net als de speler na `FILM`. Alleen het filmspecifieke blok vanaf r. 286 verschilt. Film 1 heeft een eigen, oudere opbouw.

- **Pagina**: kop r. 49 (h1 "Stambomen lezen en kansen berekenen" + "± 4 minuten"), `<title>` r. 2 ("Stambomen en kansrekening"), begrippen r. 66, docentdeel r. 68, credits "Stem: Roos (ElevenLabs)" r. 69.
- **Script, ondertitels en timing**: één regel, r. 71: `window.__TIMELINE__={"total","paras":[{"key","start","dur","words":[{"w","s","e"}]}]}` + `window.__AUDIO_B64__="@@BLOB:006.mp3@@"`. Woordtijden zijn absolute seconden in de ene take. Ondertitels worden hieruit gebouwd met `SENT`/`setCap` (r. 502).
- **Cues**: `Q(key,woord,n)` / `QE` r. 93 (zoekt het n-de woord, leestekens genegeerd, terugval 'begint met'); `PS`/`PE` = begin/eind van een alinea. Alle tijden in `initCues()` r. 288 → object `K` (scènestarts `K.s2…`, vragen `K.q1`, aftelklok `K.cd1a`/`K.cd1b` = `PE+0,3` … `+5`).
- **Scènes**: `s1` r. 317, `s2` r. 331, `s3` r. 350, `s4` r. 370, `s5` r. 387, `s6` r. 419, `s7` r. 440, `s8` r. 466. `FILM` r. 469: `title`, `sub`, `levels`, `scenes()` (start = `K.sN`, eind = volgende start + 0,9 s, `fade` 0,9 s), `levelAt`, `repAt`, `legend`, `note`, `chapters()`.
- **Gedeelde helpers** (r. 153–223): o.a. `plant`, `chipG` (allelchips), `grid`, `meiosis`, `dotColumns`/`spawnTimes` (stippen-simulaties), `ratioText`, `frac`, `sceneTitle`, `legendBox`, stamboomsymbolen `pedSym`/`pedCouple`/`pedKids`; kaarten `card`, `termCard`, `misc` (r. 145), `countdown` (r. 142).
- **Simulatie**: simulatie van 300 kinderen van twee dragers in s5 (r. 403–409). Deterministisch via `mulberry32(seed)`: bij elke weergave dezelfde uitkomst.
- **Vragen**: VOORSPEL-kaarten r. 400, 449.
- **Hoofdstukken**: `FILM.chapters()` → `CHAP` r. 545.
- **Audio en speler**: r. 509 base64 → Blob-URL (terugval data-URI); eigen klok die de audio volgt; `render()` r. 488 (kruimelpaden, legenda, titelkaart eerste 1,6 s). Toetsen r. 542: spatie, ←/→ 5 s (shift 30 s), ↑/↓ hoofdstuk. Geen Leerling/Klas- of Havo/Vwo-schakelaar, geen toetsfunctie.

## Zo pas je deze film aan
1. **Tekst op het scherm**: zoek de letterlijke string in het filmblok (`card(`, `termCard(`, `T('…'`, `sceneTitle(`) en pas hem aan. Daarna `python3 scripts/filmbron.py inpakken <map> <film.html>`. Wijzigingen in de gedeelde bibliotheek (r. 73–285) moet je zelf in alle vijf films (2–6) doorvoeren.
2. **Ondertitel wijzigen zonder nieuwe opname**: pas alleen de `w`-waarde in `__TIMELINE__` aan. Let op: de stem zegt dan nog het oude woord, en als het woord een cue-woord is (zie script.md), verschuift de animatie.
3. **Eén alinea opnieuw opnemen**: de audio is één bestand (blob 006.mp3). Vervang het stuk `start…start+dur` van die alinea in de mp3 en houd de stiltes ertussen gelijk (6,0 s na een voorspelvraag!). Laat woordtijden maken (forced alignment) en zet ze in de `paras`-entry. Bij een andere lengte verschuif je `start` en alle `s`/`e` van alle latere alinea's en `total`. Scènes en cues lopen via `Q()`/`PS()` vanzelf mee.
4. **Vraag aanpassen**: kaarttekst op de genoemde regel. Het antwoord zit in de gesproken tekst van de volgende alinea, dus een andere vraag betekent ook een nieuwe opname.
5. **Let op cue-woorden**: haal je een woord weg dat in `initCues` staat, dan valt `Q()` stil terug op het begin van de alinea (alleen `console.warn`). Bij woorden die vaker voorkomen telt het volgnummer (`Q(key,'drie',2)`).

## Aandachtspunten
- De kop zegt "± 4 minuten"; de werkelijke duur is 4:05.
- "Voorwaardelijke kans" staat in de begrippenlijst, maar wordt niet uitgesproken. De film zegt "haal weg wat je al weet".
- Er staan geen misvattingkaarten (`misc(`) in het beeld; de misvatting '½' wordt alleen gesproken en staat als tekst 'dus niet ½' in beeld.
- Het docentdeel zegt zelf dat stap 2 alleen het X-recessieve criterium laat zien.
- In de gedeelde bibliotheek staat de enzymsimulatie uit film 1 (`runSim`, `drawSimPanel`, r. 224–285), maar deze film gebruikt die niet: dode code.
- De stem-invoer en uitspraaklijst staan niet in de HTML. Er zijn geen versie/datum, geen vwo-blokken en geen Havo/Vwo-schakelaar.
- `<title>` ("Stambomen en kansrekening") wijkt af van de h1 ("Stambomen lezen en kansen berekenen").

## Wijzigingen
- 15 okt 2026 — Speler: de knop Vragen aan/uit (onthouden in `bk-vragen`, ook `?vragen=uit`) werkt nu altijd, ook na spoelen, in pauze en als je hem halverwege omzet. Bij Vragen uit vallen weg: de vraag zelf, de gesproken vraagzin(nen) ervoor (zinnen op '?', 'Wat denk je?', 'Denk even na.', 'Eerst een voorspelling.') en een los antwoord direct erna ('Antwoord B.', 'Ja.', 'Nee.', 'Precies.'); gewone uitlegzinnen blijven staan. De tijdbalk, tijd en hoofdstuktijden tonen de ingekorte duur. Code: `bkBouw()` maakt `BK.k` (stukken die de speler overslaat); regelnummers in de spelercode zijn daardoor een paar regels verschoven. Deze film heeft geen hoofdstukkaarten, dus geen hoofdstukpauze om in te korten.

## Wijziging 16 okt 2026: begrippen als kaartjesraster
Het begrippenblok ziet er nu uit als in de hoofdengine (bv. `films/cellen/van-molecuul-tot-biosfeer.html`): onder de kop "Begrippen" een `<div id="glossary">` met per begrip een kaartje `<div class="term"><b>begrip</b><p>uitleg</p></div>` (raster `repeat(auto-fill,minmax(260px,1fr))`). Volgorde en tekst van de begrippen zijn ongewijzigd; extra kolommen (bron, hoofdstuknummer) staan klein onder de uitleg in `<p class="gl-meta">`. De opmaak staat in `<style id="glossary-stijl">` vlak voor `</head>` (kleuren via de variabelen van deze pagina). Nieuw begrip: voeg een kaartje toe in `#glossary`. Omgezet met een script; regelnummers verderop in dit bestand kunnen enkele regels verschoven zijn. De kop "Begrippen" is een `<h2 class="gl-kop">` met dezelfde opmaak als op de voorbeeldpagina (Fraunces 700, 30px, regelhoogte 1,5, marge 0 0 12px; het lettertype zit als `@font-face` 'Fraunces Begrippen' in `#glossary-stijl`, kleur = tekstkleur van deze pagina).
