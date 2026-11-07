# Variant Y

## Cold open
[Macro-nacht → Schema-decor: een sloot in een polder, vroeg in de ochtend; Sam op de kant schept met een emmer water; Kim houdt een flesje met een nummer open]
Maandagochtend. Sam loopt een week mee bij de afdeling bio-informatica. Toch staat hij niet achter een scherm, maar aan een sloot. Hij schept een emmer water. Er zwemt een zeldzame vis, zeggen ze. Niemand heeft hem gezien.

[Schema: twee dagen later; het scherm met een rij gekleurde lettertegels die uit beeld loopt; een vraagteken naast een vissilhouet]
Uit het water heeft het lab een stukje DNA gelezen. Welke vis is het?

## Titel
Zoeken in DNA

## Hoofdstuk 1 — Databanken
Hoofdstukkaart: Waar vergelijk je een onbekend stukje DNA mee?

[Schema → Micro: zoomcirkel in het slootwater: een vis glijdt voorbij, van zijn huid laten een paar cellen los; één cel valt open en een DNA-draad (paars) zweeft weg; terug naar het flesje en het filter]
Hoe komt DNA in water? Een vis verliest steeds huidcellen, urine en poep. Daarin zit zijn DNA. Dat heet eDNA: DNA uit de omgeving. Het lab filtert het water en leest een vast stukje DNA. Dat stukje verschilt net iets van vissoort tot vissoort, zoals een streepjescode. Hoe dat lezen gaat, zag je in DNA lezen.

[Schema: Sam achter het scherm met de onbekende sequentie; Kim leunt over zijn schouder]
Nu heeft Sam een sequentie: de volgorde van basen in een stuk DNA. 'Wat nu?' vraagt Kim. Waar vind je welke vis bij deze letters hoort? Wat denk je?
[VRAAG] (a) nergens: dat moet het lab eerst zelf uitzoeken · (b) in een boek met alle vissen en hun DNA · (c) in een openbare databank, waarin iedereen zoekt

[Schema: drie databank-iconen op één baseline met teal pijlen en een klokje 'elke dag'; teller 'miljarden sequenties'; daaronder een rij soortsilhouetten waarvan een deel nog grijs (zonder barcode) is]
Antwoord c. Onderzoekers over de hele wereld zetten hun sequenties in openbare databanken. In Amerika, Europa en Japan. Die wisselen elke dag alles uit. Samen zijn het miljarden sequenties. Iedereen mag erin zoeken. Maar compleet zijn ze niet. Van een deel van de Nederlandse soorten ontbreekt het DNA nog.

## Hoofdstuk 2 — Uitlijnen
Hoofdstukkaart: Hoe zie je of twee sequenties op elkaar lijken?

[Schema: het scherm met twee korte oefenrijen van vijftien en zestien tegels; label 'oefenvoorbeeld'; Sam zet ze letter voor letter onder elkaar, na vijf letters overal koraal]
Kim geeft Sam eerst een oefening: twee korte stukjes onder elkaar leggen. Sam begint links, letter voor letter. Na vijf letters gaat het mis. Bijna geen letter klopt nog. 'Dus het zijn heel verschillende stukjes,' zegt Sam. 'Weet je dat zeker?' vraagt Kim. Wat is er aan de hand? Wat denk je?
[VRAAG] (a) het zijn twee totaal verschillende stukjes DNA · (b) in het bovenste stukje staat één letter extra · (c) het onderste stukje is in spiegelbeeld gelezen

[Schema: in de onderste rij komt een gestippeld vakje met een streepje; alles erna schuift één tegel op; de streepjes tussen de rijen lichten groen op; label 'gat']
Antwoord b. Het bovenste stukje heeft één letter extra. Daardoor verschuift de rest. Sam zet in het onderste stukje een gat. Nu passen bijna alle letters weer. Dat heet uitlijnen: twee sequenties zo naast elkaar leggen dat zoveel mogelijk gelijke letters onder elkaar staan. Met gaten waar een stukje ontbreekt of extra is.

