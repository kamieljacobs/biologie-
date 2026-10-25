# Antibioticaresistentie: kweken, testen en selectie — script v2 (24 okt 2026)

Wat word jij? · Laboratoriumtechniek (film 4), havo + vwo, mbo/hbo-oriëntatie. Ook de extra film bij het thema Evolutie. Voice Roos (eleven_v4). Look: Schema, met cast (Yasmin als stagiair-analist, outfit practicum; Opa Henk als patiënt; Dr. Kim als arts, outfit lab). Rode draad: één monster — de urine van Opa Henk, die na een kuur opnieuw klachten heeft. Getallen nagerekend in `reken/verdunning.py`. Bouwt voort op Je darmbewoners, De mens als selectiefactor, Onderzoek doen, en Welk antibioticum? (daar de keuze van de arts; hier het lab en de evolutie). v2 na `reviews/review_v1.md` (kolonie uit één cel of een klompje, tussengebied bij het breekpunt, mutatiefrequentie niet als algemene wet, 35 graden voor de gevoeligheidsbepaling, antwoordletters b-c-a-b-a, ingekort van ± 1050 naar ± 790 woorden). Na de eindreview (25 okt): alleen s18 herschreven en opnieuw ingesproken (kopieerfout 'heel af en toe', ± één per duizend delingen; 'dus' weg, 'dat is met proeven aangetoond'); opties van q06 en de eindkaart aangepast (worden niet uitgesproken).

Leerdoelen (de leerling kan …)
1. uitleggen waarom je steriel werkt en wat een negatieve en een positieve controle op een kweekplaat laten zien
2. uitleggen waarom één bacterie na een nacht een zichtbare kolonie is, en uit een verdunningsreeks met kolonietelling het aantal bacteriën per milliliter berekenen (telbaar: 30 tot 300 kolonies)
3. een antibiogram lezen: de remzone meten en met het breekpunt vergelijken, en de MIC aanwijzen als de laagste concentratie waarbij geen groei meer te zien is
4. uitleggen dat resistentie ontstaat door een toevallige mutatie of via een plasmide, en daarna door selectie in de populatie vaker wordt — niet doordat een bacterie aan het middel went
5. uitleggen hoe een plasmide met een resistentiegen via conjugatie naar een andere bacterie overgaat, ook naar een andere soort

Misconcepties: (1) bacteriën wennen aan een antibioticum → H4; (2) het middel veroorzaakt de mutatie → H4; (3) jij wordt resistent → cold open; (4) meer kolonies is een betere telling → H2; (5) elke heldere ring betekent gevoelig → H3; (6) een kolonie is één bacterie → H2.

Beeld per alinea: de `[Schema: …]`-regel achter een hoofdstukkop geldt voor het hele hoofdstuk; de scène per alinea staat in `scenes_lt4.js`.

---

## Cold open [Schema: lab; Yasmin in labjas met een potje urine met etiket; Opa Henk bij de balie met een leeg doosje antibiotica]
Opa Henk had een blaasontsteking. Hij kreeg een kuur, maar een week later is hij nog niet beter. Zijn urine gaat naar het lab, naar Yasmin, stagiair-analist. Wat kan zij hiermee uitzoeken? Wat denk je?
[VRAAG] (a) of de kuur van Opa Henk lang genoeg heeft geduurd · (b) welke bacterie het is, en welk middel nog werkt · (c) of Opa Henk zelf resistent is geworden voor dit middel

## Titel
Antibioticaresistentie

## Hoofdstuk 1 — Steriel werken [Schema: werkbank; gasvlam; entoog die gloeiend heet wordt en afkoelt; petrischaal die maar een klein stukje opengaat; veiligheidskabinet met luchtstroom naar binnen door een filter; extra plaat als controle]
Antwoord b. Niet jij wordt resistent, maar de bacterie. En welke het is, moet Yasmin eerst te weten komen. Daarvoor laat ze hem groeien, en dat lukt alleen als er niets anders bij komt: een bacterie uit de lucht groeit net zo hard. Dus de entoog gaat door de vlam, gloeiend heet, en de plaat gaat maar een klein stukje open. Iets gevaarlijkers doet ze in een veiligheidskabinet: daar stroomt de lucht naar binnen, door een filter.

