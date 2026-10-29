# Wat groeit er op je boterham? — bronmap

| Kenmerk | |
|---|---|
| Bestand | `films/cellen/microben.html` (audio in `microben/audio/`) |
| Reeks | Cellen · losse film bij Biologie voor jou havo 4 § 4.2 Bacteriën, virussen en schimmels |
| Niveau | havo 4 (één niveau) |
| Versie | 1.1 · oktober 2026 (1.0 = 26 oktober 2026, script v2; 1.1 = 29 oktober 2026, opwaardering naar prompt v13) |
| Prompt | v13 |
| Voldoet aan | prompt v13 (29 okt 2026, zonder keuring; zie 'Versie 1.1' en `opwaardering-v13.md`) |
| Stem | Roos (ElevenLabs eleven_v4), één take per alinea; generation-id's in `stem/gen.json`, sessies in `stem/sessions.json`; blinde uitspraakcheck in `stem/transcriptcheck.md` |
| Duur | spraak 7:12 (432 s); met vragen en kaarten ± 9 min |
| Beeldstijl | Schema (keuken, practicumlokaal) met cast (Noor, Teun, Mevrouw Visser); Micro in zoomcirkels (hyfen, bacterie, virus, schaalladder); Macro-dag alleen bij de paddenstoel. Schimmel teal-grijs (groen = plant); bacterie sinds 1.1 als beeldbankcel (oker wand, grijs DNA) |
| Bouwvorm | FILMDATA-straat (`bron/src` + `bron/bouw`), werkwijze in `films/vervolg/BOUWEN.md` |
| Medaillon | `img/kunst/films/microben.webp` (los medaillon, ElevenLabs-flow JjEYm3AOoxNDs3o3VI8L) |
| Herkomst | gemaakt door Claude, 26 okt 2026, spec `films/cellen/microben/BRIEF.md`, raadsel B (vergeten boterham). Werkwijze prompt v10: 4 scriptvarianten via dobbelsteen (werk/script_A–D) + blinde beoordelaar (werk/blind/, nipt → combinatie) → v1 → frisse bronnen- en scriptreview (reviews/review_v1.md) → v2 → storyboard; twijfelscènes gekeurd door Kamiel (artifact https://claude.ai/artifact/8BmLhCo7ufjEUFa1s8yhTK) → opname → frisse beeldreview (reviews/review_beeld.md), alle MOET-punten verwerkt |

## Opbouw
| Hoofdstuk | Segmenten | Kernbeeld |
|---|---|---|
| Cold open | s01, q02 | keuken: Noor met de vergeten broodtrommel, Teun: 'Er groeit een plantje!' |
| Titel | s03 | titelkaart |
| H1 Drie zakjes | s04, s05, q06, s07, s08 | practicumlokaal: droog / nat / nat in de koelkast, alle drie dicht; sporenregen in de lucht |
| H2 Draden in het brood | s09–s17, q12, q16 | zoomcirkel in het brood: hyfen, mycelium, sporen, kernen, chitine, vertering buiten de cel; wegsnijden helpt niet; gist met knopvorming; paddenstoel met mycelium in de grond |
| H3 Puntjes op de voedingsbodem | s18–s25, q21, q24 | schaaltjes dicht / vingers / lucht; kolonie; bouw van een bacterie (E. coli) naast de rand van een lichaamscel; tweedeling; groeigrafiek |
| H4 Een nies? Liever niet | s26–s32, q27, q31 | gedachte-experiment (niet niezen op een schaaltje); virus heeft een gastheercel nodig; bouw en grootte van virussen, schaalladder met grens lichtmicroscoop; antibiotica niet tegen virussen |
| H5 Wie leeft waarvan? | s33–s38, q34 | bacteriën ≈ eigen cellen (2016); reducent, mutualisme (klaver), parasitisme (voetschimmel); yoghurt; Fleming en penicilline |
| Recap | s39 | terug bij de trommel |
| Eindkaart | s40 | eindhaak: welke microben heb jij vandaag al gebruikt? |

## Vragen
q02 → b; q06 → b; q12 → c; q16 → a; q21 → a; q24 → c; q27 → b; q31 → a; q34 → b (tekst en uitleg in `film.py`).

## Begrippen
schimmel, hyfe, mycelium, spore, vruchtlichaam, gist, prokaryoot, eukaryoot, plasmide, tweedeling, kolonie, virus, reducent, symbiose, parasiet, antibioticum.

## Waar wat in de HTML zit
| Regel | Inhoud |
|---|---|
| 102 | Begrippen |
| 104 | Checkvragen |
| 116 | Voor de docent |
| 167 | `window.FILMDATA` (segmenten, woordtijden, vragen) |
| 2080 | `const SCENES = {}` (gedeelde engine: brein, teken, extra, lib_bio = actuele beeldbank van 29 okt 2026, o.a. `bacterieEcht` r. 4939, `petrischaal` r. 9438, `schimmelGist` r. 10480) |
| 11164 | tekenfuncties van deze film (`MI` kleuren, `miBoterham`, `miKolonie`, `miTrommel`, `miMycelium`, `miSpore`, `miVirus` r. 11276, `miFaag`, `miBacterie` r. 11313 (= `bacterieEcht`, tweedeling uit twee gehalveerde cellen), `miGist` r. 11335 (= `schimmelGist`), `miLadder`, `miSchaal` r. 11349 (= `petrischaal`), `miSchaalBoven` (alleen s38), `miZakje`, `miPaddenstoel`) |
| 11391 | decorhulpjes (`keuken`, `lokaal`, `trommelBrood`, `sporenRegen`, `groeiGrafiek` …) |
| 11438 | scènes per alinea (`title`, `s01` … `s39`) |
| 11645 | speler (`const DATA = window.FILMDATA`) |

## Hoe je de film aanpast
Werkmap `hw/mi` opzetten volgens `films/vervolg/BOUWEN.md` (`src/` en `bouw/` naar `engine/`, de rest naar de werkmap; `stem/woordtijden` naar `words/`, `../audio` naar `audio/` en `raw/`). Bouwen: `bash mi/bouw.sh` (zie `bouw.sh`); in de repo zetten met `engine/pak_thema.py mi cellen` (= pak.py met doel `films/<hoofdstuk>/`).
- Tekst: pas `script_v2.md` aan, `python3 engine/make_segments.py mi script_v2.md`, spreek alleen gewijzigde alinea's opnieuw in (Roos, eleven_v4, één take, uitspraakregels uit `films/uitspraak.json`), `python3 engine/silalign.py mi <sid>`, werk `stem/gen.json` bij.
- Beeld: bewerk `scenes_mi.js` / `teken_mi.js` (cues: `q.on('woord', n)`; controle met `engine/cuecheck.py`).
- Vragen, begrippen, docentdeel, eindhaak: `film.py` en `sections.html`, dan `python3 film.py`.
- Na elke (her)bouw: `scripts/spelerfix.py`, `antwoordtekst.py`, `kortantwoord.py`, `antwoordletter.py`, `flipkaarten.py`, `teller.py`, `licentie_noot.py`, `reviewlijst.py`.

## Site en planner
- `HOOFDSTUKKEN.cellen.films` in `index.html` (+ `FILMKUNST.microben`, `FICOON`).
- Jaarplanner havo 4 § 4.1 + 4.2 (week van 4 januari 2027), Nijmegen én Groesbeek (`havo4`, `havo4gb`); `jaarplanner-dekking.json` `bvj-havo4` § 4.2: kern, dekking goed. Termen niet gecontroleerd tegen de boektekst.

## Versie 1.1 (29 okt 2026, opwaardering v10 → v13, zonder keuring)
Alleen wijzigingen die volgen uit regels die Kamiel al gaf; stem, script, takes, vragen, timings, speler en datum in index.html ongewijzigd. Oude versie: `bron/oud/microben-1.0.html`. Details en lijsten voor Kamiel: `opwaardering-v13.md`.
- `bron/src/lib_bio.js` en `lib_cast.js` vervangen door de actuele beeldbank (29 okt 2026); `film.py` versie 1.1.
- Kleuren (palet B, 28 okt): DNA grijs, RNA teal, kern paars; het eigen lavendelpaars (`MI.rna`) is weg. Virussen (verkoudheid, griep: RNA-virussen) hebben teal RNA; kernen in hyfe en spore blijven paars. Bacterie-DNA en plasmide grijs (via de beeldbank).
- s19, s20, s22, s23, s25, s32, s38 en recap: bacterie vervangen door `bacterieEcht` (wand, membraan, nucleoïde, ribosomen, fimbriae). s20 groter (700 px) met labels opnieuw direct bij het onderdeel en gouden stippelrand als accent voor DNA, plasmide en membraan (wand en ribosomen lichten via de bibliotheek goud op). s23: tweedeling opnieuw getekend met dezelfde cel (nucleoïde verdubbelt, kerf, uit elkaar), cel groter (400 px).
- s14 en schaalladder (s29): gistcel = `schimmelGist` (wand, vacuole, kern, knoplitteken); label 'knop' hoger.
- s18, s19, s26, s28 en telefoon (s33): petrischaal = `petrischaal` (3/4-aanzicht, agar, kolonies als bultjes, deksel, plakband als aparte laag). s38 (Fleming, remmingszone) blijft bewust bovenaanzicht (`miSchaalBoven`).
- Niet aangeraakt: personages (lib_cast alleen bijgewerkt), schimmel/hyfe/brood-tekeningen (geen betere beeldbankversie die dezelfde scène draagt), microscoop (niet in de film).

## Aandachtspunten
- Veiligheid: de film laat níét op een schaaltje niezen (gedachte-experiment); kweken alleen vingers/lucht bij kamertemperatuur, dicht met plakband, verhitten vóór afvoer (MISAC, Practical Biology).
- Aantal dagen tot zichtbare schimmel staat bewust niet in de film (geen betrouwbare bron).
- 'Sporen komen pas na het bakken op het brood' rust op bronnen van de bakkerssector (zie bronnen.md).
- Schimmels teal-grijs i.p.v. groen (groen = plant); vraag aan Kamiel of dat voor alle films moet gelden.
- Uitspraak nog na te luisteren: zie `uitspraak.md`.
- Openstaande KAN-punten uit de beeldreview staan in `reviews/review_beeld.md`.
