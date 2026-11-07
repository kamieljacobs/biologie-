# Eén pomp, twee rondjes — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/transport/1-een-pomp-twee-rondjes.html (audio in films/transport/1-een-pomp-twee-rondjes/audio/) |
| Reeks / nummer | Transport, film 1 van 6 (seriebrief in de Claude-doc *Seriebriefs uitlegfilms biologie*) |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blokken gelabeld: s17. Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 14 oktober 2026 (zelfstandig gebouwd in reeksmodus; wacht op review door Kamiel) |
| Prompt | onbekend · gemaakt 14 okt |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow gfOie31DgvpWcDsoKOiX; nodes en generatie-id's in `stem/gen.json`) |
| Duur | spraak 7:33 (vwo) / 6:29 (havo); plus titel, hoofdstukkaarten, vragen en eindkaart |
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

**Werkmap opzetten:** maak `w/` met `script_v2.md`, `film.py`, `segments.json`, `scenes.js` (uit `src/`), `words/` (= `stem/woordtijden/`) en `film/1-een-pomp-twee-rondjes/audio/` (= `../audio/`); zet `src/*` (behalve scenes.js) en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py w script_v2.md && (cd w && python3 film.py) && python3 engine/build_data.py w && python3 engine/build.py w` → `w/film/1-een-pomp-twee-rondjes.html`. Let op: `make_segments.py` nummert de id's opnieuw; voeg je een alinea toe, dan verschuiven de id's erna (hernoem dan de mp3's en woordtijden mee).

## Opbouw

| Hoofdstuk | Look en kernbeeld (uit het script) |
|---|---|
| Cold open | Macro: een leerling sprint over het schoolplein naar de bus, stopt en legt een hand op haar borst; het hart bonst zichtbaar |
| Hoofdstuk 1 — Twee pompen naast elkaar | Schema: borstkas met longen; hart bijna in het midden met de punt naar links; hart in doorsnede |
| Hoofdstuk 2 — Twee rondjes | Schema: lus-schema van de dubbele bloedsomloop; longen boven, organen onder; bloed in donkerrood en helderrood |
| Hoofdstuk 3 — Eén hartslag | Schema: het hart in doorsnede dat samentrekt; kleppen gaan open en dicht; een klok die één hartslag vertraagt; daarna een ECG-lijn die meeloopt |
| Recap | Macro: de leerling bij de bushalte; haar hart klopt rustiger |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Je hart heeft twee pompkamers. Waarom is de wand van de linkerkamer zo'n drie keer zo dik als die van de rechterkamer? | b de linkerkamer maakt een hogere druk |
| q07 | basis | De longslagader is een slagader. Wat voor bloed stroomt erdoor? | b zuurstofarm bloed |
| q14 | basis | Je hart klinkt als boem-tak. Wat hoor je bij de eerste toon, de boem? | b de hartkleppen tussen boezem en kamer die dichtgaan |

De antwoordopties worden niet ingesproken; ze staan alleen op het scherm. De onthulling ("Antwoord aa/bee") staat wél in de audio.

Begrippen: boezem, kamer, tussenschot, kleine bloedsomloop, grote bloedsomloop, slagader, ader, kransslagaders, hartkleppen, halvemaanvormige kleppen, systole, diastole (hartpauze), slagvolume, hartminuutvolume, sinusknoop, ECG, AV-knoop (vwo), bundel van His (vwo), T-top (vwo).

## Waar wat in de HTML zit (`1-een-pomp-twee-rondjes.html`)

| Regel | Inhoud |
|---|---|
| 69 | Sitebalk met "← Terug naar Transport" |
| 143 | `window.FILMDATA`: segmenten, woordtijden, vragen (uit `build_data.py`) |
| 144 | `lib.js` |
| 1188 | `lib_transport.js`: hart, hartFase, lus, ecg, vatDoorsnede |
| 1377 | `SCENES` van deze film: s01 1380 · s04 1394 · s05 1419 · s06 1433 · s08 1439 · s09 1450 · s10 1461 · s11 1487 · s12 1505 · s13 1515 · s15 1524 · s16 1541 · s17 1556 · s18 1580 |
| 1591 | `player.js` (havo slaat vwo-segmenten over) |

## Hoe je de film aanpast

- **Tekst van een alinea:** wijzig `script_v2.md`, draai `make_segments.py`, neem alleen die take opnieuw op (stem-invoer = `voice` in `segments.json`, Roos, eleven_v4, één generatie), zet de mp3 genormaliseerd in `audio/` (`ffmpeg -af loudnorm=I=-15:TP=-1.5:LRA=11 -ac 1 -ar 44100 -b:a 96k`), maak woordtijden met `silalign.py` en bouw opnieuw.
- **Een antwoordoptie of vraagtekst:** opties in `script_v2.md` bij `[VRAAG]`, vraagtekst en uitleg in `film.py`; geen nieuwe opname nodig (behalve als het juiste antwoord verschuift: dat noemt de audio).
- **Een beeld:** `scenes.js` (zie regelnummers hierboven); cues hangen aan woorden via `q.on('woord', n)` (n = de hoeveelste keer dat het woord, als deel van een woord, in die alinea voorkomt).
- **Checkvragen of docentdeel:** `film.py` → `python3 film.py` → `build.py`.

## Aandachtspunten

- Uitspraak: zie `uitspraak.md`; geen blinde controle mogelijk in deze sessie.
- Woordtijden komen uit `silalign.py`, niet uit Scribe; enkele cues kunnen 0,2–0,4 s afwijken.
- Open punten uit de eindreview: zie `reviews/eindreview.md`.

## Wachtlijst opnieuw inspreken

Aanvulling 15-10-2026 na de vergelijking met Gewoon Uitgelegd (tekst staat als [nieuw] in `script.md`; zet hem bij het opnemen ook in `script_v2.md`, gemarkeerd als vwo).

- **Hoofdstuk 2 — Twee rondjes · nieuwe vwo-alinea na s10** (vwo): de bloedsomloop van een ongeboren kind (placenta en navelstreng, foramen ovale, ductus Botalli, sluiten bij de geboorte). Eén nieuwe take (≈ 35 s), Roos, eleven_v4, één generatie; ffmpeg loudnorm zoals hierboven, woordtijden met `silalign.py`. Bestaande takes blijven ongewijzigd. Let op: `make_segments.py` nummert de id's opnieuw, dus de nieuwe alinea wordt s11 en alles daarna (s11–s18, vraag q14) schuift één nummer op: hernoem de mp3's, de woordtijden, de sleutels in `SCENES` (scenes.js) en de vraag-id in `film.py` mee. Voeg "foramen ovale" en "ductus Botalli" toe aan de vwo-begrippen en vul `uitspraak.md` aan.
- **Beeld nodig**: Schema: hart in doorsnede (bestaande `hart` uit `lib_transport.js`) met een opening in het tussenschot tussen de boezems (pijl rechterboezem → linkerboezem) en een kort vat tussen longslagader en aorta (pijl longslagader → aorta); longen gedimd (nog niet aan het werk); navelstreng met placenta onderaan; bij "geboorte" klapt de opening dicht en verdwijnt het vat, longen kleuren op. Labels: "foramen ovale", "ductus Botalli", "placenta", "navelstreng".
- **Risicowoorden (uitspraaktest)**:
  - **foramen ovale**: Latijn forāmen ōvāle, klemtoon op de lange a's: Nederlands medisch /foːˈraː.mɛn oːˈvaː.lə/ (foo-RAA-men oo-VAA-lə). Stem-invoer: `foraamen ovaale`.
  - **ductus Botalli**: genitief van Botallus (Leonardo Botallo, it. /boˈtallo/), klemtoon op -tal-: /ˈdʏk.tʏs boːˈtɑ.li/ (DUK-tus bo-TAL-lie). Stem-invoer: `duktus Bo-tallie`.
  - **placenta**: /plaːˈsɛn.taː/ (plaa-SEN-taa). Stem-invoer: zoals geschreven (stond ook op de wachtlijst van Afweer 4).
  - **navelstreng**: zoals geschreven.

## Wijziging 15 okt 2026

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). Nu `naamBij`: rechterkamer ('dunne wand'), boezem/kamer ('dunne/dikke spierwand'); 'hartklep' staat rechtsonder de klep (overlapte 'halvemaanvormige klep'). In de gedeelde maag-bypass-tekening (`bypassSchema`, lib_voeding) staan 'alvleesklier' en 'dunne darm' nu met `naamBij` vast naast het orgaan.


## Wijziging 19–20 okt 2026: opnieuw ingesproken na de uitspraaktest

Alinea's opnieuw opgenomen: s11, s15, s16, s17. Alleen de stem-invoer van de geteste woorden is veranderd; de gesproken tekst, ondertitels en beelden zijn gelijk gebleven.

| Woord | Oude stem-invoer | Nieuwe stem-invoer | Status |
|---|---|---|---|
| systole | `sis-to-lee` | `systole` | goedgekeurd (uitspraaktest 19 okt 2026) |
| QRS-complex | `koe-er-es-complex` | `Q-R-S-complex` | goedgekeurd (uitspraaktest 19 okt 2026) |
| diastole | `die-as-to-lee` | `diastole` | goedgekeurd (uitspraaktest 19 okt 2026) |

- Stem Roos (`7qdUFMklKPaaAVMsBTBt`), model eleven_v4, één generatie per alinea, op de bestaande flow; nieuwe generatie-id's in `stem/gen.json` (met `vorige_generation_id`).
- mp3 genormaliseerd zoals de andere takes (loudnorm −15 LUFS, −1,5 dBTP, mono 44,1 kHz 96 kb/s) in `audio/`.
- Woordtijden: lokaal met `bouw/silalign.py` (zoals de rest van de film); `stem/woordtijden/sNN.json` en `window.FILMDATA` in de HTML zijn alleen voor deze alinea's bijgewerkt (woorden en `dur`). De film is niet opnieuw gebouwd: de speler in de HTML is ongewijzigd gebleven.
- `bron/segments.json` (`voice`) en `bouw/uitspraak_subs.json` volgen de nieuwe keuzes (oude respellings eruit, EPO → `Epo`), zodat een nieuwe build dezelfde uitspraak geeft.
- Duurverschil per alinea < 1 s; filmduur in `index.html` ongewijzigd.
- Credits: TTS 2719; geen Scribe.
