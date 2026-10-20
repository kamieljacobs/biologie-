# Wat de patholoog ziet — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/geneeskunde-4-wat-de-patholoog-ziet.html` (audio in `geneeskunde-4-wat-de-patholoog-ziet/audio/`) |
| Reeks | Wat word jij? · Geneeskunde |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · 20 oktober 2026 (script v2) |
| Stem | Roos (ElevenLabs eleven_v4), één take per alinea, 2.958 credits (flow in `stem/sessions.json`) |
| Duur | spraak 3:11 (191 s); met vragen en kaarten ± 5 min |
| Beeldstijl | Part C · Schema en Micro, met cast (Mevrouw Visser als patiënt, Dr. Kim als patholoog in outfit lab) |
| Bouwvorm | FILMDATA-straat van de psychologiefilms (`bron/src` + `bron/bouw`), speler uit films/gedrag/5-emotieregulatie |
| Herkomst | gemaakt door Claude in reeksmodus, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | Mevrouw Visser met een moedervlek op haar arm; vergelijking vroeger en nu: groter, onregelmatige rand, twee kleuren; huisarts; potje met een stukje huid |
| Hoofdstuk 1 — Weefsels in de huid | s04 | doorsnede van de huid; opperhuid als dekweefsel, lederhuid met bindweefsel, spiertje bij een haar, zenuwuiteinde; pigmentcellen onderin de opperhuid; verwijzing naar Van cel tot lichaam |
| Hoofdstuk 2 — Van biopt tot coupe | s05, q06, s07 | stukje huid in een potje met formaline; blokje paraffine; snijmachine met een flinterdun plakje; glaasje; twee kleurstoffen: kernen blauwpaars, de rest roze |
| Hoofdstuk 3 — Goedaardig of kwaadaardig | s08, q09, s10 | twee coupes naast elkaar; links nette, gelijke pigmentcellen onderin; rechts grote, donkere kernen, cellen die delen, cellen die omhoog en de diepte in groeien; verwijzing naar Celdeling en Mutaties |
| Hoofdstuk 4 — De uitslag | s11 | verslag van de patholoog met diagnose, dikte en randen; liniaal 0,6 millimeter; snijrand vrij met een groene vink; overleg aan tafel met dermatoloog en chirurg |
| Recap | s12, s13 | Mevrouw Visser terug voor de klas; keten huid, potje, coupe, microscoop, verslag; Dr. Kim aan de microscoop en het beeldscherm; opleiding |

## Vragen
q02 → b; q06 → a; q09 → c (zie film.py).

## Begrippen
patholoog, pigmentcel, moedervlek, melanoom, fixeren, coupe, HE-kleuring, vriescoupe, dikte van een melanoom.

## Waar wat in de HTML zit (v1.0)
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 112 | Voor de docent |
| 141 | `window.FILMDATA` |
| 1519 | eigen tekeningen (teken_*.js) |
| 1508 | `const SCENES = {}` |
| 1865 | scènes per alinea (`Object.assign(SCENES, …)`) |

## Hoe je de film aanpast
Werkmap `hw/g4` (kopie van deze bronmap: `src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py g4 script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py g4 <sid>`, werk `stem/gen.json` bij. De opties van vraagkaarten en de eindkaart worden niet uitgesproken: die kun je zonder heropname wijzigen.
- Beeld: bewerk `scenes_g4.js` / `teken_g4.js` (cues: `q.on('woord', n)` = n-de woord in de alinea dat het stukje bevat; controle met `python3 engine/cuecheck.py g4 g4/scenes_g4.js`), dan `{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js g4/teken_g4.js g4/scenes_g4.js; } > g4/scenes.js`.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py g4 && python3 engine/build.py g4`; stills: `python3 engine/stills.py g4 g4/qa contact`; in de repo zetten: `python3 engine/pak.py g4 geneeskunde`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Kleuring in HE-stijl (kernen blauwpaars, rest roze), schematisch.
- Mevrouw Visser is in de Leraar-films de docent; hier is ze patiënt.
- Animatie gebouwd door een helper volgens hw/BOUWEN.md, nagekeken in de hoofdsessie.
