# Van klacht naar diagnose — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/geneeskunde-1-van-klacht-naar-diagnose.html` (audio in `geneeskunde-1-van-klacht-naar-diagnose/audio/`) |
| Reeks | Wat word jij? · Geneeskunde |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · 20 oktober 2026 (script v2) |
| Stem | Roos (ElevenLabs eleven_v4), één take per alinea, 3.062 credits (flow in `stem/sessions.json`) |
| Duur | spraak 3:19 (199 s); met vragen en kaarten ± 5 min |
| Beeldstijl | Part C · Schema, met cast (Opa Henk als patiënt, Dr. Kim als huisarts in outfit gewoon) |
| Bouwvorm | FILMDATA-straat van de psychologiefilms (`bron/src` + `bron/bouw`), speler uit films/gedrag/5-emotieregulatie |
| Herkomst | gemaakt door Claude in reeksmodus, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | Opa Henk op de trap, hijgend; drie vakjes hart, longen, bloed met een vraagteken |
| Hoofdstuk 1 — Eén klacht, drie systemen | s04 | hart, longen en bloed als drie schakels van één keten; zuurstof van lucht naar weefsel; verwijzing naar Gas op reis |
| Hoofdstuk 2 — Vragen, luisteren, meten | s05, q06 | Dr. Kim met Henk in de spreekkamer; kaartjes anamnese; stethoscoop met geluidsgolf; enkel met een putje na indrukken; saturatiemeter |
| Hoofdstuk 3 — Hypotheses toetsen | s07 | lijst met mogelijke oorzaken, op volgorde van waarschijnlijkheid; buisjes bloed; ECG-strook; longfoto; echo van het hart met een pomp die zwak knijpt |
| Hoofdstuk 4 — Samen beslissen | s08, q09, s10 | Dr. Kim en Henk aan tafel; twee opties met voor- en nadelen; plastabletten en een weegschaal; Henk die kiest |
| Recap | s11, s12 | Henk in zijn tuin; keten hart-longen-bloed; stappen klacht, vragen, onderzoek, toetsen, samen beslissen; opleiding |

## Vragen
q02 → b; q06 → c; q09 → a (zie film.py).

## Begrippen
anamnese, lichamelijk onderzoek, differentiaaldiagnose, hartfalen, oedeem, echo van het hart, samen beslissen, plastabletten.

## Waar wat in de HTML zit (v1.0)
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 130 | `window.FILMDATA` |
| 1508 | eigen tekeningen (teken_*.js) |
| 1497 | `const SCENES = {}` |
| 1687 | scènes per alinea (`Object.assign(SCENES, …)`) |

## Hoe je de film aanpast
Werkmap `hw/g1` (kopie van deze bronmap: `src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py g1 script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py g1 <sid>`, werk `stem/gen.json` bij. De opties van vraagkaarten en de eindkaart worden niet uitgesproken: die kun je zonder heropname wijzigen.
- Beeld: bewerk `scenes_g1.js` / `teken_g1.js` (cues: `q.on('woord', n)` = n-de woord in de alinea dat het stukje bevat; controle met `python3 engine/cuecheck.py g1 g1/scenes_g1.js`), dan `{ sed -n 1,32p engine/scenes.js; echo 'const SCENES = {};'; cat engine/brein.js engine/teken.js engine/extra.js g1/teken_g1.js g1/scenes_g1.js; } > g1/scenes.js`.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py g1 && python3 engine/build.py g1`; stills: `python3 engine/stills.py g1 g1/qa contact`; in de repo zetten: `python3 engine/pak.py g1 geneeskunde`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- De hartstof is NT-proBNP; het ECG uit de NHG-standaard is weggelaten.
- Saturatie 93 % in beeld is een voorbeeldwaarde.
- Woordtijden via silalign; bij s07, s08, s10 en s11 viel telkens 1–2 leestekens niet op een stilte.
