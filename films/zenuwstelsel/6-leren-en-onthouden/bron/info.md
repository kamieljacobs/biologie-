# Leren en onthouden — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/zenuwstelsel/6-leren-en-onthouden.html |
| Reeks / nummer | Zenuwstelsel, film 6 (pagina: “hoe je hersenen veranderen als je iets leert · 5 vwo · film 6 van de reeks Zenuwstelsel”; `plan.series`: “Het zenuwstelsel · film 6 van 7”) |
| Doelgroep / niveau | 5 vwo, één niveau (geen havo/vwo-schakelaar) |
| Versie / datum | 1.0 · 6 oktober 2026 (credits op de pagina) |
| Stem / model | Roos (ElevenLabs, eleven_multilingual_v2) |
| Duur | 6:04 gesproken (som van 15 mp3’s, 364,4 s); speler-totaal incl. titel-, hoofdstuk- en eindkaarten en 5 aftellingen van 8 s: 7:14 |
| Beeldstijl | Eigen reeksontwerp van vóór de Part C-stijlkaart: vlakke ‘wereld’ (fietspad, open raam, kind met zijwieltjes en tien jaar later dezelfde persoon), lichte schema-scènes (synaps met toevalsdetector, netwerk van dertig cellen, Pavlov, archiefkaart Henry Molaison, plattegrond met hippocampus, grafieken); Inter-systeemfont |
| Audio-opslag | 15 fragmenten, één per gesproken segment, als base64-data-URI in `window.FILM_AUDIO` (blobs 001–015) |
| Reconstructie | 2026-10-12, uit de gepubliceerde HTML |

## Opbouw

| Begin | Hoofdstuk | Segmenten | Type (docentdeel) | Kernbeeld (docentdeel) |
|---|---|---|---|---|
| 0:00 | Cold open | s00 | — | wereld: zes jaar, zijwieltjes eraf, zadel vastgehouden; tien jaar later fietsen en kletsen, twee tonen uit een open raam |
| 0:22 | 1 Sterker door samen | q1, a1 | mechanisme | de synaps van film 3: toevalsdetector met magnesiumprop, groene calciumstipjes, extra receptoren, groter en nieuw dendrietvoetje; tijdbalk minuten tegenover maanden |
| 1:31 | 2 Patronen en koppelingen | s21, s22, q2, a2 | mechanisme en gedrag | netwerk van dertig cellen met een patroon van tien; twee tonen zetten de rest aan; Pavlov: ongeconditioneerde, neutrale en geconditioneerde prikkel; extinctiegrafiek met spontaan herstel |
| 3:20 | 3 Twee soorten geheugen | s31, q3, a3 | structuur en functie | archiefkaart Henry Molaison; plattegrond met hippocampus; spiegeltekenen met fouten per dag en "nooit gedaan"; weten wát tegenover weten hoe |
| 4:41 | 4 Oefenen en vergeten | q4, a4 | toepassing | schets van gespreid tegenover in één keer leren; snoeien van dunne verbindingen |
| 5:31 | 5 Zijwieltjes eraf | q5, a5 | functie | aandachtsmeter: voorhoofdskwab eerst druk, daarna nemen kleine hersenen en basale kernen het over; motorische strook blijft aan |
| 6:27 | 6 Samenvatting | s70 | — | fietsende figuur in de wereld met samenvattingspaneel (`#p-recap`), items op de woorden uit `plan.cues.s70` |

Begintijden = begin van de hoofdstukkaart in de speler, zonder wachttijd bij de vragen (zoals in de hoofdstuklijst op de pagina). Type-letters A–I uit de prompt staan niet in de HTML; de typering hierboven is die uit de tabel “Per hoofdstuk” in het docentdeel.

## Vragen

### Voorspelvragen in de film (`plan.questions`)

