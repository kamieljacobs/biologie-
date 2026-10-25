# Wat is DNA? — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/dna/1-wat-is-dna.html (één zelfstandig bestand; audio en lettertypen ingebed) |
| Reeks / nummer | DNA, film 1 van 8 (seriebrief DNA in “Seriebriefs uitlegfilms biologie”) |
| Doelgroep / niveau | havo + vwo; hoofdstuk 4 is een vwo-blok (`level:'vwo'`), Havo/Vwo-schakelaar, `?niveau=havo`, `?modus=klas` |
| Versie / datum | 2.0 · 12 oktober 2026 — omgezet naar Part C (prompt v5). 1.x (8–9 okt) had stijl C “Papier en inkt”; tekst en opnamen zijn ongewijzigd |
| Prompt | v5 |
| Stem / model | Roos (ElevenLabs, voice 7qdUFMklKPaaAVMsBTBt, model eleven_multilingual_v2); één take per alinea of vraag |
| Duur | gesproken 5:30; speeltijd (zonder wachten bij vragen) vwo 6:51, havo 4:58 |
| Beeldstijl | Part C: Micro (#121A26 met korrel) voor molecuul en cel, Schema (#1A2740) voor klok, getallen, tabellen, vragen en kaarten, Macro alleen voor de mens in opening en samenvatting (overgang via zoomcirkel). Vaste UI-laag: ondertitelkast, labels met aanwijslijn, paarse vwo-balk, vraagkaart. Lettertypen Fraunces, Source Sans 3, IBM Plex Mono ingebed |
| Audio-opslag | base64 in `FILMDATA.segments[].audio` (data-URI per segment); woordtijden in `words` |
| Bouwstraat | `films/dna/_bouw/` (gedeeld door de DNA-reeks): `src/` (lib, dnalib, scenes1–4, player, page), `build.py`, `films.py`, `data/` (script, woordtijden, stem-invoer, docentdeel). Zie `_bouw/README.md` |

## Opbouw
Begintijden in de speler (hoofdstukkaart), vwo en havo.

| Begin vwo | Begin havo | Hoofdstuk | Segmenten | Type · look | Kernbeeld |
|---|---|---|---|---|---|
| 0:00 | 0:00 | Opening | n0 | I toepassing · Macro → zoomcirkel → Micro | wattenstaafje, wangcellen, celkern met 46 draden |
| 0:23 | 0:23 | Hoofdstuk 1 — Van wang tot molecuul | n3, q4, n5 | B structuur, schaal · Micro (+ Macro-figuur bij de lengte) | continue zoom cel → kern; 46 uitgerolde draden; één draad recht getrokken |
| 1:17 | 1:17 | Hoofdstuk 2 — De bouwsteen en de ladder | n7, n8, q9, n10 | B + A · Micro | uitvergrote nucleotide; simulatie waarin losse nucleotiden alleen op hun partner blijven hangen; de paarrand (punt/inkeping, nok/sleuf) laat zien wat past |
| 2:54 | 2:54 | Hoofdstuk 3 — Van volgorde tot gen tot genoom | n12, q13, n14 | B organisatieniveaus · Micro + Schema-kaart | één groeiend schema base → genoom; 2 % coderend |
| 4:19 | — | Hoofdstuk 4 — Richting, bruggen en verpakking | n16, n17, q18, n19 | B + A · Micro | genummerde suiker; waterstofbruggen; smelt-vergelijking AT-rijk vs GC-rijk; wikkelen om histonen |
| 6:11 | 4:19 | Samenvatting — Terug naar het wattenstaafje | n21 | — · Micro | terug naar wang en kern |

## Voorspelvragen
De vraag wordt ingesproken (eigen take), daarna 8 s denktijd en 2,5 s onthulling; het antwoord wordt in het volgende segment uitgesproken.

| Segment | Niveau | Vraag | Opties (juist vet) |
|---|---|---|---|
| q4 | basis | Als je alle 46 chromosomen van één cel achter elkaar legt, hoe lang is dat dan? | ongeveer twee millimeter · ongeveer twee centimeter · **ongeveer twee meter** |
| q9 | basis | Je kent van één streng de volgorde: A T T G C. Wat is dan de andere streng? | A T T G C · **T A A C G** · C G T T A |
| q13 | basis | Welk deel van jouw DNA bestaat uit genen die voor eiwitten coderen? | bijna alles · ongeveer de helft · **ongeveer twee procent** |
| q18 | vwo | Twee stukjes DNA, even lang. Het ene heeft veel C en G, het andere veel A en T. Welk stukje laat bij verwarmen het eerst los? | het stuk met veel C en G · **het stuk met veel A en T** · ze laten tegelijk los |

## Begrippen
- DNA — Desoxyribonucleïnezuur; bevat de informatie voor alle erfelijke eigenschappen van een organisme.
- nucleotide — Bouwsteen van DNA: een fosfaatgroep, de suiker desoxyribose en een stikstofbase (A, T, C of G).
- basenparing — Stikstofbasen verbinden twee nucleotideketens met een vaste partner: A met T, C met G.
- dubbelstrengs DNA — Twee nucleotideketens die door basenparing bij elkaar worden gehouden.
- helixstructuur — De twee ketens zijn in een spiraal om elkaar heen gedraaid.
- chromosoom — Een zeer lang dubbelstrengs DNA-molecuul.
- nucleotidenvolgorde / DNA-sequentie — De volgorde waarin de nucleotiden in een DNA-molecuul staan.
- gen — Een stuk DNA dat de informatie bevat voor één eiwit.
- genoom — Alle DNA-moleculen in een cel van een organisme.
- coderend / niet-coderend DNA — DNA dat wel, respectievelijk niet, codeert voor eiwitten.
- plasmiden — Korte stukjes circulair DNA in het cytoplasma van sommige prokaryoten.
- complementair *vwo* — Elke base in de ene streng heeft een vaste partner in de andere; ken je één streng, dan ken je de andere.
- antiparallel *vwo* — De twee strengen lopen in tegengestelde richting: 5'→3' naast 3'→5'.
- 5'- en 3'-uiteinde *vwo* — Uiteinden van een streng: aan het 5'-uiteinde een vrije fosfaatgroep, aan het 3'-uiteinde een vrije OH-groep.
- waterstofbrug *vwo* — Zwakke binding tussen de basen: twee bij A–T, drie bij C–G.
- hybridisatie *vwo* — Het weer paren van losse strengen met een passende volgorde na verhitten en afkoelen.
- histonen / nucleosoom / chromatine *vwo* — Eiwitten waar DNA omheen windt; één wikkeling om acht histonen is een nucleosoom; de verder opgevouwen kralenketting is chromatine.

## Checkvragen
- (basis) Een plant neemt uit de bodem fosfaat en nitraat op. Welke van beide heeft hij nodig voor de fosfaatgroep van een nucleotide, en welke voor de stikstofbase? — *Fosfaat voor de fosfaatgroep; nitraat (stikstof) voor de stikstofbase.*
- (basis) Een stukje DNA bevat 30% adenine. Hoeveel procent guanine bevat het? Leg uit. — *20%. A paart met T, dus ook 30% T; samen 60%. De overige 40% is C en G, die paren, dus 20% G.*
- (basis) Zet in volgorde van klein naar groot: chromosoom, gen, genoom, nucleotide. — *nucleotide → gen → chromosoom → genoom*
- (vwo) Van een DNA-streng is de volgorde 5'-ATGCCA-3'. Noteer de complementaire streng met de juiste uiteinden. — *3'-TACGGT-5', wat je van 5' naar 3' schrijft als 5'-TGGCAT-3'.*
- (vwo) Vóór een celdeling worden chromosomen zichtbaar als staafjes. Leg uit met de begrippen nucleosoom en chromatine waardoor dat komt. — *Het DNA is om histonen gewikkeld tot nucleosomen; die kralenketting (chromatine) wordt vóór de deling verder opgevouwen en gecondenseerd tot een compact staafje.*

## Getallen
| Getal | In de film | Bron |
|---|---|---|
| DNA-lengte per cel | ≈ 2 m | 6,4·10⁹ basenparen (diploïd) × 0,34 nm ≈ 2,2 m (Alberts, Molecular Biology of the Cell) |
| Kerndiameter | ≈ 6 µm | typische zoogdiercel 5–10 µm (Alberts) |
| Chromosoom 1 uitgerold | ≈ 8 cm | 248,9·10⁶ bp × 0,34 nm ≈ 8,5 cm (Ensembl GRCh38) |
| Basenparen per set | 3,2 miljard | GRCh38 ≈ 3,1·10⁹; methodes noemen 3,2 miljard |
| Coderend DNA | ≈ 2 % | 1–2 % exonisch (Alberts; Nectar H17) |
| Waterstofbruggen | 2 (A–T), 3 (C–G) | Alberts |
| Strengen laten los | ≈ 95 °C | denaturatiestap PCR (Nectar H17) |
| Histonen per nucleosoom | 8 | histon-octameer (Alberts) |
| Cellen aan een wattenstaaf | enkele duizenden | niet gecontroleerd in een primaire bron |

## Techniek: waar zit wat in de HTML
Regelnummers in 1-wat-is-dna.html (de base64-audio staat binnen FILMDATA op één regel, dus `filmbron.py uitpakken` verandert de regels niet).
- **FILMDATA** (segmenten, woordtijden, regelgrenzen `bounds`, audio, filmtitel/eindkaart/hoofdstukvragen): regel 129. Speech-segment: `id`, `kind:'speech'`, `level`, `chapter`, `scene`, `audio`, `dur` (take + 0,6 s), `bounds` (regelgrenzen in s), `words` (`t,s,e`). Vraag: `q`, `options`, `correct` (0-based), `audio`, `adur`.
- **Part C-bibliotheek** (`C`-tokens, korrel, labels, zoomcirkel, cel, kern): regel 130; **DNA-bibliotheek** (basen met paarrand, ruggengraat, ladder, helix, nucleotide, enzym, persoon, klok): regel 312.
- **Scènes**: regel 512; één functie per scènenaam (`SCENES.h2a=(ctx,li,lf,t,q)`), `li` = regelnummer binnen het segment, `lf` = 0..1 binnen die regel (uit `bounds`). Beeldwissels hangen dus aan de gesproken regels.
- **Begrippen**: `const GLOSSARY` regel 693. **Speler**: regel 694 (tijdlijn, vraagfasen ask → countdown → wait/reveal, Havo/Vwo, Leerling/Klas, toetsen, ondertitels uit `words`).
- **Paginatekst** (kop, checkvragen, docentdeel, footer): statische HTML in de pagina; komt uit `_bouw/films.py` en `_bouw/data/afl1_docent.htmlfrag`.

## Zo pas je deze film aan
1. Werk in `films/dna/_bouw/` (kopieer de map naar een werkmap buiten de repo). Haal eerst de audio terug: `python3 haal_audio.py 1 ../1-wat-is-dna.html`.
2. **Beeld**: pas `src/scenes1.js` aan (zoek de scènenaam uit de tabel Opbouw, bijv. `SCENES.h2a`), daarna `python3 build.py 1` → `out/1-wat-is-dna.html`. Controleer met `node grab.js <pad>/out/1-wat-is-dna.standalone.html qa/x 6` en `python3 sheet.py qa/x qa/x.png 7`.
3. **Tekst op de pagina, titel, hoofdstukvragen, eindkaart**: `films.py`. **Docentdeel**: `data/afl1_docent.htmlfrag`. **Begrippen, checkvragen, getallen**: `data/afl1_script.json`.
4. **Een alinea opnieuw inspreken**: stem-invoer uit `data/afl1_stem.json` (respellings volgens de uitspraaklijst), Roos, eleven_multilingual_v2, één take. Vervang `data/afl1_audio/<id>.mp3` (−16 LUFS, −1 dBTP), zet nieuwe woordtijden (Scribe) en `bounds` in `data/afl1_words.json`, en pas de tekst aan in `data/afl1_script.json`. Andere segmenten blijven ongemoeid.
5. Kopieer `out/1-wat-is-dna.html` naar `films/dna/`, werk dit bestand en script.md bij (versie, datum, wat er veranderd is) en push.

## Aandachtspunten
- Alle tekst moet boven y = 892 blijven: de speler knipt scènes daar af (ondertitelzone).
- Meta-tekst staat in kapitalen, behalve eenheden (`metaCase` in de bibliotheek): µm, nm, °C blijven correct.
- De pijl → en ≈ zitten niet in de ingebedde lettertypes en vallen terug op het systeemlettertype.
- Basen zijn vier tinten paars en verschillen ook in letter en paarrand (A punt, T inkeping, C nok, G sleuf); RNA is teal (primer in film 2; mRNA en tRNA in film 3), eiwit en aminozuren oker, ribosoom #C9B896.
- Stem-invoer van film 1 is gereconstrueerd volgens de uitspraaklijst; de letterlijke invoer van 8 oktober is niet bewaard.

## Wijzigingen
- 12 okt 2026 (later) — nieuwe mensfiguur in opening en samenvatting: met huidskleur, zachte ronde vormen, vriendelijk gezicht (personReal in dnalib); speler: denktijd per vraag instelbaar.
- 2.0.1 · 12 okt 2026 — speler: ondertitels breken alleen nog tussen zinnen of bij een komma/dubbele punt, nooit midden in “van 3′ naar 5′”; opnieuw gebouwd, beeld en audio ongewijzigd.
- 2.0 · 12 okt 2026 — nieuwe Part C-look op de speler van Celorganellen (vraag wordt ingesproken; toetsen ↑ ↓ A B C Enter; lettertypen ingebed). Inhoudelijke correcties bij het hertekenen: schaalbalken bij de kern kloppen nu met 6 µm; 2 %-balk op schaal; bacterie verkleind.
- 1.1 / 1.0 · 8–9 okt 2026 — eerste versie, stijl “Papier en inkt”.

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

`label()` tekent geen lijntje + stip meer naar de naam; de naam staat direct naast het onderdeel (nieuwe functie `naamBij()` uit Celorganellen, met donkere rand rond de letters). De oude aanroepen `label(ctx, naam, meta, ax, ay, lx, ly, …)` werken nog: de richting ax,ay → lx,ly bepaalt aan welke kant de naam komt. Opnieuw geplaatst (eigen `naamBij(...)` of andere richting): 'in elke cel', 'chromosoom', 'mitochondrium', 'plasmiden', 'waterstofbruggen', 'histonen'. Gecontroleerd op stills van alle scènes met namen.