[Schema: scoreregel onder de kolommen: +1 groen, −1 koraal, −1 bij het gat; de som op het scherm: 14 − 1 − 1 = 12]
Hoe goed past het? Geef elke gelijke letter plus één. Een andere letter min één, en een gat ook min één. Sam telt veertien gelijke letters, één verschil en één gat. Veertien min één min één: twaalf. Hoe hoger de score, hoe beter het past. Echte programma's tellen iets anders, maar het idee is hetzelfde. En zo'n vaste rekenregel kan een computer heel snel uitvoeren.

## Hoofdstuk 3 — BLAST
Hoofdstukkaart: Hoe zoek je in seconden door miljarden sequenties?

[Schema: Sam rekent met een vinger op het scherm; een klokje in de hoek; daarachter een stapel databankregels die naar boven uit beeld loopt]
'Dan lijn ik mijn stukje uit met alles in de databank,' zegt Sam. 'Hoe lang duurt dat?' vraagt Kim. Hoe kan een zoekprogramma zo snel zijn? Wat denk je?
[VRAAG] (a) het zoekt eerst korte stukjes, en kijkt alleen daar verder · (b) een supercomputer lijnt alles helemaal uit · (c) het zoekt alleen in de vissen die in Nederland leven

[Schema: de sequentie valt uiteen in woordjes van elf tegels (goud omlijnd); in de stapel lichten een paar regels op, de rest dimt; op één regel groeit de uitlijning naar links en rechts met een meelopende score]
Antwoord a. Het zoekprogramma heet BLAST. Het knipt de sequentie in korte woordjes, bijvoorbeeld van elf letters. Die zoekt het op in de databank. Alleen waar een woordje precies past, lijnt BLAST verder uit. Naar links en naar rechts, zolang de score goed blijft. Al het andere slaat het over. Zo heeft Sam vaak binnen een paar minuten antwoord, soms in seconden.

[Schema: resultatenlijst met drie regels: 'grote modderkruiper 100%' (groen), daaronder twee andere vissoorten (namen pas na controle, zie twijfels) met lagere percentages; kolom 'toeval' met een getal heel dicht bij nul]
Bovenaan staat de grote modderkruiper: honderd procent gelijk. Een beschermde vis die moeilijk te vinden is. Daaronder staan verwante vissen, met minder letters gelijk. Hoe meer letters verschillen, hoe minder het lijkt. Naast de treffer staat nog een getal. Het zegt hoeveel zulke treffers je puur door toeval zou vinden. Hier: bijna nul.

[Schema: Sam steekt juichend zijn armen op; Kim houdt een vinger op; naast de treffer verschijnt een kaartje 'dode vis? vogelpoep? water van verderop?']
'Hij zwemt er!' roept Sam. 'Weet je dat zeker?' vraagt Kim. Het DNA kan ook van een dode vis komen. Of het is met water van verderop meegekomen. eDNA zegt dat het DNA er is. Niet dat de vis er nu zwemt. Daarom meten ze vaker, op meer plekken.

## Hoofdstuk 4 — Zelf programmeren
Hoofdstukkaart: Hoe laat je een computer een gen vertalen?

[Schema: links de codontabel en een hand die per drie letters aanwijst (De genetische code lezen); rechts het lege scherm met een gouden cursor, tabblad 'vertaal.py'; Sam typt]
Woensdag mag Sam zelf programmeren. Kim geeft hem het begin van het menselijke insulinegen. In De genetische code lezen vertaalde je zo'n gen met de hand. Sam laat de computer het doen, in Python. Dat is een programmeertaal.

[Schema: de zes regels code verschijnen één voor één terwijl Sam typt; de beschreven regel licht goud op]
Eerst typt hij de codontabel, als een woordenboek: bij elk codon één aminozuur. In een databank staat een gen als DNA: met T in plaats van U. Dus laat hij elke T een U worden. Dan loopt de computer in stappen van drie door het gen. Elk codon zoekt hij op, en het aminozuur komt achter de keten.

[Schema: Sam drukt op een toets; onder de code verschijnen zes okerkralen met letters, maar het zijn de verkeerde (koraal omlijnd); boven het gen staat de eerste tegel net buiten de code-cursor]
Sam start zijn programma. Er komen letters uit, maar niet de goede. Het eerste aminozuur is geen methionine. 'Kijk eens waar je begint,' zegt Kim. Wat is er mis? Wat denk je?
[VRAAG] (a) de computer kent de codontabel niet goed · (b) Sam begint één letter te laat · (c) het gen is van een mens, de computer kan alleen bacteriën

