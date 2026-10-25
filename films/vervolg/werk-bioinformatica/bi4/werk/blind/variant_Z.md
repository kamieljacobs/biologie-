# Variant Z

## Cold open [Schema: Dr. Kims bureau, dag 4 van de meeloopweek; Sam naast haar; op het scherm een regel van ± 30 letters in IBM Plex Mono (begin van een eiwitsequentie), rechts een leeg vak met een vraagteken; daarna Micro-inzet: dezelfde letters als kralenketting die even trilt]
Dit is een eiwit. Of eigenlijk: de volgorde van zijn aminozuren, één letter per aminozuur. In een cel vouwt deze keten zich tot een vaste vorm. Uit de volgorde volgt hoe hij gevouwen is. Maar hoe kan een computer die vorm voorspellen?

## Titel
Van letters naar vorm

## Hoofdstuk 1 — Vorm is functie [Micro → Schema: de kralenketting vouwt tot een kluwen met een holte (goud omrand); naast elkaar twee kaartjes uit eerdere films: enzym met substraat in de holte ('Alles versneld'), antistof-Y die één vorm grijpt ('Antistoffen op maat'); daarna één kraal in de holte die van kleur verandert]
Waarom wil Sam die vorm eigenlijk weten? In Van DNA naar eiwit eindigde het bij een keten van aminozuren. Die keten vouwt zich op tot een eiwitstructuur: de ruimtelijke vorm van het eiwit. Welke vorm, hangt meestal af van de volgorde.

En de vorm bepaalt wat een eiwit kan. Een enzym heeft een holte waar zijn substraat in past. Een antistof grijpt één bepaalde vorm. Dat zag je in Alles versneld en Antistoffen op maat. Stel: op één plek in de holte zit een ander aminozuur. Wat denk je?
[VRAAG] (a) niets: de keten is even lang, dus het eiwit werkt hetzelfde · (b) de holte kan een andere vorm krijgen, en het enzym werkt slechter · (c) het enzym past zijn holte aan, zodat het substraat er weer in past

Antwoord b. Eén ander aminozuur kan de vorm van de holte veranderen, en daarmee de werking. Een eiwit past zich niet aan: het vouwt zoals de volgorde het laat vouwen. Wie de vorm kent, snapt dus wat een eiwit doet. En ziet waar een medicijn zou kunnen aangrijpen.

## Hoofdstuk 2 — Decennia puzzelen [Schema: het natte lab; Dr. Kim (outfit `lab`) laat Sam een kristalplaatje zien met kleine kristallen; zijaanzicht: röntgenbundel door een kristal → stippenpatroon op een plaat → een kluwen verschijnt; jaartal 1958 met 'myoglobine'; daarna een vriezer-icoon en 'cryo-EM: bevroren, zonder kristal'; teller 'PDB ± 250 000 structuren' tegenover 'bekende eiwitten > 200 000 000' als twee balken (niet op schaal); daarna de som 3 × 3 × 3 … = 3¹⁰⁰ ≈ 5 × 10⁴⁷, label 'vereenvoudigd: 3 standen per schakel']
Hoe kom je achter de vorm? Dr. Kim neemt Sam mee naar het lab. Hier meten ze vormen. Het eerste eiwit waarvan iemand de ruimtelijke vorm zag, was myoglobine, in 1958.

De oudste manier: je maakt een kristal van heel veel dezelfde eiwitten, netjes gestapeld. Je stuurt er röntgenstraling doorheen. Dat geeft een patroon van stippen. Daaruit reken je de vorm terug. Maar veel eiwitten willen niet kristalliseren. Het kan jaren werk kosten, met dure apparaten.

Sinds ruim tien jaar gaat het ook met cryo-elektronenmicroscopie. Dan bevries je de eiwitten, en heb je geen kristal nodig. Toch zijn er zo nog maar zo'n kwart miljoen structuren gemeten. Ze staan in een openbare databank, de PDB. Bekende eiwitten zijn er meer dan tweehonderd miljoen. Sam vraagt: kan een computer niet gewoon alle vormen uitproberen? Wat denk je?
[VRAAG] (a) nee: er zijn zoveel vormen dat het nooit af zou komen · (b) ja: een snelle computer probeert ze binnen een paar dagen allemaal · (c) nee: een computer kan alleen met platte plaatjes rekenen

Antwoord a. Neem een eiwit van honderd aminozuren. Geef elke schakel maar drie mogelijke standen. Dan zijn er drie tot de macht honderd vormen: ongeveer een vijf met zevenenveertig nullen. Probeer er een biljoen per seconde. Dan duurt het nog veel langer dan het heelal oud is. Een eiwit in je cel doorloopt ook niet alle vormen. Het vouwt veel sneller.

