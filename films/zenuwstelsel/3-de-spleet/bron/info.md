# De spleet — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/zenuwstelsel/3-de-spleet.html |
| Reeks / nummer | Zenuwstelsel, film 3 (pagina: “hoe het bericht van cel naar cel springt · 5 vwo · film 3 van de reeks Zenuwstelsel”; `plan.series`: “Het zenuwstelsel · film 3 van 6”) |
| Doelgroep / niveau | 5 vwo, één niveau (geen havo/vwo-schakelaar) |
| Versie / datum | 1.0 · 4 oktober 2026 (credits op de pagina) |
| Stem / model | Roos (ElevenLabs, eleven_multilingual_v2) |
| Duur | 5:05 gesproken (som van 13 mp3’s, 305,4 s); speler-totaal incl. titel-, hoofdstuk- en eindkaarten en 5 aftellingen van 8 s: 6:15 |
| Beeldstijl | Eigen reeksontwerp van vóór de Part C-stijlkaart: warme vlakke ‘wereld’ (straat met bakker, dezelfde fietser als film 1, geurspoor met lens naar neus en hersenen) en lichte schema-scènes met de synaps als dwarsdoorsnede (eindknopje met blaasjes, spleet, receptoren), deeltjes, voltmeter en optelbalk; Inter-systeemfont |
| Audio-opslag | 13 fragmenten, één per gesproken segment, als base64-data-URI in `window.FILM_AUDIO` (blobs 001–013) |
| Reconstructie | 2026-10-12, uit de gepubliceerde HTML |

## Opbouw

| Begin | Hoofdstuk | Segmenten | Type (docentdeel) | Kernbeeld (docentdeel) |
|---|---|---|---|---|
| 0:00 | Cold open | s00 | — | wereld: straat met bakker, geur van vers brood; lens volgt de keten neus → zenuwcellen → hersenen met zichtbare spleten |
| 0:20 | 1 De aansluiting | q1, a1 | structuur en functie | synaps als dwarsdoorsnede: eindknopje met blaasjes, spleet met maatlijn, volgende cel met receptoren |
| 1:21 | 2 Oversteken | s21, q2, a2 | proces in tijd | impuls stopt, Ca²⁺ in, blaasje versmelt, deeltjes steken over, receptoren bezet, kanalen open, nieuwe impuls; tijdbalk 0–1 ms |
| 2:36 | 3 Gas en rem | q3, a3 | mechanisme | één cel met een + en een − synaps, voltmeter en optelbalk naar de drempel |
| 3:45 | 4 Opruimen | q4, a4 | regulatie | enzym, heropname, wegdrijven als drie kaarten; de spleet weer schoon |
| 4:46 | 5 Eenrichtingsverkeer | q5, a5 | structuur en functie | blaasjes alleen vóór, receptoren alleen ná; neuromusculaire synaps met spiervezel |
| 5:38 | 6 Samenvatting | s70 | — | samenvattingskaart (`#m-recap`) over de gedimde wereld, tien items op ankerwoorden |

Begintijden = begin van de hoofdstukkaart in de speler, zonder wachttijd bij de vragen (zoals in de hoofdstuklijst op de pagina). Type-letters A–I uit de prompt staan niet in de HTML; de typering hierboven is die uit de tabel “Per hoofdstuk” in het docentdeel.

## Vragen

### Voorspelvragen in de film (`plan.questions`)

| Nr | Plek | Vraag | Opties | Juist | Misconceptie-optie | Niveau |
|---|---|---|---|---|---|---|
| V1 | H1 De aansluiting, 0:23 | Twee zenuwcellen geven een bericht door. Hoe zitten ze aan elkaar? | A. Aan elkaar vastgegroeid, als één lange draad / B. Ze raken elkaar aan, membraan tegen membraan / C. Er zit een smalle spleet tussen | C | A | basis (5 vwo) |
| V2 | H2 Oversteken, 2:05 | Wat gaat er precies door de spleet? | A. De impuls zelf, als een vonkje / B. Natriumionen uit de eerste cel / C. Moleculen neurotransmitter | C | A | basis (5 vwo) |
| V3 | H3 Gas en rem, 2:39 | Kan een synaps een zenuwcel ook stiller maken? | A. Nee, een synaps geeft altijd een bericht door / B. Ja, dat hangt af van neurotransmitter en receptor / C. Alleen als er heel veel stof tegelijk komt | B | A | basis (5 vwo) |
| V4 | H4 Opruimen, 3:48 | De neurotransmitter blijft in de spleet hangen, aan de receptoren. Wat gebeurt er met de volgende cel? | A. Die blijft impulsen afvuren / B. Die reageert één keer en dan is het klaar / C. Die raakt beschadigd | A | B | basis (5 vwo) |
| V5 | H5 Eenrichtingsverkeer, 4:49 | Kan een bericht via een synaps ook terug, van de tweede cel naar de eerste? | A. Ja, een synaps werkt in twee richtingen / B. Nee, alleen als de spleet heel smal is / C. Nee, nooit | C | A | basis (5 vwo) |

