# Voorbij dominant en recessief — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/erfelijkheid/3-voorbij-dominant-en-recessief.html |
| Reeks / nummer | Erfelijkheid · film 3 van 6 (op de site: § 3.3) |
| Doelgroep / niveau | vwo bovenbouw (geen havo-/vwo-blokken) |
| Versie / datum | onbekend (niet in de HTML) |
| Stem / model | Roos (ElevenLabs); model onbekend (niet in de HTML) |
| Duur | 4:43 (006.mp3 = 283,74 s; `TL.total` = 283,713 s). De kop zegt "± 4,5 minuten". |
| Beeldstijl | Volgens codecommentaar "stijlkaart biologiefilms, look Schema": navy, gedempte vullingen, lichte randen, goud = focus; fonts Fraunces / Source Sans 3 / IBM Plex Mono. Schema-look (navy) met macro-elementen: leeuwenbekbloemen, rode bloedcellen met antigenen, gele en grijze muizen, histogrammen voor lengte. UI-laag: kruimelpaden NIVEAU en WEERGAVE (echt › symbool › schema), legenda, scènetitels linksboven. |
| Audio-opslag | 1 doorlopende take (14 alinea's p01–p14) als base64 in de HTML (blob 006.mp3, `window.__AUDIO_B64__`); 5 fonts als data-URI (blobs 001–005.woff2) |
| Reconstructie | 2026-10-12, uit de gepubliceerde HTML |

## Opbouw
Hoofdstuktypes A–I uit de prompt: niet vastgesteld (de typedefinities staan niet in de HTML); de functie staat erbij.

| Begin | Hoofdstuk | Functie / kernbeeld | Scène |
|---|---|---|---|
| 0:00 | Mengen allelen? | haak (blending-vraag: mengen allelen?) | `s1` |
| 0:20 | Intermediair | mechanisme + schema (intermediair, pigment per allel, F2 1 : 2 : 1) | `s2` |
| 1:19 | Bloedgroepen: multipele allelen en codominantie | mechanisme + toepassing (bloedgroepen: multipele allelen, codominantie, A × B → O) | `s3` |
| 2:45 | Letale factor | raadsel + verklaring (letale factor, 3 : 1 wordt 2 : 1) | `s4` |
| 3:24 | Polygene overerving | model / grafiek (polygene overerving, 1–3 genen → normale verdeling) | `s5` |
| 4:12 | Samenvatting | samenvatting | `s6` |

## Vragen
| Plek | Vraag (zoals op het scherm) | Opties | Juiste antwoord | Vorm |
|---|---|---|---|---|
| 0:47–0:58 (r. 342) | VOORSPEL: Roze × roze: wat verwacht jij? | open | 1 rood : 2 roze : 1 wit | aftelklok 5 s in een stilte van 6 s |
| 2:18–2:28 (r. 371) | VOORSPEL: moeder bloedgroep A, vader B: kan hun kind bloedgroep O hebben? | open (ja/nee) | ja, bij Iᴬi × Iᴮi, kans ¼ | aftelklok 5 s in een stilte van 6 s |
| 3:51–3:59 (r. 410) | VOORSPEL: Geen groepen: is lengte dan niet erfelijk? | open (ja/nee) | wel erfelijk (polygeen + milieu) | aftelklok 5 s in een stilte van 6 s |

Alle vragen: niveau vwo bovenbouw. Het antwoord wordt steeds in de eerstvolgende alinea gesproken.

Misvattingkaarten in beeld: Allelen mengen → Ze worden los doorgegeven (s2); Bloedgroep O is een eigen stof → O = geen antigeen A en B (s3).

## Begrippen
Zoals op de pagina (geen vwo-markering; de hele film is vwo):
- intermediair (onvolledig dominant) — het fenotype van de heterozygoot ligt tussen dat van de twee homozygoten; F2 1 : 2 : 1
- codominant — beide allelen komen volledig tot uiting in de heterozygoot (bloedgroep AB)
- multipele allelen — meer dan twee allelen voor één gen in de populatie (Iᴬ, Iᴮ, i); per persoon twee
- antigeen — stof op het celoppervlak, bij bloedgroepen een suikerketen
- letale factor — allel dat in dubbele dosis dodelijk is; 3 : 1 wordt 2 : 1
- polygene overerving — één eigenschap wordt door veel genen samen bepaald; geeft continue variatie (normale verdeling)

## Docentdeel
Inklapbaar blok "Voor de docent" met:
- **Hoe de film het uitlegt**: Voor intermediair laat de film zien dat één werkend allel bij de leeuwenbek maar half zoveel pigment geeft. De F2 van roze × roze (1 : 2 : 1) laat zien dat allelen niet mengen. Bloedgroepen tonen multipele allelen en codominantie via antigenen op de rode bloedcel. De gele muis laat zien hoe een homozygoot letale combinatie 3 : 1 in 2 : 1 verandert. Kleine grafieken met 1, 2 en 3 genen laten polygene overerving naar een normale verdeling groeien.
- **Misvattingen**: Allelen mengen (blending); Bloedgroep O is een eigen stof; Geen duidelijke groepen = niet erfelijk
- **Pauzemomenten**: Roze × roze? (1 rood : 2 roze : 1 wit); A × B → kind O? (ja, bij Iᴬi × Iᴮi, kans ¼); Is lengte erfelijk? (ja, polygeen + milieu)
- **Notatie**: De film gebruikt R/W voor de leeuwenbek en Y/y voor de gele muis. In methodes kom je ook Aᴿ/Aᵂ en Aʸ/a tegen.
- **Suggesties**: Bloedgroepenpuzzel: welke ouders kunnen welk kind hebben?; Lengte van de klas als histogram: vergelijk met de normale verdeling

## Techniek: waar zit wat in de HTML
Regelnummers in `film.src.html` (uitgepakt met `scripts/filmbron.py`). Films 2–6 delen dezelfde bouwvorm: de regels 73–285 (kern, tekenhulpen, "shared library for films 2-6" r. 153, ongebruikte enzymsimulatie `runSim` r. 227) zijn in alle vijf identiek, net als de speler na `FILM`. Alleen het filmspecifieke blok vanaf r. 286 verschilt. Film 1 heeft een eigen, oudere opbouw.

- **Pagina**: kop r. 49 (h1 "Voorbij dominant en recessief" + "± 4,5 minuten"), `<title>` r. 2 ("Voorbij dominant en recessief"), begrippen r. 66, docentdeel r. 68, credits "Stem: Roos (ElevenLabs)" r. 69.
- **Script, ondertitels en timing**: één regel, r. 71: `window.__TIMELINE__={"total","paras":[{"key","start","dur","words":[{"w","s","e"}]}]}` + `window.__AUDIO_B64__="@@BLOB:006.mp3@@"`. Woordtijden zijn absolute seconden in de ene take. Ondertitels worden hieruit gebouwd met `SENT`/`setCap` (r. 450).
- **Cues**: `Q(key,woord,n)` / `QE` r. 93 (zoekt het n-de woord, leestekens genegeerd, terugval 'begint met'); `PS`/`PE` = begin/eind van een alinea. Alle tijden in `initCues()` r. 289 → object `K` (scènestarts `K.s2…`, vragen `K.q1`, aftelklok `K.cd1a`/`K.cd1b` = `PE+0,3` … `+5`).
- **Scènes**: `s1` r. 322, `s2` r. 328, `s3` r. 356, `s4` r. 381, `s5` r. 399, `s6` r. 413. `FILM` r. 417: `title`, `sub`, `levels`, `scenes()` (start = `K.sN`, eind = volgende start + 0,9 s, `fade` 0,9 s), `levelAt`, `repAt`, `legend`, `note`, `chapters()`.
- **Gedeelde helpers** (r. 153–223): o.a. `plant`, `chipG` (allelchips), `grid`, `meiosis`, `dotColumns`/`spawnTimes` (stippen-simulaties), `ratioText`, `frac`, `sceneTitle`, `legendBox`, stamboomsymbolen `pedSym`/`pedCouple`/`pedKids`; kaarten `card`, `termCard`, `misc` (r. 145), `countdown` (r. 142).
- **Simulatie**: geen simulatie; histogrammen via `binom()`/`hist()` in s5. Deterministisch via `mulberry32(seed)`: bij elke weergave dezelfde uitkomst.
- **Vragen**: VOORSPEL-kaarten r. 342, 371, 410.
- **Hoofdstukken**: `FILM.chapters()` → `CHAP` r. 493.
- **Audio en speler**: r. 457 base64 → Blob-URL (terugval data-URI); eigen klok die de audio volgt; `render()` r. 436 (kruimelpaden, legenda, titelkaart eerste 1,6 s). Toetsen r. 490: spatie, ←/→ 5 s (shift 30 s), ↑/↓ hoofdstuk. Geen Leerling/Klas- of Havo/Vwo-schakelaar, geen toetsfunctie.

## Zo pas je deze film aan
1. **Tekst op het scherm**: zoek de letterlijke string in het filmblok (`card(`, `termCard(`, `T('…'`, `sceneTitle(`) en pas hem aan. Daarna `python3 scripts/filmbron.py inpakken <map> <film.html>`. Wijzigingen in de gedeelde bibliotheek (r. 73–285) moet je zelf in alle vijf films (2–6) doorvoeren.
2. **Ondertitel wijzigen zonder nieuwe opname**: pas alleen de `w`-waarde in `__TIMELINE__` aan. Let op: de stem zegt dan nog het oude woord, en als het woord een cue-woord is (zie script.md), verschuift de animatie.
3. **Eén alinea opnieuw opnemen**: de audio is één bestand (blob 006.mp3). Vervang het stuk `start…start+dur` van die alinea in de mp3 en houd de stiltes ertussen gelijk (6,0 s na een voorspelvraag!). Laat woordtijden maken (forced alignment) en zet ze in de `paras`-entry. Bij een andere lengte verschuif je `start` en alle `s`/`e` van alle latere alinea's en `total`. Scènes en cues lopen via `Q()`/`PS()` vanzelf mee.
4. **Vraag aanpassen**: kaarttekst op de genoemde regel. Het antwoord zit in de gesproken tekst van de volgende alinea, dus een andere vraag betekent ook een nieuwe opname.
5. **Let op cue-woorden**: haal je een woord weg dat in `initCues` staat, dan valt `Q()` stil terug op het begin van de alinea (alleen `console.warn`). Bij woorden die vaker voorkomen telt het volgnummer (`Q(key,'drie',2)`).

## Aandachtspunten
- De kop zegt "± 4,5 minuten"; de werkelijke duur is 4:43.
- Letale factor: de gesproken tekst zegt "Uit het schema valt dus één vakje weg". De letaliteit wordt in beeld gezet via de functie `pun(... dead)`. Het allel heet in de film Y/y, in methodes vaak Aʸ/a (het docentdeel noemt dit).
- In "Iᴬ" en "Iᴮ" gebruikt de ondertitel superscript-letters (ᴬ ᴮ). Of de stem die als "i-A" uitspreekt, is niet na te gaan.
- In de gedeelde bibliotheek staat de enzymsimulatie uit film 1 (`runSim`, `drawSimPanel`, r. 224–285), maar deze film gebruikt die niet: dode code.
- De stem-invoer en uitspraaklijst staan niet in de HTML. Er zijn geen versie/datum, geen vwo-blokken en geen Havo/Vwo-schakelaar.

## Wijzigingen
- 15 okt 2026 — Speler: de knop Vragen aan/uit (onthouden in `bk-vragen`, ook `?vragen=uit`) werkt nu altijd, ook na spoelen, in pauze en als je hem halverwege omzet. Bij Vragen uit vallen weg: de vraag zelf, de gesproken vraagzin(nen) ervoor (zinnen op '?', 'Wat denk je?', 'Denk even na.', 'Eerst een voorspelling.') en een los antwoord direct erna ('Antwoord B.', 'Ja.', 'Nee.', 'Precies.'); gewone uitlegzinnen blijven staan. De tijdbalk, tijd en hoofdstuktijden tonen de ingekorte duur. Code: `bkBouw()` maakt `BK.k` (stukken die de speler overslaat); regelnummers in de spelercode zijn daardoor een paar regels verschoven. Deze film heeft geen hoofdstukkaarten, dus geen hoofdstukpauze om in te korten.

## Wijziging 16 okt 2026: begrippen als kaartjesraster
Het begrippenblok ziet er nu uit als in de hoofdengine (bv. `films/cellen/van-molecuul-tot-biosfeer.html`): onder de kop "Begrippen" een `<div id="glossary">` met per begrip een kaartje `<div class="term"><b>begrip</b><p>uitleg</p></div>` (raster `repeat(auto-fill,minmax(260px,1fr))`). Volgorde en tekst van de begrippen zijn ongewijzigd; extra kolommen (bron, hoofdstuknummer) staan klein onder de uitleg in `<p class="gl-meta">`. De opmaak staat in `<style id="glossary-stijl">` vlak voor `</head>` (kleuren via de variabelen van deze pagina). Nieuw begrip: voeg een kaartje toe in `#glossary`. Omgezet met een script; regelnummers verderop in dit bestand kunnen enkele regels verschoven zijn.
