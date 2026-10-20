# Wie woont waar — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/33c/2-wie-woont-waar/index.html` (audio in `audio/`: 12 mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, kerndoel 33C (ecosystemen), film 2 (film 1 = *Hoe vindt een haai zijn prooi?*). Bullet 1: *analyseren van interacties tussen biotische en abiotische factoren in een ecosysteem*. Bron kerndoeltekst: SLO, definitieve conceptkerndoelen mens en natuur (nov. 2025), nagelezen via de Eerste Kamer-bijlage |
| Doelgroep / niveau | onderbouw leerjaar 1–3, gemengde groepen. Basislijn eenvoudig; één blok **uitdaging** (s13: concurrentie, rode vos en poolvos). Schakelaar **Basis / Uitdaging** (`?niveau=basis`). Nergens havo/vwo/vmbo genoemd |
| Versie / datum | 1.0 · 20 oktober 2026 |
| Stem / model | Roos (ElevenLabs, voice_id `7qdUFMklKPaaAVMsBTBt`), model `eleven_v4`, één take per alinea, flow `0rC9Wf6tYEdin87d8Uqn` (`stem/tts.json`, `stem/generaties.json`) |
| Woordtijden | ElevenLabs Scribe (`eleven_scribe_v1`) op dezelfde takes, één transcriptie per take; alle 12 takes woord voor woord gelijk aan de stem-invoer |
| Duur | audio 197 s; speeltijd Uitdaging ± 4:20, Basis ± 3:55 (met vragen); zonder vragen ± 3:25 |
| Credits | TTS 2921 (= tekens); Scribe: de tool meldde 0 |
| Beeldstijl | Part C. **Macro-nacht** voor alle landschappen: zee-ijs met bergen (`poolgebied(ijs)`, ijsschotsen krimpen met `ijs`), woestijn met maan (`woestijn`), schooltuin met boom, steen en zandpad, toendra (`toendra`). **Schema** voor de doorsnede van de ijsbeer (vetlaag), de vergelijkingspanelen, minder ijs → minder eten, de samenvatting en de eindkaart. Kleuren: abiotisch = teal, biotisch = groen, warmte = koraal, focus = goud. Dieren in zijaanzicht, egale vlakken, stip als oog: `ijsbeer` (opties `loop`, `mager`, `dir`), `zeehond`, `vis`, `vos` (ook fennek met `oor:2.4` en poolvos), `pissebed`, `kever`, `lemming`. Personage: Lotte (`outfit:'zomer'`) tilt de steen op. Beeldcheck `stijlframes/beeldcheck_v1.jpg` |
| Audio-opslag | losse mp3's per take, gemasterd naar −16 LUFS (ffmpeg loudnorm, 128 kbps) |
| Herkomst | uitlegfilm-prompt v6 Part D; reeksmodus zonder checkpoint, 20 okt 2026; script v1 → één review (drie passes, `reviews/review.md`) → v2 |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `brief.md` · `docentdeel.md` · `begrippen.json` · `uitspraak.md` · `index_entry.json` · `tts_schatting` | brief, docentdeel (wordt de sectie 'Voor de docent'), begrippen, uitspraakwachtlijst, item voor `index.html` |
| `script_v2.md` | het script (bron van alles); `script_v1.md` vóór de review; `script.md` de ingesproken tekst per take met filmtijd |
| `stem/segmenten_stem-invoer.json` | per segment `display` en `voice`; vragen met antwoord en uitleg |
| `stem/woordtijden/sNN.json` · `stem/generaties.json` · `stem/tts.json` | woordtijden · generatie-id en duur · flow, model, credits |
| `filmdata.json` | de data zoals ingebed in de film |
| `src/scenes2.js` | alle tekeningen en scènes van deze film |
| `src/config.json` · `src/vragen.json` · `src/uitspraak_film.json` | titel, meta, `kerndoel`, `mini`, `hold`, checkvragen · vraagteksten · film-eigen stem-regels (geen) |
| `src/head.html`, `src/lib.js`, `src/helpers.js`, `src/lib_cast.js`, `src/player_block.html`, `src/tail.html` | gedeelde onderbouw-onderdelen (speler met snelheid, Vragen aan/uit en spelerfix) |
| `bouw/` | bouwstraat van 32A film 9, met `bouw.py` (leest `kerndoel` uit config), `index_invoegen.py` (33C) en `installeer.py` (film + bron naar de repo) |

