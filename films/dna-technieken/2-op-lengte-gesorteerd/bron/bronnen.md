# Op lengte gesorteerd — bronnenlogboek

Werkwijze en criteria: `films/BRONNEN.md`.

| Veld | Waarde |
|---|---|
| Gecontroleerde versie | 2.0 (beeld-remake, tekst gelijk aan 1.0), 31 okt 2026 |
| Eerste ronde | Claude, 31 okt 2026: 16 beweringen, 9 bronnen zelf geopend |
| Steekproef | nog niet gedaan |
| Vakexpert | geen |
| Stand | 10 ✓ · 4 ≈ · 0 ! · 2 ? |

## Bronnen
Alle bronnen op 31 okt 2026 zelf geopend. Niet bereikbaar vanuit deze sessie: openstax.org (niet op de lijst), strbase(-archive).nist.gov (stuurt door naar de startpagina).

| Nr | Niveau | Bron | Link |
|---|---|---|---|
| B1 | A | Wischusen e.a., *Molecular Biology I*, lab 11 prelab (Macmillan): fosfaatgroepen maken DNA negatief; agarose als zeef; afstand omgekeerd evenredig met log10 van de lengte | https://digfir-published.macmillanusa.com/wischusen_61498_f14/lab11_prelab2.html |
| B2 | B | QB3 Berkeley, *Lab Fundamentals Bootcamp: Gel electrophoresis*: DNA naar de pluspool, putjes bij de zwarte (min) elektrode, kleinere stukken sneller, laadbuffer met glycerol zakt in het putje, SYBR Safe, ladder | https://qb3.berkeley.edu/education/lab-fundamentals-bootcamp/manual/cloning/gel-electrophoresis/ |
| B3 | B | Thermo Fisher, *E-Gel 48 Agarose Gels* (productblad): 1 % 400–10 000 bp, 2 % 50–3 000 bp, 4 % 10–500 bp; SYBR Safe met blauw licht | https://commerce.thermofisher.com/order/catalog/product/G800801 |
| B4 | A | NIJ, *STR Data Analysis and Interpretation*, module Stutter: meestal één herhaling korter, door 'slipped strand mispairing' tijdens de amplificatie | https://nij.ojp.gov/nij-hosted-online-training-courses/str-data-analysis-and-interpretation-forensic-analysts/data-troubleshooting/stutter |
| B5 | A | NIJ, *STR Data Analysis* (strdata.training.nij.gov), Stutter: bijproduct van de amplificatie, voorspelbaar | https://strdata.training.nij.gov/m02/05/ |
| B6 | A | Sullivan e.a. (ISFG, *Advances in Forensic Haemogenetics*): amelogenine 106 bp (X) en 112 bp (Y); vrouw één band, man twee | https://isfg.org/downloads/AFH/978-3-642-78782-9_086.pdf |
| B7 | A | DC Department of Forensic Sciences, *FBS22 STR Statistical Calculations Guidelines*: 2pq, p², productregel, random match probability; drie allelen bij één bijdrager niet berekend | https://dfs.dc.gov/sites/default/files/dc/sites/dfs/page_content/attachments/FBS22%20-%20STR%20Statistical%20Calculations%20Guidelines.pdf |
| B8 | A | FBI, *CODIS* (archief 18 dec 2020): 20 kernloci sinds 1 jan 2017 | https://webarchive.library.unt.edu/web/20201218004505/https://www.fbi.gov/services/laboratory/biometric-analysis/codis |
| B9 | A | NIJ, *DNA for prosecutors: results of examinations*: STR-uitslag 'DNA van meer dan één persoon' (mengsel), amelogenine wijst op man/vrouw | https://nij.ojp.gov/nij-hosted-online-training-courses/dna-prosecutors-practice-notebook-inventory/lab-report-analysis/results-examinations |

## Beweringen
| Nr | Waar | Bewering in de film | Bronnen | Status | Toelichting |
|---|---|---|---|---|---|
| 1 | s04 | Een gel is een netwerk van agarose met gaatjes | B1, B2 | ✓ | |
| 2 | s05 | Zware laadbuffer laat het monster naar de bodem van het putje zakken | B2 | ≈ | één bron (B); algemene labpraktijk (glycerol) |
| 3 | s06 | DNA is negatief geladen en beweegt naar de pluspool | B1, B2 | ✓ | |
| 4 | s07 | Putjes bij de minpool, de zwarte elektrode | B2, B1 | ✓ | B1 geeft de richting, B2 de zwarte elektrode |
| 5 | s08–s09 | Korte stukken komen verder dan lange | B1, B2 | ✓ | afstand ~ −log(lengte), zoals het gelmodel |
| 6 | s11 | Meer agarose, kleinere gaatjes; voor korte STR-stukken 3–4 % | B3, B1 | ≈ | B3: 4 % voor 10–500 bp, 2 % 50–3000 bp; '3–4 %' is de keuze van het practicum |
| 7 | s12 | DNA is kleurloos; met kleurstof en blauw licht zie je banden | B2, B3 | ✓ | SYBR Safe + blauw licht |
| 8 | s13–s15 | Lengte aflezen met een marker van bekende lengtes | B1, B2 | ✓ | |
| 9 | s21 | Per STR twee allelen, één van elke ouder | B7, B9 | ✓ | heterozygoot 2pq, homozygoot p² |
| 10 | s23 | Amelogenine: X en Y man, alleen X vrouw (106/112 bp) | B6, B9 | ✓ | |
| 11 | s27–s28 | Sterk maar geen absoluut bewijs; meer STR's, kleinere kans | B7, B8 | ✓ | productregel; kansen uit de frequenties van het practicum (docentdeel) |
| 12 | s28 | Forensische labs onderzoeken meer dan twintig STR's | B8 | ≈ | CODIS 20 kernloci; Nederlandse kits hebben er meer (NFI niet geopend in deze ronde) |
| 13 | s29–s31 | Negatieve controle hoort leeg; echte band = besmetting | — | ? | algemene labpraktijk, geen bron geopend die het letterlijk zegt |
| 14 | s30 | Primer-dimeren geven een vage vlek onderaan | — | ? | idem |
| 15 | s34–s35 | Stotterband: zwak, één herhaling korter, ontstaat bij de PCR, geen allel | B4, B5 | ✓ | mechanisme 'slipped strand mispairing' (in beeld als een uitgeluste herhaling in de mal) |
| 16 | s36 | Meer dan twee banden bij één STR: DNA van meer personen | B9, B7 | ≈ | B7 behandelt drie allelen als niet-enkelvoudig; B9 noemt het mengsel |

## Aanpassingen
Geen: de tekst blijft. Status `?` bij 13 en 14 staat op de vragenlijst voor een volgende bronronde.

## Menselijke controle
Nog niet gedaan.
