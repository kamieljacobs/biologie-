# Wat is evolutie eigenlijk? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/evolutie/1-wat-is-evolutie.html` (audio in `1-wat-is-evolutie/audio/`) |
| Reeks | Evolutie (v2), film 1 van 8 |
| Niveau | havo + vwo (geen vwo-blokken) |
| Versie | 1.1 · 7 november 2026 (review + opwaardering v13; script v2 = storyboard f1.json, goedgekeurd 23 okt 2026) |
| Prompt | v13 |
| Voldoet aan | prompt v13 (opgewaardeerd 7 nov 2026, zonder keuring: delta v10–v13 nagelopen; zie Ronde 7 nov 2026) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.325 credits (flow 0jYQkEDLOgztb2FiITqI) |
| Duur | spraak 5:50 (350 s, basis 350 s); met vragen en kaarten ± 7 min |
| Beeldstijl | Part C: Macro, Micro en Schema; dieren uit `bibliotheek/dieren` (uitknippoppen), personages uit het castboek |
| Bouwvorm | FILMDATA-straat (engine uit films/vervolg, speler met Vragen aan/uit), reeksbibliotheek `lib_evo.js`; werkwijze in `bron/bouw/BOUWEN_EVO.md` |
| Herkomst | reeksontwerp en storyboards 22–23 okt 2026 (keuringsblad, beeldbank), productie 23 okt 2026 in reeksmodus: inspreken door een helper, animatie per film door een helper vanuit de keyframes |

## Opbouw

| Hoofdstuk | Segmenten |
|---|---|
| Cold open | s01, s02 |
| Hoofdstuk 1 — Variatie | s04, s05, s06, s07, s08, s09, q10, s11, s12 |
| Hoofdstuk 2 — Waar komt variatie vandaan? | s13, s14, s15, q16, s17, s18, s19, s20 |
| Hoofdstuk 3 — Populatie en genenpool | s21, s22, q23, s24, s25, s26, s27, s28, q29, s30 |
| Hoofdstuk 4 — Evolutie | s31, s32, q33, s34, s35, s36 |
| Recap | s37, s38, s39 |

## Vragen

q10 → c; q16 → b; q23 → c; q29 → a; q33 → b.

## Begrippen

variatie, allel, mutatie, recombinatie, populatie, genenpool, allelfrequentie, evolutie.

## Waar wat in de HTML zit

| Regel | Inhoud |
|---|---|
| 104 | Begrippen |
| 106 | Checkvragen |
| 115 | Voor de docent |
| 158 | `window.FILMDATA` (segmenten, woordtijden, vragen) |
| 1844 | `const SCENES = {}`, daarna lib_bio, lib_evo, tekenbestanden, lib_dieren, lib_micro_evo, sb1.js (keyframes) |
| 9167 | `Object.assign(SCENES, { title, s01 … })` (de animatie per alinea, bron: `src/scenes_e1.js`) |

## Hoe je de film aanpast

Werkmap `/root/hw` opzetten zoals in `films/evolutie/storyboards-v2/productie/README.md`, de bronmap terugzetten in `/root/hw/e1/` (segments.json, map.json, film.py, sections.html, src/scenes_e1.js, src/teken_e1.js, stem/woordtijden → words/, ../audio → audio/), dan `python3 evo_bouw.py 1` en `python3 evo_pak.py 1`.
- Een tekstfout in beeld of een beweging: `scenes_e1.js` / `teken_e1.js` aanpassen, opnieuw bouwen.
- Een alinea opnieuw inspreken: stem-invoer uit `segments.json` (veld `voice`), één take, mp3 in `audio/<id>.mp3`, `silalign.py` voor de woordtijden, opnieuw bouwen.
- Een dier aanpassen: in `bibliotheek/dieren/` (testvel, keuring), dan `lib_dieren.js` opnieuw naar `evolib/` kopiëren.

## Ronde 7 nov 2026 (review Kamiel, 6 opmerkingen) + opwaardering v9 → v13

Opmerkingen uit Firebase `review` (ids -P5qFEUT1nSwX6tyyC1p, -P5qFISCzPyx2iPhD4Y9, -P5qFPrPV6kOlp_zN81Y, -P5qFeyhgFf8G-XhP63S, -P5qG8N9CWbSWHPgxqV9, -P5qGKISlyxTSIc2H7l7).

| Scène | Was | Nu |
|---|---|---|
| s13 | 'DNA' als *deeënaa* (klemtoon fout) + 'zie je in de DNA-reeks', label 'zie de DNA-reeks' | heropname met gewone spelling DNA; verwijzing en label weg (75 credits) |
| s17 | zaadcellen schuin onder elkaar | zaadcellen op één lijn (y 720), gespiegeld aan de eicellen; pijlen mee |
| s26 | 'allelen' fout uitgesproken (losse misser) | heropname, gewone spelling (154 credits) |
| s36 | 'Dat zie je in de volgende films.' + labels 'film 2–4', 'film 5' | zin weggeknipt uit de take (13,78 s); labels nu 'meer jongen', 'kans', 'andere populaties' |
| s37 | recap zonder het punt erfelijk | + 'Alleen de erfelijke variatie telt voor evolutie.' (heropname, 259 credits); kaart variatie wisselt naar 'alleen het erfelijke deel telt' |
| s39 | definitie | ongewijzigd (klopt met syllabus); docentdeel: frequentie 0–1 dekt ook nieuwe en verdwenen allelen |
| s01, s15, q16 | namen Yasmin en Bilal in vertelling, beeld en vraagkaart (v13: geen castnamen) | 'een zus en haar broer' / 'Deze zus en broer'; labels 'zus · 16 jaar', 'broer · 17 jaar' (heropname s01 118, s15 99 credits) |
| eindkaart | 'volgende film: Natuurlijke selectie' | 'evolutie = verandering van allelfrequenties' (geen verwijzing; de site heeft de knop Volgende film) |
| speler | — | VRAAGKOP-fix (spelerfix.py) |

Delta v10–v13: C10 (uitknippoppen al in gebruik; dieren bewegen); B15 niet bij opwaardering; v13 castnamen weg (gedaan). Totaal 705 credits. Versie 1.1.

## Aandachtspunten

- Uitspraakwachtlijst: `uitspraak.md`. DNA en allel(en): gewone spelling (goedgekeurd, films/UITSPRAAK.md).
- Keuzes en vereenvoudigingen uit het storyboard staan in het docentdeel en in `storyboard_f1.json`.
- Larve, legsel en pop (teken_e1.js) zijn nieuwe tekeningen die nog niet door de beeldbank zijn gekeurd
- Lieveheersbeestjes lopen met een driepootgang op vaste snelheid; in beweging nakijken
