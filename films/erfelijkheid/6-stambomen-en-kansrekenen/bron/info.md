# Stambomen en kansrekenen — bronmap

Versie 2.0 is een lichte remake in de FILMDATA-straat (28 okt 2026, prompt v13 B16), gebouwd zoals Chromosomen 2.2. De oude versie (eigen engine, één take, 4:05) staat in `oud/` (`6-stambomen-en-kansrekenen-v1.html`, `script-v1.md`, `info-v1.md`). Fase 1 (script, storyboard, keyframes, twijfelscènes, keuring) staat in `remake-2026-10/`.

| Veld | Waarde |
|---|---|
| Bestand | films/erfelijkheid/6-stambomen-en-kansrekenen.html (audio in `6-stambomen-en-kansrekenen/audio/`) |
| Reeks / nummer | Erfelijkheid · film 6 van 6 (§ 3.5) |
| Doelgroep / niveau | havo en vwo bovenbouw, één niveau (geen vwo-blokken): stambomen en kansen staan in beide syllabi (M7.1) |
| Versie / datum | 2.0 · 2026-10-28 (lichte remake) |
| Prompt | v13 |
| Voldoet aan | prompt v13 (28 okt 2026); frisse beeldreview door de maker zelf gedaan (geen aparte reviewer beschikbaar in deze helperronde), zie Aandachtspunten |
| Stem / model | Roos (`7qdUFMklKPaaAVMsBTBt`), ElevenLabs eleven_v4, één take per alinea (23 takes, 5 312 credits); flow `wrxM7cKAWDBF2BY7lEF4` |
| Duur | Vragen aan ± 7:27 (447 s), Vragen uit ± 6:15 (375 s); 368 s spraak; `duur: 7` in HOOFDSTUKKEN |
| Beeldstijl | Part C: Schema (stambomen, simulatie, rekenregels) met cast in de spreekkamer (Sanne als 'de vrouw', Dr. Kim als klinisch geneticus, beide zonder naam); stambomen getekend met `stamboom()` (vaste uitlijnregels) |
| Audio-opslag | 23 losse mp3's (`../audio/sNN.mp3`, loudnorm −16 LUFS / −1 dBTP, 96 kbps mono), woordtijden `stem/woordtijden/` (silalign op de stem-invoer + vmap, lokaal) |
| Herkomst | opmerkingen van Kamiel op de oude film (28 okt 2026: allel-uitspraak, stamboom niet uitgelijnd bij 1:14, 'kan dominant toch overslaan?' bij 1:17); keuring fase 1 (28 okt 2026: alle voorstellen goedgekeurd, t1–t5 en script) |

## Opbouw
| Hoofdstuk | Segmenten | Type · look | Kernbeeld |
|---|---|---|---|
| Cold open | s01 | haak · Schema met cast | de vrouw bij de klinisch geneticus; de stamboom groeit op het wandbord |
| 1. De taal van een stamboom | s03–s04 | E · Schema | symbolen, partnerlijn, kinderen aan één lijn, generaties op één hoogte (gouden hulplijnen, Romeinse cijfers); de familie van de vrouw |
| 2. Stap 1: dominant of recessief? | s05–s10, q08 | E · Schema | mini-stambomen recessief/dominant; Huntington-stamboom; vraag 'kan zijn kind het krijgen?'; de a van de vader reist naar de zoon, in die tak is het allel weg; recessief lijkt over te slaan |
| 3. Stap 2 en 3 | s11–s14 | E · Schema | X-recessief (Xᵃ van vader naar dochter); 'niet te bepalen' + chromosoom 7; genotypen terugwerken (a-chips naar de ouders), drager, A_ |
| 4. Twee derde, niet een half | s15–s17, q16 | E · Schema (simulatie) | 300 echte trekkingen (seed 11: 81 AA, 162 Aa, 57 aa); aa weg, sorteren, 162 van 243 ≈ ⅔ |
| 5. Twee rekenregels | s18–s22, q21 | E · Schema | oppervlaktemodel ¼ × ¼; kansbalk ¼ + ½; drie trekkingen, 'toeval heeft geen geheugen' |
| 6. Terug naar de spreekkamer | s23–s27, q25 | E/I · Schema met cast | partner getest (Aa, buisje); kansboom ⅔ × ½ × ½ = ⅙; spreekkamer met formulier, bord ¼ of 0 |
| Recap | s28 | Schema | vier stappenkaarten; de familie met ⅔ en ⅙ |

