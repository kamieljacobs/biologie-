# Knoeien met de synaps — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/zenuwstelsel/4-knoeien-met-de-spleet.html |
| Reeks / nummer | Zenuwstelsel, film 4 (pagina: “wat koffie, wijn en medicijnen doen in de synaps · 5 vwo · film 4 van de reeks Zenuwstelsel”; `plan.series`: “Het zenuwstelsel · film 4 van 6”) |
| Doelgroep / niveau | 5 vwo, één niveau (geen havo/vwo-schakelaar) |
| Versie / datum | 1.0 · 4 oktober 2026 (credits op de pagina) |
| Prompt | onbekend · gemaakt 4 okt |
| Stem / model | Roos (ElevenLabs, eleven_multilingual_v2) |
| Duur | 5:15 gesproken (som van 13 mp3’s, 315,8 s); speler-totaal incl. titel-, hoofdstuk- en eindkaarten en 5 aftellingen van 8 s: 6:26 |
| Beeldstijl | Eigen reeksontwerp van vóór de Part C-stijlkaart: vlakke ‘wereld’ in tweeën (links ochtend met koffie, rechts avond met wijn, klokken) en lichte schema-scènes met de synaps van film 3 plus genummerde ingreepkaart, slaapdrukbalk, remketen, signaalmeter; Inter-systeemfont |
| Audio-opslag | 13 fragmenten, één per gesproken segment, als base64-data-URI in `window.FILM_AUDIO` (blobs 001–013) |
| Reconstructie | 2026-10-12, uit de gepubliceerde HTML |

## Opbouw

| Begin | Hoofdstuk | Segmenten | Type (docentdeel) | Kernbeeld (docentdeel) |
|---|---|---|---|---|
| 0:00 | Cold open | s00 | — | wereld: gesplitst beeld ochtend (koffie, wakker) en avond (wijn, losser), lens op dezelfde spleet |
| 0:21 | 1 Vier plekken | q1, a1 | structuur en functie | synaps met vier genummerde plekken; agonist en antagonist als sleutel die past en opent of past en blokkeert |
| 1:22 | 2 Koffie | q2, a2 | mechanisme | adenosine hoopt op (slaapdrukbalk met klok); cafeïne blokkeert de receptor; de dip |
| 2:19 | 3 Wijn | s31, q3, a3 | mechanisme | GABA-synaps versterkt, glutamaatsynaps geremd; netwerk trager; rem op de rem |
| 3:27 | 4 Medicijnen | q4, a4 | mechanisme | nicotine (agonist), SSRI (heropname), levodopa (aanmaak, bloed-hersenbarrière) |
| 4:41 | 5 Gewenning en verslaving | q5, a5 | regulatie | signaalmeter: receptoren verdwijnen (tolerantie), stof weg (ontwenning); beloningssysteem met effect- en verlangenmeter |
| 5:50 | 6 Samenvatting | s70 | — | samenvattingskaart (`#m-recap`) over de gedimde ochtend/avond-wereld |

Begintijden = begin van de hoofdstukkaart in de speler, zonder wachttijd bij de vragen (zoals in de hoofdstuklijst op de pagina). Type-letters A–I uit de prompt staan niet in de HTML; de typering hierboven is die uit de tabel “Per hoofdstuk” in het docentdeel.

## Vragen

### Voorspelvragen in de film (`plan.questions`)

| Nr | Plek | Vraag | Opties | Juist | Misconceptie-optie | Niveau |
|---|---|---|---|---|---|---|
| V1 | H1 Vier plekken, 0:24 | Op hoeveel plekken in een synaps kan een stof ingrijpen? | A. Op één plek: de receptor / B. Op twee plekken: afgifte en receptor / C. Op meer dan twee plekken | C | A | basis (5 vwo) |
| V2 | H2 Koffie, 1:25 | Hoe maakt cafeïne je wakker? | A. Cafeïne geeft je cellen energie / B. Cafeïne blokkeert een stof die je slaperig maakt / C. Cafeïne laat je hart direct sneller kloppen | B | A | basis (5 vwo) |
| V3 | H3 Wijn, 2:48 | Alcohol remt je hersenen. Waarom word je na één glas eerst juist losser en spraakzamer? | A. Een beetje alcohol werkt opwekkend / B. Eerst worden de cellen geremd die jou afremmen / C. Omdat je het verwacht | B | A | basis (5 vwo) |
| V4 | H4 Medicijnen, 3:30 | Een SSRI remt de heropname van serotonine. Wat gebeurt er dan in de spleet? | A. Er komt meer serotonine bij / B. De serotonine blijft langer in de spleet hangen / C. De receptoren worden gevoeliger | B | A | basis (5 vwo) |
| V5 | H5 Gewenning en verslaving, 4:44 | Een zenuwcel krijgt wekenlang veel meer signaal dan normaal. Wat doet die cel? | A. Niets, hij vuurt gewoon vaker / B. Hij maakt minder receptoren, zodat het signaal weer normaal wordt / C. Hij raakt beschadigd | B | A | basis (5 vwo) |

