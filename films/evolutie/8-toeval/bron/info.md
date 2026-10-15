# Toeval — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/evolutie/8-toeval.html |
| Reeks / nummer | Evolutie, deel 8 (aflevering 8 van 9) |
| Doelgroep / niveau | 5/6 vwo (badge op de pagina); de kaart van hoofdstuk 3 zegt "rekenen aan allelen (vwo)", maar er zijn geen havo/vwo-blokken of schakelaar |
| Versie / datum | versie 0.1 · 4 oktober 2026 (footer) |
| Stem / model | Roos (ElevenLabs, eleven_multilingual_v2) |
| Duur | 6:18 (378,4 s; één mp3, ffprobe 378,41 s = `TL.total`). Gesproken: 11 takes, 310,2 s |
| Beeldstijl | Ouder eigen ontwerp van de Evolutie-reeks (vóór Part C): donkerblauw canvas, amber accent, Literata + Public Sans; eilandje Pingelap met poppetjes (lijnfiguren), knikkers/allelbalken, driftlijnen, kruisingsschema (Punnett), staafdiagrammen |
| Audio-opslag | één doorlopende take: 1 mp3 als base64 in de HTML (blob 001.mp3, 4,5 MB) |
| Reconstructie | 2026-10-12, uit de gepubliceerde HTML |

## Opbouw
Hoofdstukken zoals in `const CH`. Type volgens het docentdeel: hoofdstuktype D ("één verschijnsel, toeval, in drie gedaanten") met een rekenhoofdstuk (vwo).

| Begin | Hoofdstuk | Takes | Type | Kernbeeld |
|---|---|---|---|---|
| 0:00 | Pingelap (cold open) | m1_cold | opening | atol, tyfoon 1775, ~20 overlevenden, één drager; "1 op 20" tegen "1 op 30.000" |
| 0:31 | p en q | m2_intro | taal | allelbalk A/a, "p + q = 1", "evolutie = verandering van p" |
| 0:56 | Genetische drift (vraag 1) | card1, m3_drift, q1, m4_drift2 | D, gedaante 1 | knikkers trekken; acht driftlijnen bij N = 20, daarna acht bij N = 2000 |
| 1:59 | Flessenhals en stichtereffect (vraag 2) | card2, m5_flessenhals, q2, m6_variatie | D, gedaante 2 | 2000 → 20 mensen; 10 allelen door een flessenhals, 4 over; jachtluipaard |
| 3:15 | Hardy-Weinberg (vraag 3) | card3, m7_hw, m8_rekenen, q3, m9_rekenen2 | D, gedaante 3 + rekenen (vwo) | kruisingsschema met p en q; 2000 paringen geteld/verwacht; rood haar: q² → q → 2pq = 32 %; taaislijmziekte |
| 5:06 | De meetlat (vraag 4) | m10_meetlat, q4 | toepassing | verwacht (HW) tegen gemeten: "wijkt af → er werkt iets" |
| 5:40 | Samengevat | m11_slot | samenvatting | samenvattende tegels |
| 6:13 | (eindkaart) | end | — | "Volgende keer: de vinken van de Galápagos · Evolutie · deel 9 (finale)" |

Let op: `CH` laat "Samengevat" beginnen bij take `m11_slot` (5:40), maar die take opent met het antwoord op vraag 4 ("Als meetlat: …"); de samenvatting zelf begint pas op 5:44.5. De kaart `card4` ("Samengevat") staat wel in `CARDS`, maar niet in `TL.segments`.

Volledige tijdlijn (`TL.segments`):

