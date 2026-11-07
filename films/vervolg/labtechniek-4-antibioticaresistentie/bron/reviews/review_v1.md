# Review script_v1 — lt4 Antibioticaresistentie: kweken, testen en selectie (24 okt 2026)

Eigen review met bronnencheck, stelligheidscheck en vraagregels. Alles wat hieronder als MOET staat is in `script_v2.md` verwerkt.

## 1. Beweringen met bron

| Nr | Bewering in het script | Bron | Oordeel |
|---|---|---|---|
| 1 | Een bacterie deelt zich onder goede omstandigheden ongeveer elk half uur | BioNumbers 103514 (E. coli MG1655, LB, 37 °C): "The doubling time during steady-state growth in Luria-Bertani broth was 20 min" | klopt met 'ongeveer'; op agar is het langzamer dan in bouillon, dus 'ongeveer een half uur' is aan de voorzichtige kant. **Behouden, met 'ongeveer'.** |
| 2 | Na een nacht is één cel een zichtbare kolonie van honderden miljoenen cellen | BioNumbers 104458: 3,3 × 10⁹ cellen per kolonie (E. coli); eigen rekenwerk `reken/verdunning.py`: 18 uur bij 30 min verdubbeling = 6,9 × 10¹⁰, bij 40 min = 1,3 × 10⁸ | klopt; 'honderden miljoenen tot een miljard' is de veilige formulering. **Aangepast.** |
| 3 | Elke kolonie komt van één cel | CFU-definitie: een kolonie kan ook uit een klompje of kettinkje cellen ontstaan (daarom *kolonievormende eenheid*) | **te stellig. MOET:** 'van één cel, of van een klompje cellen dat bij elkaar zat' + vereenvoudiging in het docentdeel. |
| 4 | Een plaat is telbaar tussen 30 en 300 kolonies | LibreTexts, General Microbiology Lab Manual (Pakpour & Horgan), Lab 09 Standard Plate Count: countable "between 30-300" | klopt. **Behouden.** |
| 5 | 68 kolonies uit 0,1 ml van de 10⁻⁵-verdunning = 6,8 × 10⁷ per ml | `reken/verdunning.py`; rekenwijze volgens LibreTexts (kolonies ÷ uitgeplaat volume ÷ verdunningsfactor) | nagerekend: 68 / 0,1 / 10⁻⁵ = 6,8 × 10⁷. De buurplaten geven 680 en 7 kolonies, dus precies één telbare plaat. **Klopt.** |
| 6 | Bijna 70 miljoen per ml is veel te veel voor gezonde urine | Richtlijnendatabase, Urineweginfecties bij volwassenen, technische uitwerking urinekweken: sinds Kass (1957) geldt 10⁵ kve/ml als criterium; bij symptomatische vrouwen al ≥ 10² kve/ml van betekenis | klopt, maar 'veel te veel voor schone urine' is vaag. **MOET:** noem de grens van honderdduizend per milliliter. |
| 7 | Kweek een nacht bij 37 °C | EUCAST Disk Test Manual v 11.0: Enterobacterales "35 ± 1 °C in air for 18 ± 2 h" | de gevoeligheidsbepaling gaat volgens EUCAST bij 35 ± 1 °C. **MOET:** 'ongeveer vijfendertig graden' en 'ongeveer achttien uur'. |
| 8 | Remzone meten met een liniaal en vergelijken met een breekpunt; boven de grens gevoelig, eronder resistent | EUCAST Disk Test Manual v 11.0 (lezen op 30 cm afstand, meten op de millimeter); EUCAST Breakpoint Tables v 16.1, noot 6: S = "high likelihood of therapeutic success", R = "high likelihood of therapeutic failure even when there is increased exposure"; daartussen I = susceptible, increased exposure | de tweedeling gevoelig/resistent is een vereenvoudiging: EUCAST heeft drie categorieën (S, I, R). **MOET:** 'soms zit er nog een tussengebied' in de stem, en de vereenvoudiging in het docentdeel. Concrete breekpuntgetallen zijn **niet** in de film gezet: de v16.1-tabel die ik kon openen gaf geen rij voor de middelen die ik wilde noemen (alleen ampicilline: zone S ≥ 14 mm bij 10 µg, MIC S ≤ 8 mg/L). De film noemt daarom 24 en 9 millimeter als gemeten zones zonder het middel te noemen, en de grens als 'het breekpunt'. |
| 9 | MIC = de laagste concentratie waarbij je geen groei meer ziet | EUCAST Reading guide broth microdilution v 4.0: MIC is "the lowest concentration of antimicrobial agent that inhibits visible growth of a microorganism" | klopt woordelijk. **Behouden**, met 'zien' erin. |
| 10 | De concentratie verdubbelt per buisje; groei tot en met 0,25 mg/L, helder vanaf 0,5 → MIC 0,5 | verdubbelingsreeks is standaard in de MIC-bepaling (EUCAST/ISO 20776-1); `reken/verdunning.py` rekent de reeks na | klopt, en 0,5 mg/L ligt in een realistisch bereik. **Behouden.** |
| 11 | Resistent = de bacterie groeit door bij een concentratie die in het lichaam haalbaar is | Reeksbrief `hw/lab/REEKS.md` (gedeelde definitie); zelfde strekking in `films/evolutie/4-de-mens-als-selectiefactor` (glossary: "Een bacterie is resistent als een antibioticum haar niet meer doodt of remt") en EUCAST-noot 6 | consistent met de reeks en met de evolutiefilm. **Behouden**, met de woorden van de reeksbrief. |
| 12 | Resistentiemutaties ontstaan ongeveer één op 10⁸–10⁹ cellen | BIOL 230 lecture guide (CCBC): "the 'normal' mutation rate for a gene in nature is about one mutation in every million to every billion divisions"; BioNumbers 111340 (Lee e.a. 2012, PNAS 109:E2774): rifampicine-resistentie 0,33 × 10⁻¹⁰ en nalidixinezuur-resistentie 0,21 × 10⁻¹⁰ mutaties per nucleotide per generatie; eigen plaat: 7 uit 10⁹ = 7 × 10⁻⁹ | de orde klopt, maar hangt sterk af van middel en bacterie (Drago e.a. 2010, BMC Microbiol 10:119 meten bij ciprofloxacine op plasmaspiegel < 10⁻¹¹). **MOET:** 'bij dit soort middelen vaak ongeveer één op de honderd miljoen tot een miljard' in plaats van een algemene regel. |
| 13 | De mutant was er al vóór het antibioticum; het middel selecteert, het maakt de mutatie niet | Luria–Delbrück (mutaties "random rather than directed"); Newcombe's replica plating "the mutations occurred before selection was applied"; Revitt-Mills & Robinson 2020, Front Microbiol 11:585175: het spontane model "serves as the null hypothesis", maar "some antibiotics can induce higher mutation rates in bacteria" | klopt voor dit experiment. **MOET:** niet als algemene wet schrijven ('een antibioticum verhoogt nooit de mutatiesnelheid' zou fout zijn); in het docentdeel als vereenvoudiging opnemen. |
| 14 | Bacteriën worden niet resistent door aan het middel te wennen | Misconceptie uit de opdracht; de erfelijke verandering zit in DNA (mutatie of plasmide), niet in gewenning. Fenotypische tolerantie en persisters bestaan wel, maar zijn niet erfelijk en niet wat 'resistent' betekent (EUCAST-noot 6, categorieën op grond van MIC) | **MOET:** de bewering begrenzen tot 'de cel verandert niet erfelijk', zodat tolerantie de zin niet onwaar maakt. |
| 15 | Conjugatie: pilus, kopie van het plasmide gaat over, de donor houdt zijn eigen plasmide | Wikipedia Bacterial conjugation (type IV-secretiesysteem en pilus; plasmide wordt genikt bij de origin of transfer, één streng gaat over, beide cellen maken de tegenstreng, "the donor keeps its copy and can act as a donor again") | klopt. **Behouden.** Dat één streng overgaat en pas in de ontvanger wordt verdubbeld, is voor dit publiek weggelaten — in het docentdeel als vereenvoudiging. |
| 16 | Een resistentieplasmide kan tussen E. coli en Klebsiella overgaan | Emerging Infectious Diseases 2010: "Transfer of Carbapenem-Resistant Plasmid from Klebsiella pneumoniae ST258 to Escherichia coli in Patient"; RIVM (rivm.nl/esbl): ESBL is "een enzym dat bepaalde antibiotica afbreekt, waardoor deze antibiotica niet goed meer werken" | klopt; de gedocumenteerde richting in dat geval is Klebsiella → E. coli. **MOET:** 'tussen een E. coli en een Klebsiella' in plaats van één richting beweren. Let op: `films/evolutie/4-de-mens-als-selectiefactor` legt ESBL al uit (plasmiden, van E. coli naar Klebsiella). Deze film noemt ESBL daarom **niet** opnieuw en blijft bij het mechanisme. |
| 17 | Veiligheidskabinet: de lucht stroomt naar binnen en door een filter | Maastricht University, Procedure 5 veilig gebruik van een biologisch veiligheidskabinet type II; NuAire, Class II Type A2: inward airflow beschermt de gebruiker, HEPA-gefilterde neerwaartse stroom beschermt het product | klopt voor klasse II. **Behouden** zonder het type te noemen. |
| 18 | Resistentie bij E. coli uit urine in de Nederlandse eerste lijn | Bruins e.a. 2025, PLoS One 20(10):e0334222: amoxicilline/ampicilline 28,2 % (landelijk ISIS-AR 34,5 %), trimethoprim 15,0 % (20,5 %), ciprofloxacine 3,7 % (9,0 %), nitrofurantoïne 0,4 % (1,4 %) | klopt, maar de film noemt geen percentages: dat is de wereld van *Welk antibioticum?* en zou de rode draad verlengen. **Niet in de film**, wel in het docentdeel bij de bronnen. |
| 19 | Opleidingen: mbo biologisch-medisch analist niveau 4, vier jaar; hbo Biologie en Medisch Laboratoriumonderzoek, vier jaar | Noorderpoort, Biologisch-medisch analist BOL: "Niveau 4", "4 jaar", crebo 25953, werk in ziekenhuislaboratoria en bij bedrijven met een microbiologisch lab; Studiekeuze123 (Hogeschool Rotterdam, BML): 240 EC, graad Bachelor of Science, werkvelden ziekenhuizen, universiteiten, biotechnische en farmaceutische bedrijven | klopt. De reeksbrief noemt ook 'niveau 4, ± 3–4 jaar'; de pagina die ik zag geeft 4 jaar voor de voltijdvariant. **MOET:** 'drie tot vier jaar' zeggen, zodat andere roc's er ook onder vallen. Studiekeuze123 noemt geen jaren, alleen 240 EC; 'vier jaar' bij het hbo is de gangbare voltijdduur bij 240 EC — zo ook in het docentdeel verantwoord. |

