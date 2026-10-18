# Alles in het groen — script

Bron: gereconstrueerd uit de ondertitels/scriptdata in de gepubliceerde HTML (2026-10-12): `window.FILM.chapters[i].phrases` (ondertitelfrasen) en `.sentences` (zinnen met woordtijden). Stem-invoer met respellings (uitspraaklijst) staat niet in de HTML; de tekst hieronder is de ondertiteltekst, letterlijk.

Tijden: `[m:ss.s]` is de begintijd van de ondertitelfrase op de **filmklok** (alle hoofdstukken achter elkaar, zoals de tijdbalk van de speler). In de HTML staan de tijden **per hoofdstuk** (0 = begin van dat hoofdstuk-mp3); trek de begintijd van het hoofdstuk eraf. Elke hoofdstuk-mp3 bevat ook de stiltes (kaart, vraag, pauze, eindkaart): de audio is de klok.

Een "take" is een doorlopend stuk stem binnen het hoofdstuk-mp3 (`segments[].kind = "narr"`, veld `take`). Zinnen met `verdieping: true` zijn gemarkeerd met *(verdieping)*.


**Havo/vwo (18 okt 2026):** regels met *(vwo)* zijn alleen vwo (havo slaat ze over). Blokken met [havo] zijn nieuw en alleen voor havo (vwo slaat ze over), met tijden in de nieuwe hoofdstuktijd. In H3 liggen de oude tijden vanaf 0:54,8 (hoofdstuktijd) 9,01 s later in de nieuwe film, in H4 vanaf 0:15,6 15,05 s later; de filmklok vanaf H3 schuift mee.

## 0. Opening (cold open)

Audio: blob 006.mp3 (`audio/ch_0.mp3` in `window.__AUDIO`) · 0:00–0:12 (12,8 s volgens ffprobe; `dur` in FILM 12,791 s)  
Niveau: havo + vwo (basis)

**Take 0a** · 0:00.8–0:12.0 (hoofdstuk 0,80–11,99 s)

[0:00.8] Uit een eikel van een paar gram groeit  
[0:02.9] een eik van vele tonnen.  
[0:04.6] Al dat hout moet ergens vandaan komen.  
[0:07.1] Toch is de grond eronder nauwelijks lichter geworden.  
[0:10.1] Waar komt al die massa dan vandaan?

> Beeld (uit de scènecommentaar, regel 2776): H0 Cold open — eikel wordt eik: een eikel van een paar gram op een weegschaal, de boom groeit tot vele tonnen, de grond eronder blijft bijna even zwaar. Geen hoofdstukkaart (koude opening); de titelkaart komt na H1.


## 1. H1 Een oude proef

Audio: blob 007.mp3 (`audio/ch_1.mp3` in `window.__AUDIO`) · 0:12–1:29 (76,3 s volgens ffprobe; `dur` in FILM 76,255 s)  
Niveau: havo + vwo (basis)

> Hoofdstukkaart (3,0 s, stil): "Een oude proef"

**Take 1a** · 0:15.8–0:39.5 (hoofdstuk 3,00–26,66 s)

[0:15.7] In de zeventiende eeuw deed Jan Baptist van Helmont  
[0:18.2] een simpele proef.  
[0:19.2] Hij plantte een wilgje van ongeveer twee kilo  
[0:21.5] in een pot met afgewogen grond.  
[0:23.8] Vijf jaar lang gaf hij alleen water.  
[0:26.2] Toen woog de wilg ongeveer vijfenzeventig kilo.  
[0:29.2] De grond was maar zo'n zestig gram lichter.  
[0:31.7] De grond levert dus bijna niets.  
[0:34.6] Een levende boom is voor ongeveer de helft water.  
[0:37.5] Maar waar komt het hout zelf vandaan?

> Vraag (0:40.9, stil segment van 11,5 s; bedenktijd 31,56–39,56 s, onthulling 40,67 s in het hoofdstuk): Waar komt het grootste deel van het hout vandaan, als je het water eruit droogt?  
> Opties: A. Uit de grond. · B. Uit het water. · C. Uit de lucht.  
> Juist: C

**Take 1b** · 0:53.0–1:23.0 (hoofdstuk 40,16–70,25 s)

[0:52.9] Antwoord C: uit de lucht.  
[0:55.3] Van Helmont dacht nog: uit het water.  
[0:57.5] Voor het droge hout klopt dat maar voor een klein deel.  
[1:00.9] Hout bestaat vooral uit drie soorten atomen: C, H en O.  
[1:05.6] Het meeste daarvan komt uit CO₂, uit de lucht.  
[1:09.3] Welke atomen precies waar vandaan komen,  
[1:11.5] tel je straks zelf na.  
[1:13.3] Uit de bodem komen verder alleen mineralen:  
[1:15.7] een paar procent van de droge massa, in hout nog minder.  
[1:20.4] Hoe maakt een plant van een gas en water hout?

