# Skelet en spieren — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/32a/6-skelet-en-spieren/index.html` (audio in `audio/`: 11 mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, film 6 (32A Organismen; bullet 3: skelet en spierstelsel; bullet 4: signaal, energie met zuurstof, gebruik en training) |
| Doelgroep / niveau | onderbouw leerjaar 1–3, gemengde klassen; geen schoolniveaus in beeld, stem of docentdeel. Basislijn + één blok **uitdaging** (s09: de arm als hefboom). Schakelaar **Basis / Uitdaging** (`?niveau=basis`) |
| Versie / datum | 1.0 · 20 oktober 2026 |
| Prompt | v6 |
| Stem / model | Roos (ElevenLabs, voice_id `7qdUFMklKPaaAVMsBTBt`), model `eleven_v4`, één take per segment, flow `gjR8CE8EzadZLCHBfdpE` (generatie-id's in `stem/generaties.json`, node- en sessie-id's in `stem/tts_sessies.json`) |
| Woordtijden | ElevenLabs Scribe (`eleven_scribe_v1`) op dezelfde takes; alle 11 takes woord voor woord gelijk aan het script |
| Duur | audio 220 s; speeltijd Uitdaging ± 4:45, Basis ± 4:25; Vragen uit ± 3:55 |
| Beeldstijl | Part C, vlak. Rode draad: Sam bij basketbal (Macro-dag) en de **arm van opzij** (Schema: opperarmbeen, onderarm, biceps en triceps met pezen die buigen en strekken); het **skelet van voren** (Schema). Zoomcirkels: beenmerg, heup, gewricht (Schema-doorsneden) en spiercellen (Micro) |
| Audio-opslag | losse mp3's per segment, −16 LUFS (ffmpeg loudnorm, 128 kbps) |
| Herkomst | uitlegfilm-prompt v6 + Part D; brief, script v1 → drie reviews → v2, draaiboek; gebouwd zonder checkpoint (fase 2) |
| Credits | TTS 3263 tekens (eleven_v4); Scribe 220 s audio |

## Bronbestanden in deze map

Zelfde indeling als film 4 en 5: `brief.md`, `script_v1.md`, `reviews/`, `script_v2.md` (bron van alles), `script.md`, `draaiboek.md`, `uitspraak.md`, `docentdeel.md`, `begrippen.json`, `index_entry.json`, `tts_schatting`; `stem/`; `filmdata.json`; `src/` (`lib.js`, `helpers.js`, `lib_cast.js`, `scenes6.js`, `player.js`, `page.html`, `check.html`, `docent.html`); `bouw/` (`film.json` en de scripts).

**Werkmap opzetten:** kopieer `bouw/*`, `src/*` (in `src/`) en `script_v2.md` naar een werkmap buiten de repo; `stem/segmenten_stem-invoer.json` → `segments.json`, `stem/woordtijden/` → `words/`, `stem/generaties.json` → `generaties.json`, `src/check.html` en `src/docent.html` naast `film.json`, mp3's in `audio/`. Dan `python3 build_data.py && python3 build.py` → `film/index.html`.

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Buitenveld + zoom | Sam springt en scoort; zoomcirkel naar de arm |
| s02 | Titel | Schema | titel, arm die buigt en strekt |
| s03 | H1 Botten en gewrichten | Schema skelet | pudding → skelet; ± 200 botten; schedel en ribben beschermen; beenmerg; baby ± 300 |
| q04 | H1 | vraag | waarom heeft een baby meer botten? |
| s05 | H1 | Skelet + zoom → iconen | heupbot 3 → 1; bot leeft; gewricht met kraakbeen en banden; scharnier en kogel in een kom |
| s06 | H2 Spieren trekken | Schema arm | pees; spiercellen korter; spier kort en dik; biceps buigt |
| q07 | H2 | vraag | hoe strek je je arm weer? |
| s08 | H2 | Schema arm | triceps; alleen trekken; tegenwerkers |
| s09 | H2, uitdaging | Schema arm | hefboom: ± 4 cm, grote handbeweging, 1 kg ↔ ± 7 kg |
| s10 | H3 Samen bewegen | Schema | hersenen → zenuw → spier; bloed met zuurstof; Sam in het gips, spier dunner |
| q11 | H3 | vraag | arm na zes weken gips |
| s12 | H3 | Schema → buitenveld | niet gebruikt / terug / getraind; botten sterker; Sams sprong met alle stelsels |
| s13 | Samenvatting | Schema | skelet en arm; signaal → spier trekt → bot draait |
| s14 | Eindkaart | Schema | Probeer het zelf (armmodel, kippenvleugel, film 4) + vraag astronaut; 12 s |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q04 | Een baby heeft meer botten dan jij. Hoe kan dat? | een baby verliest botten als hij groeit · sommige botten groeien aan elkaar vast · dat klopt niet, een baby heeft er juist minder | b |
| q07 | Je biceps buigt je arm. Hoe strek je je arm weer? | een spier aan de achterkant trekt hem recht · de biceps duwt hem terug · de botten in je elleboog veren terug | a |
| q11 | Na zes weken gips is Sams armspier dunner en zwakker. Hoe kan dat? | het gips heeft de spier platgedrukt · de breuk heeft de spier beschadigd · een spier die je niet gebruikt, wordt kleiner | c |

