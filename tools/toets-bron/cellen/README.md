# Oefentoets Cellen (havo en vwo) · bron

Gemaakt 20 nov 2026 (Kamiel: "de oefentoetsen mogen op de site"), in dezelfde opzet als de Oefentoets Voortplanting (`tools/toets-bron/voortplanting/`): hulpvragen 'niet uit de toets' → toetsvraag → nakijken → 'laat zien waarom', met 'Uitleg van de stof' per vraag en de vier hulpstanden.

- Uitvoer: `tools/toets-cellen-havo.html` (9 opgaven, 17 vragen, 35 punten) en `tools/toets-cellen-vwo.html` (9 opgaven, 18 vragen, 37 punten). localStorage `toets-cellen-havo` / `-vwo`, uitleg-sleutel (`TOOL`) `cel-havo` / `cel-vwo`. Terug-link naar `index.html#cellen`. Cijfer = 9 × score / maximum + 1.
- Inhoud = de Word-oefentoets: `toetsen/2026-2027/4havo/4havo_cellen_oefentoets_matrijs.md` en `4vwo/4vwo_cellen_oefentoets_matrijs.md` in `kamieljacobs/toetsen-biologie`; tekst, sleutels en punten uit `eigen/cellen.json` (status concept). Zelfde opgaven (kopjes van de Word-toets), volgorde, contexten, vraagteksten en punten. Geen vragen uit de echte toets (zijderups, honing, platworm).
- Bron: `frag/*.js`, één bron voor beide niveaus (`VWO`). Hulpjes in `00-basis.js`: `F` (films, hrefs als in `HOOFDSTUKKEN.cellen.films`, plus Alles op adem uit `HOOFDSTUKKEN.stofwisseling` voor de verbranding bij E03), `TABEL`, `GRAF` (afbeelding 1 van de pantoffeldiertjes, nagetekend als SVG met de waarden van `eigen/figuren/cellen/maak.py`, D-1), `UBUIS` en `PANT` (waarom-animaties).
- Bouwen: `python3 tools/toets-bron/cellen/bouw.py` (geraamte uit `tools/examen-havo-2026-2.html`). Testen: `test.py` en `speel.py` (schermafdrukken in `/tmp/toets-cellen-shots`, via file://, geen poort nodig).

## Opbouw

| opgave | havo | vwo | film |
|---|---|---|---|
| 1 Van molecuul tot biosfeer | KA02 (3p) | KA02 (3p) | Van molecuul tot biosfeer |
| 2 Celorganellen | KB09 | KB09, KB10 | Celorganellen |
| 3 Kolibries: vliegen op volle kracht | E01–E03 | E01–E04 | Celorganellen |
| 4 Schimmels, bacteriën en virussen | KC01 | KC01 | Wat groeit er op je boterham? |
| 5 Diffusie en osmose | KD06, KD07 | KD06 | Diffusie en osmose |
| 6 Pantoffeldiertjes in de sloot | D01–D03 | D01–D03 | Diffusie en osmose |
| 7 Stamcellen | KE07 | KE02 | Stamcellen |
| 8 Een nieuw hoornvlies uit je andere oog | F01–F04 | F01–F03, F05 | Stamcellen, Onderzoek doen |
| 9 Onderzoek doen | KF01 | KF01 | Onderzoek doen |

## Opmaakkeuzes (geen inhoudelijke wijzigingen)

- KA02 ('noem het niveau', 3p): keuzelijst per beschrijving, score 6 goed 3p, 5 goed 2p, 4 goed 1p (zoals het correctievoorschrift).
- D03 (rekenen): twee invulvakken (aantal samentrekkingen, tijd in minuten), elk 1p; tijd goed van 4 tot 4,3 minuten ('ruim 4 minuten' ook goed). Doorrekenregel (controleur 20 nov 2026): wie in stap 1 een fout aantal samentrekkingen heeft maar dat goed door 12 deelt (binnen 2% + 0,05 min), krijgt voor stap 2 toch 1 punt.
- Alle andere vragen open, zelf nakijken met één vinkje per scoringselement uit het correctievoorschrift.
- Kennisopgaven zonder context hebben als inleiding 'Bij deze opgave hoort geen inleiding'.

Status: concept, wacht op Kamiels oordeel.
