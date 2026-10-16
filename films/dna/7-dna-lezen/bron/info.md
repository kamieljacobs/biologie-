# DNA lezen — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/dna/7-dna-lezen.html (één zelfstandig bestand; audio en lettertypen ingebed) |
| Reeks / nummer | DNA, film 7 van 8 (seriebrief DNA in “Seriebriefs uitlegfilms biologie”) |
| Doelgroep / niveau | havo + vwo; vwo-blokken na hoofdstuk 1 (reverse transcriptase, primerkeuze), hoofdstuk 2 (STR, toevalskans), hoofdstuk 3 (referentiegenoom en variant) en hoofdstuk 4 (CRISPR-Cas9 en gentherapie; SNP's, gedeelde stukken en crossing-over) (`level:'vwo'`), Havo/Vwo-schakelaar, `?niveau=havo`, `?modus=klas` |
| Versie / datum | 1.2 · 16 oktober 2026 — n22 opnieuw (genetische modificatie in stappen met cDNA, basis), nieuw vwo-segment n22v (CRISPR-Cas9 met gids-RNA, gentherapie, somatisch/kiembaan), slotzin als n22c; 1.1 · 13 oktober 2026 — n3, n5, n6, n11 en n25 opnieuw ingesproken met "primer" zoals geschreven (Kamiels keuze); 1.0 · 13 oktober 2026 — eerste versie, Part C (prompt v5), gemaakt in reeksmodus (Part E); opening = puzzel A (cold case: bloedspoor en stamboomsite); stem eleven_v3 zonder uitspraaktest vooraf |
| Stem / model | Roos (ElevenLabs, voice 7qdUFMklKPaaAVMsBTBt, model eleven_v3); één take per alinea of vraag |
| Duur | gesproken 13:25; speeltijd (zonder wachten bij vragen) vwo 14:50, havo 11:22 |
| Beeldstijl | Part C: Micro (#121A26 met korrel) voor molecuul en cel, Schema (#1A2740) voor klok, getallen, tabellen, vragen en kaarten, Macro alleen voor de mens in opening en samenvatting (overgang via zoomcirkel). Vaste UI-laag: ondertitelkast, labels met aanwijslijn, paarse vwo-balk, vraagkaart. Lettertypen Fraunces, Source Sans 3, IBM Plex Mono ingebed |
| Audio-opslag | base64 in `FILMDATA.segments[].audio` (data-URI per segment); woordtijden in `words` |
| Bouwstraat | `films/dna/_bouw/` (gedeeld door de DNA-reeks): `src/` (lib, dnalib, scenes1–6, player, page), `build.py`, `films.py`, `data/` (script, woordtijden, stem-invoer, docentdeel). Zie `_bouw/README.md` |

## Opbouw
Begintijden in de speler (hoofdstukkaart), vwo en havo.

| Begin vwo | Begin havo | Hoofdstuk | Segmenten | Type · look | Kernbeeld |
|---|---|---|---|---|---|
| 0:00 | 0:00 | Opening | n0 | I toepassing · Macro | kapotte ruit met bloeddruppels; profiel naast lege databank; dossier de kast in; vergrootglas |
| 0:34 | 0:34 | Hoofdstuk 1 — Vermeerderen | n3, q4, n5, n6 | A mechanisme + A · Schema | buisje met bloed; rode cellen zonder kern; thermometer met drie standen; strengen los, primers binden, polymerase bouwt; 1 → 2 → 4 → miljard; coronatest (vraag 1) / RNA → reverse transcriptase → DNA → PCR; primers die alleen op virus-DNA passen |
| 3:00 | 2:29 | Hoofdstuk 2 — Sorteren | n8, n9, q10, n11, n12 | A + B + B · Schema | herhalingen GATA; twee versies (8 en 11); gel met min- en pluspool, korte stukken lopen verder; twintig plekken → streepjescode; bruinvissen (vraag 2) / één of twee banden per plek; alle twintig gelijk < 1 op een miljard; eeneiige tweeling |
| 5:38 | 4:37 | Hoofdstuk 3 — Lezen | n14, q15, n16, n17 | A mechanisme + B · Schema | gekleurde stopnucleotiden; kopieën van alle lengtes op lengte gesorteerd; laatste blokje lezen; 13 jaar → een dag; NIPT (vraag 3) / stukje naast referentie; afwijking = variant; meeste doen niets |
| 8:10 | 6:41 | Hoofdstuk 4 — Vinden | n19, q20, n21, n22, n22v, n22c, n23 | I toepassing + A · Macro + Schema + Schema | profiel niet in databank; stamboomsite; NL vs VS; stamboom naar beneden; achterneef (vraag 4); wattenstaafje, match; knippen en plakken: restrictie-enzym, plasmide, CRISPR / SNP’s op twee chromosomen; gedeeld stuk; crossing-over knipt per generatie; genetische modificatie in vijf stappen met stappenbalk (mRNA uit alvleeskliercel, cDNA met reverse transcriptase, knippen met hetzelfde restrictie-enzym, ligase, selectie met antibioticum) / Cas9 en gids-RNA op de DNA-tegels, reparatie, gentherapie, sikkelcellen, somatisch vs kiembaan |
| 13:56 | 10:28 | Samenvatting — Terug naar de zaak | n25, n26 | — · Macro + Schema | vier iconen: buisje, gel, kleurenrij, stamboom; brug naar aflevering 8 |

## Voorspelvragen
De vraag wordt ingesproken (eigen take), daarna 8 s denktijd en 2,5 s onthulling; het antwoord wordt in het volgende segment uitgesproken.

| Segment | Niveau | Vraag | Opties (juist vet) |
|---|---|---|---|
| q4 | basis | Bij een coronatest met PCR wordt in een neusmonster gezocht naar het virus. Wat wordt met de PCR aangetoond? | **een bepaalde nucleotidenvolgorde van het virus** · bepaalde eiwitten van het virus · een bepaalde aminozuurvolgorde van het virus |
| q10 | basis | Bruinvissen spoelen aan met bijtwonden. Is het de grijze zeehond? Onderzoekers nemen een monster van een dichte bijtwond, van een open bijtwond en van gewone huid, en zoeken daarin naar zeehond-DNA. Waar verwacht je dat? | in de dichte én de open wond · **alleen in de dichte wond** · in alle drie de monsters |
| q15 | basis | Bij de NIPT drijven er stukjes DNA van de foetus in het bloed van de moeder. Het lab bepaalt van welk chromosoom elk stukje komt. Waaraan ziet het lab dat? | aan de lengte van het stukje · aan de kleur van het stukje · **aan de nucleotidenvolgorde van het stukje** |
| q20 | basis | Op de stamboomsite blijkt een achterneef van de dader te staan. Wat hebben de dader en die achterneef met elkaar gemeen? | precies hetzelfde DNA-profiel · **een klein deel van hun DNA** · de helft van hun DNA |

## Begrippen
- PCR — Polymerasekettingreactie: een gekozen stuk DNA in een buisje in korte tijd meer dan een miljard keer kopiëren. Per cyclus: verhitten (≈95 °C, strengen los), afkoelen (≈55 °C, primers binden), opwarmen (≈72 °C, hittebestendige polymerase bouwt nieuwe strengen); elke cyclus verdubbelt het aantal.
- primer — Kort stukje DNA dat aan het begin van het te kopiëren stuk bindt; de polymerase begint daar. De primers bepalen welk stuk gekopieerd wordt.
- gelelektroforese — DNA-fragmenten sorteren op lengte: DNA is negatief geladen en loopt in een gel naar de pluspool; korte fragmenten lopen verder dan lange. Het resultaat is een bandenpatroon.
- DNA-profiel — De combinatie van lengtes van een vaste set herhaalde stukjes niet-coderend DNA; per mens vrijwel uniek, behalve bij eeneiige tweelingen.
- sequencen — De basenvolgorde van een stuk DNA bepalen, bijvoorbeeld met gekleurde stopnucleotiden en sorteren op lengte; moderne apparaten lezen miljoenen stukjes tegelijk.
- NIPT — Niet-invasieve prenatale test: DNA-fragmenten van de placenta in het bloed van de moeder worden gesequencet en per chromosoom geteld; te veel fragmenten van chromosoom 21 wijst op trisomie 21.
- genetische modificatie — Het DNA van een organisme gericht veranderen. Voorbeeld menselijke insuline uit bacteriën: mRNA van het insulinegen uit alvleeskliercellen → met reverse transcriptase cDNA (zonder introns; een bacterie kan geen introns verwijderen) → plasmide en cDNA met hetzelfde restrictie-enzym knippen (plakkerige uiteinden) → ligase plakt: recombinant plasmide → plasmide in bacteriën → selectie met een antibioticum (resistentiegen op het plasmide) → de bacterie maakt insuline. Of een gen op een gekozen plek knippen en veranderen (CRISPR).
- cDNA — DNA dat met reverse transcriptase van een mRNA is overgeschreven: het gen zonder introns.
- plasmide en recombinant plasmide — klein cirkelvormig DNA in bacteriën; recombinant: met een ingeplakt stuk vreemd DNA.
- restrictie-enzym en ligase — knipt DNA op een vaste volgorde, vaak met plakkerige uiteinden (korte enkele strengen die op elkaar passen); ligase plakt de stukken aan elkaar.
- selectie met een antibioticum — alleen bacteriën met het plasmide (en dus het resistentiegen) groeien op een voedingsbodem met dat antibioticum.
- STR *vwo* — Short tandem repeat: een kort motief (bijv. GATA) dat een aantal keer achter elkaar herhaald wordt; het aantal herhalingen verschilt tussen mensen en tussen de twee allelen van één persoon.
- CRISPR-Cas9 en gids-RNA *vwo* — Cas9 knipt beide DNA-strengen; het gids-RNA (zelf gekozen volgorde) past via baseparing op de doelvolgorde en leidt Cas9 daarheen. De cel repareert de knip: vaak met een foutje (gen uit), of met een meegegeven stuk DNA als voorbeeld (gewijzigde versie).
- gentherapie *vwo* — Een werkend gen inbrengen in (of een gen veranderen in) lichaamscellen van een patiënt, vaak met een onschadelijk gemaakt virus als vector, of in cellen die buiten het lichaam worden aangepast en teruggezet (beenmergstamcellen bij sikkelcelziekte).
- somatisch en kiembaan *vwo* — Somatisch: lichaamscellen, niet erfelijk. Kiembaan: eicellen, zaadcellen of embryo's, wel erfelijk; in Nederland verboden (Embryowet).
- reverse transcriptase *vwo* — Enzym dat RNA overschrijft naar DNA; nodig vóór een PCR op een RNA-virus (RT-PCR).
- referentiegenoom en variant *vwo* — Eén standaardvolgorde van het menselijk genoom waarmee gesequencete stukjes worden vergeleken; een plek waar iemands DNA afwijkt heet een variant. SNP: een variant van één base.

## Checkvragen
- (basis) Zet de drie stappen van één PCR-cyclus in de juiste volgorde en noem bij elke stap de temperatuur (hoog, laag, middel) en wat er gebeurt. — *1 hoog (≈95 °C): de waterstofbruggen breken, de strengen gaan uit elkaar; 2 laag (≈55 °C): de primers binden; 3 middel (≈72 °C): de hittebestendige polymerase bouwt vanaf de primers nieuwe strengen. Elke cyclus verdubbelt het aantal kopieën.*
- (basis) Twee DNA-fragmenten van 200 en 800 basenparen lopen op dezelfde gel. Welke band zit het dichtst bij de pluspool en waarom? — *Het fragment van 200 basenparen: DNA is negatief geladen en loopt naar de pluspool; korte fragmenten komen makkelijker door de gel en lopen verder.*
- (basis) (naar CvTE havo 2021-II, vraag 30) Een bureau onderzoekt watermonsters op DNA-sporen (eDNA) van een parasiet. Leg uit hoe PCR kan aantonen dat de parasiet in het water zit. — *Primers worden gekozen die alleen passen op een DNA-volgorde van die parasiet; zit dat DNA in het monster, dan wordt het bij de PCR vermeerderd en op de gel zichtbaar; zonder parasiet-DNA ontstaat geen product.*
- (basis) Waarom is een DNA-profiel van een eeneiige tweeling geen bewijs voor één van de twee? — *Een eeneiige tweeling is uit één bevruchte eicel ontstaan en heeft dus hetzelfde DNA en hetzelfde profiel; op grond van het profiel alleen kun je ze niet onderscheiden.*
- (basis) Bij de NIPT worden stukjes DNA uit het bloed van de moeder gesequencet. Leg uit hoe het lab daaruit afleidt dat de foetus waarschijnlijk trisomie 21 heeft. — *Van elk stukje wordt via de nucleotidenvolgorde bepaald van welk chromosoom het komt; ongeveer een tiende van de stukjes is van de placenta (het kind). Bij trisomie 21 komt er een klein maar meetbaar overschot aan stukjes van chromosoom 21 ten opzichte van het verwachte aantal. De NIPT is een screening; zekerheid geeft een vlokkentest of vruchtwaterpunctie.*
- (basis) Waarom bouwen onderzoekers cDNA van het insulinegen in een bacterie, en niet het insulinegen zoals het in het DNA van de mens ligt? Leg uit hoe dat cDNA gemaakt wordt. — *Het menselijke gen bevat introns; een bacterie kan introns niet uit het mRNA verwijderen en zou dus een verkeerd eiwit maken. Daarom haalt men het mRNA (waar de introns al uit zijn) uit alvleeskliercellen en schrijft het met reverse transcriptase over naar DNA: cDNA, het gen zonder introns.*
- (basis) Een plasmide met het insulinegen bevat ook een gen voor resistentie tegen ampicilline. Waarom? — *Niet elke bacterie neemt het plasmide op. Op een voedingsbodem met ampicilline overleven alleen de bacteriën die het plasmide (met het resistentiegen en dus ook het insulinegen) hebben; zo selecteer je de juiste bacteriën.*
- (vwo) Iemand heeft op een STR-plek de allelen 8 en 11. Hoeveel banden zie je op de gel, en wat zie je bij iemand die homozygoot 11 is? — *Twee banden (8 en 11 herhalingen, verschillende lengtes); bij homozygoot 11 één band, meestal iets dikker.*
- (vwo) Waarom begint een coronatest met reverse transcriptase? — *Het coronavirus heeft RNA als erfelijk materiaal; PCR kopieert alleen DNA. Reverse transcriptase maakt van het virus-RNA eerst DNA (cDNA), dat daarna met PCR vermeerderd wordt.*
- (vwo) Twee mensen delen op de stamboomsite lange stukken DNA met precies dezelfde SNP's. Wat zegt de lengte van die stukken over hun verwantschap? — *Elke generatie breekt crossing-over de gedeelde stukken in kleinere delen; hoe langer de gedeelde stukken, hoe minder generaties geleden de gezamenlijke voorouder leefde, dus hoe nauwer verwant.*
- (vwo) Hoe zorgt het gids-RNA ervoor dat Cas9 op de juiste plek in het DNA knipt? En wat is het verschil tussen somatische gentherapie en kiembaanmodificatie? — *Het gids-RNA heeft een basenvolgorde die complementair is aan de doelvolgorde; via baseparing bindt het daar en brengt Cas9 mee, dat beide strengen knipt. Somatisch: lichaamscellen van de patiënt, niet doorgegeven aan kinderen. Kiembaan: eicellen, zaadcellen of embryo's, erfelijk; in Nederland verboden.*

## Getallen
| Getal | In de film | Bron |
|---|---|---|
| Kopieën na 30 PCR-cycli | meer dan een miljard | 2^30 ≈ 1,07 × 10^9 (ideale verdubbeling) |
| Eerste menselijke genoom | dertien jaar, miljarden euro's | Human Genome Project 1990–2003, ≈ 3 miljard dollar |
| Heel genoom lezen nu | in een dag | NGS-apparaten: een menselijk genoom in ca. 1 dag, kosten in de orde van enkele honderden euro's (2024–2025) |
| Gedeeld DNA met achterneef | ongeveer drie procent | gemiddeld 3,125 % (1/32) voor achterneven (second cousins: gedeelde overgrootouders) |
| Kans op toevallig gelijk DNA-profiel | kleiner dan één op een miljard | forensische STR-sets (≥ 20 loci): toevalskans typisch < 10^-9 bij niet-verwanten |
| Sikkelcelziekte: CRISPR-behandeling goedgekeurd | sinds het jaar 2023 | Casgevy (exa-cel): VK november 2023, VS december 2023, EU februari 2024; beenmergstamcellen buiten het lichaam bewerkt (BCL11A-enhancer uitgeschakeld → foetaal hemoglobine) |
| DNA van het kind in het bloed van de moeder (NIPT) | ongeveer één op de tien | foetale fractie gemiddeld ≈ 10 % van het celvrije DNA vanaf week 10 |

## Techniek: waar zit wat in de HTML
Regelnummers in 7-dna-lezen.html (de base64-audio staat binnen FILMDATA op één regel, dus `filmbron.py uitpakken` verandert de regels niet).
- **FILMDATA** (segmenten, woordtijden, regelgrenzen `bounds`, audio, filmtitel/eindkaart/hoofdstukvragen): regel 147. Speech-segment: `id`, `kind:'speech'`, `level`, `chapter`, `scene`, `audio`, `dur` (take + 0,6 s), `bounds` (regelgrenzen in s), `words` (`t,s,e`). Vraag: `q`, `options`, `correct` (0-based), `audio`, `adur`.
- **Part C-bibliotheek** (`C`-tokens, korrel, labels, zoomcirkel, cel, kern): regel 148; **DNA-bibliotheek** (basen met paarrand, ruggengraat, ladder, helix, nucleotide, enzym, persoon, klok): regel 339.
- **Scènes**: regel 569 (nieuw 16 okt: `SCENES.h4m` regel 715 (n22, met helpers wig, geneBar, dsSticky, plasmidR, bact, cross, chain, stepBar ervoor), `SCENES.h4cr` regel 736 (n22v, helpers virus, rbc), `SCENES.h4z` regel 759 (n22c)); één functie per scènenaam (`SCENES.h2a=(ctx,li,lf,t,q)`), `li` = regelnummer binnen het segment, `lf` = 0..1 binnen die regel (uit `bounds`). Beeldwissels hangen dus aan de gesproken regels.
- **Begrippen**: `const GLOSSARY` regel 777. **Speler**: regel 778 (tijdlijn, vraagfasen ask → countdown → wait/reveal, Havo/Vwo, Leerling/Klas, toetsen, ondertitels uit `words`).
- **Paginatekst** (kop, checkvragen, docentdeel, footer): statische HTML in de pagina; komt uit `_bouw/films.py` en `_bouw/data/afl7_docent.htmlfrag`.

## Zo pas je deze film aan
1. Werk in `films/dna/_bouw/` (kopieer de map naar een werkmap buiten de repo). Haal eerst de audio terug: `python3 haal_audio.py 7 ../7-dna-lezen.html`.
2. **Let op (16 okt 2026)**: de gepubliceerde film heeft een nieuwere speler en labels (`naamBij`, snelheid, Vragen aan/uit, 'Voor vwo' wegknippen) dan `src/lib.js`, `src/player.js` en `src/page.tpl`; `src/scenes7.js` is gelijk aan het gepubliceerde scèneblok. Bouw met `python3 build.py 7` en zet het resultaat in de gepubliceerde film met `python3 patch_aanvulling.py 7 ../7-dna-lezen.html <oude bouw> <oude scenes7.js>` → `out/7-dna-lezen.patched.html` (zie `_bouw/README.md`). Controle zonder vragen: `NODE_PATH=$(npm root -g) node vragenuit.js <film> [havo]`.
3. **Beeld**: pas `src/scenes7.js` aan (zoek de scènenaam uit de tabel Opbouw, bijv. `SCENES.h2a`), daarna `python3 build.py 7` → `out/7-dna-lezen.html`. Controleer met `node grab.js <pad>/out/7-dna-lezen.standalone.html qa/x 6` en `python3 sheet.py qa/x qa/x.png 7`.
4. **Tekst op de pagina, titel, hoofdstukvragen, eindkaart**: `films.py`. **Docentdeel**: `data/afl7_docent.htmlfrag`. **Begrippen, checkvragen, getallen**: `data/afl7_script.json`.
5. **Een alinea opnieuw inspreken**: stem-invoer uit `data/afl7_stem.json` (respellings volgens de uitspraaklijst), Roos, eleven_v3, één take. Vervang `data/afl7_audio/<id>.mp3` (−16 LUFS, −1 dBTP), zet nieuwe woordtijden (Scribe) en `bounds` in `data/afl7_words.json`, en pas de tekst aan in `data/afl7_script.json`. Andere segmenten blijven ongemoeid.
6. Kopieer `out/7-dna-lezen.patched.html` (zie 2) naar `films/dna/`, werk dit bestand en script.md bij (versie, datum, wat er veranderd is) en push.

## Aandachtspunten
- Alle tekst moet boven y = 892 blijven: de speler knipt scènes daar af (ondertitelzone).
- Meta-tekst staat in kapitalen, behalve eenheden (`metaCase` in de bibliotheek): µm, nm, °C blijven correct.
- De pijl → en ≈ zitten niet in de ingebedde lettertypes en vallen terug op het systeemlettertype.
- Basen zijn vier tinten paars en verschillen ook in letter en paarrand (A punt, T inkeping, C nok, G sleuf); RNA is teal (primer in film 2; mRNA en tRNA in film 3), eiwit en aminozuren oker, ribosoom #C9B896.
- **Geen uitspraaktest vooraf** (afspraak Kamiel 13 okt 2026): opgenomen met eleven_v3, één take per alinea, spellingen uit de uitspraaklijst (deeënaa, er-en-aa, pee cee er, zjel, primer(s) zoals geschreven (Kamiels keuze 13 okt; eerste opname met 'praimer' vervangen in n3, n5, n6, n11, n25), krisper, snip(s), es-tee-er(rs), siekwensen/gesiekwenst, rivurs transcriptase, nipt). Take q4 is opnieuw gegenereerd (de eerste bleef in 'generating' hangen). Wachtlijst hieronder voor de verzameltest.
- Uitspraak-wachtlijst (eerste voorkomen per take; tijd = binnen de take; `FILMDATA.segments[<take>]`):

| woord | take | tijd in take |
|---|---|---|
| DNA-profiel | n0 | 0:09.4 |
| databank | n0 | 0:11.5 |
| DNA | n3 | 0:04.8 |
| PCR | n3 | 0:12.1 |
| polymerase | n3 | 0:18.8 |
| waterstofbruggen | n3 | 0:27.4 |
| primers | n3 | 0:34.1 |
| hittebestendige | n3 | 0:42.0 |
| PCR | q4 | 0:01.3 |
| PCR | n5 | 0:00.8 |
| primers | n5 | 0:04.9 |
| nucleotiden | n5 | 0:07.9 |
| DNA | n6 | 0:04.7 |
| reverse | n6 | 0:11.3 |
| PCR | n6 | 0:17.6 |
| primers | n6 | 0:19.3 |
| DNA | n8 | 0:00.7 |
| PCR | n9 | 0:00.0 |
| gelelektroforese | n9 | 0:05.8 |
| DNA | n9 | 0:08.1 |
| gel | n9 | 0:12.5 |
| Bruinvissen | q10 | 0:00.0 |
| zeehond-DNA | q10 | 0:13.2 |
| PCR | n11 | 0:12.6 |
| primers | n11 | 0:13.8 |
| zeehond-DNA | n11 | 0:15.0 |
| gel | n11 | 0:17.2 |
| STR | n12 | 0:04.9 |
| DNA | n14 | 0:06.8 |
| sequencen | n14 | 0:08.6 |
| polymerase | n14 | 0:13.4 |
| nucleotiden | n14 | 0:18.4 |
| genoom | n14 | 0:43.3 |
| NIPT | q15 | 0:00.3 |
| DNA | q15 | 0:01.7 |
| foetus | q15 | 0:02.6 |
| gesequencet | n16 | 0:02.2 |
| genoom | n16 | 0:05.2 |
| placenta | n16 | 0:14.3 |
| DNA | n16 | 0:16.3 |
| foetus | n16 | 0:27.3 |
| trisomie | n16 | 0:29.5 |
| referentiegenoom | n17 | 0:05.4 |
| DNA | n17 | 0:10.3 |
| variant | n17 | 0:12.7 |
| databank | n19 | 0:05.9 |
| DNA | n19 | 0:12.2 |
| stamboomsite | n19 | 0:13.0 |
| stamboomsite | q20 | 0:00.3 |
| achterneef | q20 | 0:01.7 |
| mRNA (em-er-en-aa) | n22 | 0:17.3 |
| introns | n22 | 0:24.6 |
| reverse transcriptase (rivurs) | n22 | 0:37.3 | — Kamiel 16 okt 2026: zo laten ("rivurs", gelijk aan n6); de langere havo-uitleg in H4 hoeft niet korter.
| cDNA (cee-deeënaa) | n22 | 0:43.9 |
| plasmide | n22 | 0:50.1 |
| restrictie-enzym | n22 | 0:55.6 |
| plakkerige | n22 | 1:02.2 |
| ligase (ligaase) | n22 | 1:09.8 |
| recombinant | n22 | 1:14.6 |
| antibioticum | n22 | 1:27.5 |
| CRISPR (krisper) | n22 | 1:47.5 |
| sikkelcelziekte | n22 | 1:57.5 |
| CRISPR-Cas9 (krisper-kas-negen) | n22v | 0:00.0 |
| Cas9 (kas-negen) | n22v | 0:02.7 |
| gids-RNA (gids-er-en-aa) | n22v | 0:06.0 |
| baseparing | n22v | 0:14.3 |
| gentherapie | n22v | 0:42.0 |
| beenmerg | n22v | 0:56.3 |
| hemoglobine (hemoglobienuh) | n22v | 1:04.1 |
| 2023 (het jaar) | n22v | 1:10.5 |
| somatisch | n22v | 1:16.6 |
| kiembaan | n22v | 1:24.2 |
| DNA | n21 | 0:02.1 |
| Achterneven | n21 | 0:10.1 |
| DNA | n22 | 0:01.8 |
| insulinegen | n22 | 0:09.3 |
| restrictie-enzym | n22 | 0:12.2 |
| plasmide | n22 | 0:14.5 |
| genetisch | n22 | 0:20.9 |
| CRISPR | n22 | 0:25.9 |
| sikkelcelziekte | n22 | 0:35.4 |
| stamboomsite | n23 | 0:03.4 |
| STR's | n23 | 0:04.9 |
| SNP's | n23 | 0:06.2 |
| crossing-over | n23 | 0:20.2 |
| PCR | n25 | 0:02.9 |
| primers | n25 | 0:04.3 |
| gel | n25 | 0:09.4 |
| sequencen | n25 | 0:17.0 |
| stopnucleotiden | n25 | 0:18.6 |
| DNA | n25 | 0:27.3 |
| DNA | n26 | 0:00.2 |

- Puzzels: gekozen A (cold case: bloedspoor op een kapotte ruit, profiel niet in de databank, jaren later een achterneef op een stamboomsite; rode draad door alle vier de hoofdstukken, Golden State Killer 2018 als voorbeeld zonder naam). Afgevallen: B (de coronatest als rode draad: nu V1 en het vwo-blok van hoofdstuk 1), C (de NIPT als rode draad: nu V3 en de brug naar aflevering 8).
- CE-vragen geparafraseerd en naar drie keuzes omgezet (havo 2025-II coronatest, havo 2019-II bruinvissen en NIPT; op de pagina havo 2021-II eDNA); V4 (achterneef) is zelf gemaakt; antwoorden zelf uitgewerkt, correctievoorschriften niet ingezien.
- Vereenvoudigingen: PCR met één getekende primer per streng en drie temperaturen; DNA-profiel als "twintig plekken" op een gewone gel (in werkelijkheid capillaire elektroforese); sequencen als Sanger (stopnucleotiden); NIPT zonder lengtefiltering, celvrij DNA uit de placenta, screening en geen diagnose; stamboomsite: honderdduizenden SNP's, Nederland alleen de eigen databank (zie docentdeel). Aanvulling 16 okt: genetische modificatie zoals in het schoolboek (cDNA uit mRNA; in werkelijkheid krijgt het cDNA de knipplaatsen via primers of linkers, en de eerste insulinebacteriën (1978) kregen synthetische genen voor de A- en B-keten); 'schakelaar kapot' bij sikkelcelziekte = Casgevy schakelt een enhancer van BCL11A uit, waardoor foetaal hemoglobine weer aangaat; 'In Nederland verboden' = Embryowet (geen zwangerschap met een genetisch veranderd embryo).
- Getallen: 2^30 ≈ 1,07 miljard; Human Genome Project 1990–2003, ≈ 3 miljard dollar; een genoom in een dag (2024–2025); achterneven delen gemiddeld 3,125 %; toevalskans profiel < 1 op een miljard; foetale fractie ≈ 10 %.
- Lengte (16 okt 2026): spraak vwo ≈ 13:25, havo ≈ 10:10; n22 is nu 1:59 (was 0:46) en n22v 1:30. Kandidaten om in te korten: n14 (geschiedenis van het genoom), n22 (knippen en plakken) en n19 (Nederland/VS).
- Nieuwe bibliotheekobjecten (scenes7.js): chromo, tube, drop, strand, primer, gel, barcode, repeats, folder, database, window_, personIcon, scissors, plasmid, bacterium, pedigree, thermometer; SEQCOL (kleuren voor stopnucleotiden); PERSON_LOOK (huidskleur 2) voor de verdachte.
- Denktijd 12 s bij V2 en V4 (`think`).

## Wijzigingen
- 1.2 · 16 okt 2026 — aanvulling toetsonderwerpen. **n22 (basis) opnieuw ingesproken** (één take, 118,5 s): genetische modificatie in vijf stappen met cDNA (mRNA uit alvleeskliercellen, waarom geen introns, reverse transcriptase → cDNA, plasmide en cDNA met hetzelfde restrictie-enzym, plakkerige uiteinden, ligase → recombinant plasmide, selectie met antibioticumresistentie, bacterie maakt insuline) en daarna, zoals eerst, CRISPR en sikkelcelziekte; nieuwe scène `h4m` met stappenbalk. **n22v (vwo, nieuw, 89,3 s)**: CRISPR-Cas9 met gids-RNA (baseparing, knip door beide strengen, reparatie: gen uit of gewijzigde versie), gentherapie (virus als vector of cellen buiten het lichaam), sikkelcelziekte met CRISPR (goedgekeurd sinds 2023), somatisch tegenover kiembaan (erfelijk, in Nederland verboden); scène `h4cr`. **n22c**: de slotzin 'Lezen, vergelijken, veranderen …' uit de eerste opname van n22 (vanaf 37,15 s), scène `h4z`. Segmenten na n22 hebben een vaste `id` in afl7_script.json. Begrippen, drie checkvragen en een getal toegevoegd. In de film gezet met `patch_aanvulling.py` (gepubliceerde speler blijft). Ruwe takes, Scribe-woordtijden, teksten en de oude n22 in `_bouw/afl7/raw16/`.
- 1.1 · 13 okt 2026 — takes n3, n5, n6, n11 en n25 opnieuw ingesproken met 'primer' zoals geschreven in plaats van 'praimer' (Kamiels keuze, zoals in aflevering 2); woordtijden opnieuw berekend; de eerste opnamen staan in de bouwstraat als afl7/raw_v1.
- 1.0 · 13 okt 2026 — eerste versie (reeksmodus). Script nagekeken door een vakinhoudelijke review (o.a. rode bloedcellen zonder kern, drie PCR-temperaturen, reverse transcriptase vóór de primers, niet-coderend DNA, twee STR-versies, PCR-stap in het bruinvisantwoord, drie miljard dollar, NIPT zonder lengtefiltering en als screening, Nederland vs VS bij stamboomsites, restrictie-enzym/plasmide/genetisch gemodificeerd, CRISPR bij sikkelcelziekte) en een didactiek/taal-review (o.a. nieuwe NIPT-checkvraag, opening verraadt de achterneef niet, kortere opties bij V4, lettervolgorde A, B, C, B, slotzinnen 'Terug naar het bloedspoor' / 'Terug naar de zaak'). Beelden nagekeken op stijlframes (frames7.js) en contactsheets vwo en havo; na de bouw de strengscheiding in h1a (li 2) gecorrigeerd (ladder begon te dicht op elkaar) en de derde slotregel ingekort.

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

`label()` tekent geen lijntje + stip meer naar de naam; de naam staat direct naast het onderdeel (nieuwe functie `naamBij()` uit Celorganellen, met donkere rand rond de letters). De oude aanroepen `label(ctx, naam, meta, ax, ay, lx, ly, …)` werken nog: de richting ax,ay → lx,ly bepaalt aan welke kant de naam komt. Opnieuw geplaatst (eigen `naamBij(...)` of andere richting): 'bloed van de dader', 'witte bloedcel', 'afkoelen', 'opwarmen', 'korte stukken', 'banden', 'band', 'variant'. Gecontroleerd op stills van alle scènes met namen.
