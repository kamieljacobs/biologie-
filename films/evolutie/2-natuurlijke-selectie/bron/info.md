# Natuurlijke selectie — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/evolutie/2-natuurlijke-selectie.html` (audio in `2-natuurlijke-selectie/audio/`) |
| Reeks | Evolutie (v2), film 2 van 8 |
| Niveau | havo + vwo (geen vwo-blokken) |
| Versie | 1.0 · oktober 2026 (script v2 = storyboard f2.json, goedgekeurd 23 okt 2026) |
| Prompt | v9 |
| Voldoet aan | prompt v9 (storyboard v8 + uitknippoppen) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.310 credits (flow u88FTUHgrWbEkySZyFJz) |
| Duur | spraak 5:52 (352 s, basis 352 s); met vragen en kaarten ± 7 min |
| Beeldstijl | Part C: Macro, Micro en Schema; dieren uit `bibliotheek/dieren` (uitknippoppen), personages uit het castboek |
| Bouwvorm | FILMDATA-straat (engine uit films/vervolg, speler met Vragen aan/uit), reeksbibliotheek `lib_evo.js`; werkwijze in `bron/bouw/BOUWEN_EVO.md` |
| Herkomst | reeksontwerp en storyboards 22–23 okt 2026 (keuringsblad, beeldbank), productie 23 okt 2026 in reeksmodus: inspreken door een helper, animatie per film door een helper vanuit de keyframes |

## Opbouw

| Hoofdstuk | Segmenten |
|---|---|
| Cold open | s01, s02 |
| Hoofdstuk 1 — Te veel jongen | s04, s05, q06, s07, s08 |
| Hoofdstuk 2 — Droogte op Daphne Major | s09, s10, s11, s12, s13, q14, s15, s16, s17, s18, q19, s20, s21 |
| Hoofdstuk 3 — Wie wint? | s22, s23, s24, s25, q26, s27 |
| Hoofdstuk 4 — Aangepast, zonder doel | s28, s29, s30, q31, s32, s33 |
| Recap | s34 |

## Vragen

q06 → c; q14 → a; q19 → b; q26 → a; q31 → b.

## Begrippen

overproductie, variatie, histogram, selectiedruk, selectievoordeel, natuurlijke selectie, fitness, adaptatie, camouflage, evolutie.

## Waar wat in de HTML zit

| Regel | Inhoud |
|---|---|
| 99 | Begrippen |
| 101 | Checkvragen |
| 109 | Voor de docent |
| 155 | `window.FILMDATA` (segmenten, woordtijden, vragen) |
| 1841 | `const SCENES = {}`, daarna lib_bio, lib_evo, tekenbestanden, lib_dieren, lib_micro_evo, sb2.js (keyframes) |
| 9622 | `Object.assign(SCENES, { title, s01 … })` (de animatie per alinea, bron: `src/scenes_e2.js`) |

## Hoe je de film aanpast

Werkmap `/root/hw` opzetten zoals in `films/evolutie/storyboards-v2/productie/README.md`, de bronmap terugzetten in `/root/hw/e2/` (segments.json, map.json, film.py, sections.html, src/scenes_e2.js, src/teken_e2.js, stem/woordtijden → words/, ../audio → audio/), dan `python3 evo_bouw.py 2` en `python3 evo_pak.py 2`.
- Een tekstfout in beeld of een beweging: `scenes_e2.js` / `teken_e2.js` aanpassen, opnieuw bouwen.
- Een alinea opnieuw inspreken: stem-invoer uit `segments.json` (veld `voice`), één take, mp3 in `audio/<id>.mp3`, `silalign.py` voor de woordtijden, opnieuw bouwen.
- Een dier aanpassen: in `bibliotheek/dieren/` (testvel, keuring), dan `lib_dieren.js` opnieuw naar `evolib/` kopiëren.

## Aandachtspunten

- Uitspraakwachtlijst: `uitspraak.md` (nog niet getest).
- Keuzes en vereenvoudigingen uit het storyboard staan in het docentdeel en in `storyboard_f2.json`.
- s28 en s29: groene rupsen vallen door de camouflage bijna weg tegen het blad (bedoeld); s29 licht ze per generatie op
- Vink en merel in vlucht zijn klein en snel; op tempo nakijken
