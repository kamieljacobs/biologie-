# Selectie van dichtbij — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/evolutie/6-selectie-van-dichtbij.html |
| Reeks / nummer | Evolutie, deel 6 (aflevering 6 van 9) |
| Doelgroep / niveau | 5/6 vwo (badge op de pagina); geen havo/vwo-blokken |
| Versie / datum | versie 0.1 · 4 oktober 2026 (footer) |
| Stem / model | Roos (ElevenLabs, eleven_multilingual_v2) |
| Duur | 6:21 (380,8 s; één mp3, ffprobe 380,84 s = `TL.total`). Gesproken: 13 takes, 302,7 s |
| Beeldstijl | Ouder eigen ontwerp van de Evolutie-reeks (vóór Part C): donkerblauw canvas (`#0F1B2D`), amber accent, Literata + Public Sans, platte vereenvoudigde tekeningen (berkenspanner, boomstam, muizen, vinken, pauw, vos) plus histogrammen/fitnesscurves. Ligt dicht bij de latere Schema-/Macro-look, maar is niet volgens de stijlkaart gebouwd |
| Audio-opslag | één doorlopende take: 1 mp3 als base64 in de HTML (blob 001.mp3, 4,6 MB), stiltes voor kaarten en vragen zitten erin |
| Reconstructie | 2026-10-12, uit de gepubliceerde HTML |

## Opbouw
Hoofdstukken zoals in `const CH` (begintijd = knop op de pagina). Type volgens het docentdeel: de hele film is hoofdstuktype D ("één model, drie instellingen").

| Begin | Hoofdstuk | Takes | Type | Kernbeeld |
|---|---|---|---|---|
| 0:00 | Manchester (cold open) | h1_cold | opening | lichte boomstam, eerst lichte dan zwarte berkenspanner; "1895 · 98 % zwart" (50 vlinders kleuren zwart) |
| 0:27 | Drie kanten op | h2_intro | intro | terugblik deel 2 (variatie, erfelijkheid, selectie); "drie kanten op" |
| 0:48 | Fitness (vraag 1) | card1, h3_fitness, q1, h4_fitness2 | begrip | twee muizen: groot/3 jaar/2 jongen tegen klein/1 jaar/12 jongen; definitie fitness |
| 1:40 | Gerichte selectie | card2, h5_gericht | D, instelling 1 | simulatie 200 vlinders op lichte → roetzwarte stammen; histogram schuift naar donker |
| 2:16 | Stabiliserende selectie (vraag 2) | card3, h6_stab, q2, h7_stab2 | D, instelling 2 | sterftecurve geboortegewicht (Karn & Penrose); histogram wordt smaller |
| 3:22 | Splitsende selectie (vraag 3) | card4, h8_split, q3, h9_split2 | D, instelling 3 | zaadkraker, zachte/harde zaden; histogram splitst in twee pieken |
| 4:19 | Seksuele selectie (vraag 4) | card5, h10_sex, q4, h11_sex2 | uitbreiding | pauw, vos, Darwin-citaat (Engels); simulatie 120 mannen, gemiddelde staartlengte en overlevend deel |
| 5:30 | Terug in Manchester | h12_terug | omkering | stam wordt weer licht; grafiek aandeel zwart 1848–2000 (gestileerd), "1956: Clean Air Act" |
| 5:49 | Samengevat | card6, h13_slot | samenvatting | vijf tegels met vinkje (fitness + vier vormen) |
| 6:16 | (eindkaart) | end | — | "Volgende keer: soortvorming · Evolutie · deel 7" |

Volledige tijdlijn (`TL.segments`):

