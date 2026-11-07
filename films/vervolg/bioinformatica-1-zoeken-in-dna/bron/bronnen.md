# Zoeken in DNA: databanken, BLAST en een beetje Python — bronnenlogboek (concept)

Werkwijze en criteria: `films/BRONNEN.md`. Concept uit de frisse scriptreview; wordt `bron/bronnen.md` zodra de film een bronmap heeft.

| Veld | Waarde |
|---|---|
| Gecontroleerde versie | script_v2 + bouw met eleven_v4-takes (25 okt 2026; statussen bijgewerkt na de frisse beeldreview `reviews/review_beeld.md`) |
| Eerste ronde | Claude (frisse reviewer), 25 okt 2026: 30 beweringen, 22 bronnen zelf geopend (WebFetch); Python-code en uitlijnscore zelf gedraaid |
| Steekproef | nog niet gedaan (zie onderaan) |
| Vakexpert | geen |
| Stand | 22 ✓ · 10 ≈ · 0 ! · 0 ? · 1 n.v.t. |

## Bronnen

Niveau volgens `films/BRONNEN.md`. Alle bronnen op 25 okt 2026 zelf geopend. Waar alleen een samenvatting of persbericht bereikbaar was, staat dat erbij. Niet te openen (allowlist): han.nl-opleidingspagina, NCBI-statistiekpagina's.

| Nr | Niveau | Bron | Link |
|---|---|---|---|
| B1 | A | Sayers e.a. (2025). *GenBank 2025 update.* Nucleic Acids Research 53(D1) (via PMC) | https://pmc.ncbi.nlm.nih.gov/articles/PMC11701615 |
| B2 | A | DDBJ: *INSDC* (de drie leden, vrij toegankelijk) | https://www.ddbj.nig.ac.jp/insdc-e.html |
| B3 | A | NCBI: *International Nucleotide Sequence Database Collaboration* (dagelijkse uitwisseling) | https://ncbi.nlm.nih.gov/genbank/collab |
| B4 | A | Altschul, Gish, Miller, Myers & Lipman (1990). *Basic local alignment search tool.* J Mol Biol 215: 403–410 | https://zhanggroup.org/teaching/literature/BLAST_Altschul_1990.pdf |
| B5 | A | NLM/NCBI-workshop (2022): *How BLAST works* | https://www.nlm.nih.gov/ncbi/workshops/2022-10_Basic-Web-BLAST/how-blast-works.html |
| B6 | B | University of Nebraska Medical Center (INBRE): BLAST-parameterlijst (woordgrootte blastn 11, megablast 28; X-dropoff) | https://www.unmc.edu/inbre/cores/bioinformatics/software/public-resources/BLAST.html |
| B7 | B | ILRI/BecA: *A note on E-values* | https://hpc.ilri.cgiar.org/beca/bioinfo/blast.html |
| B8 | C | Bitesize Bio: *How does BLAST work?* (vakblog; alleen wegwijzer) | https://bitesizebio.com/21223/how-does-blast-work/ |
| B9 | A | iBOL: *What is DNA barcoding?* | https://ibol.org/phase1/about-us/what-is-dna-barcoding/ |
| B10 | A | Ward e.a. (2005). *DNA barcoding Australia's fish species.* Phil Trans R Soc B 360 (samenvatting) | https://www.citedrive.com/en/discovery/dna-barcoding-australias-fish-species/ |
| B11 | A | Lowenstein, Amato & Kolokotronis (2009). *The real maccoyii: identifying tuna sushi with DNA barcodes.* PLoS ONE 4(11): e7866 | https://pmc.ncbi.nlm.nih.gov/articles/PMC2773415 |
| B12 | A | EurekAlert-persbericht over Viñas & Tudela (2009), PLoS ONE 4(10): e7606 (het artikel zelf niet geopend) | https://eurekalert.org/news-releases/468510 |
| B13 | B | Radar (AVROTROS), 17 april 2017: *Slechte voorlichting in restaurants over tonijnsoort* (eigen test, oorsprong) | https://radar.avrotros.nl/artikel/slechte-voorlichting-in-restaurants-over-tonijnsoort-2316 |
| B14 | B | Oceana Europe, 3 nov 2015: *One out of three fish served in Brussels is not what consumers pay for* (DNA-analyse KU Leuven, COI) | https://europe.oceana.org/press-releases/one-out-three-fish-served-brussels-not-what-consumers-pay/ |
| B15 | A | University of Edinburgh, Bio2 lecture 3: alignment-oefening (+2 / −1 / −1) | https://www.inf.ed.ac.uk/teaching/courses/bio2/lectures10/lecture3example.pdf |
| B16 | A | LOVD (Leiden): *INS NM_000207.2 coding DNA reference sequence* | https://databases.lovd.nl/shared/refseq/INS_NM_000207.2_codingDNA.html |
| B17 | A | DDBJ: *The Genetic Codes* (code 2, mitochondriaal bij gewervelden) | https://www.ddbj.nig.ac.jp/ddbj/geneticcode.html |
| B18 | B | Studiekeuze123: *Bio-informatica, HAN* | https://www.studiekeuze123.nl/opleidingen/1636-bio-informatica-han-university-of-applied-sciences-hbo-bachelor |
| B19 | A | HAN: *Bio-informatica 22-23* (studie-informatie, pdf, studiejaar 2022–23) | https://www.han.nl/opleidingen/hbo/bio-informatica/voltijd/praktische-info/Bio-informatica-22-23.pdf |
| B20 | A | WUR: *Master's in Bioinformatics and Systems Biology* | https://www.wur.nl/en/education/master/masters-bioinformatics-and-systems-biology |
| B21 | B | Studiekeuze123: *Biology, Radboud Universiteit* | https://www.studiekeuze123.nl/opleidingen/1472-biology-radboud-universiteit-wo-bachelor |
| B22 | B | Studiekeuze123: *Molecular Life Sciences, Radboud Universiteit* | https://www.studiekeuze123.nl/opleidingen/1364-molecular-life-sciences-radboud-universiteit-wo-bachelor |

