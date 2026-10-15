# Van DNA naar eiwit — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/dna/3-van-dna-naar-eiwit.html (één zelfstandig bestand; audio en lettertypen ingebed) |
| Reeks / nummer | DNA, film 3 van 8 (seriebrief DNA in “Seriebriefs uitlegfilms biologie”) |
| Doelgroep / niveau | havo + vwo; vwo-blokken aan het eind van hoofdstuk 2 (promotor, leesrichting, splicing) en hoofdstuk 3 (anticodon, wiebelbase, met een eigen vraag) (`level:'vwo'`), Havo/Vwo-schakelaar, `?niveau=havo`, `?modus=klas` |
| Versie / datum | 1.0 · 12 oktober 2026 — eerste versie, direct in Part C (prompt v5); opening = puzzel A (mRNA-vaccin) |
| Stem / model | Roos (ElevenLabs, voice 7qdUFMklKPaaAVMsBTBt, model eleven_multilingual_v2); één take per alinea of vraag |
| Duur | gesproken 6:43; speeltijd (zonder wachten bij vragen) vwo 8:15, havo 6:16 |
| Beeldstijl | Part C: Micro (#121A26 met korrel) voor molecuul en cel, Schema (#1A2740) voor klok, getallen, tabellen, vragen en kaarten, Macro alleen voor de mens in opening en samenvatting (overgang via zoomcirkel). Vaste UI-laag: ondertitelkast, labels met aanwijslijn, paarse vwo-balk, vraagkaart. Lettertypen Fraunces, Source Sans 3, IBM Plex Mono ingebed |
| Audio-opslag | base64 in `FILMDATA.segments[].audio` (data-URI per segment); woordtijden in `words` |
| Bouwstraat | `films/dna/_bouw/` (gedeeld door de DNA-reeks): `src/` (lib, dnalib, scenes1–4, player, page), `build.py`, `films.py`, `data/` (script, woordtijden, stem-invoer, docentdeel). Zie `_bouw/README.md` |

## Opbouw
Begintijden in de speler (hoofdstukkaart), vwo en havo.

| Begin vwo | Begin havo | Hoofdstuk | Segmenten | Type · look | Kernbeeld |
|---|---|---|---|---|---|
| 0:00 | 0:00 | Opening | n0 | I toepassing · Macro → zoomcirkel → Micro | prik in de bovenarm; vetbolletjes met mRNA; spiercel die een virus-eiwit maakt |
| 0:25 | 0:25 | Hoofdstuk 1 — Een gen is een recept | n3, q4, n5 | B structuur · Micro + Schema-kaart | cel met kern en ribosomen; afschrift dat de kern uit gaat; tabel DNA tegenover RNA |
| 1:36 | 1:36 | Hoofdstuk 2 — Transcriptie: het gen overschrijven | n7, q8, n9, n10 | A mechanisme + A + B · Micro + Micro (schematisch) | RNA-polymerase opent het DNA, leest één streng, koppelt RNA-nucleotiden (U tegenover A); DNA sluit achter het enzym / promotor met TATA-box; 3′→5′ lezen; pre-mRNA met exons en introns; (alternatieve) splicing |
| 3:39 | 2:44 | Hoofdstuk 3 — Translatie: het recept lezen | n12, q13, n14, n15, q16, n17 | A mechanisme + B + A · Micro + Micro + Schema | ribosoom schuift over het mRNA; codons; codontabel; tRNA brengt aminozuren; keten groeit tot het stopcodon / anticodon tegenover codon; 64 tegenover 20; vier glycinecodons; één tRNA, twee codons |
| 6:21 | 4:22 | Hoofdstuk 4 — Van keten naar vorm | n19, q20, n21 | B structuur-functie · Micro + Schema | keten die opvouwt; enzym en receptor die passen; één ander aminozuur verandert de vorm |
| 7:31 | 5:32 | Samenvatting — Terug naar de prik | n23 | — · Macro → Schema | terug naar de prik; DNA → mRNA → eiwit op één kaart |

## Voorspelvragen
De vraag wordt ingesproken (eigen take), daarna 8 s denktijd en 2,5 s onthulling; het antwoord wordt in het volgende segment uitgesproken.

| Segment | Niveau | Vraag | Opties (juist vet) |
|---|---|---|---|
| q4 | basis | Hoe komt het recept van één gen dan bij de ribosomen? | het DNA gaat zelf de kern uit · **er gaat een afschrift van dat ene gen naar buiten** · het eiwit wordt in de kern gemaakt en naar buiten gebracht |
| q8 | basis | Het DNA heeft hier T A C. Welk stukje mRNA ontstaat ertegenover? | T A C · A T G · **A U G** |
| q13 | basis | Een kegelslak maakt een gif van 17 aminozuren. Hoeveel nucleotiden van het mRNA coderen voor die 17 aminozuren? | 17 · **51** · 54 |
| q16 | vwo | Vierenzestig codons, twintig aminozuren. Wat volgt daaruit? | de meeste codons doen niets · **de meeste aminozuren hebben meer dan één codon** · elk codon staat voor een ander aminozuur |
| q20 | basis | Na de prik: waar wordt het eiwit van het virus gemaakt? | in het vaccin, vóór de prik · in de celkern van je spiercel · **in de ribosomen van je eigen cellen** |

## Begrippen
- gen — Stuk DNA met de informatie (het recept) voor één eiwit.
- eiwitsynthese — Het maken van een eiwit aan de hand van een gen, in twee stappen: transcriptie en translatie.
- RNA — Nucleïnezuur van één streng, met de suiker ribose en de base uracil (U) in plaats van thymine (T).
- mRNA (messenger-RNA) — RNA-afschrift van een gen dat de informatie van de kern naar de ribosomen brengt.
- RNA-polymerase — Enzym dat bij transcriptie vrije RNA-nucleotiden koppelt langs één DNA-streng.
- transcriptie — Vorming van mRNA langs het DNA van een gen, in de kern.
- ribosoom — Celorganel waarin aminozuren in de volgorde van het mRNA aan elkaar worden gekoppeld.
- codon — Drie opeenvolgende nucleotiden van het mRNA die samen één aminozuur (of stop) coderen.
- startcodon — Het codon AUG, waar de translatie begint; codeert voor methionine.
- stopcodon — Codon (UAA, UAG of UGA) zonder aminozuur; hier stopt de translatie.
- genetische code — Welk codon bij welk aminozuur hoort; je zoekt het op in een codontabel.
- tRNA (transfer-RNA) — Klein RNA-molecuul dat één soort aminozuur naar het ribosoom brengt.
- translatie — Het koppelen van aminozuren in een ribosoom, in de volgorde die het mRNA bepaalt.
- promotor *vwo* — Stuk DNA vóór een gen waar RNA-polymerase bindt; wordt zelf niet overgeschreven.
- TATA-box *vwo* — Vaste basenvolgorde in veel promotors; hier binden hulpeiwitten die RNA-polymerase op zijn plek zetten. De transcriptie begint iets verderop.
- matrijsstreng *vwo* — De DNA-streng die bij transcriptie wordt afgelezen (van 3' naar 5').
- pre-mRNA *vwo* — Het eerste, nog onbewerkte RNA-afschrift bij eukaryoten, met introns.
- exon / intron *vwo* — Exons komen in het mRNA terecht; introns worden eruit geknipt.
- splicing *vwo* — Het verwijderen van introns uit pre-mRNA; bij alternatieve splicing levert één gen verschillende mRNA's.
- anticodon *vwo* — Drie basen van een tRNA die complementair zijn aan een codon.
- wiebelbase *vwo* — Derde base van een codon op het mRNA; die paart minder streng met het anticodon (met de eerste, 5'-base van het anticodon). Daardoor herkent één tRNA soms meer codons.

## Checkvragen
- (basis) Noem drie verschillen tussen DNA en RNA. — *RNA is enkelstrengs, heeft de suiker ribose (DNA: desoxyribose) en de base uracil (U) in plaats van thymine (T).*
- (basis) Een stukje van de afgelezen DNA-streng is T A C G G A. Welk mRNA ontstaat ertegenover? — *A U G C C U*
- (basis) Een eiwit bestaat uit 120 aminozuren. Uit hoeveel nucleotiden bestaat het coderende deel van het mRNA minstens, met het stopcodon erbij? — *120 × 3 = 360 nucleotiden voor de aminozuren, plus 3 voor het stopcodon: 363.*
- (basis) Leg uit waarom het vaccin-mRNA geen invloed heeft op je eigen DNA. — *Het mRNA komt alleen in het cytoplasma bij de ribosomen, niet in de kern. Het wordt niet omgezet in DNA en wordt na een tijdje afgebroken.*
- (vwo) Een gen heeft drie exons en twee introns. Leg uit hoe dit ene gen twee verschillende eiwitten kan opleveren. — *Door alternatieve splicing: in het ene mRNA komen bijvoorbeeld exon 1, 2 en 3, in het andere alleen exon 1 en 3. Zo ontstaan verschillende aminozuurvolgordes.*
- (vwo) Een tRNA heeft het anticodon CCU (3'→5', geschreven onder het codon). Aan welke codons kan het binden, als op de wiebelplek ook G tegenover U kan paren? — *GGA en GGG (beide glycine).*

## Getallen
| Getal | In de film | Bron |
|---|---|---|
| Aantal codons | 64 (4³) | 4 basen, 3 per codon |
| Stopcodons | 3: UAA, UAG, UGA | standaard genetische code |
| Aminozuren in de code | 20 | standaard genetische code |
| Gif kegelslak | 17 aminozuren → 51 nucleotiden | naar CvTE havo 2021-I; 17 × 3 |
| Afbraak vaccin-mRNA | na een tijdje (dagen) | orde-schatting; de film noemt geen precies getal |

## Techniek: waar zit wat in de HTML
Regelnummers in 3-van-dna-naar-eiwit.html (de base64-audio staat binnen FILMDATA op één regel, dus `filmbron.py uitpakken` verandert de regels niet).
- **FILMDATA** (segmenten, woordtijden, regelgrenzen `bounds`, audio, filmtitel/eindkaart/hoofdstukvragen): regel 133. Speech-segment: `id`, `kind:'speech'`, `level`, `chapter`, `scene`, `audio`, `dur` (take + 0,6 s), `bounds` (regelgrenzen in s), `words` (`t,s,e`). Vraag: `q`, `options`, `correct` (0-based), `audio`, `adur`.
- **Part C-bibliotheek** (`C`-tokens, korrel, labels, zoomcirkel, cel, kern): regel 134; **DNA-bibliotheek** (basen met paarrand, ruggengraat, ladder, helix, nucleotide, enzym, persoon, klok): regel 316.
- **Scènes**: regel 519; één functie per scènenaam (`SCENES.h2a=(ctx,li,lf,t,q)`), `li` = regelnummer binnen het segment, `lf` = 0..1 binnen die regel (uit `bounds`). Beeldwissels hangen dus aan de gesproken regels.
- **Begrippen**: `const GLOSSARY` regel 781. **Speler**: regel 782 (tijdlijn, vraagfasen ask → countdown → wait/reveal, Havo/Vwo, Leerling/Klas, toetsen, ondertitels uit `words`).
- **Paginatekst** (kop, checkvragen, docentdeel, footer): statische HTML in de pagina; komt uit `_bouw/films.py` en `_bouw/data/afl3_docent.htmlfrag`.

## Zo pas je deze film aan
1. Werk in `films/dna/_bouw/` (kopieer de map naar een werkmap buiten de repo). Haal eerst de audio terug: `python3 haal_audio.py 3 ../3-van-dna-naar-eiwit.html`.
2. **Beeld**: pas `src/scenes3.js` aan (zoek de scènenaam uit de tabel Opbouw, bijv. `SCENES.h2a`), daarna `python3 build.py 3` → `out/3-van-dna-naar-eiwit.html`. Controleer met `node grab.js <pad>/out/3-van-dna-naar-eiwit.standalone.html qa/x 6` en `python3 sheet.py qa/x qa/x.png 7`.
3. **Tekst op de pagina, titel, hoofdstukvragen, eindkaart**: `films.py`. **Docentdeel**: `data/afl3_docent.htmlfrag`. **Begrippen, checkvragen, getallen**: `data/afl3_script.json`.
4. **Een alinea opnieuw inspreken**: stem-invoer uit `data/afl3_stem.json` (respellings volgens de uitspraaklijst), Roos, eleven_multilingual_v2, één take. Vervang `data/afl3_audio/<id>.mp3` (−16 LUFS, −1 dBTP), zet nieuwe woordtijden (Scribe) en `bounds` in `data/afl3_words.json`, en pas de tekst aan in `data/afl3_script.json`. Andere segmenten blijven ongemoeid.
5. Kopieer `out/3-van-dna-naar-eiwit.html` naar `films/dna/`, werk dit bestand en script.md bij (versie, datum, wat er veranderd is) en push.

## Aandachtspunten
- Alle tekst moet boven y = 892 blijven: de speler knipt scènes daar af (ondertitelzone).
- Meta-tekst staat in kapitalen, behalve eenheden (`metaCase` in de bibliotheek): µm, nm, °C blijven correct.
- De pijl → en ≈ zitten niet in de ingebedde lettertypes en vallen terug op het systeemlettertype.
- Basen zijn vier tinten paars en verschillen ook in letter en paarrand (A punt, T inkeping, C nok, G sleuf); RNA is teal (primer in film 2; mRNA en tRNA in film 3), eiwit en aminozuren oker, ribosoom #C9B896.
- Uitspraak in context nog door Kamiel te beluisteren: tRNA als “tee-er-en-aa” (n12 ≈ 0:40, n15 ≈ 0:03, n17 ≈ 0:18, n23 ≈ 0:18), TATA-box als “taata-box” (n10 ≈ 0:13), exons als “eksons” (n10 ≈ 0:34), 3′/5′ als “drie-accent/vijf-accent” (n10 ≈ 0:19, n15 ≈ 0:08). Tijden zijn binnen de take.
- Wiebelbase = derde base van het codon (n17 op 12 okt opnieuw ingesproken; de eerste versie zei per abuis “van het anticodon”). Het beeld markeert de derde codonbase in goud, met het anticodon 3′→5′ eronder.
- “Daar bindt RNA-polymerase” bij de TATA-box is vereenvoudigd (transcriptiefactoren); zie docentdeel.
- De kegelslakvraag is geparafraseerd naar CvTE havo 2021-I; de bron staat op de vraagkaart (`source` in het vraagsegment, rechtsboven in Meta).
- Het mRNA-vaccin wordt alleen in de opening, vraag 5 en de samenvatting gebruikt; claims: niet in de kern, wordt geen DNA, wordt afgebroken.

## Wijzigingen
- 12 okt 2026 (later) — nieuwe mensfiguur in opening en samenvatting: met huidskleur, zachte ronde vormen, vriendelijk gezicht (personReal in dnalib); speler: denktijd per vraag instelbaar.
- 1.0.1 · 12 okt 2026 — speler: ondertitels breken alleen nog tussen zinnen of bij een komma.
- 1.0.2 · 12 okt 2026 — tRNA’s sluiten nu precies op het codon aan (anticodonbasen grijpen in de codonbasen; eerst hingen ze iets te hoog of schoven ze erin). Helper `trnaY()` in `src/dnalib.js`.
- 1.0 · 12 okt 2026 — eerste versie. Script nagekeken door een vakinhoudelijke review (15 punten verwerkt); beelden nagekeken door een tweede, onafhankelijke review (ribosoom volgt de tRNA's, losgelaten mRNA houdt zijn basen, labels vrij van elkaar, 3′/5′ bij het anticodon). Dezelfde dag: n17 opnieuw ingesproken, de wiebelbase is de derde base van het codon (niet van het anticodon).

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

`label()` tekent geen lijntje + stip meer naar de naam; de naam staat direct naast het onderdeel (nieuwe functie `naamBij()` uit Celorganellen, met donkere rand rond de letters). De oude aanroepen `label(ctx, naam, meta, ax, ay, lx, ly, …)` werken nog: de richting ax,ay → lx,ly bepaalt aan welke kant de naam komt. Opnieuw geplaatst (eigen `naamBij(...)` of andere richting): 'vetbolletje', 'eiwit van het virus', 'eiwitten', 'gen', 'kern', 'ribosomen', 'afschrift van één gen', 'RNA-polymerase', 'mRNA', 'afgelezen streng', 'vrije RNA-nucleotiden', 'DNA weer dicht', 'promotor', 'kernporie', 'keten van aminozuren', 'ribosoom', 'codon', 'wiebelbase', 'enzym', 'receptor', 'opgevouwen eiwit'. Gecontroleerd op stills van alle scènes met namen.
