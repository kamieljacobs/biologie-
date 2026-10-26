# Hoe een epidemie groeit en stopt — script v2 (26 okt 2026)

v2 = v1 met alle MOET-punten en een deel van de KAN-punten uit `reviews/review_v1.md` verwerkt (zie `reviews/verwerking_v1.md`).

Wat word jij? · Gezondheidswetenschappen (1); wo (Gezondheidswetenschappen, Biomedische Wetenschappen + master epidemiologie) en de route via geneeskunde. Voice Roos (eleven_v4). Look: Schema met cast (Yasmin, 16, snuffelstage bij de afdeling infectieziektebestrijding van een GGD; Epidemioloog Farid, ± 38, nieuw personage, nog te keuren). Seriekleuren: koraal = besmettelijk, teal = vatbaar, groen = immuun/hersteld, oker = maatregel, goud = focus. Decor: één ElevenLabs-achtergrond, het GGD-kantoor met groot scherm (cold open, H1-opening, H4-modelscène, recap); alle grafieken op navy. Vertelvorm (grote mutatie 'dossier', P1): Farid en Yasmin bouwen een oefendossier van één uitbraak, melding voor melding; elke melding is een blokje, en de stapel blokjes ís de epidemiecurve. Per hoofdstuk krijgt het dossier een laag: pijlen tussen blokjes (R, H1), de tijdas met verdubbeling en ic-lijn (H2), een groene balk 'immuun' met de gouden drempel (H3), en ernaast het model met één knop (H4). Het dossier heeft ronde, verzonnen getallen ('OEFENDOSSIER · RONDE GETALLEN'); echte getallen uit 2020 komen apart in beeld met bron en jaar. Rode draad: de startvraag uit vervolg.html. Bouwt voort op *Plek genoeg?* en *Vaccins, allergie en bloedgroepen*. Getallen alleen uit `getallen.md`.

Herkomst: winnaar van de blinde beoordelaar (variant C 'dossier', 52 tegen 49 en 49, duidelijk), met overnames uit A (Yasmin telt haar dag) en B ('een virus kiest niets', 'iets meer, dan zakt R onder de één', afleider 'zodra twee derde immuun is') en de reparaties uit het oordeel.

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

## Cold open [Schema: GGD-kantoor met groot scherm (ElevenLabs-decor); Yasmin (badge 'STAGIAIR') naast Farid (badge, laptop); op het scherm een leeg vel, kop 'DOSSIER UITBRAAK', meta 'OEFENDOSSIER · RONDE GETALLEN'; één koraal blokje valt op de tijdas bij 'DAG 0'; versneld vallen er blokjes bij tot een hoge stapel; de stapel bevriest; puzzelkaart met de twee vragen]
Yasmin loopt stage bij de GGD. Epidemioloog Farid opent een leeg dossier. Eén melding, één blokje. Hij oefent met een uitbraak zoals in maart tweeduizendtwintig. Na een paar weken is de stapel torenhoog. Waarom groeide corona toen zo snel? En waarom stopt een epidemie uiteindelijk?

## Titel
Hoe een epidemie groeit en stopt
(tweede regel, klein: een dossier, melding voor melding)

