# Stambomen uit DNA: een uitbraak volgen — bronnenlogboek (concept)

Werkwijze en criteria: `films/BRONNEN.md`. Concept bij de frisse review van `script_v1.md`. Wordt `bron/bronnen.md` zodra de film een bronmap heeft.

| Veld | Waarde |
|---|---|
| Gecontroleerde versie | script_v1 (25 okt 2026) |
| Eerste ronde | Claude (frisse reviewer), 25 okt 2026: 33 beweringen, 17 bronnen zelf geopend; rekenvoorbeeld en steungetallen zelf nagerekend |
| Steekproef | nog niet gedaan |
| Vakexpert | geen |
| Stand | v1: 15 ✓ · 13 ≈ · 3 ! · 2 ?; na v2: 3 `!` en 2 `?` opgelost (zie Aanpassingen) |

## Bronnen

Alle bronnen heb ik op 25 okt 2026 zelf geopend (WebFetch). Bronnen uit `getallen.md` die ik niet zelf heb geopend, staan hier niet: NCRC-samenvatting, Oude Munnink 2020, Rijksoverheid, DutchNews, Omroep Brabant, Vogelzang 2021, Besser 2019, Engelen 2025, Lisotto 2021, HAN-brochure, Studiekeuze123 Biology en Brown CSCI 1810. Hun beweringen zijn hier dus niet door die bronnen gedekt.

| Nr | Niveau | Bron | Link |
|---|---|---|---|
| B1 | A | Sikkema RS e.a. (2020). *COVID-19 in health-care workers in three hospitals in the south of the Netherlands: a cross-sectional study.* Lancet Infect Dis 20(11): 1273–1280 (volledige tekst; de oorsprong van de casus) | https://repub.eur.nl/pub/128871/Repub_128871_O-A.pdf |
| B2 | A | Torres Ortiz A e.a. (2023). *Within-host diversity improves phylogenetic and transmission reconstruction of SARS-CoV-2 outbreaks.* eLife | https://elifesciences.org/articles/84384 |
| B3 | A | Didelot X, Fraser C, Gardy J, Colijn C (2017). *Genomic infectious disease epidemiology in partially sampled and ongoing outbreaks.* Mol Biol Evol 34(4) (preprint, volledige tekst) | https://www.biorxiv.org/content/10.1101/065334.full.pdf |
| B4 | A | Felsenstein J (1985). *Confidence limits on phylogenies: an approach using the bootstrap.* Evolution 39(4): 783–791 | https://www.sfu.ca/biology/faculty/M'Gonigle/materials-qm/papers/felsenstein-1985-783.pdf |
| B5 | B | QIAGEN CLC Phylogeny Module, handleiding *Bootstrap tests* | https://resources.qiagenbioinformatics.com/manuals/phylogenymodule/current/Bootstrap_tests.html |
| B6 | B | Saint Louis University, CSCI 1020, college *UPGMA* | https://cs.slu.edu/~goldwamh/1020/lectures/UPGMA |
| B7 | B | Craven M, University of Wisconsin, BMI/CS 576 (2011), *Distance-based approaches to inferring phylogenetic trees* (onafhankelijk van B6) | https://cw.fel.cvut.cz/b172/_media/courses/bin/distance-phylogeny.pdf |
| B8 | A | Neher R (Universiteit Basel, Nextstrain), *Real-time tracking of SARS-CoV-2 evolution and spread*, KNAW-presentatie okt 2020 (onderzoeker over eigen onderzoek) | https://neherlab.org/202010_KNAW_CoV.html |
| B9 | B | Knowable Magazine (2021), *Coronavirus evolving: how mutations arise and variants emerge* | https://knowablemagazine.org/article/health-disease/2021/coronavirus-evolving-how-mutations-arise-and-variants-emerge |
| B10 | A | ARTIC network, *nCoV-2019 sequencing protocol* (protocols.io) | https://www.protocols.io/view/ncov-2019-sequencing-protocol-bbmuik6w.pdf |
| B11 | A | van Dorp L e.a. (2020). *Emergence of genomic diversity and recurrent mutations in SARS-CoV-2.* Infect Genet Evol | https://scholar.harvard.edu/sites/scholar.harvard.edu/files/kleelerner/files/20200505_infection_genetics_evolution._emergence_of_genomic_diversity_and_recurrent_mutations_in_sars-cov-2_.pdf |
| B12 | A | Turakhia Y e.a. (2020). *Stability of SARS-CoV-2 phylogenies.* PLoS Genet 16(11) (alleen samenvatting) | https://research-portal.st-andrews.ac.uk/en/publications/stability-of-sars-cov-2-phylogenies/ |
| B13 | A | RIVM, *Varianten van het coronavirus* (kiemsurveillance; tekst van ± 2021, geen datum) | https://www.rivm.nl/coronavirus-covid-19/virus/varianten |
| B14 | B | Studiekeuze123, *Bio-informatica, HAN* (start sept. 2027) | https://www.studiekeuze123.nl/opleidingen/1636-bio-informatica-han-university-of-applied-sciences-hbo-bachelor |
| B15 | B | Studiekeuze123, *Molecular Life Sciences, Radboud Universiteit* | https://www.studiekeuze123.nl/opleidingen/1364-molecular-life-sciences-radboud-universiteit-wo-bachelor |
| B16 | A | Wageningen University & Research, *Master's in Bioinformatics and Systems Biology* (universiteit over eigen opleiding) | https://www.wur.nl/en/education/master/masters-bioinformatics-and-systems-biology |
| B18 | A | Lauer SA e.a. (2020). *The incubation period of COVID-19 from publicly reported confirmed cases.* Ann Intern Med; via Johns Hopkins Bloomberg School of Public Health, persbericht 'New study on COVID-19 estimates 5.1 days for incubation period' (mediaan 5,1 dagen; 97,5 % binnen 11,5 dagen) | https://publichealth.jhu.edu/2020/new-study-on-COVID-19-estimates-5-days-for-incubation-period |
| B19 | B | NOS (22 feb 2020), *Coronapatiënt werd mogelijk pas na vier weken ziek*: 'na maximaal 14 dagen symptomen' | https://nos.nl/artikel/2324076-incubatietijd-coronavirus-mogelijk-geen-twee-maar-vier-weken.html |
| B17 | — | Eigen berekening (Python, 25 okt 2026): UPGMA op de tabel van H2, bootstrap met 4000 herhalingen op 29 408 kolommen waarvan 10 variabel | scratchpad `upgma_check.py` |

