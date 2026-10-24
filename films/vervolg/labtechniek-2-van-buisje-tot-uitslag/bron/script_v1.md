# Van buisje tot uitslag — script v1 (24 okt 2026)

Wat word jij? · Laboratoriumtechniek, film 2 van 4, havo/vwo bovenbouw, mbo/hbo-oriëntatie. Voice Roos (eleven_v4). Look: Schema, met cast (Opa Henk als patiënt, Dr. Kim in labjas als aanvrager, Yasmin als stagiair-analist in practicumkleding). Rode draad: Yasmin volgt het buisje van Opa Henk door het lab. Eén rekenvoorbeeld (standaarden 10⁶ → 10² kopieën, Opa Ct 25), nagerekend in `reken/bereken.py`. Bouwt voort op Op maat gekopieerd (PCR, verdubbelen, negatieve controle, nieuwe pipetpunt), Op lengte gesorteerd (positieve controle) en Onderzoek doen.

Leerdoelen (de leerling kan …)
1. uitleggen waarom een lab elk monster controleert bij binnenkomst, en dat veel labfouten al vóór het meten ontstaan
2. een verdunningsreeks van 1 op 10 uitrekenen en uitleggen hoe een pipetteerfout in de eerste stap doorwerkt
3. uitleggen wat real-time PCR toevoegt (licht meten na elke cyclus) en een Ct-waarde interpreteren (lage Ct = veel; ± 3,3 cycli = factor 10)
4. met een ijklijn een Ct-waarde omrekenen naar een hoeveelheid
5. de functie van positieve, negatieve en interne controle beschrijven en een eenvoudige controlekaart lezen

Misconcepties: (1) labfouten ontstaan vooral in het apparaat → cold open, H1; (2) een fout verdwijnt door het verdunnen of groeit vanzelf → H2; (3) hogere Ct = meer virus → H3; (4) een afwijkende controle mag je negeren of overmeten → H4.

---

## Cold open [Schema: spreekkamer; Dr. Kim in labjas strijkt met een wattenstaafje door keel en neus van Opa Henk; buisje met barcode; een keten van stappen van spreekkamer naar uitslag]
Opa Henk is al een paar dagen ziek. Dr. Kim strijkt met een wattenstaafje door zijn keel en neus, en stuurt het buisje naar het lab. Dezelfde dag staat de uitslag in zijn dossier. Daartussen zitten tientallen handelingen, en bij elke handeling kan iets misgaan. Waar gaat het in een lab het vaakst mis? Wat denk je?
[VRAAG] (a) in het meetapparaat, tijdens de test zelf · (b) bij het doorgeven van de uitslag aan de arts · (c) vóór het meten, bij afnemen en labelen

## Titel
Van buisje tot uitslag

## Hoofdstuk 1 — Het monster komt binnen [Schema: ontvangst van het lab; Yasmin in practicumkleding scant de barcode; checklist: naam en geboortedatum, juiste buisje, tijd en temperatuur; buisje zonder etiket afgekeurd; spoor van het buisje in de computer]
Antwoord c. In onderzoeken naar labfouten ontstaat ongeveer de helft tot twee derde al vóór het meten. Een verwisseld buisje, een verkeerd etiket, een monster dat te lang warm heeft gelegen. Daarom begint het werk bij de ontvangst. Yasmin loopt stage als analist in het ziekenhuislab. Ze scant de barcode op het buisje van Opa Henk. Klopt de naam met de aanvraag van Dr. Kim? Is het het juiste buisje, en kwam het op tijd en koel genoeg aan? Een buisje zonder naam keurt het lab af: je weet niet zeker van wie het is. Vanaf nu wordt elke stap vastgelegd. Zo kun je altijd terugzien wie wat deed, en wanneer.

## Hoofdstuk 2 — Nauwkeurig pipetteren [Schema: pipet op 10 microliter; druppel op ware grootte; verdunningsreeks van vijf buisjes, 1 op 10; tellers 10, 100, 1000, 10 000 keer verdund; fout in stap 1 werkt door]
In het lab werk je met heel kleine volumes. Tien microliter is een druppeltje van nog geen drie millimeter. Yasmin maakt de standaarden voor de test: buisjes met een bekende hoeveelheid virus-RNA. Daarvoor maakt ze een verdunningsreeks. Ze pipetteert tien microliter van de sterkste standaard in negentig microliter water. Dat is een verdunning van één op tien. Uit dat buisje haalt ze weer tien microliter voor het volgende. Na vier stappen is de sterkste standaard tienduizend keer verdund. Stel dat ze alleen in de eerste stap twee procent te weinig pipetteert. Wat betekent dat voor de laatste buisjes? Wat denk je?
[VRAAG] (a) die zijn allemaal ook twee procent te laag · (b) die fout verdwijnt door het verdunnen · (c) de fout wordt bij elke stap groter

Antwoord a. Elk buisje krijgt zijn RNA uit het vorige buisje. Een fout in de eerste stap gaat dus mee tot het eind, maar groeit niet. Pas als ze bij elke stap te weinig pipetteert, stapelen de fouten zich op. Twee procent van tien microliter is maar twee tiende microliter. Meer mag een goede pipet van dit formaat volgens de norm niet afwijken. Daarom wordt elke pipet regelmatig gecontroleerd, door gepipetteerd water te wegen. En Yasmin werkt rustig, met een nieuwe punt voor elk buisje.

