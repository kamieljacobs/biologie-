# Celdeling — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/voortplanting/celdeling/index.html (audio in films/voortplanting/celdeling/audio/) |
| Reeks / nummer | Cel, film 3 van 3 ("Biologie bij Kamiel · reeks Cel · film 3 van 3"); 1 = Diffusie en osmose, 2 = Celorganellen |
| Doelgroep / niveau | havo + vwo met gelabelde vwo-blokken (Havo/Vwo-schakelaar; standaard Vwo). Mitose, meiose, G1/S/G2 en crossing-over staan in het basisdeel (besluit Kamiel 12 okt 2026, na de curriculumreview). Vwo-blokken: controlepunten (H2), kanker + non-disjunctie + trisomie 21 (H6). Daarnaast één **extra-uitdagingblok** (H4, tussen metafase en anafase) voor havo én vwo: verdieping, geen examenstof; schakelaar Extra aan/uit, standaard aan |
| Versie / datum | Versie 1.3 · 16 oktober 2026 (1.0 zonder extra uitdaging; 1.1 met extra uitdaging; 1.2 na de onafhankelijke review, zie `reviews/review_v2.md`; 1.3 met ongeslachtelijke en geslachtelijke voortplanting, segmenten v01 en v02) |
| Stem / model | Roos (ElevenLabs, model eleven_v4, voice_id 7qdUFMklKPaaAVMsBTBt), één take per segment; woordtijden met Scribe (eleven_scribe_v1) |
| Duur | 13:14 gesproken (som van 30 mp3's: 794 s, waarvan 86 s extra uitdaging en 89 s voortplanting v01/v02). Speeltijd met kaarten en vragen (speler van 16 okt 2026): Vwo 15:45, Havo 14:19; met Extra uit: Vwo 14:05, Havo 12:39. Op de site: 13 min |
| Beeldstijl | Part C-stijlkaart: Micro, Schema, één Macro-figuur. Modelcel 2n = 4 (lang en kort paar). Kleuren: blauw = chromosoom van vader, roze = van moeder, paars = DNA/kern (en vwo-balk), goud = focus/telling, koraal = fout/te veel, groen = conclusie, oker = extra uitdaging (balk en label) |
| Audio-opslag | 28 losse mp3's in audio/ (s01, s04, s05, s06, s08–s13, s15–s17, s19–s22, s24–s27, s29, s30, s32, s33, s35, plus e01 en e03 voor de extra uitdaging, plus v01 en v02 voor voortplanting), gemasterd op −16 LUFS / −1,5 dBTP |
| Herkomst | Gemaakt door Claude met Kamiel in één sessie (12 okt 2026), met dezelfde bouwstraat als Diffusie en osmose. Remake in Part C van een film van Kamiels broer |

## Echte bronbestanden (in deze map)

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script (leerdoelen, misconcepties, [VWO-START]/[VWO-END], [EXTRA-START]/[EXTRA-END], [VRAAG]; lege regel = grens tussen takes). `script_v1.md` = vóór de reviews |
| `script.md` | Gesproken tekst per segment met begintijd, duur, mp3 en afwijkende stem-invoer; vragen met juiste antwoord |
| `stem/segmenten_stem-invoer.json` | Per segment `display` en letterlijke `voice` |
| `stem/uitspraaklijst.md` | Respellings (door Kamiel gekozen) en ElevenLabs-flows |
| `stem/woordtijden/sNN.json` | Woordtijden per take |
| `stem/uitspraaktest.mp3`, `stem/uitspraaktest_extra.mp3` | De uitspraaktests waaruit Kamiel koos (de tweede voor kinetochoor en cohesine) |
| `src/lib.js` | Part C-tokens en reeksbibliotheek |
| `src/scenes_lib.js` | Algemene helpers (pil, kaart, pijl, deeltjes, ion, enz.; gedeeld met Diffusie) |
| `src/chrom_lib.js` | Chromosomenkit: `chromatid`, `chromX`, `chromatin`, `cellBody` (met insnoeren), `mitosisCell` (fasen als getallen 0..1), `cellWith`, `dnaGraph`, `karyo`, `sperm`, `egg`, `MODEL` (de modelcel) |
| `src/scenes.js` | Eén scènefunctie per segment + `cycleRing` (celcyclusring), `comparePanels` (drie metafasen), en voor de extra uitdaging `bigChrom` (groot chromosoom met kinetochoren, spanningsveer en cohesineringen) en `fibres` (bundel trekdraden, ook gebogen naar de verkeerde pool) |
| `src/player.js`, `src/page.html` | Speler en paginasjabloon |
| `bouw/*` | Bouwstraat, stills, tests, `checkcues.js` |
| `reviews/` | Scriptreviews (vakexpert, didactiek + taal, curriculum) en beeldreview met wat ermee gedaan is |

## Opbouw (Vwo met Extra aan; Havo tussen haakjes waar anders)

| Begin | Hoofdstuk | Kernbeeld |
|---|---|---|
| 0:00 | Cold open | Eén bevruchte eicel → 37 biljoen cellen; 2 m DNA in een kern; hoe eerlijk verdelen? |
| 0:39 | Titel | "Celdeling — Eerst kopiëren, dan verdelen" met een delende cel |
| 0:44 | H1 Waarom delen? | Groeien, herstellen, vervangen (darmvlok, 2 miljoen rode bloedcellen/s); bacterie; grote cel en diffusie |
| 1:34 | H2 De celcyclus (+ vwo-blok) | Ring: interfase (geen rustfase), mitose, cytokinese; kerndeling vs celdeling; G1/S/G2; vwo: controlepunten |
| 3:15 (3:00) | H3 Chromosomen tellen | Chromatine; karyogram (23 paren, XX/XY); oprollen (dubbele draad); chromatiden en centromeer; "X-vorm" (niet "een X", om verwarring met het X-chromosoom te voorkomen); "twee soorten twee"; modelcel met vier X-vormen |
| 5:01 (4:46) | H4 Mitose | Profase, metafase, anafase (even 92), telofase, cytokinese; celplaat; DNA-grafiek p → 2p → p |
| 8:26 (8:13) | ↳ v01 Ongeslachtelijke voortplanting | Ouder → mitose → twee gelijke nakomelingen (klonen); vier panelen: eencellige deelt, knopvorming (gist, zoetwaterpoliep), uitlopers en stek (aardbeiplant), bladluis met jongen; overgang "twee ouders, een andere deling" |
| 5:33 (5:18) | ↳ Extra uitdaging | Kinetochoren; spanning op het centromeer; foute verbinding (beide aan één pool) → enzym laat los → los kinetochoor knippert rood (wachtsignaal); overzichtscel: lampje per chromosoom rood → groen; een ánder enzym knipt de cohesineringen; transfervraag eq02 (gif, trekdraden haken niet aan); middelen tegen kanker; trekdraad als rijtje eiwitblokjes die bij het kinetochoor afbreken |
| 9:08 (8:56) | H5 Meiose | Bevruchting; diploïd/haploïd; meiose I (paren), meiose II; 4 zaadcellen / 1 eicel; DNA-grafiek tot ½p; toeval 2²³; crossing-over; n + n = 2n |
| 11:33 (11:20) | ↳ v02 Geslachtelijke voortplanting | Twee ouders (blauw / roze tinten) → meiose → haploïde zaadcellen en eicellen → zygote (2n) → vier nakomelingen met elk andere kleurcombinatie; vergelijking ongeslachtelijk (snel, geen partner, geen variatie: ziekte → allemaal weg) en geslachtelijk (trager, variatie: een paar overleven) |
| 12:24 (12:11) | H6 Mitose en meiose naast elkaar (+ vwo-blok) | Drie metafasen; vergelijkingstabel; vwo: kanker, non-disjunctie, trisomie 21 |
| 14:38 (13:12) | Recap | Vier panelen; huidcel vs zaadcel |
| 15:36 (14:10) | Eindkaart | Drie kernzinnen |

## Vragen (juiste antwoord vet)

| Id | Niv. | Vraag | Opties |
|---|---|---|---|
| q02 | basis | Hoe verdeelt een cel zijn DNA eerlijk? | knippen in helften · **eerst kopiëren, dan verdelen** · elke cel maakt nieuw DNA |
| q07 | basis | Wanneer wordt het DNA gekopieerd? | tijdens de mitose · **in de interfase** · na de cytokinese |
| q14 | basis | Cel met vier X-vormen: hoeveel chromosomen? | 2 · **4** · 8 |
| q18 | basis | Chromosomen per dochtercel (mens)? | 23 · **46** · 92 |
| q23 | basis | Chromosomen per cel na meiose I (mens)? | 46 · **23** · 92 |
| q28 | basis | Waar liggen homologe chromosomen als paren in het equatorvlak? | mitose · **meiose I** · meiose II |
| eq02 | extra | Een gif zorgt dat de trekdraden niet aan de kinetochoren kunnen haken. Wat doet de cel dan? | toch door naar de anafase · **blijft wachten in de metafase** · knipt meteen de cohesine door |
| q31 | vwo | Eicel 24 + normale zaadcel: hoeveel? | 45 · 46 · **47** |
| q34 | basis | Huidcel (deelt niet) of zaadcel: meer DNA in de kern? | evenveel · **de huidcel** · de zaadcel |

## Begrippen
celdeling, celcyclus, interfase, G1/S/G2, chromatine, chromosoom, homologe chromosomen, geslachtschromosomen/autosomen, karyogram, chromatide, centromeer, mitose, profase–telofase, spoelfiguur, equatorvlak, cytokinese, celplaat, diploïd, haploïd, meiose (reductiedeling), crossing-over, ongeslachtelijke voortplanting, kloon, geslachtelijke voortplanting, zygote; vwo: controlepunt, non-disjunctie, trisomie 21, tumor/kanker; extra uitdaging: kinetochoor, cohesine.

## Docentdeel
Op de pagina: tabel "Hoe de film het uitlegt", uitleg modelcel en kleuren, misconcepties, pauzemomenten, getallen met bron, vereenvoudigingen, leerdoelen en dekking, practicumsuggesties; zes checkvragen (vier basis, twee vwo).

## Waar wat in de HTML zit (`index.html`, versie 1.3; regelnummers kunnen een paar regels verschoven zijn, zoek op de functienaam)

| Regel | Inhoud |
|---|---|
| 69 | Sitebalk "← Terug naar Cellen" |
| 95 / 99 / 117 | Hoofdstukken / checkvragen / docentdeel (rij "4 Extra uitdaging" in de tabel "Hoe de film het uitlegt") |
| 163 | `window.FILMDATA` |
| 164 | Part C-tokens en reeksbibliotheek |
| 472 | Chromosomenkit (chrom_lib.js); `mitosisCell` op 520 |
| 592–641 | Voortplanting-helpers: `metaA` (metatekst met alpha), `vpEencellige`, `vpKnop` (gist + zoetwaterpoliep), `vpBlad`/`vpPlant`, `vpAardbei` (uitloper + stek), `vpLuis`/`vpBladluis` |
| 999 / 1029 | `SCENES.v01` (ongeslachtelijke voortplanting) / `SCENES.v02` (geslachtelijke voortplanting), staan in het bestand vlak vóór s27 |
| 642 | `const SCENES`; s01 582, s04 601, s05 619, s06 635, s08 638, s09 643, s10 644, s11 646, s12 662, s13 671, s15 692, s16 702, **e01 717, e03 779**, s17 813, s19 832, s20 840, s21 849, s22 863, s24 880, s25 900, s26 906, s27 932, s29 933, s30 948, s32 971, s33 979, s35 995 |
| 1006 / 1020 | `bigChrom` / `fibres` (extra uitdaging) |
| 1027 | `cycleRing` (celcyclusring) |
| 1070 | Begrippen (`GLOSSARY`; `extra:true` geeft het okerlabel) |
| 1098 | Speler (niveau `extra`: overslaan bij `state.extra==='uit'`, okerbalk, label in de hoofdstuklijst; URL `?extra=uit`) |

Pas nooit `index.html` direct aan: wijzig `src/` en bouw opnieuw. **Let op (16 okt 2026):** de gepubliceerde film heeft een nieuwere speler dan `src/player.js` (Vragen aan/uit, snelheid, teller, licentie, begrippenlijst). Een volledige herbouw met `build.py` verliest die. Plak nieuwe inhoud daarom in de gepubliceerde film (FILMDATA, scèneblok, GLOSSARY, docenttekst), zoals bij v01/v02 is gedaan; `src/scenes.js` is gelijk aan het scèneblok in `index.html`.

## Hoe je de film aanpast

**Werkmap** (buiten de repo): kopieer `bron/src/`, `bron/bouw/*`, `bron/script_v2.md`; `stem/segmenten_stem-invoer.json` → `segments.json`; `stem/woordtijden/` → `words/`; mp3's → `master/` en `film/audio/`. Dan `python3 build_data.py && python3 build.py && node checkcues.js` (meldingen bij s35 zijn vals alarm: de ringhelper staat onder s35 in het bestand).

**Beeld:** scènes in `src/scenes.js`; cue-woorden via `q.at('woord', n)` (n telt alle woorden die het woord bevatten: "Elke" vindt ook "elke"). Mitosefasen stuur je met de getallen in `mitosisCell(…, {cond, sp, nm, meta, ana, telo, cyto})`. Controleer met `python3 shots.py uit s17:10`.

**Extra uitdaging:** de segmenten e01, eq02 en e03 (niveau `extra`) zijn met de hand in `segments.json` gezet, na s16. Draai `make_segments.py` dus **niet** opnieuw zonder te controleren: het nummert alles na het extra blok door (s17 → s20 enz.) en dan kloppen de mp3-namen niet meer. Pas e01/e03 liever direct aan in `segments.json` (velden `display`, `voice`, `lines`). Beeld: `SCENES.e01` (kinetochoren → spanning → foute verbinding → enzym → wachtsignaal in overzichtscel → cohesine → vraagbeeld) en `SCENES.e03` (los en weer vast → krimpende trekdraad). Cues gebruiken 'plaatjes' (2e), 'heet', 'los' (2e) en 'gif' in plaats van 'kinetochoren'/'cohesine'. `bigChrom` tekent de zusterchromatiden altijd verbonden; spanning = het centromeer rekt iets op; cohesine = okergele ringen langs de armen.

**Tekst:** `script_v2.md` → `make_segments.py` → in `segments.json` `s03` op `kind: title` en `s36` op `kind: card` → alleen gewijzigde segmenten opnieuw inspreken (Roos, eleven_v4, één take, invoer uit `voice`) → Scribe → mastering (`loudnorm=I=-16:TP=-1.5:LRA=11`, twee passes, `linear=true`) → `build_data.py` → `build.py`.

**Vragen:** `answers` en `questions_text` in `bouw/build_data.py`; opties in `script_v2.md`.

## Aandachtspunten
- Uitspraak door Kamiel gekozen via de uitspraaktest; X/Y ("iks"/"ei") zat niet in de test en volgt de vaste voorkeur Y = "ei".
- Fonts via Google Fonts; geen MP4-export.
- Rendertijd per scène ≤ 2,1 ms per frame bij 4× vertraagde CPU; e01/e03 ≤ 1,5 ms.
- Inhoud extra uitdaging vakinhoudelijk gecheckt (Musacchio & Salmon 2007, Nat Rev Mol Cell Biol 8:379; Lampson & Grishchuk 2017, Biology 6:1; Alberts, Molecular Biology of the Cell, NBK26934). Vereenvoudigd: één enzym (Aurora B) en de wachtsignaalroute (SAC) worden niet bij naam genoemd; microtubuli breken vooral aan het plus-uiteinde af (Pac-Man), flux naar de pool is weggelaten.

## Voortplanting (v01, v02), 16 okt 2026

Twee nieuwe segmenten met eigen id; bestaande opnames ongemoeid. Met de hand in `stem/segmenten_stem-invoer.json` gezet (net als e01/e03; `make_segments.py` niet blind draaien). Roos, eleven_v4, één take per segment, flow G9H4qGFv1wgBMnnLpTBa; woordtijden met eleven_scribe_v1 (`stem/woordtijden/v01.json`, `v02.json`, transcript klopte woord voor woord); mastering −16 LUFS twee passes, linear.
- **v01** (na s20, H4, basis, 39,9 s): ongeslachtelijke voortplanting. Cues: 'ongeslachtelijke', 'mitose' (2e), 'Daardoor', 'klonen', 'eencellige', 'Gist', 'knop', 'uitlopers', 'plantjes', 'stek', 'bladluis', 'jongen', 'geslachtelijke' (2e = de laatste zin).
- **v02** (na s26, H5, basis, 48,3 s): geslachtelijke voortplanting + voor- en nadelen. Cues: 'geslachtelijke' (1e), 'meiose', 'haploïde', 'bevruchting', 'versmelten', 'zygote', 'diploïd', 'nakomelingen', 'meiose' (2e), 'manier', 'geslachtelijke' (2e = Ongeslachtelijke, 3e = Geslachtelijke), 'snel', 'partner', 'gelijk', 'ziekte', 'sterven', 'trager', 'variatie', 'overleven', 'omgeving', 'verandert'.
- Kleuren in v02: ouder 1 = twee blauwtinten (`C.vader`, #2F6F94), ouder 2 = twee roze tinten (`C.moeder`, #A8577F); elke nakomeling een andere combinatie = variatie. In v01 en het vergelijkingspaneel: klonen allemaal goud.
- Begrippen toegevoegd aan `GLOSSARY`: ongeslachtelijke voortplanting, kloon, geslachtelijke voortplanting, zygote. Docenttabel en leerdoelen (5b) bijgewerkt.

## Wachtlijst opnieuw inspreken

**Uitspraak beluisteren (wachtlijst, batchtest):** in v01/v02 als geschreven ingesproken: *ongeslachtelijke / geslachtelijke* (verwacht on-ge-SLACH-te-lij-ke), *zoetwaterpoliep* (/ˈzut.ʋaː.tər.poːˌlip/), *bladluis* (/ˈblɑt.lœy̯s/), *klonen* (KLOO-nen), *zygote* (/ziˈɣoː.tə/, ook als geschreven in Precies op tijd), *eencellige*; *haploïde* als "haaploïde" (vaste regel). Klinkt iets fout: alleen v01 of v02 opnieuw.

(Hieronder het oude plan van 15 okt; vervangen door v01/v02, s20 blijft zoals hij was.)

Aanvulling na vergelijking met Gewoon Uitgelegd (15-10-2026). Tekst staat als `[nieuw]` in `script.md`; zet hem ook in `script_v2.md`. Let op: `make_segments.py` niet blind draaien (het extra blok e01/eq02/e03 staat met de hand in `segments.json`); pas `display` en `voice` van s20 liever direct aan in `segments.json`. Dan Roos, eleven_v4, één take, Scribe, mastering, `build_data.py`, `build.py`, `checkcues.js`.

- **H4, s20** — ongeslachtelijke voortplanting als toepassing van mitose (aardbei met uitlopers, bladluis zonder bevruchting, klonen) tegenover geslachtelijke voortplanting met meiose en variatie; aan het eind, vlak voor H5 Meiose. Opnieuw: `audio/s20.mp3` + `words/s20.json`; ± 20 s langer, H5 en verder schuiven op. Cues ('Noem', 'verdubbelt', 'mitose', 'weer', 'gehalveerd', 'genetisch') vallen op het eerste voorkomen en blijven kloppen.
- **Beeld nodig**: na de DNA-grafiek een aardbeiplant met uitloper en nieuw plantje, en een bladluis met jongen; label "klonen: genetisch gelijk"; daarna een korte overgang "geslachtelijk: meiose → variatie" (sluit aan op H5). Begrip "ongeslachtelijke voortplanting" in `GLOSSARY`.
- **Risicowoorden (uitspraaktest)**:
  - ongeslachtelijke / geslachtelijke — geen IPA gevonden; verwacht klemtoon op "slach" (on-ge-SLACH-te-lij-ke). Als geschreven; alternatief `on-geslachtelijke`.
  - bladluis — /ˈblɑt.lœy̯s/, blad-luis (Wiktionary via kaikki.org); als geschreven.
  - aardbeiplant, uitlopers, klonen — gewone woorden; als geschreven ("klonen" moet het zelfstandig naamwoord zijn, KLOO-nen).

## Wijziging 15 okt 2026

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). Nu `naamBij`: het midden, spoelfiguur (onder de cel), centromeer onder spanning, enzym, afbreken en kinetochoor (extra uitdaging, naast de trekdraad), celplaat (boven de cel), teelballen / eierstokken.

## Wijziging 16 okt 2026

Versie 1.3: ongeslachtelijke en geslachtelijke voortplanting toegevoegd (Kamiel: hangt samen met mitose en meiose). Nieuwe segmenten v01 (na s20) en v02 (na s26) met eigen scènes (Schema), zie 'Voortplanting (v01, v02)'. Ingeplakt in de gepubliceerde film (speler, teller, licentie en namen-zonder-wijslijnen blijven), `src/scenes.js` en `src/page.html` (docenttabel, leerdoel 5b, versie) bijgewerkt, begrippen in `GLOSSARY` van de film. Duur op de site 12 → 13 min.
