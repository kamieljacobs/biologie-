# Variant X

## Cold open
[Schema: werkplek van de afdeling, lunchtijd; Sam en Dr. Kim aan een bureau met twee sushibakjes; etiket op het bakje 'blauwvintonijn' in goud omlijnd; Kim legt een stukje vis in een buisje met een nummer]
Sam loopt een week mee bij de afdeling bio-informatica. Bij de lunch eet hij sushi met zijn begeleider, Dr. Kim. Op het bakje staat: blauwvintonijn. Kim stuurt een stukje naar het lab.

[Schema: de volgende ochtend; het scherm met een lange rij gekleurde lettertegels die naar rechts uit beeld loopt; teller in Meta '650 letters']
Vandaag staat het DNA op haar scherm. Ongeveer zeshonderdvijftig letters, van een onbekende vis. Welke vis is het?

## Titel
Zoeken in DNA

## Hoofdstuk 1 — Databanken
Hoofdstukkaart: Waar vergelijk je een onbekend stukje DNA mee?

[Schema: het scherm; boven de rij letters een label 'DNA-barcode · stuk van één gen in de mitochondriën'; ernaast drie kleine silhouetten (vis, vogel, kever) met elk een eigen streepjescode in paarse tinten]
Het lab heeft een vast stukje DNA gelezen. Het is een stuk van één gen in de mitochondriën. Bij de meeste dieren verschilt dat stukje net iets van soort tot soort. Daarom heet het een DNA-barcode. Hoe het lab DNA leest, zag je in de film DNA lezen.

[Schema: de barcode alleen op het scherm, daarnaast een vraagteken; Sam kijkt vragend naar Kim]
Maar een barcode zegt pas iets als je hem kunt vergelijken. Waar staan de sequenties van bekende soorten? Wat denk je?
[VRAAG] (a) in een databank van de keuringsdienst, die geheim is · (b) in een openbare databank, waarin iedereen zoekt · (c) nergens samen: elk lab bewaart zijn eigen DNA

[Schema: drie databank-iconen (Amerika, Europa, Japan) op één baseline, met teal pijlen ertussen en een klokje 'elke dag'; daaronder een teller die oploopt 'miljarden sequenties · meer dan een half miljoen soorten']
Antwoord b. Onderzoekers over de hele wereld zetten hun sequenties in openbare databanken. De drie grote databanken staan in Amerika, Europa en Japan. Ze wisselen elke dag alles uit. Samen hebben ze miljarden sequenties, van meer dan een half miljoen soorten. Iedereen mag erin zoeken, gratis.

[Schema: inzoomen op één regel van de databank in het scherm: soortnaam 'Thunnus albacares · geelvintonijn', gen 'COI', wie hem las, en de sequentie als lettertegels]
Bij elke sequentie staat wat erover bekend is. Van welke soort hij is, welk gen het is, en wie hem gelezen heeft. Een sequentie is de volgorde van basen in een stuk DNA. Dus: je zoekt de sequentie die het meest op de jouwe lijkt.

## Hoofdstuk 2 — Uitlijnen
Hoofdstukkaart: Hoe zie je of twee sequenties op elkaar lijken?

[Schema: het scherm met twee rijen van zestien en zeventien lettertegels onder elkaar, bovenaan 'stukje 1', onderaan 'stukje 2'; tussen de rijen verschijnen streepjes bij gelijke letters; na de vierde letter bijna alleen koraal omlijnde tegels; label 'voorbeeld, vereenvoudigd']
Eerst laat Kim zien hoe vergelijken werkt, met twee korte oefenstukjes. Sam legt ze onder elkaar, letter voor letter. De eerste vier letters zijn gelijk. Daarna klopt bijna niets meer. Wat is er aan de hand? Wat denk je?
[VRAAG] (a) er mist één letter, dus alles schuift op · (b) het tweede stukje is van een heel andere soort · (c) het lab las die letters achterstevoren

