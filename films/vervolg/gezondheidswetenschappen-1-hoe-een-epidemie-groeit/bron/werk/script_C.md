# Hoe een epidemie groeit en stopt — script variant C 'dossier' (26 okt 2026)

Wat word jij? · Gezondheidswetenschappen (1); wo (Gezondheidswetenschappen, Biomedische Wetenschappen + master epidemiologie) en de route via geneeskunde. Voice Roos (eleven_v4). Look: Schema met cast (Yasmin, 16, snuffelstage bij de afdeling infectieziektebestrijding van een GGD; Epidemioloog Farid, ± 38, nieuw personage, nog te keuren). Seriekleuren: koraal = besmettelijk, teal = vatbaar, groen = immuun/hersteld, oker = maatregel, goud = focus. Decor: één ElevenLabs-achtergrond, het GGD-kantoor met groot scherm (cold open, H1-opening, H4-modelscène, recap); alle grafieken op navy. Vertelvorm (grote mutatie 'dossier', P1): Farid en Yasmin bouwen een oefendossier van één uitbraak, melding voor melding; elke melding is een blokje, en de stapel blokjes ís de epidemiecurve. Per hoofdstuk krijgt het dossier een laag: pijlen tussen blokjes (R, H1), de tijdas met verdubbeling en ic-lijn (H2), een groene balk 'immuun' met de gouden drempel (H3), en ernaast het model met één knop (H4). De kijker leest steeds zelf af wat het dossier laat zien. Rode draad: de startvraag uit vervolg.html. Bouwt voort op *Plek genoeg?* en *Vaccins, allergie en bloedgroepen*. Getallen alleen uit `getallen.md`.

**Leerdoelen** (de leerling kan …) — voorstel Claude, niet gekeurd
1. uitleggen wat het reproductiegetal R is, het verschil met R₀, en van welke drie dingen R afhangt (contacten, kans op besmetting per contact, hoe lang iemand besmettelijk is);
2. uitleggen waarom een uitbraak met R boven 1 exponentieel groeit en met R onder 1 uitdooft, en wat een verdubbeltijd is;
3. uitleggen wat 'de curve afvlakken' betekent (piek lager en later, zodat de zorg het aankan);
4. de drempel voor groepsimmuniteit uitrekenen met 1 − 1/R₀ en uitleggen waarom die voor mazelen veel hoger ligt;
5. uitleggen waarom een epidemie ook zonder maatregelen stopt (vatbaren raken op) en waarom hij dan doorschiet;
6. beschrijven hoe een epidemioloog met een eenvoudig model (vatbaar, besmettelijk, hersteld) het effect van een maatregel doorrekent, en wat een model wel en niet kan.

**Misconcepties**
1. Een epidemie groeit gelijkmatig (lineair) → H2, vraag 'dag twintig'.
2. R is een vaste eigenschap van een virus → H1, vraag 'de helft minder contacten'.
3. Een epidemie stopt pas als iedereen ziek is geweest → H3, vraag 'niemand doet iets'.
4. Groepsimmuniteit betekent dat iedereen immuun moet zijn → H3, vraag 'R-nul drie'.
5. Afvlakken betekent dat er minder mensen ziek worden → H2, vraag 'lagere, bredere curve'.
6. Een model voorspelt precies wat er gaat gebeuren → H4, vraag 'één getal voor de piek'.

---

## Cold open [Schema: GGD-kantoor met groot scherm (ElevenLabs-decor); Yasmin (badge 'STAGIAIR') naast Farid (badge, laptop); op het scherm een leeg vel, kop 'DOSSIER UITBRAAK', meta 'OEFENDOSSIER · RONDE GETALLEN'; één koraal blokje valt op de tijdas bij 'DAG 0'; versneld vallen er blokjes bij tot een hoge stapel, meta 'MAART 2020 · NAGEBOUWD'; de stapel bevriest met een vraagteken]
Yasmin loopt stage bij de GGD. Epidemioloog Farid opent een leeg dossier. Eén melding, één blokje. Hij bouwt maart tweeduizendtwintig na. Na een paar weken is de stapel torenhoog. Waarom groeide het zo snel? En waarom stopt een epidemie uiteindelijk? Wat denk je?