## Vragen
| Segment | Vraag | Opties | Juist |
|---|---|---|---|
| q08 | Deze man heeft de ziekte van Huntington niet, maar zijn vader wel. Kan zijn kind de ziekte krijgen? | a ja, kan een generatie overslaan · b nee, geen A om door te geven · c alleen als het een zoon is | b |
| q16 | Haar ouders zijn allebei Aa. De vrouw is gezond. Kans dat zij drager is? | a een derde · b een half · c twee derde | c |
| q21 | Twee dragers hebben al een kind met taaislijmziekte. Kans dat het volgende kind het ook krijgt? | a kleiner dan een kwart · b een kwart · c groter dan een kwart | b |
| q25 | Kans dat het kind van de vrouw en haar partner taaislijmziekte krijgt? | a een zesde · b een achtste · c een kwart | a |

Vragen uit: de speler knipt de vraagzinnen in s07 (vanaf 'Kan zijn kind', 4,3 s), s15 (vanaf 'Hoe groot', 5,4 s), s20 (vanaf 'Hoe groot', 3,2 s) en s24 helemaal; wat overblijft is een gewone uitlegzin. De vraagbeelden (vraagteken-ruit, '?' onder de vrouw, het volgende kind) verschijnen pas op die geknipte woorden, dus niet bij Vragen uit. De alinea na elke vraag begint met een eigen stelling (geen kort antwoord). Gecontroleerd met de tijdlijn van de speler (`?vragen=uit`, 375 s); `antwoordtekst.py --check` en `kortantwoord.py --check` nog draaien in de repo (hoofdsessie).

## Begrippen
stamboom, generatie, drager, A_, autosoom, productregel, somregel (`film.py`, `glossary`). 'Voorwaardelijke kans' (oud) is weg: werd niet gesproken en staat niet in de syllabus.

## Docentdeel
In `sections.html`: checkvragen (5), hoe de film het uitlegt, misvattingen, getallen en bronnen, keuzes en vereenvoudigingen (volledige penetrantie, laat begin en nieuwe mutatie bij Huntington; X-dominant; 'niet te bepalen'; partner getest; negatieve test en de familievariant; dragers niet half ingekleurd), plaats in de reeks, lessuggesties. Alle beweringen met bronnen: `bronnen.md` (27 beweringen, 18 bronnen: 17 ✓, 10 ≈).

## Waar wat in de HTML zit
Regelnummers in `../../6-stambomen-en-kansrekenen.html` (versie 2.0, vóór de repo-brede scripts van de hoofdsessie; die verschuiven de regels een paar plaatsen):
- r. 99 begrippen (`#glossary`), r. 109 docentdeel.
- r. 5011 `stamboom` (tekening met uitlijnregels), r. 5055 simulatie (`_mb`, `kinderen300`, r. 5060 `simRaster`), r. 5086 `kansBoom`; daarna de hulpjes van fase 2 (`reisChip`, `letterChip`, `genLijnen`, `termKaartE`, `formulier`, `buisje`, `chrom7`, `stapKaart`).
- r. 5154 `spreekkamerScene`, r. 5164 `Object.assign(SCENES, …)`: één functie per alinea (s09 r. 5210, s17 r. 5258).
- r. 5316 filmdata (`window.FILMDATA`: segmenten, woordtijden, vragen).