> Titelkaart (1:24.2, 4,0 s, stil)

> Beeld (uit de scènecommentaar, regel 2813): H1 Een oude proef — van Helmont: wilgje in een pot met afgewogen grond, vijf jaar alleen water; begin en eind naast elkaar met weegschalen. Vraag (waar komt het hout vandaan?) → na de onthulling: lucht, van Helmonts 'water', de atomen C/H/O, mineralen; slotvraag; daarna de titelkaart (titelsegment aan het eind van dit hoofdstuk).


## 2. H2 Blad en bladgroenkorrel

Audio: blob 008.mp3 (`audio/ch_2.mp3` in `window.__AUDIO`) · 1:29–2:25 (56,5 s volgens ffprobe; `dur` in FILM 56,450 s)  
Niveau: havo + vwo (basis)

> Hoofdstukkaart (3,0 s, stil): "Blad en bladgroenkorrel"

**Take 2a** · 1:32.0–2:11.6 (hoofdstuk 3,00–42,60 s)

[1:32.0] Het begint in het blad.  
[1:33.5] Een blad is plat: zo vangt het veel licht.  
[1:35.9] En dun: zo komen licht en CO₂ bij elke cel.  
[1:39.8] Via kleine openingen,  
[1:41.2] de huidmondjes, komt CO₂ het blad in.  
[1:44.4] Tussen de cellen zit veel lucht.  
[1:46.1] Zo komt CO₂ makkelijk bij elke cel.  
[1:49.1] Water komt via de vaten uit de wortels.  
[1:51.6] In de bladcellen liggen chloroplasten,  
[1:53.7] ook wel bladgroenkorrels.  
[1:55.4] Hier vindt de fotosynthese plaats.  
[1:57.7] Een chloroplast heeft een dubbelmembraan.  
[2:00.0] Binnenin ligt het stroma, een vloeistof vol enzymen.  
[2:03.5] In het stroma liggen platte zakjes:  
[2:05.3] thylakoïden, opgestapeld in grana.  
[2:07.8] In het membraan van de thylakoïden zit chlorofyl,  
[2:10.4] de groene kleurstof.

**Take 2b** · 2:13.5–2:23.7 (hoofdstuk 44,45–54,65 s)

[2:13.5] De fotosynthese heeft twee delen.  
[2:15.9] In de thylakoïden vangt chlorofyl licht: de lichtreactie.  
[2:19.5] In het stroma wordt CO₂ vastgelegd: de calvincyclus.

> Beeld (uit de scènecommentaar, regel 2880): H2 Blad en bladgroenkorrel — links een dwarsdoorsnede van een blad (opperhuid, palissadecellen, sponsweefsel met lucht, huidmondje, vaatbundel); licht van boven, CO₂ door een huidmondje, water uit de vaten. Rechts (vanaf r6) één chloroplast groot: dubbelmembraan, stroma, thylakoïden in grana, chlorofyl; tot slot de twee delen van de fotosynthese.


## 3. H3 De lichtreactie

Audio: blob 009.mp3 (`audio/ch_3.mp3` in `window.__AUDIO`) · 2:25–4:53 (148,1 s volgens ffprobe; `dur` in FILM 148,076 s)  
Niveau: havo + vwo, met vwo-blok(ken) *(vwo)* en havo-alinea [havo]

> Hoofdstukkaart (3,0 s, stil): "De lichtreactie"

**Take 3a** · 2:28.5–2:45.2 (hoofdstuk 3,00–19,68 s)

[2:28.4] Wat doet licht in de thylakoïden?  
[2:30.5] Chlorofyl absorbeert licht.  
[2:32.6] Daardoor krijgt een elektron  
[2:34.1] in het chlorofyl veel energie.  
[2:36.2] Het chlorofyl geeft dat elektron af  
[2:38.4] aan een keten van eiwitcomplexen.  
[2:40.6] Het chlorofyl mist nu een elektron.  
[2:42.9] Het krijgt een nieuw elektron uit water.

> Vraag (2:46.6, stil segment van 11,5 s; bedenktijd 24,58–32,58 s, onthulling 33,62 s in het hoofdstuk): Water geeft elektronen af. De plant geeft O₂ af. Waar komen de O-atomen in die O₂ vandaan?  
> Opties: A. Uit CO₂. · B. Uit water. · C. Uit CO₂ en water allebei.  
> Juist: B

**Take 3b** · 2:58.7–3:18.5 (hoofdstuk 33,18–53,00 s)

