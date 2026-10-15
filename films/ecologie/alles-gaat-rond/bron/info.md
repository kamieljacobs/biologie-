# Alles gaat rond — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/ecologie/alles-gaat-rond/index.html (audio: films/ecologie/alles-gaat-rond/narration.mp3) |
| Reeks / nummer | Ecologie deel 2 van het tweeluik (deel 1: *Plek genoeg?*); reeks "Uitgelegd" (naast *Alles beweegt*, *Alles op zijn plek*, *Eén wordt twee*, *Precies op tijd*) |
| Doelgroep / niveau | 4 vwo, Nectar 4 vwo (editie 4.2) H8 *Kenmerken van ecosystemen*; geen havo/vwo-splitsing |
| Versie / datum | onbekend (niet in de HTML) |
| Stem / model | Roos (ElevenLabs); model onbekend (niet in de HTML) |
| Duur | 24:44 (narration.mp3: 1484,1 s; `TIMELINE.duration` 1484,055 s). Pagina zegt "± 25 minuten" |
| Beeldstijl | Ouder eigen ontwerp ("Uitgelegd"-engine): canvas 1600×900, donkere radiale achtergrond met ruis, platte geometrische natuurtekeningen (dieren, bomen, kaarten), vaste kleurcodes (producent groen, herbivoor geel, carnivoor rood, detrituseter bruin, reducent paars, koolstof oker, stikstof blauw, zuurstof cyaan, warmte rood). Bricolage Grotesque / Atkinson Hyperlegible / JetBrains Mono. Dit is de Macro-look waar Part C op voortbouwt, maar de film is niet volgens Part C gemaakt |
| Audio-opslag | Eén doorlopende take, `narration.mp3` naast de HTML (`<audio id="narration" src="narration.mp3">`); niet ingebed. De HTML bevat alleen de 7 lettertypen als base64 (blobs 001–007.woff2) |
| Reconstructie | 2026-10-12, uit de gepubliceerde HTML |

## Opbouw
Begintijd = begin hoofdstukkaart (de stem start ~3,1 s later). Type-letters uit de prompt staan niet in de HTML; indicatie op grond van de inhoud. Kernbeelden uit de scènecommentaren.

| Begin | Hoofdstuk | Type (indicatie) | Kernbeeld |
|---|---|---|---|
| 0:00 | 1 Waar blijft het ree? | C | Wolven en ree op de Veluwe; organisch → anorganisch; stoffen rond, energie in één richting; atomen van het ree in jouw adem |
| 1:05 | 2 Opruimers (pauze) | B | Consumenten bij het kadaver, detrituseters in het strooisel, reducenten, producenten, stroomschema |
| 2:33 | 3 Het bos ademt (pauze) | D | Boom dissimileert dag en nacht; CO₂-grafiek over een etmaal; bosdoorsnede met meetpunten |
| 3:55 | 4 Waar afbraak stopt (pauze) | B | Voorwaarden voor afbraak, hoogveen, meisje van Yde (silhouet), turf, compost, veenweide |
| 5:25 | 5 Treden en piramides | B | Voedselweb en trofische niveaus; piramides van aantallen (wolven, teken), biomassa, energie; in zee |
| 6:53 | 6 Waarom zo weinig wolven? (pauze) | C | Rendement fotosynthese, ± 10 % per niveau, energiestroomschema, rekenvoorbeeld, pcb's, myxomatose |
| 9:07 | 7 Klein en warm | B | Wolf en spitsmuis; oppervlakte-inhoudsverhouding; energiebudget |
| 9:55 | 8 Hoeveel groeit er? (pauze) | B | BPP en NPP; abiotische factoren; staafdiagram NPP per ecosysteem; biomassa bepalen in een proefvlak |
| 11:31 | 9 Koolstof rond de wereld | C | Koolstof in het ree, de wolf ademt uit, reservoirs, snelle en trage kringloop, veen → steenkool, olie/gas, kalksteen |
| 14:04 | 10 Koolstof uit balans (pauze) | D/I | Fossiel verbranden, badkuip, voorraad vs stroom, stromen op een rij, Keeling-curve, oceaan, positieve terugkoppeling |
| 16:48 | 11 Stikstof uit de lucht | A | Stikstof in het ree; drievoudige binding; fixatie, wortelknolletjes, mutualisme; brem, bliksem, de mens |
| 18:27 | 12 Stikstof gaat rond (pauze) | C | Wolf en ureum, stal en mesthoop, nitraat spoelt uit, overzicht van de kringloop |
| 20:24 | 13 Van akker tot kraan | I | Stikstofbalans akkerbouwer, rioolwaterzuivering met anammox, drinkwater, Rijn en Maas |
| 22:28 | 14 Alles verandert (pauze) | C | Kootwijkerzand: stuifzand → heide → bos; successie; Amerikaanse vogelkers; finale met het ree |