Toch weet ze nooit zeker dat er niets bij kwam. Daarom zet ze een extra plaat mee, die ze alleen even opent en sluit. Wat ziet ze daaraan? Wat denk je?
[VRAAG] (a) dat de urine van Opa Henk maar weinig bacteriën bevat · (b) dat er te weinig voedingsstoffen in de agar zaten · (c) dat er ook op haar andere platen iets kan zijn gevallen

## Hoofdstuk 2 — Kolonies en tellen [Schema: petrischaal met heldere agar; één bacterie die zich steeds deelt tot een bolletje; rij buisjes van de verdunningsreeks, elk 1 op 10; pipet met 0,1 milliliter; drie platen met 680, 68 en 7 kolonies]
Antwoord c. Blijft die plaat leeg, dan was haar werk schoon: een negatieve controle. Er gaat ook een bacterie mee waarvan ze wéét dat die groeit: een positieve controle. Groeit díe niet, dan is er iets met de agar of de warmtekast.

Agar is een vaste voedingsbodem met voedingsstoffen erin. Yasmin strijkt de urine uit en zet de plaat een nacht bij ongeveer zevenendertig graden. Daar deelt een bacterie zich ongeveer elk half uur. Na achttien uur staan er honderden miljoenen cellen op één plekje: een kolonie, een stipje van een millimeter. Die komt van één cel.

Maar hoeveel bacteriën zaten er in de urine? Daarvoor verdunt Yasmin het monster: elke keer gaat een tiende deel over in het volgende buisje. Dat is een verdunningsreeks. Uit drie buisjes brengt ze een tiende milliliter op een plaat. De volgende dag staan er zeshonderdtachtig, achtenzestig en zeven kolonies op. Welke telt ze? Wat denk je?
[VRAAG] (a) die met achtenzestig kolonies, want die kun je goed tellen · (b) die met zeshonderdtachtig, want veel tellen is nauwkeuriger · (c) die met zeven kolonies, want die liggen het verst uit elkaar

## Hoofdstuk 3 — Het antibiogram [Schema: de middelste plaat omlijst met de rekenregel erbij; dan een plaat met vier papieren schijfjes en remzones van verschillende grootte, liniaal die 24 en 9 millimeter aflegt, kaartje met het breekpunt en een smalle tussenstrook; tot slot een rij buisjes waarin de concentratie verdubbelt]
Antwoord a. Een plaat is telbaar tussen de dertig en de driehonderd kolonies. Bij meer groeien ze over elkaar heen en tel je te laag; bij minder weegt het toeval te zwaar. Achtenzestig kolonies uit een tiende milliliter van de honderdduizend keer verdunde urine: dat is bijna zeventig miljoen per milliliter. Ruim boven de grens voor een blaasontsteking.

Nu de belangrijkste vraag: wat werkt er nog? Yasmin strijkt de bacterie uit over een nieuwe plaat en legt er schijfjes op, elk met een ander antibioticum. Het middel trekt de agar in, en waar het genoeg remt groeit niets: een heldere remzone. Na een nacht meet ze elke zone met een liniaal. Rond het ene schijfje is hij vierentwintig millimeter, rond het andere maar negen. Die getallen vergelijkt ze met een vaste grens: het breekpunt. Erboven heet de bacterie gevoelig, eronder resistent. Dat overzicht is het antibiogram.

Preciezer kan het met een rij buisjes waarin de concentratie elke keer verdubbelt. Tot en met nul komma vijfentwintig milligram per liter is het troebel: de bacterie groeit. Vanaf nul komma vijf blijft het helder. Wat is dan de MIC, de laagste concentratie zonder groei? Wat denk je?
[VRAAG] (a) nul komma vijfentwintig, het laatste buisje met groei erin · (b) nul komma vijf, het eerste buisje waarin je niets ziet · (c) één, een stap verder dan het eerste heldere buisje

