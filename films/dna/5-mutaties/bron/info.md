# Mutaties — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/dna/5-mutaties.html (één zelfstandig bestand; audio en lettertypen ingebed) |
| Reeks / nummer | DNA, film 5 van 8 (seriebrief DNA in “Seriebriefs uitlegfilms biologie”) |
| Doelgroep / niveau | havo + vwo; vwo-blokken in hoofdstuk 2 (leesraam, promotor/intron), hoofdstuk 4 (chromosoommutatie; proto-oncogen, tumorsuppressorgen, p53) en de samenvatting (evolutie) (`level:'vwo'`), Havo/Vwo-schakelaar, `?niveau=havo`, `?modus=klas` |
| Versie / datum | 1.2 · 27 oktober 2026 — opwaardering naar prompt v10 (beeld, geknipte vwo-aankondigingen, bronnenlogboek; stem en script ongewijzigd). 1.1 · 16 oktober 2026 — aanvulling toetsonderwerpen: goedaardig/kwaadaardig (n24b) en apoptose + telomeren (n24c), basis. 1.0 · 13 oktober 2026 — eerste versie, Part C (prompt v5); opening = puzzel B (zonnebrand); stem eleven_v3 zonder uitspraaktest vooraf |
| Prompt | v10 |
| Voldoet aan | prompt v10 (27 okt 2026). Bewust niet: geen nieuwe caststijl met contourlijnen (nog niet gekeurd); lever, kip en kuiken blijven eenvoudige Schema-tekeningen (niet nodig voor de uitleg); de schaalbalk '1 nanometer' geldt voor de breedte van de ladder, de afstand tussen basen is vergroot (vereenvoudigd); geen nieuwe opnames, dus 'kapot allel' bij het proto-oncogen blijft in de stem (zie Wachtlijst opnieuw inspreken) |
| Stem / model | Roos (ElevenLabs, voice 7qdUFMklKPaaAVMsBTBt, model eleven_v3); één take per alinea of vraag |
| Duur | gesproken vwo 11:42, havo 9:47 (1.0: 10:25 / 8:31; +1:16 door n24b en n24c); speeltijd in de speler met vragen vwo 12:48, havo 11:01; met Vragen uit vwo 11:23, havo 9:36 |
| Beeldstijl | Part C: Micro (#121A26, sinds 1.2 zonder korrel) voor molecuul en cel, Schema (#1A2740) voor klok, getallen, tabellen, vragen en kaarten, Macro alleen voor de mens in opening en samenvatting (overgang via zoomcirkel). Mensen sinds 1.2 uit het castboek: Noor (jij, zomeroutfit, huid kleurt rood met de zonnebrand via `noorZon()`) en Erik (patiënt in het Wilson-voorbeeld). Vaste UI-laag: ondertitelkast, labels met aanwijslijn, paarse vwo-balk, vraagkaart. Lettertypen Fraunces, Source Sans 3, IBM Plex Mono ingebed |
| Audio-opslag | base64 in `FILMDATA.segments[].audio` (data-URI per segment); woordtijden in `words` |
| Bouwstraat | `films/dna/_bouw/` (gedeeld door de DNA-reeks): `src/` (lib, dnalib, scenes1–5, player, page), `build.py`, `films.py`, `data/` (script, woordtijden, stem-invoer, docentdeel). Zie `_bouw/README.md` |

## Opbouw
Begintijden in de speler (hoofdstukkaart), vwo en havo.

| Begin vwo | Begin havo | Hoofdstuk | Segmenten | Type · look | Kernbeeld |
|---|---|---|---|---|---|
| 0:00 | 0:00 | Opening | n0 | I toepassing · Macro (strand) | Noor met rode huid, het plekje, het getal 75 000 |
| 0:33 | 0:33 | Hoofdstuk 1 — Hoe ontstaat een mutatie? | n3, q4, n5, n6 | A mechanisme · Micro | UV-straal plakt twee T's aan elkaar (koraal klem); herstelenzym; cellen die zichzelf opruimen; polymerase zet een verkeerde base tegenover de schade; dochtercellen |
| 2:45 | 2:45 | Hoofdstuk 2 — Wat doet één andere base? | n8, q9, n10, n11, n12 | G redeneerstappen + B structuur · Schema | substitutie/insertie/deletie op een tegelrij; codontabel met stil, ander aminozuur, stop; EEN KAT EET VIS per drie / leesraamhaken; genlineaal promotor · exon · intron · exon |
| 5:25 | 4:53 | Hoofdstuk 3 — Van één base naar een ziek mens | n14, q15, n16, n17 | G + organisatieniveaus · Schema | DNA → mRNA → codon → aminozuur; histidine- en glutaminecodons; vier kaarten molecuul → cel → orgaan → organisme |
| 7:01 | 6:28 | Hoofdstuk 4 — Erfelijk of niet? | n19, n20, n21, q22, n23, n24, n24b, n24c, n25 | A + I + A · Schema, Macro met zoomcirkel + Schema | niet-scheiden in de meiose; bevruchte eicel → alle cellen; plukje huid; ei → kuiken tegenover kip in de zon; vier zomers; rem kapot → tumor; n24b (`h4k`): twee panelen goedaardig (klomp binnen een groene rand, weefsel opzij geduwd) / kwaadaardig (tumorcellen groeien in het weefsel, één cel via het bloedvat naar een nieuwe plek: uitzaaien), balk 'kwaadaardige tumor = kanker'; n24c (`h4r`): twee rempedalen; cel met DNA-schade krimpt en valt uiteen in blaasjes die worden opgeruimd (apoptose) tegenover een kankercel die doordeelt; staafchromosoom met gouden kapjes (telomeren) en een teller 'delingen' (kapjes korter tot 50, stop); telomerase (enzym) maakt ze weer lang; kankercel: teller loopt door / gaspedaal (proto-oncogen) en rempedaal (tumorsuppressorgen); p53; erfelijke eerste hit |
| 11:36 | 9:51 | Samenvatting — Terug naar het strand | n27, n28, n29 | — · Macro (strand) + Schema | paneel met vijf regels; huidcel en levercel met andere genen aan |

## Voorspelvragen
De vraag wordt ingesproken (eigen take), daarna 8 s denktijd en 2,5 s onthulling; het antwoord wordt in het volgende segment uitgesproken.

| Segment | Niveau | Vraag | Opties (juist vet) |
|---|---|---|---|
| q4 | basis | UV-licht beschadigt het DNA in je huidcellen. Wat doet het precies? | het verandert een T meteen in een andere base · **het plakt twee basen die naast elkaar zitten aan elkaar vast** · het breekt de twee strengen van elkaar los |
| q9 | basis | Door een substitutie wordt het codon G U G in het mRNA G U A. Wat gebeurt er met het eiwit? | het ribosoom stopt bij dit codon · er komt een ander aminozuur op die plek · **niets: het aminozuur blijft valine** |
| q15 | basis | Kan één puntmutatie genoeg zijn voor dit verschil van één aminozuur? | nee, voor een ander aminozuur moeten minstens drie basen veranderen · **ja, één andere base kan een codon voor een ander aminozuur geven** · nee, een puntmutatie verandert het DNA, maar niet het eiwit |
| q22 | basis | Een kuiken wordt geboren met een mutatie in alle cellen van zijn lichaam. Waar is die mutatie ontstaan? | in de huid van het kuiken · **in een geslachtscel van een ouder, of heel vroeg in het embryo** · in het ei, doordat de moederkip veel in de zon zat |

## Begrippen
- mutatie — Verandering in de nucleotidevolgorde van het DNA, bijvoorbeeld een kopieerfout of een beschadiging die blijft staan. Mutaties ontstaan toevallig en zijn de bron van nieuwe allelen (genetische variatie).
- puntmutatie — Verandering in één nucleotidepaar: vervanging door een ander nucleotidepaar (substitutie), of een invoeging (insertie) of verwijdering (deletie) van een nucleotidepaar.
- stille mutatie — Substitutie die het aminozuur niet verandert, doordat het nieuwe codon voor hetzelfde aminozuur staat; vaak een verandering van de derde base.
- mutagene factoren — Straling en stoffen die mutaties vaker laten ontstaan: UV-licht, röntgenstraling, radioactieve straling, stoffen in sigarettenrook, roet en teer.
- DNA-herstel — Enzymen die beschadigd of fout gekopieerd DNA opsporen, het stuk eruit knippen en vervangen, met de andere streng als voorbeeld.
- genoommutatie — Mutatie waarbij het aantal chromosomen in een cel verandert, bijvoorbeeld doordat bij de meiose chromosomen van een paar (of chromatiden) bij elkaar blijven; drie chromosomen 21 bij het syndroom van Down.
- erfelijke mutatie — Mutatie in een zaadcel of eicel, of heel vroeg in het embryo; zit daardoor in alle cellen van het kind en kan worden doorgegeven. Een mutatie in een lichaamscel (huid, lever) is niet erfelijk.
- tumor — Gezwel: een groeiende klomp cellen die blijven delen doordat genen die de celdeling besturen door mutaties zijn veranderd. Een tumor kan goedaardig of kwaadaardig zijn.
- goedaardige tumor — Tumor die op zijn plek blijft: hij groeit wel, maar duwt het weefsel eromheen alleen opzij en zaait niet uit. Een goedaardige tumor is geen kanker.
- kwaadaardige tumor (kanker) — Tumor die het weefsel eromheen ingroeit en kan uitzaaien: losse cellen gaan via het bloed (of de lymfe) naar een andere plek en vormen daar een nieuwe tumor. Een kwaadaardige tumor heet kanker.
- apoptose — Geprogrammeerde celdood: een cel met te veel DNA-schade ruimt zichzelf netjes op; ze valt uiteen in blaasjes die worden opgeruimd. In kankercellen staat deze rem vaak uit.
- telomeren — Beschermende uiteinden (kapjes) van de chromosomen. Bij elke celdeling worden ze korter; zijn ze te kort, dan stopt de cel met delen. Daardoor kan een gewone cel maar een beperkt aantal keren delen.
- telomerase — Enzym dat de telomeren weer langer maakt. Actief in stamcellen en in cellen die geslachtscellen maken; kankercellen zetten het ook aan en blijven daardoor delen.
- leesraam *vwo* — De indeling van het mRNA in codons van drie basen vanaf het startcodon. Een insertie of deletie van één of twee basen verschuift het leesraam (leesraamverschuiving), zodat alle codons erna veranderen.
- chromosoommutatie *vwo* — Verandering in de bouw van een chromosoom: een stuk valt weg, wordt verdubbeld, omgekeerd of komt op een ander chromosoom terecht.
- proto-oncogen *vwo* — Gen dat de celdeling stimuleert. Door een mutatie kan het een oncogen worden dat voortdurend aanstaat; één gemuteerd allel is dan al genoeg.
- tumorsuppressorgen *vwo* — Gen dat de celdeling remt of een beschadigde cel laat opruimen, zoals het gen voor p53. Pas als beide allelen uitvallen, verdwijnt de rem.

## Checkvragen
- (basis) Leg uit waarom zonverbranding de kans op huidkanker vergroot, met de woorden UV, schade, herstel en mutatie. — *UV-licht plakt buurbasen in het DNA van huidcellen aan elkaar (schade). Herstelenzymen repareren het meeste, maar bij veel schade blijft soms een verkeerde base staan (mutatie). Elke verbranding voegt mutaties toe; raken genen die de celdeling besturen, dan kan een cel ongeremd gaan delen.*
- (basis) Een codon G G C wordt door een substitutie G G A. Zoek op wat er met het aminozuur gebeurt. — *G G C en G G A staan allebei voor glycine: een stille mutatie, het eiwit verandert niet.*
- (basis) (naar CvTE havo 2022-II, vraag 32) Door een puntmutatie is op een plaats in een eiwit serine ingebouwd in plaats van leucine. Welk codon kan er oorspronkelijk hebben gestaan: C U A of C U G, C U U of C U C, of U U A of U U G? — *Serine is U C U, U C C, U C A, U C G, A G U of A G C. Eén base verschil met een leucinecodon: U U A → U C A of U U G → U C G (tweede base U → C). Dus U U A of U U G.*
- (basis) (naar CvTE havo 2024-II, vraag 45) Een erfelijke mutatie in het NF2-gen: het eiwit dat normaal de celdeling remt, werkt niet. Juist of onjuist: 1 de mutatie zit alleen in zenuwcellen; 2 door de mutatie wordt de celdeling geremd. — *Beide onjuist. De mutatie is erfelijk, zat dus al in de bevruchte eicel en zit in alle cellen. Het rem-eiwit werkt niet, dus de celdeling wordt juist niet geremd; daardoor groeit een tumor.*
- (basis) (naar CvTE havo 2019-II, vraag 31) Een kind met het syndroom van Down heeft drie chromosomen 21. Juist of onjuist: 1 het syndroom is het gevolg van een genoommutatie; 2 het extra chromosoom kan van de vader komen; 3 de drie chromosomen 21 zijn identiek. — *1 juist (het aantal chromosomen is veranderd); 2 juist (niet-scheiden kan ook bij de vorming van een zaadcel); 3 onjuist (minstens één van de drie komt van de andere ouder en draagt andere allelen).*
- (basis) Waarom is een mutatie in een huidcel niet erfelijk, en een mutatie in een eicel wel? — *Een kind krijgt zijn DNA alleen uit de zaadcel en de eicel. Een mutatie in een huidcel komt alleen in de dochtercellen van die huidcel terecht; een mutatie in een eicel zit na de bevruchting in alle cellen van het kind.*
- (basis) Wat is het verschil tussen een goedaardige en een kwaadaardige tumor? Welke van de twee noem je kanker? — *Een goedaardige tumor blijft op zijn plek: hij groeit wel, maar duwt het weefsel eromheen alleen opzij. Een kwaadaardige tumor groeit het weefsel eromheen in en kan uitzaaien (losse cellen gaan via het bloed naar een andere plek en vormen daar een nieuwe tumor). Alleen een kwaadaardige tumor heet kanker.*
- (basis) Een gewone huidcel kan maar een beperkt aantal keren delen, een kankercel blijft delen. Leg dit uit met de woorden telomeren en telomerase. Noem ook de andere rem uit de film die bij kanker vaak uitstaat. — *Bij elke deling worden de telomeren (beschermende uiteinden van de chromosomen) korter; zijn ze te kort, dan stopt de cel met delen. Kankercellen zetten het enzym telomerase aan, dat de telomeren weer langer maakt, dus ze blijven delen. De andere rem is apoptose: een cel met te veel DNA-schade ruimt zichzelf op; in kankercellen staat die rem vaak uit.*
- (vwo) Een deletie van vier basenparen in een exon. Wat gebeurt er met het eiwit, en waarom? — *Vier is geen drievoud: het leesraam verschuift. Alle codons na de deletie veranderen, meestal volgt snel een stopcodon; het eiwit krijgt een andere aminozuurvolgorde en wordt meestal korter.*
- (vwo) Waarom is één gemuteerd allel van een proto-oncogen genoeg voor ongeremde deling, maar bij een tumorsuppressorgen niet? — *Een gemuteerd proto-oncogen (oncogen) geeft een eiwit dat de deling voortdurend aanzet; dat werkt al naast het normale allel. Een tumorsuppressorgen remt; één werkend allel levert nog genoeg rem, dus beide allelen moeten uitvallen.*
- (vwo) Het mutante NF2-allel erft autosomaal dominant over, terwijl NF2 een tumorsuppressorgen is waarvan beide allelen moeten uitvallen. Leg uit hoe dat samengaat. — *Wie het mutante allel erft, heeft in elke cel al één kapot allel. In een van de vele cellen valt vroeg of laat door een nieuwe (somatische) mutatie ook het tweede allel uit; die cel gaat ongeremd delen. Op organismeniveau is één geërfd allel dus genoeg voor de aanleg: dominant.*

## Getallen
| Getal | In de film | Bron |
|---|---|---|
| Nieuwe huidkankerpatiënten per jaar in NL | bijna 75 000 | IKNL, Huidkanker in Nederland: trends en inzichten 2025 (incl. basaalcelcarcinoom) |
| Aandeel per soort | ≈ 70 % basaalcel, 20 % plaveiselcel, 10 % melanoom | IKNL, cijfers huidkanker |
| Foutkans na herstel | ≈ 1 op 10⁹ | Alberts; zoals in aflevering 2 |
| UV-schade | pyrimidinedimeren (vooral T–T); de typische UV-mutatie is C → T | Alberts, Molecular Biology of the Cell |
| Syndroom van Down | drie chromosomen 21 | BvJ havo thema 9; CvTE havo 2019-II |
| Delingen tot de telomeren te kort zijn | teller tot 50 (beeld, niet gesproken) | Hayflick-limiet ≈ 40–60 delingen bij menselijke cellen in kweek |

## Techniek: waar zit wat in de HTML
Regelnummers in 5-mutaties.html (de base64-audio staat binnen FILMDATA op één regel, dus `filmbron.py uitpakken` verandert de regels niet).
- **FILMDATA** (segmenten, woordtijden, regelgrenzen `bounds`, audio, filmtitel/eindkaart/hoofdstukvragen): regel 148. Speech-segment: `id`, `kind:'speech'`, `level`, `chapter`, `scene`, `audio`, `dur` (take + 0,6 s), `bounds` (regelgrenzen in s), `words` (`t,s,e`). Vraag: `q`, `options`, `correct` (0-based), `audio`, `adur`.
- **Part C-bibliotheek** (`C`-tokens, labels, zoomcirkel, cel, kern; `grain()` bestaat nog maar wordt niet meer aangeroepen): regel 149; **DNA-bibliotheek** (basen met paarrand, ruggengraat, ladder, helix, nucleotide, enzym, oude `personReal` (niet meer gebruikt), klok): regel ± 340.
- **Castboek** (`personages/lib_cast.js`, kopie van 27 okt 2026): eigen `<script>` vanaf regel 568.
- **Scènes**: regel 1381 (`noorZon`, `eiwitKeten` bovenin; `SCENES.h4k` regel 1583, `SCENES.h4r` regel 1615); één functie per scènenaam (`SCENES.h2a=(ctx,li,lf,t,q)`), `li` = regelnummer binnen het segment, `lf` = 0..1 binnen die regel (uit `bounds`). Beeldwissels hangen dus aan de gesproken regels.
- **Begrippen**: `const GLOSSARY` regel 1647. **Speler**: regel 1648 (tijdlijn, vraagfasen ask → countdown → wait/reveal, Havo/Vwo, Leerling/Klas, toetsen, ondertitels uit `words`).
- **Paginatekst** (kop, checkvragen, docentdeel, footer): statische HTML in de pagina; komt uit `_bouw/films.py` en `_bouw/data/afl5_docent.htmlfrag`.

## Zo pas je deze film aan
0. **Sinds 1.2 (27 okt 2026)** is de gepubliceerde film direct bewerkt (scèneblok, castboek, FILMDATA); `_bouw/src/scenes5.js` loopt dus achter. Pas een scène aan in het scèneblok van de HTML zelf, op dezelfde regelnummers (`li`); de scripts van de opwaardering staan in `bron/opwaardering-v10/` (`scenes_edits.py` = alle vervangingen oud → nieuw), de film van vóór 1.2 in `bron/oud/5-mutaties-v1.1.html`.
1. Werk in `films/dna/_bouw/` (kopieer de map naar een werkmap buiten de repo). Haal eerst de audio terug: `python3 haal_audio.py 5 ../5-mutaties.html`.
   **Let op (16 okt 2026):** de gepubliceerde film heeft latere aanpassingen die niet in `_bouw/src/lib.js`, `player.js` en `page.tpl` staan (naamBij zonder wijslijnen, Vragen uit, afspeelsnelheid, teller, licentie). `build.py 5` alleen zou die terugdraaien. Bouw daarom met `build.py 5` en zet het resultaat in de gepubliceerde film met `python3 afl5/aanvulling_16okt/patch5.py ../5-mutaties.html <oude bouw zonder jouw wijziging>` (vervangt FILMDATA, GLOSSARY en het scèneblok, en past de paginatekst aan via het verschil oude → nieuwe bouw) → `out/5-mutaties.patched.html`. `src/scenes5.js` is gelijk aan het scèneblok van de gepubliceerde film.
2. **Beeld**: pas `src/scenes5.js` aan (zoek de scènenaam uit de tabel Opbouw, bijv. `SCENES.h2a`), daarna `python3 build.py 5` → `out/5-mutaties.html`. Controleer met `node grab.js <pad>/out/5-mutaties.standalone.html qa/x 6` en `python3 sheet.py qa/x qa/x.png 7`.
3. **Tekst op de pagina, titel, hoofdstukvragen, eindkaart**: `films.py`. **Docentdeel**: `data/afl5_docent.htmlfrag`. **Begrippen, checkvragen, getallen**: `data/afl5_script.json`.
4. **Een alinea opnieuw inspreken**: stem-invoer uit `data/afl5_stem.json` (respellings volgens de uitspraaklijst), Roos, eleven_v3, één take. Vervang `data/afl5_audio/<id>.mp3` (−16 LUFS, −1 dBTP), zet nieuwe woordtijden (Scribe) en `bounds` in `data/afl5_words.json`, en pas de tekst aan in `data/afl5_script.json`. Andere segmenten blijven ongemoeid.
5. Kopieer `out/5-mutaties.html` naar `films/dna/`, werk dit bestand en script.md bij (versie, datum, wat er veranderd is) en push.

## Aandachtspunten
- Alle tekst moet boven y = 892 blijven: de speler knipt scènes daar af (ondertitelzone).
- Meta-tekst staat in kapitalen, behalve eenheden (`metaCase` in de bibliotheek): µm, nm, °C blijven correct.
- De pijl → en ≈ zitten niet in de ingebedde lettertypes en vallen terug op het systeemlettertype.
- Basen zijn vier tinten paars en verschillen ook in letter en paarrand (A punt, T inkeping, C nok, G sleuf); RNA is teal (primer in film 2; mRNA en tRNA in film 3), eiwit en aminozuren oker, ribosoom #C9B896.
- **Geen uitspraaktest vooraf** (afspraak Kamiel 13 okt 2026): opgenomen met eleven_v3 en de spellingen uit de uitspraaklijst; nieuwe woorden staan op de wachtlijst hieronder voor een latere verzameltest over meerdere films. Ronde 1 van de test (18 zinnen, `uitspraaktest_afl5_ronde1.mp3`) is wel gemaakt maar niet beoordeeld.
- Uitspraak-wachtlijst (tijd = binnen de take; `FILMDATA.segments[<take>]`). Nieuw 16 okt (n24b, n24c), stem-invoer zoals geschreven; verwacht: apoptose /ɑpɔpˈtoːzə/ (klemtoon op -to-), telomeren /teːloːˈmeːrə(n)/ (klemtoon op -me-), telomerase /teːloːmeːˈraːzə/ (klemtoon op -ra-), goedaardig/kwaadaardig met klemtoon op -aar-. Fout bij de verzameltest? Probeer 'apop-toze', 'telo-meeren', 'telome-raaze'.

| woord | take | tijd in take |
|---|---|---|
| vijfenzeventigduizend | n0 | 0:17.3 |
| DNA | n0 | 0:24.1 |
| DNA | n3 | 0:20.4 |
| UV | n3 | 0:26.1 |
| UV-licht | q4 | 0:00.0 |
| DNA | q4 | 0:01.9 |
| UV-licht | n5 | 0:01.2 |
| T's | n5 | 0:10.0 |
| DNA | n5 | 0:32.4 |
| UV | n6 | 0:00.5 |
| Röntgenstraling | n6 | 0:01.9 |
| radioactieve | n6 | 0:03.3 |
| DNA | n6 | 0:05.3 |
| mutagene | n6 | 0:17.8 |
| substitutie | n8 | 0:10.4 |
| insertie | n8 | 0:13.9 |
| deletie | n8 | 0:17.0 |
| DNA | n8 | 0:19.7 |
| mRNA | n8 | 0:22.4 |
| substitutie | q9 | 0:00.3 |
| mRNA | q9 | 0:04.6 |
| valine | n10 | 0:03.4 |
| glutaminezuur | n10 | 0:17.3 |
| tryptofaan | n10 | 0:27.8 |
| mRNA | n11 | 0:19.7 |
| deletie | n11 | 0:21.3 |
| leesraam | n12 | 0:09.7 |
| leesraamverschuiving | n12 | 0:14.0 |
| promotor | n12 | 0:20.1 |
| mRNA | n12 | 0:21.9 |
| intron | n12 | 0:24.2 |
| glutamine | n14 | 0:15.0 |
| histidine | n14 | 0:16.3 |
| DNA | n16 | 0:02.4 |
| mRNA | n16 | 0:04.6 |
| Histidine | n16 | 0:11.1 |
| glutamine | n16 | 0:24.5 |
| meiose | n19 | 0:02.7 |
| Down | n19 | 0:11.5 |
| 21 | n19 | 0:13.5 |
| genoommutatie | n19 | 0:15.4 |
| chromosoommutatie | n20 | 0:12.3 |
| tumor | n24 | 0:26.8 |
| proto-oncogenen | n25 | 0:05.4 |
| tumorsuppressorgenen | n25 | 0:18.3 |
| tumorsuppressorgen | n25 | 0:25.2 |
| p53 | n25 | 0:27.3 |
| UV | n27 | 0:01.4 |
| DNA | n29 | 0:02.0 |
| goedaardige | n24b | 0:02.5 |
| kwaadaardige | n24b | 0:09.6 |
| uitzaaien | n24b | 0:19.9 |
| DNA-schade (deeënaa-schade) | n24c | 0:08.2 |
| apoptose | n24c | 0:15.4 |
| geprogrammeerde | n24c | 0:16.6 |
| telomeren | n24c | 0:25.0 |
| telomerase | n24c | 0:42.1 |
| telomeren | n24c | 0:44.1 |
| telomerase | n24c | 0:46.8 |

- CE-vragen geparafraseerd (havo 2019-II v2, 2025-II v5; op de pagina 2024-II v45, 2022-II v32, 2019-II v31); antwoorden zelf uitgewerkt, correctievoorschriften niet ingezien.
- UV-schade is vereenvoudigd tot 'basen aan elkaar, meestal twee T's' en 'soms een verkeerde base'; vervellen tot 'cellen die zichzelf opruimen' (zie docentdeel).
- Lengte: spraak vwo ≈ 11:42, havo ≈ 9:47 (na de aanvulling van 16 okt); langer dan afl. 4. Kandidaten om in te korten: h3c (vier niveaus) en het p53-blok (h4v).
- Nieuwe bibliotheekobjecten 16 okt (scenes5.js): tissueCells, tumCell/tumorBall (TUMC), blebCell, blaasjes, rodChromo.
- Nieuwe bibliotheekobjecten (scenes5.js): beachBg, sun, uvRay, dimerMark, chromo, cellS, liver, chick, egg, hen, geneBar, pedal. Gedeelde helpers (codonTable, tileRow, bracket, aaBead, macroBg, CODE) zijn op 13 okt van scenes4.js naar dnalib.js verhuisd.
- Denktijd 12 s bij V2 en V3 (`think`).

## Wijzigingen
- 1.2 · 27 okt 2026 — opwaardering prompt v5 → v10 (B14). Stem, script, vragen en timing ongewijzigd, op de vwo-aankondigingen na. Oude versie: `bron/oud/5-mutaties-v1.1.html`. Per scène:
  - **audio n12, n20, n25, n28 (vwo)**: 'Voor vwo gaan we hier nog een stap verder.' (n12, n25), 'Voor vwo:' (n20) en 'Voor vwo,' (n28) uit de mp3 geknipt op de echte stilte (energie-omhullende; fade-in 12 ms), woordtijden, `bounds` (eerste regel van n12/n25 nu lengte 0) en `dur` mee geschoven; eerste woord met hoofdletter ('Tussen', 'Tot'). Log: `bron/opwaardering-v10/knip_log.json`. Totale duur verandert niet (de speler knipte deze zinnen al).
  - **open**: Noor (castboek, zomeroutfit) in plaats van het poppetje, huid kleurt rood met de zonnebrand; plekje op haar onderarm; getallenpaneel niet meer over de zon; slotvraag in een eigen paneel (liep tot de rand).
  - **h1a, h1b**: geen korrel; schaalbalk '1 nanometer' (eenheid voluit).
  - **h2b**: tekst naast de codontabel 60 px van de rand.
  - **h2c**: afdekvlak bij 'drie weg' dekkend (oude rijen schemerden erdoor).
  - **h2v, h4v1, h4v, recapv (vwo)**: titel 'Voor vwo …' vervangen door de inhoud ('Leesraam, promotor en intron', 'Chromosoommutatie', 'Gaspedaal en rem: twee soorten genen', 'Mutaties en evolutie').
  - **h3a, h3c**: eiwit als gevouwen keten met de afwijkende kraal (glutamine) in koraal, naam ernaast; patiënt op organismeniveau = Erik (figurant) in plaats van het poppetje.
  - **h4a**: namen naast de cellen in plaats van over de celranden; bij 'drie chromosomen 21' staan er meteen twee, het derde (koraal) komt erbij.
  - **h4b**: Noor (huid nog wat rood), geen korrel in de zoomcirkel.
  - **h4c**: naam 'huidcellen' boven de kip, zon naar links.
  - **h4v**: pedalen staan er vanaf het begin (gedimd); 'één gemuteerd allel is genoeg' (was 'kapot', zie bronnen.md); ring om de cel waar het tweede allel uitvalt, naam onder het raster.
  - **h4r**: telomerase iets verder van het telomeerkapje.
  - **recap**: Noor in plaats van het poppetje.
  - **recapv**: chromosomen staan er gedimd vanaf t = 0.
  - Bronnenlogboek `bron/bronnen.md` (22 beweringen: 12 ✓, 8 ≈, 2 ?). Controles: spelerfix, antwoordtekst, kortantwoord, antwoordletter OK; Vragen uit vwo en havo zonder JS-fouten; contactbladen vwo, havo en lichte stand bekeken.
- 1.1 · 16 okt 2026 — aanvulling toetsonderwerpen (basis, havo + vwo), twee nieuwe segmenten na n24, bestaande takes ongemoeid: **n24b** (23,9 s, scène `h4k`) goedaardige tegenover kwaadaardige tumor, uitzaaien, 'alleen een kwaadaardige tumor heet kanker'; **n24c** (51,5 s, scène `h4r`) een cel heeft meer dan één rem: apoptose (geprogrammeerde celdood; bij kanker vaak uit) en telomeren (korter per deling, beperkt aantal delingen; telomerase in stamcellen en cellen die geslachtscellen maken; kankercellen zetten het aan). Roos, eleven_v3, één take per segment (1090 credits). Vijf nieuwe begrippen, twee checkvragen (nu 7 en 8; vwo-checkvragen 9–11), docentdeel aangevuld. Duur op de site 10 → 12 min. Beeld nagekeken op stills (vwo, havo, Vragen aan/uit zonder JS-fouten).
- 1.0 · 13 okt 2026 — eerste versie. Script nagekeken door een vakinhoudelijke review (15 punten, o.a. stille mutatie in de Wilson-vraag, variatie voor havo, leesraamdefinitie, asbest eruit) en een didactiek/taal-review (15 punten, o.a. afleiders V1/V2/V4, NF2-vraag naar de pagina, genoommutatie naar hoofdstuk 4). Beelden nagekeken op contactsheets vwo en havo.

## Wachtlijst opnieuw inspreken
- **Voorstel 27-10-2026 (n25, vwo)**: 'Eén kapot allel is dan genoeg.' → 'Eén gemuteerd allel is dan genoeg.' Een proto-oncogen wordt door de mutatie niet kapot maar overactief (oncogen, gain of function); 'kapot' past bij het tumorsuppressorgen. Bronnen: Pierce, Genetics Essentials hfst. 16; Cooper, The Cell (zie bronnen.md B7, B8). Beeld is al aangepast. Alleen opnieuw inspreken als Kamiel dat wil (kleine nuance).
- **Afgehandeld 16-10-2026**: de klaargezette zin over goedaardig/kwaadaardig is niet in n24 ingevoegd maar als eigen segment **n24b** ingesproken (n24 blijft de goedgekeurde opname), uitgebreid tot een leerbaar begrip; het gevraagde beeld (twee panelen, uitzaaien via een bloedvat) staat in `SCENES.h4k`. De oorspronkelijke notitie hieronder blijft ter informatie.
- ~~**n24 (basis, hoofdstuk 4), 15-10-2026: goedaardig/kwaadaardig toegevoegd**~~ (aanvulling na vergelijking met Gewoon Uitgelegd). Eén [nieuw]-zin tussen "Zo ontstaat een klomp cellen: een tumor." en "Daarvoor zijn meerdere mutaties nodig, in dezelfde cel.": een tumor is pas kanker als hij kwaadaardig is (weefsel ingroeien, uitzaaien); een goedaardige blijft op zijn plek.
  - Opname: hele take n24 opnieuw, Roos, eleven_v3, één take; n24 had geen respellings, de stem-invoer is gelijk aan de tekst in script.md met de nieuwe zin op de aangegeven plek. Vervang `data/afl5_audio/n24.mp3` (−16 LUFS, −1 dBTP), nieuwe woordtijden (Scribe) en `bounds` in `data/afl5_words.json`, tekst in `data/afl5_script.json` (scène `h4d`, regel 3 eindigt op "…een tumor.": nieuwe zin als eigen regel erna, zodat de regelnummers `li` van de latere beeldwissels in `SCENES.h4d` één opschuiven) en `data/afl5_stem.json`. Take wordt ca. 8 s langer; vwo en havo schuiven vanaf 8:46 / 7:58 ca. 8 s op.
  - **Beeld nodig**: in `SCENES.h4d` naast de klomp cellen twee kleine panelen: GOEDAARDIG (klomp met een rand, blijft op zijn plek) en KWAADAARDIG = KANKER (cellen groeien door de rand het weefsel in, één cel in een bloedvat: UITZAAIEN).
  - **Risicowoorden (uitspraaktest)**: geen echte risicowoorden; kwaadaardig /kʋaːtˈaːrdəx/ en goedaardig /ɣutˈaːrdəx/ (klemtoon op -aar-, gewone Nederlandse woorden) en uitzaaien zoals geschreven. Alleen bij de verzameltest even luisteren of de klemtoon op "-aar-" valt; zo niet: "kwaad-aardig".

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

`label()` tekent geen lijntje + stip meer naar de naam; de naam staat direct naast het onderdeel (nieuwe functie `naamBij()` uit Celorganellen, met donkere rand rond de letters). De oude aanroepen `label(ctx, naam, meta, ax, ay, lx, ly, …)` werken nog: de richting ax,ay → lx,ly bepaalt aan welke kant de naam komt. Opnieuw geplaatst (eigen `naamBij(...)` of andere richting): 'rood en warm', 'een plekje', 'één fout die blijft staan', 'hooguit 1 fout per miljard', 'UV', 'twee T’s aan elkaar', 'herstelenzym', 'verkeerde base', 'in een intron', 'huidcellen'. Gecontroleerd op stills van alle scènes met namen.
