# Het ontstaan van het leven — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/evolutie/x2-het-ontstaan-van-het-leven.html` (audio in `x2-het-ontstaan-van-het-leven/audio/`) |
| Reeks | Evolutie (v2), extra film 2 van 4 (buiten het PTA) |
| Niveau | havo + vwo (geen vwo-blokken) |
| Versie | 1.0 · oktober 2026 (script v2 = storyboard f10.json, goedgekeurd 24 okt 2026) |
| Prompt | v10 |
| Voldoet aan | prompt v10 (C10 tekenkwaliteit; frisse beeldreview na het bouwen) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.901 credits (flow zmRbwjbcINPkr9YCy0c3) |
| Duur | spraak 6:50 (410 s, basis 410 s); met vragen en kaarten ± 8 min |
| Beeldstijl | Part C: Macro, Micro en Schema; dieren uit `bibliotheek/dieren` (uitknippoppen), personages uit het castboek |
| Bouwvorm | FILMDATA-straat (engine uit films/vervolg, speler met Vragen aan/uit), reeksbibliotheek `lib_evo.js`; werkwijze in `bron/bouw/BOUWEN_EVO.md` |
| Herkomst | reeksontwerp en storyboards 22–23 okt 2026 (keuringsblad, beeldbank), productie 24 okt 2026 in reeksmodus: inspreken door een helper, animatie per film door een helper vanuit de keyframes |

## Opbouw

| Hoofdstuk | Segmenten |
|---|---|
| Cold open | s01, s02, s03, s05 |
| Hoofdstuk 1 — Bouwstenen | s06, s07, s08, q09, s10, s11, s12, s13 |
| Hoofdstuk 2 — Informatie en gereedschap | s14, s15, q16, s17, s18, s19, s20, s21, s22, q23, s24, s25 |
| Hoofdstuk 3 — Een omhulsel | s26, s27, s28, q29, s30, s31, s32 |
| Hoofdstuk 4 — Eén voorouder | s33, s34, s35, q36, s37, s38, s39, s40, s41, s42 |
| Recap | s43, s44 |

## Vragen

q09 → b; q16 → a; q23 → c; q29 → b; q36 → a.

## Begrippen

experiment van Miller, aminozuur, ribozym, RNA-wereld, vetzuur, protocel, genetische code, LUCA, stromatoliet.

## Waar wat in de HTML zit

| Regel | Inhoud |
|---|---|
| 99 | Begrippen |
| 101 | Checkvragen |
| 111 | Voor de docent |
| 177 | `window.FILMDATA` (segmenten, woordtijden, vragen) |
| 1863 | `const SCENES = {}`, daarna lib_bio, lib_evo, tekenbestanden, lib_dieren, lib_micro_evo, sb10.js (keyframes) |
| 11311 | `Object.assign(SCENES, { title, s01 … })` (de animatie per alinea, bron: `src/scenes_e10.js`) |

## Hoe je de film aanpast

Werkmap `/root/hw` opzetten zoals in `films/evolutie/storyboards-v2/productie/README.md`, de bronmap terugzetten in `/root/hw/e10/` (segments.json, map.json, film.py, sections.html, src/scenes_e10.js, src/teken_e10.js, stem/woordtijden → words/, ../audio → audio/), dan `python3 evo_bouw.py 10` en `python3 evo_pak.py 10`.
- Een tekstfout in beeld of een beweging: `scenes_e10.js` / `teken_e10.js` aanpassen, opnieuw bouwen.
- Een alinea opnieuw inspreken: stem-invoer uit `segments.json` (veld `voice`), één take, mp3 in `audio/<id>.mp3`, `silalign.py` voor de woordtijden, opnieuw bouwen.
- Een dier aanpassen: in `bibliotheek/dieren/` (testvel, keuring), dan `lib_dieren.js` opnieuw naar `evolib/` kopiëren.

## Aandachtspunten

- Uitspraakwachtlijst: `uitspraak.md` (nog niet getest).
- Keuzes en vereenvoudigingen uit het storyboard staan in het docentdeel en in `storyboard_f10.json`.
- Frisse beeldreview 24 okt 2026 verwerkt (MOET-punten hersteld)
