# Een tand door bot — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/tandheelkunde-4-een-tand-door-bot.html` (audio in `tandheelkunde-4-een-tand-door-bot/audio/`) |
| Reeks | Wat word jij? · Tandheelkunde en mondzorg (4 van 4) |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 20 oktober 2026 (script v2) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 3.638 credits (flow in `stem/sessions.json`) |
| Duur | spraak 3:46 (226 s); met vragen en kaarten ± 5 min |
| Beeldstijl | Schema, met cast (Noor, Tandarts Wouter, Mondhygiënist Ilse) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | Noor lacht in de spiegel met een beugel; scheve hoektand; kaakbot in doorsnede, hard als steen; pijl: een paar millimeter verder |
| Hoofdstuk 1 — Een tand in een vering | s04, s05, s06 | wortel in het kaakbot met een smalle spleet ertussen; vezels van het wortelvlies tussen wortel en bot, als de veren van een trampoline; bij kauwen veert de tand een heel klein beetje in; bot met botcellen, levend weefsel |
| Hoofdstuk 2 — Drukkant en trekkant | s07, s08, q09 | wortel met een pijl van de beugel; aan de drukkant wordt het wortelvlies samengeknepen, botafbrekers eten het bot weg; aan de trekkant worden de vezels uitgerekt, botopbouwers leggen nieuw bot neer; tand schuift; teller: ongeveer een millimeter per maand; daarnaast: te harde kracht, bloedvaatjes dicht, stukje weefsel sterft af, tand staat stil |
| Hoofdstuk 3 — Ze willen terug | s10, s11 | beugel eraf, Noor lacht; tand met vezels in het tandvlees die nog gespannen staan, als elastiekjes; pijl terug naar de oude plek; dun draadje aan de binnenkant van de tanden; kalender: jaren |
| Hoofdstuk 4 — Te veel tanden, te weinig kaak | s12, q13, s14, s15 | schedel van een jager-verzamelaar met ruime kaak naast een moderne schedel met krappe kaak; hard, taai voedsel tegenover zacht voedsel; verstandskiezen die niet passen; daarna Ilse bij Noor: plak rond de blokjes, wit plekje, ragertjes; verwijzing naar Selectie van dichtbij |
| Recap | s16, s17 | Noor lacht, rechte tanden, draadje aan de binnenkant; Wouter; drie kaartjes: wortelvlies, drukkant en trekkant, licht en lang; opleidingen |

## Vragen
q02 → c; q09 → b; q13 → a (zie film.py).

## Begrippen
wortelvlies, botafbrekers, botopbouwers, drukkant, trekkant, botombouw, retentiedraad, orthodontist.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 133 | `window.FILMDATA` |
| 1537 | `const SCENES = {}` |
| 1982 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/t4` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> tandheelkunde`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- tandBot() in teken_t4.js: hoektand met één wortel, veren, schuiven met het tandbed, drukkant/trekkant
- De beugel komt van de orthodontist; Noor vraagt Tandarts Wouter tijdens een gewone controle