Alle antwoordsegmenten beginnen met “Het goede antwoord is …”. De gesproken vraag begint met “Wat denk je?”.

### Checkvragen op de pagina

1. Teken een synaps en benoem: eindknopje, blaasje met neurotransmitter, synapsspleet, receptor, membraan van de volgende cel. Geef met een pijl de richting van het bericht aan.  
   *Antwoord:* Eindknopje links met blaasjes, spleet, rechts het membraan van de volgende cel met receptoren en ionkanalen; de pijl loopt van eindknopje naar volgende cel.
2. Zet in de juiste volgorde: neurotransmitter bindt aan receptor · impuls komt aan in het eindknopje · blaasjes versmelten met het membraan · calcium stroomt naar binnen · ionkanalen gaan open · nieuwe impuls in de volgende cel.  
   *Antwoord:* Impuls komt aan → calcium stroomt naar binnen → blaasjes versmelten → neurotransmitter bindt aan receptor → ionkanalen gaan open → nieuwe impuls (als de drempel wordt gehaald).
3. Op een zenuwcel komen drie exciterende en twee remmende synapsen tegelijk in actie. Leg uit of er een impuls vertrekt, en waar in de cel dat wordt bepaald.  
   *Antwoord:* Dat hangt af van de som: drie keer dichter bij de drempel, twee keer verder weg. Alleen als de som bij het begin van het axon de drempel (−55 mV) haalt, vertrekt een impuls; het aantal zegt niet alles, de grootte van elke bijdrage telt mee.
4. Een insecticide remt acetylcholinesterase. Voorspel wat er gebeurt in de synaps tussen een motorisch neuron en een spier, en wat je daarvan ziet aan de spier.  
   *Antwoord:* Acetylcholine wordt niet afgebroken en blijft aan de receptoren; de kanalen blijven open en de spiervezel blijft geprikkeld: aanhoudende samentrekking (kramp), uiteindelijk uitputting.
5. Een leerling zegt: 'Als de spleet maar smal genoeg is, springt de impuls er gewoon overheen.' Leg uit wat er niet klopt, met de woorden elektrisch en chemisch.  
   *Antwoord:* De impuls (elektrisch) stopt bij het eindknopje. Over de spleet gaat een stof (chemisch): de neurotransmitter. Pas aan de overkant ontstaat weer een impuls als de receptoren genoeg kanalen openen.

## Begrippen

- **synaps** — de aansluiting tussen een eindknopje en de volgende cel: eindknopje, synapsspleet en het membraan met receptoren.
- **eindknopje** — het uiteinde van een axon; de kant vóór de spleet (presynaptisch).
- **synapsspleet** — de smalle ruimte (ongeveer 20 nm) tussen eindknopje en volgende cel.
- **postsynaptisch membraan** — het membraan van de ontvangende cel, met de receptoren.
- **presynaptisch** — aan de kant van het eindknopje; postsynaptisch is de kant van de ontvangende cel.
- **blaasje (synapsblaasje)** — membraanbolletje in het eindknopje, gevuld met neurotransmitter.
- **neurotransmitter** — stof die het bericht over de spleet brengt, bijvoorbeeld acetylcholine.
- **receptor (op een membraan)** — eiwit waar een neurotransmitter precies in past; bij binding gaat een ionkanaal open.
- **calciumkanaal** — kanaal in het eindknopje dat opengaat als de impuls aankomt; Ca²⁺ stroomt in en geeft het sein aan de blaasjes.
- **exocytose** — het versmelten van een blaasje met het membraan, waardoor de inhoud naar buiten komt.
- **exciterende synaps** — synaps die de volgende cel dichter bij de drempel brengt (bijvoorbeeld Na⁺ naar binnen).
- **remmende synaps** — synaps die de volgende cel verder van de drempel brengt (bijvoorbeeld Cl⁻ naar binnen).
- **sommatie** — het optellen van alle exciterende en remmende invloeden op één cel; bepaalt of de drempel wordt gehaald.
- **acetylcholine** — neurotransmitter, onder andere tussen motorische neuronen en spieren.
- **acetylcholinesterase** — enzym in de spleet dat acetylcholine afbreekt.
- **heropname** — het terugpompen van neurotransmitter in het eindknopje.
- **neuromusculaire synaps** — de synaps tussen een motorisch neuron en een spiervezel.
- **spiervezel** — een spiercel; trekt samen als genoeg receptoren bezet zijn.

