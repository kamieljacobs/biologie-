# Voeding en beweging — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/32c/1-voeding-en-beweging/index.html` (audio in `audio/`: 12 mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, 32C (gezond leven) film 1 van 4 |
| Kerndoel | 32C (SLO, definitieve conceptkerndoelen mens en natuur, nov. 2025): *De leerling toont inzicht in leefstijl, lichamelijke- en mentale gezondheid en reflecteert hierop.* Bullet 1 (voeding, beweging), 4 (technologie: astronautentraining), 5 (reflecteren: alleen in de opdrachten) |
| Doelgroep / niveau | onderbouw leerjaar 1–3, gemengde groepen. Basislijn eenvoudig; één blok **uitdaging** (s10: getraind hart). Schakelaar **Basis / Uitdaging** (`?niveau=basis`). Nergens havo/vwo/vmbo genoemd |
| Versie / datum | 1.0 · 20 oktober 2026 |
| Stem / model | Roos (ElevenLabs, voice_id `7qdUFMklKPaaAVMsBTBt`), model `eleven_v4`, één take per alinea, flow `mF15qFmJ0Ef3j0svE88t` (`stem/tts.json`, `stem/generaties.json`) |
| Woordtijden | ElevenLabs Scribe (`eleven_scribe_v1`) op dezelfde takes (`stem/scribe.json`); alle 12 takes woord voor woord gelijk aan de stem-invoer |
| Duur | audio 215 s; speeltijd Uitdaging ± 4:40, Basis ± 4:25 (met vragen) |
| Credits | TTS ± 3160 tekens |
| Beeldstijl | Part C, vlak, geen grain. Rode draad: **drie vakken** (brandstoffen koraal, bouwstoffen oker, beschermende stoffen groen) die in H1 vollopen en in de samenvatting terugkomen; zeilschip bij nacht (cold open, scheurbuik, citroenen); ruimtestation met zwevende astronaut (Daan) en een **botdoorsnede** waarvan de sponsbalkjes dunner worden; trainen aan boord (loopband met elastieken, krachtapparaat); schoolplein (Sam, Noor, Lotte op de fiets). Personages uit lib_cast: Opa Henk (zeeman), Daan, Lotte, Sam, Noor. Gedeelde 32C-tekeningen in `src/lib_32c.js` (eten-iconen, Schijf van Vijf, bot, spier, hart, zee, ruimte, schoolplein) |
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
| `src/scenes_32c1.js` · `src/lib_32c.js` | scènes van deze film · gedeelde 32C-tekeningen |
| `src/config.json` · `src/vragen.json` · `src/uitspraak_film.json` | titel, meta, `mini`, `hold`, checkvragen · vraagteksten · film-eigen stem-regels (geen) |
| `src/head.html`, `src/lib.js`, `src/helpers.js`, `src/lib_cast.js`, `src/player_block.html`, `src/tail.html` | gedeelde onderbouw-onderdelen (speler mét snelheid, Vragen aan/uit en spelerfix; overgenomen van 32A film 9) |
| `bouw/` | bouwstraat van 32A film 9, plus `concat_scribe.py`/`split_scribe.py` (niet gebruikt), `bronmd.py` (script.md + regelnummers) en `deploy.py` (film + bron + index.html) |

**Werkmap opzetten:** maak een map met `script_v2.md`, `docentdeel.md`, `begrippen.json`, `vragen.json` en `uitspraak_film.json` (uit `src/`), `src/` en `stem/`; zet `_base/` (head, lib, helpers, tail) en `_engine/player_block.html` naast de map `bouw/` en pas de paden bovenin `bouw/bouw.py` aan. Dan: `python3 bouw/maak_segmenten.py .` → `python3 bouw/bouw.py .` → `film/index.html`; audio in `film/audio/`.

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Schema → Macro-nacht | "Wat heeft je lichaam echt nodig?" met eten; zeilschip, inzet met vat, beschuit en vlees; Opa Henk als zieke zeeman (bloedend tandvlees, doodmoe) |
| q02 | Cold open | vraag | wat ontbrak de zeelui? |
| s03 | Titel | Schema | titel, eten-iconen, Lotte zwaait |
| s04 | H1 Drie taken van je eten | Schema | drie vakken: brandstoffen (bliksem, brood, rijst, aardappel, boter, olie), bouwstoffen (muurtje blokjes, eiwitten; vis, vlees, ei, bonen, noot, melk), beschermende stoffen (schild, vitamines en mineralen, "geen energie", "een heel klein beetje", bot = calcium, sinaasappel = vitamine C) |
| s05 | H1 | Macro-nacht → Schema | vak "energie ✓ vitamine C ✗", fruit en groente, het jaar 1747, citroenen naar het schip, Henk beter; water en vezels (darm in beweging); "geen product heeft alles"; Schijf van Vijf |
| s06 | H2 Gebouwd om te bewegen | Macro-nacht (ruimte) | ruimtestation, Daan zweeft, botdoorsnede met vraagteken |
| q07 | H2 | vraag | wat gebeurt er met zijn botten? |
| s08 | H2 | Schema → ruimte | bot met dunner wordende balkjes, balken "maand 1–6", spier wordt dunner; "bot leeft": belasten → sterker, weinig → zwakker; trainen aan boord: loopband met elastieken, krachtapparaat (Lotte), "± 2 uur per dag", "techniek" |
| s09 | H2 | Macro-dag (schoolplein) | Sam en Noor; sterkere botten, hart en longen, beter slapen; kaart Gezondheidsraad; Lotte op de fiets |
| s10 | H2, uitdaging | Schema | kloppend hart, balken "per slag" niet getraind/getraind, ± 70 → ± 50 in rust |
| s11 | H3 Eten en bewegen samen | Schema | Sam (sportdag), beenspier wordt dikker, vraagteken |
| q12 | H3 | vraag | waarvan maakt hij extra spier? |
| s13 | H3 | Schema | signaal-pijl, eiwit-blokjes de spier in (bouwstoffen), brandstoffen-vak; haak "eten en bewegen werken samen" |
| s14 | Samenvatting | Schema → Macro-nacht | drie vakken + water en vezels; bot en spier "gebruiken maakt sterker"; citroen en sinaasappel bij het schip |
| s15 | Eindkaart | Schema | Probeer het zelf: etiketspeurtocht, beweegdagboek, ruimtetraining; denkvraag astronaut; 12 s |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q02 | De zeelui hadden genoeg eten aan boord, maar werden toch ziek. Wat ontbrak er? | genoeg energie · een stof uit vers fruit en groente · genoeg drinkwater | b |
| q07 | Een astronaut zweeft een half jaar in de ruimte. Wat gebeurt er met zijn botten? | sterker · zwakker · niets | b |
| q12 | Sams beenspieren worden sterker. Waar maakt zijn lichaam die extra spier van? | suiker · eiwitten · vet | b |
| eindkaart | Een astronaut komt terug op aarde. Waarom moet hij weer leren lopen, en wat helpt? | open | — |