Alle antwoordsegmenten beginnen met “Het goede antwoord is …”. De gesproken vraag begint met “Wat denk je?”.

### Checkvragen op de pagina

1. Teken de synaps en geef de vier plekken aan waar een stof kan ingrijpen. Zet cafeïne, nicotine, een SSRI en levodopa op de juiste plek.  
   *Antwoord:* 1 afgifte, 2 receptor, 3 opruimen, 4 aanmaak. Cafeïne en nicotine op de receptor (antagonist en agonist), SSRI bij het opruimen (heropname), levodopa bij de aanmaak.
2. Leg het verschil uit tussen een agonist en een antagonist. Welke van de twee is cafeïne, en op welke receptor? Verklaar daarmee de 'cafeïne-dip'.  
   *Antwoord:* Agonist: past en zet aan; antagonist: past maar blokkeert. Cafeïne is een antagonist op de adenosinereceptor. Adenosine hoopt zich intussen op; als de cafeïne is afgebroken, bindt alle adenosine tegelijk: plotselinge vermoeidheid.
3. Alcohol maakt het hele zenuwstelsel trager, maar na één glas worden mensen vaak juist spraakzamer. Verklaar beide met de begrippen remmend en exciterend.  
   *Antwoord:* Alcohol versterkt remmende (GABA) en verzwakt exciterende (glutamaat) synapsen. De cellen die ons gedrag afremmen zijn als eerste gevoelig; als die worden geremd, valt de rem weg (losser). Bij meer alcohol wordt ook de rest geremd (traag).
4. Een leerling zegt: 'Een SSRI maakt meer serotonine, en depressie is een serotoninetekort.' Wat klopt er wel en wat niet?  
   *Antwoord:* Een SSRI maakt geen extra serotonine; het remt de heropname, zodat de stof langer in de spleet blijft. Dat is de werking van het middel. Waardoor depressie ontstaat is niet volledig bekend en niet simpelweg een tekort aan één stof; het effect komt pas na weken, dus er verandert meer dan de hoeveelheid stof in de spleet.
5. Iemand drinkt elke dag vier koppen koffie en stopt er ineens mee. Voorspel wat er de eerste dagen gebeurt en verklaar dat met receptoren.  
   *Antwoord:* Door de dagelijkse blokkade heeft de cel meer adenosinereceptoren gemaakt (gewenning). Zonder cafeïne bindt adenosine nu op extra veel receptoren: sterke vermoeidheid en hoofdpijn (ontwenning), tot de cel het aantal receptoren weer heeft bijgesteld.

## Begrippen

- **psychoactieve stof** — stof die via het zenuwstelsel je waarneming, stemming of gedrag verandert.
- **agonist** — stof die in een receptor past en hem aanzet, zoals de echte neurotransmitter.
- **antagonist** — stof die in een receptor past maar hem niet aanzet; blokkeert de echte neurotransmitter.
- **heropnameremmer** — stof die het terugpompen van neurotransmitter in het eindknopje remt, zodat de stof langer in de spleet blijft.
- **adenosine** — stof die zich tijdens het waken ophoopt in de hersenen en zenuwcellen remt (slaapdruk).
- **cafeïne** — antagonist op de adenosinereceptor; verbergt vermoeidheid.
- **GABA** — de belangrijkste remmende neurotransmitter in de hersenen.
- **glutamaat** — de belangrijkste exciterende neurotransmitter in de hersenen.
- **alcohol (ethanol)** — versterkt de werking van GABA en remt die van glutamaat; het netwerk wordt trager.
- **nicotine** — agonist op (nicotinerge) acetylcholinereceptoren; laat ook dopamine vrijkomen.
- **serotonine** — neurotransmitter die onder andere bij stemming, slaap en eetlust een rol speelt.
- **SSRI** — antidepressivum dat de heropname van serotonine remt (selectieve serotonine-heropnameremmer).
- **dopamine** — neurotransmitter die onder andere bij beweging en beloning een rol speelt.
- **levodopa (L-dopa)** — grondstof voor dopamine; komt, anders dan dopamine, wel de hersenen in; medicijn bij de ziekte van Parkinson.
- **ziekte van Parkinson** — aandoening waarbij zenuwcellen afsterven die dopamine maken; leidt tot bewegingsproblemen.
- **tolerantie (gewenning)** — afname van het effect van een stof bij herhaald gebruik, doordat de cel receptoren weghaalt of minder gevoelig maakt.
- **ontwenning** — klachten na het stoppen met een stof, doordat de aangepaste cel nu te weinig signaal krijgt.
- **beloningssysteem** — hersengebieden waar dopamine vrijkomt bij iets dat goed was; stuurt herhalen aan.
- **verslaving** — toestand waarin het verlangen naar een stof of gedrag voor het effect uit gaat, door aanpassing van synapsen en het beloningssysteem.

