# Toeval of echt? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/biomedisch-4-toeval-of-echt.html` (audio in `biomedisch-4-toeval-of-echt/audio/`) |
| Reeks | Wat word jij? · Biomedische wetenschappen en Bio-informatica (gedeelde film) |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 24 oktober 2026 (script v2) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 4.510 credits (flow in `stem/sessions.json`) |
| Duur | spraak 4:45 (285 s); met vragen en kaarten ± 6 min |
| Beeldstijl | Part C · Schema, met cast (Opa Henk, Noor, Daan, Dr. Kim) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 24 okt 2026; script v1 → zelfcontrole met bronnen → v2 → ingesproken → frisse eindreview (reviews/review_eind.md) → hersteld |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | tuin; Opa Henk bij zijn tomatenplanten met een zak meststof; Noor met een meetlint; twintig plantjes in potjes, tien met een gele sticker; twee gemiddelden 40 en 43 centimeter |
| Hoofdstuk 1 — Spreiding | s04 | lengte-as met twee rijen stippen, elke stip een plantje; eerst weinig spreiding (groepen naast elkaar), dan veel spreiding (25 tot 55 centimeter, groepen door elkaar); standaardafwijking als band rond het gemiddelde; Noors echte metingen: overlap van 39 tot 44 centimeter |
| Hoofdstuk 2 — Hoeveel plantjes? | s05, q06, s07 | gemiddelde van drie plantjes dat bij elke herhaling wiebelt, met tien plantjes minder; standaardfout = standaardafwijking gedeeld door de wortel van n; balken: kans om een echt effect van drie centimeter te vinden met tien en met zeventien plantjes per groep; verwijzing naar Onderzoek doen |
| Hoofdstuk 3 — Wat de p-waarde zegt | s08, q09, s10 | twintig plantjes met stickers 'met' en 'zonder'; de stickers worden steeds opnieuw gehusseld; histogram van duizenden verschillen rond nul; staarten voorbij plus en min drie centimeter gekleurd: ongeveer 4 op de 100; kaartje wat p niet is; staafgrafiek met 95%-betrouwbaarheidsintervallen die overlappen; interval van het verschil: 0,2 tot 5,8 centimeter |
| Hoofdstuk 4 — Zelf rekenen | s11 | Noor en Daan achter een laptop; spreadsheet met twee kolommen lengtes en één formule; uitkomst 0,036; dezelfde toets in een paar regels Python |
| Recap | s12, s13 | Opa Henk en Noor bij de tomaten; drie kaartjes: spreiding, aantal metingen, p-waarde; twee opleidingen |

## Vragen
q02 → b; q06 → a; q09 → c (zie film.py).

## Begrippen
gemiddelde, spreiding, standaardafwijking, standaardfout, nulhypothese, p-waarde, significant, betrouwbaarheidsinterval, t-toets.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 112 | Voor de docent |
| 154 | `window.FILMDATA` |
| 1839 | `const SCENES = {}` |
| 2078 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/b4` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> biomedisch`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Rekenvoorbeeld nagerekend in bron (t-toets p=0,036; husselen p=0,043)
- p-waarde volgens ASA 2016
- Gedeelde film: ook Bio-informatica (id statistiek)
- Geen placebo/fasen (andere film)