| Segment | Soort | Begin | Eind | Duur (s) |
|---|---|---|---|---|
| — | sil | 0:00.0 | 0:01.0 | 1,00 |
| h1_cold | take | 0:01.0 | 0:22.6 | 21,59 |
| title | card | 0:22.6 | 0:27.1 | 4,50 |
| h2_intro | take | 0:27.1 | 0:48.4 | 21,27 |
| card1 | card | 0:48.4 | 0:51.9 | 3,50 |
| h3_fitness | take | 0:51.9 | 1:12.0 | 20,11 |
| q1 | q | 1:12.0 | 1:23.5 | 11,50 |
| h4_fitness2 | take | 1:23.5 | 1:40.1 | 16,63 |
| card2 | card | 1:40.1 | 1:43.6 | 3,50 |
| h5_gericht | take | 1:43.6 | 2:15.6 | 32,04 |
| card3 | card | 2:15.6 | 2:19.1 | 3,50 |
| h6_stab | take | 2:19.1 | 2:43.6 | 24,47 |
| q2 | q | 2:43.6 | 2:55.1 | 11,50 |
| h7_stab2 | take | 2:55.1 | 3:22.1 | 27,03 |
| card4 | card | 3:22.1 | 3:25.6 | 3,50 |
| h8_split | take | 3:25.6 | 3:47.2 | 21,55 |
| q3 | q | 3:47.2 | 3:58.7 | 11,50 |
| h9_split2 | take | 3:58.7 | 4:18.8 | 20,06 |
| card5 | card | 4:18.8 | 4:22.3 | 3,50 |
| h10_sex | take | 4:22.3 | 4:45.1 | 22,85 |
| q4 | q | 4:45.1 | 4:56.6 | 11,50 |
| h11_sex2 | take | 4:56.6 | 5:29.7 | 33,11 |
| — | sil | 5:29.7 | 5:30.3 | 0,60 |
| h12_terug | take | 5:30.3 | 5:48.9 | 18,62 |
| card6 | card | 5:48.9 | 5:52.4 | 3,50 |
| h13_slot | take | 5:52.4 | 6:15.8 | 23,36 |
| end | card | 6:15.8 | 6:20.8 | 5,00 |

## Vragen
Vier voorspelvragen (`QDEFS`), allemaal meerkeuze met drie opties, niveau 5/6 vwo (er zijn geen aparte havo/vwo-vragen en geen controlevragen na afloop). Elke vraag staat in een stil tijdlijnsegment van 11,5 s direct na de take die de vraag stelt; aftellen 8 s, daarna wacht de speler (tenzij "automatisch door").

| # | Plek | Vraag | Opties | Juist |
|---|---|---|---|---|
| q1 | 1:12, na `h3_fitness` | Muis 1: groot, sterk, wordt 3 jaar, krijgt 2 jongen. Muis 2: klein, leeft 1 jaar, krijgt 12 jongen. Welke heeft de hoogste fitness? | A) Muis 1: sterker en gezonder, en leeft langer.<br>B) Allebei evenveel: fitness gaat om de soort, niet om het individu.<br>C) Muis 2: meer nakomelingen in de volgende generatie. | C |
| q2 | 2:44, na `h6_stab` | Het midden heeft de hoogste fitness: heel lichte en heel zware baby's overleven minder vaak. Wat gebeurt er na vijftig generaties met de verdeling? | A) Het gemiddelde schuift op naar een hoger gewicht.<br>B) Het gemiddelde blijft staan, de spreiding wordt kleiner.<br>C) Niets: beide kanten verliezen evenveel, dus het heft elkaar op. | B |
| q3 | 3:47, na `h8_split` | Kleine en grote snavels doen het goed, middelgrote slecht. Wat voorspel je voor de verdeling na vijftig generaties? | A) Twee groepen: kleine en grote snavels, en weinig ertussen.<br>B) Eén middelgrote snavel: het beste compromis voor beide zaden.<br>C) Het gemiddelde schuift naar groot: harde zaden geven meer energie. | A |
| q4 | 4:45, na `h10_sex` | Een pauwenstaart maakt een man trager en opvallender voor roofdieren. Waarom wordt hij generatie na generatie toch groter? | A) De staart beschermt: hij schrikt roofdieren af.<br>B) Een toevallige fout die nog niet is weggeselecteerd.<br>C) Vrouwtjes kiezen de grootste staart: meer nakomelingen, ondanks een kortere levensduur. | C |

Terugkoppeling per gekozen optie staat in `QDEFS.qN.explain` (letterlijk):

