# Oefentoets Voortplanting (havo en vwo) · bron

Gemaakt 3 nov 2026 op verzoek van Kamiel, in dezelfde opzet als de Oefentoets Erfelijkheid (`tools/toets-bron/erfelijkheid/`) en de oefenexamens (hulpvragen 'niet uit de toets' → toetsvraag → nakijken → 'laat zien waarom'), volgens `tools/OEFENEXAMEN_PROMPT.md`.

- Uitvoer: `tools/toets-voortplanting-havo.html` (6 opgaven, 24 vragen, 43 punten) en `tools/toets-voortplanting-vwo.html` (6 opgaven, 26 vragen, 46 punten). localStorage `toets-voortplanting-havo` / `-vwo`, uitleg-sleutel (`TOOL`) `vp-havo` / `vp-vwo`. Terug-link naar `index.html#voortplanting`.
- Bron: `frag/*.js`, één bron voor beide niveaus (`VWO` true/false). Per vraag `vraag(punten, onderwerp, build, stof)`, per opgave `opgave(kort, titel, html, ids)`; 'Uitleg van de stof' is het vierde argument (via `EXSTOF.zet`). Hulpjes in `00-basis.js`: `F` (films, hrefs als in `HOOFDSTUKKEN.voortplanting.films`), `FV(...)` (laat film 3 weg in havo), `TABEL`, `CYCLUS` (cyclusgrafiek als SVG); `ROUTE` (route zaadcel, opgave 3) en `LAGEN` (sekse in lagen, opgave 4) staan in hun eigen fragment.
- Bouwen: `python3 tools/toets-bron/voortplanting/bouw.py`. Neemt bouwstenen en navigatie uit het nieuwste oefenexamen (`tools/examen-havo-2026-2.html`), mét de vier hulpstanden van `tools/examen-standen.js`; de standen krijgen toetsteksten ('toetsvraag', 'Echte toets') en de examenklok van 3 uur staat uit (`body.echt .klok{display:none}`). Cijfer = 9 × score / maximum + 1. Let op: `tools/toets-bron/erfelijkheid/bouw.py` draait niet meer op dit nieuwere geraamte (zoekt nog `>Examenstand<`); de Erfelijkheid-toets heeft nog de twee oude standen.
- Testen: `test.py` (alle vragen open, punten, telefoonbreedte 375 px) en `speel.py` (elke vraag beantwoorden, nakijken, waarom-animaties doorklikken); schermafdrukken in `/tmp/toets-vp-shots`.

## Inhoud

K = kennis (OBIT O/B), I = inzicht (OBIT T/I), in punten.

| opgave | havo | vwo | films |
|---|---|---|---|
| 1 Alleen maar moeders: de marmerkreeft | eigen vragen A1–A4: 4 vragen, 7p (K4 I3) | + triploïdie door een misgelopen meiose (non-disjunctie): 5 vragen, 9p (K4 I5) | 1 |
| 2 Zwanger worden met een app (cyclusgrafiek, rekenen, geel lichaam, pil) | eigen vragen B1–B5: 5 vragen, 9p (K5 I4) | idem, uitleg met terugkoppeling (film 3) | 2, 5 (vwo 3) |
| 3 havo: Een knip in de zaadleider (sterilisatie man) · vwo: Geen GnRH, het syndroom van Kallmann | nieuw: startsein, route zaadcel, sperma na sterilisatie, nog weken zaadcellen, testosteron: 5 vragen, 8p (K3 I5) | eigen vragen C1, C2, C4, C5 (C5 herschreven in filmtermen, C3 weggelaten; C1 nu 1 punt): 4 vragen, 7p (K2 I5) | havo 2, 5 · vwo 1, 2, 3 |
| 4 Een wangslijmvliestest voor de vrouwencategorie (SRY-test World Athletics; de inleiding noemt het gen niet bij naam, dat leidt de leerling af) | nieuw: lagen, androgeen-ongevoeligheid, Turner/Klinefelter/AGS, sekse/gender: 4 vragen, 7p (K5 I2) | + XX-man (SRY naar het X-chromosoom, cascade): 5 vragen, 9p (K5 I4) | 4 (vwo ook 3) |
| 5 Hoe betrouwbaar? Anticonceptie en soa's (Pearl-tabel) | nieuw: prikpil vs pil, schakels, HPV-prik voor jongens: 3 vragen, 6p (K2 I4) | prikpil vs pil, schakels, resistentie gonorroe: 3 vragen, 6p (K4 I2) | 5 (vwo ook 3) |
| 6 Louise Brown, het eerste ivf-kind | nieuw: chlamydia en dichte eileiders, FSH-injecties, alcohol en de placenta: 3 vragen, 6p (K2 I4) | nieuw: timing na de LH-piek, eigen LH-piek onderdrukken, zwangerschapstest na hCG, placenta (juist/onjuist): 4 vragen, 6p (K4 I2) | havo 2, 5 · vwo 3, 5 |
| **totaal** | **24 vragen, 43p: K21 I22** | **26 vragen, 46p: K24 I22** | |

Havo ziet film 3 niet: bevruchting, geel lichaam en placenta komen in havo alleen op het niveau van films 1, 2 en 5 en Biologie voor Jou havo thema 2 (geel lichaam als naam, placenta: bloed mengt niet, diffusie); geen Leydig/Sertoli, hCG, Wolff/Müller of terugkoppeling als begrip. 'Uitleg van de stof' linkt in havo nooit naar film 3 (`FV`).

