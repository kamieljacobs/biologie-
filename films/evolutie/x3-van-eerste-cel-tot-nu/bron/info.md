# Van eerste cel tot nu — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/evolutie/x3-van-eerste-cel-tot-nu.html` (audio in `x3-van-eerste-cel-tot-nu/audio/`) |
| Reeks | Evolutie (v2), extra film 3 van 4 (buiten het PTA) |
| Niveau | havo + vwo (geen vwo-blokken) |
| Versie | 1.0 · oktober 2026 (script v2 = storyboard f11.json, goedgekeurd 24 okt 2026) |
| Voldoet aan | prompt v10 (C10 tekenkwaliteit; frisse beeldreview na het bouwen) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.655 credits (flow IxeSZ6NCjVcAIiAFSdTa) |
| Duur | spraak 6:26 (386 s, basis 386 s); met vragen en kaarten ± 8 min |
| Beeldstijl | Part C: Macro, Micro en Schema; dieren uit `bibliotheek/dieren` (uitknippoppen), personages uit het castboek |
| Bouwvorm | FILMDATA-straat (engine uit films/vervolg, speler met Vragen aan/uit), reeksbibliotheek `lib_evo.js`; werkwijze in `bron/bouw/BOUWEN_EVO.md` |
| Herkomst | reeksontwerp en storyboards 22–23 okt 2026 (keuringsblad, beeldbank), productie 24 okt 2026 in reeksmodus: inspreken door een helper, animatie per film door een helper vanuit de keyframes |

## Opbouw

| Hoofdstuk | Segmenten |
|---|---|
| Cold open | s01, s02, s03, s05 |
| Hoofdstuk 1 — Zuurstof uit de zee | s06, s07, s08, q09, s10, s11, s12 |
| Hoofdstuk 2 — De cel met een kern | s13, s14, s15, q16, s17, s18, s19, s20 |
| Hoofdstuk 3 — Groot worden en het land op | s21, s22, s23, s24, s25, s26, q27, s28, s29 |
| Hoofdstuk 4 — Rampen en nieuwe kansen | s30, s31, s32, s33, s34, q35, s36, s37, s38 |
| Recap | s39 |

## Vragen

q09 → b; q16 → c; q27 → a; q35 → c.

## Begrippen

LUCA, cyanobacteriën, prokaryoten, eukaryoten, endosymbiose, Cambrische explosie, massa-extinctie, schimmels.

## Waar wat in de HTML zit

| Regel | Inhoud |
|---|---|
| 99 | Begrippen |
| 101 | Checkvragen |
| 111 | Voor de docent |
| 184 | `window.FILMDATA` (segmenten, woordtijden, vragen) |
| 1870 | `const SCENES = {}`, daarna lib_bio, lib_evo, tekenbestanden, lib_dieren, lib_micro_evo, sb11.js (keyframes) |
| 11245 | `Object.assign(SCENES, { title, s01 … })` (de animatie per alinea, bron: `src/scenes_e11.js`) |

## Hoe je de film aanpast

Werkmap `/root/hw` opzetten zoals in `films/evolutie/storyboards-v2/productie/README.md`, de bronmap terugzetten in `/root/hw/e11/` (segments.json, map.json, film.py, sections.html, src/scenes_e11.js, src/teken_e11.js, stem/woordtijden → words/, ../audio → audio/), dan `python3 evo_bouw.py 11` en `python3 evo_pak.py 11`.
- Een tekstfout in beeld of een beweging: `scenes_e11.js` / `teken_e11.js` aanpassen, opnieuw bouwen.
- Een alinea opnieuw inspreken: stem-invoer uit `segments.json` (veld `voice`), één take, mp3 in `audio/<id>.mp3`, `silalign.py` voor de woordtijden, opnieuw bouwen.
- Een dier aanpassen: in `bibliotheek/dieren/` (testvel, keuring), dan `lib_dieren.js` opnieuw naar `evolib/` kopiëren.

## Aandachtspunten

- Uitspraakwachtlijst: `uitspraak.md` (nog niet getest).
- Keuzes en vereenvoudigingen uit het storyboard staan in het docentdeel en in `storyboard_f11.json`.
- Frisse beeldreview 24 okt 2026 verwerkt (MOET-punten hersteld)
