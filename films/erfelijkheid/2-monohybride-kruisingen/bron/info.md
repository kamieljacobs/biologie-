# Monohybride kruisingen — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/erfelijkheid/2-monohybride-kruisingen.html |
| Reeks / nummer | Erfelijkheid · film 2 van 6 (op de site: § 3.3) |
| Doelgroep / niveau | vwo bovenbouw (geen havo-/vwo-blokken) |
| Versie / datum | onbekend (niet in de HTML) |
| Stem / model | Roos (ElevenLabs); model onbekend (niet in de HTML) |
| Duur | 4:31 (006.mp3 = 271,36 s; `TL.total` = 271,320 s). De kop zegt "± 4,5 minuten". |
| Beeldstijl | Volgens codecommentaar "stijlkaart biologiefilms, look Schema": navy, gedempte vullingen, lichte randen, goud = focus; fonts Fraunces / Source Sans 3 / IBM Plex Mono. Schema-look met macro-scènes: erwtenplanten met paarse/witte bloemen op een donkergroene achtergrond (#1B2D2B) voor Mendel en de terugkruising; navy (#1E2B3C) voor meiose, kruisingsschema, kansen en stappenplan. UI-laag: kruimelpaden NIVEAU en WEERGAVE (echt › symbool › schema), legenda, scènetitels linksboven. |
| Audio-opslag | 1 doorlopende take (15 alinea's p01–p13) als base64 in de HTML (blob 006.mp3, `window.__AUDIO_B64__`); 5 fonts als data-URI (blobs 001–005.woff2) |
| Reconstructie | 2026-10-12, uit de gepubliceerde HTML |

## Opbouw
Hoofdstuktypes A–I uit de prompt: niet vastgesteld (de typedefinities staan niet in de HTML); de functie staat erbij.

| Begin | Hoofdstuk | Functie / kernbeeld | Scène |
|---|---|---|---|
| 0:00 | Twee puzzels | haak / twee puzzels | `s1` |
| 0:21 | Mendels proef | historisch experiment (Mendel P → F1 → F2, 705 : 224) | `s2` |
| 1:16 | Meiose: gameten | mechanisme (meiose in de meeldraad, gameten ½) | `s3` |
| 1:47 | Het kruisingsschema | schema (kruisingsschema 2×2, 1 : 2 : 1 en 3 : 1) | `s4` |
| 2:16 | Kansen | kansen + simulatie (productregel, 400 bevruchtingen) | `s5` |
| 2:57 | Stappenplan | stappenplan in vier stappen | `s6` |
| 3:17 | De terugkruising | toepassing (terugkruising) | `s7` |
| 4:06 | Samenvatting | samenvatting + vooruitblik op film 3 | `s8` |

## Vragen
| Plek | Vraag (zoals op het scherm) | Opties | Juiste antwoord | Vorm |
|---|---|---|---|---|
| 0:54–1:03 (r. 329) | VOORSPEL: Wat krijg je als je twee F1-planten met elkaar kruist? | open | 3 paars : 1 wit (in de F2 komt wit terug) | aftelklok 5 s in een stilte van 6 s |
| 2:32–2:42 (r. 388) | VOORSPEL: 4 nakomelingen: precies 3 paars en 1 wit? | open (ja/nee) | niet per se; in de simulatie 2 paars en 2 wit na 4 | aftelklok 5 s in een stilte van 6 s |
| 3:38–3:48 (r. 420) | VOORSPEL: half paars, half wit: AA of Aa? | AA / Aa | Aa | aftelklok 5 s in een stilte van 6 s |

Alle vragen: niveau vwo bovenbouw. Het antwoord wordt steeds in de eerstvolgende alinea gesproken.

Misvattingkaarten in beeld: De 4 vakjes zijn 4 kinderen → Elk vakje is een kans van ¼ (r. 399).

## Begrippen
Zoals op de pagina (geen vwo-markering; de hele film is vwo):
- P, F1, F2 — oudergeneratie, eerste en tweede nakomelingengeneratie
- raszuiver — homozygoot: geeft generaties lang dezelfde nakomelingen
- gameet — geslachtscel met van elk chromosoompaar één chromosoom, dus van elk gen één allel
- kruisingsschema — tabel met de gameten van beide ouders; elk vakje is één mogelijke bevruchting
- productregel — kansen die allebei moeten gebeuren vermenigvuldig je (½ × ½ = ¼)
- terugkruising — kruising met een homozygoot recessief individu (aa) om het genotype van een dominant fenotype te achterhalen

## Docentdeel
Inklapbaar blok "Voor de docent" met:
- **Hoe de film het uitlegt**: De film volgt Mendels proef met paarse en witte erwten (P → F1 → F2, met zijn echte tellingen 705 : 224). De meiose in een Aa-plant laat zien waarom elke gameet één allel krijgt, met kans ½. Het kruisingsschema wordt opgebouwd uit echte bevruchtingen; een simulatie met 400 nakomelingen laat zien dat 3 : 1 pas bij grote aantallen verschijnt.
- **Misvattingen**: De vier vakjes zijn vier kinderen; Vier nakomelingen geven precies 3 : 1; Het recessieve allel is in de F1 verdwenen
- **Pauzemomenten**: Wat krijg je als je twee F1-planten kruist? (3 paars : 1 wit); Vier nakomelingen: precies 3 : 1? (niet per se); Half paars, half wit na terugkruising: AA of Aa? (Aa)
- **Getallen** (overgenomen):

| Wat | Waarde |
|---|---|
| Mendel, bloemkleur F2 | 705 paars : 224 wit = 3,15 : 1 |
| Simulatie | 400 willekeurige bevruchtingen, vaste startwaarde |

- **Suggesties**: Kralen- of muntproef: twee munten per ouder, 40 worpen per tweetal, klassikaal optellen tot 3 : 1; Kruisingsvragen met het stappenplan in vier stappen

## Techniek: waar zit wat in de HTML
Regelnummers in `film.src.html` (uitgepakt met `scripts/filmbron.py`). Films 2–6 delen dezelfde bouwvorm: de regels 73–285 (kern, tekenhulpen, "shared library for films 2-6" r. 153, ongebruikte enzymsimulatie `runSim` r. 227) zijn in alle vijf identiek, net als de speler na `FILM`. Alleen het filmspecifieke blok vanaf r. 286 verschilt. Film 1 heeft een eigen, oudere opbouw.

- **Pagina**: kop r. 49 (h1 "Monohybride kruisingen" + "± 4,5 minuten"), `<title>` r. 2 ("Monohybride kruisingen"), begrippen r. 66, docentdeel r. 68, credits "Stem: Roos (ElevenLabs)" r. 69.
- **Script, ondertitels en timing**: één regel, r. 71: `window.__TIMELINE__={"total","paras":[{"key","start","dur","words":[{"w","s","e"}]}]}` + `window.__AUDIO_B64__="@@BLOB:006.mp3@@"`. Woordtijden zijn absolute seconden in de ene take. Ondertitels worden hieruit gebouwd met `SENT`/`setCap` (r. 470).
- **Cues**: `Q(key,woord,n)` / `QE` r. 93 (zoekt het n-de woord, leestekens genegeerd, terugval 'begint met'); `PS`/`PE` = begin/eind van een alinea. Alle tijden in `initCues()` r. 288 → object `K` (scènestarts `K.s2…`, vragen `K.q1`, aftelklok `K.cd1a`/`K.cd1b` = `PE+0,3` … `+5`).
- **Scènes**: `s1` r. 308, `s2` r. 317, `s3` r. 341, `s4` r. 369, `s5` r. 378, `s6` r. 402, `s7` r. 412, `s8` r. 432. `FILM` r. 436: `title`, `sub`, `levels`, `scenes()` (start = `K.sN`, eind = volgende start + 0,9 s, `fade` 0,9 s), `levelAt`, `repAt`, `legend`, `note`, `chapters()`.
- **Gedeelde helpers** (r. 153–223): o.a. `plant`, `chipG` (allelchips), `grid`, `meiosis`, `dotColumns`/`spawnTimes` (stippen-simulaties), `ratioText`, `frac`, `sceneTitle`, `legendBox`, stamboomsymbolen `pedSym`/`pedCouple`/`pedKids`; kaarten `card`, `termCard`, `misc` (r. 145), `countdown` (r. 142).
- **Simulatie**: simulatie van 400 bevruchtingen (`mkOffs()` r. 304: zoekt een seed waarbij de eerste 4 nakomelingen 2 wit bevatten en het totaal 97–103 wit is; `dotColumns`), F2-veld van 929 stippen (r. 332). Deterministisch via `mulberry32(seed)`: bij elke weergave dezelfde uitkomst.
- **Vragen**: VOORSPEL-kaarten r. 329, 388, 420.
- **Hoofdstukken**: `FILM.chapters()` → `CHAP` r. 513.
- **Audio en speler**: r. 477 base64 → Blob-URL (terugval data-URI); eigen klok die de audio volgt; `render()` r. 456 (kruimelpaden, legenda, titelkaart eerste 1,6 s). Toetsen r. 510: spatie, ←/→ 5 s (shift 30 s), ↑/↓ hoofdstuk. Geen Leerling/Klas- of Havo/Vwo-schakelaar, geen toetsfunctie.

## Zo pas je deze film aan
1. **Tekst op het scherm**: zoek de letterlijke string in het filmblok (`card(`, `termCard(`, `T('…'`, `sceneTitle(`) en pas hem aan. Daarna `python3 scripts/filmbron.py inpakken <map> <film.html>`. Wijzigingen in de gedeelde bibliotheek (r. 73–285) moet je zelf in alle vijf films (2–6) doorvoeren.
2. **Ondertitel wijzigen zonder nieuwe opname**: pas alleen de `w`-waarde in `__TIMELINE__` aan. Let op: de stem zegt dan nog het oude woord, en als het woord een cue-woord is (zie script.md), verschuift de animatie.
3. **Eén alinea opnieuw opnemen**: de audio is één bestand (blob 006.mp3). Vervang het stuk `start…start+dur` van die alinea in de mp3 en houd de stiltes ertussen gelijk (6,0 s na een voorspelvraag!). Laat woordtijden maken (forced alignment) en zet ze in de `paras`-entry. Bij een andere lengte verschuif je `start` en alle `s`/`e` van alle latere alinea's en `total`. Scènes en cues lopen via `Q()`/`PS()` vanzelf mee.
4. **Vraag aanpassen**: kaarttekst op de genoemde regel. Het antwoord zit in de gesproken tekst van de volgende alinea, dus een andere vraag betekent ook een nieuwe opname.
5. **Let op cue-woorden**: haal je een woord weg dat in `initCues` staat, dan valt `Q()` stil terug op het begin van de alinea (alleen `console.warn`). Bij woorden die vaker voorkomen telt het volgnummer (`Q(key,'drie',2)`).

## Aandachtspunten
- De kop zegt "± 4,5 minuten"; de werkelijke duur is 4:31.
- Cue-fout in het stappenplan: `K.st4=Q('p09b','vier:')` (r. 298) vindt al het woord "vier" in "in vier stappen" (180,2 s), omdat de dubbele punt uit het zoekwoord wordt weggehaald. Kaart 4 'verhoudingen aflezen' verschijnt daardoor vóór kaart 1 in plaats van bij "Vier:" (188,6 s). Oplossing: `Q('p09b','vier',2)`.
- `K.eenv=Q('p06','vakje',3)`: "vakje" komt maar twee keer letterlijk voor, dus `Q()` valt terug op 'begint met' (vakje, vakjes, vakje) en vindt zo toevallig het juiste moment "Eén vakje is aa" (126,7 s). Het werkt, maar breekt snel bij een tekstwijziging.
- In de samenvattingskaart staat 'terugkruising: 1 : 1'. Dat klopt alleen als de paarse plant Aa is.
- In de gedeelde bibliotheek staat de enzymsimulatie uit film 1 (`runSim`, `drawSimPanel`, r. 224–285), maar deze film gebruikt die niet: dode code.
- De stem-invoer en uitspraaklijst staan niet in de HTML. Er zijn geen versie/datum, geen vwo-blokken en geen Havo/Vwo-schakelaar.
- Verbeterd 12-10-2026: cue stappenkaart 4 is nu `Q('p09b','vier',2)` (188,6 s); de vier kaarten verschijnen in volgorde op 181,1 · 183,4 · 186,4 · 188,6 s.