| Segment | Soort | Begin | Eind | Duur (s) |
|---|---|---|---|---|
| — | sil | 0:00.0 | 0:01.0 | 1,00 |
| m1_cold | take | 0:01.0 | 0:26.6 | 25,59 |
| title | card | 0:26.6 | 0:31.1 | 4,50 |
| m2_intro | take | 0:31.1 | 0:56.3 | 25,22 |
| card1 | card | 0:56.3 | 0:59.8 | 3,50 |
| m3_drift | take | 0:59.8 | 1:23.1 | 23,27 |
| q1 | q | 1:23.1 | 1:34.6 | 11,50 |
| m4_drift2 | take | 1:34.6 | 1:59.4 | 24,84 |
| card2 | card | 1:59.4 | 2:02.9 | 3,50 |
| m5_flessenhals | take | 2:02.9 | 2:35.1 | 32,23 |
| q2 | q | 2:35.1 | 2:46.6 | 11,50 |
| m6_variatie | take | 2:46.6 | 3:15.5 | 28,84 |
| card3 | card | 3:15.5 | 3:19.0 | 3,50 |
| m7_hw | take | 3:19.0 | 4:06.1 | 47,14 |
| — | sil | 4:06.1 | 4:06.7 | 0,60 |
| m8_rekenen | take | 4:06.7 | 4:22.1 | 15,42 |
| q3 | q | 4:22.1 | 4:33.6 | 11,50 |
| m9_rekenen2 | take | 4:33.6 | 5:05.3 | 31,67 |
| — | sil | 5:05.3 | 5:05.9 | 0,60 |
| m10_meetlat | take | 5:05.9 | 5:28.6 | 22,66 |
| q4 | q | 5:28.6 | 5:40.1 | 11,50 |
| m11_slot | take | 5:40.1 | 6:13.4 | 33,30 |
| end | card | 6:13.4 | 6:18.4 | 5,00 |

## Vragen
Vier voorspelvragen (`QDEFS`), allemaal meerkeuze met drie opties, niveau 5/6 vwo (er zijn geen aparte havo/vwo-vragen en geen controlevragen na afloop). Elke vraag staat in een stil tijdlijnsegment van 11,5 s direct na de take die de vraag stelt; aftellen 8 s, daarna wacht de speler (tenzij "automatisch door").

| # | Plek | Vraag | Opties | Juist |
|---|---|---|---|---|
| q1 | 1:23, na `m3_drift` | Populatie van 20, p = 0,5, geen selectie. Elke generatie worden de allelen willekeurig getrokken. Wat gebeurt er met p na 100 generaties? | A) p blijft 0,5: zonder selectie verandert er niets.<br>B) p schommelt en eindigt meestal op 0 of op 1.<br>C) p gaat naar 1: A is dominant en wint vanzelf. | B |
| q2 | 2:35, na `m5_flessenhals` | Een populatie gaat door een flessenhals: van 2000 naar 20 dieren. Wat gebeurt er met de genetische variatie? | A) Ze neemt toe: in een kleine groep ontstaan sneller nieuwe mutaties.<br>B) Ze blijft gelijk: de allelen zijn er nog, alleen in minder dieren.<br>C) Ze neemt af: zeldzame allelen komen de flessenhals vaak niet door. | C |
| q3 | 4:22, na `m8_rekenen` | Rood haar is recessief; 4 % van een bevolking heeft het (q² = 0,04). Welk deel van de bevolking is drager (Aa)? | A) 32 %<br>B) 4 %<br>C) 20 % | A |
| q4 | 5:29, na `m10_meetlat` | Hardy-Weinberg zegt: als er niets gebeurt, verandert er niets. Waarvoor gebruik je het dan? | A) Het beschrijft hoe populaties in de natuur altijd zijn.<br>B) Als meetlat: wijkt een populatie af, dan werkt er iets (selectie, drift, migratie, niet-willekeurig paren).<br>C) Nergens voor: in de natuur gebeurt er altijd iets. | B |

Terugkoppeling per gekozen optie staat in `QDEFS.qN.explain` (letterlijk):

