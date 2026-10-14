# Water in balans — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/hormonen/5-water-in-balans.html (audio in films/hormonen/5-water-in-balans/audio/) |
| Reeks / nummer | Hormonen, film 5 van 5 (seriebrief in de Claude-doc *Seriebriefs uitlegfilms biologie*). Vervangt de geplande Gaswisseling 3 (nieren) |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blok gelabeld: s15–s17 met vraag q16 (aquaporinen, lis van Henle, kangoeroerat, aldosteron). Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 14 oktober 2026 (zelfstandig gebouwd in reeksmodus; wacht op review door Kamiel) |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow NcitC07HDtwYSQHTnaDB; nodes in `stem/takes.json`) |
| Duur | spraak 7:22 (vwo) / 6:02 (havo). Speeltijd met kaarten en vragen: vwo ≈ 9½ min, havo ≈ 8 min |
| Beeldstijl | Part C: Macro (sportveld en kamer, cold open), Schema (navy: lichaam, nierdoorsnede, uitgerold nefron, verzamelbuis, regelkring, grafiek), Micro (cel van de verzamelbuis, lis van Henle). Kleuren in `scenes.js`: water teal, urine licht `#F2EBB0` tot donker `#D4A017`, ureum `#C9A35C`, nierslagader `#B5574A`, nierader `#6F7FB0`; ADH goud (driehoek, `HK`) |
| Audio-opslag | 13 losse mp3's in audio/ (s01 … s18), loudnorm −15 LUFS, piek −1,5 dBTP, mono 44,1 kHz 96 kb/s; niet in de HTML ingebed |
| Lettertypen | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 — ingebed als base64 |
| Herkomst | gebouwd op 14 oktober 2026 met de bouwstraat van de voedingsreeks (`bouw/`) en de seriebibliotheek `lib_hormonen.js` |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script met leerdoelen, misconcepties, getallen en wat de reviews veranderden. Lege regel = nieuwe alinea = nieuwe take. `script_v1.md` = vóór de reviews |
| `script.md` | Tekst per take met duur en audiobestand |
| `segments.json` | Uitvoer van `make_segments.py`: per alinea `display` (ondertitel), `voice` (stem-invoer met respellings) en `vmap` |
| `film.py` → `film.json` | Titel, vraagteksten met juist antwoord, begrippen, checkvragen en docentdeel (HTML) |
| `checkpoint.html` | Zelfcheck: contactsheets uit de speler, wat de reviews veranderden, script |
| `uitspraak.md` | Risicowoorden met stem-invoer; wachtlijst voor Kamiel |
| `stem/woordtijden/sNN.json` | Woordtijden per take (Scribe, op de ondertitelwoorden) |
| `stem/takes.json`, `stem/gen.json` | ElevenLabs-flow en node per take; generatie-id en duur |
| `src/` | `scenes.js` (deze film), `lib.js`, `lib_voeding.js`, `lib_hormonen.js` (seriebibliotheek), `player.js`, `page.html`, `fonts.css` |
| `bouw/` | `make_segments.py`, `align.py`, `build_data.py`, `build.py`, `stills.py`, `fake_words.py`, `uitspraak_subs.json` |
| `reviews/` | Expert (nefroloog), didactiek + taal, curriculum (met checkvragen), eindreview (fresh eyes, na de bouw) |

