# Alles versneld — script

Bron: gereconstrueerd uit de ondertitels/scriptdata in de gepubliceerde HTML (2026-10-12): `window.FILM.chapters[i].phrases` (ondertitelfrasen) en `.sentences` (zinnen met woordtijden). Stem-invoer met respellings (uitspraaklijst) staat niet in de HTML; de tekst hieronder is de ondertiteltekst, letterlijk.

Tijden: `[m:ss.s]` is de begintijd van de ondertitelfrase op de **filmklok** (alle hoofdstukken achter elkaar, zoals de tijdbalk van de speler). In de HTML staan de tijden **per hoofdstuk** (0 = begin van dat hoofdstuk-mp3); trek de begintijd van het hoofdstuk eraf. Elke hoofdstuk-mp3 bevat ook de stiltes (kaart, vraag, pauze, eindkaart): de audio is de klok.

Een "take" is een doorlopend stuk stem binnen het hoofdstuk-mp3 (`segments[].kind = "narr"`, veld `take`). Zinnen met `verdieping: true` zijn gemarkeerd met *(verdieping)*.


## 0. Opening (cold open)

Audio: blob 006.mp3 (`audio/ch_0.mp3` in `window.__AUDIO`) · 0:00–0:17 (17,2 s volgens ffprobe; `dur` in FILM 17,129 s)  
Niveau: 6 vwo

**Take 0a** · 0:00.8–0:11.1 (hoofdstuk 0,80–11,13 s)

[0:00.8] Twee blokjes aardappel, dezelfde vloeistof.  
[0:03.5] De rauwe schuimt als een gek.  
[0:05.4] De gekookte doet niets.  
[0:07.1] Wat is er in die gekookte aardappel kapot?  
[0:09.5] En waarom komt dat niet meer goed?

> Titelkaart (0:12.3, 4,0 s, stil)

> Beeld (uit de scènecommentaar, regel 1652): H0 Cold open — twee reageerbuizen met een blokje aardappel (rauw / gekookt en afgekoeld) in dezelfde vloeistof. Linialen, klok (beeld versneld) en 'schematisch' staan er al vóór het schuimen; op 'schuimt' starten alleen het schuim en de klok. Op 'gekookte' licht de gekookte buis op. Vóór de zoom verdwijnen alle hulplijnen; 'gekookt' blijft aan de buis vast. Geen uitzoomen: de scène vervaagt, daarna de titel op een schone achtergrond.


## 1. H1 Wat eiwitten doen

Audio: blob 007.mp3 (`audio/ch_1.mp3` in `window.__AUDIO`) · 0:17–1:23 (66,1 s volgens ffprobe; `dur` in FILM 66,038 s)  
Niveau: 6 vwo

> Hoofdstukkaart (3,0 s, stil): "Wat eiwitten doen"

**Take 1a** · 0:20.1–1:00.9 (hoofdstuk 3,00–43,77 s)

[0:20.1] Wat kan een eiwit eigenlijk, en waarom?  
[0:22.9] Je lichaam zit vol eiwitten.  
[0:25.0] Elk eiwit bestaat uit een of meer lange ketens aminozuren,  
[0:29.0] opgevouwen tot een eigen vorm.  
[0:31.0] Die vorm bepaalt wat het eiwit kan.  
[0:34.2] Een motoreiwit verandert van vorm  
[0:36.1] en loopt zo over een microtubulus,  
[0:38.2] met een blaasje op sleeptouw.  
[0:40.1] Een receptor past precies  
[0:41.9] om een bepaalde signaalstof heen.  
[0:44.0] Een transporteiwit brengt een bepaalde stof  
[0:46.4] door het membraan.  
[0:47.7] Een eiwithormoon, zoals insuline,  
[0:50.0] past weer in zo'n receptor.  
[0:51.7] Een membraaneiwit zit in het membraan,  
[0:53.5] bijvoorbeeld om cellen aan elkaar te houden.  
[0:55.8] En een enzym versnelt één specifieke reactie.  
[0:59.0] Over dat laatste gaat deze film.