- **q1**: B: "Klopt. Toeval bij het trekken laat p elke generatie een stukje verschuiven; in een kleine populatie loopt dat vaak uit op het verlies van een allel." · A: "Zonder selectie is er geen richting, maar wel toeval. Een steekproef van 40 allelen is zelden precies 50/50, en die afwijking is het startpunt voor de volgende." · C: "Dominant zegt alleen hoe een allel zich in een heterozygoot uit, niet hoe vaak het voorkomt. Dominantie verandert p niet."
- **q2**: C: "Klopt. Twintig dieren dragen hooguit veertig kopieën van een gen; zeldzame allelen zitten daar meestal niet bij, en drift ruimt daarna nog meer op." · A: "Mutaties ontstaan per individu; minder dieren betekent minder nieuwe mutaties, niet meer." · B: "Een allel dat bij 1 op de 100 dieren zat, zit in een steekproef van 20 vaak helemaal niet."
- **q3**: A: "Klopt. q = √0,04 = 0,2, dus p = 0,8, en 2pq = 2 × 0,8 × 0,2 = 0,32." · B: "4 % is q²: het deel met twee a-allelen, dus met rood haar. Dragers hebben er één." · C: "20 % is q, de allelfrequentie. Dragers zijn 2pq."
- **q4**: B: "Klopt. Het is de nul-situatie. Juist de afwijking ervan vertelt dat er evolutie gaande is, en vaak ook welke kracht." · A: "Bijna geen populatie voldoet precies aan de voorwaarden. Het model beschrijft de verwachting zonder krachten, niet de werkelijkheid." · C: "Dat er altijd iets gebeurt, is precies waarom je een meetlat nodig hebt om te zien wát er gebeurt."

## Begrippen
Geen begrippenlijst op de pagina. In beeld als definitie (letterlijk uit de scènes): "A: aandeel p", "a: aandeel q", "p + q = 1", "evolutie = verandering van p"; "genetische drift: verandering van allelfrequenties door toeval"; "flessenhals"; "stichtereffect: een paar dieren op een leeg eiland"; "p² + 2pq + q² = 0,64 + 0,32 + 0,04 = 1"; Hardy-Weinberg als "een meetlat". Kleurlegenda op de pagina:

- `#F0B64A` allel A (frequentie p), het antwoord
- `#6FB7E8` allel a (frequentie q)
- `#86CF86` heterozygoten Aa, dragers; wat uit de simulatie volgt
- `#E57C5B` de drager op Pingelap, afwijking van de verwachting

## Docentdeel
- **Hoe deze film uitlegt**: hoofdstuktype D met rekenhoofdstuk (vwo). De as is p: allelfrequenties als taal, drift als simulatie (trekken met teruglegging), daarop flessenhals en stichtereffect; Hardy-Weinberg afgeleid uit een kruisingsschema met p en q als kansen, gecontroleerd met een simulatie, toegepast op het omgekeerde rekenprobleem (dragers uit een recessief fenotype) en geplaatst als meetlat.
- **Simulaties**: (1) Wright-Fisher-drift, acht runs N = 20 (p start 0,5; 7 van 8 fixeren binnen 100 generaties) en acht runs N = 2000 (normale benadering); (2) flessenhals: 10 allelen (35 % tot 0,5 %), 20 dieren, daarna 30 generaties drift bij N = 40, 4 allelen over; (3) Hardy-Weinberg: 2000 paringen met P(A) = 0,8 (seed 8), afwijking < 1 procent.
- **Misvattingen**: zonder selectie verandert er niets (vraag 1); een dominant allel wordt vanzelf talrijker (vraag 1, optie C); in een kleine groep neemt variatie toe door mutaties (vraag 2); q² verwarren met q of 2pq (vraag 3); Hardy-Weinberg beschrijft de werkelijkheid (vraag 4). Pingelap: bewust "geen voordeel".
- **Gegeven, niet uitgelegd**: dominant/recessief, genotype/fenotype. Niet in de film: mutatie als bron (alleen genoemd), migratie als kracht (genoemd), fixatietijd-wiskunde; (p + q)² = 1 kun je in de klas laten zien.
- **Timing en uitspraak (QA)**: "Woordtijden zijn geschat uit pauzedetectie en zinslengte, niet uit woordtimestamps van de stem. Uitspraaklijst: Hardy-Weinberg → "Hardy-Wainberg"; allelen als "grote A" en "kleine a"; 2pq → "twee p q"; p² → "p-kwadraat"; Galápagos → "Galapagos"; jaartallen als cijfers." Risicowoorden (`const RISK`):

