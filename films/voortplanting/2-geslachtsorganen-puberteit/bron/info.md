# Geslachtsorganen en puberteit — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/voortplanting/2-geslachtsorganen-puberteit.html (audio in films/voortplanting/2-geslachtsorganen-puberteit/audio/) |
| Reeks | Voortplanting (hoofdstuk `voortplanting`: havo Biologie voor jou thema Voortplanting, vwo Nectar 4.1 H4), film 2 |
| Niveau | havo + vwo; vwo-blok s08 (kisspeptine, leptine en vetreserve, steeds vroegere eerste menstruatie) |
| Versie / datum | 1.1 · 22 oktober 2026 (opgewaardeerd naar prompt v8, zie onderaan) · eerder: 1.0 · 16 oktober 2026 |
| Stem / model | Roos (ElevenLabs eleven_v4, voice 7qdUFMklKPaaAVMsBTBt), één take per alinea, flow xBPaTfyxwVr4gXlo8CtV; respellings GnRH → G-N-R-H, kisspeptine → kisspeptinuh, leptine → leptinuh (`uitspraak_film.json`), plus de globale lijst (hypothalamus → hiepo-taalamus, oestrogeen → eustrogeen, receptor → reseptor); zie `uitspraak.md` |
| Duur | spraak 6:58 (vwo) / 6:10 (havo); speeltijd met kaarten en vragen 8:03 (vwo) / 7:15 (havo); Vragen uit 7:06 / 6:18 |
| Voldoet aan | prompt uitlegfilms v8 (22 okt 2026); bewust anders: zie 'Opwaardering naar prompt v8' |
| Beeldstijl | Part C: Schema; cold open in de klas (`klasAchtergrond`) |
| Personages | Sam, Daan en Noor (castboek) |
| Audio-opslag | 15 losse mp3's in audio/ (s01, s04–s11, s13–s15, s17–s19) |
| Herkomst | Hoofdengine, werkmap `hw/vp2`; gebouwd met Claude in reeksmodus (geplande film 'Geslachtsorganen en puberteit') |
| ElevenLabs-verbruik | 6 370 credits TTS (15 takes), Scribe 0 credits |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Klas met meetlat: Sam en Daan vorig jaar even groot, nu Sam een kop groter met lage stem; startlampen (Sam groen, Daan rood). q02 (antwoord in H1) |
| H1 Het startsein | s04–s08 | Hoofd in profiel met hypothalamus; zaadballen/eierstokken 'al vanaf je geboorte', kindertijd bijna stil; GnRH-stoten tegen de leeftijd (start tussen 8 en 14); keten hypothalamus → GnRH → hypofyse → FSH + LH via het bloed → zaadballen/eierstokken → testosteron/oestrogeen, zaadcellen/eicellen; Sam en Noor met primaire/secundaire kenmerken (jongens, meisjes, iedereen); groeisnelheidcurven (piek meisjes ± 12, jongens ± 14) en startbalken 8–13 / 9–14 met Sam en Daan. Vwo: kisspeptinecel → GnRH-cel, receptor kapot, vetweefsel → leptine, grafiek eerste menstruatie 1850 (± 16) → nu (± 13) |
| H2 Van zaadbal tot penis | s09–s13, q12 | Schematische doorsnede (zijaanzicht): balzak koeler (thermometer), ± 100 miljoen zaadcellen per dag; zaadcel volgt de route zaadbal → bijbal → zaadleider (langs/over de blaas) → zaadblaasje → prostaat → urinebuis → penis, met lijstje rechts; kringspier; zwellichamen vullen met bloed. q12 met a/b/c-badges op zaadbal, zaadblaasje en prostaat; staaf sperma (zaadcellen een paar %, zaadblaasjes ± 2/3, prostaat ± 1/4–1/3); misvatting 'zaadcellen uit de prostaat' doorgestreept |
| H3 Eierstok en baarmoeder | s14–s18, q16 | Vooraanzicht: eierstokken, eileiders met trechter, baarmoeder, slijmvlies, baarmoederhals, vagina; eicel van eierstok naar trechter; los schema buitenkant (schaamlippen, clitoris, urinebuisopening, vagina). Noor bij q16; vergrote eierstok met ± 300 000 eicellen, 'nieuw erbij: 0', groepje rijpt, één eisprong, ± 400; man: steeds nieuwe zaadcellen. Cyclusklok (4 weken) met dikte van het slijmvlies; menstruatie = slijmvlies met wat bloed, niet de eicel; verwijzing naar film 1 |
| Recap | s19 | Vier panelen: startsein, kenmerken, zaadcel (route + vocht), eicellen; 'Daan: startsein komt gewoon wat later' |
| Eindkaart | s20 | drie regels |

