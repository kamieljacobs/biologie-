# Hoe een epidemie groeit en stopt — script variant B (26 okt 2026; kleine mutaties: voorbeeld en camerabeweging)

Wat word jij? · Gezondheidswetenschappen (film 1); wo Gezondheidswetenschappen, master Epidemiology, ook via geneeskunde naar de publieke gezondheid. Voice Roos (eleven_v4). Look: Schema met cast (Yasmin, 16, snuffelstage bij de afdeling infectieziektebestrijding van een GGD; Epidemioloog Farid, ± 38, nieuw personage, haar begeleider); telpoppetjes alleen in ketens en tellingen; teal = vatbaar, koraal = besmettelijk, groen = immuun/hersteld, oker = maatregel, goud = focus. Decor: één ElevenLabs-achtergrond, het GGD-kantoor met groot scherm (opening H1, opening H2 bij het scherm, H4, recap); alle schema's en grafieken op navy. Mutaties: (1) **voorbeeld**: een doorgestuurd filmpje in Yasmins groepsapp loopt als vergelijking door de hele film (doorsturen = besmetten, al gezien = immuun, het filmpje raakt uit = de uitbraak dooft uit); (2) **camerabeweging**: bewuste camerataal in elke `[Schema]`-regel (CAMERA: …): meebewegen langs de keten voor groei, uitzoomen van één persoon naar de stad naar de curve voor 'exponentieel', inzoomen op één zieke voor R en voor groepsimmuniteit. Rode draad: de startvraag uit vervolg.html, 'Waarom groeide corona in maart 2020 zo snel, en waarom stopt een epidemie uiteindelijk?'. Bouwt voort op *T-cellen en virussen*, *Vaccins, allergie en bloedgroepen* en *Plek genoeg?*. Getallen alleen uit `getallen.md`. Nog niet gekeurd door Kamiel.

**Leerdoelen** (de leerling kan …) — voorstel Claude, niet gekeurd
1. uitleggen wat het reproductiegetal R is, het verschil met R₀, en van welke drie dingen R afhangt (contacten, kans op besmetting per contact, hoe lang iemand besmettelijk is);
2. uitleggen waarom een uitbraak met R boven 1 exponentieel groeit en met R onder 1 uitdooft, en wat een verdubbeltijd is;
3. uitleggen wat 'de curve afvlakken' betekent (piek lager en later, zodat de zorg het aankan);
4. de drempel voor groepsimmuniteit uitrekenen met 1 − 1/R₀ en uitleggen waarom die voor mazelen veel hoger ligt;
5. uitleggen waarom een epidemie ook zonder maatregelen stopt (vatbaren raken op) en waarom hij dan doorschiet;
6. beschrijven hoe een epidemioloog met een eenvoudig model (vatbaar, besmettelijk, hersteld) het effect van een maatregel doorrekent, en wat een model wel en niet kan.

**Misconcepties**
1. Een epidemie groeit gelijkmatig (lineair) → cold open (vraag).
2. R is een vaste eigenschap van een virus → H1 (vraag).
3. Een epidemie stopt pas als iedereen ziek is geweest → H4 (vraag, het model laat het zien).
4. Groepsimmuniteit betekent dat iedereen immuun moet zijn → H3 (vraag).
5. 'De curve afvlakken' betekent vooral dat er minder mensen ziek worden → H2 (vraag).
6. Een model voorspelt precies wat er gaat gebeuren → H4 (vraag).

---

## Cold open [Schema: navy; CAMERA begint heel dicht op één koraal telpoppetje met een klein label '100', meta 'REKENVOORBEELD'; een teller 'DAG 0' loopt; bij elke verdubbeling (± 5–6 dagen) springt naast het poppetje een tweede, gelijk groot blok op, en de CAMERA zoomt telkens precies zo ver uit dat het nieuwe totaal in beeld past: 100 · 200 · 400 · 800; de zoom versnelt mee, zodat de kijker het tempo voelt; meta 'NL · MAART 2020 · VERDUBBELTIJD ± 5 À 6 DAGEN (RIVM)'; bij de vraag bevriest het beeld op 'DAG 30 · ?']

