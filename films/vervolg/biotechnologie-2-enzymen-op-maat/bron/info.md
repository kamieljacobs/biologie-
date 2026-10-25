# Enzymen op maat — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/vervolg/biotechnologie-2-enzymen-op-maat.html` (audio in `biotechnologie-2-enzymen-op-maat/audio/`) |
| Reeks | Wat word jij? · Biotechnologie en life sciences, film 2 van 3 |
| Niveau | havo + vwo (één niveau) |
| Prompt | v10 |
| Versie | 1.0 · 25 oktober 2026 (script v2) |
| Stem | Roos (ElevenLabs eleven_v4). één take per alinea. 5.338 tekens (flow in `stem/sessions.json`) |
| Duur | spraak 5:54 (354 s); met vragen en kaarten ± 7 min |
| Beeldstijl | Schema met cast (Sam, Merel); Micro alleen in zoomcirkels |
| Bouwvorm | FILMDATA-straat van de Wat word jij?-films (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Herkomst | gemaakt door Claude, 25 okt 2026; drie scriptvarianten + blinde beoordelaar (werk/blind) → v1 → frisse feitenreview (reviews/review_v1.md) → v2 → twijfelscènes gekeurd door Kamiel (werk/twijfelblad; eivlek als kluwen) → inspreken → frisse beeldreview (reviews/review_beeld.md, 12 MOET verwerkt) |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld (uit het script) |
|---|---|---|
| Cold open | s01, q02 | wasmachine met een venster, display '30 °C'; de trommel stopt, Sam haalt een witte broek met een gele eivlek uit (vlek blijft); naast hem een pak wasmiddel met drie kleine enzymschaartjes (grijsblauw, goud actief centrum) op het etiket |
| Hoofdstuk 1 — Ronde één: waar test je op? | s04, s05, s06, s07, q08, s09 | Schema → Micro: de eivlek in de vezel, zoom op eiwitketens (kralenketting) die een grijsblauw schaartje in stukjes knipt, stukjes spoelen weg, het schaartje schuift door; terug: drie vlekken naast elkaar (ei, pasta, boter) met elk hun eigen schaartje; balk 'energie van een wasbeurt', grotendeels koraal (opwarmen water), daarna 40 → 30 °C en de balk een derde korter, label 'ongeveer'; dan Merel in het enzymlab met een buisje teal Bacillus; drie koraal kaartjes bij een waswatertank: 'koud', 'basisch', 'bleekmiddel'; het startenzym verliest bij 'bleekmiddel' zijn vorm; paars gen met willekeurige stipjes (mutaties) dat over veel teal bacteriën verdeeld wordt, label 'ronde 1' |
| Hoofdstuk 2 — Ronde één: de uitslag | s10, q11, s12, s13 | Sam strijkt bacteriën uit op een troebele witte plaat (melk), label '30 °C · basisch'; kolonies (teal) met heldere ringen eromheen, de meeste klein of zonder ring, een paar groot met een goud randje; teller 'duizend kolonies'; Sam met zijn handen in zijn haar boven een stapel platen, Merel ernaast; daarna een plaat met zesennegentig putjes die in verschillende sterkte kleuren, een meetkop schuift eroverheen; per putje twee balkjes: 'knippen bij 30 °C' en 'over na bleek'; teller 'tot zo'n tienduizend per dag' |
| Hoofdstuk 3 — Ronde twee en drie: kiezen en stapelen | s14, q15, s16, s17, q18, s19, s20, s21 | Schema → Micro: drie putjes groot uitgelicht met hun twee balkjes (variant 1: knippen hoog, bleek laag; variant 2: beide iets boven de startlijn; variant 3: bleek hoog, knippen laag); variant 2 krijgt een groen vinkje en gaat naar 'ronde 2'; Micro: het protease als gevouwen keten, goud actief centrum, één aminozuur bij het actieve centrum gemarkeerd 'methionine 222'; een bleekmolecuul (koraal) komt erop af; Sam wisselt het voor 'alanine'; bleek kaatst af, maar de keten verschuift een beetje en het schaartje knipt langzaam (klokje); dan kaartje 'Frances Arnold · 1993 · drie rondes' met een staafje dat in drie stappen groeit tot '× 256', label 'in een oplosmiddel'; Nobelprijsmedaille 2018; tot slot Sams drie platen naast elkaar, ronde 1 → 2 → 3, de beste ring steeds groter |
| Hoofdstuk 4 — Van plaat naar product | s22, q23, s24, s25, s26 | Schema → Micro: Sams plaat met één kolonie met een grote ring, goud omcirkeld; pijl naar een paars gen dat in een teal Bacillus-cel gaat (binnen het membraan); de bioreactor uit film 1 met roerder en belletjes; zoom in de tank: bacteriën die grijsblauwe schaartjes naar buiten afgeven; filter: cellen eruit, heldere vloeistof door; korrels; kaartje 'octrooi · tot 20 jaar'; dan een fabriekshal van een medicijnfabriek, kaartje 'sitagliptine · diabetesmedicijn · Merck en Codexis', een schaartje met veel goud gemarkeerde plekken, label 'ruim twintig veranderingen · tienduizenden keren beter', twee balken afval (de tweede korter, groen) en een doorgestreept metaal-icoon |
| Recap | s27, s28 | terug naar de wasmachine; Sam haalt dezelfde witte broek eruit, de eivlek is weg; ernaast de drie platen van ronde 1, 2 en 3 als kleine kaartjes met steeds grotere ring, dan de Bacillus-cel en het pak wasmiddel; daarna opleidingskaartjes en twee werkplekken |

## Vragen
q02 → b; q08 → a; q11 → b; q15 → c; q18 → a; q23 → c (zie film.py).

## Begrippen
enzym, protease, amylase en lipase, variant, gerichte evolutie, gericht ontwerp, screenen, octrooi.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 98 | Begrippen |
| 100 | Checkvragen |
| 116 | Voor de docent |
| 159 | `window.FILMDATA` |
| 1964 | `const SCENES = {}` |
| 4578 | scènes per alinea |

## Hoe je de film aanpast
Werkmap `hw/bt2` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py <d> script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take), `python3 engine/silalign.py <d> <sid>`, werk `stem/gen.json` bij. Opties van vraagkaarten en de eindkaart worden niet uitgesproken.
- Beeld: bewerk `scenes_<d>.js` / `teken_<d>.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`), dan scenes.js samenvoegen zoals in BOUWEN.md.
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Bouwen: `python3 engine/build_data.py <d> && python3 engine/build.py <d>`; in de repo zetten: `python3 engine/pak.py <d> biotechnologie`, daarna `scripts/spelerfix.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `vervolg_films.py`.

## Aandachtspunten
- Methionine 222: activiteit van Ala222 omstreden, daarom vaak trager
- 30 tegen 40 graden alleen B-bronnen, daarom ongeveer
- Frances Arnold alleen als naamkaartje

Engine en reeksbibliotheek: `src/teken_bt1.js` (cast Sam en Merel, bioreactor, bacterie, labvloer) komt uit film 1 *Bacteriën als fabriek*; `src/lib_bio.js` is de gedeelde tekenbibliotheek. Bronnenlogboek: `bronnen.md`.

Voldoet aan: prompt v10 (25 okt 2026).
