# DNA kopiëren — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/dna/2-dna-kopieren.html (één zelfstandig bestand; audio en lettertypen ingebed) |
| Reeks / nummer | DNA, film 2 van 8 (seriebrief DNA in “Seriebriefs uitlegfilms biologie”) |
| Doelgroep / niveau | havo + vwo; hoofdstuk 4 is een vwo-blok (`level:'vwo'`), Havo/Vwo-schakelaar, `?niveau=havo`, `?modus=klas` |
| Versie / datum | 2.0 · 12 oktober 2026 — omgezet naar Part C (prompt v5). 1.x (8–9 okt) had stijl C “Papier en inkt”; tekst en opnamen zijn ongewijzigd |
| Stem / model | Roos (ElevenLabs, voice 7qdUFMklKPaaAVMsBTBt, model eleven_multilingual_v2); één take per alinea of vraag |
| Duur | gesproken 5:35; speeltijd (zonder wachten bij vragen) vwo 6:55, havo 4:28 |
| Beeldstijl | Part C: Micro (#121A26 met korrel) voor molecuul en cel, Schema (#1A2740) voor klok, getallen, tabellen, vragen en kaarten, Macro alleen voor de mens in opening en samenvatting (overgang via zoomcirkel). Vaste UI-laag: ondertitelkast, labels met aanwijslijn, paarse vwo-balk, vraagkaart. Lettertypen Fraunces, Source Sans 3, IBM Plex Mono ingebed |
| Audio-opslag | base64 in `FILMDATA.segments[].audio` (data-URI per segment); woordtijden in `words` |
| Bouwstraat | `films/dna/_bouw/` (gedeeld door de DNA-reeks): `src/` (lib, dnalib, scenes1/2/3, player, page), `build.py`, `films.py`, `data/` (script, woordtijden, stem-invoer, docentdeel). Zie `_bouw/README.md` |

## Opbouw
Begintijden in de speler (hoofdstukkaart), vwo en havo.

| Begin vwo | Begin havo | Hoofdstuk | Segmenten | Type · look | Kernbeeld |
|---|---|---|---|---|---|
| 0:00 | 0:00 | Opening | n0 | I toepassing · Macro → zoomcirkel → Micro | knie met schaafwond die heelt; huidcellen die delen |
| 0:20 | 0:20 | Hoofdstuk 1 — Wanneer en waarom | n3, q4, n5 | C proces in de tijd · Micro → Schema-kaart | cel die deelt; celcyclusklok met S- en M-fase |
| 1:07 | 1:07 | Hoofdstuk 2 — Eén streng is genoeg | n7, q8, n9 | A mechanisme · Micro | simulatie: helicase ritst open, vrije nucleotiden blijven alleen op hun partner hangen, polymerase koppelt |
| 2:31 | 2:31 | Hoofdstuk 3 — Twee uit één | n11, q12, n13 | C proces in de tijd · Micro + Schema-kaart | twee identieke moleculen met de oude streng omlijnd; 50 per seconde tegenover 3 miljard; duizenden startpunten; telomeer; de eerste kopieerfout |
| 3:46 | — | Hoofdstuk 4 — Richting en halfnieuw | n15, q16, n17, n18 | A + G · Micro + Schema (proef, tabel) | Meselson-Stahl als voorspelvraag; antiparallel en 5′→3′; primer en primase; replicatievork met leidende en volgende streng; drie polymerasen; repair |
| 6:13 | 3:46 | Samenvatting — Terug naar de schaafwond | n20 | — · Macro → Micro | terug naar de knie; de stappen op een rij |

## Voorspelvragen
De vraag wordt ingesproken (eigen take), daarna 8 s denktijd en 2,5 s onthulling; het antwoord wordt in het volgende segment uitgesproken.

| Segment | Niveau | Vraag | Opties (juist vet) |
|---|---|---|---|
| q4 | basis | In welke fase kopieert de cel haar DNA? | tijdens de deling, in de M-fase · **vóór de deling, in de S-fase** · na de deling, in de nieuwe cel |
| q8 | basis | De oude streng is A C G T. Welke nieuwe streng bouwt DNA-polymerase ernaast? | A C G T · **T G C A** · U G C A |
| q12 | basis | Vijftig nucleotiden per seconde, en toch klaar in een paar uur. Hoe kan dat? | de polymerase gaat sneller als het moet · **het kopiëren begint op heel veel plekken tegelijk** · de cel kopieert alleen de genen die ze nodig heeft |
| q16 | vwo | Na één keer kopiëren op lichte stikstof: wat zie je als je het DNA op gewicht sorteert? | alleen zwaar DNA · alleen licht DNA · **alles even zwaar, precies tussen zwaar en licht in** · half zwaar, half licht |

## Begrippen
- celcyclus — De opeenvolging van fasen die een cel doorloopt tussen twee delingen.
- S-fase — Fase van de celcyclus waarin het DNA wordt gekopieerd.
- M-fase — Fase waarin de celdeling plaatsvindt en de kopieën van de chromosomen worden verdeeld over de dochtercellen.
- DNA-replicatie — Kopiëren van het DNA voor de celdeling (ook: DNA-verdubbeling).
- vrije DNA-nucleotiden — DNA-nucleotiden die los in het kernplasma voorkomen.
- DNA-polymerase — Enzym dat langs een enkelvoudige DNA-keten schuift en vrije nucleotiden uit het kernplasma verbindt met de vrijgekomen basen.
- helicase — Enzym dat de twee strengen van het DNA uit elkaar trekt (aanvulling op de methode).
- telomeer — Niet-coderend repetitief DNA aan de uiteinden van een DNA-molecuul, ingekapseld in beschermende eiwitten.
- mutatie — Verandering in de nucleotidevolgorde van het DNA, bijvoorbeeld een kopieerfout die blijft staan.
- semiconservatief *vwo* — Elk nieuw DNA-molecuul bestaat uit één oude en één nieuwe streng.
- primer *vwo* — Kort startstukje waaraan DNA-polymerase kan beginnen; gemaakt door primase.
- leidende streng *vwo* — De nieuwe streng die continu, met de vork mee, wordt gebouwd.
- volgende streng *vwo* — De nieuwe streng die in korte stukken (Okazaki-fragmenten) van de vork af wordt gebouwd; ligase plakt de stukken aan elkaar.
- Okazaki-fragmenten *vwo* — Korte stukken nieuw DNA op de volgende streng.
- RNA-polymerase *vwo* — Enzym dat een gen overschrijft naar RNA (transcriptie).
- reverse transcriptase *vwo* — Enzym dat uit RNA een DNA-kopie maakt.
- DNA-repair-enzymen *vwo* — Enzymen die verkeerd ingebouwde nucleotiden opsporen en vervangen.

## Checkvragen
- (basis) Een cel bevat 6 miljard basenparen. Hoeveel vrije nucleotiden moet zij uit het kernplasma halen om haar DNA te kopiëren? Leg uit. — *6 miljard: tegenover elke oude streng komt één nieuwe nucleotide per basenpaar, dus 2 × 3 miljard per set, 6 miljard in totaal.*
- (basis) Leg uit waardoor de twee DNA-moleculen na replicatie precies gelijk zijn aan het origineel. — *Elke oude streng dient als voorbeeld; door de vaste basenparing (A–T, C–G) krijgt elke streng exact dezelfde partner als eerst.*
- (basis) Een stof remt DNA-polymerase. In welke fase van de celcyclus blijft een cel dan steken, en waarom? — *In de S-fase: het DNA kan niet gekopieerd worden, dus de cel kan niet door naar de M-fase.*
- (vwo) Teken een replicatievork en geef aan welke streng continu wordt gebouwd en welke in fragmenten. Leg uit waarom. — *DNA-polymerase bouwt alleen 5'→3'. Langs de streng die 3'→5' de vork in loopt kan het met de vork mee bouwen (leidende streng); langs de andere moet het telkens van de vork af bouwen, in Okazaki-fragmenten (volgende streng).*
- (vwo) Een virus heeft RNA als erfelijk materiaal en bouwt zijn informatie in het DNA van de gastheer in. Welk enzym heeft het daarvoor nodig, en waarom niet DNA-polymerase? — *Reverse transcriptase: dat maakt DNA met RNA als matrijs. DNA-polymerase gebruikt alleen DNA als matrijs.*

## Getallen
| Getal | In de film | Bron |
|---|---|---|
| Snelheid DNA-polymerase (eukaryoot) | ≈ 50 nucleotiden/s | Alberts, Molecular Biology of the Cell |
| Tijd voor één enzym, 3,2 miljard nt | ≈ 2 jaar | 3,2·10⁹ ÷ 50 = 6,4·10⁷ s ≈ 740 dagen |
| Startpunten per replicatie (mens) | duizenden | 30 000–50 000 (Alberts) |
| Duur S-fase | een paar uur | ≈ 8 uur in een typische zoogdiercel (Alberts) |
| Foutkans na herstel | ≈ 1 op 10⁹ | Alberts |
| Nieuwe cellen bij een schaafwond | honderdduizenden | orde-schatting, niet gecontroleerd in een primaire bron |
| Meselson & Stahl | 1958, ¹⁵N/¹⁴N, E. coli | Meselson & Stahl, PNAS 44 (1958) |

## Techniek: waar zit wat in de HTML
Regelnummers in 2-dna-kopieren.html (de base64-audio staat binnen FILMDATA op één regel, dus `filmbron.py uitpakken` verandert de regels niet).
- **FILMDATA** (segmenten, woordtijden, regelgrenzen `bounds`, audio, filmtitel/eindkaart/hoofdstukvragen): regel 129. Speech-segment: `id`, `kind:'speech'`, `level`, `chapter`, `scene`, `audio`, `dur` (take + 0,6 s), `bounds` (regelgrenzen in s), `words` (`t,s,e`). Vraag: `q`, `options`, `correct` (0-based), `audio`, `adur`.
- **Part C-bibliotheek** (`C`-tokens, korrel, labels, zoomcirkel, cel, kern): regel 130; **DNA-bibliotheek** (basen met paarrand, ruggengraat, ladder, helix, nucleotide, enzym, persoon, klok): regel 312.
- **Scènes**: regel 429; één functie per scènenaam (`SCENES.h2a=(ctx,li,lf,t,q)`), `li` = regelnummer binnen het segment, `lf` = 0..1 binnen die regel (uit `bounds`). Beeldwissels hangen dus aan de gesproken regels.
- **Begrippen**: `const GLOSSARY` regel 643. **Speler**: regel 644 (tijdlijn, vraagfasen ask → countdown → wait/reveal, Havo/Vwo, Leerling/Klas, toetsen, ondertitels uit `words`).
- **Paginatekst** (kop, checkvragen, docentdeel, footer): statische HTML in de pagina; komt uit `_bouw/films.py` en `_bouw/data/afl2_docent.htmlfrag`.

## Zo pas je deze film aan
1. Werk in `films/dna/_bouw/` (kopieer de map naar een werkmap buiten de repo). Haal eerst de audio terug: `python3 haal_audio.py 2 ../2-dna-kopieren.html`.
2. **Beeld**: pas `src/scenes2.js` aan (zoek de scènenaam uit de tabel Opbouw, bijv. `SCENES.h2a`), daarna `python3 build.py 2` → `out/2-dna-kopieren.html`. Controleer met `node grab.js <pad>/out/2-dna-kopieren.standalone.html qa/x 6` en `python3 sheet.py qa/x qa/x.png 7`.
3. **Tekst op de pagina, titel, hoofdstukvragen, eindkaart**: `films.py`. **Docentdeel**: `data/afl2_docent.htmlfrag`. **Begrippen, checkvragen, getallen**: `data/afl2_script.json`.
4. **Een alinea opnieuw inspreken**: stem-invoer uit `data/afl2_stem.json` (respellings volgens de uitspraaklijst), Roos, eleven_multilingual_v2, één take. Vervang `data/afl2_audio/<id>.mp3` (−16 LUFS, −1 dBTP), zet nieuwe woordtijden (Scribe) en `bounds` in `data/afl2_words.json`, en pas de tekst aan in `data/afl2_script.json`. Andere segmenten blijven ongemoeid.
5. Kopieer `out/2-dna-kopieren.html` naar `films/dna/`, werk dit bestand en script.md bij (versie, datum, wat er veranderd is) en push.

## Aandachtspunten
- Alle tekst moet boven y = 892 blijven: de speler knipt scènes daar af (ondertitelzone).
- Meta-tekst staat in kapitalen, behalve eenheden (`metaCase` in de bibliotheek): µm, nm, °C blijven correct.
- De pijl → en ≈ zitten niet in de ingebedde lettertypes en vallen terug op het systeemlettertype.
- Basen zijn vier tinten paars en verschillen ook in letter en paarrand (A punt, T inkeping, C nok, G sleuf); RNA is teal (primer in film 2; mRNA en tRNA in film 3), eiwit en aminozuren oker, ribosoom #C9B896.
- Uitspraak van helicase, primase, ligase en Okazaki (takes n7, n17) is nog niet door Kamiel beoordeeld.

## Wijzigingen
- 2.0 · 12 okt 2026 — nieuwe Part C-look op de speler van Celorganellen (vraag wordt ingesproken; toetsen ↑ ↓ A B C Enter; lettertypen ingebed). Inhoudelijke correcties bij het hertekenen: de replicatiesimulatie opent de ladder nu echt (de oude versie liet hem dichtritsen); de nieuwe streng in het vwo-blok groeit van 5′ naar 3′ van rechts naar links, met de primer aan het 5′-uiteinde; primer als RNA (teal).
- 1.1 / 1.0 · 8–9 okt 2026 — eerste versie, stijl “Papier en inkt”.