Maart tweeduizendtwintig. Het aantal coronabesmettingen verdubbelde toen ongeveer elke vijf à zes dagen, schatte het RIVM. Yasmin rekent het na. Stel: vandaag honderd zieken. Hoeveel zijn het een maand later? Wat denk je?

[VRAAG] (a) zo'n tweehonderd: één keer verdubbeld · (b) zo'n zevenhonderd: elke keer honderd erbij · (c) een paar duizend: elke keer keer twee

## Titel
Hoe een epidemie groeit en stopt
(tweede regel, klein: zo rekent een epidemioloog)

Antwoord c. In een maand verdubbelt het aantal vijf of zes keer. Honderd, tweehonderd, vierhonderd, achthonderd … dan zit je al boven de drieduizend. Niet steeds evenveel erbij, maar steeds keer twee. Waarom gaat dat zo snel? En waarom stopt het ooit?

## Hoofdstuk 1 — Het reproductiegetal R: hoeveel mensen steekt één zieke aan? [Schema: GGD-kantoor (ElevenLabs-decor), Yasmin met badge 'STAGIAIR · INFECTIEZIEKTEBESTRIJDING' naast Farid (badge, laptop) bij het grote scherm; menselijk moment: Yasmin krijgt in de pauze een filmpje in de groepsapp, grinnikt en stuurt het door; CAMERA beweegt mee met het filmpje als een klein paars-wit vierkantje dat van haar telefoon naar drie andere telefoons vliegt (drie pijlen), meta 'DOORGESTUURD: 3'; overgang naar navy: de telefoons worden telpoppetjes, het filmpje wordt een koraal kleur; CAMERA zoomt langzaam in op dat ene koraal poppetje tot alleen het poppetje en zijn pijlen in beeld zijn; label 'R = GEMIDDELD AANTAL MENSEN DAT ÉÉN ZIEKE AANSTEEKT', klein 'R₀ = AAN HET BEGIN, NOG NIEMAND IMMUUN'; drie schuifknoppen onder het poppetje: 'CONTACTEN PER DAG', 'KANS PER CONTACT', 'DAGEN BESMETTELIJK'; de som verschijnt stap voor stap: '10 × 1/20 × 5 = 2,5', meta 'REKENVOORBEELD'; bij de vraag: knop CONTACTEN (oker) zakt van 10 naar 5, de uitkomst wordt '?'; na het antwoord: '5 × 1/20 × 5 = 1,25', de helft van de pijlen verdwijnt; daarna drie poppetjes naast elkaar met hun pijlen: 'GRIEP ± 1,3' (één pijl, soms twee), 'CORONA 2020 · R₀ ± 2 À 3', 'MAZELEN · VAAK 12–18 GENOEMD' (een waaier pijlen); CAMERA trekt terug zodat de waaier van mazelen het beeld vult]

Yasmin loopt snuffelstage bij de GGD. Haar begeleider Farid is epidemioloog. Hij onderzoekt hoe vaak een ziekte voorkomt, bij wie, en waardoor.

In de pauze krijgt Yasmin een grappig filmpje. Ze stuurt het meteen door naar drie vrienden. Zo verspreidt een virus zich ook, zegt Farid. Alleen kiest een virus niets: het gaat mee met wat mensen doen.

Hij telt hoeveel mensen één zieke gemiddeld aansteekt. Dat is het reproductiegetal R. Aan het begin, als nog niemand beschermd is, heet het R-nul. Bij het eerste coronavirus stak één zieke gemiddeld zo'n twee à drie anderen aan.

R hangt af van drie dingen: hoeveel mensen je ziet, de kans dat het virus per contact overspringt, en hoeveel dagen je besmettelijk bent. Stel: tien contacten per dag, een kans van één op twintig, vijf dagen. Samen geeft dat twee komma vijf.

Nu ziet iedereen de helft minder mensen. Wat gebeurt er met R? Wat denk je?

