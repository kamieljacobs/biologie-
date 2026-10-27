# Genen aan en uit — bronnenlogboek

Werkwijze en criteria: `films/BRONNEN.md`.

| Veld | Waarde |
|---|---|
| Gecontroleerde versie | 1.2 (27 okt 2026; opwaardering prompt v5 → v10) |
| Eerste ronde | Claude (helper), 27 okt 2026: 16 beweringen, 7 bronnen geopend. Gedeeltelijke ronde: de opwaardering ging over het beeld; NCBI Bookshelf en PMC gaven tijdens deze ronde een captcha, nobelprize.org en ema.europa.eu waren niet bereikbaar |
| Steekproef | nog niet gedaan |
| Vakexpert | geen |
| Stand | 1 ✓ · 6 ≈ · 0 ! · 9 ? |

## Bronnen

Alle bronnen zijn op 27 okt 2026 zelf geopend. Bij een samenvatting of een catalogusrecord staat dat erbij.

| Nr | Niveau | Bron | Link |
|---|---|---|---|
| B1 | A | Brown, T.A. (2002). *Genomes*, 2e druk, fig. 9.24 met bijschrift (lac-operon), NCBI Bookshelf | https://ncbi.nlm.nih.gov/books/NBK21115/figure/A7106 |
| B2 | A | Lodish e.a. *Molecular Cell Biology*, 8e druk, § 10.x: *RNA interference induces degradation of precisely complementary mRNAs* (uitgeversversie) | https://digfir-published.macmillanusa.com/lodish8e/lodish8e_ch10_32.html |
| B3 | A | Adams e.a. (2018). *Patisiran, an RNAi therapeutic, for hereditary transthyretin amyloidosis.* N Engl J Med 379: 11–21. Samenvatting gelezen via het DrugBank-referentierecord (PubMed zelf gaf een captcha) | https://go.drugbank.com/articles/A36930 |
| B4 | B | Embryo Project Encyclopedia (Arizona State University): *Induced pluripotent stem cell experiments by Kazutoshi Takahashi and Shinya Yamanaka in 2006 and 2007* (verwijst naar Takahashi & Yamanaka, Cell 2006; dat artikel zelf niet geopend) | https://embryo.asu.edu/pages/induced-pluripotent-stem-cell-experiments-kazutoshi-takahashi-and-shinya-yamanaka-2006-and |
| B5 | A | Stanford Medicine / Bio-X (2015): *Scientists unveil sex-linked control genes*, over Chu e.a., Cell 2015 (instituut over eigen onderzoek) | https://biox.stanford.edu/highlight/scientists-unveil-sex-linked-control-genes |
| B6 | A | MSD Veterinary Manual: tabel *Calico and black and orange tortoiseshell cats* | https://www.msdvetmanual.com/multimedia/table/calico-and-black-and-orange-tortoiseshell-cats |
| B7 | A | Ng, Lin, Laybutt e.a. (2010). *Chronic high-fat diet in fathers programs β-cell dysfunction in female rat offspring.* Nature 467: 963–966 (samenvatting, via RePEc) | https://ideas.repec.org/a/nat/nature/v467y2010i7318d10.1038_nature09491.html |

## Beweringen

