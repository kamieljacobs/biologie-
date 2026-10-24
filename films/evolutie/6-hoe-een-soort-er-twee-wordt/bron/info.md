# Hoe één soort er twee wordt — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/evolutie/6-hoe-een-soort-er-twee-wordt.html` (audio in `6-hoe-een-soort-er-twee-wordt/audio/`) |
| Reeks | Evolutie (v2), film 6 van 8 |
| Niveau | havo + vwo (vwo-blokken gemarkeerd) |
| Versie | 1.0 · oktober 2026 (script v2 = storyboard f6.json, goedgekeurd 23 okt 2026) |
| Prompt | v9 |
| Voldoet aan | prompt v9 (storyboard v8 + uitknippoppen) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.642 credits (flow zj5FRfKXphcKrbIM8PpL) |
| Duur | spraak 6:08 (368 s, basis 288 s); met vragen en kaarten ± 8 min |
| Beeldstijl | Part C: Macro, Micro en Schema; dieren uit `bibliotheek/dieren` (uitknippoppen), personages uit het castboek |
| Bouwvorm | FILMDATA-straat (engine uit films/vervolg, speler met Vragen aan/uit), reeksbibliotheek `lib_evo.js`; werkwijze in `bron/bouw/BOUWEN_EVO.md` |
| Herkomst | reeksontwerp en storyboards 22–23 okt 2026 (keuringsblad, beeldbank), productie 23 okt 2026 in reeksmodus: inspreken door een helper, animatie per film door een helper vanuit de keyframes |

## Opbouw

| Hoofdstuk | Segmenten |
|---|---|
| Cold open | s01 |
| Hoofdstuk 1 — Wat is een soort? | s03, s04, s05, q06, s07, s08, s09 |
| Hoofdstuk 2 — Eén pot wordt twee | s10, s11, s12, s13, q14, s15, s16, s17 |
| Hoofdstuk 3 — Wanneer is het echt een tweede soort? | s18, s19, s20, s21, q22, s23, s24 |
| Hoofdstuk 4 — Zonder barrière | s25, s26, s27, s28, q29, s30, s31 |
| Recap | s32 |

## Vragen

q06 → b; q14 → c; q22 → a; q29 → b.

## Begrippen

soort, hybride, ras, ondersoort, genenstroom, geografische isolatie, divergente evolutie, reproductieve isolatie, allopatrische soortvorming (vwo), sympatrische soortvorming (vwo).

## Waar wat in de HTML zit

| Regel | Inhoud |
|---|---|
| 99 | Begrippen |
| 101 | Checkvragen |
| 111 | Voor de docent |
| 159 | `window.FILMDATA` (segmenten, woordtijden, vragen) |
| 1845 | `const SCENES = {}`, daarna lib_bio, lib_evo, tekenbestanden, lib_dieren, lib_micro_evo, sb6.js (keyframes) |
| 9166 | `Object.assign(SCENES, { title, s01 … })` (de animatie per alinea, bron: `src/scenes_e6.js`) |

## Hoe je de film aanpast

Werkmap `/root/hw` opzetten zoals in `films/evolutie/storyboards-v2/productie/README.md`, de bronmap terugzetten in `/root/hw/e6/` (segments.json, map.json, film.py, sections.html, src/scenes_e6.js, src/teken_e6.js, stem/woordtijden → words/, ../audio → audio/), dan `python3 evo_bouw.py 6` en `python3 evo_pak.py 6`.
- Een tekstfout in beeld of een beweging: `scenes_e6.js` / `teken_e6.js` aanpassen, opnieuw bouwen.
- Een alinea opnieuw inspreken: stem-invoer uit `segments.json` (veld `voice`), één take, mp3 in `audio/<id>.mp3`, `silalign.py` voor de woordtijden, opnieuw bouwen.
- Een dier aanpassen: in `bibliotheek/dieren/` (testvel, keuring), dan `lib_dieren.js` opnieuw naar `evolib/` kopiëren.

## Aandachtspunten

- Uitspraakwachtlijst: `uitspraak.md` (nog niet getest).
- Keuzes en vereenvoudigingen uit het storyboard staan in het docentdeel en in `storyboard_f6.json`.
- s26: vissen die aan de rand verdwijnen komen aan de andere kant terug
- Kikker 'springen' is kort; in beweging nakijken
