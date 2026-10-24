# Zuur in je mond — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/tandheelkunde-1-zuur-in-je-mond.html` (audio in `tandheelkunde-1-zuur-in-je-mond/audio/`) |
| Reeks | Wat word jij? · Tandheelkunde en mondzorg (1 van 4) |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 20 oktober 2026 (script v2) |
| Prompt | onbekend · gemaakt 20 okt |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 4.744 credits (flow in `stem/sessions.json`) |
| Duur | spraak 5:04 (304 s); met vragen en kaarten ± 7 min |
| Beeldstijl | Schema, met cast (Mondhygiënist Ilse, Bilal, Sam) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | Bilal achter zijn computer, om het kwartier een snoepje uit de zak; Sam die na het eten dezelfde zak in één keer leeg eet; klokje van de middag |
| Hoofdstuk 1 — Een stad van bacteriën | s04, s05, s06 | tand in doorsnede met een dun vliesje; bacteriën die zich vastzetten; laag die dikker wordt met slijm ertussen; Ilse die met een plakverklikker de plak paars kleurt bij Bilal; verwijzing naar Je darmbewoners |
| Hoofdstuk 2 — De zuurcurve | s07, s08, s09, s10, q11 | grafiek pH tegen tijd, lijn bij 7, stippellijn bij 5,5 'glazuur lost op'; na één hap een dip en herstel in ongeveer een half uur; bij Bilal elk kwartier een nieuwe dip, de lijn komt niet meer boven de stippellijn; bacterie die suiker omzet in melkzuur; calcium en fosfaat die uit het glazuur stromen en terugkeren; verwijzing naar Alles op adem |
| Hoofdstuk 3 — Zuur zonder bacteriën | s12, s13, s14, q15 | blikje cola, sportdrank en sinaasappelsap met pH-labels rond 3; glazuur dat overal een beetje dunner en gladder wordt in plaats van een gaatje; Bilal stapt over op light cola; maag met zuur dat omhoog komt |
| Hoofdstuk 4 — Beschermen | s16, s17, s18 | kristal van glazuur, waarin fluoride een plekje inneemt, stippellijn zakt van 5,5 naar ongeveer 4,5; tandpasta, uitspugen zonder naspoelen; Ilse met een tandenborstel en ragertjes; kalender met een controle |
| Recap | s19, s20 | Bilal en Sam naast elkaar met hun zuurcurves; Ilse; drie kaartjes: minder eetmomenten, fluoride, water; opleidingen |

## Vragen
q02 → c; q11 → a; q15 → c (zie film.py).

## Begrippen
tandplak, biofilm, glazuur, zuurcurve, kritische pH, cariës, erosie, fluoride, mondhygiënist.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 135 | `window.FILMDATA` |
| 1539 | `const SCENES = {}` |
| 1908 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/t1` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> tandheelkunde`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Kies-doorsnede met vaste natuurkleuren in teken_t1.js
- Eindkaart: lange regels worden kleiner gezet (drawEnd in player.js)
- Openstaand: erosiekies in H3 ziet er nog gezond uit
