# Van buisje tot uitslag — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/labtechniek-2-van-buisje-tot-uitslag.html` (audio in `labtechniek-2-van-buisje-tot-uitslag/audio/`) |
| Reeks | Wat word jij? · Laboratoriumtechniek |
| Niveau | havo · vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 24 oktober 2026 (script v2) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 4.731 credits (flow in `stem/sessions.json`) |
| Duur | spraak 5:09 (309 s); met vragen en kaarten ± 7 min |
| Beeldstijl | Schema-look van de Wat word jij?-films (navy, castpersonages, lijntekening) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 24 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | spreekkamer; Dr. Kim in labjas met een wattenstaafje bij Opa Henk; buisje met barcode; keten van stappen van spreekkamer naar uitslag |
| Hoofdstuk 1 — Het monster komt binnen | s04 | ontvangst; Yasmin scant de barcode; checklist naam en geboortedatum, juiste buisje, tijd en temperatuur; buisje zonder etiket afgekeurd; spoor van het buisje in de computer |
| Hoofdstuk 2 — Nauwkeurig pipetteren | s05, q06, s07 | pipet op 10 microliter; druppel op ware grootte; verdunningsreeks van vijf buisjes, 1 op 10; tellers 10, 100, 1000, 10 000 keer verdund; fout in stap 1 werkt door |
| Hoofdstuk 3 — Real-time PCR en de ijklijn | s08, q09, s10 | pipetteerrobot boven een plaat met 96 putjes; probe die oplicht als het polymerase hem openknipt; grafiek licht tegen cycli met S-curves en een drempel; Opa Henk Ct 25, ander monster Ct 30; ijklijn met vijf standaarden op een rechte lijn |
| Hoofdstuk 4 — Klopt de run? | s11, q12, s13 | plaat met negatieve controle (geen licht), positieve controle (licht) en interne controle; controlekaart met de Ct van de positieve controle per dag, band van twee standaardafwijkingen; twee punten achter elkaar erboven; run afgekeurd; flesje reagens buiten de vriezer |
| Recap | s14, s15 | Dr. Kim belt, Opa Henk aan de telefoon; keten: ontvangst, pipetteren, PCR, controles; Yasmin; twee opleidingen en werkplekken |

## Vragen
q02 → c; q06 → a; q09 → b; q12 → c (zie film.py).

## Begrippen
pre-analytische fase, verdunningsreeks, microliter (µl), standaard, real-time PCR, Ct-waarde, ijklijn, positieve/negatieve controle, controlekaart.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 112 | Voor de docent |
| 156 | `window.FILMDATA` |
| 1841 | `const SCENES = {}` |
| 2124 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/lt2` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> labtechniek`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- RNA→DNA-stap alleen in beeld, niet in de stem
- Ijklijn als voorbeeld: een coronatest rapporteert positief/negatief
- Pipetnorm ISO 8655 via fabrikantenoverzicht
- Opa Henk heet op het etiket H. de Vries (ook in lt3)