## Vragen (juiste antwoorden c, b, a)
- q02: Wie geeft het startsein? a de zaadballen of de eierstokken zelf · b de hypofyse · **c de hypothalamus**
- q12: Waar komt het meeste vocht van sperma vandaan? a zaadballen · **b zaadblaasjes** · c prostaat
- q16: Eicellen bij het begin van de puberteit? **a al honderdduizenden, geen nieuwe** · b elke maand één nieuwe · c elke maand duizenden nieuwe

## Begrippen
puberteit, hypothalamus, hypofyse, GnRH, FSH en LH, testosteron, oestrogeen, primaire en secundaire geslachtskenmerken, zaadbal, bijbal, zaadleider, zaadblaasjes, prostaat, urinebuis, zwellichamen, eierstok, eileider, baarmoeder, baarmoederhals, menstruatie, kisspeptine (vwo), leptine (vwo) — zie `film.json` → glossary.

## Docentdeel
In `sections.html`: 5 checkvragen (startsein, geslachtskenmerken, route zaadcel met vasectomie, eicelvoorraad, vwo: leptine bij turnsters), hoe de film het uitlegt, achtergrond en vereenvoudigingen met getallen en bronnen (Groeistudie TNO 2009, Wyshak & Frisch 1982, de Roux e.a. 2003, Seminara e.a. 2003; samenstelling sperma, zaadcelvorming, eicelvoorraad), leerdoelen, misvattingen, lessuggesties.

## Waar wat in de HTML zit (films/voortplanting/2-geslachtsorganen-puberteit.html)
- regel 5: `js/teller.js` (kijkcijfers)
- regel 70: sitebalk (← Terug naar Voortplanting)
- regel 101: checkvragen; regel 118: docentdeel (uit `sections.html`)
- regel 153: footer (met licentievermelding)
- regel 154: `window.FILMDATA` (segmenten, woordtijden, vragen)
- regel 1108: `grafiek()`, regel 1144: `klasAchtergrond()` (lib_hormonen)
- regel 1267: `persoon()` uit lib_cast.js (Sam, Daan, Noor)
- regel 1460: `hoofdProfiel()`; 1470 `startlamp()`; 1475 `zaadcel()` en `eicel()`
- regel 1487: `VAS`, `URETHRA`, `ZAADROUTE` (route van de zaadcel, indexen in een commentaarregel)
- regel 1491: `manSchema()` (doorsnede man, `hl` = oplichten per orgaan, `zw` = zwellichamen, `kring` = kringspier); 1530 `manNamen()` (plek van elke naam)
- regel 1540: `vrouwSchema()` (vooraanzicht, `dik` = dikte slijmvlies, `eisprong` 0..1); 1574 `vrouwNamen()`; 1579 `buitenSchema()`
- regel 1588: `eierstokGroot()`; 1600 `cyclusKlok()` en `slijmDikte()`
- regel 1614: `const SCENES` (title 1615, s01 1618, s04 1635, s05 1648, s06 1664, s07 1677, s08 1694, s09 1716, s10 1723, s11 1738, s13 1745, s14 1760, s15 1773, s17 1776, s18 1785, s19 1805)
- regel 1817 e.v.: speler

