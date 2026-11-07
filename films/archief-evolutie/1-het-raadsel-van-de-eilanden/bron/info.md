# Het raadsel van de eilanden — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/archief-evolutie/1-het-raadsel-van-de-eilanden.html |
| Reeks / nummer | Evolutie, deel 1 van 9 (eyebrow "Biologie · Evolutie · deel 1") |
| Doelgroep / niveau | 5/6 vwo (badge op de pagina); één niveau, geen havo/vwo-schakelaar of vwo-blokken |
| Versie / datum | versie 0.2 · 4 oktober 2026 (footer) |
| Stem / model | Roos (ElevenLabs, eleven_multilingual_v2) |
| Duur | 7:11 (430,99 s; blob 001.mp3, gelijk aan `TL.total` = 430.99) |
| Beeldstijl | ouder eigen ontwerp, vóór Part C: canvas 1920×1080, donkerblauwe ondergrond (#0F1B2D), Literata + Public Sans, amber als accentkleur, platte vereenvoudigde tekeningen; wereldkaart met de route van de Beagle (camera `camAt` zoomt van wereld naar Argentinië, Patagonië, Galápagos en Indonesië), silhouetdieren op schaal, een papieren notitieboek "Aanwijzingen" dat in elk hoofdstuk aangroeit |
| Audio-opslag | één doorlopende take: 1 mp3 (blob 001.mp3, als base64 data-URI in `au.src`) met 20 gesproken stukken ("takes") en de stiltes voor titel-, hoofdstuk- en eindkaarten en vragen al ingebakken |
| Reconstructie | 2026-10-12, uit de gepubliceerde HTML |

## Opbouw
Hoofdstukken zoals in `CH` (de knoppen onder de speler). Hoofdstuktype volgens het docentdeel: G (redeneren langs een historische ontdekking) met een vleugje F.

| Begin | Hoofdstuk | Takes | Vraag | Kernbeeld |
|---|---|---|---|---|
| 0:00 | Het raadsel (cold open) | t1_coldopen | – | merel, "Soorten veranderen niet. PUNT", vraag in beeld "Wat zou je moeten zien om te twijfelen?" |
| 0:20 | Darwin aan boord | t2_darwin | – | wereldkaart, Beagle vertrekt uit Plymouth; portret Charles Darwin, 22 jaar, kevers verzamelen |
| 0:35 | Aanwijzing 1 · de fossielen | t3_fossielen, t4_levend, t5_payoff | q1 | grondprofiel Punta Alta: Glyptodon en reuzenluiaard (met auto en olifant als maat) tegenover levend gordeldier en luiaard; vraag 1; daarna "Toeval?" en notitieboek aanwijzing 1 |
| 1:38 | Aanwijzing 2 · de nandoes | t6_nandoe_a, t7_nandoe_b | – | kaart Patagonië: grote nandoe en Darwins nandoe, grens bij de Río Negro; notitieboek aanwijzing 2 |
| 2:11 | Aanwijzing 3 · de Galápagos | t8_gal_a, t9_gal_b, t10_gal_c | q2 | inzoomen op de Galápagos: spotlijsters en reuzenschildpad (koepel- of zadelschild) per eiland; vraag 2; vergelijking met het vasteland; aanwijzing 3 |
| 3:17 | "I think" | t11_schets_a, t12_schets_b, t13_schets_c | q3 | Engeland 1837: notitieboek met drie aanwijzingen; vraag 3; de "I think"-schets als vertakkende boom; aanwijzingen afgevinkt |
| 4:15 | De vinken, achteraf | t14_vinken | – | Londen, John Gould: 13 soorten vinken, notenkraker tegenover pincet, "alleen hier" |
| 4:46 | Twintig jaar stilte | t15_stilte | – | het boek, twintig jaar; Malthus (bevolking tegenover voedsel); duivenfokkers |
| 5:12 | De tweede speurder: Wallace | t16_wallace_a, t17_wallace_b, t18_wallace_c | q4 | Alfred Russel Wallace: Amazone, schip in brand; Indonesische archipel, Bali en Lombok, Wallacelijn; vraag 4; brief vanaf Ternate |
| 6:27 | Twee speurders, één antwoord | t19_slot_a, t20_slot_b | – | Darwin en Wallace samen voorgelezen 1 juli 1858, boek 1859; "Maar hoe?" met notenkraker en pincet als brug naar deel 2 |

Kaarten (tekst in `CARDS`): title = "Het raadsel van de eilanden" / "Evolutie · deel 1"; card1 = "Aanwijzing 1" / "De fossielen van Argentinië"; card2 = "Aanwijzing 2" / "De nandoes"; card3 = "Aanwijzing 3" / "De Galápagos"; card4 = "I think" / "Engeland, 1837"; card5 = "De vinken" / "achteraf"; card6 = "Twintig jaar stilte"; card7 = "De tweede speurder" / "Alfred Russel Wallace"; card8 = "Twee speurders" / "één antwoord"; end = "Wordt vervolgd" / "Deel 2 · Het mechanisme" / "Darwin en Wallace vonden hetzelfde antwoord. En het is verrassend simpel.".

## Vragen
Alle vragen zijn voorspelvragen die de film onderbreken (segment `q`, 11,5 s stilte in de audio). Er zijn geen aparte controlevragen. Niveau: allemaal 5/6 vwo.

**q1** · 1:06.6 · hoofdstuk "Aanwijzing 1 · de fossielen" · na take t4_levend  
Stel: elke soort is apart gemaakt en verandert nooit. Wat verwacht je dan bij een fossiel van een reuzenluiaard?  
- A. De kleine luiaard is een gekrompen reus die zich heeft aangepast. — feedback: "Individuen krimpen niet en passen zich niet aan tot een nieuwe soort. Dat idee komt in deel 2 terug."
- B. Precies daar leeft nu een klein dier dat er sterk op lijkt. — feedback: "Dat is wat Darwin vónd. Maar het oude idee voorspelt het niet, en dat is precies het raadsel."
- C. De plek zegt niets: de levende soorten daar hoeven er niet op te lijken. **(juist)** — feedback: "Klopt. Als soorten los van elkaar gemaakt zijn, voorspelt de plek niets."

**q2** · 2:46.5 · hoofdstuk "Aanwijzing 3 · de Galápagos" · na take t9_gal_b  
Stel: het klimaat bepaalt hoe een dier eruitziet. Op welke dieren lijken de Galápagos-dieren dan het meest?  
- A. Op dieren van andere tropische eilanden met hetzelfde klimaat. **(juist)** — feedback: "Klopt. Dat voorspelt het klimaat-idee. Kijk nu wat Darwin écht zag."
- B. Op dieren van het Zuid-Amerikaanse vasteland, duizend kilometer verderop. — feedback: "Dat is wat Darwin vónd. Maar het klimaat-idee voorspelt het niet. Daar wringt het."
- C. Op niets: eilanddieren zijn altijd uniek. — feedback: "Eilanddieren lijken juist wel op iets. De vraag is: op wat?"

**q3** · 3:34.1 · hoofdstuk ""I think"" · na take t11_schets_a  
Drie aanwijzingen, één verklaring. Welk idee verklaart ze alle drie tegelijk?  
- A. Het klimaat van een plek bepaalt hoe de dieren daar eruitzien. — feedback: "Dat verklaart de fossielen niet, en niet waarom de Galápagos op Zuid-Amerika lijkt en niet op andere tropische eilanden."
- B. Soorten veranderen, en soorten die op elkaar lijken hebben een gemeenschappelijke voorouder. **(juist)** — feedback: "Klopt. Dat is precies wat Darwin in 1837 in zijn notitieboek schrijft."
- C. Elke soort is apart gemaakt; de overeenkomsten zijn toeval. — feedback: "Drie keer hetzelfde toeval, op drie plekken. Dat is geen verklaring meer."

**q4** · 5:50.7 · hoofdstuk "De tweede speurder: Wallace" · na take t17_wallace_b  
Twee eilanden, vlak naast elkaar, hetzelfde klimaat. Op het ene Aziatische dieren, op het andere Australische. Wat verklaart dat het beste?  
- A. Toeval: elke soort is apart op zijn eiland gemaakt. — feedback: "Dan zou je geen scherpe lijn verwachten die precies samenvalt met de oude kustlijnen."
- B. Het klimaat: dieren passen zich aan hun omgeving aan. — feedback: "Het klimaat is op beide eilanden hetzelfde, dus dat kan het verschil niet verklaren."
- C. De geschiedenis: de eilanden hoorden bij verschillende continenten en de dieren verhuisden mee. **(juist)** — feedback: "Klopt. Afstamming en geschiedenis verklaren wat het klimaat niet kan."

## Begrippen
Begrippenlijst op de pagina (toegevoegd 16 okt 2026, sectie "Begrippen" tussen Hoofdstukken en Kleuren in deze reeks; gekozen uit wat de film zelf behandelt, definities op havo-niveau in de woorden van de film):

- **onveranderlijke soorten**: Het oude idee: elke soort is apart gemaakt en verandert nooit.
- **fossiel**: Overblijfsel of afdruk van een organisme uit het verre verleden, bewaard in de bodem of in gesteente, zoals het pantser van een Glyptodon.
- **uitgestorven**: Een soort is uitgestorven als er geen levende exemplaren meer van zijn, zoals de reuzenluiaard.
- **evolutie**: Soorten veranderen in de loop van vele generaties en nieuwe soorten ontstaan uit bestaande soorten.
- **gemeenschappelijke voorouder**: Een soort waarvan twee of meer latere soorten afstammen. Soorten die op elkaar lijken, hebben een gemeenschappelijke voorouder.
- **afstamming**: Soorten komen voort uit eerdere soorten; Darwin tekende dat als een lijn die zich steeds vertakt ("I think").
- **Darwins vinken**: Dertien vinkensoorten die alleen op de Galápagos voorkomen, met snavels van een dikke notenkraker tot een dun pincet.
- **Wallacelijn**: Scherpe grens in de Indonesische archipel tussen Aziatische en Australische dieren, ook al is het klimaat aan beide kanten gelijk. De eilanden hoorden ooit bij verschillende continenten.
- **On the Origin of Species**: Het boek van Darwin uit 1859 over het ontstaan van soorten; een jaar eerder werden de teksten van Darwin en Wallace samen voorgelezen.

Vóór 16 okt 2026 geen begrippenlijst op de pagina (onbekend, niet in de HTML). Wel een legenda "Kleuren in deze reeks":

- #F0B64A: aanwijzing, raadsel, de route van de Beagle
- #DCCBA6: uitgestorven: fossielen en botten
- #86CF86: levend, nu
- #6FB7E8: wat een idee voorspelt (en Darwins nandoe)
- #E8A0C8: Aziatische dierenwereld
- #9CD6C9: Australische dierenwereld

## Docentdeel
Uitklapblokken onder "Voor de docent". **Hoe deze film uitlegt** (letterlijk overgenomen):

- Hoofdstuktype G (redeneren langs een historische ontdekking) met een vleugje F. De as is de reis van de Beagle op een wereldkaart; de drie aanwijzingen landen op een notitieboek dat de hele film blijft groeien en in het hoofdstuk "I think" wordt afgevinkt. Het mechanisme (natuurlijke selectie) komt bewust niet aan bod; dat is deel 2. Elke voorspelvraag test een redeneerstap: wat voorspelt een idee, en klopt dat met de waarneming? Vraag 1 (fossielen) en vraag 2 (Galápagos) laten het oude idee en het klimaat-idee falen, vraag 3 laat de leerling zelf Darwins hypothese kiezen vóór de onthulling, vraag 4 herhaalt de redenering bij Wallace.
- Misvattingen die aan bod komen: individuen passen zich aan of krimpen (vraag 1, optie C); het klimaat vormt soorten rechtstreeks (vraag 2 en 4); Darwin zag "zijn" vinken en begreep het meteen (hoofdstuk De vinken); Darwin was de enige (hoofdstuk Wallace).
- Pauzemomenten voor klassikaal gebruik: na "Toeval?" (1:38), na "Elk eiland zijn eigen variant" (2:45), bij de schets "I think" (3:50), bij de Wallacelijn (6:05).

**Getallen en bronnen** (overgenomen):

| Wat | In de film | Werkelijk | Bron / opmerking |
|---|---|---|---|
| Vertrek Beagle | december 1831 | 27 december 1831, Plymouth | Darwin, *Voyage of the Beagle* |
| Leeftijd Darwin | 22 | 22 (geboren 12 feb 1809) | idem |
| Fossielen Punta Alta | 1832 | september–oktober 1832, bij Bahía Blanca | Darwin, Beagle-dagboek; de luiaardbotten waren vooral Megatherium en verwanten |
| Glyptodon | "zo groot als een auto" | ongeveer 3 m lang, ongeveer 1,5 m hoog | vereenvoudigd; niet alle pantsers die Darwin vond waren van Glyptodon |
| Reuzenluiaard | "ter grootte van een olifant" | Megatherium tot ongeveer 6 m lang, enkele tonnen | vereenvoudigd |
| Gordeldier | 30 cm | negenbandgordeldier lichaam ongeveer 40 cm, kleinere soorten kleiner | afgerond; "ongeveer" in de tekst |
| Luiaard | "een paar kilo" | 4–8 kg | afgerond |
| Nandoes | grote nandoe tot ongeveer 1,5 m; grens bij de Río Negro (ongeveer 40° Z) | Rhea americana tot 1,5 m; Rhea pennata kleiner; verspreidingsgrens ruwweg Río Negro | Darwin, Beagle-dagboek; vereenvoudigd |
| Galápagos | ongeveer 1000 km uit de kust; september 1835 | ongeveer 900–1000 km; aankomst 15 september 1835 | Darwin, Beagle-dagboek |
| Vinken | 13 soorten | 13 soorten op de Galápagos (plus 1 op Cocos); Goulds determinatie maart 1837 | Sulloway 1982 |
| Bali–Lombok | 35 km uit elkaar | Straat Lombok ongeveer 35 km breed | — |
| Wallace | Amazone 4 jaar; schip in brand; Ternate 1858; voorgelezen 1 juli 1858 | 1848–1852; brand augustus 1852; Ternate-essay februari 1858; Linnean Society 1 juli 1858 | Wallace, *My Life* |
| Kaart | vereenvoudigde kustlijnen | — | continenten zijn vereenvoudigde polygonen, gelabeld "vereenvoudigd" |

**Timing en uitspraak (QA)**: "Woordtijden zijn in deze versie geschat uit pauzedetectie en zinslengte, niet uit de timestamps van de stem. De ondertitels lopen per zinsdeel; de cues per woord kunnen enkele tienden van seconden afwijken. Bij de volledige bouw gebruiken we woordtimestamps." Daaronder een tabel die bij het laden uit `RISK` wordt gevuld (risicowoord, invoer voor de stem, tijd):

| Risicowoord | Invoer voor de stem | Take |
|---|---|---|
| Beagle | Beagle (Engelse spelling, goedgekeurd) | t2_darwin |
| Glyptodon | Glyptodon | t3_fossielen |
| gauchos | gautsjo's | t6_nandoe_a |
| Patagonië | Patagonië | t6_nandoe_a |
| Galápagos | Galápagos | t8_gal_a |
| spotlijsters | spotlijsters | t8_gal_a |
| John Gould | John Goeld | t14_vinken |
| Malthus | Maltus | t15_stilte |
| Alfred Russel Wallace | Alfred Russel Wallace | t16_wallace_a |
| Amazone | Amazone | t16_wallace_a |
| Ternate | Ternate | t18_wallace_c |
| Wallacelijn | Wallacelijn | t18_wallace_c |
| On the Origin of Species | On the Origin of Species | t19_slot_a |
| I think | I think | t12_schets_b |

Footer: "Stem: Roos (ElevenLabs, eleven_multilingual_v2). Aflevering 1, versie 0.2 · 4 oktober 2026. Kaart en dieren zijn vereenvoudigde tekeningen; alle animatie is deterministisch aan de audiotijd gekoppeld."

## Techniek: waar zit wat in de HTML
Regelnummers gelden voor `film.src.html` (uitgepakt met `scripts/filmbron.py`, 898 regels); in de gepubliceerde HTML zijn ze gelijk, omdat de blob op één regel staat.

- **Tijdlijn en tekst**: `const TL = {…}` (r. 190, één lange JSON-regel). `TL.total` = 430.99 s. `TL.takes.<id>` heeft `start`/`end` (absolute seconden in de mp3), `phrases` (ondertitels: `text`, `start`, `end`) en `words` (per woord `w`, `start`, `end`). `TL.segments` is de volgorde van 41 segmenten met `kind`: `sil` (stilte), `take` (gesproken), `card` (titel-/hoofdstuk-/eindkaart, 3,5 s; titel 4,5 s, eind 5 s) en `q` (vraag, 11,5 s).
- **Ondertitels**: `caption(t)` (r. 841) zoekt in alle `phrases` de frase met `start-0.05 ≤ t < end+0.15`. De ondertitels zijn dus precies de `phrases`-teksten.
- **Cues voor animatie**: `cue(takeId, woord, n)` (r. 217) geeft de begintijd van het n-de voorkomen van een woord in die take; alle cues staan in `const C = {…}` (r. 219). Scènes gebruiken `C.x`, `seg(id).start/end` en `ramp`/`ease` om in te faden. Alle animatie is dus aan de audiotijd (`au.currentTime`) gekoppeld; er is geen eigen klok.
- **Woordtijden zijn geschat** (docentdeel QA): uit pauzedetectie en zinslengte, niet uit timestamps van ElevenLabs. Ze kunnen enkele tienden van seconden afwijken.
- **Scènes**: `render(t)` (r. 461) kiest via `segAt(t)` het segment: kaart → `card()` met tekst uit `CARDS` (r. 457); vraag → de eindstand van de voorafgaande take, gedimd (r. 471); take → `SCENE[takeId](t)` (scènes vanaf r. 459). Camera over de wereldkaart: `camAt(t)` (r. 280).
- **Takes per scènefunctie**:
  - `t1_coldopen` → r. 474
  - `t2_darwin` → r. 491
  - `t3_fossielen` → r. 504 (`digScene`, gedeeld)
  - `t4_levend` → r. 504 (`digScene`, gedeeld)
  - `t5_payoff` → r. 555
  - `t6_nandoe_a` → r. 581 (`nandoeScene`, gedeeld)
  - `t7_nandoe_b` → r. 581 (`nandoeScene`, gedeeld)
  - `t8_gal_a` → r. 611 (`galScene`, gedeeld)
  - `t9_gal_b` → r. 611 (`galScene`, gedeeld)
  - `t10_gal_c` → r. 642
  - `t11_schets_a` → r. 663 (`sketchScene`, gedeeld)
  - `t12_schets_b` → r. 663 (`sketchScene`, gedeeld)
  - `t13_schets_c` → r. 663 (`sketchScene`, gedeeld)
  - `t14_vinken` → r. 703
  - `t15_stilte` → r. 726
  - `t16_wallace_a` → r. 753 (`wallaceScene`, gedeeld)
  - `t17_wallace_b` → r. 753 (`wallaceScene`, gedeeld)
  - `t18_wallace_c` → r. 753 (`wallaceScene`, gedeeld)
  - `t19_slot_a` → r. 796
  - `t20_slot_b` → r. 807
- **Vragen**: `QDEFS` (r. 196): `text`, `options[{k,text}]`, `correct`, `explain{k: tekst}`. Speler-logica: `QSEGS` (r. 830): aftellen van `start+1` tot `start+9` s, daarna onthulling. `gate(t)` (r. 861) pauzeert de audio op `cdEnd` tot er een antwoord is (Leerling) of tot de docent op Verder drukt (Klas), tenzij "automatisch door" aan staat. `questionUI(t)` (r. 847) tekent de opties en de feedback.
- **Audio**: `<audio id="au">`; r. 826: `au.src="data:audio/mpeg;base64,@@BLOB:001.mp3@@"`. Eén bestand; er is geen koppeling per segment, alleen de absolute tijden in `TL`.
- **Pagina-onderdelen**: hoofdstukken `CH` (r. 879), transcript `TRN` + `QAFTER` (r. 884–885; de transcripttekst wordt uit `phrases` opgebouwd), uitspraaktabel `RISK` (r. 888), docentdeel als HTML (r. 153–185), seekbalk `max` en de tijd "0:00 / …" hard in de HTML (r. 120).
- **Speler**: Leerling/Klas (`?modus=klas` in de URL zet Klas), "automatisch door", CC (C), volledig scherm (F), spatie, pijltjes ±5 s. Geen Havo/Vwo-schakelaar en geen toetsfunctie.

## Zo pas je deze film aan
1. **Tekst op het scherm**: staat als letterlijke strings in de `SCENE.<take>`-functies (zie de lijst hierboven), hoofdstuk- en eindkaarten in `CARDS`. Een wijziging daar raakt de audio niet.
2. **Ondertitel zonder audiowijziging** (bijv. tikfout): pas `text` in de juiste `phrases` aan. De transcript-tekst wordt daaruit opgebouwd. Laat `words` gelijk lopen (de `cue()`-functie zoekt daarin), anders vallen animaties terug op het begin van de take (console: "cue missing").
3. **Een zin opnieuw opnemen**: er is maar één mp3. Knip het nieuwe fragment in 001.mp3 op de plek van de oude take (de take loopt van `TL.takes.<id>.start` tot `.end`). Is de nieuwe opname even lang, dan hoef je alleen `phrases` en `words` binnen die take bij te werken. Is ze langer of korter, dan schuiven alle latere `start`/`end` in `takes`, `phrases`, `words` en `segments` met het verschil mee, en ook `TL.total`, de seekbalk (`max` en de vaste tekst "0:00 / …" in r. 120) en de tijden in het docentdeel. Daarna `python3 scripts/filmbron.py inpakken`.
4. **Een vraag aanpassen**: alleen `QDEFS` wijzigen (tekst, opties, `correct`, `explain`). De pauze in de audio (11,5 s) blijft gelijk. Een vraag erbij of eraf betekent stilte in de mp3 toevoegen of weghalen plus een `q`-segment, en `QAFTER`, `CH`-tags en de `sceneBehindQ`/`back`-koppeling aanpassen.
5. **Let op**: kaarten en vragen zijn stiltes ín de mp3, geen pauzes van de speler. Een kaart langer maken = stilte bijvoegen in de audio en alle latere tijden verschuiven. De `C`-cues rekenen zichzelf opnieuw uit, maar de scènes gebruiken ook vaste offsets na een cue (bijv. `C.x+2.0`).

## Aandachtspunten
- Gemaakt vóór Prompt v4/Part C: geen Micro/Macro/Schema-stijlkaart, geen begrippenlijst (toegevoegd 16 okt 2026), geen havo/vwo-blokken, terwijl de reeks volgens de afspraken ook voor havo bedoeld is. De badge zegt alleen "5/6 vwo".
- Woordtijden zijn geschat; het docentdeel zegt zelf "Bij de volledige bouw gebruiken we woordtimestamps". Dat is nog niet gebeurd.
- Docentdeel noemt bij de misvattingen "individuen passen zich aan of krimpen (vraag 1, optie C)", maar in `QDEFS.q1` is dat optie **A**; C is juist het goede antwoord. Tekstfout in het docentdeel.
- De pauzemomenten in het docentdeel zijn vaste tekst en wijken af van de echte tijden: "Toeval?" valt op 1:31,9 (genoemd 1:38), "Elk eiland zijn eigen variant" op 2:37,9 (genoemd 2:45), "I think" op 3:51,1 (genoemd 3:50), Wallacelijn op 6:11,4 (genoemd 6:05).
- Controle: 20 takes, 4 vragen, 10 kaarten; som van alle segmenten = 430,966 s, mp3 = 430,994 s (verschil 0,028 s, staart van de eindkaart). De stiltes in de mp3 (silencedetect) vallen op de kaart- en vraagsegmenten. Alle `cue()`-aanroepen met een vast woord vinden hun woord.
- Verbeterd 12-10-2026: docentdeel noemt nu optie A bij de misvatting van vraag 1; pauzetijden aangepast naar 1:32, 2:38, 3:51 en 6:11.

## Wijzigingen
- 15 okt 2026 — Speler: de knop Vragen aan/uit (onthouden in `bk-vragen`, ook `?vragen=uit`) werkt nu altijd, ook na spoelen, in pauze en als je hem halverwege omzet. Bij Vragen uit vallen weg: de vraag zelf, de gesproken vraagzin(nen) ervoor (zinnen op '?', 'Wat denk je?', 'Denk even na.', 'Eerst een voorspelling.') en een los antwoord direct erna ('Antwoord B.', 'Ja.', 'Nee.', 'Precies.'); gewone uitlegzinnen blijven staan. De tijdbalk, tijd en hoofdstuktijden tonen de ingekorte duur. Code: `bkBouw()` maakt `BK.k` (stukken die de speler overslaat); regelnummers in de spelercode zijn daardoor een paar regels verschoven. Hoofdstukkaarten (card1, card2, …) duren 2,2 s in plaats van 3,5 s: de speler slaat het stille midden van de kaart over (in- en uitfaden blijven; de mp3 is niet veranderd). Korte inhoudelijke antwoorden zoals 'Analoog.' of 'Twee.' blijven staan.

## Wijziging 16 okt 2026: begrippenlijst
Nieuw blok `<section>` met `<h2 class="gl-kop">Begrippen</h2>` en `<div id="glossary">` (kaartjes `<div class="term"><b>begrip</b><p>uitleg</p></div>`, vwo-begrippen met `class="term vwo"` en `<i>vwo</i>`), vlak vóór "Kleuren in deze reeks"; opmaak in `<style id="glossary-stijl">` vlak voor `</head>` (licht: wit kaartje met `--line`, donker: zoals de hoofdengine). De kop "Begrippen" is een `<h2 class="gl-kop">` met dezelfde opmaak als op de voorbeeldpagina (Fraunces 700, 30px, regelhoogte 1,5, marge 0 0 12px; het lettertype zit als `@font-face` 'Fraunces Begrippen' in `#glossary-stijl`, kleur = tekstkleur van deze pagina). Begrip toevoegen of wijzigen: pas het kaartje in `#glossary` aan en de lijst hierboven. Regelnummers elders in dit bestand zijn enkele tientallen regels verschoven.