| Risicowoord | Invoer voor de stem | Tijd (eerste voorkomen) |
|---|---|---|
| Pingelap | Pingelap | 0:01.1 (`m1_cold`) |
| Hardy-Weinberg | Hardy-Wainberg | 3:22.3 (`m7_hw`) |
| allelen A en a | grote A, kleine a | 0:46.6 (`m2_intro`) |
| 2pq | twee p q | 4:39.6 (`m9_rekenen2`) |
| p-kwadraat / q-kwadraat | p-kwadraat, q-kwadraat | 3:45.2 (`m7_hw`) |
| Galápagos | Galapagos | 6:09.4 (`m11_slot`) |
| jaartallen (1775, 1908) | als cijfers | 0:03.7 (`m1_cold`) |

Getallen en bronnen (letterlijk overgenomen):

| Wat | In de film | Werkelijk | Bron / opmerking |
|---|---|---|---|
| Pingelap | tyfoon 1775, ongeveer 20 overlevenden, nu 1 op 20 zonder kleurenzien | tyfoon Lengkieki rond 1775; naar schatting 20 overlevenden; achromatopsie bij 4–10 % van de bevolking, dragers rond 30 % | Sundin e.a. 2000, Nature Genetics; Sacks, The Island of the Colorblind (1997) |
| Achromatopsie elders | 1 op 30.000 | ongeveer 1 op 30.000 tot 50.000 | vereenvoudigd |
| Drift, N = 20 | 7 van 8 runs gefixeerd na 100 generaties | verwachte fixatietijd bij p = 0,5 is ongeveer 2,8·N generaties (2N allelkopieën), dus ongeveer 55 generaties bij N = 20 | Kimura & Ohta 1969 |
| Jachtluipaard | huidtransplantaties niet afgestoten | huidtransplantaten tussen niet-verwante dieren werden geaccepteerd als bij tweelingen; flessenhals waarschijnlijk ongeveer 10.000 jaar geleden | O'Brien e.a. 1985, Science |
| Hardy en Weinberg | 1908, onafhankelijk | G.H. Hardy (brief aan Science, 1908) en Wilhelm Weinberg (lezing Stuttgart, 1908) | — |
| Rood haar | 4 % recessief, dragers 32 % | rekenvoorbeeld; rood haar is in werkelijkheid het resultaat van meerdere MC1R-varianten en niet strikt één recessief allel | vereenvoudigd voor de berekening |
| Taaislijmziekte in Nederland | 1 op 30 drager, 1 op 3.600 geboren met | dragerschap ongeveer 1 op 30; incidentie ongeveer 1 op 3.600 tot 4.750 pasgeborenen | NCFS; hielprikgegevens RIVM |
| Voorwaarden Hardy-Weinberg | geen selectie, drift, migratie, mutatie; willekeurig paren | idem; vaak wordt "oneindig grote populatie" genoemd in plaats van "geen drift" | — |

## Techniek: waar zit wat in de HTML
Regelnummers gelden voor zowel de film-HTML in de repo als `film.src.html` (de base64-blob staat op één regel). Zoekwoorden tussen backticks.

