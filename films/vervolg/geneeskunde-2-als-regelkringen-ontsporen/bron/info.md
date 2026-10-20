# Als regelkringen ontsporen — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/geneeskunde-2-als-regelkringen-ontsporen.html` (audio in `geneeskunde-2-als-regelkringen-ontsporen/audio/`) |
| Reeks | Wat word jij? · Geneeskunde |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · 20 oktober 2026 (script v2) |
| Stem | Roos (ElevenLabs eleven_v4), één take per alinea, 2.937 credits (flow in `stem/sessions.json`) |
| Duur | spraak 3:09 (189 s); met vragen en kaarten ± 5 min |
| Beeldstijl | Part C · Schema, met cast (Bilal als patiënt, Dr. Kim als intensivist) |
| Bouwvorm | FILMDATA-straat van de psychologiefilms (`bron/src` + `bron/bouw`), speler uit films/gedrag/5-emotieregulatie |
| Herkomst | gemaakt door Claude in reeksmodus, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | Bilal na een val met de scooter; bloed dat wegloopt; monitor met hartslag en bloeddruk; bloeddruk blijft gelijk, hartslag stijgt |
| Hoofdstuk 1 — Compenseren | s04 | regelkring bloeddruk; drukzintuigen in de halsslagader; hart sneller; vaten in huid en darmen nauwer; nieren houden water vast; verwijzing naar Buizen onder druk en Water in balans |
| Hoofdstuk 2 — Het kantelpunt | s05, q06, s07 | grafiek bloeddruk tegen bloedverlies: eerst vlak, dan steil omlaag; cirkel met pijlen: minder druk → minder zuurstof naar hartspier → zwakkere pomp → nog minder druk |
| Hoofdstuk 3 — Sepsis | s08, q09, s10 | bacteriën in het bloed; afweercellen die alarmstoffen afgeven; vaten die wijd worden en lekken; organen die één voor één rood kleuren: nieren, longen, hersenen |
| Hoofdstuk 4 — Op de IC | s11 | operatiekamer, daarna Bilal op de intensive care; monitor met lijnen; infuus met bloed; pomp met een middel dat de vaten vernauwt; beademingsapparaat; Dr. Kim die meet en bijstuurt |
| Recap | s12, s13 | Bilal die weer loopt; grafiek met kantelpunt; negatieve en positieve terugkoppeling naast elkaar; opleiding |

## Vragen
q02 → a; q06 → b; q09 → c (zie film.py).

## Begrippen
drukzintuigen, compenseren, negatieve terugkoppeling, positieve terugkoppeling, shock, melkzuur (lactaat), sepsis, intensive care.

## Waar wat in de HTML zit (v1.0)
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 131 | `window.FILMDATA` |
| 1509 | eigen tekeningen (teken_*.js) |
| 1498 | `const SCENES = {}` |
| 1689 | scènes per alinea (`Object.assign(SCENES, …)`) |

## Hoe je de film aanpast
Werkmap `hw/g2` (kopie van deze bronmap: `src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py g2 script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py g2 <sid>`, werk `stem/gen.json` bij. De opties van vraagkaarten en de eindkaart worden niet uitgesproken: die kun je zonder heropname wijzigen.
- Beeld: bewerk `scenes_g2.js` / `teken_g2.js` (cues: `q.on('woord', n)` = n-de woord in de alinea dat het stukje bevat; controle met `python3 engine/cuecheck.py g2 g2/scenes_g2.js`), dan `{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js g2/teken_g2.js g2/scenes_g2.js; } > g2/scenes.js`.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py g2 && python3 engine/build.py g2`; stills: `python3 engine/stills.py g2 g2/qa contact`; in de repo zetten: `python3 engine/pak.py g2 geneeskunde`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- De grafiek bloeddruk tegen bloedverlies is schematisch (ATLS-klassen).
- Bilal valt hier met de scooter; in Een brein in aanbouw is hij de puber die door rood fietst.
- Woordtijden via silalign; bij s04, s05, s08 en s11 vielen enkele leestekens niet op een stilte.
