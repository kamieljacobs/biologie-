# Oefentoets Ecologie en milieu (havo en vwo) · bron

Gemaakt 20 nov 2026 (Kamiel: "de oefentoetsen mogen op de site"), in dezelfde opzet als de Oefentoets Voortplanting (`tools/toets-bron/voortplanting/`): hulpvragen 'niet uit de toets' → toetsvraag (wit papiervak) → nakijken → 'laat zien waarom', met 'Uitleg van de stof' per vraag en de vier hulpstanden.

- Uitvoer: `tools/toets-ecologie-havo.html` (9 opgaven, 18 vragen, 35 punten) en `tools/toets-ecologie-vwo.html` (8 opgaven, 19 vragen, 37 punten). localStorage `toets-ecologie-havo` / `-vwo`, uitleg-sleutel (`TOOL`) `eco-havo` / `eco-vwo`. Terug-link naar `index.html#ecologie`.
- Inhoud = de Word-oefentoets: `toetsen/2026-2027/4havo/4havo_ecologie_oefentoets_matrijs.md` en `4vwo/4vwo_ecologie_oefentoets_matrijs.md` in `kamieljacobs/toetsen-biologie`; tekst, sleutels, punten en antwoordmodel uit `eigen/ecologie.json` en `eigen/milieu.json`. Zelfde opgaven, volgorde, contexten, vraagteksten en punten; tabellen genummerd zoals in de Word-toets (tabel 1–3; in `milieu.json` heet de dijktabel 'tabel 7'). Geen vragen uit de echte toets.
- Bron: `frag/*.js`, één bron voor beide niveaus (`VWO` true/false). Per vraag `vraag(punten, onderwerp, build, stof)`, per opgave `opgave(kort, titel, html, ids)`; opgaven zonder inleiding (alleen een kopje, zoals in de Word-toets) krijgen `html = ""` en dan geen wit inleidingsvak (`#ctx:empty`). Hulpjes in `00-basis.js`: `F` (films, hrefs uit `HOOFDSTUKKEN.ecologie.films` en `HOOFDSTUKKEN.milieu.films`), `TABEL`, `SVG`, `T` en `rekenOpen` (rekenvraag: de tool kijkt de uitkomst na = 1 scorepunt, de berekening of uitleg vink je zelf aan, zoals in het antwoordmodel; invoer mag 0,6 / 9.000).
- Figuren: alleen tabellen in de toetstekst (geen figuren in `eigen/figuren/ecologie`). Eigen SVG-schetsen (css-variabelen, licht en donker) in 'laat zien waarom': vangen-terugvangen (1), groeicurve uit tabel 1 (4), leeftijdspiramides (vwo 5), optimumkrommen (havo 6), golven muizen/torenvalken (7), denitrificatie (havo 10 / vwo 11), BPP/NPP-balk, CO₂ onder de stolp.
- Bouwen: `python3 tools/toets-bron/ecologie/bouw.py`. Testen: `test.py` (alle vragen open, punten, 375 px) en `speel.py` (elke vraag beantwoorden, nakijken, animaties doorklikken); schermafdrukken in `/tmp/toets-ecologie-shots`.

## Inhoud

| opgave | havo | vwo | films |
|---|---|---|---|
| 1 Kamsalamanders in een nieuwe poel | A01–A04 (4 vragen, 7p) | + A05 leeftijdsopbouw (5 vragen, 9p) | Hoeveel passen er?, Wie eet wie? |
| 2 Waar een soort leeft | KB02, KB05 (4p) | KB02, KB09 acclimatisatie/fotoperiodiciteit (4p) | Waar past een soort? |
| 3 Eten en samenleven | KI03 (2p) | idem | Wie eet wie? |
| 4 Veenweiden: het water omhoog | B01–B03 (7p) | + B04 positieve terugkoppeling (9p) | Waar blijft het blad?, Koolstof gaat rond, Stikstof gaat rond |
| 5 Energie | KE01 (2p) | idem | Waarom zo weinig roofdieren? |
| 6 Koolstof | KF03 (2p) | idem | Koolstof gaat rond |
| 7 Van zand tot bos | KH01 (2p) | idem | Van zand tot bos |
| 8 Te veel, en het blijft (alleen havo) | KN05 ADI (2p) | — | Eén aarde |
| 9 (vwo 8) Een bloemrijke dijk | I01–I04 (7p) | idem | Ingrijpen of laten gaan?, Binnen de grenzen |

## Controle (20 nov 2026)

- Punten per vraag gelijk aan de matrijs (havo 35, vwo 37); vinkjes = scoringselementen uit het antwoordmodel, valkuilen/ondergrenzen uit `antwoord` en `toelichting`.
- 'Uitleg van de stof' is algemene theorie met de woorden van de films; zinnen die een antwoordelement gaven, zijn eruit (o.a. geen definitie van indicatorsoort/beperkende factor, geen 'warm water lost minder zuurstof op', geen denitrificatie bij de stikstofuitleg, geen 'bestuiving = regelen', geen 'rover piekt na prooi', geen NPP-definitie). Rekenvoorbeelden in de stof zijn die van de films (bevers 40/30/12, Daan en de appels), met andere getallen dan de toets.
- Havo ziet geen vwo-begrippen (acclimatisatie, fotoperiodiciteit, leeftijdsopbouw en positieve terugkoppeling van het veen zitten alleen in vwo-vragen).
- `test.py` en `speel.py`: geen fouten; 375 px zonder horizontaal scrollen van de pagina (tabel 3 en de grafieken scrollen binnen hun vak).

## Controle door een frisse controleur (20 nov 2026), verwerkt

- Door de controleur hersteld: uitleg groeivorm, hulpvraag torenvalken, vraag wilde bijen, 'nitraat in de bodem', labels van de schetsen.
- Bestuivers (opgave dijk, vraag 3): 'hommels en wilde bijen vliegen ook bij koud weer' klopt niet voor alle wilde bijen en zweefvliegen. Nu: 'vooral hommels (en sommige andere wilde bijen)', in de tool én in `eigen/milieu.json` (I03, antwoord) in de toetsenrepo; `scripts/eigen_vragen.py` gedraaid en de Word-oefentoetsen havo en vwo (toets + correctie) opnieuw gebouwd met `eigen/bouw/ecologie/bouw_word.sh` (alleen de oefentoetsregels).
- Schetsen: de groeikromme (vraag 4) is nu een vloeiende lijn door de meetpunten van tabel 1 (in 2024 bij 180, niet boven de draagkracht); de tolerantiekrommen voor zuurstof (havo vraag 6) stijgen boven de minimumgrens en blijven daarna vlak, want veel zuurstof is in een beek geen probleem.
- `test.py` en `speel.py` opnieuw: geen fouten.

Status: concept, wacht op Kamiels oordeel.