## Titel
Hoe een epidemie groeit en stopt
(tweede regel, klein: een dossier, melding voor melding)

## Hoofdstuk 1 — Het reproductiegetal R: hoeveel mensen steekt één zieke aan? [Schema: GGD-kantoor (decor) bij de eerste twee zinnen, dan inzoomen op het scherm en over naar navy; het dossier met tien koraal blokjes; uit elk blokje klapt een telpoppetje; Farid (klein, linksonder) trekt met een stift oker pijlen van poppetje naar poppetje, meta 'BRON- EN CONTACTONDERZOEK'; per poppetje een teller van de uitgaande pijlen (2, 3, 1, 4, 2 …), het gemiddelde licht goud op als 'R ≈ 2 À 3', label 'R = GEMIDDELD AANTAL MENSEN DAT ÉÉN ZIEKE BESMET'; klein label 'R₀ = R ALS NOG NIEMAND IMMUUN IS'; drie schuifjes onder het dossier: 'CONTACTEN PER DAG 10' × 'KANS PER CONTACT 1/20' × 'DAGEN BESMETTELIJK 5' = '2,5', meta 'REKENVOORBEELD'; menselijk moment: Yasmin als tienjarige (jonger castbeeld) aan de keukentafel thuis met een schrift, haar ouders achter een laptop, meta 'MAART 2020'; tijdens de vraag staat het schuifje CONTACTEN op 5 met een vraagteken achter de uitkomst; na het antwoord: uitkomst '1,25', daarna drie staven 'GRIEP ≈ 1,3' · 'CORONA 2020 ≈ 2–3' · 'MAZELEN VAAK 12–18', meta 'SCHATTINGEN · R₀ VERSCHILT PER STUDIE']
Farid bouwt het dossier na met ronde getallen. Elke nieuwe melding is een blokje.

Bij elk blokje zoekt de GGD uit waar iemand het virus opliep, en wie er nog meer risico loopt. Dat heet bron- en contactonderzoek. Farid trekt pijlen van blokje naar blokje.

Tel je de pijlen, dan krijg je het reproductiegetal R. R zegt hoeveel mensen één zieke gemiddeld aansteekt. Aan het begin, als nog niemand beschermd is, heet dat R-nul. Bij het coronavirus was dat zo'n twee à drie.

R hangt af van drie dingen. Hoeveel contacten iemand heeft. De kans op besmetting per contact. En hoeveel dagen iemand besmettelijk is. Stel: tien contacten per dag, vijf dagen lang, en bij één op de twintig contacten gaat het virus over. Dan steekt één zieke er gemiddeld twee en een half aan.

Yasmin was tien in maart tweeduizendtwintig. Ineens zat ze thuis, haar ouders ook. Stel dat iedereen de helft minder contacten heeft. Wat gebeurt er dan met R? Wat denk je?
[VRAAG] (a) R blijft gelijk: het is hetzelfde virus · (b) R wordt ook ongeveer de helft · (c) R wordt nul: het virus verdwijnt

Antwoord b. De helft van de contacten geeft ongeveer de helft van R: één komma vijfentwintig. R is dus niet alleen een eigenschap van het virus, maar ook van hoe wij met elkaar omgaan. Ter vergelijking: bij gewone griep steekt één zieke gemiddeld zo'n één komma drie anderen aan. Bij mazelen ligt R-nul veel hoger: vaak wordt twaalf tot achttien genoemd.