Geen vwo-markering: de hele film is 5 vwo.

## Docentdeel

Film 3 gaat over de synaps als chemische schakel: bouw, overdracht, exciterend en remmend met sommatie, opruimen en eenrichtingsverkeer. De rode draad is de geur van vers brood. Niveau: 5 vwo, CE-stof. Psychoactieve stoffen en medicijnen komen in film 4; hoofdstuk 4 eindigt met één haakzin daarnaartoe.

**Per hoofdstuk**: zie “Opbouw” hierboven (Type en Kernbeeld); misconcepties per hoofdstuk:

- 1 De aansluiting: neuronen zitten aan elkaar vast
- 2 Oversteken: de impuls springt over als een vonk
- 3 Gas en rem: een synaps geeft het bericht altijd door
- 4 Opruimen: na binding is het klaar
- 5 Eenrichtingsverkeer: een synaps werkt in twee richtingen

**Pauze- en gespreksmomenten**

Na V2: laat leerlingen in eigen woorden "elektrisch, chemisch, elektrisch" navertellen. Na hoofdstuk 3: waarom zou een vaste draad slechter zijn dan een synaps? Na hoofdstuk 4: wat gebeurt er als het opruimen wordt geremd (bruggetje naar film 4 en naar insecticiden, checkvraag 4). Bij de haakzin aan het eind van hoofdstuk 4: medicijnen en drugs grijpen op deze stappen in; houd dat mechanistisch en zonder oordeel, en zeg zo nodig dat hoe een stof werkt iets anders is dan waardoor een aandoening ontstaat.

**De getallen**

