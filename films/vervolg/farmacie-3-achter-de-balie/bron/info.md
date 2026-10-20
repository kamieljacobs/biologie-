# Achter de balie — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/farmacie-3-achter-de-balie.html` (audio in `farmacie-3-achter-de-balie/audio/`) |
| Reeks | Wat word jij? · Farmacie |
| Niveau | vwo (één niveau) |
| Versie | 1.0 · oktober 2026 · 20 oktober 2026 (script v2) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 2.905 credits (flow in `stem/sessions.json`) |
| Duur | spraak 3:03 (183 s); met vragen en kaarten ± 5 min |
| Beeldstijl | Part C · Schema, met cast (Opa Henk als patiënt, Apotheker Ravi nieuw in het castboek, Dr. Kim in outfit gewoon) |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 → eindreview (reviews/review_eind.md) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | apotheekbalie; Apotheker Ravi met een scherm; Opa Henk met een tas; vijf doosjes op de toonbank; een strip ibuprofen ernaast |
| Hoofdstuk 1 — Medicatiebewaking | s04 | scherm met Henks medicatielijst en een rood signaal bij het nieuwe middel; nier met de toevoerende bloedvaten en de filtertjes; drie pijlen: plastablet haalt vocht weg, ACE-remmer verlaagt de druk in de filtertjes, ibuprofen knijpt het toevoerende vaatje dicht; verwijzing naar Water in balans |
| Hoofdstuk 2 — Advies aan de balie | s05, q06 | Ravi en Henk in gesprek aan de balie; paracetamol in plaats van ibuprofen; Henk vertelt over de tuinclub; plastablet met een vraagteken |
| Hoofdstuk 3 — Therapietrouw | s07 | groep telpoppetjes, de helft gekleurd; vier redenen als ikonen: vergeten, bijwerking, geen verschil merken, vaak naar de wc; klokje met de plastablet later op de ochtend; medicijnrol met zakjes per moment |
| Hoofdstuk 4 — Samen de lijst langs | s08, q09, s10 | driehoek Henk, Ravi en Dr. Kim aan tafel; lijst met vijf medicijnen, één doorgestreept; ziekenhuisbed met een deel van de opnames gemarkeerd |
| Recap | s11, s12 | Henk in zijn tuin met paracetamol en een medicijnrol; apotheek met Ravi en een assistent aan de balie |

## Vragen
q02 → a; q06 → c; q09 → b (zie film.py).

## Begrippen
medicatiebewaking, interactie, glomerulus, filterdruk, ACE-remmer, plastablet (diureticum), NSAID, therapietrouw, medicatiebeoordeling.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 110 | Voor de docent |
| 150 | `window.FILMDATA` |
| 1520 | `const SCENES = {}` |
| 1827 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/f3` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> farmacie`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Henks lijst (plastablet, ACE-remmer, bloeddrukpil (amlodipine), bètablokker, maagbeschermer) is alleen in beeld; de maagbeschermer wordt als voorbeeld doorgestreept.
- Glomerulus schematisch, één filtertje; dichtknijpen is eigenlijk prostaglandineremming.
- Apothekersassistent alleen als label (geen castpersonage).
- Animatie gebouwd door een helper volgens films/vervolg/BOUWEN.md, nagekeken in de hoofdsessie.