[VRAAG] (a) R halveert mee: het hangt ook van gedrag af · (b) R blijft gelijk: het is nog steeds hetzelfde virus · (c) R zakt iets, maar vooral het virus bepaalt R

Antwoord a. Met de helft minder contacten wordt R ook de helft: één komma vijfentwintig. R is dus geen vaste eigenschap van een virus. Het hangt ook af van hoe wij met elkaar omgaan, en van hoeveel mensen al immuun zijn.

Ziektes verschillen wel. Bij gewone griep steekt één zieke gemiddeld iets meer dan één ander aan. Bij mazelen ligt R-nul veel hoger: vaak wordt twaalf tot achttien genoemd.

## Hoofdstuk 2 — Exponentiële groei en de curve afvlakken [Schema: GGD-kantoor, Farid tekent op het grote scherm één koraal poppetje; overgang naar navy; CAMERA beweegt mee langs de keten van links naar rechts, op het tempo van de besmettingen: elk poppetje geeft twee of drie pijlen door, onder elke ronde een stempel 'NA ± 4–5 DAGEN'; de camera moet steeds sneller en breder meebewegen omdat elke ronde breder wordt; dan stopt het meebewegen en zoomt de CAMERA in één doorlopende beweging uit: de keten wordt een wijk, de wijk een stad (plattegrond, geen echte stad, koraal stippen die verdubbelen), en de stad krimpt tot één punt op een curve die zich tekent, meta 'MODEL'; de curve gaat steil omhoog; horizontale lijn 'IC-BEDDEN NORMAAL ± 1150'; een kaartje 'NL · 7 APRIL 2020 · RUIM 1400 CORONAPATIËNTEN OP DE IC' en de lijn schuift op naar 'OPGESCHAALD NAAR 2400 (5 APRIL 2020)', bron 'VWS'; geen ic-beelden; klein terugverwijskaartje 'Plek genoeg?'; bij de vraag: alleen de steile curve en de ic-lijn; na het antwoord: een tweede curve (oker) over dezelfde as, lager en later, oppervlakte grijs gearceerd erbij, meta 'MODEL · VEREENVOUDIGD'; CAMERA blijft nu stil op de hele grafiek, zodat de twee curves naast elkaar te vergelijken zijn; daarna een tijdbalk 'MAART 2020' met drie oker stipjes '12 · 16 · 23 MAART' en een R-meter die van boven 1 naar 'ROND 1' zakt, label 'SCHATTING RIVM, ACHTERAF']

Farid tekent op het grote scherm één zieke. Na een dag of vier, vijf geeft die het virus door, aan twee of drie anderen. Die doen hetzelfde. Zo wordt elke ronde groter dan de vorige.

Dat heet exponentiële groei: het aantal verdubbelt steeds in dezelfde tijd, de verdubbeltijd. Dezelfde groei zag je bij populaties in de film Plek genoeg?.

Ligt R boven de één, dan groeit de uitbraak. Zakt R onder de één, dan dooft hij langzaam uit.

Normaal heeft Nederland zo'n elfhonderdvijftig ic-bedden. Begin april tweeduizendtwintig lagen er op het drukste moment ruim veertienhonderd coronapatiënten op de ic.

Daarom klonk overal: we moeten de curve afvlakken. Wat betekent afvlakken? Wat denk je?

[VRAAG] (a) in totaal worden er veel minder mensen ziek · (b) de piek wordt lager en komt later · (c) de piek komt eerder en is sneller voorbij

Antwoord b. Afvlakken betekent: niet iedereen tegelijk ziek. De top van de curve zakt en schuift op in de tijd, zodat de zorg de zieken aankan. Dat er in totaal ook minder mensen ziek worden, kan, maar dat is niet de kern.

Na de maatregelen van half maart zakte R volgens het RIVM tot rond de één, en daarna eronder. Het RIVM rekent R terug uit hoeveel mensen ziek worden. Pas na een week of twee is die schatting betrouwbaar.