## Hoofdstuk 3 — Real-time PCR en de ijklijn [Schema: pipetteerrobot boven een plaat met 96 putjes; probe die oplicht als het polymerase hem openknipt; grafiek licht tegen cycli met S-curves en een drempel; Opa Henk Ct 25, ander monster Ct 30; ijklijn met vijf standaarden op een rechte lijn]
Dan neemt de robot het over. Hij haalt het RNA uit tientallen monsters tegelijk, en pipetteert alles in een plaat met zesennegentig putjes. Grote systemen leveren zo ruim honderd uitslagen per uur. Hoe PCR werkt, zag je in Op maat gekopieerd. Het RNA van het virus wordt eerst omgezet in DNA. Nieuw is wat real-time toevoegt. In elk putje zit ook een probe: een kort stukje DNA met een kleurstof. Die licht pas op als het polymerase de probe tijdens het kopiëren openknipt. Na elke cyclus meet het apparaat hoeveel licht er is. Het aantal cycli tot het licht boven een drempel komt, heet de Ct-waarde. Bij Opa Henk is dat vijfentwintig. Een ander monster komt pas bij dertig boven de drempel. Welk monster bevatte meer virus? Wat denk je?
[VRAAG] (a) het andere monster: meer cycli, dus meer signaal · (b) dat van Opa Henk: het kwam eerder boven de drempel · (c) evenveel: allebei zijn ze gewoon positief

Antwoord b. Hoe meer virus er in het begin was, hoe eerder de drempel. Elke cyclus verdubbelt het DNA ongeveer. Drie en een derde cyclus eerder betekent dus ongeveer tien keer zoveel. Vijf cycli verschil is ruim dertig keer zoveel. Voor een coronatest is positief of negatief meestal genoeg. Wil je weten hoeveel het precies is, dan gebruik je een ijklijn. Yasmins standaarden gaan mee in dezelfde run. Elke keer tien keer verdunnen schuift hun Ct ongeveer drie en een derde op. Zo liggen ze op een rechte lijn. Een Ct van vijfentwintig hoort daarop bij ongeveer vierduizend kopieën per putje. Let op: een Ct-waarde kun je alleen vergelijken binnen dezelfde test. In een ander lab kan hetzelfde monster een paar cycli anders uitkomen.

## Hoofdstuk 4 — Klopt de run? [Schema: plaat met negatieve controle (geen licht), positieve controle (licht) en interne controle in elk putje; controlekaart met de Ct van de positieve controle per dag, band van twee standaardafwijkingen; twee punten achter elkaar erboven; run afgekeurd; flesje reagens buiten de vriezer]
Voordat een uitslag het lab verlaat, kijkt Yasmin naar de controles. De negatieve controle bevat water: daar hoort geen licht in. De positieve controle bevat een bekende hoeveelheid virus: die moet wel oplichten. En in elk putje zit een interne controle. Bij veel testen is dat een gen van de mens zelf. Licht die niet op, dan zat er te weinig materiaal op het wattenstaafje, of iets remde de PCR. De Ct van de positieve controle zet Yasmin elke dag op een controlekaart. Meestal valt die binnen twee standaardafwijkingen van het gemiddelde. Vandaag ligt hij voor de tweede keer achter elkaar daarboven, aan dezelfde kant. Wat doet Yasmin? Wat denk je?
[VRAAG] (a) de run afkeuren en de oorzaak zoeken · (b) de uitslagen versturen: de controle is positief · (c) de controle opnieuw meten tot hij binnen valt

Antwoord a. Eén punt buiten de band kan toeval zijn: dat is een waarschuwing. Twee keer achter elkaar aan dezelfde kant wijst op een fout die blijft. De run wordt afgekeurd, en de monsters gaan opnieuw. Yasmin zoekt de oorzaak, volgens het protocol. Het blijkt een flesje reagens dat te lang buiten de vriezer stond. Ook dat wordt vastgelegd. Zo blijven fouten zeldzaam, en kun je de uitslagen vertrouwen.

## Recap [Schema: Dr. Kim belt, Opa Henk thuis aan de telefoon; keten: ontvangst, pipetteren, PCR, controles; Yasmin; twee opleidingen en werkplekken]
Aan het eind van de dag belt Dr. Kim Opa Henk: hij heeft corona. Achter die ene uitslag zit een hele keten. Het juiste buisje, nauwkeurig pipetteren, een Ct-waarde met een ijklijn, en controles in elke run.

Dat is het werk van een analist. Analist word je met een mbo-opleiding van meestal vier jaar, bijvoorbeeld biologisch-medisch analist. Op het hbo is er Biologie en Medisch Laboratoriumonderzoek, ook vier jaar. Analisten werken in ziekenhuizen, bij bedrijven en onderzoeksinstituten, bij het RIVM en de GGD, en in labs voor voedsel en milieu.

## Eindkaart
Veel labfouten ontstaan al vóór het meten: controleer elk monster bij binnenkomst.
Een fout in de eerste verdunning werkt door tot het laatste buisje.
Lage Ct-waarde = veel virus; ruim drie cycli eerder = tien keer zoveel.
Controles gaan mee in elke run; de controlekaart zegt wanneer je afkeurt.
