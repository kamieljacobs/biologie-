# Stambomen uit DNA: een uitbraak volgen — script v2 (25 okt 2026, definitief voor de opname, behalve de opleidingenzin)

Wat word jij? · Bio-informatica (film 3), havo/vwo bovenbouw, één niveau, hbo/wo-oriëntatie. Voice Roos (eleven_v4). Look: Schema met cast (Sam, meeloopweek, outfit `gewoon`; Dr. Kim, onderzoeker die met DNA-data werkt, outfit `gewoon` achter het scherm), het reeksobject 'scherm met sequenties' uit de eerste film van deze reeks, plattegronden met echte mensjes (Jesse, Joost en figuranten; patiënt zittend in gewone kleding). Geen zieke mensen in beeld. Bouwt voort op Mutaties (DNA 5), Hoe weten we dat? (Evolutie 7) en Stambomen lezen (Evolutie 8); uitlijnen uit de eerste film van deze reeks. Getallen: `getallen.md`, logboek: `bronnen.md`.
v2 = v1 na `reviews/review_v1.md` (alle MOET-punten; KAN zie brief.md) en de aanvullingen van de coördinator. Vorm voor Vragen uit (B9): elke vraag is een eigen segment ('Wat denk je? …' + `[VRAAG]`); de speler kan het weglaten. De vertelling ervoor is af zonder de vraag, en de alinea erna is te begrijpen zonder de vraag. Antwoordletters worden niet uitgesproken.

---

## Cold open [Schema: drie ziekenhuisiconen naast elkaar zonder namen, label 'drie ziekenhuizen in Brabant', kaartje 'maart 2020'; eronder één raster van telpoppetjes in zorgblauw, niet per ziekenhuis verdeeld; één voor één kleuren er poppetjes koraal; teller loopt op tot 96]
Maart 2020. Corona is net in Nederland. In drie ziekenhuizen in Brabant testen zesennegentig medewerkers met klachten positief. Kregen ze het virus op hun werk, van patiënten? Of kwam het van buiten? Hoe kom je daarachter?

## Titel
Stambomen uit DNA

## Hoofdstuk 1 — Van monster naar sequentie [Schema: Sam en Dr. Kim aan een bureau met twee schermen; wattenstaafje in een buisje; Micro: een virusdeeltje met een sliertige RNA-streng; RNA wordt DNA; stukjes die in veelvoud worden gekopieerd]
Sam loopt een week mee bij de bio-informatica van een ziekenhuislab. Dr. Kim, onderzoeker, ziet nooit wie wie besmette. Ze heeft alleen monsters, met het erfelijk materiaal van het virus.

Het coronavirus in een wattenstaafje heeft RNA: ongeveer dertigduizend letters. Het lab schrijft dat om naar DNA. Dan kopieert het dat in stukjes van een paar honderd letters. Een machine leest ze.

[Schema: editorvenster; korte stukjes schuiven langs een lange regel 'referentie' en vormen samen één regel; daarna twee regels van ± 30 letters onder elkaar, gelijke letters grijs, één afwijkende letter goud]
De computer legt de stukjes langs een referentiegenoom, zoals in de eerste film van deze reeks. Zo krijg je één sequentie: de volgorde van alle letters.

[Schema: een besmettingsketen als bolletjes van persoon naar persoon; af en toe krijgt een bolletje een gouden streepje, vaak niet; klokje 'ongeveer 2 per maand · gemiddeld']
Bij elke kopie in een cel kan er een fout in sluipen. Dat is een mutatie, zoals in de film over mutaties. In de virussen die rondgaan, komen er gemiddeld ongeveer twee per maand bij. Dat is gemeten.

Een medewerker besmet een collega. Een week later laten ze allebei hun virus lezen. Hoeveel letters verschillen hun virussen? Wat denk je?
[VRAAG] (a) honderden letters, want een virus muteert heel snel · (b) geen letter, of maar een paar · (c) precies twee, want het zijn er twee per maand ✓b

[Schema: twee lange regels van het virus van twee mensen, helemaal grijs; de camera scrolt eroverheen; één gouden letter, of geen]
Ook na een week verschillen twee mensen die elkaar besmetten meestal geen letter, of maar een paar. Twee per maand is een gemiddelde, en een week is kort.

