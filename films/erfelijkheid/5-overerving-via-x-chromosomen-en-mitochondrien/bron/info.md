# Overerving via het X-chromosoom en mitochondriën — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/erfelijkheid/5-overerving-via-x-chromosomen-en-mitochondrien.html |
| Reeks / nummer | Erfelijkheid · film 5 van 6 (op de site: § 3.4) |
| Doelgroep / niveau | vwo bovenbouw (geen havo-/vwo-blokken) |
| Versie / datum | onbekend (niet in de HTML) |
| Stem / model | Roos (ElevenLabs); model onbekend (niet in de HTML) |
| Duur | 4:00 (006.mp3 = 240,17 s; `TL.total` = 240,134 s). De kop zegt "± 4 minuten". |
| Beeldstijl | Volgens codecommentaar "stijlkaart biologiefilms, look Schema": navy, gedempte vullingen, lichte randen, goud = focus; fonts Fraunces / Source Sans 3 / IBM Plex Mono. Schema-look (navy) met macro-iconen (mannen/vrouwen, eicel/zaadcel, netvlies met kegeltjes, mitochondrion) en een gevoeligheidsgrafiek; vaste kleurcode: eerste X oranje (van moeder), tweede X of Y blauw (van vader). UI-laag: kruimelpaden NIVEAU en WEERGAVE (echt › symbool › schema), legenda, scènetitels linksboven. |
| Audio-opslag | 1 doorlopende take (15 alinea's p01–p12) als base64 in de HTML (blob 006.mp3, `window.__AUDIO_B64__`); 5 fonts als data-URI (blobs 001–005.woff2) |
| Reconstructie | 2026-10-12, uit de gepubliceerde HTML |

## Opbouw
Hoofdstuktypes A–I uit de prompt: niet vastgesteld (de typedefinities staan niet in de HTML); de functie staat erbij.

| Begin | Hoofdstuk | Functie / kernbeeld | Scène |
|---|---|---|---|
| 0:00 | Het raadsel | haak (8 % vs 0,5 % kleurenblind; raadsel moederlijn) | `s1` |
| 0:18 | Jongen of meisje? | mechanisme (geslachtsbepaling via de zaadcel) | `s2` |
| 0:34 | X, Y en kleurzien | mechanisme (X groot/Y klein, kegeltjes, rood- en groen-gen op X) | `s3` |
| 1:08 | Notatie en kruising | notatie + schema + simulatie (Xᴺ/Xⁿ, XᴺXⁿ × XᴺY, 200 kinderen) | `s4` |
| 2:05 | Mannen vaker · koningshuizen | toepassing (mannen vaker, hemofilie bij Victoria, vader → zoon nooit X) | `s5` |
| 2:48 | Mitochondriaal DNA | mechanisme + vraag (mitochondriaal DNA via de eicel) | `s6` |
| 3:35 | Samenvatting | samenvatting | `s7` |

## Vragen
| Plek | Vraag (zoals op het scherm) | Opties | Juiste antwoord | Vorm |
|---|---|---|---|---|
| 1:27–1:38 (r. 420) | VOORSPEL: Kans dat een zoon kleurenblind is? (draagster × man die normaal ziet) | open | ½ | aftelklok 5 s in een stilte van 6 s |
| 3:05–3:16 (r. 506) | VOORSPEL: Krijgen de kinderen van deze man de aandoening ook? (mitochondriaal) | open (ja/nee) | nee | aftelklok 5 s in een stilte van 6 s |

Alle vragen: niveau vwo bovenbouw. Het antwoord wordt steeds in de eerstvolgende alinea gesproken.

## Begrippen
Zoals op de pagina (geen vwo-markering; de hele film is vwo):
- geslachtschromosomen — X en Y; vrouw XX, man XY
- X-chromosomale overerving — overerving van een gen dat op het X-chromosoom ligt; notatie met het allel bij de X, bijvoorbeeld Xᴺ en Xⁿ
- draagster — vrouw die één recessief allel heeft (XᴺXⁿ) en het kenmerk zelf niet heeft
- hemizygoot — met maar één exemplaar van een gen, zoals een man voor genen op de X
- kegeltjes — zintuigcellen in het netvlies voor kleurzien, met lichtgevoelige eiwitten voor blauw, groen en rood licht
- hemofilie — X-chromosomaal recessieve stoornis in de bloedstolling
- mitochondriaal DNA — klein, rond DNA in de mitochondriën (37 genen); wordt alleen via de eicel doorgegeven

## Docentdeel
Inklapbaar blok "Voor de docent" met:
- **Hoe de film het uitlegt**: De film opent met het verschil in kleurenblindheid tussen mannen (± 8%) en vrouwen (± 0,5%) en het raadsel van de moederlijn. Daarna: geslachtsbepaling via de zaadcel, het grote X- en kleine Y-chromosoom, de kegeltjes en de genen voor het rood- en groengevoelige eiwit die naast elkaar op de X liggen. Een 2×2-schema XᴺXⁿ × XᴺY wordt gecontroleerd met een simulatie van 200 kinderen. De stamboom van koningin Victoria laat hemofilie zien. Tot slot mitochondriaal DNA: een eicel met meer dan 100 000 mitochondriën tegenover een zaadcel met een paar tientallen die na de bevruchting worden afgebroken.
- **Kleurcode**: In de genotypen is de eerste X oranje (van moeder) en de tweede X of Y blauw (van vader). Zo zien leerlingen direct dat een zoon zijn X altijd van zijn moeder heeft.
- **Misvattingen**: Een zoon kan een X-chromosomale aandoening van zijn vader krijgen; Vrouwen kunnen geen X-chromosomaal recessieve aandoening krijgen; Mitochondriaal DNA erft zoals een gen op een chromosoom (half van vader, half van moeder); De eicel bepaalt het geslacht
- **Pauzemomenten**: Draagster × man die normaal ziet: kans dat een zoon kleurenblind is? (½); Man met mitochondriale aandoening: krijgen zijn kinderen die? (nee)
- **Vereenvoudigd**: 0,08 × 0,08 ≈ 0,6% is een schatting; de gemeten frequentie bij vrouwen ligt rond 0,4–0,5%; Rood-groen-kleurenblindheid heeft meerdere vormen; de film laat één mechanisme zien (verschoven gevoeligheid van het rood-eiwit); De stamboom van Victoria is ingekort

## Techniek: waar zit wat in de HTML
Regelnummers in `film.src.html` (uitgepakt met `scripts/filmbron.py`). Films 2–6 delen dezelfde bouwvorm: de regels 73–285 (kern, tekenhulpen, "shared library for films 2-6" r. 153, ongebruikte enzymsimulatie `runSim` r. 227) zijn in alle vijf identiek, net als de speler na `FILM`. Alleen het filmspecifieke blok vanaf r. 286 verschilt. Film 1 heeft een eigen, oudere opbouw.

- **Pagina**: kop r. 49 (h1 "Overerving via het X-chromosoom en mitochondriën" + "± 4 minuten"), `<title>` r. 2 ("Overerving via X en mitochondriën"), begrippen r. 66, docentdeel r. 68, credits "Stem: Roos (ElevenLabs)" r. 69.
- **Script, ondertitels en timing**: één regel, r. 71: `window.__TIMELINE__={"total","paras":[{"key","start","dur","words":[{"w","s","e"}]}]}` + `window.__AUDIO_B64__="@@BLOB:006.mp3@@"`. Woordtijden zijn absolute seconden in de ene take. Ondertitels worden hieruit gebouwd met `SENT`/`setCap` (r. 545).
- **Cues**: `Q(key,woord,n)` / `QE` r. 93 (zoekt het n-de woord, leestekens genegeerd, terugval 'begint met'); `PS`/`PE` = begin/eind van een alinea. Alle tijden in `initCues()` r. 288 → object `K` (scènestarts `K.s2…`, vragen `K.q1`, aftelklok `K.cd1a`/`K.cd1b` = `PE+0,3` … `+5`).
- **Scènes**: `s1` r. 314, `s2` r. 334, `s3` r. 357, `s4` r. 391, `s5` r. 439, `s6` r. 477, `s7` r. 509. `FILM` r. 512: `title`, `sub`, `levels`, `scenes()` (start = `K.sN`, eind = volgende start + 0,9 s, `fade` 0,9 s), `levelAt`, `repAt`, `legend`, `note`, `chapters()`.
- **Gedeelde helpers** (r. 153–223): o.a. `plant`, `chipG` (allelchips), `grid`, `meiosis`, `dotColumns`/`spawnTimes` (stippen-simulaties), `ratioText`, `frac`, `sceneTitle`, `legendBox`, stamboomsymbolen `pedSym`/`pedCouple`/`pedKids`; kaarten `card`, `termCard`, `misc` (r. 145), `countdown` (r. 142).
- **Simulatie**: simulatie van 200 kinderen in s4 (r. 424–426). Deterministisch via `mulberry32(seed)`: bij elke weergave dezelfde uitkomst.
- **Vragen**: VOORSPEL-kaarten r. 420, 506.
- **Hoofdstukken**: `FILM.chapters()` → `CHAP` r. 588.
- **Audio en speler**: r. 552 base64 → Blob-URL (terugval data-URI); eigen klok die de audio volgt; `render()` r. 531 (kruimelpaden, legenda, titelkaart eerste 1,6 s). Toetsen r. 585: spatie, ←/→ 5 s (shift 30 s), ↑/↓ hoofdstuk. Geen Leerling/Klas- of Havo/Vwo-schakelaar, geen toetsfunctie.

## Zo pas je deze film aan
1. **Tekst op het scherm**: zoek de letterlijke string in het filmblok (`card(`, `termCard(`, `T('…'`, `sceneTitle(`) en pas hem aan. Daarna `python3 scripts/filmbron.py inpakken <map> <film.html>`. Wijzigingen in de gedeelde bibliotheek (r. 73–285) moet je zelf in alle vijf films (2–6) doorvoeren.
2. **Ondertitel wijzigen zonder nieuwe opname**: pas alleen de `w`-waarde in `__TIMELINE__` aan. Let op: de stem zegt dan nog het oude woord, en als het woord een cue-woord is (zie script.md), verschuift de animatie.
3. **Eén alinea opnieuw opnemen**: de audio is één bestand (blob 006.mp3). Vervang het stuk `start…start+dur` van die alinea in de mp3 en houd de stiltes ertussen gelijk (6,0 s na een voorspelvraag!). Laat woordtijden maken (forced alignment) en zet ze in de `paras`-entry. Bij een andere lengte verschuif je `start` en alle `s`/`e` van alle latere alinea's en `total`. Scènes en cues lopen via `Q()`/`PS()` vanzelf mee.
4. **Vraag aanpassen**: kaarttekst op de genoemde regel. Het antwoord zit in de gesproken tekst van de volgende alinea, dus een andere vraag betekent ook een nieuwe opname.
5. **Let op cue-woorden**: haal je een woord weg dat in `initCues` staat, dan valt `Q()` stil terug op het begin van de alinea (alleen `console.warn`). Bij woorden die vaker voorkomen telt het volgnummer (`Q(key,'drie',2)`).

## Aandachtspunten
- De kop zegt "± 4 minuten"; de werkelijke duur is 4:00.
- Het begrip "hemizygoot" staat in de begrippenlijst, maar wordt niet uitgesproken en staat niet in beeld.
- Het docentdeel meldt zelf drie vereenvoudigingen: 0,08 × 0,08 ≈ 0,6 % tegenover gemeten 0,4–0,5 %, één mechanisme voor kleurenblindheid, en een ingekorte stamboom van Victoria.
- Er staan geen misvattingkaarten (`misc(`) in het beeld, terwijl het docentdeel er vier noemt.
- In de gedeelde bibliotheek staat de enzymsimulatie uit film 1 (`runSim`, `drawSimPanel`, r. 224–285), maar deze film gebruikt die niet: dode code.
- De stem-invoer en uitspraaklijst staan niet in de HTML. Er zijn geen versie/datum, geen vwo-blokken en geen Havo/Vwo-schakelaar.
- `<title>` ("Overerving via X en mitochondriën") wijkt af van de h1 ("Overerving via het X-chromosoom en mitochondriën").

## Wachtlijst opnieuw inspreken
- **p08 (Mannen vaker · koningshuizen), 15-10-2026: X-chromosomaal dominante overerving toegevoegd** (aanvulling na vergelijking met Gewoon Uitgelegd). Vier [nieuw]-zinnen na "Een zoon krijgt een aandoening op het X-chromosoom dus altijd via zijn moeder." (vóór het hoofdstuk Mitochondriaal DNA): aangedane vader → alle dochters, geen zonen; heterozygote aangedane moeder → helft van de kinderen; vaker bij vrouwen.
  - Opname: alinea p08 opnieuw inspreken (hele alinea, Roos), daarna in blob 006.mp3 het stuk `start…start+dur` van p08 (2:38–2:46) vervangen; stiltes eromheen gelijk houden. Woordtijden (forced alignment) in de `paras`-entry van p08; p08 wordt ca. 22 s langer, dus `start` en alle `s`/`e` van p09–p12 en `TL.total` met dat verschil verschuiven. Cue-woorden van p08 ("nooit", "via") staan vóór de nieuwe zinnen en blijven kloppen. Hoofdstukbegin Mitochondriaal DNA (2:48) en Samenvatting (3:35) schuiven ca. 22 s op; kop "± 4 minuten" wordt ± 4,5 minuten (4:22).
  - **Samenvatting p12**: de bestaande zin "Daarom komen aandoeningen die X-chromosomaal recessief erven vaker voor bij mannen…" klopt nog (zegt expliciet "recessief"), dus niet aangepast.
  - **Beeld nodig**: in scène `s5` een tweede klein schema naast 'X van vader → alleen naar dochters': kop 'X-chromosomaal DOMINANT'; vader XᴬY (aangedaan) × moeder XᵃXᵃ → alle dochters XᴬXᵃ aangedaan, alle zonen XᵃY gezond; daaronder moeder XᴬXᵃ × vader XᵃY → ½ van de kinderen aangedaan (zonen én dochters); label 'vaker bij vrouwen'. Vaste kleurcode: X van moeder oranje, X/Y van vader blauw. Cues: `Q('p08','dominant')`, `Q('p08','vader',2)`, `Q('p08','moeder',2)`, `Q('p08','vrouwen')`.
  - **Risicowoorden (uitspraaktest)**: geen nieuwe. "X-chromosomaal", "dominant" en "heterozygoot" zitten al in de reeks (X-chromosomaal in deze film; dominant in films 1–6; heterozygoot in films 1 en 3). Bij de verzameltest controleren dat "X-chromosomaal dominante" in één vloeiende zin niet hakkelt; zo niet: "iks-chromosomaal".

## Wijzigingen
- 15 okt 2026 — Speler: de knop Vragen aan/uit (onthouden in `bk-vragen`, ook `?vragen=uit`) werkt nu altijd, ook na spoelen, in pauze en als je hem halverwege omzet. Bij Vragen uit vallen weg: de vraag zelf, de gesproken vraagzin(nen) ervoor (zinnen op '?', 'Wat denk je?', 'Denk even na.', 'Eerst een voorspelling.') en een los antwoord direct erna ('Antwoord B.', 'Ja.', 'Nee.', 'Precies.'); gewone uitlegzinnen blijven staan. De tijdbalk, tijd en hoofdstuktijden tonen de ingekorte duur. Code: `bkBouw()` maakt `BK.k` (stukken die de speler overslaat); regelnummers in de spelercode zijn daardoor een paar regels verschoven. Deze film heeft geen hoofdstukkaarten, dus geen hoofdstukpauze om in te korten.

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

Weg: de pijl naar 'genen voor kleurzien'; de naam staat direct rechts naast het kader op het X-chromosoom (Kamiel: "die lijntjes naar begrippen moeten sowieso weg"; zie `films/BEELDAFSPRAKEN.md`). Gecontroleerd op contactbladen. Regelnummers elders in dit bestand kunnen een paar regels verschoven zijn.

## Wijziging 16 okt 2026: begrippen als kaartjesraster
Het begrippenblok ziet er nu uit als in de hoofdengine (bv. `films/cellen/van-molecuul-tot-biosfeer.html`): onder de kop "Begrippen" een `<div id="glossary">` met per begrip een kaartje `<div class="term"><b>begrip</b><p>uitleg</p></div>` (raster `repeat(auto-fill,minmax(260px,1fr))`). Volgorde en tekst van de begrippen zijn ongewijzigd; extra kolommen (bron, hoofdstuknummer) staan klein onder de uitleg in `<p class="gl-meta">`. De opmaak staat in `<style id="glossary-stijl">` vlak voor `</head>` (kleuren via de variabelen van deze pagina). Nieuw begrip: voeg een kaartje toe in `#glossary`. Omgezet met een script; regelnummers verderop in dit bestand kunnen enkele regels verschoven zijn.
