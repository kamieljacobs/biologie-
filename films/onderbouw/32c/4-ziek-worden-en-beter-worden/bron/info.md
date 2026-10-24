# Ziek worden en beter worden — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/32c/4-ziek-worden-en-beter-worden/index.html` (audio in `audio/`: 11 mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, 32C (gezond leven) film 4 van 4 |
| Kerndoel | 32C (SLO, nov. 2025): *De leerling toont inzicht in leefstijl, lichamelijke- en mentale gezondheid en reflecteert hierop.* Bullet 3 (ziektes ontstaan, voorkómen, behandelen) en 4 (technologie: vaccins, medicijnen) |
| Doelgroep / niveau | onderbouw leerjaar 1–3, gemengde groepen. Basislijn eenvoudig; één blok **uitdaging** (s09: groepsbescherming). Schakelaar **Basis / Uitdaging** (`?niveau=basis`). Nergens havo/vwo/vmbo genoemd |
| Versie / datum | 1.0 · 20 oktober 2026 |
| Prompt | v6 |
| Stem / model | Roos (ElevenLabs, voice_id `7qdUFMklKPaaAVMsBTBt`), model `eleven_v4`, één take per alinea, flow `O8wNfZQ7r4HMts55GNv0` |
| Woordtijden | ElevenLabs Scribe (`eleven_scribe_v1`) op dezelfde takes; alle 11 takes woord voor woord gelijk aan de stem-invoer |
| Duur | audio 177 s; speeltijd Uitdaging ± 4:00, Basis ± 3:45 (met vragen) |
| Credits | TTS ± 2750 tekens |
| Beeldstijl | Part C, vlak, geen grain. Waterpokkenvirus koraal (`pokVirus`), witte bloedcellen lichtgrijs met paarse kern (`witteCel`), antistoffen als teal Y-vormpjes (`antistof`), geheugencellen goud (`geheugenCel`), vaccin als spuitje met oker inhoud (`spuitje`). Rode draad: Teun met waterpokken in de woonkamer (Macro-dag), de **antistoffengrafiek** eerste keer (teal, laag en laat) / tweede keer (goud, hoog en snel). Verder: Bilal niest op het schoolplein; Teun met vier ingangen; tijdlijn tot klachten; bloedvat met witte bloedcellen en antistoffen; twee vakken "stukje" en "verzwakt"; Dr. Kim als arts in 1796; aardbol zonder pokken; 48 poppetjes met één baby (groepsbescherming; telpictogrammen); thermometer en twee vakken 37/39 °C; paracetamolkaart; antibioticum werkt / werkt niet. Gedeelde 32C-tekeningen in `src/lib_32c.js` |
| Audio-opslag | losse mp3's per take, gemasterd naar −16 LUFS (ffmpeg loudnorm, 128 kbps) |
| Herkomst | uitlegfilm-prompt v6 Part D; reeksmodus zonder checkpoint, 20 okt 2026 |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `brief.md` · `docentdeel.md` · `begrippen.json` · `uitspraak.md` · `index_entry.json` · `tts_schatting` | brief, docentdeel (wordt bij het bouwen HTML), begrippen, uitspraak-wachtlijst, site-item |
| `script_v2.md` | het script (bron van alles); `script_v1.md` vóór de reviews; `reviews/` de reviewpasses; `script.md` de ingesproken tekst per take met filmtijd |
| `stem/segmenten_stem-invoer.json` | per segment `display` en `voice`; vragen met antwoord en uitleg |
| `stem/woordtijden/sNN.json` · `stem/generaties.json` · `stem/tts.json` · `stem/scribe.json` | woordtijden · generatie-id en duur · flow en sessies |
| `filmdata.json` | de data zoals ingebed in de film |
| `src/scenes_32c4.js` · `src/lib_32c.js` | scènes en film-eigen tekeningen · gedeelde 32C-tekeningen (zelfde bestand in alle 32C-films) |
| `src/config.json` · `src/vragen.json` · `src/uitspraak_film.json` | titel, meta, `mini`, `hold`, checkvragen · vraagteksten · film-eigen stem-regels |
| `src/head.html`, `src/lib.js`, `src/helpers.js`, `src/lib_cast.js`, `src/player_block.html`, `src/tail.html` | gedeelde onderbouw-onderdelen (speler met snelheid, Vragen aan/uit en spelerfix; overgenomen van 32A film 9) |
| `bouw/` | bouwstraat van 32A film 9 plus `bronmd.py` (script.md + regelnummers), `info_gemeen.py`, `deploy.py` (film + bron + index.html), `push.sh` (rebase en push) |