[Schema → Micro: zoomcirkel op de plek na de vierde letter: dubbele DNA-streng waarin tegenover één base niets zit; terug naar het scherm: in de bovenste rij schuift alles één tegel naar rechts en er komt een leeg, gestippeld vakje met een streepje; de streepjes tussen de rijen lichten groen op]
Antwoord a. In het bovenste stukje ontbreekt op die plek één letter. Dat kan een echte deletie zijn, of een leesfout. Alles erna staat één plek verschoven. Sam zet daar een gat: een streepje. Nu staan bijna alle gelijke letters weer onder elkaar. Dat heet uitlijnen: twee sequenties zo naast elkaar leggen dat zoveel mogelijk gelijke letters onder elkaar staan. Met gaten waar een stukje ontbreekt of extra is.

[Schema: de uitlijning met een scoreregel eronder; bij elke kolom een getal +1 (groen), −1 (koraal) of −1 (gat); de som op het scherm: 15 − 1 − 1 = 13]
Hoe goed past het? Dat druk je uit in een score. Een gelijke letter is plus één. Een andere letter is min één. Een gat is ook min één. Hier zijn vijftien letters gelijk, één is anders, en er is één gat. Vijftien min één min één is dertien.

[Schema: twee kleine uitlijningen naast elkaar op één baseline, score 13 en score 2; de hoogste krijgt een groene annotatiehaak]
Hoe hoger de score, hoe beter de sequenties passen. Echte programma's geven andere punten, maar het idee is hetzelfde. En zo'n rekenregel kan een computer razendsnel uitvoeren.

## Hoofdstuk 3 — BLAST
Hoofdstukkaart: Hoe zoek je in seconden door miljarden sequenties?

[Schema: de sushi-barcode links; rechts een enorme stapel databankregels die naar boven uit beeld loopt; Sam fronst]
Eén uitlijning is zo klaar. Maar de databank heeft miljarden sequenties. Toch heeft het zoekprogramma BLAST vaak binnen een paar minuten antwoord, soms in seconden. Hoe kan dat zo snel? Wat denk je?
[VRAAG] (a) het lijnt de barcode helemaal uit met elke sequentie · (b) het zoekt eerst korte stukjes, en kijkt alleen daar verder · (c) het zoekt alleen tussen de vissen in de databank

