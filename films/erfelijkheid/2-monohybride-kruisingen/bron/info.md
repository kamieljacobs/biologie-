# Monohybride kruisingen — bronmap

Versie 2.0 is een lichte remake (prompt v13 B16) in de FILMDATA-straat, net als Chromosomen 2.2 (28 okt 2026). De oude versie (eigen engine, één doorlopende take, 11–12 okt 2026) staat in `oud/` (`2-monohybride-kruisingen-v1.html`, `script-v1.md`, `info-v1.md`). Voorbereiding (fase 1: script v2, storyboard, keyframes, twijfels, eerste bronnenlogboek) in `remake-2026-10/`.

| Veld | Waarde |
|---|---|
| Bestand | films/erfelijkheid/2-monohybride-kruisingen.html (audio in `2-monohybride-kruisingen/audio/`) |
| Reeks / nummer | Erfelijkheid · film 2 van 6 (§ 3.3) |
| Doelgroep / niveau | havo en vwo bovenbouw, één niveau (geen vwo-blokken) |
| Versie / datum | 2.0 · 28 okt 2026 |
| Prompt | v13 |
| Voldoet aan | prompt v13 (28 okt 2026) |
| Stem / model | Roos (`7qdUFMklKPaaAVMsBTBt`), ElevenLabs eleven_v4, één take per alinea (30 takes, geen enkele opnieuw), 5141 credits; flow `nHz0kyvEKO5yTdZxbMk0` |
| Duur | ± 7:27 met Vragen aan (446,6 s met titel- en hoofdstukkaarten en drie vragen; 374 s spraak), ± 6:31 met Vragen uit (391,2 s); `duur: 7` in HOOFDSTUKKEN |
| Beeldstijl | Part C: Macro (kamer met gezin De Wit, tuin met erwtenplanten, labmuizen), Schema (generatieladder P → F1 → F2, meiose Aa, kruisingsschema, simulatie, stappenplan); geen Micro, dus geen korrel |
| Audio-opslag | 30 losse mp3's (`../audio/sNN.mp3`, loudnorm −16 LUFS / −1 dBTP; ongenormaliseerde originelen niet bewaard), woordtijden `stem/woordtijden/` (silalign + vmap, lokaal) |
| Herkomst | opmerkingen van Kamiel in de reviewstand (-P52tYimczZuV-BIkQJ6 P/F1/F2 en F1 × F1 uitleggen, ook bij dieren; -P52twO_f_UxdxqYw4zB gameet klonk Engels, 'óók'; -P52uA6vAQkJcKapQ4o9 klemtoon allel), keuringsblad Erfelijkheid 28 okt 2026 (t1–t6 en script goedgekeurd, `films/verbeterbladen/erfelijkheid-2026-10/`), uitspraaktest 28 okt 2026 |

## Opbouw
| Hoofdstuk | Segmenten | Type · look | Kernbeeld |
|---|---|---|---|
| Opening | s01–s02 | haak · Macro | gezin De Wit in de kamer (ouders Aa, Levi aa), vraag 'hoe groot is de kans?'; overgang naar Mendel met erwten |
| Titel | s03 | — | titelkaart met erwtenbloemen |
| 1. Van P naar F1 | s04–s08 | A · Macro → Schema | erwtenplant in de tuin, bloem in doorsnede (kiel, meeldraden, stamper, zelfbestuiving vóór de bloem opengaat); raszuiver paars AA en wit aa; Mendel (castpersonage) kruist met pincet; generatieladder P → F1 met uitleg van de letters; alle F1 paars, Aa; begrip monohybride |
| 2. De F2 | s09–s14 | B · Schema/Macro | F1 × F1 via zelfbestuiving (lus op de ladder), bij dieren: zwarte en albino labmuizen, F1 zwart, broer × zus (inteelt); vraag q13; F2-veld 705 paars : 224 wit ≈ 3 : 1, a zat verborgen |
| 3. Waarom drie op één? | s15–s20 | B · Schema | chromosoompaar met A en a, meiose Aa ('vereenvoudigd'), gameet; stuifmeel en eicellen elk ½ A, ½ a; kruisingsschema (stuifmeel boven teal, eicellen links oker), vakjes vullen, 1 AA : 2 Aa : 1 aa en 3 : 1 |
| 4. Kansen, geen aantallen | s21–s25 | C · Schema | productregel ½ × ½ = ¼; vier zaden uit één F1-plant, vraag q24; simulatie (400 zaden, vaste seed, eindigt op 301 : 99) |
| 5. Stappenplan | s26 | F · Schema | vier stappen voor elke kruisingsvraag |
| 6. De terugkruising | s27–s31 | B · Schema | paarse plant A?, kruising met aa = terugkruising, twee schema's AA × aa en Aa × aa; vraag q30; één witte nakomeling bewijst Aa |
| Recap | s32–s34 | E · Macro/Schema | terug naar gezin De Wit: Aa × Aa zoals Mendels F1, ¼ per kind, drie kinderen AA, Aa, aa ≠ 3 : 1; samenvatting en vooruitblik ('niet altijd drie op één') |
| Eindkaart | s35 | — | kernpunten en link naar film 3 |

