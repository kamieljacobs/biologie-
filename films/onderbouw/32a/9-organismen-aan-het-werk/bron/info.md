# Organismen aan het werk — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/32a/9-organismen-aan-het-werk/index.html` (audio in `audio/`: 11 mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, film 9 (32A Organismen, bullet 5: *onderzoeken hoe organismen worden gebruikt in de biotechnologie, landbouw en veeteelt*; het onderzoek zelf is de ballonproef op de eindkaart) |
| Doelgroep / niveau | onderbouw leerjaar 1–3, gemengde groepen. Basislijn eenvoudig; één blok **uitdaging** (s12: insuline uit bacteriën). Schakelaar **Basis / Uitdaging** (`?niveau=basis`). Nergens havo/vwo genoemd |
| Versie / datum | 1.0 · 20 oktober 2026 |
| Stem / model | Roos (ElevenLabs, voice_id `7qdUFMklKPaaAVMsBTBt`), model `eleven_v4`, één take per alinea, flow `xMvniVkYN0R2sga6yGcD` (`stem/tts.json`, `stem/generaties.json`) |
| Woordtijden | ElevenLabs Scribe (`eleven_scribe_v1`) op dezelfde takes (`stem/scribe.json`); alle 11 takes woord voor woord gelijk aan de stem-invoer |
| Duur | audio 234 s; speeltijd Uitdaging ± 4:55, Basis ± 4:30 (met vragen) |
| Credits | TTS 3391 (= tekens); Scribe ± 1300 (raming 5,5/s; de tool meldde 0) |
| Beeldstijl | Part C, vlak. Gist en bacteriën in teal/grijs (Part C: bacteriën en schimmels): `gistcel` (ovaal, paarse kern, vacuole, knopje), `bacterie` (staafje of bolletjes). Suiker = oker zeshoek (`zeshoek`), zetmeel = ketting van zeshoeken, koolstofdioxide = drie grijze bolletjes (`koolzuur`), dezelfde vormen als film 8. Keuken van film 1/3 (`kitchenBase`) met Sam en een deegkom (`deegkom`); kas met paprika's, bladluizen, sluipwespen en Opa Henk; wei met koe en kuilbalen (Macro-dag); zoomcirkels naar het deeg, de melk, de pens en de kuilbaal. Beelden gecontroleerd op contactbladen |
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
| `src/scenes9.js` | alle tekeningen en scènes van deze film |
| `src/config.json` · `src/vragen.json` · `src/uitspraak_film.json` | titel, meta, `mini`, `hold`, checkvragen · vraagteksten · film-eigen stem-regels (geen) |
| `src/head.html`, `src/lib.js`, `src/helpers.js`, `src/lib_cast.js`, `src/player_block.html`, `src/tail.html` | gedeelde onderbouw-onderdelen (speler mét spelerfix) |
| `bouw/` | zelfde bouwstraat als film 7 en 8 |

