# Levenscyclus: genen en milieu — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/32b/1-levenscyclus-genen-en-milieu/index.html`. De audio staat in `audio/`: 11 mp3's, niet ingebed. |
| Reeks / nummer | Kerndoelen onderbouw, 32B film 1 (Voortbestaan). Kerndoel 32B bullet 1: *beschrijven van de levenscyclus van organismen en de invloed van het milieu en genetica hierop*. Bron: SLO, definitieve conceptkerndoelen mens en natuur, nov. 2025, bijlage Eerste Kamer. |
| Doelgroep / niveau | Onderbouw leerjaar 1–3, gemengde groepen. De basislijn is eenvoudig, met één blok **uitdaging** (s12: Siamese kat). Schakelaar **Basis / Uitdaging** (`?niveau=basis`). Nergens staat havo of vwo genoemd. |
| Versie / datum | 1.0 · 20 oktober 2026 |
| Stem / model | Roos (ElevenLabs, voice_id `7qdUFMklKPaaAVMsBTBt`), model `eleven_v4`, één take per alinea. Flow `EoqdfaXayfV478V7NNrz`. De generatie-id's staan in `stem/generaties.json`. |
| Woordtijden | ElevenLabs Scribe (`eleven_scribe_v1`), per take. Alle 11 takes kloppen woord voor woord met de stem-invoer. |
| Duur | 189 s audio. Speeltijd met vragen en hoofdstukkaarten: Uitdaging ± 4:15, Basis ± 3:55. Met Vragen uit ± 3:25. |
| Credits | TTS ± 2670 (tekens). Scribe: de tool meldde 0. |
| Beeldstijl | Part C, vlak. Rode draad: twee boontjes in Noors moestuin (Macro-dag `tuinDag`, `schuur`, `schaduwVlak`). `boonPlant(g, etiol)` groeit en verbleekt geleidelijk. Cycli als ring (`cyclusRing`). De erfelijke informatie is een paarse streep met vakjes (`genStreep`). De celkern heeft chromatinedraden (`kernDraden`). Verder: sloten warm/koud met kikkervisjes, hortensia's in potten, de Siamese kat met een warmtekaart. Personages uit lib_cast. |
| Audio-opslag | Losse mp3's per take, gemasterd naar −16 LUFS (ffmpeg loudnorm, 128 kbps). |
| Herkomst | Uitlegfilm-prompt v6, Part D, plus BEELDAFSPRAKEN. Reeksmodus zonder checkpoint, 20 okt 2026. |

## Bronbestanden

| Map / bestand | Inhoud |
|---|---|
| `brief.md` · `docentdeel.md` · `begrippen.json` · `uitspraak.md` · `index_entry.json` · `tts_schatting` | Brief en pagina-inhoud. |
| `script_v2.md` | Het script; dit is de bron van alles. `script_v1.md` is de versie vóór de reviews. `reviews/` bevat de reviewpasses en de eindcontrole. `script.md` is de ingesproken tekst per take, met filmtijd. |
| `stem/segmenten_stem-invoer.json` | Per segment `display` en `voice`, plus de vragen met antwoord en uitleg. |
| `stem/woordtijden/sNN.json` · `stem/generaties.json` | Woordtijden (Scribe) · generatie-id en duur per take. |
| `filmdata.json` | De data zoals ingebed in de film. |
| `src/lib32b.js` | Gedeelde tekeningen voor de 32B-films: tuin, boon, kikker, hortensia, kat, cyclusring, genstreep en meer. |
| `src/scenes1.js` | De scènes van deze film. |
| `src/config.json` · `src/vragen.json` · `src/uitspraak_film.json` | Titel, meta, `mini`, `hold` en checkvragen · vraagteksten · film-eigen stemregels (die zijn er niet). |
| `src/_base/` | `head.html`, `lib.js`, `helpers.js`, `tail.html` en `player_block.html`: de onderbouwspeler (kopie van film 32A-9, met spelerfix). |
| `bouw/` | Bouwstraat: `maak_segmenten.py`, `haal_audio.py`, `woordtijden.py`, `bouw.py`, `cuecheck.py`, `shots.py`, `speeltest.py`, `index_invoegen.py`, `maak_scriptmd.py` en `publiceer.py`. De paden bovenin wijzen naar de werkmap van 20 okt; pas ze aan. |

