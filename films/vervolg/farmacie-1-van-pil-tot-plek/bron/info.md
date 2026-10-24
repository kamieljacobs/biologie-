# Van pil tot plek en weer terug — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/farmacie-1-van-pil-tot-plek.html` (audio in `farmacie-1-van-pil-tot-plek/audio/`) |
| Reeks | Wat word jij? · Farmacie en Verpleegkunde (gedeelde film) |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 20 oktober 2026 (script v2) |
| Prompt | onbekend · gemaakt 20 okt |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 3.367 credits (flow in `stem/sessions.json`) |
| Duur | spraak 3:33 (213 s); met vragen en kaarten ± 5 min |
| Beeldstijl | Part C · Schema, met cast (Noor en Opa Henk met de pillendoos; Apotheker Ravi in de recap) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | Noor en Opa Henk aan tafel; pillendoos met vakjes ma–zo en ochtend/middag/avond; één bloeddrukpil per dag, paracetamol tot vier keer |
| Hoofdstuk 1 — Door de darmwand | s04 | pil valt uiteen in de maag; dunne darm met darmcellen; membraan als vetlaagje; vetoplosbare stof glipt erdoor, wateroplosbare stof stuit erop; verwijzing naar Van darm naar bloed |
| Hoofdstuk 2 — Eerst langs de lever | s05, q06, s07 | bloed uit de darm via de poortader naar de lever; enzymen knippen moleculen; van honderd moleculen komt een deel verder; nitroglycerinespray onder de tong, rechtstreeks naar het hart; verwijzing naar De lever als fabriek |
| Hoofdstuk 3 — De halfwaardetijd | s08, q09, s10 | grafiek bloedspiegel tegen tijd; werkzame grens als stippellijn; halveren in stapjes 100, 50, 25; snelle curve paracetamol, trage curve bloeddrukpil; zaagtand bij elke dag een pil die oploopt tot een vlak niveau |
| Hoofdstuk 4 — Nieren en interacties | s11 | nier die het bloed filtert; jonge en oude nier naast elkaar; grapefruit met een kruis door een enzym in de darmwand; cholesterolpil met een veel hogere bloedspiegel; verwijzing naar Water in balans |
| Recap | s12, s13 | route pil, darm, lever, bloed, nier; Noor vult de pillendoos; apotheek, verpleegkundige met medicijnkar |

## Vragen
q02 → b; q06 → c; q09 → a (zie film.py).

## Begrippen
opname, membraan, poortader, first-pass-effect, bloedspiegel, halfwaardetijd, stabiele spiegel, interactie, farmacokinetiek.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 112 | Voor de docent |
| 146 | `window.FILMDATA` |
| 1516 | `const SCENES = {}` |
| 1823 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/f1` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> farmacie`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- De bloeddrukpil is amlodipine; in Achter de balie staat hij op Henks lijst.
- Eén werkzame grens voor beide middelen in de grafiek; opnamefase en CYP3A4 niet bij naam.
- Gedeelde film: staat ook bij Verpleegkunde (id farmacokinetiek).
- Animatie gebouwd door een helper volgens films/vervolg/BOUWEN.md, nagekeken in de hoofdsessie.