Niet gevonden / niet gebruikt: de rij ciprofloxacine en nitrofurantoïne in EUCAST v 16.1 kon ik in de opgehaalde tekst van de tabel niet lezen (alleen penicillines en cefalosporines kwamen door). Daarom staan er in de film **geen** middelnamen met breekpuntgetallen. NethMap zelf was niet te openen; de cijfers komen uit de PLoS One-publicatie die NethMap/ISIS-AR citeert.

## 2. Stelligheidscheck (alle, altijd, nooit, alleen, geen, elke)

| Zin in v1 | Probleem | In v2 |
|---|---|---|
| "Dat lukt alleen als er niets anders bij komt." | 'alleen' is hier nog verdedigbaar maar hard | 'Dat lukt alleen goed als …' |
| "Elke kolonie komt dus van één cel." | te stellig, zie bron 3 | 'Zo'n kolonie komt van één cel, of van een klompje cellen dat aan elkaar zat.' |
| "Boven die grens heet de bacterie gevoelig, eronder resistent." | laat de categorie I weg | '… eronder resistent. Soms zit er nog een tussengebied.' |
| "dan sterven alle andere" | te stellig (sommige leven nog, ze groeien niet uit) | 'dan groeien de andere niet uit' |
| "Het middel maakt de mutatie dus niet" | als algemene wet onjuist (sommige middelen verhogen de mutatiesnelheid) | 'Het middel heeft die mutatie niet gemaakt: die was er al.' |
| "Een bacterie went ook niet aan een antibioticum." | moet begrensd worden, anders botst het met tolerantie/persisters | 'Een bacterie went er ook niet aan: de cel verandert niet erfelijk.' |
| "Toch weet Yasmin nooit zeker dat er niets is bijgekomen." | 'nooit zeker' is juist correct bescheiden | behouden |
| "Veel te veel voor schone urine." | vaag en impliciet stellig | grens van honderdduizend per milliliter erbij |
| "Dat is evolutie, in één nacht, in één schaaltje." | klopt (verandering van allelfrequentie in een populatie), maar klinkt groot | behouden; het is precies wat de evolutiefilms 'selectie' noemen |
| "Niet jij wordt resistent, maar de bacterie." | klopt; staat ook in *Welk antibioticum?*, dus kort houden | behouden, één zin |

