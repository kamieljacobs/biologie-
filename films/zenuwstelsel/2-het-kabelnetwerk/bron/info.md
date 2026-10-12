# Het kabelnetwerk — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/zenuwstelsel/2-het-kabelnetwerk.html |
| Reeks / nummer | Zenuwstelsel, film 2 (pagina: “hoe een zenuwcel een bericht verstuurt · 5 vwo · film 2 van de reeks Zenuwstelsel”; `plan.series`: “Het zenuwstelsel · film 2 van 6”) |
| Doelgroep / niveau | 5 vwo, één niveau (geen havo/vwo-schakelaar) |
| Versie / datum | 1.0 · 4 oktober 2026 (credits op de pagina) |
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
