# Op maat gekopieerd — bronnenlogboek

Werkwijze en criteria: `films/BRONNEN.md`.

| Veld | Waarde |
|---|---|
| Gecontroleerde versie | 2.0 (beeld-remake, tekst en take gelijk aan 1.0), 31 okt 2026 |
| Eerste ronde | Claude, 31 okt 2026: 15 beweringen, 9 bronnen zelf geopend |
| Steekproef | nog niet gedaan |
| Vakexpert | geen |
| Stand | 7 ✓ · 8 ≈ · 0 ! · 0 ? |

## Bronnen
Alle bronnen op 31 okt 2026 zelf geopend. Niet bereikbaar vanuit deze sessie: openstax.org, ncbi.nlm.nih.gov/books, medlineplus.gov, ensembl.org (niet op de lijst), pmc/pubmed (browsercheck), strbase-archive.nist.gov (stuurt door naar de startpagina).

| Nr | Niveau | Bron | Link |
|---|---|---|---|
| B1 | A | O'Connor, *Investigations in Molecular Cell Biology* (LibreTexts) § 7.1 PCR overview: primers 18–25 basen; 94 / 55 / 72 °C; Taq uit een bacterie uit de hete bronnen van Yellowstone, werkt best bij 70–75 °C, verdraagt > 90 °C; eerste cyclus: producten met een vast begin en een open 3′-uiteinde; strengen van de bedoelde lengte vanaf cyclus 2, exponentieel vanaf cyclus 3; 2¹⁰ = 1024; afvlakking door uitputting en het langzaam denatureren van Taq | https://bio.libretexts.org/Bookshelves/Cell_and_Molecular_Biology/Investigations_in_Molecular_Cell_Biology_(O'Connor)/07%3A_Yeast_colony_PCR/7.01%3A_Polymerase_chain_reaction_overview |
| B2 | A | LibreTexts Chemistry § 28.9 (naar OpenStax Organic Chemistry) The Polymerase Chain Reaction: 94–98 °C, 50–65 °C, 72 °C; Taq uit een organisme uit hete bronnen; elke cyclus verdubbelt; na 30 cycli meer dan een miljard kopieën | https://chem.libretexts.org/Courses/can/org/28%3A_Biomolecules_-_Nucleic_Acids/28.9%3A_The_Polymerase_Chain_Reaction |
| B3 | A | American Society for Microbiology, *Polymerase Chain Reaction Protocol*: primers ± 20 nt (17–22); 92–98 °C, 72 °C; Taq wordt bij de denaturatie niet gedenatureerd; buffer met 1,5 mM MgCl₂ (Mg²⁺ nodig); altijd positieve en negatieve controle; vals-positief door besmetting | https://asm.org/asm/media/protocol-images/polymerase-chain-reaction-protocol.pdf?ext=.pdf |
| B4 | A | Gevertz e.a. / Universiteit van Galway, *The impact of the PCR plateau phase on quantitative PCR* (samenvatting): plateau door concurrentie tussen het weer aan elkaar binden van product en het binden van primers | https://research.universityofgalway.ie/en/publications/the-impact-of-the-pcr-plateau-phase-on-quantitative-pcr-4/ |
| B5 | B | gene-quantification.com over Kainz 2000 (*The PCR plateau phase – towards an understanding of its limitations*): polymerase raakt bezet door het product; 30× molaire overmaat product t.o.v. polymerase remt volledig; extra polymerase herstelt de reactie | https://www.gene-quantification.com/block.html |
| B6 | B | ATCC, productblad VWF (vWA): gen op chromosoom 12 (12p13.3–p13.2); polymorfe TCTA-herhaling in intron 40 | https://www.atcc.org/products/73141 |
| B7 | A | Pagotto e.a. 1999, *Int J Legal Med*: drie tetramere STR's in intron 40 van het von Willebrand-factorgen (vWA, vWF1, vWF2) | https://link.springer.com/article/10.1007/s004140050261 |
| B8 | A | Scherer e.a. 2006, *Nature* (Scitable): de afgewerkte sequentie van chromosoom 12 beslaat ± 132 megabasen | https://www.nature.com/scitable/content/The-finished-DNA-sequence-of-human-chromosome-13938 |
| B9 | B | miniPCR, *Forensics student guide*: STR's = korte herhaalde stukjes, aantal herhalingen verschilt per persoon; twee kopieën, één van elke ouder; korte stukken komen verder in de gel; meerdere STR's vergelijken voor een profiel | https://www.minipcr.com/wp-content/uploads/KT150401_miniPCR_electrophoresis_forensics_student_guide_V1.1_032722.pdf |

