# Stambomen en kansrekenen — opnamescript (uit remake-2026-10/script_v2.md)

---


## Cold open [Macro: spreekkamer]

Een vrouw van vierendertig wil graag een kind. Haar broer heeft taaislijmziekte. Haar ouders hebben het niet, en zij zelf ook niet. Draagt zij het allel toch bij zich? En hoe groot is de kans dat haar kind de ziekte krijgt?

## Titel
Stambomen en kansrekenen

## Hoofdstuk 1 — De taal van een stamboom [Schema]

Eerst de taal van een stamboom. Een vierkant is een man, een rondje een vrouw. Een ingekleurd symbool: die persoon heeft de eigenschap. Een lijn tussen twee symbolen is een paar. Daaronder hangen hun kinderen aan één lijn, van oud naar jong. Elke generatie staat op één hoogte en krijgt een Romeins cijfer.

Dit is de stamboom van de vrouw. Bovenaan, generatie één: haar ouders. Daaronder, generatie twee: haar twee broers, zijzelf en haar partner. Alleen haar jongste broer is ingekleurd. Onderaan, generatie drie: het kind dat ze willen.

## Hoofdstuk 2 — Stap 1: dominant of recessief? [Schema]

Stap één: dominant of recessief. Zoek twee ouders zonder de eigenschap, met een kind dat hem wél heeft. Dan droegen die ouders het allel verborgen bij zich. De eigenschap is dus recessief. Zo is het bij taaislijmziekte. Zie je juist twee ouders mét de eigenschap en een kind zonder, dan is hij dominant.

Een dominante ziekte, zoals de ziekte van Huntington, ziet er in een stamboom anders uit. Het allel voor de ziekte noteer je dan met een hoofdletter: A. Eén A is genoeg om ziek te worden. Daarom heeft wie de ziekte heeft, bijna altijd een ouder met de ziekte.

Deze man heeft de ziekte van Huntington niet, maar zijn vader wel. Kan zijn kind de ziekte krijgen? Wat denk je?
[VRAAG] (a) Ja: een dominante ziekte kan een generatie overslaan · (b) Nee: hij heeft geen A om door te geven · (c) Alleen als zijn kind een zoon is

Een dominante eigenschap slaat geen generatie over. Wie de ziekte niet heeft, is aa. Hij heeft geen A, dus hij kan ook geen A doorgeven. Zijn vader was Aa, en gaf hem toevallig de a. Krijgt geen enkel kind van een zieke ouder de A, dan is het allel uit die tak van de familie verdwenen. Bij de kleinkinderen komt het niet meer terug.

Bij een recessieve eigenschap kan dat wél: twee dragers kunnen een kind krijgen dat hem wel heeft. Een eigenschap die een generatie overslaat, is dus recessief.

## Hoofdstuk 3 — Stap 2 en 3: waar ligt het gen, en wie heeft wat? [Schema]

Stap twee: autosoom of X-chromosoom. Bij een recessieve eigenschap op de X heeft een dochter met de eigenschap altijd een vader met de eigenschap. Hij geeft haar immers zijn enige X. Zie je een dochter met de eigenschap en een vader zonder, dan ligt het gen op een autosoom.

In de familie van de vrouw is alleen een zoon ziek. Dan kun je het uit de stamboom niet zeker zeggen. Van taaislijmziekte is bekend: het gen ligt op chromosoom zeven, een autosoom.

Stap drie: vul de genotypen in. Begin bij wie de eigenschap heeft. Bij een recessieve eigenschap is dat aa. Werk dan terug. Een kind met aa kreeg van elke ouder een a. Die ouders zijn gezond, dus allebei Aa. Iemand met Aa heeft de ziekte niet, maar draagt het allel wel bij zich: een drager.

Van een gezond persoon weet je vaak alleen dat er minstens één A is. Dat noteer je als A_. Zo staan de vrouw en haar oudste broer nu in de stamboom: A_.

## Hoofdstuk 4 — Twee derde, niet een half [Schema, simulatie]

Haar ouders zijn allebei Aa. De vrouw zelf is gezond. Hoe groot is de kans dat zij drager is? Wat denk je?
[VRAAG] (a) een derde · (b) een half · (c) twee derde

We simuleren driehonderd kinderen van twee dragers. Elk kind krijgt van elke ouder één allel, A of a. Ongeveer een kwart is AA, de helft Aa en een kwart aa. Maar we weten iets over de vrouw: ze is gezond. Dus halen we de zieke kinderen weg. Van de kinderen die overblijven, is ongeveer twee derde drager. De kans is dus twee derde, niet een half.

## Hoofdstuk 5 — Twee rekenregels [Schema]

De productregel: moeten twee dingen allebei gebeuren, en hangen ze niet van elkaar af, dan vermenigvuldig je de kansen. De kans dat twee dragers eerst een ziek kind krijgen en daarna nog een, is een kwart keer een kwart: een zestiende.

De somregel: mag het ene óf het andere gebeuren, en kunnen ze niet tegelijk, dan tel je de kansen op. Een kind van twee dragers is gezond als het AA is of Aa: een kwart plus een half is drie kwart.

Twee dragers hebben al een kind met taaislijmziekte. Hoe groot is de kans dat hun volgende kind het ook krijgt? Wat denk je?
[VRAAG] (a) kleiner dan een kwart · (b) een kwart · (c) groter dan een kwart

Elk kind is een nieuwe trekking. Ook na een ziek kind is de kans voor het volgende kind een kwart. Toeval heeft geen geheugen.

## Hoofdstuk 6 — Terug naar de spreekkamer [Schema → Macro]

Terug naar de vrouw. Haar partner heeft zich laten testen. Hij is drager: Aa.

Hoe groot is de kans dat hun kind taaislijmziekte krijgt? Wat denk je?
[VRAAG] (a) een zesde · (b) een achtste · (c) een kwart

Drie dingen moeten allemaal gebeuren. De vrouw moet drager zijn: twee derde. Zij moet dan een a doorgeven: een half. En haar partner ook: een half. Dus vermenigvuldig je: twee derde keer een half keer een half is een zesde.

Met zulke berekeningen werkt een klinisch geneticus. Met een dragerschapstest kan de vrouw laten onderzoeken of ze echt drager is. Is ze drager, dan is de kans voor haar kind een kwart. Is ze het niet, dan krijgt haar kind de ziekte niet.

## Recap [Schema → Macro]

Samengevat. Stap één: dominant of recessief. Een dominante eigenschap slaat geen generatie over: wie hem niet heeft, kan hem niet doorgeven. Stap twee: autosoom of X-chromosoom. Stap drie: vul de genotypen in, terug vanaf wie de eigenschap heeft. Stap vier: reken. Vermenigvuldig wat allemaal moet gebeuren, tel op wat elkaar uitsluit, en haal weg wat je al weet. Zo is de vrouw met kans twee derde drager, en krijgt haar kind de ziekte met kans een zesde.

## Eindkaart
Recessief: ouders zonder de eigenschap, een kind mét.
Dominant: slaat geen generatie over, want wie hem mist, is aa.
Gezond kind van twee dragers: kans ⅔ dat het drager is.
En → vermenigvuldigen · óf → optellen.
