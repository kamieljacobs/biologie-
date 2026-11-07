# Toeval en uitwisseling — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/evolutie/5-toeval-en-uitwisseling.html` (audio in `5-toeval-en-uitwisseling/audio/`) |
| Reeks | Evolutie (v2), film 5 van 8 |
| Niveau | havo + vwo (vwo-blokken gemarkeerd) |
| Versie | 1.1 · oktober 2026 (heropname 25 okt: s12; (2): s12 tiefoon) (script v2 = storyboard f5.json, goedgekeurd 23 okt 2026) |
| Prompt | v9 |
| Voldoet aan | prompt v9 (storyboard v8 + uitknippoppen) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 6.763 credits (flow BEwKaXEgaPvQeqXyRXcV) |
| Duur | spraak 7:31 (451 s, basis 345 s); met vragen en kaarten ± 9 min |
| Beeldstijl | Part C: Macro, Micro en Schema; dieren uit `bibliotheek/dieren` (uitknippoppen), personages uit het castboek |
| Bouwvorm | FILMDATA-straat (engine uit films/vervolg, speler met Vragen aan/uit), reeksbibliotheek `lib_evo.js`; werkwijze in `bron/bouw/BOUWEN_EVO.md` |
| Herkomst | reeksontwerp en storyboards 22–23 okt 2026 (keuringsblad, beeldbank), productie 23 okt 2026 in reeksmodus: inspreken door een helper, animatie per film door een helper vanuit de keyframes |

## Opbouw

| Hoofdstuk | Segmenten |
|---|---|
| Cold open | s01, s02, s03 |
| Hoofdstuk 1 — Genetische drift | s05, s06, s07, q08, s09, s10, s11 |
| Hoofdstuk 2 — Flessenhals en founder-effect | s12, s13, s14, q15, s16, s17, s18, s19, s20, s21 |
| Hoofdstuk 3 — Genenstroom | s22, s23, s24, q25, s26, s27 |
| Hoofdstuk 4 — Vier krachten in één pot | s28, s29, s30, s31, q32, s33 |
| Hoofdstuk 5 — Hardy-Weinberg en heterozygotenvoordeel | s34, s35, s36, s37, s38, s39, q40, s41, s42, s43, s44, q45, s46 |
| Recap | s47, s48, s49 |

## Vragen

q08 → c; q15 → a; q25 → b; q32 → c; q40 → b; q45 → a.

## Begrippen

genetische drift, flessenhalseffect, founder-effect, genenstroom, genetische variatie, Hardy-Weinberg (vwo), genotypefrequentie (vwo), heterozygotenvoordeel (vwo).

## Waar wat in de HTML zit

| Regel | Inhoud |
|---|---|
| 99 | Begrippen |
| 101 | Checkvragen |
| 112 | Voor de docent |
| 165 | `window.FILMDATA` (segmenten, woordtijden, vragen) |
| 1851 | `const SCENES = {}`, daarna lib_bio, lib_evo, tekenbestanden, lib_dieren, lib_micro_evo, sb5.js (keyframes) |
| 9253 | `Object.assign(SCENES, { title, s01 … })` (de animatie per alinea, bron: `src/scenes_e5.js`) |

## Hoe je de film aanpast

Werkmap `/root/hw` opzetten zoals in `films/evolutie/storyboards-v2/productie/README.md`, de bronmap terugzetten in `/root/hw/e5/` (segments.json, map.json, film.py, sections.html, src/scenes_e5.js, src/teken_e5.js, stem/woordtijden → words/, ../audio → audio/), dan `python3 evo_bouw.py 5` en `python3 evo_pak.py 5`.
- Een tekstfout in beeld of een beweging: `scenes_e5.js` / `teken_e5.js` aanpassen, opnieuw bouwen.
- Een alinea opnieuw inspreken: stem-invoer uit `segments.json` (veld `voice`), één take, mp3 in `audio/<id>.mp3`, `silalign.py` voor de woordtijden, opnieuw bouwen.
- Een dier aanpassen: in `bibliotheek/dieren/` (testvel, keuring), dan `lib_dieren.js` opnieuw naar `evolib/` kopiëren.

## Aandachtspunten

- Uitspraakwachtlijst: `uitspraak.md` (nog niet getest).
- Keuzes en vereenvoudigingen uit het storyboard staan in het docentdeel en in `storyboard_f5.json`.
- s07: tien muizen als voorbeeldpopulatie (script noemt geen soort)
- s16: vier potten zijn schematisch, percentages illustratief (label 'schematisch')
- Heropname 25 okt 2026: s12 opnieuw ingesproken (tyfoon (nieuwe take), 141 credits); duur bijgewerkt. Het versielabel in de film zelf (footer) staat nog op 1.0.