> Vraag (1:01.5, stil segment van 11,5 s; bedenktijd 47,88–55,88 s, onthulling 56,90 s in het hoofdstuk): Terug naar de gekookte aardappel. Wat is daarin veranderd?  
> Opties: A. De eiwitten zijn uiteengevallen in losse aminozuren. · B. De eiwitten zijn hun vorm kwijt. · C. Het water is eruit gekookt.  
> Juist: B · verleidelijk (mis): A

**Take 1b** · 1:13.6–1:20.4 (hoofdstuk 56,48–63,24 s)

[1:13.6] Antwoord B.  
[1:14.8] Zonder de juiste vorm  
[1:16.1] is een eiwit alleen nog een slappe keten.  
[1:18.5] Straks zie je precies hoe dat gaat.

> Beeld (uit de scènecommentaar, regel 1771): H1 Wat eiwitten doen. Inzoomen met een ware schaalbalk: vingertop → zenuw (gestippeld onder de huid) → één zenuwvezel → binnenin die vezel (microtubuli, blaasjes, veel eiwitten) → één eiwit: een lange keten aminozuren die even stil ligt en op 'opgevouwen' vouwt tot een eigen vorm (de keten blijft zwak zichtbaar in die vorm). 'vorm bepaalt functie' blijft als kop boven zes kaarten; elke kaart speelt één keer op het gesproken woord en staat daarna stil (iets gedimd). Na de vraag (vanaf reveal + 1,6 s) verliest hetzelfde eiwit zijn vorm: een slappe keten, de keten zelf blijft heel.


## 2. H2 Hoe een enzym versnelt

Audio: blob 008.mp3 (`audio/ch_2.mp3` in `window.__AUDIO`) · 1:23–3:17 (114,4 s volgens ffprobe; `dur` in FILM 114,378 s)  
Niveau: 6 vwo

> Hoofdstukkaart (3,0 s, stil): "Hoe een enzym versnelt"

**Take 2a** · 1:26.2–1:50.8 (hoofdstuk 3,00–27,59 s)

[1:26.1] Dit is waterstofperoxide, het spul uit de reageerbuis.  
[1:29.8] Het kan vanzelf uiteenvallen in water en zuurstof.  
[1:32.6] Maar dat gaat zo traag dat je er niets van merkt.  
[1:35.4] Wat je hier ziet is een model: veel langzamer,  
[1:38.1] en met veel minder moleculen dan echt.  
[1:40.7] Elke reactie heeft een drempel: de activeringsenergie.  
[1:44.2] Alleen een botsing met genoeg energie,  
[1:46.2] in de goede stand, komt eroverheen.  
[1:48.6] En zulke botsingen zijn zeldzaam.

**Take 2b** · 1:52.4–2:13.9 (hoofdstuk 29,24–50,77 s)

[1:52.4] Nu zetten we één enzym in de vloeistof: katalase.  
[1:55.4] Waterstofperoxide is hier het substraat:  
[1:57.6] het molecuul waar het enzym op inwerkt.  
[1:59.8] Het enzym heeft een holte met precies de goede vorm:  
[2:02.7] het actieve centrum.  
[2:04.2] Een substraatmolecuul botst, past, en blijft even plakken.  
[2:08.0] Dat heet het enzym-substraatcomplex.  
[2:10.0] In de holte ligt het substraat zo,  
[2:12.0] dat de reactie makkelijker verloopt.

**Take 2c** · 2:14.8–2:20.4 (hoofdstuk 51,62–57,19 s)

[2:14.7] Via het enzym loopt de reactie over een lagere drempel.  
[2:17.8] Het enzym verlaagt de activeringsenergie.

> Vraag (2:22.0, stil segment van 11,5 s; bedenktijd 62,29–70,29 s, onthulling 71,37 s in het hoofdstuk): Wat gebeurt er met het enzymmolecuul als het product klaar is?  
> Opties: A. Het wordt verbruikt, net als het substraat. · B. Het is aan het eind weer precies als eerst. · C. Het valt uiteen in aminozuren.  
> Juist: B · verleidelijk (mis): A

**Take 2d** · 2:34.1–3:01.6 (hoofdstuk 70,89–98,44 s)

