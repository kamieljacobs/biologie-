# Vormen van selectie — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/evolutie/3-vormen-van-selectie.html` (audio in `3-vormen-van-selectie/audio/`) |
| Reeks | Evolutie (v2), film 3 van 8 |
| Niveau | havo + vwo (geen vwo-blokken) |
| Versie | 1.0 · oktober 2026 (script v2 = storyboard f3.json, goedgekeurd 23 okt 2026) |
| Voldoet aan | prompt v9 (storyboard v8 + uitknippoppen) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.441 credits (flow xJ0JkoJdSOP8zvQ4PRMb) |
| Duur | spraak 5:51 (351 s, basis 351 s); met vragen en kaarten ± 7 min |
| Beeldstijl | Part C: Macro, Micro en Schema; dieren uit `bibliotheek/dieren` (uitknippoppen), personages uit het castboek |
| Bouwvorm | FILMDATA-straat (engine uit films/vervolg, speler met Vragen aan/uit), reeksbibliotheek `lib_evo.js`; werkwijze in `bron/bouw/BOUWEN_EVO.md` |
| Herkomst | reeksontwerp en storyboards 22–23 okt 2026 (keuringsblad, beeldbank), productie 23 okt 2026 in reeksmodus: inspreken door een helper, animatie per film door een helper vanuit de keyframes |

## Opbouw

| Hoofdstuk | Segmenten |
|---|---|
| Cold open | s01, s02 |
| Hoofdstuk 1 — Gerichte selectie | s04, s05, s06, q07, s08, s09, s10 |
| Hoofdstuk 2 — Stabiliserende selectie | s11, s12, s13, q14, s15, s16, s17 |
| Hoofdstuk 3 — Splitsende selectie | s18, s19, s20, q21, s22 |
| Hoofdstuk 4 — Seksuele selectie | s23, s24, q25, s26, s27, s28 |
| Hoofdstuk 5 — Co-evolutie | s29, s30, s31, q32, s33, s34 |
| Recap | s35 |

## Vragen

q07 → b; q14 → a; q21 → c; q25 → b; q32 → c.

## Begrippen

gerichte selectie, stabiliserende selectie, splitsende selectie, seksuele selectie, co-evolutie, selectienadeel.

## Waar wat in de HTML zit

| Regel | Inhoud |
|---|---|
| 99 | Begrippen |
| 101 | Checkvragen |
| 109 | Voor de docent |
| 162 | `window.FILMDATA` (segmenten, woordtijden, vragen) |
| 1848 | `const SCENES = {}`, daarna lib_bio, lib_evo, tekenbestanden, lib_dieren, lib_micro_evo, sb3.js (keyframes) |
| 9608 | `Object.assign(SCENES, { title, s01 … })` (de animatie per alinea, bron: `src/scenes_e3.js`) |

## Hoe je de film aanpast

Werkmap `/root/hw` opzetten zoals in `films/evolutie/storyboards-v2/productie/README.md`, de bronmap terugzetten in `/root/hw/e3/` (segments.json, map.json, film.py, sections.html, src/scenes_e3.js, src/teken_e3.js, stem/woordtijden → words/, ../audio → audio/), dan `python3 evo_bouw.py 3` en `python3 evo_pak.py 3`.
- Een tekstfout in beeld of een beweging: `scenes_e3.js` / `teken_e3.js` aanpassen, opnieuw bouwen.
- Een alinea opnieuw inspreken: stem-invoer uit `segments.json` (veld `voice`), één take, mp3 in `audio/<id>.mp3`, `silalign.py` voor de woordtijden, opnieuw bouwen.
- Een dier aanpassen: in `bibliotheek/dieren/` (testvel, keuring), dan `lib_dieren.js` opnieuw naar `evolib/` kopiëren.

## Aandachtspunten

- Uitspraakwachtlijst: `uitspraak.md` (nog niet getest).
- Keuzes en vereenvoudigingen uit het storyboard staan in het docentdeel en in `storyboard_f3.json`.
- s27 herten: overgang van kop zakken naar vechthouding springt licht
- Pauw: van rust naar pronk is een wissel tussen twee tekeningen; de waaier groeit daarna open
- Pijlstaarttong als eigen lijn over de bibliotheektong getekend (die was te dun)
