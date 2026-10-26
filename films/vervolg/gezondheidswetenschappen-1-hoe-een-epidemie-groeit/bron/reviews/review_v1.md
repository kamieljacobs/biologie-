# Review script v1: Hoe een epidemie groeit en stopt

Reviewer: Claude, frisse reviewer. Ik heb het maken niet gezien. Mijn rollen: infectieziekte-epidemioloog/modelleur en didacticus biologie havo/vwo. Datum: 26 okt 2026.

Wat ik las:
- `hw/gz1/script_v1.md`, `brief.md` en `getallen.md` (alle drie helemaal);
- `films/vervolg/REEKS-gezondheid.md`;
- `films/BRONNEN.md`;
- als voorbeeld van de vorm: de review van Voedingsleer 1 en het bronnenlogboek van de haaienfilm;
- `personages/LEVENSLOOP.md` (Yasmin en Bilal).

Ik heb 31 bronnen zelf opnieuw geopend (lijst in `hw/gz1/bronnen.md`; de nummers B1–B46 volgen `getallen.md`, B46 is nieuw). Daarnaast heb ik zelf een SIR-model doorgerekend (Python, R₀ = 3, besmettelijke periode 5 dagen; eindgrootte met S∞ = e^(R₀(S∞−1))). De examensyllabus heb ik niet gebruikt: R, verdubbeltijd en SIR zijn geen examenstof, en groepsimmuniteit staat alleen als begrip in *Vaccins, allergie en bloedgroepen*.

**Samenvatting: 11 MOET, 20 KAN.**
- MOET = fout, te stellig, strijdig met een bron, met `getallen.md` of met de reeksbrief, of een vraag die te raden of dubbelzinnig is.
- KAN = beter, maar niet fout.

Gesproken tekst: ± 950 woorden (cold open t/m recap). Dat valt binnen de richtwaarde. Met de MOET-reparaties komen er ± 35 woorden bij.

Wat klopt en zo in `getallen.md` staat, noem ik hieronder niet meer:
- R = gemiddeld aantal mensen dat één zieke aansteekt (1; B27);
- R₀ corona ± 2 à 3, met 'schattingen verschillen per studie' in beeld (5; B1, B2, B5, B7, B45);
- het rekenvoorbeeld 10 × 1/20 × 5 = 2,5, als 'stel' (3; B8);
- 'R is ook een eigenschap van hoe wij met elkaar omgaan' (4; B8 letterlijk: 'not a biological constant');
- mazelen 'vaak wordt twaalf tot achttien genoemd' (6; B12, B8);
- de verdubbelreeks 10, 20, 40, 80, 160 en het woord verdubbeltijd (8);
- 'pas na een week of twee weet je hoe hoog R vandaag is' (12; B24, B25);
- piek ruim 1400 coronapatiënten op de ic, begin april (13; B31, B33);
- de som 1 − 1/3 = 2/3 ≈ 67 % en mazelen ± 95 % (15, 16; B2, B13, B12);
- 'vuistregel: mensen gaan niet willekeurig met elkaar om' (17; B2, B13);
- 'ook zonder maatregelen zakt R onder de één' (18; B17 via B18);
- 'ruim negen op de tien' bij R₀ = 3, steeds 'in dit eenvoudige model' (19; eigen berekening 94,1 %, B20);
- 'bijna honderd jaar oud' (Kermack & McKendrick 1927; B18);
- RIVM moest scenario's bijstellen, ic-ligduur langer dan gedacht (22; B7: aanname ~3 weken / 23 dagen; B25: eerst 10 dagen aangehouden, gemeten ± 20);
- Gezondheidswetenschappen in Enschede, Amsterdam en Maastricht (26; B38, B39, B40, B41, B46).

---

## Controle van de speciale punten