## Zo pas je deze film aan
Werkmap buiten de repo (bv. `hw/erf6`), met de bestanden uit deze bronmap: `segments.json`, `film.py`, `sections.html`, `uitspraak_film.json`, `script_opname.md`, `src/teken_erf6.js`, `src/scenes_erf6.js`, audio als `audio/` (en de ruwe takes als `raw/` voor silalign; de genormaliseerde mp3's werken ook) en woordtijden als `words/`; engine = `src/` + `bouw/` in één map `eng/` (`src/scenes_kop.js` = de engine-kop; regels 1–32 worden gebruikt). Bouwen: `bouw.sh` (zet `scenes.js` = kop + `lib_bio.js` + `lib_micro_evo.js` + `teken_chr1.js` + `teken_erf6.js` + `scenes_erf6.js`, dan `film.py`, `build_data.py`, `build.py`), stills met `bouw/stills.py <map> qa contact`, in de repo zetten met `pak_repo.py`. Daarna in de repo `spelerfix`, `antwoordtekst`, `kortantwoord`, `antwoordletter`, `flipkaarten`, `oefenen`, `teller`, `licentie_noot`, `tabel_mobiel`, `reviewlijst` draaien.
- Beeld wijzigen: alleen in `scenes_erf6.js` (zelfde cue-woorden; `q.at` zoekt een stukje van een woord, dus nooit op 'aa' cuen). Een stamboom wijzig je in de data (`SB_CF`, `SB_HD`, `SB_HDQ`, `SB_REC`, `SB_DR` in `teken_erf6.js`): vaste x per persoon, `gen` bepaalt de hoogte.
- Tekst wijzigen = die alinea opnieuw inspreken (één take, stem-invoer uit `segments.json` na `make_segments.py script_opname.md`), woordtijden met `bouw/silalign_v.py <map>` (silalign op de stem-invoer, terug naar de ondertitelwoorden via `vmap`).

## Kandidaten voor de bibliotheek
Uit `src/teken_erf6.js`, voor `bibliotheek/lib_bio.js` (hoofdsessie): `stamboom` + `sbSymbool` + `miniStamboom` (met het recept en de bekende fouten bovenin; ook bruikbaar voor films 2–5 en de docentenlessen), `simRaster` + `simLegenda` + `kinderen300` (echte trekkingen), `oppModel` (productregel), `kansBalk` (somregel), `kansBoom`, `reisChip`/`letterChip` (allel van vader teal / moeder oker dat reist), `buisje`, `formulier`, `wandbord` + `spreekkamerE6` (overgenomen uit Bio-informatica 2).

## Aandachtspunten
- Frisse beeldreview (C10): één ronde door de maker op contactvellen (82 stills); hersteld: labels over symbolen (s01, s07, s09, s10, s20, s23), titelstamboom buiten beeld, termkaarten in de ondertitelzone (s13, s14), leeg wandbord (s27), broer-zuslijn die doorliep naar nog onzichtbare kinderen (s04), vraagbeelden die bij Vragen uit bleven staan (s07, s15, s20). Een review door iemand anders dan de maker staat nog open.
- Uitspraak: wachtlijst in `uitspraak.md` (Huntington, A_ als 'grote A streepje', klinisch geneticus, dragerschapstest); geen blinde transcriptie gedaan (brief fase 2).
- De oefening `puzzel-sanne-tom` (id ongewijzigd) is gelijkgetrokken met de film (keuring t2): geen namen, de ouders van de partner zijn weg, de partner is getest; nieuwe laatste stap 'de test zegt drager → ¼'. `scripts/oefenen.py` moet nog draaien.
- De HTML heeft nog geen teller-, flipkaart-, oefen- en licentietags: die zet de hoofdsessie met de repo-scripts.

## Wijzigingen
- 28 okt 2026 — Versie 2.0: lichte remake. Nieuw script (dominant slaat geen generatie over, nu expliciet uitgelegd met vraag q08 en s09; 'niet te bepalen' bij stap 2; drager uitgelegd; vier meerkeuzevragen), geen namen, opening in de spreekkamer, nieuwe stamboomtekening met uitlijnregels, simulatie met echte trekkingen, nieuwe stem (eleven_v4, 23 takes), huidige speler (snelheid, Vragen aan/uit), donker standaard, bronnenlogboek.
