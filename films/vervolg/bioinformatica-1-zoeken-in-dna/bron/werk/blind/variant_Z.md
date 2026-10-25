# Variant Z

## Cold open
[Schema: werkplek; Sam en Kim met sushibakjes, etiket 'blauwvintonijn'; daarna het scherm met de barcode als rij lettertegels die uit beeld loopt; teller in Meta 'ongeveer 650 letters']
Sam loopt een week mee bij de afdeling bio-informatica. Het begint met sushi. Op het bakje staat: blauwvintonijn. Dr. Kim laat het DNA van een stukje lezen. Vandaag staat het op haar scherm: ongeveer zeshonderdvijftig letters. Welke vis is het echt?

[Schema: Sam wijst zelfverzekerd naar het scherm; Kim pakt een stopwatch; het scorebord verschijnt met twee lege kolommen]
'Dat zoek ik zelf wel op,' zegt Sam. Kim zet een stopwatch aan. Sam tegen de computer.

## Titel
Zoeken in DNA

## Hoofdstuk 1 — Ronde 1: zoeken
Hoofdstukkaart: Hoeveel DNA staat er al online?

[Schema: drie databank-iconen (Amerika, Europa, Japan) op één baseline met teal pijlen en een klokje 'elke dag'; Sam opent een lijst die eindeloos doorscrolt]
Eerst moet Sam weten waarmee hij vergelijkt. Onderzoekers over de hele wereld zetten hun DNA in openbare databanken. Die staan in Amerika, Europa en Japan, en wisselen elke dag alles uit. Iedereen mag erin zoeken. Een sequentie is de volgorde van basen in een stuk DNA. Bij elke sequentie staat wat erover bekend is: van welke soort, welk gen, wie hem las. Het lab las bij de sushi een vast stukje van één gen. Bij de meeste dieren verschilt dat stukje per soort, als een streepjescode.

[Schema: een teller die oploopt tot 'miljarden sequenties'; Sam rekent met zijn vingers; vraagkaartje met een klokje]
Er staan miljarden sequenties in. Stel: Sam bekijkt er elke seconde één, dag en nacht. Hoe lang doet hij over een miljard? Wat denk je?
[VRAAG] (a) ongeveer een week · (b) ruim dertig jaar · (c) ongeveer een jaar

[Schema: de som op het scherm: 1 000 000 000 s ÷ 60 ÷ 60 ÷ 24 ÷ 365 ≈ 32 jaar; Sam als oude man (alleen een tekstje 'Sam, 48'), op het scorebord bij SAM: 'ruim 30 jaar · per miljard']
Antwoord b. Een jaar heeft ongeveer een-en-dertig miljoen seconden. Een miljard seconden is dus ruim dertig jaar. En dat is nog maar één miljard. Met de hand gaat het niet. Sam heeft een slimmere manier nodig. Maar eerst moet hij weten hoe je twee sequenties vergelijkt.

## Hoofdstuk 2 — Ronde 2: vergelijken
Hoofdstukkaart: Hoe zie je of twee sequenties op elkaar lijken?

[Schema: het scherm met twee oefenrijen van zestien en zeventien tegels; label 'oefenvoorbeeld'; stopwatch loopt; Sam zet streepjes bij gelijke letters; na de vierde letter bijna alles koraal]
Kim geeft hem een oefening: twee korte stukjes. Sam legt ze onder elkaar, letter voor letter. De eerste vier zijn gelijk, daarna klopt bijna niets. Wat is er aan de hand? Wat denk je?
[VRAAG] (a) het lab las die letters achterstevoren · (b) het zijn vanaf daar twee verschillende genen · (c) er mist één letter, dus alles schuift op

[Schema → Micro: zoomcirkel op een DNA-streng waarin één nucleotide ontbreekt; terug: gestippeld vakje met een streepje in de bovenste rij, alles schuift op, streepjes lichten groen op; scoreregel +1 / −1 / −1 en de som 15 − 1 − 1 = 13]
Antwoord c. In het bovenste stukje ontbreekt een letter. Alles erna staat één plek verschoven. Sam zet daar een gat. Dat heet uitlijnen: zo naast elkaar leggen dat zoveel mogelijk gelijke letters onder elkaar staan. Met gaten waar een stukje ontbreekt of extra is. Dan de score. Een gelijke letter is plus één, een verschil min één, een gat ook min één. Vijftien gelijk, één verschil, één gat: dertien.

