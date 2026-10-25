# Zoeken in DNA: databanken, BLAST en een beetje Python — bronnenlogboek (concept)

Werkwijze en criteria: `films/BRONNEN.md`. Concept uit de frisse scriptreview; wordt `bron/bronnen.md` zodra de film een bronmap heeft.

| Veld | Waarde |
|---|---|
| Gecontroleerde versie | script_v1 (25 okt 2026) |
| Eerste ronde | Claude (frisse reviewer), 25 okt 2026: 30 beweringen, 22 bronnen zelf geopend (WebFetch); Python-code en uitlijnscore zelf gedraaid |
| Steekproef | nog niet gedaan (zie onderaan) |
| Vakexpert | geen |
| Stand | 14 ✓ · 9 ≈ · 6 ! · 1 ? |

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
| 6 | H1 | Ze wisselen elke dag alles uit. | B1, B3 | ≈ | De bronnen zeggen 'dagelijks uitwisselen', niet 'alles'. Voorstel: 'hun nieuwe sequenties' (review E10). |
| 7 | H1 | Samen miljarden sequenties, van meer dan een half miljoen soorten. | B1 | ≈ | 4,7 miljard sequenties, 581 000 beschreven soorten (eind 2024). Alleen GenBank zelf (de oorsprong); groeit snel. |
| 8 | H1 | Bij elke sequentie staat de soort, het gen en wie hem gelezen heeft. | B1 | ≈ | Vereenvoudigd; niet elk record noemt een gen. Tweede bron niet zelf geopend. |
| 9 | H2 | Uitlijnen: zoveel mogelijk gelijke letters onder elkaar, gaten waar een stukje ontbreekt of extra is. | reeksbrief, B15 | ! | Inhoud klopt, maar het script zegt 'twee sequenties'; de reeksdefinitie zegt 'twee of meer' (review L2). |
| 10 | H2 | Eén ontbrekende letter verschuift alles erna; met een gat passen ze weer. | eigen som | ✓ | Zelf nagerekend: zonder gat 6 gelijk / 10 anders; met gat 15 / 1 / 1. |
| 11 | H2 | Een ontbrekende letter kan een echte deletie zijn of een leesfout. | DNA 5, DNA 7 | ≈ | Deletie = DNA 5; leesfouten bij sequencen niet in DNA 7 beschreven en geen externe bron geopend. |
| 12 | H2 (beeld) | Micro: dubbele streng waarin tegenover één base niets zit, als beeld van het gat. | DNA 5 | ! | Een deletie haalt een heel basenpaar weg, niet één base uit één streng (review E4). |
| 13 | H2 | Score +1 / −1 / −1; 15 − 1 − 1 = 13. | B15, eigen som | ✓ | B15 gebruikt +2/−1/−1 als ander lesvoorbeeld. 13 is ook het optimum voor dit paar (zelf berekend, Needleman–Wunsch). |
| 14 | H2 | Echte programma's geven andere punten. | B4 | ✓ | BLAST DNA: +5 / −4. Eén bron, maar de oorsprong. |
| 15 | H3 | BLAST knipt de barcode in korte woordjes, bijvoorbeeld van elf letters. | B4, B6 | ≈ | blastn 11, megablast 28 (B6); B4 (1990) noemde 12. |
| 16 | H3 | Dan zoekt het waar precies zo'n woordje voorkomt. Dat zijn maar een paar plekken. Bijna alle andere sequenties slaat het over. | B1, B4, B5 | ! | Bij elf letters: 4¹¹ ≈ 4,2 miljoen woordjes tegen ± 3,4·10¹³ basen (B1), dus ± 8 miljoen toevalsplekken per woordje (eigen som). Bij 28 klopt 'bijna nooit toevallig'. BLAST leest de databank wel door ("scan the database", B4, B5) en slaat het uitlijnen over (review E1). |
| 17 | H3 | Op die plekken lijnt BLAST verder uit, naar links en rechts, zolang de score goed blijft. | B4, B5, B6 | ✓ | "falls a certain distance below the best score" (B4); X-dropoff (B6). |
| 18 | H3 | BLAST heeft vaak binnen een paar minuten antwoord, soms in seconden. | B8 | ? | Alleen een C-bron (vakblog); B4 noemt een test van 1990. Geen A-bron voor de huidige snelheid. Hoofdstukkaart 'in seconden' is stelliger dan de tekst (review E9). |
| 19 | H3 | Tonijnsoorten verschillen in deze barcode maar in weinig letters. | B11, B12 | ✓ | Geelvin–Pacifische blauwvin K2P 0,0077 (± 5 letters op 650); geen 'gat' tussen verschillen binnen en tussen soorten (B11); tonijn bepalen is "highly complex" (B12). |
| 20 | H3 | Naast elke treffer staat hoeveel zulke treffers je puur door toeval zou vinden. | B5, B7 | ✓ | Definitie E-waarde. Eindkaart 'kans op toeval' is onjuist: een E-waarde is een verwacht aantal, geen kans (review E5). |
| 21 | H3 | 'Hier is dat bijna nul.' → 'Geelvin!' | B5, B7, B11 | ! | Het lage toevalsgetal geldt voor alle drie de tonijnen; het wijst de soort niet aan. Voorstel in review E5. |
| 22 | H3 | Een databank is zo goed als wat mensen erin zetten; een vis onder de verkeerde naam geeft een verkeerde treffer. | B11 | ≈ | B11: een grootoogreferentie in GenBank was "mislabeled, misidentified or" hybride; BOLD gaf voor geelvin 100% bij vier soorten. Eén A-bron; tweede bron nog zoeken. |
| 23 | H4 | Het begin van het menselijke insulinegen: ATG GCC CTG TGG ATG CGC → M A L W M R; M is methionine, daarna alanine, leucine, tryptofaan. | B16, DNA 4 | ✓ | Zelf gedraaid met de standaardcode: MALWMR. B16: c.1–c.18. |
| 24 | H4 | In een databank staat een gen als DNA, met T in plaats van U; dus zet de computer elke T om in een U. | B16, DNA 4 | ! | Klopt alleen voor de coderende streng. DNA 4 leert havo (n12–n14) complementair overschrijven; alleen vwo (n15) krijgt de coderende streng (review E3). |
| 25 | H4 | Eén letter te laat beginnen geeft verkeerde aminozuren (WPCGCA). | eigen run | ✓ | Zelf gedraaid: WPCGCA. |
| 26 | H4 | Het echte insulinegen is veel langer; dezelfde regels werken voor elke lengte; zo vertaal je duizend genen. | B16, B17, DNA 4, DNA 7 | ! | Het gen heeft een intron in het coderende deel (B16, tussen c.187 en c.188); de code werkt alleen bij lengtes deelbaar door drie en met de standaardcode (B17: mitochondriaal UGA = Trp). Coderend deel: 333 letters met stopcodon (B16). Voorstel: 'recept zonder introns' (review E2). |
| 27 | recap | In 2017 lieten journalisten tonijn testen in eenentwintig Nederlandse restaurants. Twintig keer was het geelvintonijn. | B13, B14 | ≈ | B13 is de oorsprong (21 restaurants, 20× geelvin, 1× witte tonijn, maar 5 gaven goede informatie; soms zei het restaurant 'blauwvin'). B14 (Brussel 2015, 95% van 'blauwvin' was grootoog of geelvin) is een onafhankelijke, vergelijkbare bevinding, geen bevestiging van het getal. Zonder 'ook als ze blauwvin zeiden' mist de zin zijn punt (review E8). |
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
| Opleidingszin (bewering 29, 30) | recap | ongewijzigd; voor de hoofdsessie |

## Menselijke controle

Steekproef door Kamiel: open de bron, zoek de bewering op de pagina, zet een vinkje en de datum. Altijd alle `!` en `≈`.

| Bewering | Bron | Gecontroleerd door | Datum |
|---|---|---|---|
| 16 | B4, B1 | | |
| 26 | B16 | | |
| 27 | B13 | | |
| 30 | B20 | | |
