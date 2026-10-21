# Bloedend tandvlees — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/tandheelkunde-3-bloedend-tandvlees.html` (audio in `tandheelkunde-3-bloedend-tandvlees/audio/`) |
| Reeks | Wat word jij? · Tandheelkunde en mondzorg (3 van 4) |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 20 oktober 2026 (script v2) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 4.453 credits (flow in `stem/sessions.json`) |
| Duur | spraak 4:40 (280 s); met vragen en kaarten ± 6 min |
| Beeldstijl | Schema, met cast (Mondhygiënist Ilse, Opa Henk, Dr. Kim, Tandarts Wouter in de recap) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | badkamer; Opa Henk poetst, roze schuim in de wasbak; hij legt de tandenborstel weg; Ilse in de praktijk |
| Hoofdstuk 1 — Het tandvlees vecht terug | s04, s05, s06 | rand van het tandvlees met een ondiep randje langs de tand; plak die zich ophoopt; witte bloedcellen die erheen gaan; tandvlees rood en gezwollen; kalender van drie weken zonder poetsen, daarna één week poetsen; verwijzing naar De eerste verdediging |
| Hoofdstuk 2 — Als de ontsteking blijft | s07, s08, s09, q10 | doorsnede tand met tandvlees en kaakbot; plak die onder het tandvlees kruipt; tandsteen; pocket die dieper wordt; botcellen die het bot afbreken; bot dat zakt; Ilse met een dunne sonde met streepjes; cijfers 2, 3 en bij Henk 6 millimeter; röntgenfoto met het botniveau |
| Hoofdstuk 3 — Behandelen | s11, s12, s13 | Ilse haalt plak en tandsteen onder het tandvlees weg; ragertjes tussen de tanden; kalender met elke drie maanden een controle; sigaret: tandvlees minder doorbloed, bloedt minder, terwijl de ontsteking doorgaat |
| Hoofdstuk 4 — Van mond naar lichaam | s14, s15, q16, s17 | twee pijlen heen en weer tussen een ontstoken pocket en een glucosemeter; ontstekingsstoffen in het bloed, cellen die minder goed reageren op insuline; daarna een grafiek: groep met parodontitis vaker hart- en vaatziekten; daarachter roken, leeftijd en diabetes die beide pijlen voeden; Dr. Kim bij een onderzoek; verwijzing naar Suiker in balans en Het hart onder controle |
| Recap | s18, s19 | Opa Henk die weer poetst, met ragertjes; Ilse; drie kaartjes: gingivitis is omkeerbaar, parodontitis breekt bot af, samenhang is geen oorzaak; opleidingen |

## Vragen
q02 → b; q10 → a; q16 → c (zie film.py).

## Begrippen
gingivitis, parodontitis, pocket, pocketsonde, tandsteen, ontsteking, samenhang, oorzaak, parodontoloog.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 135 | `window.FILMDATA` |
| 1539 | `const SCENES = {}` |
| 2008 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/t3` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> tandheelkunde`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- parodont() in teken_t3.js tekent pocket, plak, tandsteen, botafbraak en sonde (1 mm = 32 eenheden)
- Openstaand: Henk poetst niet zichtbaar met ragertjes in de recap
