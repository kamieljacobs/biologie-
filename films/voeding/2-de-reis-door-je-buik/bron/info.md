# De reis door je buik — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/voeding/2-de-reis-door-je-buik.html (audio in films/voeding/2-de-reis-door-je-buik/audio/) |
| Reeks / nummer | Voeding, film 2 van 6 |
| Doelgroep / niveau | havo + vwo bovenbouw; één vwo-blok (bicarbonaat) gelabeld; Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 12 oktober 2026 |
| Prompt | onbekend · gemaakt 12 okt |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow "Voeding film 2") |
| Duur | spraak 7:40 (vwo) / 7:13 (havo). Speeltijd met kaarten en vragen: vwo ≈ 9:50, havo ≈ 9:10 |
| Beeldstijl | Part C: Schema (navy #1A2740) door de hele film, met zoomcirkels naar Micro (#121A26); UI-laag vast; canvas 1920×1080, ondertitels boven y = 900 of in een band onder het beeld op smalle schermen |
| Audio-opslag | 27 losse mp3's in audio/ (s01 … s35), −16 LUFS, piek < −1 dBTP; niet in de HTML ingebed |
| Lettertypen | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 — ingebed als base64 |
| Herkomst | gebouwd op 12 oktober 2026 met de bouwstraat in `bouw/` (dezelfde als film 1, uitgebreid) |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script met leerdoelen, misconcepties, `[VWO-START]/[VWO-END]` en `[VRAAG]`. Lege regel = nieuwe alinea = nieuwe take. `script_v1.md` = vóór de reviews |
| `script.md` | Tekst per alinea met duur, audiobestand en stem-invoer waar die afwijkt |
| `segments.json` | Uitvoer van `make_segments.py`: per alinea `display`, `voice` en `vmap` |
| `film.json` | Titel, hoofdstukvragen, vraagteksten met juist antwoord en onthulling, begrippen, checkvragen en docentdeel (HTML) |
| `storyboard.md` | Per alinea: look, tekst, beeld |
| `uitspraak.md`, `bouw/uitspraak_subs.json` | Risicowoorden en de vervangingsregels voor de stem-invoer |
| `stem/woordtijden/sNN.json` | Woordtijden per take (Scribe), uitgelijnd op de ondertitelwoorden |
| `stem/takes.json`, `stem/uitspraaktest.mp3` | ElevenLabs-node, sessie en generatie per take; uitspraaktest |
| `src/` | `scenes.js` (deze film), `lib.js`, `lib_voeding.js` (seriebibliotheek, nu met spijsverteringskanaal), `player.js`, `page.html`, `fonts.css` |
| `bouw/` | `make_segments.py`, `align.py`, `build_data.py`, `build.py`, `stills.py`, `phone.py`, `perf.py`, `fake_words.py` |
| `reviews/` | Expert (fysioloog), didactiek + taal, curriculum (havo-CE 2018–2026), en de eindreview |

**Werkmap opzetten:** maak een map `f2/` met `script_v2.md`, `film.json`, `scenes.js` (uit `src/`), `words/` (= `stem/woordtijden/`) en `film/2-de-reis-door-je-buik/audio/` (= `../audio/`); zet `src/*.js`, `src/page.html`, `src/fonts.css` en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py f2 script_v2.md && python3 engine/build_data.py f2 && python3 engine/build.py f2` → `f2/film/2-de-reis-door-je-buik.html`.

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open | I · Schema | Bypass-schema: maagzakje en nieuw stuk darm (goud), restmaag gedimd; vraag q02 |
| Titel | Schema | Titel, puzzel, kronkelende kaartlijn met broodje en klok |
| H1 Mond en slokdarm | C · Schema-kaart + doorsnede | Lijnenkaart met acht haltes en klieren; klok; kaken malen brood (zoomcirkel: moleculen gelijk); speeksel (water/slijm, lysozymen, amylase); slokdarm; vraag q08; peristaltiek |
| H2 De maag | C · Schema-doorsnede | Maag met brij en H⁺; pH-schaal; amylase stopt; twee functies van zuur; slijmlaag; gier en vraag q13; gastrine via het bloed (havo-stof, 2026-I vr 31); maagportier; misconceptie "maag neemt op" doorgestreept |
| H3 De dunne darm | C · Schema-doorsnede | Opgevouwen dunne darm en vraag q18; twaalfvingerige darm met alvleessap, gal en darmsap; emulgeren en vraag q22; knippen en opname; vwo: bicarbonaat op de pH-schaal en vraag q26; tussenstand op de kaart |
| H4 Dikke darm en endeldarm | C · Schema | Dikke darm met haustra, blinde darm met aanhangsel; waterresorptie; negen liter vocht; vraag q32 en diarree; endeldarm en aandrang |
| Recap | Schema | Bypass-schema met de sappen door de overgeslagen twaalfvingerige darm; legenda alvleessap/gal; antwoord b; kaart met tijden per halte |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Na een bypass wordt toch bijna al het eiwit verteerd. Hoe? | b (onthulling verwijst naar H3 en de recap) |
| q08 | basis | Kun je slikken als je op je hoofd staat? | b ja, spieren duwen |
| q13 | basis | Waarom is de extreem zure maag van gieren handig? | b bacteriën doden |
| q18 | basis | Waar wordt het meeste verteerd? | b dunne darm |
| q22 | basis | Is emulgeren mechanisch of chemisch? | a mechanisch |
| q26 | vwo | Wat doet bicarbonaat met de zure brij? | b neutraliseert |
| q32 | basis | Snellere peristaltiek in de dikke darm: ontlasting? | b waterig |

Checkvragen (statisch in de pagina): 1 Een galsteen · 2 Zetmeel op de route · 3 Maagzuurremmers · 4 Diarree · 5 Zuur onder controle (vwo).

## Techniek: waar zit wat in de HTML

Regelnummers in `2-de-reis-door-je-buik.html` (er zijn geen blobs; de audio staat ernaast).

- Regel 101–145: checkvragen en docentdeel (statische HTML uit `film.json` → `sections`).
- Regel 146: `window.FILMDATA` met `segments` (speech: `words` {t,s,e}, `audio`, `dur`; question: `q`, `options`, `correct`, `explain`), `chapters` en `film`.
- Daarna `lib.js` (Part C-tokens `C`, `label`, `haak`, `zoomCircle`, …) en vanaf regel 369 `lib_voeding.js`. Het deel van film 2 begint op regel 611: `kanaalKaart` (622), `miniKaart`, `klok`, `schaar`, `bacterie`, `phSchaal`, `gladPad` en `buisPad` (700, organische buis met wand als weefselband), `maagPad`/`maagVorm`, `BYP` en `bypassSchema` (762). `darmBuis` (rechte, licht kronkelende buis met kringspieren) staat eerder in de bibliotheek.
- Regel 859–1187: scènes. `DD_PTS` (opgevouwen dunne darm), dan `SCENES.sNN(ctx, t, q)`; beeldwissels via `q.on('woord', n)` / `q.at('woord', n)` op woorden uit de take.
- Regel 1188: `GLOSSARY`.
- Regel 1190 e.v.: speler. `buildTimeline()` regel 1203, `render()` regel 1225, ondertitels `chunks()`/`drawCaption()` regel 1273–1278, testhaak `__still()` regel 1348.

## Zo pas je deze film aan

1. **Tekst of beeld:** zoek de string of scène in `src/scenes.js` (`sNN`) en bouw opnieuw (`build.py`). Vormen die in meer films terugkomen (kaart, buis, maag, bypass) staan in `src/lib_voeding.js`.
2. **Eén alinea opnieuw inspreken:** pas de alinea aan in `script_v2.md` → `make_segments.py` → neem alleen die alinea op (Roos, eleven_v4, één take, tekst = `voice` uit `segments.json`) → transcribeer met Scribe → `align.py f2 <status.json>` → mastering (zie hieronder) → `build_data.py` → `build.py`. Controleer daarna dat elk `q.on('…')`-woord in die scène nog voorkomt.
3. **Mastering per take:** `I=$(ffmpeg -i raw.mp3 -af ebur128 -f null - 2>&1 | grep -A1 "Integrated loudness" | tail -1 | awk '{print $2}')`, versterking = −15 − I dB, dan `-af "volume=…dB,alimiter=limit=0.84:level=false,afade=t=in:d=0.02" -ar 44100 -ac 1 -b:a 96k`.
4. **Vraag aanpassen:** `film.json` → `questions`; opties staan in `script_v2.md` op de `[VRAAG]`-regel.
5. **Havo/vwo:** zet de markeringen in `script_v2.md`; de speler, hoofdstuklijst en vwo-balk volgen vanzelf.

## Aandachtspunten

- De puzzel (gastric bypass) en de gastrine-redenering komen uit havo 2026-I vr 29–31. Kamiel koos ervoor de bypass te houden; gebruik dat examen dus niet meer als onbekend oefenexamen na deze film.
- Gastrine staat in de basis (was in de specificatie vwo), omdat het havo-CE het vraagt. Bicarbonaat staat in geen enkel havo-examen en is vwo.
- Kamiel kon de uitspraaktest niet beluisteren; zie `uitspraak.md`.
- De klok zegt "zo'n zes tot negen uur" na de eerste hap (mond + maag + dunne darm); los opgeteld geeft de tijdlijn in de recap 5–9 uur. Bewust zo gelaten ("zo'n").
- Diarree: de film noemt snellere peristaltiek (vraag) én een aangetaste darmwand die extra vocht maakt. Osmotische diarree door bacteriën komt in film 6.
- Kwaliteitscontrole 12 okt: de woordtijden komen uit Scribe gekoppeld aan de opname (die schrijft de ingevoerde tekst terug, dus geen uitspraakcontrole); de uitspraak is daarna blind gecontroleerd (losse transcriptie van s01, s10, s15, s25: gastric bypass, pH, gastrine, HCO₃⁻ en amylase komen goed terug); 0 cue-problemen; frametijd bij 4× CPU-vertraging mediaan ≤ 4 ms, p95 ≤ 18 ms; eindreview (6 moet-punten en 7 kan-punten) verwerkt.
- Versiegeschiedenis: 1.0 (12 okt 2026).

## Wachtlijst opnieuw inspreken

Aanvullingen 15-10-2026 na de vergelijking met Gewoon Uitgelegd (tekst staat als [nieuw] in `script.md`). Opnemen per take volgens "Zo pas je deze film aan", punt 2–3. Let op: elke nieuwe alinea in `script_v2.md` laat `make_segments.py` alle latere id's doornummeren (s12 wordt s13 enz.); hernoem dan ook de audiobestanden, `stem/woordtijden/` en de `SCENES.sNN` in `scenes.js`, of plak de zinnen achter de bestaande alinea waar dat kan.

- **H1 · s09** (`../audio/s09.mp3`, nu 20,5 s, wordt ≈ +5 s): de wand heeft naast kringspieren ook lengtespieren. Achteraan in de alinea van s09.
- **H2 · nieuw vwo-blok na s11** (nieuwe take, ≈ 15 s): pepsine wordt gemaakt als onwerkzaam pepsinogeen; zoutzuur knipt er een stukje af en maakt het actief; zo verteert de maagklier zichzelf niet. In `script_v2.md` als eigen alinea tussen `[VWO-START]` … `[VWO-END]` (dit geeft wel een nieuw id en verschuift de nummering). Geen dubbeling: film 2 had nog niets over pro-enzymen; film 3 (s23, vwo) zegt het algemeen ("onwerkzame vorm"), dat sluit hier op aan.
- **H3 · s20** (`../audio/s20.mp3`, nu 26,6 s, wordt ≈ +20 s): secretine (zure brij → alvleesklier geeft veel alvleessap af) en CCK (vet en eiwit → galblaas knijpt samen, alvleesklier geeft enzymen af), naast gastrine. Achteraan in de alinea van s20. De oude zin "na een vette maaltijd naar de darm geknepen" blijft kloppen.
- **H3 · s27 (vwo)** (`../audio/s27.mp3`, nu 7,4 s, wordt ≈ +8 s): het sap dat de alvleesklier op secretine afgeeft is rijk aan bicarbonaat; hoe zuurder de brij, hoe meer secretine. In `script_v2.md` vóór `[VWO-END]` van s27 zetten, dan blijft het binnen het bestaande vwo-blok.
- **Eindkaart** (optioneel): "gastrine zet de maag aan tot zuur maken" kan worden aangevuld met "secretine en CCK sturen alvleesklier en galblaas". Geen audio.
- **Beeld nodig**: s09: doorsnede van de slokdarmwand met een binnenste laag kringspieren (ringen) en een buitenste laag lengtespieren (strepen in de lengte). Vwo-blok H2: maagklier geeft pepsinogeen af (gedimde schaar), H⁺ knipt een stukje eraf, de schaar wordt goud/actief. s20: twaalfvingerige darm met twee hormoonpijlen via het bloed: "secretine" (bij H⁺ in de brij) naar de alvleesklier, "CCK" (bij vet en eiwit) naar galblaas en alvleesklier; gastrine-pijl uit H2 als vergelijking. s27: secretine-pijl met label "bicarbonaat" op het alvleessap.
- **Risicowoorden (uitspraaktest)**:
  - secretine — geen IPA in woorden.org/encyclo (Wiktionary niet bereikbaar); verwacht [seːkrəˈtinə]. Stem-invoer: zoals geschreven, net als gastrine en pepsine die in deze film goed terugkwamen ("pepsinuh" was juist afgekeurd). Controleer dat de -ne hoorbaar blijft.
  - CCK — letterwoord; stem-invoer "cee cee kaa".
  - pepsinogeen — geen IPA gevonden; verwacht [pɛpsinoːˈɣeːn] (klemtoon op -geen, zoals glycogeen). Stem-invoer: zoals geschreven; wordt het "pepsi-no-geen" met klemtoon vooraan, dan "pepsino-geen".
  - lengtespieren, kringspieren — gewone woorden; zoals geschreven.

## Wijziging 15 okt 2026

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). Nu `naamBij`: 'cellen die eiwit herkennen' (onder de maag), 'dikke darm' (boven de bocht). In de gedeelde maag-bypass-tekening (`bypassSchema`, lib_voeding) staan 'alvleesklier' en 'dunne darm' nu met `naamBij` vast naast het orgaan.

## Wijziging 20 okt 2026

- **Afvoerbuizen (s20, regel 1343 e.v.)**: de twaalfvingerige darm krijgt nu een echte galgang en een afvoerbuis van de alvleesklier (buizen met wand en holte, `buisPad`). Ze komen vlak boven de darm samen en monden samen uit (papil, gouden ringetje). Op 'afvoerbuizen' groeien de buizen vanuit de darm omhoog (met namen 'galgang' en 'afvoerbuis alvleesklier'); op 'alvleessap' stroomt koraalkleurig sap van de staart van de klier door de buis de darm in en verspreidt zich daar; op 'gal.' stroomt gal van de lever naar de galblaas (bewaren); op 'geknepen' knijpt de galblaas samen en stroomt de gal door de galgang de darm in. Geometrie in `DUO` (regel 1147), deeltjes in `sapStroom` (regel 1157, deterministisch per tijd: elke 0,16 s vertrekt er een druppel).
- **Routekaart gelijk met de stem (s28 en s35)**: het bolletje stond te vroeg rechts (het liep lineair over 6 s). Nu `sleutels(t, [[tijd, halte], …])` (regel 1168) met de woordtijden: s28 mond → maag op 'Maag' → dunne darm op 'Dunne'; s35 mond op 'mond', maag op 'maag', dunne darm op 'darm', dikke darm op 'dikke', daarna endeldarm. In s35 verschijnen de tijden ('seconden', '2–4 uur', …) nu ook pas als ze genoemd worden.
- **Personage**: de man op zijn hoofd (s07) is nu Sam in sportkleren (headstand op de lijn).
- **s10**: de pH-schaal kwam op 'zoutzuur' i.p.v. op 'zuur,' (cue trof het woord eerder); nu `q.on('zuur', 2)`.
- Onthoud-kaart (s15, 'onthoud dit') nagekeken: klopt.
- **Bouwen na deze wijziging**: pas `src/scenes.js` aan en zet het in de film met `python3 bron/bouw/vervang.py films/voeding/2-de-reis-door-je-buik.html films/voeding/2-de-reis-door-je-buik/bron` (vervangt alleen het blok tussen `/*@@SCENES*/` en `/*@@/SCENES*/` = `src/lib_cast.js` + `src/cast_hulp.js` + `src/scenes.js`; de HTML heeft latere spelerwijzigingen die niet in `src/player.js` staan, dus niet volledig herbouwen met build.py). Scènesblok in de HTML: regel 811–1505 (`const SCENES` op 1169); oudere regelnummers hierboven schuiven ±300 op.
