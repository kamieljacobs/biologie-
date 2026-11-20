# Oefentoets Gedrag (havo en vwo) · bron

Gemaakt 20 nov 2026 (Kamiel: "de oefentoetsen mogen op de site"), in dezelfde opzet als `tools/toets-bron/voortplanting/` (hulpvragen 'niet uit de toets' → toetsvraag → nakijken → 'laat zien waarom'), volgens `tools/OEFENEXAMEN_PROMPT.md`.

- Uitvoer: `tools/toets-gedrag-havo.html` (11 opgaven, 19 vragen, 34 punten) en `tools/toets-gedrag-vwo.html` (11 opgaven, 18 vragen, 34 punten). localStorage `toets-gedrag-havo` / `-vwo`, uitleg-sleutel (`TOOL`) `gedrag-havo` / `gedrag-vwo`. Terug-link naar `index.html#gedrag`. Cijfer = 9 × score / 34 + 1.
- Inhoud = de Word-oefentoetsen `toetsen/2026-2027/4havo/4havo_gedrag_oefentoets` en `6vwo/6vwo_gedrag_oefentoets` uit `kamieljacobs/toetsen-biologie` (ID's in `<klas>_gedrag_oefentoets_matrijs.md`, tekst/sleutels/correctievoorschrift uit `eigen/gedrag.json`): zelfde opgaven, volgorde, contexten, vraagteksten en punten. Wijzig je een vraag of getal, zet het dan ook terug in de toetsenrepo.
  - havo: KA01 · D01 D02 D03 · KC02 · A01 A02 A03 · KJ01 · KK02 · B01 B02 B03 B04 B05 · KE04 · KD02 · KF02 · KL02
  - vwo: KA01 · D01 D03 D04 · KC02 · A01 A03 · KJ01 · KK02 · B01 B03 B04 B05 B06 · KE04 · KD02 · KF02 · KL02
- Bron: `frag/*.js`, één bron voor beide niveaus (`VWO`). Per vraag `vraag(punten, onderwerp, build, stof)`, per opgave `opgave(kort, titel, inleiding, ids)`; een losse vraag zonder inleiding krijgt `""` (de tool zegt dan 'geen inleiding'). Hulpjes in `00-basis.js`: `F` (films), `TABEL`, `uitspraken` (juist/onjuist-opbouw), `ZALM` (afbeelding 1, nagetekend als SVG met de punten van `eigen/figuren/gedrag/maak.py`), `UITDOOF` (tabel 2 als staafjes, alleen in 'laat zien waarom'); `QUORUM` (bijen bij twee holtes) staat in `04-zwerm.js`.
- Opmaak: alleen opmaak aangepast. Tabel 2 staat in de Word-toets bij vraag B04; de tool herhaalt hem bij B05 ("tabel 2 uit vraag N"), omdat elke vraag een eigen scherm is.
- Bouwen: `python3 tools/toets-bron/gedrag/bouw.py` (geraamte uit `tools/examen-havo-2026-2.html` met de vier hulpstanden; bij één vraag in een opgave staat 'vraag N' in plaats van 'vraag N t/m N').
- Testen: `test.py` en `speel.py` (schermafdrukken in `/tmp/toets-gedrag-shots`). 20 nov 2026: geen fouten, 34 punten per niveau, geen horizontaal scrollen op 375 px.

Valkuilen bij de open vragen: waar `eigen/gedrag.json` een ondergrens geeft, staat die er letterlijk; bij een paar vragen zonder ondergrens (D01, D02, D04, KC02-tweede deel, A03, KJ01, B03, B06) is een eigen valkuil toegevoegd als leerhulp (geen extra puntregel).

Status: concept, wacht op Kamiels oordeel.