**Werkmap opzetten:** maak een map met `script_v2.md`, `docentdeel.md`, `begrippen.json`, en `vragen.json` en `uitspraak_film.json` (uit `src/`), plus `src/` en `stem/`; zet `_base/` (head, lib, helpers, tail) en `_engine/player_block.html` naast `bouw/` en pas de paden bovenin `bouw/bouw.py` aan. Dan: `python3 bouw/maak_segmenten.py .` → `python3 bouw/bouw.py .` → `film/index.html`; audio in `film/audio/`.

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Macro-dag (woonkamer) | Teun met rode vlekjes, "waterpokken"; Noor zwaait; kaart "Noor, toen ze klein was" met kleine Teun-figuur met vlekjes; vraagteken |
| q02 | Cold open | vraag | krijgt Noor het weer? |
| s03 | Titel | Schema | titel, spuitje, virus, witte bloedcel, antistof |
| s04 | H1 Ziek worden | Macro-dag → Schema | Bilal niest, druppeltjes met virus naar Teun; Teun groot met vier ingangen (neus en mond, handen, eten, wondje); virussen verdubbelen, "infectie"; tijdlijn: eerst niets, na ± 2 weken klachten |
| s05 | H2 Beter worden, en onthouden | Micro (bloedvat) → Schema | witte bloedcellen ruimen virussen op; antistoffen plakken eraan; grafiek eerste keer (± een week, ziek) en tweede keer (meteen veel, niet ziek) met geheugencellen; Noor zwaait |
| s06 | H2 | Schema | geheugencellen, "oefenen zonder ziek te worden?", spuitje, vraagteken |
| q07 | H2 | vraag | wat zit er in een vaccin? |
| s08 | H2 | Schema | vakken "stukje" en "verzwakt", witte bloedcel met antistoffen, geheugencellen, "soms even een zere arm"; het jaar 1796 met Dr. Kim; kaart vaccins voor kinderen; aarde zonder pokken |
| s09 | H2, uitdaging | Schema | 48 poppetjes, baby in goud ("te jong voor een vaccin"), groen = gevaccineerd, virus komt niet verder; haak "groepsbescherming" |
| s10 | H3 Behandelen | Macro-dag | Teun op de bank, thermometer stijgt, "39 °C", vraagteken |
| q11 | H3 | vraag | is koorts slecht? |
| s12 | H3 | Schema → woonkamer → Schema | 37 °C (veel virussen) tegen 39 °C (minder, witte bloedcel); "erg hoog of lang? naar de dokter"; Teun op de bank: rust, veel drinken, paracetamolkaart; antibioticum: bacteriën werkt, virus werkt niet |
| s13 | Samenvatting | Schema | vier kaarten (ziek worden, beter worden, onthouden, vaccin); haak "een vaccin voorkomt dat je ziek wordt" |
| s14 | Eindkaart | Schema | Probeer het zelf: prikkaart, verspreidingsspel, uitvinding; denkvraag griep elk jaar; 12 s |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q02 | Noor had vroeger waterpokken. Krijgt ze het weer? | ja, ze speelt met hem · alleen zonder handen wassen · nee, haar lichaam onthoudt de ziekteverwekker | c |
| q07 | Wat zit er in een vaccin? | onschadelijk stukje of verzwakte vorm · de echte ziekteverwekker · een medicijn dat doodt | a |
| q11 | Teun heeft 39 graden koorts. Is koorts slecht? | maakt de ziekteverwekker sterker · helpt je afweer · betekent dat je afweer verliest | b |
| eindkaart | Waarom kun je griep elk jaar opnieuw krijgen, en waterpokken maar één keer? | open (opzoeken) | — |

## Begrippen

infectie, afweer, witte bloedcellen, antistoffen, vaccin · uitdaging: groepsbescherming.

## Waar wat in de HTML zit (`index.html`, versie 1.0)

Geen blobs: `film.src.html` = `index.html`, regelnummers zijn gelijk.

- checkvragen: regel 96
- docentdeel: regel 110
- FILMDATA: regel 150
- lib_32c (gedeelde 32C-tekeningen): regel 904
- scènes van deze film: regel 967
- const SCENES: regel 987
- GLOSSARY: regel 1094
- drawChapterCard: regel 1168
- scènefuncties: `s01` 989, `s03` 996, `s04` 1000, `s05` 1018, `s06` 1034, `s08` 1038, `s09` 1051, `s10` 1060, `s12` 1065, `s13` 1077, `s14` 1083

## Zo pas je deze film aan

1. **Een scène**: functie `sNN` in `SCENES` (`src/scenes_32c4.js`); cues hangen aan woorden via `q.at('woord', n)`; draai `bouw/cuecheck.py . scenes_32c4.js` na een wijziging. Gedeelde tekeningen in `src/lib_32c.js`.
2. **Eén alinea opnieuw inspreken**: Roos, eleven_v4, één take, stem-invoer uit `voice`; Scribe op die take; `audio/sNN.mp3` (−16 LUFS) en `stem/woordtijden/sNN.json` vervangen; `bouw.py`.
3. **Vraag**: opties in `script_v2.md`, vraagtekst/goed/uitleg in `src/vragen.json`; dan `maak_segmenten.py` en `bouw.py`.
4. **Basis of uitdaging**: [VWO-START] … [VWO-END] in `script_v2.md` (intern `level: vwo`, in beeld 'uitdaging'); checkvraag/begrip met `"uitdaging": true`.
5. **Docentdeel**: `docentdeel.md` (alles vóór "## Checkvragen"); checkvragen in `src/config.json`.
6. Na elke bouw: `python3 scripts/spelerfix.py --check <film>`.

## Uitspraak

Gewone spelling (eleven_v4); jaartal als "in het jaar 1796". Blinde Scribe-controle: alles kwam terug zoals bedoeld. **Wachtlijst:** waterpokken, vaccin, antistoffen, geheugencellen, Jenner (s08), pokken (s08), groepsbescherming (s09), paracetamol (s12), negenendertig (s10). Zie `uitspraak.md`.

## Aandachtspunten

- Reviewpasses door de bouwer zelf (geen aparte helper beschikbaar); zie `reviews/`.
- De film is kort (basis ± 3:45, uitdaging ± 4:00), aan de onderkant van de 4–6 minuten.
- De 48 poppetjes in de uitdaging zijn telpictogrammen (toegestaan volgens BEELDAFSPRAKEN).
- De eindvraag (griep elk jaar) gaat verder dan de film: leerlingen zoeken op dat het griepvirus steeds verandert.
