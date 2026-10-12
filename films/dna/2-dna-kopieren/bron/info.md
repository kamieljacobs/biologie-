# DNA kopiëren — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/dna/2-dna-kopieren.html (oude artifact-versie: https://claude.ai/code/artifact/5fcdda58-c8fd-4c70-ae01-44cf52f9a87a) |
| Reeks / nummer | DNA, aflevering 2 (pagina: “DNA · aflevering 2 · havo en vwo”; eindkaart: “volgende aflevering: van DNA naar eiwit”) |
| Doelgroep / niveau | havo + vwo, met vwo-blok (hoofdstuk 4 “Richting en halfnieuw”, `level:'v'`); Havo/Vwo-schakelaar slaat dat hoofdstuk over |
| Versie / datum | 1.0 · 9 oktober 2026 (footer op de pagina) |
| Stem / model | Roos (ElevenLabs, volgens de footer); model onbekend (niet in de HTML) |
| Duur | 5:35 gesproken (som van 15 mp3’s, 335,4 s); speler-totaal incl. kaarten, 0,6 s naloop per vertelsegment en 10,5 s denktijd per vraag: vwo 6:46, havo 4:19 (zonder wachttijd bij de vragen) |
| Beeldstijl | Stijl C “Papier en inkt” (reeksstijl DNA, zelfde engine als aflevering 1): warm gebroken wit (#F6F1E7) met stippelkorrel, serif voor titels/kernbegrippen, sans voor labels; T in lichter blauw (#5B93E0, Kamiels keuze voor deze aflevering); 1920×1080-canvas; geen ingebedde fonts |
| Audio-opslag | 15 fragmenten, één per vertel- of vraagsegment, als base64-data-URI in `window.AUDIO` (blobs 001–015; eerst de 10 vertelsegmenten, daarna de 5 vraag-/kort-antwoordfragmenten) |
| Reconstructie | 2026-10-12, uit de artifact-versie, verhuisd naar de site |

## Opbouw

| Begin (vwo) | Begin (havo) | Hoofdstuk | Segmenten | Type (docentdeel) | Kernbeeld (docentdeel) |
|---|---|---|---|---|---|
| 0:00 | 0:00 | Opening | n0 | — | knie met schaafwond die heelt, delende huidcellen, “elke cel: 2 m DNA” |
| 0:19 | 0:19 | 1 Wanneer en waarom | n3, q4, n5 | C proces in de tijd | de celcyclus als klok; S-fase en M-fase lichten op |
| 1:05 | 1:05 | 2 Eén streng is genoeg | n7, q8, n9 | A mechanisme | simulatie: helicase ritst open, vrije nucleotiden blijven alleen op hun partner, polymerase koppelt |
| 2:28 | 2:28 | 3 Twee uit één | n11, q12, n13 | C proces in de tijd | twee identieke moleculen met de oude streng omlijnd; 50 per seconde tegenover 3 miljard; duizenden startpunten; telomeer; de eerste kopieerfout |
| 3:42 | — | 4 Richting en halfnieuw (vwo) | n15, q16, n17, n18 | A + G | Meselson-Stahl als voorspelvraag; replicatievork met leidende en volgende streng; drie polymerasen; repair |
| 6:09 | 3:42 | 5 Samenvatting (“Terug naar de schaafwond”) | n20 | — | samenvatting met de schaafwond |

Begintijden = begin van de hoofdstukkaart in de speler. Typering uit de tabel “Hoe de film het uitlegt” in het docentdeel.

## Vragen

### Voorspelvragen in de film (`kind:'q'` in `window.SCRIPT`)

| Nr | Plek | Vraag | Opties | Juist | Misconceptie-optie | Niveau |
|---|---|---|---|---|---|---|
| V1 | H1, 0:45 | In welke fase kopieert de cel haar DNA? | A. tijdens de deling, in de M-fase / B. vóór de deling, in de S-fase / C. na de deling, in de nieuwe cel | B | A | basis |
| V2 | H2, 1:59 | De oude streng is A C G T. Welke nieuwe streng bouwt DNA-polymerase ernaast? | A. A C G T / B. T G C A / C. U G C A | B | A | basis |
| V3 | H3, 3:08 | Vijftig nucleotiden per seconde, en toch klaar in een paar uur. Hoe kan dat? | A. de polymerase gaat sneller als het moet / B. het kopiëren begint op heel veel plekken tegelijk / C. de cel kopieert alleen de genen die ze nodig heeft | B | C | basis |
| V4 | H4, 4:09 | Na één keer kopiëren op lichte stikstof: wat zie je als je het DNA op gewicht sorteert? | A. alleen zwaar DNA / B. alleen licht DNA / C. alles even zwaar, precies tussen zwaar en licht in / D. half zwaar, half licht | C | D | vwo |

Gesproken vragen eindigen op “Wat denk je?” (op de vraagkaart weggelaten). V4 heeft vier opties; de speler gebruikt daarom de letters `'ABCD'`. Het antwoord volgt aan het begin van het volgende vertelsegment (“B. Vóór de deling.”, “B. …”, “B. …”, “C. …”).

### Checkvragen op de pagina (`window.CHECKS`)

Basis (havo en vwo):
1. Een cel bevat 6 miljard basenparen. Hoeveel vrije nucleotiden moet zij uit het kernplasma halen om haar DNA te kopiëren? Leg uit.
   *Antwoord:* 6 miljard: tegenover elke oude streng komt één nieuwe nucleotide per basenpaar, dus 2 × 3 miljard per set, 6 miljard in totaal.
2. Leg uit waardoor de twee DNA-moleculen na replicatie precies gelijk zijn aan het origineel.
   *Antwoord:* Elke oude streng dient als voorbeeld; door de vaste basenparing (A–T, C–G) krijgt elke streng exact dezelfde partner als eerst.
3. Een stof remt DNA-polymerase. In welke fase van de celcyclus blijft een cel dan steken, en waarom?
   *Antwoord:* In de S-fase: het DNA kan niet gekopieerd worden, dus de cel kan niet door naar de M-fase.

Vwo:
4. Teken een replicatievork en geef aan welke streng continu wordt gebouwd en welke in fragmenten. Leg uit waarom.
   *Antwoord:* DNA-polymerase bouwt alleen 5'→3'. Langs de streng die 3'→5' de vork in loopt kan het met de vork mee bouwen (leidende streng); langs de andere moet het telkens van de vork af bouwen, in Okazaki-fragmenten (volgende streng).
5. Een virus heeft RNA als erfelijk materiaal en bouwt zijn informatie in het DNA van de gastheer in. Welk enzym heeft het daarvoor nodig, en waarom niet DNA-polymerase?
   *Antwoord:* Reverse transcriptase: dat maakt DNA met RNA als matrijs. DNA-polymerase gebruikt alleen DNA als matrijs.

## Begrippen

Uit `window.GLOSSARY` (`'v'` = vwo, in havo-weergave verborgen). Boven de lijst dezelfde kleurlegenda als aflevering 1.

- **celcyclus** — De opeenvolging van fasen die een cel doorloopt tussen twee delingen.
- **S-fase** — Fase van de celcyclus waarin het DNA wordt gekopieerd.
- **M-fase** — Fase waarin de celdeling plaatsvindt en de kopieën van de chromosomen worden verdeeld over de dochtercellen.
- **DNA-replicatie** — Kopiëren van het DNA voor de celdeling (ook: DNA-verdubbeling).
- **vrije DNA-nucleotiden** — DNA-nucleotiden die los in het kernplasma voorkomen.
- **DNA-polymerase** — Enzym dat langs een enkelvoudige DNA-keten schuift en vrije nucleotiden uit het kernplasma verbindt met de vrijgekomen basen.
- **helicase** — Enzym dat de twee strengen van het DNA uit elkaar trekt (aanvulling op de methode).
- **telomeer** — Niet-coderend repetitief DNA aan de uiteinden van een DNA-molecuul, ingekapseld in beschermende eiwitten.
- **mutatie** — Verandering in de nucleotidevolgorde van het DNA, bijvoorbeeld een kopieerfout die blijft staan.
- **semiconservatief** *(vwo)* — Elk nieuw DNA-molecuul bestaat uit één oude en één nieuwe streng.
- **primer** *(vwo)* — Kort startstukje waaraan DNA-polymerase kan beginnen; gemaakt door primase.
- **leidende streng** *(vwo)* — De nieuwe streng die continu, met de vork mee, wordt gebouwd.
- **volgende streng** *(vwo)* — De nieuwe streng die in korte stukken (Okazaki-fragmenten) van de vork af wordt gebouwd; ligase plakt de stukken aan elkaar.
- **Okazaki-fragmenten** *(vwo)* — Korte stukken nieuw DNA op de volgende streng.
- **RNA-polymerase** *(vwo)* — Enzym dat een gen overschrijft naar RNA (transcriptie).
- **reverse transcriptase** *(vwo)* — Enzym dat uit RNA een DNA-kopie maakt.
- **DNA-repair-enzymen** *(vwo)* — Enzymen die verkeerd ingebouwde nucleotiden opsporen en vervangen.

## Docentdeel

Vijf uitklapblokken onder “Voor de docent”:

- **Hoe de film het uitlegt**: tabel per hoofdstuk (zie Opbouw). Misconcepties: 1 kopiëren tijdens de deling; 2 het enzym kiest de base; 3 kopiëren is foutloos, alleen genen worden gekopieerd; 4 conservatieve replicatie, beide strengen gelijk gebouwd.
- **Pauze- en bespreekmomenten**: na V1 de celcyclus van de celdeling-simulatie ernaast leggen; na H2 “wat als een verkeerde base toch blijft hangen?” (brug naar H3); na V3 uitrekenen hoeveel startpunten je minstens nodig hebt (≈ 2000 bij ideale verdeling); (vwo) na V4 verwachting voor conservatieve en dispersieve replicatie tekenen.
- **Getallen achter de film** (`window.NUMBERS`):

| Getal | In de film | Bron / berekening |
|---|---|---|
| Snelheid DNA-polymerase (eukaryoot) | ≈ 50 nucleotiden/s | Alberts, Molecular Biology of the Cell |
| Tijd voor één enzym, 3,2 miljard nt | ≈ 2 jaar | 3,2·10⁹ ÷ 50 = 6,4·10⁷ s ≈ 740 dagen |
| Startpunten per replicatie (mens) | duizenden | 30 000–50 000 (Alberts) |
| Duur S-fase | een paar uur | ≈ 8 uur in een typische zoogdiercel (Alberts) |
| Foutkans na herstel | ≈ 1 op 10⁹ | Alberts |
| Nieuwe cellen bij een schaafwond | honderdduizenden | orde-schatting, niet gecontroleerd in een primaire bron |
| Meselson & Stahl | 1958, ¹⁵N/¹⁴N, E. coli | Meselson & Stahl, PNAS 44 (1958) |

- **Vereenvoudigingen**: helicase, primase en ligase staan niet in BvJ of Nectar (op verzoek toegevoegd, als aanvulling gemarkeerd); “repair-enzymen” dekt proofreading én mismatch repair; Meselson en Stahl sorteerden op dichtheid (CsCl-centrifuge), de film zegt “op gewicht”; de simulatie toont één vork (in werkelijkheid twee per startpunt); “ongeveer vijftig per seconde” geldt voor eukaryoten, bacteriën ≈ 10× sneller.
- **Leerdoelen en dekking**: tabel leerdoel / niveau / hoofdstuk / vraag (S-fase vóór de deling; replicatie; twee identieke moleculen; kopieerfout → mutatie, telomeer; vwo: semiconservatief, 5'→3'/primer/leidende-volgende streng/Okazaki, drie polymerasen en repair).

Bronnen (footer): Biologie voor Jou havo thema 9, Nectar vwo H17, Alberts *Molecular Biology of the Cell*, Meselson & Stahl 1958.

## Techniek: waar zit wat in de HTML

Regelnummers gelden voor `film.src.html` (uitgepakt met `scripts/filmbron.py`; 665 regels, zelfde regelnummers als de film-HTML). Engine en speler zijn vrijwel gelijk aan aflevering 1 (verschil: `'ABCD'` in plaats van `'ABC'` voor de optieletters, lichtere T-kleur, extra tekenhulpjes).

- **Omhulsel**: r. 1 site-wrapper (`<!doctype html><html><head>…<body>`), r. 2 navigatiebalk (`<nav class="sitenav">`, links naar `../../index.html#home` en `#dna`), vanaf r. 3 het complete oorspronkelijke artifact-document.
- **Pagina** (r. 76–148): kop, speler (`#stage` canvas 1920×1080, `#qlayer`, `#caption`), bediening (afspelen, zoekbalk, Leerling/Klas, Havo/Vwo, Ondertitels). Docentdeel r. 118–146, footer met versie r. 147. De hint onder de speler noemt hier géén stem (in aflevering 1 wel).
- **`window.SCRIPT`** (r. 150–254): segmenten `narr` (`ch`, `level`, `scene`, `lines[]`, `terms[]` = niet gebruikt), `card` (`title`, `sub`, `dur`), `q` (`text`, `opts`, `correct`, `misconception` = niet gebruikt), `end`. Daarna `CHAPTERS` r. 255, `GLOSSARY` r. 263, `CHECKS` r. 282, `NUMBERS` r. 293.
- **Scènes** (script r. 303–559): tekenhulpjes uit aflevering 1 plus `enzyme` r. 398, `knee` r. 399 (schaafwond), `skinCells` r. 404, `clock` r. 405 (celcyclus), `dnaIcon` r. 412, `replSim` r. 414 (replicatiesimulatie met helicase, vrije nucleotiden en polymerase), `tube` r. 503 (Meselson-Stahl-buis met banden), `strandPair` r. 504. Scènes: `S.open` 429, `S.h1a` 437, `S.h1q` 447, `S.h1b` 448, `S.h2a` 449, `S.h2q` 472, `S.h2b` 473, `S.h3a` 479, `S.h3q` 494, `S.h3b` 495, `S.h4a` 505, `S.h4q` 516, `S.h4b` 517, `S.h4c` 536, `S.recap` 544. Beeldwissels per zin via `li` (index in `lines[]`) en `lf` (fractie in de zin). Kaarten: `renderCard` r. 554, `renderEnd` r. 557.
- **`window.AUDIO`** (r. 560, één regel): `{id: {dur, bounds[], src}}`, sleutel `'n'`/`'q'` + index in `SCRIPT`; `bounds` = begintijden van regel 2…n. Koppeling: n0=001, n3=002, n7=003, n9=004, n11=005, n13=006, n15=007, n17=008, n18=009, n20=010, q4=011, n5=012, q8=013, q12=014, q16=015.
- **Speler** (r. 561–661): `SCRIPT.forEach` r. 568 berekent duur (vertelling `dur + 0,6 s`; vraag `dur + 0,4 s` + 8 s denktijd + 2,5 s), `syncAudio` r. 578, `render()` r. 596 (ondertitel = `seg.lines[li]`; vraaglaag met opties `'ABCD'` r. 610 en aftelring). Leerling-modus wacht op een antwoord, Klas-modus (`?modus=klas`) op Verder; `?niveau=havo`. Pijltjes ±5 s (Shift ±30 s). Begrippen, transcript, checkvragen en getallen worden gebouwd in r. 655–658.

## Zo pas je deze film aan

1. **Tekst in beeld**: `text('…')`-aanroepen in de scènefuncties en hulpjes (`replSim`, `tube`, `clock`); hoofdstuklabel per scène via `chapterLabel('…')`; kaarttitels in `SCRIPT`; eindkaart in `renderEnd` (r. 557).
2. **Eén segment opnieuw inspreken**: vervang het blob (koppeling hierboven, zelfde naam) en pas `window.AUDIO[<id>].dur` en `.bounds` aan (`lines.length − 1` grenzen). De rest schuift vanzelf mee.
3. **Zin wijzigen**: `lines[]` aanpassen én het segment opnieuw inspreken. Toevoegen/verwijderen van een regel verschuift `li`; controleer de `li===k`-voorwaarden in de scène (bijv. `S.h2a` gebruikt `li` 0–12 en `S.h2q` toont `S.h2a(12,1)`).
4. **Vraag aanpassen**: `SCRIPT[i].text/opts/correct`; het q-fragment én het begin van het volgende vertelsegment (dat het antwoord noemt) opnieuw inspreken. Let op: n9 noemt ook expliciet optie C (“Antwoord C klopt niet: U hoort bij RNA”).
5. **Vwo-blok**: `level:'v'` op segmenten en kaart; in de scène `levelTag()` voor het label.
6. **Inpakken**: werk in een tijdelijke map met `python3 scripts/filmbron.py uitpakken|inpakken|controleer`; zet geen uitgepakte mappen in de repo.

## Aandachtspunten

- Dubbel documentskelet: site-wrapper (r. 1–2) vóór het complete artifact-document (r. 3 e.v.); werkt in browsers, maar is geen geldige HTML.
- Blobvolgorde wijkt af van de filmvolgorde (eerst alle vertelsegmenten, daarna de vragen en het korte antwoord n5): blob 011 hoort bij q4, niet bij hoofdstuk 3. Gebruik de koppeling hierboven.
- Inhoud: de film zegt “op gewicht sorteert” voor Meselson-Stahl (docentdeel noemt dichtheid); antwoord op V1 (n5) is één zin van 5 s. Geen woordtijden, geen ingebedde fonts, stemmodel niet in de HTML; `terms[]` en `misconception` ongebruikt.
