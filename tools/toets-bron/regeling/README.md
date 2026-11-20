# Oefentoets Regeling (havo en vwo) · bron

Gemaakt 20 nov 2026 (Kamiel: 'de oefentoetsen mogen op de site'), in dezelfde opzet als de Oefentoets Voortplanting (`tools/toets-bron/voortplanting/`): hulpvragen 'niet uit de toets' → toetsvraag (wit papiervak) → nakijken → 'laat zien waarom', met per vraag 'Uitleg van de stof' (`EXSTOF.zet`) en de vier hulpstanden.

- Uitvoer: `tools/toets-regeling-havo.html` (8 opgaven, 18 vragen, 34 punten) en `tools/toets-regeling-vwo.html` (9 opgaven, 19 vragen, 36 punten). localStorage `toets-regeling-havo` / `-vwo`, uitleg-sleutel (`TOOL`) `reg-havo` / `reg-vwo`. Terug-link naar `index.html#regeling`. Cijfer = 9 × score / maximum + 1.
- Inhoud = de Word-oefentoetsen `toetsen/2026-2027/4havo/4havo_regeling_oefentoets.docx` en `4vwo/4vwo_regeling_oefentoets.docx` in `kamieljacobs/toetsen-biologie` (matrijs `…_oefentoets_matrijs.md`, vragen uit `eigen/regeling.json`). Zelfde opgaven, volgorde, contexten, vraagteksten, punten en afbeeldingnummers (1–4). Geen vragen uit de echte toets.
- Bron: `frag/*.js`, één bron voor beide niveaus (`VWO`). `00-basis.js`: `vraag`, `opgave`, films `F` (hrefs uit `HOOFDSTUKKEN.regeling.films`), `selectPunten` (keuzelijsten met een punt per groep, voor de schemavraag), en de figuren als SVG met dezelfde (fictieve) getallen als `eigen/figuren/regeling/maak.py`: `SCHEMA_CORT` (afb. 1), `GRAF_PRED` (afb. 2), `GRAF_SPIER` (afb. 3), `GRAF_AUDIO` (afb. 4). Animatie-tekeningen staan in hun fragment (`KRING_SCHILD`, `ROUTE_REFLEX`, `AXON`, `DREMPEL`, `OOR_KETEN`, `HAARCELLEN`, `VERDUBBEL`, vwo `BASILAIR` en `ARM`).
- Bouwen: `python3 tools/toets-bron/regeling/bouw.py` (geraamte uit `tools/examen-havo-2026-2.html`, zoals voortplanting).
- Testen: `test.py` en `speel.py`; schermafdrukken in `/tmp/toets-regeling-shots`.

## Opbouw

| opgave | vragen (havo) | vragen (vwo) | ID's | films |
|---|---|---|---|---|
| 1 Bloedsuiker | 1 (2p) | idem | KB03 | 2, 4 |
| 2 Hypothalamus, hypofyse en schildklier | 2 (2p) | idem | KC08 | 3 |
| 3 Zes weken prednison | 3–7 (9p) | idem | A01–A05 | 3, 4 |
| 4 Het zenuwstelsel en reflexen | 8 (2p) | idem | KF04 | Eén seconde |
| 5 De impuls | 9 (2p) | idem | KG06 | Het kabelnetwerk |
| 6 Moeie spieren | 10–13 (7p) | idem | B06, B08, B09, B10 | De spleet, Knoeien met de synaps |
| 7 De hersenen | 14 (2p) | idem | KI03 | Het hoofdkantoor |
| 8 Een piep na het festival | 15–18 (8p), 18 = rekenvraag E04 | 15–18 (8p), 18 = basilair membraan E05 | E01–E04 / E05 | Zintuigen |
| 9 Bot en spieren (vwo) | – | 19 (2p) | KK02 | Spieren en beweging |

## Vorm (alleen opmaak, geen inhoud veranderd)

- Tabel- en schemavragen (1, 3, 14) zijn keuzelijsten; de puntentelling volgt het correctievoorschrift (1: vier goed 2p, drie 1p; 3: organen 1p, tekens 1p, elk alleen als alles goed; 14: alle vakjes 2p, één fout 1p).
- Rekenvraag 18 (havo) vraagt in twee vakjes 'hoeveel keer zo lang' en 'uren'; bij een fout in het eerste vakje telt een juiste omrekening naar uren (doorrekenregel uit het correctievoorschrift).
- Afbeelding 2 staat bij vraag 4 (zoals in Word) en is bij vraag 5–7 uitklapbaar ('Afbeelding 2 nog eens').
- Kennisopgaven zonder inleiding tonen 'Deze opgave heeft geen inleiding'.

Status: concept, wacht op Kamiels oordeel. Wijzig je een vraag of getal, zet het dan ook terug in `eigen/regeling.json` van de toetsenrepo.