[2:58.6] Antwoord B: uit water.  
[3:00.7] Water wordt gesplitst in elektronen, H⁺ en O₂.  
[3:04.5] De elektronen vullen het chlorofyl aan.  
[3:07.0] De O₂ die de plant niet zelf gebruikt, verlaat het blad.  
[3:10.5] Dat de O₂ uit water komt, is ook gemeten, bij algen.  
[3:14.2] Geef je ze water met zware zuurstofatomen,  
[3:16.5] dan vind je die terug in de O₂.

**Take 3c** · 3:20.3–3:43.2 (hoofdstuk 54,85–77,70 s)

**Take 3h [havo]** · nieuw 18-10-2026 · hoofdstuk 54.80–63.81 s (stem 54.95 s), alleen havo  
[havo · 54.95 s] Met de energie van de elektronen maakt de chloroplast ATP.  
[havo · 58.71 s] Aan het eind van de keten neemt een hulpmolecuul de elektronen en H⁺ op.  
> Stem-invoer (Roos, eleven_multilingual_v2, 1 take): Met de energie van de elektronen maakt de chloroplast ATP. Aan het eind van de keten neemt een hulpmolecuul de elektronen en haa-plus op.  

[3:20.3] Onderweg geven de elektronen energie af. *(vwo)*  
[3:23.1] Met die energie pompt een *(vwo)*  
[3:24.5] eiwitcomplex H⁺ het thylakoïd in. *(vwo)*  
[3:27.4] Ook het H⁺ uit water komt in het thylakoïd terecht. *(vwo)*  
[3:30.7] Zo hoopt H⁺ zich op in het thylakoïd. *(vwo)*  
[3:33.0] In het stroma is er weinig. *(vwo)*  
[3:35.0] De H⁺ stromen terug door ATP-synthetase. *(vwo)*  
[3:38.3] Daarbij ontstaat ATP. *(vwo)*  
[3:40.1] Dat ken je uit het mitochondrium: hetzelfde principe. *(vwo)*

**Take 3d** · 3:45.2–4:04.8 (hoofdstuk 79,75–99,34 s)

[3:45.2] Onderweg krijgen de elektronen bij een tweede chlorofyl *(vwo)*  
[3:48.2] nog een keer energie uit licht. *(vwo)*  
[3:50.1] Aan het eind komen ze bij een co-enzym: NADP⁺. *(vwo)*  
[3:53.9] NADP⁺ lijkt op NAD⁺ uit de vorige film, *(vwo)*  
[3:57.5] met één fosfaat extra. *(vwo)*  
[3:59.4] Met de elektronen en H⁺ uit het stroma wordt het NADPH,H⁺. *(vwo)*

**Take 3e** · 4:06.7–4:35.3 (hoofdstuk 101,19–129,81 s)

[4:06.6] Fosforylering ken je al: fosfaat aan ADP koppelen. *(vwo)*  
[4:10.9] Foto, omdat de energie uit licht komt. *(vwo)*  
[4:13.8] Gaan de elektronen zo van water naar NADP⁺, *(vwo)*  
[4:17.4] dan heet het niet-cyclische fotofosforylering. *(vwo)*  
[4:20.7] Soms gaan de elektronen na het *(vwo)*  
[4:22.3] tweede chlorofyl niet naar NADP⁺, *(vwo)*  
[4:25.1] maar terug naar de pomp in de keten. *(vwo)*  
[4:27.3] Dan ontstaat alleen ATP, en geen NADPH,H⁺ of O₂. *(vwo)*  
[4:32.7] Dat heet cyclische fotofosforylering. *(vwo)*

**Take 3f** · 4:37.2–4:51.8 (hoofdstuk 131,66–146,28 s)

[4:37.1] De lichtreactie gebruikt dus licht en water.  
[4:39.9] Ze levert O₂, ATP en NADPH,H⁺.  
[4:44.4] De energie uit licht zit nu in ATP en NADPH,H⁺,  
[4:49.7] aan de kant van het stroma.

> Beeld (uit de scènecommentaar, regel 2972): H3 De lichtreactie — thylakoïdmembraan in close-up (thylakoïdruimte boven, stroma onder), zelfde opbouw als de elektronentransportketen in film 2. Simulatie: LightSim (sim3.js). Rechts een vaste kolom voor kaartjes. Regie op de woorden: licht op complex 1 bij 'absorbeert', elektron weg bij 'energie', keten bij 'keten', gat bij 'mist', water splitsen pas na de onthulling ('gesplitst'), pomp vanaf 'pompt', ATP-synthetase vanaf 'stromen', tweede licht bij 'tweede', NADP⁺ vanaf 'co-enzym', cyclisch r26–28, samenvatting r29–31.


## 4. H4 De calvincyclus

Audio: blob 010.mp3 (`audio/ch_4.mp3` in `window.__AUDIO`) · 4:53–6:54 (121,2 s volgens ffprobe; `dur` in FILM 121,124 s)  
Niveau: havo + vwo, met vwo-blok(ken) *(vwo)* en havo-alinea [havo]

