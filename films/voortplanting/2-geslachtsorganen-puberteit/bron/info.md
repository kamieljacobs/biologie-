# Geslachtsorganen en puberteit — bronmap

Versie 2.0 is een lichte remake (prompt v10 B16) in de FILMDATA-straat, 26 okt 2026. De oude versie 1.1 (prompt v8, 22 okt 2026) staat in `oud/` (`2-geslachtsorganen-puberteit-v1.html`, `info-v1.md`, `script-v1.md`, audio in `oud/audio-v1/`, scènes in `oud/src-v1/`). Fase 1 (script, storyboard, keyframes, twijfelscènes, eerste bronnenlogboek) staat in `remake-2026-10/`.

| Veld | Waarde |
|---|---|
| Bestand | films/voortplanting/2-geslachtsorganen-puberteit.html (audio in `2-geslachtsorganen-puberteit/audio/`) |
| Reeks | Voortplanting (hoofdstuk `voortplanting`), film 2; sluit aan op Celdeling (meiose) |
| Niveau | havo + vwo; vwo-blok s12–s14 (kisspeptine, leptine en vetreserve, eerste menstruatie steeds vroeger) |
| Versie / datum | **2.2 · 29 oktober 2026** — open punten uitgevoerd (`films/UITVOEREN-VOORTPLANTING.md`): hormoonkleuren als Les 2, prostaat in orgaankleur, castnamen uit de stem (s01 opnieuw ingesproken, s11/s32 geknipt); oude versie in `bron/oud/2-geslachtsorganen-puberteit-v2.1.html` (+ `info-v2.1.md`, audio `oud/audio-v2.1/`). 2.1 · 29 oktober 2026 — opwaardering naar prompt v13 (B14, zonder keuring), oude versie `oud/2-geslachtsorganen-puberteit-v2.0.html`. 2.0 · 26 oktober 2026 (lichte remake) · eerder 1.1 · 22 okt 2026, 1.0 · 16 okt 2026 |
| Prompt | v13 |
| Voldoet aan | prompt v13 (29 okt 2026, zonder keuring). Sinds 2.2 geen castnamen meer in stem, ondertitel of beeld (B4). Bewust niet: geen nieuwe caststijl met contourlijnen |
| Stem / model | Roos (`7qdUFMklKPaaAVMsBTBt`), ElevenLabs eleven_v4, één take per alinea (28 takes), flow `2gVdRpBnFclUy5DZxMY2`; stem-invoer via `films/uitspraak.json` + `uitspraak_film.json` (GnRH → G-N-R-H); 'meiose' zoals geschreven (gelijk aan Celdeling) |
| Duur | spraak 7:42 (vwo) / 6:48 (havo); met titel, hoofdstukkaarten en vragen ± 9 min; `duur: 9` in HOOFDSTUKKEN |
| Beeldstijl | Part C: Macro-vlak (klas), Schema, Micro in zoomcirkels; organen op schaal (mannelijke organen 1 cm = 14 px × s) |
| Personages | castboek-personages sam (zijaanzicht), daan, noor, alleen in beeld en zonder naam; gezichten blijven heel: organen alleen in zoomcirkels náást het lichaam (BEELDAFSPRAKEN 25 okt 2026) |
| Audio-opslag | 28 losse mp3's (`../audio/sNN.mp3`), woordtijden `stem/woordtijden/` (silalign, lokaal) |
| Herkomst | lichte remake (B16), keuring twijfelscènes 25 okt 2026 (`films/verbeterbladen/remake-2026-10/besluiten.md`): t1, t3, t4, t5, t7, t8 voorstel; t2 gezichten heel, organen in een zoomcirkel naast het lichaam; t6 alternatief (remzin 'Veel oestrogeen remt de hypofyse weer.' voor havo en vwo) |
| ElevenLabs-verbruik | TTS ± 7 065 credits (28 takes), Scribe ± 419 credits (blinde check s05, s07, s08, s15); 2.2: s01 opnieuw 283 credits (flow `SZ5dFfE9QdEKnKW74sAP`), s11/s32 geknipt (0) |

## Wijzigingen 2.2 (29 okt 2026): open punten uitgevoerd

