# Stambomen uit DNA: een uitbraak volgen — script voor de opname (= script_v2.md tot de beeldnotities) (25 okt 2026)

Gemaakt uit script_v2.md: losse beeldregels [Schema: …] tussen de alinea's en de vinkjes achter de vraagopties weggelaten; beeldnotities achter de koppen blijven (make_segments leest ze als look). Tekst verder letterlijk. Elke vraag ('Wat denk je? …') is een eigen alinea.

---

## Cold open [Schema: drie ziekenhuisiconen naast elkaar zonder namen, label 'drie ziekenhuizen in Brabant', kaartje 'maart 2020'; eronder één raster van telpoppetjes in zorgblauw, niet per ziekenhuis verdeeld; één voor één kleuren er poppetjes koraal; teller loopt op tot 96]
Maart 2020. Corona is net in Nederland. In drie ziekenhuizen in Brabant testen zesennegentig medewerkers met klachten positief. Kregen ze het virus op hun werk, van patiënten? Of kwam het van buiten? Hoe kom je daarachter?

## Titel
Stambomen uit DNA

## Hoofdstuk 1 — Van monster naar sequentie [Schema: Sam en Dr. Kim aan een bureau met twee schermen; wattenstaafje in een buisje; Micro: een virusdeeltje met een sliertige RNA-streng; RNA wordt DNA; stukjes die in veelvoud worden gekopieerd]
Sam loopt een week mee bij de bio-informatica van een ziekenhuislab. Dr. Kim, onderzoeker, ziet nooit wie wie besmette. Ze heeft alleen monsters, met het erfelijk materiaal van het virus.

Het coronavirus in een wattenstaafje heeft RNA: ongeveer dertigduizend letters. Het lab schrijft dat om naar DNA. Dan kopieert het dat in stukjes van een paar honderd letters. Een machine leest ze.

De computer legt de stukjes langs een referentiegenoom, zoals in de eerste film van deze reeks. Zo krijg je één sequentie: de volgorde van alle letters.

Bij elke kopie in een cel kan er een fout in sluipen. Dat is een mutatie, zoals in de film over mutaties. In de virussen die rondgaan, komen er gemiddeld ongeveer twee per maand bij. Dat is gemeten.

Een medewerker besmet een collega. Een week later laten ze allebei hun virus lezen. Hoeveel letters verschillen hun virussen? Wat denk je?
[VRAAG] (a) honderden letters, want een virus muteert heel snel · (b) geen letter, of maar een paar · (c) precies twee, want het zijn er twee per maand

Ook na een week verschillen twee mensen die elkaar besmetten meestal geen letter, of maar een paar. Twee per maand is een gemiddelde, en een week is kort.

## Hoofdstuk 2 — Zelf een stamboom bouwen [Schema: kaartje 'bedacht voorbeeld' linksboven, zichtbaar zolang A–E in beeld zijn (ook in H3 en H4); plattegrond zonder stadsnamen met echte mensjes (cast en figuranten): ziekenhuis 1 met verpleegkundigen A (Jesse) en C op één afdeling en patiënt E zittend in gewone kleding, ziekenhuis 2 met zorgmedewerker B, D (Joost) buiten de ziekenhuizen; monsters als hoofdletter in een gekleurd rondje boven het hoofd; ernaast een tabel met verschillen die zich vult]
In de evolutiereeks telde je verschillen om verwantschap en tijd te schatten. Hier bouw je er zelf een boom mee. Sam krijgt vijf sequenties, A tot en met E: een bedacht voorbeeld. A en C zijn verpleegkundigen op één afdeling, en E is daar patiënt. B werkt in een ander ziekenhuis.

De computer telt per paar de verschillen in een tabel. A en B: nul. C en E: twee. Met D steeds zes of zeven.

Nu volg je een algoritme: een vast stappenplan dat een computer uitvoert. Stap één: hang het paar met de minste verschillen aan één vertakking, hier A en B. Stap twee: doe alsof A-B één monster is, en zoek weer het kleinste getal. Herhaal tot alles aan elkaar hangt.

A en B hangen samen. Welk paar komt daarna? Wat denk je?
[VRAAG] (a) C en E, met twee verschillen · (b) A-B en C, want A en C werken op één afdeling · (c) D en E, die staan in de tabel naast elkaar

Na A en B is het kleinste getal twee: C en E. Waar iemand werkt, telt niet mee; collega's A en C verschillen zelfs vijf letters. Er blijven drie over: A-B, C-E en D. A-B en C-E verschillen vijf, met D meer. Dus gaan A-B en C-E samen, en D hangt er als laatste aan.

Dat is je stamboom: een schema van verwantschap, berekend uit verschillen in sequenties. Hoe je hem leest, zag je in Stambomen lezen. Echte programma's rekenen slimmer, maar weinig verschil blijft nauw verwant.

## Hoofdstuk 3 — Hoe zeker is die boom? [Schema: Sam kijkt naar de boom van H2; rechts de regels van C en E met twee gouden letters; een letter die even flikkert en de boom die meewiebelt]
Sam vraagt: hoe zeker is die boom eigenlijk? Bij zo weinig verschillen kan één letter hem al omgooien.

