# Variant Y

## Cold open [Schema: plattegrond van afdeling 5 van bovenaf, vijf bedden, een gang, een deur naar buiten; een koraal stipje (virus) komt via de deur binnen bij bed 1, springt naar bed 2 en bed 3; los daarvan komt een tweede stipje in een andere tint met een koffer binnen bij een telpoppetje 'verpleegkundige'; label 'de echte route · alleen jij ziet dit']
Kijk van bovenaf mee. Je ziet hoe het virus deze afdeling op komt, en van wie naar wie het gaat. Onderzoekers zien dit nooit. Zij hebben alleen monsters. Hoe weten zij dan waar een uitbraak vandaan komt?

## Titel
Stambomen uit DNA

## Hoofdstuk 1 — Van monster naar sequentie [Schema: de route vervaagt; Sam en Dr. Kim aan een bureau met twee schermen; wattenstaafje in een buisje; Micro: virusdeeltje met een sliertige RNA-streng; RNA wordt DNA; stukjes in veelvoud; stukjes schuiven op het editorscherm in elkaar]
De route verdwijnt. Nu kijk je mee met Sam, die een week meeloopt bij de bio-informatica van een ziekenhuislab. Dr. Kim, onderzoeker, krijgt een vraag: is het virus op afdeling vijf rondgegaan?

Van elke besmette persoon is er een wattenstaafje. Het coronavirus heeft RNA: ongeveer dertigduizend letters. Het lab schrijft dat om naar DNA en kopieert het in stukjes van een paar honderd letters. Een machine leest ze, zoals in DNA lezen.

[Schema: editorvenster met twee regels van ± 30 letters onder elkaar, gelijke letters grijs, één afwijkende letter goud; kaartje 'referentie']
De computer legt de stukjes achter elkaar tot één sequentie: de volgorde van alle letters. Die lijn je uit met een referentiegenoom, zoals in de eerste film van deze reeks. Waar een letter anders is, zie je een variant.

[Schema: kort terug naar de route van bovenaf: bij elke sprong van bed naar bed krijgt het stipje soms een gouden streepje; klokje 'ongeveer 2 per maand · gemiddeld']
Bij elke kopie in een cel kan er een fout in sluipen: een mutatie, zoals in de film over mutaties. Gemiddeld komen er in de virussen die rondgaan ongeveer twee per maand bij. Dat is gemeten. Bed één en bed twee raakten binnen een paar dagen na elkaar besmet. Hoeveel letters verschillen hun virussen? Wat denk je?
[VRAAG] (a) honderden, want een virus muteert heel snel · (b) precies één, want elke besmetting geeft één mutatie · (c) geen letter of maar een paar ✓c

[Schema: twee lange regels, helemaal grijs; de camera scrolt eroverheen; geen gouden letter]
Antwoord c: geen letter of maar een paar. Een mutatie komt niet bij elke besmetting. Twee per maand is een gemiddelde, en een paar dagen is kort. Bij bed één en twee is er zelfs geen enkel verschil.

## Hoofdstuk 2 — Zelf een stamboom bouwen [Schema: plattegrond van afdeling 5 met vijf telpoppetjes en bedden: bed 1, 2, 3, verpleegkundige V, en buiten de deur huisgenoot T met een koffer; ernaast een lege tabel 5×5]
In Hoe weten we dat? gebruikte je verschillen als klok. Hier bouw je er een boom mee. Sam heeft vijf sequenties: de patiënten in bed één, twee en drie, verpleegkundige V, en T, met wie V samenwoont. T kwam net terug van wintersport. Het is een bedacht voorbeeld.

[Schema: de tabel vult zich: 1-2: 0, 1-3: 1, 2-3: 1, V-T: 2; V met de bedden 5 of 6, T met de bedden 7 of 8]
De computer telt per paar hoeveel letters verschillen. Bed één en twee: nul. Bed drie: één letter anders dan elk van hen. V en T: twee. Tussen V en de patiënten: vijf of zes.

[Schema: drie genummerde stappen naast de tabel; het kleinste getal licht goud op; bed 1 en 2 schuiven samen tot één kolom; de eerste vertakking verschijnt]
Nu volg je een algoritme: een vast stappenplan dat een computer uitvoert. Stap één: zoek het paar met de minste verschillen en hang ze aan één vertakking. Stap twee: zie dat paar als één monster, en zoek weer het kleinste getal. Herhaal tot alles aan elkaar hangt. Bed één en twee gaan als eerste samen. Wat komt daarna? Wat denk je?
[VRAAG] (a) V en bed één-twee, want V verzorgt die patiënten · (b) bed drie bij bed één-twee, met één verschil · (c) V en T, want die wonen samen ✓b

