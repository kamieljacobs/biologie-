# Variant Z

## Cold open [Schema: plattegrond van drie ziekenhuizen in Brabant naast elkaar, kaartje 'maart 2020'; tussen de gangen staan telpoppetjes in zorgblauw; één voor één kleuren er poppetjes koraal; teller loopt op tot 96]
Maart 2020. Corona is net in Nederland. In drie ziekenhuizen in Brabant testen zesennegentig medewerkers met klachten positief. Kregen ze het virus op hun werk, van patiënten? Of kwam het van buiten? Hoe kom je daarachter?

## Titel
Stambomen uit DNA

## Hoofdstuk 1 — Van monster naar sequentie [Schema: Sam en Dr. Kim aan een bureau met twee schermen; wattenstaafje in een buisje; Micro: een virusdeeltje met een sliertige RNA-streng; RNA wordt DNA; stukjes die in veelvoud worden gekopieerd; de stukjes schuiven op het donkere editorscherm in elkaar tot één lange regel letters]
Sam loopt een week mee bij de bio-informatica van een ziekenhuislab. Dr. Kim, onderzoeker, zoekt zo'n vraag uit met het erfelijk materiaal van het virus.

Het begint met een wattenstaafje. Het coronavirus heeft RNA: ongeveer dertigduizend letters. Het lab schrijft dat om naar DNA en kopieert het in stukjes van een paar honderd letters. Een machine leest ze, zoals in DNA lezen.

[Schema: editorvenster met twee regels van ± 30 letters onder elkaar, gelijke letters grijs, één afwijkende letter goud; kaartje 'referentie']
De computer legt de stukjes achter elkaar tot één sequentie: de volgorde van alle letters. Die lijn je uit met een referentiegenoom, zoals in de eerste film van deze reeks. Waar een letter anders is, zie je een variant.

[Schema: een stamlijn van virussen als bolletjes van persoon naar persoon; af en toe krijgt een bolletje een gouden streepje; klokje 'ongeveer 2 per maand · gemiddeld']
Bij elke kopie in een cel kan er een fout in sluipen: een mutatie, zoals in de film over mutaties. In de virussen die rondgaan, komen er gemiddeld ongeveer twee per maand bij. Dat is gemeten. Twee medewerkers raakten een week na elkaar besmet. Hoeveel letters verschillen hun virussen? Wat denk je?
[VRAAG] (a) honderden letters, want een virus muteert heel snel · (b) geen letter of maar een paar · (c) precies twee, want het zijn er twee per maand ✓b

[Schema: twee lange regels van het virus van twee mensen, helemaal grijs; de camera scrolt eroverheen; één gouden letter, of geen]
Antwoord b: geen letter of maar een paar. Twee per maand is een gemiddelde, en een week is kort. Virussen van verschillende mensen zijn dus vaak precies gelijk.

## Hoofdstuk 2 — Zelf een stamboom bouwen [Schema: plattegrond met vijf telpoppetjes A tot en met E op hun plek: A en C op afdeling 3 in Breda, E als bed op afdeling 3, B in Tilburg, D bij een koffer; ernaast een tabel met verschillen die zich vult; daaronder groeit de boom]
In Hoe weten we dat? gebruikte je verschillen als klok. Hier bouw je er een boom mee. Sam krijgt vijf sequenties, A tot en met E: een bedacht voorbeeld. A en C zijn verpleegkundigen op afdeling drie in Breda. E is een patiënt daar. B werkt in Tilburg. D kwam net terug van wintersport.

De computer telt per paar hoeveel letters verschillen, en zet dat in een tabel. A en B: nul. C en E: twee. Met D steeds zes of zeven.

[Schema: tabel 5×5; het kleinste getal licht goud op; A en B schuiven naar elkaar en worden één kolom 'A-B'; onder de tabel verschijnt de eerste vertakking]
Nu volg je een algoritme: een vast stappenplan dat een computer uitvoert. Stap één: zoek het paar met de minste verschillen, hier A en B. Hang ze aan één vertakking. Stap twee: doe alsof A-B nu één monster is, en zoek weer het kleinste getal. Herhaal tot alles aan elkaar hangt. Welk paar komt na A-B? Wat denk je?
[VRAAG] (a) C en E, met twee verschillen · (b) A-B en C, want A en C werken op één afdeling · (c) D en E, die staan in de tabel naast elkaar ✓a

