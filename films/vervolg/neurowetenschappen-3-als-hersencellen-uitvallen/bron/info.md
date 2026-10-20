# Als hersencellen uitvallen — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/neurowetenschappen-3-als-hersencellen-uitvallen.html` (audio in `neurowetenschappen-3-als-hersencellen-uitvallen/audio/`) |
| Reeks | Wat word jij? · Neurowetenschappen (neurologie, hersenonderzoek) |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · 20 oktober 2026 (script v2) |
| Stem | Roos (ElevenLabs eleven_v4), één take per alinea, 5.478 credits (flow in `stem/sessions.json`) |
| Duur | spraak 5:56 (356 s); met vragen en kaarten ± 7 min |
| Beeldstijl | Part C · Schema, met cast (Opa Henk als patiënt met Parkinson, Noor, Dr. Kim als neuroloog) |
| Bouwvorm | FILMDATA-straat van de psychologiefilms (`bron/src` + `bron/bouw`), speler uit films/gedrag/5-emotieregulatie; `brein()` en `teken.js` uit Kijken in een denkend brein |
| Herkomst | gemaakt door Claude in reeksmodus, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md, beeldfixes verwerkt) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Opa Henk in de tuin, trillende hand, pillendoos; grafiek dopamine 'na een paar jaar' met pieken en dalen |
| H1 Parkinson | s04, s05 | doorsnede met zwarte stof en basale kernen, cellen die uitdoven; uiteinde met blaasjes; grafiek veel cellen (rustig) tegen weinig cellen (op en neer) |
| H2 Alzheimer | s06, q07, s08 | neuronen met amyloïdplakkaten en tau-kluwens, synapsen weg; trouwdag ✓ / ontbijt ✗; hippocampus; antistofmedicijn: klonten weg, ± een kwart langzamer |
| H3 Epilepsie | s09, q10, s11 | weegschaal glutamaat/GABA; netwerk met een groep die samen vuurt; EEG normaal/aanval; 2 op 3 aanvalsvrij; operatie |
| H4 Waarom zo moeilijk | s12, s13, q14, s15, s16 | bloed-hersenbarrière; muis en mens; 40 kaartjes (± 6 middelen elk), één goedgekeurd; Opa Henk met diepe hersenstimulatie |
| Recap | s17, s18 | Henk, Noor en Dr. Kim; opleidingen |

## Vragen
q02 → b; q07 → b; q10 → a; q14 → b (zie film.py).

## Begrippen
ziekte van Parkinson, zwarte stof, basale kernen, levodopa, halfwaardetijd, ziekte van Alzheimer, amyloïd, tau, hippocampus, epileptische aanval, glutamaat en GABA, bloed-hersenbarrière, diepe hersenstimulatie.

## Waar wat in de HTML zit (v1.0)
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 137 | `window.FILMDATA` |
| 1500 | `brein()` (uit Kijken in een denkend brein) |
| 1629 | eigen tekeningen (teken_*.js) |
| 1498 | `const SCENES = {}` |
| 1731 | scènes per alinea (`Object.assign(SCENES, …)`) |

## Hoe je de film aanpast
Werkmap `hw/n3` (kopie van deze bronmap: `src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py n3 script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py n3 <sid>`, werk `stem/gen.json` bij. De opties van vraagkaarten worden niet uitgesproken: die kun je zonder heropname wijzigen.
- Beeld: bewerk `scenes_n3.js` / `teken_n3.js` (cues: `q.on('woord', n)` = n-de woord in de alinea dat het stukje bevat), dan `{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js n3/teken_n3.js n3/scenes_n3.js; } > n3/scenes.js`.
- Vragen, begrippen, docentdeel: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py n3 && python3 engine/build.py n3`; stills: `python3 engine/stills.py n3 n3/qa contact`; in de repo zetten: `python3 engine/pak.py n3 neurowetenschappen`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- De dopaminegrafiek komt uit een eenvoudig model (drie pillen, halfwaardetijd 1,5 uur; met veel cellen een traag gemiddelde, met weinig cellen het bloed) en is kwalitatief.
- Opa Henk had in Kijken in een denkend brein een beroerte en is in Welke therapie werkt? somber; hier heeft hij Parkinson. Kijkers van de hele reeks zien zijn ziekten zich opstapelen.
- Eindreview KAN-punten niet verwerkt (vragen heropname): 'In het begin geeft dat niets' (s05) en de verwijzing naar Leren en onthouden in s11 kan concreter.
- Woordtijden via silalign; bij s04, s06, s09 en s17 vielen enkele leestekens niet op een stilte.
