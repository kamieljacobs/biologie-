# Het hart onder controle — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/transport/5-het-hart-onder-controle.html (audio in films/transport/5-het-hart-onder-controle/audio/) |
| Reeks / nummer | Transport, film 5 van 6 (seriebrief in de Claude-doc *Seriebriefs uitlegfilms biologie*) |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blokken gelabeld: s09, s14. Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 14 oktober 2026 (zelfstandig gebouwd in reeksmodus; wacht op review door Kamiel) |
| Prompt | onbekend · gemaakt 14 okt |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow n3UjKyupg9qQcHl1xrf8; nodes en generatie-id's in `stem/gen.json`) |
| Duur | spraak 7:27 (vwo) / 5:57 (havo); plus titel, hoofdstukkaarten, vragen en eindkaart |
| Beeldstijl | Part C: Macro, Micro en Schema volgens het script; kleuren uit de seriebibliotheek `lib_transport.js` (TR) |
| Audio-opslag | 15 losse mp3's in audio/ (sNN.mp3), loudnorm −15 LUFS, piek −1,5 dBTP, mono 44,1 kHz 96 kb/s; niet in de HTML ingebed |
| Woordtijden | lokaal bepaald met `bouw/silalign.py` (stiltes in de take gekoppeld aan leestekens, woorden verdeeld naar lettergrepen; gemeten afwijking t.o.v. Scribe op Transport 1 s01: gemiddeld 0,05 s, max 0,23 s) |
| Herkomst | gebouwd op 14 oktober 2026 met de bouwstraat van de gaswisselingsreeks, uitgebreid met `lib_transport.js` en `silalign.py` |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script met leerdoelen, misconcepties, getallen en wat de reviews veranderden. Lege regel = nieuwe alinea = nieuwe take. `script_v1.md` = vóór de reviews |
| `script.md` | Tekst per take met duur, audiobestand en stem-invoer |
| `segments.json` | Uitvoer van `make_segments.py`: per alinea `display` (ondertitel), `voice` (stem-invoer) en `vmap` |
| `film.py` → `film.json` | Titel, vraagteksten met juist antwoord, begrippen, checkvragen en docentdeel (HTML) |
| `checkpoint.html` | Zelfcheck: script, contactsheets, eindreview |
| `uitspraak.md` | Risicowoorden met stem-invoer; wachtlijst voor Kamiel |
| `stem/woordtijden/sNN.json` | Woordtijden per take |
| `stem/gen.json` | ElevenLabs-flow, node, sessie, generatie-id en duur per take |
| `src/` | `scenes.js` (deze film), `lib.js`, `lib_voeding.js`, `lib_hormonen.js`, `lib_transport.js`, `player.js`, `page.html`, `fonts.css` |
| `bouw/` | `make_segments.py`, `silalign.py`, `build_data.py`, `build.py`, `stills.py`, `sheets.py`, `uitspraak_subs.json` |
| `reviews/` | Expert, didactiek + taal, curriculum (met checkvragen), eindreview |