## Beweringen

| Nr | Waar | Bewering in de film | Bronnen | Status | Toelichting |
|---|---|---|---|---|---|
| 1 | cold open | Maart 2020, drie ziekenhuizen in Brabant: 96 medewerkers met klachten testen positief | B1 | ✓ (oorsprong) | 2–12 maart 2020; 1796 van 12 022 gescreend 'who had fever or mild respiratory symptoms', 96 (5 %) positief. Amphia (Breda), ETZ (Tilburg), Bravis (Roosendaal/Bergen op Zoom). B1 is de oorsprong; een onafhankelijke tweede bron heb ik niet geopend. |
| 2 | cold open | 'Corona is net in Nederland' | — | ? | Klopt (eerste geval eind februari 2020), maar ik heb hiervoor zelf geen bron geopend. |
| 3 | H1 | Het coronavirus heeft RNA van ongeveer dertigduizend letters | B9, B1 | ✓ | B9: '30,000-letter genome'. |
| 4 | H1 | Het lab schrijft RNA om naar DNA en kopieert het in stukjes van een paar honderd letters | B10 | ≈ | B10: cDNA met reverse transcriptase, 'overlapping 400nt amplicons'. Eén bron (A); dit is een standaardprotocol. |
| 5 | H1 | De computer legt de stukjes achter elkaar tot één sequentie; die lijn je uit met een referentiegenoom | B1 | ≈ | B1: 'aligned to reference'. In de praktijk worden de stukjes langs de referentie gelegd en wordt daarna de sequentie gemaakt. De volgorde in de film is omgedraaid; als vereenvoudiging acceptabel (review Expert 5). |
| 6 | H1 | Gemiddeld komen er in de virussen die rondgaan ongeveer twee mutaties per maand bij; dat is gemeten | B8, B9, B1 | ✓ | B8 'about two mutations a month'; B9 'about two new mutations each month' (± 566 000 genomen); B1 'around one mutation every 2 weeks'. |
| 7 | H1 Q1 | Twee medewerkers raakten een week na elkaar besmet → hun virussen verschillen geen of maar een paar letters | B1, B2 | ! | Klopt alleen als de een de ander besmette (B2: 'many index case and contact pairs will share identical genotypes'). Losse besmettingen kunnen meer verschillen (vgl. A en C, vijf letters). Voorstel: de vraag over een besmettingspaar stellen (review Expert 1). |
| 8 | H1 | Mensen die elkaar besmetten, hebben vaak precies hetzelfde virus (ook eindkaart) | B2, B1 | ✓ | B2: 'most consensus sequences in a small-scale outbreak will show no variation'; B1: groep 1 had 29 sequenties, waarvan 12 identiek. |
| 9 | H2 | Algoritme: zoek het paar met de minste verschillen, voeg samen, zie het als één monster, herhaal | B6, B7 | ≈ | UPGMA (B6, B7). Vereenvoudigd: na het samenvoegen neem je het gemiddelde van de afstanden; dat is hier niet nodig, omdat de afstanden gelijk zijn. UPGMA neemt een vast tempo aan (B7: 'the molecular clock assumption is not generally true'). Alleen niveau-B-bronnen (collegemateriaal); een leerboek als A-bron ontbreekt nog. |
| 10 | H2 | Rekenvoorbeeld: A-B 0, C-E 2, A/B met C/E 5, D 6 of 7 → ((A-B),(C-E)),D | B17 | ✓ | Zelf nagerekend: de afstanden komen uit een consistente set van tien variabele kolommen; UPGMA geeft precies deze boom. Na elke stap zijn de afstanden van een groepje gelijk (5, 6, 7), dus middelen is niet nodig. |
| 11 | H2 | Echte programma's rekenen slimmer, maar het idee blijft: wie het minst verschilt, hangt het dichtst bij elkaar | B1, B7 | ≈ | B1 gebruikte maximum likelihood (IQ-TREE 1.6.8). Daarbij is 'het kleinste paar eerst' niet de werkwijze; 'weinig verschil = nauw verwant' blijft wel waar. |
| 12 | H3 | Bij zo weinig verschillen kan één letter de boom omgooien | B17, B12 | ≈ | Eigen berekening: A-B met C-E staat maar ± 6 van de 10 keer. B12: fouten op een paar plekken verstoren de boom. |
| 13 | H3 | Soms ontstaat dezelfde mutatie twee keer, los van elkaar; dan lijken virussen familie terwijl ze dat niet zijn | B11, B12 | ✓ | B11: 'mutations that have emerged independently multiple times (homoplasies)', 198 plekken; B12: herhaalde mutaties doen het lijken alsof lijnen verwant zijn. 'En er zit toeval in' als enige oorzaak is te smal: B11 ziet ze als mogelijke aanpassing (review Expert 6). |
| 14 | H3 | Een leesfout van de machine kan een nepverschil maken | B12, B11 | ✓ | B12: 'systematic errors associated with lab- or protocol-specific practices'; B11: 'errors during the processing of sequence data'. |
| 15 | H3 | Herbemonsteren/bootstrappen: willekeurig kolommen trekken, steeds terugleggen; sommige dubbel, andere niet; boom opnieuw bouwen, honderden keren | B4, B5 | ≈ | B4: 'sampling n characters … with replacement'; B5: 'choose l columns … with replacement', 'usually around 100 times'. B1: 1000 herhalingen. Het script zegt niet dat je **evenveel** kolommen trekt, en het klinkt alsof één nieuwe uitlijning honderd keer wordt gebruikt (review Expert 4). |
| 16 | H3 | Dan telt ze hoe vaak elk groepje terugkomt | B4, B5 | ✓ | B4: 'the number of times that the bootstrap estimate contained the corresponding monophyletic group'. |
| 17 | H3 | A-B 99, C-E ongeveer 85, A-B met C-E ongeveer 58 van de 100 | B17 | ✓ | Nagerekend: 0,99 / 0,85 / 0,59. Bedachte data; op het scherm 'eigen berekening, vereenvoudigd'. |
| 18 | H3 | Zes van de tien is wankel; met net andere letters hangt die tak anders | B4 | ≈ | B4 noemt ≥ 95 % 'statistically significant'. 'Wankel' is een voorzichtige, kwalitatieve lezing. |
| 19 | H3 | Een hoog getal zegt alleen dat de data steeds hetzelfde groepje geven; het bewijst niet dat de boom klopt | B4, B5 | ✓ | B4: het interval bevat 'not the true phylogeny, but the phylogeny that would be estimated on repeated sampling'; misleidend 'if the method … is inconsistent'. B5: 'how reliably we can reconstruct a tree, given the sequence data'. |
| 20 | H4 | Gelijke virussen zeggen: nauw verwant, niet wie wie besmette of in welke volgorde | B2, B1 | ✓ | B2: 'making it difficult to ascertain who infected whom'; B1: 'difficult to draw definite conclusions on individual direct … transmission'. |
| 21 | H4 | Wie eerder positief test, besmette niet per se de ander (afleider Q4) | — | ? | Volgt uit de logica (testmoment ≠ besmettingsmoment), maar ik heb er geen bron voor geopend. De film zegt het ook niet expliciet (review Didactiek 4). |
| 22 | H4 | Misschien kregen ze het uit dezelfde bron, via mensen die nooit getest zijn; een boom toont alleen wie je gemeten hebt | B3, B1 | ✓ | B3: 'An outbreak is rarely completely sampled'; B1: in maart 2020 werden alleen medewerkers met klachten getest. |
| 23 | H4, recap, eindkaart | Een boom zegt verwantschap, geen richting | B3, B2 | ! | Als algemene regel te stellig. B3: 'we can draw inferences about the order and direction of transmission' (met tijden en gedeelde mutaties, met onzekerheid). Wel juist bij (bijna) gelijke virussen (B2). Voorstel: 'bij zulke kleine verschillen zie je de richting niet' (review Expert 2). `getallen.md` gebruikt B3 voor het omgekeerde. |
| 24 | H4 | Geen schuld | — | ≈ | Geen feitelijke bewering, maar een terechte conclusie: zelfs met richting zegt een boom niets over schuld. |
| 25 | H4 | Onderzoekers leggen de boom naast gesprekken: werkplek, eerste klachten, waar geweest | B1, B2 | ≈ | B1: 'structured interview to obtain epidemiological data', met reizen en bijeenkomsten > 50 mensen; afdeling en begin van de klachten staan in de resultaten. B2: 'transmission inference often remains limited'. De drie voorbeelden zijn een redelijke vereenvoudiging. |
| 26 | H4 | Onderzoekers lazen het virus van vijftig medewerkers en tien patiënten | B1 | ✓ (oorsprong) | 'complete and near-complete genome sequences from 50 health-care workers and ten patients'. |
| 27 | H4 (beeld) | Tien bedden verspreid over de drie ziekenhuizen | B1 | ! | 'seven patients at Amphia Hospital and three patients at Elisabeth-TweeSteden Hospital'; geen patiënten uit Bravis. Voorstel: 7 bedden in Breda, 3 in Tilburg (review Expert 3). |
| 28 | H4 | Bijna alles viel in drie groepen | B1 | ✓ (oorsprong) | 46 van 50 medewerkers (92 %) en 10 van 10 patiënten. |
| 29 | H4 | Die groepen zaten verspreid over de ziekenhuizen, en ook bij mensen daarbuiten | B1 | ≈ | Groep 1 in alle drie; groep 2 vooral Amphia (85 %) en Bravis; groep 3 Amphia en Bravis. 'Identical viruses … with non-hospitalised cases in other locations'. 'Elke groep in meer dan één ziekenhuis' is preciezer (review Expert 8). |
| 30 | H4 | Collega's van één afdeling hadden lang niet altijd hetzelfde virus | B1 | ✓ (oorsprong) | 'no consistent link was noted among health-care workers on the same ward'; 'no clusters … of more than three health-care workers on the same ward'. |
| 31 | H4, recap | De meesten raakten waarschijnlijk buiten het werk besmet; besmetting in het ziekenhuis kon niet worden uitgesloten, maar was niet de grote route | B1 | ≈ | 'consistent with multiple introductions through community-acquired infections'; 'direct transmission in the hospitals cannot be ruled out'; 'do not support widespread nosocomial transmission'. 'Was niet' → 'leek niet' (review Expert 7). Tweede onafhankelijke bron niet geopend. |
| 32 | recap | Tijdens corona volgde het RIVM met zulke sequenties elke week welke varianten er rondgingen | B13 | ≈ | 'eind 2020 gestart met de kiemsurveillance waarbij wekelijks steekproefsgewijs monsters worden onderzocht', ± 1200 per week. Eén bron (de instantie zelf = oorsprong). |
| 33 | recap | Hbo Bio-informatica in Nijmegen, vier jaar; bachelor biologie of moleculaire levenswetenschappen in Nijmegen; master Bioinformatics in Wageningen; werk in ziekenhuis, onderzoeksinstituut of bedrijf | B14, B15, B16 | ≈ | B14: HAN Nijmegen, 240 ECTS (= 4 jaar), Nederlands, start sept. 2027; werk bij 'onderzoeksinstituut, ziekenhuis, agritech, biotech of in de farmacie'. B15: Molecular Life Sciences, Engels, 180 ECTS, Nijmegen. B16: officieel 'Bioinformatics and Systems Biology', 2 jaar, Engels; Nederlandse BSc Biologie direct toelaatbaar. Radboud Biology heb ik zelf niet geopend. |