| Nr | Waar | Bewering in de film | Bronnen | Status | Toelichting |
|---|---|---|---|---|---|
| 1 | n10b, h2op | Bij E. coli liggen drie structuurgenen voor opname en afbraak van lactose naast elkaar met één promotor; tussen promotor en genen ligt een operator | B1 | ≈ | B1: drie genen voor drie enzymen (opname en splitsing van lactose), operator direct na de promotor. Tweede onafhankelijke bron nog openen |
| 2 | n10b, h2op | Een repressor zit op de operator; RNA-polymerase kan de genen dan niet overschrijven | B1 | ≈ | B1. Vereenvoudiging: ook zonder lactose is er een laag basisniveau (de repressor laat af en toe los) |
| 3 | n10b, h2op | Lactose bindt aan de repressor, die laat los; de genen worden overgeschreven | B1 | ≈ | Vereenvoudiging zoals in de lesmethode: strikt is het allolactose (isomeer van lactose, ontstaat bij de afbraak) dat aan de repressor bindt (B1). Hoort in het docentdeel; geen reden om opnieuw in te spreken |
| 4 | n11b, h2ri | siRNA wordt geknipt uit dubbelstrengs RNA; stukjes van zo'n 20–25 nucleotiden; één streng gaat in RISC | B2 | ? | B2: siRNA 21–23 nt (Dicer), één streng met Argonaute in RISC. Eén bron; tweede bron nog openen |
| 5 | n11b, h2ri | Past het precies (siRNA): mRNA geknipt en afgebroken; past het deels (vaak microRNA): translatie geblokkeerd | B2 | ? | B2 bevestigt beide. Eén bron |
| 6 | n11b, h2ri | Onderzoekers zetten zo een gen uit om te zien wat het doet | B2 | ? | B2: synthetische siRNA's als 'knock-down' in zoogdiercellen. Eén bron |
| 7 | n11b, h2ri | Er zijn medicijnen met siRNA die in de lever de aanmaak van een schadelijk eiwit stilleggen | B3 | ≈ | B3: patisiran, RNAi-therapie die de aanmaak van transthyretine in de lever remt (2018). Eén A-bron (samenvatting); FDA/EMA-pagina nog openen |
| 8 | n15, h3b | In het lab: zet een paar regulatorgenen aan in een huidcel en ze wordt weer een stamcel | B4 | ≈ | B4: vier factoren (Oct3/4, Sox2, Klf4, c-Myc) maken van muizenfibroblasten (bindweefselcellen, o.a. uit de huid) pluripotente stamcellen (iPS). 'Huidcel' en 'weer een stamcel' zijn vereenvoudigingen. Origineel (Cell 2006) nog openen |
| 9 | n22, h4v | Op het X-chromosoom ligt een gen voor vachtkleur met allelen oranje en zwart; poes met beide → plukjes; kater één X → óf oranje óf zwart; lapjeskatten bijna altijd vrouwtjes | B5, B6 | ✓ | B5 en B6. B6: de witte vlekken komen van een ander gen; een lapjeskater is meestal XXY (en onvruchtbaar) |
| 10 | n22, h4v | In elke cel wordt vroeg in het embryo één X willekeurig uitgeschakeld; nakomelingen van die cel houden hetzelfde X uit | B5 | ≈ | B5: willekeurige inactivatie per cel verklaart de plukjes. Klonale overerving van de inactieve X in een tweede bron nagaan |
| 11 | n21, h4c | Vaderratten met vetrijk dieet, moeders gewoon: dochters met andere genexpressie in de alvleesklier | B7 | ≈ | Toegeschreven aan het examenvoorbeeld (CvTE havo 2022-I). B7: obese vaders op vetrijk dieet, gewone moeders; dochters met verminderde insulineafgifte en β-celfunctie (de samenvatting noemt geen genexpressie) |
| 12 | n21, h4c | Het dieet van de vader zette slotjes op genen in zijn zaadcellen, die gingen mee naar de dochters | B7 | ≈ | Te stellig voor ratten? B7 spreekt alleen van 'paternale factoren', zonder mechanisme. Het examen gaat uit van epigenetische overerving via de zaadcellen; de film zegt erachter dat het bij mensen nog wordt onderzocht. Voorstel docentdeel: 'waarschijnlijk via het sperma; het precieze mechanisme wordt nog onderzocht'. Niet opnieuw inspreken |
| 13 | n5, h1b | Elke cel met een kern heeft alle ± 20 000 genen | — | ? | Niet nagelopen in deze ronde (info.md noemt Ensembl GRCh38) |
| 14 | n18, h4a | Methylgroep bij de promotor: transcriptiefactor kan er niet bij; dochtercellen krijgen het slotje mee | — | ? | Niet nagelopen in deze ronde |
| 15 | n22, h4v | Acetylgroepen op histonen: DNA los, polymerase kan erbij; zonder: strak opgerold | — | ? | Niet nagelopen in deze ronde |
| 16 | n15, h3b | Vliezen tussen de vingers verdwijnen vóór de geboorte door apoptose | — | ? | Niet nagelopen in deze ronde (info.md: Alberts) |

## Aanpassingen
Geen: er is geen `!` gevonden.

## Nog te doen
- Tweede bronnen voor 1–8 en 10 (NCBI Bookshelf: Alberts/Lodish, FDA-label Onpattro, Takahashi & Yamanaka 2006) zodra de NCBI-captcha weg is; 13–16 nalopen.
- Menselijke steekproef (Kamiel): beweringen 3, 8 en 12.
