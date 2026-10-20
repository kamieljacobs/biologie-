# Transport in planten — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/transport/6-transport-in-planten.html (audio in films/transport/6-transport-in-planten/audio/) |
| Reeks / nummer | Transport, film 6 van 6 (seriebrief in de Claude-doc *Seriebriefs uitlegfilms biologie*) |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blokken gelabeld: s13, s14, s15, q16, s17. Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 14 oktober 2026 (zelfstandig gebouwd in reeksmodus; wacht op review door Kamiel) |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow i5FLuGC4rdvBe8AUOKuh; nodes en generatie-id's in `stem/gen.json`) |
| Duur | spraak 6:02 (vwo) / 4:32 (havo); plus titel, hoofdstukkaarten, vragen en eindkaart |
| Beeldstijl | Part C: Macro, Micro en Schema volgens het script; kleuren uit de seriebibliotheek `lib_transport.js` (TR) |
| Audio-opslag | 14 losse mp3's in audio/ (sNN.mp3), loudnorm −15 LUFS, piek −1,5 dBTP, mono 44,1 kHz 96 kb/s; niet in de HTML ingebed |
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

**Werkmap opzetten:** maak `w/` met `script_v2.md`, `film.py`, `segments.json`, `scenes.js` (uit `src/`), `words/` (= `stem/woordtijden/`) en `film/6-transport-in-planten/audio/` (= `../audio/`); zet `src/*` (behalve scenes.js) en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py w script_v2.md && (cd w && python3 film.py) && python3 engine/build_data.py w && python3 engine/build.py w` → `w/film/6-transport-in-planten.html`. Let op: `make_segments.py` nummert de id's opnieuw; voeg je een alinea toe, dan verschuiven de id's erna (hernoem dan de mp3's en woordtijden mee).

## Opbouw

| Hoofdstuk | Look en kernbeeld (uit het script) |
|---|---|
| Cold open | Macro: een plant in een vensterbank op een warme middag; de bladeren hangen slap; 's avonds staan ze weer recht |
| Hoofdstuk 1 — Twee soorten vaten | Schema: een plant met een stengel in doorsnede; de vaatbundels; inzoomen op een houtvat en een zeefvat; een boomstam in doorsnede |
| Hoofdstuk 2 — Water omhoog | Schema: een plant van wortel tot blad met water; Micro: wortelharen; een blad in doorsnede met een huidmondje dat open- en dichtgaat |
| Recap | Macro: de vensterbank 's avonds; de plant staat weer recht |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Je plant hangt op een warme middag slap, terwijl de aarde nog vochtig is. 's Avonds staat hij weer recht. Hoe komt dat? | b de bladeren verliezen meer water dan de wortels aanvoeren |
| q07 | basis | Iemand snijdt rondom een boom een ring bast weg, maar laat het hout heel. Wat gebeurt er? | b de wortels krijgen geen suiker meer, en de boom sterft langzaam |
| q16 | vwo | Een bladluis prikt met zijn monddeel in één zeefvat. Moet hij hard zuigen om het sap eruit te krijgen? | b nee, het sap wordt er vanzelf in geperst |

De antwoordopties worden niet ingesproken; ze staan alleen op het scherm. De onthulling ("Antwoord aa/bee") staat wél in de audio.

Begrippen: vaatbundel, xyleem (houtvaten), floëem (bastvaten, zeefvaten), zeefplaat, nerf, wortelhaar, mineralen, osmose, worteldruk, huidmondje, sluitcellen, transpiratie (verdamping), zuigkracht van de bladeren, turgor, cohesie (vwo), adhesie (vwo), spanning in de houtvaten (vwo), begeleidende cel (vwo), bron en put (vwo), drukstroomtheorie (vwo).

## Waar wat in de HTML zit (`6-transport-in-planten.html`)

| Regel | Inhoud |
|---|---|
| 69 | Sitebalk met "← Terug naar Transport" |
| 143 | `window.FILMDATA`: segmenten, woordtijden, vragen (uit `build_data.py`) |
| 144 | `lib.js` |
| 1188 | `lib_transport.js`: hart, hartFase, lus, ecg, vatDoorsnede |
| 1619 | `SCENES` van deze film: s01 1623 · s04 1636 · s05 1671 · s06 1705 · s08 1725 · s09 1740 · s10 1777 · s11 1808 · s12 1833 · s13 1867 · s14 1912 · s15 1943 · s17 1954 · s18 1975 |
| 1998 | `player.js` (havo slaat vwo-segmenten over) |

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

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). Nu `naamBij`: xyleem, inhoud (verdwijnt), houtvat in de nerf (onder het blad), monddeel (bladluis). In de gedeelde maag-bypass-tekening (`bypassSchema`, lib_voeding) staan 'alvleesklier' en 'dunne darm' nu met `naamBij` vast naast het orgaan.


## Wijziging 19–20 okt 2026: opnieuw ingesproken na de uitspraaktest

Alinea's opnieuw opgenomen: s04, s05, s06, s08, s14, s18. Alleen de stem-invoer van de geteste woorden is veranderd; de gesproken tekst, ondertitels en beelden zijn gelijk gebleven.

| Woord | Oude stem-invoer | Nieuwe stem-invoer | Status |
|---|---|---|---|
| floëem | `flo-eem` | `floëem` | goedgekeurd (uitspraaktest 19 okt 2026) |
| xyleem | `ksie-leem` | `xyleem` | goedgekeurd (uitspraaktest 19 okt 2026) |

- Stem Roos (`7qdUFMklKPaaAVMsBTBt`), model eleven_v4, één generatie per alinea, op de bestaande flow; nieuwe generatie-id's in `stem/gen.json` (met `vorige_generation_id`).
- mp3 genormaliseerd zoals de andere takes (loudnorm −15 LUFS, −1,5 dBTP, mono 44,1 kHz 96 kb/s) in `audio/`.
- Woordtijden: lokaal met `bouw/silalign.py` (zoals de rest van de film); `stem/woordtijden/sNN.json` en `window.FILMDATA` in de HTML zijn alleen voor deze alinea's bijgewerkt (woorden en `dur`). De film is niet opnieuw gebouwd: de speler in de HTML is ongewijzigd gebleven.
- `bron/segments.json` (`voice`) en `bouw/uitspraak_subs.json` volgen de nieuwe keuzes (oude respellings eruit, EPO → `Epo`), zodat een nieuwe build dezelfde uitspraak geeft.
- Duurverschil per alinea < 1 s; filmduur in `index.html` ongewijzigd.
- Credits: TTS 2397; geen Scribe.
