# Oefentoets Evolutie (havo en vwo) · bron

Gemaakt op 20 nov 2026 op verzoek van Kamiel ('de oefentoetsen mogen op de site'), in dezelfde opzet als de Oefentoets Voortplanting (`tools/toets-bron/voortplanting/`). Inhoud = de Word-oefentoetsen uit `kamieljacobs/toetsen-biologie`:
`toetsen/2026-2027/4havo/4havo_evolutie_oefentoets*` en `4vwo/4vwo_evolutie_oefentoets*` (vragen `EI-evolutie-…` uit `eigen/evolutie.json`). Zelfde opgaven, volgorde, contexten, vraagteksten en punten; geen vragen uit de echte toets.

- Uitvoer: `tools/toets-evolutie-havo.html` (8 opgaven, 19 vragen, 36 punten) en `tools/toets-evolutie-vwo.html` (10 opgaven, 20 vragen, 38 punten). localStorage `toets-evolutie-havo` / `-vwo`, uitleg-sleutel (`TOOL`) `evo-havo` / `evo-vwo`. Terug-link naar `index.html#evolutie`.
- Bron: `frag/*.js`, één bron voor beide niveaus (`VWO`). `vraag(punten, onderwerp, build, stof)`, `opgave(kort, titel, html, ids)`; een opgave zonder inleiding (kennisvragen onder een kopje) krijgt `html = ""`, het inleidingsvak verdwijnt dan.
- Hulpjes in `00-basis.js`: `F` (films), `TERUG` (stofblok dat alleen naar het hoofdstuk van de film verwijst), `combi` (rekenvraag: getallen en keuzelijst kijkt de tool na, uitleg vink je zelf af; elk deel 1 punt), figuren als SVG: `VLEUGEL` (afbeelding 1, zelfde krommen als `eigen/figuren/evolutie/maak.py` a1), `VINKEN` (afbeelding 2, b1) en `PLANTEN` (afbeelding 3, `maak_extra.py` J-1), beide cladogrammen via `CLAD` (opties `hl`, `dots`, `streep`, `kruis`, `vet` voor de waarom-animaties).
- Bouwen: `python3 tools/toets-bron/evolutie/bouw.py` (geraamte uit `tools/examen-havo-2026-2.html`, vier hulpstanden). Testen: `test.py` en `speel.py`, schermafdrukken in `/tmp/toets-evo-shots`.

## Opgaven

| opgave | havo | vwo | vragen (ID) |
|---|---|---|---|
| 1 Variatie en evolutie | 1–2 | 1–2 | P03, P06 |
| 2 Natuurlijke selectie | 3 | 3 | N04 |
| 3 Zwaluwen ontwijken het verkeer | 4–7 | 4–7 | A01, A02, A05, A06 |
| 4 De mens als selectiefactor | 8 | 8 | M04 |
| 5 Een nieuwe vinkenlijn op Daphne Major | 9–13 | 9–11 | B01–B03, havo ook B04, B05 |
| 6 De witte beer van het regenwoud | – | 12–13 | C01, C02 |
| 7 Toeval en uitwisseling | – | 14 | D07 |
| 8 Hoe één soort er twee wordt | 14 | 15 | O03 |
| 9 Hoe weten we dat? | 15 | 16 | E03 |
| 10 Cactus of wolfsmelk? | 16–19 | 17–20 | J01–J04 |

## Keuzes

- 'Uitleg van de stof': bij vragen die theorie toepassen een kort blok theorie (genenpool, natuurlijke selectie, antibiotica zonder plasmiden, cladogram lezen, soort/isolatie, drift en genenstroom, Hardy-Weinberg, kenmerken op takken, moleculaire klok). Bij kennisvragen waarbij de theorie zelf het antwoord is (P03, N04, A02, B04, D07, O03, E03, J02) alleen een verwijzing naar het hoofdstuk van de film (`TERUG`), zodat het antwoord niet wordt weggegeven (LESSEN L05).
- Nakijken volgt het correctievoorschrift: mc, juist/onjuist (3 uitspraken: 3 goed 2p, 2 goed 1p; 5 uitspraken: alles goed 2p, één fout 1p), N04 met keuzelijsten (5→3, 4→2, 3→1), rekenvragen via `combi` (P06 0,40; C01 0,449 en 0,884 → 51%; C02 11,6% en 'meer'; J03 42 miljoen jaar), open vragen met de scoringselementen.
- Animaties bij 'Laat zien waarom': vleugellengte (A01), plasmide (M04), cladogram vinken (B01, B05), 1000 beren (C01), streepje op de tak (J01) en DNA naast het cladogram (J03).

Status: concept, wacht op Kamiels oordeel.

## Controle (20 nov 2026)

Eén frisse controleur heeft beide tools nagekeken. Verwerkt: bij C02 een extra vinkje voor de goedgekeurde andere aanpak (q = √0,17 = 0,41 > 0,34, beide punten); breuken worden goed gerekend bij C01/C02; hoofdstuktitel bij O03 gecorrigeerd. Daarna ook: de invulvakjes van C01 heten neutraal ‘tussenuitkomst 1/2’ en ‘uitkomst’ (de volgorde van de tussenuitkomsten maakt niet uit), zodat de aanpak niet vastligt; A05 en J04 kregen algemene theorie in ‘Uitleg van de stof’ (fokker; vleermuis, vlinder en vogel) in plaats van alleen een verwijzing; het stofblok bij B02 heet nu ‘Genenstroom en reproductieve isolatie’ en geeft geen soortdefinitie meer (die beantwoordde uitspraak 3 van B04); vwo-fragmenten (`/*@@ALLEEN-VWO@@*/` bovenaan, opgave 6 en 7) komen niet meer in het havo-bestand. `test.py` en `speel.py`: geen fouten.