## Hoofdstuk 2 — Exponentiële groei en de curve afvlakken [Schema: navy; het dossier krijgt een tijdas 'DAG 0 · 5 · 10 · 15 · 20'; bij dag 0 een stapel van 10 blokjes, bij dag 5 een stapel van 20; bij dag 10, 15 en 20 lege stippelvakken met een vraagteken; na het antwoord vallen de stapels 40, 80, 160 blok voor blok in (de stapel bij dag 20 schaalt het dossier uit, as springt niet: het hele vel zoomt uit), daarnaast een dunne stippellijn 'ELKE DAG EVENVEEL ERBIJ' die ver onder de stapels blijft; label 'VERDUBBELTIJD'; meta 'RIVM 2020: ± 5 À 6 DAGEN'; klein terugverwijskaartje 'Plek genoeg?' met J-curve; Farid trekt een horizontale lijn 'IC-BEDDEN ± 1150 (VÓÓR 2020)', meta 'PIEK APRIL 2020: RUIM 1400 COVID-PATIËNTEN OP DE IC · OPGESCHAALD NAAR 2400 BEDDEN' (geen ic-beelden, alleen de lijn en het getal); dan naast het dossier een tweede vel 'DOSSIER MET MAATREGELEN' met een lagere, bredere stapel (oker rand), beide labels 'MODEL'; na het antwoord schuift het vel met maatregelen over het eerste: piek onder de ic-lijn, later op de tijdas; meta 'MAATREGELEN 12, 16 EN 23 MAART 2020'; een R-meter zakt naar 'R ≈ 1' en daarna eronder; daarna de rechterkant van het dossier: de nieuwste blokjes zijn grijs omlijnd en vullen zich pas na een tijdsprong 'TWEE WEKEN LATER', meta 'RIVM REKENT R TERUG UIT ZIEKTEGEVALLEN']
Farid zet de blokjes per dag op een rij. Op dag nul: tien meldingen. Op dag vijf: twintig. R blijft hetzelfde. Hoeveel meldingen zijn er op dag twintig? Wat denk je?
[VRAAG] (a) ongeveer vijftig: elke vijf dagen tien erbij · (b) ongeveer dertig: daarna vlakt het af · (c) ongeveer honderdzestig: elke vijf dagen keer twee

Antwoord c. Elke vijf dagen verdubbelt het aantal: twintig, veertig, tachtig, honderdzestig. Er komen niet steeds tien bij; het wordt steeds keer twee. Dat heet exponentiële groei. De tijd waarin het aantal verdubbelt, heet de verdubbeltijd. Volgens het RIVM verdubbelde het aantal besmettingen in maart tweeduizendtwintig ongeveer elke vijf à zes dagen.

Farid trekt een lijn door het dossier: de ic-bedden. Normaal heeft Nederland er zo'n elfhonderdvijftig. In april lagen er op het drukste moment ruim veertienhonderd coronapatiënten op de ic.

Half maart kwamen er maatregelen. Op een tweede vel tekent Farid een lagere, bredere curve. Wat betekent die curve afvlakken vooral? Wat denk je?
[VRAAG] (a) de zieken komen niet allemaal tegelijk · (b) er worden veel minder mensen ziek · (c) het virus maakt mensen minder ziek

Antwoord a. Afvlakken betekent: de piek komt lager en later. De zieken zijn er niet allemaal tegelijk, zodat de zorg ze aankan. Na de maatregelen van half maart zakte R volgens het RIVM tot rond de één, en daarna eronder. Onder de één dooft een uitbraak langzaam uit.

De nieuwste blokjes zijn nog grijs, zegt Farid. Wie vandaag besmet raakt, wordt pas later ziek en gemeld. Het RIVM rekent R terug uit hoeveel mensen ziek worden. Daarom weet je pas na een week of twee hoe hoog R vandaag is.