[Schema: scorebord: SAM 'ongeveer een minuut' · COMPUTER 'een fractie van een seconde'; Kim tikt op het scherm]
Sam deed er ongeveer een minuut over. De computer volgt dezelfde rekenregel, maar in een fractie van een seconde. Zo'n vast stappenplan dat een computer uitvoert, heet een algoritme. Echte programma's geven iets andere punten. Het idee is hetzelfde: hoe hoger de score, hoe beter het past.

## Hoofdstuk 3 — Ronde 3: snel zoeken
Hoofdstukkaart: Hoe zoek je in seconden door miljarden sequenties?

[Schema: de stapel databankregels die uit beeld loopt; Kim typt de barcode in het zoekprogramma; de stopwatch van de computer begint]
Nu Kims beurt. Ze zet de barcode in het zoekprogramma BLAST. Ook een computer zou lang bezig zijn als hij alles helemaal uitlijnde. Hoe doet BLAST het? Wat denk je?
[VRAAG] (a) het slaat de helft van de databank over · (b) het zoekt eerst korte stukjes, en kijkt alleen daar verder · (c) het lijnt alleen het begin van elke sequentie uit

[Schema: de barcode valt uiteen in woordjes van elf tegels (goud omlijnd); in de stapel lichten een paar regels op, de rest dimt; op één regel groeit de uitlijning naar links en rechts met een meelopende score; inzet: een boek met een register]
Antwoord b. BLAST knipt de barcode in korte woordjes, bijvoorbeeld van elf letters. Het zoekt alleen waar zo'n woordje precies voorkomt. Daar lijnt het verder uit, naar links en naar rechts, zolang de score goed blijft. In een dik boek kijk je ook eerst in het register.

[Schema: resultatenlijst: 'geelvintonijn 100%' groen, daaronder twee tonijnsoorten met een iets lager percentage; kolom 'toeval' bijna 0; scorebord COMPUTER: 'een paar minuten, soms seconden']
Na een paar minuten staat er een lijst, soms al na seconden. Bovenaan: geelvintonijn, honderd procent gelijk. Daaronder andere tonijnsoorten, met bijna net zoveel letters gelijk. Tonijnsoorten verschillen in deze barcode maar in weinig letters. Elke letter telt dus. Naast elke treffer staat hoeveel van zulke treffers je door toeval zou vinden. Hier bijna nul.

[Schema: Sam juicht 'Geelvin!'; Kim wijst op een databankregel met een verkeerd naamkaartje, koraal omlijnd]
Maar Kim kijkt verder dan de eerste regel. Een databank bevat wat mensen erin zetten, ook fouten. Staat een vis onder de verkeerde naam, dan krijg je een verkeerde treffer. Daarom vergelijkt ze meerdere treffers uit betrouwbare bronnen. Dat oordeel doet de computer niet voor haar.

## Hoofdstuk 4 — Ronde 4: vertalen
Hoofdstukkaart: Hoe laat je een computer een gen vertalen?

[Schema: links de codontabel en een hand die per drie letters aanwijst; Sam met een potlood; achttien letters van het insulinegen; stopwatch]
Laatste ronde. Kim geeft Sam het begin van het menselijke insulinegen: achttien letters. Sam vertaalt het met de hand, zoals in De genetische code lezen. T wordt U, per drie letters opzoeken. Na een minuut heeft hij zes aminozuren.

[Schema: het scherm 'vertaal.py' met zes regels code die één voor één goud oplichten; daaronder zes okerkralen M, A, L, W, M, R]
Dan schrijft hij het in Python, een programmeertaal. Eerst de codontabel, als een woordenboek: bij elk codon één aminozuur. Dan elke T een U. Dan in stappen van drie door het gen. Elk codon zoekt de computer op, en het aminozuur komt achter de keten. Er komt hetzelfde uit: methionine, alanine, leucine, tryptofaan.