- **q1**: C: "Klopt. Fitness is het aantal nakomelingen dat een individu bijdraagt aan de volgende generatie. Kracht of leeftijd tellen alleen als ze daartoe leiden." · A: "Dat is de alledaagse betekenis van fit. In de biologie telt alleen de bijdrage aan de volgende generatie." · B: "Fitness is een eigenschap van individuen (of genotypen) in een omgeving; juist het verschil tussen individuen drijft selectie."
- **q2**: B: "Klopt. Stabiliserende selectie: de uitersten verdwijnen, het midden blijft, de verdeling wordt smaller." · A: "Beide uitersten worden even hard geraakt; er is geen richting om in op te schuiven." · C: "Dat de verliezen aan beide kanten gelijk zijn, betekent niet dat er niets verandert: de uitersten zelf verdwijnen, en dus de spreiding."
- **q3**: A: "Klopt. Splitsende selectie: het midden wordt weggeselecteerd en de populatie valt uiteen in twee groepen." · B: "Het compromis is juist het slechtst: een middelgrote snavel kraakt beide zaden traag. Selectie werkt van het midden af." · C: "Er is geen reden voor een richting: kleine snavels doen het bij zachte zaden net zo goed als grote bij harde."
- **q4**: C: "Klopt. Seksuele selectie: fitness is nakomelingen, en wie gekozen wordt, krijgt er meer, ook als hij eerder sterft." · A: "Was het bescherming, dan hadden de vrouwtjes hem ook. De staart kost juist overleving." · B: "Een kenmerk dat overleving kost én toevallig is, zou snel verdwijnen. Dat hij groeit, vraagt om een voordeel ergens anders: bij het paren."

## Begrippen
Geen begrippenlijst op de pagina. Begrippen die in beeld als definitie staan (uit de scènes, letterlijk): "fitness = het aantal nakomelingen dat een individu bijdraagt aan de volgende generatie"; "gerichte selectie: één uiterste wint, het gemiddelde schuift"; "stabiliserende selectie: niet van plaats, maar van breedte"; "splitsende selectie: het midden verdwijnt"; "seksuele selectie". Kleurlegenda op de pagina ("Kleuren in deze reeks"):

- `#F0B64A` de fitnesscurve, het antwoord, snavels
- `#86CF86` de populatie in de simulaties; wat selectie bevoordeelt
- `#E57C5B` sterfte, roofdieren, wat selectie wegneemt
- `#B8C4A0` boomstam met korstmos (licht); roet maakt hem zwart

## Docentdeel
Drie uitklapblokken onder "Voor de docent":
- **Hoe deze film uitlegt**: hoofdstuktype D (één simulatie-engine, drie fitnesscurves); de film opent en sluit met de berkenspanner zodat de omkering (Clean Air Act) laat zien dat de omgeving de richting geeft. Exacte modelformules: 200 individuen, kenmerk x in [0,1], nakomeling = ouder + afwijking (sd 0,03); gericht w = 0,05 + 0,95·(1 − x), vanaf generatie 10 w = 0,05 + 0,95·x; stabiliserend w = 0,15 + 0,85·exp(−((x − 0,5)/0,12)²); splitsend w = 1 − 0,85·exp(−((x − 0,5)/0,14)²) met maximaal 60 vogels per zaadtype; seksuele selectie 120 mannen, overleving exp(−(t/0,7)²), vaderkans ∝ e^(3t), evenwicht t ≈ 0,7. Fisher en Zahavi bewust buiten de film.
- **Misvattingen**: fit = sterk (vraag 1); selectie aan beide kanten "heft elkaar op" (vraag 2); compromis in het midden is altijd het best (vraag 3); een nadelig kenmerk kan niet door selectie ontstaan (vraag 4); selectie is vooruitgang (slot).
- **Gegeven, niet uitgelegd**: erfelijkheid van het kenmerk; het resistentielab wordt als bekend verondersteld. Niet in deze film: drift en Hardy-Weinberg (deel 8), soortvorming (deel 7), kunstmatige selectie.
- **Timing en uitspraak (QA)**: "Woordtijden zijn geschat uit pauzedetectie en zinslengte, niet uit woordtimestamps van de stem. Uitspraaklijst: jaartallen als cijfers; Engelse termen (survival of the fittest, Clean Air Act) ongewijzigd ingevoerd." Risicowoorden (`const RISK`):

