# Zoeken in DNA — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/bioinformatica-1-zoeken-in-dna.html` (audio in `bioinformatica-1-zoeken-in-dna/audio/`) |
| Reeks | Wat word jij? · Bio-informatica (film 1 van 4) |
| Niveau | havo + vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 25 oktober 2026 (script v2) |
| Prompt | onbekend · gemaakt 25 okt |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.532 credits (flow in `stem/sessions.json`) |
| Duur | spraak 6:10 (370 s); met vragen en kaarten ± 8 min |
| Beeldstijl | Schema met cast + Micro-zoom (DNA-streng); reeksobject scherm met code / sequenties |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 25 okt 2026; 3 scriptvarianten + blinde beoordelaar (werk/) → v1 → frisse bronnenreview (reviews/review_v1.md) → v2 → twijfelscènes gekeurd door Kamiel → frisse beeldreview (reviews/review_beeld.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, s02, s03 | werkplek van de afdeling, ochtend; op het bureau van Kim een leeg sushibakje met het etiket 'blauwvintonijn' in goud omlijnd en een buisje met een nummer; Sam komt binnen en gaat naast Kim zitten |
| Hoofdstuk 1 — Databanken | s05, s06, q07, s08, s09 |  |
| Hoofdstuk 2 — Uitlijnen | s10, s11, q12, s13, s14, s15 |  |
| Hoofdstuk 3 — BLAST | s16, s17, q18, s19, s20, s21, q22, s23 |  |
| Hoofdstuk 4 — Zelf programmeren | s24, s25, s26, s27, s28, q29, s30 |  |
| Recap | s31, s32, s33 | terug bij het bureau; het sushibakje met het etiket 'blauwvintonijn'; daarnaast de vier stappen als kleine schermpjes: barcode, databank, uitlijning, resultatenlijst met 'geelvintonijn 100%' in groen |

## Vragen
q07 → a; q12 → b; q18 → c; q22 → b; q29 → a (zie film.py).

## Begrippen
sequentie, databank, DNA-barcode, uitlijnen, gat, uitlijnscore, BLAST, algoritme, Python.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 112 | Voor de docent |
| 155 | `window.FILMDATA` |
| 2023 | `const SCENES = {}` |
| 4629 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/bi1` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> bioinformatica`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Code in beeld draait echt (MALWMR; te late start WPCGCA)
- s14: laatste letter telt niet mee in de score zonder gat (zichtbaar gestippeld)
- Radar 2017 = toegeschreven bewering (≈)