Interne bronnen (reeks): `films/dna/4-de-genetische-code-lezen/bron/script.md` (DNA 4), `films/dna/7-dna-lezen/bron/script.md` (DNA 7), `films/dna/5-mutaties/bron/script.md` (DNA 5).

## Beweringen

Waar = hoofdstuk/regel in `script_v1.md` (segmentnummers bestaan nog niet).

| Nr | Waar | Bewering in de film | Bronnen | Status | Toelichting |
|---|---|---|---|---|---|
| 1 | cold open | De DNA-barcode is ongeveer zeshonderdvijftig letters. | B9, B10 | ✓ | 648 (B9), 655 (B10). |
| 2 | H1 | Het is een stuk van één gen in de mitochondriën. | B9, B10 | ✓ | COI. |
| 3 | H1 | Bij de meeste dieren verschilt dat stukje net iets van soort tot soort. | B9, B10 | ✓ | B10: alle 207 vissoorten te onderscheiden; binnen een soort gemiddeld 0,39%, binnen een geslacht 9,93%. |
| 4 | H1 | Onderzoekers over de hele wereld zetten hun sequenties in openbare databanken; iedereen mag erin zoeken, gratis. | B1, B2 | ✓ | "freely available" (B1); "freely accessible without restrictive licensing" (B2). |
| 5 | H1 | De drie grote databanken staan in Amerika, Europa en Japan. | B2, B3 | ✓ | NCBI, EMBL-EBI, DDBJ. |
| 6 | H1 | Ze delen elke dag wat er nieuw is. | B1, B3 | ✓ | "Daily data exchange with the European Nucleotide Archive and the DNA Data Bank of Japan" (B1); B3. Zin aangepast in v2 (was 'alles'). |
| 7 | H1 | Samen miljarden sequenties, van meer dan een half miljoen soorten. | B1 | ≈ | "over 4.7 billion nucleotide sequences for 581 000 formally described species" (B1, eind 2024). Eén oorsprong; groeit snel. |
| 8 | H1 | Bij elke sequentie staat de soort, het gen en wie hem gelezen heeft. | B1 | ≈ | Vereenvoudigd; niet elk record noemt een gen. Tweede bron niet zelf geopend. |
| 9 | H2 | Uitlijnen: twee of meer sequenties onder elkaar, zoveel mogelijk gelijke letters onder elkaar, gaten waar een stukje ontbreekt of extra is. | reeksbrief, B15 | ✓ | v2 zegt 'twee of meer' zoals de reeksdefinitie. |
| 10 | H2 | Eén ontbrekende letter verschuift alles erna; met een gat passen ze weer; zonder gat was het min vier. | eigen som | ✓ | Zelf nagerekend: zonder gat 6 gelijk / 10 anders = −4 als de 17e letter van stukje 2 (zonder partner) niet meetelt; met de eigen gatregel zou dat −5 zijn. Opgelost in beeld (s14): de uitstekende letter staat gestippeld met Meta 'laatste letter telt niet mee'. Met gat 15 / 1 / 1. |
| 11 | H2 | Een ontbrekende letter kan een echte deletie zijn of een leesfout. | DNA 5, DNA 7 | ≈ | Deletie = DNA 5; leesfouten bij sequencen niet in DNA 7 beschreven en geen externe bron geopend. |
| 12 | H2 (beeld) | Micro: twee aparte dubbele strengen; in stukje 1 verdwijnt één heel basenpaar en schuift de rest op. | DNA 5 | ✓ | v2-beeld: heel basenpaar weg (deletie zoals in DNA 5). Schematische ladder, geen helix (vereenvoudigd). |
| 13 | H2 | Score +1 / −1 / −1; 15 − 1 − 1 = 13. | B15, eigen som | ✓ | B15 gebruikt +2/−1/−1 als ander lesvoorbeeld. 13 is ook het optimum voor dit paar (zelf berekend, Needleman–Wunsch). |
| 14 | H2 | Echte programma's geven andere punten. | B4 | ✓ | BLAST DNA: +5 / −4. Eén bron, maar de oorsprong. |
| 15 | H3 | BLAST knipt de barcode in woordjes van achtentwintig letters. | B4, B6 | ✓ | megablast 28 (B6, standaard op de NCBI-website); blastn 11; B4 (1990) noemde 12. |
| 16 | H3 | Dan zoekt het waar precies zo'n woordje voorkomt. Zo'n lang woordje vind je bijna nooit toevallig. Aan bijna alle sequenties begint BLAST dus niet eens. | B1, B4, B5 | ≈ | B5: "scans the database for word matches"; B4: alleen segmentparen met een woordtreffer worden uitgebreid. Nuance: BLAST leest wel alle sequenties door op woordjes; het slaat alleen het uitlijnen over. 'Begint niet eens' = niet aan uitlijnen; kan in de vertelling klinken als 'niet eens lezen'. Kan zo blijven. Eigen som: 4²⁸ mogelijke woordjes tegen ± 3,4·10¹³ basen → bijna nul toevalstreffers (bij 11 letters miljoenen). |
| 17 | H3 | Op die plekken lijnt BLAST verder uit, naar links en rechts, zolang de score goed blijft. | B4, B5, B6 | ✓ | Stopt "when we reach a word pair whose score falls a certain distance below" het beste (B4); X-dropoff (B6). |
| 18 | H3 | BLAST geeft vaak al na korte tijd antwoord. | B4, B8 | ≈ | Geen A-bron voor de huidige snelheid; v2 noemt daarom geen tijdsduur meer ('vaak al na korte tijd'; hoofdstukkaart 'snel'). |
| 19 | H3 | Tonijnsoorten verschillen in deze barcode maar in weinig letters. | B11, B12 | ✓ | Geelvin–Pacifische blauwvin K2P 0,0077 (± 5 letters op 650); geen 'gat' tussen verschillen binnen en tussen soorten (B11); tonijn bepalen is "highly complex" (B12). |
| 20 | H3 | Naast elke treffer staat hoeveel zulke treffers je puur door toeval zou vinden. | B5, B7 | ✓ | "E = number of database hits you expect to find by chance" (B5); B7. Eindkaart zegt nu ook 'hoeveel treffers je door toeval zou vinden' (geen 'kans'). |
| 21 | H3 | Bij alle drie is dat bijna nul: het is dus zeker tonijn; welke tonijn zie je aan het procent gelijk. | B5, B7, B11 | ✓ | Het lage toevalsgetal geldt voor alle drie de tonijnen (B11: tonijnen lijken sterk op elkaar); de soort volgt uit procent gelijk. Percentages in beeld (100 / 99,4 / 99,2 %) zijn een voorbeeld, passend bij K2P 0,0077 tussen geel- en blauwvin (B11). |
| 22 | H3 | Een databank is zo goed als wat mensen erin zetten; een vis onder de verkeerde naam geeft een verkeerde treffer; bij tonijn kijkt een lab soms ook naar een tweede stukje DNA. | B11, B12 | ✓ | B11: een GenBank-referentie was "either mislabeled, misidentified or" hybride; BOLD gaf 100% match voor vier soorten; Paine e.a. combineerden cox1 met ITS. B12: twee merkers (mitochondriaal + kern) "enables full discrimination between all eight tuna species". |
| 23 | H4 | Het begin van het menselijke insulinegen: ATG GCC CTG TGG ATG CGC → M A L W M R; M is methionine, daarna alanine, leucine, tryptofaan. | B16, DNA 4 | ✓ | Zelf gedraaid met de standaardcode: MALWMR. B16: c.1–c.18. |
| 24 | H4 | (v1) In een databank staat een gen als DNA; de computer zet T om in U. | — | n.v.t. | Weggelaten in v2: Kim geeft het mRNA zelf. |
| 25 | H4 | Eén letter te laat beginnen geeft verkeerde aminozuren (WPCGCA). | eigen run | ✓ | Zelf gedraaid: WPCGCA. |
| 26 | H4 | Het mRNA voor insuline, het recept zonder introns; het deel dat codeert is ruim driehonderd letters; dezelfde regels werken voor elke lengte. | B16, DNA 4 | ✓ | B16: c.1–c.333, stop TAG c.331–333, intron tussen c.187 en c.188, eiwit 110 aminozuren; eerste 18 = ATGGCCCTGTGGATGCGC. Code zelf gedraaid (MALWMR; volledige tabel met stopcodons in de bouw). |
| 27 | recap | In 2017 liet het tv-programma Radar tonijn testen in eenentwintig Nederlandse restaurants. Twintig keer was het geelvintonijn, ook als het restaurant blauwvin zei. | B13, B14 | ≈ | B13: "in 20 gevallen … geelvintonijn"; restaurants zeiden o.a. blauwvin; "In al deze gevallen bleek het dus geelvintonijn". Toegeschreven aan Radar, mag op die ene bron rusten; B14 (Brussel 2015) is een vergelijkbare, onafhankelijke bevinding. |
| 28 | recap | Blauwvintonijn is duurder dan geelvin. | B13, B14 | ✓ | "betaal je flink" (B13); geelvin en grootoog als "cheaper tropical tuna" (B14). |
| 29 | recap | Hbo Bio-informatica in Nijmegen, vier jaar; programmeren al in het eerste jaar. | B18, B19 | ≈ | 240 EC in Nijmegen (B18) = vier jaar. Python 1 en 2 in jaar 1 staat in de studiegids 2022–23 (B19); de huidige han.nl kon ik niet openen. Nakijken voor 2026–27. |
| 30 | recap | Of eerst een bachelor biologie of moleculaire levenswetenschappen in Nijmegen, dan de master Bioinformatics in Wageningen; werk in ziekenhuis, onderzoeksinstituut of bedrijf. | B18, B20, B21, B22 | ≈ | Beide bachelors bestaan in Nijmegen (180 EC, Engelstalig). WUR noemt een Nederlandse BSc Biologie en een MLS-bachelor van een vergelijkbare universiteit; de commissie kijkt per persoon. Volledige naam: *Bioinformatics and Systems Biology*, twee jaar, Engels (B20). Werkvelden: B18, B20. |

