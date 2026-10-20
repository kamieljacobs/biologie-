# Slaap, natuur en hygiëne — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/32c/2-slaap-natuur-en-hygiene/index.html` (audio in `audio/`: 11 mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, 32C (gezond leven) film 2 van 4 |
| Kerndoel | 32C (SLO, nov. 2025): *De leerling toont inzicht in leefstijl, lichamelijke- en mentale gezondheid en reflecteert hierop.* Bullet 1 (slaap, natuur, hygiëne), raakt 3 (ziektes voorkómen); 5 (reflecteren) alleen in de opdrachten |
| Doelgroep / niveau | onderbouw leerjaar 1–3, gemengde groepen. Basislijn eenvoudig; één blok **uitdaging** (s08: melatonine). Schakelaar **Basis / Uitdaging** (`?niveau=basis`). Nergens havo/vwo/vmbo genoemd |
| Versie / datum | 1.0 · 20 oktober 2026 |
| Stem / model | Roos (ElevenLabs, voice_id `7qdUFMklKPaaAVMsBTBt`), model `eleven_v4`, één take per alinea, flow `CjHxxkEDCApL6qmJRkYD` |
| Woordtijden | ElevenLabs Scribe (`eleven_scribe_v1`) op dezelfde takes; alle 11 takes woord voor woord gelijk aan de stem-invoer |
| Duur | audio 207 s; speeltijd Uitdaging ± 4:30, Basis ± 4:15 (met vragen) |
| Credits | TTS ± 3140 tekens |
| Beeldstijl | Part C, vlak, geen grain (ook niet in de Micro-scène: alleen huid en zeep). Rode draad: Noor in haar slaapkamer (nacht → ochtend) met een **24-uursklok** (`klok24`: dag goud, nacht grijsblauw); hoofdprofiel met de klok erin; ochtend buiten tegen avond met scherm (Daan); twee **ziekenhuisramen** (bomen / bakstenen muur) met Opa Henk en Bilal in bed; schoolplein met de cast en een lichtmeter; Dr. Kim als arts in 1847 met sterftegrafiek en chloorwater; hand met ziekteverwekkers (koraal); zeepmoleculen (teal kop, oker staart) rond vetdruppels; tand met tandplak. Gedeelde 32C-tekeningen in `src/lib_32c.js` |
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
| `src/scenes_32c2.js` · `src/lib_32c.js` | scènes en film-eigen tekeningen · gedeelde 32C-tekeningen (zelfde bestand in alle 32C-films) |
| `src/config.json` · `src/vragen.json` · `src/uitspraak_film.json` | titel, meta, `mini`, `hold`, checkvragen · vraagteksten · film-eigen stem-regels |
| `src/head.html`, `src/lib.js`, `src/helpers.js`, `src/lib_cast.js`, `src/player_block.html`, `src/tail.html` | gedeelde onderbouw-onderdelen (speler met snelheid, Vragen aan/uit en spelerfix; overgenomen van 32A film 9) |
| `bouw/` | bouwstraat van 32A film 9 plus `bronmd.py` (script.md + regelnummers), `info_gemeen.py`, `deploy.py` (film + bron + index.html), `push.sh` (rebase en push) |

