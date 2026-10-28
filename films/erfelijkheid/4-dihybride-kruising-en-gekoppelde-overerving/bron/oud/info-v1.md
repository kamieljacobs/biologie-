# Dihybride kruisingen en gekoppelde genen — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/erfelijkheid/4-dihybride-kruising-en-gekoppelde-overerving.html |
| Reeks / nummer | Erfelijkheid · film 4 van 6 (op de site: § 3.5) |
| Doelgroep / niveau | vwo bovenbouw (geen havo-/vwo-blokken) |
| Versie / datum | onbekend (niet in de HTML) |
| Prompt | onbekend |
| Stem / model | Roos (ElevenLabs); model onbekend (niet in de HTML) |
| Duur | 4:22 (006.mp3 = 262,16 s; `TL.total` = 262,132 s). De kop zegt "± 4,5 minuten". |
| Beeldstijl | Volgens codecommentaar "stijlkaart biologiefilms, look Schema": navy, gedempte vullingen, lichte randen, goud = focus; fonts Fraunces / Source Sans 3 / IBM Plex Mono. Schema-look (navy) met macro-elementen: erwten (geel/groen, rond/gerimpeld) en fruitvliegen; chromosoomparen in meiose I, 4×4-schema, genkaart. UI-laag: kruimelpaden NIVEAU en WEERGAVE (echt › symbool › schema), legenda, scènetitels linksboven. |
| Audio-opslag | 1 doorlopende take (15 alinea's p01–p15) als base64 in de HTML (blob 006.mp3, `window.__AUDIO_B64__`); 5 fonts als data-URI (blobs 001–005.woff2) |
| Reconstructie | 2026-10-12, uit de gepubliceerde HTML |

## Opbouw
Hoofdstuktypes A–I uit de prompt: niet vastgesteld (de typedefinities staan niet in de HTML); de functie staat erbij.

| Begin | Hoofdstuk | Functie / kernbeeld | Scène |
|---|---|---|---|
| 0:00 | Twee eigenschappen tegelijk | haak (nieuwe combinaties in de F2) | `s1` |
| 0:21 | Onafhankelijke verdeling | notatie + mechanisme + simulatie (GgRr op twee chromosoomparen; twee liggingen in meiose I, honderden cellen → 4 gametsoorten van elk ¼; onafhankelijke overerving) | `s2` |
| 1:10 | 9 : 3 : 3 : 1 | schema + echte data (4×4, 9 : 3 : 3 : 1, Mendels 315/101/108/32), productregel, terugkruising 1 : 1 : 1 : 1 | `s3` |
| 2:15 | Gekoppelde genen en crossing-over | mechanisme (koppeling en crossing-over bij de fruitvlieg, 17 %) | `s4` |
| 3:27 | Genkaart | toepassing (genkaart A–B 10 %, A–C 30 %) | `s5` |
| 3:52 | Samenvatting | samenvatting | `s6` |

## Vragen
| Plek | Vraag (zoals op het scherm) | Opties | Juiste antwoord | Vorm |
|---|---|---|---|---|
| 1:11–1:21 (r. 350) | VOORSPEL: Hoeveel vakjes krijgt het schema? | open | 16 (4 × 4) | aftelklok 5 s in een stilte van 6 s |
| 2:16–2:26 (r. 380) | VOORSPEL: Twee genen op hetzelfde chromosoom: hoeveel soorten gameten? | open | 2 (zonder crossing-over) | aftelklok 5 s in een stilte van 6 s |
| 3:27–3:40 (r. 420) | VOORSPEL: Welk gen ligt het dichtst bij A? | B / C | gen B | aftelklok 5 s in een stilte van 6 s |

Alle vragen: niveau vwo bovenbouw. Het antwoord wordt steeds in de eerstvolgende alinea gesproken.

## Begrippen
Zoals op de pagina (geen vwo-markering; de hele film is vwo):
- dihybride kruising — kruising waarbij je twee genen tegelijk volgt
- onafhankelijke overerving — genen op verschillende chromosomen worden los van elkaar over de gameten verdeeld; GgRr maakt 4 soorten gameten, elk ¼
- 9 : 3 : 3 : 1 — fenotypeverhouding in de F2 van een dihybride kruising met onafhankelijke genen
- gekoppelde genen — genen op hetzelfde chromosoom; ze gaan meestal samen naar dezelfde gameet
- crossing-over — uitwisseling van een stuk tussen niet-zuster-chromatiden van homologe chromosomen tijdens meiose I
- recombinant — nakomeling (of gameet) met een nieuwe combinatie van allelen
- recombinatiepercentage — percentage recombinanten; maat voor de afstand tussen twee genen (max. 50%)

## Docentdeel
Inklapbaar blok "Voor de docent" met:
- **Hoe de film het uitlegt**: De film laat de twee mogelijke liggingen van twee chromosoomparen in meiose I naast elkaar zien, en telt daarna de gameten van 400 cellen: vier soorten van elk 25%. Het 4×4-schema levert 9 : 3 : 3 : 1, dat met Mendels echte tellingen (315/101/108/32) wordt vergeleken en met de productregel (¾ × ¾) wordt uitgerekend. Bij gekoppelde genen (fruitvlieg, grijs/zwart lijf en normale vleugels/stompjes) laat een animatie crossing-over tussen niet-zuster-chromatiden zien.
- **Misvattingen**: Twee genen geven altijd 9 : 3 : 3 : 1; Gekoppelde genen gaan altijd samen; Crossing-over gebeurt bij de mitose of tussen zusterchromatiden
- **Pauzemomenten**: Hoeveel vakjes? (16); Hoeveel soorten gameten bij gekoppelde genen zonder crossing-over? (2); A–B 10%, A–C 30%: welk gen ligt het dichtst bij A? (B)
- **Getallen** (overgenomen):

| Wat | Waarde |
|---|---|
| Mendel dihybride F2 | 315 : 101 : 108 : 32 |
| Fruitvlieg lichaamskleur–vleugels | ± 17% recombinatie (vereenvoudigd voorbeeld) |

- **Notatie**: Voor de fruitvlieg gebruikt de film B/b (grijs/zwart) en V/v (normaal/stompjes). In methodes zie je ook b⁺/b en vg⁺/vg.

## Techniek: waar zit wat in de HTML
Regelnummers in `film.src.html` (uitgepakt met `scripts/filmbron.py`). Films 2–6 delen dezelfde bouwvorm: de regels 73–285 (kern, tekenhulpen, "shared library for films 2-6" r. 153, ongebruikte enzymsimulatie `runSim` r. 227) zijn in alle vijf identiek, net als de speler na `FILM`. Alleen het filmspecifieke blok vanaf r. 286 verschilt. Film 1 heeft een eigen, oudere opbouw.

- **Pagina**: kop r. 49 (h1 "Dihybride kruisingen en gekoppelde genen" + "± 4,5 minuten"), `<title>` r. 2 ("Dihybride kruisingen en gekoppelde genen"), begrippen r. 66, docentdeel r. 68, credits "Stem: Roos (ElevenLabs)" r. 69.
- **Script, ondertitels en timing**: één regel, r. 71: `window.__TIMELINE__={"total","paras":[{"key","start","dur","words":[{"w","s","e"}]}]}` + `window.__AUDIO_B64__="@@BLOB:006.mp3@@"`. Woordtijden zijn absolute seconden in de ene take. Ondertitels worden hieruit gebouwd met `SENT`/`setCap` (r. 459).
- **Cues**: `Q(key,woord,n)` / `QE` r. 93 (zoekt het n-de woord, leestekens genegeerd, terugval 'begint met'); `PS`/`PE` = begin/eind van een alinea. Alle tijden in `initCues()` r. 288 → object `K` (scènestarts `K.s2…`, vragen `K.q1`, aftelklok `K.cd1a`/`K.cd1b` = `PE+0,3` … `+5`).
- **Scènes**: `s1` r. 314, `s2` r. 323, `s3` r. 349, `s4` r. 379, `s5` r. 413, `s6` r. 423. `FILM` r. 426: `title`, `sub`, `levels`, `scenes()` (start = `K.sN`, eind = volgende start + 0,9 s, `fade` 0,9 s), `levelAt`, `repAt`, `legend`, `note`, `chapters()`.
- **Gedeelde helpers** (r. 153–223): o.a. `plant`, `chipG` (allelchips), `grid`, `meiosis`, `dotColumns`/`spawnTimes` (stippen-simulaties), `ratioText`, `frac`, `sceneTitle`, `legendBox`, stamboomsymbolen `pedSym`/`pedCouple`/`pedKids`; kaarten `card`, `termCard`, `misc` (r. 145), `countdown` (r. 142).
- **Simulatie**: tellen van gameten uit honderden cellen in s2 (`dotColumns`/`spawnTimes` uit de gedeelde bibliotheek). Deterministisch via `mulberry32(seed)`: bij elke weergave dezelfde uitkomst.
- **Vragen**: VOORSPEL-kaarten r. 350, 380, 420.
- **Hoofdstukken**: `FILM.chapters()` → `CHAP` r. 502.
- **Audio en speler**: r. 466 base64 → Blob-URL (terugval data-URI); eigen klok die de audio volgt; `render()` r. 445 (kruimelpaden, legenda, titelkaart eerste 1,6 s). Toetsen r. 499: spatie, ←/→ 5 s (shift 30 s), ↑/↓ hoofdstuk. Geen Leerling/Klas- of Havo/Vwo-schakelaar, geen toetsfunctie.

## Zo pas je deze film aan
1. **Tekst op het scherm**: zoek de letterlijke string in het filmblok (`card(`, `termCard(`, `T('…'`, `sceneTitle(`) en pas hem aan. Daarna `python3 scripts/filmbron.py inpakken <map> <film.html>`. Wijzigingen in de gedeelde bibliotheek (r. 73–285) moet je zelf in alle vijf films (2–6) doorvoeren.
2. **Ondertitel wijzigen zonder nieuwe opname**: pas alleen de `w`-waarde in `__TIMELINE__` aan. Let op: de stem zegt dan nog het oude woord, en als het woord een cue-woord is (zie script.md), verschuift de animatie.
3. **Eén alinea opnieuw opnemen**: de audio is één bestand (blob 006.mp3). Vervang het stuk `start…start+dur` van die alinea in de mp3 en houd de stiltes ertussen gelijk (6,0 s na een voorspelvraag!). Laat woordtijden maken (forced alignment) en zet ze in de `paras`-entry. Bij een andere lengte verschuif je `start` en alle `s`/`e` van alle latere alinea's en `total`. Scènes en cues lopen via `Q()`/`PS()` vanzelf mee.
4. **Vraag aanpassen**: kaarttekst op de genoemde regel. Het antwoord zit in de gesproken tekst van de volgende alinea, dus een andere vraag betekent ook een nieuwe opname.
5. **Let op cue-woorden**: haal je een woord weg dat in `initCues` staat, dan valt `Q()` stil terug op het begin van de alinea (alleen `console.warn`). Bij woorden die vaker voorkomen telt het volgnummer (`Q(key,'drie',2)`).

## Aandachtspunten
- De kop zegt "± 4,5 minuten"; de werkelijke duur is 4:22.
- Er staan geen misvattingkaarten (`misc(`) in het beeld, terwijl het docentdeel er drie noemt.
- Het begrip "dihybride" wordt niet uitgesproken. Het staat alleen in de titel en de begrippenlijst.
- Bij "Mendel telde …" zegt de stem de getallen in woorden (driehonderdvijftien enz.); de ondertitel volgt dat.
- In de gedeelde bibliotheek staat de enzymsimulatie uit film 1 (`runSim`, `drawSimPanel`, r. 224–285), maar deze film gebruikt die niet: dode code.
- De stem-invoer en uitspraaklijst staan niet in de HTML. Er zijn geen versie/datum, geen vwo-blokken en geen Havo/Vwo-schakelaar.

## Wachtlijst opnieuw inspreken
- **p10 (Gekoppelde genen en crossing-over), 15-10-2026: koppeling afleiden uit de ouders** (aanvulling na vergelijking met Gewoon Uitgelegd; examenvaardigheid). Vier [nieuw]-zinnen tussen "Op het homologe chromosoom ligt zwart lijf naast vleugelstompjes." en "Zonder uitwisseling ontstaan maar twee soorten gameten.": uit P BBVV × bbvv ligt B samen met V (en b met v); uit P BBvv × bbVV ligt B samen met v (en b met V).
  - Opname: alinea p10 opnieuw inspreken (hele alinea, Roos), daarna in blob 006.mp3 het stuk `start…start+dur` van p10 (2:27–2:44) vervangen; stiltes eromheen gelijk houden. Woordtijden (forced alignment) in de `paras`-entry van p10; omdat p10 ca. 22 s langer wordt, `start` en alle `s`/`e` van p11–p15 en `TL.total` met dat verschil verschuiven. Cue-woorden van p10 (fruitvliegje, homologe, maar, gekoppeld, chromosoom) blijven staan; "chromosoom" komt in de nieuwe zinnen vaker voor, maar `Q()` pakt het eerste voorkomen (in de bestaande zin), dus dat klopt nog. Kop "± 4,5 minuten" wordt ± 4,75 minuten (4:44).
  - **Beeld nodig**: in scène `s4` een klein paneel met twee P-kruisingen naast elkaar, met chromosoomstaafjes in de vaste allelchips (`chipG`): links 'P: BBVV × bbvv → F1: B naast V' en rechts 'P: BBvv × bbVV → F1: B naast v', met de F1 telkens als BbVv; kop 'Welke allelen liggen samen?'. Cues aan nieuwe woorden ("ouders", "andersom") toevoegen in `initCues` (`Q('p10','ouders')`, `Q('p10','andersom')`).
  - **Risicowoorden (uitspraaktest)**: geen nieuwe; raszuivere, genotype, chromosoom en vleugelstompjes zitten al in de reeks (raszuiver in film 2, genotype in films 1–3 en 6). Bij de verzameltest alleen controleren dat "BbVv" niet wordt uitgesproken (staat alleen in beeld, niet in de stem).

## Wijzigingen
- 15 okt 2026 — Speler: de knop Vragen aan/uit (onthouden in `bk-vragen`, ook `?vragen=uit`) werkt nu altijd, ook na spoelen, in pauze en als je hem halverwege omzet. Bij Vragen uit vallen weg: de vraag zelf, de gesproken vraagzin(nen) ervoor (zinnen op '?', 'Wat denk je?', 'Denk even na.', 'Eerst een voorspelling.') en een los antwoord direct erna ('Antwoord B.', 'Ja.', 'Nee.', 'Precies.'); gewone uitlegzinnen blijven staan. De tijdbalk, tijd en hoofdstuktijden tonen de ingekorte duur. Code: `bkBouw()` maakt `BK.k` (stukken die de speler overslaat); regelnummers in de spelercode zijn daardoor een paar regels verschoven. Deze film heeft geen hoofdstukkaarten, dus geen hoofdstukpauze om in te korten.

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

'chromosoompaar met kleurgen' en 'ander paar: vormgen' (er was geen lijn, maar ze stonden los ver links) staan nu in twee regels direct links naast hun chromosoompaar (Kamiel: "die lijntjes naar begrippen moeten sowieso weg"; zie `films/BEELDAFSPRAKEN.md`). Gecontroleerd op contactbladen. Regelnummers elders in dit bestand kunnen een paar regels verschoven zijn.

## Wijziging 16 okt 2026: begrippen als kaartjesraster
Het begrippenblok ziet er nu uit als in de hoofdengine (bv. `films/cellen/van-molecuul-tot-biosfeer.html`): onder de kop "Begrippen" een `<div id="glossary">` met per begrip een kaartje `<div class="term"><b>begrip</b><p>uitleg</p></div>` (raster `repeat(auto-fill,minmax(260px,1fr))`). Volgorde en tekst van de begrippen zijn ongewijzigd; extra kolommen (bron, hoofdstuknummer) staan klein onder de uitleg in `<p class="gl-meta">`. De opmaak staat in `<style id="glossary-stijl">` vlak voor `</head>` (kleuren via de variabelen van deze pagina). Nieuw begrip: voeg een kaartje toe in `#glossary`. Omgezet met een script; regelnummers verderop in dit bestand kunnen enkele regels verschoven zijn. De kop "Begrippen" is een `<h2 class="gl-kop">` met dezelfde opmaak als op de voorbeeldpagina (Fraunces 700, 30px, regelhoogte 1,5, marge 0 0 12px; het lettertype zit als `@font-face` 'Fraunces Begrippen' in `#glossary-stijl`, kleur = tekstkleur van deze pagina).