## 3. Vraagregels

| Vraag | Correct | Opties ongeveer even lang? | Vakterm alleen in het goede antwoord? | Verklapt de zin ervoor het antwoord? | Actie |
|---|---|---|---|---|---|
| q02 (cold open) | b | 10 / 9 / 10 woorden | nee: 'resistent' staat in de afleider c | nee | ok |
| q05 (H1) | c | 8 / 6 / 10 | nee: 'voedingsbodem' in a en b | nee | **MOET:** opties gelijker maken (6–8 woorden elk) |
| q08 (H2) | a | 10 / 8 / 10 | nee: 'kolonies' in alle drie | nee: het getal 68 staat in de alinea, maar niet dat het de telbare is | ok |
| q11 (H3) | b | 9 / 10 / 9 | nee: getallen in alle drie | nee | ok |
| q13 (H4) | **b in v1** | 9 / 10 / 9 | nee: 'mutatie' in a en b | nee | **MOET:** het goede antwoord stond in v1 twee keer achter elkaar op b (q11 en q13). In v2 staat het goede antwoord van q13 op a; de reeks wordt dan b, c, a, b, a |

Vragen uit: elke alinea na een vraagkaart begint met 'Antwoord x.' (die zin knipt de speler weg) en gaat daarna door op iets uit de **gesproken** alinea ervoor, niet uit de vraagkaart:
- na q02: 'Niet jij wordt resistent, maar de bacterie' — staat ook in optie c, maar de alinea loopt door op 'welke bacterie het is, moet Yasmin eerst te weten komen'. Ok.
- na q05: 'Blijft die plaat leeg …' — 'die plaat' is de plaat uit de alinea vóór de vraag. Ok.
- na q08: 'Afspraak in het lab: een plaat is telbaar tussen de dertig en de driehonderd kolonies' — getallen komen uit de alinea ervoor. Ok.
- na q11: 'De MIC is nul komma vijf milligram per liter' — MIC en 0,5 staan in de alinea ervoor. Ok.
- na q13: 'Bij elke deling maakt een bacterie kopieerfouten' — staat niet op de vraagkaart. Ok.

