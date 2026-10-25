# Zoeken in DNA: databanken, BLAST en een beetje Python — script v2 (25 okt 2026, definitief voor inspreken, behalve de opleidingenzin)

Wat word jij? · Bio-informatica (film 1), havo/vwo bovenbouw, hbo/wo-oriëntatie, één niveau. Voice Roos (eleven_v4). Look: Schema met cast (Sam, 16, meeloopweek, outfit gewoon; Dr. Kim, onderzoeker bio-informatica en zijn begeleider, outfit gewoon), reeksobject *scherm met code / sequenties* (zie `brief.md`), één Micro-zoom op twee DNA-strengen bij het gat. Bouwt voort op Wat is DNA?, De genetische code lezen, Mutaties (deletie) en DNA lezen. Getallen: `getallen.md`; bronnenlogboek: `bronnen.md`.
v2 = v1 na `reviews/review_v1.md` (alle MOET-punten; KAN-punten zie 'Definitieve tekst' in `brief.md`) en de aanvullingen van de hoofdsessie (gen zonder introns, code die echt draait, geen T → U, uitlijnen 'twee of meer').
Vraagsegment: de alinea direct boven een `[VRAAG]` is de vraagzin (q-segment) en valt bij Vragen uit weg; de vertelling ervoor eindigt telkens op een gewone zin.

---

## Cold open
[Schema: werkplek van de afdeling, ochtend; op het bureau van Kim een leeg sushibakje met het etiket 'blauwvintonijn' in goud omlijnd en een buisje met een nummer; Sam komt binnen en gaat naast Kim zitten]
Sam loopt een week mee bij de afdeling bio-informatica. Gisteren at hij sushi met zijn begeleider, Dr. Kim. Op het bakje stond: blauwvintonijn. Kim liet een stukje onderzoeken.

[Schema: het scherm met een lange rij gekleurde lettertegels die naar rechts uit beeld loopt; teller in Meta 'ongeveer 650 letters']
Nu staat het DNA op haar scherm. Ongeveer zeshonderdvijftig letters.

Welke vis is het?

## Titel
Zoeken in DNA

## Hoofdstuk 1 — Databanken
Hoofdstukkaart: Waar vergelijk je een onbekend stukje DNA mee?

[Schema: het scherm; boven de rij letters een label 'DNA-barcode · stuk van één gen in de mitochondriën'; ernaast drie kleine silhouetten (vis, vogel, kever) met elk een eigen streepjescode in paarse tinten]
Het lab heeft een vast stukje DNA gelezen. Zo'n volgorde van basen in een stuk DNA heet een sequentie. Deze komt uit één gen in de mitochondriën. Bij de meeste dieren verschilt dat stukje net iets van soort tot soort. Daarom heet het een DNA-barcode. Hoe het lab DNA leest, zag je in de film DNA lezen. Een barcode zegt pas iets als je hem kunt vergelijken.

[Schema: de barcode alleen op het scherm, daarnaast een vraagteken; Sam kijkt vragend naar Kim]
Waar staan de sequenties van bekende soorten? Wat denk je?
[VRAAG] (a) in openbare databanken, waarin iedereen mag zoeken · (b) bij de keuringsdienst, alleen voor eigen onderzoekers · (c) bij elk lab apart, in een eigen verzameling

[Schema: drie databank-iconen (Amerika, Europa, Japan) op één baseline, met teal pijlen ertussen en een klokje 'elke dag'; daaronder een teller die oploopt 'miljarden sequenties · meer dan een half miljoen soorten']
Antwoord a. Onderzoekers over de hele wereld zetten hun sequenties in openbare databanken. De drie grote databanken staan in Amerika, Europa en Japan. Ze delen elke dag wat er nieuw is. Samen hebben ze miljarden sequenties, van meer dan een half miljoen soorten. Iedereen mag erin zoeken, gratis.

[Schema: inzoomen op één regel van de databank in het scherm: soortnaam 'Thunnus albacares · geelvintonijn', gen 'COI', wie hem las, en de sequentie als lettertegels]
Bij elke sequentie staat wat erover bekend is: de soort, het gen, wie hem las. Dus: je zoekt de sequentie die het meest op de jouwe lijkt.

## Hoofdstuk 2 — Uitlijnen
Hoofdstukkaart: Hoe zie je of twee sequenties op elkaar lijken?

[Schema: het scherm met twee rijen van zestien en zeventien lettertegels onder elkaar, bovenaan 'stukje 1', onderaan 'stukje 2'; label 'oefenvoorbeeld'; tussen de rijen verschijnen streepjes bij gelijke letters; na de vierde letter bijna alleen koraal omlijnde tegels]
Eerst laat Kim zien hoe vergelijken werkt, met twee korte oefenstukjes. Sam legt ze onder elkaar, letter voor letter. De eerste vier letters zijn gelijk. Daarna klopt bijna niets meer.

