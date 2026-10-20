# Brein en computer — script v1 (20 okt 2026)

Wat word jij? · Neurowetenschappen, vwo, wo-oriëntatie (computationele neurowetenschap, neurotechnologie). Voice Roos (eleven_v4). Look: Schema, met cast (Daan en zijn telefoon; Dr. Kim als neurowetenschapper). Rode draad: Daans telefoon vindt zijn kattenfoto's. Bouwt voort op Het kabelnetwerk (pulsje), De spleet (synaps) en Leren en onthouden (synapsen worden sterker); en op Kijken in een denkend brein (Hubel en Wiesel).

Leerdoelen (de leerling kan …)
1. uitleggen hoe een neuron prikkelende en remmende signalen optelt en boven een drempel vuurt (alles of niets)
2. het model van McCulloch en Pitts gebruiken om uit te rekenen of een kunstmatig neuron vuurt
3. uitleggen dat leren in een netwerk het aanpassen van gewichten is, en de vergelijking met synapsen maken
4. drie verschillen noemen tussen leren in de hersenen en leren in een kunstmatig netwerk
5. beschrijven hoe neurowetenschappers programmeren om metingen van veel neuronen te analyseren en om bewegingen af te lezen (brein-computerinterface)

Misconcepties: (1) een neuraal netwerk is een nagebouwd brein → cold open, H3; (2) meer prikkelende dan remmende signalen betekent altijd vuren → vraag 2; (3) een neuron kan half vuren → vraag 2; (4) leren is iets opslaan of een cel erbij → vraag 3; (5) hersencellen sturen duidelijke woorden of commando's → vraag 5.

---

## Cold open [Schema: Daan met telefoon; fotogalerij met zoekwoord 'kat'; netwerk van bolletjes en lijnen achter het scherm]
Daan zoekt op zijn telefoon naar foto's van zijn kat. Hij typt kat, en daar zijn ze. Niemand heeft die foto's ooit gelabeld. Een programma heeft geleerd hoe een kat eruitziet. Zo'n programma heet een neuraal netwerk, naar de neuronen in je hersenen. Leert het ook zoals jouw hersenen? Wat denk je?
[VRAAG] (a) ja: het is een nagebouwd brein · (b) deels: het leende een paar ideeën van de hersenen, maar leert heel anders · (c) nee: het heeft niets met hersenen te maken

## Titel
Brein en computer

## Hoofdstuk 1 — Een neuron als rekensom [Schema: neuron met dendrieten, cellichaam en axon; plus- en minpijltjes; teller in het cellichaam met een drempellijn; model van McCulloch en Pitts met ingangen, gewichten, optelteken en drempel]
Antwoord b. Om te zien wat er geleend is, beginnen we bij één neuron. Een neuron krijgt via zijn synapsen signalen van duizenden andere neuronen. Sommige signalen prikkelen: ze maken de kans op een pulsje groter. Andere remmen. Het cellichaam telt alles bij elkaar op. Komt de som boven een drempel, dan vuurt het neuron een pulsje af. Dat pulsje is altijd even groot. Komt de som er niet boven, dan gebeurt er niets. Hoe zo'n pulsje over het axon reist, zag je in de film Het kabelnetwerk.
In het jaar 1943 maakten Warren McCulloch en Walter Pitts hier een rekensom van. Elk signaal krijgt een gewicht: plus voor prikkelend, min voor remmend. Je telt alles op en vergelijkt de som met de drempel. Erboven: een één. Eronder: een nul. Probeer het zelf. Drie signalen prikkelen: plus twee, plus twee en plus één. Eén signaal remt: min drie. De drempel is drie. Vuurt dit neuron? Wat denk je?
[VRAAG] (a) ja: er komen meer prikkelende dan remmende signalen binnen · (b) nee: de som is twee, en dat is onder de drempel · (c) half: het geeft een kleiner pulsje

Antwoord b. Twee plus twee plus één is vijf. Min drie is twee. Dat is onder de drempel, dus geen pulsje. En een half pulsje bestaat niet: het is alles of niets. Een echt neuron is ingewikkelder. Waar een synaps zit en wanneer een signaal komt, maakt ook uit. Maar het idee optellen, drempel, vuren werkt verrassend goed.

## Hoofdstuk 2 — Leren door gewichten te veranderen [Schema: synaps die sterker wordt naast een lijn die dikker wordt; netwerk met negen hokjes als ingang en één uitgang; plaatjes van een kruis en een rondje; foute uitkomst; lijnen die dikker en dunner worden; foutenteller die daalt]
In de film Leren en onthouden zag je: synapsen die vaak samen actief zijn, worden sterker. In een kunstmatig netwerk heet de sterkte van een verbinding een gewicht. Leren is dan: gewichten aanpassen. In het jaar 1958 bouwde Frank Rosenblatt een netwerk dat dat zelf deed: het perceptron. Hier krijgt een eenvoudige versie plaatjes van negen hokjes. Het moet zeggen: is dit een kruis of een rondje? In het begin zijn alle gewichten willekeurig. Het netwerk gokt dus maar wat. Het zegt kruis, maar het was een rondje. Wat verandert er nu? Wat denk je?
[VRAAG] (a) er komt een nieuw neuron bij · (b) de verbindingen die naar kruis wezen, worden een klein beetje zwakker · (c) het netwerk bewaart het foute plaatje, zodat het dat onthoudt

