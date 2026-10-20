# Welk antibioticum? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/geneeskunde-3-welk-antibioticum.html` (audio in `geneeskunde-3-welk-antibioticum/audio/`) |
| Reeks | Wat word jij? · Geneeskunde en Farmacie (gedeelde film) |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · 20 oktober 2026 (script v2) |
| Stem | Roos (ElevenLabs eleven_v4), één take per alinea, 3.280 credits (flow in `stem/sessions.json`) |
| Duur | spraak 3:29 (209 s); met vragen en kaarten ± 5 min |
| Beeldstijl | Part C · Schema, met cast (Noor als patiënt, Dr. Kim als huisarts in outfit gewoon); lab en apotheek alleen met voorwerpen |
| Bouwvorm | FILMDATA-straat van de psychologiefilms (`bron/src` + `bron/bouw`), speler uit films/gedrag/5-emotieregulatie |
| Herkomst | gemaakt door Claude in reeksmodus, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | Noor met buikpijn en een urinepotje; Dr. Kim; drie doosjes antibiotica: breed, smal, sterkst |
| Hoofdstuk 1 — Waar een antibioticum aangrijpt | s04 | bacterie met celwand, ribosomen en DNA-ring; drie pijlen; mensencel ernaast zonder celwand, met andere ribosomen; virus zonder eigen stofwisseling met een kruis; verwijzing naar Van DNA naar eiwit |
| Hoofdstuk 2 — Kweek en antibiogram | s05, q06, s07 | urine op een voedingsbodem; kolonies; schaal met papieren schijfjes met verschillende antibiotica; heldere ringen eromheen; liniaal |
| Hoofdstuk 3 — Smal of breed | s08 | darm met veel soorten bacteriën; breed middel doodt bijna alle, één resistente blijft over en groeit uit; smal middel raakt alleen de blaasbacterie; verwijzing naar Selectie van dichtbij en Je darmbewoners |
| Hoofdstuk 4 — Als bijna niets meer werkt | s09, q10, s11 | ziekenhuisbed in een aparte kamer; MRSA-bacterie; neusje met een wattenstaafje; hand met alcohol; apotheker die meekijkt |
| Recap | s12, s13 | Noor weer fit; antibiogram; smal middel; samenwerking arts, lab en apotheek; opleidingen |

## Vragen
q02 → b; q06 → c; q10 → a (zie film.py).

## Begrippen
antibioticum, celwand (bacterie), breed en smal antibioticum, kweek, kolonie, antibiogram, resistentie, MRSA, apotheker.

## Waar wat in de HTML zit (v1.0)
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 112 | Voor de docent |
| 146 | `window.FILMDATA` |
| 1524 | eigen tekeningen (teken_*.js) |
| 1513 | `const SCENES = {}` |
| 1839 | scènes per alinea (`Object.assign(SCENES, …)`) |

## Hoe je de film aanpast
Werkmap `hw/g3` (kopie van deze bronmap: `src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py g3 script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py g3 <sid>`, werk `stem/gen.json` bij. De opties van vraagkaarten en de eindkaart worden niet uitgesproken: die kun je zonder heropname wijzigen.
- Beeld: bewerk `scenes_g3.js` / `teken_g3.js` (cues: `q.on('woord', n)` = n-de woord in de alinea dat het stukje bevat; controle met `python3 engine/cuecheck.py g3 g3/scenes_g3.js`), dan `{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js g3/teken_g3.js g3/scenes_g3.js; } > g3/scenes.js`.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py g3 && python3 engine/build.py g3`; stills: `python3 engine/stills.py g3 g3/qa contact`; in de repo zetten: `python3 engine/pak.py g3 geneeskunde`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Gedeelde film: staat ook bij Farmacie op Wat word jij?.
- Het antibiogram is schematisch (ringmaten en grenzen geen EUCAST-waarden).
- Animatie gebouwd door een helper volgens hw/BOUWEN.md, nagekeken in de hoofdsessie.