| | Punt | Uitkomst | Bronnen |
|---|---|---|---|
| a | 'In het model staat de curve op zijn piek als de balk de gouden lijn raakt' | **Klopt alleen voor het aantal mensen dat op dat moment besmettelijk is (I), en alleen als de balk 'besmet geweest of nu besmet' telt.** In het SIR-model piekt I precies als het aandeel vatbaren 1/R₀ is (B20: "setting (2) to zero … S = 1/R₀"; B19: "reaching herd immunity coincides with the prevalence I … reaching their maximum", en "a special feature of that particular model and not a general fact"). Maar het dossier stapelt **meldingen per dag** (nieuwe gevallen). Die piek ligt eerder. Mijn SIR-run (R₀ = 3, D = 5 d): nieuwe gevallen pieken op dag 33 bij 43 % ooit besmet (19 % hersteld); het aantal besmettelijken piekt op dag 36,5 bij 67 % ooit besmet, maar dan is pas **37 % hersteld**. De balk heet 'IMMUUN' en is groen (= hersteld). Met die balk en die curve klopt de zin niet. Zie F6. | B19, B20, eigen berekening |
| b | 'Ruim negen op de tien bij R₀ = 3' | ✓ Eindgrootte 94,1 % (eigen berekening, formule uit B20). Staat steeds met 'in dit eenvoudige model'. Goed. | B20, eigen berekening |
| c | 'De helft van de contacten geeft (ongeveer) de helft van R' | Klopt in de som R = c × p × D (B8). In het echt is het niet evenredig: je schrapt eerst de vluchtige contacten, huisgenoten blijf je zien. Geen bron die 'helft contacten = helft R' als algemene regel geeft. De RIVM-studie (B10) vond dat alle maatregelen samen de overdracht met ± 50 % verlaagden, maar dat is iets anders. Zie F2. | B8, B10 |
| d | 'R zakte tot rond de één, daarna eronder' | ≈ Toegeschreven aan het RIVM, en zo gezegd ('volgens het RIVM'). 25 maart: "op en nabij de 1" (B5); 1 april: "Effectieve R wordt kleiner dan 1 na 16 maart" (B7); september: "Ro door 1 op 16 maart" (B45). Achteraf zette het RIVM het kruispunt dus al op 16 maart. 'Tot rond de één, en daarna eronder' blijft verdedigbaar. 'Na de maatregelen' is in tijd, niet als oorzaak: neutraal. Goed. | B5, B7, B45 |
| e | Ic-getallen | 1150 = de **reguliere** capaciteit vóór de opschaling (B30: "De reguliere IC-capaciteit … 1150 bedden"; "Per 5 april 2020 … opgeschaald van 1150 naar 2400"). 1424 op 7 april: Gommers (LCPS-cijfer) in de Kamer (B31) en NOS (B33). **De stem zegt 'In het voorjaar van 2020 had Nederland er zo'n 1150'.** Dat klopt niet: in april waren het er ± 2400. Zie F3 en F4. | B30, B31, B33 |
| f | R₀ mazelen / griep | Mazelen ✓ (B12: "R0 is 12 tot 18"; B8: oorsprong 1912–1928, gepubliceerd 5,4–18). Griep: B6 mediaan 1,28, B11 gemiddeld 1,3 (0,9–2,1). **B11 noemt het uitdrukkelijk géén R₀:** "R0 cannot be estimated due to partial immunity". De stem zegt goed 'R' bij griep, maar het beeld zet griep in één rij met twee R₀'s. Zie F12. | B6, B8, B11, B12 |
| g | Opleidingen | Radboud: Epidemiology is **een specialisatie van de master Biomedical Sciences**, geen eigen master ("This specialisation is part of the Master's programme of Biomedical Sciences"; 2 jaar, 100 % Engels; stages o.a. RIVM en GGD's). Toelating vanaf BMW Nijmegen staat niet op de pagina (de toelatingspagina staat niet op de allowlist). UT: Gezondheidswetenschappen, Enschede, 3 jaar, Nederlands; de pagina noemt RIVM/GGD/epidemioloog **niet** als beroep, wel onderzoeker, beleidsadviseur, data-analist. VU: bestaat (Studiekeuze123; de VU noemt hem als verwante bachelor). Maastricht: bestaat (toelatingseisen UM, vwo alle profielen; havo niet direct). Zie F8, F9, F18. | B38, B39, B40, B41, B42, B46 |
| h | Toon bij corona | Zakelijk en neutraal. Geen sterfte, geen ic-beelden, maatregelen als feit met datum, geen oordeel. 'Zat Yasmin ineens thuis' is mild. In orde. | reeksbrief |
| i | Vragen uit | Alle zes antwoordalinea's beginnen met 'Antwoord x.' en lopen zonder de vraagzin. 'Afvlakken' komt bij Vragen uit pas in het antwoord voor, maar daar wordt het gedefinieerd: goed. Twee aandachtspunten in D6. | — |

---

## Pass 1: Feiten

**F1 (MOET, te stellig). H1: "R hangt af van drie dingen. Hoeveel contacten iemand heeft. De kans op besmetting per contact. En hoeveel dagen iemand besmettelijk is." Ook eindkaart regel 2.**
Dat zijn de drie factoren van **R₀** (B8: "a function of 3 primary parameters"). Het effectieve R hangt óók af van hoeveel mensen al immuun zijn (B8: R verandert met het aandeel vatbaren; B13). De film leert dat in H3 zelf ("daardoor zakt R vanzelf onder de één"), en de brief noemt het bij misconceptie 2 ('R hangt ook af van gedrag en immuniteit'). Nu spreekt H1 H3 tegen.
→ Stem: *"R hangt vooral af van drie dingen."* (+1 woord; H3 voegt de vierde dan vanzelf toe.)
→ Eindkaart: *"R hangt af van contacten, de kans per contact en hoe lang iemand besmettelijk is: dus ook van gedrag. En van hoeveel mensen al immuun zijn."*
Bronnen: B8 (A), B13 (A).

**F2 (MOET, te stellig). H1-antwoord: "De helft van de contacten geeft ongeveer de helft van R: één komma vijfentwintig."**
In de som klopt het precies (zie check c). Als algemene regel gaat het verder dan enige bron: je schrapt eerst losse contacten, huisgenoten blijven. De zin moet aan de som vastzitten.
→ *"Antwoord b. In de som halveert R dan ook: één komma vijfentwintig."* (zelfde lengte)
→ Optioneel, als het past: *"In het echt is het minder simpel: je huisgenoten blijf je zien."* (+9 woorden; dan ook in het docentdeel.)
Bronnen: B8 (A, de som); B10 (A, maatregelen samen ± 50 %).

**F3 (MOET, fout). H2: "In het voorjaar van tweeduizendtwintig had Nederland er zo'n elfhonderdvijftig. Op het drukste moment, begin april, lagen er ruim veertienhonderd coronapatiënten op de ic." Beeld: 'IC-BEDDEN ± 1150 (VOORJAAR 2020)'.**
- 1150 was de reguliere capaciteit **vóór** de opschaling. Op 5 april 2020 waren het er 2400 (B30). 'In het voorjaar' is dus fout.
- De stem noemt de opschaling niet. De leerling hoort 1150 bedden en 1400 patiënten, en denkt dat er honderden patiënten geen bed hadden. Het beeld zegt 'opgeschaald naar 2400', de stem niet (pauzetest).
→ *"Normaal heeft Nederland zo'n elfhonderdvijftig ic-bedden. Op het drukste moment, begin april tweeduizendtwintig, lagen er ruim veertienhonderd coronapatiënten op de ic. Ziekenhuizen schaalden snel op naar zo'n vierentwintighonderd bedden."* (+8 woorden)
→ Beeldlabel: *'IC-BEDDEN NORMAAL ± 1150'*, meta *'PIEK 7 APRIL 2020: 1424 COVID-PATIËNTEN OP DE IC · OPGESCHAALD NAAR 2400 BEDDEN (5 APRIL)'*.
Bronnen: B30 (A), B31 (B, LCPS-cijfer), B33 (B).

**F4 (MOET, eerlijke assen). H2-beeld: "Farid trekt een horizontale lijn 'IC-BEDDEN ± 1150' door het dossier."**
Het dossier is een oefendossier met ronde, verzonnen getallen en telt **meldingen per dag** (10, 20, … 160). Een echte lijn van 1150 **bedden** (bezetting, een andere grootheid) erdoor trekken mengt verzonnen en echte getallen op één as. Dat breekt de reeksafspraak 'modelcurve krijgt model, echte data krijgen bron en jaar' en de eigen keuze in het script ('echte getallen uit 2020 als apart kaartje').
→ In het dossier: lijn zonder getal, *'WAT DE ZORG AANKAN'*. De echte ic-getallen op een apart kaartje met bron en jaar (zoals de verdubbeltijd). Ook in H2 bij het tweede vel en bij 'piek onder de ic-lijn': dezelfde lijn zonder getal.
Bron: reeksbrief (Beeldafspraken).

**F5 (MOET, te stellig). H3-antwoord: "Ook wie niet immuun is, is dan beschermd."**
Bescherming boven de drempel is **indirect en gedeeltelijk**: de kans dat een zieke een vatbare treft wordt kleiner, maar "pockets of susceptible individuals are still at risk for local outbreaks" (B2). Bonten: groepsimmuniteit in de ene groep beschermt een andere groep niet automatisch (B13). Mazelen in groepen die weinig vaccineren is het voorbeeld (B12). De zin staat ook zo in de reeksbrief (gedeelde begrippen), net als in de voedingsreview (F4 daar): pas beide aan.
→ Stem: *"Ook wie niet immuun is, loopt dan veel minder kans."* (+2 woorden)
→ Reeksbrief, groepsimmuniteit: *'… en de uitbraak uitdooft; ook wie niet immuun is, loopt dan veel minder kans.'*
Bronnen: B2 (A), B13 (A), B12 (A).

**F6 (MOET, fout in stem en beeld). H3: "In het model staat de curve op zijn piek als de balk de gouden lijn raakt." Beeld: "op het moment dat hij de gouden lijn kruist, staat de curve op zijn piek".**
Zie check a. Met een groene balk 'IMMUUN' (hersteld) en een curve van meldingen per dag klopt het niet: de meldingen pieken bij ± 43 % ooit besmet, en als het aantal besmettelijken piekt is pas ± 37 % hersteld. De samenvallende piek is bovendien 'a special feature of that particular model and not a general fact' (B19). Er is een zin die wél voor elke definitie klopt: voorbij de lijn daalt het aantal nieuwe zieken.
→ Stem: *"Voorbij de gouden lijn komen er elke dag minder zieken bij. Maar wie dan nog ziek is, steekt nog anderen aan."* (vervangt de zin en de 'Maar'-zin; +4 woorden)
→ Beeld: laat de modelcurve uit een echte SIR-run tekenen (nieuwe gevallen per dag). Gouden streepje bij het kruispunt met de lijn, label *'VANAF HIER MINDER NIEUWE ZIEKEN'*; de piek van de stapel ligt dan iets links daarvan. Wil je het streepje precies op de piek: teken dan de curve 'NU BESMETTELIJK' (I) en noem de balk *'BESMET GEWEEST OF NU BESMET'*. Dat is voor havo te veel; ik raad de eerste aan.
Bronnen: B19 (B, gezaghebbende auteurs), B20 (B), eigen berekening. Geen A-bron nodig voor de herformulering: die is zwakker dan de oorspronkelijke bewering en volgt direct uit B17/B18.

**F7 (MOET, te stellig). H4-antwoord: "Een model voorspelt niet wat er gaat gebeuren." Eindkaart: "… het is geen voorspelling."**
Het RIVM maakte wél voorspellingen met zijn modellen: "providing weekly forecasts for IC occupancy" sinds 20 maart 2020, met een onzekerheidsband (B22). Van Dissel noemde ze "hulpmiddelen" (B5). Het punt van de film is: geen zekere uitkomst, en een scenario is een wat-als. Het label 'SCENARIO, GEEN VOORSPELLING' bij de knop klopt wel.
→ Stem: *"Antwoord a. Zo'n getal is geen zekere uitkomst. Het laat zien wat er zou kunnen gebeuren, als de aannames uitkomen."*
→ Eindkaart: *"Een model rekent uit wat er gebeurt áls de aannames kloppen; het is geen zekere voorspelling."*
Bronnen: B22 (A), B5 (A).

**F8 (MOET, fout). Recap: "In Nijmegen kun je na Biomedische Wetenschappen de Engelstalige master epidemiologie doen." Beeld: 'MASTER EPIDEMIOLOGY (ENGELSTALIG)'.**
Er is geen aparte master. Epidemiology is een specialisatie van de master Biomedical Sciences (B42). Toelating vanaf de bachelor BMW Nijmegen heb ik niet op een geopende pagina gezien; 'na' is aannemelijk, maar 'bijvoorbeeld' is veiliger. BMW Nijmegen heeft een numerus fixus en vraagt vwo (B43, niet zelf geopend, via `getallen.md`).
→ *"In Nijmegen kun je na Biomedische Wetenschappen een Engelstalige master doen met als richting epidemiologie."*
→ Beeld: *'WO · BIOMEDISCHE WETENSCHAPPEN → MASTER BIOMEDICAL SCIENCES, RICHTING EPIDEMIOLOGY (ENGELS) · NIJMEGEN'*.
Bron: B42 (A).

**F9 (MOET, te stellig). Recap: "Daarna werk je als epidemioloog bij de GGD of het RIVM."**
Na Gezondheidswetenschappen word je niet vanzelf epidemioloog. De UT noemt als beroepen onderzoeker, beleidsadviseur, zorgdata-analist (B38); epidemiologen komen uit veel opleidingen en volgen vaak nog een veldtraining (EPIET; B35). Meestal is er een master nodig.
→ *"Met een master kun je daarna bijvoorbeeld epidemioloog worden, bij de GGD of het RIVM."* (+4 woorden) Beeld: *'WERK: BIJV. EPIDEMIOLOOG BIJ GGD OF RIVM'*.
Bronnen: B35 (A), B38 (A).

**F10 (KAN). H1: "Aan het begin, als nog niemand beschermd is, heet dat R-nul."**
'Beschermd' is vaag (een mondkapje beschermt ook). De reeksbrief definieert R₀ als 'nog niemand immuun en niemand neemt maatregelen'; het beeld zegt 'IMMUUN'.
→ *"Als nog niemand immuun is en niemand maatregelen neemt, heet dat R-nul."*
Bronnen: B8 (A), reeksbrief.

**F11 (KAN). H1: "Bij elke melding zoekt de GGD uit wie er besmet kan zijn: bron- en contactonderzoek."**
- 'Elke' is sterker dan B34 (de GGD "spoort de bron op en onderzoekt of contacten risico lopen", zonder 'elke'); in maart 2020 schaalde de GGD het bron- en contactonderzoek juist af (niet nagegaan, dus niet noemen).
- Bron- en contactonderzoek zoekt ook waar iemand het opliep; de zin noemt alleen de contacten.
→ *"Bij een melding zoekt de GGD uit waar iemand het opliep, en wie nog meer risico loopt: bron- en contactonderzoek."*
Bron: B34 (A).

**F12 (KAN). H1-beeld: drie staven 'GRIEP ≈ 1,3' · 'CORONA 2020 ≈ 2–3' · 'MAZELEN VAAK 12–18'.**
Griep 1,3 is R in een deels immune bevolking, geen R₀ (B11). Naast twee R₀'s lijkt het een eerlijke vergelijking. De stem is goed ('R').
→ Label *'SEIZOENSGRIEP ≈ 1,3 (VEEL MENSEN AL DEELS IMMUUN)'*, of meta erbij: *'GRIEP: R BIJ START VAN HET SEIZOEN'*.
Bronnen: B6 (A), B11 (A).

**F13 (KAN). H2: "Volgens het RIVM verdubbelde het aantal besmettingen in maart tweeduizendtwintig ongeveer elke vijf à zes dagen."**
Wat er verdubbelde, zegt het RIVM nergens (B3, B4, B7; ook `getallen.md` 9). Op 25 maart noemde Van Dissel zelfs een verdubbelingstijd 'wat hoger dan 2,5' zonder te zeggen waarvan (B5). Toegeschreven ≈ is goed, maar 'het aantal besmettingen' voegt een onbewezen detail toe.
→ *"Volgens het RIVM verdubbelde de uitbraak in maart tweeduizendtwintig ongeveer elke vijf à zes dagen."*
Bronnen: B3, B4, B5, B7 (allemaal A, zelfde instantie).

**F14 (KAN). H2: "zodat de zorg ze aankan". Eindkaart: "zodat de zorg de zieken aankan".**
In april 2020 lukte dat net: opschalen tot 2400 bedden, patiënten naar Duitsland, gewone zorg uitgesteld (B30, B33). 'Aankan' als garantie is te sterk.
→ *"zodat de zorg het beter aankan"* (stem en eindkaart).
Bronnen: B30 (A), B33 (B).

**F15 (KAN). H2: "Onder de één dooft een uitbraak langzaam uit."**
B27: "Als R **lang** onder de 1 blijft, dooft de ziekteverwekker uit."
→ *"Blijft R onder de één, dan dooft een uitbraak langzaam uit."*
Bronnen: B27 (A), B8 (A).

**F16 (KAN). H4: "Waar lopen ze uit elkaar? Daar zit een aanname die niet past, zegt hij."**
Model en meldingen kunnen ook uit elkaar lopen doordat de cijfers niet compleet zijn: meldvertraging (de film zegt het zelf in H2) of testbeleid (B24: GGD-meldingen "strongly shaped by testing policy").
→ *"Daar klopt een aanname niet, of de cijfers zijn nog niet compleet, zegt hij."* Mooie terugkoppeling naar 'pas na twee weken'.
Bronnen: B24 (A), B25 (B).

**F17 (KAN). Recap: "Na de maatregelen zakte R onder de één." en "Maar dan schiet hij ver door."**
In H2 staat goed 'volgens het RIVM'; in de recap valt de toeschrijving weg. 'Ver door' geldt in het model (B19: gedrag kan doorschieten verkleinen).
→ *"Na de maatregelen zakte R volgens het RIVM onder de één."* en *"Maar in een eenvoudig model schiet hij dan ver door."*
Bronnen: B7, B45 (A); B19 (B).

**F18 (KAN). Recap: alleen wo-routes, geen havo-route en geen artsroute.**
- De film is voor havo én vwo. Biomedische Wetenschappen en Gezondheidswetenschappen (Maastricht) vragen vwo (B46; UT: havo via een hbo-propedeuse, `getallen.md` 26).
- Yasmin wil arts worden (LEVENSLOOP); de kop van het script noemt 'de route via geneeskunde', maar de recap niet. `getallen.md` 25 (≈) geeft een veilige zin.
→ Eén zin erbij: *"Wil je arts worden, zoals Yasmin? Dan kun je je na geneeskunde specialiseren in infectieziektebestrijding."* (+15 woorden) En in beeld klein: *'VOOR DE WO-ROUTES: VWO, OF HAVO + EEN JAAR HBO'* (pas na controle van de toelating per opleiding; voor UM en VU niet op een geopende pagina gezien).
Bronnen: B46 (A), B38 (A); route arts IZB via `getallen.md` 25 (B37, niet zelf geopend).

**F19 (KAN). Eindkaart: "Met R boven 1 groeit een uitbraak exponentieel, met een vaste verdubbeltijd".**
Alleen zolang R gelijk blijft en bijna iedereen vatbaar is (de film zei zelf 'R blijft hetzelfde').
→ *"Met R boven 1 groeit een uitbraak exponentieel: zolang R gelijk blijft, met een vaste verdubbeltijd. Onder 1 dooft hij uit."*
Bronnen: B8 (A), B19 (B).

---

## Pass 2: Didactiek

**D1 (MOET, dubbelzinnig). H3-vraag 2: "Stel dat niemand iets doet. Wanneer stopt de uitbraak dan?" (a) pas als iedereen het virus heeft gehad · (b) als zieken te weinig vatbare mensen vinden · (c) zodra twee derde van de mensen immuun is.**
- 'Stopt' kan 'stopt met groeien' of 'is voorbij' betekenen. Bij 'stopt met groeien' is (c) goed: dat is precies de drempel die de leerling net heeft uitgerekend. Wie goed heeft opgelet, krijgt 'fout'.
- (b) en (c) beschrijven bovendien hetzelfde moment: vanaf twee derde immuun vindt een zieke gemiddeld minder dan één vatbare.
- 'Vatbaar' staat hier voor het eerst in de stem, en alleen in het goede antwoord. Een leerling die gokt, kiest het woord dat 'deskundig' klinkt.

→ Vraag: *"Wanneer is de uitbraak dan helemaal voorbij? Wat denk je?"*
→ Opties: *(a) pas als iedereen het virus heeft gehad · (b) als zieken te weinig mensen vinden die het nog kunnen krijgen · (c) precies als twee derde van de mensen immuun is*. Letter blijft b. Nu is (c) echt fout (doorschieten) en is het de misconceptie die de film wil raken.
→ En introduceer 'vatbaar' eerder, bij de balk: *"Wie nog niet immuun is, noemen we vatbaar."* (+7 woorden; H4 gebruikt het woord daarna als bak.)

**D2 (MOET, te raden). H4-vraag: (a) wat er gebeurt als de aannames kloppen · (b) hoeveel mensen er straks precies ziek zijn · (c) hoeveel meldingen er vandaag al binnen zijn.**
- (b) bevat 'precies': een absoluut woord dat een leerling als fout herkent.
- (c) is onzin (een model rekent vooruit; dat is net gezegd), dus valt meteen af.
- (a) is de enige met het vakwoord 'aannames'.

→ *(a) wat er gebeurt als de aannames kloppen · (b) hoeveel mensen er op het drukste moment ziek zullen zijn · (c) het ergste wat er kan gebeuren*. (b) is misconceptie 6 zonder verklikker; (c) is een echte gedachte ('worst case'). Letter blijft a.
→ Laat 'aanname' vóór de vraag één keer vallen, zodat het geen verklikker is: *"Farid zet hem op de helft. Hij neemt aan dat mensen zich daaraan houden."* (+9 woorden; past bij het kaartje 'HOE GEDRAGEN MENSEN ZICH?'.)

**D3 (KAN). H1-vraag: optie (c) "R wordt nul en het virus verdwijnt meteen" is een stroman; (b) heeft 'ook'.**
→ *(c) R wordt meer dan de helft kleiner, want ook het virus verzwakt*. Of eenvoudiger: *(c) R wordt kleiner, maar dat komt alleen doordat het warmer wordt*. Laat 'ook' weg in (b): *(b) R wordt ongeveer de helft van wat het was*.

**D4 (KAN). H2-afvlakvraag: (c) "het virus maakt mensen minder ziek" is te makkelijk weg te strepen.**
De vraag zelf is goed: 'lager' lokt (b), 'breder' wijst naar (a); daar moet de leerling echt kiezen. Geen lek.
→ (c): *(c) de zieken worden sneller beter*. Beeld: teken de tweede curve met een oppervlak dat zichtbaar niet veel kleiner is, anders zegt het plaatje (b).

**D5 (KAN). H3 gebruikt 'het model' voordat H4 het model introduceert.**
H3 zegt twee keer 'in het model' en het beeld labelt 'MODEL'; pas in H4 "bouwt Farid een model". Wie H3 kijkt, weet niet welk model.
→ H3: *"In een eenvoudig rekenmodel …"*; H4-opening: *"Zo'n rekenmodel bouwt Farid nu op het scherm."* in plaats van *"Daarvoor bouwt Farid een model."*

**D6 (KAN). Vragen uit: leg de vraagzin per vraag vast.**
- H3-vraag 1: houd *"Stel R-nul is drie."* buiten de vraagzin. Anders hangt "Een zieke ontmoet drie mensen" in de lucht.
- H1-vraag: houd *"Stel dat iedereen de helft minder contacten heeft."* buiten de vraagzin; met F2 begint het antwoord met "In de som halveert R dan ook".
- Verder: alle antwoorden beginnen met 'Antwoord x.'; geen 'klopt', 'inderdaad', 'die optie'. In orde.

**D7 (KAN). H1: "Al gauw tientallen mensen. Stel: tien contacten per dag".**
Eerst tientallen, dan tien: dat botst. In de epidemiologie tellen nauwe contacten.
→ *"Al gauw tientallen mensen, al zijn ze niet allemaal dichtbij. Stel: tien nauwe contacten per dag …"*

---

## Pass 3: Taal, toon en uitspraak

**T1 (KAN). Uitspraak.** Op de wachtlijst zetten (alleen 'GGD' staat in `films/UITSPRAAK.md`):
- *R-nul* en losse *R* ('er'): test of Roos 'R zakte' als letter uitspreekt; anders 'er' in de stem-invoer.
- *à* in 'twee à drie' en 'vijf à zes' (drie keer): risico op 'a'. Veiliger: *'twee tot drie'*, *'vijf tot zes'*.
- *ic* (ie-cee), *RIVM*, *epidemioloog*, *exponentiële*, *coronapatiënten*, *scenario's*, *Enschede* (EN-schuh-dee), *elfhonderdvijftig*, *één komma vijfentwintig*.
- *Engelstalige*: geen risico.

**T2 (KAN). H1: "Bij het coronavirus was dat zo'n twee à drie."** Er zijn veel coronavirussen. → *"Bij het nieuwe coronavirus in tweeduizendtwintig was dat zo'n twee tot drie."*

**T3 (KAN). H1: "Tel je per zieke de pijlen en neem je het gemiddelde, dan heb je het reproductiegetal R."** Als definitie prima. In het docentdeel noemen dat het RIVM R in het echt terugrekent uit aantallen per eerste ziektedag (B24, B25), niet uit getelde pijlen.

**T4 (KAN). H3: "Dat heet groepsimmuniteit."** 'Dat' slaat op 'zevenenzestig procent'. → *"Is zoveel van de mensen immuun, dan heet dat groepsimmuniteit."*

Toon: zakelijk en neutraal (zie check h). Geen teleologie: 'een virus kiest niets' werkt juist tegen teleologie. Zinnen zijn kort; de langste ('R is dus niet alleen …', 17 woorden) is goed te volgen.

---

## Pass 4: Curriculum en leerdoelen

**C1 (KAN). Leerdoel 4 ('uitleggen waarom de drempel voor mazelen veel hoger ligt') krijgt in de stem geen 'waarom'.**
De stem zegt alleen "Bij mazelen moet ongeveer vijfennegentig procent immuun zijn."
→ *"Bij mazelen ligt R-nul veel hoger. Daarom moet daar ongeveer vijfennegentig procent immuun zijn."* (+7 woorden)

Dekking: leerdoelen 1–3, 5 en 6 hebben elk een vraag; misconceptie 1–6 hebben elk een afleider (met D1 en D2 sterker). Grenzen met andere films in orde: geen werking van een vaccin, geen afweer, geen DNA-stamboom; *Plek genoeg?* alleen als kaartje.

---

## Telling

| Pass | MOET | KAN |
|---|---|---|
| 1 Feiten | 9 (F1–F9) | 10 (F10–F19) |
| 2 Didactiek | 2 (D1, D2) | 5 (D3–D7) |
| 3 Taal en toon | 0 | 4 (T1–T4) |
| 4 Curriculum | 0 | 1 (C1) |
| **Totaal** | **11** | **20** |

Extra woorden door de MOET-punten: ± +35 (F1 +1, F3 +8, F5 +2, F6 +4, F9 +4, D1 +7, D2 +9). Totaal dan ± 985, binnen de richtwaarde. Met F18 en C1 ± 1010: dan iets inkorten (bv. 'Een virus kiest niets …' of 'Zo leg je maatregelen naast elkaar').

Bronnen en de status per bewering: `hw/gz1/bronnen.md`.
