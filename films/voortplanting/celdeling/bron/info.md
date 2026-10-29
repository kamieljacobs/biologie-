# Celdeling 2.0 — bronmap

Versie 2.0 is een lichte remake (prompt v10, B16) in de FILMDATA-straat van Chromosomen 2.0/2.1 (26 okt 2026). De oude versie 1.4 (22 okt 2026) staat in `oud/` (`index.html`, `info.md`, `script.md`, `script_v1/v2.md`, `src/`, `bouw/`, `stem/`, `audio/`) en blijft daar als referentie tot Kamiel 2.0 goedkeurt.

| Veld | Waarde |
|---|---|
| Bestand | films/voortplanting/celdeling/index.html (audio in `audio/`, 33 mp3's) |
| Reeks / nummer | Voortplanting · film 1 (celdeling), in twee delen: Deel 1 Celcyclus en mitose · Deel 2 Meiose; sluit aan op Erfelijkheid 1 Chromosomen en op Geslachtsorganen en puberteit |
| Doelgroep / niveau | havo + vwo; vwo-blokken s10 (controlepunten) en s30–s32 (kanker, non-disjunctie, trisomie 21); twee extra-uitdagingblokken (havo én vwo, schakelaar Extra aan/uit): e01–e03 (kinetochoren, wachtsignaal) en x01–x02 (meiose van de eicel, met Linda) |
| Versie / datum | **2.1 · 29 oktober 2026** — opwaardering naar prompt v13 (B14, zonder keuring): alleen beeld, stem en script ongewijzigd; oude versie in `oud/index-v2.0.html` (+ `info-v2.0.md`, `teken_celdeling-v2.0.js`). 2.0 · 26 oktober 2026 |
| Prompt | v13 |
| Voldoet aan | prompt v13 (29 okt 2026, zonder keuring). Bewust niet: de stem noemt Linda, Noor en oma Ria in de extra uitdaging x01/x02 (B4) — niet opnieuw ingesproken, op de herinspreeklijst; de oude helpers uit 1.4 (`chrom_lib.js`, `oud_hulp.js`: v01, s21, v02, s30, s33) houden hun eigen chromosoomtekening (chromX) in de oude vader/moederkleuren; geen nieuwe caststijl met contourlijnen |
| Stem / model | Roos (`7qdUFMklKPaaAVMsBTBt`), ElevenLabs eleven_v4, één take per alinea, alle 33 alinea's nieuw; ids per take in `stem/gen.json` en `stem/sessions.json`; ± 12.470 credits spraak + ± 565 transcriptie |
| Duur | 850 s gesproken (basis 650, vwo 73, extra 127). Speeltijd met kaarten en vragen: vwo + extra 16:53; havo zonder extra 12:51; havo, extra uit, vragen uit 10:40. Deel 2 begint bij 8:51 (vwo + extra) of 7:24 (havo zonder extra). `duur: 14` in HOOFDSTUKKEN |
| Beeldstijl | Part C: Micro (cel, chromosomen), Schema (celcyclus, grafiek, tabel), Macro (Noor, Rachid, Linda, Ria). Modelcel 2n = 4 (lang en kort paar); vaderskant teal (`C.teal`), moederskant oker (`C.oker`), zoals Chromosomen 2.1; het lange paar wordt gevolgd (gouden rand); cohesineringen goud-grijs (`C.grain`); okerbalk = extra uitdaging |
| Audio-opslag | 33 losse mp3's, gemasterd op −16 LUFS / −1,5 dBTP (loudnorm, één pass); ruwe takes buiten de repo |
| Herkomst | lichte remake (B16), keuring 25 okt 2026 (besluiten: één film in twee delen; Linda, eicel ruim 27 jaar; cohesine goud-grijs; één crossing-over per paar; script; `films/verbeterbladen/remake-2026-10/besluiten.md`). Fase 1: `remake-2026-10/` (script_v2, storyboard, keyframes, twijfelscènes, bronnen, samenvatting). Frisse beeldreview: `review_fris_2026-10-26.md` (17 MOET, alle hersteld op 26 okt 2026; KAN 6, 7 deels: mitoseboog 4 %, ringschets meteen in beeld) |

## Wijzigingen 2.1 (29 okt 2026): opwaardering naar prompt v13 (zonder keuring)

Alleen beeld; stem, script, vragen, timings, speler en datum ongewijzigd. Site-HTML bijgewerkt door alleen het scèneblok, FILMDATA en de footer te vervangen. `src/teken_celdeling.js` is weg (naar `oud/`): de film gebruikt nu de cd*-tekeningen uit `bibliotheek/lib_bio.js` (palet B) via het uittreksel `src/lib_bio_deel.js` (`bouw/bio_deel.py`, regel onderaan `bouw.sh`); `lib_micro_evo.js` = actuele kopie uit `bibliotheek/dieren/`. Contactvel van de gewijzigde scènes bekeken (118 stills vwo + extra, geen JS-fouten); vragen afgespeeld met `?vragen=uit` (havo en vwo).

- Alle scènes met cdChromosoom/cdEen/cdKluwen/kernChromatine (s01, s11–s29, e01–e03, x01, x02): chromosomen in palet B: vaderskant donkerblauw, moederskant zandgeel (was teal/oker); chromatine in de kern grijs in plaats van paars.
- s11, s17 (labels 'van je vader', 'van vaderskant'): tekst in een lichtere tint van het vaderblauw (`VADER_TEKST`), zodat hij leesbaar blijft op navy.
- s06–s10: celcyclusring interfase teal in plaats van paars (minder paars); s20/s25 DNA-grafiek: lijn teal in plaats van paars.
- s04, s09: pillen 'uitgerekt 2 meter DNA' (teal) en 'zie de film DNA kopiëren' (goud) niet meer paars.
- x01: balk 'stil · ± 27 jaar' neutraal in plaats van paars.
- s26, x02, s22: eicel, eierstok en zaadbal in de gekeurde beeldbankversie (eicelEcht variant B met zona en stralenkrans, eierstokDoorsnede variant B, zaadbalDoorsnede met ovale profielen).
- s30 (vwo): achtergrond zonder korrel (`bg('micro')` → `micro2`).
- x01, x02, xq: geen castnamen meer in beeld ('oma, zwanger van moeder', 'moeder 27: eisprong', 'dochter 16', 'sinds vóór de geboorte van moeder'; vraagtekst xq 'Een moeder was 27 …'). Footer zonder personagenamen.
- Lijsten voor Kamiel: `opwaardering-v13.md`.

## Bronbestanden (in deze map)

| Map / bestand | Inhoud |
|---|---|
| `remake-2026-10/script_v2.md` | Definitief script met markeringen (`=` `~` `+`), vragen en dekking |
| `script.md` | Gesproken tekst per segment met duur, mp3 en vragen met juist antwoord |
| `segments.json` | Segmenten (display, voice, level, chapter) voor de bouw |
| `film.py`, `sections.html` | Filmgegevens (titel, delen, vragen met uitleg, begrippen) en docentdeel (checkvragen, Voor de docent) |
| `stem/segmenten_stem-invoer.json`, `stem/uitspraak_film.json` | Letterlijke stem-invoer en film-eigen respellings (X-vorm → iks-vorm, XX/XY, oöcyt → oo-oosiet) |
| `stem/woordtijden/<id>.json` | Woordtijden (silalign) |
| `stem/blind.md` | Blinde transcriptie (B5) |
| `src/teken_celdeling.js` (sinds 2.1 in `oud/`; de film gebruikt `bibliotheek/lib_bio.js` via `src/lib_bio_deel.js`) | Tekenobjecten: `cdPad`, `cdChromatide`, `cdChromosoom` (zusters, centromeer, kinetochoren, cohesineringen, crossing-over-kleuren), `cdEen` (losse chromatide, centromeer vóórop), `cdKluwen` (morph chromatine → chromatide), `cdKernmembraan`, `cdCel` (insnoerende cel), `cdPool`, `cdDraad`, `cdTeller` |
| `src/scenes_cd2.js` | Alle scènes; bovenaan `mitoseCel` (één doorlopende cel, toestand c/nm/sp/me/an/te/cy) en `meioseCel` (pa/co/eq/an), `NA_M1` (inhoud van de cellen na meiose I), `drieMetafasen` (H6). Onderaan v01, s21, v02, s30 uit 1.4 met nieuwe cues |
| `src/` overig | Gedeelde bibliotheken (lib.js, lib_cast.js, lib_bio.js, lib_anatomie.js, …), `chrom_lib.js`, `scenes_lib.js`, `oud_hulp.js` (helpers uit 1.4: cycleRing, vp*, cellSwarm), `player.js` (spelerfix, Vragen aan/uit, Extra aan/uit, deelkoppen), `page.html` |
| `bouw/`, `bouw.sh` | Bouwstraat (build_data.py met `delen` en `audioPad`, build.py, stills.py, sheet.py, cuecheck2.py) |
| `review_stills/` | Stills per segment (naam = segment_tijd) en `TEKST.md`, voor de frisse beeldreview |

## Opbouw (vwo met Extra aan)

| Begin | Hoofdstuk | Kernbeeld |
|---|---|---|
| | **Deel 1 · Celcyclus en mitose** | |
| 0:00 | Cold open (s01, q02) | Bevruchte eicel → Noor, tientallen biljoenen cellen; zoomcirkel naar een kern; delende cel met vraagtekens |
| 0:39 | Titel | Celdeling · eerst kopiëren, dan verdelen |
| 0:44 | H1 Waarom delen? (s04, s05) | Groeien; schaafwond op Noors onderarm met zoomcirkel naar de huid (basale laag deelt, dode cellen schilferen af); beenmerg; eencellige deelt; grote cel → diffusie te traag |
| 1:33 | H2 De celcyclus (s06–s10) | Ring met interfase, mitose, cytokinese; DNA dubbel; G1/S/G2 met morph van één draad naar dubbele draad; vwo: controlepunten |
| 3:13 | H3 Chromosomen tellen (s11–s15) | Chromatine (teal/oker), 46 = 23 paren, homologe chromosomen; karyogram XX/XY; dubbele draad rolt op tot X-vorm (morph `cdKluwen`); twee soorten twee; modelcel met vier X-vormen; mens 46 / 92 |
| 4:55 | H4 Mitose (s16–v01) | Eén doorlopende cel: profase (oprollen, spoelfiguur, kernmembraan valt uiteen), metafase; extra uitdaging e01–e03 (kinetochoren, spanning, foute verbinding, wachtsignaal, cohesine geknipt, gif, krimpende trekdraad); anafase met centromeer vóórop, telofase, cytokinese, celplaat; dochtercellen tellen; DNA-grafiek; v01 ongeslachtelijke voortplanting |
| | **Deel 2 · Meiose** | |
| 8:51 | H5 Meiose (s21–v02) | 46 + 46?; diploïd/haploïd; Rachid en Linda met teelbal en eierstok in een zoomcirkel naast het lichaam; s23 meiose I: paren tegen elkaar, crossing-over (één per paar getekend), als paren in het equatorvlak, uit elkaar; s24 na meiose I, meiose II, vier zaadcellen / één eicel; extra x01–x02 (Linda-tijdlijn: oma Ria zwanger → Linda 27 → Noor 16; oöcyt staat ruim 27 jaar stil; poollichaampje; cohesine slijt); grafiek tot ½p; 2²³ en crossing-over; n + n = 2n; v02 geslachtelijke voortplanting |
| 13:25 | H6 Mitose en meiose naast elkaar (s27–s32) | Hetzelfde lange paar in drie metafasen (mitose, meiose I, meiose II); tabel; vwo: kanker, non-disjunctie, 24 + 23 = 47, trisomie 21 |
| 15:43 | Recap (s33–s35) | Vier panelen; huidcel of zaadcel |
| 16:44 | Eindkaart | Drie kernzinnen |

## Vragen

| Id | Niv. | Vraag | Juist |
|---|---|---|---|
| q02 | basis | Hoe verdeelt een cel zijn DNA eerlijk? | b eerst kopiëren, dan verdelen |
| q07 | basis | Wanneer wordt het DNA gekopieerd? | b in de interfase |
| q14 | basis | Vier X-vormen: hoeveel chromosomen? | b 4 |
| eq02 | extra | Gif: trekdraden haken niet aan. Wat doet de cel? | b blijft wachten in de metafase |
| q18 | basis | Chromosomen per dochtercel na mitose (mens)? | b 46 |
| q23 | basis | Chromosomen per cel na meiose I (mens)? | b 23 |
| xq | extra | Linda was 27: hoe lang stond de meiose stil? | c ruim zevenentwintig jaar |
| q28 | basis | Waar liggen homologe chromosomen als paren in het equatorvlak? | b meiose één |
| q31 | vwo | Eicel 24 + normale zaadcel? | c 47 |
| q34 | basis | Huidcel of zaadcel: meer DNA? | b de huidcel |

Cues: na elke bouw `python3 bouw/cuecheck3.py src/scenes_cd2.js` (vanuit een map met film/words/): meldt waar `q.at()` op een ander woord valt dan bedoeld (bewust: 'crossing' → crossing-over, 'G2' → G2-fase, 'geslachtelijke', 2 → Ongeslachtelijke, 'disjunctie').

Vragen uit: de speler knipt bij elke vraag de vraagzinnen en 'Wat denk je?' weg (`vraagCuts`); in s33 ook de aanloop 'Nog één vraag. Een huidcel … zelfde man.' (`window.VRAAG_VANAF = { s33: 'Nog' }` bovenin scenes_cd2.js). Vraagtekens in s01, e01, x01, s30 alleen bij Vragen aan (`vragenUit2()`). Gecontroleerd door afspelen met `?vragen=uit` (Playwright, knipplekken per segment) en met `antwoordtekst.py --check`, `kortantwoord.py --check`.

## Begrippen
32 termen in `film.py` (`glossary`): celdeling, celcyclus, interfase, G1/S/G2, chromatine, chromosoom, homologe chromosomen, geslachtschromosomen, karyogram, chromatide, centromeer, mitose, fasen, spoelfiguur, equatorvlak, cytokinese, ongeslachtelijke voortplanting, kloon, diploïd, haploïd, meiose, crossing-over, geslachtelijke voortplanting, zygote; vwo: controlepunt, non-disjunctie, trisomie 21, tumor/kanker; extra: kinetochoor, cohesine, oöcyt, poollichaampje. Flipkaarten via `scripts/flipkaarten.py`; oefeningen in `../oefenen.json` (ongewijzigd).

## Waar wat zit (`src/scenes_cd2.js`, regelnummers 26 okt 2026)

| Regel | Inhoud |
|---|---|
| 1–20 | `VRAAG_VANAF`, kleuren, modelcel `MOD`/`MY`, hulpjes |
| 22–55 | `mitoseCel` (profase t/m cytokinese als getallen) |
| 57–92 | `COSEG`, `M1`, `meioseCel`, `NA_M1` |
| 95 | `SCENES.title`; s01 98, s04 115, s05 137, s06–s10 153–164, s11 167, s12 180, s13 187, s15 209, s16 220, e01 234, e03 264, s17 290, s19 310, s20 319, s22 329, s23 342, s24 356, x01 379, x02 403, s25 429, s26 435, s27 458, s29 459, s32 473, s33 480, s35 497 |
| na 497 | `drieMetafasen`; daarna v01, s21, v02, s30 (uit 1.4) |

Pas nooit `index.html` direct aan: wijzig `src/` en bouw opnieuw (zie `bouw.sh`), en draai daarna de site-scripts (teller, flipkaarten, oefenen, licentie_noot, spelerfix, antwoordtekst, kortantwoord, tabel_mobiel).

## Hoe je de film aanpast

- **Beeld:** scène in `src/scenes_cd2.js`; cues met `q.at('woord', n)` (stukje van een woord, hoofdletterongevoelig, n-de voorkomen). Controleer cues met `bouw/cuecheck2.py`. Mitose: `mitoseCel(ctx, cx, cy, {c, nm, sp, me, an, te, cy, hl}, t)`; meiose I: `meioseCel(ctx, cx, cy, {pa, co, eq, an, sp, hl}, t)`. Stills: `python3 bouw/stills.py <bouwmap> <uit> s17:10`.
- **Tekst:** wijzig `segments.json` (display en voice) en `remake-2026-10/script_v2.md`, spreek alleen de gewijzigde alinea in (Roos, eleven_v4, één take, invoer met `films/uitspraak.json` + `stem/uitspraak_film.json`), master (loudnorm I=-16, TP=-1,5), woordtijden met silalign, dan opnieuw bouwen.
- **Vragen en begrippen:** `film.py`; opties in `segments.json`.
- **Delen:** `film.py` → `delen` (hoofdstuk → kop in het hoofdstukmenu en op de hoofdstukkaart).

## Aandachtspunten
- Eén crossing-over per paar getekend; de tekst zegt 'minstens één keer' (bron in `bronnen.md`).
- In de hoofdlijn heet het afmaken van meiose II bij de eicel 'de laatste stap gebeurt pas bij de bevruchting'; poollichaampjes alleen in de extra uitdaging.
- Organen nooit over een gezicht: in s22 zoomcirkels naast Rachid en Linda (BEELDAFSPRAKEN).
- Wachtlijst uitspraak (`remake-2026-10/uitspraak.md`): cohesine klonk in de blinde transcriptie als 'cohesie' (x02); oöcyt aanvaardbaar. Beide voor Kamiels oor.
- Linda's leeftijd bij de eisprong (27) en bij Noors geboorte (28) staan in `personages/LEVENSLOOP.md`.
