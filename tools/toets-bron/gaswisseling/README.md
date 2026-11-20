# Oefentoets Gaswisseling en uitscheiding (havo en vwo) · bron

Gemaakt 20 nov 2026 (Kamiel: "de oefentoetsen mogen op de site"), in dezelfde opzet als `tools/toets-bron/voortplanting/` (hulpvragen 'niet uit de toets' → toetsvraag → nakijken → 'laat zien waarom', vier hulpstanden), volgens `tools/OEFENEXAMEN_PROMPT.md`.

- Uitvoer: `tools/toets-gaswisseling-havo.html` (6 opgaven, 17 vragen, 33 punten) en `tools/toets-gaswisseling-vwo.html` (7 opgaven, 18 vragen, 35 punten). localStorage `toets-gaswisseling-havo` / `-vwo`, uitleg-sleutel (`TOOL`) `gw-havo` / `gw-vwo`. Terug-link naar `index.html#gaswisseling`.
- Inhoud = de Word-oefentoetsen `5havo_gaswisseling_oefentoets` en `6vwo_gaswisseling_oefentoets` in `kamieljacobs/toetsen-biologie` (matrijs `toetsen/2026-2027/<klas>/<klas>_gaswisseling_oefentoets_matrijs.md`, vragen uit `eigen/gaswisseling.json`): zelfde opgaven, volgorde, contexten, vraagteksten, punten en correctievoorschrift. Geen vragen uit de echte toets (G, H, I, M, N).
  - havo: KA01, KA03 · A01–A04 · E01–E04 · C01, C02, C04 · KC01, KC04, KC10 · F01
  - vwo: KA01, KA03 · A01, A03, A04, A05 · E01–E05 · C01, C02, C04 · KC04, KC10 · F01 · KD01
- Bron: `frag/*.js`, één bron voor beide niveaus (`VWO`). `00-basis.js`: `vraag`, `opgave`, films `F` (hrefs als in `HOOFDSTUKKEN.gaswisseling.films`), `TABEL`, `FIG`, `rekenAnswer` (één uitkomst, bij fout een deelpunt voor de aanpak), `rijenAnswer` (open tabel, per rij zelf nakijken), en de nagetekende figuren `SAT` (saturatie Kees) en `HOND` (temperatuur en ademfrequentie) met dezelfde gegevens als `eigen/figuren/gaswisseling/maak.py`. `IJZER` (schema ijzeren long), `DIFF` en `CURVE` (vwo) staan in hun eigen fragment.
- Bouwen: `python3 tools/toets-bron/gaswisseling/bouw.py` (geraamte = `tools/examen-havo-2026-2.html`, zoals voortplanting).
- Testen: `test.py` (alle vragen open, punten, 375 px) en `speel.py` (elke vraag beantwoorden, nakijken, waarom-animaties); schermafdrukken in `/tmp/toets-gaswisseling-shots`.

## Opmaak die afwijkt van Word

- Opgave De ijzeren long: naast de tabel bij afbeelding 1 een eenvoudig SVG-schema van de tank (de Word-versie heeft alleen de tabel).
- KA01 (ordenen): per plek een keuzelijst; alleen de volledig juiste volgorde = 1 punt.
- KC01 (tabel invullen): per orgaan een invulvak, daarna zelf nakijken per rij (alles juist 2, één fout 1).
- E05 (vwo): de zuurstofbindingscurve staat als geheugensteun bij de vraag ('zoals in Binas'), omdat leerlingen in de tool geen Binas bij de hand hebben.
- A02/A05: rekenvragen automatisch nagekeken; A05 telt doorrekenen mee, behalve 12,5 (zonder dode ruimte).

Status: concept, wacht op Kamiels oordeel.
