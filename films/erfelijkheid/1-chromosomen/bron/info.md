# Chromosomen en de taal van erfelijkheid — bronmap

Versie 2.0 is een herbouw in de FILMDATA-straat (25 okt 2026). De oude versie (eigen engine, 12 okt 2026) staat in `oud/` (`1-chromosomen-v1.html`, `script-v1.md`, `info-v1.md`).

| Veld | Waarde |
|---|---|
| Bestand | films/erfelijkheid/1-chromosomen.html (audio in `1-chromosomen/audio/`) |
| Reeks / nummer | Erfelijkheid · film 1 van 6 (§ 3.1 – 3.2) |
| Doelgroep / niveau | havo en vwo bovenbouw, één niveau (geen vwo-blokken) |
| Versie / datum | 2.0 · 25 okt 2026 |
| Prompt | v10 |
| Voldoet aan | prompt v10 (25 okt 2026); bewust niet: één voorspelvraag per hoofdstuk (B4) in hoofdstuk 1, 3 en 5 (Kamiel 25 okt: geen extra vragen) |
| Stem / model | Roos (`7qdUFMklKPaaAVMsBTBt`), ElevenLabs eleven_v4, één take per alinea; flow `oAnn8B6fDC6LBw9fFw28` |
| Duur | ± 9:10 (550 s met hoofdstukkaarten en vragen; 485 s spraak); `duur: 9` in HOOFDSTUKKEN |
| Beeldstijl | Part C: Macro (kamer met gezin De Wit), Micro zonder korrel (huid, kern, DNA), Schema (karyogram, gen/allel, simulatie); zoomcirkels bij elke stap in schaal |
| Audio-opslag | 37 losse mp3's (`../audio/sNN.mp3`), woordtijden `stem/woordtijden/` (silalign, lokaal) |
| Herkomst | verbeterblad 24 okt 2026 (12 voorstellen chr-1 t/m chr-12, alle goedgekeurd), keuring fase 1 25 okt 2026 (`keuring-fase1/`) |

## Opbouw
| Hoofdstuk | Segmenten | Type · look | Kernbeeld |
|---|---|---|---|
| Opening | s01–s03 | haak · Macro | gezin De Wit in de kamer; Levi (10) heeft albinisme; kaarten Puzzel 1 en 2; camera zoomt naar Marieke |
| 1. Van huid naar DNA | s05–s08 | A/B · Micro | onderarm Marieke → zoomcirkel 1 mm huid → doorlopende zoom naar de basale laag → zoomcirkel kern met chromatine; DNA van 2 m naast Marieke; chromatine condenseert; zoomcirkel DNA rond eiwitten; zusterchromatiden, centromeer |
| 2. Het karyogram | s09–s17 | B · Schema | tellen tot 46 (gouden stip per chromosoom), × 2 = 92, sorteren tot karyogram (vrouw), vader teal / moeder oker, homologe paren, eicel + zaadcel, eicel n = 23 met één chromatide, haploïd/diploïd, autosomen, XX en XY, misvatting 'mannen geen X' |
| 3. Gen, locus en allel | s18–s22 | B · Schema | paar 11 met gouden band (gen), stippellijn (locus), DNA-volgorde met één verschil, twee eiwitten, kaarten gen/allel, misvatting |
| 4. Van allel naar eigenschap | s23–s32 | A · Micro/Schema | basale laag met pigmentcellen; simulatie tyrosinase; allel A/a; drie panelen AA/Aa/aa met meter en huidstaal; fenotype, dominant/recessief, twee misvattingen, homo-/heterozygoot, notatie |
| 5. Genotype en milieu | s33–s34 | D · Schema | onderarmen van Marieke in schaduw/zon met zoomcirkels naar de pigmentcellen; Levi's arm (aa) in de zon zonder pigment |
| 6. Terug naar de familie + recap | s35–s41 | E · Macro | allelchips Aa bij de ouders, de twee a's gaan naar Levi (aa), lijstjes van de grootouders, Sara AA en Jens Aa, kruisingsschema als vooruitblik |

## Vragen
| Segment | Vraag | Opties | Juist |
|---|---|---|---|
| q14 | Hoeveel chromosomen zitten er in één eicel? | a 46 · b 23 · c 92 | b |
| q28 | Hoeveel melanine maakt een pigmentcel met Aa? | a ongeveer evenveel als bij AA · b ongeveer de helft · c helemaal geen | a |
| q37 | Kunnen twee ouders met Aa een kind met albinisme krijgen? | a nee · b alleen als opa/oma het had · c ja, als het kind van allebei a krijgt | c |

