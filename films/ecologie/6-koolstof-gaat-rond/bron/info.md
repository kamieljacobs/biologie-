# Koolstof gaat rond — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/ecologie/6-koolstof-gaat-rond.html` (audio in `6-koolstof-gaat-rond/audio/`) |
| Reeks | Ecologie (v2), film 6 van 8 |
| Niveau | havo + vwo (vwo-blokken gemarkeerd) |
| Versie | 1.0 · oktober 2026 (script v2 = storyboard f6.json, goedgekeurd 29 okt 2026) |
| Voldoet aan | prompt v13 (B15 variatie en selectie, C10 tekenkwaliteit) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 7.167 credits (flow jgPslE69gooj7UNKTzYW) |
| Duur | spraak 8:00 (480 s, basis 416 s); met vragen en kaarten ± 9 min |
| Beeldstijl | Part C: Macro, Micro en Schema; dieren als uitknippoppen (pop_eco_*.js, wolf_pop, pop_*, dieren_zoog, dieren_overig), personages uit het castboek |
| Bouwvorm | FILMDATA-straat (engine uit films/vervolg, speler met Vragen aan/uit), reeksbibliotheek `lib_eco.js` (+ lib_evo.js, lib_bio.js); werkwijze in `bron/bouw/BOUWEN_ECO.md` |
| Herkomst | reeksontwerp, B15 en storyboards 29 okt 2026 (keuringsblad), productie in reeksmodus: inspreken door een helper, animatie per film door een helper vanuit de keyframes |

## Opbouw

| Hoofdstuk | Segmenten |
|---|---|
| Cold open | s01, s02 |
| Hoofdstuk 1 — De snelle kringloop | s04, s05, q06, s07, s08, s09 |
| Hoofdstuk 2 — Waar afbraak stopt | s10, s11, s12, q13, s14, s15, s16, s17 |
| Hoofdstuk 3 — Voorraad en stroom | s18, s19, q20, s21, s22, s23, s24, s25, s26, q27, s28, s29, s30, s31, s32, q33, s34, s35 |
| Hoofdstuk 4 — Opslag of kringloop? | s36, s37, q38, s39, s40 |
| Recap | s41 |

## Vragen

q06 → b; q13 → a; q20 → b; q27 → a; q33 → b; q38 → c.

## Begrippen

koolstofkringloop, koolstofreservoir (voorraad), stroom, snelle kringloop, trage kringloop, veen, fossiele brandstof, kalksteen, gigaton (Gt), Keelingcurve (vwo), positieve terugkoppeling (vwo).

## Waar wat in de HTML zit

| Regel | Inhoud |
|---|---|
| 99 | Begrippen |
| 101 | Checkvragen |
| 110 | Voor de docent |
| 164 | `window.FILMDATA` (segmenten, woordtijden, vragen) |
| 2078 | `const SCENES = {}`, daarna base, dier_basis, lib_bio, lib_evo, dierbestanden, lib_eco, tekenbestanden, sb6.js (keyframes) |
| 19005 | `Object.assign(SCENES, { title, s01 … })` (de animatie per alinea, bron: `src/scenes_e6.js`) |

## Hoe je de film aanpast

Werkmap `/root/hwe` opzetten zoals in `bron/bouw/BOUWEN_ECO.md`, de bronmap terugzetten in `/root/hwe/e6/` (segments.json, map.json, film.py, sections.html, src/scenes_e6.js, src/teken_e6.js, stem/woordtijden → words/, ../audio → audio/), dan `python3 eco_bouw.py 6` en `python3 eco_pak.py 6`.
- Een tekstfout in beeld of een beweging: `scenes_e6.js` / `teken_e6.js` aanpassen, opnieuw bouwen.
- Een alinea opnieuw inspreken: stem-invoer uit `segments.json` (veld `voice`), één take, mp3 in `audio/<id>.mp3`, `silalign.py` voor de woordtijden, opnieuw bouwen.
- Een dier aanpassen: in het pop-bestand (testvel, keuring), dan opnieuw naar `ecolib/` kopiëren.

## Aandachtspunten

- Uitspraakwachtlijst: `uitspraak.md` (nog niet getest).
- Keuzes en vereenvoudigingen uit het storyboard staan in het docentdeel en in `storyboard_f6.json`.