Niet in het script, wel gecontroleerd: de barcode zelf vertaal je niet met de standaardcode (B17: in code 2 is UGA tryptofaan). Dat is de juiste reden om in H4 insuline te gebruiken.

## Aanpassingen

Verwerkt in `script_v2.md` (25 okt 2026, door de schrijver na de review).

| Wat | Waar | Stand |
|---|---|---|
| Woordjes van 28 letters; 'zo'n lang woordje vind je bijna nooit toevallig; aan bijna alle sequenties begint BLAST niet eens' (bewering 16, 15) | H3 | gedaan |
| 'het begin van het mRNA voor insuline, het recept zonder introns'; 'het deel dat codeert: ruim driehonderd'; 'duizend recepten'; eindkaart 'elk recept'; volledige tabel met stopcodons in de bouw (bewering 26) | H4, eindkaart | gedaan |
| T → U-zin weggelaten; Kim geeft het mRNA (bewering 24) | H4 | gedaan (anders dan het reviewvoorstel: weglaten, op aanwijzing van de hoofdsessie) |
| Code in beeld is geldige Python (negen codons, geen '...'); zelf gedraaid: MALWMR, te late start WPCGCA (review E13) | H4 beeld | gedaan |
| Micro: twee aparte dubbele strengen, heel basenpaar weg (bewering 12) | H2 beeld | gedaan |
| 'Bij alle drie is dat bijna nul. Het is dus zeker tonijn. Welke tonijn, zie je aan het procent gelijk'; eindkaart 'hoeveel treffers je door toeval zou vinden' (bewering 20, 21) | H3, eindkaart | gedaan |
| 'twee of meer sequenties' (bewering 9) | H2 | gedaan |
| Radar-zin 'ook als het restaurant blauwvin zei' (bewering 27) | recap | gedaan |
| Hoofdstukkaart 'snel'; vertelling 'vaak al na korte tijd' zonder tijdsduur (bewering 18, `?`) | H3 | gedaan (voorzichtig gemaakt) |
| 'Ze delen elke dag wat er nieuw is' (bewering 6) | H1 | gedaan |
| Nieuwe vraag voor leerdoel 4 ('Is Sam nu klaar?') + 'tweede stukje DNA' bij tonijn (review D1, E6) | H3 | gedaan |
| Opleidingszin (bewering 29, 30) | recap | ongewijzigd; voor de hoofdsessie. Beeld s33: twee aparte kaartjes 'bachelor Biology' of 'bachelor Molecular Life Sciences' (beeldreview MOET 7) |
| s14 'zonder gat min vier': in beeld de 17e letter van stukje 2 gestippeld, 'laatste letter telt niet mee' (bewering 10; beeldreview MOET 3) | H2 beeld | gedaan, niet opnieuw ingesproken |
| Percentages resultatenlijst 99,4 / 99,2 % (was 99 / 98) (bewering 21; beeldreview KAN 13) | H3 beeld | gedaan |

## Menselijke controle

Steekproef door Kamiel: open de bron, zoek de bewering op de pagina, zet een vinkje en de datum. Altijd alle `!` en `≈`.

| Bewering | Bron | Gecontroleerd door | Datum |
|---|---|---|---|
| 16 | B4, B5 | | |
| 26 | B16 | | |
| 27 | B13 | | |
| 30 | B20 | | |
