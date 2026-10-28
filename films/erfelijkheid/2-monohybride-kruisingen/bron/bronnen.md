# Monohybride kruisingen — bronnenlogboek (versie 2.0, lichte remake)

Werkwijze en criteria: `films/BRONNEN.md`. Segment-id's zijn die van de gebouwde film (`segments.json`, `script.md`); de eerste versie (fase 1, id's van `remake-2026-10/script_v2.md`) staat nog in `remake-2026-10/bronnen.md`.

| Veld | Waarde |
|---|---|
| Gecontroleerde versie | film 2.0 (28 okt 2026; script v2 zoals ingesproken); vergeleken met de oude film (`oud/script-v1.md`) |
| Tweede ronde | Claude, 28 okt 2026 (fase 2): ingesproken tekst naast het logboek gelegd, geen nieuwe beweringen; de simulatie in s25 (400 zaden, vaste seed) eindigt op 301 : 99, de film zegt 'ongeveer drie op één' |
| Eerste ronde | Claude, 28 okt 2026: 29 beweringen, 18 bronnen (17 online zelf geopend, 1 logboek in de repo) |
| Steekproef | nog niet gedaan |
| Vakexpert | geen |
| Stand | 20 ✓ · 9 ≈ · 0 ! · 0 ? (één `!` uit de oude film meteen aangepast, zie Aanpassingen) |

## Bronnen

Alle bronnen op 28 okt 2026 zelf geopend. Niet bereikbaar vanuit deze sessie: pmc.ncbi.nlm.nih.gov (Mendel-vertaling in *Genetics* en Hellens 2010 in PMC), nl.wiktionary.org. De methodes (Biologie voor jou, Nectar) kan ik niet openen.

