# Van darm naar bloed — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/voeding/4-van-darm-naar-bloed.html (audio in films/voeding/4-van-darm-naar-bloed/audio/) |
| Reeks / nummer | Voeding, film 4 van 6 |
| Doelgroep / niveau | havo + vwo bovenbouw; twee vwo-blokken (s14–s16: specificiteit van transporteiwitten, natrium-koppeling, glucose-galactosemalabsorptie met vraag q15; s21: chylomicronen en korte vetzuren) gelabeld; Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 13 oktober 2026 (zelfstandig gebouwd; wacht op review door Kamiel) |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow inuD4OTqACt4hLT7vrtd) |
| Duur | spraak 7:20 (vwo) / 5:39 (havo). Speeltijd met kaarten en vragen: vwo ≈ 9½ min, havo ≈ 7½ min |
| Beeldstijl | Part C: Macro (#1E2E4A) voor het lichaam met de opgevouwen darm, Micro (#121A26) voor vlok en epitheelcel, Schema (navy #1A2740) voor de rekensom, de vergelijking vlokken/platte vlokken, de routekaart en de recap; UI-laag vast; canvas 1920×1080. Seriekleuren: bloed koraal, lymfe lichte teal (`LYMFE` #8FD0E8), glucose = oker zeshoek, aminozuur = kraal, vet = zigzag, transporteiwit grijsblauw, kern paars |
| Audio-opslag | 17 losse mp3's in audio/ (s01 … s23), −15 LUFS (gemeten ≈ −16 door de limiter), piek < −1 dBTP, mono 44,1 kHz 96 kb/s; niet in de HTML ingebed |
| Lettertypen | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 — ingebed als base64 |
| Herkomst | gebouwd op 13 oktober 2026 met de bouwstraat in `bouw/` (dezelfde als film 1–3; `lib_voeding.js` uitgebreid met lichaam, darmvlok, epitheelcel, transporteiwit, chylomicron en de oppervlakteteller) |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script met leerdoelen, misconcepties, getallen met bronnen, `[VWO-START]/[VWO-END]` en `[VRAAG]`. Lege regel = nieuwe alinea = nieuwe take. `script_v1.md` = vóór de reviews |
| `script.md` | Tekst per take met duur en audiobestand |
| `segments.json` | Uitvoer van `make_segments.py`: per alinea `display`, `voice` en `vmap` |
| `film.json` | Titel, vraagteksten met juist antwoord en onthulling, begrippen, checkvragen en docentdeel (HTML) |
| `storyboard.md` | Per alinea: look, tekst, beeld |
| `brief.md` | Filmbrief (type, puzzel, misconcepties, leerdoelen, bewust weggelaten) |
| `checkpoint.html` | De checkpointpagina (B7/B12) zoals die vóór het opnemen is gemaakt: storyboard-stills, stijlkaders, vragen aan Kamiel |
| `uitspraak.md`, `bouw/uitspraak_subs.json` | Risicowoorden, uitkomst van de blinde controle (uitspraaktest én de echte takes) en de vervangingsregels |
| `stem/woordtijden/sNN.json` | Woordtijden per take (Scribe), uitgelijnd op de ondertitelwoorden |
| `stem/takes.json`, `stem/uitspraaktest.mp3` | ElevenLabs-node, sessie en generatie per take; uitspraaktest |
| `src/` | `scenes.js` (deze film), `lib.js`, `lib_voeding.js` (seriebibliotheek), `player.js`, `page.html`, `fonts.css` |
| `bouw/` | `make_segments.py`, `align.py`, `build_data.py`, `build.py`, `stills.py`, `contact.py`, `phone.py`, `perf.py`, `fake_words.py`, `checkpoint.py` |
| `reviews/` | Expert (anatoom/fysioloog), didactiek + taal, curriculum (havo-CE 2018–2026), en de eindreview (fresh-eyes, na de bouw) |

**Werkmap opzetten:** maak een map `f4/` met `script_v2.md`, `film.json`, `scenes.js` (uit `src/`), `words/` (= `stem/woordtijden/`) en `film/4-van-darm-naar-bloed/audio/` (= `../audio/`); zet `src/*.js`, `src/page.html`, `src/fonts.css` en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py f4 script_v2.md && python3 engine/build_data.py f4 && python3 engine/build.py f4` → `f4/film/4-van-darm-naar-bloed.html`.

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open | B · Macro | Lichaam met de opgevouwen dunne darm (≈ 3 m); rooster van 30 m² naast een half klaslokaal; vraag q02 |
| Titel | Micro | Darmvlok met zwevende glucose |
| H1 Een gladde buis is te klein | B · Micro → Schema → Micro-zoomstappen | Broodje → bouwstenen door de darmwand het bloed in ("opname · resorptie"); gladde buis 3 m × 2,5 cm = 0,23 m² = vier A4'tjes; "6 m" doorgestreept (na de dood); zoomstappen plooien → vlok → epitheelcel → microvilli met de oppervlakteteller (0,23 → 0,37 → 2,4 → 30 m²), "meer dan honderd keer", tennisveld doorgestreept; vlokken tegenover platte vlokken (coeliakie), vraag q08; minder oppervlak en minder tijd bij een kortere darm |
| H2 Door de cel heen | B · Micro | Epitheelcel met microvilli, transporteiwitten op de top; glucose van veel naar weinig (diffusie) en daarna tegen het verschil in (vraag q12); actief transport kost energie (ATP); water volgt (osmose); moleculen de cel uit, de vlok in. Vwo: glucose + galactose delen één transporteiwit, aminozuur een ander; natrium mee naar binnen; natrium-kaliumpomp kost ATP; vraag q15 (baby met melk → diarree); fructose via ander transporteiwit |
| H3 Twee routes naar het bloed | B · Micro-doorsnede vlok + Schema-routekaart | Haarvaten en centraal lymfevat in de vlok; een paar micrometer tot het bloed; inzet: slagader → vlok → poortader → lever; vraag q19 over vet; vet als bolletjes, te groot voor de haarvatwand, wel door het lymfevat; melkwitte lymfe; omweg via ader onder het linker sleutelbeen → bovenste holle ader → hart → pas later de lever. Vwo: chylomicron (druppel vet met fosfolipiden en eiwit), korte vetzuren wel direct naar de poortader |
| Recap | Macro + Schema | Lichaam met drie zoomcirkels (plooien, darmvlokken, microvilli), antwoord c; routekaart met beide routes; door naar film 5 (de lever) |
| Eindkaart | Schema | Drie kernzinnen |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Drie meter lang, dertig vierkante meter vanbinnen. Hoe past dat? | c de binnenwand is geplooid, vol uitsteeksels op steeds kleinere schaal (onthulling in s06 en recap) |
| q08 | basis | Coeliakie: vlokken korter, bijna plat. Wat gebeurt er met de opname? | b slechter, het oppervlak is veel kleiner |
| q12 | basis | Minder glucose in de darm dan in de cel. Wordt die laatste glucose nog opgenomen? | a ja, de cel haalt hem toch naar binnen (actief transport) |
| q15 | vwo | Transporteiwit voor glucose en galactose werkt niet. Baby drinkt melk? | a suikers blijven in de darm, water mee, diarree |
| q19 | basis | Glycerol en vetzuren: hoe komen die in het bloed? | c via het lymfevat in de vlok |

Checkvragen (statisch in de pagina): 1 Biggen met een darminfectie · 2 De weg van een aminozuur · 3 Juist of onjuist (diffusie, actief transport, osmose) · 4 De weg van vet · 5 Transporteiwit en osmose (vwo).

Begrippen: opname (resorptie), darmplooien, darmvlokken, darmepitheelcel, microvilli, diffusie, actief transport, transporteiwit, osmose, haarvat, poortader, lymfevat, bovenste holle ader, chylomicron (vwo), natrium-kaliumpomp (vwo), coeliakie.

## Techniek: waar zit wat in de HTML

Regelnummers in `4-van-darm-naar-bloed.html` (geen blobs; de audio staat ernaast).

- Regel 101–146: checkvragen en docentdeel (statische HTML uit `film.json` → `sections`).
- Regel 147: `window.FILMDATA` met `segments` (speech: `words` {t,s,e}, `audio`, `dur`; question: `q`, `options`, `correct`, `explain`), `chapters` en `film`.
- Daarna `lib.js` (Part C-tokens `C`, `label` op regel 209, `zoomCircle`, `tag`, `haak`, …) en `lib_voeding.js`. Het deel van film 4 begint op regel 856: `LYMFE`, `DARM_PTS`, `lichaam` (859, Macro-figuur met opgevouwen darm), `darmvlok` (873, doorsnede met epitheel, haarvaten `vaten`, lymfevat `lymf`), `epitheelcel` (902, met microvilli `mv`/`mvh`), `transporteiwit` (917), `chylomicron` (925), `teller` (932, de oppervlakteteller), `a4`.
- Regel 940–1012: hulpfuncties van deze film: `glucose`, `galactoseMol`, `aminozuur`, `glycerolMol`, `natrium`, `klaslokaal`, `gladdeBuis`, `maat`, `plooiWand`, `vlokkenRij`, `doorWand`, `CEL` (982, positie van de epitheelcel in H2), `lumen`, `glucoseVerdeling` (985), `TP` (987, x-posities van de transporteiwitten), `routeKaart` (990, darm → poortader → lever → hart en de lymfe-omweg).
- Regel 1013–1199: `SCENES.sNN(ctx, t, q)` (s01 op 1017 … s23 op 1188); beeldwissels via `q.on('woord', n)` / `q.at('woord', n)` (n-de woord in de take dat 'woord' bevat).
- Regel 1198: `GLOSSARY`.
- Regel 1200 e.v.: speler. `buildTimeline()` regel 1213, `render()` regel 1235, ondertitels `chunks()`/`drawCaption()` regel 1283–1288, testhaak `__still()` regel 1358.

## Zo pas je deze film aan

1. **Tekst of beeld:** zoek de string of scène in `src/scenes.js` (`sNN`) en bouw opnieuw (`build.py`). Vormen die in meer films terugkomen (vlok, epitheelcel, transporteiwit, routekaart-organen) staan in `src/lib_voeding.js`.
2. **Eén alinea opnieuw inspreken:** pas de alinea aan in `script_v2.md` → `make_segments.py` → neem alleen die alinea op (Roos, eleven_v4, één take, tekst = `voice` uit `segments.json`) → transcribeer met Scribe (gekoppeld aan de opname: alleen voor tijden) → `align.py f4 <status.json>` → mastering (zie hieronder) → `build_data.py` → `build.py`. Controleer daarna dat elk `q.on('…')`-woord in die scène nog voorkomt (cue-check: elk woord uit `q.on`/`q.at` moet ≥ n keer in de take zitten).
3. **Mastering per take:** `I=$(ffmpeg -i raw.mp3 -af loudnorm=print_format=json -f null - 2>&1 | grep input_i)`, versterking = −15 − I dB, dan `-af "volume=…dB,alimiter=limit=0.84:level=false,afade=t=in:d=0.02" -ar 44100 -ac 1 -b:a 96k`.
4. **Vraag aanpassen:** `film.json` → `questions`; opties staan in `script_v2.md` op de `[VRAAG]`-regel.
5. **Havo/vwo:** zet de markeringen in `script_v2.md`; de speler, hoofdstuklijst en vwo-balk volgen vanzelf.
6. **Oppervlakteteller (s06):** de tussenstanden staan in `scenes.js` s06 (`m2 = … lerp(0.23, 0.37, z1) … lerp(0.37, 2.4, z2) … lerp(2.4, 30, z4)`); de factoren in de rijen eronder (`rows`).
7. **Routekaart (s20, s23):** `routeKaart(ctx, {bloed, lymf, lever, hart, glu, vet})` — elke optie is een alpha 0..1, dus een route kun je met een `q.on(...)` laten verschijnen.

## Aandachtspunten

- De film is zelfstandig afgemaakt (werkafspraak 13 okt 2026): geen checkpoint-wachttijd. Open punten voor Kamiel staan in `reviews/eindreview.md` onder "Kan later" en in de bouwlijst: o.a. lymfepaneel in s20 is niet echt "melkwit", geen aminozuur in beeld bij s13, de factoren in de teller (vlokken ×6,5 en microvilli ×13 staan niet apart; alleen "× 60 tot 120" bij microvilli), lever ontbreekt in het inzetpaneel van s17.
- Uitspraak: alle risicowoorden (darmepitheelcellen, microvilli, coeliakie, chylomicronen, galactose, fosfolipiden, natrium-kaliumpomp, ATP, A4'tjes) zijn blind teruggetranscribeerd uit de echte takes en kwamen goed terug; Kamiel heeft de takes nog niet beluisterd (uitspraakwachtlijst in de bouwlijst).
- Getallen volgen Helander & Fändriks 2014 (dunne darm ≈ 3 m, ≈ 30 m²); "6 m" en "tennisveld" worden in de film expliciet als verouderd benoemd. Vereenvoudigingen staan in het docentdeel (glycerol vs. monoglyceriden, SGLT1/GLUT2, chylvat, borstbuis).
- Perf (4× CPU-throttle, p95 per frame): s06 19 ms, s23 10 ms, overige ≤ 8 ms. Telefoonlay-out gecontroleerd op s06 en s10.

## Wijziging 15 okt 2026

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). Nu `naamBij`: microvilli (boven de cel), ATP (boven het transporteiwit), lymfevat (rechts van de vlok, boven 'haarvaten'). In de gedeelde maag-bypass-tekening (`bypassSchema`, lib_voeding) staan 'alvleesklier' en 'dunne darm' nu met `naamBij` vast naast het orgaan.


## Wijziging 19–20 okt 2026: alinea's opnieuw ingesproken na de uitspraaktest

Kamiel koos in de uitspraaktest (18–19 okt, 4 rondes) hoe de risicowoorden moeten klinken. Alleen de alinea's met die woorden zijn opnieuw ingesproken; de gesproken tekst is inhoudelijk gelijk gebleven.

| Woord | Nieuwe stem-invoer | Alinea's | Status |
|---|---|---|---|
| A4'tjes | aa-víertjes | s05 | goedgekeurd (uitspraaktest 18–19 okt 2026) |

- Opnieuw ingesproken: s05. Roos (7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea, ElevenLabs-flow `urmsa8zcNa5TFq8SVeBI` ("Herinspreken 19 okt · voeding, hormonen, voortplanting"). Stem-invoer = `voice` in `segments.json` (gemaakt met `make_segments.py` en de bijgewerkte vervangregels in `bouw/uitspraak_subs.json`).
- Woordtijden: Scribe (connect_from = de TTS-node) → `align.py` → `stem/woordtijden/`. Mastering: `loudnorm=I=-15:TP=-1.5`, mono 44,1 kHz 96 kb/s.
- Credits: TTS 284, Scribe ≈ 103 (≈ 19 s audio).
- **HTML nog niet bijgewerkt**: de voedingshelper bouwt deze film opnieuw (nieuwe beelden) en neemt de nieuwe audio, `segments.json` en woordtijden mee. Tot die build staan in de HTML nog de oude woordtijden (afwijking < 1 s per alinea).
- Niet aangepast: woorden die niet in de test zaten houden hun vorige stem-invoer, zodat ze in de hele film hetzelfde klinken (bijv. "receptor" zoals geschreven, terwijl de centrale lijst "reseptor" geeft).

| Segment | TTS-node | Generatie | Credits | Duur |
|---|---|---|---|---|
| s05 | rmB9zT2h2K3usHmktO1W | GlY3GPWvVTbgsz0zTNKX | 284 | 19.25 s |

## Wijziging 20 okt 2026

- **Noor i.p.v. het kale lichaam** (s01 regel 1490, s22 regel 1656): `noorDarm(ctx, x, top, hh, t, o)` (regel 1477) tekent Noor groot tot de heupen (onder y = 900 afgeknipt), met een donker 'kijkje' in haar buik en daarin de dunne darm als buis (wordt op 'buis' getekend). In s22 vertrekt de zoomcirkel 'plooien' vanaf een punt op die darm. Labels '≈ 3 m' en '?' staan naast Noor.
- **H2 opnieuw getekend (s10, s11, s13, s14, s16; regels 1302–1476)**, op Kamiels feedback over de transporteiwitten en de 'regen' van moleculen:
  - Eén darmcel met zes microvilli en een **echte dubbellaag** (koppen + staartjes, `dubbellaag()`, `DC_PAD`; één keer getekend in `darmcelVlak()`), onder de cel een **haarvat** met bloedcellen.
  - **Transporteiwitten** steken door de dubbellaag: twee helften rond een bindplaats die van vorm veranderen (open naar de darm → open naar de cel, `drager()` regel 1338). Kleuren: teal = diffusie (GLUT), goud = actief (glucose, met een energieflitsje als hij omklapt), paars = aminozuur (actief), blauw kanaal = aquaporine (water, `kanaalEiwit()`), lichtpaars = aminozuur basaal, groen = fructose (s16).
  - **Moleculen** bewegen schokkerig/willekeurig (`brown()`), met een netto stroom darm → eiwit (binden, vormverandering, loslaten) → cel → basaal eiwit → haarvat (`stroomDoorCel()` regel 1356). Niets gaat meer door het membraan zelf; water alleen via aquaporines.
  - s10: diffusie via de teal eiwitten (van veel naar weinig); de gevolgde gouden glucose gaat op 'diffusie' door een eiwit naar binnen. s13: actief transport via de gouden eiwitten (op 'toch'), aminozuren (op 'aminozuren'), water via aquaporines (op 'water'), basale eiwitten lichten op bij 'onderkant'. Het label onderin ('onderkant: via transporteiwitten de cel uit') staat nu los van de moleculen; 'BINNEN IN DE VLOK' staat links naast het haarvat.
  - **vwo s14 (regel 1584): inzoomen** op het apicale membraan (op 'transporteiwit', terug uitzoomen op 'zeldzame'). In het ingezoomde beeld (`zoomDetail()` regel 1434): SGLT1 (2 Na⁺ + glucose of galactose samen naar binnen, met vormverandering; bindplaats in zeshoekvorm), aminozuurtransporter (ook met Na⁺), op 'natrium-kaliumpomp' de Na⁺/K⁺-pomp aan de basolaterale kant (3 Na⁺ eruit, 2 K⁺ erin; ATP komt aan, de laatste fosfaatgroep springt eraf, ADP drijft weg; `pompCyclus()` regel 1417), op 'Zo' (2e keer) GLUT2: glucose de cel uit door diffusie, naar het haarvat. Labels kort en zonder overlap; de oude tag 'glucose mee met natrium' is weg. Na het uitzoomen krijgen de SGLT1-eiwitten een rood kruis op 'niet'.
  - s16: SGLT1 gekruist; glucose, galactose en water blijven in de darm; fructose gaat door een groen eiwit (GLUT5) naar binnen. Kader 'lactose = glucose + galactose' rechts naast de cel.
- **Inhoud (voor Kamiel)**: de gesproken tekst gaat in H2 havo kort door de bocht: (1) s10 noemt de opname van glucose eerst 'diffusie'; in de darm gaat glucose vooral via SGLT1 (secundair actief) en alleen bij hoge concentratie ook via GLUT2 in het apicale membraan; (2) s13 'het kost de cel energie' klopt, maar die energie (ATP) gebruikt de Na⁺/K⁺-pomp, niet het eiwit dat de glucose binnenhaalt. In beeld: energieflitsje bij het gouden eiwit (havo), het echte mechanisme in de vwo-inzoom. (3) s14 'De natrium-kaliumpomp houdt het natrium in de cel laag ... die pomp kost ATP' klopt; het woord 'pomp' is daar terecht. Audio niet aangepast.
- **Nieuwe audio s05** ('A4'tjes' → 'aa-víertjes', herinspreekhelper 19–20 okt) zit nu in de HTML: FILMDATA opnieuw uit `segments.json` + `stem/woordtijden/`, audio-URL `s05.mp3?v=2`.
- **Bouwen na deze wijziging**: pas `src/scenes.js` aan en zet het in de film met `python3 bron/bouw/vervang.py films/voeding/4-van-darm-naar-bloed.html films/voeding/4-van-darm-naar-bloed/bron [--filmdata <filmdata.json> --nieuw sNN]` (vervangt alleen het blok tussen `/*@@SCENES*/` en `/*@@/SCENES*/` = `src/lib_cast.js` + `src/cast_hulp.js` + `src/scenes.js`; niet volledig herbouwen, de HTML heeft latere spelerwijzigingen). Scènesblok: regel 952–1674 (`const SCENES` op 1486).

## Wijziging 20 okt 2026 (tweede ronde): van de lymfe naar de vetcel

- **Kamiel**: "Hoe komt het vet dat in de lymfe wordt opgenomen in de vetcellen terecht?" Twee nieuwe alinea's aan het eind van H3 (na de vwo-alinea over chylomicronen), samen ± 52 s:
  - **s22 (havo + vwo, 29,7 s)**: lymfe uit de buik → borstbuis langs de ruggengraat → ader bij het hart → vetbolletjes in het bloed → 'een enzym in de wand' van de haarvaten in vetweefsel knipt het vet in vetzuren en glycerol → de vetzuren gaan de vetcel in en worden daar weer vet.
  - **s23 (vwo, 22,7 s)**: het enzym heet lipoproteïnelipase (haarvaten in vetweefsel en spieren); knipt de triglyceriden in chylomicronen; in de vetcel weer gekoppeld tot triglyceriden; glycerol uit het bloed en de rest van de chylomicron gaan naar de lever. Inhoudelijk bewust zo: de glycerol gaat niet de vetcel in (de vetcel maakt zelf glycerol(fosfaat)); alleen de vetzuren.
  - Stem: Roos, eleven_v4, één take per alinea, flow `inuD4OTqACt4hLT7vrtd` (nodes in `stem/takes.json` onder `nieuw_20okt`). Credits: 461 + 342 TTS; Scribe (2 transcripten) zonder verschillen. Stem-invoer s23: 'lipoproteïne-lipase' (nieuwe vervangregel in `bouw/uitspraak_subs.json`); wachtlijst in `uitspraak.md`.
  - **Hernummerd**: de recap-alinea's heten nu s24 en s25 (audio en woordtijden hernoemd), de eindkaart s26; scènes idem. FILMDATA opnieuw gebouwd; audio-URL's van s22–s25 met `?v=2` (cache).
  - Beeld: `vetRoute()` (Noor met lymfevaten, borstbuis, ader en hart; vetbolletjes stromen mee) en `vetcelMicro()` (haarvat in vetweefsel met het enzym in de wand als opgevouwen keten, bolletje wordt geknipt, glycerol drijft weg, vetzuren gaan via een eiwit in het membraan de vetcel in en worden een triglyceride; de vetdruppel groeit). Begrippen: borstbuis, lipoproteïnelipase (vwo).
- **Havo-zin over diffusie (s10) niet opnieuw ingesproken.** "Dan gaat een deel van de glucose door diffusie naar binnen" zegt al 'een deel' (dat klopt: bij veel glucose in de darm gaat een deel via GLUT2 door gefaciliteerde diffusie). De vraag q12 en het antwoord in s13 ('toch op, tegen het verschil in: actief transport') bouwen op deze zin; 'met natrium mee' hier toevoegen zou de vwo-stap in s14 voorwegnemen en het verhaal breken. Het juiste mechanisme staat in de vwo-inzoom (s14).
- Bouwen: zie hierboven (`bron/bouw/vervang.py`, met `--filmdata` en `--nieuw`).