## Hoofdstuk 3 — AlphaFold [Schema: scherm met een sequentie en een gok-vorm die naast de gemeten vorm schuift, rode stukken waar ze verschillen, de gok schuift een stukje bij (lus van drie keer, steeds sneller), teller 'voorbeelden: 170 000'; daarna een uitlijning van zes sequenties uit verschillende soorten (mens, muis, kip, vis, gist, bacterie), twee kolommen in goud die samen veranderen; Micro: in de gevouwen keten liggen die twee kralen tegen elkaar; daarna een scorebord 'CASP' met 0–100, 2018: ± 60, 2020: ± 90 (mediaan 92,4), streep 'zo goed als meten ± 90'; tot slot drie naamkaartjes zonder portret: David Baker · Demis Hassabis · John Jumper, Nobelprijs Scheikunde 2024]
Hoe leert een computer vouwen? Het bekendste programma heet AlphaFold, van het bedrijf DeepMind. Het leerde van voorbeelden: zo'n honderdzeventigduizend gemeten structuren uit de PDB, elk met zijn volgorde. Bij elk voorbeeld gokt het een vorm. Het vergelijkt die met de gemeten vorm, en stelt zichzelf een klein beetje bij. Dat heel vaak. Niemand vertelde het de regels van het vouwen. Het vond zelf patronen in de voorbeelden.

Er is nog een aanwijzing. In de eerste film van deze reeks zag je uitlijnen. Je legt sequenties zo naast elkaar dat gelijke letters onder elkaar staan. Doe dat met hetzelfde eiwit uit honderden soorten. Op de meeste plekken verschillen de letters hier en daar. Maar op twee plekken veranderen ze steeds samen: is de ene anders, dan de andere ook. Wat zegt dat? Wat denk je?
[VRAAG] (a) die twee plekken doen er niet toe: daar mag elk aminozuur staan · (b) die twee aminozuren liggen ver uit elkaar, anders zouden ze botsen · (c) die twee aminozuren liggen in de vorm waarschijnlijk tegen elkaar aan

Antwoord c. Twee aminozuren die tegen elkaar liggen, moeten bij elkaar passen. Verandert er één, dan blijft het eiwit vooral goed werken als de ander mee verandert. Zo'n paar is een hint voor de vorm. AlphaFold gebruikt duizenden van die hints tegelijk. Zijn er weinig verwante sequenties, dan wordt de voorspelling minder goed.

Maar werkt het echt? Daarvoor is CASP: een wedstrijd, sinds 1994, om de twee jaar. Teams voorspellen eiwitten waarvan de vorm net gemeten is, maar nog geheim. De score gaat tot honderd. Dat is ongeveer het percentage aminozuren op de goede plek. Rond de negentig is ongeveer zo goed als meten. In 2018 haalde AlphaFold zo'n zestig. In 2020 zo'n negentig.

In 2024 kregen Demis Hassabis en John Jumper hiervoor de helft van de Nobelprijs voor Scheikunde. De andere helft ging naar David Baker, die nieuwe eiwitten ontwerpt.

## Hoofdstuk 4 — Wat je ermee doet, en wat het (nog) niet kan [Schema: wereldkaartje met 'AlphaFold-databank · ± 200 miljoen voorspellingen · gratis'; kaartje 'Sleutel, slot en dosis' met een medicijn in een holte; een enzym bij een plastic flesje; terug naar Dr. Kims scherm: het eiwit van de cold open als gevouwen voorspelling, gekleurd per stuk (blauw zeker → oranje onzeker), een lange oranje staart die los rondslingert; daarna hetzelfde enzym in twee standen (open en dicht om het substraat) met label 'echt eiwit beweegt'; tot slot een pijl 'voorspelling → toetsen in het lab']
Is het probleem nu opgelost? De voorspellingen voor zo'n tweehonderd miljoen eiwitten staan gratis online. Wie een medicijn zoekt, ziet waar het slot zit. Dat ken je uit Sleutel, slot en dosis. Wie een enzym wil verbeteren, bijvoorbeeld een dat plastic afbreekt, ziet waar de holte zit.

Sam zoekt het eiwit uit de cold open op. Elk stuk heeft een kleur: hoe zeker AlphaFold daar is. Blauw is zeker, oranje onzeker. De staart aan het eind is oranje en slingert los rond. Wat betekent dat? Wat denk je?
[VRAAG] (a) zo ziet die staart er in het echt ook precies uit · (b) die staart heeft misschien geen vaste vorm, of AlphaFold weet het niet · (c) dat stuk is een fout: het hoort niet bij het eiwit