| Nr | Niveau | Bron | Link |
|---|---|---|---|
| B1 | A | Mendel, G. (1866). *Versuche über Pflanzen-Hybriden*; Engelse vertaling *Experiments in Plant Hybridization* (Royal Horticultural Society, herzien door Blumberg, MendelWeb). § 2: bevruchtingsorganen 'closely packed inside the keel', stempel bestoven 'even before the flower opens'; kunstmatige bevruchting: 'the keel is removed, and each stamen carefully extracted by means of forceps', stempel 'dusted over with the foreign pollen'. § 5 proef 3: 705 paars/grijsbruine zaadhuid, 224 wit, 3,15 : 1. § 9: zelfbevruchting van de hybriden. § 1: 'after eight years' pursuit' | https://cs.brown.edu/people/rblumber/MendelWeb/Mendel.html |
| B2 | A | OpenStax, *Biology for AP Courses*, § 12.1 Mendel's Experiments and the Laws of Probability (zelfbevruchting; meeldraden vóór de rijping weghalen en stuifmeel met de hand overbrengen; P, F1 'filial = offspring, daughter, or son', F2 uit zelfbevruchte F1; 705 : 224 ≈ 3,15 : 1; productregel; kleine steekproeven wijken door toeval af) | https://openstax.org/books/biology-ap-courses/pages/12-1-mendels-experiments-and-the-laws-of-probability |
| B3 | A | OpenStax, *Concepts of Biology*, § 8.1 Mendel's Experiments (BCcampus); bloemblaadjes blijven dicht tot de bestuiving voltooid is; true-breeding; F1 laten zelfbevruchten → 705 : 224; begonnen in 1856, gepubliceerd in 1866. Zelfde uitgever als B2: telt niet als onafhankelijke tweede bron naast B2 | https://opentextbc.ca/biology/wp-json/pressbooks/v2/chapters/4541 |
| B4 | A | OpenStax, *Biology 2e*, Characteristics and Traits (§ 12.2, via Lumen Learning, CC BY): elk vakje van het kruisingsschema even waarschijnlijk; 1 : 2 : 1 en 3 : 1; testkruising: homozygoot dominant → alle nakomelingen dominant, heterozygoot → 1 : 1 | https://courses.lumenlearning.com/wm-biology1/wp-json/pressbooks/v2/chapters/2909 |
| B5 | A | Hellens, R.P. e.a. (2010). *Identification of Mendel's White Flower Character*. PLoS ONE 5(10): e13230 (gen A = bHLH-transcriptiefactor voor anthocyaan; wit = G→A in een splitsplaats, waarschijnlijk Mendels allel); via het onderzoeksportaal van Aberystwyth University | https://research.aber.ac.uk/en/publications/identification-of-mendels-white-flower-character/ |
| B6 | B | JIRCAS, *Thai vegetables database*, Pisum sativum (085): 1–3 paar blaadjes, grote steunbladeren, ranken; vleugels vast aan de kiel, kiel korter dan de vleugels; tweebroederige meeldraden; stijl scherp omhoog gebogen, bovenaan behaard | https://www.jircas.go.jp/en/database/thaivege/085 |
| B7 | B | *Cretan Flora*, soortbeschrijving Pisum sativum subsp. sativum: tot 2 m; steunbladeren groter dan de blaadjes; kroon 20–25 mm, vlag lila-paars, vleugels donker kastanjerood; peul 60–80 × 10–14 mm, ± 10 zaden | https://www.cretanflora.com/pisum_sativum_sativum_text.html |
| B8 | A | CvTE, *Syllabus biologie havo 2026*, M7.1 specificatie 4: kansen op genotype en fenotype bij monohybride kruisingen; deelconcepten o.a. monohybride kruising, dominant, onvolledig dominant, intermediair, kruisingsschema, homozygoot, heterozygoot | https://examenblad.nl/2026/havo/documenten/syllabus-biologie-havo |
| B9 | A | CvTE, *Syllabus biologie vwo 2026*, M7.1 specificatie 4 (monohybride en dihybride kruisingen, gekoppelde genen); A8 specificatie 6 'rekenen met kansen' | https://examenblad.nl/2026/vwo/documenten/syllabus-biologie-vwo-2026 |
| B10 | A | Silver, L.M. (1995). *Mouse Genetics: Concepts and Applications*. Oxford University Press; online bij MGI/JAX, § 3.2 (broer-zusparingen → inteelt, homozygoot op alle loci; F1 × F1-intercross → 1 : 2 : 1; backcross met een oudertype → 50 % A/a, 50 % a/a) | https://www.informatics.jax.org/silverbook/chapters/3-2.shtml |
| B11 | A | MGI (Mouse Genome Informatics, JAX), allel *Tyr*ᶜ 'tyrosinase; albino' (MGI:1855976): recessief, haar en ogen zonder pigment | https://www.informatics.jax.org/allele/MGI:1855976 |
| B12 | A | Beermann, F. e.a. (2004). *The Tyr (albino) locus of the laboratory mouse*. Mammalian Genome 15: 749 (Tyr codeert tyrosinase, het snelheidsbepalende enzym voor melanine; albino = nulallel; een van de eerste loci voor mendeliaanse overerving bij zoogdieren); samenvatting via EPFL Infoscience | https://infoscience.epfl.ch/record/115159?ln=en |
| B13 | A | The Jackson Laboratory (2003). *Use of albino B6 mice as blastocyst hosts for B6-derived ES cells* (C57BL/6J-Tyr^c-2J homozygoot = albino door een mutatie in het tyrosinasegen; nakomelingen met één normaal allel zijn zwart) | https://www.jax.org/news-and-insights/2003/october/use-of-albino-b6-mice-as-blastocyst-hosts-for-b6-derived-es-cells |
| B14 | B | Windig, J. (CGN, Wageningen UR) (2022). *Omgaan met inteelt en verwantschap*, Dag van de watervogel (inteelt = paren van verwanten; meer homozygotie; recessieve gebreken; fokkers beperken inteelt) | https://szh.nl/wp-content/uploads/2022/05/omgaan-inteelt-verwantschap-dag-van-de-watervogel.pdf |
| B15 | A | OpenStax *Biology*, Sexual Reproduction in Angiosperms (via Lumen Learning, CC BY): in de helmknop deelt de moedercel door meiose tot vier microsporen; de generatieve cel deelt later tot twee zaadcellen; in het zaadbeginsel meiose → vier megasporen, de eicel ontstaat na mitose | https://courses.lumenlearning.com/wm-nmbiology2/chapter/sexual-reproduction-in-angiosperms/ |
| B16 | A | Michaels, T. e.a. *The Science of Plants* (University of Minnesota Libraries), § 14.1 Gametogenesis (meiose geeft haploïde sporen; zaadcellen ontstaan later door mitose) | https://bio.libretexts.org/Bookshelves/Botany/The_Science_of_Plants_-_Understanding_Plants_and_How_They_Grow_(Michaels_et_al.)/14%3A_Variation_and_Plant_Breeding/14.01%3A_Gametogenesis |
| B17 | A | CvTE, centraal examen biologie havo 2025-II, opgave Zwarte kip, vraag 8 (kruising met een homozygoot recessief hennetje om uit te sluiten dat de haan heterozygoot is; de vraag noemt de kruising niet bij naam); uitsnede in de Examenatlas | `examenatlas/img/havo/2025-II/8a.webp` |
| B18 | A | Chromosomen 2.1, bronnenlogboek (`films/erfelijkheid/1-chromosomen/bron/bronnen.md`): albinisme OCA1 autosomaal recessief, tyrosinase; voor de genotypen van het gezin (film-eigen keuze, LEVENSLOOP) | `films/erfelijkheid/1-chromosomen/bron/bronnen.md` |

