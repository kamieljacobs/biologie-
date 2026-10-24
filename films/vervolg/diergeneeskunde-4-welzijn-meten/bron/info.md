# Welzijn meten — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/diergeneeskunde-4-welzijn-meten.html` (audio in `diergeneeskunde-4-welzijn-meten/audio/`) |
| Reeks | Wat word jij? · Diergeneeskunde en Landbouw (gedeeld, id welzijn) |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 20 oktober 2026 (script v2) |
| Prompt | onbekend · gemaakt 20 okt |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 4.424 credits (flow in `stem/sessions.json`) |
| Duur | spraak 4:21 (261 s); met vragen en kaarten ± 6 min |
| Beeldstijl | Schema (FILMDATA-straat), vaste cast (Dierenarts Mila, Lotte, Veehouder Gerrit e.a.), gedeelde dierentekeningen in teken_dg0.js |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | varkensstal; Lotte en Mila bij een hok; een varken bijt in de staart van een ander; bloedend staartje |
| Hoofdstuk 1 — Wat welzijn is | s04, s05 | varken dat wroet in stro buiten, tegenover een kaal hok; oorzaken als kaartjes: niets om op te kauwen, weinig ruimte, slechte lucht, tocht, te weinig voer; daarna de vijf vrijheden als vijf vakjes; dan de vijf domeinen: vier vakken die samen het vijfde, hoe het dier zich voelt, bepalen |
| Hoofdstuk 2 — Signalen die je kunt meten | s06, s07 | drie stereotypieën: paard dat in zijn kribbe bijt, kalf dat met de tong rolt, ijsbeer die heen en weer loopt; daarna cortisol in speeksel, mest en haar; twee pijlen naar boven: stress én paren |
| Hoofdstuk 3 — Kijk naar het dier | s08, q09, s10, s11 | twee stallen: A nieuw en ruim, B oud en krap; daarna Mila die meet: koeien die over een gang lopen met een score, kale plekken op de hakken, een koe van opzij om te zien hoe vet ze is, Mila die met haar hand vooruit naar een koe loopt en de afstand |
| Hoofdstuk 4 — Samen op het erf | s12, s13 | Mila en Lotte met de veehouder aan tafel, gezondheidsplan; maatregelen als kaartjes: stro en touw om op te kauwen, meer ruimte, betere ventilatie, rustige groepen; daarna een big met een korte staart; hete tang; weegschaal met dier, veehouder, regels en samenleving |
| Recap | s14, s15 | het bijtende varken, nu met stro; Lotte en Mila; daarna werkplekken: praktijk, NVWA bij transport en slachthuis, onderzoek |

## Vragen
q02 → c; q09 → b (zie film.py).

## Begrippen
dierenwelzijn, vijf vrijheden, vijf domeinen, staartbijten, stereotiep gedrag, cortisol, diergerichte meting, couperen, bedrijfsgezondheidsplan.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 132 | `window.FILMDATA` |
| 1529 | `const SCENES = {}` |
| 2003 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/diergeneeskunde-4` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> diergeneeskunde`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Gedeelde film met Landbouw en dierhouderij
- Couperbeleid verandert: docentdeel actueel houden
