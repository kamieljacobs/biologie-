# Suiker in balans — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/hormonen/2-suiker-in-balans.html (audio in films/hormonen/2-suiker-in-balans/audio/) |
| Reeks / nummer | Hormonen, film 2 van 5 (seriebrief in de Claude-doc *Seriebriefs uitlegfilms biologie*) |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blokken gelabeld: s15 (GLUT4, signaaltransductie, exocytose, gefaciliteerde diffusie) en s23 (insulineresistentie op celniveau, spierwerk). Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | **1.1 · 28 oktober 2026** — opwaardering naar prompt v13 (B14, zonder keuring): alleen beeld, stem en script ongewijzigd; oude versie in `bron/oud/2-suiker-in-balans-v1.0.html`. 1.0 · 14 oktober 2026 (zelfstandig gebouwd in reeksmodus) |
| Prompt | v13 |
| Voldoet aan | prompt v13 (28 okt 2026, zonder keuring). Bewust niet: Sanne (s01, s17, s24) blijft de eigen getekende figuur, want de stem noemt haar bij naam en wie in het castboek diabetes type 1 krijgt is een nieuwe keuze (vraag aan Kamiel); de afweercellen in s16 blijven witte bolletjes (geen passende T-cel in de beeldbank); geen nieuwe opnames; geen nieuwe caststijl met contourlijnen |
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

## Wijziging 25 okt 2026

- In de recap (s24) de zin 'In de Regelkring-tool op de site kun je de kring zelf verstoren, en kijken hoe hij zich herstelt.' uit de audio geknipt (fragment eindigt na 'gym.') en het label 'Regelkring-tool op de site' weggehaald. Reden: prompt v10 aanvulling, geen verwijzingen naar tools in de film, vooral niet uitgesproken (Kamiel 25 okt 2026). De bron (scenes, filmdata, script.md) is op dezelfde manier aangepast.


## Wijzigingen na 1.1
- 29 okt 2026 — nacontrole 29 okt: s01 Sanne staat naast de schoolbank met de voeten op de vloer en de armen natuurlijk (rechterhand houdt de telefoon voor de borst, links langs het lichaam); de telefoon is op echte maat (≈ 30 × 54 px) in haar hand, de waarde en grafiek staan in een zoomcirkel links (de grote telefoon op schaal 0,55); de bank staat alleen nog voor Noor. Alleen `s01` in `src/scenes.js`, ingebouwd met `films/zenuwstelsel/7-slaap/bron/bouw/inbouw.py <film.html> src/scenes.js "// Hormonen 2 · Suiker in balans — scènes"`.

## Wijzigingen 1.1 (28 okt 2026): opwaardering naar prompt v13 (zonder keuring)

Alleen beeld; stem, script, vragen, tijden en speler ongewijzigd. Site-HTML bijgewerkt door alleen de drie scriptblokken (lib, seriebibliotheken + `lib_cast.js`, `lib_anatomie.js`, `lib_bio.js`, scènes) te vervangen; `bouw/build.py` plakt die bibliotheken nu ook. Contactvel van de gewijzigde scènes bekeken; alle beelden in vwo en havo doorgelopen zonder JS-fouten; vragen afgespeeld met `?vragen=uit`.

- Alle micro-scènes (titel, s06, s07, s15, s16, s23): geen korrel meer over het hele beeld; rustige stipjes alleen binnen een cel (`celTextuur`).
- s01: 'jij' is Noor uit het castboek (zittend aan de bank); geen naam in beeld of stem.
- s04, s10: paarse ovaal met boogjes als 'hersenen' vervangen door het hoofd in doorsnede uit de beeldbank (`hoofdHersenen`).
- s09, s12: lever-, spier- en vetcel geen afgeronde dozen meer maar zachte ronde vormen met rustige textuur (`cel` in lib_hormonen).
- s15, s23 (vwo): recht membraan als band → gebogen fosfolipidendubbellaag uit de beeldbank (`membraanBoog`); GLUT4-blaasjes versmelten met het gebogen membraan; de spiercel is geen rechthoek meer.
- s16: eenvoudige niervorm → nier uit de beeldbank (`nierBijnier`, met urine in de urineleider); glucose en water lopen langs de urineleider.
- s22: 'bewegen helpt' = Noor die van opzij voorbij loopt (castboekgang, steunvoet glijdt niet), op het woord 'Bewegen helpt' (de cue viel eerst al op 'weinig bewegen').
- Bronnenlogboek `bron/bronnen.md` (eerste ronde). Lijsten voor Kamiel: `bron/opwaardering-v13.md`.
- Regelnummers in de HTML sinds 1.1 (de tabel 'Waar wat in de HTML zit' hierboven is van 1.0): FILMDATA 154 · lib.js 155–383 · lib_voeding + lib_hormonen 384–1212 · lib_cast 1213–2025 · lib_anatomie 2026–2299 · lib_bio 2300–10740 · scenes.js 10741–10938 (SCENES 10785) · GLOSSARY en speler vanaf 10939.