[Schema: C en E schuiven samen tot 'C-E'; tabel krimpt tot drie rijen: A-B, C-E, D met de getallen 5, 6 en 7; dan A-B en C-E samen, D als laatste tak; label 'stamboom (fylogenetische boom) · vereenvoudigd']
Antwoord a: C en E, met twee verschillen. Waar iemand werkt, staat niet in de tabel. A en C zijn collega's, maar hun virussen verschillen vijf letters. Over zijn A-B, C-E en D. A-B en C-E verschillen vijf letters, met D zijn het er meer. Dus gaan A-B en C-E samen, en D hangt er als laatste aan.

Dat is je stamboom: een schema van verwantschap, berekend uit verschillen in sequenties. Hoe je hem leest, zag je in Stambomen lezen. Echte programma's rekenen slimmer en met duizenden monsters. Het idee blijft: wie het minst verschilt, hangt het dichtst bij elkaar.

## Hoofdstuk 3 — Hoe zeker is die boom? [Schema: de boom van H2 links; rechts de regels van C en E met twee gouden letters; een letter die even flikkert en de boom die meewiebelt]
Sam kijkt nog eens. C en E verschillen maar twee letters, A-B en C-E maar vijf. Bij zo weinig verschillen kan één letter de boom omgooien.

[Schema: twee takken die ver uit elkaar liggen krijgen elk los van elkaar dezelfde gouden letter op dezelfde plek; een stippellijn trekt ze ten onrechte naar elkaar toe; daarna een kaartje 'leesfout van de machine']
En er zit toeval in. Soms ontstaat dezelfde mutatie twee keer, los van elkaar, in twee lijnen. Dan lijken twee virussen familie, terwijl ze dat niet zijn. Ook een leesfout van de machine kan een nepverschil maken.

[Schema: de uitlijning als kolommen; een hand trekt willekeurig kolommen uit een bak en legt ze terug; een nieuwe uitlijning met sommige kolommen dubbel en andere weg; ernaast een nieuw boompje; een stapel van tien boompjes]
Daarom test Dr. Kim de boom. De computer trekt willekeurig kolommen uit de uitlijning, zoals loten uit een bak, en legt ze steeds terug. Sommige kolommen komen twee keer, andere niet. Met die nieuwe uitlijning bouwt hij de boom opnieuw, honderden keren. Dat heet herbemonsteren, of bootstrappen.

[Schema: de boom met getallen bij de vertakkingen: A-B 99 van de 100, C-E ongeveer 85, A-B met C-E ongeveer 58; label 'eigen berekening, vereenvoudigd']
Dan telt hij hoe vaak elk groepje terugkomt. A met B: bijna altijd. C met E: ruim acht van de tien keer. A-B met C-E: ongeveer zes van de tien. Welk deel van de boom vertrouw je het minst? Wat denk je?
[VRAAG] (a) alles even goed: de computer rekent altijd precies · (b) A met B, want gelijke virussen zeggen niets · (c) A-B samen met C-E, want dat komt het minst vaak terug ✓c

[Schema: de vertakking A-B/C-E wordt gestippeld en wiebelt; A-B blijft stevig]
Antwoord c: A-B samen met C-E. Zes van de tien is wankel. Een hoog getal zegt alleen dat de data steeds hetzelfde groepje geven. Het bewijst niet dat de boom klopt.

## Hoofdstuk 4 — Wie besmette wie, en waar houdt dat op? [Schema: terug naar de plattegrond; A in Breda en B in Tilburg krijgen dezelfde kleur; een vraagteken tussen hen; daarna grijze, lege poppetjes 'niet getest' die tussen hen verschijnen]
Terug naar de plattegrond. A en B hebben precies hetzelfde virus, en A testte twee dagen eerder positief. Wat kun je daaruit zeggen? Wat denk je?
[VRAAG] (a) A besmette B, want A testte eerder positief · (b) ze werken vast op dezelfde afdeling · (c) ze zijn nauw verwant, maar niet wie wie besmette ✓c

Antwoord c: nauw verwant, maar niet wie wie besmette. A werkt in Breda, B in Tilburg. Misschien kregen ze het uit dezelfde bron, via mensen die nooit getest zijn. Een boom toont alleen wie je wél hebt gemeten.

[Schema: C (telpoppetje) en het bed E met drie pijlen eromheen: C → E, E → C en een grijs poppetje X → beide; annotatiehaak 'boom = verwantschap, geen richting']
En C en E, twee letters verschil? Besmette de verpleegkundige de patiënt, of de patiënt haar? Of kregen ze het allebei van iemand anders? De boom past bij alle drie. Een boom zegt verwantschap. Geen richting, en al helemaal geen schuld.

