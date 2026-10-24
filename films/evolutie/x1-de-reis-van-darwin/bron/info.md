# De reis van Darwin — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/evolutie/x1-de-reis-van-darwin.html` (audio in `x1-de-reis-van-darwin/audio/`) |
| Reeks | Evolutie (v2), extra film 1 van 4 (buiten het PTA) |
| Niveau | havo + vwo (geen vwo-blokken) |
| Versie | 1.0 · oktober 2026 (script v2 = storyboard f9.json, goedgekeurd 24 okt 2026) |
| Prompt | v10 |
| Voldoet aan | prompt v10 (C10 tekenkwaliteit; frisse beeldreview na het bouwen) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.729 credits (flow wnYVwSVVS1U670z6lRT0) |
| Duur | spraak 6:35 (395 s, basis 395 s); met vragen en kaarten ± 8 min |
| Beeldstijl | Part C: Macro, Micro en Schema; dieren uit `bibliotheek/dieren` (uitknippoppen), personages uit het castboek |
| Bouwvorm | FILMDATA-straat (engine uit films/vervolg, speler met Vragen aan/uit), reeksbibliotheek `lib_evo.js`; werkwijze in `bron/bouw/BOUWEN_EVO.md` |
| Herkomst | reeksontwerp en storyboards 22–23 okt 2026 (keuringsblad, beeldbank), productie 24 okt 2026 in reeksmodus: inspreken door een helper, animatie per film door een helper vanuit de keyframes |

## Opbouw

| Hoofdstuk | Segmenten |
|---|---|
| Cold open | s01, s02 |
| Hoofdstuk 1 — Aan boord van de Beagle | s04, s05, s06, q07, s08 |
| Hoofdstuk 2 — Reuzen en nandoes | s09, s10, s11, s12, q13, s14, s15, s16, s17 |
| Hoofdstuk 3 — De eilanden | s18, s19, s20, s21, q22, s23, s24, q25, s26, s27 |
| Hoofdstuk 4 — I think | s28, s29, s30, s31, s32, q33, s34 |
| Hoofdstuk 5 — Wallace | s35, s36, s37, q38, s39, s40, s41 |
| Recap | s42 |

## Vragen

q07 → b; q13 → c; q22 → a; q25 → b; q33 → a; q38 → c.

## Begrippen

fossiel, uitgestorven, gemeenschappelijke voorouder, natuurlijke selectie.

## Waar wat in de HTML zit

| Regel | Inhoud |
|---|---|
| 99 | Begrippen |
| 101 | Checkvragen |
| 109 | Voor de docent |
| 189 | `window.FILMDATA` (segmenten, woordtijden, vragen) |
| 1875 | `const SCENES = {}`, daarna lib_bio, lib_evo, tekenbestanden, lib_dieren, lib_micro_evo, sb9.js (keyframes) |
| 12599 | `Object.assign(SCENES, { title, s01 … })` (de animatie per alinea, bron: `src/scenes_e9.js`) |

## Hoe je de film aanpast

Werkmap `/root/hw` opzetten zoals in `films/evolutie/storyboards-v2/productie/README.md`, de bronmap terugzetten in `/root/hw/e9/` (segments.json, map.json, film.py, sections.html, src/scenes_e9.js, src/teken_e9.js, stem/woordtijden → words/, ../audio → audio/), dan `python3 e9/bouw9.py` en `python3 evo_pak.py 9`.
- Een tekstfout in beeld of een beweging: `scenes_e9.js` / `teken_e9.js` aanpassen, opnieuw bouwen.
- Een alinea opnieuw inspreken: stem-invoer uit `segments.json` (veld `voice`), één take, mp3 in `audio/<id>.mp3`, `silalign.py` voor de woordtijden, opnieuw bouwen.
- Een dier aanpassen: in `bibliotheek/dieren/` (testvel, keuring), dan `lib_dieren.js` opnieuw naar `evolib/` kopiëren.

## Aandachtspunten

- Uitspraakwachtlijst: `uitspraak.md` (nog niet getest).
- Keuzes en vereenvoudigingen uit het storyboard staan in het docentdeel en in `storyboard_f9.json`.
- Frisse beeldreview 24 okt 2026 verwerkt (MOET-punten hersteld)