- **Audio**: één doorlopend mp3-bestand (mono, 44,1 kHz, 96 kbit/s) als data-URI: `au.src="data:audio/mpeg;base64,…"` (regel 433). De stiltes voor titelkaarten (3,5–5 s) en vragen (11,5 s) zitten ín het bestand; de speler pauzeert niet zelf om tijd te maken, behalve bij de vraagpoort. Het audio-element is de klok: alles wordt per frame getekend op `au.currentTime` (`function loop`).
- **Tijdlijn en tekst**: `const TL = {…}` (regel 184, één lange JSON-regel). `TL.total` = filmduur. `TL.takes.<id>` = gesproken blok met `start`/`end`, `phrases[]` (ondertitelfrasen met `text`, `start`, `end`) en `words[]` (`w`, `start`, `end`). `TL.segments[]` = de volledige tijdlijn in volgorde, met `kind` = `sil` (stilte), `take`, `card` (titelkaart) of `q` (vraag). Alle tijden zijn seconden in het ene mp3-bestand. Volgens de QA-noot op de pagina zijn de woordtijden geschat uit pauzedetectie en zinslengte, niet uit woordtimestamps van de stem; ze sluiten wel aan op de echte stiltes in de mp3 (controle met ffmpeg silencedetect: bij alle pauzes van 2 s of langer valt het einde van de stilte binnen 0,1 s van de begintijd van de volgende take).
- **Ondertitels**: `const PHR` verzamelt alle `phrases`; `function caption(t)` toont de eerste frase met `start − 0,05 ≤ t < end + 0,15`. Knop CC / toets C schakelt ze uit.
- **Transcript** onder de film: gegenereerd uit `phrases` via `const TRN` (labels per take) en `const QAFTER` (welke vraag na welke take in het transcript komt).
- **Hoofdstukken**: `const CH` (naam, begintijd via `seg('<id>').start`, label "vraag").
- **Beeld**: één `<canvas>` 1920×1080. `function render(t)` kiest via `segAt(t)` het segment: `card` → `card()` met tekst uit `const CARDS`; `q` → de bevroren eindstand van de vorige take (`const back={…}`) met een donkere laag; `take` → `SCENE.<take-id>(t)`. Scènefuncties staan tussen `// ---------- scenes` en `// ---------- player`.
- **Animatie aan de stem gekoppeld**: `const C={…}` (regel 211) bevat cue-tijden, berekend met `cue('<take>','<woord>',n)`: de begintijd van het n-de voorkomen van dat woord in `words[]`. Scènes faden/bewegen met `ramp(t, C.x, …)`. Ontbreekt een woord, dan valt `cue` terug op het begin van de take (met `console.warn('cue missing')`). Bij de reconstructie: alle 81 cue-aanroepen vinden hun woord.
- **Simulaties**: deterministisch (vaste seed via `mulberry32`), vooraf doorgerekend bij het laden; de scène toont de generatie die bij de huidige tijd hoort. `DRIFT` (regel 230, Wright-Fisher, 8 runs N = 20 en 8 runs N = 2000), `BOTTLE` (regel 239, 10 allelen door een flessenhals van 20), `HW` (regel 252, 2000 paringen, seed 8); hulpfuncties `lines`, `marbles`, `alleleBar`, `punnett`.
- **Vragen**: `const QDEFS` (regel 190): `text`, `options[{k,text}]`, `correct`, `explain{A,B,C}`. `const QSEGS` koppelt ze aan de `q`-segmenten: aftellen van `start+1` tot `start+9` s; daarna `function gate` pauzeert de audio (Leerling: wacht op een antwoord; Klas: knop Verder), tenzij "automatisch door" aan staat. Een gekozen antwoord springt naar het einde van het aftellen en toont groen/rood plus de `explain`-tekst.
- **Speler**: Leerling/Klas (`?modus=klas` in de URL zet Klas), automatisch door, CC, volledig scherm (F), spatie, pijltjes ±5 s. Geen Havo/Vwo-schakelaar (de film is alleen vwo). Geen toets of score.
- **Docentdeel** is statische HTML (`<summary>Hoe deze film uitlegt`, `Getallen en bronnen`, `Timing en uitspraak (QA)`); de tabel met risicowoorden wordt gevuld uit `const RISK` (woord, invoer voor de stem, take, cue-woord voor de tijd).
- **Fonts**: Literata en Public Sans via Google Fonts (`<link>`), niet ingebed.

## Zo pas je deze film aan
Werk in de uitgepakte vorm: `python3 scripts/filmbron.py uitpakken films/evolutie/8-toeval.html <map>`, bewerk `<map>/film.src.html` en pak weer in met `python3 scripts/filmbron.py inpakken <map> films/evolutie/8-toeval.html`.

