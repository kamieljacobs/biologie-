# Van dier naar mens — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/diergeneeskunde-3-van-dier-naar-mens.html` (audio in `diergeneeskunde-3-van-dier-naar-mens/audio/`) |
| Reeks | Wat word jij? · Diergeneeskunde |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 20 oktober 2026 (script v2) |
| Prompt | onbekend · gemaakt 20 okt |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 4.487 credits (flow in `stem/sessions.json`) |
| Duur | spraak 4:25 (265 s); met vragen en kaarten ± 6 min |
| Beeldstijl | Schema (FILMDATA-straat), vaste cast (Dierenarts Mila, Lotte, Veehouder Gerrit e.a.), gedeelde dierentekeningen in teken_dg0.js |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | kaart van Brabant in 2009 met stippen voor zieke mensen; huisarts; thermometer; geen verband tussen de stippen |
| Hoofdstuk 1 — Een bacterie op de wind | s04, s05 | geitenstal; drachtige geit met een dood lammetje; placenta vol bacteriën; stro en mest die opdrogen; stofwolk die met de wind meegaat; huizen op kilometers afstand; daarna drie voorbeelden: hond met rabiës, teek, vogel en varken met griep |
| Hoofdstuk 2 — Overspringen | s06, s07, q08, s09 | virus als sleutel, receptor op een cel als slot; vogelcel past, mensencel niet; 2003: kippenschuur, ruimen; één dierenarts; daarna kopieerfouten en een variant die net iets beter past |
| Hoofdstuk 3 — Een uitbraak bestrijden | s10, s11 | twee loketten naast elkaar: GGD met zieke mensen, dierenarts met verwerpende geiten, een muur ertussen; tijdlijn 2008 melden, 2009 vaccineren, tankmelk testen, eind 2009 ruimen; grafiek met zieke mensen per jaar die stijgt en daarna daalt |
| Hoofdstuk 4 — Eén gezondheid | s12, q13, s14 | driehoek mens, dier en omgeving; varken en varkenshouder; MRSA in de neus; ziekenhuis met een testje; dierenarts schrijft voor; grafiek antibioticagebruik in de veehouderij sinds 2009 |
| Recap | s15, s16 | geit, mens en wind in één beeld; Mila met Lotte; daarna de opleiding en werkplekken: praktijk, NVWA, laboratorium |

## Vragen
q02 → b; q08 → a; q13 → c (zie film.py).

## Begrippen
zoönose, Q-koorts, verwerpen, receptor, gastheer, ruimen, One Health, veegerelateerde MRSA, vaste dierenarts.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 134 | `window.FILMDATA` |
| 1531 | `const SCENES = {}` |
| 2008 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/diergeneeskunde-3` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> diergeneeskunde`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Kaart van Brabant is schematisch (brabantKaart in teken_dg3.js)
- Antibioticacijfer SDa 2025: jaarlijks bijwerken
