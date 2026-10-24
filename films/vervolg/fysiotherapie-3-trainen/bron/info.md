# Trainen: hoe je lichaam zich aanpast — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/fysiotherapie-3-trainen.html` (audio in `fysiotherapie-3-trainen/audio/`) |
| Reeks | Wat word jij? · Fysiotherapie en bewegingswetenschappen, film 3 |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 20 oktober 2026 (script v2) |
| Prompt | onbekend · gemaakt 20 okt |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 0 credits (flow in `stem/sessions.json`) |
| Duur | spraak 3:33 (213 s); met vragen en kaarten ± 5 min |
| Beeldstijl | Schema (Part C), met cast (Noor, Bilal, Femke) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | Noor loopt hijgend, teller 2 km; kalender tien weken; Noor loopt rustig 5 km; Bilal in de sportschool met een stang |
| Hoofdstuk 1 — Belasting en herstel | s04 | lijn van conditie: zakt na een training, stijgt in de rust tot boven het begin; drie scenario's: volgende training te vroeg, op tijd, te laat; verwijzing naar Hoe weefsel herstelt |
| Hoofdstuk 2 — Duurtraining | s05, q06, s07 | spiervezel met mitochondriën die in aantal toenemen; haarvaten rond de vezel, meer na tien weken; hart dat per slag meer bloed pompt; rusthartslag van 70 naar 65; verwijzing naar Alles op adem en Het hart onder controle |
| Hoofdstuk 3 — Krachttraining | s08, q09, s10 | Bilal na twee weken sterker, spier nog even dik; zenuw met weinig en veel motorische eenheden tegelijk aan; spiervezel die na acht weken dikker wordt door meer eiwitdraden actine en myosine; verwijzing naar Opnieuw leren bewegen |
| Hoofdstuk 4 — Specifiek, omkeerbaar en gemeten | s11 | Noor in het zwembad, hijgend; kalender: drie weken stoppen, een deel van de winst weg; inspanningstest met masker op de loopband; krachtplaat met een piek bij landen; elektroden op een spier met een golflijn; markers en camera's |
| Recap | s12, s13 | Noor en Bilal, tien weken later; vier kaartjes: belasting en herstel, meer mitochondriën en groter hart, eerst zenuwen dan spieren, specifiek en omkeerbaar; opleidingen bewegingswetenschappen en fysiotherapie |

## Vragen
q02 → c; q06 → a; q09 → b (zie film.py).

## Begrippen
supercompensatie, duurtraining, mitochondrium, haarvaten, slagvolume, motorische eenheid, hypertrofie, specificiteit, omkeerbaarheid.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 133 | `window.FILMDATA` |
| 1509 | `const SCENES = {}` |
| 1705 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/fy3` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> fysiotherapie`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Supercompensatie is een model (in beeld als curve)
- Feitencheck 21 okt: rusthartslag 70→65, landen 3–5× lichaamsgewicht, hypertrofie na een paar weken