## Vragen
Geen meerkeuze-voorspelvragen. Acht open pauzevragen: een kaart "Pauzemoment" met aftelring en de knop "Pauzeer hier"; de film pauzeert niet vanzelf, de audio bevat op die plek ~15–20 s stilte. Niet ingesproken. Antwoorden in de docentenhandleiding (ingeklapt).

| Plek | Vraag | Antwoord (handleiding, kort) |
|---|---|---|
| H2, 2:13 | Op een dode boomstam groeit een paddenstoel, en onder de schors kruipen pissebedden. Welke rol hebben de paddenstoel en de pissebedden in het ecosysteem? | Paddenstoel = vruchtlichaam van een schimmel: reducent. Pissebedden: detrituseters die dode resten verkleinen. |
| H3, 3:34 | In een kas met tomatenplanten meet je een etmaal lang het CO₂-gehalte. Hoe verloopt dat gehalte, en waarom? Wanneer is het het laagst? | Overdag daalt het (fotosynthese > dissimilatie), 's nachts stijgt het tot zonsopgang; laagst aan het eind van de middag. |
| H4, 5:01 | Een augurk in azijn bederft bijna niet. En een composthoop die te nat is, gaat stinken in plaats van goed te composteren. Leg beide uit met de omstandigheden die reducenten nodig hebben. | Lage pH remt reducenten; te nat → te weinig zuurstof, anaerobe bacteriën maken stinkende gassen. |
| H6, 8:37 | Een rups eet blad met tweehonderd kilojoule energie. Honderdtwintig kilojoule verlaat de rups als uitwerpselen, en vierenzestig kilojoule verbruikt ze bij dissimilatie. Hoeveel energie legt de rups vast in groei? En welk percentage van wat ze eet, is dat? | 200 − 120 − 64 = 16 kJ = 8 %. |
| H8, 11:08 | Je bepaalt de biomassa van heide in een proefvlak. Waarom droog je de planten tot hun gewicht niet meer verandert? En waarom groeit er per vierkante meter meer in een moeras dan op de heide? | Alleen drooggewicht is betrouwbaar; moeras heeft water en voedingsstoffen, heide is droog en voedselarm (beperkende factoren). |
| H10, 16:20 | In het schema staan de koolstofstromen van rond 1990. Bereken de netto koolstofstroom naar de atmosfeer in 1990, met eenheid. Waarom is die stroom nu groter? | 203 − 200 = +3 Gt C per jaar; nu ± +6 door meer fossiele verbranding. |
| H12, 19:59 | In een weiland dat een paar weken onder water staat, verdwijnt het nitraat uit de bodem, ook al nemen de planten bijna niets op. Hoe kan dat? En waarom komt er ook geen nieuw nitraat bij? | Denitrificatie zonder zuurstof; nitrificatie heeft zuurstof nodig en stopt. |
| H14, 24:17 | Na kaalkap groeien op een stuk bos eerst brandnetels en bramen, en pas jaren later weer bomen. Is dit primaire of secundaire successie? En waardoor verdwijnen de brandnetels later weer? | Secundair; jonge bomen geven schaduw, brandnetels verliezen de concurrentie om licht. |

Geen checkvragen in examenstijl op de pagina.

## Begrippen
Statische lijst in de docentenhandleiding (geen vwo-markering; hele film is 4 vwo).

