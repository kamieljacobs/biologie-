# Plek genoeg? — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/ecologie/plek-genoeg/index.html (audio: films/ecologie/plek-genoeg/narration.mp3) |
| Reeks / nummer | Ecologie deel 1 (soorten en populaties) — tweeluik met *Alles gaat rond* (deel 2) |
| Tagline | De wolf is terug in Nederland. Wat bepaalt of een soort ergens past? |
| Doelgroep / niveau | 4 vwo, Nectar 4 vwo H6 *Soorten en populaties*; op de site ook bij havo thema 7 Ecologie; geen havo/vwo-splitsing in de film |
| Versie / datum | onbekend (niet in de HTML); op de site gezet 2026-10-12 |
| Stem / model | Roos (ElevenLabs) volgens de reeks; model onbekend (niet in de HTML) |
| Duur | 19:35 (`TIMELINE.duration` 1174.565 s; narration.mp3 1174.6 s) |
| Beeldstijl | Ouder eigen ontwerp ("Uitgelegd"-engine, zelfde als *Alles gaat rond*): canvas 1600×900, platte geometrische natuurtekeningen en kaarten (Natural Earth). Niet volgens de stijlkaart (Part C) |
| Audio-opslag | Eén doorlopende take, `narration.mp3` naast de HTML (`<audio id="narration" src="narration.mp3">`); niet ingebed. In de HTML zitten 7 blobs (lettertypen) als base64 |
| Herkomst | Overgenomen van het Claude-artifact *Plek genoeg?* (2026-10-12); bronmap gereconstrueerd uit de gepubliceerde HTML |

## Opbouw
Begintijd = begin hoofdstukkaart; `narrStart` = stem begint. Type-letters uit de prompt staan niet in de HTML.

| Begin | Stem | Hoofdstuk | Beats | Pauze |
|---|---|---|---|---|
| 0:00 | 0:05 | 1 Terug na 150 jaar | 6 | — |
| 0:58 | 1:01 | 2 Wolf of hond? | 7 | ja, 2:15 |
| 2:35 | 2:38 | 3 Twee namen | 9 | ja, 4:25 |
| 4:51 | 4:55 | 4 Van één roedel naar veertien | 9 | ja, 6:22 |
| 6:51 | 6:55 | 5 Vol is vol | 6 | — |
| 7:53 | 7:56 | 6 Een roofdier erbij | 8 | ja, 9:34 |
| 9:55 | 9:58 | 7 Wie eet wie | 9 | — |
| 11:31 | 11:34 | 8 Samenleven | 8 | ja, 12:47 |
| 13:11 | 13:14 | 9 Ieder zijn vak | 7 | — |
| 14:12 | 14:15 | 10 Bijna overal | 7 | ja, 15:25 |
| 15:52 | 15:56 | 11 Verklikkers | 10 | — |
| 17:31 | 17:34 | 12 Waar niemand anders kan | 8 | ja, 19:04 |

## Vragen
Geen meerkeuze-voorspelvragen. 7 open pauzevragen: kaart "Pauzemoment" met aftelring en knop "Pauzeer hier"; de film pauzeert niet vanzelf, de audio heeft op die plek stilte. Antwoorden in de docentenhandleiding.