[Schema: Dr. Kim met een lijst naast de boom: 'werkplek · eerste klachten · waar geweest'; vinkjes]
Daarom leggen onderzoekers de boom naast gesprekken: wie werkte waar, wie had wanneer klachten, wie was waar geweest? Pas samen zeggen ze iets over de route.

[Schema: de drie echte ziekenhuizen; vijftig telpoppetjes en tien bedden in drie kleuren; dezelfde kleur in alle drie de ziekenhuizen en ook buiten; collega's op één afdeling in verschillende kleuren; klein kaartje 'carnaval?']
Zo ging het in maart 2020 echt. Onderzoekers lazen het virus van vijftig medewerkers en tien patiënten. Bijna alles viel in drie groepen. Die zaten verspreid over de ziekenhuizen, en ook bij mensen daarbuiten. Collega's van één afdeling hadden lang niet altijd hetzelfde virus. Dus raakten de meesten waarschijnlijk buiten het werk besmet. Besmetting in het ziekenhuis kon niet worden uitgesloten, maar was niet de grote route.

## Recap [Schema: de plattegrond met de drie kleurgroepen; de boom ernaast met de getallen bij de takken; lijst met gesprekken; daarna een kaartje 'RIVM · elke week'; dan twee opleidingskaartjes en drie werkplekken]
Waar kwam het virus van die medewerkers vandaan? Waarschijnlijk vooral van buiten het ziekenhuis. Dat zie je als je het virus van veel mensen leest. Je telt de verschillen en bouwt er stap voor stap een stamboom van. Herbemonsteren laat zien welke takken stevig staan. En de boom toont verwantschap, geen richting en geen schuld. Daarom komen er gesprekken bij.

Dit werk leer je bij de hbo-opleiding Bio-informatica, bijvoorbeeld aan de HAN in Nijmegen: vier jaar. Of je doet eerst een bachelor als biologie aan de Radboud Universiteit, en daarna een master bio-informatica, bijvoorbeeld in Wageningen. Je werkt dan in een ziekenhuislab, een onderzoeksinstituut of een bedrijf. Tijdens corona volgde het RIVM met zulke sequenties elke week welke varianten er rondgingen.

## Eindkaart
Virussen van twee besmette mensen verschillen vaak maar een paar letters, of geen.
Stamboom bouwen: voeg steeds het paar met de minste verschillen samen, en herhaal.
Herbemonsteren laat zien welke takken stevig staan en welke wankel.
Een stamboom toont verwantschap, geen richting en geen schuld.

---

## Beelden per hoofdstuk (A)
Antwoordletters: b · a · c · c.
- **Cold open (Schema):** drie plattegronden (rechthoekige gangen, kamers als vlakjes, label met stad); telpoppetjes in zorgblauw die koraal worden; teller in Meta tot 96. Geen gezichten, geen bedden met zieken.
- **H1 (Schema → Micro → Schema):** Sam en Dr. Kim aan een bureau (castboek, `gewoon`), namen bij hen. Zoomcirkel van het buisje naar een virusdeeltje (bol met uitsteeksels, binnenin een dunne sliertige RNA-streng; label 'RNA · ongeveer 30 000 letters'). RNA → DNA (enkele streng wordt dubbele streng, label 'omschrijven'). Stukjes die verdubbelen; editorvenster (reeksobject uit film 1) waar stukjes in elkaar schuiven. Uitlijning met referentie: één gouden letter. Klokje met 'gemiddeld' erbij.
- **H2 (Schema):** plattegrond met vijf telpoppetjes A–E (E als bed); tabel die zich vult; algoritme als drie genummerde stappen; boom die van onder af groeit. Takken zonder schaal, label 'vereenvoudigd'. Tabel krimpt zichtbaar na elke stap.
- **H3 (Schema):** wiebelende boom; homoplasie als twee takken met dezelfde gouden letter op dezelfde kolom; leesfout als een letter met een vraagteken. Herbemonsteren: kolommen uit een bak, teruggelegd; tien boompjes in een stapel, de getallen 99 · 85 · 58 bij de takken.
- **H4 (Schema):** A en B in dezelfde kleur op twee plattegronden; grijze lege poppetjes 'niet getest' ertussen. C en E met drie mogelijke pijlen. Kim met de gesprekkenlijst. Echte studie: drie kleurgroepen verspreid over drie ziekenhuizen en daarbuiten; kaartje 'Sikkema e.a. 2020'.
- **Recap:** alles op één beeld; kaartje RIVM; opleidingskaartjes (hbo Bio-informatica · HAN Nijmegen · 4 jaar; wo-master Bioinformatics and Systems Biology · Wageningen · 2 jaar); werkplekken ziekenhuislab, onderzoeksinstituut, bedrijf.