Vragen uit: de speler knipt in s13 vanaf 'Wat denk je?' (5,4 s) en laat s27 en s36 helemaal weg; s15, s29 en s38 beginnen met een eigen uitlegzin (geen kort antwoord). Gecontroleerd met `?vragen=uit` (timeline) en `antwoordtekst.py --check`, `kortantwoord.py --check`.

## Begrippen
chromosoom, karyogram, homologe chromosomen, haploïd (n) en diploïd (2n), autosomen en geslachtschromosomen, gen, locus, allel, genotype, fenotype ('de eigenschap die je kunt waarnemen'), dominant en recessief, homozygoot en heterozygoot, milieu (`film.py`, `glossary`).

## Docentdeel
In `sections.html`: checkvragen (6), hoe de film het uitlegt, misvattingen, getallen en bronnen, keuzes en vereenvoudigingen (OCA1A/OCA1B, 'half zoveel enzym' als model, geslachtschromosomen meestal), plaats in de reeks, lessuggesties. Alle beweringen met bronnen: `bronnen.md`.

## Waar wat in de HTML zit
Regelnummers in `../../1-chromosomen.html` (versie 2.0):
- r. 101 begrippen (`#glossary`), r. 112 docentdeel.
- r. 4145 `huidDoorsnede`, r. 4288 `kernChromatine`, r. 4318 `nucleosoomDraad`, r. 4358 `onderarm` (gedeelde bibliotheek, gekeurd 25 okt), r. 4420 `dnaDraad`.
- r. 4748 eigen tekenhulpen (`CH`, kamer, gezin, lijstjes, allelchip, huidcamera, karyogram-indeling `KROW`/`kSlot`), r. 4826 `runSim` (simulatie, vaste seeds).
- r. 4897 `Object.assign(SCENES, …)`: één functie per alinea (s05 r. 4918, s11 r. 4975, s26 r. 5066, s38 r. 5109).
- r. 5136 `const DATA` (filmdata: segmenten, woordtijden, vragen).

## Zo pas je deze film aan
Werkmap buiten de repo (bv. `hw/chr1`), met de bestanden uit deze bronmap: `segments.json`, `film.py`, `sections.html`, `uitspraak_film.json`, `src/teken_chr1.js`, `src/scenes_chr1.js`, audio als `audio/` en woordtijden als `words/`; engine = `src/` + `bouw/` (en `src/scenes_kop.js` = de regels 1–32 van de engine-scenes). Bouwen: `bouw.sh` (zet `scenes.js` = kop + `lib_bio.js` + `lib_micro_evo.js` + teken + scenes, dan `film.py`, `build_data.py`, `build.py`), stills met `bouw/stills.py <map> qa contact`, inpakken met `bouw/pak.py`. Daarna in de repo `spelerfix`, `antwoordtekst`, `kortantwoord`, `flipkaarten`, `teller`, `licentie_noot`, `tabel_mobiel`, `oefenen`, `reviewlijst` draaien.
- Beeld wijzigen: alleen in `scenes_chr1.js` (zelfde cue-woorden; let op dat q.at op een stukje van een woord zoekt, dus nooit op 'aa' cuen). Gedeelde tekeningen wijzig je in `bibliotheek/lib_bio.js` (en testvel), niet hier.
- Tekst wijzigen = die alinea opnieuw inspreken (één take, stem-invoer uit `segments.json` na `make_segments.py`), woordtijden met `silalign.py`, blind transcriberen alleen die alinea.

## Aandachtspunten
- Frisse beeldreview (C10.7) door een aparte helper is nog niet gedaan: in deze sessie kon geen helper gestart worden; de maker liep de contactbladen zelf na met de checklist (zie OVERDRACHT). Laat een frisse reviewer het nog doen.
- De zoom van de onderarm naar de cel is zoomcirkel + doorlopende camerazoom over één huidplaat van 1 mm; '50 miljoen keer' is een orde van grootte.
- Klemtoon van DNA, allel en genotype staat op de wachtlijst voor Kamiels oor (`uitspraak.md`).

## Wijzigingen
- 25 okt 2026 — Versie 2.0: herbouw in de FILMDATA-straat volgens het verbeterblad (chr-1 t/m chr-12) en prompt v10; nieuwe stem (37 takes, s30 en s35 na de keuring opnieuw), gezin De Wit, nieuwe gedeelde tekeningen (huid, kern, DNA rond eiwitten, onderarm), karyogram en simulatie opnieuw gebouwd, huidige speler (snelheid, Vragen aan/uit), donker standaard, bronnenlogboek. De oude film staat in `oud/`.