| Getal | Waarde | Bron | In de film |
|---|---|---|---|
| breedte synapsspleet | ≈ 20 nm | [Chemical synapse (Wikipedia)](https://en.wikipedia.org/wiki/Chemical_synapse) | "wel vijftigduizend naast elkaar in een millimeter"; maatlijn ≈ 20 nm |
| duur van de overdracht | enkele honderden microseconden | idem | "minder dan een duizendste seconde"; tijdbalk 0–1 ms |
| synapsen per neuron | enkele duizenden | idem | "vaak duizenden van zulke aansluitingen" |
| moleculen per blaasje (acetylcholine) | ≈ 1.000–2.000 | [Synaptic vesicle (Wikipedia)](https://en.wikipedia.org/wiki/Synaptic_vesicle) | "duizenden moleculen" (meerdere blaasjes per impuls) |
| snelheid acetylcholinesterase | ≈ 5.000 moleculen per seconde per enzym | [Acetylcholinesterase (Wikipedia)](https://en.wikipedia.org/wiki/Acetylcholinesterase) | niet genoemd; "binnen een paar duizendste seconde weer schoon" |
| rustpotentiaal / drempel | −70 mV / −55 mV | film 2 | voltmeter in hoofdstuk 3; de uitslagen (−60, −76) zijn modelwaarden |

**Vereenvoudigingen**

De deeltjes in de spleet zijn een illustratie (22 driehoekjes, niet duizenden moleculen) en bewegen volgens een eenvoudige berekende drift. Remming is getekend als Cl⁻ naar binnen (zoals bij GABA-A-receptoren); K⁺ naar buiten komt ook voor. De voltmeteruitslagen bij één synaps zijn in werkelijkheid veel kleiner (enkele mV); de film vergroot ze om het principe te laten zien. De synapsen in hoofdstuk 3 zitten op het cellichaam; in werkelijkheid vooral op dendrieten. Elektrische synapsen (gap junctions) blijven buiten beschouwing.

**Leerdoelen**

Bouw van de synaps (V1, C1) · stappen van de overdracht (V2, C2) · exciterend, remmend en sommatie (V3, C3) · opruimen: enzym, heropname, diffusie (V4, C4) · eenrichtingsverkeer en de neuromusculaire synaps (V5, C5) · acetylcholine en acetylcholinesterase (C4). V = voorspelvraag in de film, C = checkvraag op deze pagina.

## Techniek: waar zit wat in de HTML

Regelnummers gelden voor `film.src.html` (uitgepakt met `scripts/filmbron.py`; zelfde regelnummers als de film-HTML zelf, 825 regels).

- **`window.FILM_AUDIO`** (r. 423): object `{segment-id: 'data:audio/mpeg;base64,…'}`, één mp3 per gesproken segment. Koppeling id → blob: s00=001.mp3, q1=002.mp3, a1=003.mp3, s21=004.mp3, q2=005.mp3, a2=006.mp3, q3=007.mp3, a3=008.mp3, q4=009.mp3, a4=010.mp3, q5=011.mp3, a5=012.mp3, s70=013.mp3.
- **`window.FILM`** (r. 426, één lange JSON-regel) met drie delen:
  - `plan`: `title`, `subtitle`, `series`, `next` (worden door de speler niet gebruikt; de zichtbare titels staan als HTML in `#card-title`/`#card-end` en de `<h1>`), `chapters` (6× `{n,title,verdieping}`), `timeline` (26 items: narration/title/card/countdown/end; kaarten hebben een vaste `dur`, narration-items krijgen hun duur uit `timing`), `questions` ({q, opts[3], correct, misconception}), `cues` (`[woord, n-de keer, soort, tekst]` per segment; soorten: beat, number, recap, term).
  - `timing[<id>]`: `duration` (s), `speech` ([begin, eind] van de spraak), `phrases` (ondertitelfrasen met `t0`/`t1`), `words` (elk woord met `t0`/`t1`). Bron van de woordtijden (vermoedelijk ElevenLabs-alignment): onbekend (niet in de HTML).
  - `segments[]`: `{id, chapter, text}` — volledige tekst per segment; **niet gebruikt door de speler** (alleen documentatie).
- **Speler** (IIFE vanaf r. 430): bouwt `SEGS` uit `plan.timeline` (starttijden opgeteld; narration-duur = `timing.duration`), zet `window.FILM_SEGS` en `window.FILM_CUES` (r. 480). `FILM_CUES` is een opgeloste cuetabel met absolute tijden voor QA; de scènes lezen de cues niet, maar zoeken hun eigen ankerwoorden op met `wt(id, woord, n)` (begintijd van het n-de voorkomen van dat woord in `timing[id].words`).
- **Audio**: `AUD[id]=new Audio(FILM_AUDIO[id])` (r. 490). De klok (`tick`) volgt `audio.currentTime` tijdens een narration-segment; kaarten en aftellingen lopen op de wandklok. Aan het eind van een fragment springt de speler naar het volgende segment.
- **Scènes**: `render(T)` kiest per segment op `scene`: `sceneWorld` r. 596, `sceneMicro` r. 610, `sceneRecap` r. 714, `sceneCard` r. 723, `sceneQuestion` r. 731, `sceneReveal` r. 746, `render` r. 755, `tick` r. 773. `sceneMicro` verdeelt per segment: a1→microBouw, s21→microOver, a2→microA2, a3→microSum, a4→microOpruim, a5→microRichting.
- **Ondertitels**: `renderCaption` toont de lopende frase uit `timing[id].phrases` (frasen < 18 tekens worden met de volgende samengevoegd); in staande stand op de telefoon in `#capband` onder het beeld.
- **Vragen**: `sceneQuestion` toont `plan.questions[n]` tijdens het q-segment en de aftelling; opties lichten op op vaste fracties 0,30/0,55/0,80 van de duur van het q-segment. `sceneReveal` legt de vraag over het begin van het a-segment en kleurt het juiste antwoord op het woord “antwoord” (tot 3,2 s erna).
- **Modi**: Leerling (wacht na de aftelling tot er een optie getikt is), Klas (`?modus=klas`; knop “verder”), vinkje “automatisch door”. Ondertitels (C), stem aan/uit (M), volledig scherm (F, met nep-fullscreen voor iPhone). Geen havo/vwo-schakelaar.
- **Pagina onder de speler**: hoofdstuklijst (gegenereerd uit `plan.chapters`), Begrippen r. 339, Transcript r. 360, Checkvragen r. 383, Voor de docent r. 391, Credits r. 418.
- **QA**: `window.FILM_API.renderAt(T)` (r. 819) rendert deterministisch één frame.

**Ankerwoorden per segment** (woorden waarop beeld of cues getimed zijn, gevonden in de code en in `plan.cues`; mogelijk niet volledig): 

- `s00`: bakker, bericht, daaroverheen, geur, hersenen, Hoe, neus, spleet
- `q1`: —
- `a1`: blaasjes, dendriet, drie, eindknopje, neurotransmitter, receptoren, spleet, synaps, vijftigduizend, zoomen + “antwoord” (reveal)
- `s21`: blaasjes, calcium, duizendste, impuls, impuls (2e), Ionen, kanaaltje, receptoren, steken, stof, stopt, versmelten
- `q2`: —
- `a2`: antwoord, Elektrisch, oversteekt, Pas, stopt + “antwoord” (reveal)
- `q3`: —
- `a3`: chloridekanalen, drempel, duizenden, exciterend, natriumkanalen, niet, opgeteld, remmend, spleet, twee, vertrekt + “antwoord” (reveal)
- `q4`: —
- `a4`: acetylcholinesterase, bezet, Drie, Drie (2e), Eén, heropname, medicijnen, schoon, Twee + “antwoord” (reveal)
- `q5`: —
- `a5`: acetylcholine, Blaasjes, Nooit, Receptoren, samen, spieren + “antwoord” (reveal)
- `s70`: bezet, brood (2e), Calcium, Elektrisch, Enzym, impuls, kant, niet, receptor, spleet

## Zo pas je deze film aan

1. **Tekst in beeld wijzigen** (labels, termen, kaarten): zoek de tekst in de SVG-lagen (`#world`, `#micro`) of in `#cards`; titel- en eindkaart staan als HTML in `#card-title` / `#card-end`. Vraagteksten en opties wijzig je in `plan.questions` (let op: de gesproken vraag in het q-fragment noemt de opties ook).
2. **Eén alinea opnieuw inspreken**: elk segment is een eigen mp3. Vervang alleen het blob van dat segment (zie tabel hierboven) met dezelfde naam, en vervang in `window.FILM.timing[<id>]` `duration`, `speech`, `phrases` en `words` door de nieuwe tijden (ElevenLabs met timestamps). Pas `segments[].text` en het transcript op de pagina mee aan. De andere segmenten blijven ongemoeid; de starttijden schuiven vanzelf op.
3. **Let op de ankerwoorden**: de animatie hangt aan woorden via `wt()`. Verdwijnt of verandert een ankerwoord (lijst hierboven), dan geeft `wt` 0 terug en springt dat beeldmoment naar het begin van het segment. Een a-segment moet het woord “antwoord” bevatten (reveal), en het n-de voorkomen telt (`wt(id,woord,2)`).
4. **Vraag aanpassen**: `plan.questions[n]` (`q`, `opts`, `correct` 0-gebaseerd, `misconception`); het q- en a-fragment opnieuw inspreken als de gesproken tekst niet meer klopt. De aftelling (`cdN`, 8 s) staat in `plan.timeline`.
5. **Kaarten en pauzes**: de duur van titel-, hoofdstuk- en eindkaart en de aftellingen staat als `dur` in `plan.timeline`.
6. **Inpakken**: werk in een tijdelijke map met `python3 scripts/filmbron.py uitpakken|inpakken|controleer`; zet geen uitgepakte mappen in de repo.

## Aandachtspunten

- Credits linken naar `reeks.html`, dat niet in de repo staat (dode link).
- `plan.series` zegt “film 3 van 6” (reeks telt inmiddels 7); niet zichtbaar.
- Hoofdstuk 3 heet “Gas en rem”, net als hoofdstuk 5 van film 1 (daar autonoom zenuwstelsel, hier exciterend/remmend); mogelijk verwarrend in de reeks.
- Velden die de speler niet gebruikt: `questions[].misconception`, `segments[]`, `plan.series/next`.
