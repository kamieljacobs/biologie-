# Wat heb jij aan DNA? — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/dna/8-wat-heb-jij-aan-dna.html (één zelfstandig bestand; audio en lettertypen ingebed) |
| Reeks / nummer | DNA, film 8 van 8 (seriebrief DNA in “Seriebriefs uitlegfilms biologie”) |
| Doelgroep / niveau | havo + vwo; geen vwo-blokken: slotaflevering op één niveau (havo en vwo), type I toepassing en keuze; de Havo/Vwo-schakelaar is verborgen (`oneLevel`), `?niveau=havo`, `?modus=klas` |
| Versie / datum | 1.1 · 13 oktober 2026 — Havo/Vwo-schakelaar verborgen (één niveau, Kamiel 13 okt); 1.0 · 13 oktober 2026 — eerste versie, Part C (prompt v5), gemaakt in reeksmodus (Part E); opening = puzzel A (de film zelf: doosje, dokter, telefoontje); stem eleven_v3 zonder uitspraaktest vooraf |
| Stem / model | Roos (ElevenLabs, voice 7qdUFMklKPaaAVMsBTBt, model eleven_v3); één take per alinea of vraag |
| Duur | gesproken 9:49; speeltijd (zonder wachten bij vragen) vwo 11:09, havo 11:09 |
| Beeldstijl | Part C: Micro (#121A26 met korrel) voor molecuul en cel, Schema (#1A2740) voor klok, getallen, tabellen, vragen en kaarten, Macro alleen voor de mens in opening en samenvatting (overgang via zoomcirkel). Vaste UI-laag: ondertitelkast, labels met aanwijslijn, paarse vwo-balk, vraagkaart. Lettertypen Fraunces, Source Sans 3, IBM Plex Mono ingebed |
| Audio-opslag | base64 in `FILMDATA.segments[].audio` (data-URI per segment); woordtijden in `words` |
| Bouwstraat | `films/dna/_bouw/` (gedeeld door de DNA-reeks): `src/` (lib, dnalib, scenes1–6, player, page), `build.py`, `films.py`, `data/` (script, woordtijden, stem-invoer, docentdeel). Zie `_bouw/README.md` |

## Opbouw
Begintijden in de speler (hoofdstukkaart), vwo en havo.

| Begin vwo | Begin havo | Hoofdstuk | Segmenten | Type · look | Kernbeeld |
|---|---|---|---|---|---|
| 0:00 | 0:00 | Opening | n0 | I toepassing · Schema | drie iconen van de vorige afleveringen; jij; doosje, dokter, telefoontje |
| 0:30 | 0:30 | Hoofdstuk 1 — Een doosje van internet | n3, q4, n5 | I + G · Schema | doosje en telefoonrapport; SNP-stippen op het genoom; afkomst als vergelijking met groepen; lactose vs koriander; varianten vs leefstijl (vraag 1); het bedrijf, de politie, de familie; de eerste balans |
| 3:04 | 3:04 | Hoofdstuk 2 — Een kind op komst | n7, q8, n9 | I · Schema | hielprik (voet en druppel); 24 vakjes; dieet/medicijn/behandeling; 60 ouders; NIPT (bloed met stukjes); chromosoom 21/18/13; kans → vervolgtest → keuze (vraag 2); dragerschap: allelen A a, 1 op 30, 1 op 4; balans feit/waarde |
| 5:41 | 5:41 | Hoofdstuk 3 — Het zit in de familie | n11, q12, n13 | I + E · Schema | telefoontje van de tante; BRCA1 op het chromosoom; 70 % vs 1 op 7; controleren of operatie; weten/niet weten; Huntington met tijdlijn; 1 op 5 laat zich testen; stamboom met en zonder variant (vraag 3); vader nooit getest; klinisch geneticus; verzekeraar; balans |
| 8:24 | 8:24 | Hoofdstuk 4 — Een medicijn op maat | n15, q16, n17 | I + A · Schema | ziekte later vs medicijn nu; patiënt met infuus; enzym en stapelende pillen; DNA-test → dosis (vraag 4); eenvoudige balans; gg-maïs: boer, zaadbedrijf, akker, het eten zelf; feit vs waarde |
| 10:17 | 10:17 | Samenvatting — Jouw balans | n19, n20 | — · Schema | de balans met beide schalen; cel → acht stippen → jij |

## Voorspelvragen
De vraag wordt ingesproken (eigen take), daarna 8 s denktijd en 2,5 s onthulling; het antwoord wordt in het volgende segment uitgesproken.

| Segment | Niveau | Vraag | Opties (juist vet) |
|---|---|---|---|
| q4 | basis | Het rapport zegt: je kans op diabetes type 2 is 1,3 keer zo groot als gemiddeld. Wat betekent dat? | ik heb een mutatie die diabetes veroorzaakt · ik krijg waarschijnlijk diabetes · **mijn kans is iets groter dan gemiddeld; mijn leefstijl telt zwaarder** |
| q8 | basis | Bijna alle ouders doen de hielprik, maar de NIPT is een echte keuze. Hoe komt dat? | **de hielprik vindt wat je kunt behandelen; de NIPT geeft een kans waarbij jij moet kiezen** · de hielprik is verplicht, de NIPT niet · de NIPT geeft een zekere uitslag, de hielprik niet |
| q12 | basis | Je moeder heeft de BRCA1-variant. Jij laat je gericht op die variant testen, en je hebt hem niet. Wat weet je dan over je eigen kinderen? | ze hebben toch een verhoogde kans, want het zit in de familie · **ze kunnen die variant via mij niet krijgen** · ze hebben ieder vijftig procent kans op die variant |
| q16 | basis | Vóór deze chemokuur krijgt de patiënt eerst een DNA-test. Waar kijkt de arts bij deze test naar? | of de kanker erfelijk is · of het medicijn bij deze patiënt gaat werken · **of de patiënt het medicijn langzaam afbreekt** |

## Begrippen
- commerciële DNA-test — Test uit een doosje: een bedrijf leest een paar honderdduizend SNP's uit je speeksel en rapporteert afkomst (een schatting door vergelijking met referentiegroepen), eigenschappen van (bijna) één gen en risico's op veelvoorkomende ziekten (kleine verschillen; honderden varianten plus leefstijl).
- kans of zekerheid — Een DNA-uitslag is bijna altijd een kans (een variant maakt een ziekte waarschijnlijker) en zelden een zekerheid (zoals bij de ziekte van Huntington). Een relatief risico (1,3 keer de gemiddelde kans) zegt pas iets als je de gemiddelde kans kent.
- screening — Een onderzoek dat aan iedereen in een groep wordt aangeboden zonder dat er een klacht is (hielprik, NIPT); een afwijkende uitslag wordt altijd met vervolgonderzoek gecontroleerd.
- hielprik — Screening van pasgeborenen (dag 3–7) op ruim twintig zeldzame aandoeningen waarbij vroege behandeling helpt, uit een paar druppels bloed uit de hiel; vrijwillig, bijna iedereen doet mee.
- NIPT — Niet-invasieve prenatale test (zie aflevering 7): telt DNA van het kind in het bloed van de moeder en geeft een kans op een extra chromosoom 21 (downsyndroom), 18 of 13; een screening, geen diagnose; een aanbod, geen plicht; vervolgtest: vlokkentest of vruchtwaterpunctie.
- dragerschapstest — Test vóór een zwangerschap of je drager bent van een recessieve erfelijke ziekte (het allel één keer, zoals bij taaislijmziekte) zonder er zelf iets van te merken; via huisarts of klinisch geneticus; zijn beide ouders drager, dan is de kans per kind één op vier.
- erfelijkheidsonderzoek — DNA-onderzoek naar een variant die in de familie zit (zoals in BRCA1), via een klinisch geneticus (arts gespecialiseerd in erfelijkheid) die vooraf bespreekt wat je kunt horen, wat je ermee kunt en wie het nog meer aangaat; weten en niet weten mogen allebei (recht om niet te weten).
- medicijn op maat — Farmacogenetica: een DNA-test op het gen voor een enzym dat een medicijn afbreekt; bij een trage variant een lagere dosis of een ander middel (in Nederland standaard vóór bepaalde chemokuren).
- genetisch gemodificeerd (transgeen) — Organisme met een ingebouwd gen van een andere soort (zie aflevering 7): de insulinebacterie, of maïs met een bacteriegen tegen insecten. Bij de afweging horen de vragen wie er baat bij heeft en wie het risico draagt.

## Checkvragen
- (basis) Een commerciële DNA-test zegt dat iemand voor 23 % 'Scandinavisch' is; een ander bedrijf zegt 9 %. Hoe kan dat? — *Afkomst is geen eigenschap die in het DNA staat, maar een schatting: de SNP's worden vergeleken met referentiegroepen in de databank van dat bedrijf. Andere databank en andere rekenmethode geven een ander percentage.*
- (basis) Noem twee verschillen tussen de hielprik en de NIPT. — *Moment (na de geboorte / tijdens de zwangerschap), wat er gezocht wordt (behandelbare aandoeningen / kans op een extra chromosoom), wat de uitslag in gang zet (onderzoek en behandeling / vervolgtest en een keuze) en deelname (bijna iedereen / iets meer dan de helft). Allebei zijn screening en vrijwillig.*
- (basis) Beide ouders zijn drager van taaislijmziekte. Hoe groot is de kans dat hun kind de ziekte heeft, en hoe groot dat het drager is? — *Ziek: 1 op 4 (aa); drager: 1 op 2 (Aa); niet-drager: 1 op 4 (AA). Dit geldt voor elk kind opnieuw.*
- (basis) Waarom verloopt een test op een BRCA1-variant via een klinisch geneticus en niet via een doosje van internet? — *De uitslag heeft grote gevolgen (kans tot zo'n 70 % op borstkanker en een verhoogde kans op eierstokkanker; keuzes als controles of een operatie), hij zegt ook iets over familieleden die misschien niet willen weten, en de betekenis vraagt uitleg vooraf en nazorg; een commerciële test leest meestal niet eens de relevante varianten.*
- (basis) Wat is het verschil tussen de DNA-test vóór een chemokuur en de BRCA1-test? — *De test vóór de chemokuur kijkt naar het gen voor een enzym dat het medicijn afbreekt en past de dosis aan (nu, vooral voor deze patiënt); de BRCA1-test kijkt naar een variant die de kans op een ziekte in de toekomst vergroot en zegt ook iets over familieleden.*

## Getallen
| Getal | In de film | Bron |
|---|---|---|
| Plekken die een commerciële test leest | een paar honderdduizend | SNP-chips: ≈ 600.000–700.000 SNP's; een genoom heeft ≈ 3 miljard basenparen |
| Kans op diabetes type 2 (gemiddeld, NL) | ongeveer één op de drie | Rotterdam Study: levenslang risico ≈ 31 % vanaf 45 jaar; 1,3 × ≈ 40 % |
| Hielprik: aantal aandoeningen en moment | ruim twintig; dag 3–7 | RIVM: 26–27 aandoeningen (2024–2025), afname 72–168 uur na de geboorte, deelname ≈ 99 % |
| NIPT: deelname | iets meer dan de helft | RIVM-monitor 2023–2024: ≈ 55–60 % van de zwangere vrouwen (sinds april 2023 zonder eigen bijdrage) |
| Drager van taaislijmziekte (CF) | ongeveer één op de dertig | NL: ≈ 1 op 30 is drager van een CFTR-variant; ≈ 1 op 4.000–4.750 kinderen heeft CF |
| Borstkanker bij een BRCA1-variant | tot zo'n zeventig procent | cumulatief risico tot 80 jaar ≈ 72 % (BRCA1) en 69 % (BRCA2), Kuchenbaecker e.a., JAMA 2017; eierstokkanker ≈ 40 % (BRCA1); algemene bevolking NL ≈ 1 op 7 (IKNL); overervingskans 50 % (dominant) |
| Huntington: begin en wie laat zich testen | 30–50 jaar; ongeveer één op de vijf | gemiddelde beginleeftijd 30–50 jaar; ≈ 10–25 % van de mensen met 50 % risico vraagt een voorspellende test aan |
| Verzekeraar en erfelijkheidsonderzoek | tot een paar ton niet vragen | Wet op de medische keuringen: vragengrens levensverzekering ≈ € 350.000 (2025, jaarlijks geïndexeerd); daarboven mag naar uitslagen gevraagd worden |
| Trage afbraak chemomedicijn | ongeveer één op de twintig | DPYD-varianten (vier geteste): ≈ 5–8 % van de Europese bevolking; genotypering standaard in NL vóór fluoropyrimidines (5-FU, capecitabine) sinds ≈ 2018 (Henricks e.a., Lancet Oncol 2018), EMA-advies 2020 |

## Techniek: waar zit wat in de HTML
Regelnummers in 8-wat-heb-jij-aan-dna.html (de base64-audio staat binnen FILMDATA op één regel, dus `filmbron.py uitpakken` verandert de regels niet).
- **FILMDATA** (segmenten, woordtijden, regelgrenzen `bounds`, audio, filmtitel/eindkaart/hoofdstukvragen): regel 139. Speech-segment: `id`, `kind:'speech'`, `level`, `chapter`, `scene`, `audio`, `dur` (take + 0,6 s), `bounds` (regelgrenzen in s), `words` (`t,s,e`). Vraag: `q`, `options`, `correct` (0-based), `audio`, `adur`.
- **Part C-bibliotheek** (`C`-tokens, korrel, labels, zoomcirkel, cel, kern): regel 140; **DNA-bibliotheek** (basen met paarrand, ruggengraat, ladder, helix, nucleotide, enzym, persoon, klok): regel 322.
- **Scènes**: regel 552; één functie per scènenaam (`SCENES.h2a=(ctx,li,lf,t,q)`), `li` = regelnummer binnen het segment, `lf` = 0..1 binnen die regel (uit `bounds`). Beeldwissels hangen dus aan de gesproken regels.
- **Begrippen**: `const GLOSSARY` regel 679. **Speler**: regel 680 (tijdlijn, vraagfasen ask → countdown → wait/reveal, Havo/Vwo, Leerling/Klas, toetsen, ondertitels uit `words`).
- **Paginatekst** (kop, checkvragen, docentdeel, footer): statische HTML in de pagina; komt uit `_bouw/films.py` en `_bouw/data/afl8_docent.htmlfrag`.

## Zo pas je deze film aan
1. Werk in `films/dna/_bouw/` (kopieer de map naar een werkmap buiten de repo). Haal eerst de audio terug: `python3 haal_audio.py 8 ../8-wat-heb-jij-aan-dna.html`.
2. **Beeld**: pas `src/scenes8.js` aan (zoek de scènenaam uit de tabel Opbouw, bijv. `SCENES.h2a`), daarna `python3 build.py 8` → `out/8-wat-heb-jij-aan-dna.html`. Controleer met `node grab.js <pad>/out/8-wat-heb-jij-aan-dna.standalone.html qa/x 6` en `python3 sheet.py qa/x qa/x.png 7`.
3. **Tekst op de pagina, titel, hoofdstukvragen, eindkaart**: `films.py`. **Docentdeel**: `data/afl8_docent.htmlfrag`. **Begrippen, checkvragen, getallen**: `data/afl8_script.json`.
4. **Een alinea opnieuw inspreken**: stem-invoer uit `data/afl8_stem.json` (respellings volgens de uitspraaklijst), Roos, eleven_v3, één take. Vervang `data/afl8_audio/<id>.mp3` (−16 LUFS, −1 dBTP), zet nieuwe woordtijden (Scribe) en `bounds` in `data/afl8_words.json`, en pas de tekst aan in `data/afl8_script.json`. Andere segmenten blijven ongemoeid.
5. Kopieer `out/8-wat-heb-jij-aan-dna.html` naar `films/dna/`, werk dit bestand en script.md bij (versie, datum, wat er veranderd is) en push.

## Aandachtspunten
- Alle tekst moet boven y = 892 blijven: de speler knipt scènes daar af (ondertitelzone).
- Meta-tekst staat in kapitalen, behalve eenheden (`metaCase` in de bibliotheek): µm, nm, °C blijven correct.
- De pijl → en ≈ zitten niet in de ingebedde lettertypes en vallen terug op het systeemlettertype.
- Basen zijn vier tinten paars en verschillen ook in letter en paarrand (A punt, T inkeping, C nok, G sleuf); RNA is teal (primer in film 2; mRNA en tRNA in film 3), eiwit en aminozuren oker, ribosoom #C9B896.
- **Geen uitspraaktest vooraf** (afspraak Kamiel 13 okt 2026): opgenomen met eleven_v3, één take per alinea, spellingen uit de uitspraaklijst plus nieuwe respellings: bee er cee aa één (BRCA1, zoals pee cee er), snips, nipt, skriening, daunsyndroom, geemokuur (chemo met Nederlandse g), tsjip; getallen voluit (één komma drie, tweeduizend vijfentwintig, eenentwintig/achttien/dertien, type twee). Wachtlijst hieronder voor de verzameltest.
- Uitspraak-wachtlijst (eerste voorkomen per take; tijd = binnen de take; `FILMDATA.segments[<take>]`):

| woord | take | tijd in take |
|---|---|---|
| DNA | n0 | 0:02.1 |
| koriander | n3 | 0:09.8 |
| diabetes | n3 | 0:13.1 |
| genoom | n3 | 0:17.4 |
| SNP's | n3 | 0:21.4 |
| databank | n3 | 0:27.3 |
| Lactose | n3 | 0:34.4 |
| DNA | n3 | 0:37.5 |
| diabetes | q4 | 0:02.1 |
| 1,3 | q4 | 0:03.6 |
| diabetes | n5 | 0:04.9 |
| chip | n5 | 0:20.1 |
| DNA-uitslag | n5 | 0:21.4 |
| databank | n5 | 0:38.5 |
| 2025 | n5 | 0:41.0 |
| jeugdgezondheidszorg | n7 | 0:02.7 |
| verloskundige | n7 | 0:04.4 |
| hielprik | n7 | 0:08.7 |
| NIPT | n7 | 0:35.2 |
| DNA | n7 | 0:38.1 |
| downsyndroom | n7 | 0:50.4 |
| hielprik | q8 | 0:01.1 |
| NIPT | q8 | 0:02.4 |
| screening | n9 | 0:04.6 |
| hielprik | n9 | 0:18.1 |
| NIPT | n9 | 0:22.2 |
| dragerschapstest | n9 | 0:29.1 |
| geneticus | n9 | 0:34.4 |
| recessieve | n9 | 0:37.4 |
| taaislijmziekte | n9 | 0:39.7 |
| allel | n9 | 0:43.5 |
| BRCA1 | n11 | 0:06.2 |
| eierstokken | n11 | 0:39.3 |
| Huntington | n11 | 0:55.3 |
| BRCA1-variant | q12 | 0:01.0 |
| DNA | n13 | 0:06.4 |
| dominant | n13 | 0:15.4 |
| geneticus | n13 | 0:30.6 |
| erfelijkheidsonderzoek | n13 | 0:47.7 |
| DNA-test | n15 | 0:00.6 |
| chemokuur | n15 | 0:09.8 |
| darmkanker | n15 | 0:11.6 |
| enzym | n15 | 0:16.9 |
| chemokuur | q16 | 0:00.6 |
| DNA-test | q16 | 0:02.8 |
| enzym | n17 | 0:06.2 |
| gemodificeerd | n17 | 0:21.6 |
| maïsplant | n17 | 0:24.8 |
| DNA | n20 | 0:02.3 |

- Puzzels: gekozen A (de film zelf als haak: een doosje van internet, een test bij de dokter, een telefoontje van een tante; vier keuzes met steeds dezelfde keuzebalans). Afgevallen: B (één familie door de hele film, van hielprik tot BRCA1: te zwaar en te veel ziekte in één gezin), C (een commerciële DNA-test als enige rode draad: te smal voor hielprik, NIPT en farmacogenetica).
- Geen CE-vragen: de vier voorspelvragen zijn zelf gemaakt; antwoorden zelf uitgewerkt (zie docentdeel).
- Beslislijst (veiligste optie voorlopig gekozen): (1) lengte: spraak ≈ 10 min, langer dan 'kort' in de seriebrief; kandidaten om in te korten h1b (bedrijf/politie, 2 zinnen), h4b (gg-maïs, 3 zinnen), h3a (Huntington-cijfer) — niet geknipt omdat de reviews juist om deze nuances vroegen; (2) '23andMe' niet bij naam genoemd ('dat gebeurde in 2025'); (3) vragengrens WMK als 'tot een paar ton' zonder bedrag (jaarlijks geïndexeerd); (4) DPYD-frequentie 'ongeveer één op de twintig' (bronnen 5–8 %); (5) NIPT-deelname 'iets meer dan de helft' (RIVM 55–60 %); (6) 'Geen vwo-blokken deze keer' in de voice-over gehouden (seriebrief: niveau aangekondigd in de narration), de didactiekreview wilde het naar de titelkaart.
- Vereenvoudigingen: zie docentdeel (hielprik 'behandeling die schade voorkomt of beperkt', NIPT zonder nevenbevindingen, BRCA1 zonder prostaat/mannenborstkanker, Huntington zonder CAG-herhalingen, DPYD zonder de naam van het gen, Bt-maïs zonder EU-etikettering).
- Nieuwe bibliotheekobjecten (scenes8.js): balance (weegschaal met chips, tilt), phone, phoneSmall, kit, card, crowd, tally, pbar, allele, foot, pill, maize, bug; DOC_LOOK (klinisch geneticus); PERSON_LOOK (groen shirt) voor 'jij'.
- Denktijd 12 s bij alle vier de vragen (`think`).

## Wijzigingen
- 1.1 · 13 okt 2026 — Havo/Vwo-schakelaar en de havo-regel in de toetsenuitleg verborgen (`oneLevel` in films.py/build.py), omdat de film geen vwo-blokken heeft (Kamiel: 'als het nutteloos is dan hoeft t niet').
- 1.0 · 13 okt 2026 — eerste versie (reeksmodus). Script nagekeken door een vakinhoudelijke review (klinisch geneticus/ethicus + CE-examinator, 15 punten: o.a. koriander maar deels één gen, diabetes 1,3 × bij een gemiddelde kans van 1 op 3 is geen kleine kans, politie alleen in sommige landen, hielprik dag 3–7 door JGZ/verloskundige en 'schade voorkomt of beperkt', NIPT 21/18/13 en downsyndroom benoemd, beide screening, dragerschapstest via huisarts/klinisch geneticus, borstkanker zonder variant 1 op 7, eierstokken, mannen, Huntington 30–50 jaar en 1 op 5, gerichte test in V3 en dominant, vragengrens verzekeraar, DPYD alleen bij deze kuur, gg-maïs feit/waarde) en een didactiek/taal-review (15 punten: o.a. lettervolgorde C, A, B, C, kortere opties bij V2, V3-afleiders, geen dubbele vraag, 'vinden de meeste mensen' eruit, zus → niet-geteste vader, balans als weegschaal uitgelegd, ondertitels gesplitst, slot 'Het begon in een cel. Het eindigt bij jou.'). Beelden nagekeken op stijlframes (frames8.js, 40 frames) en contactsheet; weegschaalchips vergroot, voet en chromosoomtrio gecorrigeerd, overlappende labels in h3b/h4a/h4b verplaatst.

## Wachtlijst opnieuw inspreken
- **n9 (basis, hoofdstuk 2), 15-10-2026: biologisch argument tegenover ethisch argument benoemd** (aanvulling na vergelijking met Gewoon Uitgelegd). Twee [nieuw]-zinnen tussen "Wat je met dat feit doet, is geen biologie meer." en "Op de balans: zekerheid vooraf, …". Gekozen voor n9 omdat de film daar voor het eerst feit en waarde scheidt; in n17 ("Dat zijn de feiten. Of je zo'n plant wilt, is een waarde.") en de samenvatting n19 sluit de bestaande tekst er vanzelf op aan.
  - Opname: hele take n9 opnieuw (stem-invoer staat in script.md onder n9; nieuwe zinnen invoegen op de aangegeven plek), Roos, eleven_v3, één take. Vervang `data/afl8_audio/n9.mp3` (−16 LUFS, −1 dBTP), nieuwe woordtijden (Scribe) en `bounds` in `data/afl8_words.json`, tekst in `data/afl8_script.json` (scène `h2b`, regel 5 eindigt op "…een feit uit de erfelijkheidsles."; de nieuwe zinnen als eigen regel na de regel met "…geen biologie meer.", latere `li` in `SCENES.h2b` schuiven op) en `data/afl8_stem.json`. Take wordt ca. 10 s langer; alles vanaf 5:41 (hoofdstuk 3) schuift ca. 10 s op, vwo en havo gelijk.
  - **Beeld nodig**: op de bestaande balans in `SCENES.h2b` twee labels: linkerschaal BIOLOGISCH ARGUMENT (feiten, kennis), rechterschaal ETHISCH ARGUMENT (normen en waarden). Eventueel beide als begrip toevoegen in `data/afl8_script.json`.
  - **Risicowoorden (uitspraaktest)**:
    | woord | uitspraak (IPA) | voorstel stem-invoer |
    |---|---|---|
    | ethisch | /ˈeː.tis/ (Wiktionary, Dutch; th als t, -isch als /is/) | ethisch (zoals geschreven); als de TTS "eetiesg" of een Engelse th zegt: "eetis" |
    | biologisch | /bijoːˈloːɣis/ (klemtoon op -lo-; -isch als /is/) | zoals geschreven |

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

`label()` tekent geen lijntje + stip meer naar de naam; de naam staat direct naast het onderdeel (nieuwe functie `naamBij()` uit Celorganellen, met donkere rand rond de letters). De oude aanroepen `label(ctx, naam, meta, ax, ay, lx, ly, …)` werken nog: de richting ax,ay → lx,ly bepaalt aan welke kant de naam komt. Opnieuw geplaatst (eigen `naamBij(...)` of andere richting): 'hielprik', 'BRCA1'. Gecontroleerd op stills van alle scènes met namen.