**Werkmap opzetten:** maak een map `ob/` met `_base/` (head.html, lib.js, helpers.js, tail.html uit `src/`), `_engine/player_block.html`, `_tools/rangeserver.py` en `bouw/` (uit `bouw/`); paden staan bovenin `bouw.py`, `maak_segmenten.py`, `shots.py` (pas ze aan). Filmmap `ob/f2/` met `script_v2.md`, `docentdeel.md`, `begrippen.json`, `vragen.json`, `uitspraak_film.json` (uit `src/`), `src/` (config + scenes2.js), `stem/` (woordtijden). Dan: `python3 bouw/maak_segmenten.py f2` → `python3 bouw/bouw.py f2` → `f2/film/index.html`; audio in `f2/film/audio/`. Controle: `python3 bouw/cuecheck.py f2 scenes2.js`, `python3 bouw/shots.py f2 s09 3`, `python3 bouw/speeltest.py f2 8812`.

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Macro-nacht | ijsbeer loopt over het zee-ijs; paneel 'in de woestijn?' met ijsbeer en warmtekringels; vraagteken |
| q02 | Cold open | vraag | waarom gaat het mis in de woestijn? |
| s03 | Titel | Schema | titel, ijsbeer en fennek |
| s04 | H1 Wat een ijsbeer nodig heeft | Macro-nacht | 'te warm' / 'niets te eten'; thermometer tot −40 °C; ijs omcirkeld; chips abiotisch (teal); ademgat, zeehond komt boven; vissen, andere ijsbeer; chips biotisch (groen) |
| s05 | H1 | Schema → Macro-nacht | doorsnede: vacht, vetlaag (± 10 cm); kou fijn / woestijn te warm; poolgebied met stippellijnen 'ecosysteem' |
| s06 | H2 Iedereen zijn eigen plek | Macro-nacht woestijn | fennek met grote oren (omcirkeld), vraagteken |
| q07 | H2 | vraag | waar zijn de grote oren voor? |
| s08 | H2 | Macro-nacht → Schema | oren kleuren warm, warmtekringels; kever onder het zand met geluidsringen; druppel doorgestreept, water uit eten; twee panelen 'koud genoeg' / 'warm genoeg' + voedsel |
| s09 | H2 | Macro-nacht schooltuin | Lotte tilt een steen op: pissebedden, 'donker en vochtig'; pissebed op droog zand droogt uit; boom met schaduw ('koel en nat'), vallende bladeren, 'rijke bodem'; haak 'levend maakt de omgeving voor anderen' |
| s10 | H3 Als de omgeving verandert | Macro-nacht | thermometer stijgt, ijsschotsen krimpen; 'het ijs smelt eerder'; vraagteken |
| q11 | H3 | vraag | wat betekent dat voor de ijsbeer? |
| s12 | H3 | Macro-nacht | ijsbeer op de kust wordt magerder; 'maanden teren op zijn vet'; 'niet snel aanpassen'; kaartjes minder ijs (abiotisch) → minder eten (biotisch) |
| s13 | H3, uitdaging | Macro-nacht toendra | poolvos; rode vos komt uit het zuiden; lemmingen 'hetzelfde voedsel'; poolvos vlucht; 'concurrentie' |
| s14 | Samenvatting | Schema | ijsbeer tussen kaarten abiotisch (te warm) en biotisch (geen zeehonden); haak |
| s15 | Eindkaart | Schema | Probeer het zelf: keuzebak, onder de steen, factorenjacht; open vraag (kikker bij de sloot); 12 s |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q02 | Zet een ijsbeer in de woestijn. Waarom gaat dat mis? | te warm · geen zeehonden · allebei | c |
| q07 | Een fennek heeft enorme oren. Waar zijn die vooral voor? | warmte kwijtraken · schaduw op zijn ogen · hij had ze nodig, dus zijn ze gegroeid | a |
| q11 | Het zee-ijs smelt steeds eerder. Wat betekent dat voor de ijsbeer? | niets, jaagt op het land · minder tijd om te jagen, magerder · past zich in een paar jaar aan | b |
| eindkaart | Een kikker leeft bij een sloot. Noem twee abiotische en twee biotische factoren die voor hem belangrijk zijn. | open | — |