**Werkmap opzetten:** maak `w/` met `script_v2.md`, `film.py`, `segments.json`, `scenes.js` (uit `src/`), `words/` (= `stem/woordtijden/`) en `film/5-het-hart-onder-controle/audio/` (= `../audio/`); zet `src/*` (behalve scenes.js) en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py w script_v2.md && (cd w && python3 film.py) && python3 engine/build_data.py w && python3 engine/build.py w` → `w/film/5-het-hart-onder-controle.html`. Let op: `make_segments.py` nummert de id's opnieuw; voeg je een alinea toe, dan verschuiven de id's erna (hernoem dan de mp3's en woordtijden mee).

## Opbouw

| Hoofdstuk | Look en kernbeeld (uit het script) |
|---|---|
| Cold open | Macro: een sporthal; aan de muur hangt een groen kastje met een AED; een leerling speelt basketbal |
| Hoofdstuk 1 — Harder pompen | Schema: een hart met hartslagmeter en een maatbeker die per minuut volloopt; rust en sporten naast elkaar; daarna het autonome zenuwstelsel met twee pijlen naar de sinusknoop |
| Hoofdstuk 2 — Bloed naar waar het nodig is | Schema: een lichaam met de bloedstroom per orgaan als brede en smalle stromen; rust en sporten naast elkaar; inzoomen op een kleine slagader met een ring van glad spierweefsel |
| Hoofdstuk 3 — Een vat dat dichtgaat | Schema: een slagader in doorsnede waarin een plaque groeit; het hart met de kransslagaders; een afgesloten tak en een stuk hartspier dat grijs wordt |
| Hoofdstuk 4 — Een hart dat trilt | Schema: een hart met chaotische prikkels; een persoon op de grond; handen op de borst; een AED met twee elektroden |
| Recap | Macro: terug in de sporthal; de AED aan de muur; de leerling speelt verder |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Een AED geeft een stroomstoot door een hart dat trilt. Hoe kan dat helpen? | b de schok legt alle hartcellen even stil, zodat ze daarna weer samen werken |
| q06 | basis | Bij een sprint kan je hartminuutvolume vier tot vijf keer zo groot worden. Hoe doet je hart dat? | b het klopt sneller, en pompt per slag meer |
| q11 | basis | Bij een sprint pompt je hart vier keer zo veel bloed rond. Krijgen al je organen dan vier keer zo veel? | b nee, vooral de spieren krijgen meer, andere organen minder |

De antwoordopties worden niet ingesproken; ze staan alleen op het scherm. De onthulling ("Antwoord aa/bee") staat wél in de audio.

Begrippen: hartfrequentie, slagvolume, hartminuutvolume, sinusknoop, autonoom zenuwstelsel, orthosympathisch zenuwstelsel, parasympathisch zenuwstelsel, adrenaline, glad spierweefsel, vaatvernauwing, vaatverwijding, kransslagaders, plaque, atherosclerose (aderverkalking), hartinfarct, herseninfarct, kamerfibrilleren, reanimatie, AED, nervus vagus (vwo), AV-knoop (vwo), drukreceptoren (baroreceptoren) (vwo), verlengde merg (vwo), negatieve terugkoppeling (vwo), homeostase (vwo).

## Waar wat in de HTML zit (`5-het-hart-onder-controle.html`)

| Regel | Inhoud |
|---|---|
| 69 | Sitebalk met "← Terug naar Transport" |
| 150 | `window.FILMDATA`: segmenten, woordtijden, vragen (uit `build_data.py`) |
| 151 | `lib.js` |
| 1195 | `lib_transport.js`: hart, hartFase, lus, ecg, vatDoorsnede |
| 1493 | `SCENES` van deze film: s01 1497 · s04 1512 · s05 1525 · s07 1534 · s08 1563 · s09 1586 · s10 1623 · s12 1626 · s13 1645 · s14 1657 · s15 1689 · s16 1710 · s17 1733 · s18 1754 · s19 1780 |
| 1789 | `player.js` (havo slaat vwo-segmenten over) |

## Hoe je de film aanpast

- **Tekst van een alinea:** wijzig `script_v2.md`, draai `make_segments.py`, neem alleen die take opnieuw op (stem-invoer = `voice` in `segments.json`, Roos, eleven_v4, één generatie), zet de mp3 genormaliseerd in `audio/` (`ffmpeg -af loudnorm=I=-15:TP=-1.5:LRA=11 -ac 1 -ar 44100 -b:a 96k`), maak woordtijden met `silalign.py` en bouw opnieuw.
- **Een antwoordoptie of vraagtekst:** opties in `script_v2.md` bij `[VRAAG]`, vraagtekst en uitleg in `film.py`; geen nieuwe opname nodig (behalve als het juiste antwoord verschuift: dat noemt de audio).
- **Een beeld:** `scenes.js` (zie regelnummers hierboven); cues hangen aan woorden via `q.on('woord', n)` (n = de hoeveelste keer dat het woord, als deel van een woord, in die alinea voorkomt).
- **Checkvragen of docentdeel:** `film.py` → `python3 film.py` → `build.py`.

## Aandachtspunten

- Uitspraak: zie `uitspraak.md`; geen blinde controle mogelijk in deze sessie.
- Woordtijden komen uit `silalign.py`, niet uit Scribe; enkele cues kunnen 0,2–0,4 s afwijken.
- Open punten uit de eindreview: zie `reviews/eindreview.md`.

## Wijziging 15 okt 2026

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). Nu `naamBij`: sinusknoop (boven de rechterboezem), AV-knoop, drukreceptoren, vet en cholesterol, ontstekingscellen (onder het vat), kransslagaders, stolsel, hartinfarct.


## Wijziging 19–20 okt 2026: opnieuw ingesproken na de uitspraaktest

Alinea's opnieuw opgenomen: s15. Alleen de stem-invoer van de geteste woorden is veranderd; de gesproken tekst, ondertitels en beelden zijn gelijk gebleven.

| Woord | Oude stem-invoer | Nieuwe stem-invoer | Status |
|---|---|---|---|
| plaque | `plak` | `plaque` | goedgekeurd (uitspraaktest 19 okt 2026) |

- Stem Roos (`7qdUFMklKPaaAVMsBTBt`), model eleven_v4, één generatie per alinea, op de bestaande flow; nieuwe generatie-id's in `stem/gen.json` (met `vorige_generation_id`).
- mp3 genormaliseerd zoals de andere takes (loudnorm −15 LUFS, −1,5 dBTP, mono 44,1 kHz 96 kb/s) in `audio/`.
- Woordtijden: lokaal met `bouw/silalign.py` (zoals de rest van de film); `stem/woordtijden/sNN.json` en `window.FILMDATA` in de HTML zijn alleen voor deze alinea's bijgewerkt (woorden en `dur`). De film is niet opnieuw gebouwd: de speler in de HTML is ongewijzigd gebleven.
- `bron/segments.json` (`voice`) en `bouw/uitspraak_subs.json` volgen de nieuwe keuzes (oude respellings eruit, EPO → `Epo`), zodat een nieuwe build dezelfde uitspraak geeft.
- Duurverschil per alinea < 1 s; filmduur in `index.html` ongewijzigd.
- Credits: TTS 544; geen Scribe.
