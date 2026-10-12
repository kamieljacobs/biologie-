# De reis door je buik — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/voeding/2-de-reis-door-je-buik.html (audio in films/voeding/2-de-reis-door-je-buik/audio/) |
| Reeks / nummer | Voeding, film 2 van 6 |
| Doelgroep / niveau | havo + vwo bovenbouw; één vwo-blok (bicarbonaat) gelabeld; Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 12 oktober 2026 |
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
- Kwaliteitscontrole 12 okt: transcripten 100% gelijk aan de tekst; 0 cue-problemen; frametijd bij 4× CPU-vertraging mediaan ≤ 4 ms, p95 ≤ 18 ms; eindreview (6 moet-punten en 7 kan-punten) verwerkt.
- Versiegeschiedenis: 1.0 (12 okt 2026).