| Risicowoord | Invoer voor de stem | Tijd (eerste voorkomen) |
|---|---|---|
| berkenspanner | berkenspanner | 0:04.0 (`h1_cold`) |
| survival of the fittest | Survival of the fittest | 0:52.5 (`h3_fitness`) |
| Spencer | Spencer | 0:55.8 (`h3_fitness`) |
| Karn en Penrose | Karn en Penrose | 2:23.3 (`h6_stab`) |
| zwartbuikzaadkraker | zwartbuikzaadkraker | 3:27.6 (`h8_split`) |
| Clean Air Act | Clean Air Act | 5:32.9 (`h12_terug`) |
| jaartallen (1848, 1895, 1951, 1956) | als cijfers | 0:01.9 (`h1_cold`) |

Getallen en bronnen (letterlijk overgenomen):

| Wat | In de film | Werkelijk | Bron / opmerking |
|---|---|---|---|
| Berkenspanner, eerste zwarte | Manchester 1848 | eerste melanistische exemplaar (f. carbonaria) gevangen bij Manchester, 1848 | Kettlewell 1955; Cook 2003 |
| Aandeel zwart 1895 | 98 % | ongeveer 98 % rond Manchester in 1895 | Cook 2003, Biological Journal of the Linnean Society |
| Vogels eten wat opvalt | mechanisme | bevestigd in veldexperimenten; Kettlewells opzet is bekritiseerd, Majerus' experiment 2001–2007 bevestigde predatie als selectiefactor | Cook e.a. 2012, Biology Letters |
| Clean Air Act | 1956; in dertig jaar bijna weg | 1956 (VK); aandeel zwart bij Liverpool van > 90 % (1959) naar < 5 % rond 2000 | Clarke e.a. 1985; Cook 2003; de curve in de film is gestileerd |
| Survival of the fittest | Darwin, overgenomen van Spencer | Spencer 1864; door Darwin overgenomen in de 5e druk van Origin (1869) | — |
| Geboortegewicht | Karn & Penrose 1951, Londen, 13.000 baby's, optimum rond 3,5 kg | 13.730 geboorten (1935–1946); laagste sterfte rond 3,6 kg (8 lb) | Karn & Penrose 1951, Annals of Eugenics; klassiek voorbeeld, de selectiedruk is tegenwoordig door medische zorg veel kleiner |
| Zaadkraker | Kameroen, kleine en grote snavels, middelgroot traag | Pyrenestes ostrinus; zegge-zaden (Scleria) zacht en hard; middelgrote snavels hebben de laagste overleving | Smith 1993, Nature |
| Pauwenstaart | 1,5 m; slechter vliegen | sleep tot ongeveer 1,5 m; voorkeur van hennen voor meer oogvlekken (Petrie 1991), later bediscussieerd (Takahashi 2008) | vereenvoudigd |
| Darwin-citaat | 1860, aan een vriend | brief aan Asa Gray, 3 april 1860 | Darwin Correspondence Project |
| Fitness | aantal nakomelingen in de volgende generatie | formeel: relatieve bijdrage aan de volgende generatie (absolute vs. relatieve fitness) | vereenvoudigd |

## Techniek: waar zit wat in de HTML
Regelnummers gelden voor zowel de film-HTML in de repo als `film.src.html` (de base64-blob staat op één regel). Zoekwoorden tussen backticks.