> Hoofdstukkaart (3,0 s, stil): "De calvincyclus"

**Take 4a** · 4:56.6–5:25.3 (hoofdstuk 3,00–31,76 s)

[4:56.5] In het stroma draait een kringloop van enzymreacties:  
[4:59.6] de calvincyclus.  
[5:01.1] Assimilatie betekent:  
[5:02.4] uit kleine stoffen grotere organische stoffen opbouwen.  
[5:06.1] Dissimilatie is het omgekeerde: afbreken.  
**Take 4h [havo]** · nieuw 18-10-2026 · hoofdstuk 15.61–30.66 s (stem 15.76 s), alleen havo  
[havo · 15.76 s] Enzymen leggen daar CO₂ vast in een organische stof.  
[havo · 19.21 s] Dat heet koolstofassimilatie.  
[havo · 21.10 s] Met energie uit ATP en H-atomen uit de lichtreactie maken ze er stap voor stap glucose van.  
[havo · 27.19 s] Voor één glucose zijn zes CO₂ nodig.  
> Stem-invoer (Roos, eleven_multilingual_v2, 1 take): Enzymen leggen daar cee-oo-twee vast in een organische stof. Dat heet koolstofassimilatie. Met energie uit ATP en haa-atomen uit de lichtreactie maken ze er stap voor stap glucose van. Voor één glucose zijn zes cee-oo-twee nodig.  

[5:09.2] Het enzym rubisco koppelt CO₂ *(vwo)*  
[5:12.0] aan een stof met vijf C-atomen. *(vwo)*  
[5:14.8] Die stof heet ribulose-1,5-difosfaat. *(vwo)*  
[5:18.0] Zo komt het C-atoom uit CO₂ *(vwo)*  
[5:21.0] in een organische stof terecht. *(vwo)*  
[5:23.1] Dat heet koolstofassimilatie. *(vwo)*

**Take 4b** · 5:27.2–5:48.8 (hoofdstuk 33,61–55,19 s)

[5:27.1] Wat ontstaat, *(vwo)*  
[5:28.1] valt meteen uiteen in twee stoffen met elk drie C-atomen. *(vwo)*  
[5:32.2] Die krijgen H-atomen van NADPH,H⁺, met energie uit ATP. *(vwo)*  
[5:38.7] Dat heet reductie. Zo ontstaat glyceraldehyde-3-fosfaat. *(vwo)*  
[5:43.3] NADP⁺, ADP en fosfaat zijn dan weer beschikbaar *(vwo)*  
[5:47.4] voor de lichtreactie. *(vwo)*

**Take 4c** · 5:50.6–6:20.7 (hoofdstuk 57,04–87,13 s)

[5:50.6] Volg drie rondes. *(vwo)*  
[5:52.3] Drie ribulose-1,5-difosfaat hebben samen vijftien C. *(vwo)*  
[5:57.0] Drie CO₂ brengen er drie bij. Samen achttien C. *(vwo)*  
[6:00.9] Dat worden zes glyceraldehyde-3-fosfaat, elk met drie C. *(vwo)*  
[6:05.2] Vijf daarvan vormen, met ATP, *(vwo)*  
[6:07.5] weer drie ribulose-1,5-difosfaat. *(vwo)*  
[6:10.5] Zo kan de kringloop door. *(vwo)*  
[6:12.4] Eén glyceraldehyde-3-fosfaat blijft over. *(vwo)*  
[6:15.4] Uit twee daarvan ontstaat een glucose: *(vwo)*  
[6:17.8] zes C-atomen, uit zes CO₂. *(vwo)*

> Vraag (6:22.5, stil segment van 11,5 s; bedenktijd 92,43–100,43 s, onthulling 101,50 s in het hoofdstuk): Een plant staat in het licht. Je doet het licht uit. Wat gebeurt er met de calvincyclus?  
> Opties: A. Die gaat gewoon door; hij gebruikt geen licht. · B. Die stopt binnen korte tijd. · C. Die gaat juist sneller.  
> Juist: B

**Take 4d** · 6:34.6–6:52.9 (hoofdstuk 101,03–119,32 s)

[6:34.6] Antwoord B.  
[6:35.8] De calvincyclus gebruikt zelf geen lichtenergie,  
[6:38.7] maar wel ATP en NADPH,H⁺.  
[6:42.8] Die komen alleen uit de lichtreactie,  
[6:45.4] en de voorraad is klein.  
[6:47.0] Soms heet de calvincyclus de donkerreactie.  
[6:49.9] Die naam is verwarrend: in het donker stopt hij juist.