## Hoofdstuk 1 — Het reproductiegetal R: hoeveel mensen steekt één zieke aan? [Schema: GGD-kantoor (decor) bij de eerste twee zinnen, dan inzoomen op het scherm en over naar navy; het dossier met tien koraal blokjes; uit elk blokje klapt een telpoppetje; Farid (klein, linksonder) trekt met een stift oker pijlen van poppetje naar poppetje, meta 'BRON- EN CONTACTONDERZOEK'; per poppetje een teller van de uitgaande pijlen (2, 3, 1, 4, 2 …), het gemiddelde licht goud op, label 'R = GEMIDDELD AANTAL MENSEN DAT ÉÉN ZIEKE BESMET'; klein label 'R₀ = R ALS NOG NIEMAND IMMUUN IS'; daarna 'CORONA 2020: R₀ ≈ 2 À 3', meta 'SCHATTINGEN VERSCHILLEN PER STUDIE'; Yasmin (vooraanzicht) met om haar heen telpoppetjes die oplichten bij 'bus, klas, training'; drie schuifjes onder het dossier: 'CONTACTEN PER DAG 10' × 'KANS PER CONTACT 1/20' × 'DAGEN BESMETTELIJK 5' = '2,5', meta 'REKENVOORBEELD'; menselijk moment: herinneringskader (sepia rand, meta 'MAART 2020'): Yasmin en Bilal aan de keukentafel met schriften, hun ouders achter een laptop; tijdens de vraag staat het schuifje CONTACTEN op 5 met een vraagteken achter de uitkomst; na het antwoord: uitkomst '1,25', daarna drie staven 'SEIZOENSGRIEP ≈ 1,3 (VEEL MENSEN AL DEELS IMMUUN)' · 'CORONA 2020 ≈ 2–3' · 'MAZELEN VAAK 12–18', meta 'SCHATTINGEN · VUISTREGELS']
Bij elke melding zoekt de GGD uit wie er besmet kan zijn: bron- en contactonderzoek. Farid trekt pijlen van blokje naar blokje.

Tel je per zieke de pijlen en neem je het gemiddelde, dan heb je het reproductiegetal R. R zegt hoeveel mensen één zieke gemiddeld aansteekt. Als nog niemand immuun is en niemand maatregelen neemt, heet dat R-nul. Bij het nieuwe coronavirus in tweeduizendtwintig was dat zo'n twee à drie.

R hangt vooral af van drie dingen. Hoeveel contacten iemand heeft. De kans op besmetting per contact. En hoeveel dagen iemand besmettelijk is. Yasmin telt haar dag: bus, klas, training. Al gauw tientallen mensen. Stel: tien contacten per dag, vijf dagen lang, en bij één op de twintig contacten gaat het virus over. Dan steekt één zieke er gemiddeld twee en een half aan.

In maart tweeduizendtwintig zat Yasmin ineens thuis, haar ouders ook. Stel dat iedereen de helft minder contacten heeft. Wat gebeurt er dan met R? Wat denk je?
[VRAAG] (a) R blijft gelijk: het is nog steeds hetzelfde virus · (b) R wordt ook ongeveer de helft van wat het was · (c) R wordt nul en het virus verdwijnt meteen

Antwoord b. In de som halveert R dan ook: één komma vijfentwintig. R is dus niet alleen een eigenschap van het virus, maar ook van hoe wij met elkaar omgaan. Een virus kiest niets: het gaat mee met wat mensen doen. Bij gewone griep steekt één zieke gemiddeld zo'n één komma drie anderen aan. Bij mazelen ligt R-nul veel hoger: vaak wordt twaalf tot achttien genoemd.

## Hoofdstuk 2 — Exponentiële groei en de curve afvlakken [Schema: navy; het dossier krijgt een tijdas 'DAG 0 · 5 · 10 · 15 · 20'; bij dag 0 een stapel van 10 blokjes, bij dag 5 een stapel van 20; bij dag 10, 15 en 20 lege stippelvakken met een vraagteken; na het antwoord vallen de stapels 40, 80, 160 blok voor blok in (het hele vel zoomt uit, de as springt niet), daarnaast een dunne stippellijn 'ELKE DAG EVENVEEL ERBIJ' die ver onder de stapels blijft; label 'VERDUBBELTIJD'; dan apart kaartje 'MAART 2020 · RIVM: VERDUBBELING ± ELKE 5 À 6 DAGEN'; klein terugverwijskaartje 'Plek genoeg?' met J-curve; Farid trekt een horizontale lijn zonder getal 'WAT DE ZORG AANKAN' door het dossier; daarnaast apart kaartje met bron en jaar 'IC-BEDDEN NORMAAL ± 1150 · PIEK 7 APRIL 2020: 1424 COVID-PATIËNTEN OP DE IC · OPGESCHAALD NAAR 2400 BEDDEN (5 APRIL) · LCPS/RIVM' (geen ic-beelden, alleen de lijn en de getallen); dan naast het dossier een tweede vel 'MET MAATREGELEN' met een lagere, bredere stapel (oker rand), beide labels 'MODEL'; na het antwoord schuift het vel met maatregelen over het eerste: piek onder de ic-lijn, later op de tijdas; meta 'MAATREGELEN HALF MAART 2020'; een R-meter zakt naar 'R ≈ 1' en daarna eronder; daarna de rechterkant van het dossier: de nieuwste blokjes zijn grijs omlijnd en vullen zich pas na een tijdsprong 'TWEE WEKEN LATER']
Farid zet de blokjes per dag op een rij. Op dag nul: tien meldingen. Op dag vijf: twintig. R blijft hetzelfde. Hoeveel meldingen zijn er op dag twintig? Wat denk je?
[VRAAG] (a) ongeveer vijftig: elke vijf dagen tien erbij · (b) ongeveer dertig: daarna vlakt het af · (c) ongeveer honderdzestig: elke vijf dagen keer twee