- Organische · anorganische stof — Energierijke koolstofverbinding uit organismen · energiearme stof zoals CO₂, water en mineralen.
- Producent · consument — Maakt organische stoffen met fotosynthese · haalt organische stoffen uit andere organismen.
- Detritus · detrituseter — Dode resten en uitwerpselen · dier dat detritus eet en verkleint.
- Reducent — Bacterie of schimmel die dode organische stof afbreekt tot anorganische stoffen.
- Voortgezette assimilatie — Van glucose en mineralen andere organische stoffen maken, zoals eiwitten.
- Dissimilatie — Afbraak van organische stoffen in cellen om energie vrij te maken.
- Veen · turf · compost — Onvolledig afgebroken plantenresten · gestoken en gedroogd veen · door reducenten afgebroken organisch afval.
- Trofisch niveau — Plaats in de voedselketen: producent, consument van de eerste, tweede orde, enzovoort.
- Piramide van aantallen · biomassa · energie — Individuen per niveau · organische stof op één moment · energie per jaar (altijd smaller naar boven).
- Biomassa · drooggewicht — Massa van de organische stoffen · massa nadat al het water is verdampt.
- Energiestroomschema — Schema van de energie die per niveau binnenkomt, wordt doorgegeven, wordt verbruikt of naar reducenten gaat.
- Rendement van de fotosynthese — Vastgelegde energie gedeeld door opvallende lichtenergie, × 100%.
- Bruto · netto primaire productie — Wat producenten per jaar vastleggen · wat daarvan overblijft na hun eigen dissimilatie.
- Warmbloedig — Houdt de lichaamstemperatuur constant met warmte uit dissimilatie.
- Oppervlakte-inhoudsverhouding — Lichaamsoppervlak gedeeld door volume; groot bij kleine dieren.
- Koolstofreservoir · gigaton — Plaats waar koolstof is opgeslagen: lucht, organismen, bodem, oceaan of gesteente · duizend miljard kilo (10¹² kg).
- Voorraad · stroom — Hoeveelheid op één moment, in Gt C · hoeveelheid die per tijd verplaatst, in Gt C per jaar.
- Broeikasgas · positieve terugkoppeling — Gas dat warmte in de atmosfeer vasthoudt, zoals CO₂ · effect dat zijn eigen oorzaak versterkt.
- Koolstofkringloop — Rondgang van koolstof tussen atmosfeer, organismen, bodem, oceanen en gesteenten.
- Fossiele brandstof — Steenkool, aardolie en aardgas: koolstof uit organismen van miljoenen jaren geleden.
- Beperkende factor — De factor die het sterkst tekortschiet en daardoor de groei bepaalt.
- Wortelknolletje · mutualisme — Verdikking aan de wortel van een peulvruchtplant met stikstoffixerende bacteriën · samenleving waarbij beide partners voordeel hebben.
- Ureum — Stikstofhoudende afvalstof die de lever maakt uit overtollige aminozuren; verlaat het lichaam met de urine.
- Stikstoffixatie — Stikstofgas omzetten in bruikbare stikstofverbindingen, door bacteriën of bliksem.
- Ammonificatie · nitrificatie — Eiwitten en ureum omzetten in ammonium · ammonium met zuurstof omzetten in nitriet en nitraat.
- Denitrificatie · anammox — Zonder zuurstof nitraat omzetten in stikstofgas · zonder zuurstof ammonium en nitriet omzetten in stikstofgas.
- Uitspoeling — Wegspoelen van opgeloste mineralen zoals nitraat naar grond- en oppervlaktewater.
- Rwzi · beluchtingstank — Rioolwaterzuiveringsinstallatie · stap waarin aerobe bacteriën met toegevoegde lucht organische stoffen afbreken.
- Eutrofiëring — Verrijking van water met voedingsstoffen zoals nitraat en fosfaat.
- Successie · climaxecosysteem — Geleidelijke verandering van de soortensamenstelling · eindstadium dat zonder verstoring stabiel blijft.
- Primaire · secundaire successie — Op kale grond zonder humus · na een verstoring, op een bodem met humus en zaden.
- Pioniersoort — Soort die zich als eerste vestigt, extreme omstandigheden verdraagt en zich snel verspreidt.
- Exoot · invasieve exoot — Soort die door de mens buiten haar gebied is terechtgekomen · exoot die zich snel uitbreidt en inheemse soorten verdringt.

