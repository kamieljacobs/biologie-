# Waar blijft het blad? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/ecologie/4-waar-blijft-het-blad.html` (audio in `4-waar-blijft-het-blad/audio/`) |
| Reeks | Ecologie (v2), film 4 van 8 |
| Niveau | havo + vwo (vwo-blokken gemarkeerd) |
| Versie | 1.0 · oktober 2026 (script v2 = storyboard f4.json, goedgekeurd 29 okt 2026) |
| Voldoet aan | prompt v13 (B15 variatie en selectie, C10 tekenkwaliteit) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 6.920 credits (flow 2ef8aCTeNaL5lmIXXb8W) |
| Duur | spraak 7:43 (463 s, basis 416 s); met vragen en kaarten ± 9 min |
| Beeldstijl | Part C: Macro, Micro en Schema; dieren als uitknippoppen (pop_eco_*.js, wolf_pop, pop_*, dieren_zoog, dieren_overig), personages uit het castboek |
| Bouwvorm | FILMDATA-straat (engine uit films/vervolg, speler met Vragen aan/uit), reeksbibliotheek `lib_eco.js` (+ lib_evo.js, lib_bio.js); werkwijze in `bron/bouw/BOUWEN_ECO.md` |
| Herkomst | reeksontwerp, B15 en storyboards 29 okt 2026 (keuringsblad), productie in reeksmodus: inspreken door een helper, animatie per film door een helper vanuit de keyframes |

## Opbouw

| Hoofdstuk | Segmenten |
|---|---|
| Cold open | s01, s02 |
| Hoofdstuk 1 — Een blad is voedsel | s04, s05, s06, q07, s08, s09, s10, q11, s12 |
| Hoofdstuk 2 — De opruimers | s13, s14, s15, s16, s17, s18, s19, q20, s21, s22, s23, q24, s25, s26, s27 |
| Hoofdstuk 3 — De composthoop | s28, s29, s30, s31, q32, s33, s34 |
| Hoofdstuk 4 — Waar afbraak stopt | s35, s36, s37, s38, q39, s40, s41, s42 |
| Recap | s43, s44 |

## Vragen

q07 → c; q11 → a; q20 → b; q24 → c; q32 → a; q39 → c.

## Begrippen

organische stof, anorganische stof, autotroof, heterotroof, producent · consument · reducent, detritus, detrituseter, mineralisatie, voorwaarden voor afbraak, veen · hoogveen · turf, compost, chemo-autotroof (vwo), C/N-verhouding (vwo).

## Waar wat in de HTML zit

| Regel | Inhoud |
|---|---|
| 99 | Begrippen |
| 101 | Checkvragen |
| 112 | Voor de docent |
| 159 | `window.FILMDATA` (segmenten, woordtijden, vragen) |
| 2073 | `const SCENES = {}`, daarna base, dier_basis, lib_bio, lib_evo, dierbestanden, lib_eco, tekenbestanden, sb4.js (keyframes) |
| 18865 | `Object.assign(SCENES, { title, s01 … })` (de animatie per alinea, bron: `src/scenes_e4.js`) |

## Hoe je de film aanpast

Werkmap `/root/hwe` opzetten zoals in `bron/bouw/BOUWEN_ECO.md`, de bronmap terugzetten in `/root/hwe/e4/` (segments.json, map.json, film.py, sections.html, src/scenes_e4.js, src/teken_e4.js, stem/woordtijden → words/, ../audio → audio/), dan `python3 eco_bouw.py 4` en `python3 eco_pak.py 4`.
- Een tekstfout in beeld of een beweging: `scenes_e4.js` / `teken_e4.js` aanpassen, opnieuw bouwen.
- Een alinea opnieuw inspreken: stem-invoer uit `segments.json` (veld `voice`), één take, mp3 in `audio/<id>.mp3`, `silalign.py` voor de woordtijden, opnieuw bouwen.
- Een dier aanpassen: in het pop-bestand (testvel, keuring), dan opnieuw naar `ecolib/` kopiëren.

## Aandachtspunten

- Uitspraakwachtlijst: `uitspraak.md` (nog niet getest).
- Keuzes en vereenvoudigingen uit het storyboard staan in het docentdeel en in `storyboard_f4.json`.
