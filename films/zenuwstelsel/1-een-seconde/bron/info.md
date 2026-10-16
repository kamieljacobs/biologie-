# Eén seconde — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/zenuwstelsel/1-een-seconde.html |
| Reeks / nummer | Zenuwstelsel, film 1 (pagina: “het zenuwstelsel in vogelvlucht · 5 vwo · film 1 van de reeks Zenuwstelsel”; `plan.series`: ontbreekt) |
| Doelgroep / niveau | 5 vwo, één niveau (geen havo/vwo-schakelaar); hoofdstuk 6 “Weten” als verdieping gemarkeerd (`verdieping: true`, label op hoofdstukkaart en in hoofdstuklijst) |
| Versie / datum | 1.1 · 4 oktober 2026 (credits op de pagina) |
| Stem / model | Roos (ElevenLabs, eleven_multilingual_v2) |
| Duur | 5:54 gesproken (som van 18 mp3’s, 354,8 s); speler-totaal incl. titel-, hoofdstuk- en eindkaarten en 6 aftellingen van 8 s: 7:14 |
| Beeldstijl | Eigen reeksontwerp van vóór de Part C-stijlkaart: warme vlakke ‘wereld’ (lucht-gradiënt, huizen, fietser, bal, kind), een lens met gegenereerde doorkijk-anatomie (PNG) met zenuwbanen als vectorlaag, en lichte schema-scènes (#EEF1F7) voor de micro-uitleg; Inter-lettertype (systeemfont, niet ingebed) |
| Audio-opslag | 18 fragmenten, één per gesproken segment, als base64-data-URI in `window.FILM_AUDIO` (blobs 002–019); daarnaast blob 001.png = lichaamsillustratie in de lens (gpt-image-2), als data-URI in `<image>` op r. 174 |
| Reconstructie | 2026-10-12, uit de gepubliceerde HTML |

## Opbouw

| Begin | Hoofdstuk | Segmenten | Type (docentdeel) | Kernbeeld (docentdeel) |
|---|---|---|---|---|
| 0:00 | Cold open | s00 | — | wereld: fietser, bal rolt de straat op, handen knijpen in de remmen, kind; beeld bevriest op ‘weet’ met puzzelvraag, tijdbalk op 0,000 s |
| 0:15 | 1 De kaart | s11, q1, a1 | structuur en functie | lens op de fietser: CZS als vlak, zenuwen als lijnen; doorsnede van een zenuw als bundel |
| 1:07 | 2 De prikkel | s21, q2, a2 | mechanisme op kleinere schaal | receptor zet licht om in een impuls; drempelwaarde-simulatie met drie prikkels |
| 2:15 | 3 Remmen: via de hersenen | q3, a3 | proces in tijd | impuls hersenen → ruggenmerg → arm; tijdbalk op 0,200 s |
| 3:10 | 4 De reflex | q4, a4 | proces in tijd | terugtrekreflex in de lens; doorsnede ruggenmerg; reflexboog als rij van vijf; kniepees 18 ms |
| 4:19 | 5 Gas en rem | s51, q5, a5 | regulatie | levend model: twee pedalen sturen de hartslagmeter (berekend, niet getekend) |
| 5:29 | 6 Weten (verdieping) | s61, q6, a6 | proces in tijd | Libet-tijdlijn (verdieping); de kaart compleet; grijze en witte stof |
| 6:39 | 7 Samenvatting | s70 | — | tijdlijn van één seconde met markeringen (0, 100, 200 ms, bal, halve seconde, weten) en cursor op de tijdbalk |

Begintijden = begin van de hoofdstukkaart in de speler, zonder wachttijd bij de vragen (zoals in de hoofdstuklijst op de pagina). Type-letters A–I uit de prompt staan niet in de HTML; de typering hierboven is die uit de tabel “Per hoofdstuk” in het docentdeel.

## Vragen

### Voorspelvragen in de film (`plan.questions`)

| Nr | Plek | Vraag | Opties | Juist | Misconceptie-optie | Niveau |
|---|---|---|---|---|---|---|
| V1 | H1 De kaart, 0:33 | Een zenuw in je arm is… | A. één lange zenuwcel / B. een bundel uitlopers van heel veel zenuwcellen / C. een buisje waar het signaal als vloeistof doorheen stroomt | B | A | basis (5 vwo) |
| V2 | H2 De prikkel, 1:25 | Je drukt in het donker zachtjes op je gesloten oog en ziet een lichtvlek. Hoe kan dat? | A. door de druk ontstaat er licht in je oog / B. de receptor geeft een impuls af, en je hersenen maken daar altijd licht van / C. je oog raakt beschadigd | B | A | basis (5 vwo) |
| V3 | H3 Remmen: via de hersenen, 2:18 | Je hand knijpt al in de rem. Waar is het signaal geweest? | A. in het ruggenmerg; de hersenen horen het later / B. in de hersenen, en vandaar naar je handen / C. nergens: de spier reageert zelf op de bal | B | A | basis (5 vwo) |
| V4 | H4 De reflex, 3:13 | Je hand raakt iets scherps. Wat gebeurt er eerst? | A. je voelt pijn en trekt dan je hand weg / B. je hand trekt weg, en daarna voel je pijn / C. allebei precies tegelijk | B | A | basis (5 vwo) |
| V5 | H5 Gas en rem, 4:56 | Het kind staat veilig op de stoep. Je hart komt tot rust. Hoe? | A. alleen het sympathische deel wordt minder actief / B. het parasympathische deel wordt actiever én het sympathische minder / C. het hart heeft geen zenuwen nodig en regelt dit zelf | B | A | basis (5 vwo) |
| V6 | H6 Weten, 5:53 | In het ruggenmerg zie je grijze stof en witte stof. Wat zit er in de grijze stof? | A. de cellichamen van neuronen / B. alleen lange uitlopers / C. vooral bloedvaten | A | B | verdieping |

Alle antwoordsegmenten beginnen met “Het goede antwoord is …”. De gesproken vraag begint met “Voorspel.”.

### Checkvragen op de pagina

1. Iemand schrikt van een harde knal. Noem twee veranderingen in het lichaam die het sympathische deel veroorzaakt, en leg uit hoe het lichaam daarna weer tot rust komt.  
   *Antwoord:* Hartslag omhoog, pupil wijder, ademhaling dieper (twee van deze). Daarna wordt het parasympathische deel actiever en het sympathische minder; beide lopen naar dezelfde organen, dus de 'rem' wint.
2. Teken de reflexboog van de terugtrekreflex van de hand en geef aan waar het ruggenmerg zit. Leg uit waarom je de klap pas voelt nadat je hand al weg is.  
   *Antwoord:* Receptor in de huid → sensorisch neuron → schakelneuron in het ruggenmerg → motorisch neuron → spier (effector). Bewust voelen vraagt een extra impuls naar de hersenen; die route is langer dan de reflexboog.
3. Een leerling zegt: 'De impuls van het oog bevat licht.' Leg uit wat er niet klopt. Gebruik de begrippen prikkel, receptor en impuls.  
   *Antwoord:* Licht is de prikkel. De receptor in het netvlies zet die om in een impuls. De impuls is overal hetzelfde soort signaal; waar hij in de hersenen aankomt bepaalt dat je 'licht' ervaart.
4. Een zenuw wordt doorgesneden. Een leerling zegt dat daarmee één zenuwcel is doorgesneden. Leg uit waarom dat onjuist is.  
   *Antwoord:* Een zenuw is een bundel uitlopers van heel veel neuronen; er worden dus uitlopers van veel zenuwcellen doorgesneden.
5. Op een doorsnede van het ruggenmerg is een vlindervormig gebied donkerder. Benoem het en leg uit wat erin ligt.  
   *Antwoord:* Grijze stof: daar liggen de cellichamen van neuronen (onder andere schakel- en motorische neuronen). De witte stof eromheen bevat uitlopers met hun vettige laag.

## Begrippen

- **zenuwstelsel** — het orgaanstelsel dat informatie opneemt, verwerkt en doorgeeft: hersenen, ruggenmerg en zenuwen.
- **centraal zenuwstelsel** — hersenen en ruggenmerg samen.
- **perifeer zenuwstelsel** — alle zenuwen buiten het centrale zenuwstelsel.
- **zenuw** — een bundel van lange uitlopers van veel zenuwcellen.
- **neuron** — een zenuwcel; geleidt impulsen.
- **impuls** — het signaal dat door een neuron loopt.
- **prikkel** — een invloed van buiten (licht, geluid, druk) waarop een receptor reageert.
- **receptor** — een cel die een prikkel omzet in een impuls.
- **drempelwaarde** — de minimale prikkelsterkte waarbij een receptor een impuls afgeeft.
- **sensorisch neuron** — neuron dat impulsen van een receptor naar het centrale zenuwstelsel brengt.
- **schakelneuron** — neuron in het centrale zenuwstelsel dat impulsen doorgeeft tussen andere neuronen.
- **motorisch neuron** — neuron dat impulsen van het centrale zenuwstelsel naar een effector brengt.
- **effector** — het orgaan dat reageert: een spier of een klier.
- **reflex** — een snelle, aangeboren, altijd gelijke reactie die buiten de hersenen om via het ruggenmerg verloopt.
- **reflexboog** — de route receptor → sensorisch neuron → schakelneuron → motorisch neuron → effector.
- **animaal zenuwstelsel** — het deel dat de skeletspieren aanstuurt, vaak bewust.
- **autonoom zenuwstelsel** — het deel dat de organen regelt, onbewust.
- **sympathisch deel** — deel van het autonome zenuwstelsel dat het lichaam klaarmaakt voor actie.
- **parasympathisch deel** — deel van het autonome zenuwstelsel voor rust, vertering en herstel.
- **grijze stof** — gebied in hersenen en ruggenmerg met vooral cellichamen van neuronen.
- **witte stof** — gebied met vooral uitlopers van neuronen, wit door de vettige laag eromheen.

Geen vwo-markering: de hele film is 5 vwo.

## Docentdeel

Deze film is het overzicht van de reeks: elk later film-onderwerp komt hier al één keer voorbij. De as is tijd (één seconde), de ingang is een alledaagse ervaring. Niveau: 5 vwo, CE-stof behalve waar 'verdieping' staat.

**Per hoofdstuk**: zie “Opbouw” hierboven (Type en Kernbeeld); misconcepties per hoofdstuk:

- 1 De kaart: een zenuw is één zenuwcel
- 2 De prikkel: prikkel en impuls zijn hetzelfde; 'de impuls bevat licht'
- 3 Remmen: remmen is een reflex
- 4 De reflex: een reflex gaat via de hersenen; pijn komt vóór de beweging
- 5 Gas en rem: autonoom = alleen stress
- 6 Weten: je bent je meteen bewust van een prikkel

**Pauze- en gespreksmomenten**

Na voorspelvraag 3 (remmen is geen reflex): laat leerlingen een ander voorbeeld bedenken van een snelle, geleerde reactie. Na hoofdstuk 5: welk pedaal staat dieper tijdens een toets, tijdens slapen, na het eten? Na hoofdstuk 6: is het erg dat je lichaam 'voor je uit loopt'?

**De getallen**

| Getal | Waarde | Bron | Afronding |
|---|---|---|---|
| reactietijd op een visuele prikkel | ≈ 190 ms | [Mental chronometry (Wikipedia), Kosinski 2008](https://en.wikipedia.org/wiki/Mental_chronometry) | in de film 'ongeveer tweehonderd milliseconden'; tijdbalk 0,200 s |
| kniepeesreflex | ≈ 18 ms | [Patellar reflex (Wikipedia)](https://en.wikipedia.org/wiki/Patellar_reflex) | monosynaptisch |
| terugtrekreflex | binnen 0,5 s | [Withdrawal reflex (Wikipedia)](https://en.wikipedia.org/wiki/Withdrawal_reflex) | in de film geen getal; tijdbalk 0,25–0,30 s is een modelwaarde |
| bewustwording van een huidprikkel | ≈ 500 ms | [Benjamin Libet (Wikipedia)](https://en.wikipedia.org/wiki/Benjamin_Libet) | verdieping; de film noemt alleen de meting |
| impuls van netvlies in de hersenen | ≈ 100 ms | niet gecontroleerd (orde van grootte van de visueel opgewekte potentiaal, P100) | 'ongeveer honderd milliseconden'; graag zelf nakijken in Nectar of een handboek |
| hartslag na schrik | geen getal | — | het model toont een berekende meter, gelabeld 'model' |

**Vereenvoudigingen**

De zenuwen in de lens zijn een illustratie, niet op schaal. De spinale doorsnede en de reflexboog zijn schema's. Het hartmodel is een eerste-orde model (de hartslag loopt met een vertraging naar een doelwaarde die van beide pedalen afhangt); het zegt niets over hormonen (adrenaline) die in werkelijkheid meedoen. Het kniepeesvoorbeeld is monosynaptisch; de terugtrekreflex in de film heeft wel een schakelneuron. De oogzenuw loopt in werkelijkheid naar de thalamus en de visuele schors; de film zegt 'naar de hersenen'.

**Praktische suggesties**

Kniepeesreflex meten met een reflexhamer; reactietijd meten met de liniaalvaltest (en vergelijken met 0,2 s); hartslag meten voor en na een schrik of een korte inspanning en de twee pedalen benoemen.

**Leerdoelen**

Indeling centraal/perifeer, animaal/autonoom, sympathisch/parasympathisch (V5, C1) · weg van prikkel tot reactie (V3, C2) · reflexboog tekenen en snelheid verklaren (V4, C2) · zenuw versus neuron (V1, C4) · prikkel versus impuls en drempelwaarde (V2, C3) · sympathische en parasympathische effecten (V5, C1) · witte en grijze stof (V6, C5). V = voorspelvraag in de film, C = checkvraag op deze pagina.

## Techniek: waar zit wat in de HTML

Regelnummers gelden voor `film.src.html` (uitgepakt met `scripts/filmbron.py`; zelfde regelnummers als de film-HTML zelf, 960 regels).

- **`window.FILM_AUDIO`** (r. 500): object `{segment-id: 'data:audio/mpeg;base64,…'}`, één mp3 per gesproken segment. Koppeling id → blob: s00=002.mp3, s11=003.mp3, q1=004.mp3, a1=005.mp3, s21=006.mp3, q2=007.mp3, a2=008.mp3, q3=009.mp3, a3=010.mp3, q4=011.mp3, a4=012.mp3, s51=013.mp3, q5=014.mp3, a5=015.mp3, s61=016.mp3, q6=017.mp3, a6=018.mp3, s70=019.mp3. Blob 001.png is geen audio: de doorkijk-lichaamsillustratie in `#lens` (r. 174).
- **`window.FILM`** (r. 501, één lange JSON-regel) met drie delen:
  - `plan`: `title`, `subtitle` (worden door de speler niet gebruikt; de zichtbare titels staan als HTML in `#card-title`/`#card-end` en de `<h1>`), `chapters` (7× `{n,title,verdieping}`), `timeline` (33 items: narration/title/card/countdown/end; kaarten hebben een vaste `dur`, narration-items krijgen hun duur uit `timing`), `questions` ({q, opts[3], correct, misconception}), `cues` (`[woord, n-de keer, soort, tekst]` per segment; soorten: none, number, term).
  - `timing[<id>]`: `duration` (s), `speech` ([begin, eind] van de spraak), `phrases` (ondertitelfrasen met `t0`/`t1`), `words` (elk woord met `t0`/`t1`). Bron van de woordtijden (vermoedelijk ElevenLabs-alignment): onbekend (niet in de HTML).
  - `segments[]`: `{id, chapter, text}` — volledige tekst per segment; **niet gebruikt door de speler** (alleen documentatie).
- **Speler** (IIFE vanaf r. 505): bouwt `SEGS` uit `plan.timeline` (starttijden opgeteld; narration-duur = `timing.duration`), zet `window.FILM_SEGS` en `window.FILM_CUES` (r. 555). `FILM_CUES` is een opgeloste cuetabel met absolute tijden voor QA; de scènes lezen de cues niet, maar zoeken hun eigen ankerwoorden op met `wt(id, woord, n)` (begintijd van het n-de voorkomen van dat woord in `timing[id].words`).
- **Audio**: `AUD[id]=new Audio(FILM_AUDIO[id])` (r. 565). De klok (`tick`) volgt `audio.currentTime` tijdens een narration-segment; kaarten en aftellingen lopen op de wandklok. Aan het eind van een fragment springt de speler naar het volgende segment.
- **Scènes**: `render(T)` kiest per segment op `scene`: `sceneWorld` r. 611, `sceneLens` r. 659, `sceneMicro` r. 757, `sceneRecap` r. 846, `sceneCard` r. 857, `sceneQuestion` r. 865, `sceneReveal` r. 880, `render` r. 889, `tick` r. 908. `sceneLens` en `sceneMicro` vertakken intern met `if(id==='…')` per segment (lens: s11, a3, a4, a5; micro: a1, s21, a2, s51, a6).
- **Ondertitels**: `renderCaption` toont de lopende frase uit `timing[id].phrases` (frasen < 18 tekens worden met de volgende samengevoegd); in staande stand op de telefoon in `#capband` onder het beeld.
- **Vragen**: `sceneQuestion` toont `plan.questions[n]` tijdens het q-segment en de aftelling; opties lichten op op vaste fracties 0,30/0,55/0,80 van de duur van het q-segment. `sceneReveal` legt de vraag over het begin van het a-segment en kleurt het juiste antwoord op het woord “antwoord” (tot 3,2 s erna).
- **Modi**: Leerling (wacht na de aftelling tot er een optie getikt is), Klas (`?modus=klas`; knop “verder”), vinkje “automatisch door”. Ondertitels (C), stem aan/uit (M), volledig scherm (F, met nep-fullscreen voor iPhone). Geen havo/vwo-schakelaar.
- **Pagina onder de speler**: hoofdstuklijst (gegenereerd uit `plan.chapters`), Begrippen r. 404, Transcript r. 428, Checkvragen r. 457, Voor de docent r. 465, Credits r. 495.
- **QA**: `window.FILM_API.renderAt(T)` (r. 954) rendert deterministisch één frame.

**Ankerwoorden per segment** (woorden waarop beeld of cues getimed zijn, gevonden in de code en in `plan.cues`; mogelijk niet volledig): 

- `s00`: bal, kind, knijpen, seconde, weet
- `s11`: armen, centrale, hart, Nul, ogen, perifere, zenuwstelsel
- `q1`: —
- `a1`: binnen, buiten, bundel, impulsen, neuron, vol, volgende + “antwoord” (reveal)
- `s21`: buiten, impuls, Licht, netvlies, Onthoud, prikkel, receptoren, signaal, zet
- `q2`: —
- `a2`: drempelwaarde, druk, Elke, honderd, Kijk, Licht, Maar, oogzenuw, reageert, sensorische, trillingen, verlaat, Wat + “antwoord” (reveal)
- `q3`: —
- `a3`: beneden, geen, hersenen, knijpt, later, motorische, nieuwe, reflex, tweehonderd + “antwoord” (reveal)
- `q4`: —
- `a4`: aangeboren, achttien, bal, daarna, eens, effector, effector (2e), gevaar, klap, kniepeesreflex, motorisch, motorisch (2e), niet, Receptor, Receptoren, reflex, reflexboog, schakelneuron, schakelneuron (2e), sensorisch, sensorisch (2e), terug, vingers, wel, wél + “antwoord” (reveal)
- `s51`: autonome, Beide, dieper, diepst, gaspedaal, hart, Hoe, klam, parasympathische, pupillen, rem, sneller, sympathische, twee, wijder
- `q5`: —
- `a5`: animale, Hart, Knijpen, onbewust, skeletspieren + “antwoord” (reveal)
- `s61`: grote, halve (2e), uit
- `q6`: —
- `a6`: Animaal, Autonoom, Centraal, drie, grijze, kaart, motorisch, Perifeer, ruggenmerg, ruggenmerg (2e), schakelneuronen, Sensorisch, vettige, volgende, witte + “antwoord” (reveal)
- `s70`: bal, halve, Honderd, lichaam, Nul, route, Tweehonderd, weet

## Zo pas je deze film aan

1. **Tekst in beeld wijzigen** (labels, termen, kaarten): zoek de tekst in de SVG-lagen (`#world`, `#micro`, `#lens`) of in `#cards`; titel- en eindkaart staan als HTML in `#card-title` / `#card-end`. Vraagteksten en opties wijzig je in `plan.questions` (let op: de gesproken vraag in het q-fragment noemt de opties ook).
2. **Eén alinea opnieuw inspreken**: elk segment is een eigen mp3. Vervang alleen het blob van dat segment (zie tabel hierboven) met dezelfde naam, en vervang in `window.FILM.timing[<id>]` `duration`, `speech`, `phrases` en `words` door de nieuwe tijden (ElevenLabs met timestamps). Pas `segments[].text` en het transcript op de pagina mee aan. De andere segmenten blijven ongemoeid; de starttijden schuiven vanzelf op.
3. **Let op de ankerwoorden**: de animatie hangt aan woorden via `wt()`. Verdwijnt of verandert een ankerwoord (lijst hierboven), dan geeft `wt` 0 terug en springt dat beeldmoment naar het begin van het segment. Een a-segment moet het woord “antwoord” bevatten (reveal), en het n-de voorkomen telt (`wt(id,woord,2)`).
4. **Vraag aanpassen**: `plan.questions[n]` (`q`, `opts`, `correct` 0-gebaseerd, `misconception`); het q- en a-fragment opnieuw inspreken als de gesproken tekst niet meer klopt. De aftelling (`cdN`, 8 s) staat in `plan.timeline`.
5. **Kaarten en pauzes**: de duur van titel-, hoofdstuk- en eindkaart en de aftellingen staat als `dur` in `plan.timeline`.
6. **Inpakken**: werk in een tijdelijke map met `python3 scripts/filmbron.py uitpakken|inpakken|controleer`; zet geen uitgepakte mappen in de repo.

## Aandachtspunten

- Gesproken vragen openen met “Voorspel.”; volgens Kamiels latere uitspraakkeuze wordt dat “Wat denk je?” (films 3–6 doen dat al). Aanpassen = q1–q6 opnieuw inspreken.
- Ouder datamodel dan films 2–6: `plan.series` en `plan.next` ontbreken, er is een derde scène `lens` met een PNG-blob, en de credits hebben geen link naar de reekspagina.
- De eindkaart geeft als ondertitel van film 2 “hoe een impuls door een neuron reist”; film 2 zelf heet “hoe een zenuwcel een bericht verstuurt”.
- Docentdeel: het getal ‘≈ 100 ms netvlies → hersenen’ staat er zelf als ‘niet gecontroleerd’ bij.
- Velden die de speler niet gebruikt: `questions[].misconception`, `segments[]`, `plan.title/subtitle`. Type-letters A–I ontbreken (alleen typering in woorden). Geen havo/vwo-schakelaar (niet nodig: alleen 5 vwo).

## Wachtlijst opnieuw inspreken

- **a4 — antwoord op vraag 4 (blob 012.mp3), 15-10-2026, aanvulling na vergelijking met Gewoon Uitgelegd.** Erbij: na “Dat is de reflexboog.” de antagonistische remming (buigspier trekt samen, remmend schakelneuron remt het motorische neuron naar de strekspier); aan het eind één zin dat de hersenen een reflex kunnen afremmen (hete pan).
  - Hele segment a4 opnieuw opnemen (één mp3, blob 012.mp3), daarna `timing.a4` (`duration`, `speech`, `phrases`, `words`), `segments[].text` en het transcript bijwerken. Segment wordt ca. 20 s langer; alles na a4 schuift vanzelf op.
  - Ankerwoorden blijven staan. De nieuwe zinnen staan ná `reflexboog`/`effector` (2e) en ná `gevaar`, dus de n-de voorkomens van `schakelneuron`, `motorisch`, `niet`, `effector` veranderen niet (de nieuwe zinnen gebruiken “motorische”, geen “motorisch”/“niet”). Alleen de lensanimatie na `reflexboog` (`niet`, `daarna`, `klap`, `kniepeesreflex`) start later; dat gaat vanzelf goed via `wt()`.
- **s51 — uitleg Gas en rem (blob 013.mp3), 15-10-2026, aanvulling.** Erbij: na “…zonder dat je het merkt.” welke effectoren het autonome zenuwstelsel aanstuurt (hartspier, gladde spieren in darm en bloedvaten, klieren).
  - Hele segment s51 opnieuw opnemen (blob 013.mp3), `timing.s51`, `segments[].text` en transcript bijwerken. Ca. 10 s langer.
  - Ankerwoorden blijven staan: “klam” komt nu twee keer voor, maar `wt(id,'klam')` pakt de eerste (0:02.9); “hartspier” is niet “hart”, en “twee” komt in de nieuwe zin niet voor.
- **Beeld nodig**
  - a4: in de lens of als inzet: buigspier (biceps) licht op en verkort, strekspier (triceps) ontspant; tweede schakelneuron met een rem-symbool (−) naar het motorische neuron van de strekspier; label „antagonisten”. Bij de pan-zin: kort een pijl van de hersenen omlaag naar het motorische neuron met „remt”.
  - s51: drie kleine pictogrammen/labels op het woord: „hartspier”, „gladde spieren (darm, bloedvaten)”, „klieren (zweetklier)”.
- **Risicowoorden (uitspraaktest)**
  - *antagonisten* — IPA [ɑntaxoˈnɪstə(n)], klemtoon op „nis” (woorden.org via [encyclo.nl](https://www.encyclo.nl/begrip/antagonist): [ɑntaxo'nɪst], an·ta·go·nist). Stem-invoer: eerst „antagonisten” zoals geschreven; klinkt de klemtoon verkeerd, dan „anta-go-nisten”.
  - *effectoren* — klemtoon op „to” [ɛfɛkˈtoːrə(n)] (meervoud volgens [encyclo.nl](https://www.encyclo.nl/begrip/effector); IPA niet online gevonden, afgeleid van „effector” + -oren zoals motor/motoren). Stem-invoer: „effectoren”; fout? dan „effec-tooren”.
  - *gladde spieren, buigspier, strekspier, hartspier, remmend* — gewone Nederlandse woorden, laag risico; als geschreven.

## Wijzigingen
- 15 okt 2026 — Speler: de knop Vragen aan/uit (onthouden in `bk-vragen`, ook `?vragen=uit`) werkt nu altijd, ook na spoelen, in pauze en als je hem halverwege omzet. Bij Vragen uit vallen weg: de vraag zelf, de gesproken vraagzin(nen) ervoor (zinnen op '?', 'Wat denk je?', 'Denk even na.', 'Eerst een voorspelling.') en een los antwoord direct erna ('Antwoord B.', 'Ja.', 'Nee.', 'Precies.'); gewone uitlegzinnen blijven staan. De tijdbalk, tijd en hoofdstuktijden tonen de ingekorte duur. Code: `bkBouw()` maakt `BK.k` (stukken die de speler overslaat); regelnummers in de spelercode zijn daardoor een paar regels verschoven. Hoofdstukkaart 2,2 s in plaats van 3,0 s (duur van de `card`-stukken in `SEGS`).

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

Helper `callout()` (lens/kaart): de lijn en stip in `#co1–3` worden verborgen, de naam + toelichting staan direct naast het punt (standaard 22 px rechts, met donkere rand; per aanroep aan te passen met `pos=[dx,dy,anker]`, gebruikt bij 'receptoren in je huid' en 'effector'). In de samenvattende tijdlijn (hoofdstuk 6) zijn de grijze lijntjes van de stippen naar '0 s', '0,1 s', … weg; de teksten staan direct boven/onder hun stip (Kamiel: "die lijntjes naar begrippen moeten sowieso weg"; zie `films/BEELDAFSPRAKEN.md`). Gecontroleerd op contactbladen. Regelnummers elders in dit bestand kunnen een paar regels verschoven zijn.

## Wijziging 16 okt 2026: begrippen als kaartjesraster
Het begrippenblok ziet er nu uit als in de hoofdengine (bv. `films/cellen/van-molecuul-tot-biosfeer.html`): onder de kop "Begrippen" een `<div id="glossary">` met per begrip een kaartje `<div class="term"><b>begrip</b><p>uitleg</p></div>` (raster `repeat(auto-fill,minmax(260px,1fr))`). Volgorde en tekst van de begrippen zijn ongewijzigd; extra kolommen (bron, hoofdstuknummer) staan klein onder de uitleg in `<p class="gl-meta">`. De opmaak staat in `<style id="glossary-stijl">` vlak voor `</head>` (kleuren via de variabelen van deze pagina). Nieuw begrip: voeg een kaartje toe in `#glossary`. Omgezet met een script; regelnummers verderop in dit bestand kunnen enkele regels verschoven zijn.