Keuzes van de hoofdsessie (`films/UITVOEREN-VOORTPLANTING.md`, keuze 1–3 en Inspreken). Datum in index.html blijft (opwaardering).
- **Hormoonkleuren gelijk met Les 2** (`tools/docent/voortplanting-2`, `HK()`): FSH groen, LH goud, oestrogeen koraal, testosteron teal, GnRH licht paars `#B3A6DA`. In `teken_g2.js` staat `HKLEUR`; die overschrijft `HORM`/`HORM_A` van de bibliotheek alleen in deze film (deeltjes, namen, bloedbanen). GnRH-cellen en stotengrafiek (s06, s12, s13) in GnRH-kleur; kisspeptinecel s12 eigen roze `#D98AB0` (geen paars meer, paars = GnRH-familie); leptine (s13) oker. Labels in kleur: s29 'FSH en LH' als FSH groen + LH goud, s31 'testosteron en oestrogeen' als teal + koraal, remlijn s29 koraal (oestrogeen). Kleur is nooit de enige drager: elke hormoonnaam staat bij de eerste keer als woord in beeld. Receptorringen s08 neutraal (wit) in plaats van groen, zodat ze niet als FSH lezen.
- **Prostaat in orgaankleur** `PROSTAAT = '#B9786A'` (warm roze-bruin, klierweefsel, zoals de organen in `lib_anatomie.js`) in `manDoorsnede` (ook in `bibliotheek/lib_bio.js`, dus voor alle films die het object opnieuw ophalen), het maatglas s22 en de regel 'prostaat: kwart tot een derde'.
- **Vader/moeder** (keuze 3): komt in deze film niet voor; niets veranderd.
- **s01 opnieuw ingesproken** (eleven_v4, Roos, 1 take, 283 credits, generation `YVFGlF2FTPahi9ZRinza`): 'Twee jongens zitten in dezelfde klas … Nu is de één een kop groter … De ander is bijna niet gegroeid. Is er iets mis met hem? …'. loudnorm naar −16,5 LUFS zoals de oude take; woordtijden met silalign (6 van 8 leestekens aan een stilte gekoppeld); cues ('Vorig', 'Nu', 'kop', 'stem', 'gegroeid', 'mis', 'Nee', 'startsein') ongewijzigd geldig (cuecheck).
- **s11 geknipt** (0 credits): 'Daan groeit gewoon later.' weg bij 17,05 s (stilte −70 dB, fade 0,1 s). De chip 'gewoon later' en het startlampje komen nu op 'laat beginnen ook'.
- **s32 geknipt** (0 credits): 'En Daan? Die krijgt zijn startsein gewoon wat later.' weg bij 11,55 s (stilte). De slotscène in de klas is weg; s32 blijft op de twee panelen (zaadcel, eicellen).
- Docentdeel: 'Sam en Daan' en 'Daan groeit later' zonder namen. Footer en versie 2.2.
- Getest: alle cues (cuecheck), contactvel van s01, s06–s09, s11–s13, s22, s29, s31, s32 bekeken; site-HTML laadt zonder JS-fouten met `?vragen=uit` (havo en vwo) en `?vragen=aan`; vragen zelf ongewijzigd (q03, q21, q27). spelerfix, antwoordtekst, kortantwoord, antwoordletter (met --check), flipkaarten, licentie_noot, teller gedraaid.

## Wijzigingen 2.1 (29 okt 2026): opwaardering naar prompt v13 (zonder keuring)

Alleen beeld; stem, script, vragen, timings, speler en datum ongewijzigd. Site-HTML bijgewerkt door alleen het scèneblok en FILMDATA te vervangen (speler en nabewerkingen bleven staan). Bibliotheek: de eigen kopieën in `teken_g2.js` deel 2 (hormDeeltje, hypofysePoort, manDoorsnede, penisDoorsnede, vulvaSchema, schaalStreep) zijn weg; de film gebruikt nu de gekeurde versies uit `bibliotheek/lib_bio.js` (verbeterronde 1–3) via het uittreksel `src/lib_bio_deel.js` (`bouw/bio_deel.py`, zie `bouw.sh`). Contactvel van de gewijzigde scènes bekeken; alle 93 contactstills in vwo zonder JS-fouten; vragen afgespeeld met `?vragen=uit` (havo en vwo).

