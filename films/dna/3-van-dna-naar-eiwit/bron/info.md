# Van DNA naar eiwit — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/dna/3-van-dna-naar-eiwit.html (één zelfstandig bestand; audio en lettertypen ingebed) |
| Reeks / nummer | DNA, film 3 van 8 (seriebrief DNA in “Seriebriefs uitlegfilms biologie”) |
| Doelgroep / niveau | havo + vwo; vwo-blokken aan het eind van hoofdstuk 2 (transcriptiefactoren en TATA-box, leesrichting, splicing, kapje en poly-A-staart) en hoofdstuk 3 (anticodon, wiebelbase, met een eigen vraag) (`level:'vwo'`), Havo/Vwo-schakelaar, `?niveau=havo`, `?modus=klas` |
| Versie / datum | **1.2 · 27 oktober 2026** — opwaardering prompt v5 → v10 (B14), alleen beeld en één knip in n15; 1.1 · 16 oktober 2026 — redactieronde naar uitgeversniveau (zie Wijzigingen); 1.0 · 12 oktober 2026 — eerste versie, direct in Part C (prompt v5); opening = puzzel A (mRNA-vaccin) |
| Prompt | v13 |
| Voldoet aan | prompt v13 (27 okt 2026; v11–v13 nagelopen: zonder keuring, takes behouden, geen namen van castpersonages in stem of beeld). Bewust niet: geen verbeterblad vooraf (B14; Kamiel was weg, gerichte beeldfixes zonder nieuwe stem; oude versie in `bron/oud/3-van-dna-naar-eiwit-v1.1.html`); geen herkenbaar menselijk moment buiten Noor bij de prik (microfilm); schema-scènes (codons, splicing als blokjes) blijven blokjes omdat het om de volgorde gaat, niet om de vorm van het molecuul; de vrijgelaten keten in h3a vouwt nog niet (dat gebeurt in h4a); geen nieuwe caststijl met contourlijnen (nog niet goedgekeurd) |
| Stem / model | Roos (ElevenLabs, voice 7qdUFMklKPaaAVMsBTBt, model eleven_multilingual_v2); één take per alinea of vraag; n7, n10, n12, n21, n23 opnieuw op 16 okt 2026 (ElevenLabs-flow ‘DNA afl. 3 v1.1 hertakes 16 okt 2026’) |
| Duur | speler (met vragen aan, gemeten 27 okt 2026): vwo 8:26, havo 6:18; met ‘Vragen uit’ vwo 7:02, havo 5:10 (de speler knipte ‘Voor vwo …’ in n15 al weg; sinds 1.2 zit de zin ook niet meer in de take) |
| Beeldstijl | Part C: Micro (#121A26, zonder korrel sinds 1.1) voor molecuul en cel, Schema (#1A2740) voor klok, getallen, tabellen, vragen en kaarten, Macro alleen voor de mens in opening en samenvatting (overgang via zoomcirkel). Vaste UI-laag: ondertitelkast, namen direct bij de onderdelen (`naamBij`, geen wijslijnen), paarse vwo-balk, vraagkaart. Lettertypen Fraunces, Source Sans 3, IBM Plex Mono ingebed |
| Audio-opslag | base64 in `FILMDATA.segments[].audio` (data-URI per segment); woordtijden in `words` |
| Bouwstraat | `films/dna/_bouw/` (gedeeld door de DNA-reeks): `src/` (lib, dnalib, scenes1–4, player, page), `build.py`, `films.py`, `data/` (script, woordtijden, stem-invoer, docentdeel). Zie `_bouw/README.md` |

## Opbouw
Begintijden in de speler (hoofdstukkaart), vwo en havo, versie 1.1.

| Begin vwo | Begin havo | Hoofdstuk | Segmenten | Type · look | Kernbeeld |
|---|---|---|---|---|---|
| 0:00 | 0:00 | Opening | n0 | I toepassing · Macro → zoomcirkel → Micro | prik in de bovenarm; vetbolletjes met mRNA; spiercel die een virus-eiwit (gevouwen keten op een steeltje) maakt |
| 0:25 | 0:25 | Hoofdstuk 1 — Een gen is een recept | n3, q4, n5 | B structuur · Micro + Schema-kaart | cel met chromatine in de kern en ribosomen; eiwitten als kleine kluwens; afschrift dat de kern uit gaat; tabel DNA tegenover RNA |
| 1:35 | 1:35 | Hoofdstuk 2 — Transcriptie: het gen overschrijven | n7, q8, n9, n10 | A mechanisme + A + B · Micro + Micro (schematisch) | vast label ‘Transcriptie’ (teal); RNA-polymerase begint op de promotor, opent het DNA, leest één streng, U tegenover A; DNA sluit achter het enzym / vwo: transcriptiefactoren op de TATA-box zetten RNA-polymerase op zijn plek; 3′→5′ lezen; pre-mRNA, (alternatieve) splicing; kapje en poly-A-staart |
| 3:48 | 2:42 | Hoofdstuk 3 — Translatie: het recept lezen | n12, q13, n14, n15, q16, n17 | A mechanisme + B + A · Micro + Micro + Schema | mRNA door een getekende kernporie; ribosoom schuift over het mRNA; codons; codontabel; tRNA brengt aminozuren; keten groeit tot het stopcodon / anticodon; 64 tegenover 20; wiebelbase |
| 6:28 | 4:20 | Hoofdstuk 4 — Van keten naar vorm | n19, q20, n21 | B structuur-functie · Micro + Schema | keten die opvouwt tot een compacte kluwen; enzym en receptor als kluwen met pasvorm; vaccin (1.2): ronde spiercel, ribosomen óp het ER, keten groeit het ER in en vouwt, blaasje ER → golgisysteem → versmelt met het gebogen celmembraan, eiwit van het virus loodrecht op het membraan; niet in de kern, geen reverse transcriptase; afbraak |
| 7:49 | 5:41 | Samenvatting — Terug naar de prik | n23 | — · Macro → Schema | terug naar de prik; DNA → mRNA → eiwit op één kaart; ‘een recept van buiten, gelezen door je eigen ribosomen’ |

## Voorspelvragen
De vraag wordt ingesproken (eigen take), daarna 8 s denktijd en 2,5 s onthulling; het antwoord wordt in het volgende segment uitgesproken.

| Segment | Niveau | Vraag | Opties (juist vet) |
|---|---|---|---|
| q4 | basis | Hoe komt het recept van één gen dan bij de ribosomen? | het DNA gaat zelf de kern uit · **er gaat een afschrift van dat ene gen naar buiten** · het eiwit wordt in de kern gemaakt en naar buiten gebracht |
| q8 | basis | Het DNA heeft hier T A C. Welk stukje mRNA ontstaat ertegenover? | T A C · A T G · **A U G** |
| q13 | basis | Een kegelslak maakt een gif van 17 aminozuren. Hoeveel nucleotiden van het mRNA coderen voor die 17 aminozuren? | 17 · **51** · 54 |
| q16 | vwo | Vierenzestig codons, twintig aminozuren. Wat volgt daaruit? | de meeste codons doen niets · **de meeste aminozuren hebben meer dan één codon** · elk codon staat voor een ander aminozuur |
| q20 | basis | Na de prik: waar wordt het eiwit van het virus gemaakt? | in het vaccin, vóór de prik · in de celkern van je spiercel · **door de ribosomen in je eigen cellen** |

## Begrippen
- gen — Stuk DNA met de informatie (het recept) voor een eiwit, of voor een RNA-molecuul zoals tRNA.
- eiwitsynthese — Het maken van een eiwit aan de hand van een gen, in twee stappen: transcriptie en translatie.
- RNA — Nucleïnezuur van één streng, met de suiker ribose en de base uracil (U) in plaats van thymine (T).
- mRNA (messenger-RNA) — RNA-afschrift van een gen dat de informatie van de kern naar de ribosomen brengt.
- RNA-polymerase — Enzym dat bij transcriptie vrije RNA-nucleotiden koppelt langs één DNA-streng.
- transcriptie — Vorming van mRNA langs het DNA van een gen, in de kern.
- promotor — Stuk DNA vóór een gen waar de transcriptie begint; hier binden transcriptiefactoren en RNA-polymerase. Wordt zelf niet overgeschreven. (sinds 1.1 basis, ook havo)
- ribosoom — Celorganel waarin aminozuren in de volgorde van het mRNA aan elkaar worden gekoppeld.
- codon — Drie opeenvolgende nucleotiden van het mRNA die samen één aminozuur (of stop) coderen.
- startcodon — Het codon AUG, waar de translatie begint; codeert voor methionine.
- stopcodon — Codon (UAA, UAG of UGA) zonder aminozuur; hier stopt de translatie.
- genetische code — Welk codon bij welk aminozuur hoort; je zoekt het op in een codontabel.
- tRNA (transfer-RNA) — Klein RNA-molecuul dat één soort aminozuur naar het ribosoom brengt.
- translatie — Het koppelen van aminozuren in een ribosoom, in de volgorde die het mRNA bepaalt.
- ER en golgisysteem — Eiwitten voor het celmembraan of voor buiten de cel worden gemaakt door ribosomen op het ER en gaan via het golgisysteem in blaasjes naar het celmembraan. (nieuw in 1.1)
- TATA-box *vwo* — Vaste basenvolgorde (TATA…) in een deel van de promotors; hier binden transcriptiefactoren die RNA-polymerase op zijn plek zetten. De transcriptie begint iets verderop.
- matrijsstreng *vwo* — De DNA-streng die bij transcriptie wordt afgelezen (van 3' naar 5').
- pre-mRNA *vwo* — Het eerste, nog onbewerkte RNA-afschrift bij eukaryoten, met introns; krijgt nog een kapje (5') en een poly-A-staart (3').
- exon / intron *vwo* — Exons komen in het mRNA terecht; introns worden eruit geknipt.
- splicing *vwo* — Het verwijderen van introns uit pre-mRNA; bij alternatieve splicing kan één gen verschillende mRNA's opleveren.
- transcriptiefactor *vwo* — Eiwit dat aan de promotor bindt en RNA-polymerase op zijn plek helpt; zonder transcriptiefactoren wordt een gen niet overgeschreven (meer in aflevering 6). (nieuw in 1.1)
- anticodon *vwo* — Drie basen van een tRNA die complementair zijn aan een codon.
- wiebelbase *vwo* — Derde base van een codon op het mRNA; die paart minder streng met het anticodon (met de eerste, 5'-base van het anticodon). Daardoor herkent één tRNA soms meer codons.

## Checkvragen
- (basis) Noem drie verschillen tussen DNA en RNA. — *RNA is enkelstrengs, heeft de suiker ribose (DNA: desoxyribose) en de base uracil (U) in plaats van thymine (T).*
- (basis) Een stukje van de afgelezen DNA-streng is T A C G G A. Welk mRNA ontstaat ertegenover? — *A U G C C U*
- (basis) Een eiwit bestaat uit 120 aminozuren. Hoeveel nucleotiden telt het mRNA minstens van het startcodon tot en met het stopcodon? — *120 × 3 = 360 nucleotiden voor de aminozuren (het startcodon AUG codeert al voor het eerste aminozuur), plus 3 voor het stopcodon: 363.* (1.1: herschreven; de oude vraag sprak over ‘het coderende deel … met het stopcodon’ en botste met de film)
- (basis) Leg uit waarom het vaccin-mRNA geen invloed heeft op je eigen DNA. — *Het mRNA komt alleen in het cytoplasma bij de ribosomen, niet in de kern. Om RNA in DNA om te zetten is reverse transcriptase nodig; dat zit niet in het vaccin en je spiercel gebruikt het niet. Het mRNA wordt na een tijdje afgebroken.*
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
| Begin transcriptie na TATA-box | ±25–30 baseparen verderop | Alberts; alleen in het docentdeel |

## Techniek: waar zit wat in de HTML
Regelnummers in 3-van-dna-naar-eiwit.html, versie 1.2 (de base64-audio staat binnen FILMDATA op één regel, dus `filmbron.py uitpakken` verandert de regels niet).
- **Paginatekst** (kop, checkvragen, docentdeel met tabellen in `.tabelscroll`, footer): regels 79–145; footer regel 145. CSS regels 14–75.
- **FILMDATA** (segmenten, woordtijden, regelgrenzen `bounds`, audio, filmtitel/eindkaart/hoofdstukvragen): regel 146. Speech-segment: `id`, `kind:'speech'`, `level`, `chapter`, `scene`, `audio`, `dur` (take + 0,6 s), `bounds`, `words` (`t,s,e`). Vraag: `q`, `options`, `correct` (0-based), `source`, `audio`, `adur`.
- **Part C-bibliotheek**: regel 147 e.v.; `metaCase` regel 206, `naamBij` 210. **DNA-bibliotheek** (o.a. oude `personFlat`/`personReal`, niet meer gebruikt): regel 339 e.v.
- **Castboek** (`personages/lib_cast.js`, kopie van 27 okt 2026): eigen `<script>` vanaf regel 567, vlak vóór het scèneblok. Jij = Noor (`persoon(ctx,'noor',…,{outfit:'zomer'})`) in `open` en `recap`.
- **Scènes**: scèneblok vanaf regel 1379; `chromatine()` 1391, `kluwen()` 1398, `txScene()` 1467 (opties `open`, `b1min`, `noRna`, `enz`, `enzA`; enzym achter het DNA). Scènes: `open` 1419, `h1a` 1431, `h1b` 1442, `h2a` 1483, `h2b` 1508, `h2v` 1520, `h3a` 1566, `h3b` 1598, `h3v` 1607, `h3w` 1618, `h4a` 1640, `h4b` 1657 (vaccin, 1.2: ronde cel met `memPt()` voor punt + normaal op het membraan), `recap` 1703.
- **Begrippen**: `const GLOSSARY` regel 1718. **Speler**: regel 1720 e.v.

## Zo pas je deze film aan
**Let op (sinds 1.1):** de gepubliceerde film heeft een nieuwere speler en bibliotheek dan `_bouw/src/` (zoals bij afl. 4–6). Bouw daarom zo: `python3 build.py 3` en daarna `python3 afl3_v11/patch3.py out/film.html ../3-van-dna-naar-eiwit.html` (vervangt FILMDATA, GLOSSARY, checkvragen, docentdeel, footer en het scèneblok uit `src/scenes3.js` in de gepubliceerde film en zet de bibliotheekwijzigingen van 1.1). Woordtijden van de takes van 16 okt staan als Scribe-uitvoer in `_bouw/afl3_v11/scribe/`; `make_words_nieuw.py 3 <id> <scribe.json>` (de segmenten n7, n10, n12, n21, n23 hebben daarvoor een vaste `id` in `afl3_script.json`). Stills per gesproken regel: `python3 afl3_v11/shots.py <film> <map> all [havo]`.

1. Werk in `films/dna/_bouw/` (kopieer de map naar een werkmap buiten de repo). Haal eerst de audio terug: `python3 haal_audio.py 3 ../3-van-dna-naar-eiwit.html`.
2. **Beeld**: pas `src/scenes3.js` aan (zoek de scènenaam uit de tabel Opbouw, bijv. `SCENES.h2a`), daarna `python3 build.py 3` → `out/3-van-dna-naar-eiwit.html`. Controleer met `node grab.js <pad>/out/3-van-dna-naar-eiwit.standalone.html qa/x 6` en `python3 sheet.py qa/x qa/x.png 7`.
3. **Tekst op de pagina, titel, hoofdstukvragen, eindkaart**: `films.py`. **Docentdeel**: `data/afl3_docent.htmlfrag`. **Begrippen, checkvragen, getallen**: `data/afl3_script.json`.
4. **Een alinea opnieuw inspreken**: stem-invoer uit `data/afl3_stem.json` (respellings volgens de uitspraaklijst), Roos, eleven_multilingual_v2, één take. Vervang `data/afl3_audio/<id>.mp3` (−16 LUFS, −1 dBTP), zet nieuwe woordtijden (Scribe) en `bounds` in `data/afl3_words.json`, en pas de tekst aan in `data/afl3_script.json`. Andere segmenten blijven ongemoeid.
5. Kopieer `out/3-van-dna-naar-eiwit.html` naar `films/dna/`, werk dit bestand en script.md bij (versie, datum, wat er veranderd is) en push.

## Aandachtspunten
- Alle tekst moet boven y = 892 blijven: de speler knipt scènes daar af (ondertitelzone).
- Meta-tekst staat in kapitalen, behalve eenheden en de molecuulnamen mRNA, tRNA, rRNA, DNA, RNA (`metaCase`, 1.1).
- Schaalbalken: sinds 1.1 overal ‘schematisch · niet op schaal’ (de oude balken 1 nm en 10 µm klopten niet met de tekening).
- De pijl → en ≈ zitten niet in de ingebedde lettertypes en vallen terug op het systeemlettertype.
- Basen: vier tinten paars, verschillen ook in letter en paarrand; RNA teal (mRNA als dunne sliert in overzichtsbeelden); eiwit en aminozuren oker, als keten/kluwen (geen vlekken); ribosoom #C9B896; chromatine als losse draden.
- Uitspraak nog door Kamiel te beluisteren: zie **Wachtlijst opnieuw inspreken / beluisteren** hieronder (staat ook in `films/WACHTLIJST.md`).
- Wiebelbase = derde base van het codon; anticodon 3′→5′ eronder.
- De kegelslakvraag is geparafraseerd naar CvTE havo 2021-I vraag 26; bron op de vraagkaart (`source`) en in de footer, met de vermelding dat die vraag niet onder de CC-licentie valt.
- De footer noemt geen methode meer (sinds 1.1: ‘aansluitend op het examenprogramma biologie havo/vwo’).
- De oudere takes (n0, n3, n5, n9, n15, n17, n19 …) zeggen ‘DNA’ zoals geschreven; de takes van 16 okt zeggen ‘deeënaa’. Bij de batchtest letten of dat hoorbaar verschilt.
- Aflevering 6 (n8, basis) zegt ‘In aflevering drie zag je: transcriptie begint bij de promotor … Daar bindt RNA-polymerase.’ Sinds 1.1 noemt afl. 3 de promotor ook voor havo (n7); maar afl. 6 zegt nog ‘Daar bindt RNA-polymerase’ vóór de transcriptiefactor, wat nu iets anders klinkt dan afl. 3 vwo. Afl. 6 is niet aangepast.

## Wachtlijst opnieuw inspreken / beluisteren
Opgenomen zonder uitspraaktest vooraf (afspraak 13 okt). Tijden binnen de take.
| Take | Woord | Stem-invoer | ≈ tijd | Let op |
|---|---|---|---|---|
| n7, n10, n21, n23 | DNA | deeënaa | n7 ≈ 7,7 s | vloeiend, niet drie losse letters; zelfde klank als in andere films |
| n10 | TATA-box | taata-box | ≈ 7,1 s | |
| n10 | transcriptiefactoren | zoals geschreven (/trɑnskrɪpsiˈfɑktoːrə(n)/) | ≈ 9,7 s | klemtoon op ‘fak’ |
| n10 | matrijsstreng | zoals geschreven | ≈ 17,2 s | Scribe hoorde ‘matrix streng’: beluisteren |
| n10 | eksons | eksons | ≈ 33,3 s | |
| n10 | vijf-accent-uiteinde / drie-accent-uiteinde | zo | ≈ 53–57 s | |
| n10 | staart van alleen aa's (poly-A) | ‘alleen aa's’ | ≈ 56,5 s | Scribe hoorde ‘A A's’: klinkt mogelijk als twee a's |
| n12 | tRNA | tee-er-en-aa | ≈ 41–45 s | gelijk aan n15, n17 en n23 |
| n21 | ER | E-R | ≈ 12,5 s | twee lettername, niet ‘eer’ |
| n21 | golgisysteem | golgisysteem (/ˈɣɔlɣisisteːm/) | ≈ 13,7 s | |
| n21 | reverse transcriptase | zoals geschreven (Engels ‘reverse’, /rɪˈvʏrs/) | ≈ 27,6 s | |
| n23 | tRNA's | tee-er-en-aa's | ≈ 19,3 s | |

## Wijzigingen
- **1.2 · 27 okt 2026** — opwaardering prompt v5 → v10 (B14), zonder nieuwe opname (stem, script, vragen en timings gelijk, behalve n15):
  - *n15 (h3v):* gesproken vwo-aankondiging ‘Voor vwo nog een stap verder:’ uit de audio geknipt (0–2,14 s weg, 80 ms stilte + 20 ms fade-in, woordtijden/bounds/dur −2,06 s; ‘hoe’ → ‘Hoe’). Oude take in `bron/oud/`.
  - *open en recap:* grijze mensfiguur (`personReal`) vervangen door castpersonage Noor (‘jij’, ROLLEN.md), zomeroutfit (blote bovenarm voor de prik); lib_cast.js in de film gezet.
  - *open (zoomcirkel) en spiercel:* dwarsstreping geclipt binnen het celmembraan (stak buiten de afgeronde uiteinden uit).
  - *h1a:* twee eiwitkluwens lagen over het celmembraan en een mitochondrion; verplaatst naar vrije plekken in het cytoplasma. Label ‘eiwitten’ boven rechts gecentreerd (stond 25 px van de rand).
  - *Frisse review 27 okt verwerkt* (zelfde versie 1.2):
    - *h2a (n7):* RNA-polymerase landt bij ‘gaat vlak vóór een gen zitten’ op gesloten DNA bij de promotor; pas bij ‘Daar gaan de twee DNA-strengen uit elkaar’ opent de bel; enzym achter het DNA getekend zodat de basen zichtbaar blijven; promotor (goud) en gen (paars) gemarkeerd met haken boven de ladder; ‘mRNA’ direct bij de streng, het staartje dat als wijslijn las is weg.
    - *h3a (n12):* ribosoom bij ‘Stap twee … bij een ribosoom’ volledig in beeld boven het mRNA en landt bij ‘gaat op het mRNA zitten’; label ‘kernporie’ onder de porie, niet meer over het golgisysteem.
    - *h3w (n17):* raster van 64 codons staat er op t = 0; titel ‘Terug naar de keten’ met hoofdletter.
    - *h4b (n21):* kern hoger in de cel; ‘vaccin-mRNA’ boven het mRNA (niet over de kernring); ‘niet in de kern …’ in vrije ruimte onder de cel; rode ring verschijnt binnen ±1 s na het begin van de zin.
    - *h1a (n3):* ‘gen’ direct boven de kern; ‘kern · hier ligt het dna’ iets naar links, los van het mitochondrion.
    - *h2v (n10, vwo):* RNA-polymerase landt óp het DNA; ‘begin van het gen’ erboven; bij ‘kapje en staart’ nu het pre-mRNA met introns (zoals de stem zegt).
    - *h4a (n19):* bij ‘één ander aminozuur’ springt een deel van de keten duidelijk uit de vorm.
    - Open (alleen gemeld): mRNA staat in de schema-scènes als rechte balk met basen (nodig om codons te lezen).
  - *h4b (vaccinroute):* opnieuw getekend: ronde (ovale) spiercel met gebogen membraan en inhoud binnen het membraan; één kern met chromatine; ER als gebogen lumen met de ribosomen óp het ER-membraan en het vaccin-mRNA erlangs; de keten groeit door het ER-membraan het lumen in en vouwt zich daar op (was: rechte kralenkettingen omhoog het cytoplasma in); blaasje ER → golgisysteem → celmembraan, versmelt (opent naar buiten en wordt deel van het membraan); eiwit van het virus staat loodrecht op het gebogen membraan; afweercel buiten de cel; ‘niet in de kern’ om de kern.
- **1.1 · 16 okt 2026** — redactieronde naar uitgeversniveau (reviewrapport 16 okt):
  - *Vakinhoud:* TATA-box: niet meer ‘daar bindt RNA-polymerase’ maar transcriptiefactoren binden (in veel promotors aan een TATA-box) en zetten RNA-polymerase op zijn plek; ‘vaak’ weg; label ‘hier binden transcriptiefactoren’, met transcriptiefactoren en het enzym dat aanschuift. ‘Voor vwo gaan we hier nog een stap verder’ weg (n10 begint met de inhoud). Promotor ook in de basis (n7), zodat afl. 6 voor havo aansluit. K1: strengen gaan uit elkaar, ‘hier doet RNA-polymerase dat zelf’. K2: ‘het ribosoom stopt’ in plaats van ‘de eiwitsynthese stopt’. K3: ‘de meeste genen’, ‘kan … opleveren’. Kapje en poly-A-staart in het vwo-blok (eigen beeld). Vaccin (n21): ribosomen op het ER → golgisysteem → blaasje dat versmelt met het celmembraan; reverse transcriptase uit afl. 2 is nodig om DNA te maken en zit niet in het vaccin. Slot n23: ‘Zo volgt je spiercel een recept dat niet in haar eigen DNA staat’ in plaats van de clou van afl. 4 (één code voor bijna al het leven). n12 begint met ‘Het mRNA gaat door een opening … : een kernporie’ (dubbeling met n10 weg).
  - *Opnieuw ingesproken:* n7, n10, n12, n21, n23 (één take elk, eleven_multilingual_v2, Roos); −16 LUFS / −1 dBTP met `norm16.sh`; woordtijden uit Scribe.
  - *Pagina:* checkvraag 3 eenduidig (van startcodon tot en met stopcodon: 363); checkvraag 4 met reverse transcriptase; vraag 5 optie C ‘door de ribosomen in je eigen cellen’; begrippen gen, promotor (nu basis), TATA-box, pre-mRNA, splicing aangepast, nieuw: transcriptiefactor (vwo), ER en golgisysteem; docentdeel: spike-eiwit, gemodificeerd uridine, cap/poly-A, ER-route, reverse transcriptase, coderende streng → afl. 4; footer zonder methodenaam, kegelslakvraag als CvTE havo 2021-I vraag 26 ‘valt niet onder de CC-licentie’; docenttabellen in een eigen scrollkader (geen horizontale scroll op 390 px); draaihint ook onder de speler op smalle schermen; transcript laat ‘Voor vwo …’ weg zoals de speler.
  - *Beeld:* korrel weg; cytoplasma rustiger (55 in plaats van 120 ribosoomstipjes); meta-tekst houdt mRNA/tRNA/DNA in de juiste schrijfwijze; meta-labels 28 px; schaalbalken vervangen door ‘schematisch · niet op schaal’; chromatine in plaats van helix-icoon; eiwitten als gevouwen kralenketting (`kluwen`), ook enzym en receptor met pasvorm en het spike-eiwit; vouwing in h4a tot compacte kluwen zonder kruisende lijnen; mRNA-slierten dunner; kernporie getekend waar het mRNA de kern verlaat, naam ernaast (ook in het vwo-blok); vast proceslabel ‘Transcriptie’ (teal) in h2a; opening: ‘vetbolletje’ los van de celrand, ‘nooit eerder gemaakt’ in de cirkel; titelinset zonder namen; translatie: codonhaken onder de kleine subeenheid, ‘start · Met’ bij het startcodon, stopcodon-label rechtsboven; h1a: eiwitten binnen de cel, labels vrij; h4b opnieuw opgezet; samenvattingskaart: ‘een recept van buiten, gelezen door je eigen ribosomen’.
- 12 okt 2026 (later) — nieuwe mensfiguur in opening en samenvatting: met huidskleur, zachte ronde vormen, vriendelijk gezicht (personReal in dnalib); speler: denktijd per vraag instelbaar.
- 1.0.1 · 12 okt 2026 — speler: ondertitels breken alleen nog tussen zinnen of bij een komma.
- 1.0.2 · 12 okt 2026 — tRNA’s sluiten nu precies op het codon aan (anticodonbasen grijpen in de codonbasen; eerst hingen ze iets te hoog of schoven ze erin). Helper `trnaY()` in `src/dnalib.js`.
- 1.0 · 12 okt 2026 — eerste versie. Script nagekeken door een vakinhoudelijke review (15 punten verwerkt); beelden nagekeken door een tweede, onafhankelijke review (ribosoom volgt de tRNA's, losgelaten mRNA houdt zijn basen, labels vrij van elkaar, 3′/5′ bij het anticodon). Dezelfde dag: n17 opnieuw ingesproken, de wiebelbase is de derde base van het codon (niet van het anticodon).

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

`label()` tekent geen lijntje + stip meer naar de naam; de naam staat direct naast het onderdeel (nieuwe functie `naamBij()` uit Celorganellen, met donkere rand rond de letters). De oude aanroepen `label(ctx, naam, meta, ax, ay, lx, ly, …)` werken nog: de richting ax,ay → lx,ly bepaalt aan welke kant de naam komt. Opnieuw geplaatst (eigen `naamBij(...)` of andere richting): 'vetbolletje', 'eiwit van het virus', 'eiwitten', 'gen', 'kern', 'ribosomen', 'afschrift van één gen', 'RNA-polymerase', 'mRNA', 'afgelezen streng', 'vrije RNA-nucleotiden', 'DNA weer dicht', 'promotor', 'kernporie', 'keten van aminozuren', 'ribosoom', 'codon', 'wiebelbase', 'enzym', 'receptor', 'opgevouwen eiwit'. Gecontroleerd op stills van alle scènes met namen.
