# Van niet-leven naar leven — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/evolutie/4-van-niet-leven-naar-leven.html |
| Reeks / nummer | Evolutie, deel 4 van 9 (eyebrow "Biologie · Evolutie · deel 4") |
| Doelgroep / niveau | 5/6 vwo (badge op de pagina); één niveau, geen havo/vwo-schakelaar of vwo-blokken |
| Versie / datum | versie 0.1 · 4 oktober 2026 (footer) |
| Stem / model | Roos (ElevenLabs, eleven_multilingual_v2) |
| Duur | 7:43 (462,97 s; blob 001.mp3, gelijk aan `TL.total` = 462.97) |
| Beeldstijl | ouder eigen ontwerp, vóór Part C: canvas 1920×1080, donkerblauwe ondergrond (#0F1B2D), Literata + Public Sans, amber als accentkleur, platte vereenvoudigde tekeningen; drie voorberekende deeltjes- en populatiesimulaties: de kolf van Miller (`MILLER`, seed 7), RNA-kopieerders (`RNA`, seed 21, 40 strengen van 12 letters) en zelfassemblage van vetzuren (`VES`, seed 5, 120 moleculen), met gesteente, kolf, RNA-letters in vier kleuren en een codetabel |
| Audio-opslag | één doorlopende take: 1 mp3 (blob 001.mp3, als base64 data-URI in `au.src`) met 14 gesproken stukken ("takes") en de stiltes voor titel-, hoofdstuk- en eindkaarten en vragen al ingebakken |
| Reconstructie | 2026-10-12, uit de gepubliceerde HTML |

## Opbouw
Hoofdstukken zoals in `CH` (de knoppen onder de speler). Hoofdstuktype volgens het docentdeel: C (een proces opbouwen uit onderdelen) met een stuk G.

| Begin | Hoofdstuk | Takes | Vraag | Kernbeeld |
|---|---|---|---|---|
| 0:00 | De steen (cold open) | f1_cold | – | steen van 3,5 miljard jaar met sporen van leven tegenover de aarde van 4,5 miljard jaar: "een gat van een miljard jaar" |
| 0:26 | Drie onderdelen | f2_intro | – | "Wat heeft een levend ding minimaal nodig?"; geen fossiel van de eerste cel, wel experimenten per onderdeel: "Kan dat zonder leven?" |
| 0:49 | Bouwstenen | f3_aarde, f4_miller, f5_amino | q1 | de jonge aarde (gesmolten, oceanen, lucht zonder O₂, bliksem en UV); kolf van Miller als simulatie; vraag 1; aminozuren (Miller 1953, heranalyse 2008, Murchison 1969) |
| 2:23 | Kopiëren: de RNA-wereld | f6_kip, f7_sim, f8_selectie | q2 | kip en ei: DNA en eiwitten; RNA als informatie én gereedschap (ribozym); simulatie van RNA-kopieerders; vraag 2; "Ze stijgt.": selectie zonder cel |
| 4:12 | Een omhulsel | f9_vet, f10_blaasje | q3 | vetzuur met kop en staart; simulatie in water; vraag 3; dubbele laag, blaasje laat kleine moleculen door, groeit en splitst: protocel |
| 5:19 | Eén voorouder | f11_code, f12_luca, f13_sporen | q4 | dezelfde vier letters en dezelfde codetabel overal; vraag 4; LUCA (niet de eerste cel); wanneer: een paar honderd miljoen jaar |
| 7:05 | Samengevat | f14_slot | – | wat we niet weten; volgende keer: van LUCA naar alles wat leeft |

Kaarten (tekst in `CARDS`): title = "Van niet-leven naar leven" / "Evolutie · deel 4"; card1 = "1 · Bouwstenen" / "De jonge aarde en de kolf van Miller"; card2 = "2 · Kopiëren" / "De RNA-wereld"; card3 = "3 · Een omhulsel" / "Vetzuren en de protocel"; card4 = "4 · Eén voorouder" / "Wat al het leven deelt"; card5 = "Samengevat"; end = "Volgende keer: de grote lijn" / "Evolutie · deel 5" / "3,5 miljard jaar in één aflevering".

## Vragen
Alle vragen zijn voorspelvragen die de film onderbreken (segment `q`, 11,5 s stilte in de audio). Er zijn geen aparte controlevragen. Niveau: allemaal 5/6 vwo.

**q1** · 1:39.6 · hoofdstuk "Bouwstenen" · na take f4_miller  
Gas, water, warmte en een week vonken. Wat zat er daarna in Millers kolf?  
- A. Niets nieuws: zonder levende cellen ontstaan geen organische stoffen. — feedback: "Organische stoffen ontstaan ook zonder leven: Miller vond aminozuren in zijn kolf."
- B. Levende cellen: de juiste stoffen plus energie geven leven. — feedback: "Dat is de misvatting: bouwstenen zijn nog geen cel. Er ontstond geen leven in de kolf, wel aminozuren."
- C. Aminozuren: bouwstenen van eiwitten, maar nog geen leven. **(juist)** — feedback: "Klopt. Bouwstenen ontstaan vanzelf uit simpele stoffen en energie. Leven is daarmee nog niet gemaakt."

**q2** · 3:30.0 · hoofdstuk "Kopiëren: de RNA-wereld" · na take f7_sim  
Strengen kopiëren zichzelf met fouten, en de letters zijn schaars. Wat gebeurt er met de gemiddelde kopieersnelheid?  
- A. Ze stijgt: snellere strengen krijgen meer kopieën, hun fout wordt doorgegeven. **(juist)** — feedback: "Klopt. De fouten zijn willekeurig, maar de schaarste niet: snellere kopieerders nemen de letters in. Dat is selectie."
- B. Ze blijft gelijk: de fouten zijn willekeurig. — feedback: "De fouten zijn willekeurig, maar wie daarna mag kopiëren niet. Snellere strengen krijgen meer kopieën."
- C. Ze daalt: fouten maken kopieën slechter. — feedback: "De meeste fouten maken een streng trager, maar die strengen krijgen juist minder kopieën. De zeldzame snellere fout wint."

**q3** · 4:38.4 · hoofdstuk "Een omhulsel" · na take f9_vet  
Duizenden vetzuren in water, met één regel: staarten bij staarten, koppen bij water. Wat ontstaat er?  
- A. Niets: zonder cel of plan ontstaat er geen orde. — feedback: "Orde kan vanzelf ontstaan als de moleculen een voorkeur hebben. Vetzuren vormen zonder hulp blaasjes."
- B. Bolletjes met een dubbele laag: koppen naar buiten en naar binnen, staarten ertussen. **(juist)** — feedback: "Klopt. De regel alleen is genoeg: de staarten verstoppen zich voor het water, de koppen blijven aan beide kanten bij het water."
- C. Eén klont met alle koppen in het midden. — feedback: "Andersom: de koppen zoeken water, dus die komen aan de buitenkant en aan de binnenkant, de staarten ertussen."

**q4** · 5:54.5 · hoofdstuk "Eén voorouder" · na take f11_code  
Een bacterie, een eik en jij gebruiken dezelfde genetische code. Wat is de beste verklaring?  
- A. Alles wat leeft stamt af van één gemeenschappelijke voorouder. **(juist)** — feedback: "Klopt. Een geërfd kenmerk dat iedereen deelt, wijst op één voorouder: LUCA."
- B. Het is de enige code die chemisch mogelijk is. — feedback: "In het lab werken andere codes ook. De code is een erfenis, geen chemische noodzaak."
- C. Toeval: dezelfde code ontstond meerdere keren apart. — feedback: "Een tabel van 64 codons die meerdere keren precies hetzelfde uitvalt, is als verklaring onwaarschijnlijker dan één voorouder."

## Begrippen
Geen begrippenlijst op de pagina (onbekend, niet in de HTML). Wel een legenda "Kleuren in deze reeks":

- #F0B64A: de rode draad: tussenstoffen, vetzuren, LUCA; in RNA de letter A
- #86CF86: aminozuren, levende organismen, "kan vanzelf"; in RNA de letter G
- #6FB7E8: water, de kop van een vetzuur, DNA; in RNA de letter C
- #E8A0C8: in RNA de letter U
- #E8622E: hitte: de gesmolten aarde, de vlam onder de kolf

## Docentdeel
Uitklapblokken onder "Voor de docent". **Hoe deze film uitlegt** (letterlijk overgenomen):

- Hoofdstuktype C (een proces opbouwen uit onderdelen) met een stuk G (redeneren vanuit experimenten). De as is de vraag "kan dat zonder leven?", gesteld bij drie onderdelen: bouwstenen, kopiëren, omhulsel. Daarna draait de film om: niet hoe het begon, maar wat de uitkomst ons vertelt (één code, dus LUCA). De film zegt expliciet wat onbekend is; abiogenese wordt gepresenteerd als een reeks getoetste hypothesen, niet als afgeronde kennis.
- Drie echte simulaties, alle deterministisch (vaste seed): (1) de kolf van Miller als botsende moleculen met vonken, waarbij alleen botsingen tussen verschillende gassen tijdens een vonk een tussenstof opleveren en tussenstoffen in het water een aminozuur worden; de getallen zijn een model, niet de werkelijke opbrengst. (2) RNA-kopieerders: 40 strengen van 12 letters, kopieersnelheid = overeenkomst met een verborgen patroon, 4 % fout per letter, offspring evenredig met snelheid, daarna terug naar 40 (schaarste). De gemiddelde snelheid stijgt van ongeveer 0,33 naar ongeveer 0,65 en vlakt af: de foutenlast houdt verdere stijging tegen (mutatie-selectiebalans, voor wie dat wil benoemen). (3) Vetzuren: 120 moleculen met één regel (staarten trekken elkaar aan en draaien naar elkaar toe, koppen houden afstand van staarten). Die simulatie geeft clusters met de koppen naar buiten (micel-achtig); de dubbele laag in hoofdstuk 3 is een tekening op basis van dezelfde regel, geen uitkomst van de simulatie. Dat staat zo in de film niet benoemd; zeg het in de klas als het ter sprake komt.
- Misvattingen: Miller maakte leven (vraag 1); willekeurige fouten kunnen niets verbeteren (vraag 2); orde vereist een plan of energie van buiten (vraag 3); de genetische code is een chemische noodzaak of toeval (vraag 4). Verder: LUCA was niet de eerste cel, en de film zegt niet dat het leven in een plasje ontstond: de RNA-wereld en vetzuurblaasjes zijn hypothesen met labsteun.
- Gegeven, niet uitgelegd: de bouw van DNA, RNA, eiwitten en de genetische code (zie je erfelijkheidsfilms); isotopendatering (deel 3). Niet in deze film: endosymbiose, zuurstofrevolutie, meercelligheid (deel 5); de hete-bronnen-hypothese wordt alleen genoemd.

**Getallen en bronnen** (overgenomen):

| Wat | In de film | Werkelijk | Bron / opmerking |
|---|---|---|---|
| Ouderdom aarde | 4,5 miljard jaar | 4,54 ± 0,05 miljard jaar | meteorietdatering (Patterson 1956 en later) |
| Oudste stromatolieten | 3,5 miljard jaar, West-Australië | ongeveer 3,48 miljard jaar, Dresser-formatie, Pilbara | Walter e.a. 1980; Van Kranendonk e.a. 2008 |
| Koolstofisotopen Groenland | 3,8 miljard jaar | ongeveer 3,7–3,8 miljard jaar, Isua; interpretatie als biogeen wordt bediscussieerd | Mojzsis e.a. 1996; Rosing 1999; kritiek o.a. Van Zuilen e.a. 2002 |
| Vloeibaar water | 4,4 miljard jaar, korrels van de aardkorst | zirkonen uit Jack Hills tot 4,4 miljard jaar; zuurstofisotopen wijzen op water | Wilde e.a. 2001; Valley e.a. 2014 |
| Oeratmosfeer | waterdamp, CO₂, N₂, methaan, ammoniak; geen zuurstof | waarschijnlijk vooral CO₂, N₂ en H₂O; methaan en ammoniak minder dan Miller aannam | Kasting 1993; de film noemt Millers gassen omdat het experiment zo is opgezet |
| Miller-Urey | 1953, een week, aminozuren; "handvol" | 1953: 5 aminozuren gerapporteerd (glycine, alanine e.a.); heranalyse van bewaarde monsters 2008: 22 aminozuren | Miller 1953, Science; Johnson e.a. 2008, Science |
| Murchison | 1969, meer dan 70 aminozuren, bouwstenen van RNA | meer dan 70 (sommige tellingen boven 90) aminozuren; nucleobasen (uracil, xanthine) aangetoond 2008 | Cronin & Pizzarello; Martins e.a. 2008 |
| Ribozymen | RNA als enzym; ribosoom is in de kern een ribozym | Cech 1982, Altman 1983 (Nobelprijs 1989); peptidyltransferase van het ribosoom is RNA (Nissen e.a. 2000) | — |
| Vetzuurblaasjes | groeien met vetzuren, splitsen bij schudden; laten kleine moleculen door | vetzuurvesikels groeien en delen in het lab; nucleotiden kunnen passeren | Szostak-lab: Hanczyc e.a. 2003; Mansy e.a. 2008 |
| Genetische code | universeel; andere tabellen werken in het lab | vrijwel universeel (kleine afwijkingen in mitochondriën en sommige organismen); synthetische organismen met herschreven codons bestaan | Lajoie e.a. 2013; Fredens e.a. 2019 |
| LUCA | DNA, ribosomen, H₂ en CO₂, zonder zuurstof, misschien hete bronnen | reconstructie uit 355 genfamilies: anaëroob, H₂-afhankelijk, CO₂-fixerend, thermofiel | Weiss e.a. 2016, Nature Microbiology; onzeker en bediscussieerd |
| Hardy-Weinberg | niet in deze film | — | vwo-stof; komt in de aflevering over selectie en drift |

**Timing en uitspraak (QA)**: "Woordtijden zijn geschat uit pauzedetectie en zinslengte, niet uit woordtimestamps van de stem. De ondertitels lopen per zinsdeel; de cues per woord kunnen enkele tienden van seconden afwijken. Uitspraaklijst: Murchison → "Murtsjison"; LUCA → "Loeka"; jaartallen als cijfers." Daaronder een tabel die bij het laden uit `RISK` wordt gevuld (risicowoord, invoer voor de stem, tijd):

| Risicowoord | Invoer voor de stem | Take |
|---|---|---|
| Murchison | Murtsjison | f5_amino |
| RNA | RNA | f6_kip |
| ribozym | ribozym | f6_kip |
| LUCA | Loeka | f12_luca |
| stromatolieten | stromatolieten | f13_sporen |
| Miller (1953) | Miller, 1953 als cijfers | f4_miller |
| Murchison-meteoriet (1969) | 1969 als cijfers | f5_amino |
| ATP | ATP | f11_code |

Footer: "Stem: Roos (ElevenLabs, eleven_multilingual_v2). Aflevering 4, versie 0.1 · 4 oktober 2026. Moleculen, cellen en organismen zijn vereenvoudigde tekeningen; de drie simulaties zijn deterministisch (vaste seed) en aan de audiotijd gekoppeld."

## Techniek: waar zit wat in de HTML
Regelnummers gelden voor `film.src.html` (uitgepakt met `scripts/filmbron.py`, 678 regels); in de gepubliceerde HTML zijn ze gelijk, omdat de blob op één regel staat.

- **Tijdlijn en tekst**: `const TL = {…}` (r. 189, één lange JSON-regel). `TL.total` = 462.97 s. `TL.takes.<id>` heeft `start`/`end` (absolute seconden in de mp3), `phrases` (ondertitels: `text`, `start`, `end`) en `words` (per woord `w`, `start`, `end`). `TL.segments` is de volgorde van 29 segmenten met `kind`: `sil` (stilte), `take` (gesproken), `card` (titel-/hoofdstuk-/eindkaart, 3,5 s; titel 4,5 s, eind 5 s) en `q` (vraag, 11,5 s).
- **Ondertitels**: `caption(t)` (r. 624) zoekt in alle `phrases` de frase met `start-0.05 ≤ t < end+0.15`. De ondertitels zijn dus precies de `phrases`-teksten.
- **Cues voor animatie**: `cue(takeId, woord, n)` (r. 214) geeft de begintijd van het n-de voorkomen van een woord in die take; alle cues staan in `const C = {…}` (r. 216). Scènes gebruiken `C.x`, `seg(id).start/end` en `ramp`/`ease` om in te faden. Alle animatie is dus aan de audiotijd (`au.currentTime`) gekoppeld; er is geen eigen klok.
- **Woordtijden zijn geschat** (docentdeel QA): uit pauzedetectie en zinslengte, niet uit timestamps van ElevenLabs. Ze kunnen enkele tienden van seconden afwijken.
- **Scènes**: `render(t)` (r. 382) kiest via `segAt(t)` het segment: kaart → `card()` met tekst uit `CARDS` (r. 324); vraag → de eindstand van de voorafgaande take, gedimd (r. 386); take → `SCENE[takeId](t)` (scènes vanaf r. 378).
- **Simulaties** (vooraf berekend bij het laden, vaste seed): r. 240: `MILLER`; r. 257: `RNA`; r. 277: `VES`.
- **Takes per scènefunctie**:
  - `f1_cold` → r. 391
  - `f2_intro` → r. 401
  - `f3_aarde` → r. 410
  - `f4_miller` → r. 425 (`millerScene`, gedeeld)
  - `f5_amino` → r. 451
  - `f6_kip` → r. 469
  - `f7_sim` → r. 492 (`rnaScene`, gedeeld)
  - `f8_selectie` → r. 515
  - `f9_vet` → r. 525 (`vesScene`, gedeeld)
  - `f10_blaasje` → r. 540
  - `f11_code` → r. 557 (`codeScene`, gedeeld)
  - `f12_luca` → r. 569
  - `f13_sporen` → r. 585
  - `f14_slot` → r. 597
- **Vragen**: `QDEFS` (r. 195): `text`, `options[{k,text}]`, `correct`, `explain{k: tekst}`. Speler-logica: `QSEGS` (r. 613): aftellen van `start+1` tot `start+9` s, daarna onthulling. `gate(t)` (r. 644) pauzeert de audio op `cdEnd` tot er een antwoord is (Leerling) of tot de docent op Verder drukt (Klas), tenzij "automatisch door" aan staat. `questionUI(t)` (r. 630) tekent de opties en de feedback.
- **Audio**: `<audio id="au">`; r. 609: `au.src="data:audio/mpeg;base64,@@BLOB:001.mp3@@"`. Eén bestand; er is geen koppeling per segment, alleen de absolute tijden in `TL`.
- **Pagina-onderdelen**: hoofdstukken `CH` (r. 661), transcript `TRN` + `QAFTER` (r. 665–666; de transcripttekst wordt uit `phrases` opgebouwd), uitspraaktabel `RISK` (r. 668), docentdeel als HTML (r. 152–184), seekbalk `max` en de tijd "0:00 / …" hard in de HTML (r. 120).
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
- Vraag 3 heeft als goed antwoord "bolletjes met een dubbele laag", maar de vetzuursimulatie zelf geeft micel-achtige clusters; de dubbele laag in hoofdstuk 3 is een tekening. Het docentdeel meldt dit zelf ("Dat staat zo in de film niet benoemd").
- Uitspraaklijst staat in het docentdeel en in `RISK`: Murchison als "Murtsjison", LUCA als "Loeka", jaartallen als cijfers.
- Controle: 14 takes, 4 vragen, 7 kaarten; som van alle segmenten = 462,923 s, mp3 = 462,968 s (verschil 0,045 s, staart van de eindkaart). De stiltes in de mp3 (silencedetect) vallen op de kaart- en vraagsegmenten. Alle `cue()`-aanroepen met een vast woord vinden hun woord.

## Wijzigingen
- 15 okt 2026 — Speler: de knop Vragen aan/uit (onthouden in `bk-vragen`, ook `?vragen=uit`) werkt nu altijd, ook na spoelen, in pauze en als je hem halverwege omzet. Bij Vragen uit vallen weg: de vraag zelf, de gesproken vraagzin(nen) ervoor (zinnen op '?', 'Wat denk je?', 'Denk even na.', 'Eerst een voorspelling.') en een los antwoord direct erna ('Antwoord B.', 'Ja.', 'Nee.', 'Precies.'); gewone uitlegzinnen blijven staan. De tijdbalk, tijd en hoofdstuktijden tonen de ingekorte duur. Code: `bkBouw()` maakt `BK.k` (stukken die de speler overslaat); regelnummers in de spelercode zijn daardoor een paar regels verschoven. Hoofdstukkaarten (card1, card2, …) duren 2,2 s in plaats van 3,5 s: de speler slaat het stille midden van de kaart over (in- en uitfaden blijven; de mp3 is niet veranderd). Korte inhoudelijke antwoorden zoals 'Analoog.' of 'Twee.' blijven staan.
