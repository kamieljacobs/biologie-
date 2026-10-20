# Brein en computer — script v2 (20 okt 2026)

Wat word jij? · Neurowetenschappen, vwo, wo-oriëntatie (computationele neurowetenschap, neurotechnologie). Voice Roos (eleven_v4). Look: Schema, met cast (Daan en zijn telefoon; Dr. Kim als neurowetenschapper). Rode draad: Daans telefoon vindt zijn kattenfoto's. Bouwt voort op Het kabelnetwerk (pulsje), De spleet (synaps) en Leren en onthouden (synapsen worden sterker); en op Kijken in een denkend brein (Hubel en Wiesel). v2 na reviews/review_v1.md (alle MOET-punten en de meeste KAN-punten verwerkt).

Leerdoelen (de leerling kan …)
1. uitleggen hoe een neuron prikkelende en remmende signalen optelt en boven een drempel vuurt (alles of niets)
2. met een kunstmatig neuron met gewichten uitrekenen of het vuurt
3. uitleggen dat leren in een netwerk het aanpassen van gewichten na fouten is, en de vergelijking met synapsen maken
4. drie verschillen noemen tussen leren in de hersenen en leren in een kunstmatig netwerk
5. beschrijven hoe neurowetenschappers programmeren om metingen van veel neuronen te analyseren en om bewegingen af te lezen (brein-computerinterface)

Misconcepties: (1) een neuraal netwerk is een nagebouwd brein → cold open, H3; (2) meer prikkelende dan remmende signalen betekent altijd vuren → vraag 2; (3) een neuron kan half vuren → vraag 2; (4) leren is iets opslaan of een cel erbij → vraag 3; (5) hersencellen sturen duidelijke woorden of commando's → vraag 5.

---

## Cold open [Schema: Daan met telefoon; fotogalerij met zoekwoord 'kat'; netwerk van bolletjes en lijnen achter het scherm]
Daan zoekt op zijn telefoon naar foto's van zijn kat. Hij typt kat, en daar zijn ze. Daan heeft die foto's nooit een naam gegeven. Een programma heeft geleerd hoe een kat eruitziet. Zo'n programma heet een neuraal netwerk, naar de neuronen in je hersenen. Leert het ook zoals jouw hersenen? Wat denk je?
[VRAAG] (a) ja: het is een nagebouwd brein · (b) deels: het lijkt erop, maar leert anders · (c) nee: het heeft niets met hersenen te maken

## Titel
Brein en computer

## Hoofdstuk 1 — Een neuron als rekensom [Schema: neuron met dendrieten, cellichaam en axon; plus- en minpijltjes; teller in het cellichaam met een drempellijn; kunstmatig neuron met ingangen, gewichten, optelteken en drempel]
Antwoord b. Om te zien wat de makers van de hersenen leenden, beginnen we bij één neuron. Een neuron krijgt via zijn synapsen signalen van duizenden andere neuronen. Sommige signalen prikkelen: ze maken de kans op een pulsje groter. Andere remmen. Het cellichaam telt alles bij elkaar op. Komt de som boven een drempel, dan vuurt het neuron een pulsje af. Dat pulsje is altijd even groot. Komt de som er niet boven, dan gebeurt er niets. Hoe zo'n pulsje over het axon reist, zag je in de film Het kabelnetwerk.

In het jaar 1943 maakten Warren McCulloch en Walter Pitts hier een rekensom van: optellen, vergelijken met een drempel, en dan één of nul. Latere versies gaven elk signaal een gewicht: plus voor prikkelend, min voor remmend. Komt de som op de drempel of erboven, dan is de uitkomst één. Eronder is de uitkomst nul. Probeer het zelf. Drie signalen prikkelen: plus twee, plus twee en plus één. Eén signaal remt: min drie. De drempel is drie. Vuurt dit neuron? Wat denk je?
[VRAAG] (a) ja: de prikkelende signalen samen zijn al vijf · (b) half: het geeft een kleiner pulsje · (c) nee: de som blijft onder de drempel

Antwoord c. Twee plus twee plus één is vijf. Vijf min drie is twee. Dat is onder de drempel, dus geen pulsje. En een half pulsje bestaat niet: het is alles of niets. Een echt neuron is ingewikkelder. Waar een synaps zit en wanneer een signaal komt, maakt ook uit. Maar het idee optellen, drempel, vuren werkt verrassend goed.

## Hoofdstuk 2 — Leren door gewichten te veranderen [Schema: synaps die sterker wordt naast een lijn die dikker wordt; netwerk met negen hokjes als ingang en één uitgang; plaatjes van een kruis en een rondje; foute uitkomst; lijnen die dikker en dunner worden; foutenteller die daalt]
In de film Leren en onthouden zag je: synapsen die vaak samen actief zijn, worden sterker. In een kunstmatig netwerk heet de sterkte van een verbinding een gewicht. Leren is dan: gewichten aanpassen. In het jaar 1958 beschreef Frank Rosenblatt een netwerk dat dat zelf deed: het perceptron. Hier krijgt een eenvoudige versie plaatjes van negen hokjes. Elk zwart hokje stuurt een signaal naar de uitgang. De uitgang telt op. Boven de drempel zegt hij kruis, eronder rondje. In het begin zijn alle gewichten willekeurig. Het netwerk gokt dus maar wat. Het zegt kruis, maar het was een rondje. Wat verandert er nu? Wat denk je?
[VRAAG] (a) er komt een nieuw neuron bij · (b) de verbindingen van de zwarte hokjes worden een beetje zwakker · (c) het netwerk bewaart het foute plaatje, zodat het dat onthoudt

