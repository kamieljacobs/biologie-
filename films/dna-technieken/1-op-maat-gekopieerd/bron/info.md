# Op maat gekopieerd — bronmap

Versie 2.0 is een beeld-remake op prompt v13 met behoud van de take (brief `films/OPWAARDEREN-DNA-7-8-TECHNIEKEN.md`, 31 okt 2026). De oude 'Labjournaal'-film (1.0, eigen speler `OMG`, één canvas met eigen look) staat in `oud/` (`index-1.0.html`, `info-1.0.md`, `script-1.0.md`). Lijsten voor Kamiel: `opwaardering-v13.md`; storyboard: `storyboard-remake.md`; bronnen: `bronnen.md`.

| Veld | Waarde |
|---|---|
| Bestand | films/dna-technieken/1-op-maat-gekopieerd/index.html (audio in `audio/s01–s41.mp3`; `narration.mp3` blijft staan, want het practicum speelt die af) |
| Reeks / nummer | DNA-technieken, film 1 van 2 (volgende: Op lengte gesorteerd · gel); hoort bij de PCR-stap van `tools/dna-profielen/` |
| Doelgroep / niveau | havo + vwo; hoofdstuk 3 (s17–s24) is verdieping en staat als vwo-blok (`level: 'vwo'`, `verdieping: true`: speler toont VWO links en VERDIEPING rechts); de samenvatting s25 is voor iedereen |
| Versie / datum | 2.0 · 31 okt 2026 (1.0: artifact, 12 okt 2026 naar de site) |
| Prompt | v13 |
| Voldoet aan | prompt v13 (31 okt 2026, beeld-remake, takes behouden). Bewust niet: de gesproken zin 'Dit deel is verdieping.' (s17) en 'Kort samengevat, voor iedereen:' (s25) blijven, want tekst en take blijven gelijk (zie twijfellijst) |
| Stem / model | Roos (ElevenLabs), de oorspronkelijke doorlopende take van 1.0 (model onbekend); niet opnieuw ingesproken |
| Duur | spraak 534 s (havo 426 s); speeltijd met titel, kaarten, vragen en eindkaart: vwo **10:39**, havo 8:37; zonder vragen vwo 8:26, havo 6:44 (was 9:34 + bedenktijd) |
| Beeldstijl | Part C: Schema (gel, strengenbord, grafieken, rek), Micro zonder korrel (ladder met puzzelbasen palet B, polymerase, nucleotiden), Macro (hete bron, hand met micropipet) |
| Audio-opslag | 35 losse mp3's (`../audio/sNN.mp3`, 96 kbps mono), geknipt uit `narration.mp3` op de regelgrenzen van `OMG_TL` (`omg_tl.json`) met `bouw/knip_take.py`; knippunten per segment in `segments.json` (`bron.knip`) en hieronder; woordtijden `stem/woordtijden/` (`bouw/woordtijden.py`: silalign per regel binnen de regeltijden van OMG_TL) |
| Engine | FILMDATA-straat (speler van de DNA-reeks: snelheid, Vragen aan/uit, Havo/Vwo, review) |