| Nr | Plek | Vraag | Opties | Juist | Misconceptie-optie | Niveau |
|---|---|---|---|---|---|---|
| V1 | H1 Sterker door samen, 0:25 | Je leert iets nieuws. Wat verandert er dan in je hersenen? | A. Er komen nieuwe zenuwcellen bij / B. Bestaande verbindingen worden sterker, en er groeien nieuwe / C. Je hersenen worden groter en zwaarder | B | A | basis (5 vwo) |
| V2 | H2 Patronen en koppelingen, 2:40 | Pavlov laat daarna steeds weer de bel klinken, maar geeft geen eten meer. Wat gebeurt er met het speeksel bij de bel? | A. De hond blijft net zoveel speeksel maken / B. Het speeksel wordt langzaam minder / C. De hond maakt juist meer speeksel, om het eten te lokken | B | A | basis (5 vwo) |
| V3 | H3 Twee soorten geheugen, 3:54 | Henry oefent dagenlang een moeilijke tekentaak: een ster natekenen terwijl hij alleen in een spiegel kijkt. Wordt hij beter? | A. Nee, hij onthoudt niets / B. Ja, maar hij weet niet dat hij geoefend heeft / C. Alleen als hij het elke dag opschrijft | B | A | basis (5 vwo) |
| V4 | H4 Oefenen en vergeten, 4:44 | Je hebt drie uur om te leren voor een toets. Wat blijft het best hangen? | A. Drie uur op de avond ervoor / B. Drie keer een uur, verspreid over drie dagen / C. Het maakt niet uit: uur is uur | B | A | basis (5 vwo) |
| V5 | H5 Zijwieltjes eraf, 5:34 | Een beginner kan niet praten tijdens het fietsen, iemand die al jaren fietst wel. Hoe komt dat? | A. Ervaren fietsers zijn gewoon sterker / B. Andere hersengebieden regelen het fietsen, zodat de voorhoofdskwab vrij is / C. Ervaren fietsers denken sneller | B | A | basis (5 vwo) |

Alle antwoordsegmenten beginnen met “Het goede antwoord is …”. De gesproken vraag begint met “Wat denk je?”.

### Checkvragen op de pagina

1. Een leerling oefent elke dag woordjes Frans. Beschrijf wat er gebeurt in de synaps tussen twee zenuwcellen die bij één woordje horen: eerst binnen een paar minuten, en daarna na weken oefenen. Gebruik de begrippen receptor, dendrietvoetje en eiwitten.  
   *Antwoord:* Binnen minuten: als het eindknopje glutamaat afgeeft terwijl de volgende cel al actief is, laat de toevalsdetector calcium het dendrietvoetje in; het voetje bouwt extra receptoren in, zodat hetzelfde signaal een grotere reactie geeft. Dat is tijdelijk. Na weken herhalen maakt de cel nieuwe eiwitten: het dendrietvoetje wordt groter en er groeien nieuwe voetjes bij. Dat kan maanden blijven.
2. Je ruikt zonnebrandcrème en ziet ineens een hele vakantie voor je. Verklaar dit met het begrip patroon. Een hond begint te kwijlen zodra hij de voerbak hoort rammelen. Benoem de ongeconditioneerde prikkel, de neutrale prikkel die geconditioneerd is geraakt en de reflex. Voorspel wat er gebeurt als de bak wekenlang rammelt zonder voer, en wat er na een pauze kan gebeuren.  
   *Antwoord:* De vakantie is opgeslagen als patroon van sterk verbonden cellen (geur, beelden, geluiden); de geur zet een deel van het patroon aan en via de sterke verbindingen wordt de rest actief. Hond: ongeconditioneerde prikkel = voer; geconditioneerde (eerst neutrale) prikkel = het rammelen; reflex = speeksel. Rammelt de bak steeds zonder voer, dan dooft de reactie uit (extinctie). Na een pauze kan het kwijlen even terugkomen, wat zwakker, omdat de koppeling niet gewist is.
3. Na een ongeluk is bij iemand de hippocampus aan beide kanten beschadigd. Voorspel of hij nog (a) kan leren jongleren en (b) kan vertellen wat hij gisteren heeft gegeten. Verklaar beide antwoorden.  
   *Antwoord:* (a) Ja: vaardigheden lopen via kleine hersenen, basale kernen en motorische schors, niet via de hippocampus (zoals Henry beter werd in spiegeltekenen). Hij weet alleen niet meer dat hij geoefend heeft. (b) Nee: nieuwe herinneringen aan gebeurtenissen worden door de hippocampus vastgelegd; zonder hippocampus lukt dat bijna niet.