## Vragen
| Segment | Vraag | Opties | Juist |
|---|---|---|---|
| q13 | Twee F1-planten (Aa) worden met elkaar gekruist. Hoe zien hun nakomelingen eruit, de F2? | a allemaal paars, net als de F1 · b allemaal lichtpaars: een mengkleur · c vooral paars, maar ook een deel wit | c |
| q24 | Je zaait vier zaden uit één F1-plant (Aa, zelfbestuiving). Hoeveel van die vier planten bloeien wit? | a precies één: een kwart van vier · b nul, één, twee of meer: dat verschilt · c geen: wit is recessief | b |
| q30 | Een paarse plant × witte (aa): de helft paars, de helft wit. Welk genotype had de paarse plant? | a Aa · b AA · c dat kun je hieruit niet afleiden | a |

Vragen uit: de vraagzinnen staan in eigen alinea's (s12, s23, s29, elk 'Wat denk je? …') en vallen bij Vragen uit helemaal weg (duur 0); de alinea's erna (s14, s25, s31) beginnen met een eigen uitlegzin en leunen niet op de vraag. Gecontroleerd door af te spelen met `?vragen=uit` rond elke vraagplek (Playwright, 28 okt 2026): geen vraagtekst, geen antwoordletter, geen paginafouten.

## Begrippen
P, F1 en F2; raszuiver; zelfbestuiving; monohybride kruising; gameet; kruisingsschema; productregel; terugkruising (`film.py`, `glossary`). Notatie en overige begrippen (allel, genotype, fenotype, dominant/recessief, homo-/heterozygoot) als in Chromosomen 2.2.

## Docentdeel
In `sections.html`: checkvragen (6), hoe de film het uitlegt, misvattingen, getallen en bronnen (705 : 224, Mendels gen A), keuzes en vereenvoudigingen (meiose bij planten via sporen, 'terugkruising' voor de kruising met aa, muizenachtergrond), plaats in de reeks, lessuggesties. Alle beweringen met bronnen: `bronnen.md`.

## Waar wat in de HTML zit
Regelnummers in `../../2-monohybride-kruisingen.html` (versie 2.0, vóór de repo-scripts van de hoofdsessie; die schuiven de regels iets op):
- r. 103 begrippen (`#glossary`), r. 105 checkvragen, r. 114 docentdeel.
- r. 4988 muizenpop (`HondPop` + `MUIS_DEF`, uit `bibliotheek/dieren/lib_dieren.js`).
- r. 5455 `erwtBloem`, r. 5513 `erwtenplant`, r. 5539 `plantje`, r. 5562 `labmuis`, r. 5566 `generatieLadder`, r. 5571 `zelfLus`, r. 5577 `meioseAa`, r. 5585 `staafAllelK`, r. 5591 `kruisSchema`, r. 5606 `f2Veld`, r. 5614 `CAST.mendel`, r. 5619 `tuin`, r. 5626 `pincet`, r. 5633 `muisMet`, r. 5636 `SIM2` (simulatie, vaste seed), r. 5642 `simKolommen`, r. 5656 `LAD` (plek van de ladder).
- r. 5667 `Object.assign(SCENES, …)`: één functie per alinea (bron: `src/scenes_erf2.js`).
- r. 5837 `const DATA` (filmdata: segmenten, woordtijden, vragen).