## Hoofdstuk 2 — Zelf een stamboom bouwen [Schema: kaartje 'bedacht voorbeeld' linksboven, zichtbaar zolang A–E in beeld zijn (ook in H3 en H4); plattegrond zonder stadsnamen met echte mensjes (cast en figuranten): ziekenhuis 1 met verpleegkundigen A (Jesse) en C op één afdeling en patiënt E zittend in gewone kleding, ziekenhuis 2 met zorgmedewerker B, D (Joost) buiten de ziekenhuizen; monsters als hoofdletter in een gekleurd rondje boven het hoofd; ernaast een tabel met verschillen die zich vult]
In de evolutiereeks telde je verschillen om verwantschap en tijd te schatten. Hier bouw je er zelf een boom mee. Sam krijgt vijf sequenties, A tot en met E: een bedacht voorbeeld. A en C zijn verpleegkundigen op één afdeling, en E is daar patiënt. B werkt in een ander ziekenhuis.

De computer telt per paar de verschillen in een tabel. A en B: nul. C en E: twee. Met D steeds zes of zeven.

[Schema: drie genummerde stappen naast de tabel; het kleinste getal licht goud op; A en B schuiven naar elkaar en worden één kolom 'A-B'; onder de tabel verschijnt de eerste vertakking]
Nu volg je een algoritme: een vast stappenplan dat een computer uitvoert. Stap één: hang het paar met de minste verschillen aan één vertakking, hier A en B. Stap twee: doe alsof A-B één monster is, en zoek weer het kleinste getal. Herhaal tot alles aan elkaar hangt.

A en B hangen samen. Welk paar komt daarna? Wat denk je?
[VRAAG] (a) C en E, met twee verschillen · (b) A-B en C, want A en C werken op één afdeling · (c) D en E, die staan in de tabel naast elkaar ✓a

[Schema: C en E schuiven samen tot 'C-E'; tabel krimpt tot drie rijen: A-B, C-E, D met de getallen 5, 6 en 7; dan A-B en C-E samen, D als laatste tak; label 'stamboom (fylogenetische boom) · vereenvoudigd']
Na A en B is het kleinste getal twee: C en E. Waar iemand werkt, telt niet mee; collega's A en C verschillen zelfs vijf letters. Er blijven drie over: A-B, C-E en D. A-B en C-E verschillen vijf, met D meer. Dus gaan A-B en C-E samen, en D hangt er als laatste aan.

Dat is je stamboom: een schema van verwantschap, berekend uit verschillen in sequenties. Hoe je hem leest, zag je in Stambomen lezen. Echte programma's rekenen slimmer, maar weinig verschil blijft nauw verwant.

## Hoofdstuk 3 — Hoe zeker is die boom? [Schema: Sam kijkt naar de boom van H2; rechts de regels van C en E met twee gouden letters; een letter die even flikkert en de boom die meewiebelt]
Sam vraagt: hoe zeker is die boom eigenlijk? Bij zo weinig verschillen kan één letter hem al omgooien.

[Schema: twee takken die ver uit elkaar liggen krijgen elk los van elkaar dezelfde gouden letter op dezelfde plek; een stippellijn trekt ze ten onrechte naar elkaar toe; daarna een kaartje 'leesfout van de machine']
Soms ontstaat dezelfde mutatie twee keer, los van elkaar. Dan lijken twee virussen familie, terwijl ze dat niet zijn. Ook een leesfout van de machine kan een nepverschil maken.

[Schema: korte rust; dan de uitlijning als kolommen; een hand trekt een kolom uit een bak, schrijft hem over en legt hem terug; teller 'evenveel kolommen als het origineel'; een nieuwe uitlijning met sommige kolommen dubbel en andere weg; ernaast een nieuw boompje; daarna een nieuwe trekking, een nieuw boompje, en zo een stapel boompjes]
Daarom test Dr. Kim de boom. De computer trekt kolommen uit de uitlijning, zoals loten uit een bak, en legt elk lot terug. Hij trekt er evenveel als de echte uitlijning heeft. Sommige kolommen komen dan twee keer, andere niet. Daarmee bouwt hij een nieuwe boom. Dat doet hij honderden keren, steeds met een nieuwe trekking: herbemonsteren, of bootstrappen.

