# Van zand tot bos — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/ecologie/8-van-zand-tot-bos.html` (audio in `8-van-zand-tot-bos/audio/`) |
| Reeks | Ecologie (v2), film 8 van 8 |
| Niveau | havo + vwo (vwo-blokken gemarkeerd) |
| Versie | 1.0 · oktober 2026 (script v2 = storyboard f8.json, goedgekeurd 29 okt 2026) |
| Voldoet aan | prompt v13 (B15 variatie en selectie, C10 tekenkwaliteit) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 6.132 credits (flow KFvn2gjdb0Mmz0yTp18n) |
| Duur | spraak 6:42 (402 s, basis 384 s); met vragen en kaarten ± 8 min |
| Beeldstijl | Part C: Macro, Micro en Schema; dieren als uitknippoppen (pop_eco_*.js, wolf_pop, pop_*, dieren_zoog, dieren_overig), personages uit het castboek |
| Bouwvorm | FILMDATA-straat (engine uit films/vervolg, speler met Vragen aan/uit), reeksbibliotheek `lib_eco.js` (+ lib_evo.js, lib_bio.js); werkwijze in `bron/bouw/BOUWEN_ECO.md` |
| Herkomst | reeksontwerp, B15 en storyboards 29 okt 2026 (keuringsblad), productie in reeksmodus: inspreken door een helper, animatie per film door een helper vanuit de keyframes |

## Opbouw

| Hoofdstuk | Segmenten |
|---|---|
| Cold open | s01, s02 |
| Hoofdstuk 1 — De eerste bewoners | s04, s05, s06, q07, s08, s09, s10 |
| Hoofdstuk 2 — Pioniers veranderen de plek | s11, s12, s13, s14, s15, q16, s17, s18, s19 |
| Hoofdstuk 3 — Is het bos ooit af? | s20, s21, s22, s23, q24, s25, s26, s27, s28 |
| Hoofdstuk 4 — Na de brand | s29, s30, s31, q32, s33, s34, s35, s36 |
| Recap | s37, s38 |

## Vragen

q07 → c; q16 → a; q24 → b; q32 → c.

## Begrippen

successie, primaire successie, secundaire successie, pioniersoort, tolerantie, humus, climaxecosysteem, zaadbank, biologisch evenwicht, dynamiek, invasieve exoot, abiotische en biotische sturing (vwo).

## Waar wat in de HTML zit

| Regel | Inhoud |
|---|---|
| 99 | Begrippen |
| 101 | Checkvragen |
| 111 | Voor de docent |
| 161 | `window.FILMDATA` (segmenten, woordtijden, vragen) |
| 2075 | `const SCENES = {}`, daarna base, dier_basis, lib_bio, lib_evo, dierbestanden, lib_eco, tekenbestanden, sb8.js (keyframes) |
| 18857 | `Object.assign(SCENES, { title, s01 … })` (de animatie per alinea, bron: `src/scenes_e8.js`) |

## Hoe je de film aanpast

Werkmap `/root/hwe` opzetten zoals in `bron/bouw/BOUWEN_ECO.md`, de bronmap terugzetten in `/root/hwe/e8/` (segments.json, map.json, film.py, sections.html, src/scenes_e8.js, src/teken_e8.js, stem/woordtijden → words/, ../audio → audio/), dan `python3 eco_bouw.py 8` en `python3 eco_pak.py 8`.
- Een tekstfout in beeld of een beweging: `scenes_e8.js` / `teken_e8.js` aanpassen, opnieuw bouwen.
- Een alinea opnieuw inspreken: stem-invoer uit `segments.json` (veld `voice`), één take, mp3 in `audio/<id>.mp3`, `silalign.py` voor de woordtijden, opnieuw bouwen.
- Een dier aanpassen: in het pop-bestand (testvel, keuring), dan opnieuw naar `ecolib/` kopiëren.

## Aandachtspunten

- Uitspraakwachtlijst: `uitspraak.md` (nog niet getest).
- Keuzes en vereenvoudigingen uit het storyboard staan in het docentdeel en in `storyboard_f8.json`.
