# Hoe een plant in leven blijft — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/32a/8-hoe-een-plant-in-leven-blijft/index.html` (audio in `audio/`: 12 mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, film 8 (32A Organismen, bullet 4: stofwisselingsprocessen en samenwerkende organen houden een plant in leven; bullet 3 voor de samenwerking van wortel, stengel en blad) |
| Doelgroep / niveau | onderbouw leerjaar 1–3, gemengde groepen. Basislijn eenvoudig; één blok **uitdaging** (s12: fotosynthese en verbranding in woorden, glucose). Schakelaar **Basis / Uitdaging** (`?niveau=basis`). Nergens havo/vwo genoemd |
| Versie / datum | 1.0 · 20 oktober 2026 |
| Prompt | v6 |
| Stem / model | Roos (ElevenLabs, voice_id `7qdUFMklKPaaAVMsBTBt`), model `eleven_v4`, één take per alinea, flow `scwCU3dtrE1O2dmrQo0n` (`stem/tts.json`, `stem/generaties.json`) |
| Woordtijden | ElevenLabs Scribe (`eleven_scribe_v1`) op dezelfde takes (`stem/scribe.json`); alle 12 takes woord voor woord gelijk aan de stem-invoer ("'s nachts" telt als één woord) |
| Duur | audio 236 s; speeltijd Uitdaging ± 5:00, Basis ± 4:40 (met vragen) |
| Credits | TTS 3453 (= tekens); Scribe ± 1300 (raming 5,5/s; de tool meldde 0) |
| Beeldstijl | Part C, vlak. Stoffen met eigen vorm (BEELDAFSPRAKEN): water = teal druppel (`druppel`), zuurstof = twee teal bolletjes (`o2`), koolstofdioxide = drie grijze bolletjes (`co2`), suiker = oker zeshoek (`suiker`), mineralen = oker stipjes. Macro-dag voor de schooltuin (Daan, de zonnebloem `zonnebloem(groei)`); Schema-lab voor de proef van Van Helmont (`pot`, `wilg(groei)`, `weegschaal`); plantschema (`plantSchema`, stroompaden `PAD_WATER`, `PAD_CO2`, `PAD_O2`); Micro voor het blad (`bladcel`, `huidmondje`). Beelden gecontroleerd op contactbladen |
| Audio-opslag | losse mp3's per take, gemasterd naar −16 LUFS (ffmpeg loudnorm, 128 kbps) |
| Herkomst | uitlegfilm-prompt v6 Part D; fase 1 en 2 op 19–20 okt 2026 zonder checkpoint; speler met spelerfix 20 okt |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `brief.md` · `draaiboek.md` · `docentdeel.md` · `begrippen.json` · `uitspraak.md` · `index_entry.json` · `tts_schatting` | fase 1 |
| `script_v2.md` | het script (bron van alles); `script_v1.md` vóór de reviews; `reviews/` de drie reviews; `script.md` de ingesproken tekst per take met filmtijd |
| `stem/segmenten_stem-invoer.json` | per segment `display` en `voice`; vragen met antwoord en uitleg |
| `stem/woordtijden/sNN.json` · `stem/generaties.json` · `stem/tts.json` · `stem/scribe.json` | woordtijden · generatie-id en duur · flow/node/sessie per take |
| `filmdata.json` | de data zoals ingebed in de film |
| `src/scenes8.js` | alle tekeningen en scènes van deze film |
| `src/config.json` · `src/vragen.json` · `src/uitspraak_film.json` | titel, meta, `mini`, `hold`, checkvragen · vraagteksten · film-eigen stem-regels ("'s nachts" → "snachts") |
| `src/head.html`, `src/lib.js`, `src/helpers.js`, `src/lib_cast.js`, `src/player_block.html`, `src/tail.html` | gedeelde onderbouw-onderdelen (speler mét spelerfix) |
| `bouw/` | zelfde bouwstraat als film 7: `maak_segmenten.py`, `haal_audio.py`, `woordtijden.py`, `bouw.py`, `cuecheck.py`, `shots.py`, `speeltest.py`, `rangeserver.py` |