Antwoord c. Elke vijf dagen verdubbelt het aantal: twintig, veertig, tachtig, honderdzestig. Er komen niet steeds tien bij; het wordt steeds keer twee. Dat heet exponentiële groei, met een vaste verdubbeltijd. Volgens het RIVM verdubbelde de uitbraak in maart tweeduizendtwintig ongeveer elke vijf à zes dagen.

Farid trekt een lijn door het dossier: wat de zorg aankan. Normaal heeft Nederland zo'n elfhonderdvijftig ic-bedden. Op het drukste moment, begin april tweeduizendtwintig, lagen er ruim veertienhonderd coronapatiënten op de ic. Ziekenhuizen schaalden snel op naar zo'n vierentwintighonderd bedden.

Half maart kwamen er maatregelen. Op een tweede vel tekent Farid een lagere, bredere curve. Wat betekent die curve afvlakken vooral? Wat denk je?
[VRAAG] (a) de zieken komen niet allemaal tegelijk · (b) er worden veel minder mensen ziek · (c) de zieken worden sneller weer beter

Antwoord a. Afvlakken betekent: de piek komt lager en later. De zieken zijn er niet allemaal tegelijk, zodat de zorg ze aankan. Na de maatregelen van half maart zakte R volgens het RIVM tot rond de één, en daarna eronder. Onder de één dooft een uitbraak langzaam uit.

Wie vandaag besmet raakt, wordt pas later ziek en gemeld, zegt Farid. Daarom weet het RIVM pas na een week of twee hoe hoog R vandaag is.

## Hoofdstuk 3 — Groepsimmuniteit: welk deel moet immuun zijn? [Schema: navy; onder de curve van het dossier een liggende balk 'IMMUUN' van 0 tot 100 % die groen volloopt terwijl de blokjes vallen (meta 'NA BESMETTING OF VACCIN'); één koraal telpoppetje met drie pijlen naar drie teal poppetjes, label 'R₀ = 3'; tijdens de vraag drie streepjes op de balk zonder getallen; na het antwoord kleuren twee van de drie poppetjes groen, één pijl blijft over, label 'R = 1'; de som verschijnt regel voor regel: '1 − 1/R₀' → '1 − 1/3' → '2/3 ≈ 67 %'; Farid tekent dat als gouden lijn 'DREMPEL' op de balk; ernaast een tweede balk 'MAZELEN' met de drempel bij '± 95 %'; klein terugverwijskaartje 'Vaccins, allergie en bloedgroepen'; meta 'VUISTREGEL · IN HET ECHT GEEN WILLEKEURIGE MENGING'; dan het dossier zonder maatregelen (label 'MODEL'): de groene balk loopt vol; modelcurve uit een echte SIR-run (nieuwe zieken per dag); bij het kruispunt van de balk met de gouden lijn een goud verticaal streepje, label 'VANAF HIER MINDER NIEUWE ZIEKEN' (de top van de stapel ligt iets links daarvan); daarna zakt de stapel, maar de balk loopt door voorbij de lijn, het stuk erboven arcering 'DOORSCHIETEN', eindstand 'MODEL, R₀ = 3: ± 94 %'; de laatste teal poppetjes blijven vatbaar staan]
Onder het dossier legt Farid een balk: hoeveel mensen al immuun zijn. Na een besmetting, of na een vaccin. Wie nog niet immuun is, noemen we vatbaar. Stel R-nul is drie. Welk deel van de mensen moet immuun zijn om de groei te stoppen? Wat denk je?
[VRAAG] (a) iedereen, anders blijft het virus rondgaan · (b) ongeveer een derde van de mensen · (c) ongeveer twee derde van de mensen

