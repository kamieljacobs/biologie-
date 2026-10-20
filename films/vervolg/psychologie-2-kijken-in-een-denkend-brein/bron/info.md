# Kijken in een denkend brein — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/psychologie-2-kijken-in-een-denkend-brein.html` (audio in `psychologie-2-kijken-in-een-denkend-brein/audio/`) |
| Reeks | Wat word jij? · gedeelde film van Psychologie en Neurowetenschappen (`id: hersenmeten` in GEBIEDEN van vervolg.html) |
| Niveau | vwo (één niveau) |
| Versie | 1.1 · 20 oktober 2026 |
| Stem | Roos (ElevenLabs eleven_v4), één take per alinea, flow q7TiGffg8rNkGI8jwEov |
| Duur | spraak 10:54 (654 s); met vragen en kaarten ± 12 min |
| Beeldstijl | Part C · Schema, met cast (Yasmin, Dr. Kim, Opa Henk) |
| Bouwvorm | FILMDATA-straat van de therapiefilm (`bron/src` + `bron/bouw`), speler uit films/gedrag/5-emotieregulatie (met spelerfix) |
| Herkomst | gemaakt door Claude in reeksmodus, 20 okt 2026; script v1 → review (reviews/review_v1.md) → v2 |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | Yasmin met nieuwsbericht 'verliefdheidsgebied', scan met oranje vlek; vraag 1 (antwoord pas in H3) |
| H1 Wat ontbreekt er? | s04–s09 | vier soorten manieren; leeg methodenbord; Broca 1861 ('tan', schade links voorin); Gage 1848 (schedel met staaf, arts 1868, mythe 'dronken zwerver', postkoets Chili); drie beperkingen; Opa Henk na een beroerte; rij laesie |
| H2 Elektriciteit meten | s10, q11, s12, s13 | Dr. Kim en Yasmin met EEG-kap; EEG = optelsom; Berger, alfaritme; gezichten/huis; gemiddelde golf (N170); beslagen raam; elektrode bij één cel, kat en streepje (Hubel en Wiesel); 86 miljard; rijen EEG en cel |
| H3 Waar gaat het bloed heen? | s14, s15, s16, q17, s18, s19 | scanner met liggende Yasmin; bloedvat gaat open; BOLD-curve piek na ± 5 s; voxelraster; blokjes gezichten/huizen; aftrekken; dode zalm, toevalsvoxels, correctie, Ig Nobel 2012; antwoord vraag 1; verliefdheid/chocola/gamen naar hetzelfde gebied; rij fMRI |
| H4 Zelf aan- en uitzetten | s20, q21, s22, s23 | TMS-spoel, hand trekt; plaatjes benoemen met Broca en controleplek; buitenste laag; depressiebehandeling; muis met lichtvezel, kanaaltje opent bij blauw licht; Nobelprijs 2026; bord compleet |
| Recap | s24, q25, s26 | nieuwsbericht opnieuw; vol bord; methodekeuzevraag (TMS); vraag–methode–eerlijk |
| Eindkaart | s27 | drie regels |

## Vragen
- q02 (cold open): oranje vlek → **b** meer bloed dan bij een andere taak (antwoord uitgesteld tot s19).
- q11: waar is EEG goed in → **a** wanneer.
- q17: dode zalm → **b** een paar blokjes, toeval.
- q21: TMS op Broca → **a** het gebied helpt bij benoemen (c = alleen 'actief', de correlatie-afleider).
- q25: methode voor 'nodig om te concentreren' → **c** TMS.

## Begrippen
laesie, laesieonderzoek, gebied van Broca, EEG, elektrode bij één cel, fMRI, voxel, controletaak, correctie voor meervoudig toetsen, TMS, optogenetica, correlatie en oorzaak (in `film.py` → `glossary`).

## Docentdeel
In `sections.html`: vijf checkvragen met antwoorden; plaats, hoe de film het uitlegt, misvattingen, getallen met bronnen, vereenvoudigingen (bord is een model; BOLD-uitleg; TMS-voorbeeld vereenvoudigd; Gage volgens Macmillan), lessuggesties.

## Getallen en bronnen
Zie de tabel in `sections.html` (Broca 1861, Gage 1848 en Chili, Hubel en Wiesel 1959, Berger 1924 en alfaritme, N170, BOLD-piek ± 5 s, voxels van een paar mm met een paar miljoen neuronen, dode zalm 2009 en Ig Nobel 2012, TMS 1985 en depressie, optogenetica 2005 en Nobelprijs 2026). Gecontroleerd met de webbronnen in die tabel en door de reviewer (reviews/review_v1.md, kop).

