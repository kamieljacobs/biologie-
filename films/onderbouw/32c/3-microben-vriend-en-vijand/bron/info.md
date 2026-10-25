# Microben: vriend en vijand — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/32c/3-microben-vriend-en-vijand/index.html` (audio in `audio/`: 10 mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, 32C (gezond leven) film 3 van 4 |
| Kerndoel | 32C (SLO, nov. 2025): *De leerling toont inzicht in leefstijl, lichamelijke- en mentale gezondheid en reflecteert hierop.* Bullet 2 (invloed van bacteriën, schimmels en virussen op gezond leven), raakt 4 (technologie: penicilline) |
| Doelgroep / niveau | onderbouw leerjaar 1–3, gemengde groepen. Basislijn eenvoudig; één blok **uitdaging** (s11: resistentie). Schakelaar **Basis / Uitdaging** (`?niveau=basis`). Nergens havo/vwo/vmbo genoemd |
| Versie / datum | 1.0 · 20 oktober 2026 |
| Prompt | v6 |
| Stem / model | Roos (ElevenLabs, voice_id `7qdUFMklKPaaAVMsBTBt`), model `eleven_v4`, één take per alinea, flow `qVr67qKTNcHwoWyo9T7a` |
| Woordtijden | ElevenLabs Scribe (`eleven_scribe_v1`) op dezelfde takes; alle 10 takes woord voor woord gelijk aan de stem-invoer |
| Duur | audio 198 s; speeltijd Uitdaging ± 4:20, Basis ± 4:05 (met vragen) |
| Credits | TTS ± 2890 tekens |
| Beeldstijl | Part C, vlak, geen grain. Drie vaste microben in de hele film: staafje (`bact`, teal; vriend groen, ziekteverwekker koraal), vertakte schimmeldraad (`schimmelDraad`, grijs; groeit), virus (`virusje`, koraal met paarse bouwtekening). Rode draad: een **weegschaal vriend · vijand** (`weegschaal`) die in titel, H2 en samenvatting volloopt. Noor voor de badkamerspiegel; drie kolommen met haar als maatstok; huidoppervlak met bacteriën; dikke darm als buis met vezels en vitamine K; Dr. Kim (labjas) met petrischaal en schimmel, gele zone zonder bacteriën; groeiboom (×2 per 20 min) en teller; voet met schimmel; virus dat een cel binnendringt; Sam met griep; tabel bacterie/virus; darm met afstervende goede bacteriën; resistentie met één gouden overlever. Gedeelde 32C-tekeningen in `src/lib_32c.js` |
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
| `src/scenes_32c3.js` · `src/lib_32c.js` | scènes en film-eigen tekeningen · gedeelde 32C-tekeningen (zelfde bestand in alle 32C-films) |
| `src/config.json` · `src/vragen.json` · `src/uitspraak_film.json` | titel, meta, `mini`, `hold`, checkvragen · vraagteksten · film-eigen stem-regels |
| `src/head.html`, `src/lib.js`, `src/helpers.js`, `src/lib_cast.js`, `src/player_block.html`, `src/tail.html` | gedeelde onderbouw-onderdelen (speler met snelheid, Vragen aan/uit en spelerfix; overgenomen van 32A film 9) |
| `bouw/` | bouwstraat van 32A film 9 plus `bronmd.py` (script.md + regelnummers), `info_gemeen.py`, `deploy.py` (film + bron + index.html), `push.sh` (rebase en push) |

