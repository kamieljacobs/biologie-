# Hoeveel passen er? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/ecologie/1-hoeveel-passen-er.html` (audio in `1-hoeveel-passen-er/audio/`) |
| Reeks | Ecologie (v2), film 1 van 8 |
| Niveau | havo + vwo (vwo-blokken gemarkeerd) |
| Versie | 1.0 · oktober 2026 (script v2 = storyboard f1.json, goedgekeurd 29 okt 2026) |
| Voldoet aan | prompt v13 (B15 variatie en selectie, C10 tekenkwaliteit) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 10.292 credits (flow NvMLyoDdQupMabE72Txb) |
| Duur | spraak 11:27 (687 s, basis 553 s); met vragen en kaarten ± 13 min |
| Beeldstijl | Part C: Macro, Micro en Schema; dieren als uitknippoppen (pop_eco_*.js, wolf_pop, pop_*, dieren_zoog, dieren_overig), personages uit het castboek |
| Bouwvorm | FILMDATA-straat (engine uit films/vervolg, speler met Vragen aan/uit), reeksbibliotheek `lib_eco.js` (+ lib_evo.js, lib_bio.js); werkwijze in `bron/bouw/BOUWEN_ECO.md` |
| Herkomst | reeksontwerp, B15 en storyboards 29 okt 2026 (keuringsblad), productie in reeksmodus: inspreken door een helper, animatie per film door een helper vanuit de keyframes |

## Opbouw

| Hoofdstuk | Segmenten |
|---|---|
| Cold open | s01, s02 |
| Hoofdstuk 1 — Wie tel je mee? | s04, s05, s06, s07, s08, s09, s10, q11, s12 |
| Hoofdstuk 2 — Erbij en eraf | s13, s14, s15, s16, s17, q18, s19 |
| Hoofdstuk 3 — Steeds sneller | s20, s21, s22, s23, q24, s25, s26, s27, q28, s29 |
| Hoofdstuk 4 — Wanneer is het vol? | s30, s31, s32, q33, s34, s35, s36 |
| Hoofdstuk 5 — Wat houdt het aantal in toom? | s37, s38, q39, s40, s41, s42, s43, s44, s45, s46, s47, q48, s49, s50 |
| Recap | s51, s52, s53 |

## Vragen

q11 → b; q18 → c; q24 → a; q28 → b; q33 → c; q39 → b; q48 → a.

## Begrippen

populatie, populatiegrootte, populatiedichtheid, vangen, merken en terugvangen, geboorte, sterfte, immigratie, emigratie, groeisnelheid, verdubbelingstijd, exponentiële groei (J-curve), logistische groei (S-curve), draagkracht, territorium, overshoot, dichtheidsafhankelijke factor, dichtheidsonafhankelijke factor, populatieregulatie, dynamiek, biologisch evenwicht, herintroductie, barrière, r-strategie (vwo), K-strategie (vwo), leeftijdsopbouw (vwo), eilandtheorie (vwo).

## Waar wat in de HTML zit

| Regel | Inhoud |
|---|---|
| 99 | Begrippen |
| 101 | Checkvragen |
| 111 | Voor de docent |
| 169 | `window.FILMDATA` (segmenten, woordtijden, vragen) |
| 2083 | `const SCENES = {}`, daarna base, dier_basis, lib_bio, lib_evo, dierbestanden, lib_eco, tekenbestanden, sb1.js (keyframes) |
| 19017 | `Object.assign(SCENES, { title, s01 … })` (de animatie per alinea, bron: `src/scenes_e1.js`) |

## Hoe je de film aanpast

Werkmap `/root/hwe` opzetten zoals in `bron/bouw/BOUWEN_ECO.md`, de bronmap terugzetten in `/root/hwe/e1/` (segments.json, map.json, film.py, sections.html, src/scenes_e1.js, src/teken_e1.js, stem/woordtijden → words/, ../audio → audio/), dan `python3 eco_bouw.py 1` en `python3 eco_pak.py 1`.
- Een tekstfout in beeld of een beweging: `scenes_e1.js` / `teken_e1.js` aanpassen, opnieuw bouwen.
- Een alinea opnieuw inspreken: stem-invoer uit `segments.json` (veld `voice`), één take, mp3 in `audio/<id>.mp3`, `silalign.py` voor de woordtijden, opnieuw bouwen.
- Een dier aanpassen: in het pop-bestand (testvel, keuring), dan opnieuw naar `ecolib/` kopiëren.

## Aandachtspunten

- Uitspraakwachtlijst: `uitspraak.md` (nog niet getest).
- Keuzes en vereenvoudigingen uit het storyboard staan in het docentdeel en in `storyboard_f1.json`.
