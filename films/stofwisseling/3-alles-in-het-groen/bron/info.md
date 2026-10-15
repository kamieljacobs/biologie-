# Alles in het groen — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/stofwisseling/3-alles-in-het-groen.html` (bronmap: `films/stofwisseling/3-alles-in-het-groen/bron/`) |
| Titel / ondertitel | Alles in het groen · fotosynthese en assimilatie |
| Reeks / nummer | Stofwisseling (vwo), film 3 van 4; serie: 1 Alles versneld · 2 Alles op adem · 3 Alles in het groen · 4 De lever (volgt) |
| Doelgroep / niveau | 6 vwo (één niveau); Nectar 4.1, 20.3–20.4 (20.1–20.2 als gegeven); Binas 69B, 69C, 79D, 91A. Geen verdiepingszinnen of vwo-blokken |
| Versie / datum | versie 1.0 · 4 oktober 2026 (voettekst en "Bronnen en versie") |
| Stem / model | Roos (ElevenLabs, model eleven_multilingual_v2), volgens de pagina |
| Duur | 14:58 op de pagina (som van `dur`, 898,6 s); som van de audiobestanden 898,9 s (14:58), verschil = mp3-opvulling |
| Beeldstijl | Eigen canvasontwerp (1920×1080) dat zich in de code "stijlkaart biologiefilms, look Micro" noemt: donkere achtergrond (#121A26 met fijne beige korrel), gedempte vullingen met lichte randen, Fraunces/Source Sans 3/IBM Plex Mono. Eén look voor alle scènes, geen Macro/Schema-onderscheid zoals in Part C (v4, 11 okt) |
| Audio-opslag | 10 fragmenten, één mp3 per hoofdstuk (inclusief stiltes), als base64 in de HTML (`window.__AUDIO`, blobs 006–015); lettertypen blobs 001–005 |
| Reconstructie | 2026-10-12, uit de gepubliceerde HTML |

## Opbouw

10 hoofdstukken (opening + H1–H9). Begin en duur uit `window.FILM`; type en kernbeeld letterlijk uit de docenttabel "Hoe de film het uitlegt" (de typeletters zijn die van de prompt: A mechanisme, B structuur/functie, D regulatie/model, G grafiek).

| Hoofdstuk | Begin | Duur | Type | Kernbeeld (pagina, "Hoe de film het uitlegt") |
|---|---|---|---|---|
| Opening | 0:00 | 0:13 | — | Een eikel op een weegschaal (een paar gram), de eik groeit tot vele tonnen; de grond eronder is nauwelijks lichter. Stelt de puzzel. |
| H1 Een oude proef | 0:13 | 1:16 | — | Van Helmont: een wilgje van ongeveer 2 kg in een pot met afgewogen grond, vijf jaar alleen water; de wilg weegt 75 kg, de grond is 60 g lichter. Voorspelvraag: waar komt het droge hout vandaan? Na de onthulling: uit de lucht (CO2); Van Helmonts "water" klopt maar voor een klein deel; hout is vooral C, H en O; mineralen een paar procent. Titelkaart. |
| H2 Blad en bladgroenkorrel | 1:29 | 0:56 | B bouw en functie | Dwarsdoorsnede van een blad: plat en dun, licht van boven, CO2 door een huidmondje, lucht tussen de cellen, water uit de vaten. Eén chloroplast groot: dubbelmembraan, stroma, thylakoïden in grana, chlorofyl in het membraan; de twee delen van de fotosynthese. |
| H3 De lichtreactie | 2:25 | 2:28 | A mechanisme | LightSim: het thylakoïdmembraan in close-up (thylakoïdruimte boven, stroma onder). Licht op het chlorofyl, een elektron de keten in, het gat wordt gevuld uit water (O2 eruit, H+ in het thylakoïd); de pomp, de H+-teller, ATP-synthetase (zelfde principe als in het mitochondrium), het tweede chlorofyl, NADP+ wordt NADPH,H+. Fotofosforylering; cyclisch als korte variant; samenvatting. |
| H4 De calvincyclus | 4:54 | 2:01 | A mechanisme + tellen | Eerste ronde aan de woorden: rubisco koppelt CO2 aan ribulose-1,5-difosfaat, uiteenvallen in 2 × 3 C, reductie met NADPH,H+ en ATP tot glyceraldehyde-3-fosfaat. Daarna draait CalvinSim en telt een kaart drie rondes: 15 C + 3 C = 18 C, zes G3P, vijf terug, één over; uit twee G3P een glucose. Voorspelvraag licht uit: de kringloop stokt zonder nieuw ATP en NADPH,H+; "donkerreactie" is een verwarrende naam. |
| H5 Atomen tellen | 6:55 | 1:24 | atomen volgen | De C-atomen van 6 CO2 in één glucose; 12 H2O voor 6 O2. Voorspelvraag: waar komen de O-atomen in glucose vandaan? Na de onthulling: uit CO2 (6 in glucose, 6 in nieuw water); de biologisch juiste samenvatting 6 CO2 + 12 H2O → C6H₁2O6 + 6 H2O + 6 O2. Massabalk van glucose: C en O ruim 90 %, allebei uit CO2 → het antwoord op de eik. Fotosynthese is niet gewoon het omgekeerde van dissimilatie. |
| H6 Glucose als grondstof | 8:19 | 2:39 | B + verhaal | Eén glucose uit een eikenblad; een schema bouwt op: dissimilatie (brandstof; de chloroplast maakt wel ATP, maar de calvincyclus gebruikt die zelf), zetmeel (reservestof; jodiumproef met folie als voorspelvraag), sacharose (transportsuiker via de bastvaten), cellulose (bouwstof; bijna de helft van droog hout), vet in zaden, eiwitten en meer met mineralen (stikstof als voorspelvraag; nitraat, fosfaat, magnesium; N-P-K; micronutriënten zoals ijzer); mest is geen voedsel. |
| H7 Groeien of krimpen | 10:57 | 1:46 | D model | Plantmodel met twee stromen (CO2 in: assimilatie; CO2 uit: dissimilatie, dag en nacht) en een biomassabalk. Grafiek netto CO2-opname tegen lichtintensiteit: bij nul alleen dissimilatie, compensatiepunt, netto en bruto. Voorspelvraag: kamerplant op het compensatiepunt (overdag gelijk, 's nachts af). Varen met een lager compensatiepunt; de eik in de winter teert op zetmeel. |
| H8 Wat remt de fotosynthese? | 12:43 | 1:23 | D model | Fotosynthesesnelheid tegen lichtintensiteit: licht beperkend in het stijgende deel, daarna iets anders (CO2); tweede lijn met extra CO2; kas met ± 2× zoveel CO2. Voorspelvraag: CO2 op een donkere winterdag helpt nauwelijks. Temperatuur (enzymen). Absorptiespectrum 400–700 nm: blauw en rood geabsorbeerd, groen het minst (weerkaatst); ledkassen roze-paars. |
| H9 Terug naar de eik | 14:06 | 0:53 | — | De vraag van het begin, met 5 s om het eerst zelf te zeggen; het antwoord bouwt op rond de eik: water uit de bodem, CO2 uit de lucht, calvincyclus en energie uit licht, cellulose en andere stoffen, een klein beetje mineralen. Eindkaart. |

Leerdoelen en dekking (pagina):

| Leerdoel (de leerling kan …) | Hoofdstuk | Getoetst met |
|---|---|---|
| 1 Bouw van de chloroplast (dubbelmembraan, stroma, thylakoïden in grana); lichtreactie in de thylakoïden, calvincyclus in het stroma | H2 | checkvraag 1 |
| 2 Lichtreactie: water splitsen, O2 vrij, elektronenketen, H+ pompen, ATP-synthetase; NADP+ → NADPH,H+; niet-cyclisch en cyclisch | H3 | voorspelvraag H3 · checkvragen 1 en 2 |
| 3 Calvincyclus: rubisco, ribulose-1,5-difosfaat, koolstofassimilatie, reductie tot glyceraldehyde-3-fosfaat, glucose uit twee G3P | H4 | voorspelvraag H4 · checkvraag 3 |
| 4 Atomen volgen: C in glucose uit CO2, O2 uit water; de biologisch juiste samenvatting | H1, H5 | voorspelvragen H1 en H5 · checkvragen 2 en 4 |
| 5 Glucose als grondstof: dissimilatie en voortgezette assimilatie; mineralen, macro- en micronutriënten | H6 | voorspelvragen H6 (jodium, stikstof) · checkvraag 6 |
| 6 Dissimilatie dag en nacht; biomassa; compensatiepunt; netto en bruto fotosynthese | H7 | voorspelvraag H7 · checkvraag 5 |
| 7 Beperkende factoren in een grafiek; absorptiespectrum en lichtkleur | H8 | voorspelvraag H8 · checkvraag 5 |

## Vragen

Acht voorspelvragen: H1, H3, H4, H5, H6 (twee), H7, H8; H2 en H9 hebben geen vraag. In H9 een open pauze van 5 s (segment `pause`). Bij geen enkele optie is `mis` (verleidelijk) gezet, anders dan in film 1 en 2; de docenttabel noemt ook geen "verleidelijk". Niveau: alle vragen 6 vwo. Tijden op de filmklok.

| # | Plek (filmklok) | Vraag | Opties | Juist | Verleidelijk |
|---|---|---|---|---|---|
| 1 | H1 · 0:40 | Waar komt het grootste deel van het hout vandaan, als je het water eruit droogt? | A. Uit de grond. · B. Uit het water. · C. Uit de lucht. | C | — (niet gemarkeerd) |
| 2 | H3 · 2:46 | Water geeft elektronen af. De plant geeft O₂ af. Waar komen de O-atomen in die O₂ vandaan? | A. Uit CO₂. · B. Uit water. · C. Uit CO₂ en water allebei. | B | — (niet gemarkeerd) |
| 3 | H4 · 6:22 | Een plant staat in het licht. Je doet het licht uit. Wat gebeurt er met de calvincyclus? | A. Die gaat gewoon door; hij gebruikt geen licht. · B. Die stopt binnen korte tijd. · C. Die gaat juist sneller. | B | — (niet gemarkeerd) |
| 4 | H5 · 7:09 | Alle O-atomen uit dat water komen in O₂. Waar komen de O-atomen in glucose dan vandaan? | A. Uit water. · B. Uit CO₂. · C. Uit O₂ uit de lucht. | B | — (niet gemarkeerd) |
| 5 | H6 · 8:59 | 's Ochtends dek je een deel van een blad af met aluminiumfolie. 's Avonds kleur je het blad met jodium. Wat zie je? | A. Het hele blad wordt blauwzwart. · B. Alleen het belichte deel wordt blauwzwart. · C. Alleen het afgedekte deel wordt blauwzwart. | B | — (niet gemarkeerd) |
| 6 | H6 · 9:57 | Een plant maakt eiwitten uit glucose. Welk element zit wel in eiwitten, maar niet in glucose? De plant haalt het uit de bodem. | A. Koolstof (C). · B. Stikstof (N). · C. Kalium (K). | B | — (niet gemarkeerd) |
| 7 | H7 · 11:53 | Een kamerplant staat in een hoek. Overdag is het licht daar precies zo sterk als het compensatiepunt. 's Nachts is het donker. Hoe verandert de plant in een paar weken? | A. Zijn biomassa neemt langzaam toe. · B. Zijn biomassa blijft gelijk. · C. Zijn biomassa neemt langzaam af. | C | — (niet gemarkeerd) |
| 8 | H8 · 13:10 | Een tuinder verhoogt het CO₂-gehalte in zijn kas op een donkere winterdag, zonder lampen. Wat gebeurt er met de fotosynthese? | A. Die neemt sterk toe. · B. Die verandert nauwelijks. · C. Die neemt af. | B | — (niet gemarkeerd) |

Docenttabel "Pauze- en bespreekmomenten" (pagina, letterlijk; "Waar" = hoofdstuk + tijd binnen het hoofdstuk):

| Waar | Vraag | Antwoord | Waarom lastig · doorvraag |
|---|---|---|---|
| H1 0:28 | Waar komt het grootste deel van het hout vandaan, als je het water eruit droogt? | C. Uit de lucht. | "Massa uit de grond" is de intuïtie; gas voelt niet als iets dat zwaar kan zijn. Hoe kan een gas tonnen hout worden? |
| H3 0:21 | Water geeft elektronen af. De plant geeft O2 af. Waar komen de O-atomen in die O2 vandaan? | B. Uit water. | De vergelijking CO2 + H2O → glucose + O2 nodigt uit om O2 aan CO2 te koppelen. Waar blijven de O-atomen van CO2 dan? |
| H4 1:28 | Een plant staat in het licht. Je doet het licht uit. Wat gebeurt er met de calvincyclus? | B. Die stopt binnen korte tijd. | "Donkerreactie" en "gebruikt geen licht" klinken alsof licht er niet toe doet. Hoe lang kan de kringloop door op de voorraad ATP en NADPH,H+? |
| H5 0:15 | Alle O-atomen uit dat water komen in O2. Waar komen de O-atomen in glucose dan vandaan? | B. Uit CO2. | Na H3 (O2 uit water) is "O in glucose ook uit water" een voor de hand liggende, maar foute conclusie. Waarom staat er dan water aan beide kanten van de vergelijking? |
| H6 0:41 | 's Ochtends dek je een deel van een blad af met aluminiumfolie. 's Avonds kleur je het blad met jodium. Wat zie je? | B. Alleen het belichte deel wordt blauwzwart. | Het verband zetmeel ↔ licht ↔ plaats in het blad vraagt om combineren van H4 en H6. Wat zie je als je het blad eerst een nacht in het donker zet? |
| H6 1:39 | Een plant maakt eiwitten uit glucose. Welk element zit wel in eiwitten, maar niet in glucose? De plant haalt het uit de bodem. | B. Stikstof (N). | Leerlingen zoeken het verschil tussen eiwit en glucose vaak in C of in "iets uit de lucht". In welke vorm neemt de plant stikstof op, en waarom werkt stikstofgas (N2) uit de lucht niet? |
| H7 0:55 | Een kamerplant staat in een hoek. Overdag is het licht daar precies zo sterk als het compensatiepunt. 's Nachts is het donker. Hoe verandert de plant in een paar weken? | C. Zijn biomassa neemt langzaam af. | "Compensatiepunt = de plant blijft gelijk" vergeet de nacht. Hoeveel hoger moet het licht overdag liggen om de nacht te compenseren? |
| H8 0:28 | Een tuinder verhoogt het CO2-gehalte in zijn kas op een donkere winterdag, zonder lampen. Wat gebeurt er met de fotosynthese? | B. Die verandert nauwelijks. | "Meer CO2 = meer fotosynthese" wordt als algemene regel onthouden. Wanneer loont CO2 doseren in een kas wél? |

Zes checkvragen in examenstijl (2 of 3 punten, `id="checkvragen"`, regel 492–494): 1 lage pH in het thylakoïd (2p), 2 ¹⁸O in CO₂ (2p), 3 ribulose-1,5-difosfaat na licht uit (2p), 4 waarom 12 H₂O, NADPH,H⁺ per glucose (3p), 5 grafiek netto O₂-afgifte bij twee CO₂-gehaltes (3p), 6 bodem zonder magnesium en nitraat (3p).

## Begrippen

26 begrippen, bron "Nectar Samengevat 20.3/20.4" of "omschrijving bij de film". Geen vwo- of verdiepingsmarkering.

| Begrip | Betekenis | Bron | H. |
|---|---|---|---|
| fotosynthese | vorming van glucose uit CO2 en water met energie uit licht, in chloroplasten; daarbij komt O2 vrij | omschrijving bij de film | 2, 5 |
| chloroplast (bladgroenkorrel) | celorganel omgeven door een dubbelmembraan; in het stroma liggen thylakoïden in grana opgestapeld | Nectar Samengevat 20.3 | 2 |
| stroma | de vloeistof vol enzymen binnen het dubbelmembraan van de chloroplast; hier draait de calvincyclus | omschrijving bij de film | 2, 4 |
| thylakoïd | plat zakje in het stroma; in het membraan zit chlorofyl en vindt de lichtreactie plaats | omschrijving bij de film | 2, 3 |
| grana | stapels thylakoïden | Nectar Samengevat 20.3 | 2 |
| chlorofyl | de groene kleurstof in het thylakoïdmembraan die licht absorbeert, vooral blauw en rood | omschrijving bij de film | 2, 3, 8 |
| lichtreactie | in de thylakoïden: licht splitst water (O2 komt vrij) en levert ATP en NADPH,H+ | omschrijving bij de film | 3 |
| NADP+ / NADPH,H+ | co-enzym dat in de lichtreactie elektronen en H+ opneemt en ze in de calvincyclus weer afgeeft; lijkt op NAD+ uit film 2, met één fosfaat extra | omschrijving bij de film | 3, 4 |
| ATP-synthetase | eiwit in het thylakoïdmembraan dat de terugstromende H+ gebruikt om ATP te maken (zelfde principe als in het mitochondrium) | omschrijving bij de film | 3 |
| niet-cyclische fotofosforylering | de elektronen gaan van water via de keten naar NADP+; er ontstaan ATP en NADPH,H+ | Nectar Samengevat 20.3 | 3 |
| cyclische fotofosforylering | de elektronen gaan na het tweede chlorofyl terug naar de pomp in de keten; er ontstaat alleen ATP | Nectar Samengevat 20.3 | 3 |
| calvincyclus | kringloop van enzymreacties in het stroma waarin CO2 wordt vastgelegd; gebruikt ATP en NADPH,H+ uit de lichtreactie | Nectar Samengevat 20.3 | 2, 4 |
| rubisco | het enzym dat CO2 koppelt aan ribulose-1,5-difosfaat | Nectar Samengevat 20.3 | 4 |
| ribulose-1,5-difosfaat | stof met vijf C-atomen waaraan rubisco CO2 bindt; wordt in de kringloop teruggevormd | Nectar Samengevat 20.3 | 4 |
| koolstofassimilatie | het binden van C-atomen uit CO2 in een organische stof (in de calvincyclus) | Nectar Samengevat 20.3 | 4 |
| glyceraldehyde-3-fosfaat | stof met drie C-atomen die na de reductie ontstaat; uit twee ervan ontstaat een glucose | Nectar Samengevat 20.3 | 4 |
| assimilatie | uit kleine stoffen grotere organische stoffen opbouwen | omschrijving bij de film | 4, 7 |
| dissimilatie | organische stoffen afbreken (tot CO2 en water); een plant doet dat dag en nacht, in het grondplasma en de mitochondriën | omschrijving bij de film | 4, 6, 7 |
| voortgezette assimilatie | uit glucose (en mineralen) andere organische stoffen maken: zetmeel, sacharose, cellulose, vet, eiwitten | Nectar Samengevat 20.4 | 6 |
| sacharose | de transportsuiker van de plant: glucose en fructose aan elkaar; gaat via de bastvaten | Nectar Samengevat 20.4 | 6 |
| macro- en micronutriënten | mineralen die een plant veel (N, P, K, S, Mg, Ca) of heel weinig (bijv. ijzer) nodig heeft | Nectar Samengevat 20.4 | 6 |
| biomassa | alle organische stof in de plant; neemt toe als de assimilatie groter is dan de dissimilatie | Nectar Samengevat 20.4 | 7 |
| compensatiepunt | de lichtintensiteit waarbij assimilatie en dissimilatie even groot zijn: de netto CO2-opname is nul | Nectar Samengevat 20.4 | 7 |
| netto en bruto fotosynthese | netto is wat je meet (opname min afgifte); bruto is de netto fotosynthese plus de dissimilatie | omschrijving bij de film | 7 |
| beperkende factor | de factor die de snelheid van de fotosynthese begrenst (lichtintensiteit, lichtkleur, CO2-concentratie, temperatuur, pH) | Nectar Samengevat 20.4 | 8 |
| absorptiespectrum | grafiek die laat zien welke kleuren licht (golflengtes) een plant absorbeert | Nectar Samengevat 20.4 | 8 |

## Docentdeel

Sectie `id="docent"`: leerdoelen (zie Opbouw), hoe de film het uitlegt (zie Opbouw), misvattingen, pauzemomenten (zie Vragen), getallen met bronnen, vereenvoudigingen. Verder: "Achtergrond: wat de film weglaat of vereenvoudigt" (regel 471–481: fotorespiratie/C4/CAM, fotosysteem I en II, lichtactivering van de calvincyclus, actiespectrum, pH als beperkende factor, Van Helmont historisch, ¹⁸O-proef, van G3P naar zetmeel/sacharose, chemosynthese), "Over de simulaties" (LightSim H3, CalvinSim H4, rekenmodel H7–H8 zonder getallen) en "Practicum bij de film" (jodiumproef met folie; waterpest-belletjes bij verschillende lampafstand en NaHCO₃).

Misvattingen die de film aanpakt:

| Misvatting | Waar en hoe |
|---|---|
| Een plant haalt zijn massa uit de grond. | Opening en H1 (Van Helmont: de grond is 60 g lichter); voorspelvraag H1; H5 (massabalk: C en O uit CO2); H9. |
| De O2 die een plant afgeeft, komt uit CO2. | H3: het chlorofyl krijgt zijn elektron uit water, O2 ontstaat bij het splitsen; de ¹⁸O-proef bij algen; voorspelvraag H3; H5: 12 H2O voor 6 O2. |
| De O-atomen in glucose komen uit water. | H5: alle O uit water gaat in O2; de O in glucose en in nieuw water komt uit CO2; voorspelvraag H5; checkvraag 2. |
| Planten dissimileren niet, of alleen 's nachts. | H6 (dissimilatie als brandstof, "net als bij jou") en H7 ("dag en nacht"; de uitstroom staat altijd aan); voorspelvraag H7. |
| De calvincyclus is een donkerreactie die in het donker loopt. | H4: de kringloop stokt als het licht uitgaat (ATP en NADPH,H+ komen alleen uit de lichtreactie, de voorraad is klein); voorspelvraag H4; checkvraag 3. |
| Meer licht of meer CO2 helpt altijd. | H8: de lijn wordt vlak; wat helpt, hangt af van de beperkende factor; voorspelvraag H8 (CO2 op een donkere dag). |
| Mest is voedsel voor planten. | H6: mest levert alleen mineralen; het voedsel (glucose) maakt de plant zelf; voorspelvraag H6 (stikstof). |
| Groen licht is het belangrijkst voor planten. | H8: chlorofyl absorbeert groen het minst; een deel wordt weerkaatst, daarom zie je bladeren groen; ledkassen zijn roze-paars. |
| Een chloroplast maakt al ATP, dus een plant hoeft niet te dissimileren. | H6: de calvincyclus gebruikt die ATP zelf; 's nachts is er geen lichtreactie en wortels hebben geen chloroplasten. |

De getallen achter de film:

| Wat | Waarde | Zo gezegd of getoond | Bron |
|---|---|---|---|
| Eikel | ≈ 5 g (zomereik 2,8–6,0 g) | "een paar gram" (opening) | Dendrobiology 47 suppl. |
| Volwassen eik | orde van grootte: tonnen | "vele tonnen" | schatting (orde van grootte) |
| Van Helmont: wilg begin / eind | 5 lb → 169 lb 3 oz (≈ 2,3 → 77 kg) | "ongeveer twee kilo" → "vijfenzeventig kilo" (gemeten, afgerond) | Ortus Medicinae 1648; vertaling Saupe |
| Van Helmont: grond | 200 lb gedroogd, −2 oz (≈ −57 g) | "zo'n zestig gram lichter" | idem; Hershey 1991 |
| Water in levend hout | ≈ 43–45 % van de verse massa (wilg) | "voor ongeveer de helft water" (H1, H9) | USDA Wood Handbook tabel 4-1 |
| Elementen in droog hout | C 50 % · O 44 % · H 6 %; as < 1 % | "C, H en O"; mineralen "in hout nog minder" | Pettersen 1984 |
| Mineralen in droge plantenstof | N 1,5 · K 1,0 · Ca 0,5 · Mg 0,2 · P 0,2 · S 0,1 % (≈ 3,5 %); Fe ≈ 100 ppm | "een paar procent" | Epstein 1972 |
| Massa van glucose | C 72 + O 96 + H 12 = 180 u; C + O ≈ 93 % | massabalk H5: "ruim negentig procent" | berekend (C 12, O 16, H 1) |
| Cellulose in droog hout | 40–50 % (hemicellulose 25–35 %, lignine 18–35 %) | "bijna de helft" (H6) | Pettersen 1984 |
| Calvincyclus per G3P | 3 CO2 + 9 ATP + 6 NADPH,H+ → 1 G3P (3 C) | telling H4: 3 rondes, 15 + 3 = 18 C, 6 G3P, 5 terug, 1 over | Binas 69C; Berg e.a. |
| Water splitsen | 2 H2O → O2 + 4 H+ + 4 e−; 12 H2O → 6 O2 | H3 (LightSim: O2 per twee gesplitste H2O), H5 | stoichiometrie |
| ¹⁸O-proef | Ruben, Randall, Kamen & Hyde 1941, met de alg Chlorella | "gemeten, bij algen" (H3) | J Am Chem Soc 63: 877 |
| H+ en ATP in het model van H3 | 2 H+ per gesplitst water in het thylakoïd; 1 H+ gepompt per elektron; 1 ATP per 3 H+ door ATP-synthetase | H+-teller en ATP in H3 | schematisch (zie vereenvoudigingen) |
| CO2 buiten / in de kas | ≈ 425 ppm / ≈ 800 ppm (een ongedoseerde kas kan tot ≈ 250 ppm zakken) | "zo'n twee keer zoveel als buiten" (H8) | NOAA Mauna Loa; Groentennieuws |
| Absorptiepieken chlorofyl | a ≈ 430 en 662 nm · b ≈ 453 en 642 nm (opgelost) | absorptiespectrum H8 (schematisch, één lijn) | standaardwaarden; Binas |
| Groen licht in een blad | een heel blad absorbeert toch het grootste deel van het groene licht | "het minst"; "een deel wordt weerkaatst" (H8) | Terashima e.a. 2009 |
| Grafieken H7 en H8 | verzadigingscurve P = Pmax·L/(K+L), netto = bruto − dissimilatie; varen: lagere dissimilatie en Pmax | model, zonder getallen op de assen | deze film |
| Looptijd | 14:58 | inclusief acht vraagsegmenten van 11,5 s en een pauze van 5 s in H9 | deze film |

Vereenvoudigingen en waarom:

| Wat | Toelichting |
|---|---|
| Model, vertraagd, minder moleculen, niet op schaal | Echt gaat het veel sneller met ontelbaar veel moleculen; dat is niet te volgen. |
| Kleuren | Zoals in film 2: amber = glucose en C-ketens (en de H-atomen en elektronen); groen = CO2 en water; grijs = O2, H+ en dragers (NADP+); rood-oranje = ATP, ADP en fosfaat; blauw = eiwit. Nieuw: plantweefsel en chlorofyl olijfgroen (bewust anders dan het molecuulgroen), licht als gele golflijn. |
| Fotosystemen | De film zegt "chlorofyl" en "een tweede chlorofyl"; de namen fotosysteem II en I (Binas 69B) staan niet in beeld. In werkelijkheid zitten honderden chlorofylmoleculen per fotosysteem; het model tekent een handvol schijfjes. |
| Elektronenketen in H3 | De keten is getekend als één pomp tussen de twee chlorofylcomplexen en één reductiecomplex bij NADP+; echte tussendragers (plastochinon, cytochroom b6f, plastocyanine, ferredoxine) zijn weggelaten. De elektronen wachten in het model bij het tweede chlorofyl tot dat in de uitleg aan de beurt is. |
| H+ in H3 | Het model pompt 1 H+ per elektron en laat 2 H+ per gesplitst water in het thylakoïd achter; ATP-synthetase maakt 1 ATP per 3 H+. Echte verhoudingen liggen anders (ongeveer 4 H+ per ATP in chloroplasten), maar de boodschap is dezelfde: het H+-verschil drijft ATP-synthetase aan. De teller telt de deeltjes in de simulatie. |
| O2 per twee water | In het model ontstaat één O2 zodra twee H2O zijn gesplitst (4 elektronen), zoals in de stoichiometrie 2 H2O → O2 + 4 H+ + 4 e−. |
| Cyclische fotofosforylering | Alleen genoemd en kort getoond (de elektronen gaan van het tweede chlorofyl terug naar de pomp); niet verder uitgewerkt, zoals afgesproken. |
| Calvincyclus | Eén ronde is getekend als: rubisco bindt CO2 aan ribulose-1,5-difosfaat, het product valt uiteen in twee stoffen met 3 C, die worden gereduceerd tot glyceraldehyde-3-fosfaat. De tussenstof (3-fosfoglyceraat) wordt niet genoemd; de terugvorming van ribulose-1,5-difosfaat (een reeks reacties, met ATP) is één pijl. De telling over drie rondes volgt Nectar/Binas: 6 G3P, 5 terug, 1 over; glucose uit twee G3P. |
| Licht uit in H4 | In het model stopt de aanvoer van ATP en NADPH,H+ bij de onthulling en stokt de kringloop binnen enkele seconden; in werkelijkheid duurt dat wat langer en speelt ook de lichtactivering van enzymen mee (zie achtergrond). |
| O-atomen in H5 | Pas na de onthulling krijgt O een herkomstkleur. De "biologisch juiste samenvatting" met 12 H2O links en 6 H2O rechts volgt Nectar 20.3; de nettovorm met 6 H2O staat niet apart in beeld. |
| Massabalk | Atoommassa's afgerond: C 12, O 16, H 1. "Ruim negentig procent" is 168/180 = 93 %. |
| Schema van H6 | Zes kaarten voor de hoofdlijnen; nucleïnezuren en de vele andere stoffen vallen onder "eiwitten en meer". De jodiumproef is schematisch getekend (één blad, de helft onder folie). |
| Plantmodel en grafieken in H7 | De stromen en de biomassabalk zijn een model zonder getallen: de balk groeit of krimpt met het verschil tussen in- en uitstroom. De grafiek is een verzadigingscurve met een vaste dissimilatie; de varen heeft een lagere dissimilatie en een lager maximum. Bij een "dag" en "nacht" in het model springt het licht aan of uit op het gesproken woord. |
| Beperkende factoren in H8 | Twee verzadigingscurves (normaal en extra CO2) zonder getallen op de assen. Het temperatuurgrafiekje is de bekende enzymcurve. pH staat in de begrippenlijst en bij Nectar, niet in de film. |
| Absorptiespectrum | Eén schematische lijn voor "chlorofyl" (pieken bij ongeveer 430 en 660 nm); chlorofyl a en b en de carotenoïden zijn niet apart getekend. De kleurband onder de as is schematisch. |
| Woordkeuze | De film volgt Nectar: thylakoïden, grana, NADPH,H+, ribulose-1,5-difosfaat, glyceraldehyde-3-fosfaat, koolstofassimilatie, voortgezette assimilatie, compensatiepunt, macro- en micronutriënten. Afkortingen als RuBP, G3P, PS I/II staan niet in beeld. |

## Techniek: waar zit wat in de HTML

Specifiek voor deze film: `window.FILM` op regel 3571; `window.__AUDIO` op regel 505; scènes:
`SCENES['0']` r2776 · `SCENES['1']` r2813 · `SCENES['2']` r2880 · `SCENES['3']` r2972 · `SCENES['4']` r3099 · `SCENES['5']` r3206 · `SCENES['6']` r3267 · `SCENES['7']` r3334 · `SCENES['8']` r3443 · `SCENES['9']` r3516.

Welk blob bij welk hoofdstuk:

| Hoofdstuk | `audio`-sleutel | Blob | Duur (ffprobe) | `dur` in FILM | Takes |
|---|---|---|---|---|---|
| Opening | `audio/ch_0.mp3` | 006.mp3 | 12,83 s | 12,791 s | 0a |
| H1 Een oude proef | `audio/ch_1.mp3` | 007.mp3 | 76,30 s | 76,255 s | 1a, 1b |
| H2 Blad en bladgroenkorrel | `audio/ch_2.mp3` | 008.mp3 | 56,48 s | 56,450 s | 2a, 2b |
| H3 De lichtreactie | `audio/ch_3.mp3` | 009.mp3 | 148,11 s | 148,076 s | 3a, 3b, 3c, 3d, 3e, 3f |
| H4 De calvincyclus | `audio/ch_4.mp3` | 010.mp3 | 121,16 s | 121,124 s | 4a, 4b, 4c, 4d |
| H5 Atomen tellen | `audio/ch_5.mp3` | 011.mp3 | 83,93 s | 83,904 s | 5a, 5b, 5c, 5d |
| H6 Glucose als grondstof | `audio/ch_6.mp3` | 012.mp3 | 158,59 s | 158,551 s | 6a, 6b, 6c, 6d, 6e, 6f |
| H7 Groeien of krimpen | `audio/ch_7.mp3` | 013.mp3 | 105,74 s | 105,704 s | 7a, 7b, 7c, 7d |
| H8 Wat remt de fotosynthese? | `audio/ch_8.mp3` | 014.mp3 | 82,91 s | 82,876 s | 8a, 8b, 8c, 8d |
| H9 Terug naar de eik | `audio/ch_9.mp3` | 015.mp3 | 52,87 s | 52,827 s | 9a, 9b |

Film-eigen modules: `parts3.js` (regel 2529, tekenset fotosynthese: plant, blad, chloroplast, ketens), `sim3.js` (regel 2622, `LightSim` en `CalvinSim`, gedraaid met `SIM2.Run`). Ook alle modules van film 2 (`draw2.js`, `sim2.js`, `models2.js`, `parts2.js`, `etc2.js`) en film 1 (`sim.js`, `models.js`) zitten erin; `draw2`, `parts2` en `sim2` (en via `sim2` ook `SIM.RNG` uit `sim.js`) worden gebruikt; `models.js`, `models2.js` en `etc2.js` niet. `FILM.curves` is leeg. Geen `TL.cue(...)`-registratie. Scènes met twee vragen (H6) gebruiken `TL.segs('question')[0]` en `[1]` (regel 3273).

Hoofdstukkaarten en eindkaart: `CM.withCard(scene, nr, titel, ondertitel)` onderaan elke scène (bijv. regel 2874); "HOOFDSTUK n VAN 9" in `chapterCard` (regel 1417). De opening heeft géén titelkaart: de titelkaart is het `title`-segment aan het eind van H1. Eindkaart: `SCENES['9']`, regel ≈ 3558–3564 (`const lines = [...]`, met "volgende film: de lever"). Hoofdstuklijst-label van de opening: `'De eik'` in `player.js`.

### Gedeelde bouwvorm (film 1–3)

Alle drie de films van de serie hebben dezelfde bouwvorm. Regelnummers hieronder gelden voor `film.src.html` (uitgepakt met `scripts/filmbron.py`); in de ingepakte film zijn ze gelijk, want elke blob staat op één regel.

**Opbouw van het bestand (van boven naar beneden)**
- `<style>` met kleurtokens (`--bg: #0D1420`, `--ink`, `--verd` …) en `@font-face` voor de vijf lettertypen (blobs 001–005: Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500).
- Pagina-HTML: titelkop (`<div class="lab">Uitlegfilm · 6 vwo · …</div>`), serienavigatie (`class="series"`), speler (`id="player"` → `id="stagebox"` met `<canvas id="stage">`, ondertitels `#cap`/`#capband`, vraagkaart `id="qcard"`, startscherm `id="poster"`, bediening, instellingen `id="settings"` met `#opt-auto` en `#opt-words`, Leerling/Klas-knoppen `[data-mode]`, hoofdstuklijst `id="chlist"`, gevuld door de speler).
- Tabbladen als secties: `id="over"`, `id="begrippen"`, `id="transcript"` (statische `<p><button class="ts" data-ch=".." data-t="..">`-regels, één per zin), `id="docent"`, `id="checkvragen"`, `id="bronnen"`.
- `<script>window.__AUDIO = {"audio/ch_0.mp3":"@@BLOB:006.mp3@@", …}` — de hoofdstuk-mp3's als base64.
- Eén groot `<script>` met de JS-modules achter elkaar, elk met een kopcommentaar `/* naam.js — … */`: `engine.js` (tekenhulp, kleuren `C`, 1920×1080-podium, `CAPTION_Y = 950`), `sim.js` (deeltjesmodel), `common.js` (`makeTL`, `chapterCard`, gedeelde onderdelen), `models.js`, en per film extra modules; daarna `window.SCENES = {}` en één functie per hoofdstuk `SCENES['0']`, `SCENES['1']`, … (elk met een beschrijvend kopcommentaar); dan `window.FILM = {…}` op één lange regel; dan de blob-omzetter (“één bestand: de audio zit in de pagina”) en `player.js`.

**`window.FILM` (de scriptdata, één JSON-regel)**
`FILM.chapters[i]` heeft: `key` ('0' = opening), `title`, `dur` (s, = lengte van het hoofdstuk-mp3 minus opvulling), `audio` ('audio/ch_i.mp3', de sleutel in `__AUDIO`), `hasQ`, `hasV` (verdieping, alleen voor het label in de hoofdstuklijst), en:
- `segments`: de tijdlijn van het hoofdstuk in s vanaf het begin van dat mp3: `intro`, `card` (hoofdstukkaart 3 s), `narr` (met `take`, bijv. '2b'), `gap`/`hold`/`tail` (stilte), `question` (met `q`, `opts[{k,text,mis}]`, `correct`, `count0`, `count1`, `reveal`), `qtail`, `title`, `pause`, `end`.
- `sentences`: per zin `n`, `text`, `t0`, `t1`, `take`, `verdieping` en `words[{w,t0,t1}]` — woordtijden uit de uitgelijnde audio.
- `phrases`: de ondertitelregels (`text`, `t0`, `t1`, `n` = zinnummer, `verd`, `w[[woord, t0]]`). De speler toont de frase waarvoor `t0 ≤ t < t1`.
- `FILM.curves`: gemeten grafiekdata (alleen gevuld in film 1; in film 2 en 3 leeg `{}`).

**Vraagtiming (vast patroon)**: elk vraagsegment duurt 11,5 s: kaart op `t0`, bedenktijd 8 s van `count0 = t0 + 3,5` tot `count1 = t0 + 11,5`, dan 0,6 s `qtail`, en `reveal` valt precies op het woord "Antwoord" van de volgende take (`words[0].t1`). Het mp3 bevat op die plek stilte; de speler pauzeert in `gate()` op `count1` tot er een antwoord (Leerling) of Verder (Klas) is.

**Audio**: één mp3 per hoofdstuk (mono, 44,1 kHz, ≈ 112 kbit/s), inclusief alle stiltes. Bij het laden maakt het blokje “één bestand: de audio zit in de pagina” van elke base64-string een `blob:`-URL in `ch.audio`. De audio is de klok: `clock()` leest `audio.currentTime`; op `ended` laadt de speler het volgende hoofdstuk. Zonder `__AUDIO` probeert hij `audio/ch_i.mp3` naast de pagina.

**Timing van het beeld**: scènes hangen aan woorden, niet aan vaste tijden. In elke `SCENES[k]` staat bovenaan `const T = { naam: W(zinnr, 'woord', [n-de keer], ['t0'|'t1']) , … }`; `TL.W` zoekt het woord (prefix, zonder leestekens) in `sentences[n].words` en geeft een fout als het niet bestaat. Verder `TL.seg('question')`, `TL.segs('hold')`, `TL.Q` (eerste vraag), `TL.S(n)`. Simulaties zijn deterministisch (vaste seed, vaste tijdstap) en worden vooruit gerekend (`sims[].advanceTo`).

**Speler** (`player.js`): Leerling/Klas (`?modus=klas` of `#klas`), Automatisch verder (localStorage), woorden meekleuren, CC, volledig scherm met schijn-volledig scherm op iPhone, toetsen (spatie, pijlen, A/B/C of 1/2/3, Enter = Verder in Klas). QA-haakje `window.__film` (`renderAt`, `cues`, `state`, `seek`, `choose`, `verder`). Er is géén Havo/Vwo-schakelaar.

## Zo pas je deze film aan

Werk altijd in de uitgepakte versie: `python3 scripts/filmbron.py uitpakken films/stofwisseling/3-alles-in-het-groen.html <tijdelijke map>`, bewerk `film.src.html` en/of vervang een bestand in `blobs/`, en pak in met `python3 scripts/filmbron.py inpakken <map> films/stofwisseling/3-alles-in-het-groen.html`.

1. Een gesproken zin wijzigen = dat hoofdstuk-mp3 opnieuw maken (één bestand per hoofdstuk, met stiltes). Plak de nieuwe take(s) met dezelfde stiltes, lijn uit, vervang in `FILM.chapters[i]` `dur`, `segments`, `sentences` en `phrases`, vervang `blobs/0xx.mp3` (zelfde naam; let op: hier loopt de reeks tot 015) en pak in. Werk transcript en looptijd 14:58 (kop regel 187, `#time` regel 220, getallentabel) bij.
2. Deze speler ondersteunt meerdere vragen per hoofdstuk (`curQ()`, antwoorden onder sleutel `hoofdstuk:j`); een extra vraag toevoegen kan dus in `segments`, maar de scène moet er wel op reageren (`TL.segs('question')[j]`).
3. Scènes hangen aan woorden via `W(zin, 'woord')`, ook met ₂ en ⁺ (`W(4, 'CO₂')`). Bij een nieuwe opname moeten die tekens in `sentences[].words` precies gelijk blijven.
4. Ondertitels: de speler zet alleen ⁺ ⁻ ₂ ₃ ₄ ₆ om naar `<sup>/<sub>`. In de ondertitels staat `C₆H₁₂O₆` zelf niet, maar wel op de pagina; daar is ₁ verkeerd omgezet (zie aandachtspunten).
5. Een voorspelvraag aanpassen: `segments` (`question`) in `window.FILM` en de docenttabel; bij een ander juist antwoord ook de take die begint met "Antwoord …" opnieuw opnemen. Overweeg dan `mis: true` te zetten bij de verleidelijke optie, zoals in film 1 en 2.

## Aandachtspunten

- Op de pagina staat de formule als `C<sub>6</sub>H₁<sub>2</sub>O<sub>6</sub>` (2×: kernbeeldtabel H5 regel 465 en checkvraag 4 regel 494): het subscript ₁ is blijven staan, dus het leest als "H₁2" in een ander lettertype. In het canvas (H5) staat `C₆H₁₂O₆` als Unicode; controleer of ₁ en ₂ daar goed renderen, want de speler meldt dat het lettertype ⁺ ⁻ ₂ ₃ ₆ niet heeft.
- Geen `mis`-markering (verleidelijke optie) bij de acht voorspelvragen; film 1 en 2 hebben die wel.
- Lettertypen: "Bronnen en versie" noemt IBM Plex Sans en Instrument Serif, maar het bestand bevat Fraunces, Source Sans 3 en IBM Plex Mono.
- Versiedatum vóór prompt v4/Part C, maar de code noemt zich "stijlkaart … look Micro". Alles staat in die donkere look, ook de macro-scènes (eik, wilg, blad, kas) en grafieken; volgens Part C zouden die Macro (eigen vlakke ecologielook) of Schema (navy) zijn. Plantweefsel en chlorofyl zijn olijfgroen gekozen om niet te botsen met het molecuulgroen.
- Ongebruikte modules van film 1 en 2 (`models.js`, `models2.js`, `etc2.js`) zitten in het bestand.
- Uitspraak bij heropname: "negentig" in "ruim negentig procent" (H5, 7:54) moet volgens de uitspraaklijst als "neguntig" worden ingevoerd; de stem-invoer staat niet in de HTML, dus controleer de huidige audio. "In de zeventiende eeuw" (H1) is in woorden, geen jaartal.
- Verbeterd 12-10-2026: formule C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> op beide plekken gecorrigeerd.

## Wijzigingen
- 15 okt 2026 — Speler: de knop Vragen aan/uit (onthouden in `bk-vragen`, ook `?vragen=uit`) werkt nu altijd, ook na spoelen, in pauze en als je hem halverwege omzet. Bij Vragen uit vallen weg: de vraag zelf, de gesproken vraagzin(nen) ervoor (zinnen op '?', 'Wat denk je?', 'Denk even na.', 'Eerst een voorspelling.') en een los antwoord direct erna ('Antwoord B.', 'Ja.', 'Nee.', 'Precies.'); gewone uitlegzinnen blijven staan. De tijdbalk, tijd en hoofdstuktijden tonen de ingekorte duur. Code: `bkBouw()` maakt `BK.k` (stukken die de speler overslaat); regelnummers in de spelercode zijn daardoor een paar regels verschoven. Hoofdstukkaart 2,2 s in plaats van 3,0 s: de speler slaat het stille midden van de kaart over (mp3 ongewijzigd). De oude `vraagVensters`/`slaVraagOver` zijn vervangen.

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

Engine: `g.callout()` zonder lijn (zie film 1). `P.pointer()` weg bij dubbelmembraan, thylakoïden in grana, chlorofyl (in het membraan) en ATP-synthetase; de kaartjes staan direct op/naast het onderdeel. De lijn van de bladcel naar de chloroplast (zoomlijn) bleef (Kamiel: "die lijntjes naar begrippen moeten sowieso weg"; zie `films/BEELDAFSPRAKEN.md`). Gecontroleerd op contactbladen. Regelnummers elders in dit bestand kunnen een paar regels verschoven zijn.