4. Twee leerlingen leren elk drie uur voor dezelfde toets. Anna leert drie dagen een uur, Bram drie uur op de avond ervoor. Wie onthoudt na een week het meest? Verklaar met wat er in de synapsen gebeurt, en leg uit wat er gebeurt met synapsen die je na de toets nooit meer gebruikt.  
   *Antwoord:* Anna. Elke keer dat zij na een pauze de stof weer ophaalt, wordt het patroon opnieuw gebruikt en worden de synapsen steviger (meer herhaling met tussenpozen geeft blijvende veranderingen). Synapsen die daarna nooit meer gebruikt worden, worden afgezwakt of opgeruimd: snoeien.
5. Iemand die net autorijles heeft, zet de radio uit om te kunnen schakelen. Na een jaar rijdt dezelfde persoon pratend en met muziek. Verklaar dit met de begrippen voorhoofdskwab, kleine hersenen, basale kernen en automatiseren.  
   *Antwoord:* Bij de beginner is de voorhoofdskwab druk met elke handeling (schakelen, sturen, kijken), dus is er geen ruimte voor de radio. Na veel oefenen hebben kleine hersenen en basale kernen het patroon vastgelegd en sturen ze bij zonder dat je erover nadenkt: automatiseren. De voorhoofdskwab is dan vrij voor praten en luisteren.

## Begrippen

- **synaps** — contactplek tussen het eindknopje van een axon en de volgende cel, met een smalle spleet ertussen (film 3).
- **eindknopje** — verdikt uiteinde van een axon; geeft bij een impuls neurotransmitter af.
- **dendrietvoetje** — klein uitsteeksel op een dendriet waarop een synaps zit; kan groter worden en er kunnen nieuwe bij groeien.
- **glutamaat** — de belangrijkste exciterende neurotransmitter in de hersenen.
- **receptor** — eiwit in het membraan van de volgende cel waar de neurotransmitter op past; opent dan een kanaaltje.
- **toevalsdetector** — speciale glutamaatreceptor (NMDA-receptor) die alleen calcium doorlaat als het eindknopje glutamaat afgeeft én de volgende cel al actief is.
- **langetermijnpotentiatie** — het blijvend sterker worden van een synaps door activiteit: eerst extra receptoren (minuten), na herhaling nieuwe eiwitten en grotere en nieuwe dendrietvoetjes (tot maanden).
- **patroon** — groep zenuwcellen die door vaak samen actief zijn sterk met elkaar verbonden is; een deel van het patroon kan het geheel weer aanzetten.
- **ongeconditioneerde prikkel** — prikkel die vanzelf, zonder leren, een reflex geeft (eten → speeksel).
- **neutrale prikkel** — prikkel die eerst geen reflex geeft (een bel → geen speeksel).
- **geconditioneerde prikkel** — eerst neutrale prikkel die na koppelen aan een ongeconditioneerde prikkel zelf de reflex geeft.
- **klassieke conditionering** — leren waarbij een reflex gekoppeld raakt aan een nieuwe prikkel, doordat die prikkel steeds vlak voor de ongeconditioneerde prikkel komt.
- **uitdoven (extinctie)** — de geconditioneerde reactie wordt zwakker als de prikkel steeds zonder de ongeconditioneerde prikkel komt; de oude koppeling blijft bewaard, er wordt iets bij geleerd.
- **hippocampus** — gebied diep in de slaapkwab dat nieuwe herinneringen aan gebeurtenissen en feiten vastlegt en later doorgeeft aan de schors.
- **weten wát (declaratief geheugen)** — herinneringen aan feiten en gebeurtenissen die je kunt vertellen; eerst via de hippocampus vastgelegd.
- **weten hoe (vaardighedengeheugen)** — geheugen voor vaardigheden zoals fietsen; via kleine hersenen, basale kernen en motorische schors, zonder hippocampus.
- **basale kernen** — kernen van grijze stof diep in de grote hersenen; betrokken bij het kiezen en automatiseren van bewegingen.
- **gespreid leren** — leerstof verdelen over meerdere momenten met pauzes ertussen; blijft beter hangen dan alles in één keer.
- **snoeien** — weinig gebruikte synapsen worden afgezwakt of opgeruimd; maakt het netwerk efficiënter. Loopt in de voorhoofdskwab door tot ver na de puberteit.
- **automatiseren** — een vaardigheid wordt na veel oefenen overgenomen door kleine hersenen en basale kernen, zodat de voorhoofdskwab vrij is voor andere dingen.

