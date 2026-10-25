# Zoeken in DNA: databanken, BLAST en een beetje Python — script voor de opname (= script_v2.md tot de beeldnotities) (25 okt 2026, definitief voor inspreken, behalve de opleidingenzin)

Gemaakt uit script_v2.md: beeldnotities [Schema: …] en hoofdstukkaarten weggelaten (de minivragen staan in film.py). Tekst verder letterlijk.

---

## Cold open [Schema met cast: werkplek, sushibakje, scherm met barcode]
Sam loopt een week mee bij de afdeling bio-informatica. Gisteren at hij sushi met zijn begeleider, Dr. Kim. Op het bakje stond: blauwvintonijn. Kim liet een stukje onderzoeken.

Nu staat het DNA op haar scherm. Ongeveer zeshonderdvijftig letters.

Welke vis is het?

## Titel
Zoeken in DNA

## Hoofdstuk 1 — Databanken [Schema: scherm met code / sequenties, databanken]

Het lab heeft een vast stukje DNA gelezen. Zo'n volgorde van basen in een stuk DNA heet een sequentie. Deze komt uit één gen in de mitochondriën. Bij de meeste dieren verschilt dat stukje net iets van soort tot soort. Daarom heet het een DNA-barcode. Hoe het lab DNA leest, zag je in de film DNA lezen. Een barcode zegt pas iets als je hem kunt vergelijken.

Waar staan de sequenties van bekende soorten? Wat denk je?
[VRAAG] (a) in openbare databanken, waarin iedereen mag zoeken · (b) bij de keuringsdienst, alleen voor eigen onderzoekers · (c) bij elk lab apart, in een eigen verzameling

Antwoord a. Onderzoekers over de hele wereld zetten hun sequenties in openbare databanken. De drie grote databanken staan in Amerika, Europa en Japan. Ze delen elke dag wat er nieuw is. Samen hebben ze miljarden sequenties, van meer dan een half miljoen soorten. Iedereen mag erin zoeken, gratis.

Bij elke sequentie staat wat erover bekend is: de soort, het gen, wie hem las. Dus: je zoekt de sequentie die het meest op de jouwe lijkt.

## Hoofdstuk 2 — Uitlijnen [Schema → Micro (zoomcirkel): uitlijnen met oefenvoorbeeld, twee DNA-strengen bij het gat]

Eerst laat Kim zien hoe vergelijken werkt, met twee korte oefenstukjes. Sam legt ze onder elkaar, letter voor letter. De eerste vier letters zijn gelijk. Daarna klopt bijna niets meer.

Wat is er aan de hand? Wat denk je?
[VRAAG] (a) het tweede stukje is van een andere soort, dus alles verschilt · (b) er mist één letter, dus alles erna schuift op · (c) het lab heeft vanaf daar een ander gen gelezen

Antwoord b. In het bovenste stukje ontbreekt na de vierde letter één letter. Dat kan een echte deletie zijn, of een leesfout. Alles erna staat één plek verschoven. Sam zet daar een gat: een streepje. Nu staan bijna alle gelijke letters weer onder elkaar. Dat heet uitlijnen. Je legt twee of meer sequenties onder elkaar. Zo dat zoveel mogelijk gelijke letters onder elkaar staan. Met gaten waar een stukje ontbreekt of extra is.

Hoe goed past het? Dat druk je uit in een score. Een gelijke letter is plus één. Een andere letter is min één. Een gat is ook min één. Hier zijn vijftien letters gelijk, één is anders, en er is één gat. Vijftien min één min één is dertien. Zonder gat was het min vier.

Hoe hoger de score, hoe beter de sequenties passen. Echte programma's geven andere punten, maar het idee is hetzelfde. En zo'n rekenregel kan een computer razendsnel uitvoeren.

## Hoofdstuk 3 — BLAST [Schema: woordjes, stapel databankregels, resultatenlijst]

Eén uitlijning is zo klaar. Maar de databank heeft miljarden sequenties. Toch geeft het zoekprogramma BLAST vaak al na korte tijd antwoord.

Hoe kan dat zo snel? Wat denk je?
[VRAAG] (a) het lijnt alles helemaal uit, op heel veel computers tegelijk · (b) het zoekt alleen tussen de vissen, de rest slaat het over · (c) het zoekt eerst korte stukjes, en kijkt alleen daar verder