## Opbouw
| Hoofdstuk | Segmenten | Look | Kernbeeld |
|---|---|---|---|
| Opening | s01–s02, titel s03 | Schema (+ Micro in zoomcirkel) | jouw gel uit het practicum (M50, Sp, NC; as 330→40 bp zoals het practicum) met de band van 172 bp; het PCR-buisje (`pcrBuisje`); zoomcirkel: een paar honderd DNA-draden → chromosoom 12 (`cdChromosoom`) met het vWA-stuk |
| 1 Wat zit er in het buisje? | s04–s07, q08, s09, s09b | Schema + Micro-panelen | thermocycler; rij 'in het buisje' die zich vult; template-draad → doorlopende zoom naar de basen met TCTA-haken, teller × 16; strengenbord met primerplekken vóór en achter de STR; één plek in al het DNA; polymerase op de ladder; hete bron + zoomcirkel met Thermus (`bacterieEcht`); losse nucleotiden (`vrijNucleotide`); buffer met Mg²⁺; tweeluik zonder/met primer |
| 2 Eén cyclus | s10–s11, q12, s13–s16 | Micro | ladder (puzzelbasen, palet B) met stappenbalk en thermometer; waterstofbruggen (gouden streepjes) breken; strengen blijven heel; gewoon enzym ontvouwt (`eiwitVouw`), Taq niet; primer past of valt af; Taq zet nucleotiden vast; 5′/3′; primers wijzen naar elkaar; na één cyclus 2 × |
| 3 Van te lang naar precies goed (vwo-blok) | s17–s20, q21, s22–s24; s25 voor iedereen | Schema | strengenbord (flanken ingekort), cyclusteller; lange producten met rafelig 3′-uiteinde; cyclus 2: template eindigt bij de primer → streng op maat (groen) van 172 nt; cyclus 3: raster van 8 moleculen, 2 op maat; samenvatting |
| 4 Tellen | s26, q27, s28–s31 | Schema | turflijst 2-4-6-?; 60; twee originele strengen; lineaire grafiek; niets knipt; verdubbelen; log-grafiek; 2¹⁰, 2³⁰; zee van 4000 stippen met zoom op één stip; plateau |
| 5 Gevoelig voor besmetting | s32, q33, s34–s35 | Schema + Macro | rek met de buisjes van het practicum (Eig, Sp, A, B, C, PC, NC); vWA-gel met band in NC; elk DNA met primerplekken; hand (Noor) met `micropipet` boven het open NC-buisje, huidschilfer en druppeltje uit een eerdere PCR in zoomcirkels; × 1 miljard; twijfel aan andere banden; schoon; nieuwe pipetpunt per buisje |
| 6 Terug naar de gel | s36–s38, q39, s40–s41 | Schema | bloedspoor op een glasscherf (casus juwelier); templates van verschillende lengte, wolk moleculen op maat; één scherpe band; product met de hele STR (108 + 4 × 16); 16 vs 14 herhalingen; 164 komt verder; chromosoom 12 van vader (donkerblauw) en moeder (zandgeel); Sp en B: vWA gelijk, TPOX anders → profiel |
| Eindkaart | s42 | Schema | de vier 'onthoud'-zinnen uit 1.0 |

## Vragen
Zes voorspelvragen, tekst en opties als in 1.0 (`film.py`): q08, q12, q21 (vwo), q27, q33, q39. Vragen uit: de speler knipt de vraagzin en de antwoordzin ('Antwoord B: …') weg; s09 (alleen 'Antwoord B: er wordt niets gekopieerd.') en s38 (de hele vraag) vallen helemaal weg. Gecontroleerd met `bouw/vragenuit.py` (knippunten op de echte stilte), `spelerfix --check`, `antwoordtekst --check`, `kortantwoord --check`, `antwoordletter --check`.

## Begrippen, checkvragen en docentdeel
Begrippen (12, ongewijzigd uit 1.0) en vragen in `film.py`; checkvragen A–F (D vwo) en docentdeel in `sections.html` (overgenomen uit 1.0, aangevuld met 'Hoe de film het uitlegt', 'Getallen en bronnen', 'Keuzes en vereenvoudigingen', 'Plaats in de reeks').

