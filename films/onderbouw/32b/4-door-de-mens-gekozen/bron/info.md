# Door de mens gekozen — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/32b/4-door-de-mens-gekozen/index.html` (audio in `audio/`: 10 mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, 32B film 4. Kerndoel 32B bullet 4: *beschrijven van aanpassingen van erfelijke eigenschappen door de mens: veredeling, fokken en genetische modificatie*. Bron: SLO, definitieve conceptkerndoelen mens en natuur, nov. 2025 (bijlage Eerste Kamer). |
| Doelgroep / niveau | onderbouw leerjaar 1–3, gemengde groepen. Basislijn eenvoudig; één blok **uitdaging** (s11: CRISPR als moleculaire schaar). Schakelaar **Basis / Uitdaging** (`?niveau=basis`). Nergens havo/vwo genoemd |
| Versie / datum | 1.0 · 20 oktober 2026 |
| Prompt | v6 |
| Stem / model | Roos (`7qdUFMklKPaaAVMsBTBt`), `eleven_v4`, één take per alinea; flow `4pi3akYxSzRYJQijV7Zj` (`stem/tts.json`, `stem/generaties.json`) |
| Woordtijden | Scribe per take; alle 10 woord voor woord gelijk aan de stem-invoer |
| Duur | audio 168 s; speeltijd Uitdaging ± 3:50, Basis ± 3:35, Vragen uit ± 2:55 |
| Beeldstijl | Part C, vlak. Rode draad: tomaten in een kas (Macro-dag `kasDag`) met Lotte en Dr. Kim. `tomatenPlant(maat, ziek, gekozen)`; de keuze van de mens = gouden ovaal; vijf generaties op een rij (`generatieRij`). Honden (`hond(soort)`: wolf, chihuahua, Duitse herder, mopshond), koe met melkflessen, stamboompje voor inteelt met zwak gen (koraal) dubbel. Genetische modificatie: genstreep met een **teal** gen (van een bacterie), bt-maïs met rupsen. CRISPR: DNA-letters met een gouden schaar. |
| Herkomst | uitlegfilm-prompt v6 Part D, reeksmodus 20 okt 2026; werkwijze en bouwstraat als 32B film 1 |

## Bronbestanden
Zelfde opzet als 32B film 1 (`../1-levenscyclus-genen-en-milieu/bron/info.md`, ook voor het opzetten van de werkmap). Scènes in `src/scenes4.js`; gedeelde tekeningen in `src/lib32b.js`; speler en bibliotheek in `src/_base/`; bouwstraat in `bouw/`.

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Macro-dag kas | Lotte met tomaat; kaart 'wilde tomaat ± 1 cm' tegenover '± 7 cm' |
| q02 | Cold open | vraag | hoe is de tomaat zo groot geworden? |
| s03 | Titel | Schema | titel met tomaten van klein naar groot |
| s04 | H1 Veredeling | Schema | vijf generaties, steeds de grootste gekozen (goud); 'net als natuurlijke selectie, maar de mens kiest'; veredeling; kruisen groot × ziektebestendig, stuifmeel, nakomelingen, 'groot én sterk' |
| s05 | H2 Fokken | Schema | wolf → chihuahua, Duitse herder, mopshond; 'toch één soort'; koe en melkflessen; mopshond met korte neus (koraal) |
| q06 | H2 | vraag | waarom vaker problemen bij rashonden? |
| s07 | H2 | Schema | stamboompje: broer en zus, zwak gen dubbel; inteelt |
| s08 | H3 Genetische modificatie | Schema | generaties (tientallen jaren); genstreep met teal gen van een bacterie dat wordt ingeplakt; bt-maïs, rupsen kunnen er niet tegen |
| q09 | H3 | vraag | is genetische modificatie hetzelfde als veredelen? |
| s10 | H3 | Schema | twee kaarten kiezen/veranderen; Dr. Kim en Lotte denken na: Europa strenge regels, veilig? wie heeft voordeel? |
| s11 | H3, uitdaging | Schema | DNA-letters, CRISPR-schaar knipt, één letter verandert (goud) |
| s12 | Samenvatting | Schema → kas | twee kaarten; Lotte met tomaat: 'gekozen door mensen, duizenden jaren lang' |
| s13 | Eindkaart | Schema | Probeer het zelf: supermarkt, rassen, debat; open vraag; 12 s |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q02 | Hoe is de tomaat zo groot geworden? | mest en water · mensen kozen steeds de grootste · vanzelf | b |
| q06 | Waarom vaker erfelijke problemen bij rashonden? | familie van elkaar, zwakke genen gedeeld · slechter eten · lui | a |
| q09 | Is genetische modificatie hetzelfde als veredelen? | ja · nee, kiezen tegenover genen zelf veranderen · nee, veredelen alleen bij dieren | b |
| eindkaart | Koeien die minder snel ziek worden: hoe met fokken, en welk risico? | open | — |

## Begrippen
veredeling, kruisen, fokken, inteelt, genetische modificatie · uitdaging: CRISPR.

## Waar wat in de HTML zit (`index.html`, versie 1.0)
Geen blobs. Regelnummers: FILMDATA 144 · lib32b 898 · tuinDag 906 · scenes-bestand 1005 · SCENES 1034 · s01 1036 · s03 1043 · s04 1047 · s05 1061 · s07 1074 · s08 1081 · s10 1093 · s11 1103 · s12 1109 · s13 1115 · GLOSSARY 1125 · DATA 1134.

## Zo pas je deze film aan
Als 32B film 1 met `scenes4.js`: scène = functie `sNN` in `SCENES`, cues via `q.at('woord', n)` (daarna `cuecheck.py`); alinea opnieuw inspreken = Roos/eleven_v4/één take → Scribe → `audio/sNN.mp3` (−16 LUFS) en `stem/woordtijden/sNN.json` vervangen → `bouw.py`; vragen in `script_v2.md` + `src/vragen.json`; checkvragen in `src/config.json`; docentdeel in `docentdeel.md`. Na elke bouw `python3 scripts/spelerfix.py --check <film>`.

## Uitspraak
Wachtlijst: CRISPR (s11), chihuahua (s05), mopshond (s05), veredeling (s04), genetische modificatie (s08, s10, s12), maïs (s08). Zie `uitspraak.md`.

## Aandachtspunten
- De nadelen van fokken: de korte snuit is een gekozen eigenschap, inteelt verklaart vooral andere erfelijke problemen (docentdeel).
- EU-regels voor nieuwe genomische technieken (CRISPR) veranderen; de film zegt alleen 'strenge regels'.
- Eindcontrole niet door een aparte helper (zie `reviews/review_eind.md`).

## Wijziging 25 okt 2026

- Eindkaart 'Probeer het zelf' (gesproken zin + kaart met opdracht) vervangen door de kaart 'Onthoud' met drie kernzinnen; het eindfragment is nu stilte (woorden leeg). Reden: prompt v10 aanvulling, geen verwijzingen naar tools of opdrachten in de film, vooral niet uitgesproken (Kamiel 25 okt 2026). De bron (scenes, filmdata, script.md) is op dezelfde manier aangepast.
