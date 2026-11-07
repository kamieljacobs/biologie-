# De genetische code lezen — bronnenlogboek

Werkwijze en criteria: `films/BRONNEN.md`.

| Veld | Waarde |
|---|---|
| Gecontroleerde versie | 1.1 (12 okt 2026), aanpassingen in 1.2 (27 okt 2026) |
| Eerste ronde | Claude, 27 okt 2026: 24 beweringen (23 + checkvraag 4), 15 bronnen geopend (opwaardering naar prompt v10) |
| Steekproef | nog niet gedaan (zie onderaan) |
| Vakexpert | geen |
| Stand | 10 ✓ · 10 ≈ · 0 ! · 4 ? |

## Bronnen

Niveau volgens `films/BRONNEN.md`. Alle bronnen zijn op 27 okt 2026 zelf geopend; waar alleen een samenvatting bereikbaar was, staat dat erbij. NCBI Bookshelf (Alberts, Berg) was vanuit de sessie niet bereikbaar (browsercontrole) en telt daarom niet mee, ook al staat Alberts in de footer van de film.

| Nr | Niveau | Bron | Link |
|---|---|---|---|
| B1 | A | Sadava e.a., *Life: The Science of Biology*, 11e druk (Macmillan), hoofdstuk 14: *Each tRNA is specifically attached to an amino acid* (één enzym per aminozuur en zijn tRNA; experiment waarin cysteïne op het tRNA in alanine werd omgezet: alanine kwam op de cysteïneplekken) | https://digfir-published.macmillanusa.com/life11e/life11e_ch14_22.html |
| B2 | A | *Aminoacyl-tRNA synthesis*, Annual Review of Biochemistry 69: 617 (2000) (alleen de samenvatting geopend: aminoacyl-tRNA-synthetasen koppelen het aminozuur aan het tRNA met het passende anticodon; proeflezen) | https://www.annualreviews.org/doi/10.1146/annurev.biochem.69.1.617 |
| B3 | A | Nissen, Hansen, Ban, Moore & Steitz (2000). *The structural basis of ribosome activity in peptide bond synthesis.* Science 289: 920–930 (samenvatting via RCSB PDB 1FFZ: geen eiwit binnen ±18 Å van de peptidebinding; ‘the ribosome is a ribozyme’) | https://rcsb.org/structure/1FFZ |
| B4 | A | RCSB PDB-101: *Molecular Models: Exploring the Structure of tRNA* (tRNA vertaalt de code; aminozuur op de acceptorarm, anticodonlus herkent het codon; klaverblad en L-vorm uit één suiker-fosfaatketen) | https://pdb101.rcsb.org/learn/paper-models/trna-activity-page |
| B5 | B | OpenStax *Biology* via Lumen Learning: *Reading codons* (UAA, UAG, UGA stop; AUG start en methionine; meer codons per aminozuur; code vrijwel universeel; codontabel) | https://courses.lumenlearning.com/wm-nmbiology1/chapter/reading-codons/ |
| B6 | B | Kimball, *Biology* (LibreTexts) 6.04: *The Translation of RNA into Proteins* (20 aminoacyl-tRNA-synthetasen, één per aminozuur; ribosoom leest 5′→3′; AUG start; drie stopcodons; codontabel) | https://bio.libretexts.org/Bookshelves/Introductory_and_General_Biology/Biology_(Kimball)/06%3A_Gene_Expression/6.04%3A_The_Translation_of_RNA_into_Proteins |
| B7 | A | Riggs, A.D. (2021). *Making, Cloning, and the Expression of Human Insulin Genes in Bacteria: The Path to Humulin.* Endocrine Reviews 42(3): 374–380 (synthetische genen voor de A- en B-keten in *E. coli*, 1979; Humulin goedgekeurd okt 1982; ketens buiten de bacterie gekoppeld) | https://academic.oup.com/edrv/article/42/3/374/6042201 |
| B8 | A | National Science Foundation: *rDNA insulin* (menselijk insulinegen in bacteriën, product identiek aan menselijke insuline; 1982 Humulin) | https://nsf.gov/impacts/rdna-insulin |
| B9 | B | Gezondheid en Wetenschap (Cebam): *Insulinebehandeling bij diabetes* (type 1: vanaf de diagnose insuline, meestal meerdere keren per dag; type 2 soms; met een insulinepen onder de huid van buik of dij) | https://www.gezondheidenwetenschap.be/richtlijnen/insulinebehandeling-bij-diabetes |
| B10 | B | St. Antonius Ziekenhuis: patiëntenfolder *Insuline spuiten* (pen; in buik, been of bil; kortwerkend drie keer per dag, langwerkend één keer) | https://antoniusziekenhuis.nl/insuline-spuiten/pdf_download |
| B11 | A | CvTE, centraal examen biologie havo 2025-I, vraag 39 en correctievoorschrift (antwoord B) | `examenatlas/img/havo/2025-I/39a.webp`, `a39a.webp` |
| B12 | A | CvTE, centraal examen biologie havo 2024-II, vraag 18 en correctievoorschrift (antwoord C) | `examenatlas/img/havo/2024-II/18a.webp`, `a18a.webp` |
| B13 | A | CvTE, centraal examen biologie havo 2022-II, vraag 32 en correctievoorschrift (antwoord C) | `examenatlas/img/havo/2022-II/32a.webp`, `a32a.webp` |
| B14 | A | *Archaeal aminoacyl-tRNA synthetases interact with the ribosome to recycle tRNAs*, Nucleic Acids Research (ETH Research Collection; samenvatting: gedeacyleerde tRNA's worden opnieuw geladen en hergebruikt) | https://www.research-collection.ethz.ch/handle/20.500.11850/84809 |
| B15 | B | Carr, S.M. (Memorial University of Newfoundland): *Colinearity* (mRNA complementair aan de matrijsstreng; zelfde volgorde als de niet-matrijsstreng met U voor T, zelfde 5′→3′-richting) | https://mun.ca/biology/scarr/Colinearity.html |

Daarnaast is de codontabel in de film (`CODE` in de HTML) met een script vergeleken met de standaard genetische code (64 codons, alle juist).

## Beweringen

| Nr | Waar | Bewering in de film | Bronnen | Status | Toelichting |
|---|---|---|---|---|---|
| 1 | n0 | Mensen met diabetes spuiten elke dag insuline. | B9, B10 | ≈ | Geldt voor type 1 altijd (meestal meerdere keren per dag), voor type 2 alleen als tabletten niet genoeg zijn; sommige mensen gebruiken een pomp. Geen niveau-A-bron geopend. |
| 2 | n0 | Bacteriën maken menselijke insuline, in grote tanks. | B7, B8 | ≈ | Bacteriën ✓ (sinds 1982); tegenwoordig ook gist (docentdeel noemt dat). ‘Grote tanks’ (fermentatie) staat niet letterlijk in B7/B8. |
| 3 | n0 | Onderzoekers zetten de code van het menselijke insulinegen in bacteriën; de bacterie maakt dezelfde keten van aminozuren. | B7, B8 | ✓ | B7: de eerste genen waren synthetisch, ontworpen uit de aminozuurvolgorde; de ketens werden daarna buiten de bacterie gekoppeld (staat in het docentdeel). |
| 4 | n3 | Een codon is een rijtje van drie nucleotiden. | B5, B6 | ≈ | Klopt; alleen niveau-B-bronnen geopend. |
| 5 | n5 | tRNA is ook RNA; het brengt aminozuren naar het ribosoom (werktuig, geen recept). | B1, B4 | ✓ | Nieuw beeld in 1.2: één RNA-streng die zich tot een klaverblad vouwt (B4). |
| 6 | n5 | Aan de ene kant drie basen die op één codon passen, aan de andere kant één soort aminozuur. | B1, B4 | ✓ | Aminozuur aan de acceptorarm (B4). |
| 7 | n5 | Welk aminozuur erbij hoort, hangt af van de drie basen; bij C A C hoort altijd valine. | B5, B6, B1 | ✓ | Anticodon 3′-CAC-5′ past op codon 5′-GUG-3′ = valine (codontabel). |
| 8 | n5 | Het tRNA blijft alleen hangen als zijn drie basen op het codon passen. | B1, B4 | ✓ | |
| 9 | n5 | Het lege tRNA laat los en haalt een nieuw aminozuur; de cel gebruikt elk tRNA steeds opnieuw. | B14 | ? | Eén bron geopend (A, samenvatting). Standaardleerstof; tweede bron nog openen. |
| 10 | n6 | De drie basen heten samen het anticodon; het anticodon is complementair aan het codon. | B4, B1 | ✓ | |
| 11 | n6 | Enzymen koppelen elk tRNA aan het juiste aminozuur; voor elk aminozuur is er zo'n enzym. | B1, B6, B2 | ≈ | Klopt voor mens en *E. coli* (20 synthetasen). Sommige bacteriën en archeeën missen er een paar en laden via een omweg (B2 gaat daarover); voor het examen niet nodig. |
| 12 | n6 | Het ribosoom controleert alleen of het anticodon past, niet het aminozuur; een verkeerd aminozuur komt gewoon in het eiwit. | B1 | ? | B1 beschrijft het klassieke experiment (cysteïne op het tRNA omgezet in alanine → alanine op cysteïneplekken). Tweede onafhankelijke bron nog openen. |
| 13 | n6 | Het ribosoom bestaat voor een groot deel uit RNA; juist dat RNA koppelt de aminozuren. | B3 | ? | B3 (A) bevestigt het: geen eiwit bij de plek waar de peptidebinding ontstaat. Tweede bron nog openen. |
| 14 | n8 | Codontabel: eerste, tweede, derde base; G U G is valine. | B5, B6 | ≈ | Klopt (tabel in de film met script nagelopen); alleen niveau-B-bronnen geopend. |
| 15 | n10 | Je begint bij het startcodon A U G (methionine); stopcodons U A A, U A G, U G A, zonder aminozuur. | B5, B6 | ≈ | Twee niveau-B-bronnen; ‘altijd bij AUG beginnen’ is de schoolregel (het ribosoom zoekt de eerste AUG in de juiste context). |
| 16 | n10 | 100 aminozuren = 300 nucleotiden; met stopcodon minstens 303. | B5, B6 | ≈ | Rekensom op de vorige bewering (alleen niveau B geopend); ‘minstens’ omdat het mRNA ook stukken vóór en na het coderende deel heeft. |
| 17 | n12, q13, n14 | Bij transcriptie komt tegenover A in het mRNA een U; T A C A A A → A U G U U U → methionine, fenylalanine. | B15, B6, B5 | ≈ | Klopt; alleen niveau-B-bronnen geopend. |
| 18 | n15 | Alleen de matrijsstreng wordt afgelezen; de coderende streng heeft de volgorde van het mRNA met T; mRNA lees je van 5′ naar 3′. | B15, B6 | ≈ | Klopt; alleen niveau-B-bronnen geopend. |
| 19 | n17–n19 | CE havo 2025-I: leucine werd histidine door één base; de tweede base (U → A in C U U/C U C → C A U/C A C). | B11, B5 | ✓ | Vraag en correctievoorschrift (B) zelf ingezien. Film zegt ‘ongevoelig voor een medicijn’, het examen ‘resistent tegen azolen’. |
| 20 | n21 | CE havo 2024-II: cysteïne werd serine; een G werd een C (U G U/U G C → U C U/U C C); ook U → A (A G U) kan, stond niet bij de keuzes. | B12, B5 | ✓ | Correctievoorschrift: C. Ook U G C → A G C is één base; de film noemt alleen A G U, niet fout. |
| 21 | n21 | Bij valine maakt de derde base niets uit. | B5, B6 | ≈ | G U U, G U C, G U A, G U G; alleen niveau-B-bronnen geopend. |
| 22 | n23 | De tRNA's van de bacterie gebruiken bijna precies dezelfde code als die in jouw cellen; daarom krijgt het eiwit dezelfde aminozuurvolgorde. | B5, B8, B7 | ✓ | ‘Bijna’: er zijn enkele uitzonderingen (o.a. mitochondriën). |
| 23 | n24 | De onderzoekers gaven de bacterie een versie van het gen zonder introns; een bacterie kan geen introns wegknippen. | B7 | ? | B7: de eerste insulinegenen waren synthetisch (dus zonder introns). Dat bacteriën geen spliceosoom hebben, is nog niet met een geopende bron bevestigd. |
| — | checkvraag 4 | CE havo 2022-II: serine in plaats van leucine → oorspronkelijk codon U U A of U U G. | B13, B5 | ✓ | Correctievoorschrift: C. |

## Aanpassingen

| Wat | Waar | Stand |
|---|---|---|
| ‘Eigen uitwerking; correctievoorschrift niet ingezien’ vervangen door: klopt met het correctievoorschrift (B, C, C) | checkvraag 4 en docentdeel ‘Vereenvoudigingen en verantwoording’ | gedaan in 1.2 |
| Label ‘± 16 cm’ bij de insulinepen niet geplaatst: lengte van een pen niet in een geopende bron gevonden | n0 (beeld) | gedaan in 1.2 |
| Beweringen 9, 12, 13, 23: tweede bron openen (bv. Alberts op NCBI Bookshelf, Campbell) | n5, n6, n24 | open |

Geen `!` gevonden: de gesproken tekst hoeft niet opnieuw ingesproken te worden.

## Menselijke controle

Steekproef door Kamiel: open de bron, zoek de bewering op de pagina, zet een vinkje en de datum.

| Bewering | Bron | Gecontroleerd door | Datum |
|---|---|---|---|
| 12 | B1 | | |
| 19 | B11 | | |
| 20 | B12 | | |
| 1 | B9 | | |