## Hoofdstuk 3 — Groepsimmuniteit: welk deel moet immuun zijn? [Schema: navy; onder de curve van het dossier een liggende balk 'IMMUUN' van 0 tot 100 % die groen volloopt terwijl de blokjes vallen (meta 'NA BESMETTING OF VACCIN'); één koraal telpoppetje met drie pijlen naar drie teal poppetjes, label 'R₀ = 3'; tijdens de vraag drie streepjes op de balk zonder getallen; na het antwoord kleuren twee van de drie poppetjes groen, één pijl blijft over, label 'R = 1'; de som verschijnt regel voor regel: '1 − 1/R₀' → '1 − 1/3' → '2/3 ≈ 67 %'; Farid tekent dat als gouden lijn 'DREMPEL' op de balk; ernaast een tweede balk 'MAZELEN' met de drempel bij '± 95 %'; klein terugverwijskaartje 'Vaccins, allergie en bloedgroepen'; meta 'VUISTREGEL · IN HET ECHT GEEN WILLEKEURIGE MENGING'; dan het dossier zonder maatregelen (oorspronkelijke vel, label 'MODEL'): de groene balk loopt vol; op het moment dat hij de gouden lijn kruist, staat de curve op zijn piek (goud verticaal streepje, meta 'IN HET MODEL'); daarna zakt de stapel, maar de balk loopt door voorbij de lijn, het stuk erboven arcering 'DOORSCHIETEN', eindstand 'MODEL, R₀ = 3: ± 94 %'; de laatste teal poppetjes blijven vatbaar staan]
Onder het dossier legt Farid een balk: hoeveel mensen al immuun zijn. Na een besmetting, of na een vaccin. Elk groen blokje is iemand die het virus niet meer doorgeeft. Stel R-nul is drie. Welk deel van de mensen moet immuun zijn om de groei te stoppen? Wat denk je?
[VRAAG] (a) iedereen, anders blijft het rondgaan · (b) ongeveer een derde van de mensen · (c) ongeveer twee derde van de mensen

Antwoord c. Een zieke ontmoet drie mensen die hij zou aansteken. Zijn twee van die drie al immuun, dan blijft er gemiddeld één over. Dan groeit de uitbraak niet meer. De som: één min één gedeeld door R-nul. Eén min een derde is twee derde, ongeveer zevenenzestig procent. Dat heet groepsimmuniteit. Ook wie niet immuun is, is dan beschermd. Bij mazelen moet ongeveer vijfennegentig procent immuun zijn. Dit is een vuistregel: in het echt gaan mensen niet willekeurig met elkaar om.

Farid tekent de drempel als gouden lijn op de balk. Stel dat niemand iets doet. Wanneer stopt de uitbraak dan? Wat denk je?
[VRAAG] (a) pas als iedereen het virus gehad heeft · (b) als zieken te weinig vatbare mensen vinden · (c) als het virus na een tijd zwakker wordt

Antwoord b. Elke zieke ontmoet steeds meer mensen die het al gehad hebben. Daardoor zakt R vanzelf onder de één, ook als niemand iets doet. In het model staat de curve op zijn piek als de balk de gouden lijn raakt. Maar wie dan nog ziek is, steekt nog anderen aan. De epidemie schiet door. In dit eenvoudige model raken bij R-nul drie uiteindelijk ruim negen op de tien mensen besmet.

## Hoofdstuk 4 — Maatregelen doorrekenen met een eenvoudig model [Schema: GGD-kantoor (decor) bij de eerste zinnen: Farid en Yasmin voor het grote scherm; dan op het scherm en over naar navy; naast het dossier drie bakken 'VATBAAR' (teal) → 'BESMETTELIJK' (koraal) → 'HERSTELD' (groen), poppetjes stromen van bak naar bak, meta 'MODEL · KERMACK & MCKENDRICK, 1927'; onder de bakken een knop 'CONTACTEN' (oker); Farid draait hem op 50 %; de modelcurve tekent zich opnieuw: piek lager en later, de oude curve blijft als stippellijn; label 'SCENARIO, GEEN VOORSPELLING'; tijdens de vraag één goud getal boven de piek met een vraagteken; na het antwoord twee kaartjes 'AANNAME' bij de bakken: 'HOE GEDRAGEN MENSEN ZICH?' en 'HOE LANG BESMETTELIJK?'; dan een kaartje 'AANNAME IC-LIGDUUR' dat van '± 10 DAGEN' naar '± 3 WEKEN' springt, meta 'RIVM-MODELLEN · MAART 2020 BIJGESTELD'; tot slot schuift Farid het model en het dossier over elkaar: modelcurve en blokjes naast elkaar, Yasmin wijst een plek aan waar ze uit elkaar lopen]
Een dossier laat zien wat er gebeurd is. Maar wat als je iets verandert? Daarvoor bouwt Farid een model. Drie bakken: vatbaar, besmettelijk en hersteld. Mensen schuiven van de ene bak naar de volgende. Het idee is bijna honderd jaar oud.

