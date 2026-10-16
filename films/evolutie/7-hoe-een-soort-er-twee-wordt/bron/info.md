# Hoe één soort er twee wordt — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/evolutie/7-hoe-een-soort-er-twee-wordt.html |
| Reeks / nummer | Evolutie, deel 7 (aflevering 7 van 9) |
| Doelgroep / niveau | 5/6 vwo (badge op de pagina); geen havo/vwo-blokken |
| Versie / datum | versie 0.2 · 4 oktober 2026 (footer) |
| Stem / model | Roos (ElevenLabs, eleven_multilingual_v2) |
| Duur | 6:02 (362,2 s; één mp3, ffprobe 362,24 s = `TL.total`). Gesproken: 11 takes, 287,6 s |
| Beeldstijl | Ouder eigen ontwerp van de Evolutie-reeks (vóór Part C): donkerblauw canvas, amber accent, Literata + Public Sans; vereenvoudigde kaart van Californië (Central Valley als ring), salamanders, paard/ezel/muilezel, vuurvliegjes, kikkers, cichliden, plus stippen-simulatie en lijngrafiek |
| Audio-opslag | één doorlopende take: 1 mp3 als base64 in de HTML (blob 001.mp3, 4,3 MB) |
| Reconstructie | 2026-10-12, uit de gepubliceerde HTML |

## Opbouw
Hoofdstukken zoals in `const CH`. Type volgens het docentdeel: hoofdstuktype E ("een begrip scherp stellen en dan de routes ernaartoe").

| Begin | Hoofdstuk | Takes | Type | Kernbeeld |
|---|---|---|---|---|
| 0:00 | Californië (cold open) | k1_cold | opening | ring van Ensatina-populaties rond de Central Valley, kleur verloopt west/oost; "Eén soort, of twee?" |
| 0:29 | Wat is een soort? (vraag 1) | card1, k2_soort, q1, k3_soort2 | E, begrip | definitie Mayr 1942 in een kader; paard + ezel → muilezel (onvruchtbaar) |
| 1:27 | Een barrière (vraag 2) | card2, k4_allo, q2, k5_allo2, k6_hereniging | E, route 1 | simulatie twee helften (links klein, rechts groot voordelig), met/zonder 10 % uitwisseling; daarna hereniging en % paringen over de oude grens |
| 3:02 | Isolatiemechanismen (vraag 4) | card3, k7_isolatie, q4 | E, uitwerking | vóór/ná de bevruchting: vuurvliegjes, eiken, lieveheersbeestjes, zee-egel, muilezel; kikkers april/juni |
| 3:46 | Zonder barrière (vraag 3) | k8_sympatrisch, q3, k9_sympatrisch2 | E, route 2 | Victoriameer, > 500 cichliden; blauw ondiep / rood diep; chromosoomverdubbeling bij planten |
| 4:55 | De ringsoort | card5, k10_ring | terugkeer | terug naar de salamanderring: genenstroom in stapjes |
| 5:24 | Samengevat | card6, k11_slot | samenvatting | samenvattende tegels |
| 5:57 | (eindkaart) | end | — | "Volgende keer: toeval en Hardy-Weinberg · Evolutie · deel 8" |

Let op: de kaart `card4` ("3 · Zonder barrière — sympatrische soortvorming") staat wel in `CARDS`, maar niet in `TL.segments`; het hoofdstuk begint direct met take `k8_sympatrisch` na vraag q4.

Volledige tijdlijn (`TL.segments`):