## Herkomst van de vragen

- Uit `kamieljacobs/toetsen-biologie`, `eigen/voortplanting.json` (status concept): opgave A (A1–A4) → opgave 1, B (B1–B5) → opgave 2, C (C1, C2, C4, C5) → opgave 3 vwo. Aanpassingen: 'teelbal' → 'zaadbal' (filmterm), Leydigcellen genoemd in de context van C; C5 gebruikt geen 'primaire/secundaire spermatocyt' meer (niet in de films) maar 'na meiose I … 46 chromosomen'. De figuur B-1 is als SVG nagetekend (`CYCLUS`) met dezelfde krommen als `eigen/figuren/voortplanting/maak.py`.
- Nieuw: opgave 1 vwo-vraag 5, opgave 3 havo, opgave 4, 5 en 6. Contexten gecontroleerd tegen de CE's 2018–2026 (`grep` in `examens/*/*/vragen.md`): geen sterilisatie, Pearl-index, Louise Brown, SRY-test in de sport, Klinefelter, HPV, gonorroe of chlamydia. Wel verwant: havo 2024-I (syndroom van Swyer, SRY werkt niet; bewust niet gebruikt), havo 2024-I en vwo 2025-II (ivf terloops), placenta/hCG in meerdere examens (andere contexten).

## Bronnen van de gegevens (zelf geopend 3 nov 2026)

- Sterilisatie: folder 'Sterilisatie bij de man', Albert Schweitzer ziekenhuis (asz.nl): zaadleiders, hoeveelheid zaadvloeistof gelijk, zaadcellen worden opgenomen, controle na ≥ 3 maanden en ≥ 25 zaadlozingen.
- SRY-test: persbericht World Athletics 30 juli 2025 (wangslijmvlies of bloed, eenmalig, vanaf 1 sept 2025, 'reliable proxy'); A. Sinclair, Daily Maverick / The Conversation 25 aug 2025 (Atlanta 1996: 8 van 3387 positief, 7 met androgeen-ongevoeligheid; test zegt alleen of het gen aanwezig is).
- Pearl-tabel: Guttmacher Institute, factsheet 'Contraceptive effectiveness in the United States', naar Hatcher e.a., Contraceptive Technology, 21e druk (2018).
- HPV: RIVM-nieuwsbericht 'Ruim twee miljoen uitnodigingen HPV-vaccinatie in 2023' (jongens sinds 2022; kankers van mond/keel, penis, anus, vagina, vulva, baarmoederhals).
- Louise Brown: Encyclopaedia Britannica 'Louise Brown' (eileiders dicht, negen jaar, Oldham General Hospital); Elder & Johnson, 'The Oldham Notebooks III', Reprod BioMed Soc Online 2015 (natuurlijke cycli vanaf nov 1977, urine elke 3 uur op de LH-piek, laparoscopie 15–35 uur na het zien van de piek, één embryo).
- Kallmann, prevalentie (± 1 op 30.000 mannen, 1 op 120.000 vrouwen): MedlinePlus Genetics, Kallmann syndrome (geopend 3 nov 2026; de toetsrepo noemde 1 op 8000 / 1 op 40.000).
- Marmerkreeft en de rest van Kallmann: bronnen zoals vermeld in `eigen/voortplanting.json` (`bron_data`), daar geopend op 31 okt 2026; niet opnieuw gecontroleerd.
- De cyclusgrafiek is vereenvoudigd (geen meetgegevens); Nora, Bas en Sem zijn fictief.

Twijfelpunten voor de controleur: prikpil 'elke 12 weken' (algemene kennis, niet uit een geopende bron); de bewering in opgave 3 havo dat testosteron niet verandert na sterilisatie (biologisch juist, niet in de folder); 'embryo na ongeveer twee dagen teruggeplaatst' (Elder & Johnson, tabel 6; hun tabel 7 noemt een andere datum); XX-man: 'SRY gaat mee bij uitwisseling tussen X en Y' (zo in film 4; strikt is het een ongelijke recombinatie buiten het gewone uitwisselgebied).

## Controle (3 nov 2026)

Eén onafhankelijke controleur; verwerkt: 'Uitleg van de stof' teruggebracht tot algemene theorie (gaf in 'Stap voor stap' antwoorden weg), hulpvraag-bevestigingen neutraal, V26 uitspraak 1 eenduidig, H8 uitspraak 2 havo-passend ('veel oestrogeen remt de hypofyse'), H24 met de dunne laag cellen in de tekst, Kallmann-prevalentie, Turner-uitspraak, lagen 1–6 gelijk aan het schema, figuren op de telefoon scrollbaar met leesbare letters, doorrekenfout H6/V7 strenger, V11 1 punt, H15/V15 geen leesvraag meer.

**Beslissing voor Kamiel:** H7 (wie maakt progesteron: het geel lichaam) staat in de havo-toets, omdat geel lichaam en progesteron in de begrippenlijst van BvJ havo T02 staan, maar havo ziet film 3 niet. Daarom noemt de havo-inleiding van opgave 2 het geel lichaam als rest van de follikel na de eisprong; daardoor is H7 in havo bijna een leesvraag. Schrappen of laten staan?

Status: concept, wacht op Kamiels oordeel.