## Zo pas je deze film aan
Werkmap buiten de repo (bv. `hw/erf2/w`, engine in `hw/erf2/eng`), met de bestanden uit deze bronmap: `segments.json`, `film.py`, `sections.html`, `uitspraak_film.json`, `script_bouw.md`, `src/teken_erf2.js`, `src/scenes_erf2.js`, audio als `audio/` en woordtijden als `words/`; engine = `src/` + `bouw/` (`src/scenes_kop.js` = de regels 1–32 van de engine-scenes, `src/teken_chr1.js` en `src/muis_pop.js` worden meegeplakt). Bouwen: `bouw.sh` (zet `scenes.js` = kop + `lib_bio.js` + `lib_micro_evo.js` + `teken_chr1.js` + `muis_pop.js` + teken + scenes, dan `film.py`, `build_data.py`, `build.py`), stills met `bouw/stills.py <map> qa contact`, inpakken met `bouw/pak.py`. Daarna in de repo `spelerfix`, `antwoordtekst`, `kortantwoord`, `antwoordletter`, `flipkaarten`, `teller`, `licentie_noot`, `oefenen`, `reviewlijst`, `nieuwste_films` draaien.
- Beeld wijzigen: alleen in `scenes_erf2.js` (zelfde cue-woorden; `q.on`/`q.at` zoeken op een stukje van een woord, dus nooit cuen op 'a', 'aa' of 'Aa'). Gedeelde tekeningen in `bibliotheek/`, niet hier.
- Tekst wijzigen = die alinea opnieuw inspreken (één take, stem-invoer uit `segments.json` na `make_segments.py` met `uitspraak_subs.json` + `uitspraak_film.json`), loudnorm −16 LUFS / −1 dBTP, woordtijden met `bouw/silalign_vmap.py` (silalign op de stem-tokens, terug naar de ondertitelwoorden via `vmap`; gewone `silalign.py` loopt mis bij 'A' → 'grote A').

## Kandidaten voor de bibliotheek
Naar `bibliotheek/lib_bio.js` (met testvel), allemaal in `src/teken_erf2.js`:
- `erwtBloem` (vlinderbloem met vlag, vleugels en kiel; open, doorsnede met meeldraden/stamper, stuifmeel, knop) en `erwtenplant` (steunbladeren, ranken, peulen) — ook bruikbaar in Voortplanting bij planten en in film 3.
- `plantje` en `bloemIcoon` (klein symbool voor schema's en tellingen).
- `labmuis` (zwart en albino op de gekeurde muizenpop; nodig: `muis_pop.js` = HondPop + MUIS_DEF uit `lib_dieren.js`) en `muisMet`.
- `kruisSchema` (gameten boven teal / links oker, vakjes vullen, hl, fenotypekleur) — gedeeld met de Erfelijkheid-lessen (`erf_lib.js` heeft een eigen versie: gelijktrekken).
- `generatieLadder` + `zelfLus` (P → F1 → F2 met uitleg van de letters).
- `meioseAa` (vereenvoudigde meiose van één paar met A en a) en `staafAllelK`.
- `f2Veld` (929 stippen, 224 wit) en `SIM2`/`simKolommen` (toevalssimulatie met vaste seed).
- `pincet`; `CAST.mendel` hoort in `personages/lib_cast.js` (castboek).

## Aandachtspunten
- Frisse beeldreview (prompt v13 C10) op 28 okt 2026, contactvel per hoofdstuk: alle MOET-punten hersteld (ladder onder de kopregel, generaties met pijlen in s05/s08, letters bleven staan, inzet en lus botsten niet meer, labels niet afgesneden, gameetkaart en productregelkaart op tijd en binnen beeld, teller in s25 niet te vroeg, kaart in s27 niet over de plant, '?' niet over de kopregel, titelbloemen, losse kaart in s31, vooruitblik in s34).
- KAN, bewust open: binnenkant van de bloem in s04 klein; lege onderhelft in s27 en s34; kleine tekst op de kaarten; het vullen van de schemavakjes in s19 volgt de geschatte woordtijden (silalign).
- 'Terugkruising' voor de kruising met aa: zo in de methode en de syllabus; strikt is dat een testkruising (bronnen.md, twijfel T6).
- Gezin De Wit zonder namen in beeld; genotypen zoals vastgelegd in Chromosomen (ouders Aa, Sara AA, Levi aa, Jens Aa).
- Uitspraak: geen blinde transcriptie gedaan; wachtlijst in `uitspraak.md` (F1/F2, P-generatie, monohybride, inteelt).
- `oefenen.json` nagekeken (geen namen): in `volgorde-mendel` stap 3 zonder chromatiden en stap 4 'laat ze zichzelf bestuiven', zoals in de film.

## Wijzigingen
- 28 okt 2026 — Versie 2.0: lichte remake. Nieuw script op het oude geraamte (opening met gezin De Wit, uitleg P/F1/F2 met de herkomst van de letters, zelfbestuiving van de erwt en F1 × F1, bij dieren broer × zus, gameet, productregel, kansen ≠ aantallen met simulatie, stappenplan, terugkruising, recap bij het gezin), nieuwe stem (30 takes), nieuwe tekeningen (erwtenbloem, erwtenplant, labmuizen, Mendel, generatieladder, meiose Aa, kruisingsschema), huidige speler (snelheid, Vragen aan/uit), donker standaard, bronnenlogboek. Meiose bij de erwt vereenvoudigd en zo benoemd (oude film: 'vier gameten'). De oude film staat in `oud/`.
