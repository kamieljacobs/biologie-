# Oefentoets DNA (havo en vwo) · bron

Gemaakt 20 nov 2026 ('de oefentoetsen mogen op de site'), in dezelfde opzet als de Oefentoets Voortplanting (`tools/toets-bron/voortplanting/`): hulpvragen 'niet uit de toets' → toetsvraag (wit papiervak) → nakijken → 'Laat zien waarom', per vraag 'Uitleg van de stof' met links naar de films.

- Uitvoer: `tools/toets-dna-havo.html` (= Word-oefentoets 5 havo, `5havo_dna_oefentoets`: 9 opgaven, 25 vragen, 35 punten) en `tools/toets-dna-vwo.html` (= Word-oefentoets 6 vwo, `6vwo_dna_oefentoets`: 7 opgaven, 20 vragen, 37 punten). localStorage `toets-dna-havo` / `-vwo`, uitleg-sleutel (`TOOL`) `dna-havo` / `dna-vwo`. Terug-link naar `index.html#dna`. Cijfer = 9 × score / maximum + 1.
- Bron: `frag/*.js`, één bron voor beide niveaus (`VWO` true/false). Per vraag `vraag(punten, onderwerp, build, stof)`, per opgave `opgave(kort, titel, html, ids)` (lege `html` = losse kennisvragen zonder inleiding, zoals in de Word-toets). Hulpjes in `00-basis.js`: `F` (films, hrefs als in `HOOFDSTUKKEN.dna.films`), `CODONTABEL()` (uitklapbare codontabel in het papiervak, met `vertaal`), `GEL()` (afbeelding 1 van 'Echte kaviaar?' als SVG, zelfde banen en lengtes als `eigen/figuren/dna/maak2.py` in toetsen-biologie, met `hl`/`mlijn` voor de waarom-animatie), `start`/`startLos` (derde argument = extra blok in het papiervak, bv. de codontabel).
- Bouwen: `python3 tools/toets-bron/dna/bouw.py` (geraamte uit `tools/examen-havo-2026-2.html` met de vier hulpstanden, zoals voortplanting).
- Testen: `test.py` (alle vragen open, punten, 375 px) en `speel.py` (elke vraag beantwoorden, nakijken, waarom-animaties); schermafdrukken in `/tmp/toets-dna-shots`.

## Herkomst (toetsen-biologie, status concept)

Vragen, volgorde, contexten, vraagteksten, punten en antwoordmodellen = de Word-oefentoetsen (`toetsen/2026-2027/5havo/5havo_dna_oefentoets_matrijs.md`, `6vwo/6vwo_dna_oefentoets_matrijs.md`), tekst uit `eigen/dna-kennistoets.json` (K…) en `eigen/dna.json` (E, F, G; inzichtversie 2). Geen vragen uit de echte toetsen (opgave A, versie 1 en 3, `echte_toets`).

| opgave | havo | vwo |
|---|---|---|
| De bouw van DNA | KA01, KA05 | KA09 |
| DNA kopiëren | KB01 | KB07, KB09 |
| Van gen naar eiwit | KC07, KC10, KC11 | KC15, KC16, KC17 |
| Mutaties en kanker | KD09, KD13 | KD07, KD11 |
| Katten proeven geen zoet | E01, E06, E03, E04 | E01, E06, E05, E04 |
| Genen aan en uit | KE02, KE07, KE14 | – |
| Een bloem met een slotje | F01, F02, F03 | F01, F02, F04 |
| Echte kaviaar? | G01, G02, G03, G04, G08, G09 | G01, G02, G10, G08, G07 |
| DNA onderzoeken en veranderen | KG07 | – |

Alleen opmaak aangepast: ordenen (KB01) en koppelen (KD13, KG07) met keuzelijsten (nakijken automatisch, punten volgens het correctievoorschrift); juist/onjuist (KE14) met knoppen; G04 vraagt de uitkomst in miljoenen (ook het volle getal mag); de codontabel staat uitklapbaar bij de vragen die erom vragen (op papier: BiNaS 71G). Open vragen kijkt de leerling zelf na met de scoringselementen en de valkuil uit het correctievoorschrift.

Animaties onder 'Laat zien waarom': mRNA in codons (KC07), deletie van één base (E01; havo zonder 'leesraam'), twee strengen antiparallel (KA09 vwo), semiconservatief (KB07 vwo), methylgroepen op de promotor (F01), de gel met markerlijnen (G02, G03 havo), groeirichting vanaf de primers (G07 vwo). Het voorbeeld-mRNA bij E01 is verzonnen.

Status: concept, wacht op Kamiels oordeel.

## Controle (20 nov 2026)

Eén frisse controleur heeft beide tools nagekeken en hersteld: 'exon' uit de havo-teksten, de puntentelling van de koppelvragen (KOPPELSCORE), uitlegteksten die te veel weggaven, en de bevestiging in de hulpvraag van G07. Daarna bij G08 (havo 23, vwo 19) de aanname 'neem aan dat een eitje haploïd is (vereenvoudigd)' in de vraagtekst, de hulpvraag en 'Laat zien waarom' gezet: echte kaviaar is vaak niet uitgerijpt en bevat ook DNA van moedercellen. `test.py` en `speel.py`: geen fouten.