## Hoofdstuk 3 — Groepsimmuniteit: welk deel moet immuun zijn? [Schema: navy; Yasmins groepsapp in het klein: het filmpje komt bij vrienden die al een groen vinkje 'AL GEZIEN' hebben, het pijltje stopt daar; overgang: de vrienden worden telpoppetjes, groen = immuun; CAMERA zoomt in op één koraal poppetje met drie pijlen, meta 'STEL: R₀ = 3'; bij de vraag: om het poppetje staan drie teal poppetjes, het deel dat groen moet worden staat als '?' in beeld; na het antwoord kleuren twee van de drie groen en hun pijlen ketsen af; er blijft één pijl over, label 'R = 1'; daarna CAMERA stil op de som, die regel voor regel verschijnt: '1 − 1/R₀' · '1 − 1/3' · '≈ 2/3 ≈ 67 %'; een balk 'CORONA (R₀ = 3) ≈ 2/3' naast een veel langere balk 'MAZELEN ≈ 95 %', klein terugverwijskaartje 'Vaccins, allergie en bloedgroepen'; laatste beeld: CAMERA zoomt uit naar een veld telpoppetjes in groepjes (een school, een straat, een sportclub), in één groepje veel teal bij elkaar, meta 'VUISTREGEL · MENSEN MENGEN NIET WILLEKEURIG']

Terug naar het filmpje. Een vriend die het al gezien heeft, stuurt het niet nog een keer door. Bij een virus is dat iemand die immuun is: door een vaccin, of omdat hij het al gehad heeft.

Stel: R-nul is drie. Welk deel van de mensen moet immuun zijn, zodat de uitbraak niet meer groeit? Wat denk je?

[VRAAG] (a) iedereen: anders blijft het virus rondgaan · (b) ongeveer een derde van alle mensen · (c) ongeveer twee derde van alle mensen

Antwoord c. Zonder bescherming steekt één zieke er drie aan. Zijn twee van die drie immuun, dan steekt hij gemiddeld nog maar één ander aan. Is het iets meer, dan zakt R onder de één.

Op het scherm staat de som: één min één gedeeld door R-nul. Bij R-nul drie is dat ongeveer twee derde. Dat heet groepsimmuniteit: zoveel mensen zijn immuun, dat ook wie het niet is beschermd is.

Bij mazelen ligt R-nul veel hoger. Daar moet ongeveer vijfennegentig procent immuun zijn. Het blijft een vuistregel. In het echt gaan mensen niet willekeurig met elkaar om, maar vooral binnen hun eigen groep.

## Hoofdstuk 4 — Maatregelen doorrekenen met een eenvoudig model [Schema: GGD-kantoor (ElevenLabs-decor), Farid achter zijn laptop, Yasmin naast hem, het grote scherm erachter; CAMERA zoomt in op het scherm tot het beeld vult (overgang naar navy): drie bakjes naast elkaar 'VATBAAR' (teal), 'BESMETTELIJK' (koraal), 'HERSTELD' (groen), pijlen ertussen, meta 'MODEL · KERMACK EN MCKENDRICK · 1927'; telpoppetjes stromen van bak naar bak; CAMERA blijft eerst dicht op de bakjes, dan zoomt hij langzaam uit en onder de bakjes tekent het model zelf de curve van het bakje besmettelijk; bij de vraag bevriest het beeld net voor de piek; na het antwoord loopt het model door: de curve daalt, het bakje vatbaar is níet leeg (label 'BLIJFT OVER'), een stippellijn 'DREMPEL ≈ 2/3' en een gearceerd stuk erboven 'DOORSCHIETEN · IN HET MODEL'; dan Farid's beurt: hij draait aan een oker knop 'CONTACTEN −50 %', de CAMERA schuift mee met de knop naar de grafiek, waar een tweede curve (oker) lager en later verschijnt; bij de tweede vraag: één gouden stip op de top van de curve met 'DAG ?'; na het antwoord: een waaier van vage curves rond de ene curve, label 'SCENARIO'S'; een kaartje 'IC-LIGDUUR: EERST AANGENOMEN · LATER GEMETEN: VEEL LANGER', meta 'RIVM · 2020']

