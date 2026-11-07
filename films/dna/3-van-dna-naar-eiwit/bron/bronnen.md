# Van DNA naar eiwit — bronnenlogboek

Werkwijze en criteria: `films/BRONNEN.md`.

| Veld | Waarde |
|---|---|
| Gecontroleerde versie | 1.1 (16 okt 2026) en 1.2 (27 okt 2026, alleen beeld en één knip; gesproken tekst gelijk) |
| Eerste ronde | Claude, 27 okt 2026: 24 beweringen, 9 bronnen geopend. NCBI Bookshelf en PMC (Alberts, Cooper) waren niet bereikbaar (captcha); daardoor blijven enkele standaardbeweringen op één bron of open. |
| Steekproef | nog niet gedaan (zie onderaan) |
| Vakexpert | geen |
| Stand | 9 ✓ · 8 ≈ · 0 ! · 7 ? |

## Bronnen

Alle bronnen zijn op 27 okt 2026 zelf geopend.

| Nr | Niveau | Bron | Link |
|---|---|---|---|
| B1 | A | College voor Toetsen en Examens: *Syllabus centraal examen biologie vwo 2025*, nadere vaststelling versie 4 (juli 2023): M1.2 (transcriptie en translatie, codon–aminozuur, primaire structuur bepaalt bouw en werking; deelconcepten anticodon, ribosoom, ER, golgisysteem), M3.1 (introns/exons, RNA-polymerase, splicing), M4.1 (promotor, transcriptiefactor) | https://examenblad.nl/2025/vwo/documenten/syllabus-biologie-vwo |
| B2 | A | National Human Genome Research Institute (NHGRI), Genetics Glossary: *Codon* (drie nucleotiden; 64 codons, 61 voor aminozuren en 3 stop) | https://www.genome.gov/genetics-glossary/Codon |
| B3 | A | NHGRI, Genetics Glossary: *Stop codon* (UAA, UAG, UGA; einde van de eiwitsynthese) | https://genome.gov/genetics-glossary/Stop-Codon |
| B4 | A | National Institute of General Medical Sciences (NIH): *The New Genetics*, glossary (RNA met ribose en A, U, G, C; intron, exon, RNA splicing; transcriptie, translatie, RNA-polymerase, ribosoom); gearchiveerde versie | https://webarchive.library.unt.edu/eot2008/20090116112535/http:/publications.nigms.nih.gov/thenewgenetics/glossary.html |
| B5 | A | Duan, Zheng, Zhang e.a. (2020). *The SARS-CoV-2 Spike Glycoprotein: Biosynthesis, Structure, Function, and Antigenicity*. Frontiers in Immunology 11:576622 (spike gemaakt op het ruw ER, type I-transmembraaneiwit, bewerking in het golgisysteem, expressie op het celoppervlak) | https://www.frontiersin.org/journals/immunology/articles/10.3389/fimmu.2020.576622/pdf |
| B6 | A | CDC: *About mRNA COVID-19 Vaccines* (31 aug 2021): geen levend virus; coating helpt het mRNA de spiercellen in; cel maakt een stuk van het spike-eiwit dat op het celoppervlak komt; mRNA komt nooit in de kern en beïnvloedt het DNA niet; de cel breekt het mRNA af | https://stacks.cdc.gov/view/cdc/109395/cdc_109395_DS1.pdf |
| B7 | A | Yang & Elnitski (2008). *Diversity of core promoter elements comprising human bidirectional promoters*. BMC Genomics 9(Suppl 2):S3 (TATA-motief in 29 % van de niet-bidirectionele en 9 % van de bidirectionele humane promotors) | https://link.springer.com/content/pdf/10.1186/1471-2164-9-S2-S3.pdf |
| B8 | B | OpenStax *Biology 2e* (2020), § 15.3 Eukaryotic Transcription (kopie op theexpertta.com): TATA-box 25–35 basen vóór het startpunt; transcriptiefactoren vormen eerst een complex dat RNA-polymerase II rekruteert; pre-mRNA groeit 5' → 3' | https://www.theexpertta.com/book-files/OpenStaxBio2e/2020%20Edition/Biology_15.3.%20Eukaryotic%20Transcription_pg377%20-%20380.pdf |
| B9 | B | LibreTexts, *General Biology (Boundless)* 15.06: Initiation of Transcription in Eukaryotes (TATA-box 25–30 bp stroomopwaarts; factoren binden eerst en rekruteren de polymerase) | https://bio.libretexts.org/Bookshelves/Introductory_and_General_Biology/General_Biology_(Boundless)/15:_Genes_and_Proteins/15.06:_Eukaryotic_Transcription_-_Initiation_of_Transcription_in_Eukaryotes |

## Beweringen

