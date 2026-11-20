# Oefentoets Planten (alleen vwo) · bron

Gemaakt 20 nov 2026 (Kamiel: "de oefentoetsen mogen op de site"), in de opzet van de Oefentoets Voortplanting (`tools/toets-bron/voortplanting/`): hulpvragen 'niet uit de toets' → toetsvraag → nakijken → 'laat zien waarom', met de vier hulpstanden en 'Uitleg van de stof'.

- Uitvoer: `tools/toets-planten-vwo.html` (7 opgaven, 17 vragen, 36 punten). Planten is alleen vwo (6 vwo, Nectar H20, PTA OND3), dus geen havo-versie. localStorage `toets-planten-vwo`, uitleg-sleutel (`TOOL`) `pl-vwo`. Terug-link naar `index.html#planten`.
- Inhoud = de Word-oefentoets `toetsen/2026-2027/6vwo/6vwo_planten_oefentoets.docx` uit `kamieljacobs/toetsen-biologie` (matrijs `6vwo_planten_oefentoets_matrijs.md`): zelfde vragen, volgorde, contexten, vraagteksten en punten. Bron van tekst en antwoordmodel: `eigen/planten.json` (EI-planten-A02, A07, B04, B09, H01–H03, C04, C11, G01, G02, G04, D01, D10, F01–F03). Niets uit de echte toets (`6vwo_planten_matrijs.md`).
- Bron: `frag/*.js`. Per vraag `vraag(punten, onderwerp, build, stof)`, per opgave `opgave(kort, titel, html, ids)`. Elk kopje van de Word-toets is een opgave; de intro van de Word-toets staat bij opgave 1.
- Eigen bouwstenen in `00-basis.js`: `openScore` (zelf nakijken met eigen puntentelling, bv. drie stappen 2p / twee stappen 1p), `woordAnswer` (namen invullen die de tool nakijkt, spelling telt niet), `mixAnswer` (getal of keuze door de tool + uitleg zelf afvinken), `GRAF` (afbeelding 1 van de vertical farm als SVG, zelfde modelkrommen als `eigen/figuren/planten/maak.py`; ook voor de compensatiepunt-animatie bij vraag 17). `DRUK` (drukstroom-animatie) staat in `02-transport.js`.
- Bouwen: `python3 tools/toets-bron/planten/bouw.py` (geraamte uit `tools/examen-havo-2026-2.html`, zoals voortplanting).
- Testen: `test.py` (alle vragen open, punten, 375 px) en `speel.py` (elke vraag beantwoorden, nakijken, waarom-animaties); schermafdrukken in `/tmp/toets-planten-shots`. 20 nov 2026: geen fouten, 36 punten, geen horizontaal scrollen op 375 px.

## Nakijken per vraag

| vraag | ID | p | nakijken |
|---|---|---|---|
| 1 zones stengeltop | A02 | 2 | zelf (2 punten) |
| 2 plantenhormonen | A07 | 2 | tool: vier namen invullen (4 goed 2p, 3 goed 1p) |
| 3 water de wortel in | B04 | 2 | zelf, stappen tellen (3 → 2p, 2 → 1p) |
| 4 drukstroom | B09 | 3 | zelf; waarom = animatie |
| 5–7 hoogste bomen | H01–H03 | 2+2+2 | zelf |
| 8 niet-cyclische fotofosforylering | C04 | 3 | zelf |
| 9 massa glucose uit CO₂ | C11 | 2 | tool: keuze welke atomen + percentage (92,5–93,5) |
| 10 bruto CO₂-opname | G01 | 2 | tool: dissimilatie (2 of −2) + bruto 8 (doorrekenen telt) ; waarom = animatie |
| 11 etmaal | G02 | 2 | tool: 80 mg + uitleg zelf |
| 12 extra CO₂ | G04 | 2 | tool: 50/400 + uitleg zelf; waarom = animatie |
| 13 bestemmingen glucose | D01 | 2 | zelf, aantal juiste (4 → 2p, 3 → 1p) |
| 14 absorptiespectrum | D10 | 2 | zelf |
| 15–17 bonte bladeren | F01–F03 | 2+2+2 | zelf; 17 waarom = animatie |

## Afwijkingen van de Word-toets (alleen vorm)

- Vraag 9: 'Leg uit welke atomen dat zijn' wordt een keuze (alleen C / C en O / C, H en O / alleen O), zodat de tool het kan nakijken.
- Vraag 10: de uitleg 'hoe je de dissimilatie uit afbeelding 1 haalt' wordt het invullen van de afgelezen waarde; de uitleg staat in de terugkoppeling.
- Afbeelding 1 is nagetekend (SVG, licht/donker) in plaats van de png.

Status: concept, wacht op Kamiels oordeel. Nog geen frisse controleur gedraaid op 'geeft het antwoord niet weg'.