## Begrippen

abiotische factor, biotische factor, ecosysteem, vetlaag · uitdaging: concurrentie. `GLOSSARY` op regel 1112.

## Docentdeel

Zie `docentdeel.md`: doelgroep (bullet 1, analyseren), tabel per deel, drie misconcepties, Probeer het zelf, pauzemomenten, getallen (−40 °C, vetlaag ± 10 cm, ijsvrije periode), vereenvoudigingen, dekking. Checkvragen (in `src/config.json`): 1 biotisch of abiotisch (mk), 2 pissebedden (mk), 3 minder ijs (leg uit), 4 rode vos en poolvos (uitdaging).

## Waar wat in de HTML zit (`index.html`, versie 1.0)

Geen blobs: `film.src.html` = `index.html`, regelnummers zijn gelijk.

- Paginatekst: regel 66–152; checkvragen vanaf 96, docentdeel vanaf 110, footer 152.
- `window.FILMDATA`: regel 153.
- Bibliotheek (lib.js, helpers.js) vanaf 155; `persoon` (lib_cast) 696.
- Film-eigen tekeningen: `poolgebied` 916, `woestijn` 930, `toendra` 937, `ijsbeer` 942, `zeehond` 956, `vos` 960, `pissebed` 969.
- Scènes: `const SCENES` regel 978; `s01` 980, `s03` 986, `s04` 990, `s05` 1005, `s06` 1022, `s08` 1028, `s09` 1043, `s10` 1065, `s12` 1071, `s13` 1084, `s14` 1095, `s15` 1103.
- `GLOSSARY` 1112, speler vanaf 1120.

## Hoe je de film aanpast

- **Tekst van een alinea:** pas `script_v2.md` aan en draai `maak_segmenten.py`. Spreek alleen die alinea opnieuw in (Roos, eleven_v4, één take), haal woordtijden op met Scribe (één transcriptie per take, anders krijg je alleen de laatste), master naar −16 LUFS (`haal_audio.py`, `woordtijden.py`). Daarna `bouw.py` en `cuecheck.py`.
- **Beeld:** pas de scènefunctie aan in `src/scenes2.js`. Beeldmomenten hangen aan gesproken woorden via `q.at('woord', n)`; let op dat `q.at('biotisch')` ook 'abiotisch' vindt (gebruik dan `n = 2`).
- **Vraag of uitleg:** `vragen.json` (uitleg) en de opties in `script_v2.md`.
- **Docentdeel of begrippen:** `docentdeel.md`, `begrippen.json`; checkvragen in `src/config.json`.

## Aandachtspunten

- **Uitspraak:** wachtlijst in `uitspraak.md` (biotische, ecosysteem, fennek, pissebedden, concurrentie, "min veertig").
- **Eindreview:** gedaan door de bouwer op contactbladen (lage resolutie) en een speeltest (Basis/Uitdaging × Vragen aan/uit × 1,5×, geen JS-fouten); er was in deze sessie geen aparte frisse helper beschikbaar. Gevonden en verwerkt: Lotte stond met haar rug naar de steen; labels 'hetzelfde voedsel' en de vossen overlapten; thermometerlabel in de doorsnede liep over de vetlaag.
- **Overlap:** *Plek genoeg?* (bovenbouw) heeft tolerantiegrenzen en niche; deze film noemt die woorden niet. Natuurlijke selectie alleen als verwijzing naar film 1.