## Docentdeel
"Docentenhandleiding" onder de speler: 24 leerdoelen (H8-1 t/m H8-19 uit het document *Leerdoelen en leerstof Nectar 4 vwo H6 en H8*, plus vijf met † die verder gaan dan de leerstof); aansluiting op Nectar H8 met een koppeltabel hoofdstuk ↔ paragraaf ↔ leerdoelen en een lijst van bewust andere voorbeelden dan de hoofdstuktoetsen (ree met teken, myxomatose, akkerbouwer, Kootwijkerzand, Amerikaanse vogelkers); pauzevragen met antwoord en doorvragen; twaalf misconcepties (o.a. planten dissimileren alleen 's nachts, energie gaat rond, Gt CO₂ = Gt C, stikstof in de lucht is vervuiling); "Wat de film vereenvoudigt" (21 punten met getallen en bronnen: samenstelling ree 64/31/5 %, ademteug ~6000 C-atomen, 10 %-vuistregel, NPP naar Whittaker, IPCC AR6-voorraden, Global Carbon Budget 5,6 → 6 Gt C/jaar, Mauna Loa 315 → 427 ppm, Haber-Bosch 160 Mt N, myxomatose 1953, wolf 3–4 kg/dag, drinkwater ~60 % grondwater); werkvormen (volg een atoom, stroomschema, rekenen met energie, kringloopkwartet, Keeling-curve, badkuipmodel, klaver); practica (bladzakjes, broomthymolblauw, biomassa, wortelknolletjes, nitraatstrips); "Uit de geschiedenis" (Yde 1897, Beijerinck 1888, Winogradsky, Haber-Bosch 1913, Lindeman 1942, Keeling 1958, anammox Delft). Bronregel: IPCC AR6, Global Carbon Budget, NOAA/Met Office, USGS, Whittaker, Vewin; kaartdata Natural Earth. Geen aparte getallentabel.

## Techniek: waar zit wat in de HTML
Regelnummers verwijzen naar film.src.html (blobs als `@@BLOB:00n.woff2@@`; in index.html staan daar de base64-lettertypen, de regelnummers zijn gelijk).

- **Tijdlijn**: regel 438, `window.TIMELINE = {chapters, cues, duration}`.
  - `chapters[]`: `num`, `title`, `start` (begin hoofdstukkaart, globale s), `narrStart` (stem begint), `end`, `hasAudio`, `beats[]` (`{s, e}` globale tijden: de stappen b0, b1, … van de scène), `pause` (`{s, qe, e, wait, q}`: kaart zichtbaar van `s` tot `e`, aftellen vanaf `qe`) of `null`.
  - `cues[]`: 376 ondertitels `{s, e, text}` in globale tijd.
- **Titelkaart/meta**: regel 1422, `window.FILMMETA` (eyebrow, titel, tagline, kringloopmotief).
- **Engine/tekenhulp** `window.FILM` regel 439–688 (`D.*` tekenfuncties, `COL` kleuren regel 448, `FONT` regel 462); kaartdata `window.GEO` regel 691; dierenbibliotheek `F.SP` regel 694–1179; overige bibliotheken tot regel 1555.
- **Scènes**: `F.scenes[n] = S => {...}` per hoofdstuk: 1 regel 1870, 2 regel 2053, 3 regel 2246, 4 regel 2381, 5 regel 2550, 6 regel 2658, 7 regel 2831, 8 regel 2913, 13 regel 3115, 14 regel 3262, 9 regel 3502, 10 regel 3809, 11 regel 4056, 12 regel 4391 (volgorde in het bestand wijkt af). Eén functie per hoofdstuk, alles als pure functie van de tijd. Hulpfuncties uit `makeS()` (regel ± 4450): `S.t` = tijd sinds `narrStart`; `S.p(i)` / `S.win(i, j)` / `S.frac(i)` = voortgang op beat i; `S.q(k)` / `S.qw(k, j)` = voortgang op de k-de ondertitelcue van het hoofdstuk; `S.pause` = tijd sinds begin pauzekaart (de scène dimt dan via `pauseA`). De timing hangt dus aan `beats` en `cues`, die weer aan de ene take hangen.
- **Speler**: regel 4409–4581. Klok = `audio.currentTime` van de ene `narration.mp3`; `render(T)` kiest hoofdstuk, scène, titelkaart, ondertitel en pauzekaart. Bediening: afspelen, tijdbalk met hoofdstukstreepjes, CC, snelheid 0,85×/1×/1,15×, volledig scherm, toetsen spatie/←/→/C/F. Geen Leerling/Klas, geen Havo/Vwo, geen automatische stop bij pauzes. Er is een ongebruikt element `.silent-note` ("Stem volgt nog · ondertitels lopen door").
- **Pagina-tekst** (kop, hoofdstukken, gebruik, handleiding) statische HTML regel 160–436.

## Zo pas je deze film aan
1. **Alles hangt aan één take**: tekst wijzigen = nieuwe `narration.mp3` en dan `chapters[].start/narrStart/end/beats/pause` én alle `cues` vanaf dat punt opnieuw zetten. Een kortere of langere zin verschuift alle latere hoofdstukken. Praktisch: knip de take per hoofdstuk, vervang één stuk en schuif alle latere tijden met het verschil op.
2. **Typfout in een ondertitel**: alleen `cues[].text` aanpassen; tijden laten staan.
3. **Scène aanpassen**: werk in `F.scenes[n]`; bepaal welke beat (`b3` in het commentaar = `S.p(3)`) of welke cue (`S.q(k)`, k = volgnummer van de ondertitel binnen het hoofdstuk) het moment stuurt. Cue-indexen schuiven als je ondertitels splitst of samenvoegt.
4. **Pauzevraag wijzigen**: `chapters[].pause.q` (kaart) en de bijbehorende `<details>` in "Pauzevragen met antwoord" (staat los). Duur van de kaart = de stilte in de audio (`pause.s`–`pause.e`); een langere vraag vraagt een langere stilte in de take.
5. **Tekst in de titelkaart**: `window.FILMMETA` (regel 1422); hoofdstuktitels in `chapters[].title`.

## Aandachtspunten
- Ouder ontwerp, wijkt af van de huidige prompt (v4/Part C): eigen look (geen Part C-tokens, geen vaste UI-laag), geen voorspelvragen met opties, geen Leerling/Klas, geen Havo/Vwo, geen typekolom en geen getallentabel met bronnen per getal in het docentdeel, geen checkvragen in examenstijl, geen versie/datum en geen ElevenLabs-model vermeld.
- De pauzemomenten stoppen de film niet vanzelf; zonder klik op "Pauzeer hier" loopt de film na ~15–20 s stilte door.
- De terugknop wijst sinds 2026-10-12 naar de hoofdstukpagina Ecologie (`../../../index.html#ecologie`). Deel 1 *Plek genoeg?* staat ernaast in `films/ecologie/plek-genoeg/`.
- De voetregel noemt zusterfilms *Alles beweegt*, *Alles op zijn plek*, *Eén wordt twee* en *Precies op tijd*; alleen *Precies op tijd* (nu *Van bevruchting tot baby*) staat in de repo.
- `TIMELINE.duration` (1484,055 s) is 0,04 s korter dan het mp3-bestand; onschuldig.

## Wachtlijst opnieuw inspreken

Aanvullingen 15-10-2026 na de vergelijking met Gewoon Uitgelegd (tekst staat als [nieuw] in `script.md`). Eén doorlopende take (`narration.mp3`): hoofdstuk 2 en 12 opnieuw inspreken, het stuk terugknippen in de take en daarna `chapters[].start/narrStart/end/beats/pause` en alle `cues` vanaf H2 opschuiven met het duurverschil (samen ca. +45 s; zie "Zo pas je deze film aan", punt 1). Nieuwe zinnen krijgen eigen `cues`, dus de cue-indexen (`S.q(k)`) in `F.scenes[2]` en `F.scenes[12]` na de invoeging schuiven op (punt 3).

- **H2 Opruimers** (`F.scenes[2]`): na "andere organische stoffen van, zoals eiwitten" komen autotroof en heterotroof (2 zinnen, ca. 9 s). Valt in beat b2–b3; b3 (stroomschema) en latere beats schuiven op, de pauzekaart van H2 ook.
- **H12 Stikstof gaat rond** (`F.scenes[12]`): na "zuurstof voor nodig" komen nitrificerende bacteriën als chemo-autotroof (2 zinnen, ca. 8 s, eind van beat b4); na "spoelt makkelijk uit naar het grondwater" één scène over lading: ammonium hecht aan klei en humus, nitraat spoelt uit, ammoniak is een gas (5 zinnen, ca. 22 s, eind van beat b5). Beats b5–b7, de pauzekaart van H12 en alle hoofdstukken erna (H13, H14) schuiven op.
- **Beeld nodig**: in het stroomschema van H2 labels "autotroof" bij de producent en "heterotroof" bij de andere groepen; bij de nitrificerende bacteriën een label "chemo-autotroof: energie uit ammonium → nitraat, niet uit licht" (met een doorgestreept zonnetje). Nieuwe beat in H12: bodemdeeltje klei/humus met min-tekens, NH₄⁺ (plus) blijft eraan plakken, NO₃⁻ (min) zakt met regendruppels naar het grondwater, NH₃ als gas (pijl omhoog uit de mesthoop). Ladingen in beeld als + en − (stikstof blauw volgens `COL`).
- **Begrippenlijst** (docentenhandleiding, statische HTML): "Autotroof · heterotroof" en "Chemo-autotroof" toevoegen.
- **Risicowoorden (uitspraaktest)**:
  - *autotroof* — IPA /ˌɑu̯.toːˈtroːf/ (au-to-TROOF, klemtoon op de laatste lettergreep). Online geen Nederlandse IPA-transcriptie gevonden (Wiktionary NL/EN, Woorden.org en kaikki.org geven alleen betekenis of een geluidsbestand); IPA afgeleid uit het Nederlandse klemtoonpatroon van leenwoorden op -troof (vgl. catastrofe, filosoof). Stem-invoer: "autotroof" zoals geschreven; valt de klemtoon op "au", dan "auto-troof".
  - *heterotroof* — IPA /ˌɦeː.tə.roːˈtroːf/ (he-te-ro-TROOF). Stem-invoer: "heterotroof"; bij een verkeerde klemtoon "hetero-troof".
  - *chemo-autotroof* — IPA /ˌɣeː.moː.ɑu̯.toːˈtroːf/, ch als g (zoals in "chemie"). Risico: ElevenLabs leest "chemo" als Engels "kee-mo". Stem-invoer: "geemo-autotroof".
  - *ammoniak*, *ammonium*, *nitraat*, *humus* staan al in de film en tellen niet mee.

## Wijzigingen
- 15 okt 2026 — Speler: de knop Vragen aan/uit (onthouden in `bk-vragen`, ook `?vragen=uit`) werkt nu altijd, ook na spoelen, in pauze en als je hem halverwege omzet. Bij Vragen uit vallen weg: de vraag zelf, de gesproken vraagzin(nen) ervoor (zinnen op '?', 'Wat denk je?', 'Denk even na.', 'Eerst een voorspelling.') en een los antwoord direct erna ('Antwoord B.', 'Ja.', 'Nee.', 'Precies.'); gewone uitlegzinnen blijven staan. De tijdbalk, tijd en hoofdstuktijden tonen de ingekorte duur. Code: `bkBouw()` maakt `BK.k` (stukken die de speler overslaat); regelnummers in de spelercode zijn daardoor een paar regels verschoven. Hoofdstukkaart 2,2 s in plaats van 3,1 s: de speler slaat het stille midden van de kaart over (narration.mp3 ongewijzigd); het gouden streepje loopt mee met de kortere kaart.

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

Helper `D.label()` in de engine: met `o.from` tekent hij geen lijntje + stip meer, maar zet de naam direct naast dat punt, aan de kant waar de lijn vroeger heen liep, met een donkere rand rond de letters. Geldt voor paddenstoel, pissebedden, Yde, begint/eindigt bij…, veen/bruinkool/steenkool/aardolie, kalksteen, ammonium, lever. Losse aanpassingen: 'eindigt bij een dier dat niet gegeten wordt' boven het niveauvak (gap 50), 'drievoudige binding' direct onder de N≡N (Kamiel: "die lijntjes naar begrippen moeten sowieso weg"; zie `films/BEELDAFSPRAKEN.md`). Gecontroleerd op contactbladen. Regelnummers elders in dit bestand kunnen een paar regels verschoven zijn.