Soms ontstaat dezelfde mutatie twee keer, los van elkaar. Dan lijken twee virussen familie, terwijl ze dat niet zijn. Ook een leesfout van de machine kan een nepverschil maken.

Daarom test Dr. Kim de boom. De computer trekt kolommen uit de uitlijning, zoals loten uit een bak, en legt elk lot terug. Hij trekt er evenveel als de echte uitlijning heeft. Sommige kolommen komen dan twee keer, andere niet. Daarmee bouwt hij een nieuwe boom. Dat doet hij honderden keren, steeds met een nieuwe trekking: herbemonsteren, of bootstrappen.

Dan telt Dr. Kim hoe vaak elk groepje terugkomt. A met B: bijna altijd. C met E: ruim acht van de tien keer. A-B met C-E: zes van de tien.

Wat betekent die zes van de tien? Wat denk je?
[VRAAG] (a) dat zes van de tien kolommen dat groepje steunen · (b) dat de boom voor zestig procent juist is · (c) dat die tak wankel staat: hij hangt soms anders

Een tak die maar zes van de tien keer terugkomt, staat wankel. Ook een hoog getal zegt alleen dat de data steeds hetzelfde groepje geven. Het bewijst niet dat de boom juist is.

## Hoofdstuk 4 — Wie besmette wie, en waar houdt dat op? [Schema: kaartje 'bedacht voorbeeld'; plattegrond zonder stadsnamen; A in ziekenhuis 1 en B in ziekenhuis 2 krijgen dezelfde kleur; bij A 'positief: dag 1', bij B 'positief: dag 3'; een vraagteken tussen hen]
A en B hebben precies hetzelfde virus. En A testte twee dagen eerder positief dan B.

Wat zegt dat? Wat denk je?
[VRAAG] (a) hun virussen zijn familie; wie het aan wie gaf, zie je niet · (b) A besmette B, want A testte eerder positief · (c) ze hebben elkaar vast ontmoet, want hun virus is gelijk

Gelijke virussen zeggen: nauw verwant. Niet wie het aan wie gaf. En wie eerder positief test, is niet per se eerder besmet: de een krijgt na een paar dagen klachten, de ander pas na een week of meer. Misschien kregen ze het uit dezelfde bron, via ongeteste mensen. Een boom toont alleen wie je wél hebt gemeten.

Ook bij C en E, twee letters verschil, kan het drie kanten op. Besmette de verpleegkundige de patiënt, of de patiënt haar? Of kregen ze het allebei van iemand anders? De boom past bij alle drie. Bij zulke kleine verschillen zie je de richting niet. En schuld al helemaal niet.

Daarom leggen onderzoekers de boom naast gesprekken. Wie werkte waar? Wie had wanneer klachten? Wie was waar geweest?

Zo ging het in maart 2020 echt. Onderzoekers lazen het virus van vijftig medewerkers en tien patiënten. Bijna alles viel in drie groepen. Elke groep kwam in meer dan één ziekenhuis voor. En dezelfde virussen zaten ook bij mensen daarbuiten. En collega's van één afdeling hadden lang niet altijd hetzelfde virus.

Waar raakten de meesten dan besmet? Wat denk je?
[VRAAG] (a) op hun eigen afdeling, van collega's of patiënten · (b) vooral buiten het werk, niet allemaal op één plek · (c) dat zegt niets, want de virussen zijn te gelijk

De meesten raakten dus waarschijnlijk buiten het werk besmet. Besmetting in het ziekenhuis kon niet worden uitgesloten, maar leek niet de grote route.

## Recap [Schema: de echte casus met de drie groepen; ernaast de bedachte boom met de getallen bij de takken en het kaartje 'bedacht voorbeeld'; lijst met gesprekken; dan twee opleidingskaartjes, drie werkplekken en een kaartje 'RIVM · elke week']
Waar kwam het virus van die medewerkers vandaan? Waarschijnlijk vooral van buiten het ziekenhuis. Dat zie je als je het virus van veel mensen leest. Je telt de verschillen en bouwt er een stamboom van. Herbemonsteren laat zien welke takken stevig staan. Wie het aan wie gaf, zie je bij bijna gelijke virussen niet; daarvoor zijn gesprekken nodig.

Dit werk leer je bijvoorbeeld bij de hbo-opleiding Bio-informatica in Nijmegen: vier jaar. Of je doet eerst een bachelor als biologie of moleculaire levenswetenschappen in Nijmegen, en daarna de master Bioinformatics in Wageningen. Je werkt dan in een ziekenhuis, een onderzoeksinstituut of een bedrijf. Tijdens corona volgde het RIVM met zulke sequenties elke week welke varianten er rondgingen.

## Eindkaart
Mensen die elkaar besmetten, hebben vaak precies hetzelfde virus, of bijna.
Stamboom bouwen: voeg steeds het paar met de minste verschillen samen, en herhaal.
Herbemonsteren laat zien welke takken stevig staan en welke wankel.
Een stamboom toont verwantschap.
Bij bijna gelijke virussen niet wie het aan wie gaf, en nooit schuld.
