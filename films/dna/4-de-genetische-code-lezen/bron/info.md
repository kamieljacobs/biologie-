# De genetische code lezen — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/dna/4-de-genetische-code-lezen.html (één zelfstandig bestand; audio en lettertypen ingebed) |
| Reeks / nummer | DNA, film 4 van 8 (seriebrief DNA in “Seriebriefs uitlegfilms biologie”) |
| Doelgroep / niveau | havo + vwo; vwo-blokken in hoofdstuk 1 (anticodon, laadenzymen, ribosomaal RNA), hoofdstuk 3 (coderende streng en matrijsstreng) en de samenvatting (gen zonder introns) (`level:'vwo'`), Havo/Vwo-schakelaar, `?niveau=havo`, `?modus=klas` |
| Versie / datum | 1.2 · 27 oktober 2026 — opgewaardeerd naar prompt v10 (B14; zie Wijzigingen); 1.1 · 12 oktober 2026 — opnieuw ingesproken met eleven_v3 (Nederlandse aminozuren); 1.0 eerste versie, Part C (prompt v5); opening = puzzel A (insuline uit een bacterie); oefenaflevering met CE-vragen |
| Prompt | v10 |
| Voldoet aan | prompt v10 (27 okt 2026). Bewust niet gevolgd: (1) mRNA blijft in de leeshoofdstukken een rij basetegels op een ruggengraat (codons moeten leesbaar zijn; het sliertige mRNA staat in h1b en de samenvatting); (2) de nieuwe caststijl met contourlijnen nog niet (castvel nog niet gekeurd); (3) geen lichte stand (de DNA-speler heeft er geen); (4) geen verbeterblad vooraf: de brief van 27 okt vroeg om zelfstandig werken, Kamiel keurt de film in de reviewstand; (5) ribosoom blijft het eenvoudige twee-delen-silhouet uit de DNA-reeks. |
| Stem / model | Roos (ElevenLabs, voice 7qdUFMklKPaaAVMsBTBt, model eleven_v3); één take per alinea of vraag |
| Duur | speeltijd met vragen vwo 9:41, havo 8:03; met Vragen uit vwo 7:42, havo 6:03 (versie 1.2) |
| Beeldstijl | Part C: Micro (#121A26, sinds 1.2 zonder korrel) voor molecuul en cel, Schema (#1A2740) voor klok, getallen, tabellen, vragen en kaarten, Macro alleen voor de mens in opening en samenvatting (overgang via zoomcirkel). Vaste UI-laag: ondertitelkast, labels met aanwijslijn, paarse vwo-balk, vraagkaart. Lettertypen Fraunces, Source Sans 3, IBM Plex Mono ingebed |
| Audio-opslag | base64 in `FILMDATA.segments[].audio` (data-URI per segment); woordtijden in `words` |
| Bouwstraat | `films/dna/_bouw/` (gedeeld door de DNA-reeks): `src/` (lib, dnalib, scenes1–4, player, page), `build.py`, `films.py`, `data/` (script, woordtijden, stem-invoer, docentdeel). Zie `_bouw/README.md` |

## Opbouw
Begintijden in de speler (hoofdstukkaart), vwo en havo.

| Begin vwo | Begin havo | Hoofdstuk | Segmenten | Type · look | Kernbeeld |
|---|---|---|---|---|---|
| 0:00 | 0:00 | Opening | n0 | I toepassing · Macro → zoomcirkel → Micro | Opa Henk (castboek, vaste rol patiënt) van opzij met een insulinepen op ware grootte bij zijn buik; fabriekstank met bacteriën die insuline maken |
| 0:30 | 0:30 | Hoofdstuk 1 — Wie vertaalt de code? | n3, q4, n5, n6 | A mechanisme + A + B · Micro | groot tRNA met twee kanten; rechts vouwt één RNA-streng zich tot een tRNA (klaverblad, anticodon C A C, valine aan het 3′-uiteinde) naast een sliertig mRNA ‘recept · wordt gelezen’ (h1b li 0–1); kringloop pakt · past · laat leeg los; recept tegenover werktuig / anticodon 3′→5′; enzym laadt tRNA; ribosoom controleert alleen het anticodon; ribosomaal RNA |
| 2:56 | 2:11 | Hoofdstuk 2 — De codontabel lezen | n8, q9, n10 | G redeneerstappen · Schema | codontabel als vaste kaart; lezen vanaf AUG; stop; rekenen 300 + 3 |
| 4:42 | 3:57 | Hoofdstuk 3 — Beginnen bij het DNA | n12, q13, n14, n15 | G · Schema | DNA-streng → mRNA met U → tabel / beide strengen met 5′/3′; mRNA = coderende streng met U; andersom lezen |
| 6:34 | 5:00 | Hoofdstuk 4 — Terugredeneren | n17, q18, n19, q20, n21 | G · Schema | CE-vragen in twee kolommen codons; passend paar licht op |
| 8:50 | 7:16 | Samenvatting — Terug naar de insuline | n23, n24, n25 | — · Macro → Micro → Schema | ribosomen op het mRNA ín de bacterie, vergroot in een zoomcirkel met tRNA; zelfde tRNA in bacterie en mens; zelfde keten |

## Voorspelvragen
De vraag wordt ingesproken (eigen take), daarna 8 s denktijd en 2,5 s onthulling; het antwoord wordt in het volgende segment uitgesproken.

| Segment | Niveau | Vraag | Opties (juist vet) |
|---|---|---|---|
| q4 | basis | Hoe komt het juiste aminozuur bij een codon? | het mRNA trekt het juiste aminozuur aan · het ribosoom herkent elk aminozuur · **een ander RNA-molecuul brengt het aminozuur mee** |
| q9 | basis | Dit mRNA begint zo: G C A U G U U U G U G. Wat is het eerste aminozuur? | alanine · **methionine** · valine |
| q13 | basis | Een stukje van de afgelezen DNA-streng is T A C A A A. Welke codons staan in het mRNA? | TAC en AAA · ATG en TTT · **AUG en UUU** |
| q18 | basis | Leucine werd histidine. Welke base van het codon is veranderd? Zoek het op in de codontabel. | de eerste base · **de tweede base** · de derde base |
| q20 | basis | Cysteïne werd serine. Welke verandering in het codon past daarbij? | een A werd een U · een C werd een A · **een G werd een C** · een U werd een G |

## Begrippen
- RNA — Enkelstrengs nucleïnezuur met ribose en de basen A, C, G en U. RNA kan informatie zijn (mRNA, het recept) maar ook een werktuig (tRNA, ribosomaal RNA).
- transfer-RNA (tRNA) — RNA dat aminozuren uit het cytoplasma naar het ribosoom vervoert. Aan de ene kant drie basen die op één codon passen, aan de andere kant één soort aminozuur; wordt steeds opnieuw gebruikt.
- codon — Drie opeenvolgende nucleotiden in het mRNA die coderen voor één aminozuur.
- codontabel — Tabel met welk codon bij welk aminozuur hoort; je zoekt eerst de eerste, dan de tweede, dan de derde base op.
- startcodon — Codon AUG, waarmee de synthese van een aminozuurketen start; codeert voor methionine.
- stopcodons — Codons (UAA, UAG, UGA) die niet coderen voor een aminozuur, waardoor de eiwitsynthese stopt. Ze zitten wel in het mRNA.
- transcriptie — Vorming van mRNA langs DNA; tegenover A komt U.
- anticodon *vwo* — De drie basen van een tRNA die complementair zijn aan een codon (3′→5′ onder het codon).
- matrijsstreng *vwo* — De DNA-streng die bij transcriptie wordt afgelezen.
- coderende streng *vwo* — De andere DNA-streng; zelfde volgorde als het mRNA, met T in plaats van U.
- ribosomaal RNA *vwo* — RNA waaruit het ribosoom voor een groot deel bestaat; het koppelt de aminozuren aan elkaar.

## Checkvragen
- (basis) Leg uit waarom tRNA een werktuig is en mRNA een recept. — *mRNA bevat de informatie (de volgorde van codons). Een tRNA brengt een aminozuur naar het ribosoom, past met drie basen op het codon, laat leeg los en wordt opnieuw gebruikt.*
- (basis) Een mRNA begint met C C A U G G C U U U G A. Geef de aminozuurvolgorde. — *Begin bij AUG: AUG GCU UUG A… → methionine – alanine – leucine (daarna verder tot een stopcodon).*
- (basis) Een eiwit bestaat uit 250 aminozuren. Uit hoeveel nucleotiden bestaat het coderende deel van het mRNA minstens, met het stopcodon erbij? — *250 × 3 + 3 = 753.*
- (basis) (naar CvTE havo 2022-II) Door één veranderde base wordt serine ingebouwd in plaats van leucine. Welk codon in het oorspronkelijke RNA is veranderd? A CUA of CUG · B CUU of CUC · C UUA of UUG — *C: UUA → UCA en UUG → UCG (serine) verschillen in één base; CUx → UCx zou twee veranderingen vragen. (Eigen uitwerking; correctievoorschrift niet ingezien.)*
- (vwo) Waarom zou een fout in een enzym dat tRNA met aminozuren laadt gevolgen hebben voor veel eiwitten tegelijk? — *Het ribosoom controleert alleen of het anticodon past, niet het aminozuur. Een verkeerd geladen tRNA brengt dus overal waar zijn codon voorkomt het verkeerde aminozuur in.*
- (vwo) De coderende streng van een stukje DNA is 5′-ATG GCA-3′. Geef de matrijsstreng (met 5′ en 3′) en het mRNA. — *Matrijsstreng 3′-TAC CGT-5′; mRNA 5′-AUG GCA-3′ (gelijk aan de coderende streng, met U).*

## Getallen
| Getal | In de film | Bron |
|---|---|---|
| Codons / aminozuren / stopcodons | 64 / 20 / 3 | standaard genetische code |
| Codons voor leucine | 6 | standaard genetische code |
| 100 aminozuren | 300 + 3 nucleotiden | 3 per aminozuur + stopcodon |
| Insuline uit micro-organismen | bacteriën (en gisten) | sinds de jaren tachtig; de film noemt alleen bacteriën |

## Techniek: waar zit wat in de HTML
Regelnummers in 4-de-genetische-code-lezen.html (de base64-audio staat binnen FILMDATA op één regel, dus `filmbron.py uitpakken` verandert de regels niet).
- **FILMDATA** (segmenten, woordtijden, regelgrenzen `bounds`, audio, filmtitel/eindkaart/hoofdstukvragen): regel 135. **Castboek** (kopie van `personages/lib_cast.js`, 27 okt 2026): regel 136–948. Speech-segment: `id`, `kind:'speech'`, `level`, `chapter`, `scene`, `audio`, `dur` (take + 0,6 s), `bounds` (regelgrenzen in s), `words` (`t,s,e`). Vraag: `q`, `options`, `correct` (0-based), `audio`, `adur`.
- **Part C-bibliotheek** (`C`-tokens, labels, zoomcirkel, cel, kern; `grain()` bestaat nog maar wordt niet meer aangeroepen): regel 949; **DNA-bibliotheek** (basen met paarrand, ruggengraat, ladder, helix, nucleotide, enzym, klok): regel 1140. Nieuw in 1.2: `penEcht` (insulinepen, regel 1377), `klaverPad`/`herbemonster`/`rnaVouw` (tRNA als gevouwen RNA-streng, regel 1415–1428).
- **Scènes**: regel 1392 (`open` 1395, `h1b` 1429, `h4c` 1585, `recap` 1598); één functie per scènenaam (`SCENES.h2a=(ctx,li,lf,t,q)`), `li` = regelnummer binnen het segment, `lf` = 0..1 binnen die regel (uit `bounds`). Beeldwissels hangen dus aan de gesproken regels.
- **Begrippen**: `const GLOSSARY` regel 1626. **Speler**: regel 1627 (tijdlijn, vraagfasen ask → countdown → wait/reveal, Havo/Vwo, Leerling/Klas, toetsen, ondertitels uit `words`).
- **Paginatekst** (kop, checkvragen, docentdeel, footer): statische HTML in de pagina; komt uit `_bouw/films.py` en `_bouw/data/afl4_docent.htmlfrag`.

## Zo pas je deze film aan
1. Werk in `films/dna/_bouw/` (kopieer de map naar een werkmap buiten de repo). Haal eerst de audio terug: `python3 haal_audio.py 4 ../4-de-genetische-code-lezen.html`.
2. **Beeld**: pas `src/scenes4.js` aan (zoek de scènenaam uit de tabel Opbouw, bijv. `SCENES.h2a`), daarna `python3 build.py 4` → `out/4-de-genetische-code-lezen.html`. Controleer met `node grab.js <pad>/out/4-de-genetische-code-lezen.standalone.html qa/x 6` en `python3 sheet.py qa/x qa/x.png 7`.
3. **Tekst op de pagina, titel, hoofdstukvragen, eindkaart**: `films.py`. **Docentdeel**: `data/afl4_docent.htmlfrag`. **Begrippen, checkvragen, getallen**: `data/afl4_script.json`.
4. **Een alinea opnieuw inspreken**: stem-invoer uit `data/afl4_stem.json` (respellings volgens de uitspraaklijst), Roos, eleven_v3, één take. Vervang `data/afl4_audio/<id>.mp3` (−16 LUFS, −1 dBTP), zet nieuwe woordtijden (Scribe) en `bounds` in `data/afl4_words.json`, en pas de tekst aan in `data/afl4_script.json`. Andere segmenten blijven ongemoeid.
5. Kopieer `out/4-de-genetische-code-lezen.html` naar `films/dna/`, werk dit bestand en script.md bij (versie, datum, wat er veranderd is) en push.

## Aandachtspunten
- Alle tekst moet boven y = 892 blijven: de speler knipt scènes daar af (ondertitelzone).
- Meta-tekst staat in kapitalen, behalve eenheden (`metaCase` in de bibliotheek): µm, nm, °C blijven correct.
- De pijl → en ≈ zitten niet in de ingebedde lettertypes en vallen terug op het systeemlettertype.
- Basen zijn vier tinten paars en verschillen ook in letter en paarrand (A punt, T inkeping, C nok, G sleuf); RNA is teal (primer in film 2; mRNA en tRNA in film 3), eiwit en aminozuren oker, ribosoom #C9B896.
- Uitspraak (rondes 1–9 met Kamiel, 12 okt): opgenomen met ElevenLabs **eleven_v3** (niet multilingual_v2: die gaf de uitgang '-ine' Frans of als 'valinuu'). Aminozuren in de stem-invoer: vaaline, meetioonine, leussine, histiedine, seerine, aalaanine, feenyl-alanine; cysteïne zoals geschreven. De uitgang moet klinken als in 'verwenne' (/vaːˈli.nə/). Afgekeurd: 'valie-nuh'-spellingen (rondes 1–7), 'valienuh' zonder streepje. Verder 'codon tabel' los, losse codons met streepjes, DNA als 'deeënaa', tRNA als 'tee-er-en-aa'.
- tRNA klonk in eleven_v3 elke keer anders. Kamiel koos uitspraak nr 2 (n5 ≈ 0:07,6); `splice_trna.py` plakt precies die opname over alle andere 13 keer (n5, n6, n23; grenzen via DTW, meervouden houden hun eigen s). Originelen in `afl4/v3/pre_splice/`, tijdkaart in `afl4/v3/splice.json`. Neem je n5, n6 of n23 opnieuw op, draai daarna `splice_trna.py` opnieuw.
- n5 kreeg op 12 okt een extra zin (Kamiel: anticodon ↔ aminozuur ook zeggen): "Welk aminozuur erbij hoort, hangt af van die drie basen. Bij C A C hoort altijd valine." Los opgenomen (eleven_v3, `afl4/v3/insert/`) en ingevoegd door `insert_n5.py`, ná `splice_trna.py`. Volgorde: `splice_trna.py` → `insert_n5.py` → `make_words4v3.py` → kopieer naar `data/afl4_audio/` → `build.py 4`.
- CE-vragen geparafraseerd (havo 2025-I v39, 2024-II v18; 2022-II v32 als checkvraag); op 27 okt 2026 nagelegd naast vraag en correctievoorschrift in `examenatlas/img/havo/` (B, C, C: klopt). Codontabel in de film (`CODE`) met een script vergeleken met de standaardcode: alle 64 codons kloppen. Bij 2024-II is U G U → A G U ook één base; de film benoemt dat.
- Denktijd 12 s bij de twee terugredeneervragen (`think` in het vraagsegment).
- Codontabel als 4 × 4-raster (34 px, net onder het Part C-minimum); vorm in BiNaS niet gecontroleerd.
- Nieuwe bibliotheekobjecten: insulinepen (sinds 1.2 `penEcht`), fabriekstank, bacterie, insuline, codontabel, tRNA-kringloop, tRNA-vouw (`rnaVouw`, kandidaat voor `bibliotheek/lib_bio.js`). `personReal`/`personFlat` staan nog in de code maar worden niet meer gebruikt.
- n6, n15, n24 beginnen niet meer met 'Voor vwo …' (geknipt, zie script.md); hun eerste regel in `bounds` heeft lengte 0, zodat de regelnummers `li` in de scènes gelijk bleven.

## Wijzigingen
- 1.2 · 27 okt 2026 — opgewaardeerd van prompt v5 naar v10 (B14, alleen de delta; stem, script, vragen en timing blijven). Oude versie: `bron/oud/4-de-genetische-code-lezen-v1.1.html`.
  - Alle Micro-scènes en zoomcirkels: korrel weg (BEELDAFSPRAKEN 15 okt).
  - `open` (n0): personReal-poppetje vervangen door Opa Henk uit het castboek (ROLLEN: patiënt), van opzij, met de insulinepen op ware grootte bij zijn buik (was: pen zo lang als zijn onderarm, als knuppel over de schouder); label 'insulinepen'. Insuline nu ín de bacteriën (stak over de rand).
  - `h1b` li 0–1 (n5): nieuw: een RNA-streng vouwt zich tot een tRNA (klaverblad met baseparen in de stammen, anticodon C A C, valine aan het 3′-uiteinde) naast een sliertig mRNA 'recept · wordt gelezen' — maakt zichtbaar dat tRNA ook RNA is, maar een werktuig. Verdwijnt aan het begin van li 2.
  - `h1v`, `h3v`, `recapv` (n6, n15, n24): gesproken 'Voor vwo gaan we hier nog een stap verder.' uit de audio geknipt; titel 'Voor vwo: een stap verder' weg.
  - `h4c` (n21): 'G in het midden werd C', 'ook mogelijk: eerste U werd A' en 'elke plek kan …' links onder de cysteïnecodons gezet (vielen over de serinetegels).
  - `recap` li 2 (n23): ribosomen ín de bacterie op het mRNA, vergroot in een zoomcirkel met tRNA (stonden los naast de bacterie, groter dan de bacterie).
  - Paginatekst: checkvraag 4 en de verantwoording zeggen nu dat de antwoorden kloppen met het correctievoorschrift; footer versie 1.2.
  - Bronnenlogboek `bron/bronnen.md` toegevoegd.
- 1.1 · 12 okt 2026 — tRNA-kringloop (h1b) opnieuw: één tRNA gaat zichtbaar de kring rond (pakt valine, klikt op G-U-G, valine gaat naar de keten, het tRNA vertrekt leeg met een gestippeld leeg haakje); “vaste combinatie” anticodon C A C → valine plus een rijtje anticodon → aminozuur (h1b li 5–6), met een nieuwe gesproken zin in n5 (“Welk aminozuur erbij hoort, hangt af van die drie basen. Bij C A C hoort altijd valine.”); tRNA overal dezelfde opname; anticodon en codon grijpen nu precies in elkaar (`trnaY()`).; alle 20 takes opnieuw ingesproken met eleven_v3 en Nederlandse uitspraak van de aminozuren (na 9 uitspraakrondes met Kamiel); woordtijden opnieuw berekend; spraak nu ≈ 505 s (vwo).
- 1.0 · 12 okt 2026 — eerste versie. Script nagekeken door een vakinhoudelijke review (13 punten, o.a. stopcodon telt mee in het mRNA; A G U als tweede mogelijkheid) en een didactiek/taal-review (15 punten, o.a. "Antwoord C." vooraf, hergebruik van tRNA als werktuig). Beelden nagekeken op contactsheets vwo en havo.

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

`label()` tekent geen lijntje + stip meer naar de naam; de naam staat direct naast het onderdeel (nieuwe functie `naamBij()` uit Celorganellen, met donkere rand rond de letters). De oude aanroepen `label(ctx, naam, meta, ax, ay, lx, ly, …)` werken nog: de richting ax,ay → lx,ly bepaalt aan welke kant de naam komt. Opnieuw geplaatst (eigen `naamBij(...)` of andere richting): 'menselijk insulinegen', 'insuline', 'drie basen', 'codon', 'keten', 'anticodon', 'ribosomaal RNA', 'insulinegen'. Gecontroleerd op stills van alle scènes met namen.
