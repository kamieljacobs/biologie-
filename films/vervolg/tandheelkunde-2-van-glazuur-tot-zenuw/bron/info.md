# Van glazuur tot zenuw — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/tandheelkunde-2-van-glazuur-tot-zenuw.html` (audio in `tandheelkunde-2-van-glazuur-tot-zenuw/audio/`) |
| Reeks | Wat word jij? · Tandheelkunde en mondzorg (2 van 4) |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 20 oktober 2026 (script v2) |
| Prompt | onbekend · gemaakt 20 okt |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 3.811 credits (flow in `stem/sessions.json`) |
| Duur | spraak 3:56 (236 s); met vragen en kaarten ± 5 min |
| Beeldstijl | Schema, met cast (Tandarts Wouter, Lotte) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | Lotte met een ijsje, ze trekt een pijnlijk gezicht en houdt haar wang vast; een jaar eerder: Lotte in de stoel, geen pijn; tand met een donker vlekje |
| Hoofdstuk 1 — Drie lagen | s04, s05, s06 | kies in doorsnede: glazuur, tandbeen met heel veel kanaaltjes, pulpa met zenuw en bloedvaatjes, wortel in het kaakbot met een dun wortelvlies; inzoomen op één kanaaltje met vocht; koude die het vocht laat bewegen; zenuwvezel die een signaal stuurt; verwijzing naar Het kabelnetwerk |
| Hoofdstuk 2 — Kijken, voelen, foto | s07, s08, q09 | Tandarts Wouter met spiegeltje en lamp; wit plekje op het glazuur; röntgenfoto van de zijkant van de kiezen, glazuur helder wit, tandbeen grijs, een donker vlekje tussen twee kiezen; twee situaties naast elkaar: vlekje alleen in het glazuur, en vlekje tot in het tandbeen |
| Hoofdstuk 3 — Boren en vullen | s10, s11 | tijdlijn van één tand: vulling, grotere vulling, kroon; verdoving bij de zenuw, signalen stoppen; boortje haalt zacht tandbeen weg; vulmassa in tandkleur, in laagjes; blauw lampje dat elke laag hard maakt; Lotte die weer een ijsje eet |
| Hoofdstuk 4 — Als de zenuw ontstoken raakt | s12, q13, s14, s15 | gaatje dat te lang doorgaat tot in de pulpa; bacteriën in de pulpa; ontsteking: bloedvaatjes wijder, zwelling binnen de harde tand, druk op de zenuw; kloppende pijn; wortelkanaalbehandeling: pulpa eruit, kanaal schoon en gevuld; verwijzing naar De eerste verdediging |
| Recap | s16, s17 | Lotte met een ijsje, lachend; de kies met vulling; Wouter; drie kaartjes: glazuur zonder zenuw, foto, pas boren als het moet; opleidingen |

## Vragen
q02 → b; q09 → c; q13 → a (zie film.py).

## Begrippen
glazuur, tandbeen, pulpa, wortelvlies, röntgenfoto, ontkalking, vulling, pulpitis, wortelkanaalbehandeling.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 135 | `window.FILMDATA` |
| 1539 | `const SCENES = {}` |
| 1973 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/t2` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> tandheelkunde`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Eigen kies-doorsnede (kiesBasis, _kiesEigen) in teken_t2.js, ook gebruikt in t3 en t4
- Röntgenfoto (bitewing) met vaste grijstinten