**Werkmap opzetten:**
1. Maak een map `ob32b/` met `_base/` (inhoud van `src/_base/` behalve player_block), `_engine/player_block.html` en `_tools/rangeserver.py`, en `bouw/`.
2. Maak een filmmap met `script_v2.md`, `docentdeel.md`, `begrippen.json`, `src/` en `stem/`.
3. Zet `stem/segmenten_stem-invoer.json` daar als `segmenten.json`.
4. Draai `python3 bouw/maak_segmenten.py <film>` en dan `python3 bouw/bouw.py <film>`. Dat geeft `film/index.html`; de audio hoort in `film/audio/`.

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Macro-dag: tuin | Noor en opa Henk zaaien. Boontje in de zon / in de schaduw van de schuur. "3 weken later": groen en stevig tegenover lang, dun en bleek. Vraagteken. |
| q02 | Cold open | vraag | Waarom zo verschillend? |
| s03 | Titel | Schema | Titel met twee groeiende boontjes. |
| s04 | H1 Van zaad tot zaad | Schema | Cyclusring: zaadje → kiemplant → bloemen → peulen → nieuwe zaadjes. Druppel en thermometer bij "water en warmte". |
| s05 | H1 | Schema | Kikkercyclus in de sloot (eitjes, kikkervisje, met pootjes, kikker). Mens: baby, Teun, Noor, Dr. Kim met een terugpijl. |
| s06 | H2 Genen en milieu | Schema → Micro → Schema → Macro-dag | Boon wordt boonplant, zonnebloem doorgestreept. Cel met kern en draden, genstreep, gen in goud. Noor en Teun met genstreep. Milieu: licht, water, voedsel, temperatuur. De twee boontjes: "bijna dezelfde genen", "te weinig licht". |
| s07 | H2 | Schema | Daan en Lotte bij een meetlat (genen + voedsel). Sam traint, spieren in koraal. Kaart "zijn kind, later?" |
| q08 | H2 | vraag | Erft het kind getrainde spieren? |
| s09 | H3 Het milieu doet mee | Schema → Macro-dag | Sam: spieren veranderd, genen niet. Sloot warm/koud met kikkervisjes. Opa Henk met stekjes, twee hortensia's, dezelfde genen. |
| q10 | H3 | vraag | Waarom blauw en roze? |
| s11 | H3 | Macro-dag | Hortensia's in zure en kalkrijke grond, "zelfde genen, ander milieu". |
| s12 | H3, uitdaging | Schema | Siamese kat; warmtekaart (warm/licht, koel/donker); gen voor donkere haren. |
| s13 | Samenvatting | Schema | Drie kaarten (zaad, kikker, mens); "van je ouders" tegenover "van je omgeving"; "allebei". |
| s14 | Eindkaart | Schema | Probeer het zelf: licht of donker, levenscyclus-strip, genen of milieu; open vraag. Blijft 12 s staan. |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q02 | Twee boontjes, zon/schaduw: waarom verschillend? | andere genen · de plek is anders · de ene is ouder | b |
| q08 | Erft Sams kind getrainde spieren? | ja · nee, getrainde spieren erf je niet · ja, maar minder sterk | b |
| q10 | Hortensia's uit stekjes, blauw en roze: hoe kan dat? | andere grond · toch andere genen · roze is ziek | a |
| eindkaart | Plant in een donkere kast wordt lang en bleek: genen of milieu? | open | — |

## Begrippen
levenscyclus, eigenschap, erfelijke informatie, gen, milieu · uitdaging: genen en milieu samen. Ze staan in `GLOSSARY` op regel 1151.

## Waar wat in de HTML zit (`index.html`, versie 1.0)

Er zijn geen blobs: `film.src.html` = `index.html`.

- Paginatekst (kop, speler, checkvragen, docentdeel): regel 1–142.
- `window.FILMDATA`: regel 143.
- Tekenbibliotheek (`lib.js`, `helpers.js`, `lib_cast.js`) vanaf regel 144.
- `lib32b.js` vanaf ± regel 900: `tuinDag` 905, `boonPlant` 922, `hortensia` 941, `kikkerEi` 950, `kikkervisje` 952, `kikker` 956, `siamees` 961, `cyclusRing` 979, `genStreep` 989, `kernDraden` 1000.
- Scènes: `bonenTuin` 1007, `const SCENES` 1010.
  - `s01` 1012, `s03` 1022, `s04` 1027, `s05` 1041, `s06` 1055, `s07` 1085
  - `s09` 1098, `s11` 1118, `s12` 1125, `s13` 1132, `s14` 1142
- `GLOSSARY` 1151; de speler daarna.

## Zo pas je deze film aan

1. **Tekeningen:** pas `src/lib32b.js` aan (gedeeld; de andere 32B-films hebben elk een eigen kopie) of `src/scenes1.js`.
2. **Eén alinea opnieuw inspreken:**
   - Roos, eleven_v4, één take.
   - Daarna Scribe op die take.
   - Vervang `audio/sNN.mp3` (−16 LUFS) en `stem/woordtijden/sNN.json`.
   - Draai `bouw.py` en `cuecheck.py`. Cues hangen aan woorden via `q.at('woord', n)`.
3. **Vraag:** pas `script_v2.md` en `src/vragen.json` aan, en draai daarna `maak_segmenten.py` en `bouw.py`.
4. **Basis of uitdaging:** gebruik `[VWO-START] … [VWO-END]` in het script (intern `level: vwo`, in beeld "uitdaging"). Checkvragen en begrippen krijgen `"uitdaging": true`.
5. Na elke bouw: `python3 scripts/spelerfix.py --check <film>`.

## Uitspraak

Gewone spelling, gecontroleerd met blinde Scribe. **Wachtlijst:**
- hortensia's (s09)
- Siamese (s12)
- kikkervisje (s05, s09)
- ontkiemt (s04)
- levenscyclus (s03, s04, s05, s09, s13)
- kalkrijke (s11)

Zie `uitspraak.md`.

## Aandachtspunten
- De film bouwt alleen op *Alles is cel* (celkern). Hoe de genen van twee ouders samenkomen, komt in film 2 en film 6.
- Het onderzoekje "licht of donker" op de eindkaart is nog geen werkblad op de site.
- De eindcontrole is niet door een aparte helper gedaan (zie `reviews/review_eind.md`).