1. **Tekst op het scherm** (labels, kaders, titelkaarten): zoek de string in de `SCENE.<take>`- of `…Scene`-functie, of in `const CARDS` voor de kaarten. Dit raakt de audio niet.
2. **Een vraag aanpassen**: wijzig `QDEFS.qN` (tekst, opties, `correct`, `explain`). Let op: de vraag wordt ook hardop gesteld aan het eind van de take ervoor (zie script.md); wie de vraag inhoudelijk verandert, moet die zin opnieuw laten inspreken. Het transcript neemt de nieuwe tekst automatisch over.
3. **Ondertitel corrigeren zonder nieuwe opname** (bijv. een tikfout): wijzig `phrases[].text` én het bijbehorende woord in `words[].w` van dezelfde take. Verander je een woord dat in `const C` als cue wordt gebruikt (zoek op `cue('<take>','<woord>'`), pas dan ook die cue aan, anders springt de animatie naar het begin van de take.
4. **Een alinea opnieuw opnemen**: audio en tijdlijn zijn één take. Genereer de nieuwe zin(nen) met stem Roos (eleven_multilingual_v2, met de uitspraakinvoer uit de QA-tabel), knip het mp3-stuk van `TL.takes.<id>.start` tot `.end` eruit en plak het nieuwe erin (bijv. ffmpeg), met dezelfde stilte ervoor en erna. Daarna: `phrases` en `words` van die take opnieuw timen; alle `start`/`end` van latere takes, frasen, woorden en `segments` opschuiven met het duurverschil; `TL.total` bijwerken. Cue-tijden, hoofdstukken, vraagpoorten en simulaties volgen dan vanzelf, want ze worden uit `TL` berekend. Er staat geen script voor het hertimen in de repo.
5. **Een titelkaart of vraagpauze langer/korter maken**: dat kan niet alleen in `TL.segments`, want de stilte zit in de mp3. Stilte toevoegen/wegknippen in het audiobestand en daarna de tijden na dat punt verschuiven zoals bij punt 4.
6. **Let op**: de statische `max` van de schuifbalk en de tekst `0:00 / m:ss` in de HTML worden bij het laden door `seek.max=TOTAL` en `loop()` overschreven; de badge "ongeveer … minuten" is handwerk.

## Aandachtspunten
- `CARDS.card4` ("Samengevat") staat niet in de tijdlijn; het hoofdstuk "Samengevat" in `CH` start op take `m11_slot`, die eerst het antwoord op vraag 4 geeft ("Als meetlat: …"). Een klik op "Samengevat" begint dus met het vraagantwoord.
- De ondertitel "p is 0,5." staat maar 0,5 s in beeld, ongeveer 3 s na de vorige frase: in de woordtijden is "precies even vaak voorkomen:" uitgerekt (1:00.6–1:05.1). Mogelijk is de geschatte timing hier scheef; niet gecontroleerd tegen de audio.
- Rood haar wordt als één recessief allel behandeld; het docentdeel zegt zelf dat dit vereenvoudigd is.
- Gebouwd vóór prompt v3/v4: geen NIVEAU-schakelaar (Havo/Vwo), geen Part C-stijlkaart (Micro/Macro/Schema), geen ingebedde fonts (Google Fonts via `<link>`, dus offline valt de film terug op Georgia/systeemletters). Mensen (Pingelap) zijn lijnfiguren zonder gezicht (`function person`); de huidige stijlkaart vraagt eenvoudige gezichten.
- Geen begrippenlijst en geen controlevragen na afloop; alleen vier voorspelvragen.
- Frasen met duur 0 in `TL` worden nooit als ondertitel getoond (de caption-zoekfunctie pakt dan de volgende frase): "Simulatie:" (m6_variatie, 2:54.2). In het transcript staan ze wel.
- Er is geen los audiobestand of stem-invoertekst met respellings in de repo; bij heropname moet de invoer opnieuw worden opgebouwd uit script.md + de QA-tabel.

## Wachtlijst opnieuw inspreken

Aanvullingen 15-10-2026 na de vergelijking met Gewoon Uitgelegd (tekst staat als [nieuw] in `script.md`). Hele film is vwo (kaart van hoofdstuk 3 zegt al "rekenen aan allelen (vwo)"), dus geen apart vwo-blok nodig. Samen 7 zinnen.