[2:34.0] Antwoord B.  
[2:35.2] In het complex verandert het substraat in product.  
[2:38.1] Het product laat los,  
[2:39.3] en het enzym is aan het eind weer precies als eerst.  
[2:42.6] Een enzym versnelt dus een reactie,  
[2:44.7] zonder zelf te veranderen.  
[2:47.5] Het volgende substraat botst en bindt meteen.  
[2:50.4] En het volgende.  
[2:51.2] Eén katalasemolecuul kan dit,  
[2:53.2] gemeten in het lab, miljoenen keren per seconde.  
[2:56.2] Daarom heb je er zo weinig van nodig.  
[2:58.5] En daarom schuimt een klein blokje aardappel zo hard.

**Take 2e** · 3:02.5–3:15.2 (hoofdstuk 99,29–112,08 s)

[3:02.4] Let op wat het enzym juist niet doet.  
[3:04.4] Het levert geen energie, het verandert alleen de drempel.  
[3:07.6] Begin en eind van het profiel  
[3:09.2] liggen precies waar ze lagen.  
[3:11.0] Hoeveel energie er vrijkomt, verandert dus niet.  
[3:13.8] Alleen hoe snel het gaat.

> Beeld (uit de scènecommentaar, regel 2197): H2 Hoe een enzym versnelt — deeltjessimulatie (links) + energieprofiel (rechts). Alles in schermcoördinaten (camera = 1). Tekst alleen buiten het deeltjesvenster, of op het enzymlichaam.


## 3. H3 Precies passend

Audio: blob 009.mp3 (`audio/ch_3.mp3` in `window.__AUDIO`) · 3:17–4:36 (78,6 s volgens ffprobe; `dur` in FILM 78,502 s)  
Niveau: 6 vwo

> Hoofdstukkaart (3,0 s, stil): "Precies passend"

**Take 3a** · 3:20.5–3:21.8 (hoofdstuk 3,00–4,21 s)

[3:20.5] Eerst een voorspelling.

> Vraag (3:22.4, stil segment van 11,5 s; bedenktijd 8,31–16,31 s, onthulling 17,41 s in het hoofdstuk): Je geeft katalase suiker in plaats van waterstofperoxide. Wat gebeurt er?  
> Opties: A. Katalase zet de suiker ook om, want het is een sterk enzym. · B. Er gebeurt niets: suiker past niet in het actieve centrum. · C. Het enzym past zijn vorm aan en zet de suiker langzaam om.  
> Juist: B · verleidelijk (mis): A

**Take 3b** · 3:34.5–3:52.7 (hoofdstuk 16,91–35,17 s)

[3:34.4] Antwoord B.  
[3:35.6] Katalase zet waterstofperoxide om, en bijna niets anders.  
[3:39.6] Dat molecuul past,  
[3:40.8] én wordt op de juiste plek vastgehouden.  
[3:43.3] Suiker en andere moleculen botsen, en kaatsen weer weg.  
[3:46.7] Elk enzym heeft zo zijn eigen substraat,  
[3:49.1] of een kleine groep die erop lijkt.  
[3:51.1] Enzymen zijn specifiek.

**Take 3c** · 3:54.6–4:22.6 (hoofdstuk 37,02–65,06 s)

[3:54.5] Je kunt dat zien als een sleutel in een slot:  
[3:56.8] het sleutel-slotmodel.  
[3:58.1] Maar een enzym is geen hard stuk metaal.  
[4:00.6] Door de binding verandert de vorm  
[4:02.4] van het actieve centrum nog iets.  
[4:04.4] Het sluit zich om het substraat heen.  
[4:06.8] Dat heet induced fit.  
[4:09.7] Zo wordt het substraat nog steviger vastgehouden.  
[4:12.9] Als het product loslaat,  
[4:14.1] krijgt het enzym zijn oude vorm terug.  
[4:16.6] Induced fit werkt alleen  
[4:18.3] bij een molecuul dat al bijna past.  
[4:20.6] Daarom klopt antwoord C niet.

**Take 3d** · 4:23.5–4:34.0 (hoofdstuk 65,91–76,50 s)

[4:23.4] Nog iets om goed te zien.  
[4:24.6] Het enzym zoekt zijn substraat niet op.  
[4:26.7] Alles beweegt willekeurig, en botsingen zijn toeval.  
[4:29.6] Dat het toch snel gaat,  
[4:30.8] komt doordat er per seconde enorm veel botsingen zijn.