[Schema: Sam veegt zweet van zijn voorhoofd; Kim zet een gen van ruim duizend letters op het scherm; vraagkaartje]
Nu wil Kim een gen van ruim duizend letters. Wat moet Sam aan zijn code veranderen? Wat denk je?
[VRAAG] (a) niets: de stap van drie herhaalt zich vanzelf · (b) voor elk codon een extra regel code · (c) de codontabel opnieuw intypen

[Schema: de code draait, de kralenketting schiet uit beeld; scorebord: SAM 'uren' · COMPUTER 'een fractie van een seconde'; inzet: één tegel verschoven en koraal omlijnde verkeerde kralen]
Antwoord a. Aan de code hoeft niets te veranderen. Dezelfde regels werken voor elke lengte. Voor duizend genen net zo goed als voor één. Maar de computer doet precies wat er staat. Laat Sam het gen één letter te laat beginnen, dan krijgt hij verkeerde codons. Net als met de hand.

## Recap
[Schema: het scorebord groot: in elke ronde wint COMPUTER op tijd; daarna verschijnt onder elke ronde een klein icoontje van Sam of Kim met een vinkje: 'koos wat te zoeken', 'zette het gat', 'controleerde de treffer' (Kim), 'schreef de code' (Sam)]
Welke vis zat er in de sushi? Geelvintonijn: honderd procent gelijk in de barcode, en geen toeval. Niet de duurdere blauwvintonijn van het bakje. In 2017 lieten journalisten tonijn testen in een-en-twintig Nederlandse restaurants. Twintig keer was het geelvintonijn. De computer won elke ronde. Maar mensen bedachten wat er gezocht moest worden. Kim controleerde of de treffer klopte. Sam schreef de code. Dat samen is bio-informatica.

[Schema: twee opleidingskaartjes en drie werkplekken als lijniconen]
Dit werk leer je bijvoorbeeld bij de hbo-opleiding Bio-informatica in Nijmegen: vier jaar. Of je doet eerst een bachelor als biologie. Daarna volgt een master bio-informatica, bijvoorbeeld in Wageningen. Je werkt dan in een ziekenhuis, een onderzoeksinstituut of een bedrijf. Programmeren leer je er vanaf het eerste jaar.

## Eindkaart
Openbare databanken: miljarden sequenties, iedereen mag erin zoeken; met de hand is dat onmogelijk.
Uitlijnen: gelijke letters onder elkaar, gaten waar een stukje mist; een score zegt hoe goed het past.
BLAST: eerst korte woordjes opzoeken, alleen daar verder uitlijnen.
Een treffer controleer je: procent gelijk, kans op toeval, en meerdere bronnen.
Een paar regels code vertalen elk gen, hoe lang ook.

---

## Beelden per hoofdstuk
Antwoordletters: b · c · b · a.
- **Doorlopend:** scorebord rechtsboven, Schema-kaartje (#2A3A58, rand lichter), twee kolommen SAM · COMPUTER in Meta, per ronde een regel; nooit meer dan vier regels. Stopwatch als lijnicoon bij wie aan de beurt is.
- **Cold open en H1:** als A; teller tot 'miljarden'; som op het scherm met afronding '≈ 32 jaar' (1 000 000 000 / 31 536 000 = 31,7). Geen oude Sam tekenen (castboek kent geen oudere Sam): alleen het tekstje 'over ruim 30 jaar'.
- **H2:** oefenvoorbeeld als in A (`ACCT-AGGACTTCAGTA` / `ACCTCAGGACTTGAGTA`, score 13); zoomcirkel op de streng.
- **H3:** als A; scorebordtijd 'een paar minuten, soms seconden' (geen precies getal).
- **H4:** hand met codontabel; dezelfde zes regels code als A; uitkomst `MALWMR`; gen 'ruim duizend letters' als lange rij (illustratie, geen echt gen nodig; label 'voorbeeld').
- **Recap:** scorebord met vier vinkjes voor de mensen (Sam drie, Kim één); opleidingskaartjes als A.