Geen vwo-markering: de hele film is 5 vwo.

## Docentdeel

Film 4 laat zien dat elke psychoactieve stof op een van vier plekken in de synaps ingrijpt. De rode draad is de ingreepkaart; de ingang is koffie en wijn. Niveau: 5 vwo, CE-stof. De toon is mechanistisch en zonder oordeel.

**Vooraf: gevoelige thema's**

In elke klas zitten leerlingen die zelf, of via iemand thuis, met medicijnen, drank of drugs te maken hebben. Suggestie om de les te openen: zeg dat de film over werking gaat, niet over mensen, en dat niemand iets hoeft te delen. Bij antidepressiva zegt de film wat bekend is (heropname geremd; effect na weken) en dat waardoor een depressie ontstaat niet volledig bekend is en niet één tekort is. "Hoe een middel werkt is iets anders dan waardoor een aandoening ontstaat" is een zin om bij te blijven. De slotzin over verslaving ("geen zwakke wil, maar een aangepaste synaps") is bedoeld om schaamte weg te nemen, niet om risico te bagatelliseren. Hulp en informatie: huisarts, [Trimbos-instituut](https://www.trimbos.nl), [drugsinfo.nl](https://www.drugsinfo.nl).

**Per hoofdstuk**: zie “Opbouw” hierboven (Type en Kernbeeld); misconcepties per hoofdstuk:

- 1 Vier plekken: een stof "geeft energie"
- 2 Koffie: cafeïne is een energiebron
- 3 Wijn: alcohol is opwekkend
- 4 Medicijnen: meer stof in de spleet = beter
- 5 Gewenning en verslaving: verslaving is alleen een kwestie van wil

**De feiten en getallen**

| Feit | Waarde | Bron | In de film |
|---|---|---|---|
| cafeïne | blokkeert de bindingsplaats van adenosine (antagonist); halfwaardetijd 3–7 uur; piek na 1–2 uur; 50–175 mg per kop | [Caffeine (Wikipedia)](https://en.wikipedia.org/wiki/Caffeine) | "na een paar uur"; "na een kwartier wakker" is de eerste merkbare werking |
| adenosine | hoopt zich op tijdens waken, daalt in de slaap (slaapdruk) | [Adenosine (Wikipedia)](https://en.wikipedia.org/wiki/Adenosine) | slaapdrukbalk 8:00–22:00 |
| alcohol | versterkt GABA op de GABA-A-receptor; beïnvloedt ook glutamaat; afbraak 15–18 mg/dl per uur | [Alcohol (drug) (Wikipedia)](https://en.wikipedia.org/wiki/Alcohol_(drug)) | "meer rem, minder gas"; de "rem op de rem" is het gangbare model voor disinhibitie |
| nicotine | agonist op nicotinerge acetylcholinereceptoren; dopamine-afgifte; in de hersenen binnen 10–20 s; halfwaardetijd ≈ 2 uur | [Nicotine (Wikipedia)](https://en.wikipedia.org/wiki/Nicotine) | "binnen tien seconden" |
| SSRI | remt de serotoninetransporter; effect pas na weken; geen consistent bewijs dat depressie door verlaagde serotonine komt | [SSRI (Wikipedia)](https://en.wikipedia.org/wiki/Selective_serotonin_reuptake_inhibitor) | "pas na weken"; "niet simpelweg een tekort aan één stof" |
| Parkinson en levodopa | verlies van dopamine-producerende neuronen in de substantia nigra; levodopa is de directe voorloper van dopamine | [Parkinson's disease (Wikipedia)](https://en.wikipedia.org/wiki/Parkinson%27s_disease), [L-DOPA (Wikipedia)](https://en.wikipedia.org/wiki/L-DOPA) | dat dopamine de bloed-hersenbarrière niet passeert is een handboekfeit (niet op deze pagina's gevonden) |
| tolerantie | voortdurende binding desensitiseert receptoren; ook minder receptoren; tolerantie is niet hetzelfde als verslaving | [Drug tolerance (Wikipedia)](https://en.wikipedia.org/wiki/Drug_tolerance) | signaalmeter; "er is nog iets" |

**Vereenvoudigingen**

De signaalmeter in hoofdstuk 5 is een model: signaal = stof × receptoren, teruggeregeld naar "normaal". Het beloningssysteem is als één gebied getekend (in werkelijkheid een keten, onder andere ventraal tegmentum en nucleus accumbens). Cafeïne werkt ook op andere plekken (bijvoorbeeld hartslag via adrenaline), maar het wakker-effect loopt via adenosine. Alcohol beïnvloedt meer systemen dan GABA en glutamaat. De dip na koffie is een vereenvoudiging van ophoping plus afbraak.

**Leerdoelen**

Vier aangrijpingspunten (V1, C1) · agonist en antagonist (V2, C2) · cafeïne en alcohol (V2, V3, C2, C3) · heropnameremming en het onderscheid middel/aandoening (V4, C4) · levodopa en aanmaak (C4) · tolerantie, ontwenning, verslaving (V5, C5).

## Techniek: waar zit wat in de HTML

Regelnummers gelden voor `film.src.html` (uitgepakt met `scripts/filmbron.py`; zelfde regelnummers als de film-HTML zelf, 786 regels).

- **`window.FILM_AUDIO`** (r. 427): object `{segment-id: 'data:audio/mpeg;base64,…'}`, één mp3 per gesproken segment. Koppeling id → blob: s00=001.mp3, q1=002.mp3, a1=003.mp3, q2=004.mp3, a2=005.mp3, s31=006.mp3, q3=007.mp3, a3=008.mp3, q4=009.mp3, a4=010.mp3, q5=011.mp3, a5=012.mp3, s70=013.mp3.
- **`window.FILM`** (r. 430, één lange JSON-regel) met drie delen:
  - `plan`: `title`, `subtitle`, `series`, `next` (worden door de speler niet gebruikt; de zichtbare titels staan als HTML in `#card-title`/`#card-end` en de `<h1>`), `chapters` (6× `{n,title,verdieping}`), `timeline` (26 items: narration/title/card/countdown/end; kaarten hebben een vaste `dur`, narration-items krijgen hun duur uit `timing`), `questions` ({q, opts[3], correct, misconception}), `cues` (`[woord, n-de keer, soort, tekst]` per segment; soorten: beat, number, recap, term).
  - `timing[<id>]`: `duration` (s), `speech` ([begin, eind] van de spraak), `phrases` (ondertitelfrasen met `t0`/`t1`), `words` (elk woord met `t0`/`t1`). Bron van de woordtijden (vermoedelijk ElevenLabs-alignment): onbekend (niet in de HTML).
  - `segments[]`: `{id, chapter, text}` — volledige tekst per segment; **niet gebruikt door de speler** (alleen documentatie).
- **Speler** (IIFE vanaf r. 434): bouwt `SEGS` uit `plan.timeline` (starttijden opgeteld; narration-duur = `timing.duration`), zet `window.FILM_SEGS` en `window.FILM_CUES` (r. 484). `FILM_CUES` is een opgeloste cuetabel met absolute tijden voor QA; de scènes lezen de cues niet, maar zoeken hun eigen ankerwoorden op met `wt(id, woord, n)` (begintijd van het n-de voorkomen van dat woord in `timing[id].words`).
- **Audio**: `AUD[id]=new Audio(FILM_AUDIO[id])` (r. 494). De klok (`tick`) volgt `audio.currentTime` tijdens een narration-segment; kaarten en aftellingen lopen op de wandklok. Aan het eind van een fragment springt de speler naar het volgende segment.
- **Scènes**: `render(T)` kiest per segment op `scene`: `sceneWorld` r. 572, `sceneMicro` r. 584, `sceneRecap` r. 675, `sceneCard` r. 684, `sceneQuestion` r. 692, `sceneReveal` r. 707, `render` r. 716, `tick` r. 734. `sceneMicro` verdeelt per segment: a1→microVier, a2→microKoffie, s31→microWijn, a3→microRem, a4→microMed, a5→microTol.
- **Ondertitels**: `renderCaption` toont de lopende frase uit `timing[id].phrases` (frasen < 18 tekens worden met de volgende samengevoegd); in staande stand op de telefoon in `#capband` onder het beeld.
- **Vragen**: `sceneQuestion` toont `plan.questions[n]` tijdens het q-segment en de aftelling; opties lichten op op vaste fracties 0,30/0,55/0,80 van de duur van het q-segment. `sceneReveal` legt de vraag over het begin van het a-segment en kleurt het juiste antwoord op het woord “antwoord” (tot 3,2 s erna).
- **Modi**: Leerling (wacht na de aftelling tot er een optie getikt is), Klas (`?modus=klas`; knop “verder”), vinkje “automatisch door”. Ondertitels (C), stem aan/uit (M), volledig scherm (F, met nep-fullscreen voor iPhone). Geen havo/vwo-schakelaar.
- **Pagina onder de speler**: hoofdstuklijst (gegenereerd uit `plan.chapters`), Begrippen r. 341, Transcript r. 363, Checkvragen r. 386, Voor de docent r. 394, Credits r. 422.
- **QA**: `window.FILM_API.renderAt(T)` (r. 780) rendert deterministisch één frame.

**Ankerwoorden per segment** (woorden waarop beeld of cues getimed zijn, gevonden in de code en in `plan.cues`; mogelijk niet volledig): 

- `s00`: Avond, Hoe, losser, Ochtend, reageren, spleet, wakker
- `q1`: —
- `a1`: agonist, antagonist, Drie, Eén, kaart, synaps, Twee, Vier + “antwoord” (reveal)
- `q2`: —
- `a2`: adenosine, afgebroken, antagonist, Cafeïne, dip, energie, langer, remt, slaapdruk, wacht, wakker + “antwoord” (reveal)
- `s31`: GABA, gevoeliger, glutamaat, Meer, remt, trager, twee
- `q3`: —
- `a3`: afremmen, gas, gevoelig, losser, Pas, traag + “antwoord” (reveal)
- `q4`: —
- `a4`: Drie, Levodopa, minder, Nicotine, Parkinson, seconden, SSRI's, weken, zeker + “antwoord” (reveal)
- `q5`: —
- `a5`: beloont, dopamine, iets, meer, normaal, ontwenning, sterker, Stop, tolerantie, veel, verlangen, verslaving, weg + “antwoord” (reveal)
- `s70`: Alcohol, Cafeïne, gewenning, knoeit, Levodopa, Nicotine, SSRI, Vier

## Zo pas je deze film aan

1. **Tekst in beeld wijzigen** (labels, termen, kaarten): zoek de tekst in de SVG-lagen (`#world`, `#micro`) of in `#cards`; titel- en eindkaart staan als HTML in `#card-title` / `#card-end`. Vraagteksten en opties wijzig je in `plan.questions` (let op: de gesproken vraag in het q-fragment noemt de opties ook).
2. **Eén alinea opnieuw inspreken**: elk segment is een eigen mp3. Vervang alleen het blob van dat segment (zie tabel hierboven) met dezelfde naam, en vervang in `window.FILM.timing[<id>]` `duration`, `speech`, `phrases` en `words` door de nieuwe tijden (ElevenLabs met timestamps). Pas `segments[].text` en het transcript op de pagina mee aan. De andere segmenten blijven ongemoeid; de starttijden schuiven vanzelf op.
3. **Let op de ankerwoorden**: de animatie hangt aan woorden via `wt()`. Verdwijnt of verandert een ankerwoord (lijst hierboven), dan geeft `wt` 0 terug en springt dat beeldmoment naar het begin van het segment. Een a-segment moet het woord “antwoord” bevatten (reveal), en het n-de voorkomen telt (`wt(id,woord,2)`).
4. **Vraag aanpassen**: `plan.questions[n]` (`q`, `opts`, `correct` 0-gebaseerd, `misconception`); het q- en a-fragment opnieuw inspreken als de gesproken tekst niet meer klopt. De aftelling (`cdN`, 8 s) staat in `plan.timeline`.
5. **Kaarten en pauzes**: de duur van titel-, hoofdstuk- en eindkaart en de aftellingen staat als `dur` in `plan.timeline`.
6. **Inpakken**: werk in een tijdelijke map met `python3 scripts/filmbron.py uitpakken|inpakken|controleer`; zet geen uitgepakte mappen in de repo.

## Aandachtspunten

- Ankerfout: `microRem` (r. 628) zoekt het woord ‘afremmen’ in a3, maar de tekst zegt “af te remmen”; `wt` geeft 0, dus het label ‘de remcel houdt de doelcel stil’ staat er vanaf het begin van a3 in plaats van op dat woord (valt grotendeels onder de antwoord-overlay).
- Credits linken naar `reeks.html`, dat niet in de repo staat (dode link). `plan.series` zegt “film 4 van 6”.
- Gevoelig onderwerp: docentdeel heeft een apart blok ‘Vooraf: gevoelige thema’s’ met links naar Trimbos en drugsinfo.nl; de SSRI-passage volgt Kamiels wens (geen oorzaakclaims over depressie). Bij herschrijven bewaken.
- Velden die de speler niet gebruikt: `questions[].misconception`, `segments[]`, `plan.series/next`.
- Verbeterd 12-10-2026: cue in a3 hangt nu aan "remmen" (de stem zegt "af te remmen"), label verschijnt op 3,54 s in het stuk. Dode link `reeks.html` → `../../index.html#regeling`; "film 4 van 7".

## Wijzigingen
- 15 okt 2026 — Speler: de knop Vragen aan/uit (onthouden in `bk-vragen`, ook `?vragen=uit`) werkt nu altijd, ook na spoelen, in pauze en als je hem halverwege omzet. Bij Vragen uit vallen weg: de vraag zelf, de gesproken vraagzin(nen) ervoor (zinnen op '?', 'Wat denk je?', 'Denk even na.', 'Eerst een voorspelling.') en een los antwoord direct erna ('Antwoord B.', 'Ja.', 'Nee.', 'Precies.'); gewone uitlegzinnen blijven staan. De tijdbalk, tijd en hoofdstuktijden tonen de ingekorte duur. Code: `bkBouw()` maakt `BK.k` (stukken die de speler overslaat); regelnummers in de spelercode zijn daardoor een paar regels verschoven. Hoofdstukkaart 2,2 s in plaats van 3,0 s (duur van de `card`-stukken in `SEGS`).

## Wijziging 16 okt 2026
Titel op verzoek van Kamiel: "Knoeien met de synaps" (was "Knoeien met de spleet") in `<title>`, kop, titelkaart en `FILM.plan.title`; ook in de eindkaart van film 3, `index.html`, `pta-route.html` en de verwijzing in Slaap. Bestandsnaam blijft `4-knoeien-met-de-spleet.html` (links en kijkcijfers). De gesproken zin "ze knoeien met de spleet uit de vorige film" (s00, 0:11) gaat over de synapsspleet en is niet opnieuw ingesproken.

## Wijziging 16 okt 2026: begrippen als kaartjesraster
Het begrippenblok ziet er nu uit als in de hoofdengine (bv. `films/cellen/van-molecuul-tot-biosfeer.html`): onder de kop "Begrippen" een `<div id="glossary">` met per begrip een kaartje `<div class="term"><b>begrip</b><p>uitleg</p></div>` (raster `repeat(auto-fill,minmax(260px,1fr))`). Volgorde en tekst van de begrippen zijn ongewijzigd; extra kolommen (bron, hoofdstuknummer) staan klein onder de uitleg in `<p class="gl-meta">`. De opmaak staat in `<style id="glossary-stijl">` vlak voor `</head>` (kleuren via de variabelen van deze pagina). Nieuw begrip: voeg een kaartje toe in `#glossary`. Omgezet met een script; regelnummers verderop in dit bestand kunnen enkele regels verschoven zijn. De kop "Begrippen" is een `<h2 class="gl-kop">` met dezelfde opmaak als op de voorbeeldpagina (Fraunces 700, 30px, regelhoogte 1,5, marge 0 0 12px; het lettertype zit als `@font-face` 'Fraunces Begrippen' in `#glossary-stijl`, kleur = tekstkleur van deze pagina).