- s06, s07, s29, s31: hypofysePoort uit de beeldbank (variant A): hypothalamus met thalamus en derde hersenkamer, Turks zadel als bot onder de hypofyse.
- s07, s08, s13, s29 en alle scènes met hormoondeeltjes: hormDeeltje variant C (GnRH als kralenketen, FSH/LH als α+β-kralenketens, steroïden als ringstructuur) in plaats van de oude vormpjes.
- s08, s26, s28, s29, s32: eierstokDoorsnede variant B (follikels in rijping, geel lichaam) in plaats van het vlak met stipjes.
- s08, s15: zaadbalWeefsel en zaadcelEcht in de gekeurde versie (acrosoom op ± 60 % van de kop; ovale, gedraaide profielen).
- s13 (vwo): vetweefsel met het haarvat langs de celgrenzen (was dwars over de vetcellen).
- s09, s12, s31: kleine verschillen door de gekeurde zenuwcel en hormoonvormen.
- titel: puzzelvraag zonder castnamen ('Twee jongens uit dezelfde klas …'); s11 chip 'gewoon later' en s32 label 'startsein komt gewoon wat later' zonder 'Daan:' (B4: geen castnamen in beeld). Footer: geen personagenamen meer.
- Lijsten voor Kamiel: `bron/opwaardering-v13.md`.

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01–s02, q03 | klas met meetlat: Sam een kop groter, Daan niet; startlampjes |
| H1 Het startsein | s05–s11 (+ vwo s12–s14) | Sam van opzij, hersenen in een zoomcirkel naast het hoofd (hypothalamus, gehemelte); hypofyse met GnRH-cellen en bloedvaatjes in het steeltje, GnRH-stoten synchroon met een stotengrafiek (eerst 's nachts); voorkwab maakt FSH en LH, erwt op dezelfde vergroting; FSH/LH door het lichaam (schema tussen Sam en Noor), spiercel zonder receptoren, zoomcirkels naar zaadbal en eierstok; zaadbalweefsel met testosteron, eierstok met follikel en oestrogeen; kenmerken; groeicurven (piek meisjes ± 11, jongens ± 13) en startbalken. vwo: kisspeptinecel → GnRH-cel, slagboom 'toestemming' van leptine, grafiek eerste menstruatie |
| H2 Van zaadbal tot penis | s15–s20, q21, s22 | mediane doorsnede op schaal; zaadbuisjes in een zoomcirkel, meiose 1 → 4 cellen; zaadcel volgt de echte route (bijbal, lieskanaal, boog naar de achterkant van de blaas), wand knijpt hem vooruit; kringspier; zwellichamen als dwarsdoorsnede (rust → vol bloed); maatglas sperma (zaadblaasjes ruim de helft, prostaat kwart tot een derde, zaadcellen een paar procent) |
| H3 Eierstok en baarmoeder | s23–s26, q27, s28–s30 | Noor met het bekken in een zoomcirkel ernaast (bibliotheek `vrouwOrganenVoor`); buitenkant als vlak schema in een paneel; telvlak 300 000 eicellen met 400 in goud; keten hypofyse → eierstok → baarmoederwand met remlijn; menstruatie (functionele laag laat los) |
| Recap | s31–s32 | startsein met het gevolgde LH-deeltje, kenmerken, route zaadcel, eicellen (slot in de klas sinds 2.2 weg) |
| Eindkaart | s33 | drie regels |

## Vragen (juiste antwoorden c, b, a)
- q03: Wie geeft het startsein? a zaadballen of eierstokken zelf · b de hypofyse · **c de hypothalamus**
- q21: Waar komt het meeste vocht van sperma vandaan? a zaadballen · **b zaadblaasjes** · c prostaat
- q27: Eicellen bij het begin van de puberteit? **a al honderdduizenden, geen nieuwe** · b elke maand één nieuwe · c elke maand duizenden nieuwe

Vragen uit: de alinea's na een vraag beginnen niet meer met 'Antwoord cee/bee/aa' en staan op zichzelf; s02, s20 en s26 eindigen op 'Wat denk je?' (knip door de speler). In s20 is het maatglas leeg, zodat het beeld het antwoord niet verraadt.

## Begrippen
puberteit, hypothalamus, hypofyse, GnRH, FSH en LH, receptor (nieuw), testosteron, oestrogeen, primaire en secundaire geslachtskenmerken, zaadbal, bijbal, zaadleider, zaadblaasjes, prostaat, urinebuis, zwellichamen, eierstok, eileider, baarmoeder, baarmoederhals, menstruatie; vwo: kisspeptine, leptine (`film.py`, `glossary`).

## Docentdeel
`sections.html`: checkvragen, hoe de film het uitlegt, vereenvoudigingen met bronnen; bijgewerkt naar 2.0 (route zaadleider, zaadblaasjes ± 60 %, poortaders, receptoren, remzin, LH in de slaap, groeispurt vs. begin). `oefenen.json` idem bijgewerkt (zaadleider, 'ruim de helft'). Bronnenlogboek: `bronnen.md` (43 beweringen, 34 ✓, 9 ≈).

## Waar wat in de HTML zit (films/voortplanting/2-geslachtsorganen-puberteit.html, versie 2.0)
- r. ± 4761 `hypofysePoort`, 4827 `manDoorsnede`, 4888 `penisDoorsnede`, 4911 `vulvaSchema` (nieuw, ronde 2, kandidaat voor `bibliotheek/lib_bio.js`), daarboven `hormDeeltje` (`HORM`: vaste vorm en kleur per hormoon) en de hulpjes uit 1.x (`tag`, `startlamp`, `meetlat`, `vrouwSchema`, `cyclusKlok`, `slijmDikte`).
- daarna `Object.assign(SCENES, …)`: één functie per alinea (s01 … s32) met de hulpjes `zoomNaast`, `hersenenRond`, `bloedbaan`, `stotenGrafiek`, `maatglas`, `meioseMini`.
- r. ± 5249 `const DATA = window.FILMDATA` (segmenten, woordtijden, vragen); speler daarna.

## Hoe je de film aanpast
Werkmap buiten de repo (bv. `/home/claude/werk/geslacht/film`), met uit deze bronmap `segments.json`, `film.py`, `sections.html`, `uitspraak_film.json`, `script_v2.md`, `src/teken_g2.js`, `src/scenes_g2.js`, audio als `audio/` en woordtijden als `words/`; engine (`../eng`) = `src/` (lib*.js, player.js, page.html, fonts.css, scenes_kop.js) + `bouw/`. Bouwen: `bouw.sh` (scenes.js = scenes_kop + lib_bio + teken_g2 + scenes_g2; dan `film.py`, `build_data.py`, `build.py`), cues controleren met `bouw/cuecheck.py <map> scenes_g2.js`, stills met `bouw/stills.py <map> qa contact`. Daarna het themaregeltje in de HTML zetten (zie `bouw.sh` van Chromosomen / `pak.py`) en in de repo `spelerfix`, `antwoordtekst`, `kortantwoord`, `flipkaarten`, `teller`, `licentie_noot` draaien.
- Tekst wijzigen = alleen die alinea opnieuw inspreken (één take, stem-invoer uit `segments.json` na `make_segments.py <map> script_v2.md`), woordtijden met `silalign.py <map> sNN`.
- Gedeelde tekeningen wijzig je in `bibliotheek/lib_bio.js`, niet hier.

## Aandachtspunten
- **Frisse beeldreview (C10.7)**: gestart door de coördinator met een reviewbrief (stills van het contactblad in de werkmap); verslag in `review_fris_2026-10-26.md`. Eigen controle op het contactblad (93 stills): labels in de ondertitelzone, het maatglas dat in s20 het antwoord verried, bloedbanen over de kleding (s08) en de mannelijke doorsnede buiten het recap-paneel (s32) zijn hersteld. 
- **Herstel na de frisse review (26 okt 2026)**: alle 13 MOET-punten hersteld (eindkaart in vier regels; mannelijke doorsnede lager en kleiner (`manDoorsnede(…, 270, 2.5)`); urineleider in eigen tint met uitsparing onder de zaadleider en label bij 'boog'; gevolgde zaadcel op orgaanschaal als ring zonder staart (`zaadVolg`); label zaadbal s22; 'receptoren' bij de ringen s08; zwarte vlek s12 (`_mixHex`); vet en leptine krimpen bij 'weinig' s13; s23 organen op schaal 1,9 binnen de zoomcirkel, eicel de trechter in; s29 remlijn op de voorkwab, eileider met trechter (`eileiderStuk`), cyclusklok uit de ondertitelzone; s31/s32 gevuld op t = 0). Goedkope KAN-punten overgenomen: 2 (s23 zoomcirkel al op 35 %), 10 (schaalstreep eierstok weg), 12 (teller direct 100 000 000), 14 (labels s19), 15 (s22 naar rechts), 16 (chips van de cirkelrand), 17 (labels vulva), 19 (kruis niet over tekst), 24 (eindkaart). Niet overgenomen (voorstel voor een volgende ronde): 1 (lengteverschil Sam/Daan), 3 en 4 (gloed en aantal kleuren in `manDoorsnede`), 5, 6 (secundaire kenmerken tonen, castvarianten eerst keuren), 7, 8, 9 (spiercel als vezel), 11, 13, 18 (stipjesvlak), 20, 21, 22 (tekstgrootte), 23 (hormoonkleuren reeksbreed afstemmen met Les 2), 25, 26. Vragen uit opnieuw afgespeeld rond q03, q21 en q27 (5 s ervoor tot 5 s erna): niets van vraag of antwoord blijft over. MOET-punten staan in `films/logboek/fouten.jsonl`.
- De nieuwe tekeningen (hypofysePoort, manDoorsnede, penisDoorsnede, vulvaSchema, hormDeeltje, schaalStreep) staan in `src/teken_g2.js` deel 2 en zijn (alleen toegevoegd) in `bibliotheek/lib_bio.js` gezet, met een regel in `bibliotheek/README.md` en een knop 'Geslachtsorganen 2.0' op `bibliotheek/testvel.html` (`#geslacht`); status: wacht op Kamiels keuring.
- Uitspraakwachtlijst: `remake-2026-10/uitspraak.md` (gehemelte, steeltje, meiose, chromosomen); blind gecontroleerd en goed: hypothalamus, GnRH, erwt, receptoren, oestrogeen, meiose, chromosomen.
