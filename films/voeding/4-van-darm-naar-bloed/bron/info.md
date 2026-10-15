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