## Waar wat in de HTML zit (films/vervolg/psychologie-2-kijken-in-een-denkend-brein.html, v1.0)
| Regel | Inhoud |
|---|---|
| 98 | Begrippen (`#glossary`, gevuld uit GLOSSARY) |
| 100–111 | Checkvragen |
| 112–160 | Voor de docent |
| 161 | `window.FILMDATA` (segmenten, woordtijden, vragen) |
| 1522 | `const SCENES = {}` (daarvoor: lib.js, lib_voeding/hormonen/cast, helpers_gd12) |
| 1523–1677 | `brein()` en `teken.js`: methodenBord (BORD_RIJEN), schedelStaaf, eegKap, golf, neuronElektrode, spikeSpoor, streepScherm, scanner, bloedvat, voxelRaster, zalm, spoel, muis, lichtKanaal |
| 1678–1839 | `scenes_br.js`: extra tekeningen (nieuwsKaart, iconen, boldGrafiek, erpGrafiek) en `Object.assign(SCENES, { title, s01 … s26 })` |
| 1840 en verder | speler |

## Hoe je de film aanpast
Werkmap: kopieer `bron/` naar een werkmap `hw/br`; zet `bron/src/*` + `bron/bouw/*` samen in `hw/engine/`; `stem/woordtijden/` → `hw/br/words/`; `../audio/` → `hw/br/audio/` én `hw/br/raw/` (silalign leest `raw/`). Dan:
- **Tekst:** `script_v2.md` aanpassen → `python3 engine/make_segments.py br script_v2.md` (nummert opnieuw: voeg je een alinea in, hernoem dan audio en woordtijden) → alleen gewijzigde alinea's opnieuw inspreken (Roos, eleven_v4, één take, stem-invoer uit `segments.json` → `voice`) → mp3 in `raw/` en `audio/` → `python3 engine/silalign.py br <sid>` → `python3 br/film.py` (vanuit `br/`) → `python3 engine/build_data.py br` → `python3 engine/build.py br` → kopieer `br/film/psychologie-2-kijken-in-een-denkend-brein.html` naar `films/vervolg/` en vervang de terugknop `../../index.html#vervolg` door `../../vervolg.html#psychologie`.
- **Beeld:** `src/scenes_br.js` of `src/teken.js` aanpassen → `cat helpers_gd12.js > scenes.js; echo 'const SCENES = {};' >> scenes.js; cat brein.js teken.js scenes_br.js >> scenes.js` → `build.py` → kopiëren als hierboven.
- **Vragen, begrippen, docentdeel:** `film.py` en `sections.html` → `python3 film.py` → `build_data.py` → `build.py`.
- Cue-woorden: `q.on(woord, n)` telt het n-de woord dat het woord bevat (deelwoord). Let op: in s04 komen 'waar' en 'wanneer' twee keer voor (eerst in 'Hoe precies weet je waar?'), in s19 'bee', in s08 'schade' twee keer.
- Na het kopiëren: `python3 scripts/spelerfix.py`, `python3 scripts/flipkaarten.py`, `python3 scripts/tabel_mobiel.py`, `python3 scripts/teller.py`, `python3 scripts/licentie_noot.py`, `python3 scripts/vervolg_films.py`.

## Aandachtspunten
- Uitspraakwachtlijst: zie `uitspraak.md` (fMRI, TMS, laesie, Broca, Gage, Hubel, Berger, Chili, Ig Nobel). Geen blinde transcriptie gedaan.
- Historische personen (Leborgne, Gage) zijn bewust niet als figuur getekend: alleen tekstballon, brein en schedel (beeldafspraak: mensen alleen uit het castboek).
- Woordtijden komen uit `silalign.py` (stiltes + leestekens); bij s09 vielen 5 van de 7 leestekens niet op een stilte, daar zijn cues iets minder precies.
- De film staat niet in `HOOFDSTUKKEN` van `index.html`; de duur voor de teller staat in `films/vervolg/films.json`.
- Geen loudness-normalisatie gedaan; alle takes uit één stem en model.

## Wijziging 20 okt 2026 (v1.1, na de eindreview)
Eindreview door een frisse helper (`reviews/review_eind.md`, 13 MOET-punten) verwerkt. Opnieuw ingesproken: s10 ('ruim honderd jaar geleden'), s13 ('een paar duizend cellen'), s22 (ingrijpen laat zien dat een gebied nodig is; bij lange uitval kunnen andere gebieden overnemen), samen 2.047 credits. Beeld: bord breder (OORZAAK? past), label 'elektrode bij één cel', laesie bij waar middelmatig; Dr. Kim houdt de TMS-spoel aan een kabel; gezichten als stimuli zijn nu castpersonages in fotolijstjes; zalm krijgt foto's van mensen; membraan bij optogenetica gebogen; muislabels uit de lichtvezel; EEG-curves binnen de assen; Gage-staaf schuin.
