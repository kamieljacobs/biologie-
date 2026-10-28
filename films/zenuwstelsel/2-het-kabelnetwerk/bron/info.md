# Het kabelnetwerk — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/zenuwstelsel/2-het-kabelnetwerk.html |
| Reeks / nummer | Zenuwstelsel, film 2 (pagina: “hoe een zenuwcel een bericht verstuurt · 5 vwo · film 2 van de reeks Zenuwstelsel”; `plan.series`: “Het zenuwstelsel · film 2 van 6”) |
| Doelgroep / niveau | 5 vwo, één niveau (geen havo/vwo-schakelaar) |
| Versie / datum | **1.1 · 28 oktober 2026** — opwaardering naar prompt v13 (B14, zonder keuring): gebogen membraan, nuance bij de adequate prikkel; 1.0 · 4 oktober 2026 (credits op de pagina) |
| Prompt | v13 |
| Voldoet aan | prompt v13 (28 okt 2026, zonder keuring; takes, script, vragen, timings en speler behouden). Bewust niet: (1) de film blijft in het eigen lichte reeksontwerp van vóór Part C (lichte schema-scènes, Inter, eigen ionkleuren oranje/blauw); omzetten naar donker navy met de beeldbank is een nieuwe stijl → vraag aan Kamiel; (2) het neuron in a1 blijft de eigen vlakke tekening (geen `zenuwcel` uit de beeldbank: die is voor de donkere motor gemaakt); (3) de cold open toont alleen een been met blote voet tegen de tafelpoot, geen heel castpersonage (close-up van een lichaamsdeel, geen grijs poppetje; vervangen = andere aanpak van de scène → vraag); (4) de gesproken optie 'Alleen op druk?' in q5 blijft (opgelost in beeld, zie Wijzigingen); (5) 'Voorspel.' in de gesproken vragen blijft (geen nieuwe opnames) |
| Stem / model | Roos (ElevenLabs, eleven_multilingual_v2) |
| Duur | 5:10 gesproken (som van 14 mp3’s, 310,2 s); speler-totaal incl. titel-, hoofdstuk- en eindkaarten en 5 aftellingen van 8 s: 6:20 |
| Beeldstijl | Eigen reeksontwerp van vóór de Part C-stijlkaart: warme vlakke ‘wereld’ (keuken ’s nachts, been tegen de tafelpoot) en lichte schema-scènes (#EEF1F7) met vectortekeningen en berekende simulaties (ionenbeweging, voltmeter, actiepotentiaal-grafiek, race); Inter-systeemfont |
| Audio-opslag | 14 fragmenten, één per gesproken segment, als base64-data-URI in `window.FILM_AUDIO` (blobs 001–014) |
| Reconstructie | 2026-10-12, uit de gepubliceerde HTML |

## Opbouw

| Begin | Hoofdstuk | Segmenten | Type (docentdeel) | Kernbeeld (docentdeel) |
|---|---|---|---|---|
| 0:00 | Cold open | s00 | — | wereld: keuken ’s nachts, teen tegen de tafelpoot; ‘twee berichten’ met verschillende aankomsttijd |
| 0:16 | 1 De zenuwcel | q1, a1 | structuur en functie | lens op het been, zenuwbundel, één uitloper gevolgd tot het neuron; onderdelen verschijnen op het woord |
| 1:14 | 2 Rust | s21, q2, a2 | mechanisme (dynamisch evenwicht) | membraandoorsnede met pomp en lekkanaal, berekende ionenbeweging, voltmeter naar −70 mV |
| 2:21 | 3 De impuls | s31, q3, a3 | proces in tijd | poorten openen en sluiten terwijl de grafiek live meeloopt (vertraagd, 1 ms ≈ 10 s); lopende golf met refractaire zone |
| 3:45 | 4 Snel en langzaam | q4, a4 | vergelijking | race van twee axonen; been met twee vezels op een tijdbalk van 1 s |
| 4:53 | 5 Van prikkel naar impuls | q5, a5 | mechanisme | drukreceptor met vinger: vervorming, poorten, drempel, frequentie |
| 5:45 | 6 Samenvatting | s70 | — | samenvattingskaart (`#m-recap`) over de gedimde wereld, items verschijnen op ankerwoorden |

Begintijden = begin van de hoofdstukkaart in de speler, zonder wachttijd bij de vragen (zoals in de hoofdstuklijst op de pagina). Type-letters A–I uit de prompt staan niet in de HTML; de typering hierboven is die uit de tabel “Per hoofdstuk” in het docentdeel.

## Vragen

### Voorspelvragen in de film (`plan.questions`)

| Nr | Plek | Vraag | Opties | Juist | Misconceptie-optie | Niveau |
|---|---|---|---|---|---|---|
| V1 | H1 De zenuwcel, 0:19 | Waar begint een impuls in een neuron, en welke kant gaat hij op? | A. Bij de dendrieten, richting de eindknopjes / B. Bij de eindknopjes, richting het cellichaam / C. Overal tegelijk, beide kanten op | A | C | basis (5 vwo) |
| V2 | H2 Rust, 1:49 | Een gif legt de natrium-kaliumpomp stil. Wat gebeurt er op den duur met het rustpotentiaal? | A. Het verschil wordt langzaam kleiner / B. Het verschil wordt groter / C. Er verandert niets | A | C | basis (5 vwo) |
| V3 | H3 De impuls, 3:11 | Je drukt harder op je huid. Wat verandert er aan de impulsen? | A. Ze worden groter / B. Er komen er meer per seconde / C. Ze worden langer | B | A | basis (5 vwo) |
| V4 | H4 Snel en langzaam, 3:48 | Twee even lange axonen: dik met myeline, dun zonder myeline. Welke impuls komt het eerst aan? | A. De dikke met myeline / B. De dunne zonder myeline / C. Ze komen tegelijk aan | A | C | basis (5 vwo) |
| V5 | H5 Van prikkel naar impuls, 4:56 | Een drukreceptor in je huid. Waar reageert hij het makkelijkst op? | A. Alleen op druk / B. Op druk en op licht / C. Op elke prikkel, als die maar sterk genoeg is | A | C | basis (5 vwo) |

Alle antwoordsegmenten beginnen met “Het goede antwoord is …”. De gesproken vraag begint met “Voorspel.”.

### Checkvragen op de pagina

1. Teken een neuron en zet er de namen bij. Geef met een pijl aan waar een impuls begint en waarheen hij loopt.  
   *Antwoord:* Dendrieten → cellichaam (met kern) → axon (met myelineschede, cellen van Schwann, insnoeringen) → eindknopjes. De pijl loopt van dendrieten naar eindknopjes.
2. Leg uit hoe het rustpotentiaal van −70 mV ontstaat. Gebruik de begrippen natrium-kaliumpomp, kaliumlekkanaal en ATP.  
   *Antwoord:* De pomp brengt met ATP 3 Na⁺ naar buiten en 2 K⁺ naar binnen. Door de lekkanalen lekt K⁺ naar buiten. Daardoor verlaat positieve lading de cel en is de binnenkant negatief ten opzichte van buiten.
3. Zet de stappen van een actiepotentiaal in de juiste volgorde en noem bij elke stap welk ion beweegt en welke kant op: drempelwaarde, depolarisatie, repolarisatie, hyperpolarisatie.  
   *Antwoord:* Prikkel tot −55 mV (drempelwaarde) → natriumkanalen open, Na⁺ naar binnen (depolarisatie, tot boven 0) → natriumkanalen dicht, kaliumkanalen open, K⁺ naar buiten (repolarisatie) → doorschieten onder −70 mV (hyperpolarisatie) → pomp herstelt de rust.
4. Een leerling zegt: 'Bij een hardere prikkel wordt de impuls groter.' Leg uit wat er niet klopt.  
   *Antwoord:* Alles-of-niets: een actiepotentiaal is altijd even groot. Een sterkere prikkel geeft meer impulsen per seconde (hogere frequentie), niet grotere impulsen.
5. Bij een zenuwziekte verdwijnt de myelineschede om axonen. Voorspel wat er met de geleidingssnelheid gebeurt en leg uit waarom.  
   *Antwoord:* De snelheid daalt sterk: zonder myeline geen sprongsgewijze geleiding, elk stukje membraan moet het volgende prikkelen (stap voor stap, ongeveer 1 m/s in plaats van tientallen m/s).

## Begrippen

- **neuron** — een zenuwcel: dendrieten, cellichaam, axon en eindknopjes.
- **dendriet** — korte uitloper van een neuron waar informatie binnenkomt.
- **cellichaam** — deel van het neuron met de kern.
- **axon** — lange uitloper die de impuls van het cellichaam naar de eindknopjes geleidt.
- **eindknopjes** — uiteinden van het axon; hier gaat het bericht naar de volgende cel (film 3).
- **myelineschede** — vettige isolatielaag om het axon, gemaakt door cellen van Schwann.
- **insnoering** — smalle plek tussen twee cellen van Schwann waar het axon bloot ligt.
- **membraanpotentiaal** — het elektrische verschil tussen binnen- en buitenkant van het membraan.
- **rustpotentiaal** — het membraanpotentiaal van een neuron in rust: binnen ongeveer −70 mV ten opzichte van buiten.
- **natrium-kaliumpomp** — eiwit dat met energie uit ATP per slag drie Na⁺ naar buiten en twee K⁺ naar binnen pompt.
- **kaliumlekkanaal** — kanaal dat altijd openstaat voor K⁺, waardoor kalium naar buiten lekt.
- **drempelwaarde** — de waarde (ongeveer −55 mV) waarbij natriumkanalen openschieten en een actiepotentiaal start.
- **depolarisatie** — het membraan wordt minder negatief en zelfs positief: Na⁺ stroomt naar binnen.
- **repolarisatie** — het membraan wordt weer negatief: K⁺ stroomt naar buiten.
- **hyperpolarisatie** — kort doorschieten tot onder het rustpotentiaal.
- **actiepotentiaal** — de snelle omkering van het membraanpotentiaal die als impuls over het axon loopt.
- **impuls** — een actiepotentiaal die over het axon loopt.
- **refractaire periode** — korte tijd na een actiepotentiaal waarin een stukje membraan niet opnieuw prikkelbaar is.
- **alles-of-niets** — een actiepotentiaal komt helemaal of niet; hij heeft altijd dezelfde grootte.
- **frequentie** — aantal impulsen per seconde; hierin zit de sterkte van de prikkel.
- **sprongsgewijze geleiding** — de impuls springt van insnoering naar insnoering; veel sneller dan stap voor stap.
- **receptor** — cel die een prikkel vertaalt naar impulsen.
- **adequate prikkel** — de soort prikkel waar een receptor het makkelijkst op reageert (druk voor de huid, licht voor het oog).

Geen vwo-markering: de hele film is 5 vwo.

## Docentdeel

Film 2 gaat van de bouw van het neuron naar het mechanisme: rustpotentiaal, actiepotentiaal, geleidingssnelheid en de receptor. De rode draad is de teen tegen de tafelpoot: één klap, twee berichten met een verschillende aankomsttijd. Niveau: 5 vwo, CE-stof.

**Per hoofdstuk**: zie “Opbouw” hierboven (Type en Kernbeeld); misconcepties per hoofdstuk:

- 1 De zenuwcel: een impuls kan twee kanten op
- 2 Rust: de pomp is alleen nodig om op te starten
- 3 De impuls: hardere prikkel = grotere impuls
- 4 Snel en langzaam: dun en dik zijn even snel; myeline doet er niet toe
- 5 Van prikkel naar impuls: een receptor reageert op elke prikkel die sterk genoeg is

**Pauze- en gespreksmomenten**

Na V2 (pomp stil): waar in het dagelijks leven zie je nog meer 'opladen tegen een lek in'? Na hoofdstuk 3: waarom kan de impuls niet terug? Laat leerlingen de refractaire periode in eigen woorden navertellen. Na hoofdstuk 4: wat merk je als de myeline verdwijnt (MS)? Na hoofdstuk 5: welke receptor bij welk zintuig, en wat is de adequate prikkel?

**De getallen**

| Getal | Waarde | Bron | Afronding in de film |
|---|---|---|---|
| rustpotentiaal neuron | ≈ −70 mV | [Resting potential (Wikipedia)](https://en.wikipedia.org/wiki/Resting_potential) | 'ongeveer min zeventig millivolt' |
| drempelwaarde | ≈ −55 mV | [Action potential (Wikipedia)](https://en.wikipedia.org/wiki/Action_potential) | 'ongeveer min vijfenvijftig millivolt' |
| piek actiepotentiaal | ≈ +30 à +40 mV | idem | 'tot boven nul'; grafiek piekt op +30 |
| duur actiepotentiaal | ≈ 1–2 ms | idem | 'een paar duizendste seconde' |
| pomp | 3 Na⁺ uit, 2 K⁺ in per ATP | [Na⁺/K⁺-ATPase (Wikipedia)](https://en.wikipedia.org/wiki/Sodium%E2%80%93potassium_pump) | exact |
| geleiding zonder myeline (dunne C-vezel) | ≈ 0,5–2 m/s | [Nerve conduction velocity (Wikipedia)](https://en.wikipedia.org/wiki/Nerve_conduction_velocity) | 'ongeveer één meter per seconde' |
| geleiding dikke Aβ-vezel (aanraking) | ≈ 35–75 m/s | idem | 'ongeveer vijftig meter per seconde' → 1 m in 20 ms |
| snelste vezels (Aα) | tot ≈ 120 m/s | idem | 'tot wel honderdtwintig meter per seconde' |
| axon teen → ruggenmerg | ≈ 1 m | schatting lichaamslengte | 'wel een meter lang' |
| impulsen per seconde bij de receptor | modelwaarde | — | de meter toont een berekende modelwaarde, geen meting |

**Vereenvoudigingen**

De ionenbeweging is een illustratie: in werkelijkheid zijn er veel meer ionen en is het verschil in concentratie kleiner dan de tekening suggereert. De grafiek is vertraagd (1 ms ≈ 10 s) en loopt op het tempo van de stem. Het verhaal van de 'batterij' is een metafoor: ook zonder pomp blijft het rustpotentiaal nog lang bestaan; de film zegt daarom 'op den duur' en 'langzaam'. De race toont het snelheidsverschil kwalitatief, niet op schaal (een factor honderd past niet op één scherm). De pijnvezel is een dunne C-vezel; de 'stoot' reist via Aβ-vezels. Het neuron in de film is een sensorisch neuron (pseudo-unipolair in werkelijkheid; getekend als het schoolboekmodel).

**Leerdoelen**

Bouw van het neuron en richting van de impuls (V1, C1) · ontstaan van het rustpotentiaal (V2, C2) · stappen van de actiepotentiaal en de refractaire periode (C3) · alles-of-niets en frequentie (V3, C4) · myeline, sprongsgewijze geleiding en snelheid (V4, C5) · receptor en adequate prikkel (V5). V = voorspelvraag in de film, C = checkvraag op deze pagina.

## Techniek: waar zit wat in de HTML

Regelnummers gelden voor `film.src.html` (uitgepakt met `scripts/filmbron.py`; zelfde regelnummers als de film-HTML zelf, 910 regels).

- **`window.FILM_AUDIO`** (r. 476): object `{segment-id: 'data:audio/mpeg;base64,…'}`, één mp3 per gesproken segment. Koppeling id → blob: s00=001.mp3, q1=002.mp3, a1=003.mp3, s21=004.mp3, q2=005.mp3, a2=006.mp3, s31=007.mp3, q3=008.mp3, a3=009.mp3, q4=010.mp3, a4=011.mp3, q5=012.mp3, a5=013.mp3, s70=014.mp3.
- **`window.FILM`** (r. 479, één lange JSON-regel) met drie delen:
  - `plan`: `title`, `subtitle`, `series`, `next` (worden door de speler niet gebruikt; de zichtbare titels staan als HTML in `#card-title`/`#card-end` en de `<h1>`), `chapters` (6× `{n,title,verdieping}`), `timeline` (27 items: narration/title/card/countdown/end; kaarten hebben een vaste `dur`, narration-items krijgen hun duur uit `timing`), `questions` ({q, opts[3], correct, misconception}), `cues` (`[woord, n-de keer, soort, tekst]` per segment; soorten: beat, number, recap, term).
  - `timing[<id>]`: `duration` (s), `speech` ([begin, eind] van de spraak), `phrases` (ondertitelfrasen met `t0`/`t1`), `words` (elk woord met `t0`/`t1`). Bron van de woordtijden (vermoedelijk ElevenLabs-alignment): onbekend (niet in de HTML).
  - `segments[]`: `{id, chapter, text}` — volledige tekst per segment; **niet gebruikt door de speler** (alleen documentatie).
- **Speler** (IIFE vanaf r. 483): bouwt `SEGS` uit `plan.timeline` (starttijden opgeteld; narration-duur = `timing.duration`), zet `window.FILM_SEGS` en `window.FILM_CUES` (r. 533). `FILM_CUES` is een opgeloste cuetabel met absolute tijden voor QA; de scènes lezen de cues niet, maar zoeken hun eigen ankerwoorden op met `wt(id, woord, n)` (begintijd van het n-de voorkomen van dat woord in `timing[id].words`).
- **Audio**: `AUD[id]=new Audio(FILM_AUDIO[id])` (r. 543). De klok (`tick`) volgt `audio.currentTime` tijdens een narration-segment; kaarten en aftellingen lopen op de wandklok. Aan het eind van een fragment springt de speler naar het volgende segment.
- **Scènes**: `render(T)` kiest per segment op `scene`: `sceneWorld` r. 623, `sceneMicro` r. 638, `sceneRecap` r. 798, `sceneCard` r. 808, `sceneQuestion` r. 816, `sceneReveal` r. 831, `render` r. 840, `tick` r. 858. `sceneMicro` verdeelt per segment: a1→microNeuron, s21→microRust, a2→microLeeg, s31→microImpuls, a3→microAon, a4→microRace, a5→microReceptor.
- **Ondertitels**: `renderCaption` toont de lopende frase uit `timing[id].phrases` (frasen < 18 tekens worden met de volgende samengevoegd); in staande stand op de telefoon in `#capband` onder het beeld.
- **Vragen**: `sceneQuestion` toont `plan.questions[n]` tijdens het q-segment en de aftelling; opties lichten op op vaste fracties 0,30/0,55/0,80 van de duur van het q-segment. `sceneReveal` legt de vraag over het begin van het a-segment en kleurt het juiste antwoord op het woord “antwoord” (tot 3,2 s erna).
- **Modi**: Leerling (wacht na de aftelling tot er een optie getikt is), Klas (`?modus=klas`; knop “verder”), vinkje “automatisch door”. Ondertitels (C), stem aan/uit (M), volledig scherm (F, met nep-fullscreen voor iPhone). Geen havo/vwo-schakelaar.
- **Pagina onder de speler**: hoofdstuklijst (gegenereerd uit `plan.chapters`), Begrippen r. 382, Transcript r. 408, Checkvragen r. 432, Voor de docent r. 440, Credits r. 471.
- **QA**: `window.FILM_API.renderAt(T)` (r. 904) rendert deterministisch één frame.

**Ankerwoorden per segment** (woorden waarop beeld of cues getimed zijn, gevonden in de code en in `plan.cues`; mogelijk niet volledig): 

- `s00`: aankomen, Bam, Hoe, pijn, stoot, Twee
- `q1`: —
- `a1`: andersom, axon, begint, cellichaam, dendrieten, eindknopjes (2e), insnoeringen, meter, myelineschede, neuron, Schwann, zenuw, zoomen, één + “antwoord” (reveal)
- `s21`: ATP, drie, kalium, kanaaltjes, lekt, membraan, natrium, pomp, rustpotentiaal, voltmeter, zeventig
- `q2`: —
- `a2`: antwoord, kleiner, leeg, lekt + “antwoord” (reveal)
- `s31`: actiepotentiaal, depolarisatie, drempelwaarde, duizendste, hyperpolarisatie, Kaliumkanalen, Natriumkanalen, prikkel, refractaire, repolarisatie, rolt, vijfenvijftig
- `q3`: —
- `a3`: alles-of-niets, antwoord, frequentie, groot, seconde + “antwoord” (reveal)
- `q4`: —
- `a4`: dikker, honderdtwintig, insnoeringen, pijn, race, seconde (3e), seconde (4e), sprongsgewijze, teen, twintig, vijftig, één + “antwoord” (reveal)
- `q5`: —
- `a5`: adequate, Harder, Harder (2e), receptor, vertaalt, vervormt, Zacht + “antwoord” (reveal)
- `s70`: actiepotentiaal, drempel, Eén, groot, kant, langzame, receptoren, seconde, snelle, Twintig

## Zo pas je deze film aan

1. **Tekst in beeld wijzigen** (labels, termen, kaarten): zoek de tekst in de SVG-lagen (`#world`, `#micro`) of in `#cards`; titel- en eindkaart staan als HTML in `#card-title` / `#card-end`. Vraagteksten en opties wijzig je in `plan.questions` (let op: de gesproken vraag in het q-fragment noemt de opties ook).
2. **Eén alinea opnieuw inspreken**: elk segment is een eigen mp3. Vervang alleen het blob van dat segment (zie tabel hierboven) met dezelfde naam, en vervang in `window.FILM.timing[<id>]` `duration`, `speech`, `phrases` en `words` door de nieuwe tijden (ElevenLabs met timestamps). Pas `segments[].text` en het transcript op de pagina mee aan. De andere segmenten blijven ongemoeid; de starttijden schuiven vanzelf op.
3. **Let op de ankerwoorden**: de animatie hangt aan woorden via `wt()`. Verdwijnt of verandert een ankerwoord (lijst hierboven), dan geeft `wt` 0 terug en springt dat beeldmoment naar het begin van het segment. Een a-segment moet het woord “antwoord” bevatten (reveal), en het n-de voorkomen telt (`wt(id,woord,2)`).
4. **Vraag aanpassen**: `plan.questions[n]` (`q`, `opts`, `correct` 0-gebaseerd, `misconception`); het q- en a-fragment opnieuw inspreken als de gesproken tekst niet meer klopt. De aftelling (`cdN`, 8 s) staat in `plan.timeline`.
5. **Kaarten en pauzes**: de duur van titel-, hoofdstuk- en eindkaart en de aftellingen staat als `dur` in `plan.timeline`.
6. **Inpakken**: werk in een tijdelijke map met `python3 scripts/filmbron.py uitpakken|inpakken|controleer`; zet geen uitgepakte mappen in de repo.

## Aandachtspunten

- Gesproken vragen openen met “Voorspel.” (ook achteraan in s00: “Hoe kan het dat ze niet tegelijk aankomen? Voorspel.”); latere keuze is “Wat denk je?”.
- `plan.series` zegt “film 2 van 6” terwijl de reeks inmiddels 7 films telt (film 5/6 zeggen “van 7”); het veld wordt niet getoond.
- Credits linken naar `reeks.html`, maar dat bestand staat niet in films/zenuwstelsel/ in de repo (dode link).
- `plan.subtitle` begint met een hoofdletter (“Hoe een zenuwcel …”), de titelkaart met een kleine letter; alleen de kaart is zichtbaar.
- Velden die de speler niet gebruikt: `questions[].misconception`, `segments[]`, `plan.series/next`.
- Verbeterd 12-10-2026: dode link `reeks.html` → `../../index.html#regeling`; "film 2 van 7".

## Wachtlijst opnieuw inspreken

- **s31 (blob 007.mp3), 15-10-2026, inhoudelijke correctie.** “Dan herstelt de pomp de rust.” was onjuist: na de hyperpolarisatie brengen de kaliumkanalen (die weer dichtgaan) het membraan terug op het rustpotentiaal; de pomp herstelt alleen op lange termijn de ionenverdeling. Vervangen door:
  > Dan gaan de kaliumkanalen weer dicht, en herstelt het rustpotentiaal: min zeventig. De pomp is daar niet voor nodig. Bij één impuls verplaatsen maar heel weinig ionen. Die zet de pomp pas op de lange duur terug.
  - Hele segment s31 opnieuw opnemen (één mp3), daarna `timing.s31`, `segments[].text` en het transcript bijwerken. Ankerwoorden van s31 blijven allemaal staan; segment wordt ca. 8 s langer.
  - Geen nieuwe risicowoorden (“rustpotentiaal” en “kaliumkanalen” zitten al in de film).
  - Gevonden bij de vergelijking met Gewoon Uitgelegd (GU noemt “de pomp herstelt de rust” een misvatting).

- **s31 (blob 007.mp3), 15-10-2026, aanvulling na vergelijking met Gewoon Uitgelegd** (komt bovenop de correctie hierboven; samen in één opname). Erbij: (a) na „Natrium stroomt naar binnen.” de lawine van spanningsafhankelijke natriumkanalen en waarom dat alles-of-niets geeft; (b) na „Dat heet de refractaire periode.” dat de natriumkanalen vanzelf dichtvallen en even niet open kunnen, en na „Daarom loopt een impuls maar één kant op.” dat die pauze bepaalt hoe vaak een zenuwcel per seconde kan vuren.
  - Segment wordt nog eens ca. 17 s langer (samen met de correctie ca. 25 s). Tijden kloppen al vanaf 0:09.4 pas weer na de nieuwe opname.
  - Ankerwoorden: de nieuwe zinnen bevatten geen `positief`, `sluiten`, `Daarom` of `Even`; „Natriumkanalen/natriumkanalen” komt vaker voor, maar `T()` pakt het eerste voorkomen (0:08.2). **Let op (correctie op de regel hierboven):** `herstelt` is wél een ankerwoord van s31 (`k.herstel=T('herstelt')` in microImpuls) en verdwijnt met de doorgestreepte zin. Opgelost 15-10-2026: de nieuwe zin bevat weer `herstelt` („en herstelt het rustpotentiaal”), dus het beeldmoment `herstel` blijft werken.
  - Ook het antwoordmodel in het docentdeel (vraag hierboven: „… → pomp herstelt de rust”) aanpassen in de HTML: „→ kaliumkanalen dicht, rustpotentiaal hersteld; de pomp herstelt op lange termijn de ionenverdeling”.
- **a5 (blob 013.mp3), 15-10-2026, aanvulling.** Erbij: na „meer impulsen per seconde.” dat een sterkere prikkel ook receptoren ernaast prikkelt, zodat meer zenuwcellen tegelijk vuren (rekrutering).
  - Hele segment a5 opnieuw opnemen (blob 013.mp3), `timing.a5`, `segments[].text` en transcript bijwerken. Ca. 6 s langer.
  - Ankerwoorden blijven staan: de nieuwe zin bevat „receptoren” (niet „receptor”), geen `Harder`, `Elke`, `adequate`, `nooit` of `vertaalt`.
- **Beeld nodig**
  - s31 (a): in microImpuls een terugkoppelpijl „Na⁺ in → minder negatief → meer kanalen open” (kringetje dat sneller gaat draaien), label „lawine” en „alles-of-niets” op het woord „niets”.
  - s31 (b): de natriumkanalen in de refractaire zone tekenen met een ‘slot’ (dicht en geblokkeerd) in plaats van gewoon dicht; bij „per seconde” een korte rij pieken met een minimale tussenruimte.
  - a5: naast de drukreceptor een tweede en derde receptor met elk een eigen axon; bij de harde druk vuren ze allemaal (meer lijnen met pieken).
- **Risicowoorden (uitspraaktest)**
  - *spanningsafhankelijk* — spanning [ˈspɑ.nɪŋ] ([kaikki](https://kaikki.org/dictionary/Dutch/meaning/s/sp/spanning.html)), afhankelijk [ɑfˈɦɑŋ.kə.lək] ([kaikki](https://kaikki.org/dictionary/Dutch/meaning/a/af/afhankelijk.html)); „-lijk” als [lək], niet „lijk”. Stem-invoer: als geschreven; fout? „spannings-afhankelijk”.
  - *lawine* — [laˈʋinə], la·wi·ne (woorden.org via [encyclo.nl](https://www.encyclo.nl/begrip/lawine); [kaikki](https://kaikki.org/dictionary/Dutch/meaning/l/la/lawine.html)). Klemtoon op „wie”. Stem-invoer: als geschreven.
  - *alles of niets* — staat al in de film (a3), geen nieuw risico. *refractaire*, *natriumkanalen*, *vuren* staan al in de film.

## Wijzigingen
- 29 okt 2026 — nacontrole 29 okt: s21 het label 'natrium-kaliumpomp' (en '3 Na⁺ … / pomp stil') staat 22 px lager (y 752/793 in `#m-pump`) en de pompionen (`pumpRender`) lopen binnen tot y 640 i.p.v. 700, zodat ionen en ATP-chip het label niet meer bedekken.
- 28 okt 2026 — Opwaardering prompt v13 (versie 1.1), oude versie in `bron/oud/2-het-kabelnetwerk-v1.0.html`:
  - Membraan (s21, a2, s31): de rechte band is nu een stuk van een ronde cel (gebogen, binnen = onder; `#m-band` als polygoon, lipidekoppen langs `yc(x) = 600 − 60·(1 − ((x−610)/510)²)`); natriumkanaal, kaliumkanaal, pomp en lekkanaal schuiven mee omhoog (transform op `#m-nach`, `#m-kch`, `#m-pump`, `#m-leak`); de labels '3 Na⁺ naar buiten · 2 K⁺ naar binnen' en 'pomp stil' staan nu onder de pomp, 'kaliumlekkanaal' op de oude hoogte, zodat ze niet over ionen of de pomp vallen.
  - a5: het kader 'adequate prikkel' heeft twee regels erbij: 'daar reageert hij het makkelijkst op; een heel sterke andere prikkel kan het ook (druk op je oog → licht)'. De vraag zei 'alleen op druk'; dat botste met film 1 vraag 2 (bronnenlogboek bewering 21).
  - Speler: bij Vragen uit verschijnt de ondertitel van het weggeknipte 'Het goede antwoord is …' niet meer (`renderCaption` filtert frasen die vóór `antwCut` eindigen).
  - Docentdeel, tabel 'De getallen': Wikipedia-links vervangen door OpenStax Biology 2e en Kiernan (vezeltypen); credits: versie 1.1.
  - Nieuw: `bron/bronnen.md` en `bron/opwaardering-v13.md`.
- 15 okt 2026 — Speler: de knop Vragen aan/uit (onthouden in `bk-vragen`, ook `?vragen=uit`) werkt nu altijd, ook na spoelen, in pauze en als je hem halverwege omzet. Bij Vragen uit vallen weg: de vraag zelf, de gesproken vraagzin(nen) ervoor (zinnen op '?', 'Wat denk je?', 'Denk even na.', 'Eerst een voorspelling.') en een los antwoord direct erna ('Antwoord B.', 'Ja.', 'Nee.', 'Precies.'); gewone uitlegzinnen blijven staan. De tijdbalk, tijd en hoofdstuktijden tonen de ingekorte duur. Code: `bkBouw()` maakt `BK.k` (stukken die de speler overslaat); regelnummers in de spelercode zijn daardoor een paar regels verschoven. Hoofdstukkaart 2,2 s in plaats van 3,0 s (duur van de `card`-stukken in `SEGS`).

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

Weg: het lijntje onder 'insnoeringen'; de naam staat direct op de insnoering, met lichte rand (Kamiel: "die lijntjes naar begrippen moeten sowieso weg"; zie `films/BEELDAFSPRAKEN.md`). Gecontroleerd op contactbladen. Regelnummers elders in dit bestand kunnen een paar regels verschoven zijn.

## Wijziging 16 okt 2026: begrippen als kaartjesraster
Het begrippenblok ziet er nu uit als in de hoofdengine (bv. `films/cellen/van-molecuul-tot-biosfeer.html`): onder de kop "Begrippen" een `<div id="glossary">` met per begrip een kaartje `<div class="term"><b>begrip</b><p>uitleg</p></div>` (raster `repeat(auto-fill,minmax(260px,1fr))`). Volgorde en tekst van de begrippen zijn ongewijzigd; extra kolommen (bron, hoofdstuknummer) staan klein onder de uitleg in `<p class="gl-meta">`. De opmaak staat in `<style id="glossary-stijl">` vlak voor `</head>` (kleuren via de variabelen van deze pagina). Nieuw begrip: voeg een kaartje toe in `#glossary`. Omgezet met een script; regelnummers verderop in dit bestand kunnen enkele regels verschoven zijn. De kop "Begrippen" is een `<h2 class="gl-kop">` met dezelfde opmaak als op de voorbeeldpagina (Fraunces 700, 30px, regelhoogte 1,5, marge 0 0 12px; het lettertype zit als `@font-face` 'Fraunces Begrippen' in `#glossary-stijl`, kleur = tekstkleur van deze pagina).