| Segment | Soort | Begin | Eind | Duur (s) |
|---|---|---|---|---|
| — | sil | 0:00.0 | 0:01.0 | 1,00 |
| k1_cold | take | 0:01.0 | 0:24.5 | 23,45 |
| title | card | 0:24.5 | 0:29.0 | 4,50 |
| card1 | card | 0:29.0 | 0:32.5 | 3,50 |
| k2_soort | take | 0:32.5 | 0:56.4 | 23,92 |
| q1 | q | 0:56.4 | 1:07.9 | 11,50 |
| k3_soort2 | take | 1:07.9 | 1:26.7 | 18,81 |
| card2 | card | 1:26.7 | 1:30.2 | 3,50 |
| k4_allo | take | 1:30.2 | 1:58.6 | 28,42 |
| q2 | q | 1:58.6 | 2:10.1 | 11,50 |
| k5_allo2 | take | 2:10.1 | 2:40.3 | 30,23 |
| — | sil | 2:40.3 | 2:40.9 | 0,60 |
| k6_hereniging | take | 2:40.9 | 3:02.4 | 21,46 |
| card3 | card | 3:02.4 | 3:05.9 | 3,50 |
| k7_isolatie | take | 3:05.9 | 3:34.5 | 28,65 |
| q4 | q | 3:34.5 | 3:46.0 | 11,50 |
| k8_sympatrisch | take | 3:46.0 | 4:10.4 | 24,38 |
| q3 | q | 4:10.4 | 4:21.9 | 11,50 |
| k9_sympatrisch2 | take | 4:21.9 | 4:55.3 | 33,39 |
| card5 | card | 4:55.3 | 4:58.8 | 3,50 |
| k10_ring | take | 4:58.8 | 5:23.9 | 25,12 |
| card6 | card | 5:23.9 | 5:27.4 | 3,50 |
| k11_slot | take | 5:27.4 | 5:57.2 | 29,77 |
| end | card | 5:57.2 | 6:02.2 | 5,00 |

## Vragen
Vier voorspelvragen (`QDEFS`), allemaal meerkeuze met drie opties, niveau 5/6 vwo (er zijn geen aparte havo/vwo-vragen en geen controlevragen na afloop). Elke vraag staat in een stil tijdlijnsegment van 11,5 s direct na de take die de vraag stelt; aftellen 8 s, daarna wacht de speler (tenzij "automatisch door").

| # | Plek | Vraag | Opties | Juist |
|---|---|---|---|---|
| q1 | 0:56, na `k2_soort` | Een paard en een ezel krijgen samen een muilezel: sterk, maar onvruchtbaar. Zijn paard en ezel één soort of twee? | A) Twee soorten: de nakomelingen zijn onvruchtbaar, dus er stromen geen genen tussen paarden en ezels.<br>B) Eén soort: ze kunnen samen nakomelingen krijgen.<br>C) Dat hangt af van hoeveel ze op elkaar lijken. | A |
| q2 | 1:59, na `k4_allo` | Links is klein voordelig, rechts groot. Zonder barrière steekt elke generatie 10 % over. Wat gebeurt er met het verschil tussen de helften? | A) Het groeit even snel als met een barrière: selectie wint altijd.<br>B) Het blijft klein: de uitwisseling wist steeds uit wat selectie opbouwt.<br>C) Het wordt juist groter: de overstekers worden weggeselecteerd. | B |
| q4 | 3:35, na `k7_isolatie` | Twee kikkersoorten in dezelfde vijver: de ene roept in april, de andere in juni. Welk type isolatie is dit? | A) Geografische isolatie: ze leven op verschillende plaatsen.<br>B) Isolatie in tijd: ze zijn nooit tegelijk op zoek naar een partner.<br>C) Mechanische isolatie: ze passen niet op elkaar. | B |
| q3 | 4:10, na `k8_sympatrisch` | Meer dan 500 soorten cichliden ontstonden in 15.000 jaar in één meer, zonder rivier, gebergte of eiland. Hoe kan dat? | A) Dat kan niet; er moet een barrière zijn geweest die we niet meer zien.<br>B) Het zijn eigenlijk varianten van één soort.<br>C) Partnerkeuze op kleur werkt zelf als barrière: wie op blauw valt, paart met blauw. | C |

Terugkoppeling per gekozen optie staat in `QDEFS.qN.explain` (letterlijk):

