# Review script v1 — lt2 Van buisje tot uitslag (24 okt 2026)

Eigen review (maker), met bronnencheck per bewering, stelligheidscheck en vraagregels. Rekenwerk: `reken/bereken.py` → `reken/uitvoer.txt`.

## 1. Beweringen en bronnen
| # | Bewering in v1 | Oordeel | Bron |
|---|---|---|---|
| 1 | 'ongeveer de helft tot twee derde' van de labfouten ontstaat vóór het meten | klopt (46–68,2 % pre-analytisch; post-analytisch 18,5–47 %; analytisch het kleinst) | Plebani M. 2006, *Errors in clinical laboratories or errors in laboratory medicine?*, Clin Chem Lab Med 44:750–759 (abstract) |
| 2 | buisje zonder naam wordt afgekeurd; naam/geboortedatum controleren (twee identificatiegegevens) | klopt als gangbare acceptatieregel; stelligheid 'keurt af' houden, maar als 'het lab' (geen 'altijd') | Joint Commission NPSG.01.01.01 (two patient identifiers, labelen bij de patiënt); ISO 15189 (monsteracceptatie) |
| 3 | tijd en temperatuur van transport tellen mee | klopt (swabs in transportmedium 2–8 °C tot 72 uur, anders invriezen) | CDC Interim Guidelines for Collecting and Handling of Clinical Specimens for COVID-19 Testing |
| 4 | 10 µl is een druppeltje van nog geen 3 mm | klopt: bol van 10 mm³ heeft d = 2,67 mm | `reken/bereken.py` |
| 5 | 10 µl in 90 µl = 1 op 10; vier stappen = 10 000× | klopt | `reken/bereken.py` |
| 6 | fout in stap 1 werkt door maar groeit niet; alleen bij elke stap een fout stapelt op | klopt (vermenigvuldiging relatieve factoren) | `reken/bereken.py` |
| 7 | 2 % van 10 µl = 0,2 µl, meer mag een pipet 'van dit formaat' volgens de norm niet afwijken | klopt voor de systematische fout van een 2–20 µl-pipet bij 10 µl (ISO 8655: ± 0,2 µl = ± 2 %; toevallige fout ≤ 1 %). Bij een 20–200 µl-pipet mag het bij 20 µl ± 8 % zijn. v2: 'een goede pipet voor zulke kleine volumes' | Gilson Pipette Specs Chart LT380069-12 (tabel met ISO 8655-grenzen); Mettler-Toledo/Rainin ISO 8655 MPE |
| 8 | pipet wordt gecontroleerd door gepipetteerd water te wegen | klopt (gravimetrische methode, ISO 8655-6) | Radwag, *Gravimetric determination of pipette errors* |
| 9 | 'grote systemen leveren ruim honderd uitslagen per uur' | klopt voor de grootste (cobas 8800: tot 1056 tests per 8 uur ≈ 132 per uur; cobas 6800: 576 per 8 uur ≈ 72 per uur). v2: 'de grootste robots' | Roche, productpagina's cobas 6800 en cobas 8800 |
| 10 | robot haalt eerst het RNA uit de monsters (extractie), dan PCR-mengsel in een plaat met 96 putjes | klopt als algemeen beeld; geïntegreerde systemen gebruiken soms eigen buisjes i.p.v. een 96-wellsplaat; vereenvoudiging in het docentdeel | algemeen; Roche cobas (extractie + PCR geïntegreerd) |
| 11 | RNA eerst omgezet in DNA (reverse transcriptase) | klopt | algemeen (RT-PCR) |
| 12 | probe met kleurstof licht pas op als het polymerase hem openknipt | klopt voor hydrolyseprobes (TaqMan: reporter + quencher, 5'→3'-exonuclease van Taq). Andere chemie bestaat (SYBR Green, andere probes): v2 'In veel testen' | GoldBio, *All about probe-based qPCR* |
| 13 | Ct = aantal cycli tot het licht boven een drempel komt | klopt | NVMM, *Toelichting SARS-CoV-2 PCR Ct-waarden*, 28-10-2020; GoldBio |
| 14 | lage Ct = veel virus; geen signaal na 40–45 cycli = negatief | klopt | NVMM 2020 |
| 15 | Ct's van keel-neusswabs meestal 20–35 (Opa 25, ander monster 30) | realistisch | NVMM 2020 |
| 16 | elke cyclus verdubbelt ongeveer; 3,3 cycli = 10×; 5 cycli = ruim 30× | klopt (log₂10 = 3,32; 2⁵ = 32); bij efficiëntie < 100 % iets minder, daarom 'ongeveer' | Qiagen FAQ 2694 (helling −3,32 = 100 % efficiëntie); `reken/bereken.py` |
| 17 | ijklijn: standaarden 10⁶…10² kopieën liggen op een rechte lijn, 3,3 Ct per factor 10; Ct 25 ≈ 4000 kopieën per putje | klopt binnen het verzonnen voorbeeld (3906) | `reken/bereken.py` |
| 18 | Ct alleen vergelijkbaar binnen dezelfde test; ander lab 'een paar cycli' anders | klopt (NVMM: tot 6 Ct verschil tussen apparaten/tests en tussen labs) | NVMM 2020 |
| 19 | 'Voor een coronatest is positief of negatief meestal genoeg' | klopt (NVMM: Ct-waarde wordt in principe niet gerapporteerd/geïnterpreteerd als maat voor besmettelijkheid) | NVMM 2020 |
| 20 | negatieve controle = water, positieve = bekende hoeveelheid; interne controle bij veel testen een menselijk gen (RNase P); geen signaal = te weinig materiaal of remming | klopt; CDC-panel gebruikt RNase P; studie: 2,4 % van 10 311 monsters geremd. Bij een sterk positief monster kan de interne controle wegvallen door concurrentie: v2 'meestal' en docentdeel | CDC 2019-nCoV rRT-PCR panel (RNase P); *COVID-19 PCR: frequency of internal control inhibition in the clinical practice*, Access Microbiology 2023 |
| 21 | controlekaart: 1 punt buiten 2 sd = waarschuwing; 2 achter elkaar buiten 2 sd aan dezelfde kant = afkeuren | klopt (Westgard 1-2s waarschuwing, 2-2s afkeuren; 2-2s wijst op systematische fout) | Westgard, *Westgard Rules / Multirules* (westgard.com); Wikipedia 'Westgard rules' |
| 22 | oorzaak: reagens te lang buiten de vriezer | verzonnen maar realistisch voorbeeld van een systematische fout | — |
| 23 | mbo: analist (bijv. biologisch-medisch analist), niveau 4, meestal 4 jaar | klopt voor Noorderpoort en Curio (beide 4 jaar, niveau 4); reeksbrief zegt '± 3–4 jaar'; v2 'meestal vier jaar' | Noorderpoort, *Biologisch-medisch analist BOL*; Curio OER 25953 (16 periodes, 4 leerjaren) |
| 24 | hbo Biologie en Medisch Laboratoriumonderzoek, 4 jaar | klopt (240 EC; met vwo N&T/N&G soms 3 jaar, bv. Avans) | studiekeuze123.nl (Avans, Hogeschool Leiden e.a.) |
| 25 | werkplekken: ziekenhuis, bedrijf, onderzoeksinstituut, RIVM/GGD, voedsel- en milieulab | klopt (reeksbrief; Noorderpoort: ziekenhuislab, voedsel- en farmaceutische bedrijven) | REEKS.md; Noorderpoort |