## Hoe je de film aanpast
Werkmap opzetten: kopieer `bron/` naar `hw/vp2` (scenes.js uit `src/`, `words/` = `stem/woordtijden/`, `film/2-geslachtsorganen-puberteit/audio/` = `../audio/`), engine = `src/*.js` + `bouw/*`. Dan:
- tekst: `script_v2.md` aanpassen → `python3 engine/make_segments.py vp2 script_v2.md` (met `uitspraak_film.json` in de werkmap) → alleen gewijzigde alinea's opnieuw inspreken (Roos, eleven_v4, één take; start Scribe pas als de TTS klaar is, `connect_from` = de TTS-node) → `engine/align.py` → `python3 film.py` → `engine/build_data.py vp2` → `engine/build.py vp2` → `bash pack.sh vp2 2-geslachtsorganen-puberteit voortplanting`.
- beeld: alleen `scenes.js` → `engine/build.py vp2` → pack. Controleer cues met `python3 cuecheck.py vp2` (let op deelwoorden: in s10 staat de route-overgang op 'tegelijk' omdat 'Urine' ook 'urinebuis' vindt; in s18 is 'menstruatie' het 2e voorkomen).
- namen bij organen: alleen de coördinaten in `manNamen()` / `vrouwNamen()` (ontwerpcoördinaten van de tekening).

## Aandachtspunten
- Uitspraakwachtlijst (`uitspraak.md`): GnRH (G-N-R-H), kisspeptinuh, leptinuh, clitoris, prostaat, FSH/LH, hypofyse, 'het jaar 1850'.
- Anatomie schematisch en niet op schaal; de route van de zaadleider is vereenvoudigd (in werkelijkheid via het lieskanaal, over de urineleider).
- Okselhaar/schaamhaar komen deels door bijnierandrogenen; in de film vereenvoudigd tot testosteron en oestrogeen (staat in het docentdeel).
- `index.html` (HOOFDSTUKKEN, FILMKUNST, duur) wordt door de hoofdagent bijgewerkt; daarna `python3 scripts/teller.py` voor `data-duur`.
- Overlap met film 1 (Van bevruchting tot baby) bewust klein: geen terugkoppeling, geen hormoongrafiek van de cyclus.

## Wijzigingen
- 1.0 (16 okt 2026): eerste versie. Script na één eigen review (zie `reviews/review_v1.md`). ElevenLabs-quotum raakte tijdens het inspreken op; s04–s13, s15–s19 later in nieuwe nodes ingesproken (zelfde flow, geen herhaalde takes).


## Wijziging 19–20 okt 2026: alinea's opnieuw ingesproken na de uitspraaktest

Kamiel koos in de uitspraaktest (18–19 okt, 4 rondes) hoe de risicowoorden moeten klinken. Alleen de alinea's met die woorden zijn opnieuw ingesproken; de gesproken tekst is inhoudelijk gelijk gebleven.

| Woord | Nieuwe stem-invoer | Alinea's | Status |
|---|---|---|---|
| kisspeptine | kisspeptine (gewone spelling) | s08 | goedgekeurd (uitspraaktest 18–19 okt 2026) |
| leptine | leptine (gewone spelling) | s08 | goedgekeurd (uitspraaktest 18–19 okt 2026) |