- **q1**: A: "Klopt. De definitie vraagt om vruchtbare nakomelingen. De muilezel is een doodlopende weg: geen genenstroom, dus twee soorten." · B: "Nakomelingen alleen is niet genoeg: ze moeten zelf weer nakomelingen kunnen krijgen. Anders stromen er geen genen tussen de groepen." · C: "Uiterlijk telt niet in de definitie. Honden van allerlei vormen zijn één soort; sommige bijna identieke vogels zijn er twee."
- **q2**: B: "Klopt. Genenstroom werkt tegen verschil. Pas als de uitwisseling stopt, kunnen de helften echt uiteengroeien." · A: "Selectie bouwt elke generatie wat verschil op, maar 10 % nieuwkomers van de andere kant halen het weer onderuit." · C: "De overstekers worden deels weggeselecteerd, maar ze krijgen eerst nakomelingen. Hun genen mengen zich erin."
- **q4**: B: "Klopt. Ze delen de vijver, maar niet het paarseizoen. Een barrière vóór de bevruchting." · A: "Ze zitten in dezelfde vijver; de scheiding zit niet in de plaats maar in het moment." · C: "Over de bouw weten we niets; het verschil dat genoemd wordt, is wanneer ze roepen."
- **q3**: C: "Klopt. Gedrag kan de genenstroom stoppen zonder dat er iets in het landschap verandert: sympatrische soortvorming." · A: "Het meer viel vrijwel droog en vulde zich daarna; de soorten ontstonden in het aaneengesloten water. Een barrière in het gedrag is genoeg." · B: "Ze paren niet met elkaar en krijgen geen vruchtbare nakomelingen samen: volgens de definitie echte soorten."

Let op de nummering: q4 (kikkers) komt in de film vóór q3 (cichliden).

## Begrippen
Begrippenlijst op de pagina (toegevoegd 16 okt 2026, sectie "Begrippen" tussen Hoofdstukken en Kleuren in deze reeks; gekozen uit wat de film zelf behandelt, definities op havo-niveau in de woorden van de film):

- **soort**: Groep organismen die zich onderling kunnen voortplanten en vruchtbare nakomelingen krijgen (Mayr, 1942).
- **genenstroom**: Uitwisseling van genen tussen populaties doordat ze met elkaar paren. Stopt de genenstroom, dan kan één soort er twee worden.
- **barrière**: Iets dat populaties van elkaar scheidt, zoals een rivier, een gebergte of de zee rond een eiland.
- **allopatrische soortvorming**: Soortvorming op gescheiden plaatsen: een barrière stopt de genenstroom en verschillende selectie laat de twee helften uit elkaar groeien.
- **isolatiemechanisme**: Een barrière in de dieren of planten zelf waardoor twee soorten geen vruchtbare nakomelingen krijgen, ook als ze door elkaar leven.
- **isolatie vóór de bevruchting**: Er komt geen bevruchting: ander ritme of lied, andere bloeitijd of paartijd, passen mechanisch niet, of zaadcel en eicel herkennen elkaar niet.
- **isolatie na de bevruchting**: De nakomeling wordt wel gemaakt maar is zwak of onvruchtbaar, zoals de muilezel.
- **sympatrische soortvorming**: Soortvorming op dezelfde plaats, zonder barrière in het landschap, bijvoorbeeld door partnerkeuze zoals bij de cichliden.
- **chromosoomverdubbeling**: Een fout bij de celdeling verdubbelt alle chromosomen; zo'n plant kan alleen nog paren met planten met dezelfde verdubbeling. Zo ontstonden tarwe, koolzaad en aardbei.
- **ringsoort**: Een reeks populaties rond een gebied waarin buren met elkaar paren, maar de twee uiteinden niet meer, zoals de salamander Ensatina.

Vóór 16 okt 2026 geen begrippenlijst op de pagina. Begrippen die in beeld als definitie staan (letterlijk uit de scènes): soort = "een groep organismen die zich onderling kunnen voortplanten en vruchtbare nakomelingen krijgen" (Ernst Mayr, 1942); "allopatrische soortvorming: op gescheiden plaatsen"; "isolatiemechanismen"; "sympatrische soortvorming: op dezelfde plaats"; "een ringsoort"; "een soort is geen hokje, maar een momentopname van een proces". Kleurlegenda op de pagina:

- `#F0B64A` het antwoord, de rechterhelft (groot voordelig), de ringsoort
- `#6FB7E8` de linkerhelft (klein voordelig), blauwe cichliden, de rivier
- `#86CF86` genenstroom, wat bij elkaar hoort
- `#E57C5B` onvruchtbaar, geen genenstroom, rode cichliden
- `#D08A4A` westkant van de ring (oranjebruin); oostkant zwart met gele vlekken