Antwoord b. Elke fout geeft een klein duwtje. Verbindingen die naar het foute antwoord wezen, worden zwakker. Bij de volgende fout de andere kant op. Na tientallen plaatjes maakt het netwerk bijna geen fouten meer. En het herkent ook een kruis dat het nog nooit zag. Niemand heeft een regel ingetypt. De kennis zit in de gewichten.

## Hoofdstuk 3 — Wat AI leende, en waar het verschilt [Schema: netwerk in lagen: randjes, vormen, kat; twee kolommen 'hersenen' en 'netwerk' met voorbeelden, energie, fout terugsturen, pulsjes]
Een netwerk dat katten herkent, heeft veel lagen achter elkaar. De eerste laag reageert op randjes, de volgende op vormen, de laatste op hele katten. Dat lijkt op wat Hubel en Wiesel vonden in de hersenschors: eerst cellen voor randjes. Die bouw in lagen is echt van de hersenen afgekeken.
Maar er zijn grote verschillen. Neem een netwerk dat vanaf nul leert. Wie heeft meer voorbeelden nodig om een nieuw dier te leren herkennen: een kind of zo'n netwerk? Wat denk je?
[VRAAG] (a) het kind: een kind moet alles heel vaak zien · (b) het netwerk: dat heeft er duizenden nodig · (c) ze hebben er ongeveer even veel nodig

Antwoord b. Een kind ziet een paar keer een giraf, en herkent hem daarna ook als tekening. Een bekend netwerk voor plaatjes leerde van ruim een miljoen foto's met een label erbij. Het tweede verschil is energie. Je hersenen werken op ongeveer twintig watt, minder dan een gewone lamp. Een computer die een groot AI-model traint, gebruikt duizenden keren zoveel.
Het derde verschil: wat er met een fout gebeurt. In een kunstmatig netwerk rekent de computer precies uit hoeveel elk gewicht aan de fout bijdroeg, door alle lagen terug. Of je hersenen iets vergelijkbaars doen, weet nog niemand. En echte neuronen sturen pulsjes op precieze momenten. De meeste kunstmatige netwerken geven alleen getallen door.

## Hoofdstuk 4 — Programmeren in de neurowetenschap [Schema: Dr. Kim en Daan bij een scherm; muis in een doolhof; dunne meetnaald met veel meetpunten; rijen pulsjes; codevenster; robotarm met beker en een chipje in de bewegingsschors]
Dokter Kim onderzoekt hoe muizen de weg vinden. In de hersenen van een muis zit een dunne naald met honderden meetpunten. Die meet honderden neuronen tegelijk, duizenden keren per seconde. Na een uur heb je meer getallen dan je ooit met de hand kunt bekijken. Daarom programmeren neurowetenschappers. Daan kijkt mee. Het programma zoekt welke cel wanneer vuurt, en welke cellen samen actief zijn als de muis een bocht neemt.
Je kunt ook de andere kant op: van hersenen naar apparaat. Iemand is vanaf de nek verlamd. In het deel van de hersenschors dat bewegingen stuurt, zit een chipje dat ongeveer honderd cellen meet. Hoe weet de computer welke beweging iemand wil maken? Wat denk je?
[VRAAG] (a) de cellen sturen een duidelijk commando, zoals arm omhoog · (b) een programma leert welk vuurpatroon bij welke bedoelde beweging hoort · (c) de chip stuurt de spieren direct aan, zonder te rekenen

Antwoord b. Eerst denkt iemand aan bewegingen, terwijl de computer meekijkt. Zo leert een programma welk patroon bij welke beweging hoort, met gewichten, net als in hoofdstuk twee. Daarna stuurt het programma een robotarm. In het jaar 2012 dronk een verlamde vrouw zo voor het eerst in bijna vijftien jaar zelf koffie. Zulke systemen zijn nog experimenteel. Maar ze laten zien hoe ver je komt met optellen, drempels en gewichten.

## Recap [Schema: Daans telefoon; neuron en kunstmatig neuron naast elkaar; drie verschillen als kaartjes]
Terug naar Daans telefoon. Leert dat netwerk zoals jouw hersenen? Deels. Het leende het neuron als rekensom, de lagen, en leren door gewichten aan te passen. Maar het heeft veel meer voorbeelden en energie nodig, en het verwerkt fouten op een andere manier.
Neurowetenschappers gebruiken allebei de kanten. Modellen om de hersenen te begrijpen, en programmeren om hun metingen te lezen. Je kunt dit werk doen na een studie biologie, psychologie, natuurkunde of kunstmatige intelligentie, met daarna een master in de neurowetenschappen.

## Eindkaart
Een neuron telt prikkelende en remmende signalen op, en vuurt boven een drempel.
Leren is gewichten aanpassen: in een netwerk na fouten, in je hersenen via synapsen.
AI leende ideeën van de hersenen, maar leert met veel meer voorbeelden en energie.