> Beeld (uit de scènecommentaar, regel 3099): H4 De calvincyclus — kringloop in het stroma. Eerste ronde met de hand aan de woorden gekoppeld (rubisco, ribulose-1,5-difosfaat, koolstofassimilatie, uiteenvallen, reductie met NADPH,H⁺ en ATP, glyceraldehyde-3-fosfaat); vanaf 'Volg drie rondes' draait CalvinSim (sim3.js) door met telling rechts; bij de onthulling (licht uit) valt de aanvoer van ATP en NADPH,H⁺ weg en stokt de kringloop. Tot slot 'donkerreactie' als verwarrende naam.


## 5. H5 Atomen tellen

Audio: blob 011.mp3 (`audio/ch_5.mp3` in `window.__AUDIO`) · 6:54–8:18 (83,9 s volgens ffprobe; `dur` in FILM 83,904 s)  
Niveau: havo + vwo (basis)

> Hoofdstukkaart (3,0 s, stil): "Atomen tellen"

**Take 5a** · 6:57.7–7:08.6 (hoofdstuk 3,00–13,87 s)

[6:57.7] Volg de atomen.  
[6:59.1] De C-atomen van zes CO₂ komen in één glucose.  
[7:03.1] De O₂ komt uit water.  
[7:04.6] Voor zes O₂ splitst de plant twaalf H₂O.

> Vraag (7:10.0, stil segment van 11,5 s; bedenktijd 18,77–26,77 s, onthulling 27,78 s in het hoofdstuk): Alle O-atomen uit dat water komen in O₂. Waar komen de O-atomen in glucose dan vandaan?  
> Opties: A. Uit water. · B. Uit CO₂. · C. Uit O₂ uit de lucht.  
> Juist: B

**Take 5b** · 7:22.1–7:48.4 (hoofdstuk 27,37–53,74 s)

[7:22.0] Antwoord B: uit CO₂.  
[7:24.4] Zes CO₂ hebben twaalf O-atomen.  
[7:27.2] Zes komen in glucose, zes in nieuw water.  
[7:29.9] Dat nieuwe water ontstaat onderweg,  
[7:31.9] bij de reacties van de fotosynthese.  
[7:34.2] De biologisch juiste samenvatting is daarom:  
[7:37.1] zes CO₂ en twaalf H₂O geven glucose, zes H₂O en zes O₂.  
[7:43.2] Er staat water aan beide kanten:  
[7:44.8] de plant splitst twaalf H₂O en maakt zes nieuwe.

**Take 5c** · 7:50.3–8:03.7 (hoofdstuk 55,59–68,98 s)

[7:50.2] Weeg nu de atomen in glucose.  
[7:52.4] De C- en O-atomen samen zijn  
[7:54.5] ruim negentig procent van de massa.  
[7:56.8] En die komen allebei uit CO₂.  
[7:59.4] Daar is het antwoord op de eik:  
[8:00.9] het droge hout komt vrijwel helemaal uit de lucht.

**Take 5d** · 8:06.0–8:16.8 (hoofdstuk 71,33–82,10 s)

[8:06.0] Kijk je alleen naar de totaalreactie,  
[8:07.9] dan lijkt fotosynthese het omgekeerde van dissimilatie.  
[8:11.4] Maar de weg is heel anders:  
[8:13.0] andere enzymen, een andere plek.  
[8:15.2] En de energie komt uit licht.

> Beeld (uit de scènecommentaar, regel 3206): H5 Atomen tellen — de totaalreactie opgebouwd uit de weg van de atomen: C uit 6 CO₂ → glucose; O₂ uit 12 H₂O; na de onthulling de O-atomen van CO₂ → glucose en nieuw water; de biologisch juiste samenvatting met water aan beide kanten; massa van glucose (C en O ruim 90 %, allebei uit CO₂) → het antwoord op de eik; tot slot fotosynthese ≠ omgekeerde dissimilatie.


## 6. H6 Glucose als grondstof

Audio: blob 012.mp3 (`audio/ch_6.mp3` in `window.__AUDIO`) · 8:18–10:57 (158,6 s volgens ffprobe; `dur` in FILM 158,551 s)  
Niveau: havo + vwo (basis)

> Hoofdstukkaart (3,0 s, stil): "Glucose als grondstof"

**Take 6a** · 8:21.6–8:51.6 (hoofdstuk 3,00–32,99 s)

[8:21.6] Volg één glucose uit een eikenblad.  
[8:24.2] Een deel van de glucose breekt de plant af  
[8:26.1] tot CO₂ en water: dissimilatie.  
[8:29.4] Dat gebeurt in het grondplasma en de mitochondriën,  
[8:32.1] net als bij jou.  
[8:33.4] Glucose is dan brandstof.  
[8:35.3] Maar de chloroplast maakt toch al ATP?  
[8:38.4] De calvincyclus gebruikt die ATP vooral zelf.  
[8:42.0] 's Nachts maakt de chloroplast geen ATP.  
[8:44.8] En wortels hebben helemaal geen chloroplasten.  
[8:47.7] De rest van de glucose is grondstof:  
[8:49.9] voortgezette assimilatie.