- Opnieuw ingesproken: s08. Roos (7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea, ElevenLabs-flow `urmsa8zcNa5TFq8SVeBI` ("Herinspreken 19 okt · voeding, hormonen, voortplanting"). Stem-invoer = `voice` in `segments.json` (gemaakt met `make_segments.py` en de bijgewerkte vervangregels in `bouw/uitspraak_subs.json` en `uitspraak_film.json`).
- Woordtijden: Scribe (connect_from = de TTS-node) → `align.py` → `stem/woordtijden/`. Mastering: `loudnorm=I=-15:TP=-1.5`, mono 44,1 kHz 96 kb/s.
- Credits: TTS 722, Scribe ≈ 258 (≈ 47 s audio).
- In de HTML (`window.FILMDATA`) zijn alleen bij deze segmenten `words` en `dur` vervangen en heeft de audio-URL `?v=2` gekregen; speler en beelden zijn ongewijzigd. Getest met Playwright (vwo/havo, Vragen aan/uit): geen JS-fouten, nieuwe audio laadt.
- Niet aangepast: woorden die niet in de test zaten houden hun vorige stem-invoer, zodat ze in de hele film hetzelfde klinken (bijv. "receptor" zoals geschreven, terwijl de centrale lijst "reseptor" geeft).

| Segment | TTS-node | Generatie | Credits | Duur |
|---|---|---|---|---|
| s08 | TupaMZNQNreOD2nA0fui | niQnzEF0vn68CeuoNktF | 722 | 47.33 s |

## Opwaardering naar prompt v8 (1.1 · 22 okt 2026)

Werkwijze B14 (opwaarderen naar een nieuwe promptversie): Kamiel keurde per scène een verbeterblad goed (claude.ai-artifact 'Verbeterblad prompt v8', alle 7 voorstellen 'Doen'); alleen die scènes zijn veranderd. Stem, script, vragen en cuewoorden zijn gelijk gebleven; er is niets opnieuw ingesproken.

Gedeelde tekenbibliotheek: `bron/src/lib_bio.js` is een kopie van `bibliotheek/lib_bio.js` (recepten volgens prompt v8, C9). `bouw/build.py` plakt hem na lib_cast.js in de pagina; in de live HTML staat hij tussen de lib_bio-kop en `/* einde lib_bio */`.

| Scène | Was | Nu |
|---|---|---|
| s04, s05 (klein) | grijs hoofdsilhouet met ovaal als hersenen | `hoofdHersenen`: hoofd in doorsnede met grote en kleine hersenen, hersenbalk, thalamus, hersenstam; hypothalamus en hypofyse aan het steeltje in het Turkse zadel (via `hoofdProfiel`, zelfde aanroep) |
| s05 | stippellijnen tussen tekstvakken | GnRH en FSH/LH als deeltjes die door bloedvaten stromen (`bloedvat` met rode bloedcellen); schema met namen blijft |
| s06 | lijst van twaalf pillen | namen direct bij het lichaamsdeel van Sam en Noor (merkje + `naamBij`), 'iedereen' in het midden, groeispurt laat beiden 4 % groeien |
| s08 (vwo) | sterretjes en raster van rondjes | `zenuwcel` (vertakte dendrieten, één axon met synapsknopjes) en `vetweefsel` (Voronoi-vetcellen met vetdruppel, kern tegen de rand, haarvat) |
| s05, s09–s11, s19 | stipje met kort staartje | `zaadcelEcht` via `zaadcel`: kop met acrosoom, staart ± 10× de kop, golf van kop naar staart; in s09 een zwerm |
| s09–s13, s19 (doorsnede man) | – | schaambeen vóór de blaas en endeldarm erachter, voor oriëntatie (nagelopen tegen Gray's mediaan sagittaal; route zaadleider blijft vereenvoudigd) |
| s17, s19 | ovaal vol gele puntjes | `eierstokDoorsnede` via `eierstokGroot`: schors met follikels, merg met vaten, rijpend groepje, Graafse follikel, eisprong waarbij de wand scheurt |
| s18 | vlakgrafiek van de dikte | `baarmoederwand`: uitsnede met spierlaag, basale en functionele laag, klieren die gaan kronkelen, spiraalslagaders; bij de menstruatie laat de functionele laag in stukjes los |
| overal | eicel als geel rondje | `eicelEcht` via `eicel`: doorzichtige laag (zona) en stralenkrans bij grotere eicellen |

Ook: 'ongeveer 4 weken' staat niet meer over 'dag 1' van de cyclusklok (s18).
Bewust niet: geen nieuwe audio; de route van de zaadleider over de blaas blijft vereenvoudigd (staat al in het docentdeel).

- 22 okt 2026 (avond): in s06 de rondjes bij de lichaamsdelen weggehaald (Kamiel: "die rondjes hoeven niet"); de namen staan nog naast het lichaam (`merk()` in s06 doet niets meer).