- **Audio**: één doorlopend mp3-bestand (mono, 44,1 kHz, 96 kbit/s) als data-URI: `au.src="data:audio/mpeg;base64,…"` (regel 467). De stiltes voor titelkaarten (3,5–5 s) en vragen (11,5 s) zitten ín het bestand; de speler pauzeert niet zelf om tijd te maken, behalve bij de vraagpoort. Het audio-element is de klok: alles wordt per frame getekend op `au.currentTime` (`function loop`).
- **Tijdlijn en tekst**: `const TL = {…}` (regel 186, één lange JSON-regel). `TL.total` = filmduur. `TL.takes.<id>` = gesproken blok met `start`/`end`, `phrases[]` (ondertitelfrasen met `text`, `start`, `end`) en `words[]` (`w`, `start`, `end`). `TL.segments[]` = de volledige tijdlijn in volgorde, met `kind` = `sil` (stilte), `take`, `card` (titelkaart) of `q` (vraag). Alle tijden zijn seconden in het ene mp3-bestand. Volgens de QA-noot op de pagina zijn de woordtijden geschat uit pauzedetectie en zinslengte, niet uit woordtimestamps van de stem; ze sluiten wel aan op de echte stiltes in de mp3 (controle met ffmpeg silencedetect: bij alle pauzes van 2 s of langer valt het einde van de stilte binnen 0,1 s van de begintijd van de volgende take).
- **Ondertitels**: `const PHR` verzamelt alle `phrases`; `function caption(t)` toont de eerste frase met `start − 0,05 ≤ t < end + 0,15`. Knop CC / toets C schakelt ze uit.
- **Transcript** onder de film: gegenereerd uit `phrases` via `const TRN` (labels per take) en `const QAFTER` (welke vraag na welke take in het transcript komt).
- **Hoofdstukken**: `const CH` (naam, begintijd via `seg('<id>').start`, label "vraag").
- **Beeld**: één `<canvas>` 1920×1080. `function render(t)` kiest via `segAt(t)` het segment: `card` → `card()` met tekst uit `const CARDS`; `q` → de bevroren eindstand van de vorige take (`const back={…}`) met een donkere laag; `take` → `SCENE.<take-id>(t)`. Scènefuncties staan tussen `// ---------- scenes` en `// ---------- player`.
- **Animatie aan de stem gekoppeld**: `const C={…}` (regel 213) bevat cue-tijden, berekend met `cue('<take>','<woord>',n)`: de begintijd van het n-de voorkomen van dat woord in `words[]`. Scènes faden/bewegen met `ramp(t, C.x, …)`. Ontbreekt een woord, dan valt `cue` terug op het begin van de take (met `console.warn('cue missing')`). Bij de reconstructie: alle 100 cue-aanroepen vinden hun woord.
- **Simulaties**: deterministisch (vaste seed via `mulberry32`), vooraf doorgerekend bij het laden; de scène toont de generatie die bij de huidige tijd hoort. `SEL` (regel 236) draait drie runs van 50 generaties: `SEL.gericht` (seed 5, omslag licht→roet bij generatie 10), `SEL.stab` (seed 6), `SEL.split` (seed 7, max 60 per zaadtype); `SEX` (regel 254) 80 generaties seksuele selectie (seed 8). Hulpfuncties `hist`, `fitcurve`, `selPanel`.
- **Vragen**: `const QDEFS` (regel 192): `text`, `options[{k,text}]`, `correct`, `explain{A,B,C}`. `const QSEGS` koppelt ze aan de `q`-segmenten: aftellen van `start+1` tot `start+9` s; daarna `function gate` pauzeert de audio (Leerling: wacht op een antwoord; Klas: knop Verder), tenzij "automatisch door" aan staat. Een gekozen antwoord springt naar het einde van het aftellen en toont groen/rood plus de `explain`-tekst.
- **Speler**: Leerling/Klas (`?modus=klas` in de URL zet Klas), automatisch door, CC, volledig scherm (F), spatie, pijltjes ±5 s. Geen Havo/Vwo-schakelaar (de film is alleen vwo). Geen toets of score.
- **Docentdeel** is statische HTML (`<summary>Hoe deze film uitlegt`, `Getallen en bronnen`, `Timing en uitspraak (QA)`); de tabel met risicowoorden wordt gevuld uit `const RISK` (woord, invoer voor de stem, take, cue-woord voor de tijd).
- **Fonts**: Literata en Public Sans via Google Fonts (`<link>`), niet ingebed.