| Plek | Vraag op de kaart (`pause.q`) | Antwoord (handleiding) |
|---|---|---|
| H2, 2:15 | Een leeuw en een tijger krijgen in een dierentuin samen jongen, en sommige daarvan zijn vruchtbaar. Zijn leeuw en tijger daarom één soort? | Nee. Het biologisch soortbegrip gaat over natuurlijke omstandigheden. In het wild paren leeuwen en tijgers niet met elkaar; zulke hybriden (ligers) ontstaan alleen in gevangenschap. Bovendien zijn de mannetjes onvruchtbaar. |
| H3, 4:25 | Een zeehond lijkt van buiten op een dolfijn. Toch reageren antistoffen tegen zeehondeneiwitten veel sterker met bloedplasma van een beer dan met dat van een dolfijn. Wat zegt dat over de verwantschap? En waarom misleidt het uiterlijk hier? | Meer neerslag betekent dat de eiwitten meer op elkaar lijken, dus dat de soorten nauwer verwant zijn: de zeehond is nauwer verwant aan de beer. Zeehonden horen bij de roofdieren, dolfijnen zijn verwant aan evenhoevigen. De gestroomlijnde vorm is een aanpassing aan zwemmen die in beide groepen apart is ontstaan. Doorvraag: waarom deelde Linnaeus op uiterlijk in, en waarom is dat hier riskant? |
| H4, 6:22 | Een populatie bevers telt vierhonderd dieren. In een jaar worden er honderdtwintig geboren, gaan er zestig dood, komen er tien bij en vertrekken er dertig. Bereken de groeisnelheid in procenten en de verdubbelingstijd. | Groei = (120 + 10) − (60 + 30) = 40 bevers. Groeisnelheid = 40 / 400 × 100% = 10% per jaar. Verdubbelingstijd ≈ 70 / 10 = 7 jaar (exact 7,3 jaar). |
| H6, 9:34 | Bekijk de grafiek van de moeflons op de Hoge Veluwe. Welke conclusie mag je eruit trekken? En welke verklaring volgt er níet uit? | Conclusie: na de komst van de wolf in 2021 daalde het aantal vrij levende moeflons snel, tot nul eind 2022. Dat de wolf de moeflons heeft gedood, volgt niet uit de grafiek: die laat alleen zien dat beide tegelijk gebeurden. Daarvoor heb je ander bewijs nodig, zoals gevonden prooiresten met wolven-DNA, en het uitsluiten van andere oorzaken zoals ziekte of afschot. |
| H8, 12:47 | Een gaai verstopt in de herfst eikels in de grond, en vergeet er een deel. Uit die vergeten eikels groeien nieuwe eiken. Wat voor relatie hebben gaai en eik? En een vlo en een vos? | Gaai en eik: mutualisme (+/+). De gaai eet eikels, de eik wordt verspreid. Vlo en vos: parasitisme (+/−). Doorvraag: kun je het ook verdedigen als predatie? Voor één eikel wel, voor de soort als geheel niet. |
| H10, 15:25 | In de tabel staan de tolerantiegrenzen van drie soorten voor zuurstof en temperatuur. Welke soorten kunnen leven in een beek met 6 mg zuurstof per liter en een temperatuur van 19 °C? | De eendagsvlieglarve (5–14 mg/L, 4–22 °C) en de rode muggenlarve (1–14 mg/L, 4–30 °C). De steenvlieglarve niet: zowel het zuurstofgehalte (minimaal 7 mg/L) als de temperatuur (maximaal 18 °C) ligt buiten haar tolerantiegrenzen. Eén factor was al genoeg geweest. De waarden in de tabel zijn voorbeeldwaarden. |
| H12, 19:04 | 1. Leg met de begrippen tolerantie en concurrentie uit waarom stikstof uit de lucht de zonnedauw laat verdwijnen. 2. Noem een abiotische en een biotische factor die bepalen hoeveel wolven er op de Veluwe kunnen leven. | 1. Zonnedauw tolereert een natte, zure en stikstofarme bodem, waar weinig andere planten kunnen leven: weinig concurrentie. Met extra stikstof valt de bodem binnen de tolerantiegrenzen van snelgroeiende grassen. Die worden hoger en nemen het licht weg, zodat de zonnedauw de concurrentie verliest. 2. Abiotisch bijvoorbeeld de oppervlakte van het gebied, of strenge winters. Biotisch bijvoorbeeld het aantal prooidieren, concurrentie met andere wolven om territoria, ziekten zoals schurft, en de mens (verkeer). |

## Begrippen
Statische lijst in de docentenhandleiding.