## Begrippen

brandstoffen, bouwstoffen, beschermende stoffen, vezels, Schijf van Vijf, bot leeft · uitdaging: hartslag in rust.

## Waar wat in de HTML zit (`index.html`, versie 1.0)

Geen blobs: `film.src.html` = `index.html`, regelnummers zijn gelijk.

- checkvragen: regel 96
- docentdeel: regel 110
- FILMDATA: regel 149
- lib_32c (gedeelde 32C-tekeningen): regel 903
- scènes van deze film: regel 966
- const SCENES: regel 973
- GLOSSARY: regel 1099
- drawChapterCard: regel 1174
- scènefuncties: `s01` 975, `s03` 987, `s04` 992, `s05` 1011, `s06` 1030, `s08` 1035, `s09` 1055, `s10` 1064, `s11` 1070, `s13` 1075, `s14` 1084, `s15` 1090

## Zo pas je deze film aan

1. **Tekeningen**: eten-iconen, `schijf`, `botDoorsnede`, `spierBundel`, `hartje`, `nachtZee`, `zeilschip`, `ruimte`, `ruimtestation`, `schoolplein`, `fiets` in `src/lib_32c.js` (gedeeld met de andere 32C-films); `VAKKEN`/`drieVakken` en alle scènes in `src/scenes_32c1.js`.
2. **Een scène**: functie `sNN` in `SCENES`; cues hangen aan woorden via `q.at('woord', n)`; draai `bouw/cuecheck.py . scenes_32c1.js` na een wijziging.
3. **Eén alinea opnieuw inspreken**: Roos, eleven_v4, één take, stem-invoer uit `voice`; Scribe op die take; `audio/sNN.mp3` (−16 LUFS) en `stem/woordtijden/sNN.json` vervangen; `bouw.py`.
4. **Vraag**: in `script_v2.md` (opties) en `src/vragen.json` (vraagtekst, goed, uitleg), dan `maak_segmenten.py` en `bouw.py`.
5. **Basis of uitdaging**: [VWO-START] … [VWO-END] in `script_v2.md` (intern `level: vwo`, in beeld 'uitdaging'); checkvraag/begrip met `"uitdaging": true`.
6. **Docentdeel**: `docentdeel.md` (alles vóór "## Checkvragen"); checkvragen in `src/config.json`.
7. Na elke bouw: `python3 scripts/spelerfix.py --check <film>`.

## Uitspraak

Gewone spelling (eleven_v4); jaartal als "in het jaar 1747". Blinde Scribe-controle: alle takes kwamen terug zoals bedoeld. **Wachtlijst:** scheepsbeschuit (s01), vitamine(s) (s04, s05, s14), mineralen (s04), calcium (s04), Schijf van Vijf (s05), 1747 (s05), Gezondheidsraad (s09). Zie `uitspraak.md`.

## Aandachtspunten

- De reviewpasses en de eindreview zijn in deze sessie door de bouwer zelf gedaan (er was geen aparte helper beschikbaar); zie `reviews/`.
- Geen dieet- of caloriedoelen; reflectie zit in het beweegdagboek (eindkaart, docentdeel).
- Opa Henk speelt de zeeman uit 1747 (vast personage, geen eigen poppetje).
- Etiketspeurtocht, beweegdagboek en ruimtetraining zijn nog geen werkblad of tool op de site.