> Beeld (uit de scènecommentaar, regel 2600): H3 Precies passend — één simulatie met katalase en twee andere enzymen; de camera zoomt in en uit. Tekst: termen in de strook boven het venster, legenda/tekening/teller in de zijkolom rechts.


## 4. H4 Warmte en zuur

Audio: blob 010.mp3 (`audio/ch_4.mp3` in `window.__AUDIO`) · 4:36–6:27 (111,8 s volgens ffprobe; `dur` in FILM 111,788 s)  
Niveau: 6 vwo

> Hoofdstukkaart (3,0 s, stil): "Warmte en zuur"

**Take 4a** · 4:39.0–4:49.7 (hoofdstuk 3,00–13,69 s)

[4:39.0] Wat doet warmte met de snelheid?  
[4:41.2] We draaien de temperatuur langzaam omhoog.  
[4:43.7] Moleculen bewegen sneller, botsen vaker en harder.  
[4:46.7] Meer botsingen halen de drempel: de reactie versnelt.

> Vraag (4:50.3, stil segment van 11,5 s; bedenktijd 17,79–25,79 s, onthulling 26,86 s in het hoofdstuk): We gaan door naar tachtig graden. Wat doet de reactiesnelheid?  
> Opties: A. Blijft stijgen: warmer is altijd sneller. · B. Zakt uiteindelijk tot bijna nul: het enzym verliest zijn vorm. · C. Blijft gelijk: het maximum is bereikt.  
> Juist: B · verleidelijk (mis): A

**Take 4b** · 5:02.4–5:35.5 (hoofdstuk 26,39–59,44 s)

[5:02.4] Antwoord B, en dat zie je nu gebeuren.  
[5:04.5] Net als in de gekookte aardappel.  
[5:06.3] Het eiwit trilt steeds harder.  
[5:08.3] Daardoor breken de zwakke bindingen  
[5:09.9] die de vouwing bij elkaar houden.  
[5:11.8] De keten zelf blijft heel.  
[5:13.6] Het actieve centrum verliest zijn vorm.  
[5:15.9] Dit heet denatureren:  
[5:17.3] het eiwit verliest zijn ruimtelijke structuur,  
[5:19.8] en daarmee zijn werking.  
[5:22.9] Een enzym leeft niet, dus het gaat ook niet dood.  
[5:25.7] Het verliest alleen zijn vorm.  
[5:27.3] Bij katalase na koken is dat in de praktijk onomkeerbaar.  
[5:31.0] Afkoelen helpt niet:  
[5:32.0] de losse ketens klonteren aan elkaar  
[5:34.0] en vouwen niet meer terug.

**Take 4c** · 5:36.3–5:58.0 (hoofdstuk 60,29–81,93 s)

[5:36.3] Warmte geeft meer botsingen,  
[5:38.0] maar maakt ook meer enzym kapot.  
[5:40.2] Samen geeft dat een optimumtemperatuur:  
[5:42.3] de top van de grafiek.  
[5:44.8] Voor veel enzymen uit je lichaam  
[5:46.5] ligt die rond zevenendertig graden,  
[5:48.4] je lichaamstemperatuur.  
[5:50.0] Links van de top halen te weinig botsingen de drempel.  
[5:53.1] Rechts van de top gaat steeds meer enzym kapot.  
[5:55.9] De grafiek is dus niet symmetrisch.

**Take 4d** · 6:00.3–6:25.8 (hoofdstuk 84,28–109,79 s)

[6:00.3] Ook de zuurgraad, de pH, verandert de vorm van een enzym.  
[6:04.7] Een beetje zuurder of basischer,  
[6:06.7] en de ladingen in het actieve centrum  
[6:08.6] kloppen al niet meer.  
[6:10.1] Nog verder weg, en de hele vouwing gaat kapot.  
[6:12.9] Pepsine in je maag werkt het best bij ongeveer pH twee.  
[6:16.3] Trypsine in je dunne darm bij ongeveer pH acht.  
[6:19.9] Elk enzym heeft zijn eigen optimum-pH.  
[6:22.8] Enzymen zijn gevoelig voor temperatuur en voor pH.

> Beeld (uit de scènecommentaar, regel 2877): H4 Warmte en zuur — sim met zeven enzymen (links), gemeten v(T) en v(pH) uit hetzelfde model (rechts). Na de vraag: verhitten tot 80 °C, inzoomen op één enzym (denatureren), afkoelen (ketens klonteren). Daarna pH.