**Werkmap opzetten:** zoals in film 7 (`films/onderbouw/32a/7-zenuw-en-hormoonstelsel/bron/info.md`).

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Macro-dag: schooltuin | Daan steekt een pit in de grond; lente → zomer, zonnebloem groeit tot 2 m (meetlat); stengel zo dik als een bezemsteel; "waar komt al dat spul vandaan?" |
| s02 | Titel | Schema | titel, groeiende zonnebloem, zon |
| s03 | H1 Niet uit de grond | Schema-lab | "een plant eet aarde?"; Van Helmont: wilgje 2 kg in een pot droge aarde (91 kg), alleen water, 1 s = 1 jaar, wilg groeit naar 77 kg; aarde opnieuw gewogen |
| q04 | H1 | vraag | hoeveel lichter was de aarde? |
| s05 | H1 | Schema-lab | aarde − 60 g, zo zwaar als een ei; water de wilg in, koolstofdioxide uit de lucht de kruin in |
| s06 | H2 Zelf voedsel maken | Schema: plant | fotosynthese (foto = licht, synthese = maken); licht, water, koolstofdioxide; wortels met druppels en mineralen ("geen eten"); vaatbundels; koolstofdioxide door huidmondjes |
| s07 | H2 | Micro: bladcellen | bladgroenkorrels vangen licht; druppel + CO₂ → zeshoek + O₂; zuurstof door het huidmondje naar buiten; donkere kast met plant |
| q08 | H2 | vraag | twee weken in het donker? |
| s09 | H3 Bouwen en verbranden | Schema | plant wordt geel en slap; bouwstof: zeshoeken tot celwanden en hout; brandstof: mitochondrium, energie om te groeien; dag/nacht-pil |
| q10 | H3 | vraag | doet een plant 's nachts ook iets? |
| s11 | H3 | Schema: plant | overdag zuurstof eruit; 's nachts alleen koolstofdioxide eruit, net als een mens |
| s12 | H3, uitdaging | Schema | twee woordvergelijkingen met de vormpjes; glucose |
| s13 | H3 | Schema: plant | wortels zonder water → huidmondje gaat dicht (inzet) → CO₂ ketst af → geen suiker; haak "de plant verhongert, terwijl de zon schijnt" |
| s14 | Samenvatting | Schema → Macro-dag | plant met alle stromen; slot: de zonnebloem en Daan, "water + lucht + licht" |
| s15 | Eindkaart | Schema | Probeer het zelf: waterpest-belletjes, zetmeelproef, kiemproef; open vraag; 12 s |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q04 | De wilg werd 75 kilo zwaarder. Hoeveel lichter was de aarde? | ± 75 kilo · ongeveer de helft · bijna niets | c |
| q08 | Twee weken in een donkere kast, wel water. Wat gebeurt er? | geen suiker meer, geel en slap · niets, voedsel uit de grond · 's nachts suiker uit water | a |
| q10 | Doet een plant 's nachts ook iets? | nee · ja, verbrandt dag en nacht suiker · ja, maakt 's nachts extra zuurstof | b |
| eindkaart | Kamerplant: welk gas neemt hij op en geeft hij af, overdag en 's nachts? | open | — |

## Waar wat in de HTML zit (`index.html`)

Geen blobs: `film.src.html` = `index.html`, regelnummers zijn gelijk (versie 1.0).

- Pagina-tekst (kop, speler, checkvragen, docentdeel): regel 1–149; checkvragen vanaf 96, docentdeel vanaf 112.
- `window.FILMDATA` (segmenten, woordtijden, vragen): regel 150.
- Tekenbibliotheek (`lib.js`) vanaf regel 151; hulpjes film 1 en 2 vanaf 355; personages (`lib_cast.js`) vanaf 636; scènes van deze film vanaf 866.
- `const SCENES` regel 911; `s01` 913, `s02` 924, `s03` 928, `s05` 945, `s06` 957, `s07` 970, `s09` 982, `s11` 995, `s12` 1001, `s13` 1007, `s14` 1016, `s15` 1024.
- Begrippen: `GLOSSARY` regel 1033. Speler vanaf regel 1041; `drawChapterCard()` 1107 (subtitels in `mini`).

## Zo pas je deze film aan

1. **Moleculen**: `druppel`, `o2`, `co2`, `suiker` bovenin `src/scenes8.js`; een stroom van vormpjes langs een pad met `stroom(pad,t,n,snelheid,alpha,fn)`.
2. **Plantschema**: `plantSchema(o)` met `PS` (midden, grondlijn); opties `vaat`, `huid`, `geel`, `slap`.
3. **Van Helmont**: getallen in `s03` en `s05` (weegschaal-teksten).
4. **Eén alinea opnieuw inspreken**: Roos, eleven_v4, één take; Scribe; `audio/sNN.mp3` en `stem/woordtijden/sNN.json` vervangen; `bouw.py`; `cuecheck.py`.
5. **Vragen, basis/uitdaging, docentdeel**: zoals film 7 (`script_v2.md`, `src/vragen.json`, `src/config.json`, `docentdeel.md`).
6. Na elke bouw: `python3 scripts/spelerfix.py --check <film>`.

## Uitspraak

Stem-invoer: gewone spelling (eleven_v4), plus de goedgekeurde regel koolstofdioxide → `koolstofdie-oxide` en "'s nachts" → `snachts`. Blinde Scribe-controle: alle takes kwamen terug zoals bedoeld. **Wachtlijst voor de batchtest:** Van Helmont (s03, s05), fotosynthese en synthese (s06, s09, s12, s14), huidmondjes (s06, s07, s13, s14), mineralen (s06), glucose (s12), snachts (s09, s11). Zie `uitspraak.md`.

## Aandachtspunten

- De getallen van Van Helmont zijn omgerekend uit ponden (± 0,45 kg); "rond het jaar 1640" in beeld (gepubliceerd 1648).
- "Het stevige hout is vooral gemaakt uit lucht" — vereenvoudiging, zie docentdeel.
- De wilg is een schematische treurwilg; de pot staat niet op schaal.
- De nacht wordt in Schema getoond (dag/nacht-pil), niet als Macro-landschap (Part C3: één film wisselt niet tussen dag en nacht in Macro).
