# Wat meet de verloskundige? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/verloskunde-2-wat-meet-de-verloskundige.html` (audio in `verloskunde-2-wat-meet-de-verloskundige/audio/`) |
| Reeks | Wat word jij? · Verloskunde |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 20 oktober 2026 (script v2) |
| Prompt | onbekend · gemaakt 20 okt |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.691 credits (flow in `stem/sessions.json`) |
| Duur | spraak 5:54 (354 s); met vragen en kaarten ± 7 min |
| Beeldstijl | Schema, met cast (Verloskundige Mirjam, Esra; nieuw in het castboek) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | praktijkkamer; Esra 30 weken; bloeddrukmeter om haar arm; Mirjam leest af; Esra: 'ik voel me prima' |
| Hoofdstuk 1 — Een gewone controle | s04, s05, s06 | kalender met controles, eerst om de vier weken, later elke week; Mirjam voelt de buik, de bovenrand van de baarmoeder stijgt; doptone met hartslag 140; checklist |
| Hoofdstuk 2 — Als de placenta niet goed ingroeit | s07, s08, s09, q10, s11, s12 | wand van de baarmoeder met een smal spiraalslagadertje; bij gezond: placentacellen maken het wijd; bij pre-eclampsie: blijft smal; placenta in nood stuurt stoffen naar het bloed van de moeder; vaatwand lekt, nierfilter laat eiwit door; Esra 36 weken: 135/85, urinestrip negatief |
| Hoofdstuk 3 — Zwangerschapsdiabetes | s13, s14, s15, q16, s17 | placenta die hormonen afgeeft; insulinereceptor die minder reageert; alvleesklier van de moeder die extra insuline maakt; glucose gaat door de placenta, insuline van de moeder niet; kind maakt zelf extra insuline en groeit extra; suikertest: drankje en twee uur wachten |
| Hoofdstuk 4 — Wanneer verwijs je door? | s18, s19, q20, s21 | twee lijnen: eerste lijn verloskundige, tweede lijn gynaecoloog in het ziekenhuis; Dr. Kim; voorbeelden als kaartjes: pre-eclampsie, zwangerschapsdiabetes, tweeling, kind in stuit, te weinig groei, bloedverlies; pijl terug |
| Recap | s22, s23 | Esra 37 weken, alles groen; checklist: bloeddruk, urine, groei, hart; opleiding |

## Vragen
q02 → b; q10 → c; q16 → b; q20 → c (zie film.py).

## Begrippen
zwangerschapscontrole, spiraalslagaders, pre-eclampsie, eiwit in de urine, zwangerschapsdiabetes, suikertest, eerste lijn, tweede lijn, doorverwijzen.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 131 | `window.FILMDATA` |
| 1522 | `const SCENES = {}` |
| 1900 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/verloskunde2` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> verloskunde`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Dr. Kim speelt de gynaecoloog
- Doorverwijzen: landelijke afspraken niet bij naam genoemd