## 2. Stelligheidscheck (alle, altijd, nooit, alleen, geen, elke)
- "bij elke handeling kan iets misgaan" → houden (mogelijkheid, niet stellig).
- "Een buisje zonder naam keurt het lab af" → houden: gangbare regel. Geen 'altijd'.
- "Vanaf nu wordt elke stap vastgelegd" → houden (traceerbaarheid ISO 15189), wel korter.
- "Elk buisje krijgt zijn RNA uit het vorige buisje" → klopt voor een seriële reeks.
- "Pas als ze bij elke stap te weinig pipetteert, stapelen de fouten zich op" → houden.
- "Elke cyclus verdubbelt het DNA ongeveer" → 'ongeveer' staat erbij.
- "die licht pas op als het polymerase de probe openknipt" → alleen voor hydrolyseprobes: v2 'In veel testen'.
- "Licht die niet op, dan zat er te weinig materiaal …" → v2 'meestal'.
- "kun je alleen vergelijken binnen dezelfde test" → houden (NVMM).
- "Zo blijven fouten zeldzaam" → houden.

## 3. Vraagregels
| Vraag | Goed | Lengtes (tekens) | Vakterm alleen in goed antwoord? | Met Vragen uit loopt de volgende alinea door? |
|---|---|---|---|---|
| q02 waar gaat het mis | c | 39 / 43 / 37 | nee | ja: "In onderzoeken … ontstaat ongeveer de helft tot twee derde al vóór het meten" |
| q06 pipetfout | a | 41 / 37 / 34 | nee | v1 "Elk buisje krijgt …" loopt door; v2 begint met "De laatste buisjes zijn ook twee procent te laag", zodat de inhoud er staat |
| q09 Ct | b | 46 / 49 / 40 | 'drempel' staat ook in de vraagtekst | ja: "Hoe meer virus er in het begin was, hoe eerder de drempel" |
| q13 controlekaart | v1 a → v2 c (letters c, a, b, c) | v2: 47 / 45 / 36 | nee | ja: "Eén punt buiten de band … De run wordt afgekeurd" |
Het goede antwoord is nergens de langste optie.

## 4. Lengte en overige punten
- v1 telt ± 880 gesproken woorden ≈ 6:05 spraak + 4 vraagkaarten + titel/hoofdstukkaarten ≈ 7 minuten. Doel ± 5 minuten: v2 schrapt ± 150 woorden (H1 en H3 korter, minder herhaling in de recap).
- Grens met lt3: geen centrifuge, geen bloedbuisjes; met lt4: geen kweek. PCR-principe niet opnieuw: alleen 'zag je in Op maat gekopieerd' + RT-stap in één zin.
- Gedeelde begrippen (REEKS.md): verdunningsreeks, ijklijn, positieve/negatieve controle volgens de reeksdefinitie in de glossary.
- Uitspraak: Ct → 'C-T' (zoals CT-scan in mbrt), PCR → 'pee-cee-er', virus-RNA → 'virus-er-en-aa', Dr. → 'dokter', 'Antwoord b' → bé. Wachtlijst: probe, real-time, RIVM, GGD, microliter, ijklijn, reagens, Ct.