Eindkaart (open): de astronaut. Checkvragen 1–4 basis, 5 uitdaging (`src/check.html`).

## Begrippen

skelet, beenmerg, gewricht, kraakbeen, pees, tegenwerkers · uitdaging: hefboom. `GLOSSARY` op regel 1047 (uit `bouw/film.json`).

## Docentdeel

Doelgroep en kerndoel, tabel per deel, vijf misconcepties, pauzemomenten en Probeer het zelf (armmodel, kippenvleugel), getallen met bronnen, vereenvoudigingen, dekking. Bron: `src/docent.html`.

## Waar wat in de HTML zit (`index.html`, versie 1.0)

Geen blobs: `film.src.html` = `index.html`, regelnummers zijn gelijk.

- Pagina-tekst: checkvragen vanaf regel 97, docentdeel vanaf 114, voet 152. `window.FILMDATA`: 153.
- Part C-bibliotheek vanaf 154; hulpjes films 1–3 vanaf 357; personages (`persoon`) vanaf 690.
- Film 6 vanaf regel 868: gedeelde hulpjes uit film 4 (`exactAt` 876); botten `botLijn` 897, `skelet` 900, `heupBot` 918; arm `SCH`/`ELL`/`OARM` 924, `armGeo` 925, `spoel` 926, `arm` 930; `gewricht` 948, `beenmerg` 956, `spierBundel` 958; buitenveld `court` 961, `samSprong` 965.
- Scènes: `const SCENES` regel 969; `s01` 970, `s02` 973, `s03` 975, `s05` 987, `s06` 994, `s08` 1002, `s09` 1009, `s10` 1015, `s12` 1025, `s13` 1035, `s14` 1039.
- `GLOSSARY` 1047; speler vanaf 1050; `drawChapterCard()` 1116.

## Zo pas je deze film aan

1. **De arm**: schouder `SCH`, elleboog `ELL`, lengte onderarm `OARM`; `arm(phi,{bic,tri,bicHl,triHl,dun,sterk,gips,fles,romp})` met `phi` 0 = gestrekt, ± 2 = gebogen. De spierdikte volgt uit de lengte (constante 11000 in `arm`).
2. **Het skelet**: `skelet(cx,yb,h,{a,heup,hl:{schedel,ribben,heup,arm}})`; het bekken is twee keer `heupBot(…,merge)` (0 = drie losse stukken, 1 = één bot).
3. **Cues**: `T('woord',n)` = n-de héle woord, hoofdlettergevoelig (`exactAt`); na tekstwijziging `python3 cuecheck.py` en `python3 cuectx.py`.
4. **Eén segment opnieuw inspreken**, **vragen**, **begrippen**, **basis/uitdaging**, **eindkaart**: zoals bij film 4 (`script_v2.md`, `bouw/film.json`, `src/check.html`, `s14`).
5. Na het bouwen: `python3 scripts/spelerfix.py --check` op de film (moet OK geven).

## Uitspraak

Geen respellings. **Wachtlijst:** biceps, triceps, beenmerg, kraakbeen, gewricht, tegenwerkers, hefboom, ruggenmerg, heupbot, basket, Sams (zie `uitspraak.md`).

## Aandachtspunten

- De schedel is bewust niet het voorbeeld van samengroeien (de schedelbeenderen blijven aparte botten met naden); de film gebruikt het heupbot.
- Hefboom-getallen zijn afgerond en vereenvoudigd (gewicht van de onderarm niet meegeteld); in beeld staat "vereenvoudigd".
- Sam is het enige personage; de eindkaart vraagt niets over het eigen lichaam (armmodel en kippenvleugel).

## Wijziging 25 okt 2026

- Eindkaart 'Probeer het zelf' (gesproken zin + kaart met opdracht) vervangen door de kaart 'Onthoud' met drie kernzinnen; het eindfragment is nu stilte (woorden leeg). Reden: prompt v10 aanvulling, geen verwijzingen naar tools of opdrachten in de film, vooral niet uitgesproken (Kamiel 25 okt 2026). De bron (scenes, filmdata, script.md) is op dezelfde manier aangepast.
