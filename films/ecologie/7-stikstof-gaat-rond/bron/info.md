# Stikstof gaat rond — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/ecologie/7-stikstof-gaat-rond.html` (audio in `7-stikstof-gaat-rond/audio/`) |
| Reeks | Ecologie (v2), film 7 van 8 |
| Niveau | havo + vwo (vwo-blokken gemarkeerd) |
| Versie | 1.0 · oktober 2026 (script v2 = storyboard f7.json, goedgekeurd 29 okt 2026) |
| Voldoet aan | prompt v13 (B15 variatie en selectie, C10 tekenkwaliteit) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 9.739 credits (flow c4i1dHbTDinRNIW7zPc3) |
| Duur | spraak 10:48 (648 s, basis 602 s); met vragen en kaarten ± 12 min |
| Beeldstijl | Part C: Macro, Micro en Schema; dieren als uitknippoppen (pop_eco_*.js, wolf_pop, pop_*, dieren_zoog, dieren_overig), personages uit het castboek |
| Bouwvorm | FILMDATA-straat (engine uit films/vervolg, speler met Vragen aan/uit), reeksbibliotheek `lib_eco.js` (+ lib_evo.js, lib_bio.js); werkwijze in `bron/bouw/BOUWEN_ECO.md` |
| Herkomst | reeksontwerp, B15 en storyboards 29 okt 2026 (keuringsblad), productie in reeksmodus: inspreken door een helper, animatie per film door een helper vanuit de keyframes |

## Opbouw

| Hoofdstuk | Segmenten |
|---|---|
| Cold open | s01, s02 |
| Hoofdstuk 1 — Stikstof uit de lucht | s04, s05, s06, s07, q08, s09, s10, s11, q12, s13, s14, s15, s16, s17, s18, s19 |
| Hoofdstuk 2 — Van mest tot nitraat | s20, s21, s22, s23, s24, s25, s26, q27, s28, s29, s30 |
| Hoofdstuk 3 — Het lek naar de sloot | s31, s32, q33, s34, s35, s36, s37, s38, s39, q40, s41, s42 |
| Hoofdstuk 4 — Zonder zuurstof | s43, s44, q45, s46, s47, s48 |
| Hoofdstuk 5 — Van wc tot kraan | s49, s50, s51, s52, s53, q54, s55, s56 |
| Recap | s57, s58 |

## Vragen

q08 → b; q12 → c; q27 → a; q33 → c; q40 → b; q45 → a; q54 → c.

## Begrippen

stikstofkringloop, stikstofgas (N₂), stikstofbinding (stikstoffixatie), wortelknolletje, vlinderbloemigen, mutualisme, stikstofassimilatie, voortgezette assimilatie, ureum, ammonificatie, nitrificatie, denitrificatie, aeroob / anaeroob, uitspoeling, stikstofbalans, fosforkringloop, eutrofiëring, rioolwaterzuiveringsinstallatie (rwzi), chemo-autotroof (vwo), C/N-verhouding (vwo), deammonificatie (anammox) (vwo).

## Waar wat in de HTML zit

| Regel | Inhoud |
|---|---|
| 99 | Begrippen |
| 101 | Checkvragen |
| 116 | Voor de docent |
| 175 | `window.FILMDATA` (segmenten, woordtijden, vragen) |
| 2089 | `const SCENES = {}`, daarna base, dier_basis, lib_bio, lib_evo, dierbestanden, lib_eco, tekenbestanden, sb7.js (keyframes) |
| 19116 | `Object.assign(SCENES, { title, s01 … })` (de animatie per alinea, bron: `src/scenes_e7.js`) |

## Hoe je de film aanpast

Werkmap `/root/hwe` opzetten zoals in `bron/bouw/BOUWEN_ECO.md`, de bronmap terugzetten in `/root/hwe/e7/` (segments.json, map.json, film.py, sections.html, src/scenes_e7.js, src/teken_e7.js, stem/woordtijden → words/, ../audio → audio/), dan `python3 eco_bouw.py 7` en `python3 eco_pak.py 7`.
- Een tekstfout in beeld of een beweging: `scenes_e7.js` / `teken_e7.js` aanpassen, opnieuw bouwen.
- Een alinea opnieuw inspreken: stem-invoer uit `segments.json` (veld `voice`), één take, mp3 in `audio/<id>.mp3`, `silalign.py` voor de woordtijden, opnieuw bouwen.
- Een dier aanpassen: in het pop-bestand (testvel, keuring), dan opnieuw naar `ecolib/` kopiëren.

## Aandachtspunten

- Uitspraakwachtlijst: `uitspraak.md` (nog niet getest).
- Keuzes en vereenvoudigingen uit het storyboard staan in het docentdeel en in `storyboard_f7.json`.
