# Frisse eindreview — lt2 "Van buisje tot uitslag: werken in een diagnostisch lab"

Reviewer: frisse Claude-agent, 24 okt 2026. Gelezen: `script_v2.md`, `brief.md`, `reviews/review_v1.md`, `reken/` (script + uitvoer), `sections.html`, `film.json`, `segments.json`/`filmdata.json` (vraagopties, duur), `scenes_lt2.js`, `teken_lt2.js`, `words/` (alle tien alinea's), `uitspraak.md`; de afspraken `BEELDAFSPRAKEN.md` en `WERKWIJZE-LESSEN.md`, de reeksbrief `hw/lab/REEKS.md`, `personages/ROLLEN.md` en de Vragen-uit-knippen in `engine/player.js` (`vraagCuts`, `antwCuts`, `korteAntwCuts`). Eigen stills (lage resolutie): `/tmp/claude-0/-home-claude/032b72a0-a997-5d9a-b615-cb1860469233/scratchpad/rev_lt2/` (contact op 10/30/50/70/93 % in `c/`, contactbladen `sheet_g1..g4.png`, losse tijden in `z/`, `f*/`, uitsneden `crop_*.png`).

## Nagerekend en nagecheckt
`reken/bereken.py` opnieuw gedraaid: de uitvoer is gelijk aan `reken/uitvoer.txt`. Alle getallen in stem, beeld en docentdeel kloppen:
- 10 µl in 90 µl = 1 op 10; na vier stappen 10 000×. Een druppel van 10 µl als bol heeft een diameter van 2,67 mm ("nog geen drie millimeter"). In beeld ligt de druppel goed op de millimeterliniaal.
- Fout in stap 1 werkt door maar groeit niet (0,98 blijft 0,98). Fouten in elke stap: −2/−4/−6/−8 % in beeld; exact −2,0/−4,0/−5,9/−7,8 %, dus afgerond goed. Kleine kanttekening in punt 17.
- log₂10 = 3,32. IJklijn met helling −3,32: 10⁶…10² kopieën → Ct 17,0 / 20,3 / 23,6 / 27,0 / 30,3. Ct 25 → 10^(6 − 8/3,32) = 3906 ("ongeveer vierduizend"). Ct 30 tegen Ct 25: 2⁵ = 32×. In de ijklijngrafiek liggen Opa's punt (tussen 1000 en 10 000, op Ct 25) en de trap "÷10 / +3,3" in de goede richting. Checkvraag 3 (10 cycli ≈ 1000×) en 4 (Ct 27 ≈ 1000 kopieën) kloppen.
- Weegschaal "9,98 mg" voor 10 µl water klopt toevallig precies (dichtheid 0,998 bij 20 °C).

Bronnen nagelopen:
- **Pre-analytische fouten**: Plebani 2006 (Clin Chem Lab Med 44:750–759): pre-analytisch 46–68,2 %, post-analytisch 18,5–47 %. "De helft tot twee derde" klopt (pubmed.ncbi.nlm.nih.gov/16729864).
- **Pipet**: Mettler-Toledo/Rainin bevestigt dat ISO 8655 (versie 2022) de maximale fout als absoluut volume geeft. De tabel zelf staat alleen in een pdf, die ik niet heb kunnen lezen. De ± 0,2 µl voor een 2–20 µl-pipet heb ik dus niet zelf nagelezen, maar overgenomen uit de Gilson-tabel in `review_v1`. Bij 10 µl is dat 2 %, en de waarde past bij de bekende ISO-tabel. "Een goede pipet voor zulke kleine volumes" plus het beeld "pipetten van 2 tot 20 µl" is precies genoeg. Controle door wegen: ISO 8655-6 (gravimetrie). Klopt.
- **Doorvoer**: Roche-productpagina's. De cobas 8800 haalt tot 1056 tests per 8 uur (≈ 132 per uur), eerste uitslagen na ± 3 uur. De cobas 6800 haalt 576 per 8 uur. "De grootste robots ruim honderd uitslagen per uur" klopt.
- **Probe en Ct**: hydrolyseprobe (reporter aan het 5'-eind, quencher aan het 3'-eind, 5'→3'-exonuclease van het polymerase). In beeld zit de kleurstof aan de kant waar het polymerase vandaan komt, en de nieuwe streng en de probe liggen op dezelfde matrijs. Dat is goed getekend. De amplificatiecurves (S-vorm, drempel boven de basislijn, Ct 25 en 30 evenwijdig) zijn correct. "In veel testen" en "alleen vergelijken binnen dezelfde test" (NVMM 2020: tot 6 Ct verschil) zijn goed gedoseerd.
- **Controles**: de negatieve controle is water, de positieve een bekende hoeveelheid, de interne controle een menselijk gen (RNase P, CDC-panel). Het mislukte putje "meestal" door te weinig materiaal of remming: klopt. In beeld is de negatieve controle terecht ook zonder interne controle (water bevat geen menselijk gen).
- **Westgard**: westgard.com en Wikipedia ("Westgard rules"). 1-2s is een waarschuwing ("It doesn't mean stop, it means look carefully"). 2-2s betekent afkeuren: "2 consecutive control measurements exceed the same mean plus 2s" (of min 2s), dus aan dezelfde kant. "Eén buiten 2 sd = waarschuwing, twee achter elkaar aan dezelfde kant = afkeuren" klopt. Hier geldt de regel over twee runs met dezelfde controle; Westgard past hem ook zo toe. De oorzaak (reagens te warm → hogere Ct, dus punten *boven* de band) is inhoudelijk consistent.
- **Opleidingen**: Noorderpoort, biologisch-medisch analist BOL: niveau 4, 4 jaar (crebo 25953), werkplekken ziekenhuislab en levensmiddelen- of geneesmiddelenbedrijf. Hogeschool Leiden BML (studiekeuze123.nl): 240 EC, 4 jaar, verkort traject van 3 jaar voor vwo'ers met een passend profiel. Klopt.
- **Stelligheid**: elke, alle, alleen, geen en meestal heb ik nagelopen. "Een buisje zonder naam keurt het lab af", "elke pipet regelmatig gecontroleerd", "Controles gaan mee in elke run" en "alleen vergelijken binnen dezelfde test" zijn verdedigbaar. "Meestal" staat bij de interne controle en "ongeveer" bij het verdubbelen. Geen problemen in de stem.
- **RNA → DNA**: in de stem is het verdedigbaar om de RT-stap weg te laten. Het PCR-deel is bewust kort ("zag je in Op maat gekopieerd"), en docentdeel en begrippenlijst noemen de stap. Het beeld maakt er nu wel een fout van (punt 1).
- **Vraagkaarten**: antwoorden c, a, b, c. Lengtes q02 41/44/38, q06 **42**/37/34 (goed = langste), q09 48/**50**/41 (goed = langste), q12 47/45/36. De vakterm staat nergens alleen in het goede antwoord en de stem geeft het antwoord niet weg. Met Vragen uit lopen alle vier de overgangen goed door (gecontroleerd met de knipregels in `player.js`): bijvoorbeeld "… twee procent te weinig pipetteert. De laatste buisjes zijn ook twee procent te laag." en "… komt pas bij dertig boven de drempel. Hoe meer virus er in het begin was, hoe eerder de drempel."
- **Beeld algemeen**: geen wijslijnen naar begrippen (alleen stroompijlen buisje → lab). Eenheden in metalabels zijn voluit ("1 STREEP = 1 MILLIMETER", "KEER VERDUND", "AANTAL CYCLI"). Geen alinea begint met een leeg beeld. Labels blijven ≥ 120 px van de linkerrand en ≥ 50 px van de rechterrand (alleen de thermometer in s13 komt tot 1870 px).

---

## Bevindingen

1. **MOET** — s08 21,7–29,6 s · beeld. Het label **"DNA van het virus"** onder de matrijsstreng is fout: het coronavirus heeft geen DNA. De stem zegt een paar seconden eerder "Hij haalt het **RNA** uit tientallen monsters" en de standaarden zijn "virus-RNA". Zo leert de leerling dat corona een DNA-virus is. **Voorstel:** label "DNA-kopie van het virus-RNA". Laat de tag bij 'Nieuw' (16,8 s) een onderregel krijgen: "eerst: RNA → DNA (reverse transcriptase)". Zo staat de vereenvoudiging uit het docentdeel ook in beeld. Alleen beeld.

2. **MOET** — s07 0–30,6 s (hele alinea) · beeld. De antwoordtag luidt **"antwoord a: alle buisjes ook 2 % te laag"**. Dat klopt niet: de sterkste standaard (1×) is niet te laag, en in hetzelfde beeld krijgt dat buisje terecht geen chip "−2 %". Met Vragen uit blijft "alle buisjes ook 2 % te laag" als kernzin staan. **Voorstel:** "antwoord a: de verdunde buisjes allemaal 2 % te laag" (of "de laatste buisjes ook 2 % te laag", zoals de stem). Alleen beeld.

3. **MOET** — s01 12,1–17,4 s · beeld. Het label **"tientallen handelingen"** (y 430) valt over de stippellijn van de handelingen. De golf van stippen loopt door het woord "handelingen" heen (`crop_s01b.png`). **Voorstel:** het label 60 px hoger (y ≈ 370), of de golf 40 px lager (`y = 510 + …`). Alleen beeld.

4. **MOET** — s14 0–14,1 s (hele alinea) · beeld. Dr. Kim en Opa Henk bellen, maar hun armen hangen langs het lijf: **de telefoons zweven tegen het hoofd** (`crop_s14.png`). Dat valt de hele alinea op. **Voorstel:** `pose: 'vasthouden'` met `hold` die de telefoon in de hand tekent, schuin omhoog naar het gezicht (of op de luidspreker vóór de borst). Of laat het bellen weg en zet een tekstballon/telefoonicoon tussen hen in. Alleen beeld.

5. **KAN** — s14 3,2–4,7 s · beeld. In H4 keurt Yasmin precies de run af waarin Opa's buisje zat ("de monsters gaan opnieuw"). Opa's Ct 25 uit H3 kwam dus uit een afgekeurde run, en de film zegt niet waar de uitslag "corona" dan vandaan komt. Een oplettende leerling vraagt: is die Ct 25 nog geldig? **Voorstel:** op het document in s14 een onderregel "na herhaling: positief", of een chip "nieuwe run: controles in orde" vóór "positief: corona". Alleen beeld.

6. **KAN** — s11 36,4–39 s · beeld. De stem zegt "Vandaag ligt hij **voor de tweede keer** achter elkaar daarboven", maar gisteren (punt 14) en vandaag (punt 15) verschijnen pas samen op 'Vandaag'. De kijker ziet dus niet dat er gisteren al een waarschuwing was. **Voorstel:** punt 14 al met de eerste 14 punten tekenen (oker, als waarschuwing) en alleen punt 15 op 'Vandaag' laten verschijnen (`n: Math.min(n, 15 + V)`, `hl` 14 oker vanaf de start, 15 koraal op V). Alleen beeld.

7. **KAN** — s13 1,6–21 s · beeld. Op 'Eén' verschijnen de ±3 sd-lijnen. De stem noemt 3 sd nergens, en alleen "+3 sd" heeft een label; de −3 sd-lijn staat er zonder label. **Voorstel:** de 3 sd-lijnen weglaten (`drie: 0`, zoals in s11), of "−3 sd" ook labelen en in het docentdeel bij de controlekaart zetten "1-3s: één punt buiten 3 sd = ook afkeuren". Alleen beeld.

8. **KAN** — s08 16,8–21,7 s · beeld. Na "Nieuw is wat real-time toevoegt" is het beeld bijna 5 s leeg: alleen de tag bovenaan en het losse metalabel "SCHEMATISCH · NIET OP SCHAAL". De DNA-streng komt pas op 'probe'. Verder overlappen bij ± 30 s het polymerase en de assen van de grafiek een halve seconde. **Voorstel:** de matrijsstreng al op 'Nieuw' tekenen (alleen probe en kleurstof wachten op hun woord), en de grafiek pas laten opkomen als de probescène weg is (`wissel()`-volgorde). Alleen beeld.

9. **KAN** — q06 en q09 · beeld (vraagkaart). Het goede antwoord is bij deze twee vragen de langste optie (q06 a 42 tegen 37/34; q09 b 50 tegen 48/41). Bij q06 herhaalt alleen het goede antwoord bovendien het getal uit de vraag ("twee procent"). `review_v1` meldt ten onrechte "nergens de langste". **Voorstel:** q06 a "ook zij zijn allemaal 2 % te laag" en b "die fout verdwijnt door het verdunnen tot 0 %" (of c "de fout groeit tot 8 % bij het laatste"). q09 b iets inkorten: "dat van Opa Henk: eerder boven de drempel". Opties worden niet uitgesproken, dus alleen beeld.

10. **KAN** — s10 0–42 s · beeld. Met Vragen uit wordt de tag "antwoord b: Opa Henk, want eerder boven de drempel" tot "Opa Henk, want eerder boven de drempel". Dan staat er niet meer *wat* Opa Henk heeft. **Voorstel:** "antwoord b: meer virus bij Opa Henk (eerder boven de drempel)". Alleen beeld.

11. **KAN** — s07 9–30 s · beeld. In de rij "fout in stap 1" raakt de laatste chip "−2 %" (x ± 1460) bijna de chip "gaat mee, groeit niet" (x 1640) (`crop_s07.png`). **Voorstel:** de twee conclusiechips 60 px naar rechts (x 1700) of onder de rij zetten. Alleen beeld.

12. **KAN** — s04 11,0–12,7 s · beeld. De chip "te lang warm" verschijnt op 'warm' en vervaagt al vanaf 'Daarom' (11,9 s): hij is maar ± 1 s leesbaar. **Voorstel:** het overvloeien naar de ontvangstscène starten op 'ontvangst' (13,8 s) in plaats van op 'Daarom'. Alleen beeld.

13. **KAN** — s15 0–24 s · beeld. Boven Yasmin staat het label "analist", terwijl ze in de film steeds stagiair is (en volgens ROLLEN 16 jaar). **Voorstel:** "analist in opleiding". Zet in het hbo-paneel ook "4 jaar (met vwo soms 3)": dat is nuttig voor een vwo-publiek en staat al in het docentdeel. Alleen beeld.

14. **KAN** — `sections.html` checkvraag 2 · docentdeel. "… en daaruit weer 20 µl in 180 µl water, nog twee keer" laat in het midden of het om 3 of 4 stappen gaat. Het antwoord ("het tweede, derde en vierde buisje") nummert de buisjes anders dan de film, waar buisje 1 de onverdunde standaard is. **Voorstel:** "Je maakt een verdunningsreeks van vier stappen: telkens 20 µl in 180 µl water. … als alleen in de tweede stap 5 % te weinig werd gepipetteerd?" Antwoord: "Het 100×-, 1000×- en 10 000×-buisje zijn ongeveer 5 % te laag; het 10×-buisje niet." Alleen docentdeel.

15. **KAN** — `brief.md` Keuzes · docentdeel. Daar staat nog "Goede antwoorden c, a, b, a", terwijl v2 c, a, b, **c** is. Leerdoel 5 noemt "buiten 3 standaardafwijkingen", wat de film niet uitlegt (zie punt 7). **Voorstel:** de brief bijwerken. Geen filmwijziging.

16. **KAN** — s01, s04, titel · beeld/reeks. Het etiket noemt Opa Henk "**H. de Vries**". Opa Henk heeft in `ROLLEN.md`/`lib_cast.js` geen achternaam. Als lt3 (bloeduitslag) of een andere film hem een andere naam geeft, botst dat. **Voorstel:** de achternaam vastleggen in `ROLLEN.md` (vader van Linda, dus de familienaam van die tak), of het etiket neutraal houden ("Henk V."). Alleen beeld/afspraken.

17. **KAN** — docentdeel, rekenvoorbeeld · docentdeel. Wie in stap 1 2 % te weinig standaard pipetteert (9,8 µl in 90 µl), krijgt 9,8/99,8 = **−1,8 %**, niet precies −2 %. In de stem ("ook twee procent te laag") is dat acceptabel. **Voorstel:** onder het rekenvoorbeeld één zin: "Precies: 9,8 µl in 90 µl geeft 1,8 % te laag; 'twee procent' is afgerond." Alleen docentdeel.

---

**Telling:** 4 MOET (alle vier alleen beeld, geen nieuwe audio), 13 KAN (geen enkele vraagt nieuwe audio).

Bronnen: Plebani 2006 (pubmed.ncbi.nlm.nih.gov/16729864); Roche cobas 6800/8800-productpagina's (diagnostics.roche.com/us/en/products/instruments/cobas-6800.html, …/cobas-8800.html); Westgard (westgard.com/westgard-rules.html; en.wikipedia.org/wiki/Westgard_rules); Mettler-Toledo/Rainin, ISO 8655 MPE (mt.com); Noorderpoort, biologisch-medisch analist BOL; studiekeuze123.nl, BML Hogeschool Leiden.

---

## Verwerkt (maker, 24 okt 2026)
Geen nieuwe audio. Opnieuw gebouwd (`bouw_lt2.sh`), `cuecheck` schoon. Verse stills van de gewijzigde scènes in `qr/`, contactbladen `scratchpad/sheet_lt2_eind.png` en `sheet_lt2_eind2.png`.

**MOET**
1. s08: het label heet nu "DNA-kopie van het virus-RNA". Onder de tag "real-time" staat de regel "eerst: RNA → DNA (reverse transcriptase)".
2. s07: de antwoordtag is nu "antwoord a: de verdunde buisjes allemaal 2 % te laag".
3. s01: "tientallen handelingen" staat 60 px hoger (y 370), los van de stippellijn.
4. s14: Dr. Kim en Opa Henk staan in de houding 'denk' en houden de telefoon in de opgeheven hand.

**KAN**
5. s14: onder "positief: corona" staat nu de regel "nieuwe run: controles in orde".
6. s11: punt 14 (gisteren) staat er vanaf het begin in oker; punt 15 komt op 'Vandaag', en beide worden koraal.
7. s13: de lijnen op 3 sd zijn weg (`drie: 0`).
8. s08: de matrijsstreng en het label staan er al bij 'Nieuw' (probe en kleurstof wachten op hun woord). De grafiek komt pas op als de probescène weg is (start 0,8 s na 'cyclus').
9. q06: de opties zijn nu a "ook zij zijn allemaal 2 % te laag" (33 tekens), b "die fout verdwijnt door het verdunnen" (37) en c "de fout groeit tot 8 % bij het laatste buisje" (45). q09 b is "dat van Opa Henk: eerder boven de drempel" (41, tegen 48 en 41). Aangepast in `segments.json` en `script_v2.md` (de opties worden niet uitgesproken).
10. s10: de antwoordtag is nu "antwoord b: meer virus bij Opa Henk (eerder boven de drempel)".
11. s07: de conclusiechips staan nu op x 1710.
12. s04: de overgang naar de ontvangstscène start nu op 'ontvangst' in plaats van op 'Daarom'.
13. s15: het label heet nu "analist in opleiding"; in het hbo-paneel staat "4 jaar (met vwo soms 3)".
14. Checkvraag 2 heeft nu vier stappen; het antwoord nummert de buisjes zoals de film (10×, 100×, …).
15. `brief.md`: de antwoorden zijn c, a, b, c. Leerdoel 5 noemt geen 3 sd meer (staat alleen in het docentdeel).
16. Het etiket "H. de Vries" blijft (zelfde naam in lt3, akkoord coördinator); dat staat nu in de brief.
17. In het docentdeel staat nu de zin over 9,8/99,8 = 1,8 % ('twee procent' is afgerond).
