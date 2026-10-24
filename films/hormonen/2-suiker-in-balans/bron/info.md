# Suiker in balans — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/hormonen/2-suiker-in-balans.html (audio in films/hormonen/2-suiker-in-balans/audio/) |
| Reeks / nummer | Hormonen, film 2 van 5 (seriebrief in de Claude-doc *Seriebriefs uitlegfilms biologie*) |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blokken gelabeld: s15 (GLUT4, signaaltransductie, exocytose, gefaciliteerde diffusie) en s23 (insulineresistentie op celniveau, spierwerk). Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 14 oktober 2026 (zelfstandig gebouwd in reeksmodus; wacht op review door Kamiel) |
| Prompt | onbekend · gemaakt 14 okt |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow CgRoGtnJYhFRTTdQRHak; nodes en sessies in `stem/takes.json`) |
| Duur | spraak 8:55 (vwo) / 7:31 (havo). Speeltijd met kaarten en vier vragen: vwo ≈ 11 min, havo ≈ 9½ min |
| Beeldstijl | Part C: Macro (klaslokaal met Sanne en "jij"), Schema (regelkring, grafieken, bak met kraan, kaarten), Micro (eilandje van Langerhans, spiercel met GLUT4). Seriekleuren `HK`: hormonen goud (insuline afgerond vierkant, glucagon ruit, adrenaline druppel), glucose en glycogeen teal, bètacellen licht oker, alfacellen groen, bloed rood |
| Audio-opslag | 19 losse mp3's in audio/ (s01 … s24), loudnorm −15 LUFS, piek −1,5 dBTP, mono 44,1 kHz 96 kb/s |
| Herkomst | gebouwd op 14 oktober 2026 met dezelfde bouwstraat als film 1; `lib_hormonen.js` uitgebreid met `kringSchema`, `eilandje`, `cel`, `glycogeenKeten`, `telefoon`, `sensor`, `insulinePomp`, `klasAchtergrond`, `schoolbank` |

## Bronbestanden in deze map

Zelfde indeling als film 1: `script_v1.md` (vóór de reviews), `script_v2.md` (definitief), `script.md` (per take), `segments.json`, `film.py` → `film.json`, `checkpoint.html`, `uitspraak.md`, `stem/` (woordtijden, takes, generaties), `src/` (`scenes.js` + bibliotheken, speler, pagina), `bouw/` (scripts en respellings), `reviews/` (expert, didactiek, curriculum, eindreview).

**Werkmap opzetten:** maak `f2/` met `script_v2.md`, `film.py`, `scenes.js`, `words/` (= `stem/woordtijden/`) en `film/2-suiker-in-balans/audio/` (= `../audio/`); zet de overige `src/`-bestanden en `bouw/*` in `engine/`. Dan: `python3 engine/make_segments.py f2 script_v2.md && (cd f2 && python3 film.py) && python3 engine/build_data.py f2 && python3 engine/build.py f2`.

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open (s01, q02) | I · Macro | Sanne met sensor naast "jou"; telefoon met glucosegrafiek bij Sanne; vraag q02 |
| H1 Eén suikerklontje (s04–s05) | D · Schema | Bloed met glucose; hersenen 120 g/dag; ≈ 5 g in al je bloed (suikerklontje), in ≈ 1 uur op; dagcurve met normband 4–8 en drie maaltijden |
| H2 De regelkring (s06–s15) | D · Schema + Micro | Regelkring opgebouwd (waarde, sensor + regelcentrum, signaal, effector); eilandje met bèta- en alfacellen; insuline na het ontbijt (q08); lever, spieren, vetweefsel; lever stopt glucose-afgifte; hersencellen; bak (kraan = lever, afvoer = spieren en vet); negatieve terugkoppeling met lopende puls; glucagon en levercel, spierglycogeen alleen voor de spier; glucagon tegenover glycogeen; insuline omlaag, glucagon en adrenaline omhoog. Vwo s15: spiercel met insulinereceptor, GLUT4 in blaasjes → membraan, glucose naar binnen |
| H3 Als de kring hapert (s16–s23) | D + I · Schema + Macro | Type 1: afweercellen, bètacellen verdwijnen, pijl met kruis; glucosecurve zonder behandeling boven de nierdrempel, nier met glucose en water; Sanne met sensor en pomp, hypo, dextro's (q18) en curve dextro tegenover boterham; type 2 (q21): insulinestaven gezond / begin / na jaren, risicofactoren, bewegen. Vwo s23: minder GLUT4, spierwerk via een andere route |
| Recap (s24) | Schema + Macro | Complete kring met insuline en glucagon naast Sanne met sensor en pomp; Regelkring-tool |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Hoe blijft jouw bloedsuiker binnen nauwe grenzen? | b je lichaam meet het zelf en stuurt het bij |
| q08 | basis | Wat doet insuline met de glucose? | b laat je cellen glucose uit het bloed opnemen |
| q18 | basis | Waarom dextro's en niet een boterham met kaas? | a dextro's zijn glucose, die snel in je bloed komt |
| q21 | basis | Insuline bij type 2? | b juist veel insuline |