Antwoord b. Elke fout geeft een klein duwtje. Zegt het kruis bij een rondje, dan worden de verbindingen van de zwarte hokjes iets zwakker. Zegt het rondje bij een kruis, dan worden ze iets sterker. Na tientallen plaatjes maakt het netwerk bijna geen fouten meer. En het herkent ook een kruis met een hokje verschoven, dat het nog nooit zag. Niemand heeft een regel ingetypt. De kennis zit in de gewichten.

## Hoofdstuk 3 — Wat AI leende, en waar het verschilt [Schema: netwerk in lagen: randjes, vormen en onderdelen, kat; twee kolommen 'hersenen' en 'netwerk' met voorbeelden, energie, fout terugsturen, pulsjes]
Een netwerk dat katten herkent, heeft veel lagen achter elkaar. De eerste lagen reageren op randjes, de volgende op vormen en onderdelen, zoals oren. Niemand heeft dat ingeprogrammeerd: het ontstaat tijdens het leren. Het lijkt op wat Hubel en Wiesel vonden in de visuele schors: eerst cellen voor randjes. Die bouw in lagen is echt van de hersenen afgekeken.

Maar er zijn grote verschillen. Neem een netwerk dat vanaf nul leert. Wie heeft meer voorbeelden nodig om een nieuw dier te leren herkennen: een kind of zo'n netwerk? Wat denk je?
[VRAAG] (a) het kind: een kind moet alles heel vaak zien · (b) het netwerk: dat heeft er honderden tot duizenden nodig · (c) ze hebben er ongeveer even veel nodig

Antwoord b. Een kind ziet een paar keer een giraf, en herkent hem daarna ook als tekening. Een bekend netwerk voor plaatjes leerde van ongeveer duizend foto's per soort, ruim een miljoen in totaal. Eerlijk is eerlijk: een kind begint niet bij nul. Het heeft al jaren rondgekeken. En een netwerk dat al veel geleerd heeft, leert een nieuw dier ook sneller.

Het tweede verschil is energie. Je hersenen werken op ongeveer twintig watt, minder dan een laptop. Een groot AI-model wordt getraind op duizenden computerchips tegelijk. Samen gebruiken die honderdduizenden keren zoveel stroom. Het derde verschil: wat er met een fout gebeurt. In een kunstmatig netwerk rekent de computer precies uit hoeveel elk gewicht aan de fout bijdroeg. Dat gaat terug door alle lagen. Of je hersenen iets vergelijkbaars doen, weet nog niemand. En echte neuronen sturen pulsjes op precieze momenten. De meeste netwerken geven gewoon getallen door, zonder precieze timing.

## Hoofdstuk 4 — Programmeren in de neurowetenschap [Schema: Dr. Kim en Daan bij een scherm; muis in een doolhof; dunne meetnaald met veel meetpunten; rijen pulsjes; codevenster; robotarm met beker en een chipje in de bewegingsschors]
Onderzoeker Kim wil weten hoe muizen de weg vinden. In de hersenen van een muis zit een dunne naald met honderden meetpunten. Die meet honderden neuronen tegelijk, dertigduizend keer per seconde. Na een uur heb je meer getallen dan je ooit met de hand kunt bekijken. Daarom programmeren neurowetenschappers. Daan kijkt mee. Het programma zoekt welke cel wanneer vuurt. En welke cellen samen actief zijn als de muis een bocht neemt.

Je kunt ook de andere kant op: van hersenen naar apparaat. Iemand is vanaf de nek verlamd. In het deel van de hersenschors dat bewegingen stuurt, zit een chipje met bijna honderd meetpuntjes. Die meten tientallen cellen tegelijk. Hoe weet de computer welke beweging iemand wil maken? Wat denk je?
[VRAAG] (a) de cellen sturen een duidelijk commando, zoals arm omhoog · (b) een programma leert welk vuurpatroon bij welke bedoelde beweging hoort · (c) de chip stuurt de spieren direct aan, zonder te rekenen

Antwoord b. Eerst denkt iemand aan bewegingen, terwijl de computer meekijkt. Zo leert een programma welk patroon bij welke beweging hoort, met gewichten, net als in een kunstmatig netwerk. Daarna stuurt het programma een robotarm. In het jaar 2011 dronk een verlamde vrouw zo zelf koffie. Dat had ze bijna vijftien jaar niet gekund. Zulke systemen zijn nog experimenteel. Maar ze laten zien hoe ver je komt met optellen, drempels en gewichten.

## Recap [Schema: Daans telefoon; neuron en kunstmatig neuron naast elkaar; drie verschillen als kaartjes]
Terug naar Daans telefoon. Leert dat netwerk zoals jouw hersenen? Deels. Het gebruikt het neuron als rekensom, de lagen, en leren door gewichten aan te passen. Maar vanaf nul heeft het veel meer voorbeelden nodig, het kost veel meer energie, en het verwerkt fouten op een andere manier.

Neurowetenschappers werken aan beide kanten. Modellen om de hersenen te begrijpen, en programmeren om hun metingen te lezen. Je kunt dit werk doen na bijvoorbeeld biologie, psychologie, natuurkunde, informatica of kunstmatige intelligentie, met daarna een master in de neurowetenschappen.

## Eindkaart
Een neuron telt prikkelende en remmende signalen op, en vuurt boven een drempel.
Leren is gewichten aanpassen: in een netwerk na fouten, in je hersenen via synapsen.
AI leende ideeën van de hersenen, maar leert anders en kost veel meer energie.
