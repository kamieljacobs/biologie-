# Wat er in je bloed zit — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/transport/3-wat-er-in-je-bloed-zit.html (audio in films/transport/3-wat-er-in-je-bloed-zit/audio/) |
| Reeks / nummer | Transport, film 3 van 6 (seriebrief in de Claude-doc *Seriebriefs uitlegfilms biologie*) |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blokken gelabeld: s17, s18, q19, s20. Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 14 oktober 2026 (zelfstandig gebouwd in reeksmodus; wacht op review door Kamiel) |
| Prompt | onbekend · gemaakt 14 okt |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow xmNVzsFwU3NYf8NrQXQe; nodes en generatie-id's in `stem/gen.json`) |
| Duur | spraak 7:47 (vwo) / 6:50 (havo); plus titel, hoofdstukkaarten, vragen en eindkaart |
| Beeldstijl | Part C: Macro, Micro en Schema volgens het script; kleuren uit de seriebibliotheek `lib_transport.js` (TR) |
| Audio-opslag | 17 losse mp3's in audio/ (sNN.mp3), loudnorm −15 LUFS, piek −1,5 dBTP, mono 44,1 kHz 96 kb/s; niet in de HTML ingebed |
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

**Werkmap opzetten:** maak `w/` met `script_v2.md`, `film.py`, `segments.json`, `scenes.js` (uit `src/`), `words/` (= `stem/woordtijden/`) en `film/3-wat-er-in-je-bloed-zit/audio/` (= `../audio/`); zet `src/*` (behalve scenes.js) en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py w script_v2.md && (cd w && python3 film.py) && python3 engine/build_data.py w && python3 engine/build.py w` → `w/film/3-wat-er-in-je-bloed-zit.html`. Let op: `make_segments.py` nummert de id's opnieuw; voeg je een alinea toe, dan verschuiven de id's erna (hernoem dan de mp3's en woordtijden mee).

## Opbouw

| Hoofdstuk | Look en kernbeeld (uit het script) |
|---|---|
| Cold open | Schema: een zakje donorbloed bij Sanquin; het gaat in een centrifuge die snel ronddraait |
| Hoofdstuk 1 — Lagen in een zakje | Schema: een buisje bloed na het centrifugeren; daarna inzoomen op het plasma en op de cellen |
| Hoofdstuk 2 — Waar je bloed vandaan komt | Schema: een skelet met de plekken van rood beenmerg; inzoomen op een bot; Micro: een stamcel die deelt |
| Hoofdstuk 3 — Een lek dichten | Micro: een beschadigd bloedvat; bloedplaatjes plakken; fibrinedraden vormen een net met rode bloedcellen erin; daarna een stolsel in een vat |
| Recap | Schema: het zakje bloed, nu in drie zakjes gesplitst |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Een zakje donorbloed gaat in een centrifuge die het heel snel ronddraait. Wat zie je daarna in het zakje? | b een gele vloeistof boven en een rode laag onder |
| q10 | basis | Een rode bloedcel leeft ongeveer 120 dagen. Toch blijft je aantal rode bloedcellen gelijk. Waar komen de nieuwe vandaan? | b ze worden gemaakt in het rode beenmerg |
| q19 | vwo | In een zakje donorbloed zit citraat. Daardoor stolt het bloed niet. Hoe werkt dat? | a citraat bindt de calciumionen in het bloed |

De antwoordopties worden niet ingesproken; ze staan alleen op het scherm. De onthulling ("Antwoord aa/bee") staat wél in de audio.

Begrippen: bloedplasma, rode bloedcel, hemoglobine, witte bloedcel, bloedplaatje (trombocyt), rood beenmerg, stamcel, galkleurstof, bloedarmoede, EPO, stollingsfactoren, protrombine, trombine, fibrinogeen, fibrine, trombose, hemofilie, stollingscascade (vwo), vitamine K (vwo), serum (vwo), citraat (vwo).

## Waar wat in de HTML zit (`3-wat-er-in-je-bloed-zit.html`)

| Regel | Inhoud |
|---|---|
| 69 | Sitebalk met "← Terug naar Transport" |
| 145 | `window.FILMDATA`: segmenten, woordtijden, vragen (uit `build_data.py`) |
| 146 | `lib.js` |
| 1190 | `lib_transport.js`: hart, hartFase, lus, ecg, vatDoorsnede |
| 1579 | `SCENES` van deze film: s01 1583 · s04 1604 · s05 1620 · s06 1636 · s07 1657 · s08 1689 · s09 1717 · s11 1728 · s12 1752 · s13 1790 · s14 1815 · s15 1837 · s16 1855 · s17 1885 · s18 1910 · s20 1917 · s21 1933 |
| 1967 | `player.js` (havo slaat vwo-segmenten over) |

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

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). Rode beenmerg (s11): borstbeen, ribben, wervels, bekken en 'uiteinden van dijbeen' staan als kolom rechts naast het skelet op de hoogte van het bot; 'en opperarmbeen' links van de schouder. In de gedeelde maag-bypass-tekening (`bypassSchema`, lib_voeding) staan 'alvleesklier' en 'dunne darm' nu met `naamBij` vast naast het orgaan.


## Wijziging 19–20 okt 2026: opnieuw ingesproken na de uitspraaktest

Alinea's opnieuw opgenomen: s14. Alleen de stem-invoer van de geteste woorden is veranderd; de gesproken tekst, ondertitels en beelden zijn gelijk gebleven.

| Woord | Oude stem-invoer | Nieuwe stem-invoer | Status |
|---|---|---|---|
| EPO | `ee-pee-oo` | `Epo` | goedgekeurd (uitspraaktest 19 okt 2026) |

- Stem Roos (`7qdUFMklKPaaAVMsBTBt`), model eleven_v4, één generatie per alinea, op de bestaande flow; nieuwe generatie-id's in `stem/gen.json` (met `vorige_generation_id`).
- mp3 genormaliseerd zoals de andere takes (loudnorm −15 LUFS, −1,5 dBTP, mono 44,1 kHz 96 kb/s) in `audio/`.
- Woordtijden: lokaal met `bouw/silalign.py` (zoals de rest van de film); `stem/woordtijden/sNN.json` en `window.FILMDATA` in de HTML zijn alleen voor deze alinea's bijgewerkt (woorden en `dur`). De film is niet opnieuw gebouwd: de speler in de HTML is ongewijzigd gebleven.
- `bron/segments.json` (`voice`) en `bouw/uitspraak_subs.json` volgen de nieuwe keuzes (oude respellings eruit, EPO → `Epo`), zodat een nieuwe build dezelfde uitspraak geeft.
- Duurverschil per alinea < 1 s; filmduur in `index.html` ongewijzigd.
- Credits: TTS 498; geen Scribe.
