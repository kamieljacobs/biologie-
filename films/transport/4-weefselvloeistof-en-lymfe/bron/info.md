# Weefselvloeistof en lymfe — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/transport/4-weefselvloeistof-en-lymfe.html (audio in films/transport/4-weefselvloeistof-en-lymfe/audio/) |
| Reeks / nummer | Transport, film 4 van 6 (seriebrief in de Claude-doc *Seriebriefs uitlegfilms biologie*) |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blokken gelabeld: s15, s16, q17, s18. Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 14 oktober 2026 (zelfstandig gebouwd in reeksmodus; wacht op review door Kamiel) |
| Prompt | onbekend · gemaakt 14 okt |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow EabPUAkZNEX1a8t5Vsy6; nodes en generatie-id's in `stem/gen.json`) |
| Duur | spraak 6:06 (vwo) / 4:59 (havo); plus titel, hoofdstukkaarten, vragen en eindkaart |
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

**Werkmap opzetten:** maak `w/` met `script_v2.md`, `film.py`, `segments.json`, `scenes.js` (uit `src/`), `words/` (= `stem/woordtijden/`) en `film/4-weefselvloeistof-en-lymfe/audio/` (= `../audio/`); zet `src/*` (behalve scenes.js) en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py w script_v2.md && (cd w && python3 film.py) && python3 engine/build_data.py w && python3 engine/build.py w` → `w/film/4-weefselvloeistof-en-lymfe.html`. Let op: `make_segments.py` nummert de id's opnieuw; voeg je een alinea toe, dan verschuiven de id's erna (hernoem dan de mp3's en woordtijden mee).

## Opbouw

| Hoofdstuk | Look en kernbeeld (uit het script) |
|---|---|
| Cold open | Schema: een passagier zit uren in een vliegtuigstoel; bij het uitstappen zijn de enkels dik; een vinger drukt een putje in de huid dat blijft staan |
| Hoofdstuk 1 — Rond elke cel | Micro: één haarvat met cellen eromheen; water gaat door de wand, rode bloedcellen en eiwitten blijven binnen; zuurstof diffundeert |
| Hoofdstuk 2 — Terug, en een tweede afvoer | Micro: het eind van het haarvat waar vocht terugkomt; een lymfevaatje dat blind begint tussen de cellen; Schema: het lymfestelsel in het lichaam met lymfeknopen en de borstbuis |
| Hoofdstuk 3 — Als de balans zoek is | Schema: een balans met vocht erin en vocht eruit; dan de passagier in de vliegtuigstoel met een drukmeter in de beenader |
| Recap | Schema: terug bij de passagier; die loopt door de luchthaven en de enkels worden weer dun |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Na een lange vlucht zijn je enkels dik. Waar komt dat vocht vandaan? | b vocht uit je bloed komt je weefsel in en wordt niet afgevoerd |
| q06 | basis | Wat zit er níet in weefselvloeistof? | b rode bloedcellen |
| q13 | basis | Het lymfestelsel heeft geen hart. Hoe stroomt de lymfe dan? | b je spieren knijpen de lymfevaten samen |
| q17 | vwo | Een kind eet al lang veel te weinig eiwit. Er zitten minder eiwitten in het plasma. Wat gebeurt er met het vocht in het weefsel? | a er komt minder vocht terug, en het weefsel zwelt op |

De antwoordopties worden niet ingesproken; ze staan alleen op het scherm. De onthulling ("Antwoord aa/bee") staat wél in de audio.

Begrippen: weefselvloeistof, haarvat, bloedplasma, plasma-eiwitten, filtratie, resorptie, diffusie, lymfe, lymfevaten, lymfeknopen, borstbuis, spierpomp, oedeem, osmotische waarde (vwo).

## Waar wat in de HTML zit (`4-weefselvloeistof-en-lymfe.html`)

| Regel | Inhoud |
|---|---|
| 69 | Sitebalk met "← Terug naar Transport" |
| 145 | `window.FILMDATA`: segmenten, woordtijden, vragen (uit `build_data.py`) |
| 146 | `lib.js` |
| 1190 | `lib_transport.js`: hart, hartFase, lus, ecg, vatDoorsnede |
| 1507 | `SCENES` van deze film: s01 1510 · s04 1531 · s05 1545 · s07 1548 · s08 1577 · s09 1607 · s10 1624 · s11 1649 · s12 1673 · s14 1676 · s15 1698 · s16 1723 · s18 1733 · s19 1755 · s20 1765 · s21 1797 · s22 1822 |
| 1837 | `player.js` (havo slaat vwo-segmenten over) |

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

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). Nu `naamBij`: weefselvloeistof (midden tussen de cellen), plasma-eiwit (boven de eiwitten, los van 'spleetje in de wand'). In de gedeelde maag-bypass-tekening (`bypassSchema`, lib_voeding) staan 'alvleesklier' en 'dunne darm' nu met `naamBij` vast naast het orgaan.


## Wijziging 22 okt 2026: lymfestelsel in een echt lichaam
Alleen beeld; audio, timing, tekst en ondertitels ongewijzigd. Het grijze silhouet in s10 (tweede deel), s11 en s12 is vervangen door het realistische lichaam uit `personages/lib_anatomie.js` (gekopieerd naar `src/`; huid, gezicht, haar, zwembroek, zoals in film 2b en 32A-7): `lichaam()` met `BODY = LB_BODY = {cx:760, yb:885, h:780}`, romp iets donkerder (`anCavity`) zodat vaten en organen oplichten. Een eerste versie met Sam uit het castboek en een donkere doorkijk las niet als lichaam en is vervangen. Daarin ligt het lymfestelsel anatomisch op zijn plek (`lymfStelsel`, `LYMF`, `KNOPEN` in `src/scenes.js`, coördinaten in hoofdhoogtes via `AP`): lymfevaten uit beide benen en de darm komen boven de navel samen in de borstbuis, die langs de wervelkolom omhoog loopt en bij het linkersleutelbeen in de ader uitkomt (rechts op het plaatje); rechterarm en rechterhals komen rechts uit. Lymfeknopen (boontjes met kapsel en follikels) in hals, oksels, ellebogen, liezen en buik; vaten in de lymfekleur van de anatomie-bibliotheek met zachte gloed en stromende lymfe. Organen alleen waar de scène ze nodig heeft: in s11 hart (bovenste holle ader), sleutelbeenderen, darmen en lever (vet gaat via darm → borstbuis → ader, niet via de lever). Labels in s11 staan los van elkaar in een kolom naast het lichaam (`naamBij`): links 'bovenste holle ader' en 'niet via de poortader', rechts 'borstbuis' en 'linkersleutelbeen'. `lib_cast.js` en `lib_anatomie.js` staan als eigen `<script>` vóór het scèneblok; `bouw/build.py` neemt ze mee als ze in `src/` staan. Hoekregel 'vooraanzicht · schematisch' → 'vooraanzicht · doorkijk'.