**Take 6b** · 8:53.4–8:59.1 (hoofdstuk 34,84–40,51 s)

[8:53.4] Overdag maakt de chloroplast van glucose zetmeel.  
[8:56.6] Zetmeel lost niet op, en is een reservestof.

> Vraag (8:59.7, stil segment van 11,5 s; bedenktijd 44,61–52,61 s, onthulling 53,64 s in het hoofdstuk): 's Ochtends dek je een deel van een blad af met aluminiumfolie. 's Avonds kleur je het blad met jodium. Wat zie je?  
> Opties: A. Het hele blad wordt blauwzwart. · B. Alleen het belichte deel wordt blauwzwart. · C. Alleen het afgedekte deel wordt blauwzwart.  
> Juist: B

**Take 6c** · 9:11.8–9:21.2 (hoofdstuk 53,21–62,63 s)

[9:11.8] Antwoord B.  
[9:13.0] Alleen waar licht kwam, is zetmeel gemaakt.  
[9:15.7] En na een nacht in het donker kleurt bijna niets meer.  
[9:18.7] 's Nachts breekt de plant het zetmeel weer af.

**Take 6d** · 9:23.1–9:34.9 (hoofdstuk 64,48–76,25 s)

[9:23.1] Voor transport maakt de plant meestal sacharose:  
[9:25.8] glucose en fructose aan elkaar.  
[9:28.2] De suiker in je thee is sacharose.  
[9:30.7] Via de bastvaten gaat de sacharose naar de wortels,  
[9:33.4] de knoppen en de eikels.

**Take 6e** · 9:36.5–9:56.1 (hoofdstuk 77,90–97,48 s)

[9:36.5] In de stam wordt glucose cellulose:  
[9:38.9] glucose aan glucose gekoppeld, in lange ketens.  
[9:42.2] Cellulose is een bouwstof, voor de celwanden.  
[9:45.3] Droog hout bestaat voor bijna de helft uit cellulose.  
[9:48.6] In zaden slaat de plant een voorraad op.  
[9:50.6] Een eikel zit vol zetmeel,  
[9:52.3] een zonnebloempit vooral vol vet.  
[9:54.3] Ook vet is een reservestof.

> Vraag (9:57.7, stil segment van 11,5 s; bedenktijd 102,58–110,58 s, onthulling 111,58 s in het hoofdstuk): Een plant maakt eiwitten uit glucose. Welk element zit wel in eiwitten, maar niet in glucose? De plant haalt het uit de bodem.  
> Opties: A. Koolstof (C). · B. Stikstof (N). · C. Kalium (K).  
> Juist: B

**Take 6f** · 10:09.8–10:55.2 (hoofdstuk 111,18–156,55 s)

[10:09.7] Antwoord B: stikstof.  
[10:11.9] Aminozuren bevatten stikstof, en soms zwavel.  
[10:15.7] Die neemt de plant als mineralen op uit de bodem,  
[10:18.1] bijvoorbeeld als nitraat.  
[10:19.7] Voor DNA en ATP heeft hij fosfaat nodig,  
[10:23.6] voor chlorofyl magnesium.  
[10:25.1] Op een zak kunstmest staan drie letters: N, P en K.  
[10:30.1] Dat zijn macronutriënten:  
[10:31.7] mineralen die een plant veel nodig heeft.  
[10:34.4] Van micronutriënten, zoals ijzer,  
[10:36.6] is maar heel weinig nodig.  
[10:38.5] IJzer zit niet in chlorofyl,  
[10:40.4] maar de plant heeft het wel nodig om chlorofyl te maken.  
[10:43.8] Zonder ijzer wordt een blad geel.  
[10:46.3] In de winkel heet mest soms plantenvoeding.  
[10:49.1] Maar mest levert geen voedsel, alleen mineralen.  
[10:52.2] Het voedsel, glucose, maakt de plant zelf.

> Beeld (uit de scènecommentaar, regel 3267): H6 Glucose als grondstof — één glucose uit een eikenblad in het midden; zes kaarten bouwen op met de narratie: dissimilatie (brandstof), zetmeel (reservestof), sacharose (transportsuiker), cellulose (bouwstof), vet (reservestof), eiwitten en meer (met mineralen; pas na de stikstofvraag). Onder in het midden een notitiekaart voor de tussenstappen (ATP van de chloroplast, jodiumproef na de onthulling, hout, zaden, kunstmest/N-P-K, micronutriënten, plantenvoeding).


## 7. H7 Groeien of krimpen

Audio: blob 013.mp3 (`audio/ch_7.mp3` in `window.__AUDIO`) · 10:57–12:42 (105,7 s volgens ffprobe; `dur` in FILM 105,704 s)  
Niveau: havo + vwo (basis)