## Docentdeel
- **Hoe deze film uitlegt**: hoofdstuktype E; de as is de genenstroom (soortvorming = het stoppen van de genenstroom). Eén simulatie draagt het allopatrische hoofdstuk (met/zonder barrière, daarna hereniging). De ringsoort opent en sluit de film om het soortbegrip te relativeren.
- **Simulatie** (letterlijk samengevat uit het docentdeel): twee helften van 100 dieren, erfelijke grootte x, start rond 0,5; optimum links 0,3, rechts 0,7; overleving 0,75 + 0,25·exp(−((x − optimum)/0,2)²); nakomeling = ouder + afwijking (sd 0,02). Run 1: 10 % wisselt per generatie, run 2: niemand. Na 60 generaties verschil ongeveer 0,17 mét en 0,37 zónder uitwisseling. Hereniging: 400 ontmoetingen, paring met kans exp(−((xᵢ − xⱼ)/0,08)²); paringen over de oude grens 0 % (barrière) tegenover 37 % (uitwisseling). Partnervoorkeur is een modelaanname (versterking blijft buiten de film).
- **Misvattingen**: soorten herken je aan uiterlijk (vraag 1); selectie wint altijd van genenuitwisseling (vraag 2); zonder zichtbare barrière geen soortvorming (vraag 3); kikkers in dezelfde vijver zijn geografisch gescheiden (vraag 4); twee verschillende populaties zijn automatisch twee soorten.
- **Gegeven, niet uitgelegd**: polyploïdie in één zin; meiose/cytologie hoort bij de erfelijkheidsfilms. Niet in deze film: drift en stichtereffect (deel 8), adaptieve radiatie (deel 9), fylogenetisch soortbegrip en de grenzen van Mayrs definitie.
- **Timing en uitspraak (QA)**: "Woordtijden zijn geschat uit pauzedetectie en zinslengte, niet uit woordtimestamps van de stem. Uitspraaklijst: Ensatina → "Ensatiena"; Mayr → "Mair"; muilezel → "muil-eezel"; jaartallen als cijfers." Risicowoorden (`const RISK`):

| Risicowoord | Invoer voor de stem | Tijd (eerste voorkomen) |
|---|---|---|
| Ensatina | Ensatiena | 0:06.6 (`k1_cold`) |
| Ernst Mayr | Ernst Mair | 0:37.8 (`k2_soort`) |
| muilezel | muil-eezel | 0:51.3 (`k2_soort`) |
| allopatrisch | allopatrische | 2:29.6 (`k5_allo2`) |
| sympatrisch | sympatrische | 4:36.5 (`k9_sympatrisch2`) |
| cichliden | cichliden | 3:58.8 (`k8_sympatrisch`) |
| isolatiemechanismen | isolatiemechanismen | 2:59.3 (`k6_hereniging`) |
| jaartallen (1942, 15.000) | als cijfers | 0:38.4 (`k2_soort`) |

Getallen en bronnen (letterlijk overgenomen):