## 5. H5 Hoeveelheden

Audio: blob 011.mp3 (`audio/ch_5.mp3` in `window.__AUDIO`) · 6:27–7:34 (66,7 s volgens ffprobe; `dur` in FILM 66,708 s)  
Niveau: 6 vwo · bevat verdiepingszinnen

> Hoofdstukkaart (3,0 s, stil): "Hoeveelheden"

**Take 5a** · 6:30.8–6:51.7 (hoofdstuk 3,00–23,82 s)

[6:30.8] Wat gebeurt er als je meer enzym of meer substraat geeft?  
[6:34.3] Eerst meer enzym, bij ruim voldoende substraat.  
[6:37.5] Twee keer zoveel enzym,  
[6:38.7] twee keer zoveel omzettingen per seconde.  
[6:41.3] Logisch: elk enzymmolecuul werkt los van de andere.  
[6:45.4] Nu meer substraat, bij een vaste hoeveelheid enzym.  
[6:48.3] Het gaat sneller:  
[6:49.2] meer botsingen met een vrij actief centrum.

> Vraag (6:52.3, stil segment van 11,5 s; bedenktijd 27,92–35,92 s, onthulling 36,92 s in het hoofdstuk): We voegen bij dit modelenzym nog veel meer substraat toe. Wat gebeurt er met de snelheid?  
> Opties: A. Blijft recht evenredig stijgen. · B. Stijgt steeds minder, tot een maximum: bijna alle enzymen zijn bezet. · C. Daalt: het substraat zit het enzym in de weg.  
> Juist: B · verleidelijk (mis): A

**Take 5b** · 7:04.4–7:20.5 (hoofdstuk 36,52–52,71 s)

[7:04.3] Antwoord B: kijk, de lijn buigt af.  
[7:07.4] Bijna elk actief centrum is vrijwel steeds bezet.  
[7:10.7] Een nieuw substraatmolecuul botst dan  
[7:12.6] op een bezet centrum en kaatst weg.  
[7:15.0] Dat heet verzadiging.  
[7:16.4] Meer substraat helpt dan niet meer.  
[7:19.1] Meer enzym wel.

**Take 5c** · 7:22.4–7:33.7 (hoofdstuk 54,56–65,91 s)

[7:22.3] Biochemici noemen die maximale snelheid V-max. *(verdieping)*  
[7:25.8] Kijk ook bij hoeveel substraat *(verdieping)*  
[7:27.4] je de helft van V-max haalt. *(verdieping)*  
[7:28.9] Hoe minder substraat daarvoor nodig is, *(verdieping)*  
[7:30.9] hoe steviger het enzym zijn substraat meestal bindt. *(verdieping)*

> Beeld (uit de scènecommentaar, regel 3281): H5 Hoeveelheden — proef 1: meer enzym (bij veel substraat); proef 2: meer substraat (bij vier enzymen). De camera schuift van proef 1 naar proef 2. Grafieken: metingen in hetzelfde model (measure.js), lijn = vloeiende fit.


## 6. H6 Remmen en activeren

Audio: blob 012.mp3 (`audio/ch_6.mp3` in `window.__AUDIO`) · 7:34–8:57 (82,5 s volgens ffprobe; `dur` in FILM 82,457 s)  
Niveau: 6 vwo

> Hoofdstukkaart (3,0 s, stil): "Remmen en activeren"

**Take 6a** · 7:37.5–7:59.1 (hoofdstuk 3,00–24,56 s)

[7:37.5] Hoe gaat een enzym weer uit?  
[7:39.4] In je cel worden enzymen ook afgeremd.  
[7:42.3] Twee manieren moet je kennen.  
[7:44.1] De eerste: een molecuul dat op het substraat lijkt.  
[7:47.2] Het past in het actieve centrum, maar wordt niet omgezet.  
[7:50.5] Zolang het daar zit, kan het substraat er niet in.  
[7:53.3] Maar het laat ook weer los.  
[7:55.2] Dit is een competitieve remstof:  
[7:57.1] het concurreert met het substraat.