## Segmenten en knippunten in narration.mp3
| Segment | Hoofdstuk | Regels (OMG_TL) | Knip | Niveau |
|---|---|---|---|---|
| s01 | Cold open | H0 r1–r2 | 0.78–8.75 s | basis |
| s02 | Cold open | H0 r3–r5 | 8.96–20.06 s | basis |
| s04 | H1 | H1 r1–r3 | 25.78–37.01 s | basis |
| s05 | H1 | H1 r4–r7 | 37.54–55.15 s | basis |
| s06 | H1 | H1 r8–r11 | 55.41–74.86 s | basis |
| s07 | H1 | H1 r12–r16 | 75.19–99.04 s | basis |
| s09 | H1 | H1 r17–r17 | 99.17–102.29 s | basis |
| s09b | H1 | H1 r18–r20 | 103.22–117.42 s | basis |
| s10 | H2 | H2 r1–r3 | 120.96–133.93 s | basis |
| s11 | H2 | H2 r4–r6 | 133.99–144.40 s | basis |
| s13 | H2 | H2 r7–r9 | 144.54–159.27 s | basis |
| s14 | H2 | H2 r10–r12 | 159.50–175.46 s | basis |
| s15 | H2 | H2 r13–r16 | 176.01–194.86 s | basis |
| s16 | H2 | H2 r17–r20 | 194.97–214.43 s | basis |
| s17 | H3 | H3 r1–r3 | 218.16–227.76 s | vwo · verdieping |
| s18 | H3 | H3 r4–r6 | 227.88–243.39 s | vwo · verdieping |
| s19 | H3 | H3 r7–r9 | 243.96–259.15 s | vwo · verdieping |
| s20 | H3 | H3 r10–r13 | 260.09–276.01 s | vwo · verdieping |
| s22 | H3 | H3 r14–r16 | 276.14–291.30 s | vwo · verdieping |
| s23 | H3 | H3 r17–r19 | 291.47–310.02 s | vwo · verdieping |
| s24 | H3 | H3 r20–r22 | 310.25–328.84 s | vwo · verdieping |
| s25 | H3 | H3 r23–r24 | 329.99–342.43 s | basis |
| s26 | H4 | H4 r1–r4 | 346.15–370.07 s | basis |
| s28 | H4 | H4 r5–r8 | 370.21–388.21 s | basis |
| s29 | H4 | H4 r9–r12 | 388.32–414.34 s | basis |
| s30 | H4 | H4 r13–r14 | 414.90–423.84 s | basis |
| s31 | H4 | H4 r15–r17 | 424.05–440.09 s | basis |
| s32 | H5 | H5 r1–r3 | 444.00–462.05 s | basis |
| s34 | H5 | H5 r4–r8 | 462.19–485.82 s | basis |
| s35 | H5 | H5 r9–r11 | 486.03–496.43 s | basis |
| s36 | H6 | H6 r1–r3 | 499.96–512.73 s | basis |
| s37 | H6 | H6 r4–r6 | 512.89–531.99 s | basis |
| s38 | H6 | H6 r7–r7 | 532.22–538.75 s | basis |
| s40 | H6 | H6 r8–r9 | 538.88–554.89 s | basis |
| s41 | H6 | H6 r10–r11 | 555.27–569.65 s | basis |
## Waar wat in de HTML zit
De HTML is gebouwd (niet met de hand bewerken): `bron/src/page.html` + `film.json` + `filmdata.json` + `scenes.js`. Zoek in `index.html` op: `window.FILMDATA` (segmenten, woordtijden, vragen), `const GEL` en `function gelFoto` (gel), `function streng` (ladder), `const PCR` / `function bordStreng` (strengenbord), `function ingRij`, `function stappenBalk`, `Object.assign(SCENES` (één functie per segment, `s01`…`s41`, `title`). Bronbestanden: `src/teken_pcr.js` (tekenhulpen met recepten) en `src/scenes_pcr.js` (scènes).