**Werkmap opzetten:** maak een map met `script_v2.md`, `docentdeel.md`, `begrippen.json`, en `vragen.json` en `uitspraak_film.json` (uit `src/`), plus `src/` en `stem/`; zet `_base/` (head, lib, helpers, tail) en `_engine/player_block.html` naast `bouw/` en pas de paden bovenin `bouw/bouw.py` aan. Dan: `python3 bouw/maak_segmenten.py .` → `python3 bouw/bouw.py .` → `film/index.html`; audio in `film/audio/`.

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Schema (badkamer) | Noor voor de spiegel, bacteriën op haar huid (vergroot), balken bacteriën ± cellen, vraagteken |
| q02 | Cold open | vraag | zijn alle bacteriën slecht? |
| s03 | Titel | Schema | titel, weegschaal vriend · vijand, bacterie en virus |
| s04 | H1 Drie soorten microben | Schema | "microben"; kolommen bacterie (haar als maat, 1000 op 1 mm), schimmel (gist, draden, brood), virus (bouwtekening, 10–100× kleiner, alleen in een cel) |
| s05 | H2 Vrienden | Micro (huid) → Schema | huidbacteriën houden de plek bezet, ziekteverwekker vindt geen plek; dikke darm: vezels afgebroken, vitamine K; het jaar 1928, Dr. Kim met petrischaal, schimmel, bacteriën rondom dood |
| q06 | H2 | vraag | waarom gingen de bacteriën dood? |
| s07 | H2 | Schema | penicilline-ringen uit de schimmel, het eerste antibioticum, tank in een fabriek |
| s08 | H3 Vijanden | Schema → Micro | groeiboom ×2 per 20 min, "na 7 uur meer dan 1 000 000", eten te lang warm / koelkast; voet met schimmel; virus dringt cel binnen, nieuwe virussen, naar de volgende cel; Sam met griep, pil met vraagteken |
| q09 | H3 | vraag | helpt een antibioticum tegen griep? |
| s10 | H3 | Schema | bacterie: antibioticum werkt / virus: werkt niet; darm: ook goede bacteriën dood; "alleen als het echt nodig is" |
| s11 | H3, uitdaging | Schema | 24 bacteriën, antibioticum, één gouden overlever ("toevallig verschil") die zich deelt: "resistent"; verwijzing naar de film Antibioticaresistentie |
| s12 | Samenvatting | Schema | drie microben, weegschaal vriend (huid, darm, medicijn) zwaarder dan vijand; "Nee, lang niet." |
| s13 | Eindkaart | Schema | Probeer het zelf: broodproef, vriend of vijand?, bijsluiter; denkvraag "alle bacteriën in huis doodmaken?"; 12 s |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q02 | Zijn alle bacteriën slecht? | ja, alle bacteriën maken je ziek · bacteriën wonen alleen op vieze plekken · nee, de meeste zijn onschuldig, en veel helpen je zelfs | c |
| q06 | Rond de schimmel gingen de bacteriën dood. Hoe kan dat? | de schimmel at de bacteriën op · de schimmel maakte een stof die bacteriën doodt · de schimmel hield het licht tegen | b |
| q09 | Sam heeft griep, door een virus. Helpt een antibioticum? | nee, antibiotica werken alleen tegen bacteriën · ja, antibiotica doden alle microben · ja, als hij het maar lang genoeg slikt | a |
| eindkaart | Alle bacteriën in huis doodmaken met sterke middelen: goed idee? | open | — |

## Begrippen

microben, bacterie, schimmel, virus, antibioticum · uitdaging: resistent.

## Waar wat in de HTML zit (`index.html`, versie 1.0)

Geen blobs: `film.src.html` = `index.html`, regelnummers zijn gelijk.

- checkvragen: regel 96
- docentdeel: regel 110
- FILMDATA: regel 148
- lib_32c (gedeelde 32C-tekeningen): regel 902
- scènes van deze film: regel 965
- const SCENES: regel 980
- GLOSSARY: regel 1095
- drawChapterCard: regel 1169
- scènefuncties: `s01` 982, `s03` 993, `s04` 997, `s05` 1014, `s07` 1035, `s08` 1043, `s10` 1065, `s11` 1072, `s12` 1078, `s13` 1086

## Zo pas je deze film aan

1. **Een scène**: functie `sNN` in `SCENES` (`src/scenes_32c3.js`); cues hangen aan woorden via `q.at('woord', n)`; draai `bouw/cuecheck.py . scenes_32c3.js` na een wijziging. Gedeelde tekeningen in `src/lib_32c.js`.
2. **Eén alinea opnieuw inspreken**: Roos, eleven_v4, één take, stem-invoer uit `voice`; Scribe op die take; `audio/sNN.mp3` (−16 LUFS) en `stem/woordtijden/sNN.json` vervangen; `bouw.py`.
3. **Vraag**: opties in `script_v2.md`, vraagtekst/goed/uitleg in `src/vragen.json`; dan `maak_segmenten.py` en `bouw.py`.
4. **Basis of uitdaging**: [VWO-START] … [VWO-END] in `script_v2.md` (intern `level: vwo`, in beeld 'uitdaging'); checkvraag/begrip met `"uitdaging": true`.
5. **Docentdeel**: `docentdeel.md` (alles vóór "## Checkvragen"); checkvragen in `src/config.json`.
6. Na elke bouw: `python3 scripts/spelerfix.py --check <film>`.

## Uitspraak

Gewone spelling (eleven_v4); jaartal als "in het jaar 1928". Blinde Scribe-controle: alles kwam terug zoals bedoeld. **Wachtlijst:** microben, micro-organismen, bacterie(n), virus(sen), penicilline (s07), antibioticum/antibiotica, Fleming (s05), vitamine K (s05), resistent (s11). Zie `uitspraak.md`.

## Aandachtspunten

- Reviewpasses door de bouwer zelf (geen aparte helper beschikbaar); zie `reviews/`.
- De volgorde van de antwoordopties is na de bouw gewisseld (eerst was b steeds goed); de opties worden niet voorgelezen, dus de audio bleef gelijk (`bouw/herorden.py`).
- Dr. Kim speelt de onderzoeker in 1928 (Fleming zelf wordt niet als persoon getekend).
- Groeiboom tekent maximaal 7 rijen (64 bacteriën); de teller zegt "meer dan 1 000 000".

## Wijziging 25 okt 2026

- Eindkaart 'Probeer het zelf' (gesproken zin + kaart met opdracht) vervangen door de kaart 'Onthoud' met drie kernzinnen; het eindfragment is nu stilte (woorden leeg). Reden: prompt v10 aanvulling, geen verwijzingen naar tools of opdrachten in de film, vooral niet uitgesproken (Kamiel 25 okt 2026). De bron (scenes, filmdata, script.md) is op dezelfde manier aangepast.