Antwoord c. BLAST knipt de barcode in woordjes van achtentwintig letters. Dan zoekt het waar precies zo'n woordje voorkomt. Zo'n lang woordje vind je bijna nooit toevallig. Aan bijna alle sequenties begint BLAST dus niet eens. Alleen waar een woordje past, lijnt het verder uit. Naar links en naar rechts, zolang de score goed blijft.

Dan de uitslag. Naast elke treffer staat hoeveel zulke treffers je puur door toeval zou vinden. Bij alle drie is dat bijna nul. Het is dus zeker tonijn. Welke tonijn, zie je aan het procent gelijk. Tonijnsoorten verschillen in deze barcode maar in weinig letters. Bovenaan staat geelvintonijn: honderd procent gelijk. 'Geelvin!' roept Sam.

Is Sam nu klaar? Wat denk je?
[VRAAG] (a) ja: bij honderd procent gelijk is de soort altijd zeker · (b) nee: de databank kan een fout bevatten, dus Kim kijkt verder · (c) nee: honderd procent kan alleen bij DNA van dezelfde vis

Antwoord b. Een databank is zo goed als wat mensen erin zetten. Staat een vis onder de verkeerde naam, dan krijg je een verkeerde treffer. Dus vergelijkt Kim meerdere treffers, uit betrouwbare bronnen. Bij tonijn kijkt een lab soms ook nog naar een tweede stukje DNA.

## Hoofdstuk 4 — Zelf programmeren [Schema: scherm vertaal.py, aminozuurkralen]

Na de lunch zet Kim het begin van het mRNA voor insuline op het scherm. Dat is het recept zonder introns. In De genetische code lezen vertaalde je zo'n recept met de hand. Sam laat de computer het doen, met een paar regels Python. Dat is een programmeertaal.

Eerst krijgt de computer de codontabel, als een woordenboek: bij elk codon één aminozuur. Dan loopt hij in stappen van drie door het mRNA. Elk codon zoekt hij op, en het aminozuur plakt hij achter de keten.

De eerste poging van Sam begint één letter te laat. Dan leest de computer andere drietallen: verkeerde aminozuren. Net als met de hand. Na de verbetering staan er zes aminozuren, elk met een eigen lettercode. M is methionine: daar begint de vertaling. Daarna komen alanine, leucine en tryptofaan.

Het deel van het recept dat codeert, is veel langer dan deze achttien letters: ruim driehonderd.

Wat moet Sam aan zijn code veranderen? Wat denk je?
[VRAAG] (a) niets: dezelfde regels werken voor elke lengte · (b) voor elk extra codon een extra regel code · (c) een regel die zegt hoe lang het recept is

Antwoord a. De stap van drie herhaalt zich vanzelf, tot het recept op is. De lengte meet de code zelf. Zo vertaal je duizend recepten net zo makkelijk als één. Maar de computer doet alleen wat er staat. Waar hij moet beginnen, moet Sam zelf goed zetten.

## Recap [Schema met cast: bureau, vier mini-schermpjes, opleidingen]
Welke vis zat er in de sushi? De barcode uit het lab ging naar een openbare databank. BLAST zocht eerst lange woordjes die precies passen, en lijnde alleen daar verder uit. Bovenaan stond geelvintonijn: honderd procent gelijk, en geen toeval. Dus niet de duurdere blauwvintonijn van het bakje. Of het restaurant dat wist, zegt het DNA niet.

In 2017 liet het tv-programma Radar tonijn testen in een-en-twintig Nederlandse restaurants. Twintig keer was het geelvintonijn, ook als het restaurant blauwvin zei. De computer was razendsnel. Maar mensen bedachten wat er gezocht moest worden. Kim controleerde of de treffer klopte. Sam schreef de code. Dat samen is bio-informatica.

Dit werk leer je bijvoorbeeld bij de hbo-opleiding Bio-informatica in Nijmegen: vier jaar. Of je doet eerst een bachelor als biologie of moleculaire levenswetenschappen in Nijmegen, en daarna de master Bioinformatics in Wageningen. Je werkt dan in een ziekenhuis, een onderzoeksinstituut of een bedrijf. Programmeren leer je al in het eerste jaar.

## Eindkaart
Openbare databanken: miljarden sequenties, iedereen mag erin zoeken.
Uitlijnen: gelijke letters onder elkaar, gaten waar een stukje mist; een score zegt hoe goed het past.
BLAST: eerst lange woordjes opzoeken die precies passen, alleen daar verder uitlijnen.
Een treffer: procent gelijk, hoeveel treffers je door toeval zou vinden, en meerdere bronnen.
Een paar regels code vertalen elk recept, als het beginpunt klopt.