[Schema: de barcode valt uiteen in korte woordjes van elf tegels (goud omlijnd); in de stapel lichten alleen een paar regels op waar zo'n woordje precies voorkomt; de rest dimt naar 35%]
Antwoord b. BLAST knipt de barcode in korte woordjes, bijvoorbeeld van elf letters. Dan zoekt het in de databank waar precies zo'n woordje voorkomt. Dat zijn maar een paar plekken. Alle andere sequenties slaat het over.

[Schema: op één oplichtende regel groeit de uitlijning vanuit het woordje naar links en naar rechts; de score loopt mee op en stopt waar de letters niet meer passen; inzet: een dik boek met een register achterin]
Op die plekken lijnt BLAST verder uit. Naar links en naar rechts, zolang de score goed blijft. Zo zoek je ook in een dik boek. Je kijkt eerst in het register, en leest alleen de bladzijden die je nodig hebt.

[Schema: de resultatenlijst op het scherm, drie regels: geelvintonijn 100% (groen), daaronder twee andere tonijnsoorten met een iets lager percentage; per regel een kolom 'toeval' met een getal heel dicht bij nul]
Dan de uitslag. Bovenaan staat geelvintonijn: honderd procent gelijk. Daaronder staan andere tonijnsoorten, met bijna net zoveel letters gelijk. Tonijnsoorten verschillen in deze barcode maar in weinig letters. Elke letter telt dus.

[Schema: de kolom 'toeval' groot; ernaast een kaartje 'verwacht door toeval: bijna 0'; daarna een databankregel met een verkeerd naamkaartje dat koraal omlijnd wordt]
Naast elke treffer staat nog een getal. Het zegt hoeveel zulke treffers je puur door toeval zou vinden. Hier is dat bijna nul. Toch kijkt Kim verder dan de bovenste regel. Een databank is zo goed als wat mensen erin zetten. Staat een vis onder de verkeerde naam, dan krijg je een verkeerde treffer. Dus vergelijkt ze meerdere treffers, uit betrouwbare bronnen.

## Hoofdstuk 4 — Zelf programmeren
Hoofdstukkaart: Hoe laat je een computer een gen vertalen?

[Schema: links een herinnering aan De genetische code lezen: codontabel en een hand die per drie letters aanwijst; rechts het lege scherm met een knipperende gouden cursor en het tabblad 'vertaal.py']
Na de lunch krijgt Sam een opdracht. Kim zet het begin van een menselijk gen op het scherm: het gen voor insuline. In De genetische code lezen vertaalde je zo'n gen met de hand. Nu laat Sam de computer het doen, met een paar regels Python. Python is een programmeertaal.

[Schema: het scherm met zes regels code die één voor één verschijnen (zie Beelden per hoofdstuk); de regel die op dat moment wordt beschreven licht goud op; de rest op 35%]
Eerst krijgt de computer de codontabel, als een woordenboek: bij elk codon één aminozuur. In een databank staat een gen als DNA: met T in plaats van U. Dus zet de computer elke T om in een U. Daarna loopt hij in stappen van drie door het gen. Elk codon zoekt hij op, en het aminozuur plakt hij achter de keten.

[Schema: onder de code verschijnt de uitkomst als zes okerkleurige kralen met een letter erop (M, A, L, W, M, R); bij de eerste kraal het label 'M · methionine']
Op het scherm verschijnt een rij letters. Elk aminozuur krijgt in de computer één letter. M is methionine: daar begint de vertaling. Daarna komen alanine, leucine en tryptofaan.

[Schema: het insulinegen als een lange rij tegels die ver uit beeld loopt; de zes regels code blijven ongewijzigd staan]
Het echte insulinegen is veel langer dan deze achttien letters. Wat moet Sam aan zijn code veranderen? Wat denk je?
[VRAAG] (a) voor elk extra codon een extra regel code · (b) een snellere computer, anders duurt het dagen · (c) niets: dezelfde regels werken voor elke lengte

[Schema: de code draait opnieuw, de kralenketting groeit razendsnel uit beeld; daarna een rij van honderd kleine genen die tegelijk vertaald worden; inzet: één tegel te ver naar rechts geschoven en een rij koraal omlijnde, verkeerde kralen]
Antwoord c. Aan de code hoeft niets te veranderen. De stap van drie herhaalt zich vanzelf, tot het gen op is. Zo vertaal je duizend genen net zo makkelijk als één. Maar de computer doet precies wat er staat. Begint Sam één letter te laat, dan leest hij verkeerde codons. Net als met de hand.

## Recap
[Schema: terug bij het bureau; het sushibakje met het etiket 'blauwvintonijn'; daarnaast de vier stappen als kleine schermpjes: barcode, databank, uitlijning, resultatenlijst met 'geelvintonijn 100%' in groen]
Welke vis zat er in de sushi? De barcode uit het lab ging naar een openbare databank. BLAST zocht eerst korte woordjes, en lijnde alleen daar verder uit. Bovenaan stond geelvintonijn: honderd procent gelijk, en geen toeval. Dus niet de duurdere blauwvintonijn van het bakje. Of het restaurant dat wist, zegt het DNA niet.

[Schema: Kim en Sam ruimen de lunch op; Sam kijkt naar zijn scherm met de zes regels code]
In 2017 lieten journalisten tonijn testen in een-en-twintig Nederlandse restaurants. Twintig keer was het geelvintonijn. Met DNA en de computer uitzoeken wat er echt in een monster zit: dat is bio-informatica.

[Schema: twee opleidingskaartjes en drie werkplekken als lijniconen (ziekenhuis, onderzoeksinstituut, bedrijf)]
Dit werk leer je bijvoorbeeld bij de hbo-opleiding Bio-informatica in Nijmegen: vier jaar. Of je doet eerst een bachelor als biologie. Daarna volgt een master bio-informatica, bijvoorbeeld in Wageningen. Je werkt dan in een ziekenhuis, een onderzoeksinstituut of een bedrijf. En programmeren leer je daar al in het eerste jaar.

## Eindkaart
Openbare databanken: miljarden sequenties, iedereen mag erin zoeken.
Uitlijnen: gelijke letters onder elkaar, gaten waar een stukje mist; een score zegt hoe goed het past.
BLAST: eerst korte woordjes opzoeken, alleen daar verder uitlijnen.
Een treffer: hoeveel procent gelijk, en hoeveel je door toeval zou verwachten.
Een paar regels code vertalen elk gen, hoe lang ook.

---

## Beelden per hoofdstuk
Antwoordletters: b · a · b · c.
- **Cold open (Schema):** werkplek met twee bureaus en een raam; Sam (outfit gewoon) en Kim (outfit gewoon, naam en 'onderzoeker bio-informatica' bij haar) met sushibakjes; etiket 'blauwvintonijn'. Buisje met nummer. Daarna het scherm met de barcode als lettertegels (rij loopt uit beeld; teller 650).
- **H1 (Schema):** barcode met label; drie silhouetten met eigen streepjescode (Macro-bibliotheek, alleen als icoon). Drie databank-iconen op één baseline (geen namen nodig; in Meta eventueel GENBANK · ENA · DDBJ), teal pijlen, klokje. Databankregel met soort, gen, indiener, sequentie.
- **H2 (Schema → Micro → Schema):** oefenvoorbeeld, níet de tonijn (de COI-barcode heeft tussen soorten vrijwel alleen vervangingen, geen gaten). Twee rijen van 16 en 17 tegels. Voorbeeldreeks (verzonnen, label 'oefenvoorbeeld'): stukje 1 `ACCTAGGACTTCAGTA` (16), stukje 2 `ACCTCAGGACTTGAGTA` (17). Eerst zonder gat: 4 gelijk, daarna overwegend koraal. Zoomcirkel op de DNA-streng (paarse basen uit de DNA-reeks) met één ontbrekende nucleotide. Met gat: `ACCT-AGGACTTCAGTA` / `ACCTCAGGACTTGAGTA` → 15 gelijk, 1 anders (C/G op plek 13), 1 gat → 13. Scoreregel en som op het scherm.
- **H3 (Schema):** stapel databankregels; woordjes van 11 tegels; oplichtende regels; uitbreiden met meelopende score; boek met register als kleine inzet. Resultatenlijst met drie regels, kolommen 'gelijk' en 'toeval' (de Engelse vaktermen niet in beeld). Verkeerd naamkaartje als waarschuwing.
- **H4 (Schema):** codontabel en hand (verwijzing DNA 4); scherm `vertaal.py`:
  ```
  code = {"AUG": "M", "GCC": "A", "CUG": "L", ...}   # alle 64 codons
  gen = "ATGGCCCTGTGGATGCGC"
  mrna = gen.replace("T", "U")
  eiwit = ""
  for i in range(0, len(mrna), 3):
      eiwit = eiwit + code[mrna[i:i+3]]
  print(eiwit)
  ```
  Uitkomst `MALWMR` als zes okerkralen (aminozuurkleur van de DNA-reeks). Daarna lange rij, honderd genen, verschoven leesraam in koraal.
- **Recap:** bakje met etiket, vier mini-schermpjes; opleidingskaartjes (hbo Bio-informatica · HAN Nijmegen, vier jaar; bachelor biologie → master Bioinformatics · Wageningen, twee jaar, Engelstalig) en drie werkplekken.
