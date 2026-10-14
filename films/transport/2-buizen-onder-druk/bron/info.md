# Buizen onder druk — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/transport/2-buizen-onder-druk.html (audio in films/transport/2-buizen-onder-druk/audio/) |
| Reeks / nummer | Transport, film 2 van 6 (seriebrief in de Claude-doc *Seriebriefs uitlegfilms biologie*) |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blokken gelabeld: s13. Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 14 oktober 2026 (zelfstandig gebouwd in reeksmodus; wacht op review door Kamiel) |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow V43XupyWogKZDvZ8lFBU; nodes en generatie-id's in `stem/gen.json`) |
| Duur | spraak 6:44 (vwo) / 6:05 (havo); plus titel, hoofdstukkaarten, vragen en eindkaart |
| Beeldstijl | Part C: Macro, Micro en Schema volgens het script; kleuren uit de seriebibliotheek `lib_transport.js` (TR) |
| Audio-opslag | 13 losse mp3's in audio/ (sNN.mp3), loudnorm −15 LUFS, piek −1,5 dBTP, mono 44,1 kHz 96 kb/s; niet in de HTML ingebed |
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

**Werkmap opzetten:** maak `w/` met `script_v2.md`, `film.py`, `segments.json`, `scenes.js` (uit `src/`), `words/` (= `stem/woordtijden/`) en `film/2-buizen-onder-druk/audio/` (= `../audio/`); zet `src/*` (behalve scenes.js) en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py w script_v2.md && (cd w && python3 film.py) && python3 engine/build_data.py w && python3 engine/build.py w` → `w/film/2-buizen-onder-druk.html`. Let op: `make_segments.py` nummert de id's opnieuw; voeg je een alinea toe, dan verschuiven de id's erna (hernoem dan de mp3's en woordtijden mee).

## Opbouw

| Hoofdstuk | Look en kernbeeld (uit het script) |
|---|---|
| Cold open | Macro: een rij leerlingen staat op een warme dag op het schoolplein bij een diploma-uitreiking; één leerling wordt bleek en zakt in elkaar; een docent legt haar benen omhoog |
| Hoofdstuk 1 — Drie soorten buizen | Schema: slagader, haarvat en ader naast elkaar in doorsnede; daarna een stukje weefsel met een haarvatennet |
| Hoofdstuk 2 — Druk en snelheid | Schema: een druppel reist van aorta naar holle ader; daaronder tekent zich de drukgrafiek; daarna een rivier die in een breed meer uitkomt |
| Hoofdstuk 3 — Terug naar het hart | Schema: een been met een ader, kleppen en de kuitspier; daarna een staande en een liggende persoon met een drukmeter bij het hoofd |
| Recap | Macro: terug op het schoolplein; de leerling zit weer, met een flesje water |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Een klasgenoot valt flauw na een half uur stilstaan op een warme dag. Wat ging er mis? | b er kwam te weinig bloed terug naar haar hart |
| q11 | basis | Waar stroomt het bloed het langzaamst? | b in de haarvaten |

De antwoordopties worden niet ingesproken; ze staan alleen op het scherm. De onthulling ("Antwoord aa/bee") staat wél in de audio.

Begrippen: slagader, aorta, haarvat, ader, kleppen in aders, spierpomp, poortader, systole, diastole, bovendruk, onderdruk, bloeddrukmeter, polsslag, totale doorsnede, flauwvallen (na lang staan), volume per seconde (vwo), windketelwerking (vwo).

## Waar wat in de HTML zit (`2-buizen-onder-druk.html`)

| Regel | Inhoud |
|---|---|
| 69 | Sitebalk met "← Terug naar Transport" |
| 146 | `window.FILMDATA`: segmenten, woordtijden, vragen (uit `build_data.py`) |
| 147 | `lib.js` |
| 1191 | `lib_transport.js`: hart, hartFase, lus, ecg, vatDoorsnede |
| 1518 | `SCENES` van deze film: s01 1522 · s04 1535 · s05 1567 · s06 1589 · s07 1649 · s08 1675 · s09 1736 · s10 1751 · s12 1756 · s13 1801 · s14 1851 · s15 1873 · s16 1924 |
| 1942 | `player.js` (havo slaat vwo-segmenten over) |

## Hoe je de film aanpast

- **Tekst van een alinea:** wijzig `script_v2.md`, draai `make_segments.py`, neem alleen die take opnieuw op (stem-invoer = `voice` in `segments.json`, Roos, eleven_v4, één generatie), zet de mp3 genormaliseerd in `audio/` (`ffmpeg -af loudnorm=I=-15:TP=-1.5:LRA=11 -ac 1 -ar 44100 -b:a 96k`), maak woordtijden met `silalign.py` en bouw opnieuw.
- **Een antwoordoptie of vraagtekst:** opties in `script_v2.md` bij `[VRAAG]`, vraagtekst en uitleg in `film.py`; geen nieuwe opname nodig (behalve als het juiste antwoord verschuift: dat noemt de audio).
- **Een beeld:** `scenes.js` (zie regelnummers hierboven); cues hangen aan woorden via `q.on('woord', n)` (n = de hoeveelste keer dat het woord, als deel van een woord, in die alinea voorkomt).
- **Checkvragen of docentdeel:** `film.py` → `python3 film.py` → `build.py`.

## Aandachtspunten

- Uitspraak: zie `uitspraak.md`; geen blinde controle mogelijk in deze sessie.
- Woordtijden komen uit `silalign.py`, niet uit Scribe; enkele cues kunnen 0,2–0,4 s afwijken.
- Open punten uit de eindreview: zie `reviews/eindreview.md`.