## Beweringen
| Nr | Waar | Bewering in de film | Bronnen | Status | Toelichting |
|---|---|---|---|---|---|
| 1 | s02 | vWA ligt op chromosoom 12 | B6, B7 | ≈ | B6 noemt 12p13; B7 alleen intron 40 van VWF (dat gen ligt op 12p13) |
| 2 | s02 | chromosoom 12 is honderdduizenden keren langer dan het product (± 133 miljoen bp in beeld) | B8 | ≈ | 132 Mb (afgewerkte sequentie) / 172 bp ≈ 770.000×; '133' volgt de volledige T2T-lengte (Wikipedia, niveau C, telt niet) |
| 3 | s05 | STR: korte herhaling van vier basen (TCTA), aantal verschilt per persoon | B6, B9 | ≈ | B6 (TCTA in vWA), B9 algemeen; geen tweede niveau A geopend |
| 4 | s06 | primers ± 20 nucleotiden, enkelstrengs, één plek | B1, B3 | ✓ | |
| 5 | s07 | Taq komt uit een bacterie uit hete bronnen | B1, B2 | ✓ | |
| 6 | s07 | buffer levert magnesium | B3 | ≈ | één bron (A); in beeld Mg²⁺ |
| 7 | s09b | polymerase kan alleen verlengen; primers bepalen het begin | B1, B3 | ✓ | |
| 8 | s10–s15 | 95 / 55–60 / 72 °C | B1, B2, B3 | ✓ | |
| 9 | s13 | DNA-strengen blijven heel bij 95 °C; Taq overleeft de hitte | B3, B1 | ✓ | |
| 10 | s18–s25 | eerste kopieën met open 3′-uiteinde (lange producten); strengen op maat in cyclus 2; 2 van de 8 moleculen na cyclus 3 | B1 + rekenmodel | ✓ | B1: bedoelde lengte vanaf cyclus 2, exponentieel vanaf cyclus 3; 2 van 8 volgt uit het model |
| 11 | s28–s29 | 2 lange producten per cyclus (60 na 30); 2¹⁰ ≈ duizend; 2³⁰ ruim een miljard | B1, B2 + rekenmodel | ✓ | |
| 12 | s31 | plateau: polymerase krijgt te veel templates, strengen op maat binden weer aan elkaar | B4, B5 | ≈ | beide oorzaken hebben een bron; de literatuur is het niet eens over de hoofdoorzaak (B1 noemt uitputting en Taq-verval). Op de vragenlijst, geen fout |
| 13 | s32–s35 | negatieve controle: water i.p.v. DNA; band = besmetting | B3 | ≈ | één bron (A) |
| 14 | s40 | twee allelen per STR, van vader en moeder | B9 | ≈ | B9 (B); in het practicum en in DNA-reeksfilms al zo |
| 15 | s37, s40 | korter product komt verder in de gel | B9 | ≈ | één bron (B) in dit logboek; uitgebreid onderbouwd in film 2 (Op lengte gesorteerd, bronnen B1–B2 daar) |

Getallen van de schoolkit (108 + 4 × n, 172/164 bp, allelen van Sp en B) komen uit het practicum `tools/dna-profielen/` en zijn een vereenvoudigd model; dat staat in het docentdeel.

## Aanpassingen
Geen: de tekst blijft (beeld-remake). Geen `!` gevonden.

## Menselijke controle
Nog niet gedaan.