| Wat | In de film | Werkelijk | Bron / opmerking |
|---|---|---|---|
| Ensatina | ring rond de Central Valley; zuidelijke uiteinden paren niet | Ensatina eschscholtzii, zeven ondersoorten; in Zuid-Californië leven E. e. eschscholtzii en E. e. klauberi samen met zeer beperkte hybridisatie; de ring is niet volledig gesloten (hiaten in de keten) | Stebbins 1949; Wake 1997; Pereira & Wake 2009 |
| Central Valley | 700 km lang | ongeveer 720 km | afgerond |
| Soortdefinitie | Mayr 1942 | biologisch soortbegrip (Mayr, Systematics and the Origin of Species, 1942); werkt niet voor ongeslachtelijke organismen en fossielen, daarom bestaan er andere soortbegrippen | — |
| Muilezel | onvruchtbaar | vrijwel altijd onvruchtbaar (63 chromosomen); enkele vruchtbare merries gedocumenteerd | vereenvoudigd |
| Victoriameer | bijna droog 15.000 jaar geleden; > 500 soorten cichliden | vrijwel volledig droog rond 17.000–15.000 jaar geleden; ongeveer 500 endemische haplochromine soorten; een deel van de variatie komt uit oudere hybridisatie van rivierpopulaties | Johnson e.a. 1996, Science; Meier e.a. 2017, Nature Communications |
| Cichliden, blauw en rood | vrouwtjes kiezen op kleur; blauw ondiep, rood diep | Pundamilia pundamilia (blauw) en P. nyererei (rood); voorkeur van vrouwtjes voor de eigen kleur, gekoppeld aan lichtomstandigheden met diepte | Seehausen e.a. 1997, 2008, Nature |
| Polyploïdie | tarwe, koolzaad, aardbei | broodtarwe hexaploïd (6n); koolzaad allotetraploïd; gekweekte aardbei octoploïd (8n) | — |
| Isolatiemechanismen | vuurvliegjes, eiken, lieveheersbeestjes, zee-egel, muilezel | klassieke voorbeelden uit leerboeken (Photinus-knippersignalen; bloeitijd; genitale "lock and key"; bindin bij zee-egels) | Campbell Biology; vereenvoudigd |
| Simulatie | 10 % uitwisseling; 60 generaties; 0 % vs 37 % paringen over de grens | model; uitkomsten hangen af van gekozen selectiesterkte en voorkeur | eigen simulatie, deterministisch (seed 4) |

## Techniek: waar zit wat in de HTML
Regelnummers gelden voor zowel de film-HTML in de repo als `film.src.html` (de base64-blob staat op één regel). Zoekwoorden tussen backticks.

- **Audio**: één doorlopend mp3-bestand (mono, 44,1 kHz, 96 kbit/s) als data-URI: `au.src="data:audio/mpeg;base64,…"` (regel 454). De stiltes voor titelkaarten (3,5–5 s) en vragen (11,5 s) zitten ín het bestand; de speler pauzeert niet zelf om tijd te maken, behalve bij de vraagpoort. Het audio-element is de klok: alles wordt per frame getekend op `au.currentTime` (`function loop`).
- **Tijdlijn en tekst**: `const TL = {…}` (regel 186, één lange JSON-regel). `TL.total` = filmduur. `TL.takes.<id>` = gesproken blok met `start`/`end`, `phrases[]` (ondertitelfrasen met `text`, `start`, `end`) en `words[]` (`w`, `start`, `end`). `TL.segments[]` = de volledige tijdlijn in volgorde, met `kind` = `sil` (stilte), `take`, `card` (titelkaart) of `q` (vraag). Alle tijden zijn seconden in het ene mp3-bestand. Volgens de QA-noot op de pagina zijn de woordtijden geschat uit pauzedetectie en zinslengte, niet uit woordtimestamps van de stem; ze sluiten wel aan op de echte stiltes in de mp3 (controle met ffmpeg silencedetect: bij alle pauzes van 2 s of langer valt het einde van de stilte binnen 0,1 s van de begintijd van de volgende take).
- **Ondertitels**: `const PHR` verzamelt alle `phrases`; `function caption(t)` toont de eerste frase met `start − 0,05 ≤ t < end + 0,15`. Knop CC / toets C schakelt ze uit.
- **Transcript** onder de film: gegenereerd uit `phrases` via `const TRN` (labels per take) en `const QAFTER` (welke vraag na welke take in het transcript komt).
- **Hoofdstukken**: `const CH` (naam, begintijd via `seg('<id>').start`, label "vraag").
- **Beeld**: één `<canvas>` 1920×1080. `function render(t)` kiest via `segAt(t)` het segment: `card` → `card()` met tekst uit `const CARDS`; `q` → de bevroren eindstand van de vorige take (`const back={…}`) met een donkere laag; `take` → `SCENE.<take-id>(t)`. Scènefuncties staan tussen `// ---------- scenes` en `// ---------- player`.
- **Animatie aan de stem gekoppeld**: `const C={…}` (regel 213) bevat cue-tijden, berekend met `cue('<take>','<woord>',n)`: de begintijd van het n-de voorkomen van dat woord in `words[]`. Scènes faden/bewegen met `ramp(t, C.x, …)`. Ontbreekt een woord, dan valt `cue` terug op het begin van de take (met `console.warn('cue missing')`). Bij de reconstructie: alle 87 cue-aanroepen vinden hun woord.
- **Simulaties**: deterministisch (vaste seed via `mulberry32`), vooraf doorgerekend bij het laden; de scène toont de generatie die bij de huidige tijd hoort. `SPEC` (regel 235): twee runs van 60 generaties (met 10 % en 0 % uitwisseling) plus de hereniging (400 ontmoetingen, partnerkeuze op gelijkenis); hulpfuncties `valley`, `ringPos`, `ringColor`, `meanGraph`.
- **Vragen**: `const QDEFS` (regel 192): `text`, `options[{k,text}]`, `correct`, `explain{A,B,C}`. `const QSEGS` koppelt ze aan de `q`-segmenten: aftellen van `start+1` tot `start+9` s; daarna `function gate` pauzeert de audio (Leerling: wacht op een antwoord; Klas: knop Verder), tenzij "automatisch door" aan staat. Een gekozen antwoord springt naar het einde van het aftellen en toont groen/rood plus de `explain`-tekst.
- **Speler**: Leerling/Klas (`?modus=klas` in de URL zet Klas), automatisch door, CC, volledig scherm (F), spatie, pijltjes ±5 s. Geen Havo/Vwo-schakelaar (de film is alleen vwo). Geen toets of score.
- **Docentdeel** is statische HTML (`<summary>Hoe deze film uitlegt`, `Getallen en bronnen`, `Timing en uitspraak (QA)`); de tabel met risicowoorden wordt gevuld uit `const RISK` (woord, invoer voor de stem, take, cue-woord voor de tijd).
- **Fonts**: Literata en Public Sans via Google Fonts (`<link>`), niet ingebed.