## Hoofdstuk 4 — Hoe resistentie ontstaat [Schema: MIC naast het breekpunt; grote plaat met een dichte waas bacteriën; dezelfde hoeveelheid op een plaat met antibioticum: zeven losse kolonies; één bacterie met een veranderd gen in haar DNA]
Antwoord b. De MIC is nul komma vijf, en ook die vergelijk je met een breekpunt. Bij Opa Henk ligt de MIC van zijn eerste middel erboven: de bacterie groeit door bij een concentratie die in zijn lichaam haalbaar is. Dat is precies wat resistent betekent.

Maar hoe wordt een bacterie dat? Yasmin brengt een miljard cellen op een plaat met dat antibioticum erin. Op een gewone plaat zou daar een dichte waas van groeien. Hier komen zeven kolonies op. Hoe kan dat? Wat denk je?
[VRAAG] (a) die zeven hadden de verandering al, de rest groeide niet uit · (b) het antibioticum heeft bij die zeven een mutatie veroorzaakt · (c) die zeven zijn in de loop van de nacht aan het middel gewend

Antwoord a. Heel af en toe maakt een bacterie bij het delen een kopieerfout in haar DNA, ongeveer één keer per duizend delingen. Zo'n mutatie is toeval, en de meeste helpen haar niets. Maar een enkele keer verandert een gen waardoor het middel niet meer aangrijpt: vaak ongeveer één op de honderd miljoen cellen. Zonder antibioticum valt zo'n cel niet op. Ligt het middel erbij, dan groeien alle andere niet uit, en blijven juist die paar over. Het middel heeft die mutatie niet gemaakt: die was er al, dat is met proeven aangetoond. Het kiest alleen uit. Een bacterie went er ook niet aan: de cel verandert niet erfelijk. De populatie verandert, omdat de overlevers verder delen en hun nakomelingen het allel erven.

## Hoofdstuk 5 — Plasmiden [Schema: twee bacteriën van verschillende soort, elk met hun DNA-ring binnen het membraan; een pilus ertussen; een kopie van het plasmide die door het membraan naar de andere cel gaat; de donor houdt haar eigen plasmide]
Er is nog een tweede weg, en die gaat sneller. Naast hun grote DNA-molecuul hebben bacteriën vaak kleine ringetjes DNA: plasmiden. Ligt daar een resistentiegen op, dan kan een bacterie een kopie doorgeven. Ze legt een buisje aan naar een andere cel, een pilus, en daardoor gaat die kopie over; haar eigen houdt ze. Dat heet conjugatie. Het werkt ook tussen soorten: zo gaat zo'n plasmide van een E. coli naar een Klebsiella.

## Recap [Schema: Yasmin met het antibiogram aan de telefoon, Dr. Kim aan de andere kant; de plaat met zeven kolonies ernaast; daarna Opa Henk weer fit en twee opleidingskaartjes]
Yasmin belt Dr. Kim: resistent tegen het eerste middel, en bij twee andere ligt de MIC onder het breekpunt. Zij kiest er een van, en nu wordt Opa Henk wel beter. Op die plaat met zeven kolonies zag je waar zijn probleem vandaan kwam: toevallige mutaties, en een middel dat de overlevers uitkiest. Dat is selectie, in één schaaltje.

Werk je graag zo precies? Dan kun je biologisch-medisch analist worden: mbo niveau vier, drie tot vier jaar. Op het hbo bestaat Biologie en Medisch Laboratoriumonderzoek, vier jaar. Je komt terecht in een ziekenhuislab, bij een onderzoeksinstituut zoals het RIVM, of in een voedsel- of milieulab.

## Eindkaart
Steriel werken, met een negatieve en een positieve controle erbij.
Eén cel (of een klompje) wordt in een nacht één kolonie; tel een plaat met 30 tot 300 kolonies.
Antibiogram: remzone meten, MIC bepalen, vergelijken met het breekpunt.
Resistentie komt van een toevallige mutatie of een plasmide, en wordt vaker door selectie.
