# Genen aan en uit — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/dna/6-genen-aan-en-uit.html (één zelfstandig bestand; audio en lettertypen ingebed) |
| Reeks / nummer | DNA, film 6 van 8 (seriebrief DNA in “Seriebriefs uitlegfilms biologie”) |
| Doelgroep / niveau | havo + vwo; het lac-operon in hoofdstuk 2 (n10b) is basis (havo-toets). Vwo-blokken na hoofdstuk 2 (activator, repressor, enhancer; RNA-interferentie), hoofdstuk 3 (totipotent, pluripotent, multipotent) en hoofdstuk 4 (methylering, histonen, X-inactivatie en de lapjeskat) (`level:'vwo'`), Havo/Vwo-schakelaar, `?niveau=havo`, `?modus=klas` |
| Versie / datum | 1.1 · 16 oktober 2026 — lac-operon (basis, n10b) en RNA-interferentie (vwo, n11b) toegevoegd; alleen die stukken ingesproken. 1.0 · 13 oktober 2026 — eerste versie, Part C (prompt v5), gemaakt in reeksmodus (Part E); opening = puzzel A (eeneiige tweeling); stem eleven_v3 zonder uitspraaktest vooraf |
| Prompt | v5 |
| Stem / model | Roos (ElevenLabs, voice 7qdUFMklKPaaAVMsBTBt, model eleven_v3); één take per alinea of vraag |
| Duur | gesproken vwo 12:33, havo 9:06; speeltijd in de speler (met denktijd bij vragen) vwo 13:47, havo 10:26 |
| Beeldstijl | Part C: Micro (#121A26 met korrel) voor molecuul en cel, Schema (#1A2740) voor klok, getallen, tabellen, vragen en kaarten, Macro alleen voor de mens in opening en samenvatting (overgang via zoomcirkel). Vaste UI-laag: ondertitelkast, labels met aanwijslijn, paarse vwo-balk, vraagkaart. Lettertypen Fraunces, Source Sans 3, IBM Plex Mono ingebed |
| Audio-opslag | base64 in `FILMDATA.segments[].audio` (data-URI per segment); woordtijden in `words` |
| Bouwstraat | `films/dna/_bouw/` (gedeeld door de DNA-reeks): `src/` (lib, dnalib, scenes1–6, player, page), `build.py`, `films.py`, `data/` (script, woordtijden, stem-invoer, docentdeel). Zie `_bouw/README.md`. Sinds 1.1: bouwen met `patch6.py` (zie Zo pas je deze film aan) |

## Opbouw
Begintijden in de speler (hoofdstukkaart), vwo en havo.

| Begin vwo | Begin havo | Hoofdstuk | Segmenten | Type · look | Kernbeeld |
|---|---|---|---|---|---|
| 0:00 | 0:00 | Opening | n0 | I toepassing · Macro | de tweeling als kleuters en vijftig jaar later; paneel zelfde DNA; de kookboekvraag |
| 0:30 | 0:30 | Hoofdstuk 1 — Zelfde DNA, andere cel | n3, q4, n5, n6 | B structuur / A mechanisme · Schema + Macro (beekprik) | huidcel, levercel, zenuwcel uit één eicel; genstrip met alle genen; gen → mRNA → eiwit; keratine aan / albumine uit; beekprik larve → vis |
| 2:16 | 2:16 | Hoofdstuk 2 — Hoe zet een cel een gen aan? | n8, q9, n10, n10b, n11, n11b | A mechanisme + A · Schema | promotor (DNA) met transcriptiefactor (eiwit) en polymerase; aan/uit; structuur- en regulatorgenen; oestradiol → receptor → kern → gen aan → eiwit; **lac-operon (basis, scène `h2op`)**: E. coli, DNA-streep met regulatorgen, promotor, operator, drie structuurgenen, repressor als eiwitketen op de operator, lactose bindt, repressor laat los, polymerase loopt, dun mRNA, enzymen vouwen / vwo: groene activator, koraal repressor; enhancer ver van het gen met lus; **RNA-interferentie (scène `h2ri`)**: DNA → mRNA → eiwit met ingreep op het mRNA, microRNA (haarspeld) en siRNA (geknipt dubbelstrengs RNA), RISC zoekt passend mRNA (baseparing), knippen/afbreken of translatie geblokkeerd, vergelijking met regeling van de transcriptie, onderzoek en medicijn (lever) |
| 6:37 | 4:51 | Hoofdstuk 3 — Stamcellen | n13, q14, n15, n16 | A + G + B · Schema | eicel deelt; embryonale en volwassen stamcellen; twee dingen die een stamcel kan; deling met gelijke dochters → stamcel of rode bloedcel; hemoglobine aan/uit; apoptose (vliezen); zenuwcel met slotjes; lab: regulatorgenen aan → stamcel / totipotent, pluripotent, multipotent met steeds meer slotjes |
| 9:09 | 6:50 | Hoofdstuk 4 — Slotjes op het DNA | n18, n19, q20, n21, n22 | A + I + A · Schema + Macro (zoomcirkel) + Schema | methylgroep en slotje op de promotor; transcriptiefactor kan er niet bij; dochtercellen krijgen het slotje mee; voeding/stress/roken; longcel van de rokende zus; rattenvraag met zaadcellen en slotjes / histonen met acetylgroepen (open) en zonder (dicht); twee X-chromosomen, één op slot; lapjeskat met plukjes; kater met één X |
| 12:57 | 9:36 | Samenvatting — Terug naar de tweeling | n24, n25 | — · Macro + Schema | de twee zussen met paneel; helix met vergrootglas (naar aflevering 7) |

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
- operon — Rij genen bij bacteriën met samen één promotor en één operator. Lac-operon van E. coli: een regulatorgen maakt een repressor die op de operator zit; lactose bindt aan de repressor, die laat los, en de drie structuurgenen worden overgeschreven (één mRNA).
- stamcellen — Cellen die nog niet gespecialiseerd zijn en lang kunnen blijven delen; bij een deling blijft de ene dochtercel stamcel en kan de andere differentiëren. Embryonale stamcellen in het embryo, volwassen stamcellen bijvoorbeeld in het beenmerg.
- celdifferentiatie — Proces waarbij een stamcel zich ontwikkelt tot een specifiek celtype, doordat andere genen aan en uit gaan.
- apoptose — Proces waarbij een cel zichzelf laat afsterven, waardoor overbodige of beschadigde cellen verdwijnen.
- epigenetica — Wetenschap van alles wat genen aan of uit zet zonder de basenvolgorde te veranderen (zoals methylgroepen op het DNA), en van hoe factoren als voeding, stress en roken daar invloed op hebben.
- activator en repressor *vwo* — Transcriptiefactoren die de binding van RNA-polymerase bevorderen (activator) of remmen (repressor); een enhancer is een DNA-stuk, soms ver van het gen, dat de transcriptie versterkt als er een activator op zit.
- RNA-interferentie *vwo* — Een gen uitzetten ná de transcriptie: een klein RNA (microRNA of siRNA, 20–25 nucleotiden) zit met één streng in RISC en bindt door baseparing aan een passend mRNA; precies passend: mRNA geknipt en afgebroken, deels passend: translatie geblokkeerd. Er wordt wel mRNA gemaakt, maar geen eiwit.
- histonmodificatie *vwo* — Acetylgroepen op histonen maken het chromatine losser (gen aan); zonder zit het DNA strak opgerold (gen uit). Bij genen voor tRNA en rRNA stopt expressie bij de transcriptie.
- X-inactivatie *vwo* — In elke cel van een vrouwelijk embryo wordt vroeg één van de twee X-chromosomen willekeurig uitgeschakeld (methylering en histonen samen; zichtbaar als Barr-lichaampje); dochtercellen houden hetzelfde X inactief (lapjeskat).
- potentie van stamcellen *vwo* — Totipotent (bevruchte eicel: alles, ook placenta), pluripotent (embryonale stamcellen: alle lichaamscellen), multipotent (volwassen stamcellen: een beperkt aantal celtypen).

## Checkvragen
- (basis) Een huidcel en een levercel van dezelfde persoon: wat is hetzelfde en wat verschilt? — *Het DNA (alle genen) is hetzelfde; de genexpressie verschilt: in elke cel staan andere genen aan, zodat andere eiwitten worden gemaakt.*
- (basis) (naar CvTE havo 2026-I, vraag 11) Tijdens de metamorfose van larve tot volwassen beekprik ontstaan ogen en vinnen en verdwijnt de darm. Verandert het genotype? Verandert de genexpressie? — *Genotype: nee. Genexpressie: ja; andere genen gaan aan en uit.*
- (basis) Leg uit hoe een hormoon dat de cel in gaat een gen kan aanzetten. — *Het hormoon bindt aan een receptor in de cel; het hormoon-receptorcomplex werkt in de kern als transcriptiefactor bij het regelgebied van het gen; RNA-polymerase maakt mRNA; aan de ribosomen ontstaat het eiwit.*
- (basis) (naar CvTE havo 2024-I, vraag 8) Juist of onjuist: 1 uit één stamcel ontstaat na mitose één endotheelcel en één bindweefselcel; 2 een endotheelcel krijgt zijn vorm en functie door celdifferentiatie; 3 celdifferentiatie wordt bepaald door veranderingen in genexpressie. — *1 onjuist: direct na de mitose zijn de dochtercellen gelijk (zelfde DNA, zelfde genexpressie); het verschil ontstaat pas daarna door differentiatie. 2 juist. 3 juist.*
- (basis) Waarom is een methylgroep op het DNA geen mutatie? — *De basenvolgorde verandert niet; alleen de genexpressie verandert (het gen wordt niet meer afgelezen). Dat is een epigenetische verandering.*
- (basis) Bij E. coli is er geen lactose. Leg uit waarom de drie structuurgenen van het lac-operon dan uit staan, en wat er verandert als er lactose bij komt. — *Het regulatorgen maakt een repressor die op de operator zit; RNA-polymerase kan de structuurgenen niet overschrijven. Lactose bindt aan de repressor, die laat los; de drie genen worden overgeschreven (één mRNA) en de enzymen voor lactose worden gemaakt.*
- (basis) Door een mutatie in het regulatorgen kan de repressor niet meer aan de operator binden. Gevolg? — *De structuurgenen staan altijd aan: de enzymen worden ook gemaakt zonder lactose.*
- (vwo) Een repressor blokkeert gen A. Gen A codeert voor een repressor van gen B. Staat gen B aan of uit? — *Aan: de repressor van A zorgt dat A uit staat, dus de repressor van B wordt niet gemaakt en B komt tot expressie (twee remmingen na elkaar = activatie).*
- (vwo) Een siRNA past precies op het mRNA van gen X. Wordt gen X nog getranscribeerd? Wordt eiwit X nog gemaakt? — *Transcriptie gaat door (RNA-interferentie grijpt ná de transcriptie in); eiwit X wordt (bijna) niet meer gemaakt: het siRNA in RISC bindt door baseparing aan het mRNA, dat wordt geknipt en afgebroken.*
- (vwo) Verschil tussen een gen uitzetten met een repressor en met RNA-interferentie? — *Repressor: bindt aan het DNA, geen transcriptie, geen mRNA. RNA-interferentie: mRNA wordt wél gemaakt, maar afgebroken of niet vertaald.*
- (vwo) Waarom zijn lapjeskatten bijna altijd vrouwtjes? — *Het gen voor vachtkleur met de allelen oranje en zwart ligt op het X-chromosoom. Alleen een poes (XX) kan oranje op het ene X en zwart op het andere hebben; door willekeurige X-inactivatie vroeg in het embryo ontstaan plukjes cellen met oranje en plukjes met zwart. Een kater (XY) heeft één X en is dus óf oranje óf zwart; een lapjeskater heeft meestal XXY.*
- (vwo) Een vrouw is heterozygoot voor een X-chromosomale aandoening. Verklaar waarom de ernst per vrouw verschilt. — *Door willekeurige X-inactivatie verschilt per vrouw het aandeel cellen waarin het X met het gemuteerde allel actief is; hoe groter dat aandeel, hoe ernstiger.*

## Getallen
| Getal | In de film | Bron |
|---|---|---|
| Genen in het menselijk genoom | ongeveer 20 000 | Ensembl GRCh38 (eiwitcoderend) |
| Vliezen tussen de vingers | verdwijnen door apoptose vóór de geboorte | Alberts, Molecular Biology of the Cell |
| Lapjeskat | bijna altijd vrouwelijk (X-inactivatie); lapjeskater meestal XXY | standaard genetica |
| Terugzetten van een huidcel naar stamcel | een paar regulatorgenen (Yamanaka-factoren, 2006) | Takahashi & Yamanaka, Cell 2006 |
| Lengte microRNA / siRNA | zo'n 20 tot 25 nucleotiden | Alberts (siRNA ± 21–23 nt, microRNA ± 22 nt) |
| Medicijn met siRNA | in de lever de aanmaak van een schadelijk eiwit stilleggen | patisiran (2018): remt transthyretine bij erfelijke ATTR-amyloïdose |

## Techniek: waar zit wat in de HTML
Regelnummers in 6-genen-aan-en-uit.html (de base64-audio staat binnen FILMDATA op één regel, dus `filmbron.py uitpakken` verandert de regels niet).
- **FILMDATA** (segmenten, woordtijden, regelgrenzen `bounds`, audio, filmtitel/eindkaart/hoofdstukvragen): regel 144. Speech-segment: `id`, `kind:'speech'`, `level`, `chapter`, `scene`, `audio`, `dur` (take + 0,6 s), `bounds` (regelgrenzen in s), `words` (`t,s,e`). Vraag: `q`, `options`, `correct` (0-based), `audio`, `adur`.
- **Part C-bibliotheek** (`C`-tokens, korrel, labels, zoomcirkel, cel, kern): regel 145 (`naamBij` regel 207); **DNA-bibliotheek** (basen met paarrand, ruggengraat, ladder, helix, nucleotide, enzym, persoon, klok): regel 336.
- **Scènes**: regel 566 (lac-operon `SCENES.h2op` regel 702 met hulpfuncties `protChain` (eiwit als keten), `slier` (dun mRNA), `lactose`, `bacterie`, `operonRow` vanaf regel 678; RNA-interferentie `SCENES.h2ri` regel 724 met `dsRNA`, `risc`); één functie per scènenaam (`SCENES.h2a=(ctx,li,lf,t,q)`), `li` = regelnummer binnen het segment, `lf` = 0..1 binnen die regel (uit `bounds`). Beeldwissels hangen dus aan de gesproken regels.
- **Begrippen**: `const GLOSSARY` regel 847. **Speler**: regel 848 (tijdlijn, vraagfasen ask → countdown → wait/reveal, Havo/Vwo, Leerling/Klas, toetsen, ondertitels uit `words`).
- **Paginatekst** (kop, checkvragen, docentdeel, footer): statische HTML in de pagina; komt uit `_bouw/films.py` en `_bouw/data/afl6_docent.htmlfrag`.

## Zo pas je deze film aan
1. Werk in `films/dna/_bouw/` (kopieer de map naar een werkmap buiten de repo). Haal eerst de audio terug: `python3 haal_audio.py 6 ../6-genen-aan-en-uit.html`.
   **Let op (sinds 1.1):** de gepubliceerde film heeft site-brede aanpassingen die niet in `src/lib.js` en `src/player.js` staan (naamBij zonder wijslijnen, snelheid, vragen aan/uit, 'Voor vwo' overslaan, teller, licentie). Bouw daarom met `python3 patch6.py ../6-genen-aan-en-uit.html out/6-genen-aan-en-uit.html`: dat draait `build.py 6` en zet alleen FILMDATA, scènes, begrippen, checkvragen, docentdeel en footertekst in de gepubliceerde film. `src/scenes6.js` is gelijk aan de scènes in de film (gebruikt `naamBij`), dus een kale `build.py 6` geeft een JS-fout.
   Segmenten hebben sinds 1.1 een vast `id` in `data/afl6_script.json` (niet meer het volgnummer), zodat een nieuwe alinea (bv. `n10b`) de andere opnames niet verschuift; `build.py` gebruikt dat `id` als het er is.
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
- Uitspraak-wachtlijst (eerste voorkomen per take; tijd = binnen de take; `FILMDATA.segments[<take>]`). Nieuw 16-10-2026 (n10b, n11b) met gekozen stem-invoer: E. coli → ee-koolie (/eː ˈkoːli/), lac-operon → lak-operon (/lɑk oːpəˈrɔn/), operator en operon zoals geschreven (klemtoon -ra- / -ron), lactose zoals geschreven (/lɑkˈtoːzə/), RNA-interferentie → er-en-aa-interferentie, microRNA → mikro-er-en-aa, siRNA → es-ie-er-en-aa, RISC → risk, nucleotiden en baseparing zoals geschreven:

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
| repressor | n10b | 0:03.8 |
| E. coli | n10b | 0:06.8 |
| lactose | n10b | 0:11.2 |
| melksuiker | n10b | 0:12.2 |
| operator | n10b | 0:19.5 |
| operon | n10b | 0:26.2 |
| lac-operon | n10b | 0:27.4 |
| regulatorgen | n10b | 0:29.1 |
| RNA-polymerase | n10b | 0:34.6 |
| mRNA | n10b | 0:48.0 |
| RNA-interferentie | n11b | 0:03.7 |
| RNA | n11b | 0:08.2 |
| nucleotiden | n11b | 0:11.8 |
| microRNA | n11b | 0:12.7 |
| siRNA | n11b | 0:17.3 |
| dubbelstrengs RNA | n11b | 0:20.0 |
| RISC | n11b | 0:28.8 |
| baseparing | n11b | 0:36.5 |
| translatie | n11b | 0:49.6 |
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

## Wachtlijst opnieuw inspreken
- ~~n11 (vwo): lac-operon toevoegen~~ — **gedaan 16-10-2026**, anders dan eerst gepland: het lac-operon staat in de havo-toets (Biologie voor jou toets B) en is daarom een eigen **basis**-alinea `n10b` direct na n10 geworden (havo ziet hem ook), met eigen scène `h2op`. n11 zelf is niet opnieuw ingesproken; alleen de slotzin is eraf geknipt en verhuisd naar het eind van n11b.

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

`label()` tekent geen lijntje + stip meer naar de naam; de naam staat direct naast het onderdeel (nieuwe functie `naamBij()` uit Celorganellen, met donkere rand rond de letters). De oude aanroepen `label(ctx, naam, meta, ax, ay, lx, ly, …)` werken nog: de richting ax,ay → lx,ly bepaalt aan welke kant de naam komt. Opnieuw geplaatst (eigen `naamBij(...)` of andere richting): 'promotor', 'DNA', 'methylgroep'. Gecontroleerd op stills van alle scènes met namen.

## Wijziging 16 okt 2026 (versie 1.1): lac-operon en RNA-interferentie
- **n10b** (basis, havo + vwo, 55,7 s, scène `h2op`): repressor als eiwit dat in de weg zit; lac-operon van E. coli (regulatorgen, promotor, operator, drie structuurgenen; repressor op de operator → uit; lactose bindt de repressor → los → polymerase loopt, één mRNA → enzymen). Reden: staat in de havo-toets.
- **n11b** (vwo, 82,8 s, scène `h2ri`): RNA-interferentie (microRNA uit eigen genen, siRNA uit dubbelstrengs RNA; één streng in RISC; baseparing met passend mRNA; precies passend → knippen en afbreken, deels → translatie geblokkeerd; verschil met regeling van de transcriptie; onderzoek en medicijn). Vaste vwo-examenstof.
- **n11** ingekort (slotzin naar n11b). Begrippen operon en RNA-interferentie, vier checkvragen, twee getallen, docentdeel en de docenttabel (`films.py`) bijgewerkt.
- Opname: Roos, eleven_v3, één take per alinea, `generations_count` 1; ElevenLabs-flow "DNA 6 aanvulling lac-operon en RNAi". Audio −16 LUFS (loudnorm), 96 kbit/s mono zoals de rest; woordtijden met Scribe (`make_words6b.py`).
- Beeld: eiwitten als ketens die zich opvouwen (repressor koraal, enzymen oker, RISC als complex van ketens), mRNA als dunne sliert, namen direct bij de onderdelen. Gecontroleerd op contactbladen (vwo en havo) en een volledige doorloop in vwo, havo, en beide met vragen uit: geen JS-fouten.

## Wijziging 20 okt 2026

Na de uitspraaktest (19 okt, ronde 2 en 4): in de stem-invoer van **n10b** (lac-operon) is `ee-koolie` → `E. kóólie` (nadruk op kóólie) en `operator` → `operaator` (4×). n10b opnieuw ingesproken: Roos, eleven_v3, 1 take, flow zr2qkaksoeBJF36MJyiz; 763 credits TTS + Scribe voor de woordtijden; genormaliseerd met `_bouw/norm16.sh` (−16 LUFS, −1 dBTP). In de gepubliceerde film is alleen het segment n10b in `window.FILMDATA` vervangen (audio als data-URI, woordtijden, regelgrenzen `bounds` [4,73; 17,0; 30,78; 41,56; 53,587], `dur` 56,319 → 58,749 s); speler, beeld en de andere segmenten zijn ongewijzigd. Ook bijgewerkt: `_bouw/data/afl6_stem.json` en `afl6_words.json`. Getest (Playwright): vwo/havo, Vragen aan/uit, n10b speelt de nieuwe audio, geen JS-fouten.
- 20 okt 2026: in de HTML is 'E.' (E. coli) handmatig 'E.' + zero-width space geworden, zodat de ondertitel niet na 'E.' afbreekt; doe dat opnieuw na een herbouw.