## Beweringen

| Nr | Waar | Bewering in de film | Bronnen | Status | Toelichting |
|---|---|---|---|---|---|
| 1 | s01, s32 | Twee ouders met Aa (zonder albinisme) kunnen een kind met aa krijgen; het allel a zit verborgen | B4, B10, B18 | ✓ | |
| 2 | s04 | Een erwtenbloem bestuift zichzelf; meeldraden en stamper zitten in de kiel; het stuifmeel komt op de eigen stamper vóór de bloem opengaat | B1, B2, B3 | ✓ | B1 § 2 letterlijk; B2/B3 'naturally self-fertilizes' |
| 3 | s05 | Raszuivere planten geven generatie na generatie dezelfde kleur | B1, B3 | ✓ | true-breeding |
| 4 | s05 | Raszuiver = homozygoot: de paarse is AA, de witte aa | B4, B10 | ✓ | |
| 5 | s06 | Mendel kruiste met de hand: meeldraden uit een jonge bloem weg, stuifmeel van de andere plant op de stamper | B1, B2 | ✓ | pincet (B1), geen kwastje |
| 6 | s06 | Richting: stuifmeel van wit op een paarse bloem | B1 | ≈ | Mendel kruiste in beide richtingen (B1, reciproke kruisingen); de film toont er één, de uitkomst is gelijk |
| 7 | s07 | P komt van het woord voor ouders, F van het woord voor kinderen | B2, B3 | ≈ | 'parental' en 'filial = offspring, daughter, or son'; beide OpenStax, geen tweede onafhankelijke bron; 'Latijns' is de herkomst van beide Engelse woorden (filius/filia, parens), niet apart nagelezen |
| 8 | s07 | Alle F1-planten waren paars | B1, B2 | ✓ | |
| 9 | s08 | Elke F1-plant kreeg A van de ene en a van de andere ouder: Aa; A dominant | B2, B4 | ✓ | |
| 10 | s08 | Een kruising waarbij je op één eigenschap let, heet een monohybride kruising | B8, B9 | ≈ | het begrip staat in beide syllabi, zonder definitie; omschrijving zoals gangbaar, te vergelijken met de methode (Kamiel) |
| 11 | s09 | Mendel kruiste de F1 met elkaar door ze zichzelf te laten bestuiven | B1, B2 | ✓ | B1 § 9 'self-fertilization of the hybrids' |
| 12 | s10 | F2 = de nakomelingen van de F1 | B2, B10 | ✓ | |
| 13 | s11 | Bij dieren (muis) kruis je twee F1-dieren met elkaar, broer met zus | B10 | ≈ | intercross van F1-broers en -zussen (B10); andere F1-dieren uit dezelfde kruising mag ook, maar zijn ook broer en zus |
| 14 | s11 | Een fokker vermijdt zulke inteelt | B14, B10 | ≈ | B14 (niveau B) zegt dat fokkers inteelt beperken; B10 laat zien dat broer × zus tot homozygotie leidt |
| 15 | s11 (beeld) | Albino muis = recessief allel van het tyrosinasegen (zelfde gen als bij albinisme in film 1) | B11, B12 | ✓ | |
| 16 | s11 (beeld) | Zwart × albino geeft zwarte F1 | B13, B11 | ✓ | geldt als de albinostam verder 'zwart' is (B6-albino); bij een andere achtergrond (bv. BALB/c) kan de F1 een andere kleur hebben → docentdeel |
| 17 | s14 | Mendel telde in de F2 705 paarse en 224 witte planten, ongeveer 3 : 1 | B1, B2 | ✓ | 3,15 : 1; proef 3 (bloem- en zaadhuidkleur) |
| 18 | s14 | Het allel a was in de F1 niet verdwenen, het zat verborgen | B2, B4 | ✓ | |
| 19 | s16 | Bij de meiose gaan de chromosomen van een paar uit elkaar; elke geslachtscel krijgt één allel | B4, B10, B15 | ≈ | bij planten maakt de meiose eerst sporen; de geslachtscellen ontstaan daarna door mitose en krijgen hetzelfde allel (B15, B16). In beeld 'vereenvoudigd' |
| 20 | s17 | De kans op A of a per gameet is een half, voor stuifmeel én eicellen | B4, B10 | ✓ | |
| 21 | s18–s20 | Elk vakje = één mogelijke, even waarschijnlijke bevruchting; 1 AA : 2 Aa : 1 aa en 3 : 1 | B4, B10 | ✓ | |
| 22 | s21 | Productregel: ½ × ½ = ¼ | B2, B10 | ✓ | B10: 25 % a/a uit F1 × F1 |
| 23 | s25 | Bij weinig nakomelingen wijkt de verhouding vaak af; bij heel veel kom je dicht bij 3 : 1 | B2, B3 | ✓ | |
| 24 | s27 | Een kruising met een homozygoot recessieve plant heet een terugkruising | B10, B17 | ≈ | B10: backcross = met een oudertype; 'testkruising' is het strikte woord voor de kruising met aa (B4 'test cross'); de methodes niet geopend; twijfel T6 |
| 25 | s28–s31 | AA × aa: alles dominant; Aa × aa: 1 : 1; één witte nakomeling bewijst dat de paarse ouder a had | B4, B10 | ✓ | |
| 26 | s32 | Bij elk kind is de kans op aa een kwart, steeds opnieuw | B2, B10 | ✓ | onafhankelijke gebeurtenissen |
| 27 | s34 | Het is niet altijd drie op één (vooruitblik op onvolledig dominant/intermediair) | B8, B9 | ✓ | |
| 28 | beeld s02–s06 | Erwtenplant: steunbladeren groter dan de blaadjes, 1–3 paar blaadjes, ranken; vlinderbloem 20–25 mm, vlag lila-paars, vleugels donker; peul 6–8 cm | B6, B7 | ≈ | twee bronnen van niveau B; vorm samen met Mendel B1 (kiel) |
| docent | docent | Mendels witte bloem: gen A (bHLH-transcriptiefactor), wit door een mutatie in een splitsplaats | B5 | ≈ | toegeschreven aan Hellens e.a. 2010 |

## Aanpassingen

| Was (oude film) | Nu | Bronnen | Gedaan |
|---|---|---|---|
| p05 'Kijk in een meeldraad … Bij de meiose gaan de chromosomen van het paar eerst uit elkaar. Daarna ook de chromatiden. Zo ontstaan vier gameten, met elk één allel.' (`!`: bij een erwt geeft de meiose in de helmknop vier sporen; de zaadcellen ontstaan pas later door mitose in de stuifmeelkorrel) | s16 'Bij het maken van geslachtscellen, de meiose, gaan de twee chromosomen van een paar uit elkaar. Elke geslachtscel krijgt er één, dus één allel.' Beeld met 'vereenvoudigd' | B15, B16 | ja, in script_v2 |
| p13 'één op één bij een terugkruising' (te stellig: alleen als de dominante ouder Aa is) | s34 'Aa met aa geeft één op één' | B4, B10 | ja |

## Menselijke controle
Nog niet gedaan. Voorstel voor de steekproef: B1 (Mendel § 2 en § 5), B2 (P/F1/F2 en 705 : 224), B10 (Silver, F1 × F1 en backcross), en de `≈`-regels 7, 10, 13, 24.