- **`m9_rekenen2` (Hardy-Weinberg)**: na "…bij maar 4 procent ziet." komt de klassieke examenfout: het deel dragers onder de mensen zonder rood haar (gezonden) is 2pq / (p² + 2pq) = 0,32 / 0,96 = 1/3 (3 zinnen, ca. 14 s). Zelfde getallen als het rood-haarvoorbeeld van de film.
- **`m10_meetlat` (De meetlat)**: na "selectie, drift, migratie, of niet-willekeurig paren." komen geteld tegenover verwacht (terug naar de 2000 paringen) en inteelt: meer homozygoten, minder heterozygoten, allelfrequenties gelijk (4 zinnen, ca. 18 s). Komt vóór de vraagzin "Waarvoor gebruik je Hardy-Weinberg dus?", zodat `q4` direct na de take blijft volgen.
- **Opname** volgens "Zo pas je deze film aan", punt 4: takes `m9_rekenen2` (273.640–305.312) en `m10_meetlat` (305.912–328.575) opnieuw genereren met stem Roos (eleven_multilingual_v2, uitspraakinvoer uit de QA-tabel: "twee p q", "p-kwadraat", "Hardy-Wainberg"), terugknippen met dezelfde stiltes ervoor en erna, `phrases`/`words` van beide takes opnieuw timen en alles daarna (`q4`, `m11_slot`, `end`, `TL.total`) opschuiven (samen ca. +32 s). Bestaande cues in deze takes ('32', 'p', 'q', 'derde', 'kracht', 'dragers', 'dertig'; 'valkuil', 'nutteloos', 'meetlat', 'Meet', 'werkt', 'Waarvoor') blijven werken, maar let op: `cue('m9_rekenen2','p')` en `'q'` pakken het eerste voorkomen, dat blijft vóór de invoeging. Nieuwe cues toevoegen voor het nieuwe beeld (bijv. 'examen', 'gedeeld', 'getelde', 'inteelt'). Badge "ongeveer … minuten" bijwerken.
- **Beeld nodig**: in `SCENE.m9_rekenen2` een rekenkader "drager onder de gezonden = 2pq / (p² + 2pq) = 0,32 / 0,96 = ⅓" met "aa telt niet mee" (aa-blokje doorgestreept, kleur `#E57C5B` bij de fout "alleen 2pq = 32 %"). In `SCENE.m10_meetlat` naast "verwacht (HW) / gemeten" een staafdiagram AA–Aa–aa bij inteelt: Aa lager, AA en aa hoger dan verwacht, met de allelbalk eronder ongewijzigd (p = 0,8, q = 0,2) en label "inteelt: andere verdeling, zelfde p".
- **Docentdeel**: Misvattingen aanvullen met "dragers onder gezonden = 2pq" en "inteelt verandert p"; QA-tabel/`RISK` aanvullen met de woorden hieronder.
- **Risicowoorden (uitspraaktest)**:
  - *homozygoten* / *heterozygoten* — IPA /ˌɦoː.moː.ziˈɣoː.tə(n)/ en /ˌɦeː.tə.roː.ziˈɣoː.tə(n)/ (klemtoon op "GOO", y als ie, g als Nederlandse g). Geen online IPA gevonden (Wiktionary NL/EN en Woorden.org gaven geen transcriptie of waren niet bereikbaar); afgeleid uit de spelling en het klemtoonpatroon van leenwoorden op -oot. Risico: Engelse "zai-goot" of een Franse z. Stem-invoer: "homozie-goten" en "heterozie-goten".
  - *inteelt* — IPA /ˈɪn.teːlt/ (klemtoon op "in"). Laag risico, wel meenemen. Stem-invoer: "inteelt".
  - *0,32 gedeeld door 0,96* — getallen als in de rest van de film ("0,32" werd al goed uitgesproken); stem-invoer "nul komma tweeëndertig gedeeld door nul komma zesennegentig" alleen als de cijfers fout gaan. Let op: "negentig"-regel (Kamiels uitspraaklijst: "neguntig") geldt ook voor "zesennegentig" → bij problemen "zesenneguntig".