## Zo pas je deze film aan
Werk in de uitgepakte vorm: `python3 scripts/filmbron.py uitpakken films/evolutie/7-hoe-een-soort-er-twee-wordt.html <map>`, bewerk `<map>/film.src.html` en pak weer in met `python3 scripts/filmbron.py inpakken <map> films/evolutie/7-hoe-een-soort-er-twee-wordt.html`.

1. **Tekst op het scherm** (labels, kaders, titelkaarten): zoek de string in de `SCENE.<take>`- of `…Scene`-functie, of in `const CARDS` voor de kaarten. Dit raakt de audio niet.
2. **Een vraag aanpassen**: wijzig `QDEFS.qN` (tekst, opties, `correct`, `explain`). Let op: de vraag wordt ook hardop gesteld aan het eind van de take ervoor (zie script.md); wie de vraag inhoudelijk verandert, moet die zin opnieuw laten inspreken. Het transcript neemt de nieuwe tekst automatisch over.
3. **Ondertitel corrigeren zonder nieuwe opname** (bijv. een tikfout): wijzig `phrases[].text` én het bijbehorende woord in `words[].w` van dezelfde take. Verander je een woord dat in `const C` als cue wordt gebruikt (zoek op `cue('<take>','<woord>'`), pas dan ook die cue aan, anders springt de animatie naar het begin van de take.
4. **Een alinea opnieuw opnemen**: audio en tijdlijn zijn één take. Genereer de nieuwe zin(nen) met stem Roos (eleven_multilingual_v2, met de uitspraakinvoer uit de QA-tabel), knip het mp3-stuk van `TL.takes.<id>.start` tot `.end` eruit en plak het nieuwe erin (bijv. ffmpeg), met dezelfde stilte ervoor en erna. Daarna: `phrases` en `words` van die take opnieuw timen; alle `start`/`end` van latere takes, frasen, woorden en `segments` opschuiven met het duurverschil; `TL.total` bijwerken. Cue-tijden, hoofdstukken, vraagpoorten en simulaties volgen dan vanzelf, want ze worden uit `TL` berekend. Er staat geen script voor het hertimen in de repo.
5. **Een titelkaart of vraagpauze langer/korter maken**: dat kan niet alleen in `TL.segments`, want de stilte zit in de mp3. Stilte toevoegen/wegknippen in het audiobestand en daarna de tijden na dat punt verschuiven zoals bij punt 4.
6. **Let op**: de statische `max` van de schuifbalk en de tekst `0:00 / m:ss` in de HTML worden bij het laden door `seek.max=TOTAL` en `loop()` overschreven; de badge "ongeveer … minuten" is handwerk.

