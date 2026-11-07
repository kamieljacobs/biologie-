# Hoe werden we mens? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/evolutie/x4-hoe-werden-we-mens.html` (audio in `x4-hoe-werden-we-mens/audio/`) |
| Reeks | Evolutie (v2), extra film 4 van 4 (buiten het PTA) |
| Niveau | havo + vwo (geen vwo-blokken) |
| Versie | 1.0 · oktober 2026 (script v2 = storyboard f12.json, goedgekeurd 24 okt 2026) |
| Prompt | v10 |
| Voldoet aan | prompt v10 (C10 tekenkwaliteit; frisse beeldreview na het bouwen) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.719 credits (flow XAkbvXzb9HWYEAnNJTm2) |
| Duur | spraak 6:24 (384 s, basis 384 s); met vragen en kaarten ± 8 min |
| Beeldstijl | Part C: Macro, Micro en Schema; dieren uit `bibliotheek/dieren` (uitknippoppen), personages uit het castboek |
| Bouwvorm | FILMDATA-straat (engine uit films/vervolg, speler met Vragen aan/uit), reeksbibliotheek `lib_evo.js`; werkwijze in `bron/bouw/BOUWEN_EVO.md` |
| Herkomst | reeksontwerp en storyboards 22–23 okt 2026 (keuringsblad, beeldbank), productie 24 okt 2026 in reeksmodus: inspreken door een helper, animatie per film door een helper vanuit de keyframes |

## Opbouw

| Hoofdstuk | Segmenten |
|---|---|
| Cold open | s01, s02 |
| Hoofdstuk 1 — De splitsing | s04, s05, q06, s07 |
| Hoofdstuk 2 — Eerst lopen | s08, q09, s10, s11, s12, s13 |
| Hoofdstuk 3 — Hersenen, werktuigen en vuur | s14, s15, q16, s17, s18 |
| Hoofdstuk 4 — De neanderthaler | s19, s20, s21, s22, q23, s24, s25, s26, s27, s28, s29, s30, q31, s32, s33, s34, s35, s36, s37, s38 |
| Hoofdstuk 5 — Wij | s39, s40, q41, s42, s43 |
| Recap | s44, s45, s46 |

## Vragen

q06 → c; q09 → b; q16 → b; q23 → c; q31 → a; q41 → b.

## Begrippen

gemeenschappelijke voorouder, mensachtigen, rechtop lopen, handbijl, zustergroep, oud DNA, genenstroom.

## Waar wat in de HTML zit

| Regel | Inhoud |
|---|---|
| 99 | Begrippen |
| 101 | Checkvragen |
| 110 | Voor de docent |
| 189 | `window.FILMDATA` (segmenten, woordtijden, vragen) |
| 1875 | `const SCENES = {}`, daarna lib_bio, lib_evo, tekenbestanden, lib_dieren, lib_micro_evo, sb12.js (keyframes) |
| 11248 | `Object.assign(SCENES, { title, s01 … })` (de animatie per alinea, bron: `src/scenes_e12.js`) |

## Hoe je de film aanpast

Werkmap `/root/hw` opzetten zoals in `films/evolutie/storyboards-v2/productie/README.md`, de bronmap terugzetten in `/root/hw/e12/` (segments.json, map.json, film.py, sections.html, src/scenes_e12.js, src/teken_e12.js, stem/woordtijden → words/, ../audio → audio/), dan `python3 evo_bouw.py 12` en `python3 evo_pak.py 12`.
- Een tekstfout in beeld of een beweging: `scenes_e12.js` / `teken_e12.js` aanpassen, opnieuw bouwen.
- Een alinea opnieuw inspreken: stem-invoer uit `segments.json` (veld `voice`), één take, mp3 in `audio/<id>.mp3`, `silalign.py` voor de woordtijden, opnieuw bouwen.
- Een dier aanpassen: in `bibliotheek/dieren/` (testvel, keuring), dan `lib_dieren.js` opnieuw naar `evolib/` kopiëren.

## Aandachtspunten

- Uitspraakwachtlijst: `uitspraak.md` (nog niet getest).
- Keuzes en vereenvoudigingen uit het storyboard staan in het docentdeel en in `storyboard_f12.json`.
- Frisse beeldreview 24 okt 2026 verwerkt (MOET-punten hersteld)
- Kleding neanderthaler en Homo sapiens op verzoek van Kamiel (24 okt 2026), in teken_e12.js
