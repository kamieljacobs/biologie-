# Waar past een soort? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/ecologie/2-waar-past-een-soort.html` (audio in `2-waar-past-een-soort/audio/`) |
| Reeks | Ecologie (v2), film 2 van 8 |
| Niveau | havo + vwo (vwo-blokken gemarkeerd) |
| Versie | 1.0 · oktober 2026 (script v2 = storyboard f2.json, goedgekeurd 29 okt 2026) |
| Voldoet aan | prompt v13 (B15 variatie en selectie, C10 tekenkwaliteit) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 9.001 credits (flow rUbhQL5kDuixwodh8Cac) |
| Duur | spraak 9:51 (591 s, basis 517 s); met vragen en kaarten ± 11 min |
| Beeldstijl | Part C: Macro, Micro en Schema; dieren als uitknippoppen (pop_eco_*.js, wolf_pop, pop_*, dieren_zoog, dieren_overig), personages uit het castboek |
| Bouwvorm | FILMDATA-straat (engine uit films/vervolg, speler met Vragen aan/uit), reeksbibliotheek `lib_eco.js` (+ lib_evo.js, lib_bio.js); werkwijze in `bron/bouw/BOUWEN_ECO.md` |
| Herkomst | reeksontwerp, B15 en storyboards 29 okt 2026 (keuringsblad), productie in reeksmodus: inspreken door een helper, animatie per film door een helper vanuit de keyframes |

## Opbouw

| Hoofdstuk | Segmenten |
|---|---|
| Cold open | s01, s02 |
| Hoofdstuk 1 — Wat is er anders? | s04, s05, s06, s07, s08, s09, s10, q11, s12 |
| Hoofdstuk 2 — Binnen de grenzen | s13, s14, s15, s16, s17, s18, s19, s20, q21, s22 |
| Hoofdstuk 3 — De zwakste schakel | s23, s24, s25, q26, s27, s28 |
| Hoofdstuk 4 — Eén boom, twee mezen | s29, s30, q31, s32, s33, s34, s35, q36, s37, s38, s39, s40, s41, s42, s43, q44, s45 |
| Recap | s46, s47, s48 |

## Vragen

q11 → a; q21 → c; q26 → b; q31 → c; q36 → a; q44 → b.

## Begrippen

ecosysteem, levensgemeenschap, habitat, abiotische factor, biotische factor, tolerantie, optimum, optimumkromme, minimum- en maximumtolerantiegrens, beperkende factor, wet van het minimum, indicatorsoort, niche, concurrentie, intraspecifieke concurrentie, interspecifieke concurrentie, concurrentie-uitsluitingsprincipe, adaptatie, acclimatisatie (vwo), fotoperiodiciteit (vwo).

## Waar wat in de HTML zit

| Regel | Inhoud |
|---|---|
| 99 | Begrippen |
| 101 | Checkvragen |
| 111 | Voor de docent |
| 163 | `window.FILMDATA` (segmenten, woordtijden, vragen) |
| 2077 | `const SCENES = {}`, daarna base, dier_basis, lib_bio, lib_evo, dierbestanden, lib_eco, tekenbestanden, sb2.js (keyframes) |
| 19108 | `Object.assign(SCENES, { title, s01 … })` (de animatie per alinea, bron: `src/scenes_e2.js`) |

## Hoe je de film aanpast

Werkmap `/root/hwe` opzetten zoals in `bron/bouw/BOUWEN_ECO.md`, de bronmap terugzetten in `/root/hwe/e2/` (segments.json, map.json, film.py, sections.html, src/scenes_e2.js, src/teken_e2.js, stem/woordtijden → words/, ../audio → audio/), dan `python3 eco_bouw.py 2` en `python3 eco_pak.py 2`.
- Een tekstfout in beeld of een beweging: `scenes_e2.js` / `teken_e2.js` aanpassen, opnieuw bouwen.
- Een alinea opnieuw inspreken: stem-invoer uit `segments.json` (veld `voice`), één take, mp3 in `audio/<id>.mp3`, `silalign.py` voor de woordtijden, opnieuw bouwen.
- Een dier aanpassen: in het pop-bestand (testvel, keuring), dan opnieuw naar `ecolib/` kopiëren.

## Aandachtspunten

- Uitspraakwachtlijst: `uitspraak.md` (nog niet getest).
- Keuzes en vereenvoudigingen uit het storyboard staan in het docentdeel en in `storyboard_f2.json`.
