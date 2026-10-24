# Wat is er met die knie? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/fysiotherapie-1-wat-is-er-met-die-knie.html` (audio in `fysiotherapie-1-wat-is-er-met-die-knie/audio/`) |
| Reeks | Wat word jij? · Fysiotherapie en bewegingswetenschappen, film 1 |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 20 oktober 2026 (script v2) |
| Prompt | onbekend · gemaakt 20 okt |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 0 credits (flow in `stem/sessions.json`) |
| Duur | spraak 4:06 (246 s); met vragen en kaarten ± 6 min |
| Beeldstijl | Schema (Part C), met cast (Femke, Lotte, Dr. Kim als huisarts) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | voetbalveld; Lotte draait met haar voet op de grond; knie met 'plop'; knie die dikker wordt met klokje 1 uur; praktijk van Femke, twee dagen later; geen verwijsbrief |
| Hoofdstuk 1 — Eerst luisteren | s04, q05, s06 | Femke en Lotte aan tafel; drie alarmsignalen met kruisje: koorts met een rode warme knie, een knie die scheef staat, helemaal niet kunnen steunen; notitieblok met draaien, plop, dik binnen een uur |
| Hoofdstuk 2 — Wat zit er in een knie? | s07 | knie van voren, open: dijbeen, scheenbeen, knieschijf; twee kruisbanden die kruisen; voorste kruisband houdt het scheenbeen tegen; twee halve manen van kraakbeen (meniscus); binnenkant van de meniscus zonder bloedvaten; banden aan de zijkant; verwijzing naar Skelet en spieren en Hoe weefsel herstelt |
| Hoofdstuk 3 — Testen en vergelijken | s08, q09, s10 | hoekmeter op de knie, 140 graden links, 100 graden rechts; Femke houdt het dijbeen vast en trekt het scheenbeen naar voren; pijltje met harde stop tegenover zachte stop; twee knieën naast elkaar; 85 van de 100 scheuren gevonden |
| Hoofdstuk 4 — Een foto en een plan | s11, q12, s13 | röntgenfoto met alleen botten, banden onzichtbaar; vier regels als vinkjes: ouder dan 55, niet vier stappen kunnen lopen, niet tot 90 graden buigen, drukpijn op knieschijf of kuitbeenkopje; Lotte: geen foto nodig; twee paden: trainen en eventueel later opereren; Lotte oefent, kalender met maanden |
| Recap | s14, s15 | Femke en Lotte; vier kaartjes: luisteren, alarmsignalen, testen, beslissen; opleidingen fysiotherapie en bewegingswetenschappen |

## Vragen
q02 → a; q05 → c; q09 → c; q12 → b (zie film.py).

## Begrippen
anamnese, alarmsignalen, directe toegankelijkheid, kruisbanden, meniscus, zijbanden, hoekmeter, kruisbandtest, röntgenfoto.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 134 | `window.FILMDATA` |
| 1510 | `const SCENES = {}` |
| 1745 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/fy1` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> fysiotherapie`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Lotte is patiënt (Daan heeft geen sportoutfit)
- Lachmantest in beeld vereenvoudigd tot zijaanzicht met handen
- Feitencheck 21 okt: kruisband groeit meestal niet netjes terug (KANON)
