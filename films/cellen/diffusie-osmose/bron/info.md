# Diffusie en osmose — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/cellen/diffusie-osmose/index.html (audio in films/cellen/diffusie-osmose/audio/) |
| Reeks / nummer | Cel, film 1 van 3 ("Biologie bij Kamiel · reeks Cel · film 1 van 3"); film 2 = Celorganellen |
| Doelgroep / niveau | havo + vwo met gelabelde vwo-blokken (Havo/Vwo-schakelaar; standaard Vwo). Vwo-blokken: gefaciliteerde diffusie (H4) en natrium-kaliumpomp (H6). Iso-/hypo-/hypertonisch staat op verzoek van Kamiel in het havo-deel |
| Versie / datum | Versie 1.1 · 12 oktober 2026 (na de onafhankelijke review, zie `reviews/review_v2.md`) |
| Stem / model | Roos (ElevenLabs, model eleven_v4, voice_id 7qdUFMklKPaaAVMsBTBt), één take per segment; woordtijden met Scribe (eleven_scribe_v1) |
| Duur | 9:02 gesproken (som van 24 mp3's: 542 s). Speeltijd met kaarten en vragen (versie 1.1): Vwo 12:04, Havo 11:00. Hoofdstuktijden in de tabel hieronder kunnen een paar seconden afwijken; `script.md` heeft de actuele begintijden |
| Beeldstijl | Part C-stijlkaart: Micro (#121A26 met grain), Schema (#1A2740), Macro (bootje op zee). Kleurbetekenis in deze film: goud = opgeloste stof/kleurstof, teal = water en zuurstof, koraal = ATP/energie, groen = conclusie/celwand, grijs = CO₂, oker = glucose/mineralen, paars = vwo (ook K⁺ in het vwo-blok). Canvas 1920×1080, ondertitels onder CAPTION_Y = 900 |
| Audio-opslag | 24 losse mp3's in audio/ (s01, s04, s05, s06, s08, s09, s11, s12, s14, s15, s17, s18, s20, s21, s22, s23, s25, s27, s28, s29, s31, s32, s33, s35), gemasterd op −16 LUFS / −1,5 dBTP (ffmpeg loudnorm, twee passes, lineair) |
| Herkomst | Gemaakt door Claude met Kamiel in één sessie (12 okt 2026), met dezelfde bouwstraat als Celorganellen. Remake in Part C van een film van Kamiels broer |

## Echte bronbestanden (in deze map)

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script met leerdoelen, misconcepties, [VWO-START]/[VWO-END] en [VRAAG]. Lege regels = grens tussen takes. `script_v1.md` = vóór de reviews |
| `script.md` | Gesproken tekst per segment met begintijd, duur, mp3 en afwijkende stem-invoer; vragen met juiste antwoord |
| `stem/segmenten_stem-invoer.json` | Per segment `display` (scherm) en `voice` (letterlijke stem-invoer met respellings) |
| `stem/uitspraaklijst.md` | Respellings en waarom; ElevenLabs-model en flows |
| `stem/woordtijden/sNN.json` | Woordtijden per take (Scribe) |
| `stem/uitspraaktest.mp3` | A/B-test van de risicowoorden |
| `src/lib.js` | Part C-tokens en reeksbibliotheek (gedeeld met Celorganellen) |
| `src/scenes_lib.js` | Helpers voor deze film: deterministische deeltjessimulatie `sim()`, lipidedubbellaag, kanaaleiwit, drukmeter, plantencel, rode bloedcel, bekerglas, ATP |
| `src/scenes.js` | Eén scènefunctie per segment |
| `src/player.js` | Speler (tijdlijn, vragen, Havo/Vwo, Leerling/Klas, ondertitels) |
| `src/page.html` | Sjabloon met kop, checkvragen, docentdeel, begrippen; placeholders `/*FILMDATA*/ /*LIB*/ /*SCENES*/ /*PLAYER*/ /*NAV*/` |
| `bouw/*.py`, `bouw/checkcues.js` | Bouwstraat, stills, tests; `checkcues.js` controleert dat elk `q.at('woord',n)` in de take bestaat |
| `reviews/` | Scriptreviews (vakexpert, didactiek + taal, curriculum) en de beeldreview met wat ermee gedaan is |

## Opbouw (Vwo; Havo tussen haakjes waar anders)

| Begin | Hoofdstuk | Look | Kernbeeld |
|---|---|---|---|
| 0:00 | Cold open | Schema → zoomcirkel Micro | Druppel kleurstof in stil water; wolk, uiteindelijk egaal; doorgestreepte lepel |
| 0:28 | Titel (5 s) | Micro | "Diffusie en osmose — Alles beweegt" met wolk deeltjes |
| 0:33 | H1 Alles beweegt | Micro | Gesimuleerde willekeurige beweging; één deeltje met spoor; stoten van watermoleculen; koud naast warm |
| 1:06 | H2 Van veel naar weinig | Micro + grafiek | 150 deeltjes links; tellers; pijldikte naar rechts/terug evenredig met het aantal aan elke kant; live grafiek; evenwicht |
| 2:25 | H3 Wat maakt het sneller? | Schema | Vier factoren; 2× afstand → 4× tijd; longblaasje met haarvat, O₂ in, CO₂ uit |
| 3:41 | H4 Het celmembraan (+ vwo-blok) | Micro | Dubbele laag; O₂/CO₂ erdoor; Na⁺ (lading + watermantel) en glucose kaatsen terug; waterkanaal; eigen doorgang glucose; vwo: kanaal- en dragereiwit |
| 5:38 (4:50) | H5 Osmose | Schema, Micro | Opstelling; mythes doorgestreept; porie-close-up met terugkaatsend gehydrateerd zout, lagere druk in de opening, drukmeters, stroom; kaarten osmose / in je boek / op een toets; U-buis; plantencel; komkommer; rode bloedcel; iso/hypo/hyper; infuus |
| 9:34 (8:45) | H6 Actief transport (+ vwo-blok) | Schema, Micro | Passief transport samengevat; wortelhaarcel; pomp met ATP; lekken via kanaal als ATP op is; vwo: Na/K-pomp 3 uit, 2 in |
| 10:40 (9:36) | Recap | Schema, Macro | Vijf panelen; bootje op zee |
| 11:51 (10:47) | Eindkaart (9 s) | Schema | Drie kernzinnen |

## Vragen (juiste antwoord vet)

| Id | Niv. | Vraag | Opties |
|---|---|---|---|
| q02 | basis | Niemand heeft geroerd. Hoe komt de kleurstof dan overal? | elkaar wegduwen · naar de lege plek · **kriskras bewegen** |
| q07 | basis | Evenveel links en rechts: wat doen de deeltjes? | stilstaan · **doorbewegen, evenveel heen als terug** · verzamelen in het midden |
| q10 | basis | Cel twee keer zo dik: hoe lang tot zuurstof het midden bereikt? | 2× · **≈ 4×** · even lang |
| q13 | basis | Welke stof komt het makkelijkst door het membraan? | **zuurstof** · natriumion · glucose |
| q16 | vwo | Kost gefaciliteerde diffusie ATP? | ja · **nee** |
| q19 | basis | Zuiver water / zout water: wat doet het water? | naar links · **naar rechts** · niets |
| q24 | basis | Komkommer met zout: waar komt het water vandaan? | **uit de cellen** · uit de lucht · zout smelt |
| q26 | basis | Rode bloedcel in zuiver water? | krimpt · **zwelt en barst** · niets |
| q30 | basis | Wortelhaarcel neemt mineralen op tegen het verschil in. Hoe? | diffusie · osmose · **pomp in het membraan** |
| q34 | basis | Waarom geen zeewater drinken? | **cellen verliezen water** · te veel water · bacteriën |

## Begrippen
deeltjesbeweging, diffusie, concentratie, concentratieverschil (concentratiegradiënt), evenwicht, longblaasje, celmembraan, selectief doorlatend (selectief permeabel), semipermeabel, osmose, osmotische waarde, plasmolyse, turgor, hemolyse, isotonisch, hypotonisch, hypertonisch, passief transport, actief transport, ATP; vwo: kanaaleiwit, dragereiwit, gefaciliteerde diffusie, natrium-kaliumpomp.

## Docentdeel
Op de pagina zelf: tabel "Hoe de film het uitlegt", de natuurkundige uitleg van osmose (Kramer & Myers 2013), misconcepties, pauzemomenten, getallen met bron of berekening, vereenvoudigingen, leerdoelen en dekking, practicumsuggesties. Zes checkvragen in examenstijl (vier basis, twee vwo).

## Waar wat in de HTML zit (`index.html`, versie 1.0)

| Regel | Inhoud |
|---|---|
| 66 | Sitebalk: "Biologie bij Kamiel" en "← Terug naar Cellen" (`../../../index.html#cellen`; gaat terug in de geschiedenis als je van de site kwam) |
| 95 | Checkvragen |
| 113 | Docentdeel |
| 162 | `window.FILMDATA` (segmenten, woordtijden, vragen, antwoorden) |
| 164 | Part C-tokens (`const C`) en reeksbibliotheek (lib.js) |
| 357 | Filmhelpers (scenes_lib.js); `sim()` op 370 |
| 500 | `const SCENES`; s01 502, s04 531, s05 562, s06 578, s08 591, s09 601, s11 622, s12 658, s14 676, s15 699, s17 722, s18 734, s20 746, s21 762 (porie), s22 803 (U-buis), s23 825, s25 861, s27 872, s28 886, s29 908, s31 925, s32 944, s33 965, s35 987 |
| 1008 | Begrippenlijst (`GLOSSARY`) |
| 1034 | Speler |

Pas nooit `index.html` direct aan: wijzig de bron in `src/` en bouw opnieuw.

## Hoe je de film aanpast

**Werkmap opzetten** (buiten de repo): kopieer `bron/src/`, `bron/bouw/*`, `bron/script_v2.md` naar een werkmap; `stem/segmenten_stem-invoer.json` → `segments.json`; `stem/woordtijden/` → `words/`; mp3's uit `../audio/` → `master/` en `film/audio/`. Daarna `python3 build_data.py && python3 build.py && node checkcues.js`. Resultaat: `film/index.html` (site) en `film/standalone.html` (zonder sitebalk).

**Beeld wijzigen:** pas de scène in `src/scenes.js` aan (cue-woorden via `q.at('woord', n)`; n telt alle woorden die het woord bevatten, dus "Glucose" vindt ook "glucose,"). Controleer met `python3 shots.py uit s21:20 s21:30` en `node checkcues.js`.

**Tekst wijzigen:** pas `script_v2.md` aan → `python3 make_segments.py` → zet in `segments.json` `s03` op `kind: title` en `s36` op `kind: card` → spreek alleen de gewijzigde segmenten opnieuw in (Roos, eleven_v4, één take, invoer uit `voice`) → Scribe-woordtijden naar `words/sNN.json` → mastering (`loudnorm=I=-16:TP=-1.5:LRA=11`, twee passes, `linear=true`) → `build_data.py` → `build.py` → `checkcues.js`. Let op: het aantal woorden in `display` moet gelijk zijn aan het aantal woorden in de transcriptie (gekoppelde woorden met streepje tellen als één).

**Vragen wijzigen:** `answers` en `questions_text` in `bouw/build_data.py`; opties staan in `script_v2.md` achter [VRAAG].

**Op de site zetten:** `film/index.html` → `films/cellen/diffusie-osmose/index.html`, mp3's → `audio/`, en de gewijzigde bron mee in dezelfde commit.

## Aandachtspunten
- Uitspraak van de risicowoorden is door Kamiel goedgekeurd (12 okt 2026, zie `stem/risicowoorden.mp3`).
- De diffusiesimulatie is vooraf berekend (vaste seed) en dus bij elke weergave en bij terugspoelen identiek. H2 loopt door in s06 en s08 (simulatietijd = speeltijd sinds "dwaalt" + 8 s voor de vraag).
- Fonts komen van Google Fonts (zoals Celorganellen); zonder internet valt de film terug op systeemletters.
- Geen MP4-export.
- Rendertijd per frame bij 4× vertraagde CPU: max ± 6 ms per scène (s25), speler gemiddeld 16,7 ms.

## Versie 1.1 (review)
- Opnieuw ingesproken (Roos, eleven_v4, één take, flow OjSx1NJI3a7cn7PXOtMf): s05 ("rechts leger", "net zo vaak naar links als naar rechts"), s21 ("hoogste concentratie opgeloste deeltjes"), s22 ("even hard terug als het water dat door osmose naar rechts wil"), s31 ("een eiwit in het membraan", zodat havo geen onbekend begrip "dragereiwit" krijgt; cue in `SCENES.s31` is nu 'eiwit').
- Beeld: celwand-label bij plasmolyse "stevig, blijft staan", pas bij turgor "duwt terug"; koud/warm-panelen al bij "Hoe warmer"; paneel 1 in s09 bij "sneller bewegen"; pill "de tellers schommelen" in s08; passief transport langer in beeld (s29) en in havo zonder "gefaciliteerde diffusie"; nier als boon; kaarten in s21 dekkend (`card` in scenes_lib.js zonder transparantie).
- Docent/pagina: practicum met kleurstof in agar (convectie vs diffusie), uitleg q02 met nuance over stroming, begrippen osmose/osmotische waarde/passief/actief transport aangepast, begrip osmotische druk toegevoegd, taalfout checkvraag 1a.
- Niet aangepast: kleur van de celkern (paars), afbreekpunten van ondertitels, kleine overlappen in s01, s06, s11, s15 en s28 (zie review_v2.md).
