# Antistoffen op maat — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/afweer/2-antistoffen-op-maat.html (audio in films/afweer/2-antistoffen-op-maat/audio/) |
| Reeks / nummer | Bescherming en afweer, film 2 van 4 (seriebrief in de Claude-doc *Seriebriefs uitlegfilms biologie*) |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blokken gelabeld: s08 (genstukjes, diversiteit, eigen B-cellen uitgeschakeld) en s14 (bouw van een antistof, T-helpercel geeft startsein). Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.0 · 14 oktober 2026 (zelfstandig gebouwd in reeksmodus; wacht op review door Kamiel) |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow WDDkZooQMTSMDrONtSkX; nodes in `stem/takes.json`) |
| Duur | spraak 6:40 (vwo) / 5:37 (havo). Speeltijd met kaarten en vragen: vwo ≈ 9 min, havo ≈ 8 min |
| Beeldstijl | Part C: Macro (woonkamer met Noor en Sam), Micro (virus met antigenen, B-cellen met receptor-'sleutels', beenmerg, lymfeknoop met kloon, plasmacel met antistoffen, neutraliseren, klonteren, fagocyt), Schema (genstukjes, bouw van een antistof, grafiek primaire/secundaire reactie, vergelijkingstabel). Kleuren in `scenes.js`: ziekteverwekkers `VIR #E07A5F`, B-cellen `BCOL #5BA4C9`, T-cellen `TCOL #7FC48F`, antistoffen `AS #E0B64A`, eigen cellen `EIGEN #8C7BBF`, griep `#C9708F`; antigeenvormpjes in `VORMKL` |
| Audio-opslag | 15 losse mp3's in audio/ (s01 … s21), loudnorm −15 LUFS, piek −1,5 dBTP, mono 44,1 kHz 96 kb/s; niet in de HTML ingebed |
| Lettertypen | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 — ingebed als base64 |
| Herkomst | gebouwd op 14 oktober 2026 met de bouwstraat van de voedingsreeks (`bouw/`) en de bibliotheek `lib_hormonen.js` (algemene helpers) |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script met leerdoelen, misconcepties, getallen en wat de reviews veranderden. Lege regel = nieuwe alinea = nieuwe take. `script_v1.md` = vóór de reviews |
| `script.md` | Tekst per take met duur en audiobestand |
| `segments.json` | Uitvoer van `make_segments.py`: per alinea `display` (ondertitel), `voice` (stem-invoer met respellings) en `vmap` |
| `film.py` + `sections.html` → `film.json` | Titel, vraagteksten met juist antwoord, begrippen; checkvragen en docentdeel staan in `sections.html` |
| `checkpoint.html` | Zelfcheck: contactsheets uit de speler, wat de reviews veranderden, script |
| `uitspraak.md` | Risicowoorden met stem-invoer; wachtlijst voor Kamiel |
| `stem/woordtijden/sNN.json` | Woordtijden per take (Scribe, op de ondertitelwoorden) |
| `stem/takes.json`, `stem/gen.json` | ElevenLabs-flow en node per take; generatie-id en duur |
| `src/` | `scenes.js` (deze film), `lib.js`, `lib_voeding.js`, `lib_hormonen.js`, `player.js`, `page.html`, `fonts.css` |
| `bouw/` | `make_segments.py`, `align.py`, `build_data.py`, `build.py`, `stills.py`, `fake_words.py`, `uitspraak_subs.json` |
| `reviews/` | Expert (immunoloog), didactiek + taal, curriculum (met checkvragen), eindreview `eind.md` (fresh eyes, na de bouw) |

