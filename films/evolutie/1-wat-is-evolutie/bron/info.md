# Wat is evolutie eigenlijk? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/evolutie/1-wat-is-evolutie.html` (audio in `1-wat-is-evolutie/audio/`) |
| Reeks | Evolutie (v2), film 1 van 8 |
| Niveau | havo + vwo (geen vwo-blokken) |
| Versie | 1.0 · oktober 2026 (script v2 = storyboard f1.json, goedgekeurd 23 okt 2026) |
| Voldoet aan | prompt v9 (storyboard v8 + uitknippoppen) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.325 credits (flow 0jYQkEDLOgztb2FiITqI) |
| Duur | spraak 5:53 (353 s, basis 353 s); met vragen en kaarten ± 7 min |
| Beeldstijl | Part C: Macro, Micro en Schema; dieren uit `bibliotheek/dieren` (uitknippoppen), personages uit het castboek |
| Bouwvorm | FILMDATA-straat (engine uit films/vervolg, speler met Vragen aan/uit), reeksbibliotheek `lib_evo.js`; werkwijze in `bron/bouw/BOUWEN_EVO.md` |
| Herkomst | reeksontwerp en storyboards 22–23 okt 2026 (keuringsblad, beeldbank), productie 23 okt 2026 in reeksmodus: inspreken door een helper, animatie per film door een helper vanuit de keyframes |

## Opbouw

| Hoofdstuk | Segmenten |
|---|---|
| Cold open | s01, s02 |
| Hoofdstuk 1 — Variatie | s04, s05, s06, s07, s08, s09, q10, s11, s12 |
| Hoofdstuk 2 — Waar komt variatie vandaan? | s13, s14, s15, q16, s17, s18, s19, s20 |
| Hoofdstuk 3 — Populatie en genenpool | s21, s22, q23, s24, s25, s26, s27, s28, q29, s30 |
| Hoofdstuk 4 — Evolutie | s31, s32, q33, s34, s35, s36 |
| Recap | s37, s38, s39 |

## Vragen

q10 → c; q16 → b; q23 → c; q29 → a; q33 → b.

## Begrippen

variatie, allel, mutatie, recombinatie, populatie, genenpool, allelfrequentie, evolutie.

## Waar wat in de HTML zit

| Regel | Inhoud |
|---|---|
| 99 | Begrippen |
| 101 | Checkvragen |
| 110 | Voor de docent |
| 151 | `window.FILMDATA` (segmenten, woordtijden, vragen) |
| 1837 | `const SCENES = {}`, daarna lib_bio, lib_evo, tekenbestanden, lib_dieren, lib_micro_evo, sb1.js (keyframes) |
| 9103 | `Object.assign(SCENES, { title, s01 … })` (de animatie per alinea, bron: `src/scenes_e1.js`) |

## Hoe je de film aanpast

Werkmap `/root/hw` opzetten zoals in `films/evolutie/storyboards-v2/productie/README.md`, de bronmap terugzetten in `/root/hw/e1/` (segments.json, map.json, film.py, sections.html, src/scenes_e1.js, src/teken_e1.js, stem/woordtijden → words/, ../audio → audio/), dan `python3 evo_bouw.py 1` en `python3 evo_pak.py 1`.
- Een tekstfout in beeld of een beweging: `scenes_e1.js` / `teken_e1.js` aanpassen, opnieuw bouwen.
- Een alinea opnieuw inspreken: stem-invoer uit `segments.json` (veld `voice`), één take, mp3 in `audio/<id>.mp3`, `silalign.py` voor de woordtijden, opnieuw bouwen.
- Een dier aanpassen: in `bibliotheek/dieren/` (testvel, keuring), dan `lib_dieren.js` opnieuw naar `evolib/` kopiëren.

## Aandachtspunten

- Uitspraakwachtlijst: `uitspraak.md` (nog niet getest).
- Keuzes en vereenvoudigingen uit het storyboard staan in het docentdeel en in `storyboard_f1.json`.
