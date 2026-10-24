# Toeval of echt? — script v2 (24 okt 2026)

Wat word jij? · Biomedische wetenschappen en Bio-informatica (gedeelde film), vwo, wo/hbo-oriëntatie. Voice Roos (eleven_v4). Look: Schema, met cast (Opa Henk met zijn tomaten en een nieuwe meststof; Noor doet de proef; Daan rekent mee in H4). v2 na eigen review (p-waarde-definitie preciezer, stelligheid, overlapzin). Rode draad: Noor test de meststof van Opa Henk met twintig plantjes; één dataset (10 + 10 lengtes) door de hele film, nagerekend in `reken/bereken.py`. Bouwt voort op Onderzoek doen (p-waarde bij Mendel, nulhypothese, 0,05, te weinig proefdieren) en Beroemde psychologie-experimenten (herhalen).

Leerdoelen (de leerling kan …)
1. uitleggen waarom een verschil tussen twee gemiddelden pas iets zegt samen met de spreiding (standaardafwijking)
2. uitleggen hoe het aantal metingen de standaardfout bepaalt (gedeeld door de wortel van n) en waarom onderzoekers vooraf uitrekenen hoeveel metingen ze nodig hebben
3. de p-waarde correct omschrijven (hoe vaak je zo'n verschil krijgt als de nulhypothese klopt) en twee misvattingen herkennen: p is niet de kans dat de nulhypothese waar is, en p zegt niet hoe groot het effect is
4. foutbalken lezen (standaardafwijking, standaardfout of betrouwbaarheidsinterval) en een t-toets uitvoeren in een spreadsheet of met een paar regels code

Misconcepties: (1) een gemiddeld verschil is vanzelf echt → cold open, H1; (2) meer metingen helpen evenredig → H2; (3) p = de kans dat de nulhypothese waar is / dat het toeval is → H3; (4) overlappende foutbalken = niet significant → H3; (5) significant = groot effect → H3.

---

## Cold open [Schema: tuin; Opa Henk bij zijn tomatenplanten met een zak meststof; Noor met een meetlint; twintig plantjes in potjes, tien met een gele sticker; twee gemiddelden 40 en 43 centimeter]
Opa Henk zweert bij zijn nieuwe meststof. Zijn tomatenplanten worden er veel groter van, zegt hij. Noor wil het zeker weten. Ze zet twintig jonge tomatenplantjes neer, en laat het toeval bepalen welke tien de meststof krijgen. Na vijf weken meet ze. Met meststof zijn ze gemiddeld drieënveertig centimeter, zonder veertig. Drie centimeter langer. Zie je wel, zegt Opa Henk. Weet je nu genoeg? Wat denk je?
[VRAAG] (a) ja, drie centimeter is een duidelijk en meetbaar verschil · (b) dat hangt af van hoeveel de plantjes onderling verschillen · (c) nee, met maar twintig plantjes kun je nooit iets zeggen

## Titel
Toeval of echt?

## Hoofdstuk 1 — Spreiding [Schema: lengte-as met twee rijen stippen, elke stip een plantje; eerst weinig spreiding (groepen naast elkaar), dan veel spreiding (25 tot 55 centimeter, groepen door elkaar); standaardafwijking als band rond het gemiddelde; Noors echte metingen: overlap van 39 tot 44 centimeter]
Antwoord b. Kijk dus niet alleen naar de gemiddelden, maar naar alle plantjes. Stel dat de plantjes in een groep maar een paar centimeter van elkaar verschillen. Dan liggen de twee groepen netjes naast elkaar, en is drie centimeter veel. Maar zitten er in elke groep plantjes van vijfentwintig tot vijfenvijftig centimeter, dan valt dat verschil weg in de ruis. Hoe ver metingen ongeveer van hun gemiddelde liggen, heet de spreiding. Je meet die met de standaardafwijking. Bij Noor is die ongeveer drie centimeter, in beide groepen. Haar groepen overlappen dus flink: het kleinste plantje met meststof is negenendertig centimeter, het grootste zonder vierenveertig.

## Hoofdstuk 2 — Hoeveel plantjes? [Schema: gemiddelde van drie plantjes dat bij elke herhaling wiebelt, met tien plantjes minder; standaardfout = standaardafwijking gedeeld door de wortel van n; balken: kans om een echt effect van drie centimeter te vinden met tien en met zeventien plantjes per groep; verwijzing naar Onderzoek doen]
Stel dat Noor de proef steeds opnieuw doet. Dan komt het gemiddelde steeds een beetje anders uit. Met drie plantjes per groep wiebelt het flink: één toevallig grote plant trekt het hele gemiddelde omhoog. Met tien plantjes wiebelt het minder. Die wiebel heet de standaardfout: de standaardafwijking gedeeld door de wortel van het aantal metingen. Bij Noor is dat ongeveer één centimeter. Noor wil de wiebel half zo groot. Hoeveel plantjes per groep heeft ze dan nodig? Wat denk je?
[VRAAG] (a) veertig · (b) twintig · (c) honderd

Antwoord a. Vier keer zoveel, want de wortel van vier is twee. Meer metingen helpen dus, maar elk extra plantje helpt steeds minder. Daarom rekenen onderzoekers vooraf uit hoeveel metingen ze nodig hebben. Stel dat de meststof echt drie centimeter scheelt, met deze spreiding. Met tien plantjes per groep vind je dan maar in iets meer dan de helft van de proeven een significant verschil. Met zeventien plantjes in acht van de tien. In Onderzoek doen zag je al dat te weinig proefdieren gebruiken onethisch is. Zo reken je uit hoeveel er genoeg is.

## Hoofdstuk 3 — Wat de p-waarde zegt [Schema: twintig plantjes met stickers 'met' en 'zonder'; de stickers worden steeds opnieuw gehusseld; histogram van duizenden verschillen rond nul; staarten voorbij plus en min drie centimeter gekleurd: ongeveer 4 op de 100; kaartje wat p niet is; staafgrafiek met 95%-betrouwbaarheidsintervallen die overlappen; interval van het verschil: 0,2 tot 5,8 centimeter]
In Onderzoek doen zag je bij Mendel al de p-waarde. Hier werkt het net zo. Stel dat de meststof niets doet: dat is de nulhypothese. Dan zijn de stickers 'met' en 'zonder' gewoon willekeurige labels. Hussel ze dus steeds opnieuw over de twintig plantjes, en reken elke keer het verschil uit. Meestal ligt dat dicht bij nul. Maar in ongeveer vier op de honderd keer is het drie centimeter of meer, de ene of de andere kant op. De p-waarde is dus ongeveer nul komma nul vier. Wat betekent dat precies? Wat denk je?
[VRAAG] (a) er is vier procent kans dat de meststof niets doet · (b) de meststof werkt met zesennegentig procent zekerheid · (c) zonder effect zie je zo'n verschil maar zelden

Antwoord c. De p-waarde is de kans op een verschil van minstens drie centimeter, uitgerekend alsof de meststof niets doet. Het is niet de kans dat de meststof niets doet. En een kleine p-waarde zegt op zich niet hoe groot het effect is. Kijk daarvoor naar de foutbalken. Zet er altijd bij wat ze laten zien: de spreiding van de plantjes, de standaardfout, of een betrouwbaarheidsinterval. Noor tekent per groep het betrouwbaarheidsinterval van vijfennegentig procent. Die balken overlappen, en toch is de p-waarde kleiner dan nul komma nul vijf. Overlappende balken betekenen dus niet vanzelf dat er geen verschil is. Voor het verschil zelf loopt het interval van een paar millimeter tot bijna zes centimeter. Alle effecten daartussen passen bij haar metingen.

## Hoofdstuk 4 — Zelf rekenen [Schema: Noor en Daan achter een laptop; spreadsheet met twee kolommen lengtes en één formule; uitkomst 0,036; dezelfde toets in een paar regels Python]
Noor en Daan rekenen het zelf na. In een spreadsheet zetten ze de lengtes in twee kolommen, en typen ze één formule: de t-toets. In Python zijn het een paar regels. Allebei geven ze nul komma nul drie zes, bijna hetzelfde als het husselen. De t-toets vergelijkt het verschil met de wiebel van dat verschil. Hier is het verschil ruim twee keer zo groot als die wiebel.

## Recap [Schema: Opa Henk en Noor bij de tomaten; drie kaartjes: spreiding, aantal metingen, p-waarde; twee opleidingen]
Noors metingen passen dus slecht bij een meststof die niets doet. Maar hoeveel hij helpt, weet nog niemand precies. Daarvoor heeft ze meer plantjes nodig. Kijk bij elk verschil naar de spreiding, het aantal metingen, en wat de p-waarde echt zegt.

Biomedische onderzoekers toetsen zo hun proeven met cellen of proefdieren. Biomedische wetenschappen studeer je aan de universiteit: drie jaar voor de bachelor, en daarna meestal een master. In de bio-informatica toets je soms twintigduizend genen tegelijk. Doet geen enkel gen iets, dan verwacht je door toeval toch zo'n duizend keer een p-waarde onder nul komma nul vijf. Daarom rekenen ze met een strengere grens. Bio-informatica is een hbo-opleiding van vier jaar, en aan de universiteit kun je er een master in doen.

## Eindkaart
Een gemiddelde zegt pas iets samen met de spreiding.
Vier keer zoveel metingen: de standaardfout wordt half zo groot.
p-waarde: hoe vaak een minstens zo groot verschil voorkomt als er geen effect is.
Zet bij foutbalken altijd wat ze laten zien.