> Hoofdstukkaart (3,0 s, stil): "Groeien of krimpen"

**Take 7a** · 11:00.2–11:21.2 (hoofdstuk 3,00–24,02 s)

[11:00.1] Een plant dissimileert dag en nacht.  
[11:02.7] Overdag merk je dat meestal niet:  
[11:04.5] bij genoeg licht neemt de plant  
[11:06.1] meer CO₂ op dan hij afgeeft.  
[11:09.1] Biomassa is alle organische stof in de plant.  
[11:12.2] Is de assimilatie groter dan de dissimilatie,  
[11:15.0] dan neemt de biomassa toe.  
[11:16.8] 's Nachts is er geen fotosynthese.  
[11:19.0] Dan neemt de biomassa een beetje af.

**Take 7b** · 11:23.0–11:51.3 (hoofdstuk 25,87–54,10 s)

[11:23.0] Kijk naar deze grafiek.  
[11:24.6] Bij lichtintensiteit nul is er alleen dissimilatie:  
[11:27.7] de plant geeft CO₂ af.  
[11:30.2] Met meer licht neemt de fotosynthese toe.  
[11:33.0] Bij een bepaalde lichtintensiteit  
[11:34.8] zijn assimilatie en dissimilatie even groot.  
[11:38.1] Dat heet het compensatiepunt.  
[11:40.0] Daar snijdt de lijn de x-as: de netto opname is nul.  
[11:44.0] Wat je meet, is de netto fotosynthese.  
[11:46.7] De bruto fotosynthese is  
[11:48.3] de netto fotosynthese plus de dissimilatie.

> Vraag (11:53.1, stil segment van 11,5 s; bedenktijd 59,41–67,41 s, onthulling 68,50 s in het hoofdstuk): Een kamerplant staat in een hoek. Overdag is het licht daar precies zo sterk als het compensatiepunt. 's Nachts is het donker. Hoe verandert de plant in een paar weken?  
> Opties: A. Zijn biomassa neemt langzaam toe. · B. Zijn biomassa blijft gelijk. · C. Zijn biomassa neemt langzaam af.  
> Juist: C

**Take 7c** · 12:05.2–12:21.5 (hoofdstuk 68,00–84,39 s)

[12:05.1] Antwoord C.  
[12:06.3] Overdag legt hij precies evenveel vast als hij afbreekt.  
[12:10.3] 's Nachts dissimileert hij door, zonder fotosynthese.  
[12:13.9] Over een hele dag neemt zijn biomassa dus af.  
[12:17.0] Een plant groeit alleen als het licht overdag  
[12:19.4] ruim boven het compensatiepunt ligt.

**Take 7d** · 12:23.4–12:41.1 (hoofdstuk 86,24–103,90 s)

[12:23.3] Een varen in een donker bos dissimileert weinig.  
[12:27.1] Zijn compensatiepunt ligt lager.  
[12:28.9] Daardoor kan hij in de schaduw groeien.  
[12:31.0] En de eik? In de winter heeft hij geen bladeren.  
[12:33.6] Dan teert hij op zetmeel in zijn stam en wortels.  
[12:36.4] In het voorjaar lopen de knoppen daarop uit,  
[12:38.8] tot de nieuwe bladeren zelf glucose maken.

> Beeld (uit de scènecommentaar, regel 3334): H7 Groeien of krimpen — links een plantmodel met twee stromen (CO₂ in: assimilatie, CO₂ uit: dissimilatie), dag/nacht, en een biomassabalk; rechts vanaf r6 de grafiek netto CO₂-opname tegen lichtintensiteit (compensatiepunt, netto/bruto). Na de onthulling: kamerplant op het compensatiepunt (dag gelijk, nacht af), varen (lager compensatiepunt), eik in de winter.


## 8. H8 Wat remt de fotosynthese?

Audio: blob 014.mp3 (`audio/ch_8.mp3` in `window.__AUDIO`) · 12:42–14:05 (82,9 s volgens ffprobe; `dur` in FILM 82,876 s)  
Niveau: havo + vwo (basis)

> Hoofdstukkaart (3,0 s, stil): "Wat remt de fotosynthese?"

**Take 8a** · 12:45.9–13:00.1 (hoofdstuk 3,00–17,25 s)

[12:45.8] Meer licht geeft meer fotosynthese, maar niet eindeloos.  
[12:49.8] In het stijgende deel is licht de beperkende factor:  
[12:52.6] de factor die de snelheid begrenst.  
[12:55.0] Bij veel licht wordt de lijn vlak.  
[12:57.1] Dan is iets anders beperkend, bijvoorbeeld CO₂.

**Take 8b** · 13:01.0–13:09.5 (hoofdstuk 18,10–26,64 s)