- Soort — Groep organismen die onder natuurlijke omstandigheden samen vruchtbare nakomelingen kan krijgen.
- Hybride — Nakomeling van ouders van twee verschillende soorten, vaak onvruchtbaar.
- Ggo — Genetisch gemodificeerd organisme: DNA veranderd met biotechnologie.
- Binominale naamgeving — Wetenschappelijke naam uit geslachtsnaam en soortaanduiding.
- Taxonomie · taxon — Het benoemen en indelen van organismen · een groep in die indeling.
- Domein — Hoogste indelingsgroep: bacteriën, archaea en eukaryoten.
- Verwantschap — Hoe recenter de laatste gemeenschappelijke voorouder, hoe nauwer.
- Immunologische verwantschapsbepaling — Meten hoe sterk antistoffen tegen eiwitten van de ene soort reageren met die van een andere.
- Populatie — Individuen van één soort in hetzelfde gebied die zich onderling voortplanten.
- Populatiegroei — (geboorte + immigratie) − (sterfte + emigratie).
- Groeisnelheid — Groei per jaar als percentage van de beginpopulatie.
- Verdubbelingstijd — Regel van 70: 70 gedeeld door de groeisnelheid in procenten.
- Beperkende factor — De factor die als eerste tekortschiet en zo de groei remt.
- Draagkracht — Grootste populatie die een gebied op lange termijn kan onderhouden.
- Herintroductie — Een soort terugzetten in een gebied waar die verdwenen was; een vorm van natuurbeheer.
- Voedselketen · voedselweb — Reeks organismen die elkaar eten · alle ketens in een gebied samen.
- Herbivoor · carnivoor · omnivoor — Planteneter · vleeseter · alleseter.
- Persistentie — Eigenschap van een stof die moeilijk afbreekt.
- Accumulatie — Ophoping van een stof in een organisme, hoger verderop in de keten.
- Symbiose — Langdurig nauw samenleven: mutualisme (+/+), commensalisme (+/0), parasitisme (+/−).
- Competitie · predatie · verstoring — −/− · +/− (doden en eten) · 0/−.
- Habitat · niche — De plek waar een soort leeft · de hele manier van leven.
- Abiotische · biotische factor — Niet-levende factor · invloed van andere organismen, ook de mens.
- Tolerantiegrenzen · optimum — Laagste en hoogste waarde waarbij een soort kan leven · gebied waar hij het best gedijt.
- Indicatorsoort — Soort met een smalle tolerantie, waarvan aan- of afwezigheid iets zegt over het milieu.
- Eutrofiëring — Verrijking van water met voedingsstoffen, waardoor soorten van voedselarm water verdwijnen.
- Adaptatie — Erfelijke eigenschap die een organisme geschikt maakt voor zijn milieu.
- Soortendiversiteit — Het aantal verschillende soorten in een gebied.

## Docentdeel
"Docentenhandleiding" onder de speler met de onderdelen: Leerdoelen, Aansluiting op de methode, Pauzevragen met antwoord, Misconcepties die de film aanpakt, Wat de film vereenvoudigt, Begrippen, Werkvormen, Practica, Uit de geschiedenis.

Leerdoelen:

- het biologisch soortbegrip uitleggen en ermee beredeneren of twee groepen organismen tot dezelfde soort horen H6-1 ;
- een kruisingsexperiment beschrijven waarmee je toetst of een ggo nog tot dezelfde soort hoort H6-2 ;
- de opvattingen van Linnaeus over soorten en indeling vergelijken met die van moderne biologen H6-3 ;
- uit de uitkomst van een immunologische verwantschapsbepaling afleiden welke soorten het nauwst verwant zijn H6-4 ;
- de groei van een populatie berekenen uit geboorte, sterfte, immigratie en emigratie, ook als percentage H6-5 ;
- met de regel van 70 de verdubbelingstijd berekenen, en uitleggen waarom dat een benadering is H6-6 ;
- uitleggen wat een beperkende factor en draagkracht zijn, en in een context aangeven welke factor de populatie beperkt H6-7 ;
- uitleggen hoe het (her)introduceren van een predator doorwerkt op de prooipopulatie en de vegetatie H6-8 ;
- uit een diagram een conclusie trekken die door de gegevens wordt ondersteund, en die onderscheiden van een verklaring die er niet uit volgt H6-14 ;
- in een voedselweb producenten, herbivoren, carnivoren en omnivoren aanwijzen H6-15 ;
- persistentie en accumulatie uitleggen en toepassen op stoffen als pcb in een voedselketen H6-17 ;
- relaties tussen soorten benoemen: predatie, competitie, mutualisme, commensalisme, parasitisme en verstoring H6-16 ;
- uitleggen wat habitat en niche zijn, en uit gegevens afleiden dat soorten verschillende niches bezetten H6-12 ;
- biotische en abiotische factoren onderscheiden, en met tolerantiegrenzen uit een tabel afleiden waar een soort kan leven H6-9, H6-10 ;
- uitleggen wat een indicatorsoort is en voorspellen waar die wel of niet voorkomt H6-11 ;
- uitleggen welk voordeel een adaptatie aan extreme omstandigheden een soort oplevert H6-13 ;
- inzien dat de regel van 70 bij snelle groei minder goed klopt: bij 20% per jaar duurt verdubbelen 3,8 jaar in plaats van 3,5 † .