## Aandachtspunten
- Vraagnummers lopen niet op in de tijd: q4 (kikkers, 3:35) komt vóór q3 (cichliden, 4:10). Werkt correct (koppeling via `QSEGS`/`back`), maar verwarrend bij bespreken.
- `CARDS.card4` ("3 · Zonder barrière") wordt nooit getoond: geen `card4`-segment in de tijdlijn. Daardoor heeft hoofdstuk 3 geen titelkaart en springt de film van vraag q4 direct naar "Tijd.".
- Versie 0.2 (de andere afleveringen 6, 8, 9 zijn 0.1); wat er in 0.2 is veranderd, staat niet in de HTML.
- Gebouwd vóór prompt v3/v4: geen NIVEAU-schakelaar (Havo/Vwo), geen Part C-stijlkaart (Micro/Macro/Schema), geen ingebedde fonts (Google Fonts via `<link>`, dus offline valt de film terug op Georgia/systeemletters).
- Geen begrippenlijst (toegevoegd 16 okt 2026) en geen controlevragen na afloop; alleen vier voorspelvragen.
- Frasen met duur 0 in `TL` worden nooit als ondertitel getoond (de caption-zoekfunctie pakt dan de volgende frase): "Maar let op:" (k5_allo2, 2:33.8); "Test:" (k7_isolatie, 3:28.1). In het transcript staan ze wel.
- Er is geen los audiobestand of stem-invoertekst met respellings in de repo; bij heropname moet de invoer opnieuw worden opgebouwd uit script.md + de QA-tabel.

## Wijzigingen
- 15 okt 2026 — Speler: de knop Vragen aan/uit (onthouden in `bk-vragen`, ook `?vragen=uit`) werkt nu altijd, ook na spoelen, in pauze en als je hem halverwege omzet. Bij Vragen uit vallen weg: de vraag zelf, de gesproken vraagzin(nen) ervoor (zinnen op '?', 'Wat denk je?', 'Denk even na.', 'Eerst een voorspelling.') en een los antwoord direct erna ('Antwoord B.', 'Ja.', 'Nee.', 'Precies.'); gewone uitlegzinnen blijven staan. De tijdbalk, tijd en hoofdstuktijden tonen de ingekorte duur. Code: `bkBouw()` maakt `BK.k` (stukken die de speler overslaat); regelnummers in de spelercode zijn daardoor een paar regels verschoven. Hoofdstukkaarten (card1, card2, …) duren 2,2 s in plaats van 3,5 s: de speler slaat het stille midden van de kaart over (in- en uitfaden blijven; de mp3 is niet veranderd). Korte inhoudelijke antwoorden zoals 'Analoog.' of 'Twee.' blijven staan.

## Wijziging 16 okt 2026: begrippenlijst
Nieuw blok `<section>` met `<h2 class="gl-kop">Begrippen</h2>` en `<div id="glossary">` (kaartjes `<div class="term"><b>begrip</b><p>uitleg</p></div>`, vwo-begrippen met `class="term vwo"` en `<i>vwo</i>`), vlak vóór "Kleuren in deze reeks"; opmaak in `<style id="glossary-stijl">` vlak voor `</head>` (licht: wit kaartje met `--line`, donker: zoals de hoofdengine). De kop "Begrippen" is een `<h2 class="gl-kop">` met dezelfde opmaak als op de voorbeeldpagina (Fraunces 700, 30px, regelhoogte 1,5, marge 0 0 12px; het lettertype zit als `@font-face` 'Fraunces Begrippen' in `#glossary-stijl`, kleur = tekstkleur van deze pagina). Begrip toevoegen of wijzigen: pas het kaartje in `#glossary` aan en de lijst hierboven. Regelnummers elders in dit bestand zijn enkele tientallen regels verschoven.
