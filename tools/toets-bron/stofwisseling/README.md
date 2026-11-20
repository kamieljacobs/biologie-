# Oefentoets Stofwisseling (havo en vwo) · bron

Gemaakt 20 nov 2026 op verzoek van Kamiel ("de oefentoetsen mogen op de site"), in dezelfde opzet als de Oefentoets Voortplanting (`tools/toets-bron/voortplanting/`): hulpvragen 'niet uit de toets' → toetsvraag (wit papiervak) → nakijken → 'laat zien waarom', met de vier hulpstanden.

- Uitvoer: `tools/toets-stofwisseling-havo.html` en `tools/toets-stofwisseling-vwo.html`, elk 6 opgaven, 21 vragen, 36 punten. localStorage `toets-stofwisseling-havo` / `-vwo`, uitleg-sleutel (`TOOL`) `sw-havo` / `sw-vwo`. Terug-link naar `index.html#stofwisseling`.
- Bron: `frag/*.js`, één bron voor beide niveaus (`VWO` true/false). Per vraag `vraag(punten, onderwerp, build, stof)`, per opgave `opgave(kort, titel, html, ids)` (lege html = kennisblok zonder inleiding). Hulpjes in `00-basis.js`: `F` (films, hrefs als in `HOOFDSTUKKEN.stofwisseling.films`), `TABEL`, `rekenOpen` (a = rekenen, door de tool nagekeken, 1 p; b = uitleg, zelf afvinken, 1 p), `KROMME` (reactiesnelheid tegen substraat, model), `CENTRA` (actieve centra bezet/vrij). Eigen figuren per fragment: `KETEN` (terugkoppeling, vwo), `STAAF` (tabel 2), `MITO` (mitochondrium, vwo), `NADKRING` (NAD⁺, vwo), `BALANS` (assimilatie/dissimilatie), `SPECTRUM` (absorptiespectrum, vwo; vereenvoudigd, geen meetgegevens).
- Bouwen: `python3 tools/toets-bron/stofwisseling/bouw.py` (zelfde bouw.py als voortplanting, op het geraamte van `tools/examen-havo-2026-2.html`; cijfer = 9 × score / maximum + 1).
- Testen: `test.py` (alle vragen open, punten, telefoonbreedte 375 px) en `speel.py` (elke vraag beantwoorden, nakijken, waarom-animaties doorklikken; vult ook de rekenvakjes); schermafdrukken in `/tmp/toets-stofwisseling-shots`.

## Inhoud = de Word-oefentoets

Zelfde vragen, volgorde, contexten, vraagteksten en punten als `toetsen/2026-2027/5havo/5havo_stofwisseling_oefentoets.docx` en `6vwo/6vwo_stofwisseling_oefentoets.docx` in `kamieljacobs/toetsen-biologie` (matrijs: `*_stofwisseling_oefentoets_matrijs.md`); sleutels, scoringselementen en valkuilen uit `eigen/stofwisseling.json`. Geen vragen uit de echte toets.

| nr | opgave | havo | vwo | p | film |
|---|---|---|---|---|---|
| 1–3 | Eiwitten en enzymen (kennis) | K03, K08, K09 | K03, K08, K12 | 1+2+2 | 1 Alles versneld |
| 4–7 | Ananas in de pudding | A01, A02, A03, A04 | A01, A02, A03, A05 | 1+2+2+2 | 1 |
| 8–10 | Energie uit glucose (kennis) | L04, L10, L01 | L04, L10, L07 | 1+2+2 | 2 Alles op adem |
| 11–14 | Alcohol onder het ijs | B01, B02, B03, B04 | B01, B02, B03, B05 | 1+2+2+2 | 2 |
| 15–17 | Fotosynthese en de plant (kennis) | M01, M11, M02 | idem | 1+2+2 | 3 Alles in het groen |
| 18–21 | Geel gras onder het zwembad | C01, C02, C03, C04 | C01, C02, C03, C05 | 1+2+2+2 | 3 |

Alleen opmaak aangepast: de tabelnummers volgen de Word-toets (tabel 1–3); bij vraag 13 en 20 kijkt de tool deel a (rekenen) zelf na, deel b vink je af; bij vraag 17 zijn de twee punten 'eerste kenmerk met uitleg' en 'tweede, ander kenmerk met uitleg'.

Havo-tekst zonder vwo-begrippen (NAD⁺, allosterische zijde, V-max, citroenzuurcyclus: alleen in de vwo-vragen). In het waarom van vraag 8 noemt havo 'hulpmolecuul' zonder 'NAD⁺'.

## Controle (20 nov 2026)

Eén frisse controleur; verwerkt: hulpvragen van vraag 6, 12, havo 10 en 20 minder sturend; label en schaal van het absorptiespectrum (vwo 21); vraag 5: tweede hulpvraag gaat nu over 'kan een enzym doodgaan?' in plaats van 'het verliest zijn ruimtelijke vorm' (samen met de stofuitleg over denatureren gaf dat bijna het eerste scoringspunt); vraag 12: uit 'Uitleg van de stof' de zin over ophopen van stoffen in de cel geschrapt (kern van het antwoord). `test.py` en `speel.py`: geen fouten.

Status: concept, wacht op Kamiels oordeel.
