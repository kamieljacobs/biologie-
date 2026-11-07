# Bestraling — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/mbrt-2-bestraling.html` (audio in `mbrt-2-bestraling/audio/`) |
| Reeks | Wat word jij? · Medische beeldvorming (MBRT) |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 24 oktober 2026 (script v3) |
| Prompt | onbekend · gemaakt 24 okt |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.958 credits (flow in `stem/sessions.json`) |
| Duur | spraak 4:57 (297 s); met vragen en kaarten ± 6 min |
| Beeldstijl | Part C · Schema en Micro, met cast (Opa Henk, Oma Ria, Dr. Kim) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 24 okt 2026; script v1 → zelfcontrole met bronnen → v2 → ingesproken → frisse eindreview (reviews/review_eind.md) → hersteld |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | wachtkamer radiotherapie; Opa Henk en Oma Ria hand in hand; Dr. Kim; kalender met 20 vakjes |
| Hoofdstuk 1 — Een breuk in het DNA | s04 | bundel straling die een cel in gaat; watermolecuul dat een elektron verliest; reactief deeltje; DNA-dubbelhelix met een enkelstrengsbreuk, daarna een dubbelstrengsbreuk; chromosoom in twee stukken; teller 1 gray: ± 1000 en ± 40 |
| Hoofdstuk 2 — Waarom de tumor harder geraakt wordt | s05, q06, s07 | celcyclus met controlepunt; gezonde cel die stopt, herstelt of zichzelf opruimt; tumorcel die doorgaat; deling met een los chromosoomstuk dat niet wordt meegetrokken; dochtercellen die sterven; verwijzing naar Celdeling en Mutaties |
| Hoofdstuk 3 — Elke dag een beetje | s08, q09, s10 | doorsnede van het bekken met prostaat, blaas en endeldarm; bundels uit vijf richtingen die elkaar in de prostaat kruisen; kalender 20 × 3 gray in 4,5 week; grafiek overlevende cellen: gezond weefsel herstelt na elke dosis, tumor zakt trap voor trap |
| Hoofdstuk 4 — Veilig werken met straling | s11, q12, s13 | planning-CT met ingetekende tumor en organen; bestralingsruimte met versneller en tafel, lasers, stipjes op de huid; bedieningsruimte met schermen en camerabeeld van Henk; zware deur, muur van twee meter beton; Oma Ria geeft Henk een knuffel; drie kaartjes tijd, afstand, afscherming; dosismeter |
| Recap | s14, s15 | Opa Henk in zijn tuin met Oma Ria; drie kaartjes: breuk, deling, elke dag een beetje; opleiding MBRT |

## Vragen
q02 → b; q06 → a; q09 → c; q12 → b (zie film.py).

## Begrippen
ioniserende straling, enkelstrengsbreuk, dubbelstrengsbreuk, gray (Gy), controlepunt, fractioneren, bestralingsplan, tijd, afstand, afscherming, MBB'er.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 154 | `window.FILMDATA` |
| 1839 | `const SCENES = {}` |
| 2150 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/m2` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v3.md` aan, `python3 engine/make_segments.py <d> script_v3.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> mbrt`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- gray: uitspraak nog beluisteren (s04, s08, s10)
- prostaatkanker als uitzondering op de vuistregel (lage α/β), na de eindreview s07, s10 en s14 opnieuw ingesproken
- kanker: toon zakelijk met voorzichtige hoop
