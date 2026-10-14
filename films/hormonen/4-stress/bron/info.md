# Stress — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/hormonen/4-stress.html (audio in films/hormonen/4-stress/audio/) |
| Reeks / nummer | Hormonen, film 4 van 5 (seriebrief in de Claude-doc *Seriebriefs uitlegfilms biologie*) |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blok gelabeld: s14–s16 met vraag q15 (CRH en HPA-as, receptor op het membraan tegenover in de cel, prednison en afbouwen). Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 14 oktober 2026 (zelfstandig gebouwd in reeksmodus; wacht op review door Kamiel) |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow oh3JHEiaYnWofBSvXTy5; nodes in `stem/takes.json`). s12 en s16 zijn na de eindreview opnieuw ingesproken |
| Duur | spraak 6:53 (vwo) / 5:23 (havo). Speeltijd met kaarten en vragen: vwo ≈ 9 min, havo ≈ 7 min |
| Beeldstijl | Part C: Macro (klaslokaal en slaapkamer, cold open), Schema (navy: bijnier, lichaamskaart, keten, regelkring, grafieken), Micro (afweercellen). Seriekleuren in `lib_hormonen.js` (`HK`); in deze film: adrenaline goud (druppel), cortisol teal (ring), merg `#B0703F`, schors oker |
| Audio-opslag | 14 losse mp3's in audio/ (s01 … s19), loudnorm −15 LUFS, piek −1,5 dBTP, mono 44,1 kHz 96 kb/s; niet in de HTML ingebed |
| Lettertypen | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 — ingebed als base64 |
| Herkomst | gebouwd op 14 oktober 2026 met de bouwstraat van de voedingsreeks (`bouw/`) en de seriebibliotheek `lib_hormonen.js` |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script met leerdoelen, misconcepties, getallen en wat de reviews veranderden. Lege regel = nieuwe alinea = nieuwe take. `script_v1.md` = vóór de reviews |
| `script.md` | Tekst per take met duur en audiobestand |
| `segments.json` | Uitvoer van `make_segments.py`: per alinea `display` (ondertitel), `voice` (stem-invoer met respellings) en `vmap` |
| `film.py` → `film.json` | Titel, vraagteksten met juist antwoord, begrippen, checkvragen en docentdeel (HTML) |
| `checkpoint.html` | Zelfcheck: contactsheets uit de speler, wat de reviews veranderden, script |
| `uitspraak.md` | Risicowoorden met stem-invoer; wachtlijst voor Kamiel |
| `stem/woordtijden/sNN.json` | Woordtijden per take (Scribe, op de ondertitelwoorden) |
| `stem/takes.json`, `stem/gen.json` | ElevenLabs-flow en node per take; generatie-id en duur |
| `src/` | `scenes.js` (deze film), `lib.js`, `lib_voeding.js`, `lib_hormonen.js` (seriebibliotheek), `player.js`, `page.html`, `fonts.css` |
| `bouw/` | `make_segments.py`, `align.py`, `build_data.py`, `build.py`, `stills.py`, `fake_words.py`, `uitspraak_subs.json` |
| `reviews/` | Expert (endocrinoloog), didactiek + taal, curriculum (met checkvragen), eindreview (fresh eyes, na de bouw) |