Geen vwo-markering: de hele film is 5 vwo.

## Docentdeel

Film 6 laat zien hoe je hersenen veranderen als je iets leert. De rode draad is het fietspad: een kind van zes met zijwieltjes en tien jaar later dezelfde persoon die fietst en kletst terwijl uit een open raam een bekend nummer klinkt. Leren zit vooral in synapsen die sterker, zwakker of nieuw worden. Niveau: 5 vwo, CE-stof.

**Per hoofdstuk**: zie “Opbouw” hierboven (Type en Kernbeeld); misconcepties per hoofdstuk:

- 1 Sterker door samen: bij leren komen er vooral nieuwe zenuwcellen bij
- 2 Patronen en koppelingen: uitdoven is vergeten
- 3 Twee soorten geheugen: geheugen is één systeem
- 4 Oefenen en vergeten: uur is uur; vergeten is alleen verlies
- 5 Zijwieltjes eraf: ervaren mensen zijn gewoon sterker of slimmer

**De feiten en getallen**

| Feit | Waarde | Bron | In de film |
|---|---|---|---|
| langetermijnpotentiatie | blijvende versterking van synapsen door activiteit; "cells that fire together wire together"; Lømo 1966, Bliss en Lømo 1973 | [Long-term potentiation (Wikipedia)](https://en.wikipedia.org/wiki/Long-term_potentiation) | hoofdstuk 1 |
| toevalsdetector | NMDA-receptor: magnesium blokkeert het kanaal tot de ontvangende cel actief is; dan stroomt calcium in | idem | "laat alleen calcium door als beide cellen tegelijk actief zijn" |
| snel en tijdelijk / blijvend | vroege fase: extra AMPA-receptoren, minuten tot uren, geen nieuwe eiwitten; late fase: nieuwe eiwitten, grotere en nieuwe dendrietvoetjes, uren tot maanden | idem | "binnen minuten", "kan maanden blijven" |
| klassieke conditionering | Pavlov, vanaf 1897; voedsel = ongeconditioneerde prikkel; metronoom of bel = neutrale, later geconditioneerde prikkel; extinctie wist de koppeling niet (spontaan herstel) | [Classical conditioning (Wikipedia)](https://en.wikipedia.org/wiki/Classical_conditioning) | hoofdstuk 2, V2 |
| H.M. | Henry Molaison (1926–2008); in 1953 aan beide kanten mediale slaapkwab verwijderd tegen epilepsie; geheugenspanne ongeveer 30 s; vaardigheden intact; spiegeltekenen beter zonder herinnering (Brenda Milner) | [Henry Molaison (Wikipedia)](https://en.wikipedia.org/wiki/Henry_Molaison) | hoofdstuk 3, V3 |
| vaardigheden | procedureel geheugen via basale kernen, kleine hersenen en motorische schors; blijft intact bij schade aan de hippocampus | [Procedural memory (Wikipedia)](https://en.wikipedia.org/wiki/Procedural_memory) | hoofdstuk 3 en 5 |
| consolidatie | eerst hippocampus nodig, later steeds meer de schors; slaap helpt | [Memory consolidation (Wikipedia)](https://en.wikipedia.org/wiki/Memory_consolidation) | "geeft ze later door aan de schors"; "als je slaapt" |
| gespreid leren | gespreid beter in 259 van 271 vergelijkingen (meta-analyse Cepeda e.a. 2006); Ebbinghaus 1885 | [Spacing effect (Wikipedia)](https://en.wikipedia.org/wiki/Spacing_effect) | "in bijna alle onderzoeken die het vergeleken"; de grafiek is een schets |
| snoeien | weinig gebruikte synapsen verdwijnen; het meest tussen kindertijd en puberteit; in de prefrontale schors door tot rond 30 jaar | [Synaptic pruning (Wikipedia)](https://en.wikipedia.org/wiki/Synaptic_pruning); [Petanjek e.a. 2011](https://pmc.ncbi.nlm.nih.gov/articles/PMC3156171) | "tot ver na je puberteit, ook in de voorhoofdskwab" |
| nieuwe zenuwcellen bij volwassenen | omstreden; recent onderzoek vindt voorlopercellen in de hippocampus | [Karolinska Institutet](https://news.ki.se/new-research-confirms-that-neurons-form-in-the-adult-brain) | "hooguit een paar nieuwe zenuwcellen" |
| verspreide opslag | cellen die op één begrip reageren bestaan, maar elk begrip wordt door veel cellen gedragen | [Grandmother cell (Wikipedia)](https://en.wikipedia.org/wiki/Grandmother_cell) | "verspreid over veel cellen" |

**Vereenvoudigingen en wat ontbreekt**

De toevalsdetector is de NMDA-receptor, de extra receptoren zijn AMPA-receptoren; het hele proces heet langetermijnpotentiatie (LTP), het afzwakken langetermijndepressie (LTD). "Snel en tijdelijk" tegenover "blijvend" gaat over de synaps; het werkgeheugen als apart systeem komt niet voor. Of volwassenen nog nieuwe zenuwcellen in de hippocampus maken, is omstreden; de film houdt het bij "hooguit een paar". Conceptcellen (de bekende "Jennifer Aniston-cel") bestaan, maar elk begrip wordt door veel cellen gedragen; een mooie uitbreiding bij hoofdstuk 2. Henry Molaison verloor ook herinneringen aan een aantal jaren vóór de operatie; zijn vroege jeugd bleef het best bewaard. Pavlov gebruikte in werkelijkheid vaak een metronoom of zoemer; de bel is de gangbare schoolboekversie. Uitdoven is geen wissen: na een pauze kan de reactie even terugkomen (spontaan herstel). Operante conditionering (belonen en straffen) staat niet in deze film. In de plattegrond liggen hippocampus en basale kernen diep en zijn ze gestippeld door de schors heen getekend. De grafiek bij gespreid leren is een schets, geen meting. Voor de les: hoofdstuk 4 is een natuurlijk moment om met de klas een planning voor de volgende toets te maken (gespreid, met zelf overhoren).

**Leerdoelen**

Leren berust op veranderingen in synapsen (V1, C1) · synaps sterker bij gelijktijdige activiteit: toevalsdetector, extra receptoren, groter en nieuw dendrietvoetje (V1, C1) · kortetermijn tegenover langetermijn op synapsniveau (C1) · herinnering als patroon; klassieke conditionering en uitdoven (V2, C2) · weten wát (hippocampus) tegenover weten hoe (kleine hersenen, basale kernen) met H.M. (V3, C3) · gespreid herhalen en snoeien (V4, C4) · automatiseren (V5, C5).

## Techniek: waar zit wat in de HTML

Regelnummers gelden voor `film.src.html` (uitgepakt met `scripts/filmbron.py`; zelfde regelnummers als de film-HTML zelf, 1251 regels).

- **`window.FILM_AUDIO`** (r. 680): object `{segment-id: 'data:audio/mpeg;base64,…'}`, één mp3 per gesproken segment. Koppeling id → blob: s00=001.mp3, q1=002.mp3, a1=003.mp3, s21=004.mp3, s22=005.mp3, q2=006.mp3, a2=007.mp3, s31=008.mp3, q3=009.mp3, a3=010.mp3, q4=011.mp3, a4=012.mp3, q5=013.mp3, a5=014.mp3, s70=015.mp3.
- **`window.FILM`** (r. 681, één lange JSON-regel) met drie delen:
  - `plan`: `title`, `subtitle`, `series`, `next` (worden door de speler niet gebruikt; de zichtbare titels staan als HTML in `#card-title`/`#card-end` en de `<h1>`), `chapters` (6× `{n,title,verdieping}`), `timeline` (28 items: narration/title/card/countdown/end; kaarten hebben een vaste `dur`, narration-items krijgen hun duur uit `timing`), `questions` ({q, opts[3], correct, misconception}, `optWords`), `cues` (`[woord, n-de keer, soort, tekst]` per segment; soorten: beat, number, recap, term).
  - `timing[<id>]`: `duration` (s), `speech` ([begin, eind] van de spraak), `phrases` (ondertitelfrasen met `t0`/`t1`), `words` (elk woord met `t0`/`t1`). Bron van de woordtijden (vermoedelijk ElevenLabs-alignment): onbekend (niet in de HTML).
  - `segments[]`: `{id, chapter, text}` — volledige tekst per segment; **niet gebruikt door de speler** (alleen documentatie).
- **Speler** (IIFE vanaf r. 685): bouwt `SEGS` uit `plan.timeline` (starttijden opgeteld; narration-duur = `timing.duration`), zet `window.FILM_SEGS` en `window.FILM_CUES` (r. 735). `FILM_CUES` is een opgeloste cuetabel met absolute tijden voor QA; de scènes lezen de cues niet (uitzondering: `sceneRecap` leest `plan.cues.s70` voor de timing van het samenvattingspaneel, r. 1142), maar zoeken hun eigen ankerwoorden op met `wt(id, woord, n)` (begintijd van het n-de voorkomen van dat woord in `timing[id].words`).
- **Audio**: `AUD[id]=new Audio(FILM_AUDIO[id])` (r. 745). De klok (`tick`) volgt `audio.currentTime` tijdens een narration-segment; kaarten en aftellingen lopen op de wandklok. Aan het eind van een fragment springt de speler naar het volgende segment.
- **Scènes**: `render(T)` kiest per segment op `scene`: `sceneWorld` r. 933, `sceneMicro` r. 964, `sceneRecap` r. 1139, `sceneCard` r. 1149, `sceneQuestion` r. 1157, `sceneReveal` r. 1172, `render` r. 1181, `tick` r. 1199. `sceneMicro` verdeelt per segment: a1→microSterker, s21→microPatroon, s22→microPavlov, a2→microUitdoven, s31→microHenry, a3→microTwee, a4→microOefenen, a5→microAuto.
- **Ondertitels**: `renderCaption` toont de lopende frase uit `timing[id].phrases` (frasen < 18 tekens worden met de volgende samengevoegd); in staande stand op de telefoon in `#capband` onder het beeld.
- **Vragen**: `sceneQuestion` toont `plan.questions[n]` tijdens het q-segment en de aftelling; opties lichten op via `optWords` (woordtijd) of anders op vaste fracties 0,30/0,55/0,80 van de duur van het q-segment. `sceneReveal` legt de vraag over het begin van het a-segment en kleurt het juiste antwoord op het woord “antwoord” (tot 3,2 s erna).
- **Modi**: Leerling (wacht na de aftelling tot er een optie getikt is), Klas (`?modus=klas`; knop “verder”), vinkje “automatisch door”. Ondertitels (C), stem aan/uit (M), volledig scherm (F, met nep-fullscreen voor iPhone). Geen havo/vwo-schakelaar.
- **Pagina onder de speler**: hoofdstuklijst (gegenereerd uit `plan.chapters`), Begrippen r. 589, Transcript r. 612, Checkvragen r. 637, Voor de docent r. 645, Credits r. 675.
- **QA**: `window.FILM_API.renderAt(T)` (r. 1245) rendert deterministisch één frame.

**Ankerwoorden per segment** (woorden waarop beeld of cues getimed zijn, gevonden in de code en in `plan.cues`; mogelijk niet volledig): 

- `s00`: eraf, hoofd, klets, meteen, Niemand, raam, Tien, tonen, Wat, zadel, zijwieltjes, zwabbert
- `q1`: —
- `a1`: actief (2e), calcium, calcium (2e), dendrietvoetje, eindknopje, eiwitten, glutamaat, groter, grotere, maanden, minuten, receptor, receptoren, samen, synapsen, tegelijk, toevalsdetector, vanzelf, verbindingen, voetjes + “antwoord” (reveal)
- `s21`: deel, duizenden, hele, patroon, rest, ritme, stem, sterker, tonen, twee, uitvalt, waar
- `s22`: alleen, bel, bel (2e), eten, friet, geconditioneerde, hap, jou, klassieke, neutrale, ongeconditioneerde, Pavlov, steeds
- `q2`: —
- `a2`: betekent, gewist, leren, Ook, pauze, uitdoven, zwakker + “antwoord” (reveal)
- `s31`: aanvallen, Henry, hippocampus, hippocampus (2e), jeugd, minuut, schors, slaapkwab, weggehaald
- `q3`: —
- `a3`: basale, beter, Fietsen, hoe, kleine, motorische, nooit, twee, Vaardigheden, Weten + “antwoord” (reveal)
- `q4`: —
- `a4`: efficiënter, Gebruik (2e), Gespreid, opgeruimd, ophaalt, puberteit, snoeien, zwakker + “antwoord” (reveal)
- `q5`: —
- `a5`: automatiseren, basale, bij, daarna, evenwicht, kijken, kleine, nadenken, oefenen, praten, slaapt, sturen, trappen, voorhoofdskwab, vrij, weg + “antwoord” (reveal)
- `s70`: Cellen, fietsen, gesnoeid, hippocampus, nachts, nooit, nu, nummer, reflex, synapsen, voetjes

## Zo pas je deze film aan

1. **Tekst in beeld wijzigen** (labels, termen, kaarten): zoek de tekst in de SVG-lagen (`#world`, `#micro`) of in `#cards`; titel- en eindkaart staan als HTML in `#card-title` / `#card-end`. Vraagteksten en opties wijzig je in `plan.questions` (let op: de gesproken vraag in het q-fragment noemt de opties ook).
2. **Eén alinea opnieuw inspreken**: elk segment is een eigen mp3. Vervang alleen het blob van dat segment (zie tabel hierboven) met dezelfde naam, en vervang in `window.FILM.timing[<id>]` `duration`, `speech`, `phrases` en `words` door de nieuwe tijden (ElevenLabs met timestamps). Pas `segments[].text` en het transcript op de pagina mee aan. De andere segmenten blijven ongemoeid; de starttijden schuiven vanzelf op.
3. **Let op de ankerwoorden**: de animatie hangt aan woorden via `wt()`. Verdwijnt of verandert een ankerwoord (lijst hierboven), dan geeft `wt` 0 terug en springt dat beeldmoment naar het begin van het segment. Een a-segment moet het woord “antwoord” bevatten (reveal), en het n-de voorkomen telt (`wt(id,woord,2)`).
4. **Vraag aanpassen**: `plan.questions[n]` (`q`, `opts`, `correct` 0-gebaseerd, `misconception`); het q- en a-fragment opnieuw inspreken als de gesproken tekst niet meer klopt. De aftelling (`cdN`, 8 s) staat in `plan.timeline`.
5. **Kaarten en pauzes**: de duur van titel-, hoofdstuk- en eindkaart en de aftellingen staat als `dur` in `plan.timeline`.
6. **Inpakken**: werk in een tijdelijke map met `python3 scripts/filmbron.py uitpakken|inpakken|controleer`; zet geen uitgepakte mappen in de repo.

## Aandachtspunten

- Eindkaart en slotzin verwijzen naar film 7 “Slaap en stress”, die nog niet in de repo staat.
- Credits: “Naar de reeks: zie reeks.html in de zip” — verwijst naar een zip-levering, niet naar de site; geen werkende link.
- Nieuwer dan films 1–5: `plan.questions[].optWords` timet de opties op woorden; hoofdstuk 2 heeft twee uitlegsegmenten (s21, s22) vóór de vraag, vandaar 15 fragmenten.
- Jaartallen staan als “in het jaar 1953”/“Rond het jaar 1900” in de tekst, conform de uitspraakregel. Velden die de speler niet gebruikt: `questions[].misconception`, `segments[]`, `plan.series/next`.