| Nr | Waar | Bewering in de film | Bronnen | Status | Toelichting |
|---|---|---|---|---|---|
| 1 | n0 | In het mRNA-vaccin zit geen virus; de werkzame stof is mRNA in vetbolletjes | B6 | ≈ | B6: geen levend virus, mRNA met een ‘coating’ (lipidennanodeeltjes). Tweede onafhankelijke bron nog openen (bv. EMA-productinformatie Comirnaty). |
| 2 | n0, n21 | Je spiercellen maken daarna zelf een eiwit van het virus | B6, B5 | ✓ | B6 (spiercellen bij de prikplaats maken een stuk van het spike-eiwit); B5 (spike wordt in de cel op het ruw ER gemaakt). |
| 3 | n3 | Eiwitten worden gemaakt door ribosomen, in het cytoplasma | B4, B1 | ✓ | |
| 4 | n5 | RNA: ribose in plaats van desoxyribose, uracil in plaats van thymine | B4, B1 | ✓ | B1 noemt RNA/DNA-bouw in M1.2; B4 ribose en A, U, G, C. |
| 5 | n5 | RNA is enkelstrengs | B4 | ≈ | B4: ‘one long chain’. Tweede bron nog openen. Vereenvoudiging: RNA kan met zichzelf paren (tRNA). |
| 6 | n7 | Transcriptie: RNA-polymerase maakt in de kern een RNA-afschrift van één gen | B4, B1 | ✓ | |
| 7 | n7 | RNA-polymerase gaat op de promotor zitten en opent het DNA zelf | B8, B9 | ≈ | Bij eukaryoten helpen transcriptiefactoren (TFIIH) bij het openen; de film vereenvoudigt. Het vwo-blok (n10) noemt de transcriptiefactoren. Bron voor TFIIH niet geopend. |
| 8 | n7, n9 | Tegenover A in het DNA komt U in het mRNA | B4 | ? | Volgt uit B4 (RNA heeft U in plaats van T), maar de paring A–U staat er niet letterlijk; tweede bron nodig. |
| 9 | n10 | Promotor = stuk DNA vóór het gen dat zelf niet wordt overgeschreven; transcriptiefactoren binden eerst en zetten RNA-polymerase op zijn plek | B8, B9, B1 | ✓ | B1 noemt promotor en transcriptiefactor als deelconcepten (M4.1). |
| 10 | n10 | ‘In veel promotors zit een vaste volgorde, de TATA-box’ | B7, B8 | ≈ | B7: bij de mens ± 9–29 % van de promotors. ‘Veel’ is ruim; het begrip TATA-box zegt al ‘in een deel van de promotors’. Geen vakfout, wel om bij een nieuwe opname ‘In een deel van de promotors’ te zeggen. |
| 11 | n10 | Matrijsstreng gelezen 3' → 5', mRNA groeit 5' → 3' | B8 | ? | B8 bevestigt 5' → 3'. Tweede (niveau A) bron niet bereikbaar (Alberts op NCBI). |
| 12 | n10 | Bij eukaryoten bestaan de meeste genen uit exons en introns; introns worden eruit geknipt (splicing) | B4, B1 | ✓ | B1: ‘genen bij eukaryoten voor een groot gedeelte uit introns’. |
| 13 | n10 | Alternatieve splicing: één gen kan meer dan één eiwit opleveren | — | ? | Niet geopend (NCBI niet bereikbaar). |
| 14 | n10 | Kapje (5') en poly-A-staart (3') beschermen het mRNA tegen afbraak | — | ? | Niet geopend. |
| 15 | n12 | Het mRNA gaat door een kernporie de kern uit | — | ? | Niet geopend. |
| 16 | n12 | Codon = drie nucleotiden; elk codon codeert één aminozuur, op drie stopcodons na | B2, B3, B1 | ✓ | B2: 64 codons, 61 aminozuren, 3 stop. |
| 17 | n12 | Translatie begint bij AUG (startcodon, methionine) | — | ? | Niet geopend. |
| 18 | n12 | tRNA brengt het aminozuur; het ribosoom stopt bij een stopcodon en de keten laat los | B3, B4 | ✓ | B3 stopcodons UAA, UAG, UGA. |
| 19 | q13, n14 | Kegelslakgif van 17 aminozuren: 51 nucleotiden | B2 | ≈ | Rekensom (3 × 17); vraag geparafraseerd naar CvTE havo 2021-I vraag 26 (toegeschreven). |
| 20 | n15, n17 | 64 codons voor 20 aminozuren; de meeste aminozuren hebben meer codons; wiebelbase = derde base van het codon | B2 | ? | 61 + 3 bevestigd door B2; anticodon en wiebelbase niet in een geopende bron (B1 noemt anticodon alleen als deelconcept). |
| 21 | n19 | De volgorde van de aminozuren bepaalt de vorm, de vorm de werking | B1 | ≈ | B1 M1.2 spec. 3. Tweede bron nog openen. |
| 22 | n21 | Ribosomen op het ER maken het eiwit; via het golgisysteem komt het in een blaasje naar het celmembraan; afweercellen leren het herkennen | B5, B6 | ✓ | B5: synthese op het ruw ER, golgi, celoppervlak; B6: eiwit op het celoppervlak, immuunreactie. |
| 23 | n21 | Vaccin-mRNA komt niet in de kern en wordt geen DNA; daarvoor is reverse transcriptase nodig, ‘en je spiercel gebruikt het niet’ | B6 | ≈ | B6: komt nooit in de kern, beïnvloedt het DNA niet. Nuance voor het docentdeel: menselijke cellen hebben wel een eigen reverse transcriptase (LINE-1), in de meeste lichaamscellen nauwelijks actief; niet zelf geopend, dus hier alleen als aandachtspunt. |
| 24 | n21 | Na een tijdje breekt de cel het mRNA af | B6 | ≈ | Eén niveau-A-bron (CDC); tweede bron nog openen. |

## Aanpassingen

- Geen `!`: geen beweringen gevonden die niet kloppen. Geen wijziging in beeld of tekst nodig op grond van de bronnen.
- Voorstel (geen fout, voor een eventuele nieuwe opname van n10): ‘In veel promotors’ → ‘In een deel van de promotors’ (B7: ± 9–29 %), zodat stem en begrippenlijst gelijk zijn.
- Open: beweringen 8, 11, 13, 14, 15, 17, 20 (en tweede bron bij 1, 5, 21, 24) nalopen in Alberts of Campbell zodra NCBI Bookshelf bereikbaar is, of in BINAS.

## Menselijke controle

Nog niet gedaan. Kamiel: open minstens B1, B5 en B6 en vink af dat beweringen 2, 22 en 23 er staan.
