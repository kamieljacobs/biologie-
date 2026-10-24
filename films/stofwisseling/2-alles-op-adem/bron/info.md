# Alles op adem — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/stofwisseling/2-alles-op-adem.html` (bronmap: `films/stofwisseling/2-alles-op-adem/bron/`) |
| Titel / ondertitel | Alles op adem · ATP vormen, met en zonder zuurstof |
| Reeks / nummer | Stofwisseling (vwo), film 2 van 4; serie: 1 Alles versneld · 2 Alles op adem · 3 Alles in het groen · 4 De lever (volgt) |
| Doelgroep / niveau | havo + vwo sinds 18 okt 2026 (Havo/Vwo-knop, zie onder): vwo = 6 vwo, Nectar 4.1, 19.3–19.4 (19.2 als gegeven), Binas 67L, 68B–D, 90A; havo = Biologie voor jou thema 8 (aerobe en anaerobe dissimilatie, gisting) |
| Versie / datum | versie 1.0 · 4 oktober 2026 (voettekst en "Bronnen en versie") |
| Prompt | onbekend · gemaakt 4 okt |
| Stem / model | Roos (ElevenLabs, model eleven_multilingual_v2), volgens de pagina |
| Duur | vwo 12:55, havo 8:42 (kop van de pagina; som van `dur` min de overgeslagen stukken, zonder het ingekorte midden van de hoofdstukkaarten). Speler: vwo 12:47, havo 8:13. Som van `dur` 828,0 s inclusief vijf havo-alinea's (52,0 s) |
| Beeldstijl | Eigen canvasontwerp (1920×1080) dat zich in de code "stijlkaart biologiefilms, look Micro" noemt: donkere achtergrond (#121A26 met fijne beige korrel), gedempte vullingen met lichte randen, Fraunces/Source Sans 3/IBM Plex Mono. Eén look voor alle scènes, geen Macro/Schema-onderscheid zoals in Part C (v4, 11 okt) |
| Audio-opslag | 9 fragmenten, één mp3 per hoofdstuk (inclusief stiltes), als base64 in de HTML (`window.__AUDIO`, sinds de begrippen-kop blobs 007–015: `ch_i` = blob 007 + i); lettertypen blobs 001–006. Blobs 010 (H3), 011 (H4), 013 (H6) en 015 (H8) zijn op 18 okt 2026 opnieuw gemaakt (128 kbit/s) met de havo-alinea's erin |
| Reconstructie | 2026-10-12, uit de gepubliceerde HTML |

## Opbouw

9 hoofdstukken (opening + H1–H8). Begin en duur uit `window.FILM`; type en kernbeeld letterlijk uit de docenttabel "Hoe de film het uitlegt" (de typeletters zijn die van de prompt: A mechanisme, B structuur/functie, D regulatie/model, G grafiek).

| Hoofdstuk | Begin | Duur | Type | Kernbeeld (pagina, "Hoe de film het uitlegt") |
|---|---|---|---|---|
| Opening | 0:00 | 0:24 | — | De baan: een sprint met snelheidsmeter, het tempo zakt in; dezelfde loopster jogt (klok versneld tot 60 min). Stelt de puzzel. |
| H1 De fosfaataccu | 0:24 | 1:35 | A mechanisme | Inzoomen van loopster naar spiervezel en eiwitdraden (myosine, actine). Eén myosinekop: ATP bindt en de kop laat los, ATP splitst in ADP en fosfaat, de kop komt klaar, pakt de actine en trekt die mee (slag). Gedachte-experiment: de ATP-balk is in 2 s leeg, maar raakt in het echt nooit op (kringloop). CP geeft zijn fosfaat aan ADP; ATP en CP samen zijn de fosfaataccu (anaeroob; ± 3–4× zoveel CP als ATP). Sprint van 10 s in het model (3× versneld): eerst de CP-balk, dan nog eens met de ATP-levering uit CP per seconde. |
| H2 Glycolyse | 1:58 | 1:34 | A mechanisme | Eén glucose (6 C) komt uit het bloed door het celmembraan het grondplasma in; een reeks enzymen deelt hem halverwege in twee helften van 3 C en maakt er twee pyrodruivenzuur van; 2 ATP erin, 4 eruit (netto 2). Bij een tweede glucose gaan van elke helft H-atomen naar NAD+ (wordt NADH,H+). Daarna een populatie (GlySim) met een paneel van alle dragers: de kleine voorraad NAD+ raakt beladen. Tijdens de vraag staat de simulatie stil; daarna stopt de glycolyse (teller netto ATP staat stil), een vergrootglas toont een vastgelopen enzymcluster, en de vraag waar NADH,H+ zijn H-atomen kwijt kan. |
| H3 Gisting | 3:33 | 1:20 | A mechanisme | Dezelfde simulatie met een enzym dat de H-atomen van NADH,H+ op pyrodruivenzuur zet: melkzuur ontstaat en NAD+ komt terug, de glycolyse loopt weer (teller netto ATP); de stap zelf levert geen ATP. Spiercel tegen gistcel (ethanol en CO2; deeg rijst). Melkzuur en H+ hopen op, de pH daalt (7,1 → 6,6); optimumgrafiek uit film 1. |
| H4 Van glucose naar CO2 | 4:52 | 1:35 | A mechanisme + atomen volgen | De loopster ademt CO2 uit. Bij de onthulling: in het grondplasma wordt een klein deel van het pyrodruivenzuur melkzuur (geen CO2), het meeste gaat het mitochondrium in (buitenmembraan, binnenmembraan, matrix). Decarboxyleren tot acetyl-coA (NAD+ wordt NADH,H+; coA laat bij de kringloop weer los); citroenzuurcyclus: de producten vliegen naar een telling per ronde (CO2, NADH,H+, FADH2, ATP); twee rondes per glucose, 6 C → 6 CO2 (aantallen, niet welke atomen). Slot: mitochondrium → bloed → longen → uitademen. |
| H5 De elektronentransportketen | 6:27 | 1:38 | A mechanisme | EtcSim: een beladen NADH,H+ geeft zijn H-atomen af (H+ los in de matrix, elektronen de keten in, weer NAD+); FADH2 geeft af bij een apart complex. De elektronen gaan stap voor stap door de keten; de eiwitcomplexen pompen H+ (teller); energietrap als inzet. ATP-synthetase doet in het model pas mee na de voorspelvraag, zodat je eerst de ophoping ziet. Daarna stromen H+ terug door ATP-synthetase en ontstaat ATP uit ADP en fosfaat; draaiende rotor (verdieping); geplooid binnenmembraan. |
| H6 Zuurstof | 8:06 | 1:49 | A mechanisme + atomen volgen | Inzoomen op het eind van de keten: O2 en 4 H+ gaan het complex in, 2 H2O komen eruit (laatste elektronenacceptor). C-atomen van glucose in CO2, O-atomen van O2 in H2O. Oxidatieve fosforylering; NADH,H+ uit de glycolyse via een omweg. Zonder O2 loopt de keten vast, stoppen de pompen, verdwijnt het H+-verschil en staan ATP-synthetase en de citroenzuurcyclus stil. 2 tegen ± 30 ATP per glucose; aerobe dissimilatie. |
| H7 Sprinten of joggen | 9:54 | 1:54 | D model met metingen | Vat ATP met drie kranen (CP, gisting, aeroob) en een gestapelde grafiek uit het rekenmodel (sprint in echte tijd, 0–40 s; joggen 10× versneld); tempo- en pH-meter. Inzetten: te veel pyrodruivenzuur → melkzuur (gisting terwijl er wél zuurstof is); staven 200–1500 m (gemeten bij toplopers); melkzuur wordt elders verbrand; 15 glucose tegen 1 voor dezelfde ATP; glycogeen. |
| H8 Terug naar de baan | 11:48 | 1:08 | — | De vraag van het begin, met 5 s om het eerst zelf te zeggen; sprint (4× versneld) en joggen (30× versneld) naast elkaar met dezelfde kranen; overzichtsschema anaeroob en aeroob; eindkaart. |

Leerdoelen en dekking (pagina):

| Leerdoel (de leerling kan …) | Hoofdstuk | Getoetst met |
|---|---|---|
| 1 ATP als energiebron; kleine voorraad; CP vult aan (fosfaataccu) | H1, H8 | voorspelvraag H1 · checkvraag 1 |
| 2 Glycolyse in het grondplasma: 2 pyrodruivenzuur, netto 2 ATP, NAD+ wordt NADH,H+ | H2, H8 | voorspelvraag H2 · checkvraag 2 |
| 3 Gisting: melkzuur of ethanol; NAD+ weer beschikbaar; alleen de 2 ATP van de glycolyse | H3, H6 | voorspelvraag H3 · checkvragen 2 en 5 |
| 4 Matrix: decarboxyleren tot acetyl-coA, citroenzuurcyclus; CO2, NADH,H+ en FADH2 | H4 | voorspelvraag H4 · checkvraag 3 |
| 5 Elektronentransportketen, H+ pompen, ATP-synthetase; O2 als laatste elektronenacceptor | H5, H6 | voorspelvragen H5 en H6 · checkvraag 4 |
| 6 Fosfaataccu, gisting en aerobe dissimilatie vergelijken (opbrengst en snelheid); sprint tegen joggen | H6, H7, H8 | voorspelvraag H7 · checkvragen 1 en 5 |
| 7 Atomen volgen: C van glucose in CO2, O van O2 in H2O | H4, H6 | voorspelvraag H6 · checkvragen 3 en 4 |

## Vragen

Zeven voorspelvragen, in H1–H7 (één per hoofdstuk). In H8 een open pauze van 5 s ("Zeg het eerst zelf, in één zin"), segment `pause`. Niveau: alle vragen 6 vwo. Tijden op de filmklok.

| # | Plek (filmklok) | Vraag | Opties | Juist | Verleidelijk |
|---|---|---|---|---|---|
| 1 | H1 · 0:50 | Hoe lang kun je sprinten op de ATP die al in je spier zit? | A. Ongeveer twee seconden. · B. Ongeveer tien seconden. · C. Ongeveer een minuut. | A | C |
| 2 | H2 · 3:00 | Alle NAD⁺ is omgezet in NADH,H⁺. Wat doet de glycolyse dan? | A. Die gaat langzamer door. · B. Die stopt. · C. Die gaat gewoon door. | B | C |
| 3 | H3 · 3:39 | Een enzym zet pyrodruivenzuur om in melkzuur. Wat levert die stap op? | A. Extra ATP. · B. Niets: melkzuur is afval. · C. NAD⁺ voor de glycolyse. | C | A |
| 4 | H4 · 4:58 | Waar ontstaat het CO₂ dat je uitademt? | A. In je longen. · B. In je mitochondriën. · C. In het grondplasma. | B | A |
| 5 | H5 · 7:32 | Hoe levert die ophoping van H⁺ ATP op? | A. H⁺ stromen terug door ATP-synthetase. · B. Elektronen gaan door ATP-synthetase. · C. Zuurstof bindt aan ATP-synthetase. | A | B |
| 6 | H6 · 8:13 | Waar komen de O-atomen terecht van de zuurstof die je cellen gebruiken? | A. In CO₂. · B. In ATP. · C. In H₂O. | C | A |
| 7 | H7 · 10:01 | Waarom houd je sprinttempo geen hele ronde vol? | A. Je mitochondriën leveren te weinig ATP per seconde. · B. Je ATP raakt op. · C. Je spieren krijgen dan geen zuurstof. | A | C |

Docenttabel "Pauze- en bespreekmomenten" (pagina, letterlijk; "Waar" = hoofdstuk + tijd binnen het hoofdstuk):

| Waar | Vraag | Antwoord | Waarom lastig · doorvraag |
|---|---|---|---|
| H1 0:27 | Hoe lang kun je sprinten op de ATP die al in je spier zit? | A. Ongeveer twee seconden. verleidelijk: C. Ongeveer een minuut. | ATP klinkt als een opgeslagen brandstof, zoals glycogeen of vet. Waarom raakt je ATP in het echt dan toch niet op? |
| H2 1:01 | Alle NAD+ is omgezet in NADH,H+. Wat doet de glycolyse dan? | B. Die stopt. verleidelijk: C. Die gaat gewoon door. | Dat een kleine voorraad hulpmoleculen de snelheid begrenst, is niet intuïtief; leerlingen kijken alleen naar glucose. Wat heeft de cel nodig om de glycolyse weer op gang te krijgen? |
| H3 0:07 | Een enzym zet pyrodruivenzuur om in melkzuur. Wat levert die stap op? | C. NAD+ voor de glycolyse. verleidelijk: A. Extra ATP. | "Gisting levert ATP" klinkt logisch; dat het om het terugkrijgen van NAD+ gaat, zien leerlingen niet. Waarom levert gisting per glucose dan toch 2 ATP op? |
| H4 0:06 | Waar ontstaat het CO2 dat je uitademt? | B. In je mitochondriën. verleidelijk: A. In je longen. | CO2 hoort in het hoofd bij de longen en bij "zuurstof verbranden". Uit welk molecuul komen de C-atomen van dat CO2? |
| H5 1:04 | Hoe levert die ophoping van H+ ATP op? | A. H+ stromen terug door ATP-synthetase. verleidelijk: B. Elektronen gaan door ATP-synthetase. | Ook elektronen "stromen"; het verschil tussen elektronenstroom en H+-stroom is lastig. Waarom moeten de H+ door ATP-synthetase, en niet gewoon door het membraan? |
| H6 0:07 | Waar komen de O-atomen terecht van de zuurstof die je cellen gebruiken? | C. In H2O. verleidelijk: A. In CO2. | "O2 in, CO2 uit" suggereert dat zuurstof CO2 wordt. Waar komen de O-atomen van het uitgeademde CO2 dan vandaan? (Uit glucose en water; verdieping.) |
| H7 0:07 | Waarom houd je sprinttempo geen hele ronde vol? | A. Je mitochondriën leveren te weinig ATP per seconde. verleidelijk: C. Je spieren krijgen dan geen zuurstof. | "Geen zuurstof" en "ATP op" zijn de standaardverklaringen. Waarom houdt een 800-meterloper het tempo wel bijna twee minuten vol? |

Vijf checkvragen in examenstijl, elk 3 punten (`id="checkvragen"`, regel 450–452): 1 ATP en CP in rust en na 10 s sprint, rekensom (leerdoel 1, 6, met tabel); 2 ontbrekend melkzuurenzym tegenover gist (2, 3); 3 ¹⁴C-glucose en CO₂ in de matrix (4, 7); 4 DNP als ontkoppelaar (5, 7); 5 defect complex van de elektronentransportketen (6, 3).

## Begrippen

21 begrippen, bron meestal "Nectar Samengevat 19.3/19.4" of "omschrijving bij de film". Geen vwo- of verdiepingsmarkering.

| Begrip | Betekenis | Bron | H. |
|---|---|---|---|
| ATP | de belangrijkste chemische energiebron in een cel; bij de splitsing van ATP in ADP en fosfaat komt energie vrij | Nectar Samengevat 19.3 | 1 |
| CP (creatinefosfaat) | stof in spieren met een kleine voorraad fosfaat om ATP aan te vullen | Nectar Samengevat 19.3 | 1 |
| fosfaataccu | ATP en CP samen in een spier | Nectar Samengevat 19.3 | 1 |
| anaeroob | zonder dat er zuurstof nodig is; zo'n proces kan ook verlopen als er wél zuurstof is (H7) | omschrijving bij de film | 1, 3 |
| glycolyse | omzetting van glucose in twee moleculen pyrodruivenzuur in het grondplasma; levert netto 2 ATP per molecuul glucose op | Nectar Samengevat 19.3 | 2 |
| pyrodruivenzuur | stof met 3 C-atomen; uit één glucose (6 C) ontstaan er twee | omschrijving bij de film | 2 |
| co-enzym | klein hulpmolecuul dat bij een reactie meedoet, daarbij zelf verandert en daarna weer wordt teruggezet (zie film 1) | Nectar Samengevat 18.3 | 2 |
| NAD+ / NADH,H+ | co-enzym dat H-atomen opneemt en weer afgeeft; beladen heet het NADH,H+ | omschrijving bij de film | 2, 3, 5 |
| gisting | anaeroob proces waarin organismen pyrodruivenzuur afbreken tot melkzuur of ethanol (alcohol); daarbij komt NAD+ weer beschikbaar voor de glycolyse | Nectar Samengevat 19.3 | 3 |
| aeroob | met zuurstof: het proces heeft zuurstof nodig | omschrijving bij de film | 4 |
| mitochondrium | celorganel met een buitenmembraan en een binnenmembraan; de ruimte binnen het binnenmembraan heet de matrix | omschrijving bij de film | 4 |
| decarboxyleren | CO2 afsplitsen | Nectar Samengevat 19.4 | 4 |
| acetyl-coA | wat van pyrodruivenzuur overblijft na het decarboxyleren (2 C), vastgemaakt aan het co-enzym coA; gaat de citroenzuurcyclus in | Nectar Samengevat 19.4 | 4 |
| citroenzuurcyclus | kringloop van enzymreacties in de matrix waarin acetyl-coA wordt afgebroken; daarbij ontstaan CO2, NADH,H+ en FADH2 | Nectar Samengevat 19.4 | 4 |
| FAD / FADH2 | tweede co-enzym dat H-atomen opneemt; beladen heet het FADH2 | omschrijving bij de film | 4, 5 |
| elektronentransportketen | reeks eiwitcomplexen in het binnenmembraan; elektronen uit NADH,H+ en FADH2 geven er stapsgewijs hun energie af, en daarmee pompen de eiwitcomplexen H+ door het binnenmembraan | Nectar Samengevat 19.4 | 5 |
| ATP-synthetase | eiwit in het binnenmembraan dat de terugstromende H+ gebruikt om ATP te maken | Nectar Samengevat 19.4 | 5 |
| laatste elektronenacceptor | O2; neemt aan het eind van de keten de elektronen op. De H+, elektronen en O2 vormen H2O | Nectar Samengevat 19.4 | 6 |
| oxidatieve fosforylering | de vorming van veel ATP met behulp van O2 in de mitochondriën | Nectar Samengevat 19.4 | 6 |
| aerobe dissimilatie (verbranding) | afbraak van glucose met zuurstof tot CO2 en H2O, waarbij veel ATP ontstaat (ongeveer 30 per glucose); netto glucose + 6 O2 → 6 CO2 + 6 H2O | omschrijving bij de film | 6 |
| fosforylering | een fosfaatgroep aan een molecuul koppelen; bij ATP-vorming aan ADP, in het begin van de glycolyse aan glucose | omschrijving bij de film | 6 |

## Docentdeel

Sectie `id="docent"`: leerdoelen (zie Opbouw), hoe de film het uitlegt (zie Opbouw), misvattingen, pauzemomenten (zie Vragen), getallen met bronnen, vereenvoudigingen. Verder: "Achtergrond: anaeroob en aeroob bij sport" (regel 434–439: aeroob aandeel bij maximale inspanning, anaeroob aandeel per afstand, duurloop ≈ 1 % anaeroob, melkzuur ontstaat altijd en wordt grotendeels verbrand, spierpijn komt niet door melkzuur), "Over de simulaties" (GlySim in H2–H3, EtcSim in H5–H6, rekenmodel models2.js in H1, H7, H8; regiemomenten) en "Practicum bij de film" (gisting met bakkersgist, ballon of gasmeetspuit, kalkwater).

Misvattingen die de film aanpakt:

| Misvatting | Waar en hoe |
|---|---|
| ATP is een grote energievoorraad. | H1: de ATP-balk is in ongeveer 2 s leeg (gedachte-experiment); de spier maakt ATP steeds opnieuw; voorspelvraag H1. |
| Zonder zuurstof maakt een cel geen ATP. | H2–H3: glycolyse met gisting levert wél ATP, alleen weinig per glucose (netto 2). |
| De stap naar melkzuur of alcohol levert zelf ATP op. | H3: bij de reactie staat "geen ATP"; de stap levert NAD+ terug; voorspelvraag H3. |
| De zuurstof die je inademt, adem je uit als CO2. | H4 en H6: de C-atomen van CO2 komen uit je brandstof, de O-atomen van O2 komen in H2O; voorspelvraag H6; checkvragen 3 en 4. |
| Bij een sprint werk je alleen anaeroob, bij joggen alleen aeroob. | H7: de aerobe laag doet vanaf de start mee; bij de start van joggen springen CP en gisting bij; staven 200–1500 m. |
| Een co-enzym zoals NAD+ wordt verbruikt. | H2: het NAD+-raster: dragers worden beladen en weer leeg; de voorraad is klein; voorspelvraag H2. |
| CO2 ontstaat in de longen. | H4: CO2 ontstaat in de matrix, bij het decarboxyleren en in de citroenzuurcyclus; voorspelvraag H4. |
| De elektronen zelf drijven ATP-synthetase aan. | H5: het zijn de terugstromende H+; voorspelvraag H5 (verleidelijk: B). |
| Bij een sprint krijgen je spieren geen zuurstof. | H7: "wél zuurstof, maar te weinig"; voorspelvraag H7 (verleidelijk: C). |

De getallen achter de film:

| Wat | Waarde | Zo gezegd of getoond | Bron |
|---|---|---|---|
| ATP in spier | ≈ 25 mmol per kg droge spier | rekensom H1: ≈ 2 s sprinten | Hargreaves & Spriet 2018 |
| ATP-verbruik bij een sprint | 12–15 mmol per kg droge spier per seconde | zelfde rekensom: 25 ÷ 12,5 ≈ 2 s | Hargreaves & Spriet 2018 |
| Daling ATP bij maximale inspanning | hooguit 30–40 % | H1: "raakt in het echt nooit op", "daalt met hooguit 30–40 %" | Hargreaves 2016 |
| CP in spier | ≈ 80 mmol per kg droge spier, ± 3–4× zoveel als ATP | CP-balk H1 ("± 3–4× zoveel CP als ATP"), checkvraag 1 | MacLaren & Morton 2012 |
| CP na 10 s sprinten (model) | 34 % over; ATP uit CP per seconde dan ook 34 % van het maximum | H1 (herhaling bij "hoe minder CP …") en H7 | models2.js, gekalibreerd op de metingen hieronder |
| CP na 6 s sprinten | ≈ 45 % van rust | "na zo'n tien seconden meer dan de helft op" | Gaitanos 1993; Dawson 1997 |
| Maximale ATP-snelheid | CP 9 · glycolyse 4,5 · aeroob (koolhydraat) 2,8 mmol per kg droge spier per s | kranen H7: 3,2 : 1,6 : 1 | MacLaren & Morton 2012; Sahlin 1998 |
| Aeroob aandeel bij maximale inspanning | 9 / 25 / 42 % na 10 / 30 / 60 s; gelijk bij ≈ 79 s | model H7: 11 / 25 / 37 % | Gastin & Suppiah 2026 |
| Anaeroob aandeel per afstand (toplopers) | 200 m 71 % · 400 m 57 % · 800 m 34 % · 1500 m 16 % | staven H7 | Spencer & Gastin 2001 |
| pH in spier na uitputtende inspanning | ≈ 7,1 → 6,6 | pH-meter H3 en H7 (afgerond, model) | Sahlin 1976 |
| Stabiel zuurstofverbruik bij matige inspanning | na 1–4 min | "pas na een paar minuten helemaal op gang" | Physiology of Exercise, hfst. 5 |
| Joggen, eerste 3 min in het model | aeroob 85 % · CP 12 % · gisting 3 % | dunne lagen CP en gisting H7 | deze film (models2.js) |
| NAD+-dragers in de simulatie van H2 en H3 | 16 (model) · genoeg voor 8 glucose | paneel H2 en H3 | schematisch: echt zijn het veel meer moleculen, maar ook dan raken ze zonder terugwinnen snel beladen |
| Vet bij matige inspanning | ≈ 50 % van de energie | label "vet: niet in deze film" | Spriet & Randell 2020 |
| ATP per glucose, aeroob | ≈ 30 (2,5 per NADH,H+, 1,5 per FADH2); oudere boeken 36–38 | "ongeveer dertig"; 30 : 2 = "vijftien keer" | Berg e.a., Biochemistry |
| Glycolyse uit glycogeen | netto 3 ATP per glucose-eenheid | niet in de film (Nectar: 2 per glucose) | Bhagavan 2002 |
| Per ronde citroenzuurcyclus | 2 CO2 · 3 NADH,H+ · 1 FADH2 · 1 ATP (GTP); 2 rondes per glucose | tellers H4 | Berg e.a. |
| H+ per NADH,H+ · H+ per ATP | ≈ 10 gepompt · ≈ 3 door ATP-synthetase (+1 voor transport) | EtcSim: 4 + 4 + 2 en 3 per ATP | Berg e.a. |
| Zuurstof in en uit | 21 % in, 15–16 % uit: ≈ ¾ van de O2 adem je onveranderd uit | achtergrond bij H6 | Guyton & Hall |
| Sprintsnelheid scholier | ≈ 30 km/h; zakt in het model naar ≈ 24 km/h | snelheidsmeters opening, H7, H8 ("model · afgerond") | modelaanname |
| Anaeroob deel van een rustige duurloop | ≈ 1 % of minder over een uur | achtergrond hieronder | eigen schatting (zuurstoftekort ≈ 1 L op ≈ 140 L) |
| Melkzuur : pyrodruivenzuur in rustende spier | ≈ 10–13 : 1 | achtergrond (melkzuur ontstaat altijd) | Rogatzki e.a. 2015 |
| Deel van het melkzuur dat wordt verbrand | rust ≈ ½ · inspanning ≈ ¾ | H7: "grotendeels weer verbrand" | Brooks e.a. 2022 |
| Looptijd | 12:55 | inclusief zeven vraagsegmenten van 11,5 s en een pauze van 5 s in H8 | deze film |

Vereenvoudigingen en waarom:

| Wat | Toelichting |
|---|---|
| Model, vertraagd, minder moleculen, niet op schaal | Echt gaat het veel sneller met ontelbaar veel moleculen; dat is niet te volgen. Het label staat steeds in beeld. |
| Kleuren | Eén betekenis per kleur: amber = brandstof (glucose, pyrodruivenzuur, acetyl-coA) en de H-atomen en elektronen eruit; groen = eindproduct (CO2, H2O, melkzuur, ethanol); blauw = eiwit; rood-oranje = ATP, ADP en fosfaat; grijs = dragers (NAD+, FAD, coA), H+, O2 en creatine. C-atomen zijn donkere stippen. Vorm verschilt ook, dus het werkt ook zonder kleur. |
| Myosinekop (H1) | Eén kop, vertraagd; de andere koppen staan dan stil. Volgorde zoals Nectar 19.2: ATP bindt en de kop laat los; ATP wordt gesplitst, fosfaat koppelt af en de kop komt in de actieve stand; de kop bindt aan actine, ADP laat los en de kop veert terug en trekt de actine mee (slag). |
| Balken in H1 | Eerst toont de ATP-balk alleen hoe vol de ATP-voorraad is; zodra CP erbij komt, krimpt de ATP-balk zodat de hoogtes de hoeveelheden vergelijken (CP ± 3× zoveel als ATP). |
| Glycolyse | Eén cluster van enzymen; de tussenstoffen worden niet getoond, alleen de twee helften van 3 C. Per halve glucose: één NAD+ en netto één ATP. |
| Reactievergelijking aerobe dissimilatie (H6) | In beeld staat de vorm met 6 H2O links en 12 H2O rechts, zoals Nectar de fotosynthese samenvat (20.3); daaronder de netto vorm glucose + 6 O2 → 6 CO2 + 6 H2O. Zo klopt de boodschap dat alle O-atomen van O2 in water terechtkomen: 6 O2 levert 12 H2O; onderweg wordt 6 H2O gebruikt. |
| Anaeroob en aeroob in beeld | Labels zeggen "zuurstof niet nodig" en "zuurstof nodig", niet "zonder" en "met": gisting gebeurt ook als er wél zuurstof is (H7). |
| H2: regie bij de vraag | Tijdens de voorspelvraag staat de simulatie stil (er wordt niets voorgezegd). Na de onthulling pakken de enzymen de laatste NAD+ sneller op, zodat het stoppen samenvalt met de uitleg. |
| H3: melkzuurenzym, glycolyse en H+ | Eén melkzuurenzym werkt vanaf de uitleg van de reactie en laat zijn melkzuur los op het woord "melkzuur", de andere iets later. De glycolyse pakt in het model pas weer NAD+ op bij "Maar de glycolyse kan weer door": zo zie je eerst NAD+ terugkomen en blijft de ATP-teller staan bij "De stap naar melkzuur levert zelf geen ATP op". De teller telt door vanaf het eind van H2. De H+ zijn losse deeltjes die toenemen naast het melkzuur; de film zegt niet waar ze vandaan komen. De optimumgrafiek is schematisch. |
| H5: aanvoer bij de teller | Tijdens "Kijk naar de teller" ligt steeds een NADH,H+ klaar bij het eerste complex, zodat de keten zonder gat blijft pompen. |
| Melkzuur en de pH | De film zegt "melkzuur en H+ hopen zich op" en claimt niet dat de H+ uit melkzuur komen. |
| Citroenzuurcyclus | De film telt aantallen C-atomen per ronde, niet welke atomen het zijn (de C-atomen van acetyl-coA verlaten de cyclus pas in latere rondes). In ronde 1 komen de producten vrij op het moment dat ze genoemd worden, niet in de volgorde van de echte reacties; het ene ATP (eigenlijk GTP) wordt niet genoemd, de rij licht in beeld even op. |
| Elektronentransportketen | De complexen zijn niet genummerd; het elektronenpad loopt via een kleine drager (cytochroom c, alleen getekend). FADH2 levert zijn elektronen bij een apart complex af. Per NADH,H+ pompt het model 4 + 4 + 2 H+; ATP-synthetase maakt één ATP per 3 H+. |
| H5: ophoping eerst | In het model doet ATP-synthetase pas mee na de voorspelvraag; zo zie je eerst de H+ ophopen. Boven 180 H+ lukt pompen niet meer (tegendruk). In werkelijkheid loopt ATP-synthetase steeds mee. |
| H6: zonder zuurstof | In het model loopt de keten in enkele seconden vast en verdwijnt het H+-verschil binnen een paar seconden; in werkelijkheid gaat dat sneller. De omweg voor NADH,H+ uit de glycolyse is één gestippelde route zonder details. |
| Rekenmodel H1, H7 en H8 | Drie kranen met maxima in de verhouding 3,2 : 1,6 : 1 (gemeten). Het aerobe deel komt met een vertraging van 12 s (sprint) of 30 s (joggen) op gang; gisting remt af naarmate melkzuur en H+ oplopen; bij joggen blijft er altijd een beetje gisting; tempo en pH volgen uit het model. Gekalibreerd op metingen bij maximale inspanning. Tijdschaal: H1 3× versneld; H7 sprint in echte tijd en joggen 10× versneld; H8 sprint 4× en joggen 30× versneld. |
| ± 30 ATP | Berekend en afgerond; zo gelabeld in beeld. |
| Vet als brandstof | Bij joggen levert vet ongeveer de helft van de energie; dat blijft buiten de film, met een label in beeld. |
| Woordkeuze | De film volgt de woorden van Nectar: fosfaataccu, NADH,H+, decarboxyleren, laatste elektronenacceptor, oxidatieve fosforylering. |

## Techniek: waar zit wat in de HTML

Specifiek voor deze film: `window.FILM` op regel 4310; `window.__AUDIO` op regel 463; scènes:
`SCENES['0']` r2490 · `SCENES['1']` r2580 · `SCENES['2']` r2803 · `SCENES['3']` r3044 · `SCENES['4']` r3214 · `SCENES['5']` r3431 · `SCENES['6']` r3610 · `SCENES['7']` r3874 · `SCENES['8']` r4146.

Welk blob bij welk hoofdstuk:

| Hoofdstuk | `audio`-sleutel | Blob | Duur (ffprobe) | `dur` in FILM | Takes |
|---|---|---|---|---|---|
| Opening | `audio/ch_0.mp3` | 006.mp3 | 23,77 s | 23,730 s | 0a |
| H1 De fosfaataccu | `audio/ch_1.mp3` | 007.mp3 | 94,80 s | 94,765 s | 1a, 1b, 1c |
| H2 Glycolyse | `audio/ch_2.mp3` | 008.mp3 | 94,15 s | 94,105 s | 2a, 2b, 2c, 2d, 2e |
| H3 Gisting | `audio/ch_3.mp3` | 009.mp3 | 79,73 s | 79,686 s | 3a, 3b, 3c, 3d |
| H4 Van glucose naar CO₂ | `audio/ch_4.mp3` | 010.mp3 | 95,22 s | 95,190 s | 4a, 4b, 4c, 4d, 4e |
| H5 De elektronentransportketen | `audio/ch_5.mp3` | 011.mp3 | 98,06 s | 98,031 s | 5a, 5b, 5c, 5d, 5e |
| H6 Zuurstof | `audio/ch_6.mp3` | 012.mp3 | 108,59 s | 108,560 s | 6a, 6b, 6c, 6d, 6e, 6f |
| H7 Sprinten of joggen | `audio/ch_7.mp3` | 013.mp3 | 114,26 s | 114,218 s | 7a, 7b, 7c, 7d, 7e, 7f |
| H8 Terug naar de baan | `audio/ch_8.mp3` | 014.mp3 | 67,74 s | 67,695 s | 8a, 8b, 8c |

Film-eigen modules: `draw2.js` (regel 1636, moleculen als iconen met sprite-cache, de loopster `runner()`), `sim2.js` (regel 1904, `GlySim` en `EtcSim`), `models2.js` (regel 2187, rekenmodel ATP-vat met drie kranen, gekalibreerd op Gastin & Suppiah 2026 en MacLaren & Morton 2012), `parts2.js` (regel 2232, reactievergelijkingen met iconen, voorraadbalken, tellers), `etc2.js` (regel 2406, tekening binnenmembraan en keten, H5–H6). `sim.js` en `models.js` uit film 1 zitten er nog in; alleen `SIM.RNG` wordt gebruikt. `FILM.curves` is leeg. Geen `TL.cue(...)`-registratie.

Hoofdstukkaarten en eindkaart: `CM.withCard(draw, nr, titel, ondertitel)` onderaan elke scène (bijv. regel 2796: `withCard(draw, 1, 'De fosfaataccu', 'Anaeroob ATP vormen · Binas 67L, 90A')`); `withCard` zelf op regel 1596, "HOOFDSTUK n VAN 8" in `chapterCard` (regel 1375). Eindkaart: `SCENES['8']`, regel ≈ 4295–4303 (`const lines = [...]`, met "volgende film: fotosynthese"). Hoofdstuklijst-label van de opening: `'De baan'` in `player.js`.

### Gedeelde bouwvorm (film 1–3)

Alle drie de films van de serie hebben dezelfde bouwvorm. Regelnummers hieronder gelden voor `film.src.html` (uitgepakt met `scripts/filmbron.py`); in de ingepakte film zijn ze gelijk, want elke blob staat op één regel.

**Opbouw van het bestand (van boven naar beneden)**
- `<style>` met kleurtokens (`--bg: #0D1420`, `--ink`, `--verd` …) en `@font-face` voor de vijf lettertypen (blobs 001–005: Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500).
- Pagina-HTML: titelkop (`<div class="lab">Uitlegfilm · 6 vwo · …</div>`), serienavigatie (`class="series"`), speler (`id="player"` → `id="stagebox"` met `<canvas id="stage">`, ondertitels `#cap`/`#capband`, vraagkaart `id="qcard"`, startscherm `id="poster"`, bediening, instellingen `id="settings"` met `#opt-auto` en `#opt-words`, Leerling/Klas-knoppen `[data-mode]`, hoofdstuklijst `id="chlist"`, gevuld door de speler).
- Tabbladen als secties: `id="over"`, `id="begrippen"`, `id="transcript"` (statische `<p><button class="ts" data-ch=".." data-t="..">`-regels, één per zin), `id="docent"`, `id="checkvragen"`, `id="bronnen"`.
- `<script>window.__AUDIO = {"audio/ch_0.mp3":"@@BLOB:006.mp3@@", …}` — de hoofdstuk-mp3's als base64.
- Eén groot `<script>` met de JS-modules achter elkaar, elk met een kopcommentaar `/* naam.js — … */`: `engine.js` (tekenhulp, kleuren `C`, 1920×1080-podium, `CAPTION_Y = 950`), `sim.js` (deeltjesmodel), `common.js` (`makeTL`, `chapterCard`, gedeelde onderdelen), `models.js`, en per film extra modules; daarna `window.SCENES = {}` en één functie per hoofdstuk `SCENES['0']`, `SCENES['1']`, … (elk met een beschrijvend kopcommentaar); dan `window.FILM = {…}` op één lange regel; dan de blob-omzetter (“één bestand: de audio zit in de pagina”) en `player.js`.

**`window.FILM` (de scriptdata, één JSON-regel)**
`FILM.chapters[i]` heeft: `key` ('0' = opening), `title`, `dur` (s, = lengte van het hoofdstuk-mp3 minus opvulling), `audio` ('audio/ch_i.mp3', de sleutel in `__AUDIO`), `hasQ`, `hasV` (verdieping, alleen voor het label in de hoofdstuklijst), en:
- `segments`: de tijdlijn van het hoofdstuk in s vanaf het begin van dat mp3: `intro`, `card` (hoofdstukkaart 3 s), `narr` (met `take`, bijv. '2b'), `gap`/`hold`/`tail` (stilte), `question` (met `q`, `opts[{k,text,mis}]`, `correct`, `count0`, `count1`, `reveal`), `qtail`, `title`, `pause`, `end`.
- `sentences`: per zin `n`, `text`, `t0`, `t1`, `take`, `verdieping` en `words[{w,t0,t1}]` — woordtijden uit de uitgelijnde audio.
- `phrases`: de ondertitelregels (`text`, `t0`, `t1`, `n` = zinnummer, `verd`, `w[[woord, t0]]`). De speler toont de frase waarvoor `t0 ≤ t < t1`.
- `FILM.curves`: gemeten grafiekdata (alleen gevuld in film 1; in film 2 en 3 leeg `{}`).

**Vraagtiming (vast patroon)**: elk vraagsegment duurt 11,5 s: kaart op `t0`, bedenktijd 8 s van `count0 = t0 + 3,5` tot `count1 = t0 + 11,5`, dan 0,6 s `qtail`, en `reveal` valt precies op het woord "Antwoord" van de volgende take (`words[0].t1`). Het mp3 bevat op die plek stilte; de speler pauzeert in `gate()` op `count1` tot er een antwoord (Leerling) of Verder (Klas) is.

**Audio**: één mp3 per hoofdstuk (mono, 44,1 kHz, ≈ 112 kbit/s), inclusief alle stiltes. Bij het laden maakt het blokje “één bestand: de audio zit in de pagina” van elke base64-string een `blob:`-URL in `ch.audio`. De audio is de klok: `clock()` leest `audio.currentTime`; op `ended` laadt de speler het volgende hoofdstuk. Zonder `__AUDIO` probeert hij `audio/ch_i.mp3` naast de pagina.

**Timing van het beeld**: scènes hangen aan woorden, niet aan vaste tijden. In elke `SCENES[k]` staat bovenaan `const T = { naam: W(zinnr, 'woord', [n-de keer], ['t0'|'t1']) , … }`; `TL.W` zoekt het woord (prefix, zonder leestekens) in `sentences[n].words` en geeft een fout als het niet bestaat. Verder `TL.seg('question')`, `TL.segs('hold')`, `TL.Q` (eerste vraag), `TL.S(n)`. Simulaties zijn deterministisch (vaste seed, vaste tijdstap) en worden vooruit gerekend (`sims[].advanceTo`).

**Speler** (`player.js`): Leerling/Klas (`?modus=klas` of `#klas`), Automatisch verder (localStorage), woorden meekleuren, CC, volledig scherm met schijn-volledig scherm op iPhone, toetsen (spatie, pijlen, A/B/C of 1/2/3, Enter = Verder in Klas). QA-haakje `window.__film` (`renderAt`, `cues`, `state`, `seek`, `choose`, `verder`). Er is géén Havo/Vwo-schakelaar.

## Zo pas je deze film aan

Werk altijd in de uitgepakte versie: `python3 scripts/filmbron.py uitpakken films/stofwisseling/2-alles-op-adem.html <tijdelijke map>`, bewerk `film.src.html` en/of vervang een bestand in `blobs/`, en pak in met `python3 scripts/filmbron.py inpakken <map> films/stofwisseling/2-alles-op-adem.html`.

1. Een gesproken zin wijzigen = dat hoofdstuk-mp3 opnieuw maken (één bestand per hoofdstuk, met stiltes). Plak de nieuwe take(s) met dezelfde stiltes tot één mp3, lijn uit, vervang in `FILM.chapters[i]` `dur`, `segments`, `sentences` en `phrases`, vervang `blobs/0xx.mp3` (zelfde naam) en pak in met `scripts/filmbron.py`. Werk transcript (`data-t`) en looptijd 12:55 (kop regel 187, `#time` regel 220, getallentabel) bij.
2. Scènes hangen aan woorden via `W(zin, 'woord')`; in deze film staan veel woorden met ⁺ en ₂ (bijv. `W(n, 'NAD⁺')`, `CO₂`). Houd die tekens in `sentences[].words` precies gelijk, anders faalt de lookup.
3. Ondertitels gebruiken echte Unicode-tekens (NAD⁺, CO₂, H₂O); de speler zet ⁺ ⁻ ₂ ₃ ₄ ₆ om naar `<sup>/<sub>` omdat het lettertype ze niet heeft (`esc()` in `player.js`). Gebruik geen andere subscripts (bijv. ₁) zonder `SUBS` uit te breiden. Het transcript gebruikt al `<sup>/<sub>`.
4. Het rekenmodel (sprint/joggen, H1, H7, H8) zit in `models2.js`: verander je daar maxima of vertragingen, dan veranderen de grafiek, de meters en de getallen in de docenttabel; controleer of de gesproken tekst ("na zo'n tien seconden meer dan de helft op") nog klopt.
5. Een voorspelvraag aanpassen: `segments` (`question`) in `window.FILM` en de docenttabel. Bij een ander juist antwoord moet de take die begint met "Antwoord …" opnieuw worden opgenomen.

## Aandachtspunten

- Lettertypen: "Bronnen en versie" noemt IBM Plex Sans en Instrument Serif, maar het bestand bevat Fraunces, Source Sans 3 en IBM Plex Mono.
- Bronvermelding "Gastin & Suppiah 2026 (Sports Med)" en "Sports Medicine 2022 (critical power)" staan op de pagina; niet nagekeken bij deze reconstructie.
- Scènecommentaar H7 (regel 3871) zegt "Sprint: 60 s modeltijd; joggen: 5 min modeltijd", de docenttabel zegt "sprint in echte tijd, 0–40 s; joggen 10× versneld": mogelijk is één van beide verouderd.
- Kopcommentaar `sim.js` noemt nog "Alles versneld" en film 1-modules (`models.js`) zitten er ongebruikt in; onschuldig, maar maakt het bestand groter.
- Versiedatum vóór prompt v4/Part C, maar de code noemt zich "stijlkaart … look Micro". Alles staat in die ene donkere look, ook de baan, de loopster en de grafieken (Part C zou daar Macro of Schema gebruiken). De loopster is een pictogram zonder gezicht; Part C staat silhouetten toe voor actiefiguren.
- Uitspraak bij heropname: "acetyl-coA" moet klinken als "acetyl ko a" (uitspraaklijst); de stem-invoer staat niet in de HTML, dus controleer de huidige audio.

## Wachtlijst opnieuw inspreken

Aanvullingen 15-10-2026 na de vergelijking met Gewoon Uitgelegd (tekst staat als [nieuw] in `script.md`). Beide in H6 Zuurstof (blob 012.mp3 = `audio/ch_6.mp3`, nu 108,6 s, wordt ≈ +35 s). Volgens "Zo pas je deze film aan", punt 1–2: takes 6c en 6f opnieuw opnemen met Roos (eleven_multilingual_v2), hoofdstuk-mp3 opnieuw plakken met dezelfde stiltes, `dur`/`segments`/`sentences`/`phrases` van hoofdstuk 6 vervangen; de zinnummers ná take 6c schuiven (5 + 1 nieuwe zinnen), dus alle `W(n, …)` in `SCENES['6']` nalopen; let op de tekens ⁺ en ₂ in de woorden; begintijden H7–H8, transcript (`data-t`) en looptijd 12:55 (drie plekken) schuiven mee.

- **H6 · take 6c**: redox. De dissimilatie is een redoxreactie: glucose staat H-atomen (en daarmee elektronen) af aan NAD⁺ en FAD en wordt geoxideerd (reductor); zuurstof neemt de elektronen aan het eind van de keten op en wordt gereduceerd tot water (oxidator). Sluit aan op "Oxidatief, omdat de elektronen uiteindelijk naar zuurstof gaan."
- **H6 · take 6f**: de kloppende reactievergelijking één keer, na "… heet aerobe dissimilatie.": in woorden "één glucose plus zes zuurstof wordt zes koolstofdioxide plus zes water". In beeld staat volgens de vereenvoudigingentabel al de vorm met 6 H₂O links en 12 H₂O rechts plus de netto vorm; laat op deze zin de netto vorm C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O oplichten (`parts2.js`). Let op: ₁ (in C₆H₁₂O₆) staat niet in `SUBS` van `player.js`; alleen in beeld gebruiken, of `SUBS` uitbreiden als hij ook in de ondertitel komt.
- **Begrippen** (pagina): redoxreactie, oxidator, reductor toevoegen.
- **Beeld nodig**: bij 6c een klein schema: glucose → (e⁻ met H⁺) → NAD⁺/FAD → keten → O₂ → H₂O, met boven glucose "geoxideerd · reductor" en bij O₂ "gereduceerd · oxidator". Bij 6f de netto vergelijking in formules (zie boven).
- **Risicowoorden (uitspraaktest)**:
  - koolstofdioxide — vaste regel: stem-invoer "koolstofdie-oxide".
  - redoxreactie — geen IPA-bron gevonden; verwacht [reːˈdɔksreːˌɑksi]. Voorstel stem-invoer "redox-reactie" (koppelteken, anders kans op "redoks-reactie" als één brij).
  - geoxideerd — IPA oxideren [ɔksiˈderə(n)] (woorden.org via encyclo.nl); zoals geschreven.
  - gereduceerd — IPA reduceren [redyˈserə(n)] (woorden.org via encyclo.nl); zoals geschreven.
  - reductor — geen IPA-bron gevonden; verwacht [reːˈdʏktɔr], klemtoon op -duc-. Zoals geschreven; bij klemtoon op -tor: "redúctor".
  - oxidator — geen IPA-bron gevonden; verwacht [ɔksiˈdaːtɔr], klemtoon op -da-. Zoals geschreven; bij een fout: "oxi-daator".
  - acetyl-coA komt niet in de nieuwe zinnen voor; wel bij heropname van andere takes: "acetyl ko a".

## Wijzigingen
- 15 okt 2026 — Speler: de knop Vragen aan/uit (onthouden in `bk-vragen`, ook `?vragen=uit`) werkt nu altijd, ook na spoelen, in pauze en als je hem halverwege omzet. Bij Vragen uit vallen weg: de vraag zelf, de gesproken vraagzin(nen) ervoor (zinnen op '?', 'Wat denk je?', 'Denk even na.', 'Eerst een voorspelling.') en een los antwoord direct erna ('Antwoord B.', 'Ja.', 'Nee.', 'Precies.'); gewone uitlegzinnen blijven staan. De tijdbalk, tijd en hoofdstuktijden tonen de ingekorte duur. Code: `bkBouw()` maakt `BK.k` (stukken die de speler overslaat); regelnummers in de spelercode zijn daardoor een paar regels verschoven. Hoofdstukkaart 2,2 s in plaats van 3,0 s: de speler slaat het stille midden van de kaart over (mp3 ongewijzigd). De oude `vraagVensters`/`slaVraagOver` zijn vervangen.

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

Engine: `g.callout()` zonder lijn (zie film 1; myosine, actine, celmembraan, reeks enzymen, buiten-/binnenmembraan, pieken). `P.pointer()`-wijslijnen weg bij: geen NAD⁺ / H-atomen kunnen nergens heen, enzym, eiwitcomplex, H⁺ los in de matrix, elektronentransportketen, FADH₂ geeft hier af, ATP-synthetase (twee lijnen), ADP + fosfaat → ATP (2×), de keten loopt vast, geen NAD⁺ meer vrij; de kaartjes staan nu direct bij hun eiwit. Eén `P.pointer` bleef: de verbindingslijn van het inzet-kaartje 'een deel draait rond' naar de ATP-synthetase (zoom-/inzetlijn) (Kamiel: "die lijntjes naar begrippen moeten sowieso weg"; zie `films/BEELDAFSPRAKEN.md`). Gecontroleerd op contactbladen. Regelnummers elders in dit bestand kunnen een paar regels verschoven zijn.

## Wijziging 16 okt 2026: begrippen als kaartjesraster
Het begrippenblok ziet er nu uit als in de hoofdengine (bv. `films/cellen/van-molecuul-tot-biosfeer.html`): onder de kop "Begrippen" een `<div id="glossary">` met per begrip een kaartje `<div class="term"><b>begrip</b><p>uitleg</p></div>` (raster `repeat(auto-fill,minmax(260px,1fr))`). Volgorde en tekst van de begrippen zijn ongewijzigd; extra kolommen (bron, hoofdstuknummer) staan klein onder de uitleg in `<p class="gl-meta">`. De opmaak staat in `<style id="glossary-stijl">` vlak voor `</head>` (kleuren via de variabelen van deze pagina). Nieuw begrip: voeg een kaartje toe in `#glossary`. Omgezet met een script; regelnummers verderop in dit bestand kunnen enkele regels verschoven zijn. De kop "Begrippen" is een `<h2 class="gl-kop">` met dezelfde opmaak als op de voorbeeldpagina (Fraunces 700, 30px, regelhoogte 1,5, marge 0 0 12px; het lettertype zit als `@font-face` 'Fraunces Begrippen' in `#glossary-stijl`, kleur = tekstkleur van deze pagina).

## Wijziging 18 okt 2026: havo-basis en Havo/Vwo-knop

**Akkoord Kamiel (18 okt 2026):** De fosfaatbatterij (CP) hoort bij de havo-basis.

Geen aparte havofilm: in deze vwo-film zit nu een havo-basis (Biologie voor jou thema 8; havo-examen: aerobe dissimilatie in de mitochondriën, anaerobe dissimilatie/melkzuur- en alcoholgisting, weinig tegenover veel ATP, glucose + zuurstof → koolstofdioxide + water). Knop **Havo/Vwo** naast Leerling/Klas, onthouden in localStorage `bk-niveau` (gedeeld met de andere films), `?niveau=havo|vwo` gaat voor; standaard vwo. Zelfde werking en code als *Alles versneld* (zie daar, "Wijziging 18 okt 2026", voor de techniek: `blocks`, `ins`, `NV`, `BK.k`, `window.BKN`); hier komen havo-kaarten bij.

**Wat havo ziet en wat alleen vwo is**

| Hoofdstuk | Havo | Alleen vwo (paarse balk + 'vwo' in beeld, paars op de tijdbalk) |
|---|---|---|
| Opening, H1 fosfaataccu, H7 | alles | — |
| H2 Glycolyse | take 2a–2b (glucose → 2 pyrodruivenzuur, netto 2 ATP) | take 2c–2e met de vraag: H-atomen, NAD⁺/NADH,H⁺, glycolyse stopt zonder NAD⁺ |
| H3 Gisting | **havo-alinea 3h**, daarna vanaf "Zonder zuurstof maak je dus wél ATP" | zin 1–6 met de vraag (melkzuur maakt NAD⁺ vrij) |
| H4 Van glucose naar CO₂ | vraag, take 4b, **havo-alinea 4h**, take 4e | take 4c–4d: decarboxyleren, coA, acetyl-coA, citroenzuurcyclus, FAD |
| H5 De elektronentransportketen | — (overgeslagen; grijs met 'alleen vwo' in de hoofdstuklijst) | alles |
| H6 Zuurstof | **havo-alinea 6h**, vraag, "Antwoord C: in water.", **havo-alinea 6i**, zin 5–6, "En als er geen zuurstof is?", zin 17, take 6f | zin 1 (keten, elektronen), 3–4 (laatste elektronenacceptor), take 6c (oxidatieve fosforylering), 6d, zin 13–16 (keten loopt vast, H⁺, ATP-synthetase, citroenzuurcyclus) |
| H8 Terug naar de baan | alles behalve de laatste twee zinnen; **havo-alinea 8h** | zin 10–11 (acetyl-coA, citroenzuurcyclus, elektronentransportketen, laatste elektronenacceptor) |

Vragen: havo krijgt er 5 van de 8 (H1, H4, H6, H7 en geen in H2/H3/H5). De havo-tekst als geheel is nagelezen (zinnen buiten de overgeslagen stukken, Playwright): geen gaten.

**Nieuwe segmenten (alleen havo)** — stem Roos (voice 7qdUFMklKPaaAVMsBTBt), eleven_multilingual_v2 (zelfde model als de film), 1 take per alinea, woordtijden met Scribe (eleven_scribe_v1); flow "Stofwisseling havo-basis (18 okt 2026)". Credits samen 751 (207 + 174 + 159 + 64 + 147). Elke take is als 0,15 s stilte + stem + 0,55 s stilte in het hoofdstuk-mp3 geplakt; bestaande opnames zijn ongemoeid, de tijden erna schuiven op.

| Take | Hoofdstuk · tijd (hoofdstuktijd, nieuw) | Ondertitel | Stem-invoer | Beeld |
|---|---|---|---|---|
| 3h | H3 · 2,95–16,42 s | Stel: er is geen zuurstof. Dan gaat de glycolyse toch door. Een enzym zet het pyrodruivenzuur om in melkzuur. Die stap levert zelf geen ATP op, maar de glycolyse levert nog steeds netto twee ATP per glucose. | zoals de ondertitel | havo-kaart "Zonder zuurstof": glucose → 2 pyrodruivenzuur (glycolyse) → 2 melkzuur (enzym, geen ATP), tag netto 2 ATP per glucose |
| 4h | H4 · 38,59–48,95 s | In de matrix breken enzymen het pyrodruivenzuur stap voor stap verder af. Daarbij komt CO₂ vrij. De H-atomen die eraf gaan, worden naar het binnenmembraan gebracht. | … komt cee-oo-twee vrij. De haa-atomen … | havo-kaart "In de matrix": mitochondrium, pyrodruivenzuur gaat erin, CO₂ vliegt eruit, H-atomen naar het binnenmembraan; blijft staan t/m zin 18 (Cn 105,0 s) met 'alle 6 C-atomen → CO₂' en 'CO₂ → bloed → longen' |
| 6h | H6 · 2,95–12,61 s | In het binnenmembraan komt de energie uit die H-atomen vrij. Daarmee maakt het mitochondrium heel veel ATP. Aan het eind is daarvoor zuurstof nodig, O₂. | … die haa-atomen … zuurstof nodig, oo-twee. | havo-kaart "In het binnenmembraan": H-atomen → energie → veel ATP; O₂ nodig |
| 6i | H6 · 31,38–36,22 s | Zuurstof neemt aan het eind de H-atomen op. Zo ontstaat water. | … de haa-atomen op … | havo-kaart "Zuurstof wordt water": O₂ + H-atomen → water; blijft staan t/m zin 6 (Cn 55,97 s) met 'de zuurstof wordt water' en 'C uit glucose → CO₂' |
| 8h | H8 · 48,84–60,27 s | Aeroob breken je mitochondriën het pyrodruivenzuur verder af, tot CO₂ en water. Met zuurstof levert dat ongeveer dertig ATP per glucose op. | … tot cee-oo-twee en water … | geen kaart ('warp'): het schema van H8 speelt het vervangen vwo-stuk af; bij havo staat in het aeroob-vak alleen pyrodruivenzuur + O₂ → CO₂ + H₂O en 'totaal ± 30 ATP per glucose' |

**Havo-kaarten en scène-aanpassingen (in `film.src.html`)**
- `window.HAVO` (regel ≈ 4388, module "havo.js"): één functie per kaart (`'3:3h'`, `'4:4h'`, `'6:6h'`, `'6:6i'`), getekend door `NV.over` (regel ≈ 4755) over het gedimde beeld. Het beeld eronder staat stil op het punt waar havo verdergaat (`blk[1]`). `W('woord')` = woordtijd in de havo-alinea, `S(n, 'woord')` = woordtijd uit basiszin n (voor kaarten met `Cn`, die bij havo blijven staan tot het eind van die zin).
- `window.BKN` in scènes: H2 tag 'nog een glucose: let op de H-atomen' weg (regel ≈ 3082), H3 NAD⁺-paneel weg (regel ≈ 3251), H8 schema zonder 'NADH,H⁺'/'NAD⁺ terug' (regel ≈ 4291) en met een havo-versie van het aeroob-vak (regel ≈ 4301).
- Begrippen met `class="term vwo"` (verborgen bij havo, ook in de flipkaarten): co-enzym, NAD⁺/NADH,H⁺, decarboxyleren, acetyl-coA, citroenzuurcyclus, FAD/FADH₂, elektronentransportketen, ATP-synthetase, laatste elektronenacceptor, oxidatieve fosforylering, fosforylering.
- Overige regels: CSS "niveau havo/vwo" r184, knop r255, `NV` r4515, knoppen r4849.
- Gebouwd met `scripts/stofwisseling_niveau/bouw.sh 2 …` (specs `f2.json`, `tweaks_f2.json`, kaarten `havo/f2.js`, takes in `tts/`).

**Let op bij de wachtlijst (opnieuw inspreken H6/6c en 6f)**: het hoofdstuk-mp3 van H6 bevat nu twee havo-alinea's. Neem bij heropname de havo-stukken mee (of bouw opnieuw vanaf de film van vóór 18 okt met `bouw.sh` nadat de nieuwe takes erin zitten). De [nieuw]-zinnen van 6c (redox) horen bij vwo; de netto-vergelijking in 6f kan basis zijn.

**Getest (18 okt 2026, Playwright/Chromium)**: havo en vwo, Vragen aan/uit, snelheid 1,5×, knop onthouden na herladen; afspelen over elk overgeslagen stuk (H2→H3, H3, H4, H4→H6 bij havo, H6 drie keer, H8; ook de havo-alinea's overgeslagen bij vwo); geen JS-fouten; vwo-beeld pixel-gelijk aan de oude film op dezelfde momenten (H3, H4, H6); stills van alle havo-kaarten.