## Zo pas je deze film aan
1. Werkmap buiten de repo: `<werk>/eng` = `src/*` + `bouw/*`; `<werk>/film` = `segments.json`, `film.py`, `sections.html`, `bouw.sh`, `src/teken_pcr.js`, `src/scenes_pcr.js`, `audio/` (= `../audio`) en `words/` (= `stem/woordtijden`). Bouwen: `bash film/bouw.sh` (haalt de benodigde functies uit `lib_bio.js` met `bio_deel.py`, maakt `scenes.js`, `film.json`, `filmdata.json` en `film/index.html`).
2. In de repo: `film/film/index.html` → `index.html`, dan `bash bron/bouw/afronden.sh` vanuit de repo-root (spelerfix, antwoordtekst, kortantwoord, antwoordletter, flipkaarten, licentie_noot, teller, oefenen, tabel_mobiel, microteken; zet het donker-regeltje direct na `<meta charset>`).
3. Beeld wijzigen: de scènefunctie van dat segment in `scenes_pcr.js` (cue-woorden met `q.at('woord', n)`: een stukje van een woord, eerste keer; let op stukjes die in andere woorden zitten: 'Wat' vond ook 'waterstofbruggen'). Stills: `bouw/contact.py <film> <uit.png> vwo s05:6 …`, `bouw/still.py`.
4. Tekst wijzigen = opnieuw inspreken (niet gedaan; één take per regel kan, dan dat segment-mp3 vervangen en `woordtijden.py` op dat segment). Een andere knip: `knip_take.py` (PLAN bovenin) en `woordtijden.py`.
5. Het practicum `tools/dna-profielen/` heeft nog een eigen kopie van de 1.0-film (engine + `OMG_TL`) en speelt `narration.mp3` af: niet weghalen of hernoemen. Wil Kamiel ook daar het nieuwe beeld, dan moet het practicum deze film insluiten (vragenlijst).

## Aandachtspunten
- Woordtijden zijn geschat (silalign binnen de regeltijden van 1.0); de cues vallen op het juiste woord, maar soms een tiende te vroeg of laat.
- De vwo-markering geldt voor de verdieping; de stem zegt zelf nog 'Dit deel is verdieping.' en 'voor iedereen'.
- Havo-route (frisse review 31 okt 2026): havo krijgt de hoofdstukkaart van H3 en daarna alleen s25 (basis, ongeknipt, ook bij Vragen uit). s25 introduceert 'lange producten' en 'op maat' met labels in beeld, zodat H4 ('Maar die lange producten…') ook voor havo aansluit. Verander je s17–s24, houd s25 dan zelfstandig te volgen.
- `naamBij` klemt labels binnen 24 px van de rand: een label rechts verschuiven helpt dan niet, kies een andere plek (zo ging het mis bij '1 → 2' in s10).
- Plateaugrafiek s31: de echte curve volgt het model en vlakt daarna af (echt = m / (1 + m/0,8)); hij mag nooit boven het model komen.
- Frisse beeldreview: `review_fris_2026-10-31.md`.

## Versie 2.0 (31 oktober 2026): beeld-remake op prompt v13, take behouden
Take en tekst ongewijzigd (alleen geknipt op de regelgrenzen); 0 credits. Engine van eigen speler naar de FILMDATA-straat; alle beelden nieuw op beeldbankniveau (zie Opbouw en per scène `opwaardering-v13.md` § 'Wat veranderde'). Begrippen, vragen, checkvragen en docentdeel blijven; docentdeel aangevuld. In `script.md` stond bij H4 regel 14 een tijd met 60 seconden: nu '[7:00.0]'.

Getest: contactvellen van alle scènes (vwo en havo) zelf bekeken en verbeterd, gerichte stills op volle grootte; geen JS-fouten; cue-woorden (`cuecheck.py`); tijdlijn vwo/havo × vragen aan/uit; elke vraag met Vragen uit (knippunten op de echte stilte, wat blijft er over); pagina via een webserver: `?review=1`, `?niveau=havo`, `?vragen=uit` (speelt af), begrippen + flipkaarten + oefeningen, telefoon 390 px zonder horizontaal scrollen; vaste scripts met `--check`.

## Wijzigingen
- 31 okt 2026 — Versie 2.0 (beeld-remake op prompt v13, take behouden).
- 31 okt 2026 — Frisse beeldreview verwerkt (`review_fris_2026-10-31.md`): tien labels/beelden hersteld (o.a. plateaugrafiek s31, labels s09b, s10, s18, s19, s28–s30, s38, s40); tekst en take ongewijzigd.
- Eerder (1.0): 15 okt 2026 speler Vragen aan/uit en geen wijslijnen; 16 okt 2026 begrippen als kaartjesraster (zie `oud/info-1.0.md`).
