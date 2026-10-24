# Knippen op maat — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/voeding/3-knippen-op-maat.html (audio in films/voeding/3-knippen-op-maat/audio/) |
| Reeks / nummer | Voeding, film 3 van 6 |
| Doelgroep / niveau | havo + vwo bovenbouw; drie vwo-blokken (activeringsenergie, endo-/exopeptidasen + vraag q22, onwerkzame vorm + nucleasen) gelabeld; Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.1 · 13 oktober 2026 |
| Prompt | onbekend · gemaakt 13 okt |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow "Voeding film 3", v1cbZ4kdUXFCki6QmRy0) |
| Duur | spraak 9:22 (vwo) / 7:52 (havo). Speeltijd met kaarten en vragen: vwo ≈ 11½ min, havo ≈ 10 min |
| Beeldstijl | Part C: Micro (#121A26) voor enzymen en simulaties, Schema (navy #1A2740) voor tabel, grafieken en recap; UI-laag vast; canvas 1920×1080. Seriekleuren: enzym #7A8BA8 met goud actief centrum, koolhydraat = zeshoek, eiwit = kraal, vet = zigzag |
| Audio-opslag | 24 losse mp3's in audio/ (s01 … s32), −16 LUFS, piek < −1 dBTP; niet in de HTML ingebed |
| Lettertypen | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 — ingebed als base64 |
| Herkomst | gebouwd op 12 oktober 2026 met de bouwstraat in `bouw/` (dezelfde als film 1 en 2, uitgebreid met enzymen en een botsingssimulatie) |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script met leerdoelen, misconcepties, `[VWO-START]/[VWO-END]` en `[VRAAG]`. Lege regel = nieuwe alinea = nieuwe take. `script_v1.md` = vóór de reviews |
| `script.md` | Tekst per alinea met duur, audiobestand en stem-invoer waar die afwijkt |
| `segments.json` | Uitvoer van `make_segments.py`: per alinea `display`, `voice` en `vmap` |
| `film.json` | Titel, vraagteksten met juist antwoord en onthulling, begrippen, checkvragen en docentdeel (HTML) |
| `storyboard.md` | Per alinea: look, tekst, beeld |
| `brief.md` | Filmbrief (type, puzzel, misconcepties, leerdoelen, bewust weggelaten) |
| `uitspraak.md`, `bouw/uitspraak_subs.json` | Risicowoorden, uitkomst van de blinde controle en de vervangingsregels voor de stem-invoer |
| `stem/woordtijden/sNN.json` | Woordtijden per take (Scribe), uitgelijnd op de ondertitelwoorden |
| `stem/takes.json`, `stem/uitspraaktest.mp3` | ElevenLabs-node, sessie en generatie per take (`s15_v1_kent` en `s26_v1` = vervangen takes); uitspraaktest |
| `src/` | `scenes.js` (deze film), `lib.js`, `lib_voeding.js` (seriebibliotheek, nu met enzymen en simulatie), `player.js`, `page.html`, `fonts.css` |
| `bouw/` | `make_segments.py`, `align.py`, `build_data.py`, `build.py`, `stills.py`, `phone.py` (nu met segment en tijd als argument), `perf.py`, `fake_words.py`, `checkpoint.py` |
| `reviews/` | Expert (biochemicus), didactiek + taal, curriculum (havo-CE 2018–2026), en de eindreview |

**Werkmap opzetten:** maak een map `f3/` met `script_v2.md`, `film.json`, `scenes.js` (uit `src/`), `words/` (= `stem/woordtijden/`) en `film/3-knippen-op-maat/audio/` (= `../audio/`); zet `src/*.js`, `src/page.html`, `src/fonts.css` en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py f3 script_v2.md && python3 engine/build_data.py f3 && python3 engine/build.py f3` → `f3/film/3-knippen-op-maat.html`.

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open | I · Schema + zoomcirkel | Cracker die zoet wordt; zoomcirkel: amylase knipt zetmeel; maag met H⁺ en vraagteken; vraag q02 |
| Titel | Micro | Amylase knipt een zetmeelketen |
| H1 Een schaar die niet opraakt | A · Micro | Zetmeelketen (polysacharide) te groot voor de darmwand; balk "miljoenen jaren" tegen "seconden"; amylase met actief centrum, substraat, enzym-substraatcomplex, water, hydrolyse, maltose; vraag q08; enzym knipt door (reageerbuis, waspoeder); eiwit past niet, substraatspecifiek, remmer; Onthoud-kader; vwo: energiediagram met twee pijlen |
| H2 Welke schaar voor welk molecuul? | A · Schema-tabel + Micro | Drie enzymen; "-ase"; tabel stof · enzym · waar · product bouwt rij voor rij op; gal emulgeert; vraag q16 (WAAR-cel bij vet staat op "?"); lactase en vraag q19, lactose naar de dikke darm; Binas-verwijzing; vwo: endo-/exopeptidasen met knip in het midden, vraag q22, onwerkzame vorm, nucleasen |
| H3 Te warm, te zuur | A · Micro-simulatie + Schema-grafiek | Botsingssimulatie bij 20 → 37 °C met thermometer; vraag q25; s26: simulatie 20 → 37 → 65 °C waarin enzymen één voor één denatureren (teller "werkende enzymen"), grafiek met twee gestippelde deelkrommen (per werkend enzym sneller; aandeel werkende enzymen) en de optimumkromme als product; vraag q28 (enzym verborgen achter "?"); gekookt ei; koelkast; pH-optima (pepsine, amylase, dunne darm) |
| Recap | Schema | Mond pH 7 tegenover maag pH 2, antwoord b; amylase + maltase in de dunne darm; vier rijen stof → bouwstenen; door naar film 4 |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Cracker zoet, in de maag stopt het knippen. Waarom? | b te zuur (onthulling verwijst naar H3 en recap) |
| q08 | basis | Wat gebeurt er met amylase na een knip? | b knipt het volgende stuk |
| q16 | basis | Waar komt lipase bij het vet? | b twaalfvingerige darm, met het alvleessap |
| q19 | basis | Weinig lactase: wat gebeurt er met de lactose? | b een groot deel blijft ongeknipt en komt in de dikke darm |
| q22 | vwo | Alleen exopeptidasen: eiwitvertering sneller of langzamer? | b langzamer, veel minder uiteinden |
| q25 | basis | Wat gebeurt er bij 60 °C? | c langzamer, het enzym verliest zijn vorm |
| q28 | basis | Verwarmd tot 80 °C, afgekoeld tot 37 °C: werkt het weer? | b nee, de vorm is blijvend veranderd |

Checkvragen (statisch in de pagina): 1 Brood in een reageerbuis · 2 Welk enzym, waar? · 3 Koude nachten · 4 Lactose-intolerantie · 5 Eiwitscharen (vwo).

## Techniek: waar zit wat in de HTML

Regelnummers in `3-knippen-op-maat.html` (er zijn geen blobs; de audio staat ernaast).

- Regel 101–137: checkvragen en docentdeel (statische HTML uit `film.json` → `sections`).
- Regel 142: `window.FILMDATA` met `segments` (speech: `words` {t,s,e}, `audio`, `dur`; question: `q`, `options`, `correct`, `explain`), `chapters` en `film`.
- Daarna `lib.js` (Part C-tokens `C`, `label`, `zoomCircle`, …) en `lib_voeding.js`. Het deel van film 3 begint op regel 796: `ENZ`, `enzym` (801, blob met goud actief centrum; `denat` vervormt hem), `zetmeelKeten` (822), `maakSim`/`simStap` (831–832, deterministische botsingssimulatie, gecachet zodat terugspoelen klopt; elk enzym denatureert los met kans `kDen` per seconde en knipt daarna niet meer).
- Regel 850–1126: scènes. Eerst de hulpfuncties van deze film: `cracker`, `thermometer`, het temperatuurmodel (regel 879–885: `rise(T)` = sneller per werkend enzym, Q10 = 2; `frac(T)` = aandeel werkende enzymen; `act(T)` = product, genormaliseerd; `TOPT`; `kDen(T)` = denatureringskans per seconde), `optGrafiek` (887, met deelkrommen), `TAB` + `tabel` (897, met optie `vraag` voor een "?"-cel), `simVlak` (917, met teller "werkende enzymen"), `tekenEi`, `koelkast`, `reageerbuis`, `waspoeder`. Dan `SCENES.sNN(ctx, t, q)` vanaf regel 934; beeldwissels via `q.on('woord', n)` / `q.at('woord', n)` (n-de woord in de take dat 'woord' bevat).
- Regel 1127: `GLOSSARY`.
- Regel 1129 e.v.: speler. `buildTimeline()` regel 1142, `render()` regel 1164, ondertitels `chunks()`/`drawCaption()` regel 1212–1217, testhaak `__still()` regel 1287.

## Zo pas je deze film aan

1. **Tekst of beeld:** zoek de string of scène in `src/scenes.js` (`sNN`) en bouw opnieuw (`build.py`). De tabel staat in `TAB`; vormen die in meer films terugkomen (enzym, zetmeelketen, kraal, vetzuur, maag, buis) staan in `src/lib_voeding.js`.
2. **Eén alinea opnieuw inspreken:** pas de alinea aan in `script_v2.md` → `make_segments.py` → neem alleen die alinea op (Roos, eleven_v4, één take, tekst = `voice` uit `segments.json`) → transcribeer met Scribe (gekoppeld aan de opname: alleen voor tijden) → `align.py f3 <status.json>` → mastering (zie hieronder) → `build_data.py` → `build.py`. Controleer daarna dat elk `q.on('…')`-woord in die scène nog voorkomt.
3. **Mastering per take:** `I=$(ffmpeg -i raw.mp3 -af ebur128 -f null - 2>&1 | grep -A1 "Integrated loudness" | tail -1 | awk '{print $2}')`, versterking = −15 − I dB, dan `-af "volume=…dB,alimiter=limit=0.84:level=false,afade=t=in:d=0.02" -ar 44100 -ac 1 -b:a 96k`.
4. **Vraag aanpassen:** `film.json` → `questions`; opties staan in `script_v2.md` op de `[VRAAG]`-regel.
5. **Havo/vwo:** zet de markeringen in `script_v2.md`; de speler, hoofdstuklijst en vwo-balk volgen vanzelf.
6. **Simulatie en temperatuur:** `simVlak(ctx, id, t, Tf, {…})` met `Tf(t)` = temperatuur op tijd t. Werkende enzymen knippen bij een botsing met kans `0,25 · rise(T)`; elk enzym denatureert los en blijvend met kans `kDen(T)` per seconde (vanaf 40 °C). Wil je het optimum verschuiven, pas dan het midden van `frac(T)` (44 °C) en `kDen` aan. De teller "N knippen" telt per scène op.

## Aandachtspunten

- Puzzel: kauwen op een cracker (zoet) en het stoppen in de maag; past bij havo 2021-I vr 36 en 2026-II vr 40, maar is geen examenvraag.
- Zes van de zeven vragen hebben antwoord b. Dat is zo gebleven, omdat de cold open en de recap "antwoord b" uitspreken; bij een nieuwe versie kan de volgorde worden gewisseld (dan s09, s17, s20, s23, s26, s29 en s31 opnieuw inspreken).
- s14 zegt "Pepsine eindigt niet op ase. Dat is een uitzondering." Trypsine (vwo) eindigt ook niet op -ase; de film noemt trypsine pas in het vwo-blok.
- De simulatie is schematisch: de enzymen knippen in beeld ongeveer één keer per seconde; het label zegt "echt: honderden per seconde".
- s15 is opnieuw ingesproken ("Gal ken je", eerste take zei "kent").
- 13 okt (versie 1.1, op verzoek van Kamiel): s26 herschreven en opnieuw ingesproken. Twee effecten tegelijk: elk werkend enzym knipt sneller als het warmer is, en hoe heter, hoe meer enzymen denatureren. Per molecuul is denatureren aan of uit (coöperatief ontvouwen; ook de snelle omkeerbare inactivering vlak boven het optimum uit het Equilibrium Model van Daniel en Danson werkt per molecuul aan/uit); de kromme daalt geleidelijk doordat het aandeel werkende enzymen daalt. Simulatie, grafiek, begrip "denatureren", uitleg bij q25 en het docentdeel zijn daarop aangepast. De blinde controle van de nieuwe take (o.a. "gedenatureerd") was goed.
- Kamiel kon de uitspraaktest niet beluisteren; zie `uitspraak.md`.
- Kwaliteitscontrole 12 okt: 0 cue-problemen (139 cues na versie 1.1); blinde uitspraakcontrole van s06, s11, s13, s14, s21, s23, s30 (zie `uitspraak.md`); frametijd bij 4× CPU-vertraging mediaan ≤ 4,3 ms, p95 ≤ 10,3 ms (s04–s31); telefoonweergave (844×390) gecontroleerd; eindreview (13 moet-punten, 12 kan-punten) verwerkt op de punten in `reviews/eindreview.md`.
- Versiegeschiedenis: 1.0 (12 okt 2026); 1.1 (13 okt 2026: temperatuur en denatureren per enzym).

## Wachtlijst opnieuw inspreken

Aanvullingen 15-10-2026 na de vergelijking met Gewoon Uitgelegd (tekst staat als [nieuw] in `script.md`). Losse takes: de [nieuw]-zinnen horen bij de take erboven; zet ze in `script_v2.md` achteraan in dezelfde alinea (geen lege regel ervoor), anders nummert `make_segments.py` alle latere id's door en kloppen de audiobestanden niet meer. Daarna per take de stappen onder "Zo pas je deze film aan", punt 2–3.

- **H1 · s06** (`../audio/s06.mp3`, nu 36,7 s, wordt ≈ +20 s): condensatie als omgekeerde van hydrolyse (per koppeling komt één water vrij, per knip wordt één water ingebouwd). Scène s06 krijgt een tweede deel; controleer de `q.on`-woorden van s06. De speeltijd in de kop (9:22 / 7:52) schuift op.
- **H2 · s17** (`../audio/s17.mp3`, nu 9,2 s, wordt ≈ +16 s): galzouten met een vetkant en een waterkant omhullen de vetdruppeltjes; die klonteren niet samen en geven een groter oppervlak voor lipase. Basisstof, dus geen vwo-markering.
- **Beeld nodig**: s06: zetmeelketen die van rechts naar links wordt opgebouwd met bij elke koppeling een vrijkomend H₂O (label "condensatie"), en daarnaast dezelfde binding die amylase knipt met een H₂O dat erin gaat (label "hydrolyse"); twee pijlen tegen elkaar in. s17: galzout als staafje met een vetkant (zigzag, vetkleur) en een waterkant (bolletje), een ring galzouten om een vetdruppeltje, meerdere kleine druppels die niet samensmelten, lipase aan het oppervlak.
- **Risicowoorden (uitspraaktest)**:
  - condensatie — IPA [kɔndɛnˈsa(t)si] (woorden.org, via encyclo.nl); stem-invoer: zoals geschreven; valt de klemtoon verkeerd of hoor je "-tie", dan "condensaatsie".
  - galzouten, galzout — samenstelling van gewone woorden; zoals geschreven.

## Wijziging 15 okt 2026

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). Plaatsing gecontroleerd; geen calls verplaatst. In de gedeelde maag-bypass-tekening (`bypassSchema`, lib_voeding) staan 'alvleesklier' en 'dunne darm' nu met `naamBij` vast naast het orgaan.

## Wijziging 20 okt 2026

- **Zetmeel is een lange, vertakte keten** (Kamiel: "Zetmeel is toch veel langer dan 4 suikermoleculen?"). Nieuwe functie `zetmeelLang(ctx, ax, ay, o)` (regel 1221): het uiteinde ligt op (ax, ay); de keten loopt naar links en omhoog tot buiten beeld, met een zijtak (vertakking) die ook buiten beeld doorloopt. s06 (regel 1262): het uiteinde van de keten zakt in het actieve centrum; het enzym knipt er een maltose (2 glucoses) af; de rest van de keten schuift terug. Naam 'substraat · ZETMEEL: LANGE KETEN' boven het uiteinde; 'actief centrum' iets naar rechts. s07: keten links, maltose rechts. s09 (regel 1282): bij elke knip gaat er één maltose af en schuift de keten een stukje door; de maltosevoorraad staat rechtsboven.
- **Onthoud-kaart (s10, regel 1296)**: punt 3 'raakt niet op' verscheen al vóór punt 2: de cue `q.on('niet', 3)` telde ook 'niets' mee en viel zo op 21,5 s. Nu `q.on('raakt', 1)` (33,0 s). Volgorde nu 1 (water 29,4 s) → 2 (soort 31,4 s) → 3 (raakt 33,0 s). De Onthoud-kaarten van films 2 en 6 zijn nagekeken en kloppen.
- **Bouwen na deze wijziging**: pas `src/scenes.js` aan en zet het in de film met `python3 bron/bouw/vervang.py films/voeding/3-knippen-op-maat.html films/voeding/3-knippen-op-maat/bron` (vervangt alleen het blok tussen `/*@@SCENES*/` en `/*@@/SCENES*/` = `src/lib_cast.js` + `src/cast_hulp.js` + `src/scenes.js`; niet volledig herbouwen, de HTML heeft latere spelerwijzigingen). Scènesblok: regel 861–1430 (`const SCENES` op 1232).
