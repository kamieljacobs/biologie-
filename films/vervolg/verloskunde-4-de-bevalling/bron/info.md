# De bevalling — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/verloskunde-4-de-bevalling.html` (audio in `verloskunde-4-de-bevalling/audio/`) |
| Reeks | Wat word jij? · Verloskunde |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 20 oktober 2026 (script v2) |
| Prompt | onbekend · gemaakt 20 okt |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 4.794 credits (flow in `stem/sessions.json`) |
| Duur | spraak 5:00 (300 s); met vragen en kaarten ± 6 min |
| Beeldstijl | Schema, met cast (Verloskundige Mirjam, Esra; nieuw in het castboek) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | hart van de foetus met twee kortsluitingen; placenta via navelstreng; longen grijs, dicht; vraagteken bij eerste ademteug |
| Hoofdstuk 1 — Het bevalplan | s04, s05 | Esra 35 weken met Mirjam; drie plekken: thuis, geboortecentrum, ziekenhuis; pijnbestrijding: ademen, bad, ruggenprik; pijl naar gynaecoloog bij ruggenprik |
| Hoofdstuk 2 — Ontsluiting en uitdrijving | s06, s07, s08, q09 | baarmoeder in doorsnede met hoofd op de baarmoederhals; hals wordt korter en gaat open tot tien centimeter; oxytocine-lus kort; bekken van boven en van voren; hoofd draait een kwartslag |
| Hoofdstuk 3 — Luisteren naar het hart | s10, s11, s12 | wee: baarmoederspier knijpt de slagaders naar de placenta dicht; zuurstof bij het kind daalt even; hartslaggrafiek 110 tot 160 met kleine dip tijdens de wee; doptone; groen vruchtwater als waarschuwing |
| Hoofdstuk 4 — De eerste ademteug | s13, s14, s15 | hart met foramen ovale als klepje en ductus Botalli; longen ontplooien; druk links stijgt, klepje dicht; ductus knijpt samen door zuurstof; Apgar-score met vijf punten |
| Hoofdstuk 5 — De placenta komt | s16, q17, s18 | lege baarmoeder met placenta los; spiervezels als gekruiste draden om bloedvaten; baarmoeder knijpt samen; maatbeker bloedverlies: normaal een paar honderd milliliter, meer dan een liter is te veel |
| Recap | s19, s20 | Esra met Lina op de borst; Mirjam; telefoon met dienst; opleiding |

## Vragen
q02 → b; q09 → a; q17 → c (zie film.py).

## Begrippen
bevalplan, ruggenprik, ontsluiting, uitdrijving, harttonen, foramen ovale, ductus Botalli, Apgar-score, nageboorte.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 130 | `window.FILMDATA` |
| 1521 | `const SCENES = {}` |
| 1909 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/verloskunde4` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> verloskunde`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Hartslaggrafiek schematisch
- Draaiing van het hoofd vereenvoudigd tot één kwartslag
