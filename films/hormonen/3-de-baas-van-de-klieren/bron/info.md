# De baas van de klieren — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/hormonen/3-de-baas-van-de-klieren.html (audio in films/hormonen/3-de-baas-van-de-klieren/audio/) |
| Reeks / nummer | Hormonen, film 3 van 5 (seriebrief in de Claude-doc *Seriebriefs uitlegfilms biologie*) |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blok gelabeld: s16–s18 met vraag q17 (TRH, terugkoppeling op twee niveaus, ziekte van Graves). Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 14 oktober 2026 (zelfstandig gebouwd in reeksmodus; wacht op review door Kamiel) |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow daxBASBxKqL575X9NCK6; nodes in `stem/takes.json`). s14, s18 en s19 zijn na de eindreview opnieuw ingesproken |
| Duur | spraak 7:50 (vwo) / 6:50 (havo). Speeltijd met kaarten en vragen: vwo ≈ 9½ min, havo ≈ 8 min |
| Beeldstijl | Part C: Macro (keukenplank, cold open), Schema (navy: hoofd in profiel, organogram, hals met schildklier, regelkring, balken, grafiek). Seriekleuren in `lib_hormonen.js` (`HK`); schildklier in eigen kleur `SCHILD` (#C98A5C, in `scenes.js`). Nieuwe hormoonvormen: TSH en andere sturende hormonen = capsule (`tropine`), groeihormoon = vijfhoek (`groei`), thyroxine = ster |
| Audio-opslag | 17 losse mp3's in audio/ (s01 … s21), loudnorm −15 LUFS, piek −1,5 dBTP, mono 44,1 kHz 96 kb/s; niet in de HTML ingebed |
| Lettertypen | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 — ingebed als base64 |
| Herkomst | gebouwd op 14 oktober 2026 met de bouwstraat van de voedingsreeks (`bouw/`) en de seriebibliotheek `lib_hormonen.js` |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script met leerdoelen, misconcepties, getallen met bronnen en wat de reviews veranderden. Lege regel = nieuwe alinea = nieuwe take. `script_v1.md` = vóór de reviews |
| `script.md` | Tekst per take met duur en audiobestand |
| `segments.json` | Uitvoer van `make_segments.py`: per alinea `display` (ondertitel), `voice` (stem-invoer met respellings) en `vmap` |
| `film.py` → `film.json` | Titel, vraagteksten met juist antwoord, begrippen, checkvragen en docentdeel (HTML) |
| `checkpoint.html` | Zelfcheck: contactsheets uit de speler, wat de reviews veranderden, script |
| `uitspraak.md` | Risicowoorden met stem-invoer; wachtlijst voor Kamiel |
| `stem/woordtijden/sNN.json` | Woordtijden per take (Scribe, op de ondertitelwoorden) |
| `stem/takes.json`, `stem/gen.json` | ElevenLabs-flow en node per take; generatie-id en duur |
| `src/` | `scenes.js` (deze film), `lib.js`, `lib_voeding.js`, `lib_hormonen.js` (seriebibliotheek), `player.js`, `page.html`, `fonts.css` |
| `bouw/` | `make_segments.py`, `align.py`, `build_data.py`, `build.py`, `stills.py`, `fake_words.py`, `uitspraak_subs.json` |
| `reviews/` | Expert (endocrinoloog), didactiek + taal, curriculum (havo/vwo-CE, met checkvragen), eindreview (fresh eyes, na de bouw) |

**Werkmap opzetten:** maak `f3/` met `script_v2.md`, `film.py`, `scenes.js` (uit `src/`), `words/` (= `stem/woordtijden/`) en `film/3-de-baas-van-de-klieren/audio/` (= `../audio/`); zet `src/*.js` (behalve scenes.js), `src/page.html`, `src/fonts.css` en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py f3 script_v2.md && (cd f3 && python3 film.py) && python3 engine/build_data.py f3 && python3 engine/build.py f3` → `f3/film/3-de-baas-van-de-klieren.html`.

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open (s01, q02) | D · Macro | Keukenplank met een pak zout "met jodium" en een brood; "niet voor de smaak"; vraag q02 |
| Titel | Schema | Hoofd in profiel met pulserende hypofyse |
| H1 Wie is de baas? (s04–s07) | B · Schema | Hoofd in profiel: hypofyse aan een steeltje (erwt ter vergelijking), hypothalamus, zenuwen erin, hormonen eruit; organogram hypofyse → TSH / ACTH / FSH·LH → schildklier / bijnierschors / eierstokken en zaadballen; groeihormoon (bot) en ADH (nieren) die zelf werken; ladder rest van de hersenen → hypothalamus → hypofyse → andere klieren, "de baas?" doorgestreept |
| H2 De schildklier (s08–s18) | D + I · Schema | Hals met vlindervormige schildklier; thyroxinemolecuul met vier jodiumatomen; doelcellen gloeien, hartslag 66 → 80; regelkring (waarde thyroxine, regelcentrum hypofyse, signaal TSH, effector schildklier) met minteken; vraag q11; "weinig rem" en TSH-balk stijgt; jodium weg: balken jodium/thyroxine/TSH en een groeiende schildklier (struma); bloedonderzoek met twee balkparen; te traag / te snel met tablet. Vwo: hypothalamus → TRH → hypofyse → TSH → schildklier met rembogen op twee niveaus; schildkliercel met antistoffen op de TSH-receptor (vraag q17); balken met normaallijn |
| H3 Groeihormoon (s19–s20) | B · Schema | Groeihormoon naar lever (groeifactor) en bot met groeischijven; grafiek met stoten (slaap gearceerd, model); groeischijven sluiten; injecties |
| Recap (s21) | Schema + Macro | Pak zout naast de kring; rem breekt zonder jodium; struma; antwoord q02; ladder hypothalamus → hypofyse → schildklier met thyroxine die terugstuurt: "niemand alleen" |
| Eindkaart (s22) | Schema | Drie kernzinnen |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Waarom zit er jodium in zout? | b een klier in je hals werkt niet goed zonder jodium (onthulling in H2 en recap) |
| q11 | basis | Te weinig jodium: wat gebeurt er met de TSH? | b die stijgt, want de hypofyse wordt minder geremd |
| q17 | vwo | Ziekte van Graves: wat meet een arts? | a veel thyroxine en weinig TSH |

De antwoordopties worden niet ingesproken; ze staan alleen op het scherm (uit het script, `[VRAAG]`). Ze zijn dus zonder nieuwe opname aan te passen. De onthulling ("Antwoord b", "Antwoord a", "Het antwoord was dus …") staat wél in de audio van s12, s18 en s21.

Checkvragen (statisch in de pagina): 1 Regelkring aanvullen · 2 Struma in de bergen · 3 Vier patiënten (tabel; b is vwo) · 4 De TRH-test (vwo).

Begrippen: hypothalamus, hypofyse, schildklier, thyroxine, TSH, negatieve terugkoppeling, jodium, struma, groeihormoon, groeischijf; vwo: TRH, ziekte van Graves.

## Waar wat in de HTML zit (regelnummers in `3-de-baas-van-de-klieren.html`)

| Regel | Inhoud |
|---|---|
| 7–65 | Fonts (base64) en CSS |
| 69 | Sitebalk `<nav class="sitenav">` met "← Terug naar Regeling" |
| 76–100 | Speler: canvas, ondertitelband, knoppen, Havo/Vwo- en Leerling/Klas-schakelaar |
| 101–147 | Checkvragen (101–115), Voor de docent (116–147) |
| 148 | `window.FILMDATA` — segmenten, woordtijden, vragen, titelkaart (uit `build_data.py`) |
| 149–370 | `lib.js`: Part C-tokens, `label`, `zoomCircle`, `human` |
| 371–941 | `lib_voeding.js` (gebruikt: `lichaam`, `glycogen`, `hexagon`, `proteinChain`, `coilPath`, `arrow`, `klok`, `padPunt`, `gladC`) |
| 942–1192 | `lib_hormonen.js`: seriebibliotheek (`person`, `HK`, `hormoonVorm`, `receptor`, `doelcel`, `hartMeter`, `klierKaart`, `bloedLus`, `grafiek`, `bakKraan`, `kringSchema`, `eilandje`, `cel`, `glycogeenKeten`, `telefoon`, …) |
| 1193–1240 | `scenes.js`: hulpstukken van deze film |
| 1241–1368 | `SCENES`: title 1242 · s01 1244 · s04 1250 · s05 1259 · s06 1268 · s07 1276 · s08 1284 · s09 1292 · s10 1298 · s12 1302 · s13 1305 · s14 1314 · s15 1319 · s16 1325 · s18 1336 · s19 1342 · s20 1349 · s21 1357 |
| 1369–1536 | `GLOSSARY` en `player.js` (havo slaat vwo-segmenten over) |

## Hoe je de film aanpast

- **Tekst van een alinea:** wijzig `script_v2.md`, draai `make_segments.py`, neem alleen die take opnieuw op (stem-invoer staat in `segments.json` → `voice`), haal woordtijden op met Scribe en `align.py`, zet de mp3 genormaliseerd in `audio/` en bouw opnieuw.
- **Een antwoordoptie of vraagtekst:** opties in `script_v2.md` bij `[VRAAG]`, vraagtekst en uitleg in `film.py`; geen nieuwe opname nodig (behalve als het juiste antwoord verschuift: dat noemt de audio).
- **Een beeld:** `scenes.js` (zie regelnummers hierboven); cues hangen aan woorden via `q.on('woord', n)` (n = de hoeveelste keer dat het woord in die alinea voorkomt; het zoekt op deel van het woord, dus 'groter' vindt ook 'grotere').
- **Checkvragen of docentdeel:** `film.py` → `python3 film.py` → `build.py`.

## Aandachtspunten

- Uitspraak: zie `uitspraak.md`. Een blinde controle (losse transcriptie van de echte takes) was in deze sessie niet mogelijk; de risicowoorden staan op de wachtlijst voor Kamiel.
- Alleen thyroxine (T4) heet bij naam; T3 en de omzetting in weefsels zijn weggelaten (zie het docentdeel).
- De grafiek met stoten groeihormoon is een model, geen meting.
- Eindreview: 15 punten; verwerkt: s14, s18 en s19 opnieuw ingesproken (inhoud), diagnosepanelen met kop en labels, Graves-balken met normaallijn, rem in s12 zichtbaar, slaap in de grafiek, groeihormoon ook naar het bot, terugboog in de recap eerder, labels in s08/s09/s13 verplaatst, struma-tag bij de hals, antwoordmodel checkvraag 3a. Niet verwerkt: de hartslagmeter in s08 staat kort in beeld (ruimte), het einde van de recap heeft geen extra hold.

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

`label()` tekent geen lijntje + stip meer naar de naam; de naam staat direct naast het onderdeel (nieuwe functie `naamBij()` uit Celorganellen, met donkere rand rond de letters). De oude aanroepen `label(ctx, naam, meta, ax, ay, lx, ly, …)` werken nog: de richting ax,ay → lx,ly bepaalt aan welke kant de naam komt. Opnieuw geplaatst (eigen `naamBij(...)` of andere richting): 'schildklier'. Gecontroleerd op stills van alle scènes met namen. Ook doorgevoerd in `bron/src/lib.js` en `bron/src/scenes.js`.


## Wijziging 19–20 okt 2026: alinea's opnieuw ingesproken na de uitspraaktest

Kamiel koos in de uitspraaktest (18–19 okt, 4 rondes) hoe de risicowoorden moeten klinken. Alleen de alinea's met die woorden zijn opnieuw ingesproken; de gesproken tekst is inhoudelijk gelijk gebleven.

| Woord | Nieuwe stem-invoer | Alinea's | Status |
|---|---|---|---|
| Graves | Graves (gewone spelling) | s16 | goedgekeurd (uitspraaktest 18–19 okt 2026) |

- Opnieuw ingesproken: s16. Roos (7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea, ElevenLabs-flow `urmsa8zcNa5TFq8SVeBI` ("Herinspreken 19 okt · voeding, hormonen, voortplanting"). Stem-invoer = `voice` in `segments.json` (gemaakt met `make_segments.py` en de bijgewerkte vervangregels in `bouw/uitspraak_subs.json`).
- Woordtijden: Scribe (connect_from = de TTS-node) → `align.py` → `stem/woordtijden/`. Mastering: `loudnorm=I=-15:TP=-1.5`, mono 44,1 kHz 96 kb/s.
- Credits: TTS 528, Scribe ≈ 213 (≈ 39 s audio).
- In de HTML (`window.FILMDATA`) zijn alleen bij deze segmenten `words` en `dur` vervangen en heeft de audio-URL `?v=2` gekregen; speler en beelden zijn ongewijzigd. Getest met Playwright (vwo/havo, Vragen aan/uit): geen JS-fouten, nieuwe audio laadt.
- Niet aangepast: woorden die niet in de test zaten houden hun vorige stem-invoer, zodat ze in de hele film hetzelfde klinken (bijv. "receptor" zoals geschreven, terwijl de centrale lijst "reseptor" geeft).

| Segment | TTS-node | Generatie | Credits | Duur |
|---|---|---|---|---|
| s16 | AfewTdzTU2okXeR6bR0G | Z5JYWbM9zpxEqbyJqeGw | 528 | 39.17 s |