[Schema: de cursor springt één tegel terug; de code draait opnieuw; zes okerkralen M, A, L, W, M, R in groen omlijnd; daarna groeit de keten razendsnel uit beeld]
Antwoord b. Sam had zijn gen één letter te laat laten beginnen. Dan leest de computer andere drietallen, net als jij met de hand. Hij verbetert het. Nu komt er M uit, van methionine, en dan alanine, leucine, tryptofaan. Dezelfde paar regels werken voor een gen van elke lengte. Voor duizend genen net zo goed als voor één.

## Recap
[Schema: terug aan de sloot; Sam met de emmer; boven hem vier kleine schermpjes: eDNA-flesje, databank, uitlijning, resultatenlijst met 'grote modderkruiper 100%']
Welke vis zwemt in de sloot? Sam schepte water. Het lab las het DNA dat vissen achterlieten. In de openbare databank zocht BLAST eerst korte woordjes, en lijnde alleen daar verder uit. De beste treffer: de grote modderkruiper, honderd procent gelijk, geen toeval. Niemand heeft hem gezien, maar zijn DNA is er. Of hij er nu zwemt, zegt een volgende meting.

[Schema: twee opleidingskaartjes en drie werkplekken als lijniconen (ziekenhuis, onderzoeksinstituut, bedrijf)]
Dit werk leer je bijvoorbeeld bij de hbo-opleiding Bio-informatica in Nijmegen: vier jaar. Of je doet eerst een bachelor als biologie. Daarna volgt een master bio-informatica, bijvoorbeeld in Wageningen. Je werkt dan in een ziekenhuis, een onderzoeksinstituut of een bedrijf. Of je zoekt zeldzame dieren zonder ze te vangen.

## Eindkaart
eDNA: dieren laten DNA achter in water; het lab leest een vast stukje.
Openbare databanken: miljarden sequenties, maar niet van elke soort.
Uitlijnen: gelijke letters onder elkaar, gaten waar een stukje mist; een score zegt hoe goed het past.
BLAST: eerst korte woordjes opzoeken, alleen daar verder uitlijnen.
Een paar regels code vertalen elk gen; begin bij de goede letter.

---

## Beelden per hoofdstuk
Antwoordletters: c · b · a · b.
- **Cold open:** decor 'sloot in de polder' (nieuw, ElevenLabs-brand kit filmdecor, ±60%), alleen onder de slootscènes; Sam in gewone kleren met laarzen (garderobe bestaat niet: twijfel), Kim met flesje. Geen vis in beeld (niemand heeft hem gezien).
- **H1:** zoomcirkel in het water: vissilhouet (Macro-bibliotheek, generieke vis, niet de modderkruiper), huidcel (Micro) die openvalt, DNA-draad paars. Filter en flesje als lab-lijntekening. Databank-iconen; rij silhouetten, een deel grijs ('nog geen barcode'); geen percentage (bronnen verschillen: zie twijfels).
- **H2:** oefenvoorbeeld (verzonnen): boven `GATCCTAGTTACGCA` + één extra letter → `GATCCATAGTTACGCA` (16), onder `GATCCTAGTTACGGA` (15). Met gat onder op plek 6: `GATCC-TAGTTACGGA` → 14 gelijk, 1 verschil (C/G op plek 15), 1 gat → 12. (Nagerekend met een scriptje; zonder gat kloppen na plek 5 alleen plek 10 en 14.)
- **H3:** woordjes van 11; resultatenlijst (grote modderkruiper 100%; twee andere vissen met lagere getallen, géén precieze percentages en geen soortnamen tot de verwantschap met een bron is vastgelegd); kaartje met drie andere herkomsten van eDNA.
- **H4:** scherm `vertaal.py` met dezelfde zes regels als variant. Eerste run met `gen` die bij de tweede letter begint (`TGGCCCTGTGGATGCGCC` → `WPCGCA`, koraal; gecontroleerd met de standaardcode), tweede run `MALWMR`.
- **Recap:** sloot; vier schermpjes; opleidingskaartjes als in A.
