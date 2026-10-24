# De mens als selectiefactor — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/evolutie/4-de-mens-als-selectiefactor.html` (audio in `4-de-mens-als-selectiefactor/audio/`) |
| Reeks | Evolutie (v2), film 4 van 8 |
| Niveau | havo + vwo (geen vwo-blokken) |
| Versie | 1.0 · oktober 2026 (script v2 = storyboard f4.json, goedgekeurd 23 okt 2026) |
| Voldoet aan | prompt v9 (storyboard v8 + uitknippoppen) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 6.211 credits (flow ANMOY6vDRF992c1iQETe) |
| Duur | spraak 6:42 (402 s, basis 402 s); met vragen en kaarten ± 8 min |
| Beeldstijl | Part C: Macro, Micro en Schema; dieren uit `bibliotheek/dieren` (uitknippoppen), personages uit het castboek |
| Bouwvorm | FILMDATA-straat (engine uit films/vervolg, speler met Vragen aan/uit), reeksbibliotheek `lib_evo.js`; werkwijze in `bron/bouw/BOUWEN_EVO.md` |
| Herkomst | reeksontwerp en storyboards 22–23 okt 2026 (keuringsblad, beeldbank), productie 23 okt 2026 in reeksmodus: inspreken door een helper, animatie per film door een helper vanuit de keyframes |

## Opbouw

| Hoofdstuk | Segmenten |
|---|---|
| Cold open | s01 |
| Hoofdstuk 1 — Bacteriën evolueren snel | s03, s04, s05, q06, s07 |
| Hoofdstuk 2 — Het antibioticum kiest | s08, s09, s10, q11, s12, s13, s14, s15, q16, s17, s18 |
| Hoofdstuk 3 — De pot lekt | s19, s20, s21, q22, s23, s24 |
| Hoofdstuk 4 — De mens kiest | s25, s26, s27, q28, s29, s30 |
| Hoofdstuk 5 — Inteelt en de genenbank | s31, s32, q33, s34, s35, s36 |
| Recap | s37 |

## Vragen

q06 → b; q11 → c; q16 → a; q22 → c; q28 → a; q33 → c.

## Begrippen

generatietijd, antibioticaresistentie, selectiedruk, plasmide, kunstmatige selectie, veredeling, ras, inteelt, genenbank.

## Waar wat in de HTML zit

| Regel | Inhoud |
|---|---|
| 99 | Begrippen |
| 101 | Checkvragen |
| 111 | Voor de docent |
| 163 | `window.FILMDATA` (segmenten, woordtijden, vragen) |
| 1849 | `const SCENES = {}`, daarna lib_bio, lib_evo, tekenbestanden, lib_dieren, lib_micro_evo, sb4.js (keyframes) |
| 9174 | `Object.assign(SCENES, { title, s01 … })` (de animatie per alinea, bron: `src/scenes_e4.js`) |

## Hoe je de film aanpast

Werkmap `/root/hw` opzetten zoals in `films/evolutie/storyboards-v2/productie/README.md`, de bronmap terugzetten in `/root/hw/e4/` (segments.json, map.json, film.py, sections.html, src/scenes_e4.js, src/teken_e4.js, stem/woordtijden → words/, ../audio → audio/), dan `python3 evo_bouw.py 4` en `python3 evo_pak.py 4`.
- Een tekstfout in beeld of een beweging: `scenes_e4.js` / `teken_e4.js` aanpassen, opnieuw bouwen.
- Een alinea opnieuw inspreken: stem-invoer uit `segments.json` (veld `voice`), één take, mp3 in `audio/<id>.mp3`, `silalign.py` voor de woordtijden, opnieuw bouwen.
- Een dier aanpassen: in `bibliotheek/dieren/` (testvel, keuring), dan `lib_dieren.js` opnieuw naar `evolib/` kopiëren.

## Aandachtspunten

- Uitspraakwachtlijst: `uitspraak.md` (nog niet getest).
- Keuzes en vereenvoudigingen uit het storyboard staan in het docentdeel en in `storyboard_f4.json`.
- Herdershond: overgang van lopen naar staan is een harde wissel (bekende zwakte van de hondenpop)
- Mops zit met de staart laag (zie lessen_pop_honden.md)
- s25 en s29: figurant Erik (castboek) als mens bij de wolf en als hondenfokker; in s25 staat hij in een rustige zijhouding in moderne kleding