Wat is er aan de hand? Wat denk je?
[VRAAG] (a) het tweede stukje is van een andere soort, dus alles verschilt · (b) er mist één letter, dus alles erna schuift op · (c) het lab heeft vanaf daar een ander gen gelezen

[Schema → Micro: zoomcirkel met twee aparte dubbele DNA-strengen boven elkaar (stukje 1 en stukje 2, paarse basen uit de DNA-reeks); in stukje 1 ontbreekt na de vierde plek één heel basenpaar en schuift de rest één plek op; terug naar het scherm: in de bovenste rij komt een leeg, gestippeld vakje met een streepje, alles erna schuift één tegel naar rechts; de streepjes tussen de rijen lichten groen op]
Antwoord b. In het bovenste stukje ontbreekt na de vierde letter één letter. Dat kan een echte deletie zijn, of een leesfout. Alles erna staat één plek verschoven. Sam zet daar een gat: een streepje. Nu staan bijna alle gelijke letters weer onder elkaar. Dat heet uitlijnen. Je legt twee of meer sequenties onder elkaar. Zo dat zoveel mogelijk gelijke letters onder elkaar staan. Met gaten waar een stukje ontbreekt of extra is.

[Schema: de uitlijning met een scoreregel eronder; bij elke kolom een getal +1 (groen), −1 (koraal) of −1 (gat); de som op het scherm: 15 − 1 − 1 = 13; daarna ernaast klein hetzelfde paar zonder gat met score −4]
Hoe goed past het? Dat druk je uit in een score. Een gelijke letter is plus één. Een andere letter is min één. Een gat is ook min één. Hier zijn vijftien letters gelijk, één is anders, en er is één gat. Vijftien min één min één is dertien. Zonder gat was het min vier.

[Schema: de score 13 met een groene annotatiehaak 'hoe hoger, hoe beter']
Hoe hoger de score, hoe beter de sequenties passen. Echte programma's geven andere punten, maar het idee is hetzelfde. En zo'n rekenregel kan een computer razendsnel uitvoeren.

## Hoofdstuk 3 — BLAST
Hoofdstukkaart: Hoe zoek je snel door miljarden sequenties?

[Schema: de sushi-barcode links; rechts een enorme stapel databankregels die naar boven uit beeld loopt; Sam fronst]
Eén uitlijning is zo klaar. Maar de databank heeft miljarden sequenties. Toch geeft het zoekprogramma BLAST vaak al na korte tijd antwoord.

Hoe kan dat zo snel? Wat denk je?
[VRAAG] (a) het lijnt alles helemaal uit, op heel veel computers tegelijk · (b) het zoekt alleen tussen de vissen, de rest slaat het over · (c) het zoekt eerst korte stukjes, en kijkt alleen daar verder