Antwoord b. Sommige stukken van een eiwit hebben geen vaste vorm. Bij andere stukken had AlphaFold te weinig aanwijzingen. De kleur zegt niet welke van de twee het is. Daarvoor moet je verder kijken.

En AlphaFold geeft één vorm. Een echt eiwit beweegt. Een enzym verandert van vorm als het substraat bindt. Dus: een voorspelling is een goede hypothese, geen meting. Dr. Kim gebruikt hem om te kiezen wat ze in het lab gaat meten.

## Recap [Schema: de letters van de cold open, een pijl naar de gekleurde vorm; drie kaartjes eronder: 'niet alles uitproberen', 'leren van 170 000 voorbeelden', 'hints uit verwante eiwitten'; daarna 'voorspelling → toetsen'; tot slot twee opleidingskaartjes en drie werkplekken]
Hoe kan een computer uit letters een vorm halen? Niet door alle vormen uit te proberen: dat zijn er veel te veel. AlphaFold leerde van gemeten structuren. En het leest hints uit verwante eiwitten: plekken die samen veranderen, liggen tegen elkaar. In de wedstrijd scoorde het bijna zo goed als meten. Toch blijft het een voorspelling. Die heeft een betrouwbaarheid per stuk, en je toetst haar in het lab.

Dit werk leer je bijvoorbeeld bij de hbo-opleiding Bio-informatica in Nijmegen: vier jaar. Of je doet eerst een bachelor als biologie of moleculaire levenswetenschappen in Nijmegen, en daarna de master Bioinformatics in Wageningen. Je werkt dan in een ziekenhuis, op een onderzoeksinstituut of bij een bedrijf. Met eiwitvormen werk je bijvoorbeeld bij een bedrijf dat medicijnen of enzymen maakt.

## Eindkaart
De volgorde van de aminozuren bepaalt meestal de vorm, en de vorm bepaalt wat een eiwit kan.
Meten (kristal + röntgenstraling, cryo-EM) is traag en duur; alle vormen uitproberen kan niet.
AlphaFold leerde van gemeten structuren en gebruikt hints uit uitgelijnde, verwante eiwitten.
CASP toetst blind: AlphaFold haalde in 2020 ongeveer de score van een meting.
Een voorspelling heeft een betrouwbaarheid per stuk, toont één vorm, en wordt getoetst in het lab.

---

## Beelden per hoofdstuk
Antwoordletters: b · a · c · b.
- **Cold open (Schema + Micro-inzet):** Dr. Kim en Sam aan het bureau (beiden `gewoon`), naam bij elk. Editorvenster met ± 30 letters (eenlettercode, geen echt gen nodig; als het een echt eiwit moet zijn: kies er een met een lange wanordelijke staart, zie twijfels). Rechts een leeg vak '?'. Micro-inzet: de letters worden kralen (#C9A35C) die zacht trillen.
- **H1 (Micro → Schema):** morph keten → kluwen (C8: vormovergang als morph); holte goud omrand. Twee verwijskaartjes met de filmtitels, niet opnieuw uitgelegd. Eén kraal in de holte koraal ('let op'), de holte vervormt een beetje, het substraat past niet meer.
- **H2 (Schema):** lab met kristalplaatje (lab-bibliotheek); röntgen-zijaanzicht; 1958 · myoglobine; cryo-EM met vriezer-icoon; twee balken (PDB vs bekende eiwitten, 'niet op schaal'); som op het scherm, de vertelling leest '3 tot de macht 100', niet het hele getal.
- **H3 (Schema + Micro):** leerlus gok → vergelijk → bijstellen; uitlijning (± 6 regels × 30 letters, IBM Plex Mono), twee gouden kolommen; zoomcirkel naar de gevouwen keten waar die twee kralen tegen elkaar liggen. Scorebord CASP. Naamkaartjes, géén portretten.
- **H4 (Schema):** databank-kaart; verwijzing Sleutel, slot en dosis; plastic flesje + enzym; voorspelling in blauw → oranje; open/dicht enzym; pijl naar het lab.
- **Recap:** zoals aangegeven; opleidingskaartjes (hbo Bio-informatica · HAN Nijmegen · 4 jaar; bachelor Biology / Molecular Life Sciences · Radboud Nijmegen → master Bioinformatics and Systems Biology · Wageningen, 2 jaar, Engelstalig) en drie werkplekken (ziekenhuis, onderzoeksinstituut, bedrijf).