**Werkmap opzetten:** maak `a2/` met `script_v2.md`, `film.py`, `sections.html`, `scenes.js` (uit `src/`), `words/` (= `stem/woordtijden/`) en `film/2-antistoffen-op-maat/audio/` (= `../audio/`); zet `src/*.js` (behalve scenes.js), `src/page.html`, `src/fonts.css` en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py a2 script_v2.md && (cd a2 && python3 film.py) && python3 engine/build_data.py a2 && python3 engine/build.py a2` → `a2/film/2-antistoffen-op-maat.html`.

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open (s01, q02) | I · Macro | Woonkamer: Sam (5) met waterpokken op de bank, zijn grote zus Noor; vraag q02 |
| Titel | Micro | Plasmacel die antistoffen (gouden Y's) afgeeft; virus met antistoffen erop |
| H1 Een sleutel voor elk slot (s04–s08) | D · Micro | Fagocyt (aspecifiek) tegenover B-cel (specifiek); virus met antigenen en eigen cel met eigen antigenen; B-cel met receptoren, sleutel ↔ slot; rij B-cellen met elk een eigen sleutel; vraag q06; beenmerg maakt steeds nieuwe B-cellen, de passende wordt gekozen (meestal een paar). Vwo s08: V-, D- en J-genstukjes willekeurig gecombineerd; B-cel die op eigen stoffen past wordt uitgeschakeld |
| H2 Kopiëren en vastplakken (s09–s14) | D · Micro | Lymfeknoop (wordt dik) met lymfevat; passende B-cel licht op; T-helpercel geeft startsein; kloon; plasmacel, receptor = antistof (losse kopie), Y met twee bindplaatsen, ± 2000 per seconde, humorale afweer; neutraliseren; klonteren; vraag q12; bacterie met antistoffen als vlaggetje, fagocyt ruimt op. Vwo s14: zware en lichte ketens, constant en variabel deel; B-cel presenteert antigeen, T-helpercel geeft startsein |
| H3 Onthouden (s15–s20) | D · Schema | Plasmacellen en geheugencellen (★); grafiek antistoffen tegen tijd: primaire reactie (ziek), 2e besmetting; vraag q16; secundaire reactie, immuun; tabel fagocyten (aspecifiek) tegenover B-cellen (specifiek); vraag q19; griepvirus muteert, geheugencel past net niet; waterpokkenvirus verandert bijna niet |
| Recap (s21) | Macro | Woonkamer met de antwoordketen; addertje: virus verstopt zich in zenuwcellen → gordelroos → T-cellen (film 3) |
| Eindkaart (s22) | Schema | Drie kernzinnen |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Waarom wordt Noor niet ziek van de waterpokken van Sam? | a haar lichaam onthoudt het virus nog van de vorige keer (onthulling in de recap s21) |
| q06 | basis | Hoe komt je lichaam aan een B-cel die past op een virus dat het nooit heeft gezien? | a er zijn al heel veel soorten B-cellen, en één past |
| q12 | basis | Wat gebeurt er met een bacterie waar antistoffen op zitten? | b de bacterie zit vast, en een fagocyt eet hem makkelijker op |
| q16 | basis | Hoe ziet de grafiek eruit bij een tweede besmetting? | a een piek die eerder komt, en veel hoger is |
| q19 | basis | Waarom kun je griep elk jaar opnieuw krijgen? | c het griepvirus verandert steeds een beetje van vorm |

De antwoordopties worden niet ingesproken; ze staan alleen op het scherm (uit het script, `[VRAAG]`). De onthulling ("Antwoord aa/bee/cee") staat wél in de audio van s07, s13, s17 en s20.

Checkvragen (statisch in de pagina): 1 Klonale selectie · 2 Twee keer besmet (tabel) · 3 Antistoffen en fagocyten (experiment met serum, 5 buizen) · 4 Bouw van een antistof (vwo).

Begrippen: antigeen, specifieke afweer, lymfocyt, B-cel, receptor, klonale selectie, kloon, plasmacel, antistof, humorale afweer, neutraliseren, samenklonteren, geheugencel, primaire en secundaire afweerreactie, immuun; vwo: immunoglobuline, zware en lichte keten, constant en variabel deel, T-helpercel.

## Waar wat in de HTML zit (regelnummers in `2-antistoffen-op-maat.html`)

| Regel | Inhoud |
|---|---|
| 7–65 | Fonts (base64) en CSS |
| 69 | Sitebalk `<nav class="sitenav">` met "← Terug naar Afweer" |
| 76–99 | Speler: canvas, ondertitelband, knoppen, Havo/Vwo- en Leerling/Klas-schakelaar |
| 100–149 | Checkvragen (100–118), Voor de docent (119–149) |
| 150 | `window.FILMDATA` — segmenten, woordtijden, vragen, titelkaart (uit `build_data.py`) |
| 151–372 | `lib.js`: Part C-tokens, `label`, `zoomCircle`, `human` |
| 373–943 | `lib_voeding.js` (gebruikt: `lichaam`, `glycogen`, `hexagon`, `proteinChain`, `coilPath`, `arrow`, `klok`, `padPunt`, `gladC`) |
| 944–1194 | `lib_hormonen.js`: seriebibliotheek (`person`, `HK`, `hormoonVorm`, `receptor`, `doelcel`, `hartMeter`, `klierKaart`, `bloedLus`, `grafiek`, `bakKraan`, `kringSchema`, `eilandje`, `cel`, `glycogeenKeten`, `telefoon`, …) |
| 1195–1276 | `scenes.js`: hulpstukken van deze film |
| 1277–1460 | `SCENES`: title 1278 · s01 1283 · s04 1289 · s05 1312 · s07 1315 · s08 1327 · s09 1338 · s10 1352 · s11 1376 · s13 1377 · s14 1387 · s15 1410 · s17 1421 · s18 1438 · s20 1440 · s21 1449 |
| 1461–1628 | `GLOSSARY` en `player.js` (havo slaat vwo-segmenten over) |

## Hoe je de film aanpast

- **Tekst van een alinea:** wijzig `script_v2.md`, draai `make_segments.py`, neem alleen die take opnieuw op (stem-invoer staat in `segments.json` → `voice`), haal woordtijden op met Scribe en `align.py`, zet de mp3 genormaliseerd in `audio/` en bouw opnieuw.
- **Een antwoordoptie of vraagtekst:** opties in `script_v2.md` bij `[VRAAG]`, vraagtekst en uitleg in `film.py`; geen nieuwe opname nodig (behalve als het juiste antwoord verschuift: dat noemt de audio).
- **Een beeld:** `scenes.js` (zie regelnummers hierboven); cues hangen aan woorden via `q.on('woord', n)` (n = de hoeveelste keer dat het woord in die alinea voorkomt; het zoekt op deel van het woord, dus 'specifieke' vindt eerst 'aspecifieke' en 'Hoe' eerst 'hoeveelheid').
- **Figuren:** `virus(ctx, x, y, r, [vormpjes], t, {col, rot, ast})` (ast(i) = alpha van een antistof op uitsteeksel i), `bCel(ctx, x, y, r, vorm, t, {soort: 'b'|'plasma'|'geheugen', glow, rec, label})`, `tCel`, `antistof(ctx, x, y, schaal, hoek, alpha, kleur)` (armen wijzen bij hoek 0 omhoog), `sleutel` (receptor) en `antigeen` met vormnummer 0–6 (`vormPad`), `fagocyt`, `bacterie`, `kamer` (woonkamer met Noor en Sam), `afweerGrafiek` met `antiCurve` (primaire piek 8, secundaire 100).
- **Checkvragen of docentdeel:** `sections.html` → `python3 film.py` → `build.py`.

## Aandachtspunten

- Uitspraak: zie `uitspraak.md`, vooral bee-cel, tee-helpercel, limfosieten, reseptoren, kloonaale, "letter ei", immunoglobuline en humorale. Een blinde controle was in deze sessie niet mogelijk.
- In de grafiek is de primaire piek bewust klein (secundaire ≈ 12×), passend bij "10 tot 100 keer zoveel".
- Eindreview: 12 punten, alle verwerkt zonder nieuwe opname (zie `reviews/eind.md`).

## Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen

`label()` tekent geen lijntje + stip meer naar de naam; de naam staat direct naast het onderdeel (nieuwe functie `naamBij()` uit Celorganellen, met donkere rand rond de letters). De oude aanroepen `label(ctx, naam, meta, ax, ay, lx, ly, …)` werken nog: de richting ax,ay → lx,ly bepaalt aan welke kant de naam komt. Opnieuw geplaatst (eigen `naamBij(...)` of andere richting): 'antigeen', 'constant deel', 'variabel deel', 'stukje antigeen'. Gecontroleerd op stills van alle scènes met namen. Ook doorgevoerd in `bron/src/lib.js` en `bron/src/scenes.js`.


## Wijziging 19–20 okt 2026: alinea's opnieuw ingesproken na de uitspraaktest

Kamiel koos in de uitspraaktest (18–19 okt, 4 rondes) hoe deze woorden moeten klinken. Opnieuw ingesproken: **s04, s09, s13, s17** (alleen deze alinea's; de rest van de audio is ongewijzigd). Stem-invoer = de oude invoer van die alinea met alleen deze woorden vervangen (inhoud gelijk):

| Woord | Oude stem-invoer | Nieuwe stem-invoer | Alinea's |
|---|---|---|---|
| fagocyt(en) | `faagosieten` | `fagocyt / fagocyten` | s04, s13, s17 |
| klonale | `kloonaale` | `klonale` | s09 |

Roos (7qdUFMklKPaaAVMsBTBt), eleven_v4, één take per alinea (flow WDDkZooQMTSMDrONtSkX; nieuwe nodes in `stem/takes.json`, generatie-id's en duur in `stem/gen.json` met `heropname: uitspraaktest 19 okt 2026`). TTS-credits: 1925; Scribe-woordtijden (eleven_scribe_v1) per take, op de ondertitelwoorden uitgelijnd met `align.py` (alle takes ratio 1,0, geen verschillen); ruwe transcripten in `stem/status_timing_uitspraak_19okt.json`. In de HTML zijn alleen de woordtijden en `dur` van deze segmenten in `window.FILMDATA` vervangen (speler, beeld en cues ongewijzigd; de ondertitels waren al goed). `segments.json` (voice + vmap) en de duren in `script.md` zijn bijgewerkt. Bij opnieuw bouwen: de nieuwe invoer staat in `segments.json`; `bouw/uitspraak_subs.json` heeft de oude respellings voor deze woorden niet meer.

## Versie 1.1 · 20 oktober 2026 (beeld na feedback Kamiel)

Alleen beeld, geen nieuwe audio; script, vraagteksten en timing gelijk. Helpers overgenomen uit film 1 (`antigeen` met normaal, `bacterie`, `fagocyt`, `lymfeknoop`, `wissel`, geen korrels via `grainCanvas`). `lib_cast.js` staat nu in `src/` en wordt door `build.py` meegenomen; in de HTML is `scenes.js` vervangen door `lib_cast.js` + nieuwe `scenes.js` (regelnummers hierboven schuiven daardoor op).
- **Overal:** antigenen staan met de basis óp het oppervlak en loodrecht naar buiten, rondom (virus, bacterie, eigen cel). Receptoren van B-cellen zijn Y's met de voet op het membraan en een hol 'slot' in de vorm van het antigeen aan elke arm; antistoffen hebben dezelfde slots en zitten met één slot precies óm een antigeen (`antistofOp`, `antistofBrug`). Virus kreeg een capside met genoom. Hulpfuncties voor precies aanmeren: `bSlot`/`bDock`, `virusDock`, `tDock`.
- **s01, s21 (woonkamer):** grijze poppetjes vervangen door Noor (castboek, met bal) en het jongere broertje getekend als het castpersonage 'kind' (Teun-figuur; in het verhaal heet hij Sam) met waterpokvlekjes op gezicht, handen en benen. Uitdrukkingen volgen de tekst (blij, denkt). s21: bij het addertje een zenuwcel met verstopte virusjes en antistoffen die er niet bij kunnen. Tekstbalken via `wissel`.
- **s04:** het virus meert zichtbaar aan in het slot van een receptor (sleutel ↔ slot, vonkje); eigen cel met eigen antigenen rondom; 'receptor' met `naamBij`.
- **s07:** B-cel probeert steeds tevergeefs te binden (✗). Beenmerg = pijpbeen in doorsnede met rood merg; een stroom nieuwe B-cellen met elk een andere sleutel; de passende cel wordt gekozen en meert aan, bij 'verschillende antigenen' meert een tweede passende B-cel aan op een ander antigeen. Tekstbalken via `wissel`.
- **s08 (vwo):** de gekozen V-, D- en J-stukjes schuiven echt uit de rij naar elkaar toe; nieuwe B-cel krijgt zijn receptoren. Een B-cel die op een eigen cel past meert daaraan aan en wordt uitgeschakeld (krimpt, ✗).
- **s09:** boonvormige lymfeknoop (uit film 1) met aanvoerend lymfevat; virussen komen binnen, één meert aan bij de passende B-cel; T-helpercel komt erbij en geeft het startsein; daarna echte klonale deling in vier rondes (1 → 16 cellen). Eén tekstbalk tegelijk.
- **s10:** plasmacel (met ER-lagen) stoot gouden Y's uit; receptor = antistof met dezelfde slots, antigeen valt erin; grote Y met bindplaatsen (`naamBij`). Neutraliseren: antistoffen vliegen in en gaan op de antigenen zitten, het virus probeert bij de lichaamscel aan te meren maar lukt niet (✗). Klonteren: antistoffen als bruggen tussen antigenen van twee virussen.
- **s11, s13:** bacterie met antistoffen op de antigenen; 'vlaggetje' = gouden gloed aan de stelen; fagocyt komt aanschuiven, omsluit de bacterie in een blaasje en lysosomen breken hem af (timing iets eerder, zodat het binnen de alinea af is).
- **s14 (vwo):** antigenen vallen in de bindplaatsen van de immunoglobuline; namen verplaatst. Antigeenpresentatie: MHC-bakjes met een stukje antigeen op de B-cel, de T-helpercel meert met het slot van zijn receptor precies op dat stukje en geeft het startsein (B-cel licht op).
- **s15, s17:** B-cellen veranderen zichtbaar in plasmacellen (met uitgestoten antistoffen) of geheugencellen; in de grafiek staan 'primaire' en 'secundaire afweerreactie' als naam bij de piek in plaats van zwevende balken; één tekstbalk tegelijk.
- **s20:** de antigenen van het griepvirus veranderen in beeld van vorm (mutatie); het virus probeert in het slot van de geheugencel te passen en past net niet (✗); het waterpokkenvirus meert wel precies aan (✓).
- Bewust gelaten: s05 en s18 (korte vraagscènes, alleen nieuwe virus- en B-celtekening), de tabel in s17, de grafiek zelf (vorm en getallen) en de titelkaart.