[Schema: de barcode valt uiteen in woordjes van achtentwintig tegels (goud omlijnd); in de stapel lichten maar een paar regels op waar zo'n woordje precies voorkomt; de rest dimt naar 35%; op één oplichtende regel groeit de uitlijning vanuit het woordje naar links en naar rechts, de score loopt mee en stopt waar de letters niet meer passen]
Antwoord c. BLAST knipt de barcode in woordjes van achtentwintig letters. Dan zoekt het waar precies zo'n woordje voorkomt. Zo'n lang woordje vind je bijna nooit toevallig. Aan bijna alle sequenties begint BLAST dus niet eens. Alleen waar een woordje past, lijnt het verder uit. Naar links en naar rechts, zolang de score goed blijft.

[Schema: de resultatenlijst op het scherm, drie regels: geelvintonijn 100% (groen), daaronder twee andere tonijnsoorten met een iets lager percentage; per regel een kolom 'toeval' met 'bijna 0'; label in Meta 'voorbeeld']
Dan de uitslag. Naast elke treffer staat hoeveel zulke treffers je puur door toeval zou vinden. Bij alle drie is dat bijna nul. Het is dus zeker tonijn. Welke tonijn, zie je aan het procent gelijk. Tonijnsoorten verschillen in deze barcode maar in weinig letters. Bovenaan staat geelvintonijn: honderd procent gelijk. 'Geelvin!' roept Sam.

[Schema: Sam met opgestoken armen; Kim met een vinger op; vraagkaartje]
Is Sam nu klaar? Wat denk je?
[VRAAG] (a) ja: bij honderd procent gelijk is de soort altijd zeker · (b) nee: de databank kan een fout bevatten, dus Kim kijkt verder · (c) nee: honderd procent kan alleen bij DNA van dezelfde vis

[Schema: een databankregel met een verkeerd naamkaartje wordt koraal omlijnd; daarna drie treffers uit verschillende bronnen naast elkaar; inzet: een tweede, korter stukje DNA naast de barcode]
Antwoord b. Een databank is zo goed als wat mensen erin zetten. Staat een vis onder de verkeerde naam, dan krijg je een verkeerde treffer. Dus vergelijkt Kim meerdere treffers, uit betrouwbare bronnen. Bij tonijn kijkt een lab soms ook nog naar een tweede stukje DNA.

## Hoofdstuk 4 — Zelf programmeren
Hoofdstukkaart: Hoe laat je een computer een gen vertalen?

[Schema: links een herinnering aan De genetische code lezen: codontabel en een hand die per drie letters aanwijst; rechts het lege scherm met een knipperende gouden cursor en het tabblad 'vertaal.py'; boven het scherm het label 'mRNA van insuline · zonder introns']
Na de lunch zet Kim het begin van het mRNA voor insuline op het scherm. Dat is het recept zonder introns. In De genetische code lezen vertaalde je zo'n recept met de hand. Sam laat de computer het doen, met een paar regels Python. Dat is een programmeertaal.

[Schema: het scherm met zeven regels code die één voor één verschijnen (zie Beelden per hoofdstuk); de regel die op dat moment wordt beschreven licht goud op; de rest op 35%]
Eerst krijgt de computer de codontabel, als een woordenboek: bij elk codon één aminozuur. Dan loopt hij in stappen van drie door het mRNA. Elk codon zoekt hij op, en het aminozuur plakt hij achter de keten.

[Schema: eerste run: de cursor staat één tegel te ver; onder de code zes koraal omlijnde kralen W, P, C, G, C, A; de cursor springt terug; tweede run: zes okerkralen M, A, L, W, M, R, bij de eerste het label 'M · methionine']
De eerste poging van Sam begint één letter te laat. Dan leest de computer andere drietallen: verkeerde aminozuren. Net als met de hand. Na de verbetering staan er zes aminozuren, elk met een eigen lettercode. M is methionine: daar begint de vertaling. Daarna komen alanine, leucine en tryptofaan.

[Schema: het hele recept als een lange rij tegels die ver uit beeld loopt; teller in Meta 'ruim 300 letters'; de code staat erboven, gedimd]
Het deel van het recept dat codeert, is veel langer dan deze achttien letters: ruim driehonderd.

Wat moet Sam aan zijn code veranderen? Wat denk je?
[VRAAG] (a) niets: dezelfde regels werken voor elke lengte · (b) voor elk extra codon een extra regel code · (c) een regel die zegt hoe lang het recept is

[Schema: de code (nu duidelijk ongewijzigd, op volle sterkte) draait opnieuw; de regel met de stap van drie licht op; de kralenketting groeit razendsnel uit beeld; daarna een rij van honderd kleine recepten die tegelijk vertaald worden]
Antwoord a. De stap van drie herhaalt zich vanzelf, tot het recept op is. De lengte meet de code zelf. Zo vertaal je duizend recepten net zo makkelijk als één. Maar de computer doet alleen wat er staat. Waar hij moet beginnen, moet Sam zelf goed zetten.

## Recap
[Schema: terug bij het bureau; het sushibakje met het etiket 'blauwvintonijn'; daarnaast de vier stappen als kleine schermpjes: barcode, databank, uitlijning, resultatenlijst met 'geelvintonijn 100%' in groen]
Welke vis zat er in de sushi? De barcode uit het lab ging naar een openbare databank. BLAST zocht eerst lange woordjes die precies passen, en lijnde alleen daar verder uit. Bovenaan stond geelvintonijn: honderd procent gelijk, en geen toeval. Dus niet de duurdere blauwvintonijn van het bakje. Of het restaurant dat wist, zegt het DNA niet.

[Schema: Kim en Sam ruimen het bureau op; boven hen drie kleine iconen met een vinkje: 'koos wat te zoeken', 'controleerde de treffer' (Kim), 'schreef de code' (Sam)]
In 2017 liet het tv-programma Radar tonijn testen in een-en-twintig Nederlandse restaurants. Twintig keer was het geelvintonijn, ook als het restaurant blauwvin zei. De computer was razendsnel. Maar mensen bedachten wat er gezocht moest worden. Kim controleerde of de treffer klopte. Sam schreef de code. Dat samen is bio-informatica.

[Schema: twee opleidingskaartjes en drie werkplekken als lijniconen (ziekenhuis, onderzoeksinstituut, bedrijf)]
Dit werk leer je bijvoorbeeld bij de hbo-opleiding Bio-informatica in Nijmegen: vier jaar. Of je doet eerst een bachelor als biologie of moleculaire levenswetenschappen in Nijmegen, en daarna de master Bioinformatics in Wageningen. Je werkt dan in een ziekenhuis, een onderzoeksinstituut of een bedrijf. Programmeren leer je al in het eerste jaar.

## Eindkaart
Openbare databanken: miljarden sequenties, iedereen mag erin zoeken.
Uitlijnen: gelijke letters onder elkaar, gaten waar een stukje mist; een score zegt hoe goed het past.
BLAST: eerst lange woordjes opzoeken die precies passen, alleen daar verder uitlijnen.
Een treffer: procent gelijk, hoeveel treffers je door toeval zou vinden, en meerdere bronnen.
Een paar regels code vertalen elk recept, als het beginpunt klopt.

---

## Beelden per hoofdstuk
Antwoordletters: a · b · c · b · a.
- **Cold open (Schema):** ochtend, één dag (de sushi was gisteren: lost de tijdsprong op, reeksbrief 'elke film is één dag'). Sam (outfit gewoon) en Kim (outfit gewoon, naam en 'onderzoeker bio-informatica' bij haar); leeg sushibakje met etiket 'blauwvintonijn'; buisje met nummer. Daarna het scherm met de barcode als lettertegels (rij loopt uit beeld; teller 'ongeveer 650').
- **H1 (Schema):** barcode met label; drie silhouetten met eigen streepjescode (Macro-bibliotheek, alleen als icoon). Drie databank-iconen op één baseline (in Meta eventueel GENBANK · ENA · DDBJ), teal pijlen, klokje. Databankregel met soort, gen, indiener, sequentie.
- **H2 (Schema → Micro → Schema):** oefenvoorbeeld, níet de tonijn. Stukje 1 `ACCTAGGACTTCAGTA` (16), stukje 2 `ACCTCAGGACTTGAGTA` (17). Eerst zonder gat: 6 gelijk, 10 anders (score −4; nagerekend). Micro: twee aparte dubbele strengen; in stukje 1 mist één heel basenpaar (beide strengen), de rest schuift op. Met gat: `ACCT-AGGACTTCAGTA` / `ACCTCAGGACTTGAGTA` → 15 gelijk, 1 anders (plek 13), 1 gat → 13 (ook het optimum voor dit paar, review). Scoreregel en som op het scherm.
- **H3 (Schema):** stapel databankregels; woordjes van 28 tegels; een paar oplichtende regels; uitbreiden met meelopende score. Resultatenlijst met drie regels, kolommen 'gelijk' en 'toeval' (alle drie 'bijna 0'), Meta-label 'voorbeeld'. Vraagkaart; daarna verkeerd naamkaartje koraal, drie treffers uit verschillende bronnen, inzet tweede stukje DNA (zonder naam van het gen).
- **H4 (Schema):** codontabel en hand (verwijzing DNA 4); label 'mRNA van insuline · zonder introns'; scherm `vertaal.py` (precies dit staat in beeld en draait in echte Python; zelf gedraaid: `MALWMR`):
  ```
  code = {"AUG": "M", "GCC": "A", "CUG": "L", "UGG": "W", "CGC": "R",
          "CCC": "P", "UGU": "C", "GGA": "G", "UGC": "C"}   # in het echt: alle 64
  mrna = "AUGGCCCUGUGGAUGCGC"
  eiwit = ""
  for i in range(0, len(mrna), 3):
      eiwit = eiwit + code[mrna[i:i+3]]
  print(eiwit)
  ```
  Eerste run met `mrna = "UGGCCCUGUGGAUGCGCC"` (één letter te laat) → `WPCGCA` in koraal omlijnde kralen (zelf gedraaid met dezelfde code; daarom staan P, C en G ook in de tabel). Tweede run `MALWMR` als zes okerkralen. Bij 'ruim 300 letters' gebruikt de bouw de volledige tabel met de drie stopcodons als `"*"` (het coderende deel is 333 letters, deelbaar door drie). Geen T → U-regel in de code: Kim geeft het mRNA zelf (botst niet met de havo-route van DNA 4). `len(mrna)`: de code meet de lengte zelf (in beeld, niet gezegd; optie c is daarmee de afleider).
- **Recap:** bakje met etiket, vier mini-schermpjes; drie vinkjes voor wat de mensen deden; opleidingskaartjes (hbo Bio-informatica · HAN Nijmegen, vier jaar; bachelor Biologie of Moleculaire Levenswetenschappen · Radboud Nijmegen → master Bioinformatics and Systems Biology · Wageningen, twee jaar, Engelstalig) en drie werkplekken.