## Zo pas je deze film aan
Werk in de uitgepakte vorm: `python3 scripts/filmbron.py uitpakken films/evolutie/6-selectie-van-dichtbij.html <map>`, bewerk `<map>/film.src.html` en pak weer in met `python3 scripts/filmbron.py inpakken <map> films/evolutie/6-selectie-van-dichtbij.html`.

1. **Tekst op het scherm** (labels, kaders, titelkaarten): zoek de string in de `SCENE.<take>`- of `…Scene`-functie, of in `const CARDS` voor de kaarten. Dit raakt de audio niet.
2. **Een vraag aanpassen**: wijzig `QDEFS.qN` (tekst, opties, `correct`, `explain`). Let op: de vraag wordt ook hardop gesteld aan het eind van de take ervoor (zie script.md); wie de vraag inhoudelijk verandert, moet die zin opnieuw laten inspreken. Het transcript neemt de nieuwe tekst automatisch over.
3. **Ondertitel corrigeren zonder nieuwe opname** (bijv. een tikfout): wijzig `phrases[].text` én het bijbehorende woord in `words[].w` van dezelfde take. Verander je een woord dat in `const C` als cue wordt gebruikt (zoek op `cue('<take>','<woord>'`), pas dan ook die cue aan, anders springt de animatie naar het begin van de take.
4. **Een alinea opnieuw opnemen**: audio en tijdlijn zijn één take. Genereer de nieuwe zin(nen) met stem Roos (eleven_multilingual_v2, met de uitspraakinvoer uit de QA-tabel), knip het mp3-stuk van `TL.takes.<id>.start` tot `.end` eruit en plak het nieuwe erin (bijv. ffmpeg), met dezelfde stilte ervoor en erna. Daarna: `phrases` en `words` van die take opnieuw timen; alle `start`/`end` van latere takes, frasen, woorden en `segments` opschuiven met het duurverschil; `TL.total` bijwerken. Cue-tijden, hoofdstukken, vraagpoorten en simulaties volgen dan vanzelf, want ze worden uit `TL` berekend. Er staat geen script voor het hertimen in de repo.
5. **Een titelkaart of vraagpauze langer/korter maken**: dat kan niet alleen in `TL.segments`, want de stilte zit in de mp3. Stilte toevoegen/wegknippen in het audiobestand en daarna de tijden na dat punt verschuiven zoals bij punt 4.
6. **Let op**: de statische `max` van de schuifbalk en de tekst `0:00 / m:ss` in de HTML worden bij het laden door `seek.max=TOTAL` en `loop()` overschreven; de badge "ongeveer … minuten" is handwerk.

## Aandachtspunten
- Het docentdeel (Getallen) noemt Karn & Penrose met 13.730 geboorten en optimum rond 3,6 kg; de film zegt "13.000 baby's" en "rond 3,5 kilo" (bewust afgerond, staat zo in de tabel).
- Het Darwin-citaat in beeld is Engels ("The sight of a feather in a peacock's tail, whenever I gaze at it, makes me sick!"); de stem zegt het Nederlands. De gestileerde curve aandeel zwart 1848–2000 is volgens de pagina geen meetreeks.
- `SEX.optimum` staat op 0 en `k` op 3 als losse velden; de tekst "best voor overleven: geen staart" klopt met het model (overleving exp(−(t/0,7)²) is maximaal bij t = 0).
- Gebouwd vóór prompt v3/v4: geen NIVEAU-schakelaar (Havo/Vwo), geen Part C-stijlkaart (Micro/Macro/Schema), geen ingebedde fonts (Google Fonts via `<link>`, dus offline valt de film terug op Georgia/systeemletters).
- Geen begrippenlijst en geen controlevragen na afloop; alleen vier voorspelvragen.
- Frasen met duur 0 in `TL` worden nooit als ondertitel getoond (de caption-zoekfunctie pakt dan de volgende frase): "De simulatie:" (h5_gericht, 1:45.9). In het transcript staan ze wel.
- Er is geen los audiobestand of stem-invoertekst met respellings in de repo; bij heropname moet de invoer opnieuw worden opgebouwd uit script.md + de QA-tabel.