[Schema: bed 3 hangt aan bed 1-2; dan V en T samen; dan de twee groepjes aan elkaar; label 'stamboom (fylogenetische boom) · vereenvoudigd']
Antwoord b: bed drie, met één verschil. Wie wie verzorgt, staat niet in de tabel. Daarna gaan V en T samen. Tot slot hangen de twee groepjes aan elkaar.

Dat is je stamboom: een schema van verwantschap, berekend uit verschillen in sequenties. Hoe je hem leest, zag je in Stambomen lezen. Echte programma's rekenen slimmer en met duizenden monsters. Het idee blijft: wie het minst verschilt, hangt het dichtst bij elkaar.

## Hoofdstuk 3 — Hoe zeker is die boom? [Schema: de boom; rechts de regels van de drie bedden, met één gouden letter bij bed 3]
Hoe zeker is deze boom? Kijk naar de bedden. Bed één en twee zijn gelijk, bed drie verschilt één letter. Het hele groepje hangt aan één letter.

[Schema: twee takken die ver uit elkaar liggen krijgen elk los van elkaar dezelfde gouden letter op dezelfde plek; een stippellijn trekt ze ten onrechte naar elkaar toe; daarna kaartje 'leesfout van de machine']
En er zit toeval in. Soms ontstaat dezelfde mutatie twee keer, los van elkaar, in twee lijnen. Dan lijken twee virussen familie, terwijl ze dat niet zijn. Ook een leesfout van de machine kan een nepverschil maken.

[Schema: de uitlijning als kolommen; een hand trekt willekeurig kolommen uit een bak en legt ze terug; een nieuwe uitlijning met sommige kolommen dubbel en andere weg; een nieuw boompje; een stapel boompjes]
Daarom test Dr. Kim de boom. De computer trekt willekeurig kolommen uit de uitlijning, zoals loten uit een bak, en legt ze steeds terug. Sommige kolommen komen twee keer, andere niet. Met die nieuwe uitlijning bouwt hij de boom opnieuw, honderden keren. Dat heet herbemonsteren, of bootstrappen. Dan telt hij hoe vaak elk groepje terugkomt.

[Schema: de boom met getallen bij de vertakkingen: drie bedden samen ongeveer 96 van de 100, V met T ongeveer 88, bed 1 met bed 2 ongeveer 75; label 'eigen berekening, vereenvoudigd']
De drie bedden samen: bijna altijd. V met T: bijna negen van de tien keer. Bed één met bed twee: drie van de vier keer. Waarom is juist dat paar het minst zeker? Wat denk je?
[VRAAG] (a) als de letter van bed drie niet getrokken wordt, zijn alle drie gelijk · (b) de computer rekent bij gelijke virussen minder precies · (c) bed één en twee verschillen in het echt toch een letter ✓a

[Schema: een herbemonsterde uitlijning zonder de gouden kolom; drie bedden met precies dezelfde regel; drie mogelijke boompjes naast elkaar]
Antwoord a. Zonder die ene letter zijn de drie bedden precies gelijk. Dan kan elk paar als eerste samengaan. Gelijke virussen zeggen dus: nauw verwant. Ze zeggen niet in welke volgorde.

## Hoofdstuk 4 — Wie besmette wie, en waar houdt dat op? [Schema: de plattegrond met de boom ernaast; bed 1 testte als eerste positief, kaartje 'dag 1'; bed 2 'dag 3', bed 3 'dag 5'; de verpleegkundige V tussen de bedden]
Het hoofd van de afdeling wil weten: heeft verpleegkundige V de patiënten besmet? Vijf of zes letters verschil, terwijl er maar twee per maand bijkomen. Wat zegt dat? Wat denk je?
[VRAAG] (a) V gaf het waarschijnlijk niet aan deze patiënten, en zij niet aan haar · (b) V was de bron: zij liep van bed naar bed · (c) daar zegt een stamboom niets over ✓a