Antwoord c. Een zieke ontmoet drie mensen die hij zou aansteken. Zijn twee van die drie al immuun, dan blijft er gemiddeld één over. Is het iets meer, dan zakt R onder de één. De som: één min één gedeeld door R-nul. Eén min een derde is twee derde, ongeveer zevenenzestig procent. Is zoveel van de mensen immuun, dan heet dat groepsimmuniteit. Ook wie niet immuun is, loopt dan veel minder kans. Bij mazelen ligt R-nul veel hoger. Daarom moet daar ongeveer vijfennegentig procent immuun zijn. Dat is wel een vuistregel.

Farid tekent de drempel als gouden lijn op de balk. Stel dat niemand iets doet. Wanneer is de uitbraak dan helemaal voorbij? Wat denk je?
[VRAAG] (a) pas als iedereen het virus heeft gehad · (b) als zieken te weinig mensen vinden die het nog kunnen krijgen · (c) precies als twee derde van de mensen immuun is

Antwoord b. Elke zieke ontmoet steeds meer mensen die het al gehad hebben. Daardoor zakt R vanzelf onder de één, ook als niemand iets doet. Voorbij de gouden lijn komen er elke dag minder zieken bij. Maar wie dan nog ziek is, steekt nog anderen aan. De epidemie schiet door. In dit eenvoudige model raken bij R-nul drie uiteindelijk ruim negen op de tien mensen besmet.

## Hoofdstuk 4 — Maatregelen doorrekenen met een eenvoudig model [Schema: GGD-kantoor (decor) bij de eerste zinnen: Farid en Yasmin voor het grote scherm; dan op het scherm en over naar navy; naast het dossier drie bakken 'VATBAAR' (teal) → 'BESMETTELIJK' (koraal) → 'HERSTELD' (groen), poppetjes stromen van bak naar bak, meta 'MODEL · KERMACK & MCKENDRICK, 1927'; onder de bakken een knop 'CONTACTEN' (oker); Farid draait hem op 50 %; de modelcurve tekent zich opnieuw: piek lager en later, de oude curve blijft als stippellijn; label 'SCENARIO, GEEN VOORSPELLING'; tijdens de vraag één goud getal boven de piek met een vraagteken; na het antwoord twee kaartjes 'AANNAME' bij de bakken: 'HOE GEDRAGEN MENSEN ZICH?' en 'HOE LANG BESMETTELIJK?'; dan een kaartje 'AANNAME: HOE LANG OP DE IC?' met een pijl omhoog, meta 'MAART 2020 BIJGESTELD'; tot slot schuift Farid het model en het dossier over elkaar: modelcurve en blokjes naast elkaar, Yasmin wijst een plek aan waar ze uit elkaar lopen]
Een dossier laat zien wat er gebeurd is. Maar wat als je iets verandert? Daarvoor bouwt Farid een model. Drie bakken: vatbaar, besmettelijk en hersteld. Mensen schuiven van de ene bak naar de volgende.

Elke maatregel is een knop. Thuiswerken draait aan de knop contacten. Farid zet hem op de helft. Hij neemt aan dat mensen zich daaraan houden. In het model komt de piek lager en later.

Het model geeft voor de piek één getal. Wat zegt dat getal? Wat denk je?
[VRAAG] (a) wat er gebeurt als de aannames kloppen · (b) hoeveel mensen er op het drukste moment ziek zullen zijn · (c) het ergste wat er kan gebeuren

Antwoord a. Zo'n getal is geen zekere uitkomst. Het laat zien wat er zou kunnen gebeuren, als de aannames uitkomen. Verandert een aanname, dan verandert de uitkomst. Het RIVM rekende in tweeduizendtwintig zulke scenario's door, en moest ze telkens bijstellen. Patiënten bleven bijvoorbeeld langer op de ic dan eerst gedacht.