> Vraag (8:00.7, stil segment van 11,5 s; bedenktijd 29,66–37,66 s, onthulling 38,73 s in het hoofdstuk): Je voegt veel extra substraat toe bij een competitieve remstof. Wat gebeurt er met de remming?  
> Opties: A. De remming verdwijnt grotendeels. · B. De remming blijft even sterk. · C. De remstof wordt nu ook omgezet.  
> Juist: A · verleidelijk (mis): B

**Take 6b** · 8:12.8–8:26.1 (hoofdstuk 38,26–51,55 s)

[8:12.8] Antwoord A.  
[8:14.0] Zodra de remstof loslaat,  
[8:15.5] botst er veel vaker een substraatmolecuul dan een remstof.  
[8:19.3] Hoe meer substraat,  
[8:20.5] hoe vaker een substraatmolecuul als eerste bindt.  
[8:23.6] De remming is dus concentratieafhankelijk.

**Take 6c** · 8:27.9–8:54.7 (hoofdstuk 53,40–80,16 s)

[8:27.9] De tweede manier zit op een andere plek:  
[8:30.0] de allosterische zijde.  
[8:31.5] Een molecuul dat daar hecht,  
[8:33.1] verandert de vorm van het hele enzym.  
[8:35.2] Bindt daar een inhibitormolecuul,  
[8:37.2] dan vervormt het actieve centrum.  
[8:39.0] Het substraat past niet meer.  
[8:40.9] Bij sommige enzymen past het substraat pas  
[8:43.2] als er een activatormolecuul gebonden is.  
[8:46.0] Bindt daar een activatormolecuul,  
[8:48.1] dan krijgt het actieve centrum de goede vorm.  
[8:51.0] Zo gaat een enzym harder of zachter,  
[8:53.2] afhankelijk van wat er bindt.

> Beeld (uit de scènecommentaar, regel 3496): H6 Remmen en activeren — groot enzym 1 met actief centrum (boven) en allosterische zijde (onder); later enzym 2 dat een activator nodig heeft. Competitieve remstof (bindt en laat los), meer substraat na de vraag, grafiek met/zonder remstof (metingen + fit), allosterische inhibitor (vervormt het actieve centrum, laat later weer los), en een activator op enzym 2.


## 7. H7 Terugkoppeling en helpers

Audio: blob 013.mp3 (`audio/ch_7.mp3` in `window.__AUDIO`) · 8:57–10:15 (78,3 s volgens ffprobe; `dur` in FILM 78,263 s)  
Niveau: 6 vwo · bevat verdiepingszinnen

> Hoofdstukkaart (3,0 s, stil): "Terugkoppeling en helpers"

**Take 7a** · 9:00.0–9:30.9 (hoofdstuk 3,00–33,94 s)

[8:60.0] Hoe stopt een keten van enzymen als er genoeg is?  
[9:03.0] Zonder dat iets het weet; kijk maar.  
[9:05.4] Drie enzymen maken samen één eindproduct.  
[9:08.5] Is er veel eindproduct,  
[9:09.8] dan bindt het aan het eerste enzym.  
[9:11.9] Op de allosterische zijde.  
[9:13.8] Het eerste enzym werkt veel minder,  
[9:15.9] en de hele keten vertraagt.  
[9:17.2] Wordt het eindproduct verbruikt,  
[9:19.2] dan bindt er steeds minder.  
[9:20.8] De keten komt weer op gang.  
[9:22.2] Het eindproduct remt zijn eigen aanmaak:  
[9:24.7] negatieve terugkoppeling.  
[9:27.5] Geen cel die iets wil,  
[9:28.9] alleen een molecuul dat ergens past.

**Take 7b** · 9:33.0–10:04.8 (hoofdstuk 35,99–67,76 s)

[9:32.9] Nog één ding.  
[9:33.9] Veel enzymen werken alleen met een helper.  
[9:36.2] Soms is dat een metaalion, zoals magnesium.  
[9:39.1] Dat noem je een cofactor.  
[9:41.9] Katalase heeft ook ijzer nodig:  
[9:43.8] dat zit vast ingebouwd, midden in het actieve centrum.  
[9:47.0] Soms is het een klein organisch molecuul.  
[9:49.8] Dat is een co-enzym.  
[9:52.2] Zonder helper bindt het substraat niet goed,  
[9:54.6] of de reactie zelf lukt niet.  
[9:56.7] Een co-enzym verandert vaak zelf mee in de reactie.  
[10:00.3] Een ander enzym zet het daarna weer terug.  
[10:02.4] Zo wordt het steeds opnieuw gebruikt.