[13:00.9] Geef je meer CO₂, dan gaat de lijn verder omhoog.  
[13:04.3] Daarom geven tuinders extra CO₂ in hun kassen:  
[13:07.6] zo'n twee keer zoveel als buiten.

> Vraag (13:10.9, stil segment van 11,5 s; bedenktijd 31,54–39,54 s, onthulling 40,57 s in het hoofdstuk): Een tuinder verhoogt het CO₂-gehalte in zijn kas op een donkere winterdag, zonder lampen. Wat gebeurt er met de fotosynthese?  
> Opties: A. Die neemt sterk toe. · B. Die verandert nauwelijks. · C. Die neemt af.  
> Juist: B

**Take 8c** · 13:23.0–13:29.7 (hoofdstuk 40,14–46,88 s)

[13:22.9] Antwoord B.  
[13:24.1] Op een donkere dag is licht de beperkende factor.  
[13:27.2] Meer CO₂ helpt dan nauwelijks.

**Take 8d** · 13:31.6–14:03.7 (hoofdstuk 48,73–80,88 s)

[13:31.5] Ook de temperatuur kan beperkend zijn,  
[13:33.5] want de calvincyclus draait op enzymen.  
[13:35.8] En de kleur van het licht telt.  
[13:37.7] Een absorptiespectrum laat zien  
[13:39.2] welke kleuren licht een plant absorbeert.  
[13:41.9] Op de x-as staat de golflengte:  
[13:43.8] van violet bij ongeveer vierhonderd nanometer  
[13:46.4] tot rood bij zevenhonderd.  
[13:48.2] Chlorofyl absorbeert vooral blauw en rood licht.  
[13:51.4] Groen licht absorbeert chlorofyl het minst.  
[13:54.2] Een deel ervan wordt weerkaatst:  
[13:56.2] daarom zie je bladeren groen.  
[13:58.1] Veel kassen met ledlampen gloeien 's avonds roze-paars:  
[14:01.2] die lampen geven vooral rood en blauw licht.

> Beeld (uit de scènecommentaar, regel 3443): H8 Wat remt de fotosynthese? — links de grafiek fotosynthesesnelheid tegen lichtintensiteit (verzadiging; licht beperkend in het stijgende deel, dan iets anders zoals CO₂; tweede lijn met extra CO₂; kas). Na de onthulling: donkere dag, meer CO₂ helpt nauwelijks. Rechts: temperatuur (enzymen) en het absorptiespectrum van chlorofyl (400–700 nm), groen weerkaatst, ledkas.


## 9. H9 Terug naar de eik

Audio: blob 015.mp3 (`audio/ch_9.mp3` in `window.__AUDIO`) · 14:05–14:58 (52,9 s volgens ffprobe; `dur` in FILM 52,827 s)  
Niveau: havo + vwo (basis)

> Hoofdstukkaart (3,0 s, stil): "Terug naar de eik"

**Take 9a** · 14:08.7–14:13.8 (hoofdstuk 3,00–8,06 s)

[14:08.7] Dus: waar komt de massa van een eik vandaan?  
[14:11.5] Zeg het eerst zelf, in één zin.

> Pauze (14:13.8, 5,0 s, stil): de kijker zegt het antwoord eerst zelf

**Take 9b** · 14:18.8–14:49.8 (hoofdstuk 13,06–44,03 s)

[14:18.7] Een levende eik is voor ongeveer de helft water,  
[14:21.1] uit de bodem.  
[14:22.2] Het hout zelf komt vooral uit CO₂ uit de lucht.  
[14:25.6] In de bladeren legt de calvincyclus  
[14:27.6] C- en O-atomen uit CO₂ vast in glucose.  
[14:31.5] De energie daarvoor komt uit licht, via ATP en NADPH,H⁺.  
[14:37.2] Uit die glucose maakt de boom cellulose voor zijn hout,  
[14:40.3] en alle andere stoffen.  
[14:42.0] Uit de bodem komen verder alleen  
[14:43.6] een klein beetje mineralen.  
[14:45.3] Het hout van een boom is dus  
[14:46.7] grotendeels gemaakt uit CO₂ uit de lucht.

> Eindkaart (14:51.8, 6,0 s, stil)

> Beeld (uit de scènecommentaar, regel 3516): H9 Terug naar de eik — de vraag van het begin, 5 s pauze om het zelf te zeggen, dan het antwoord opgebouwd rond de eik: water uit de bodem, CO₂ uit de lucht → calvincyclus → glucose (energie uit licht via ATP en NADPH,H⁺) → cellulose en andere stoffen; mineralen een klein beetje; slotzin. Daarna de eindkaart.


---
Controle: 10 hoofdstukken = 10 audiofragmenten. Som `dur` in FILM 898,6 s (14:58); som audio (ffprobe) 898,9 s (14:58). Het verschil (≈ 0,37 s) is mp3-opvulling aan het eind van elk bestand.