**Werkmap opzetten:** maak `f4/` met `script_v2.md`, `film.py`, `scenes.js` (uit `src/`), `words/` (= `stem/woordtijden/`) en `film/4-stress/audio/` (= `../audio/`); zet `src/*.js` (behalve scenes.js), `src/page.html`, `src/fonts.css` en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py f4 script_v2.md && (cd f4 && python3 film.py) && python3 engine/build_data.py f4 && python3 engine/build.py f4` → `f4/film/4-stress.html`.

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open (s01, q02) | I · Macro | Klaslokaal met rooster van de toetsweek, leerling leert tot laat (lamp); daarna in bed met tissues; vraag q02 |
| Titel | Schema | Bijnierdoorsnede met pulserend merg en schors |
| H1 Eén klier, twee delen (s04, q05) | B · Schema | Nier met bijnier als kapje; doorsnede: merg binnen, schors eromheen; zenuw naar het merg; "merg → adrenaline", "schors → cortisol"; vraag q05 |
| H2 De snelle route (s06–s07) | D · Schema | Lichaamskaart: zenuw van de hypothalamus naar het bijniermerg; mergcel met adrenaline in blaasjes; adrenaline in de bloedlus; doelwitcellen (met en zonder receptor); vijf effecten; grafiek: extra adrenaline na een paar minuten weg |
| H3 De langzame route (s08–s13) | D · Schema + Micro | Keten hypothalamus → hypofyse → ACTH → bijnierschors → cortisol; grafiek adrenaline tegenover cortisol (piek na 20–30 min); vraag q10; spier → aminozuren → lever → nieuwe glucose; afweercellen geremd; regelkring met minteken; dagritme. Vwo: CRH, HPA-as, adrenaline op het membraan tegenover cortisol in de cel, prednison (vraag q15), keten geremd door prednison, schors krimpt, afbouwen |
| H4 Als de stress niet stopt (s17–s18) | I · Schema | Balken schrik – toets – toetsweek – weken; gas (hersenen) tegenover rem (cortisol) op de hypothalamus; drie gevolgen; herstelcurve; slapen, bewegen, pauze, praten |
| Recap (s19) | Schema | Toetsweek met cortisolcurve over de dagen, virussen krijgen een kans, in bed na de laatste toets; antwoord q02 |
| Eindkaart (s20) | Schema | Drie kernzinnen |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Hoe kan stress ervoor zorgen dat je ziek wordt? | b door stress blijft een hormoon hoog dat je afweer remt (onthulling in H3 en recap) |
| q05 | basis | Welk deel van de bijnier reageert sneller als je schrikt? | a het merg |
| q10 | basis | Wat doet cortisol met je glucose? | b die stijgt, want de lever maakt nieuwe glucose |
| q15 | vwo | Een jaar prednison, dan ineens stoppen: wat is het risico? | a te weinig cortisol |

De antwoordopties worden niet ingesproken; ze staan alleen op het scherm (uit het script, `[VRAAG]`). De onthulling ("Antwoord a/b", "Het antwoord was dus …") staat wél in de audio van s06, s11, s16 en s19.

Checkvragen (statisch in de pagina): 1 Schrik van een hond · 2 Vluchten of vechten · 3 Een stresstest (tabel; e is vwo) · 4 Een jaar prednison (vwo, tabel).

Begrippen: bijnier, bijniermerg, bijnierschors, orthosympathisch zenuwstelsel, adrenaline, doelwitcel, ACTH, cortisol, negatieve terugkoppeling; vwo: CRH, HPA-as, steroïdhormoon, prednison.

## Waar wat in de HTML zit (regelnummers in `4-stress.html`)

| Regel | Inhoud |
|---|---|
| 7–65 | Fonts (base64) en CSS |
| 69 | Sitebalk `<nav class="sitenav">` met "← Terug naar Regeling" |
| 76–100 | Speler: canvas, ondertitelband, knoppen, Havo/Vwo- en Leerling/Klas-schakelaar |
| 101–155 | Checkvragen (101–122), Voor de docent (123–155) |
| 156 | `window.FILMDATA` — segmenten, woordtijden, vragen, titelkaart (uit `build_data.py`) |
| 157–378 | `lib.js`: Part C-tokens, `label`, `zoomCircle`, `human` |
| 379–949 | `lib_voeding.js` (gebruikt: `lichaam`, `glycogen`, `hexagon`, `proteinChain`, `coilPath`, `arrow`, `klok`, `padPunt`, `gladC`) |
| 950–1200 | `lib_hormonen.js`: seriebibliotheek (`person`, `HK`, `hormoonVorm`, `receptor`, `doelcel`, `hartMeter`, `klierKaart`, `bloedLus`, `grafiek`, `bakKraan`, `kringSchema`, `eilandje`, `cel`, `glycogeenKeten`, `telefoon`, …) |
| 1201–1254 | `scenes.js`: hulpstukken van deze film |
| 1255–1402 | `SCENES`: title 1256 · s01 1258 · s04 1269 · s06 1281 · s07 1293 · s08 1299 · s09 1310 · s11 1314 · s12 1325 · s13 1334 · s14 1343 · s16 1357 · s17 1366 · s18 1382 · s19 1389 |
| 1403–1570 | `GLOSSARY` en `player.js` (havo slaat vwo-segmenten over) |

## Hoe je de film aanpast

- **Tekst van een alinea:** wijzig `script_v2.md`, draai `make_segments.py`, neem alleen die take opnieuw op (stem-invoer staat in `segments.json` → `voice`), haal woordtijden op met Scribe en `align.py`, zet de mp3 genormaliseerd in `audio/` en bouw opnieuw.
- **Een antwoordoptie of vraagtekst:** opties in `script_v2.md` bij `[VRAAG]`, vraagtekst en uitleg in `film.py`; geen nieuwe opname nodig (behalve als het juiste antwoord verschuift: dat noemt de audio).
- **Een beeld:** `scenes.js` (zie regelnummers hierboven); cues hangen aan woorden via `q.on('woord', n)` (n = de hoeveelste keer dat het woord in die alinea voorkomt; het zoekt op deel van het woord, dus 'bloed' vindt ook 'bloedvaten').
- **Checkvragen of docentdeel:** `film.py` → `python3 film.py` → `build.py`.

## Aandachtspunten

- Uitspraak: zie `uitspraak.md`. Een blinde controle was in deze sessie niet mogelijk; de risicowoorden staan op de wachtlijst voor Kamiel.
- Alle grafieken zijn modellen met realistische tijden, geen metingen (zie het docentdeel).
- Eindreview: 15 punten, alle verwerkt (zie `reviews/eindreview.md` en `script_v2.md`). Twee alinea's zijn daarvoor opnieuw ingesproken (s12, s16).