## Aanpassingen (uitgevoerd in script_v2, 25 okt 2026)

| Wat | Waar | Stand |
|---|---|---|
| #7 `!` Q1 nu een besmettingspaar: 'Een medewerker besmet een collega. Een week later laten ze allebei hun virus lezen.' Payoff: 'Ook na een week verschillen twee mensen die elkaar besmetten meestal geen letter, of maar een paar.' | H1 | gedaan → ✓ (B2, B1) |
| #23 `!` 'geen richting' alleen bij (bijna) gelijke virussen: H4 'Bij zulke kleine verschillen zie je de richting niet'; annotatie 'richting hier niet te zien'; recap 'Wie het aan wie gaf, zie je bij bijna gelijke virussen niet'; eindkaart 'Bij bijna gelijke virussen niet wie het aan wie gaf, en nooit schuld'. B3 niet meer als bron voor 'geen richting'; wel voor 'zelden volledig bemonsterd'. | H4, recap, eindkaart | gedaan → ✓ (B2, B1) |
| #27 `!` beeld echte casus: geen bedden of poppetjes per ziekenhuis meer; alleen totalen (50 medewerkers, 10 patiënten) en drie groepen met label 'in meer dan één ziekenhuis, en ook daarbuiten'. Cold open: één raster van 96, niet per ziekenhuis verdeeld. | beeld cold open, H4, recap | gedaan |
| #15 'evenveel kolommen' en 'steeds met een nieuwe trekking' | H3 | gedaan → ✓ (B4, B5) |
| #31 'was niet' → 'leek niet'; #29 'Elke groep kwam in meer dan één ziekenhuis voor, en ook bij mensen daarbuiten' | H4 | gedaan → #29 ✓ (oorsprong) |
| #5 volgorde: stukjes langs de referentie → één sequentie | H1 | gedaan → ✓ |
| #13 'En er zit toeval in' weg | H3 | gedaan → ✓ |
| #11 'het idee blijft: wie het minst verschilt…' → 'weinig verschil blijft nauw verwant' | H2 | gedaan → ✓ |
| #21 `?` 'wie eerder positief test, is niet per se eerder besmet: de een krijgt na een paar dagen klachten, de ander pas na een week of meer' | H4 | bron geopend: B18 (mediaan 5,1 dagen, 97,5 % binnen 11,5), B19 (tot 14 dagen) → ✓ |
| #2 `?` 'Corona is net in Nederland' | cold open | B19 (NOS 22 feb 2020: nog geen geval) en B1 (eerste geval 27 feb 2020, in de inleiding) → ✓ |
| Nieuw: bedacht voorbeeld zonder stadsnamen, vast kaartje 'bedacht voorbeeld' (review Leerplan 2, coördinator) | H2–H4 | gedaan |
| Nieuw: vraag over de echte casus (leerdoel 5): 'Waar raakten de meesten dan besmet?' | H4 | gedaan; antwoord volgt B1 (#31) |
| Open: niveau-A-bron (leerboek) voor UPGMA (#9); tweede onafhankelijke bron voor de casus | logboek | open |
