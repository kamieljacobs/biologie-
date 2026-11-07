# De lever als fabriek — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/voeding/5-de-lever-als-fabriek.html (audio in films/voeding/5-de-lever-als-fabriek/audio/) |
| Reeks / nummer | Voeding, film 5 van 6 |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blokken gelabeld: s09–s11 (leverlobje, sinusoïden, portale driehoek, galstroom, vraag q10), s17 (deaminering, ammoniak → ureum), s22 (lipoproteïnen, LDL/HDL). Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 13 oktober 2026 (zelfstandig gebouwd; wacht op review door Kamiel) |
| Prompt | onbekend · gemaakt 13 okt |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow tf9JO2aShKlk9GTxgiVk); s05, s20, s26, s27 zijn hernemingen na de eindreview (zie `stem/takes.json` → `hernemingen_v3`) |
| Duur | spraak 10:02 (vwo) / 7:52 (havo). Speeltijd met kaarten en zes vragen: vwo ≈ 11½ min, havo ≈ 9 min |
| Beeldstijl | Part C: Schema (navy #1A2740) voor het leverschema, de fabriek en de bilirubine-route; Micro (#121A26) voor het leverlobje; Macro (#1E2E4A) voor de baby; UI-laag vast; canvas 1920×1080. Filmkleuren: `ZARM` #5B6FA8 (zuurstofarm bloed), `ZRIJK` = BLOED (koraal), `GAL` #B9C94A, `BILI` #E6C84A, `LEVER` = C.bruin; huid roze → geel bij de baby |
| Audio-opslag | 22 losse mp3's in audio/ (s01 … s29), −15 LUFS (gemeten ≈ −16 door de limiter), piek < −1 dBTP, mono 44,1 kHz 96 kb/s; niet in de HTML ingebed |
| Lettertypen | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 — ingebed als base64 |
| Herkomst | gebouwd op 13 oktober 2026 met de bouwstraat in `bouw/` (dezelfde als film 1–4); `lib_voeding.js` ongewijzigd, de leverhelpers staan in `scenes.js` zelf |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v3.md` | Definitief script met leerdoelen, misconcepties, getallen met bronnen, `[VWO-START]/[VWO-END]` en `[VRAAG]`. Lege regel = nieuwe alinea = nieuwe take. `script_v1.md` = vóór de reviews, `script_v2.md` = na de drie reviews, vóór de eindreview |
| `script.md` | Tekst per take met duur en audiobestand |
| `segments.json` | Uitvoer van `make_segments.py`: per alinea `display`, `voice` en `vmap` |
| `film.py` → `film.json` | Titel, vraagteksten met juist antwoord en onthulling, begrippen, checkvragen en docentdeel (HTML). `film.py` is de bron; `python3 film.py` maakt `film.json` |
| `storyboard.md` | Per alinea: look, tekst, beeld |
| `brief.md` | Filmbrief (type, puzzel, misconcepties, leerdoelen, bewust weggelaten) |
| `checkpoint.html` | De checkpointpagina (zelfcheck) zoals die vóór het opnemen is gemaakt: storyboard-stills, stijlkaders, keuzes voor Kamiel |
| `uitspraak.md`, `bouw/uitspraak_subs.json` | Risicowoorden, uitkomst van de blinde controle en de wachtlijst voor Kamiel |
| `stem/woordtijden/sNN.json` | Woordtijden per take (Scribe), uitgelijnd op de ondertitelwoorden |
| `stem/takes.json` | ElevenLabs-flow, node, sessie en generatie per take; hernemingen |
| `src/` | `scenes.js` (deze film), `lib.js`, `lib_voeding.js` (seriebibliotheek), `player.js`, `page.html`, `fonts.css` |
| `bouw/` | `make_segments.py`, `align.py`, `build_data.py`, `build.py`, `stills.py`, `contact.py`, `phone.py`, `perf.py`, `fake_words.py`, `checkpoint.py` |
| `reviews/` | Expert (hepatoloog), didactiek + taal, curriculum (havo/vwo-CE 2018–2026), en de eindreview (fresh-eyes, na de bouw; alle blokkerende en belangrijke punten zijn verwerkt, de kleine punten 10–13 ook; 14 en 15 zijn keuzes voor Kamiel) |

**Werkmap opzetten:** maak een map `f5/` met `script_v3.md`, `film.json`, `scenes.js` (uit `src/`), `words/` (= `stem/woordtijden/`) en `film/5-de-lever-als-fabriek/audio/` (= `../audio/`); zet `src/*.js`, `src/page.html`, `src/fonts.css` en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py f5 script_v3.md && python3 engine/build_data.py f5 && python3 engine/build.py f5` → `f5/film/5-de-lever-als-fabriek.html`.

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open | D · Macro | Baby in een wiegje wordt van roze geel, oogwit ook; "meer dan de helft van alle baby's"; vraag q02 |
| Titel | Schema | Lever met poortader, leverslagader en leverader; glucose stroomt binnen |
| H1 Drie buizen | B · Schema (+ Micro vwo) | Lever rechtsboven, ≈ 1,5 kg; poortader (zuurstofarm, voedingsstoffen, ¾), leverslagader (zuurstofrijk, van de aorta, ¼), leverader → onderste holle ader → hart; vet nam de omweg via de lymfe; vraag q07 (glucose een half uur na het eten); concentratiemeters per vat, "bloedsuiker meet je niet hier". Vwo: zeshoekig leverlobje (1–2 mm), portale driehoek met kleursleutel, sinusoïden met gaten, centrale ader; vraag q10 (galstroom) → bloed naar het midden, gal naar de hoeken |
| H2 Vier afdelingen | B/D · Schema | Fabriekstrip. 1 Suiker: glucose → vertakt glycogeen (≈ 100 g, een nacht), tussen maaltijden terug, melkzuur → glucose. 2 Eiwit: aminozuren → plasma-eiwitten, andere aminozuren; vraag q15 (te veel eiwit) → geen voorraad, stikstofdeel → ureum → nieren, rest brandstof of vet; slechte lever: minder ureum. Vwo: deaminering, aminogroep → ammoniak (giftig) → 2 NH₃ + CO₂ → ureum. 3 Afbreken: vraag q19 (alcohol) → zeef faalt; alcohol stap voor stap afgebroken tot CO₂ + H₂O; medicijnen en afvalstoffen omgebouwd + stukje eraan → lost op → nieren; meters alcohol leverslagader > leverader; paracetamol: giftig tussenproduct. 4 Gal: ½–1 L/dag, galblaas → twaalfvingerige darm; geen enzym (alvleesklier); galzouten emulgeren, terug via de poortader; uitscheiding van cholesterol, hormonen, medicijnen; een gele kleurstof. Vwo 5 Vet: lipoproteïnen, LDL lever → cellen, HDL terug; dezelfde stof, andere richting |
| H3 De gele kleurstof | D · Schema + Macro | Rode bloedcel (120 dagen) → milt en lever; ijzer → rood beenmerg, eiwit → aminozuren, kleurstof → bilirubine; levercel plakt stukje (oplosbaar) → gal → darm → bruin door darmbacteriën; galsteen (vraag q25) → bleke ontlasting, de al oplosbare bilirubine terug het bloed in, donkere urine, gele huid; de baby: afbraakgolf en een enzym op een paar procent → geel; na twee weken vanzelf over; blauw licht maakt een oplosbare vorm zonder het enzym |
| Recap | Schema | Baby-antwoord; leverschema met glycogeen, ureum → nieren, vet via de lymfe; door naar film 6 (dikke darm) |
| Eindkaart | Schema | Drie kernzinnen |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Een baby van drie dagen wordt geel. Waar komt die kleur vandaan? | c een afbraakproduct van haar eigen bloed (onthulling in s27 en recap) |
| q07 | basis | Een half uur na het broodje kaas: in welk bloedvat zit de meeste glucose? | a in de poortader, vóór de lever |
| q10 | vwo | In een leverlobje stroomt bloed naar de centrale ader. Welke kant stroomt de gal op? | b van de levercellen naar de hoeken, tegen het bloed in |
| q15 | basis | Je eet vaak meer eiwit dan je nodig hebt. Waar blijft dat? | b de lever breekt het af tot afval en brandstof |
| q19 | basis | Hoe haalt de lever alcohol uit je bloed? | b hij bouwt het chemisch om tot andere stoffen |
| q25 | basis | Een galsteen sluit de galgang af. Welke kleur krijgt de ontlasting? | b bleek en grijs |

Checkvragen (statisch in de pagina): 1 Drie vaten, drie metingen (tabel P/Q/R: glucose en ureum) · 2 Juist of onjuist · 3 Blauw licht · 4 Eiwitrijk dieet · 5 Zuurstof in een lobje (vwo).

Begrippen: poortader, leverslagader, leverader, onderste holle ader, glycogeen, ureum, ontgiften, gal, galzouten, galblaas, bilirubine, geelzucht, milt, lipoproteïnen (vwo), leverlobje (vwo), deaminering (vwo).

## Waar wat in de HTML zit (regelnummers in `5-de-lever-als-fabriek.html`)

| Regel | Inhoud |
|---|---|
| 7–65 | Fonts (base64) en CSS |
| 69 | Sitebalk `<nav class="sitenav">` met "← Terug naar Voeding" |
| 70–95 | Speler: canvas, ondertitelband, knoppen, Havo/Vwo- en Leerling/Klas-schakelaar |
| 96–145 | Hoofdstukken, Begrippen, Checkvragen (101–115), Voor de docent (116–143), Transcript |
| 147 | `window.FILMDATA` — alle segmenten, woordtijden, vragen, titelkaart (uit `build_data.py`) |
| 148–367 | `lib.js`: Part C-tokens, `label`, `tag`, `zoomCircle`, `particleFlow`, `human` |
| 368–940 | `lib_voeding.js`: seriebibliotheek (bloed, lymfe, glycogeen, bead, triglyceride, buisPad, lichaam, darmvlok, teller …) |
| 941–1276 | `scenes.js` van deze film: kleuren (953–956), `baby` 962, `leverVorm` 983, `vat` 986, `leverSchema` 995 (met `LS` 982), `meter`/`meters` 1007–1011, `lobje` 1014, `afdelingen`/`paneel` 1031–1034, iconen 1035–1041, `biliRoute` 1046 (met `R3` 1045), `SCENES` 1071 met s01 1075 · s04 1083 · s05 1091 · s06 1099 · s08 1104 · s09 1114 · s11 1125 · s12 1133 · s13 1138 · s14 1153 · s16 1163 · s17 1173 · s18 1186 · s20 1193 · s21 1210 · s22 1223 · s23 1236 · s24 1241 · s26 1245 · s27 1250 · s28 1263 · s29 1268 |
| 1277–1442 | `GLOSSARY` en `player.js`: afspelen, vraagkaarten, ondertitels, niveau-filter (1296: havo slaat vwo-segmenten over), vwo-markering (1324) |

## Hoe je de film aanpast

- **Tekst van een alinea:** wijzig `script_v3.md`, neem die take opnieuw op (zie `uitspraak.md`), transcribeer voor de woordtijden, en bouw opnieuw. Alleen een ondertitelwoord anders schrijven zonder nieuwe opname: pas `words/sNN.json` niet aan; wijzig het script en draai `make_segments.py` + `align.py` op de bestaande transcriptie (`stem/status/` staat niet in de bronmap; de woordtijden in `stem/woordtijden/` volstaan voor `build_data.py`).
- **Een vraag of de checkvragen:** `film.py` → `python3 film.py` → `build_data.py` + `build.py`. De antwoordopties staan in het script bij `[VRAAG]`.
- **Beeld van een scène:** `src/scenes.js`, functie `sNN(ctx, t, q)`; `q.on('woord', n, duur)` geeft 0→1 vanaf de n-de keer dat dat woord wordt gezegd. Controleer met `python3 engine/stills.py f5 uit sNN:tijd` (losse stills) of `FIVE=1 python3 engine/stills.py f5 uit contact` (vijf per segment).
- **Een extra vwo-blok:** in het script tussen `[VWO-START]` en `[VWO-END]`; de speler slaat die segmenten over bij Havo.
- **Kleuren / seriebibliotheek:** `src/lib_voeding.js` is gedeeld met film 1–4; verander daar niets zonder de andere films opnieuw te bouwen.

## Aandachtspunten

- Vier takes zijn na de eindreview hernomen via de ElevenLabs-flow (`run_flow_nodes`), die vier varianten per node maakte; de laatste variant is gebruikt omdat de Scribe-node die transcribeert. Dat is tegen Kamiels regel (één variant) ingegaan omdat `generate_speech` op dat moment een protocolfout gaf.
- `koolstofdioxide` is hier zonder respelling opgenomen (s17, s20); in de diffusiefilm was "koolstofdie-oxide" nodig. Op de wachtlijst.
- De blinde controle hoorde "vwo" in s17 als "vvbo"; in s22 goed. Beluisteren.
- Speelduur vwo ≈ 11½ min: langer dan film 4. Alternatief (−1 min): galsteenvraag s24–s26 en het paracetamolstuk schrappen.
- (14 okt 2026) De TTS/STT-nodes van deze flow (`stem/takes.json` → `nodes`) zijn hergebruikt voor film 6; hun prompts dragen nu de film-6-tekst. De generatie-id's in `takes.json` blijven geldig en wijzen nog naar de film-5-audio.

- 15 okt 2026: vwo-segment opnieuw ingesproken zonder 'Voor vwo' (Roos, eleven_v4, één take, flow wSVfswmRwrmJKmHQ57hW); audio-URL met ?v=2. Overige 'Voor vwo'-aankondigingen worden door de speler weggeknipt (vwoCuts).

## Wijziging 15 okt 2026

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). Nu `naamBij`: sinusoïden (links van het leverlobje), centrale ader (rechts naast het lobje). In de gedeelde maag-bypass-tekening (`bypassSchema`, lib_voeding) staan 'alvleesklier' en 'dunne darm' nu met `naamBij` vast naast het orgaan.

## Wijziging 20 okt 2026

- **Noor i.p.v. het kale lichaam** (s04, regel 1375): `noorLever(ctx, x, top, hh, t, o)` (regel 1357) tekent Noor rechtsboven, met een donker 'kijkje' in haar buik: de lever rechtsboven in haar buik (links in beeld, onder de ribben) en vaag de darm eronder. Naam 'RECHTSBOVEN' eronder. Gesproken tekst ongewijzigd.
- **Bouwen na deze wijziging**: pas `src/scenes.js` aan en zet het in de film met `python3 bron/bouw/vervang.py films/voeding/5-de-lever-als-fabriek.html films/voeding/5-de-lever-als-fabriek/bron [--filmdata <filmdata.json> --nieuw sNN]` (vervangt alleen het blok tussen `/*@@SCENES*/` en `/*@@/SCENES*/` = `src/lib_cast.js` + `src/cast_hulp.js` + `src/scenes.js`; niet volledig herbouwen met build.py, de HTML heeft latere spelerwijzigingen die niet in `src/player.js` staan). Scènesblok: regel 952–1569 (`const SCENES` op 1363).

## Wijziging 20 okt 2026 (tweede ronde)

- **Baby uit het castboek** (s01, s27, s28; `baby()` in `src/scenes.js`): het wiegje, het licht en de gele kleur blijven, maar de baby zelf is nu `persoon(ctx, 'baby', …)` (vlak, geen omlijning, één schaduwtint; ligt op de rug, hoofd links), met `geel` voor de gele huid en ogen dicht onder de lamp; dekentje over het lijfje.
- **Overlap rond 6:59 (havo, s23)**: de tak 'eiwit → aminozuren' liep door de galgang en de namen 'gal'/'galgang'. Die tak staat nu onder de milt (pijl omlaag, aminozuren en tekst eronder).