Daarom legt Farid het model steeds over het dossier heen. Waar lopen ze uit elkaar? Daar zit een aanname die niet past, zegt hij.

## Recap [GGD-kantoor (decor); Farid en Yasmin voor het scherm; het complete dossier in één beeld: stapel blokjes met pijlen, tijdas met verdubbeling, groene balk met gouden drempel, en ernaast de drie bakken met de knop; vier kaartjes klappen uit: 'R: HOEVEEL STEEKT ÉÉN ZIEKE AAN' · 'R > 1: KEER TWEE, KEER TWEE' · 'DREMPEL: 1 − 1/R₀' · 'MODEL: WAT ALS …'; opleidingen: 'WO · BIOMEDISCHE WETENSCHAPPEN → MASTER BIOMEDICAL SCIENCES, RICHTING EPIDEMIOLOGY (ENGELS) · NIJMEGEN' · 'WO · GEZONDHEIDSWETENSCHAPPEN · ENSCHEDE, AMSTERDAM, MAASTRICHT' (meta '2026'); 'WERK: BIJV. EPIDEMIOLOOG BIJ GGD OF RIVM']
Corona groeide in maart tweeduizendtwintig zo snel, omdat één zieke er gemiddeld twee à drie aanstak. Dan wordt het elke paar dagen keer twee. Na de maatregelen zakte R onder de één. En ook zonder maatregelen stopt een epidemie: als zieken te weinig vatbare mensen vinden. Maar dan schiet hij ver door.

In Nijmegen kun je na Biomedische Wetenschappen een Engelstalige master doen met als richting epidemiologie. Gezondheidswetenschappen studeer je bijvoorbeeld in Enschede, Amsterdam of Maastricht. Met een master kun je daarna bijvoorbeeld epidemioloog worden, bij de GGD of het RIVM. Wil je arts worden, zoals Yasmin? Ook dan kun je je later specialiseren in infectieziekten.

## Eindkaart
Het reproductiegetal R zegt hoeveel mensen één zieke gemiddeld aansteekt; R₀ geldt als nog niemand immuun is.
R hangt af van contacten, de kans per contact en hoe lang iemand besmettelijk is: dus ook van gedrag. En van hoeveel mensen al immuun zijn.
Met R boven 1 groeit een uitbraak exponentieel, met een vaste verdubbeltijd; onder 1 dooft hij uit.
De curve afvlakken: de piek lager en later, zodat de zorg de zieken aankan.
Groepsimmuniteit: bij een immuun deel van 1 − 1/R₀ groeit de uitbraak niet meer.
Een model rekent uit wat er gebeurt áls de aannames kloppen; het is geen zekere voorspelling.

---

## Keuzes
- Antwoordletters: b, c, a, c, b, a.
- 'Wat denk je?' uit de cold open geschrapt (geen vraagkaart); de puzzel staat als kaart in beeld.
- Eén label voor het dossier: oefendossier met ronde getallen; echte getallen uit 2020 als apart kaartje met bron en jaar.
- Yasmin heeft twee beurten: ze telt haar dag (H1, heden) en de herinnering aan maart 2020; ze wijst in H4 aan waar model en dossier uit elkaar lopen.
- Ic-ligduur alleen als stemzin ('langer dan eerst gedacht'), geen getallen in beeld.

## Twijfels (naar de feitenreview / het twijfelblad)
- Herinneringskader maart 2020: er is geen jongere Yasmin in het castboek; voorstel huidige Yasmin en Bilal in een sepia kader.
- 'In het model staat de curve op zijn piek als de balk de drempel raakt' en 'ruim negen op de tien' (eigen SIR-berekening, ≈): steeds 'in het model'.
- Risicowoorden: R-nul, R, epidemioloog, epidemiologie, reproductiegetal, exponentiële, verdubbeltijd, groepsimmuniteit, bron- en contactonderzoek, ic, GGD, RIVM, coronapatiënten, scenario's, Enschede, Maastricht.
