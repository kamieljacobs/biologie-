# Post voor iedereen — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/hormonen/1-post-voor-iedereen.html (audio in films/hormonen/1-post-voor-iedereen/audio/) |
| Reeks / nummer | Hormonen, film 1 van 5 (seriebrief in de Claude-doc *Seriebriefs uitlegfilms biologie*) |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blokken gelabeld: s09 (endocrien/exocrien, hypothalamus als schakel), s15–s18 met vraag q17 (membraanreceptor en signaaltransductie tegenover steroïdhormoon). Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | **1.2 · 29 oktober 2026** — keuzes Kamiel (Regeling): s15 en s20 opnieuw ingesproken, kleuren gelijkgetrokken; oude versie in `bron/oud/1-post-voor-iedereen-v1.1.html`. 1.1 · 28 oktober 2026 — opwaardering naar prompt v13 (B14, zonder keuring): alleen beeld, stem en script ongewijzigd; oude versie in `bron/oud/1-post-voor-iedereen-v1.0.html`. 1.0 · 14 oktober 2026 (zelfstandig gebouwd in reeksmodus) |
| Prompt | v13 |
| Voldoet aan | prompt v13 (28 okt 2026, zonder keuring). Bewust niet: geen nieuwe opnames (de vragen hieronder en in `opwaardering-v13.md`); de doelcellen in s12 houden hun eigen receptor-'schoteltjes' (een kralenketenreceptor op 170 px per cel is een nieuwe tekening, voorgesteld voor de bibliotheek); de stoel en het klaslokaal in s01 blijven zoals ze waren; geen nieuwe caststijl met contourlijnen (nog niet goedgekeurd) |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow MMVz2cMbifnhMLPuXMzr; nodes en sessies in `stem/takes.json`) |
| Duur | spraak 7:51 (vwo) / 6:00 (havo). Speeltijd met kaarten en vragen: vwo ≈ 9½ min, havo ≈ 7½ min |
| Beeldstijl | Part C: Macro (klaslokaal, cold open), Schema (navy #1A2740: lichaamskaart met klieren, bloedbaan, tabellen, bak met kraan, grafiek), Micro (#121A26: doelcellen, membraan, kern); UI-laag vast; canvas 1920×1080. Seriekleuren in `lib_hormonen.js` (`HK`, `HKIND`, `hkleur()`; sinds 1.2 volgens de kleurentabel van de Regeling, 29 okt 2026): elk hormoon één vaste kleur én een eigen vorm — adrenaline koraal druppel, insuline paars afgerond vierkant, glucagon groen ruit, cortisol oker ring, thyroxine paars ster, ADH paars driehoek, hormoon in het algemeen paars; zenuwsignaal teal; glucose oker; klieren oker; bloed #B5574A; receptor #AFC0D0; actieve enzymen, gen aan en cAMP goud |
| Audio-opslag | 19 losse mp3's in audio/ (s01 … s23), loudnorm −15 LUFS, piek −1,5 dBTP, mono 44,1 kHz 96 kb/s; niet in de HTML ingebed |
| Lettertypen | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 — ingebed als base64 |
| Herkomst | gebouwd op 14 oktober 2026 met de bouwstraat van de voedingsreeks (`bouw/`), aangevuld met de seriebibliotheek `lib_hormonen.js` (nieuw; bevat ook `personReal` uit de DNA-bouwstraat). Sinds 1.1 ook `lib_cast.js`, `lib_anatomie.js` (personages/) en `lib_bio.js` (bibliotheek/, stand 28 okt 2026) in `src/`, geplakt na lib_hormonen.js (`bouw/build.py`) |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script met leerdoelen, misconcepties, getallen met bronnen en wat de reviews veranderden. Lege regel = nieuwe alinea = nieuwe take. `script_v1.md` = vóór de reviews |
| `script.md` | Tekst per take met duur en audiobestand |
| `segments.json` | Uitvoer van `make_segments.py`: per alinea `display` (ondertitel), `voice` (stem-invoer met respellings) en `vmap` |
| `film.py` → `film.json` | Titel, vraagteksten met juist antwoord, begrippen, checkvragen en docentdeel (HTML) |
| `checkpoint.html` | Zelfcheck: contactsheets uit de speler, wat de reviews veranderden, script |
| `uitspraak.md` | Risicowoorden met stem-invoer; wachtlijst voor Kamiel |
| `stem/woordtijden/sNN.json` | Woordtijden per take (Scribe, op de ondertitelwoorden) |
| `stem/takes.json`, `stem/gen.json` | ElevenLabs-flow, node en sessie per take; generatie-id en duur |
| `src/` | `scenes.js` (deze film), `lib.js`, `lib_voeding.js`, `lib_hormonen.js` (seriebibliotheek), `player.js`, `page.html`, `fonts.css` |
| `bouw/` | `make_segments.py`, `align.py`, `build_data.py`, `build.py` (leest `lib_voeding.js` + `lib_hormonen.js`), `stills.py`, `fake_words.py`, `uitspraak_subs.json` |
| `reviews/` | Expert (endocrinoloog), didactiek + taal, curriculum (havo/vwo-CE), eindreview (fresh eyes, na de bouw) |

**Werkmap opzetten:** maak `f1/` met `script_v2.md`, `film.py`, `scenes.js` (uit `src/`), `words/` (= `stem/woordtijden/`) en `film/1-post-voor-iedereen/audio/` (= `../audio/`); zet `src/*.js` (behalve scenes.js), `src/page.html`, `src/fonts.css` en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py f1 script_v2.md && (cd f1 && python3 film.py) && python3 engine/build_data.py f1 && python3 engine/build.py f1` → `f1/film/1-post-voor-iedereen.html`.

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open (s01, q02) | D · Macro | Klaslokaal; achter de leerling valt een stoel om; schrik; hartslagmeter 72 → 128 en blijft hoog; vraag q02 |
| Titel | Schema | Lichaamskaart met bijnieren, bloedlus met adrenalinedruppels |
| H1 Twee manieren (s04–s09) | B · Schema | Zenuw als vaste lijn hersenen → hand (puls, tot 100 m/s); bloedlus met druppels die zich in ≈ 1 minuut verspreiden; brief met één adres tegenover folder bij zeven huisjes; tabel snelheid/duur/bereik; voorbeelden (pan, groeien, maan/glucose/water); speekselklier met buis tegenover hormoonklier aan een bloedvat; lichaamskaart: hypothalamus, hypofyse, schildklier, bijnieren, alvleesklier (zoom: klierblaasjes met buis + eilandje van Langerhans aan een bloedvat), eierstokken/zaadballen. Vwo s09: endocrien/exocrien, hypothalamus met zenuwsignaal erin en hormoon eruit |
| H2 Wie leest de post? (s10–s18) | B · Schema + Micro | Zenuwsignaal naar de bijnier; zoom op schors en merg; adrenaline in de bloedlus; vraag q11; drie cellen in Micro (twee met receptoren lichten op, één niet); vier panelen hart / lever / vaten spieren / vaten darm en huid; koude teen; klaar voor inspanning. Vwo: membraan met receptor en cascade 1 → 3 → 9 enzymen; cortisol door het membraan, receptor in de cel, kern met gen aan, nieuwe eiwitten, klok; schildklierhormoon (vraag q17); samenvattende tabel |
| H3 Hoe lang duurt een bericht? (s19–s22) | D · Schema | Bak met kraan (klier) en afvoer (afbraak); peil = concentratie; knal: kraan open, peil omhoog, kraan dicht, peil zakt langzaam; grafiek extra adrenaline 100 → 50 → 25 → 12 (model, halfwaardetijd 2 min); vooruitblik Suiker in balans |
| Recap (s23) | Schema | Route knal → zenuw → bijniermerg → bloed → hart, lever, vaten; hartslag zakt met de grafiek; antwoord b |
| Eindkaart | Schema | Drie kernzinnen |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Waarom stopt het hartbonzen niet meteen na de knal? | b er zit nog een stof in je bloed die je hart aanzet (onthulling in H3 en recap) |
| q11 | basis | Welke cellen reageren op de adrenaline? | c alleen cellen die adrenaline kunnen herkennen |
| q17 | vwo | Schildklierhormoon: waar zit de receptor? | a in de cel, en het zet genen aan of uit |

De antwoordopties worden niet ingesproken; ze staan alleen op het scherm (uit het script, `[VRAAG]`). Ze zijn dus zonder nieuwe opname aan te passen. De onthulling ("Antwoord c", "Antwoord a", "antwoord b") staat wél in de audio van s12, s18 en s23.

Checkvragen (statisch in de pagina): 1 Afvoerbuis en hormoonklier · 2 Zelfde hormoon, ander effect · 3 Halfwaardetijd · 4 Transcriptieremmer (vwo).

Begrippen: hormoon, hormoonklier, receptor, doelcel/doelorgaan, bijniermerg, adrenaline, hypothalamus, hypofyse, eilandjes van Langerhans, concentratie; vwo: endocriene/exocriene klier, signaaltransductie, steroïdhormoon.

## Waar wat in de HTML zit (regelnummers in `1-post-voor-iedereen.html`, versie 1.1)

| Regel | Inhoud |
|---|---|
| 7–65 | Fonts (base64) en CSS |
| 74 | Sitebalk `<nav class="sitenav">` met "← Terug naar Regeling" |
| 151 | `window.FILMDATA` — segmenten, woordtijden, vragen, titelkaart |
| 152–380 | `lib.js`: Part C-tokens, `bg` (sinds 1.1 zonder korrel), `naamBij`, `zoomCircle` |
| 381–953 | `lib_voeding.js` |
| 954–1227 | `lib_hormonen.js`: `HK`, `HKIND`/`hkleur` (1013), `hormoonVorm`, `receptor`, `doelcel` (met `celTextuur`), `klierKaart` (1087; sinds 1.1 lib_anatomie-lichaam), `KP`, `bloedLus`, `kopZoom`, `kaartSpieren`, grafiek, bakKraan … |
| 1225–2037 | `lib_cast.js` (castboek, `persoon` 1498) |
| 2038–2311 | `lib_anatomie.js` (`anFigure`, `anKidney`, `anMuscles`, `pancreas`) |
| 2312–10752 | `lib_bio.js` (beeldbank: `hoofdHersenen` 2357, `nierBijnier`, `membraanBoog`, `membraanReceptor`, `enzymKluwen`) |
| 10756–11093 | `scenes.js` (stand 1.2): hulpstukken (o.a. `legenda` 10768, `membraanKrom`, `memY`, `enzymBol`, `kernMetGen`) en `SCENES` (10847; s15 11000, s16 11026, s20 11059) |
| 11073–11259 | `GLOSSARY` en speler |

Stand na een bouw kan een paar regels verschuiven; zoek op de functienaam. Sinds 1.1 is de site-HTML bijgewerkt door alleen de drie scriptblokken (lib, seriebibliotheken, scènes) te vervangen, zodat de latere spelerpatches (spelerfix, antwoordtekst enz.) bleven staan.

## Hoe je de film aanpast

- **Tekst van een alinea:** wijzig `script_v2.md`, draai `make_segments.py`, neem alleen die take opnieuw op (stem-invoer staat in `segments.json` → `voice`), haal woordtijden op met Scribe en `align.py`, zet de mp3 genormaliseerd in `audio/` en bouw opnieuw.
- **Een antwoordoptie of vraagtekst:** opties in `script_v2.md` bij `[VRAAG]`, vraagtekst en uitleg in `film.py`; geen nieuwe opname nodig (behalve als het juiste antwoord verschuift: dat noemt de audio).
- **Een beeld:** `scenes.js` (zie regelnummers hierboven); cues hangen aan woorden via `q.on('woord', n)`.
- **Checkvragen of docentdeel:** `film.py` → `python3 film.py` → `build.py`.

## Aandachtspunten

- 14 oktober 2026 (later die dag): opnieuw gebouwd met de uitgebreide seriebibliotheek van film 2, zonder nieuwe opnames: insuline heeft nu een eigen vorm (afgerond vierkant) en glycogeen is een teal keten van glucose, zoals in de rest van de reeks.

- Uitspraak: zie `uitspraak.md`. Een blinde controle (losse transcriptie van de echte takes) was in deze sessie niet mogelijk; de risicowoorden staan op de wachtlijst voor Kamiel.
- De grafiek toont de extra adrenaline boven het rustniveau; de narratie "pas na een minuut of tien is bijna alles weg" slaat daarop.
- Eindreview: 14 punten; verwerkt: grafieklabel, opties q02 en q17, klaslokaal (stoel achter de leerling, leerling zit achter een schoolbank), hypofyse niet meer in het gezicht, bijnieren lichten op, merg in oker, koude teen, labels, rustpeil, begrip hypothalamus. Niet verwerkt: de eindkaart gebruikt de vaste speler-opmaak (geen seriekleuren); timing van enkele tags is een fractie later dan het woord.

- 15 okt 2026: vwo-segment opnieuw ingesproken zonder 'Voor vwo' (Roos, eleven_v4, één take, flow wSVfswmRwrmJKmHQ57hW); audio-URL met ?v=2. Overige 'Voor vwo'-aankondigingen worden door de speler weggeknipt (vwoCuts).

## Wachtlijst opnieuw inspreken (s15 is op 29 okt 2026 ingesproken, zie Wijzigingen 1.2)

Aanvulling 15-10-2026 na de vergelijking met Gewoon Uitgelegd (tekst staat als [nieuw] in `script.md`; zet hem bij het opnemen ook in `script_v2.md`).

- **H2 Wie leest de post? · s15** (vwo): eerste boodschapper (het hormoon komt de cel niet in), G-eiwit, tweede boodschapper cAMP, vóór de bestaande enzymcascade. Take s15 opnieuw (≈ +12 s), Roos, eleven_v4, één take; Scribe + `align.py`; mp3 genormaliseerd in `audio/` (audio-URL met een nieuwe `?v=`). De cues `kettingreactie`, `signaaltransductie`, `seconden`, `voorbij` en `loslaat` hangen aan woorden en schuiven vanzelf mee. Voeg "tweede boodschapper (cAMP)" toe aan de vwo-begrippen in `film.py`; checkvraag 4 en het docentdeel zo nodig aanvullen.
- **Beeld nodig**: in de membraanscène van s15 (Micro): het hormoon blijft buiten met label "eerste boodschapper"; aan de binnenkant van het membraan een G-eiwit naast de receptor dat oplicht, dan een enzym aan het membraan dat kleine cAMP-deeltjes afgeeft (label "tweede boodschapper: cAMP"); die cAMP-deeltjes zetten het eerste enzym van de bestaande cascade 1 → 3 → 9 aan.
- **Risicowoorden (uitspraaktest)**:
  - **cAMP** (cyclisch AMP): in het Nederlands als letters, /seː.aː.ɛmˈpeː/ (cee-aa-em-PEE), niet als het Engelse woord "camp". Stem-invoer: `cee-aa-em-pee`. Zelfde respelling bij beide keren in de take, zodat het elke keer gelijk klinkt.
  - **G-eiwit**: /ɣeːˈɛi̯.ʋɪt/ (GEE-eiwit, de letter G als /ɣeː/). Stem-invoer: `gee-eiwit`.
  - **boodschapper**: zoals geschreven.

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

`label()` tekent geen lijntje + stip meer naar de naam; de naam staat direct naast het onderdeel (nieuwe functie `naamBij()` uit Celorganellen, met donkere rand rond de letters). De oude aanroepen `label(ctx, naam, meta, ax, ay, lx, ly, …)` werken nog: de richting ax,ay → lx,ly bepaalt aan welke kant de naam komt. Opnieuw geplaatst (eigen `naamBij(...)` of andere richting): 'hypofyse', 'hypothalamus', 'alvleesklier'. Gecontroleerd op stills van alle scènes met namen. Ook doorgevoerd in `bron/src/lib.js` en `bron/src/scenes.js`.

## Wijziging 18 okt 2026
s13: het paneel "darm en huid" verscheen al bij "samentrekken" (cue `q.on('samen',1)` vond ook "samentrekken"); nu op "knijpen". Gemeld door Kamiel.

## Wijziging 18 okt 2026
s07: bijnieren pas bij 'Boven op je nieren' (cue vond eerst 'Daarboven'); s13: vaten knijpen pas samen bij 'knijpen'.


## Wijziging 19–20 okt 2026: alinea's opnieuw ingesproken na de uitspraaktest

Kamiel koos in de uitspraaktest (18–19 okt, 4 rondes) hoe de risicowoorden moeten klinken. Alleen de alinea's met die woorden zijn opnieuw ingesproken; de gesproken tekst is inhoudelijk gelijk gebleven.

| Woord | Nieuwe stem-invoer | Alinea's | Status |
|---|---|---|---|
| transcriptiefactor | transcriptsie-factor | s16 | goedgekeurd (uitspraaktest 18–19 okt 2026) |

- Opnieuw ingesproken: s16. Roos (7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea, ElevenLabs-flow `urmsa8zcNa5TFq8SVeBI` ("Herinspreken 19 okt · voeding, hormonen, voortplanting"). Stem-invoer = `voice` in `segments.json` (gemaakt met `make_segments.py` en de bijgewerkte vervangregels in `bouw/uitspraak_subs.json`).
- Woordtijden: Scribe (connect_from = de TTS-node) → `align.py` → `stem/woordtijden/`. Mastering: `loudnorm=I=-15:TP=-1.5`, mono 44,1 kHz 96 kb/s.
- Credits: TTS 611, Scribe ≈ 227 (≈ 41 s audio).
- In de HTML (`window.FILMDATA`) zijn alleen bij deze segmenten `words` en `dur` vervangen en heeft de audio-URL `?v=2` gekregen; speler en beelden zijn ongewijzigd. Getest met Playwright (vwo/havo, Vragen aan/uit): geen JS-fouten, nieuwe audio laadt.
- Niet aangepast: woorden die niet in de test zaten houden hun vorige stem-invoer, zodat ze in de hele film hetzelfde klinken (bijv. "receptor" zoals geschreven, terwijl de centrale lijst "reseptor" geeft).

| Segment | TTS-node | Generatie | Credits | Duur |
|---|---|---|---|---|
| s16 | Pnls1Ho5rlSdCxpuUSYL | FtqICi4gyFMhshQfDcnC | 611 | 41.73 s |


## Wijzigingen 1.1 (28 okt 2026): opwaardering naar prompt v13 (zonder keuring)

Alleen beeld; stem, script, vragen, tijden en speler ongewijzigd. Contactvel van de gewijzigde scènes bekeken; alle beelden in vwo en havo doorgelopen zonder JS-fouten; vragen afgespeeld met `?vragen=uit`.

- Alle micro-scènes: geen korrel meer over het hele beeld (`bg`); rustige stipjes alleen binnen een cel (`celTextuur` in doelcel en onder het membraan).
- Titel, s04, s05, s07, s08, s10, s14: het grijze dummylichaam (blokromp, smileyhoofd) vervangen door het realistische lichaam uit `lib_anatomie.js`; klieren op hun echte plek (schildklier in de hals, bijnier als kapje op de nier, alvleesklier achter de maag, eierstokken in het bekken); oplichten = gouden ring in plaats van gloed. Bloedbaan en zenuwbaan opnieuw in lichaamseenheden (`KP`), niet over het gezicht.
- s01: de leerling is Noor uit het castboek (zit aan de bank, kijkt verbaasd bij de knal); geen naam in beeld of stem.
- s06: 'groeien' = Teun (± 1,15 m) naast Noor (± 1,65 m) in plaats van twee zelfgetekende poppetjes.
- s07: hypothalamus en hypofyse niet meer als stippen op het gezicht, maar in een zoomcirkel naast het hoofd met de hoofddoorsnede uit de beeldbank (`hoofdHersenen`); namen schildklier en bijnieren direct bij het orgaan.
- s08: naam alvleesklier naast het lichaam, zodat hij niet meer over de eierstokken valt.
- s09 (vwo): halve ellips 'hersenen' vervangen door `hoofdHersenen` met oplichtende hypothalamus.
- s10: bijnier in doorsnede = `nierBijnier` uit de beeldbank (bijnier op de nier, merg licht op bij 'adrenaline').
- s14: koraal ovalen 'spieren' vervangen door de spieren van het lichaam (`anMuscles`, half doorzichtig).
- s15 (vwo): recht membraan → gebogen fosfolipidendubbellaag (`membraanBoog`); receptor = kralenketen met zeven doorgangen en G-eiwit (`membraanReceptor`); enzymen van de kettingreactie als gevouwen kralenketen (`enzymKluwen`) in plaats van pac-manbolletjes; tags lager zodat ze niet over het membraan vallen.
- s16 (vwo): gebogen membraan; receptor in de cel als kralenketen (`enzymKluwen`); DNA in de kern als drie losse, zacht kronkelende grijze draden (palet B) in plaats van een paarse golflijn.
- Bronnenlogboek `bron/bronnen.md` (eerste ronde). Lijsten voor Kamiel: `bron/opwaardering-v13.md`.


## Wijzigingen 1.2 (29 okt 2026): keuzes Kamiel (Regeling)

Keuzeblad 'Regeling: jouw keuzes'; brief `films/UITVOEREN-REGELING.md`. Prompt v13 blijft; datum op de site blijft (gerichte verbetering).

| Scène | Wat |
|---|---|
| s20 | Opnieuw ingesproken: 'ongeveer een tienmiljoenste gram' → 'minder dan een tienmiljoenste gram' (Clutter e.a. 1980: rust ± 24–74 pg/ml). Label in beeld 'in rust: < een tienmiljoenste gram per liter' (en iets naar links, viel van het beeld af) |
| s15 (vwo) | Opnieuw ingesproken met de aanvulling van de wachtlijst (15 okt): eerste boodschapper, G-eiwit, tweede boodschapper cAMP ('Bij adrenaline …', want de bronnen beschrijven de G-eiwit-route voor adrenaline, niet voor insuline). Nieuwe beeldstap: naam 'eerste boodschapper · blijft buiten de cel' bij het gebonden hormoon; naam 'G-eiwit' bij het G-eiwit van de beeldbankreceptor, dat bij 'G-eiwit' loslaat; een enzym in het membraan krijgt een gouden ring bij 'enzym' en laat vanaf 'cAMP' kleine gouden vijfhoeken ontstaan (naam 'cAMP · tweede boodschapper'), die naar het eerste enzym van de cascade gaan; cascade 1 → 3 → 9 iets lager (y 580). Legenda adrenaline/insuline bij de zwevende hormonen. Begrip 'eerste en tweede boodschapper (cAMP)' (vwo) toegevoegd; docentdeel aangevuld |
| alle | Kleuren volgens de tabel: hormonen niet meer goud; adrenaline koraal (druppel, ook in grafieken s21/s23), insuline paars, cortisol oker, thyroxine en ADH paars, hormoon algemeen paars (folder, tabelkop, endocrien); zenuwsignaal teal i.p.v. paars; glucose oker i.p.v. teal; actieve enzymen en 'gen aan' blijven goud. Legenda/naam bij de eerste keer: 'adrenaline'-chip in s05, s10 en s12, 'insuline' bij het eilandje van Langerhans (s08) |

- Stem: Roos (7qdUFMklKPaaAVMsBTBt), eleven_v4 (zelfde model als de andere takes), één take per alinea, ElevenLabs-flow `SZcRYlqXcH7VAsu2Nl9t`; stem-invoer letterlijk in `stem/herinspreken_20261029.json`. Respellings nieuw: `G-eiwit` → `gee-eiwit`, `cAMP` → `cee-aa-em-pee` (beide keren gelijk; in `bouw/uitspraak_subs.json`). 'receptor' bewust zoals geschreven gelaten (niet 'reseptor' uit de centrale lijst), zodat het woord in s12, s15 en s16 hetzelfde klinkt.
- Woordtijden lokaal met `silalign.py` (geen Scribe); mastering loudnorm −15 LUFS / −1,5 dBTP, mono 44,1 kHz 96 kb/s; audio-URL's s15 `?v=3`, s20 `?v=2`.
- Credits: s20 361, s15 731 → **1.092** (TTS; geen Scribe).
- Site-HTML bijgewerkt door alleen de seriebibliotheek- en scènesblokken, de FILMDATA van s15/s20, het begrip, het docentdeel en de voettekst te vervangen (spelerpatches blijven staan).
- Getest: B11-scripts met --check (spelerfix, antwoordtekst, kortantwoord, antwoordletter), flipkaarten, tabel_mobiel, licentie_noot, teller; geen JS-fouten op 1280 en 375 px (geen horizontale scroll); doorspelen met `?vragen=uit` over s16 → q17 → s18; contactvel van s01, s04, s05, s08, s09, s10, s12, s13, s15 (9 momenten), s16, s20, s21, s23 bekeken.
- Uitspraak-wachtlijst: G-eiwit (`gee-eiwit`) en cAMP (`cee-aa-em-pee`) in s15, en 'minder dan een tienmiljoenste' in s20, nog niet beluisterd (zie `uitspraak.md`).
