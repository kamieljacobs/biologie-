# Oefentoets Erfelijkheid (havo en vwo) · bron

Opnieuw gebouwd 20 nov 2026 (Kamiel: 'de oefentoetsen mogen op de site'): de tool is nu precies de Word-oefentoets van de klas, op het nieuwe geraamte met de vier hulpstanden, in dezelfde opzet als `tools/toets-bron/voortplanting/` (hulpvragen 'niet uit de toets' → toetsvraag in het witte papiervak → nakijken → 'Laat zien waarom', per vraag of groep 'Uitleg van de stof'). De eerste versie (31 okt 2026: Siamese kat, cavia's, PKU/maïs, reukerwt; oud geraamte met twee standen) is vervangen; hij staat in de git-geschiedenis.

- Uitvoer: `tools/toets-erfelijkheid-havo.html` (9 opgaven, 19 vragen, 35 punten) en `tools/toets-erfelijkheid-vwo.html` (10 opgaven, 20 vragen, 36 punten). localStorage `toets-erfelijkheid-havo` / `-vwo`, uitleg-sleutel (`TOOL`) `erf-havo` / `erf-vwo`. Terug-link naar `index.html#erfelijkheid`. Cijfer = 9 × score / maximum + 1.
- Bron van de vragen: `kamieljacobs/toetsen-biologie`, `toetsen/2026-2027/4havo/4havo_erfelijkheid_oefentoets_matrijs.md` en `4vwo/4vwo_erfelijkheid_oefentoets_matrijs.md` (ID's `EI-erfelijkheid-…`), tekst, sleutels en correctievoorschrift uit `eigen/erfelijkheid.json` en de Word-bestanden `<klas>_erfelijkheid_oefentoets(_correctie).docx`. Zelfde opgaven, volgorde, contexten, vraagteksten en punten. Wijzig je hier een vraag of getal, zet het dan ook terug in de toetsenrepo (die is de bron).
- Bron van de tool: `frag/*.js`, één bron voor beide niveaus (`VWO` true/false). Per vraag `vraag(punten, onderwerp, build, stof)`, per opgave `opgave(kort, titel, html, ids)` (lege `html` = 'geen inleiding'). Hulpjes in `00-basis.js`: `F` (films, hrefs als in `HOOFDSTUKKEN.erfelijkheid.films`), `PUN` (kruisingsschema), `STAM` (stamboom), `FIG` (figuur die op de telefoon horizontaal scrollt), `CHROM` (chromosoom met allelen), `KANS`/`BIJNA`/`kansAnswer` (invulvelden voor kansen: 1/64, 1 op 64, 1,6% of 0,0156; elk veld 1 punt). Eigen tekeningen per fragment: `KONIJN` (opgave 2), `HIST` (polygeen), `MEIOSE` (twee chromosoomparen), `STAMB` (stamboom choroideremie, zelfde posities als `eigen/figuren/erfelijkheid/B-1.png`).
- Hergebruikt uit de eerste versie: `PUN`, `STAM` en de stamboom van choroideremie, de vragen B06 en B07 met hun hulpvragen (B06: eerste hulpvraag herschreven, gaf uitspraak 3 weg), de kansketen-animatie (nu bij B11), de stof en het nakijken van Palomino (A03), de Manx-animatie (letaal schema) en de stof over intermediair en stambomen.
- Bouwen: `python3 tools/toets-bron/erfelijkheid/bouw.py` (geraamte uit `tools/examen-havo-2026-2.html`, zoals voortplanting; de kop toont 'vraag N' bij een opgave met één vraag).
- Testen: `test.py` (alle vragen open, punten, telefoonbreedte 375 px) en `speel.py` (elke vraag beantwoorden, nakijken, waarom-animaties doorklikken); ze starten zelf een server op poort 8137 (site-root), schermafdrukken in `/tmp/toets-erfelijkheid-shots`. Stand 20 nov 2026: geen fouten, havo 35 p, vwo 36 p, geen horizontaal scrollen op 375 px.

## Inhoud

| opgave | havo | vwo | films |
|---|---|---|---|
| 1 Chromosomen, genen en allelen | KA01, KA04, KA06 (6p) | KA01, KA06 (4p) | 1 |
| 2 Een himalayakonijn in de kou | J02 (2p) | idem | 1, 3 |
| 3 Een hoornloze stier | D01, D04, D05 (5p) | idem | 2, 6 |
| 4 Bloedgroepen | W01, W02 (3p) | W01 (2p) | 3 |
| 5 Katten zonder staart | E03 (2p) | idem | 3 |
| 6 Palomino en cremello | A03 (2p) | idem | 2, 3 |
| 7 Voorbij dominant en recessief | KC05 (2p) | idem | 3 |
| 8 Een tomaat voor op het balkon | U01, U02, U04 (5p) | U01, U06, U03, U04, U05 (8p) | 4 |
| 9 Choroideremie | B06, B07, B11, B12 (8p) | idem | 5, 6 |
| 10 Mitochondriën | – | X01 (1p) | 5 |

Nakijken: meerkeuze, juist/onjuist (B06: 3 goed 2p, 2 goed 1p), keuzelijsten (KA04: 5 goed 2p, 4 goed 1p) en kansen (D04: twee velden, 1/2 en 1/64) door de tool; open vragen zelf afvinken met de scoringselementen en de valkuil uit het correctievoorschrift. Waar het correctievoorschrift geen valkuil noemt, staat een veelgemaakte fout als valkuil (zonder extra puntenregel).

## Afwijkingen van de Word-oefentoets (alleen opmaak)

- KA04 (havo 2): de vijf begrippen kies je uit een keuzelijst (genotype, fenotype, homozygoot, heterozygoot, gen, allel, locus, dominant, recessief) in plaats van ze op te schrijven, zodat de tool kan nakijken.
- D04 (havo 6 / vwo 5): het antwoord in twee invulvelden (kans per kalf, kans op zes), die samen de twee scoringselementen zijn.
- Opgave 1, 4, 7 en 10 hebben in de Word-toets geen inleiding; het papiervak zegt dan 'Deze opgave heeft geen inleiding'.
- W02 (havo 9, 'multipele allelen') heeft geen 'Uitleg van de stof': elke uitleg zou de definitie geven. De stof bij W01 noemt het begrip daarom ook niet.
- 'Uitleg van de stof' bij KA01/KA04 geeft geen definities van gen, allel, genotype enz. (dat vragen die vragen), alleen 'van huid naar DNA'.

## Controle (20 nov 2026)

Eén frisse controleur: rekenwerk, sleutels en puntentellingen kloppen. Verwerkt: hulpvragen bij KA04 en U05 herschreven (controleur); hulp bij U02 en U04 noemde 'vier soorten gameten, elk een kwart' en gaf zo het antwoord van U01 weg, nu via één gen tegelijk (U02) en de vergelijking met de tomaat (U04); KA04 onderdeel 1 'Aa' werd 'de combinatie van allelen Aa' ('heterozygoot' was ook te verdedigen), ook in `eigen/erfelijkheid.json` en de Word-oefentoetsen van de toetsenrepo.

Status: concept, wacht op Kamiels oordeel.
