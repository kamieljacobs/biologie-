# Hoe weten we dat? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/evolutie/7-hoe-weten-we-dat.html` (audio in `7-hoe-weten-we-dat/audio/`) |
| Reeks | Evolutie (v2), film 7 van 8 |
| Niveau | havo + vwo (geen vwo-blokken) |
| Versie | 1.0 · oktober 2026 (script v2 = storyboard f7.json, goedgekeurd 23 okt 2026) |
| Prompt | v9 |
| Voldoet aan | prompt v9 (storyboard v8 + uitknippoppen) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.912 credits (flow cbQGtZJgapFkIBh8Uixh) |
| Duur | spraak 6:43 (403 s, basis 403 s); met vragen en kaarten ± 8 min |
| Beeldstijl | Part C: Macro, Micro en Schema; dieren uit `bibliotheek/dieren` (uitknippoppen), personages uit het castboek |
| Bouwvorm | FILMDATA-straat (engine uit films/vervolg, speler met Vragen aan/uit), reeksbibliotheek `lib_evo.js`; werkwijze in `bron/bouw/BOUWEN_EVO.md` |
| Herkomst | reeksontwerp en storyboards 22–23 okt 2026 (keuringsblad, beeldbank), productie 23 okt 2026 in reeksmodus: inspreken door een helper, animatie per film door een helper vanuit de keyframes |

## Opbouw

| Hoofdstuk | Segmenten |
|---|---|
| Cold open | s01, s02, s03 |
| Hoofdstuk 1 — Lagen en fossielen | s05, s06, s07, s08, q09, s10, s11, s12, s13 |
| Hoofdstuk 2 — Walvissen in de lagen | s14, s15, s16, s17, s18, q19, s20 |
| Hoofdstuk 3 — Hetzelfde skelet | s21, s22, s23, q24, s25, s26, s27, s28 |
| Hoofdstuk 4 — Het spoor in het DNA | s29, s30, s31, q32, s33, s34, s35, s36, q37, s38, s39, s40 |
| Recap | s41 |

## Vragen

q09 → b; q19 → a; q24 → b; q32 → c; q37 → a.

## Begrippen

fossiel, relatieve datering, absolute datering, halveringstijd, homologe organen, rudimentair orgaan, gemeenschappelijke voorouder, moleculaire klok, cladogram.

## Waar wat in de HTML zit

| Regel | Inhoud |
|---|---|
| 99 | Begrippen |
| 101 | Checkvragen |
| 111 | Voor de docent |
| 155 | `window.FILMDATA` (segmenten, woordtijden, vragen) |
| 1841 | `const SCENES = {}`, daarna lib_bio, lib_evo, tekenbestanden, lib_dieren, lib_micro_evo, sb7.js (keyframes) |
| 9362 | `Object.assign(SCENES, { title, s01 … })` (de animatie per alinea, bron: `src/scenes_e7.js`) |

## Hoe je de film aanpast

Werkmap `/root/hw` opzetten zoals in `films/evolutie/storyboards-v2/productie/README.md`, de bronmap terugzetten in `/root/hw/e7/` (segments.json, map.json, film.py, sections.html, src/scenes_e7.js, src/teken_e7.js, stem/woordtijden → words/, ../audio → audio/), dan `python3 evo_bouw.py 7` en `python3 evo_pak.py 7`.
- Een tekstfout in beeld of een beweging: `scenes_e7.js` / `teken_e7.js` aanpassen, opnieuw bouwen.
- Een alinea opnieuw inspreken: stem-invoer uit `segments.json` (veld `voice`), één take, mp3 in `audio/<id>.mp3`, `silalign.py` voor de woordtijden, opnieuw bouwen.
- Een dier aanpassen: in `bibliotheek/dieren/` (testvel, keuring), dan `lib_dieren.js` opnieuw naar `evolib/` kopiëren.

## Aandachtspunten

- Uitspraakwachtlijst: `uitspraak.md` (nog niet getest).
- Keuzes en vereenvoudigingen uit het storyboard staan in het docentdeel en in `storyboard_f7.json`.
- Zie storyboard_f7.json voor getallen (leeftijden fossielen, halveringstijd koolstof-14 ±5700 jaar)