**Werkmap opzetten:** zoals in film 7 (`films/onderbouw/32a/7-zenuw-en-hormoonstelsel/bron/info.md`).

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Macro: keuken | Sam maakt pizzadeeg; bloem · water · zout · gist; doek erover; 1 uur later twee keer zo groot |
| q02 | Cold open | vraag | wat heeft het deeg opgeblazen? |
| s03 | Titel | Schema | titel, gistcel en twee bacteriën |
| s04 | H1 Gist | Micro (± 1000×) | gistcellen (één cel, knopje); schimmel op oud brood; zetmeel-kettingen worden losse zeshoeken; suiker de gistcel in, energie (koraal), koolstofdioxide eruit; belletjes in het deeg groeien |
| s05 | H1 | Schema | "Hoe warm wil gist het hebben?": thermometers koelkast (traag) · lauw ± 30 °C (actief) · heet water (dood); oven, brood vol gaatjes, alcohol verdampt; biotechnologie: gistcel → brood, al duizenden jaren |
| s06 | H2 Bacteriën in je eten | Schema + Micro | melk → schepje → een paar uur warm → yoghurt; zoomcirkel: melkzuurbacteriën, melksuiker wordt melkzuur, melk wordt dik; kaas en karnemelk |
| q07 | H2 | vraag | honderden miljoenen bacteriën in yoghurt: erg? |
| s08 | H2 | Schema | raster bacteriën: een klein deel ziekmakend (koraal), de meeste onschuldig of nuttig (groen); dikke darm |
| s09 | H3 Op de boerderij | Macro-dag: kas → wei | paprika's met bladluizen; Opa Henk laat sluipwespen los; inzet: eitje in een luis, larve; luizen weg, zonder gif; biologische bestrijding; koe in de wei |
| q10 | H3 | vraag | wie verteert het gras? |
| s11 | H3 | Macro-dag + zoomcirkels | koe, zoom naar de pens (grasvezels, bacteriën breken ze af); kuilbalen, zoom in een baal (melkzuurbacteriën); net als yoghurt |
| s12 | H3, uitdaging | Schema | insuline (paars), vroeger uit alvleesklieren van varkens en koeien; bacterie krijgt een paars stukje bouwtekening; maakt insuline; tank met miljarden bacteriën |
| s13 | Samenvatting | Schema → keuken | vier kaarten (gist, melkzuurbacteriën, sluipwespen, pens) met haak "biotechnologie"; het gerezen deeg; thermometer met vraagteken |
| s14 | Eindkaart | Schema | Probeer het zelf: ballonproef, yoghurt maken, speurtocht; open vraag; 12 s |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q02 | Na een uur is het pizzadeeg twee keer zo groot. Wat heeft het opgeblazen? | water uitgezet · levende gistcellen maakten gas · bloem opgezwollen | b |
| q07 | Honderden miljoenen levende bacteriën in een schepje yoghurt. Is dat erg? | ja, bedorven · ja, bacteriën maken altijd ziek · nee, die maakten de yoghurt | c |
| q10 | Wie verteert het gras van een koe? | bacteriën in de maag · de koe zelf · niemand | a |
| eindkaart | Pizzadeeg in de koelkast in plaats van op een warme plek: wat gebeurt er, en waarom? | open | — |

## Waar wat in de HTML zit (`index.html`)

Geen blobs: `film.src.html` = `index.html`, regelnummers zijn gelijk (versie 1.0).

- Pagina-tekst (kop, speler, checkvragen, docentdeel): regel 1–148; checkvragen vanaf 96, docentdeel vanaf 112.
- `window.FILMDATA` (segmenten, woordtijden, vragen): regel 149.
- Tekenbibliotheek (`lib.js`) vanaf regel 150; hulpjes film 1 en 2 vanaf 354; personages (`lib_cast.js`) vanaf 635; scènes van deze film vanaf 865.
- `const SCENES` regel 900; `s01` 902, `s03` 910, `s04` 914, `s05` 933, `s06` 948, `s08` 964, `s09` 971, `s11` 983, `s12` 992, `s13` 1003, `s14` 1013.
- Begrippen: `GLOSSARY` regel 1022. Speler vanaf regel 1030; `drawChapterCard()` 1096 (subtitels in `mini`).

## Zo pas je deze film aan

1. **Tekeningen**: `gistcel`, `bacterie`, `zeshoek`, `koolzuur`, `deegkom`, `kas`, `paprikaPlant`, `bladluis`, `sluipwesp`, `wei`, `koe`, `kuilbaal`, `tank`, `insuline` bovenin `src/scenes9.js`.
2. **Eén alinea opnieuw inspreken**: Roos, eleven_v4, één take; Scribe; `audio/sNN.mp3` en `stem/woordtijden/sNN.json` vervangen; `bouw.py`; `cuecheck.py`.
3. **Vragen, basis/uitdaging, docentdeel**: zoals film 7.
4. Na elke bouw: `python3 scripts/spelerfix.py --check <film>`.

## Uitspraak

Stem-invoer: gewone spelling (eleven_v4), plus de goedgekeurde regel koolstofdioxide → `koolstofdie-oxide`. Blinde Scribe-controle: alle takes kwamen terug zoals bedoeld. **Wachtlijst voor de batchtest:** biotechnologie (s05, s12, s13), melkzuurbacteriën (s06, s11, s13), insuline (s12), pizzadeeg (s01, s13), paprika's (s09), sluipwespen (s09, s13), kuilvoer (s11), karnemelk (s06), pens (s11, s13). Zie `uitspraak.md`.

## Aandachtspunten

- In s05 staat een open denkvraag ("Wat gebeurt er als je het deeg in de koelkast zet? Wat denk je?") zonder vraagkaart; hij wordt direct beantwoord en blijft ook bij Vragen uit hoorbaar.
- "Bacteriën" in de pens: ook eencelligen en schimmels (docentdeel). Kaas: ook stremsel.
- De ballonproef op de eindkaart is nog geen werkblad op de site; link later toevoegen.
