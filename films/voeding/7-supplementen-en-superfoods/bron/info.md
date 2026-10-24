# Supplementen en superfoods — bronmap

| Veld | Waarde |
|---|---|
| Bestand | films/voeding/7-supplementen-en-superfoods.html (audio in films/voeding/7-supplementen-en-superfoods/audio/) |
| Reeks / nummer | Voeding, film 7 (los slotstuk, op verzoek van Kamiel, 14 okt 2026); sluit aan op film 1 (broodje kaas) en film 6 (bewijsbord) |
| Doelgroep / niveau | havo + vwo bovenbouw; vwo-blok gelabeld: s18–s20 (relatief tegenover absoluut risico met ATBC, meta-analyse). Havo/Vwo-schakelaar, standaard Vwo |
| Versie / datum | 1.1 · 14 oktober 2026: hoofdstuk 4 'Hypes op het bewijsbord' toegevoegd op verzoek van Kamiel (1.0 dezelfde dag; wacht op review) |
| Prompt | onbekend · gemaakt 14 okt |
| Stem / model | Roos (ElevenLabs, voice_id 7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea (flow wgRb2mkEIugHlouCw6hz; nodes in `stem/takes.json`) |
| Duur | spraak 10:42 (vwo) / 9:49 (havo). Speeltijd met kaarten en vragen: vwo ≈ 12,5 min, havo ≈ 11,5 min |
| Beeldstijl | Part C: Macro (keuken met opa, Noor, een pot vitamine C, goji-bessen en detoxthee), Schema (broodje kaas, Schijf van Vijf, zon → huid → vitamine D → calcium → bot, foliumzuur-tijdlijn, dierlijke producten en B12, vet tegenover water, bètacaroteen met verbandonderzoek en proef, lever en nieren, superfood-etiket en EU-claims, loting met proef- en controlegroep, staafdiagrammen vitamine C, bewijsbord met vier vakken, 100 poppetjes voor absoluut risico, meta-analyse). Kleuren in `scenes.js`: vitamine D `VD`, C `VC`, A `VA`, B12 `VB`, vet `VET`, water `WATER`; bewijsbord `VAK4` (vastgesteld groen, waarschijnlijk goud, hypothese paars, weerlegd koraal) |
| Audio-opslag | 22 losse mp3's in audio/ (s01 … s29), loudnorm −15 LUFS, piek −1,5 dBTP, mono 44,1 kHz 96 kb/s; niet in de HTML ingebed |
| Lettertypen | Fraunces 700, Source Sans 3 400/600/700, IBM Plex Mono 500 — ingebed als base64 |
| Herkomst | gebouwd op 14 oktober 2026 met de bouwstraat van de voedingsreeks (`bouw/`) en de bibliotheek `lib_hormonen.js`; enkele helpers overgenomen uit de afweerreeks (`tag`, `regel`, `pil`, `kruis`, `vink`) |

## Bronbestanden in deze map

| Map / bestand | Inhoud |
|---|---|
| `script_v2.md` | Definitief script met leerdoelen, misconcepties, getallen met bronnen en wat de reviews veranderden. Lege regel = nieuwe alinea = nieuwe take. `script_v1.md` = vóór de reviews |
| `script.md` | Tekst per take met duur en audiobestand |
| `segments.json` | Uitvoer van `make_segments.py`: per alinea `display` (ondertitel), `voice` (stem-invoer met respellings) en `vmap` |
| `film.py` + `sections.html` → `film.json` | Titel, vraagteksten met juist antwoord, begrippen; checkvragen en docentdeel staan in `sections.html` |
| `checkpoint.html` | Zelfcheck: contactsheets uit de speler, wat de reviews veranderden, script |
| `uitspraak.md` | Risicowoorden met stem-invoer; wachtlijst voor Kamiel |
| `stem/woordtijden/sNN.json` | Woordtijden per take (Scribe, op de ondertitelwoorden) |
| `stem/takes.json`, `stem/gen.json` | ElevenLabs-flow en node per take; generatie-id en duur |
| `src/` | `scenes.js` (deze film), `lib.js`, `lib_voeding.js`, `lib_hormonen.js`, `player.js`, `page.html`, `fonts.css` |
| `bouw/` | `make_segments.py`, `align.py`, `build_data.py`, `build.py`, `stills.py`, `fake_words.py`, `uitspraak_subs.json` (reeks) en **`uitspraak_film.json`** (alleen deze film: losse vitaminenletters, B12, B6, meta-analyse, chiazaad) |
| `reviews/` | Expert (voedingswetenschapper/methodoloog, met bronnen), didactiek + taal, curriculum (met checkvragen, ook los in `checkvragen.html`), eindreview `eind.md` |

**Werkmap opzetten:** maak `f7/` met `script_v2.md`, `film.py`, `sections.html`, `scenes.js` (uit `src/`), `uitspraak_film.json` (uit `bouw/`), `words/` (= `stem/woordtijden/`) en `film/7-supplementen-en-superfoods/audio/` (= `../audio/`); zet `src/*.js` (behalve scenes.js), `src/page.html`, `src/fonts.css` en `bouw/*` samen in `engine/`. Dan: `python3 engine/make_segments.py f7 script_v2.md && (cd f7 && python3 film.py) && python3 engine/build_data.py f7 && python3 engine/build.py f7` → `f7/film/7-supplementen-en-superfoods.html`.

## Opbouw

| Hoofdstuk | Type · look | Kernbeeld |
|---|---|---|
| Cold open (s01, q02) | H · Macro | Opa aan de keukentafel met een pot vitamine C (1000 mg), goji-bessen en detoxthee; Noor; vraag q02 (antwoord pas in de recap) |
| Titel | Schema | Pot, Schijf van Vijf, vraagteken |
| H1 Wie heeft er iets aan? (s04–s07) | I · Schema | Broodje kaas met melk; vitaminen in kleine hoeveelheden; Schijf van Vijf; zon → huid → vitamine D → calcium → sterke botten, met vijf adviesgroepen; foliumzuur-tijdlijn (4 weken vóór tot 8 weken na de bevruchting, ruggetje sluit, vaak pas: zwanger?); vraag q06; dierlijke producten met B12, veganistisch, B12-pot; sporter en weinig buiten; ijzer alleen bij een tekort |
| H2 Meer is niet beter (s08–s12) | I · Schema | Vraag q09 (D tegenover C); vet: A, D, E, K stapelen in lever en vetweefsel; water: nieren, urine; B6; bètacaroteen → vitamine A; verbandonderzoek groente en kanker; proef bij 30 000 rokers: meer longkanker; wortels eten geen probleem; lever en nieren ontgiften, detoxthee zonder goed onderzoek; SUPERFOOD-etiket als reclamewoord; EU-claims; de claim op opa's pot |
| H3 Hoe toets je een claim? (s13–s20) | H · Schema | Loting in proef- en controlegroep (10 tegen 10), pil en identieke placebo, placebo-effect, dubbelblind; staven 'hoe vaak verkouden' (gelijk) en 'hoe lang' (± halve dag korter); vraag q15; '9 van de 10 voelen zich fitter'; bewijsbord met het nieuwe vak weerlegd. Vwo s18–s20: 100 rokers, vraag q19, relatief 18 % tegenover absoluut ± een half op de 100; meta-analyse als stapel onderzoeken met een samenvattende ruit |
| H4 Hypes op het bewijsbord (s21–s27) | H · Schema | Bewijsbord bovenin, cumulatief gevuld (`hypeItems`): creatine (creatinefosfaat → ATP; sprint en kracht vastgesteld, duursport niet aangetoond); vitamine D (adviesgroepen vastgesteld; verband 'meer vitamine D = gezonder' tegenover de grote proef met 25 000 vijftigplussers: weerlegd bij gezonden; luchtweginfecties waarschijnlijk, klein); niacine (NAD+, pellagra vastgesteld; HDL beter maar niet minder hartinfarcten, meer bijwerkingen: weerlegd); NMN (muizen, korte kleine studies, NAD+ omhoog; hypothese); vraag q25; antwoord met balken 'hoe goed getest'; magnesium-threonaat (ratten, kleine fabrikantstudies; hypothese; alleen de algemene EU-claim) |
| Recap (s28–s29) | Macro | Keuken; antwoordketen en antwoord b; twee vragen bij jezelf, drie bij elke claim |
| Eindkaart (s23) | Schema | Drie kernzinnen |

## Vragen

| Id | Niveau | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Is opa's verhaal het bewijs dat vitamine C werkt? | b nee, want misschien was hij ook zonder tabletten niet verkouden (onthulling in de recap s21) |
| q06 | basis | Wie heeft het meeste aan B12? | c iemand die al jaren veganistisch eet |
| q09 | basis | Bij welke vitamine loop je bij een overdosis het meeste risico? | a vitamine D, want die blijft in je lichaam |
| q15 | basis | Vitamine C: niet minder vaak verkouden, wel een halve dag korter. Wat zeg je dan? | b het effect is echt, maar het is klein |
| q19 | vwo | 3 op de 100 rokers, met bètacaroteen 18 % meer: hoeveel? | c ongeveer drieënhalf op de honderd |
| q25 | basis | Niacine en NMN worden allebei NAD+. Waarom staat de ene claim op weerlegd en de andere op hypothese? | a niacine is in grote, lange proeven getest; NMN bij mensen nog niet |

De antwoordopties worden niet ingesproken; ze staan alleen op het scherm (uit het script, `[VRAAG]`). De onthulling staat wél in de audio van s07, s10, s16, s20 en s21.

Checkvragen (statisch in de pagina): 1 Wie heeft een supplement nodig? (bloedwaarden) · 2 Vitamine C tegenover vitamine A · 3 Maakt chiazaad slank? (proefopzet) · 4 Bètacaroteen bij rokers (ATBC, vwo).

Begrippen: supplement, Schijf van Vijf, vitamine D, vitamine B12, foliumzuur, wateroplosbaar en vetoplosbaar, gezondheidsclaim, controlegroep, placebo en placebo-effect, dubbelblind, effectgrootte; vwo: relatief en absoluut risico, meta-analyse.

## Waar wat in de HTML zit (regelnummers in `7-supplementen-en-superfoods.html`)

| Regel | Inhoud |
|---|---|
| 7–65 | Fonts (base64) en CSS |
| 69 | Sitebalk `<nav class="sitenav">` met "← Terug naar Voeding" |
| 76–99 | Speler: canvas, ondertitelband, knoppen, Havo/Vwo- en Leerling/Klas-schakelaar |
| 100–156 | Checkvragen (100–120), Voor de docent (121–156) |
| 157 | `window.FILMDATA` — segmenten, woordtijden, vragen, titelkaart (uit `build_data.py`) |
| 158–379 | `lib.js`: Part C-tokens, `label`, `zoomCircle`, `human` |
| 380–950 | `lib_voeding.js` (gebruikt: `lichaam`, `glycogen`, `hexagon`, `proteinChain`, `coilPath`, `arrow`, `klok`, `padPunt`, `gladC`) |
| 951–1201 | `lib_hormonen.js`: seriebibliotheek (`person`, `HK`, `hormoonVorm`, `receptor`, `doelcel`, `hartMeter`, `klierKaart`, `bloedLus`, `grafiek`, `bakKraan`, `kringSchema`, `eilandje`, `cel`, `glycogeenKeten`, `telefoon`, …) |
| 1202–1267 | `scenes.js`: hulpstukken van deze film |
| 1268–1409 | `SCENES`: title 1269 · s01 1271 · s04 1276 · s05 1290 · s07 1299 · s08 1308 · s10 1309 · s11 1319 · s12 1327 · s13 1339 · s14 1347 · s16 1353 · s17 1359 · s18 1362 · s20 1363 · s21 1371 · s22 1375 · s23 1380 · s24 1386 · s26 1391 · s27 1396 · s28 1400 · s29 1403 |
| 1410–1577 | `GLOSSARY` en `player.js` (havo slaat vwo-segmenten over) |

## Hoe je de film aanpast

- **Tekst van een alinea:** wijzig `script_v2.md`, draai `make_segments.py` (met `uitspraak_film.json` in de werkmap), neem alleen die take opnieuw op (stem-invoer staat in `segments.json` → `voice`), haal woordtijden op met Scribe en `align.py`, zet de mp3 genormaliseerd in `audio/` en bouw opnieuw.
- **Een antwoordoptie of vraagtekst:** opties in `script_v2.md` bij `[VRAAG]`, vraagtekst en uitleg in `film.py`; geen nieuwe opname nodig (behalve als het juiste antwoord verschuift: dat noemt de audio).
- **Een beeld:** `scenes.js` (zie regelnummers hierboven); cues hangen aan woorden via `q.on('woord', n)` (n = de hoeveelste keer dat het woord in die alinea voorkomt; het zoekt op deel van het woord, dus 'eet' vindt ook 'beetje' en 'vitamine' ook 'Vitaminen').
- **Figuren:** `bord4(ctx, [[vak 0–3, tekst, alpha]], alpha, {nieuw, def})` (bewijsbord met vier vakken), `potje(ctx, x, y, schaal, label, sub, kleur, alpha)`, `keuken(ctx, t, {noor, noorX, spullen})`, `schijf` (Schijf van Vijf), `broodje`, `zon`, `bot`, `poppetjes100(ctx, x, y, n, rood, half, alpha)`, `staaf(ctx, x, y0, b, h, kleur, label, waarde, alpha)`, plus `pil`, `kruis`, `vink`, `tag`, `regel`.
- **Checkvragen of docentdeel:** `sections.html` → `python3 film.py` → `build.py`.

## Aandachtspunten

- Uitspraak: zie `uitspraak.md`, vooral de losse vitaminenletters, bee-twaalf, tsjia-zaad, goji, superfood, detox, placebo en meta-analieze. Een blinde controle was in deze sessie niet mogelijk.
- Getallen met bronnen staan in de kop van `script_v2.md` en in het docentdeel; de film rondt ATBC af op 3 en 3,5 per 100 (echt: 2,8 % en 3,3 %).
- De andere voedingsfilms tonen zelf nog 'film x van 6'; in de index staat deze film als slotstuk 7.
- Eindreview: 12 punten, alle verwerkt zonder nieuwe opname (zie `reviews/eind.md`).
- Hoofdstuk 4 (14 okt): bronnen in `reviews/supplementen_onderzoek.md`, eindreview in `reviews/eind_h4.md` (10 punten verwerkt; s21–s24 en s27 opnieuw ingesproken). De recap-takes heetten eerst s21/s22 en zijn hernummerd tot s28/s29 (zelfde opname). **NMN-status in de EU (per oktober 2026: nog niet toegelaten, positief EFSA-veiligheidsadvies mei 2026) controleren bij elke herziening**; s26 noemt dit hardop.

## Wijziging 15 okt 2026

Wijziging 15 okt 2026: geen wijslijnen meer, namen direct bij de onderdelen. `label()` tekent geen lijntje en stip meer; de nieuwe `naamBij(ctx, naam, meta, x, y, alpha, align, kleur)` zet de naam (met donkere rand rond de letters) direct naast of op het onderdeel, en `label()` gebruikt de richting ax,ay → lx,ly alleen nog om te bepalen aan welke kant de naam staat (zelfde functies als Celorganellen; ook in `bron/src/lib.js`). Geen scènes met `label()` in beeld; alleen de functie is vervangen. In de gedeelde maag-bypass-tekening (`bypassSchema`, lib_voeding) staan 'alvleesklier' en 'dunne darm' nu met `naamBij` vast naast het orgaan.


## Wijziging 19–20 okt 2026: alinea's opnieuw ingesproken na de uitspraaktest

Kamiel koos in de uitspraaktest (18–19 okt, 4 rondes) hoe de risicowoorden moeten klinken. Alleen de alinea's met die woorden zijn opnieuw ingesproken; de gesproken tekst is inhoudelijk gelijk gebleven.

| Woord | Nieuwe stem-invoer | Alinea's | Status |
|---|---|---|---|
| chiazaad | chiazaad (gewone spelling) | s12 | goedgekeurd (uitspraaktest 18–19 okt 2026) |
| niacine / Niacine | niacine (gewone spelling) | s23, s24, s26 | goedgekeurd (uitspraaktest 18–19 okt 2026) |
| vitamine B12 | B-twaalf | s05, s07, s17 | goedgekeurd (uitspraaktest 18–19 okt 2026) |
| creatine | creatine (gewone spelling) | s21 | goedgekeurd (uitspraaktest 18–19 okt 2026) |

- Opnieuw ingesproken: s05, s07, s12, s17, s21, s23, s24, s26. Roos (7qdUFMklKPaaAVMsBTBt), model eleven_v4, één take per alinea, ElevenLabs-flow `urmsa8zcNa5TFq8SVeBI` ("Herinspreken 19 okt · voeding, hormonen, voortplanting"). Stem-invoer = `voice` in `segments.json` (gemaakt met `make_segments.py` en de bijgewerkte vervangregels in `bouw/uitspraak_subs.json` en `uitspraak_film.json`).
- Woordtijden: Scribe (connect_from = de TTS-node) → `align.py` → `stem/woordtijden/`. Mastering: `loudnorm=I=-15:TP=-1.5`, mono 44,1 kHz 96 kb/s.
- Credits: TTS 3890, Scribe ≈ 1408 (≈ 256 s audio).
- **HTML nog niet bijgewerkt**: de voedingshelper bouwt deze film opnieuw (nieuwe beelden) en neemt de nieuwe audio, `segments.json` en woordtijden mee. Tot die build staan in de HTML nog de oude woordtijden (afwijking < 1 s per alinea).
- Niet aangepast: woorden die niet in de test zaten houden hun vorige stem-invoer, zodat ze in de hele film hetzelfde klinken (bijv. "receptor" zoals geschreven, terwijl de centrale lijst "reseptor" geeft).

| Segment | TTS-node | Generatie | Credits | Duur |
|---|---|---|---|---|
| s05 | FFELdLpA2hpCYwC64Hwf | oIi96wwGBsCksdJjpJNa | 347 | 20.85 s |
| s07 | wU9VloKg31U0bwNrP1JH | LW5To3nIX1hizSNdJazV | 540 | 35.97 s |
| s12 | JiGKOwSGIr2kHm3NCfbo | MhfwpD1l0HnS27YgmclO | 567 | 37.57 s |
| s17 | qdvNXaAJsKKYyWwOFNnh | 92yCA7JA1cnNtloQIKcv | 491 | 34.85 s |
| s21 | 4zNKgXwnko2t2ybNzALH | xZyJF20qPRyC1pChH94t | 448 | 28.61 s |
| s23 | QproMCb5BYSSaGQviPCp | z3Wn5bUhaugBrXWsJgRG | 562 | 37.81 s |
| s24 | Spsv5lWscECbLBxvcFw1 | udyMEwV0OHz6jRTOqvig | 506 | 33.25 s |
| s26 | kbauaJAcSqjaxUG3Izab | 7CN345EXT6BESgekHmmm | 429 | 30.69 s |

## Wijziging 20 okt 2026

- **Vaste personages in de keuken** (s01, s28, s29; `keuken()` regel 1515): Opa Henk (wijst naar zijn tablet vitamine C) en Noor, uit `personages/lib_cast.js`, i.p.v. de oudere tekening uit `lib_hormonen.js`. Opties `uitOpa`, `uitNoor`, `poseNoor` in `keuken(ctx, t, o)`. Bewust niet vervangen: de 100 telpoppetjes in s18/s20 (pictogram bij het rokersonderzoek).
- **Nieuwe audio** (herinspreekhelper 19–20 okt: B-twaalf, chiazaad, creatine, niacine) zit nu in de HTML: FILMDATA opnieuw uit `segments.json` + `stem/woordtijden/`, audio-URL met `?v=2` voor s05, s07, s12, s17, s21, s23, s24, s26.
- **Bouwen na deze wijziging**: pas `src/scenes.js` aan en zet het in de film met `python3 bron/bouw/vervang.py films/voeding/7-supplementen-en-superfoods.html films/voeding/7-supplementen-en-superfoods/bron [--filmdata <filmdata.json> --nieuw sNN]` (vervangt alleen het blok tussen `/*@@SCENES*/` en `/*@@/SCENES*/` = `src/lib_cast.js` + `src/cast_hulp.js` + `src/scenes.js`; niet volledig herbouwen met build.py, de HTML heeft latere spelerwijzigingen die niet in `src/player.js` staan). Scènesblok: regel 1213–1695 (`const SCENES` op 1554).

## Wijziging 20 okt 2026 (Filmreview-feedback)

- **Schijf van Vijf eruit** (Kamiel: controversieel en verandert regelmatig; "eet je gevarieerd" blijft). s04 zegt nu "Eet je gevarieerd, dan krijg je bijna alles binnen." In beeld (titel en s04) vervangt `gevarieerdBord()` de oude `schijf()`: een bord met broccoli, tomaatjes, volkorenbrood, ei, bonen, vis en sinaasappel, geen voedingsmodel. Begrip 'Schijf van Vijf' uit de begrippenlijst (film.py en HTML) en uit het docentdeel.
- **Opnieuw ingesproken**: s01, s04, s10, s11, s28, s29 (Roos, eleven_v4, één take, flow `urmsa8zcNa5TFq8SVeBI`; credits TTS 2470, Scribe 0). "vitamine A" als letter (niet meer "aa"), "tablet" als "tablét". Zie `uitspraak.md`. Audio met `?v=2`.
- Bijgewerkt met `vervang.py --filmdata ... --nieuw s01,s04,s10,s11,s28,s29`.