Antwoordopties staan alleen op het scherm (niet ingesproken); de letters van de juiste antwoorden worden wel genoemd in s09, s19 en s22.

Checkvragen: 1 Regelkring aanvullen · 2 Glucosetolerantietest (tabel P, Q, R) · 3 Schrik op de fiets (adrenaline) · 4 GLUT4 en sporten bij type 2 (vwo).

## Waar wat in de HTML zit

| Regel | Inhoud |
|---|---|
| 7–65 | Fonts (base64) en CSS |
| 69 | Sitebalk `<nav class="sitenav">` met "← Terug naar Regeling" |
| 76–100 | Speler: canvas, ondertitelband, knoppen, Havo/Vwo- en Leerling/Klas-schakelaar |
| 101–148 | Checkvragen (101–116), Voor de docent (117–148) |
| 149 | `window.FILMDATA` — segmenten, woordtijden, vragen, titelkaart (uit `build_data.py`) |
| 150–371 | `lib.js`: Part C-tokens, `label`, `zoomCircle`, `human` |
| 372–942 | `lib_voeding.js` (gebruikt: `lichaam`, `glycogen`, `hexagon`, `proteinChain`, `coilPath`, `arrow`, `klok`, `padPunt`, `gladC`) |
| 943–1191 | `lib_hormonen.js`: seriebibliotheek (`person`, `HK`, `hormoonVorm`, `receptor`, `doelcel`, `hartMeter`, `klierKaart`, `bloedLus`, `grafiek`, `bakKraan`, `kringSchema`, `eilandje`, `cel`, `glycogeenKeten`, `telefoon`, …) |
| 1192–1231 | `scenes.js`: hulpstukken van deze film |
| 1232–1387 | `SCENES`: title 1233 · s01 1236 · s04 1248 · s05 1256 · s06 1266 · s07 1274 · s09 1281 · s10 1290 · s11 1298 · s12 1304 · s13 1313 · s14 1319 · s15 1325 · s16 1332 · s17 1341 · s19 1349 · s20 1354 · s22 1358 · s23 1368 · s24 1376 |
| 1388–1555 | `GLOSSARY` en `player.js` (havo slaat vwo-segmenten over) |

## Hoe je de film aanpast

- **Tekst van een alinea:** wijzig `script_v2.md`, draai `make_segments.py`, neem alleen die take opnieuw op (stem-invoer in `segments.json` → `voice`), haal woordtijden op (Scribe, `align.py`), zet de genormaliseerde mp3 in `audio/` en bouw opnieuw.
- **Antwoordopties of vraagteksten:** `script_v2.md` bij `[VRAAG]` en `film.py`; geen nieuwe opname nodig zolang de juiste letter gelijk blijft.
- **Een beeld:** `scenes.js`; cues hangen aan woorden via `q.on('woord', n)`.
- **De regelkring** (`glucoseKring` in `scenes.js`) gebruikt `kringSchema` uit `lib_hormonen.js`; films 3–5 gebruiken hetzelfde schema met andere knopen.

## Aandachtspunten

- Uitspraak: zie `uitspraak.md` (wachtlijst). Geen blinde transcriptie mogelijk in deze sessie.
- De grafieken zijn modellen (dagcurve, uren zonder behandeling, dextro tegenover boterham, insulinestaven); zie het docentdeel.
- Eindreview: punten 1–5 verwerkt (glucagonpijl, glucagon in het schema, glycogeen teal, eigen insulinevorm, telefoon bij Sanne) plus de meeste kleine punten. Niet verwerkt: personages blijven in de vaste zithouding; pijlpunten raken bij twee knopen nét het label.

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

`label()` tekent geen lijntje + stip meer naar de naam; de naam staat direct naast het onderdeel (nieuwe functie `naamBij()` uit Celorganellen, met donkere rand rond de letters). De oude aanroepen `label(ctx, naam, meta, ax, ay, lx, ly, …)` werken nog: de richting ax,ay → lx,ly bepaalt aan welke kant de naam komt. Alle namen stonden na de omzetting al goed; geen aanroepen verplaatst. Gecontroleerd op stills van alle scènes met namen. Ook doorgevoerd in `bron/src/lib.js` en `bron/src/scenes.js`.