Elke maatregel is een knop. Thuiswerken draait aan de knop contacten. Farid zet hem op de helft. In het model komt de piek lager en later. Zo kun je maatregelen naast elkaar leggen. Het RIVM rekende in tweeduizendtwintig zulke scenario's door.

Het model geeft voor de piek één getal. Wat zegt dat getal? Wat denk je?
[VRAAG] (a) wat er gebeurt als de aannames kloppen · (b) precies hoeveel mensen er straks ziek zijn · (c) hoeveel meldingen er nu al binnen zijn

Antwoord a. Een model voorspelt niet wat er gaat gebeuren. Het laat zien wat er zou kunnen gebeuren, als de aannames uitkomen. Hoe gedragen mensen zich? Hoe lang is iemand besmettelijk? Verandert een aanname, dan verandert de uitkomst. In maart tweeduizendtwintig moesten de modelleurs hun model telkens bijstellen. Patiënten bleven bijvoorbeeld veel langer op de ic dan eerst gedacht.

Daarom legt Farid het model steeds over het dossier heen. Waar lopen ze uit elkaar? Daar zit een aanname die niet past, zegt hij.

## Recap [GGD-kantoor (decor); Farid en Yasmin voor het scherm; het complete dossier in één beeld: stapel blokjes met pijlen, tijdas met verdubbeling, groene balk met gouden drempel, en ernaast de drie bakken met de knop; vier kaartjes klappen uit: 'R: HOEVEEL STEEKT ÉÉN ZIEKE AAN' · 'R > 1: KEER TWEE, KEER TWEE' · 'DREMPEL: 1 − 1/R₀' · 'MODEL: WAT ALS …'; opleidingen: 'WO · MASTER EPIDEMIOLOGY (ENGELSTALIG) · NIJMEGEN, BIJV. NA BIOMEDISCHE WETENSCHAPPEN' · 'WO · GEZONDHEIDSWETENSCHAPPEN · ENSCHEDE, AMSTERDAM, MAASTRICHT' (jaartal 2026); 'WERK: EPIDEMIOLOOG BIJ GGD OF RIVM']
Corona groeide in maart tweeduizendtwintig zo snel, omdat één zieke er gemiddeld twee à drie aanstak. Dan wordt het elke paar dagen keer twee. Na de maatregelen zakte R onder de één. En ook zonder maatregelen stopt een epidemie: als zieken te weinig vatbare mensen vinden. Maar dan schiet hij ver door.

In Nijmegen kun je bijvoorbeeld na Biomedische Wetenschappen de Engelstalige master epidemiologie doen. Gezondheidswetenschappen studeer je bijvoorbeeld in Enschede, Amsterdam of Maastricht. Daarna werk je bijvoorbeeld als epidemioloog bij de GGD of het RIVM.

## Eindkaart
Het reproductiegetal R zegt hoeveel mensen één zieke gemiddeld aansteekt; R₀ geldt als nog niemand immuun is.
R hangt af van contacten, de kans per contact en hoe lang iemand besmettelijk is: dus ook van gedrag.
Met R boven 1 groeit een uitbraak exponentieel, met een vaste verdubbeltijd; onder 1 dooft hij uit.
De curve afvlakken: de piek lager en later, zodat de zorg de zieken aankan.
Groepsimmuniteit: bij een immuun deel van 1 − 1/R₀ groeit de uitbraak niet meer.
Een model rekent uit wat er gebeurt áls de aannames kloppen; het is geen voorspelling.

---

