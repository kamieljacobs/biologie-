# Oefentoets Voeding (havo en vwo) · bron

Gemaakt 20 nov 2026 op verzoek van Kamiel ('de oefentoetsen mogen op de site'), in de opzet van de Oefentoets Voortplanting (`tools/toets-bron/voortplanting/`) en de oefenexamens (hulpvragen 'niet uit de toets' → toetsvraag → nakijken → 'laat zien waarom'), volgens `tools/OEFENEXAMEN_PROMPT.md`.

- Uitvoer: `tools/toets-voeding-havo.html` (8 opgaven, 20 vragen, 37 punten) en `tools/toets-voeding-vwo.html` (8 opgaven, 20 vragen, 38 punten). localStorage `toets-voeding-havo` / `-vwo`, uitleg-sleutel (`TOOL`) `voeding-havo` / `voeding-vwo`. Terug-link naar `index.html#voeding`. Cijfer = 9 × score / maximum + 1.
- Inhoud = de Word-oefentoetsen `toetsen/2026-2027/5havo/5havo_voeding_oefentoets` en `6vwo/6vwo_voeding_oefentoets` in `kamieljacobs/toetsen-biologie` (matrijs: `…_oefentoets_matrijs.md`), vragen uit `eigen/voeding.json` (status concept). Zelfde opgaven, volgorde, contexten, vraagteksten, punten en correctievoorschrift; alleen de opmaak is anders. Geen vragen uit de echte toets.
- Bron: `frag/*.js`, één bron voor beide niveaus (`VWO` true/false). Per vraag `vraag(punten, onderwerp, build, stof)`, per opgave `opgave(kort, titel, html, ids)` (lege html = opgave zonder inleiding). Hulpjes in `00-basis.js`: `F` (films, hrefs als in `HOOFDSTUKKEN.voeding.films`), `UITSPRAKEN`, `NUM` (rekenvelden; spaties en komma mogen, doorrekenen via de tweede parameter van de check), `GRAFIEK` (afbeelding 1 van opgave 3, de proteasegrafiek, nagetekend met de waarden uit `eigen/figuren/voeding/maak.py`). Animaties: `GAL` (opgave 2), `ROUTES` (opgave 4), `GEWICHT` (opgave 6) in hun eigen fragment.
- 'Uitleg van de stof' geeft geen antwoord van welke vraag in de tool dan ook (leerlingen kunnen vrij doorklikken). Daarom past hij soms maar zijdelings: havo vraag 9 (plooien, vlokken, microvilli) krijgt 'Verteren en opnemen in de dunne darm' zonder de drie onderdelen; vraag 10 krijgt 'Vaten in de darmwand' zonder plooien/vlokken/microvilli; de koalavragen krijgen 'Het microbioom' zonder vezelafbraak door bacteriën (antwoord havo 16); vraag 20 krijgt 'Hoe sterk is een claim?' zonder placebo en controlegroep (punt 2 van vraag 8).
- `bouw.py` haalt de vragen van het andere niveau echt weg (functie `niveau`: elk `if(VWO)…`/`if(!VWO)…`-statement blijft alleen staan in het bestand van zijn niveau), dus geen vwo-stof in de havo-broncode.
- Bouwen: `python3 tools/toets-bron/voeding/bouw.py` (geraamte = `tools/examen-havo-2026-2.html` met de vier hulpstanden).
- Testen: `test.py` (alle vragen open, punten, 375 px) en `speel.py` (elke vraag beantwoorden, nakijken, waarom-animaties); schermafdrukken in `/tmp/toets-voeding-shots`. Stand 20 nov 2026: geen fouten, havo 37 p, vwo 38 p, geen horizontaal scrollen op 375 px.

## Inhoud

| opgave | havo | vwo | films |
|---|---|---|---|
| 1 Voedingsstoffen | K102 juist/onjuist, K107 Sanne (vegan) | K104 rekenen havermout, K107 | 1 |
| 2 De reis door je buik | K207 gal, K209 diarree | idem | 2 (3, 6) |
| 3 Enzymen in de was (grafiek) | B1, B2, B4, B6 | B1, B2, B5, B6 | 3, 7 |
| 4 Van darm naar bloed | K401 oppervlak, K408 juist/onjuist | K403 diffusie/actief transport, K408 | 4 |
| 5 De lever | K505 alcohol en medicijnen | idem | 5 |
| 6 Vasten op het nest (Adéliepinguïn) | A2–A5 | A2–A6 | 1, 5 (4) |
| 7 Een jonge koala eet pap | C1–C4 | C2, C3, C5 | 6 (2, 3) |
| 8 Supplementen en claims | K704 | idem | 7 (6) |

## Controle (20 nov 2026)

Eén onafhankelijke controleur; verwerkt: zin bij de juist/onjuist-vragen, puntentoekenning havermout, hulpvragen bij koala, pinguïn en enzympillen, uitleg bij vraag 9 en bij koemelk; daarna 'Uitleg van de stof' bij vraag 10, de koalavragen en vraag 20 herschreven (gaven antwoorden van andere vragen) en het havo-bestand zonder vwo-vragen gebouwd. `test.py` en `speel.py`: geen fouten.

Status: concept, wacht op Kamiels oordeel.