**Werkmap opzetten:** maak een map met `script_v2.md`, `docentdeel.md`, `begrippen.json`, en `vragen.json` en `uitspraak_film.json` (uit `src/`), plus `src/` en `stem/`; zet `_base/` (head, lib, helpers, tail) en `_engine/player_block.html` naast `bouw/` en pas de paden bovenin `bouw/bouw.py` aan. Dan: `python3 bouw/maak_segmenten.py .` → `python3 bouw/bouw.py .` → `film/index.html`; audio in `film/audio/`.

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Macro-nacht → ochtend | Noor en Lotte wakker bij nacht (klok 2–4 uur, "maar 4 uur slaap"); Noor chagrijnig; Noor in bed, ochtend, "fris wakker", vraagteken |
| q02 | Cold open | vraag | wat doet je lichaam als je slaapt? |
| s03 | Titel | Schema | titel, klok, boom, hand met ziekteverwekkers |
| s04 | H1 Slapen is werken | Macro-nacht → Schema | Noor slaapt; kaarten "hersenen slaan op", "groeien en herstellen", "afweer werkt beter"; klok met boog 8–10 uur; Sam moe; "meer in de film Slaap" |
| s05 | H1 | Schema | hoofdprofiel met klok erin, "biologische klok", wakker → moe |
| q06 | H1 | vraag | wat helpt om goed in slaap te vallen? |
| s07 | H1 | Schema met twee vensters | ochtend buiten (Noor, zon): "klok gelijk"; avond binnen (Daan met scherm, gloed): "klok later → pas laat moe" |
| s08 | H1, uitdaging | Schema | hoofdprofiel, raam donker: melatonine-bolletjes (paars); fel licht: kruis, "fel licht remt melatonine" |
| s09 | H2 Naar buiten | Schema → Macro-dag | het jaar 1984: twee ziekenhuisramen (bomen / muur) met Henk en Bilal, "± 8 dagen", "bijna een dag eerder naar huis"; schoolplein: zes leerlingen, 40 minuten extra buiten, minder bijziend, lichtmeter buiten/binnen; Yasmin en Teun bij de bomen: rustiger, beter slapen |
| s10 | H3 Schone handen | Schema | het jaar 1847 Wenen; Dr. Kim; grafiek sterfte vóór/na; vuile hand; chloorwater; "Ziekmakers? Bestaan niet."; grote hand met ziekteverwekkers, "je ziet ze niet", vraagteken |
| q11 | H3 | vraag | waarom werkt zeep beter dan water? |
| s12 | H3 | Micro (huid) → Schema | vetdruppels met ziekteverwekkers, zeepmoleculen eromheen, spoelen; "zeep spoelt weg, doodt niet alles", "20 seconden"; Bilal hoest in zijn elleboog, schone deurklink; tand met tandplak, tandenborstel |
| s13 | Samenvatting | Schema → slaapkamer | vier kaarten (slapen is werken, daglicht, buiten zijn, zeep); Noor wordt fris wakker, haak "de hele nacht doorgewerkt" |
| s14 | Eindkaart | Schema | Probeer het zelf: slaap- en buitendagboek, glitterproef, uitzicht; denkvraag Semmelweis; 12 s |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q02 | Wat doet je lichaam eigenlijk als je slaapt? | het herstelt, en je hersenen slaan dingen op · niets, het staat even uit · het verteert alleen je eten | a |
| q06 | Wat helpt om 's avonds goed in slaap te vallen? | vlak voor bedtijd nog lang in fel licht kijken · vlak voor bedtijd heel hard sporten · overdag naar buiten, en 's avonds minder fel licht | c |
| q11 | Waarom werkt zeep beter dan alleen water? | zeep is warmer dan water · zeep maakt vet en vuil los, zodat ziekteverwekkers wegspoelen · zeep doodt meteen alle ziekteverwekkers | b |
| eindkaart | Semmelweis wist niets van bacteriën. Hoe kon hij zien dat handen wassen hielp? | open | — |

## Begrippen

biologische klok, hygiëne, ziekteverwekkers, zeep, tandplak · uitdaging: melatonine.

## Waar wat in de HTML zit (`index.html`, versie 1.0)

Geen blobs: `film.src.html` = `index.html`, regelnummers zijn gelijk.

- checkvragen: regel 96
- docentdeel: regel 110
- FILMDATA: regel 150
- lib_32c (gedeelde 32C-tekeningen): regel 904
- scènes van deze film: regel 967
- const SCENES: regel 997
- GLOSSARY: regel 1110
- drawChapterCard: regel 1184
- scènefuncties: `s01` 999, `s03` 1009, `s04` 1013, `s05` 1025, `s07` 1031, `s08` 1040, `s09` 1049, `s10` 1063, `s12` 1078, `s13` 1095, `s14` 1101

## Zo pas je deze film aan

1. **Een scène**: functie `sNN` in `SCENES` (`src/scenes_32c2.js`); cues hangen aan woorden via `q.at('woord', n)`; draai `bouw/cuecheck.py . scenes_32c2.js` na een wijziging. Gedeelde tekeningen in `src/lib_32c.js`.
2. **Eén alinea opnieuw inspreken**: Roos, eleven_v4, één take, stem-invoer uit `voice`; Scribe op die take; `audio/sNN.mp3` (−16 LUFS) en `stem/woordtijden/sNN.json` vervangen; `bouw.py`.
3. **Vraag**: opties in `script_v2.md`, vraagtekst/goed/uitleg in `src/vragen.json`; dan `maak_segmenten.py` en `bouw.py`.
4. **Basis of uitdaging**: [VWO-START] … [VWO-END] in `script_v2.md` (intern `level: vwo`, in beeld 'uitdaging'); checkvraag/begrip met `"uitdaging": true`.
5. **Docentdeel**: `docentdeel.md` (alles vóór "## Checkvragen"); checkvragen in `src/config.json`.
6. Na elke bouw: `python3 scripts/spelerfix.py --check <film>`.

## Uitspraak

Gewone spelling (eleven_v4); jaartallen als "in het jaar …". Blinde Scribe-controle: alles kwam terug zoals bedoeld. **Wachtlijst:** hygiëne (s03, s12), logeerpartij (s01), chagrijnig (s01), Semmelweis (s10), Wenen (s10), chloorwater (s10), ziekteverwekkers (s10, s12, s13), tandplak (s12), bijziend (s09). Zie `uitspraak.md`.

## Aandachtspunten

- Reviewpasses door de bouwer zelf (geen aparte helper beschikbaar); zie `reviews/`.
- Alle mensen zijn vaste personages; Dr. Kim speelt de arts uit 1847 (Semmelweis zelf wordt niet als persoon getekend).
- Geen voorschriften over schermtijd; "fel licht in de avond" is het natuurkundige feit.
- Het uitzicht-onderzoek (1984) is één klein onderzoek; daarom staat het naast het sterkere bijziendheidsonderzoek (docentdeel).