[Schema: de boom met getallen bij de vertakkingen: A-B 99 van de 100, C-E ongeveer 85, A-B met C-E ongeveer 58; label 'eigen berekening, vereenvoudigd']
Dan telt Dr. Kim hoe vaak elk groepje terugkomt. A met B: bijna altijd. C met E: ruim acht van de tien keer. A-B met C-E: zes van de tien.

Wat betekent die zes van de tien? Wat denk je?
[VRAAG] (a) dat zes van de tien kolommen dat groepje steunen · (b) dat de boom voor zestig procent juist is · (c) dat die tak wankel staat: hij hangt soms anders ✓c

[Schema: de vertakking A-B/C-E wordt gestippeld en wiebelt; A-B blijft stevig]
Een tak die maar zes van de tien keer terugkomt, staat wankel. Ook een hoog getal zegt alleen dat de data steeds hetzelfde groepje geven. Het bewijst niet dat de boom juist is.

## Hoofdstuk 4 — Wie besmette wie, en waar houdt dat op? [Schema: kaartje 'bedacht voorbeeld'; plattegrond zonder stadsnamen; A in ziekenhuis 1 en B in ziekenhuis 2 krijgen dezelfde kleur; bij A 'positief: dag 1', bij B 'positief: dag 3'; een vraagteken tussen hen]
A en B hebben precies hetzelfde virus. En A testte twee dagen eerder positief dan B.

Wat zegt dat? Wat denk je?
[VRAAG] (a) hun virussen zijn familie; wie het aan wie gaf, zie je niet · (b) A besmette B, want A testte eerder positief · (c) ze hebben elkaar vast ontmoet, want hun virus is gelijk ✓a

[Schema: tijdlijnen van A en B: besmetting (stip), klachten (golfje), test (vinkje); bij B ligt de besmetting vóór die van A, maar de test later; daarna poppetjes met een stippellijn in zorgblauw 'niet getest' tussen de twee ziekenhuizen]
Gelijke virussen zeggen: nauw verwant. Niet wie het aan wie gaf. En wie eerder positief test, is niet per se eerder besmet: de een krijgt na een paar dagen klachten, de ander pas na een week of meer. Misschien kregen ze het uit dezelfde bron, via ongeteste mensen. Een boom toont alleen wie je wél hebt gemeten.

[Schema: verpleegkundige C en patiënt E (zittend, gewone kleding) met drie gelijkwaardige pijlen: C → E, E → C en een niet-geteste figurant in een gestippeld kader → beide; annotatiehaak 'boom = verwantschap · richting hier niet te zien']
Ook bij C en E, twee letters verschil, kan het drie kanten op. Besmette de verpleegkundige de patiënt, of de patiënt haar? Of kregen ze het allebei van iemand anders? De boom past bij alle drie. Bij zulke kleine verschillen zie je de richting niet. En schuld al helemaal niet.

[Schema: Dr. Kim met een lijst naast de boom: 'werkplek · eerste klachten · waar geweest'; vinkjes]
Daarom leggen onderzoekers de boom naast gesprekken. Wie werkte waar? Wie had wanneer klachten? Wie was waar geweest?

[Schema: het kaartje 'bedacht voorbeeld' verdwijnt; kaartje 'maart 2020 · echte studie'; drie ziekenhuisiconen zonder namen met label 'drie ziekenhuizen in Brabant'; totaal 'vijftig medewerkers · tien patiënten'; drie gekleurde groepjes als blokjes met het label 'elke groep: in meer dan één ziekenhuis, en ook daarbuiten'; geen aantallen per ziekenhuis; daarna twee telpoppetjes van één afdeling in verschillende kleuren]
Zo ging het in maart 2020 echt. Onderzoekers lazen het virus van vijftig medewerkers en tien patiënten. Bijna alles viel in drie groepen. Elke groep kwam in meer dan één ziekenhuis voor. En dezelfde virussen zaten ook bij mensen daarbuiten. En collega's van één afdeling hadden lang niet altijd hetzelfde virus.