## Techniek: waar zit wat in de HTML
Regelnummers verwijzen naar film.src.html (uitpakken met `scripts/filmbron.py`; in index.html staan op de `@@BLOB@@`-plekken de base64-lettertypen, de regelnummers zijn gelijk).

- **Tijdlijn**: regel 412, `window.TIMELINE = {chapters, cues, duration}` — 12 hoofdstukken, 282 ondertitels `{s, e, text}` in globale tijd. `chapters[]`: `num`, `title`, `start`, `narrStart`, `end`, `hasAudio`, `beats[]` (`{s, e}`), `pause` (`{s, qe, e, wait, q}`) of `null`.
- **Titelkaart/meta**: regel 1396, `window.FILMMETA` (eyebrow, titel, tagline, motief).
- **Engine/tekenhulp**: `window.FILM` regel 658; kaartdata `window.GEO` regel 665.
- **Scènes**: `F.scenes[n] = S => {...}` per hoofdstuk: 1 regel 1550, 2 regel 1659, 3 regel 1815, 4 regel 2072, 5 regel 2199, 6 regel 2324, 7 regel 2466, 8 regel 2636, 9 regel 2766, 10 regel 2855, 11 regel 2979, 12 regel 3200. Hulpfuncties uit `makeS()` (regel 3368): `S.t`, `S.p(i)` / `S.win(i, j)` (voortgang op beat i), `S.q(k)` (voortgang op de k-de ondertitel van het hoofdstuk), `S.pause`.
- **Speler**: vanaf regel 3331. Klok = `audio.currentTime` van `narration.mp3`.
- **Pagina-tekst** (kop, hoofdstukken, gebruik, docentenhandleiding): statische HTML tot regel 411.
- **Sitebalk** "← Terug naar Ecologie": `<nav class="sitenav">` direct na `<body>` (toegevoegd voor de site).

## Zo pas je deze film aan
1. **Alles hangt aan één take**: tekst wijzigen = nieuwe `narration.mp3` en dan `chapters[].start/narrStart/end/beats/pause` én alle `cues` vanaf dat punt opnieuw zetten. Praktisch: knip de take per hoofdstuk, vervang één stuk en schuif alle latere tijden op met het verschil.
2. **Typfout in een ondertitel**: alleen `cues[].text` aanpassen; tijden laten staan.
3. **Scène aanpassen**: werk in `F.scenes[n]`; bepaal welke beat (`S.p(i)`) of welke cue (`S.q(k)`) het moment stuurt. Cue-indexen schuiven als je ondertitels splitst of samenvoegt.
4. **Pauzevraag wijzigen**: `chapters[].pause.q` en de bijbehorende `<details>` onder "Pauzevragen met antwoord". Duur van de kaart = de stilte in de audio.
5. **Titelkaart**: `window.FILMMETA`; hoofdstuktitels in `chapters[].title` én in de statische lijst "Hoofdstukken".

## Aandachtspunten
- Ouder ontwerp, wijkt af van de huidige prompt (stijlkaart/Part C): geen voorspelvragen met opties, geen Leerling/Klas, geen Havo/Vwo, geen versie/datum en geen ElevenLabs-model vermeld.
- De pauzemomenten stoppen de film niet vanzelf.

## Wachtlijst opnieuw inspreken

Aanvullingen 15-10-2026 na de vergelijking met Gewoon Uitgelegd (tekst staat als [nieuw] in `script.md`). Eén doorlopende take: hoofdstuk 5, 8 en 9 opnieuw inspreken, terugknippen in `narration.mp3` en alle latere `chapters[]`/`cues`-tijden opschuiven (samen ca. +45 s).

- **H5 Vol is vol**: J-curve en exponentiële groei; dichtheidsafhankelijke geboorte en sterfte; overshoot boven de draagkracht.
- **H8 Samenleven**: vraat (ree en jonge eik) met afweer van planten (stekels, looizuren).
- **H9 Ieder zijn vak**: concurrentie binnen een soort is het felst (twee wolven = zelfde niche).
- **Beeld nodig**: J-curve naast de S-curve; ree bij jonge eik (met braam); twee wolven tegenover elkaar.
- **Risicowoorden (uitspraaktest)**: J-curve (stem-invoer voorstel “jee-curve”, de letter J is /jeː/), exponentiële, looizuren.