Op het beeld: het antwoordlabel is geschreven als `antwoord x: <inhoud>`, zodat bij Vragen uit alleen de inhoud blijft staan (BEELDAFSPRAKEN, 22 okt 2026).

## 4. Overlap met andere films

- *Welk antibioticum?* (`films/vervolg/geneeskunde-3-welk-antibioticum`): daar aangrijpingspunten van antibiotica, smal/breed, MRSA en isolatie; de remzone komt daar als beeld voor ('Rond één schijfje is geen heldere ring te zien'). **Hier niet opnieuw:** geen aangrijpingspunten, geen smal/breed, geen MRSA. Nieuw hier: de zone wordt gemeten en met een breekpunt vergeleken, en de MIC-reeks.
- *De mens als selectiefactor* (`films/evolutie/4-de-mens-als-selectiefactor`): selectiedruk in het lichaam, plasmiden en ESBL. **Hier niet opnieuw:** geen ESBL, geen darmselectie na een kuur. Nieuw hier: dezelfde selectie zichtbaar op één plaat, met de telling erbij, en conjugatie als mechanisme met pilus in beeld.
- *Je darmbewoners* (`films/voeding/6-je-darmbewoners`): daar is 'hij is door de kuur resistent geworden' al een afleider. Dezelfde misconceptie, maar daar over uitgroei zonder concurrentie; hier over hoe het allel ontstaat. Geen dubbeling in de uitleg.
- lt1 (preparaat en microscoop): Gramkleuring blijft hier buiten beeld; de identificatie gaat via kolonievorm en 'een paar tests', zonder microscopie uit te leggen.
- lt2 (van buisje tot uitslag): geen ijklijn en geen PCR. De verdunningsreeks gebruikt de gedeelde definitie uit de reeksbrief ('steeds een vaste fractie van het vorige buisje').
- lt3 (bloeduitslag): geen referentiewaarden, geen bloedbeeld. De grens bij de kolonietelling heet hier een breekpunt (antibiogram), niet een referentiewaarde.

## 5. Overige punten uit de eigen review

1. De cold open was 64 woorden met drie zinnen over de kuur; ingekort zodat hij onder 20 seconden blijft.
2. 'zevenendertig graden' en 'achttien uur' staan nu met 'ongeveer', en 35 graden bij de gevoeligheidsbepaling.
3. In H3 stond 'E. coli, uit de eigen darm' — dat is precies de zin uit *Welk antibioticum?*; herschreven naar de kolonievorm als determinatiestap.
4. Woordenaantal v1 ≈ 735; na de aanpassingen ≈ 740, bij 2,4 woorden per seconde ongeveer 5 minuten en 10 seconden narratie, plus vier vraagkaarten, titel en eindkaart.
5. Uitspraak: 'E. coli' moet in de stem-invoer 'E. kóólie' worden (UITSPRAAK.md, ronde 4). Nieuwe risicowoorden voor de wachtlijst: MIC, agar, entoog, conjugatie, pilus, Klebsiella, antibiogram, breekpunt, kve. Staan in `uitspraak.md`.
