# De grote lijn — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/evolutie/5-de-grote-lijn.html |
| Reeks / nummer | Evolutie, deel 5 van 9 (eyebrow "Biologie · Evolutie · deel 5") |
| Doelgroep / niveau | 5/6 vwo (badge op de pagina); één niveau, geen havo/vwo-schakelaar of vwo-blokken |
| Versie / datum | versie 0.2 · 4 oktober 2026 (footer) |
| Stem / model | Roos (ElevenLabs, eleven_multilingual_v2) |
| Duur | 7:15 (434,76 s; blob 001.mp3, gelijk aan `TL.total` = 434.76) |
| Beeldstijl | ouder eigen ontwerp, vóór Part C: canvas 1920×1080, donkerblauwe ondergrond (#0F1B2D), Literata + Public Sans, amber als accentkleur, platte vereenvoudigde tekeningen; één as, "het jaar van de aarde", plus drie deterministische simulaties: een zuurstof-boxmodel (`OXY`, 600 stappen van 2 miljoen jaar), endosymbiose als agentsimulatie (`ENDO`, seed 12, 60 cellen) en vertakking met en zonder ramp (`TREE`, `treeRun(3,…)`) |
| Audio-opslag | één doorlopende take: 1 mp3 (blob 001.mp3, als base64 data-URI in `au.src`) met 13 gesproken stukken ("takes") en de stiltes voor titel-, hoofdstuk- en eindkaarten en vragen al ingebakken |
| Reconstructie | 2026-10-12, uit de gepubliceerde HTML |

## Opbouw
Hoofdstukken zoals in `CH` (de knoppen onder de speler). Hoofdstuktype volgens het docentdeel: A (een lange tijdlijn langslopen) met B (één as, het jaar van de aarde).

| Begin | Hoofdstuk | Takes | Vraag | Kernbeeld |
|---|---|---|---|---|
| 0:00 | Het jaar (cold open) | g1_cold | – | de geschiedenis van de aarde als één jaar: maandenlang niets groter dan een cel; "Wanneer verschijnt de mens? Houd dat vast." |
| 0:25 | Vijf gebeurtenissen | g2_intro | – | LUCA; vijf gebeurtenissen die de wereld veranderden |
| 0:44 | Zuurstof | g3_cyano, g4_ijzer | q1 | cyanobacteriën en fotosynthese, zuurstofcurve die pas na honderden miljoenen jaren stijgt; vraag 1; boxmodel ijzer, zuurstof en roest; gebande ijzerformaties; zuurstof als gif |
| 1:55 | De cel met een kern | g5_kern, g6_endo | q2 | bacterie tegenover cel met kern en mitochondriën; vraag 2; endosymbiose-simulatie (aandeel cellen met gast naar 1); plantencel met chloroplast |
| 3:08 | Meercelligheid en het land | g7_meercellig, g8_land | – | een miljard jaar bijna niets; Ediacara; de Cambrische explosie; ozonlaag; planten 470 mln, insecten en bossen 400 mln, Tiktaalik 375 mln |
| 4:16 | Uitsterven | g9_uitsterven, g10_radiatie | q3 | soortenaantal (gestileerd), Perm (vulkanen Siberië) en inslag bij Mexico; vraag 3; vertakkingssimulatie zonder en met ramp: uitwaaiering |
| 5:30 | Het jaar van de aarde | g11_mens, g12_kalender | q4 | mens en chimpansee, Homo sapiens 300.000 jaar in Afrika; vraag 4; de kalender wordt ingevuld (31 december 23:25) |
| 6:38 | Samengevat | g13_slot | – | slot: "het leven paste zich niet aan; het leven dat toevallig paste, werd talrijk" = deel 2; volgende keer deel 6 |

Kaarten (tekst in `CARDS`): title = "De grote lijn" / "Evolutie · deel 5"; card1 = "1 · Zuurstof" / "3 miljard jaar geleden"; card2 = "2 · De cel met een kern" / "2 miljard jaar geleden"; card3 = "3 · Meercelligheid en het land" / "600 tot 375 miljoen jaar geleden"; card4 = "4 · Uitsterven" / "252 en 66 miljoen jaar geleden"; card5 = "5 · Het jaar van de aarde"; card6 = "Samengevat"; end = "Volgende keer: natuurlijke selectie van dichtbij" / "Evolutie · deel 6".

## Vragen
Alle vragen zijn voorspelvragen die de film onderbreken (segment `q`, 11,5 s stilte in de audio). Er zijn geen aparte controlevragen. Niveau: allemaal 5/6 vwo.

**q1** · 1:13.7 · hoofdstuk "Zuurstof" · na take g3_cyano  
Cyanobacteriën maken al vanaf 3 miljard jaar geleden zuurstof. Toch stijgt de zuurstof in de lucht pas rond 2,4 miljard jaar geleden. Waarom?  
- A. Ze maakten eerst te weinig; pas later werden het er genoeg. — feedback: "Ook kleine hoeveelheden stapelen zich over honderden miljoenen jaren op. Er moet iets zijn dat de zuurstof actief wegneemt."
- B. De zuurstof werd eerst weggevangen door opgelost ijzer in de zee. **(juist)** — feedback: "Klopt. Zolang er ijzer in zee was, roestte elke zuurstofmolecuul meteen weg. Pas daarna bleef er zuurstof over voor de lucht."
- C. De lucht kon toen nog geen zuurstof vasthouden. — feedback: "Lucht houdt zuurstof prima vast; het probleem zat in de zee, waar de zuurstof ontstond."

**q2** · 2:25.6 · hoofdstuk "De cel met een kern" · na take g5_kern  
Mitochondriën hebben eigen, ringvormig DNA, delen zich zelfstandig en zijn zo groot als bacteriën. Wat is de beste verklaring?  
- A. Het waren ooit vrij levende bacteriën, opgenomen door een andere cel. **(juist)** — feedback: "Klopt. Endosymbiose: een bacterie die in een andere cel ging leven en nooit meer wegging."
- B. De cel bouwde ze zelf; de gelijkenis met bacteriën is toeval. — feedback: "Drie onafhankelijke bacterie-kenmerken tegelijk door toeval is onwaarschijnlijker dan één verklaring: ze waren bacteriën."
- C. Het zijn bacteriën die de cel ziek maken. — feedback: "Een ziekteverwekker schaadt de cel. Mitochondriën leveren juist de energie; de samenwerking is voor beide gunstig."

**q3** · 4:45.6 · hoofdstuk "Uitsterven" · na take g9_uitsterven  
66 miljoen jaar geleden: de inslag. Alle dinosauriërs weg, behalve de vogels. Wat gebeurde er daarna met de zoogdieren?  
- A. Ze stierven ook bijna uit en ontstonden pas later opnieuw. — feedback: "Ze verloren soorten, maar veel kleine zoogdieren overleefden; uit hen komt de hele uitwaaiering daarna."
- B. Ze ontstonden uit de overlevende dinosauriërs. — feedback: "Zoogdieren en dinosauriërs zijn aparte takken die al lang naast elkaar bestonden. De vogels zijn de overlevende dino's."
- C. Ze bestonden al lang, bleven klein naast de dino's, en waaierden nu uit. **(juist)** — feedback: "Klopt. Zoogdieren bestonden al meer dan 150 miljoen jaar. Toen de grote rollen leeg waren, vertakten ze snel: walvissen, vleermuizen, paarden, apen."

**q4** · 5:58.2 · hoofdstuk "Het jaar van de aarde" · na take g11_mens  
De geschiedenis van de aarde als één jaar: 1 januari ontstaat de aarde, eind februari de eerste cellen. Wanneer verschijnt Homo sapiens?  
- A. Half december. — feedback: "Half december is ongeveer 200 miljoen jaar geleden: de eerste dinosauriërs en zoogdieren."
- B. 31 december, in de laatste 35 minuten. **(juist)** — feedback: "Klopt. 300.000 jaar op 4,5 miljard is 35 minuten op een jaar. Bijna de hele geschiedenis van het leven is de geschiedenis van cellen."
- C. Eind november. — feedback: "Eind november komen de planten het land op. De mens komt veel, veel later."

## Begrippen
Geen begrippenlijst op de pagina (onbekend, niet in de HTML). Wel een legenda "Kleuren in deze reeks":

- #F0B64A: de rode draad: mitochondriën, het Cambrium, de mens op de kalender
- #86CF86: leven: cyanobacteriën, planten, overlevende takken
- #6FB7E8: zuurstof, de celkern, de ozonlaag, kalenderdata
- #B5552E: roest: de gebande ijzerformaties
- #E57C5B: uitsterven en rampen

## Docentdeel
Uitklapblokken onder "Voor de docent". **Hoe deze film uitlegt** (letterlijk overgenomen):

- Hoofdstuktype A (een lange tijdlijn langslopen) met B (één as, het jaar van de aarde, dat aan het begin wordt gesteld en aan het eind wordt ingevuld). Bewust geen opsomming van tijdperken en namen: vijf gebeurtenissen die de wereld veranderden, elk met een mechanisme en, waar het kan, een simulatie. De geologische tijdschaal (Precambrium, Paleozoïcum enzovoort) wordt niet benoemd; de getallen staan er wel. Wie de namen wil koppelen, kan dat met de tabel hieronder.
- Drie simulaties, deterministisch: (1) zuurstof als boxmodel in 600 stappen van 2 miljoen jaar: cyanobacteriën groeien, hun zuurstof wordt eerst door opgelost ijzer weggevangen (roest), pas daarna vult de lucht zich; de vertraging is dus een uitkomst, niet een tekening. De hoogte van de zuurstofcurve is relatief; na de Grote Oxidatie was het werkelijke gehalte nog ver onder de huidige 21 %. (2) Endosymbiose als agentsimulatie: 60 cellen, een cel zonder gast neemt er met kans 0,004 per generatie een op, cellen delen met kans 0,30 (zonder) of 0,40 (met gast), daarna wordt willekeurig teruggesnoeid tot 60. Het aandeel met gast gaat binnen ongeveer 100 generaties naar 1. (3) Vertakking met en zonder ramp: elke tak splitst per stap met kans 0,12·(1 − n/30) en sterft met kans 0,025; in de ramp-run sterft op stap 90 80 % van de takken. Het snelle hervertakken daarna is een gevolg van de vrijgekomen ruimte (lage n/K), het mechanisme achter adaptieve radiatie.
- Misvattingen: zuurstof "kwam gewoon langzaam op gang" (vraag 1); mitochondriën zijn door de cel gebouwd of zijn ziekteverwekkers (vraag 2); zoogdieren ontstonden uit dino's of pas na de inslag (vraag 3); de mens verschijnt "ergens in de herfst" van het aardjaar (vraag 4). Het slot herhaalt de kern van deel 2: het leven paste zich niet aan, het leven dat toevallig paste werd talrijk.
- Gegeven, niet uitgelegd: fotosynthese en celademhaling (stofwisselingsfilms), de bouw van de eukaryote cel. Niet in deze film: de oorzaken van de Cambrische explosie in detail, de menselijke evolutie (eigen aflevering als je wilt), Hardy-Weinberg (vwo, aflevering over selectie en drift).

**Getallen en bronnen** (overgenomen):

| Wat | In de film | Werkelijk | Bron / opmerking |
|---|---|---|---|
| Oxygene fotosynthese | 3 miljard jaar geleden | schattingen 3,0–2,7 miljard jaar; sommige studies eerder | Lyons e.a. 2014, Nature (overzicht) |
| Grote Oxidatie | rond 2,4 miljard jaar | 2,45–2,32 miljard jaar; daarna O₂ ongeveer 0,1–1 % van nu, pas rond 600 mln jaar richting huidige waarden | Lyons e.a. 2014; Holland 2006 |
| Gebande ijzerformaties | roestlagen, bron van staal | vooral 2,5–1,8 miljard jaar oud; leveren het grootste deel van het gewonnen ijzererts | Klein 2005; vereenvoudigd (ook andere afzetmechanismen) |
| Eerste eukaryoten | 2 miljard jaar | fossielen ongeveer 1,8–1,6 miljard jaar; moleculaire schattingen tot 2,1 | Knoll 2014 |
| Endosymbiose | mitochondrium uit een bacterie; chloroplast uit een cyanobacterie | mitochondriën uit alfaproteobacteriën; chloroplasten uit cyanobacteriën | Margulis 1967; Sagan; genoomvergelijkingen |
| Simulatie endosymbiose | delingskans 0,40 vs 0,30 | model; het voordeel is een aanname, niet een gemeten waarde | — |
| Ediacara | 600 miljoen jaar, Australië en Canada | ongeveer 575–540 miljoen jaar; Ediacara Hills (Australië), Mistaken Point (Newfoundland) | afgerond |
| Cambrische explosie | 540 miljoen jaar, een paar tientallen miljoenen jaren | begin Cambrium 539 mln; de meeste stammen verschijnen tussen 540 en 515 mln | Erwin e.a. 2011, Science |
| Planten op het land | 470 miljoen jaar | oudste landplantsporen ongeveer 470 mln (Ordovicium) | Wellman e.a. 2003 |
| Insecten en bossen | 400 miljoen jaar | oudste insect ongeveer 410 mln (Rhyniognatha); eerste bossen ongeveer 385 mln | afgerond |
| Tiktaalik | 375 miljoen jaar, "kruipt het land op" | ongeveer 375 mln, Canada; leefde in ondiep water, kon zich op de vinnen afzetten | Daeschler e.a. 2006, Nature; "kruipt het land op" is versimpeld |
| Massa-uitsterven | vijf keer; Perm 252 mln > 90 % soorten in zee; Krijt 66 mln | "Big Five": 445, 372, 252, 201, 66 mln; Perm-Trias ongeveer 81–96 % van de mariene soorten | Raup & Sepkoski 1982; Stanley 2016 |
| Zoogdieren | bestonden al > 150 miljoen jaar voor de inslag | oudste zoogdierachtigen ongeveer 205–225 mln (Laat-Trias) | afgerond naar beneden |
| Laatste gemeenschappelijke voorouder mens–chimpansee | 7 miljoen jaar; de chimpansee is een neef, geen voorouder | schattingen 6–8 miljoen jaar | Langergraber e.a. 2012 |
| Homo sapiens | 300.000 jaar, Afrika | Jebel Irhoud (Marokko) ongeveer 315.000 jaar | Hublin e.a. 2017, Nature |
| Het aardjaar | cellen eind feb; O₂ 20 jun; kern eind jul; Cambrium 17 nov; planten 23 nov; inslag 26 dec; mens 23:25 | berekend met 4,54 miljard jaar = 365 dagen; 1 dag = 12,4 miljoen jaar | eigen berekening |

**Timing en uitspraak (QA)**: "Woordtijden zijn geschat uit pauzedetectie en zinslengte, niet uit woordtimestamps van de stem. Uitspraaklijst: LUCA → "Loeka"; jaartallen als cijfers; Tiktaalik, Cambrische, Homo sapiens onveranderd." Daaronder een tabel die bij het laden uit `RISK` wordt gevuld (risicowoord, invoer voor de stem, tijd):

| Risicowoord | Invoer voor de stem | Take |
|---|---|---|
| LUCA | Loeka | g2_intro |
| cyanobacteriën | Cyanobacteriën | g3_cyano |
| mitochondriën | mitochondriën | g5_kern |
| endosymbiose | endosymbiose | g6_endo |
| Ediacara (niet uitgesproken) | — | g7_meercellig |
| Cambrische | Cambrische | g7_meercellig |
| Tiktaalik | Tiktaalik | g8_land |
| Homo sapiens | Homo sapiens | g11_mens |
| jaartallen (252, 66, 470) | als cijfers | g9_uitsterven |

Footer: "Stem: Roos (ElevenLabs, eleven_multilingual_v2). Aflevering 5, versie 0.2 · 4 oktober 2026. Organismen zijn vereenvoudigde tekeningen; de drie simulaties zijn deterministisch (vaste seed) en aan de audiotijd gekoppeld."

## Techniek: waar zit wat in de HTML
Regelnummers gelden voor `film.src.html` (uitgepakt met `scripts/filmbron.py`, 620 regels); in de gepubliceerde HTML zijn ze gelijk, omdat de blob op één regel staat.

- **Tijdlijn en tekst**: `const TL = {…}` (r. 193, één lange JSON-regel). `TL.total` = 434.76 s. `TL.takes.<id>` heeft `start`/`end` (absolute seconden in de mp3), `phrases` (ondertitels: `text`, `start`, `end`) en `words` (per woord `w`, `start`, `end`). `TL.segments` is de volgorde van 27 segmenten met `kind`: `sil` (stilte), `take` (gesproken), `card` (titel-/hoofdstuk-/eindkaart, 3,5 s; titel 4,5 s, eind 5 s) en `q` (vraag, 11,5 s).
- **Ondertitels**: `caption(t)` (r. 566) zoekt in alle `phrases` de frase met `start-0.05 ≤ t < end+0.15`. De ondertitels zijn dus precies de `phrases`-teksten.
- **Cues voor animatie**: `cue(takeId, woord, n)` (r. 218) geeft de begintijd van het n-de voorkomen van een woord in die take; alle cues staan in `const C = {…}` (r. 220). Scènes gebruiken `C.x`, `seg(id).start/end` en `ramp`/`ease` om in te faden. Alle animatie is dus aan de audiotijd (`au.currentTime`) gekoppeld; er is geen eigen klok.
- **Woordtijden zijn geschat** (docentdeel QA): uit pauzedetectie en zinslengte, niet uit timestamps van ElevenLabs. Ze kunnen enkele tienden van seconden afwijken.
- **Scènes**: `render(t)` (r. 343) kiest via `segAt(t)` het segment: kaart → `card()` met tekst uit `CARDS` (r. 298); vraag → de eindstand van de voorafgaande take, gedimd (r. 347); take → `SCENE[takeId](t)` (scènes vanaf r. 339).
- **Simulaties** (vooraf berekend bij het laden, vaste seed): r. 241: `OXY`; r. 252: `ENDO`; r. 272: `TREE`.
- **Takes per scènefunctie**:
  - `g1_cold` → r. 352
  - `g2_intro` → r. 363
  - `g3_cyano` → r. 373 (`cyanoScene`, gedeeld)
  - `g4_ijzer` → r. 396
  - `g5_kern` → r. 424 (`kernScene`, gedeeld)
  - `g6_endo` → r. 437
  - `g7_meercellig` → r. 457
  - `g8_land` → r. 470
  - `g9_uitsterven` → r. 483 (`uitScene`, gedeeld)
  - `g10_radiatie` → r. 500
  - `g11_mens` → r. 516 (`mensScene`, gedeeld)
  - `g12_kalender` → r. 526
  - `g13_slot` → r. 538
- **Vragen**: `QDEFS` (r. 199): `text`, `options[{k,text}]`, `correct`, `explain{k: tekst}`. Speler-logica: `QSEGS` (r. 555): aftellen van `start+1` tot `start+9` s, daarna onthulling. `gate(t)` (r. 586) pauzeert de audio op `cdEnd` tot er een antwoord is (Leerling) of tot de docent op Verder drukt (Klas), tenzij "automatisch door" aan staat. `questionUI(t)` (r. 572) tekent de opties en de feedback.
- **Audio**: `<audio id="au">`; r. 551: `au.src="data:audio/mpeg;base64,@@BLOB:001.mp3@@"`. Eén bestand; er is geen koppeling per segment, alleen de absolute tijden in `TL`.
- **Pagina-onderdelen**: hoofdstukken `CH` (r. 603), transcript `TRN` + `QAFTER` (r. 607–608; de transcripttekst wordt uit `phrases` opgebouwd), uitspraaktabel `RISK` (r. 610), docentdeel als HTML (r. 152–188), seekbalk `max` en de tijd "0:00 / …" hard in de HTML (r. 120).
- **Speler**: Leerling/Klas (`?modus=klas` in de URL zet Klas), "automatisch door", CC (C), volledig scherm (F), spatie, pijltjes ±5 s. Geen Havo/Vwo-schakelaar en geen toetsfunctie.

## Zo pas je deze film aan
1. **Tekst op het scherm**: staat als letterlijke strings in de `SCENE.<take>`-functies (zie de lijst hierboven), hoofdstuk- en eindkaarten in `CARDS`. Een wijziging daar raakt de audio niet.
2. **Ondertitel zonder audiowijziging** (bijv. tikfout): pas `text` in de juiste `phrases` aan. De transcript-tekst wordt daaruit opgebouwd. Laat `words` gelijk lopen (de `cue()`-functie zoekt daarin), anders vallen animaties terug op het begin van de take (console: "cue missing").
3. **Een zin opnieuw opnemen**: er is maar één mp3. Knip het nieuwe fragment in 001.mp3 op de plek van de oude take (de take loopt van `TL.takes.<id>.start` tot `.end`). Is de nieuwe opname even lang, dan hoef je alleen `phrases` en `words` binnen die take bij te werken. Is ze langer of korter, dan schuiven alle latere `start`/`end` in `takes`, `phrases`, `words` en `segments` met het verschil mee, en ook `TL.total`, de seekbalk (`max` en de vaste tekst "0:00 / …" in r. 120) en de tijden in het docentdeel. Daarna `python3 scripts/filmbron.py inpakken`.
4. **Een vraag aanpassen**: alleen `QDEFS` wijzigen (tekst, opties, `correct`, `explain`). De pauze in de audio (11,5 s) blijft gelijk. Een vraag erbij of eraf betekent stilte in de mp3 toevoegen of weghalen plus een `q`-segment, en `QAFTER`, `CH`-tags en de `sceneBehindQ`/`back`-koppeling aanpassen.
5. **Let op**: kaarten en vragen zijn stiltes ín de mp3, geen pauzes van de speler. Een kaart langer maken = stilte bijvoegen in de audio en alle latere tijden verschuiven. De `C`-cues rekenen zichzelf opnieuw uit, maar de scènes gebruiken ook vaste offsets na een cue (bijv. `C.x+2.0`).

## Aandachtspunten
- Gemaakt vóór Prompt v4/Part C: geen Micro/Macro/Schema-stijlkaart, geen begrippenlijst, geen havo/vwo-blokken, terwijl de reeks volgens de afspraken ook voor havo bedoeld is. De badge zegt alleen "5/6 vwo".
- Woordtijden zijn geschat; het docentdeel zegt zelf "Bij de volledige bouw gebruiken we woordtimestamps". Dat is nog niet gebeurd.
- Het code-commentaar boven `treeRun` zegt "p = 0.08·(1 − n/K) … K = 36", maar de code gebruikt 0,12 en K = 30. Het docentdeel noemt wel de juiste waarden (0,12·(1 − n/30)).
- In g11_mens: "de laatste gemeenschappelijke voorouder van mens en chimpansee. Daar splitst onze tak af; de chimpansee is dus geen voorouder van ons, maar een neef." Controleer of die formulering (afsplitsen bij de voorouder) is zoals je het wilt.
- Controle: 13 takes, 4 vragen, 8 kaarten; som van alle segmenten = 434,712 s, mp3 = 434,756 s (verschil 0,044 s, staart van de eindkaart). De stiltes in de mp3 (silencedetect) vallen op de kaart- en vraagsegmenten. Alle `cue()`-aanroepen met een vast woord vinden hun woord.

## Wijzigingen
- 15 okt 2026 — Speler: de knop Vragen aan/uit (onthouden in `bk-vragen`, ook `?vragen=uit`) werkt nu altijd, ook na spoelen, in pauze en als je hem halverwege omzet. Bij Vragen uit vallen weg: de vraag zelf, de gesproken vraagzin(nen) ervoor (zinnen op '?', 'Wat denk je?', 'Denk even na.', 'Eerst een voorspelling.') en een los antwoord direct erna ('Antwoord B.', 'Ja.', 'Nee.', 'Precies.'); gewone uitlegzinnen blijven staan. De tijdbalk, tijd en hoofdstuktijden tonen de ingekorte duur. Code: `bkBouw()` maakt `BK.k` (stukken die de speler overslaat); regelnummers in de spelercode zijn daardoor een paar regels verschoven. Hoofdstukkaarten (card1, card2, …) duren 2,2 s in plaats van 3,5 s: de speler slaat het stille midden van de kaart over (in- en uitfaden blijven; de mp3 is niet veranderd). Korte inhoudelijke antwoorden zoals 'Analoog.' of 'Twee.' blijven staan.
