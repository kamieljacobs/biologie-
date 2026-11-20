# Oefentoets Afweer (havo en vwo) · bron

Gemaakt 20 nov 2026 (Kamiel: "de oefentoetsen mogen op de site"), in dezelfde opzet als de Oefentoets Voortplanting (`tools/toets-bron/voortplanting/`) en de oefenexamens (hulpvragen 'niet uit de toets' → toetsvraag → nakijken → 'laat zien waarom'), volgens `tools/OEFENEXAMEN_PROMPT.md`.

- Uitvoer: `tools/toets-afweer-havo.html` (8 opgaven, 18 vragen, 35 punten) en `tools/toets-afweer-vwo.html` (7 opgaven, 19 vragen, 37 punten). localStorage `toets-afweer-havo` / `-vwo`, uitleg-sleutel (`TOOL`) `afweer-havo` / `afweer-vwo`. Terug-link naar `index.html#afweer`.
- Inhoud = de Word-oefentoetsen `toetsen/2026-2027/5havo/5havo_afweer_oefentoets.docx` en `6vwo/6vwo_afweer_oefentoets.docx` in `kamieljacobs/toetsen-biologie` (matrijs: `…_afweer_oefentoets_matrijs.md`; vragen, sleutels, punten en correctievoorschrift uit `eigen/afweer.json`, status concept). Zelfde vragen, volgorde, contexten, vraagteksten, tabelnummers en punten. De echte toets (`…_afweer_toets.docx`, contexten G, H, I, J en de KA–KD-vragen) is niet gebruikt.
- Bron: `frag/*.js`, één bron voor beide niveaus (`VWO` true/false). Per vraag `vraag(punten, onderwerp, build, stof)`, per opgave `opgave(kort, titel, html, ids)`; 'Uitleg van de stof' is het vierde argument (via `EXSTOF.zet`). Hulpjes in `00-basis.js`: `F` (films, hrefs als in `HOOFDSTUKKEN.afweer.films`), `TABEL`, `KALF` (afbeelding 1 als SVG, zelfde krommen als `eigen/figuren/afweer/maak.py`; met `split:true` ook de twee delen, alleen in 'Laat zien waarom'), `PUTJE` (bloedgroepbepaling/kruisproef), `FAGO` (fagocytose in vijf stappen), `RONDES` (virusrondes), en drie eigen antwoordvormen: `volgordeAnswer` (ordenvraag: 2 p helemaal goed, 1 p bij precies één verwisseling van twee buren), `rekenAnswer` (getallen met spatie of punt als duizendtal) en `bloedgroepAnswer` (bloedgroep + resus automatisch, uitleg zelf afvinken).
- Bouwen: `python3 tools/toets-bron/afweer/bouw.py` (geraamte uit `tools/examen-havo-2026-2.html`, vier hulpstanden, toetsteksten, geen examenklok; cijfer = 9 × score / maximum + 1).
- Testen: `test.py` (alle vragen open, punten, telefoonbreedte 375 px) en `speel.py` (elke vraag beantwoorden, nakijken, waarom-animaties doorklikken); schermafdrukken in `/tmp/toets-afweer-shots`.

## Inhoud

| opgave | havo | vwo | films |
|---|---|---|---|
| 1 De eerste verdediging (geen inleiding) | NA21, NA22 (ordenen) | idem | 1 |
| 2 Koorts bij een hagedis (tabel 1) | C01, C02, C03 | C01, C02, C04 | 1 |
| 3 Antistoffen op maat (geen inleiding) | NB26, NB29 (mc) | + NB41 | 2 (vwo ook 3) |
| 4 Muizen zonder thymus (tabel 2) | D01, D03 (reken), D04 | + D05 | 3, 2, 1 |
| 5 Bacteriën, virussen en T-cellen | NC30 | (niet in de vwo-oefentoets) | 3 |
| 6 Biest voor het kalf (afbeelding 1) | A01, A02, A03 | A01, A02, A04 | 4, 2 |
| 7 Vaccins en allergie | ND37 | idem | 4 |
| 8 Twee tests voor een bloedtransfusie (tabel 3) | K01, K02, K03 | K01, K03, K04 | 4 |
| **totaal** | **18 vragen, 35 p** | **19 vragen, 37 p** | |

De vraagnummers in de tool lopen door zoals in de Word-toets (vwo: opgave 6–8 heten in de tool opgave 5–7, omdat opgave 5 alleen havo is).

## Keuzes

- Opgaven zonder inleiding (De eerste verdediging, Antistoffen op maat, Bacteriën en virussen, Vaccins en allergie): het papiervak toont 'Bij deze vragen hoort geen inleiding.'
- 'Uitleg van de stof' geeft algemene theorie zonder de toepassing (L05): bij fagocytose alleen de onderdelen, niet de volgorde; bij koorts de thermostaat zonder huidvaatjes/rillen; bij de muizen geen 'T-cellen rijpen in de thymus' en geen T-killercellen; bij NC30 resistentie in plaats van de bouw van bacterie en virus; bij biest alleen de definities actief/passief/natuurlijk/kunstmatig; de opsplitsing van afbeelding 1 pas na het nakijken.
- Namen: 'Sara' staat alleen in de vraagtekst (ND37), niet in een figuur.

Status: concept, wacht op Kamiels oordeel.