Farid opent op zijn laptop een eenvoudig model. Drie bakjes: vatbaar, besmettelijk en hersteld. Mensen stromen van het ene bakje naar het volgende. Het idee is bijna honderd jaar oud: Kermack en McKendrick, negentien zevenentwintig.

Farid laat het model lopen, zonder maatregelen. Het bakje besmettelijk loopt snel vol. Wanneer houdt de stroom op? Wat denk je?

[VRAAG] (a) als zieken te weinig vatbare mensen meer tegenkomen · (b) pas als het bakje vatbaar helemaal leeg is · (c) zodra twee derde in het bakje hersteld zit

Antwoord a. Elke zieke ontmoet steeds meer mensen die het al gehad hebben. Daardoor zakt R vanzelf onder de één, ook als niemand iets doet. In het bakje vatbaar blijven mensen over. Maar op dat moment zijn er nog veel zieken, en die steken nog anderen aan. In dit model raken zo veel meer mensen besmet dan nodig voor groepsimmuniteit. De epidemie schiet door.

Dan draait Farid aan één knop: de helft minder contacten. De piek komt lager en later. Zo leg je maatregelen naast elkaar, zegt hij.

Het model tekent de piek op één bepaalde dag. Gebeurt het in het echt precies zo? Wat denk je?

[VRAAG] (a) ja: het model rekent het tot op de dag uit · (b) nee: het laat zien wat er kan gebeuren · (c) ja: als de computer maar groot genoeg is

Antwoord b. Een model voorspelt niet wat er gaat gebeuren. Het laat zien wat er zou kunnen gebeuren, als de aannames kloppen. Zo rekende het RIVM in tweeduizendtwintig scenario's door. De modelleurs moesten hun model telkens bijstellen: patiënten bleven bijvoorbeeld veel langer op de ic dan eerst gedacht.

## Recap [GGD-kantoor (ElevenLabs-decor); Yasmin kijkt op haar telefoon: het filmpje in de groepsapp, bijna iedereen heeft een groen vinkje, niemand stuurt het nog door; CAMERA zoomt van haar telefoon uit naar het grote scherm, waarop de film terugspoelt langs de vier beelden: de pijlen van één zieke (R) · de keten die uitwaaiert tot een stad (exponentieel) · twee van de drie poppetjes groen (drempel) · de drie bakjes met de lagere curve (model); opleidingen: 'WO · MASTER EPIDEMIOLOGY (ENGELSTALIG) · NIJMEGEN · BV. NA BIOMEDISCHE WETENSCHAPPEN', 'WO · GEZONDHEIDSWETENSCHAPPEN · ENSCHEDE · AMSTERDAM · MAASTRICHT', meta 'STAND 2026'; werk: 'EPIDEMIOLOOG · GGD · RIVM']

Corona groeide in maart tweeduizendtwintig zo snel, omdat elke zieke er twee à drie aanstak: dan verdubbelt het elke paar dagen. Een epidemie stopt als zieken te weinig vatbare mensen vinden, net als een filmpje dat iedereen al gezien heeft.

In Nijmegen kun je bijvoorbeeld na Biomedische Wetenschappen de Engelstalige master Epidemiology doen. Gezondheidswetenschappen studeer je bijvoorbeeld in Enschede, Amsterdam of Maastricht. Daarna werk je bijvoorbeeld als epidemioloog bij de GGD of het RIVM.

## Eindkaart
R is het gemiddelde aantal mensen dat één zieke aansteekt; R-nul geldt aan het begin, als nog niemand immuun is.
R hangt af van contacten, de kans per contact en hoe lang iemand besmettelijk is: dus ook van gedrag.
R boven 1: de uitbraak verdubbelt steeds in dezelfde tijd. R onder 1: hij dooft uit.
Afvlakken: de piek lager en later, zodat de zorg het aankan.
Groepsimmuniteit: drempel 1 − 1/R₀; bij R₀ = 3 ongeveer twee derde, bij mazelen ongeveer 95 %.
Een epidemie stopt voordat iedereen ziek is geweest, maar schiet in het model door de drempel heen.
Een model laat zien wat er kan gebeuren, niet wat er gaat gebeuren.

---