**Werkmap opzetten:** maak `f5/` met `script_v2.md`, `film.py`, `scenes.js` (uit `src/`), `words/` (= `stem/woordtijden/`) en `film/5-water-in-balans/audio/` (= `../audio/`); zet `src/*.js` (behalve scenes.js), `src/page.html`, `src/fonts.css` en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py f5 script_v2.md && (cd f5 && python3 film.py) && python3 engine/build_data.py f5 && python3 engine/build.py f5` → `f5/film/5-water-in-balans.html`.

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open (s01, q02) | I · Macro | Sporten in de zon, beker met weinig donkere urine; een andere dag binnen met een fles water, beker met veel lichte urine; vraag q02 |
| Titel | Schema | Nierdoorsnede met nefronen |
| H1 Twee nieren, twee taken (s04) | B · Schema | Lichaam met nieren, urineleiders, blaas en lever; twee taken; nierdoorsnede met nierslagader en nierader, schors, merg, nierbekken (holte), urineleider; een miljoen nefronen per nier |
| H2 Eerst alles eruit, dan het goede terug (s05–s09) | B + D · Schema | Uitgerold nefron: aanvoerend (wijd) en afvoerend (nauw) vaatje, glomerulus in het kapsel van Bowman; filtratie van water, glucose, zouten, ureum; bloedcellen en grote eiwitten blijven; 180 L → 1 tot 2 L; terugresorptie (actief transport, osmose) naar de haarvaten; percentages; vraag q08; nierdrempelgrafiek |
| H3 De kraan heet ADH (s10–s17) | D + I · Schema + Micro | Verzamelbuis; ADH = anti-diuretisch; verzamelbuis in zout weefsel met ADH-schuif en urinebeker; regelkring met minteken; dorst; vraag q13; kring met geremd ADH. Vwo: cel van de verzamelbuis met ADH-receptor en aquaporinen; lis van Henle (dalend/opstijgend, zout merg); kangoeroerat (vraag q16); aldosteron tegenover ADH |
| Recap (s18) | Schema | Sporten (veel ADH, weinig donker) naast fles water (weinig ADH, veel licht); slotbeeld van de reeks |
| Eindkaart (s19) | Schema | Drie kernzinnen |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Hoe weet je lichaam hoeveel water het moet houden? | b je hersenen meten je bloed, en sturen je nieren aan (onthulling in H3 en recap) |
| q08 | basis | Veel glucose in het bloed: wat gebeurt er in de nier? | a er komt glucose in de urine |
| q13 | basis | Waarom plassen mensen na alcohol vaak veel? | a alcohol remt ADH |
| q16 | vwo | Extra lange lis van Henle: wat betekent dat voor de urine? | a extra geconcentreerd |

De antwoordopties worden niet ingesproken; ze staan alleen op het scherm (uit het script, `[VRAAG]`). De onthulling staat in de audio van s09, s14, s17 en s18.

Checkvragen (statisch in de pagina): 1 Eiwit in de urine · 2 Zweten en bier · 3 Plasma, voorurine en urine (tabel; e is vwo) · 4 De kangoeroerat (vwo).

Begrippen: nier, nierslagader/nierader, ureum, nefron, glomerulus, voorurine, terugresorptie, nierdrempel, verzamelbuis, osmotische waarde, ADH; vwo: aquaporinen, lis van Henle, aldosteron.

## Waar wat in de HTML zit (regelnummers in `5-water-in-balans.html`)

| Regel | Inhoud |
|---|---|
| 7–65 | Fonts (base64) en CSS |
| 69 | Sitebalk `<nav class="sitenav">` met "← Terug naar Regeling" |
| 76–100 | Speler: canvas, ondertitelband, knoppen, Havo/Vwo- en Leerling/Klas-schakelaar |
| 101–148 | Checkvragen (101–115), Voor de docent (116–148) |
| 149 | `window.FILMDATA` — segmenten, woordtijden, vragen, titelkaart (uit `build_data.py`) |
| 150–371 | `lib.js`: Part C-tokens, `label`, `zoomCircle`, `human` |
| 372–942 | `lib_voeding.js` (gebruikt: `lichaam`, `glycogen`, `hexagon`, `proteinChain`, `coilPath`, `arrow`, `klok`, `padPunt`, `gladC`) |
| 943–1193 | `lib_hormonen.js`: seriebibliotheek (`person`, `HK`, `hormoonVorm`, `receptor`, `doelcel`, `hartMeter`, `klierKaart`, `bloedLus`, `grafiek`, `bakKraan`, `kringSchema`, `eilandje`, `cel`, `glycogeenKeten`, `telefoon`, …) |
| 1194–1254 | `scenes.js`: hulpstukken van deze film |
| 1255–1385 | `SCENES`: title 1256 · s01 1258 · s04 1268 · s05 1283 · s06 1291 · s07 1301 · s09 1306 · s10 1312 · s11 1323 · s12 1332 · s14 1333 · s15 1341 · s17 1360 · s18 1369 |
| 1386–1553 | `GLOSSARY` en `player.js` (havo slaat vwo-segmenten over) |

## Hoe je de film aanpast

- **Tekst van een alinea:** wijzig `script_v2.md`, draai `make_segments.py`, neem alleen die take opnieuw op (stem-invoer staat in `segments.json` → `voice`), haal woordtijden op met Scribe en `align.py`, zet de mp3 genormaliseerd in `audio/` en bouw opnieuw.
- **Een antwoordoptie of vraagtekst:** opties in `script_v2.md` bij `[VRAAG]`, vraagtekst en uitleg in `film.py`; geen nieuwe opname nodig (behalve als het juiste antwoord verschuift: dat noemt de audio).
- **Een beeld:** `scenes.js` (zie regelnummers hierboven); cues hangen aan woorden via `q.on('woord', n)` (n = de hoeveelste keer dat het woord in die alinea voorkomt; het zoekt op deel van het woord, dus 'bloed' vindt ook 'bloedvaten').
- **Checkvragen of docentdeel:** `film.py` → `python3 film.py` → `build.py`.

## Aandachtspunten

- Uitspraak: zie `uitspraak.md`, vooral "negenenneguntig" in s06. Een blinde controle was in deze sessie niet mogelijk.
- In de basis heet het hele stuk tussen kapsel en verzamelbuis "nierbuisje"; de lis van Henle verschijnt pas in het vwo-blok.
- Eindreview: 15 punten, alle verwerkt in beeld en checkvragen; er waren geen nieuwe opnames nodig.
