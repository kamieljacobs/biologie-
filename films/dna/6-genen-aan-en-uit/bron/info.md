# Genen aan en uit — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/dna/6-genen-aan-en-uit.html (één zelfstandig bestand; audio en lettertypen ingebed) |
| Reeks / nummer | DNA, film 6 van 8 (seriebrief DNA in “Seriebriefs uitlegfilms biologie”) |
| Doelgroep / niveau | havo + vwo; vwo-blokken na hoofdstuk 2 (activator, repressor, enhancer), hoofdstuk 3 (totipotent, pluripotent, multipotent) en hoofdstuk 4 (methylering, histonen, X-inactivatie en de lapjeskat) (`level:'vwo'`), Havo/Vwo-schakelaar, `?niveau=havo`, `?modus=klas` |
| Versie / datum | 1.0 · 13 oktober 2026 — eerste versie, Part C (prompt v5), gemaakt in reeksmodus (Part E); opening = puzzel A (eeneiige tweeling); stem eleven_v3 zonder uitspraaktest vooraf |
| Stem / model | Roos (ElevenLabs, voice 7qdUFMklKPaaAVMsBTBt, model eleven_v3); één take per alinea of vraag |
| Duur | gesproken 10:18; speeltijd (zonder wachten bij vragen) vwo 11:41, havo 9:31 |
| Beeldstijl | Part C: Micro (#121A26 met korrel) voor molecuul en cel, Schema (#1A2740) voor klok, getallen, tabellen, vragen en kaarten, Macro alleen voor de mens in opening en samenvatting (overgang via zoomcirkel). Vaste UI-laag: ondertitelkast, labels met aanwijslijn, paarse vwo-balk, vraagkaart. Lettertypen Fraunces, Source Sans 3, IBM Plex Mono ingebed |
| Audio-opslag | base64 in `FILMDATA.segments[].audio` (data-URI per segment); woordtijden in `words` |
| Bouwstraat | `films/dna/_bouw/` (gedeeld door de DNA-reeks): `src/` (lib, dnalib, scenes1–6, player, page), `build.py`, `films.py`, `data/` (script, woordtijden, stem-invoer, docentdeel). Zie `_bouw/README.md` |

## Opbouw
Begintijden in de speler (hoofdstukkaart), vwo en havo.

| Begin vwo | Begin havo | Hoofdstuk | Segmenten | Type · look | Kernbeeld |
|---|---|---|---|---|---|
| 0:00 | 0:00 | Opening | n0 | I toepassing · Macro | de tweeling als kleuters en vijftig jaar later; paneel zelfde DNA; de kookboekvraag |
| 0:30 | 0:30 | Hoofdstuk 1 — Zelfde DNA, andere cel | n3, q4, n5, n6 | B structuur / A mechanisme · Schema + Macro (beekprik) | huidcel, levercel, zenuwcel uit één eicel; genstrip met alle genen; gen → mRNA → eiwit; keratine aan / albumine uit; beekprik larve → vis |
| 2:17 | 2:17 | Hoofdstuk 2 — Hoe zet een cel een gen aan? | n8, q9, n10, n11 | A mechanisme + A · Schema | promotor (DNA) met transcriptiefactor (eiwit) en polymerase; aan/uit; structuur- en regulatorgenen; oestradiol → receptor → kern → gen aan → eiwit / groene activator, koraal repressor; enhancer ver van het gen met lus |
| 4:26 | 3:57 | Hoofdstuk 3 — Stamcellen | n13, q14, n15, n16 | A + G + B · Schema | eicel deelt; embryonale en volwassen stamcellen; twee dingen die een stamcel kan; deling met gelijke dochters → stamcel of rode bloedcel; hemoglobine aan/uit; apoptose (vliezen); zenuwcel met slotjes; lab: regulatorgenen aan → stamcel / totipotent, pluripotent, multipotent met steeds meer slotjes |
| 7:02 | 5:57 | Hoofdstuk 4 — Slotjes op het DNA | n18, n19, q20, n21, n22 | A + I + A · Schema + Macro (zoomcirkel) + Schema | methylgroep en slotje op de promotor; transcriptiefactor kan er niet bij; dochtercellen krijgen het slotje mee; voeding/stress/roken; longcel van de rokende zus; rattenvraag met zaadcellen en slotjes / histonen met acetylgroepen (open) en zonder (dicht); twee X-chromosomen, één op slot; lapjeskat met plukjes; kater met één X |
| 10:51 | 8:41 | Samenvatting — Terug naar de tweeling | n24, n25 | — · Macro + Schema | de twee zussen met paneel; helix met vergrootglas (naar aflevering 7) |

## Voorspelvragen
De vraag wordt ingesproken (eigen take), daarna 8 s denktijd en 2,5 s onthulling; het antwoord wordt in het volgende segment uitgesproken.

| Segment | Niveau | Vraag | Opties (juist vet) |
|---|---|---|---|
| q4 | basis | Waarin verschilt een zenuwcel van een nog niet gespecialiseerde cel? | de zenuwcel is genen kwijtgeraakt · **de zenuwcel gebruikt andere genen** · de zenuwcel heeft extra genen gekregen |
| q9 | basis | Het hormoon oestradiol zet in borstcellen genen aan. Het hormoon gaat de cel in. Wat is de eerste stap daarna? | **het hormoon bindt aan een receptor, en samen werken ze als transcriptiefactor** · het hormoon bindt zelf aan de promotor van het gen · het hormoon bindt aan RNA-polymerase |
| q14 | basis | Uit gedoneerde stamcellen ontstaan verschillende typen bloedcellen. Hoe heet dat proces, en waar komt het door? | adaptatie, door mutatie · differentiatie, door mutatie · **differentiatie, door genexpressie** |
| q20 | basis | Vaderratten kregen een vetrijk dieet; de moeders aten gewoon. De dochters hadden een andere genexpressie in de alvleesklier dan dochters van gewone vaders. Wat is de meest voor de hand liggende oorzaak? | de omstandigheden in de baarmoeder · een mutatie in de zaadcellen van de vader · **slotjes op genen in de zaadcellen van de vader** |

## Begrippen
- genexpressie — Het gebruiken van een gen: het gen wordt overgeschreven naar mRNA (transcriptie) en dat wordt meestal vertaald naar een eiwit (translatie). Een gen dat tot expressie komt, staat aan.
- genregulatie — Het aan- of uitzetten van genen. Elke cel met een kern heeft alle genen, maar gebruikt er maar een deel van; welk deel verschilt per celtype en per moment.
- transcriptiefactor — Eiwit dat bij de promotor (of een ander regelgebied) van een gen bindt en bepaalt of RNA-polymerase het gen kan overschrijven. De promotor zelf is een stuk DNA.
- regulatorgenen en structuurgenen — Regulatorgenen coderen voor eiwitten die de genexpressie regelen (zoals transcriptiefactoren); structuurgenen coderen voor de eiwitten die het werk in de cel doen.
- stamcellen — Cellen die nog niet gespecialiseerd zijn en lang kunnen blijven delen; bij een deling blijft de ene dochtercel stamcel en kan de andere differentiëren. Embryonale stamcellen in het embryo, volwassen stamcellen bijvoorbeeld in het beenmerg.
- celdifferentiatie — Proces waarbij een stamcel zich ontwikkelt tot een specifiek celtype, doordat andere genen aan en uit gaan.
- apoptose — Proces waarbij een cel zichzelf laat afsterven, waardoor overbodige of beschadigde cellen verdwijnen.
- epigenetica — Wetenschap van alles wat genen aan of uit zet zonder de basenvolgorde te veranderen (zoals methylgroepen op het DNA), en van hoe factoren als voeding, stress en roken daar invloed op hebben.
- activator en repressor *vwo* — Transcriptiefactoren die de binding van RNA-polymerase bevorderen (activator) of remmen (repressor); een enhancer is een DNA-stuk, soms ver van het gen, dat de transcriptie versterkt als er een activator op zit.
- histonmodificatie *vwo* — Acetylgroepen op histonen maken het chromatine losser (gen aan); zonder zit het DNA strak opgerold (gen uit). Bij genen voor tRNA en rRNA stopt expressie bij de transcriptie.
- X-inactivatie *vwo* — In elke cel van een vrouwelijk embryo wordt vroeg één van de twee X-chromosomen willekeurig uitgeschakeld (methylering en histonen samen; zichtbaar als Barr-lichaampje); dochtercellen houden hetzelfde X inactief (lapjeskat).
- potentie van stamcellen *vwo* — Totipotent (bevruchte eicel: alles, ook placenta), pluripotent (embryonale stamcellen: alle lichaamscellen), multipotent (volwassen stamcellen: een beperkt aantal celtypen).

## Checkvragen
- (basis) Een huidcel en een levercel van dezelfde persoon: wat is hetzelfde en wat verschilt? — *Het DNA (alle genen) is hetzelfde; de genexpressie verschilt: in elke cel staan andere genen aan, zodat andere eiwitten worden gemaakt.*
- (basis) (naar CvTE havo 2026-I, vraag 11) Tijdens de metamorfose van larve tot volwassen beekprik ontstaan ogen en vinnen en verdwijnt de darm. Verandert het genotype? Verandert de genexpressie? — *Genotype: nee. Genexpressie: ja; andere genen gaan aan en uit.*
- (basis) Leg uit hoe een hormoon dat de cel in gaat een gen kan aanzetten. — *Het hormoon bindt aan een receptor in de cel; het hormoon-receptorcomplex werkt in de kern als transcriptiefactor bij het regelgebied van het gen; RNA-polymerase maakt mRNA; aan de ribosomen ontstaat het eiwit.*
- (basis) (naar CvTE havo 2024-I, vraag 8) Juist of onjuist: 1 uit één stamcel ontstaat na mitose één endotheelcel en één bindweefselcel; 2 een endotheelcel krijgt zijn vorm en functie door celdifferentiatie; 3 celdifferentiatie wordt bepaald door veranderingen in genexpressie. — *1 onjuist: direct na de mitose zijn de dochtercellen gelijk (zelfde DNA, zelfde genexpressie); het verschil ontstaat pas daarna door differentiatie. 2 juist. 3 juist.*
- (basis) Waarom is een methylgroep op het DNA geen mutatie? — *De basenvolgorde verandert niet; alleen de genexpressie verandert (het gen wordt niet meer afgelezen). Dat is een epigenetische verandering.*
- (vwo) Een repressor blokkeert gen A. Gen A codeert voor een repressor van gen B. Staat gen B aan of uit? — *Aan: de repressor van A zorgt dat A uit staat, dus de repressor van B wordt niet gemaakt en B komt tot expressie (twee remmingen na elkaar = activatie).*
- (vwo) Waarom zijn lapjeskatten bijna altijd vrouwtjes? — *Het gen voor vachtkleur met de allelen oranje en zwart ligt op het X-chromosoom. Alleen een poes (XX) kan oranje op het ene X en zwart op het andere hebben; door willekeurige X-inactivatie vroeg in het embryo ontstaan plukjes cellen met oranje en plukjes met zwart. Een kater (XY) heeft één X en is dus óf oranje óf zwart; een lapjeskater heeft meestal XXY.*
- (vwo) Een vrouw is heterozygoot voor een X-chromosomale aandoening. Verklaar waarom de ernst per vrouw verschilt. — *Door willekeurige X-inactivatie verschilt per vrouw het aandeel cellen waarin het X met het gemuteerde allel actief is; hoe groter dat aandeel, hoe ernstiger.*

## Getallen
| Getal | In de film | Bron |
|---|---|---|
| Genen in het menselijk genoom | ongeveer 20 000 | Ensembl GRCh38 (eiwitcoderend) |
| Vliezen tussen de vingers | verdwijnen door apoptose vóór de geboorte | Alberts, Molecular Biology of the Cell |
| Lapjeskat | bijna altijd vrouwelijk (X-inactivatie); lapjeskater meestal XXY | standaard genetica |
| Terugzetten van een huidcel naar stamcel | een paar regulatorgenen (Yamanaka-factoren, 2006) | Takahashi & Yamanaka, Cell 2006 |

## Techniek: waar zit wat in de HTML
Regelnummers in 6-genen-aan-en-uit.html (de base64-audio staat binnen FILMDATA op één regel, dus `filmbron.py uitpakken` verandert de regels niet).
- **FILMDATA** (segmenten, woordtijden, regelgrenzen `bounds`, audio, filmtitel/eindkaart/hoofdstukvragen): regel 139. Speech-segment: `id`, `kind:'speech'`, `level`, `chapter`, `scene`, `audio`, `dur` (take + 0,6 s), `bounds` (regelgrenzen in s), `words` (`t,s,e`). Vraag: `q`, `options`, `correct` (0-based), `audio`, `adur`.
- **Part C-bibliotheek** (`C`-tokens, korrel, labels, zoomcirkel, cel, kern): regel 140; **DNA-bibliotheek** (basen met paarrand, ruggengraat, ladder, helix, nucleotide, enzym, persoon, klok): regel 322.
- **Scènes**: regel 552; één functie per scènenaam (`SCENES.h2a=(ctx,li,lf,t,q)`), `li` = regelnummer binnen het segment, `lf` = 0..1 binnen die regel (uit `bounds`). Beeldwissels hangen dus aan de gesproken regels.
- **Begrippen**: `const GLOSSARY` regel 740. **Speler**: regel 741 (tijdlijn, vraagfasen ask → countdown → wait/reveal, Havo/Vwo, Leerling/Klas, toetsen, ondertitels uit `words`).
- **Paginatekst** (kop, checkvragen, docentdeel, footer): statische HTML in de pagina; komt uit `_bouw/films.py` en `_bouw/data/afl6_docent.htmlfrag`.

## Zo pas je deze film aan
1. Werk in `films/dna/_bouw/` (kopieer de map naar een werkmap buiten de repo). Haal eerst de audio terug: `python3 haal_audio.py 6 ../6-genen-aan-en-uit.html`.
2. **Beeld**: pas `src/scenes6.js` aan (zoek de scènenaam uit de tabel Opbouw, bijv. `SCENES.h2a`), daarna `python3 build.py 6` → `out/6-genen-aan-en-uit.html`. Controleer met `node grab.js <pad>/out/6-genen-aan-en-uit.standalone.html qa/x 6` en `python3 sheet.py qa/x qa/x.png 7`.
3. **Tekst op de pagina, titel, hoofdstukvragen, eindkaart**: `films.py`. **Docentdeel**: `data/afl6_docent.htmlfrag`. **Begrippen, checkvragen, getallen**: `data/afl6_script.json`.
4. **Een alinea opnieuw inspreken**: stem-invoer uit `data/afl6_stem.json` (respellings volgens de uitspraaklijst), Roos, eleven_v3, één take. Vervang `data/afl6_audio/<id>.mp3` (−16 LUFS, −1 dBTP), zet nieuwe woordtijden (Scribe) en `bounds` in `data/afl6_words.json`, en pas de tekst aan in `data/afl6_script.json`. Andere segmenten blijven ongemoeid.
5. Kopieer `out/6-genen-aan-en-uit.html` naar `films/dna/`, werk dit bestand en script.md bij (versie, datum, wat er veranderd is) en push.

## Aandachtspunten
- Alle tekst moet boven y = 892 blijven: de speler knipt scènes daar af (ondertitelzone).
- Meta-tekst staat in kapitalen, behalve eenheden (`metaCase` in de bibliotheek): µm, nm, °C blijven correct.
- De pijl → en ≈ zitten niet in de ingebedde lettertypes en vallen terug op het systeemlettertype.
- Basen zijn vier tinten paars en verschillen ook in letter en paarrand (A punt, T inkeping, C nok, G sleuf); RNA is teal (primer in film 2; mRNA en tRNA in film 3), eiwit en aminozuren oker, ribosoom #C9B896.
- **Geen uitspraaktest vooraf** (afspraak Kamiel 13 okt 2026): opgenomen met eleven_v3, één take per alinea, spellingen uit de uitspraaklijst plus nieuwe respellings op basis van de standaard Nederlandse klemtoon (IPA): eustradiol, keratienuh/albumienuh/hemoglobienuh (-ine als /inə/), aapoptoze, metielgroep/metielering, acetielgroepen, em-er-en-aa (mRNA), er-en-aa-polymerase, iks (X-chromosoom). Wachtlijst hieronder voor de verzameltest.
- Uitspraak-wachtlijst (eerste voorkomen per take; tijd = binnen de take; `FILMDATA.segments[<take>]`):

| woord | take | tijd in take |
|---|---|---|
| DNA | n0 | 0:15.0 |
| DNA | n5 | 0:01.4 |
| genexpressie | n5 | 0:11.8 |
| mRNA | n5 | 0:15.3 |
| huidkeratine | n5 | 0:27.8 |
| albumine | n5 | 0:35.7 |
| beekprik | n6 | 0:02.1 |
| genotype | n6 | 0:14.8 |
| genexpressie | n6 | 0:16.9 |
| promotor | n8 | 0:03.2 |
| DNA | n8 | 0:04.6 |
| RNA-polymerase | n8 | 0:07.6 |
| transcriptiefactor | n8 | 0:13.7 |
| keratine | n8 | 0:28.3 |
| albumine | n8 | 0:29.5 |
| structuurgenen | n8 | 0:30.8 |
| transcriptiefactoren | n8 | 0:38.3 |
| regulatorgenen | n8 | 0:40.5 |
| oestradiol | q9 | 0:00.5 |
| Oestradiol | n10 | 0:01.1 |
| receptor | n10 | 0:03.8 |
| transcriptiefactor | n10 | 0:06.7 |
| regelgebied | n10 | 0:09.3 |
| RNA-polymerase | n10 | 0:11.2 |
| mRNA | n10 | 0:15.6 |
| DNA | n10 | 0:21.6 |
| transcriptiefactoren | n11 | 0:04.5 |
| activator | n11 | 0:06.6 |
| repressor | n11 | 0:10.0 |
| oestradiol | n11 | 0:14.3 |
| receptor | n11 | 0:15.6 |
| enhancer | n11 | 0:19.0 |
| DNA | n11 | 0:20.5 |
| stamcellen | n13 | 0:07.6 |
| embryonale | n13 | 0:10.0 |
| beenmerg | n13 | 0:12.7 |
| stamcel | n13 | 0:16.1 |
| celdifferentiatie | n13 | 0:23.9 |
| stamcellen | q14 | 0:00.8 |
| Differentiatie | n15 | 0:01.0 |
| genexpressie | n15 | 0:02.6 |
| DNA | n15 | 0:04.9 |
| hemoglobine | n15 | 0:12.5 |
| apoptose | n15 | 0:25.1 |
| regulatorgenen | n15 | 0:44.1 |
| stamcel | n15 | 0:47.4 |
| stamcel | n16 | 0:03.6 |
| totipotent | n16 | 0:08.8 |
| placenta | n16 | 0:12.0 |
| Embryonale | n16 | 0:13.0 |
| stamcellen | n16 | 0:14.2 |
| pluripotent | n16 | 0:15.2 |
| beenmerg | n16 | 0:21.2 |
| multipotent | n16 | 0:22.1 |
| gedifferentieerd | n16 | 0:27.1 |
| DNA | n18 | 0:01.7 |
| genexpressie | n18 | 0:03.3 |
| methylgroep | n18 | 0:13.9 |
| promotor | n18 | 0:16.1 |
| transcriptiefactor | n18 | 0:19.8 |
| epigenetische | n18 | 0:39.4 |
| differentiatie | n19 | 0:02.4 |
| DNA | n19 | 0:36.9 |
| Epigenetica | n19 | 0:39.5 |
| genexpressie | q20 | 0:06.0 |
| alvleesklier | q20 | 0:07.0 |
| methylering | n22 | 0:04.0 |
| DNA | n22 | 0:08.2 |
| histonen | n22 | 0:09.5 |
| acetylgroepen | n22 | 0:13.2 |
| lapjeskat | n22 | 0:26.1 |
| X-chromosomen | n22 | 0:28.6 |
| X | n22 | 0:37.3 |
| X-chromosoom | n22 | 0:38.8 |
| lapjeskatten | n22 | 1:00.2 |
| DNA | n24 | 0:01.3 |
| genexpressie | n24 | 0:06.4 |
| Transcriptiefactoren | n24 | 0:07.6 |
| differentiatie | n24 | 0:16.3 |
| epigenetica | n24 | 0:24.2 |
| DNA | n25 | 0:02.1 |

- Puzzels: gekozen A (eeneiige tweeling, rode draad door de hele film). Afgevallen: B (beekprik-metamorfose: nu kort in h1c als voorbeeld, CE havo 2026-I), C (stamceltherapie/iPS: nu kort in h3b).
- CE-vragen geparafraseerd en naar drie keuzes omgezet (havo 2022-I v12 en v26, 2024-I v27, 2025-I v15; op de pagina 2026-I v11, 2024-I v8); antwoorden zelf uitgewerkt, correctievoorschriften niet ingezien.
- Vereenvoudigingen: één transcriptiefactor op de promotor (initiatiecomplex en enhancers weggelaten, enhancer alleen in het vwo-blok); 'slotje' = DNA-methylering bij de promotor; rattenvraag: mechanisme in de zaadcellen nog onderwerp van onderzoek; XIST niet genoemd (zie docentdeel).
- Lengte: spraak vwo ≈ 10:30, havo ≈ 8:20. Kandidaten om in te korten: h3b (lab/iPS-zin), h4b (laatste zin, definitie epigenetica) en h4v (histonen).
- Nieuwe bibliotheekobjecten (scenes6.js): lock, methyl, tf, geneRow, geneStrip, skinCell, liverCell, nerveCell, redCell, stemCell, egg, lamprey, rat, cat, hand, cig, heartMark; twee vaste figuren TWIN_A (groen shirt, hardloopster) en TWIN_B (grijs shirt, rookt).
- Denktijd 12 s bij V4 (`think`).

## Wijzigingen
- 1.0 · 13 okt 2026 — eerste versie (reeksmodus). Script nagekeken door een vakinhoudelijke review (15 punten, o.a. stamceldeling vlak na de deling nog gelijk, lapjeskat met allelen oranje/zwart en lapjeskater XXY, slotjes ook door de cel zelf, structuurgenen erbij, X-inactivatie) en een didactiek/taal-review (15 punten, o.a. V1 zonder genoom/genotype als afleiders, hormoonvraag met promotor/polymerase als afleiders, rattenvraag met moeders aten gewoon in de stam, kookboekmetafoor, slotje niet voorgoed). Beelden nagekeken op stijlframes en contactsheets vwo en havo.