[Schema: V met de virustint van T, de bedden met hun eigen tint; een grijs, leeg poppetje 'niet getest' bij de deur, met een pijl naar bed 1]
Antwoord a. Zoveel verschil in een paar dagen past niet bij een directe besmetting. V kreeg het waarschijnlijk thuis, van T. Een boom kan zo'n route beter uitsluiten dan bewijzen. En de bedden? Bijna gelijk, maar wie wie besmette, zie je niet. Misschien kregen ze het alle drie van een bezoeker die nooit getest is.

[Schema: de echte route van bovenaf komt terug naast de berekende boom; de takken van de boom en de pijlen van de route worden naast elkaar gelegd; de groepjes kloppen, de pijlen staan niet in de boom; annotatiehaak 'boom = verwantschap, geen richting']
Kijk weer van bovenaf. De groepjes in de boom kloppen. Maar de pijlen van de route staan er niet in. Een boom zegt verwantschap. Hij zegt geen richting, en al helemaal geen schuld. Daarom leggen onderzoekers de boom naast gesprekken: wie lag waar, wie had wanneer klachten?

[Schema: drie echte ziekenhuizen in Brabant, vijftig telpoppetjes en tien bedden in drie kleuren, dezelfde kleur in alle drie de ziekenhuizen en ook daarbuiten; kaartje 'maart 2020 · Sikkema e.a. 2020']
In maart 2020 deden onderzoekers dit echt, in drie ziekenhuizen in Brabant. Ze lazen het virus van vijftig medewerkers en tien patiënten. Bijna alles viel in drie groepen, verspreid over de ziekenhuizen en ook daarbuiten. Collega's van één afdeling hadden lang niet altijd hetzelfde virus. Dus raakten de meesten waarschijnlijk buiten het werk besmet. Besmetting in het ziekenhuis kon niet worden uitgesloten, maar was niet de grote route.

## Recap [Schema: de afdeling met de boom ernaast, de getallen bij de takken; kaartje 'gesprekken'; dan twee opleidingskaartjes en drie werkplekken]
Hoe weten onderzoekers waar een uitbraak vandaan komt, zonder de route te zien? Ze lezen het virus van zoveel mogelijk mensen, tellen de verschillen en bouwen er stap voor stap een stamboom van. Herbemonsteren laat zien welke takken stevig staan. Een boom kan een route vaak uitsluiten, maar toont geen richting en geen schuld. Daarom komen er gesprekken bij.

Dit werk leer je bij de hbo-opleiding Bio-informatica, bijvoorbeeld aan de HAN in Nijmegen: vier jaar. Of je doet eerst een bachelor als biologie aan de Radboud Universiteit, en daarna een master bio-informatica, bijvoorbeeld in Wageningen. Je werkt dan in een ziekenhuislab, een onderzoeksinstituut of een bedrijf. Tijdens corona volgde het RIVM met zulke sequenties elke week welke varianten er rondgingen.

## Eindkaart
Virussen van twee besmette mensen verschillen vaak maar een paar letters, of geen.
Stamboom bouwen: voeg steeds het paar met de minste verschillen samen, en herhaal.
Herbemonsteren laat zien welke takken stevig staan; gelijke virussen geven geen volgorde.
Een stamboom toont verwantschap, geen richting en geen schuld.

---

## Beelden per hoofdstuk (B)
Antwoordletters: c · b · a · a.
- **Cold open (Schema):** plattegrond van één afdeling van bovenaf (bedden als rechthoekjes met nummer, gang, deur); het virus als klein koraal stipje dat springt; tweede lijn in een andere tint (oker) via de voordeur met een koffer-icoon. Label 'de echte route · alleen jij ziet dit'. Geen zieke mensen: lege bedden met een nummer, telpoppetjes voor V en T.
- **H1:** zoals A; de route komt even terug om te laten zien dat mutaties niet bij elke sprong komen.
- **H2:** plattegrond + tabel + drie genummerde stappen + boom die groeit; tabel krimpt na elke stap.
- **H3:** wiebelende boom; homoplasie en leesfout; herbemonsteren als loten uit een bak; getallen 96 · 88 · 75; daarna één herbemonsterde uitlijning zonder de gouden kolom, met drie gelijkwaardige boompjes.
- **H4:** kaartjes dag 1/3/5 bij de bedden; V krijgt de tint van T; grijs poppetje 'niet getest' bij de deur. De echte route uit de cold open naast de boom. Daarna de echte studie in drie kleuren.
- **Recap:** opleidingskaartjes en werkplekken (vaste reekskaartjes).
