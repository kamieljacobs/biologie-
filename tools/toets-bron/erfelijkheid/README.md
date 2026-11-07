# Oefentoets Erfelijkheid (havo en vwo) · bron

Gemaakt 31 okt 2026 op verzoek van Kamiel: oefentoets als tool, in dezelfde opzet als de oefenexamens (hulpvragen 'niet uit de toets' → toetsvraag → nakijken → 'laat zien waarom'), volgens `tools/OEFENEXAMEN_PROMPT.md`.

- Uitvoer: `tools/toets-erfelijkheid-havo.html` (6 opgaven, 24 vragen, 40 punten) en `tools/toets-erfelijkheid-vwo.html` (6 opgaven, 26 vragen, 45 punten). localStorage `toets-erfelijkheid-havo` / `-vwo`, uitleg-sleutel (`TOOL`) `erf-havo` / `erf-vwo`.
- Bron: `frag/*.js`, één bron voor beide niveaus (`VWO` true/false). Per vraag `vraag(punten, onderwerp, build, stof)`, per opgave `opgave(kort, titel, html, ids)`; 'Uitleg van de stof' staat als vierde argument bij de vraag (via `EXSTOF.zet`), dus `tools/examen-stof.js` hoeft niet aangepast. Hulpjes: `PUN` (kruisingsschema), `STAM` (stamboom) in `00-basis.js`.
- Bouwen: `python3 tools/toets-bron/erfelijkheid/bouw.py`. Neemt de bouwstenen en navigatie uit het nieuwste oefenexamen (`tools/examen-havo-2026-2.html`) en zet de teksten om naar 'toets' (toetsvraag, toetsstand, antwoordmodel, terug naar Erfelijkheid, cijfer = 9 × score / maximum + 1). Wijzigt de gedeelde opbouw van de oefenexamens, bouw dan deze toetsen opnieuw.
- Testen: `test.py` (alle vragen open, punten, telefoonbreedte) en `speel.py` (elke vraag beantwoorden, nakijken, waarom-animaties doorklikken).

## Inhoud

| opgave | havo | vwo | films |
|---|---|---|---|
| 1 De Siamese kat (chromosomen, gen/allel/locus, genotype en milieu) | 4 vragen, 6p | idem | 1 |
| 2 Cavia's | monohybride, 1/3 homozygoot, terugkruising (5p) | dihybride: 3/16, terugkruising 1:1:1:1 (4p) | 2, 4, 6 |
| 3 Palomino en cremello (intermediair) | eigen vragen A01–A04, 7p | idem | 3, 6 |
| 4 Bloedgroepen, Manx (letaal), lengte (polygeen) | 5 vragen, 7p | idem | 3 |
| 5 Choroideremie (stamboom, X-recessief) | eigen vragen B05–B09, 10p | + LHON (mitochondriaal DNA), 12p | 5, 6 |
| 6 havo: PKU (2/3, 1/6) en maïs (gekoppeld) · vwo: reukerwt (eigen vragen C10–C14) | 5p | 9p | 4, 6 |

Eigen vragen A, B en C komen uit `kamieljacobs/toetsen-biologie`, `eigen/erfelijkheid.json` (status concept). Afwijking: bij C13/C14 zijn de fictieve terugkruisingsgetallen hier 380/120/116/384 (23,6% recombinant), zodat ze passen bij tabel 1 (55 van 381 rood-rond ≈ 24% recombinatie); in de toetsrepo staat nog 446/52/54/448 (10,6%).

Controle: één frisse controleur (sleutels, kansen, vakinhoud, 'geeft het antwoord niet weg', taal), 31 okt 2026; bevindingen verwerkt. Status: concept, wacht op Kamiels oordeel.
