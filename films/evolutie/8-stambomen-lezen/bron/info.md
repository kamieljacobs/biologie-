# Stambomen lezen — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/evolutie/8-stambomen-lezen.html` (audio in `8-stambomen-lezen/audio/`) |
| Reeks | Evolutie (v2), film 8 van 8 |
| Niveau | havo + vwo (geen vwo-blokken) |
| Versie | 1.0 · oktober 2026 (script v2 = storyboard f8.json, goedgekeurd 23 okt 2026) |
| Voldoet aan | prompt v9 (storyboard v8 + uitknippoppen) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.202 credits (flow 24OZtmfOHuc60rMzcB57) |
| Duur | spraak 5:45 (345 s, basis 345 s); met vragen en kaarten ± 7 min |
| Beeldstijl | Part C: Macro, Micro en Schema; dieren uit `bibliotheek/dieren` (uitknippoppen), personages uit het castboek |
| Bouwvorm | FILMDATA-straat (engine uit films/vervolg, speler met Vragen aan/uit), reeksbibliotheek `lib_evo.js`; werkwijze in `bron/bouw/BOUWEN_EVO.md` |
| Herkomst | reeksontwerp en storyboards 22–23 okt 2026 (keuringsblad, beeldbank), productie 23 okt 2026 in reeksmodus: inspreken door een helper, animatie per film door een helper vanuit de keyframes |

## Opbouw

| Hoofdstuk | Segmenten |
|---|---|
| Cold open | s01, s02 |
| Hoofdstuk 1 — Een stamboom lezen | s04, s05, s06, s07, q08, s09, s10, s11 |
| Hoofdstuk 2 — Kenmerken op de takken | s12, s13, s14, s15, s16, q17, s18, s19 |
| Hoofdstuk 3 — Dezelfde vorm, andere tak | s20, s21, s22, q23, s24, s25, s26, s27 |
| Hoofdstuk 4 — Namen en groepen | s28, s29, s30, s31, q32, s33, s34, s35 |
| Recap | s36 |

## Vragen

q08 → a; q17 → c; q23 → b; q32 → c.

## Begrippen

cladogram, gemeenschappelijke voorouder, afstammingslijn, verwantschap, buitengroep, homologe organen, analoge organen, convergente evolutie, classificatie, soort, geslacht, binomiale naamgeving.

## Waar wat in de HTML zit

| Regel | Inhoud |
|---|---|
| 99 | Begrippen |
| 101 | Checkvragen |
| 112 | Voor de docent |
| 153 | `window.FILMDATA` (segmenten, woordtijden, vragen) |
| 1839 | `const SCENES = {}`, daarna lib_bio, lib_evo, tekenbestanden, lib_dieren, lib_micro_evo, sb8.js (keyframes) |
| 9447 | `Object.assign(SCENES, { title, s01 … })` (de animatie per alinea, bron: `src/scenes_e8.js`) |

## Hoe je de film aanpast

Werkmap `/root/hw` opzetten zoals in `films/evolutie/storyboards-v2/productie/README.md`, de bronmap terugzetten in `/root/hw/e8/` (segments.json, map.json, film.py, sections.html, src/scenes_e8.js, src/teken_e8.js, stem/woordtijden → words/, ../audio → audio/), dan `python3 evo_bouw.py 8` en `python3 evo_pak.py 8`.
- Een tekstfout in beeld of een beweging: `scenes_e8.js` / `teken_e8.js` aanpassen, opnieuw bouwen.
- Een alinea opnieuw inspreken: stem-invoer uit `segments.json` (veld `voice`), één take, mp3 in `audio/<id>.mp3`, `silalign.py` voor de woordtijden, opnieuw bouwen.
- Een dier aanpassen: in `bibliotheek/dieren/` (testvel, keuring), dan `lib_dieren.js` opnieuw naar `evolib/` kopiëren.

## Aandachtspunten

- Uitspraakwachtlijst: `uitspraak.md` (nog niet getest).
- Keuzes en vereenvoudigingen uit het storyboard staan in het docentdeel en in `storyboard_f8.json`.
- Dieren in de cladogrammen staan in losse tegels (geen onderlinge maat); waar ze samen in één beeld staan, op echte maat
- Zandhagedis aan de oever: 7× vergroot in een zoomcirkel