Waar raakten de meesten dan besmet? Wat denk je?
[VRAAG] (a) op hun eigen afdeling, van collega's of patiënten · (b) vooral buiten het werk, niet allemaal op één plek · (c) dat zegt niets, want de virussen zijn te gelijk ✓b

[Schema: de drie groepen buiten de ziekenhuizen, met dunne lijnen naar binnen; daarna een klein ziekenhuisicoon met een vraagteken]
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

---

## Beelden per hoofdstuk
Antwoordletters: b · a · c · a · b.
- **Algemeen:** monsters altijd als hoofdletter in een gekleurd rondje; optieletters op de vraagkaart klein en grijs (review Didactiek 7). Het kaartje 'bedacht voorbeeld' staat in beeld zolang A–E te zien zijn; de bedachte plattegrond heeft geen stadsnamen ('ziekenhuis 1', 'ziekenhuis 2'). Nergens stads- of ziekenhuisnamen; de bron (Sikkema e.a. 2020) alleen op het bronkaartje in de recap (keuring Kamiel 25 okt 2026). Mensen in het bedachte voorbeeld: castpersonages en figuranten, geen telpoppetjes of bedden; wie niet getest is, staat in een gestippeld kader in zorgblauw met label 'niet getest' (niet half doorzichtig).
- **Cold open (Schema):** drie ziekenhuisiconen zonder namen ('drie ziekenhuizen in Brabant'); één raster telpoppetjes (hier een telling, dus pictogrammen) (geen verdeling per ziekenhuis: die geeft de bron niet voor de 96); teller in Meta tot 96. Geen gezichten, geen bedden met zieken.
- **H1 (Schema → Micro → Schema):** Sam en Dr. Kim aan een bureau (castboek, `gewoon`), namen bij hen. Zoomcirkel van het buisje naar een virusdeeltje (bol met uitsteeksels, binnenin een dunne sliertige RNA-streng; label 'RNA · ongeveer 30 000 letters'). RNA → DNA (label 'omschrijven'). Stukjes die verdubbelen en langs de referentie schuiven; editorvenster (reeksobject uit de eerste film van deze reeks). Klokje met 'gemiddeld'. Keten: niet bij elke sprong een gouden streepje.
- **H2 (Schema):** plattegrond met A–E als echte mensjes (E zit, gewone kleding); tabel die zich vult; algoritme als drie genummerde stappen; boom die van onder af groeit. Takken zonder schaal, label 'vereenvoudigd'. Tabel krimpt zichtbaar na elke stap.
- **H3 (Schema):** Sam bij de boom; wiebelende boom; dezelfde mutatie twee keer als twee takken met dezelfde gouden letter op dezelfde kolom; leesfout als een letter met een vraagteken. Korte rust vóór het herbemonsteren. Herbemonsteren in twee beelden: eerst trekken, overschrijven, terugleggen ('evenveel kolommen'); dat beeld gaat weg en dan een stapel van tien boompjes ('honderden keren'). Getallen 99 · 85 · 58 bij de takken als uitkomst van een berekening ('reken je het uit, dan …', kaartje 'eigen berekening, vereenvoudigd').
- **H4 (Schema):** dag 1 / dag 3 bij A en B; tijdlijnen besmetting–klachten–test; niet-geteste figuranten in een gestippeld kader. C en E met drie gelijkwaardige pijlen ('en geen schuld'). Kim met de gesprekkenlijst. Echte studie: drie ziekenhuizen zonder namen, alleen totalen (50 medewerkers, 10 patiënten), drie groepen met label 'in meer dan één ziekenhuis, en ook daarbuiten', geen aantallen per ziekenhuis en geen groepen op een bepaalde plek. Geen kaartje 'carnaval'.
- **Recap:** echte casus en bedachte boom naast elkaar, elk met eigen kaartje; bronkaartje 'bron: Sikkema e.a., Lancet Infect Dis 2020'; opleidingskaartjes (hbo Bio-informatica · HAN Nijmegen · 4 jaar; wo-bachelor biologie of moleculaire levenswetenschappen · Radboud Nijmegen; master Bioinformatics and Systems Biology · Wageningen); werkplekken ziekenhuis, onderzoeksinstituut, bedrijf; kaartje RIVM.