## Keuzes
- **Dossier als concept (P1)**: de curve wordt niet getoond maar gestapeld; elke laag van het dossier is één begrip dat de kijker er zelf uit afleest (pijlen → R, stapels per vijf dagen → verdubbeltijd, groene balk → drempel, model over het dossier → wat een model kan). De piek valt in het model precies samen met het kruisen van de drempel (B20: op de piek is het aandeel vatbaren 1/R₀); dat is het moment waarop het dossier 'stopt met groeien' zichtbaar maakt.
- **Oefendossier met ronde getallen**: echte meldingen per dag uit 2020 staan niet in getallen.md, dus het dossier is benoemd als nagebouwd (meta 'OEFENDOSSIER · RONDE GETALLEN'); de echte getallen (2 à 3, 5 à 6 dagen, 1150, ruim 1400) komen als toegeschreven feit.
- **Farid's eigen beurten (P2)**: hij trekt de pijlen (bron- en contactonderzoek, H1), legt uit waarom de nieuwste blokjes grijs zijn (H2), draait de knop en legt model over dossier (H4). 'Epidemioloog' valt in de cold open, 'epidemioloog' en 'epidemiologie' in de recap.
- **Antwoordletters**: b, c, a, c, b, a (zes vragen, zes misconcepties, elk één vraag; geen drie keer dezelfde letter).
- **Menselijk moment**: Yasmin als tienjarige thuis in maart 2020 draagt de knop 'contacten' (H1); kort, zonder oordeel.
- **Kermack & McKendrick**: alleen in beeld, niet in de stem (uitspraak en lengte); stem zegt 'bijna honderd jaar oud'.
- **Lengte**: 986 gesproken woorden (scriptcheck: cold open 43 · H1 226 · H2 226 · H3 225 · H4 180 · recap 86), ± 7 min. Enige melding: totaal boven ± 900, binnen de gevraagde 850–1000. Geschrapt voor de lengte: 'Zo ziet hij wie wie aanstak.', 'Ziekenhuizen moesten in allerijl bijbouwen.'
- **Ic**: alleen een lijn en twee getallen, geen beelden, geen sterfte. Opschaling naar 2400 alleen als meta, niet in de stem.

## Twijfels
- **Rekenvoorbeeld H1** (10 × 5 × 1/20 = 2,5) is een eigen voorbeeld met ronde getallen (getallen.md bewering 3 staat dat toe), als 'REKENVOORBEELD' in beeld. 'De helft van de contacten geeft de helft van R' volgt uit die vermenigvuldiging; in het echt is het minder netjes.
- **Dag 0 → dag 20 (H2)**: het dossier verdubbelt elke vijf dagen (ronde waarde binnen de RIVM-schatting 5 à 6). De vraag rekent met de getoonde stapels, niet met echte meldingen.
- **'In het model staat de curve op zijn piek als de balk de drempel raakt'**: geldt in het SIR-model (B19 noemt het uitdrukkelijk een eigenschap van dat model); daarom 'in het model' in stem en beeld.
- **'Ruim negen op de tien'** (R₀ = 3, eigen SIR-berekening ± 94 %, bewering 19 ≈): steeds 'in dit eenvoudige model'.
- **Ic-ligduur '± 10 dagen → ± 3 weken'** in beeld komt uit B25/B7 (≈); als Kamiel dat te gedetailleerd vindt, alleen de stemzin houden.
- **Griep 1,3** is geen R₀ in strikte zin; stem zegt 'steekt gemiddeld zo'n één komma drie anderen aan', niet 'R-nul'.
- **Yasmin als tienjarige**: castboek heeft mogelijk geen jongere Yasmin; anders een foto-achtig herinneringskader met de huidige Yasmin thuis aan tafel.
- **Model over het dossier (H4-slot)**: Farids werkwijze is een didactische keuze, niet uit een bron; als handeling van een personage gebracht ('zegt hij').
- **Risicowoorden (uitspraak)**: R-nul ('er-nul'), R (los, 'er'), epidemioloog, epidemiologie, reproductiegetal, exponentiële, verdubbeltijd, groepsimmuniteit, bron- en contactonderzoek, ic ('ie-see'), GGD ('gee-gee-dee'), RIVM ('er-ie-vee-em'), coronapatiënten, één komma vijfentwintig, elfhonderdvijftig, tweeduizendtwintig, Biomedische Wetenschappen, Gezondheidswetenschappen, Enschede, Maastricht, scenario's.