**Take 7c** · 10:06.6–10:14.5 (hoofdstuk 69,61–77,46 s)

[10:06.6] Veel co-enzymen maakt je lichaam uit een vitamine. *(verdieping)*  
[10:09.8] Omdat co-enzymen steeds opnieuw gebruikt worden, *(verdieping)*  
[10:12.1] heb je van die vitamines maar weinig nodig. *(verdieping)*

> Beeld (uit de scènecommentaar, regel 3729): H7 Terugkoppeling en helpers — (A) keten van drie enzymen met remming door het eindproduct (sim, grafiek uit de sim); (B) helpers: cofactor (Mg2+), ijzer in katalase, co-enzym dat meeverandert en door een ander enzym wordt teruggezet.


## 8. H8 Terug naar de aardappel

Audio: blob 014.mp3 (`audio/ch_8.mp3` in `window.__AUDIO`) · 10:15–11:34 (79,5 s volgens ffprobe; `dur` in FILM 79,440 s)  
Niveau: 6 vwo

> Hoofdstukkaart (3,0 s, stil): "Terug naar de aardappel"

**Take 8a** · 10:18.3–10:55.2 (hoofdstuk 3,00–39,93 s)

[10:18.2] Terug naar de reageerbuizen.  
[10:20.4] In de rauwe aardappel zit katalase,  
[10:22.6] met een intact actief centrum.  
[10:24.8] Waterstofperoxide past,  
[10:26.5] de reactie loopt over een lagere drempel,  
[10:28.7] en zuurstof borrelt eruit.  
[10:30.7] Steeds opnieuw, met hetzelfde enzymmolecuul.  
[10:33.7] Alles botst op toeval, en dat is genoeg.  
[10:36.3] In de gekookte aardappel is katalase gedenatureerd.  
[10:39.6] De vouwing is los, het actieve centrum is weg.  
[10:42.7] Het substraat botst, maar past nergens meer.  
[10:45.4] En afkoelen helpt niet,  
[10:46.6] want de losse ketens klonteren en vouwen niet terug.  
[10:50.0] Het gekookte blokje is zo je controle:  
[10:52.3] zonder werkend enzym, verder zo gelijk mogelijk.

**Take 8b** · 10:57.2–11:26.9 (hoofdstuk 41,98–71,64 s)

[10:57.2] Eiwitten werken door hun vorm.  
[10:59.2] Enzymen verlagen de activeringsenergie,  
[11:01.6] ze leveren geen energie.  
[11:03.4] Ze worden niet verbruikt, dus een beetje enzym is genoeg.  
[11:06.8] Ze zijn specifiek, en gevoelig voor temperatuur en pH.  
[11:10.8] Competitieve remstoffen houden het actieve centrum bezet.  
[11:14.3] Moleculen op de allosterische zijde  
[11:16.4] remmen of activeren ze.  
[11:18.2] Zo werkt ook negatieve terugkoppeling.  
[11:21.6] Volgende keer zie je waar al die enzymen voor nodig zijn.  
[11:24.8] Energie vrijmaken uit glucose.

> Eindkaart (11:27.9, 6,0 s, stil)

> Beeld (uit de scènecommentaar, regel 4040): H8 Terug naar de aardappel. Uitzoomen: het katalasemolecuul krimpt tot een stip in het rauwe blokje. Links een vergroting met katalase intact (sim: actief centrum, legenda, mini-energiediagram tussen de buizen, teller). Rechts de gekookte aardappel: bij het koken gaat de vouwing los, het actieve centrum is weg, substraat botst tegen de losse keten (echte botsingen met de kralen), na afkoelen klonteren losse ketens samen. Controle met 'omgezet: 0'. Recapkaart met actieve regel en vetgedrukte begrippen; vooruitblik als voetregel; eindkaart.


---
Controle: 9 hoofdstukken = 9 audiofragmenten. Som `dur` in FILM 694,7 s (11:34); som audio (ffprobe) 695,1 s (11:35). Het verschil (≈ 0,39 s) is mp3-opvulling aan het eind van elk bestand.
