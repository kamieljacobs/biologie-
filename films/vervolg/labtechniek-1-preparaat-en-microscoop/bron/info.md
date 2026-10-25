# Preparaat en microscoop — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/labtechniek-1-preparaat-en-microscoop.html` (audio in `labtechniek-1-preparaat-en-microscoop/audio/`) |
| Reeks | Wat word jij? · Laboratoriumtechniek |
| Niveau | havo · vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 24 oktober 2026 (script v2) |
| Prompt | v6 + WERKWIJZE-LESSEN van 24 okt (frisse eindreview, eenheden voluit); nog niet nagelopen tegen v10 |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 4.794 credits (flow in `stem/sessions.json`) |
| Duur | spraak 5:16 (316 s); met vragen en kaarten ± 7 min |
| Beeldstijl | Schema-look van de Wat word jij?-films (navy, castpersonages, lijntekening) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 24 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | onderzoekslab; Yasmin aan een microscoop; kweekfles en druppel op een glaasje; in een zoomcirkel bijna niets: vage, doorzichtige randjes |
| Hoofdstuk 1 — Scherpstellen en de grens van licht | s04, q05, s06 | microscoop met lichtbron, objectieven 4×, 10×, 40×, 100×, oculair 10×; grote en fijne schroef; vergroting = oculair × objectief; twee puntjes die onder 0,2 micrometer samensmelten tot één vlek; lege vergroting |
| Hoofdstuk 2 — Een preparaat maken | s07, q08, s09 | stukje lever in een potje formaline; eiwitten die aan elkaar vastgeknoopt raken; paraffineblokje; microtoom met een lint van plakjes van vier micrometer; plakje op een glaasje; twee kleurbakjes; coupe die van grijs naar blauwpaars en roze gaat |
| Hoofdstuk 3 — Verder inzoomen: fluorescentie en elektronen | s10, q11, s12 | cellen op een zwart veld met blauwe kernen en één groen oplichtend eiwit; antistof met lichtgevend label; filter; elektronenmicroscoop met vacuüm; zwart-wit beeld van ER, mitochondrium met cristae, ribosomen als puntjes |
| Hoofdstuk 4 — Meten en tellen | s13, q14, s15 | oculair met een schaalverdeling over een objectmicrometer; 100 micrometer = 40 streepjes; cel van 8 streepjes = 20 micrometer; telkamer met raster; vierkant van 1 bij 1 millimeter, 0,1 millimeter diep; 50 cellen geteld |
| Recap | s16, s17 | Yasmin aan de microscoop; drie kaartjes: kleuren, laten oplichten, zware metalen; opleidingen; werkplekken |

## Vragen
q02 → c; q05 → b; q08 → a; q11 → b; q14 → c (zie film.py).

## Begrippen
contrast, vergroting, oplossend vermogen, lege vergroting, fixeren, coupe, HE-kleuring, fluorescentie, elektronenmicroscoop.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 114 | Voor de docent |
| 159 | `window.FILMDATA` |
| 1844 | `const SCENES = {}` |
| 2223 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/lt1` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> labtechniek`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Fasecontrast voor levende cellen staat alleen in het docentdeel
- Grens 0,2 µm geldt voor gewone lichtmicroscopie, niet voor superresolutie
- Naam mbo-opleiding: biologisch-medisch analist (crebo 25953)
