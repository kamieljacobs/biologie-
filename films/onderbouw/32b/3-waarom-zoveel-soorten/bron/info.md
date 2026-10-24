# Waarom zoveel soorten? — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/32b/3-waarom-zoveel-soorten/index.html` (audio in `audio/`: 10 mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, 32B film 3. Kerndoel 32B bullet 3: *verklaren van het ontstaan van biodiversiteit door evolutie: mutaties, natuurlijke selectie en soortvorming*. Bron: SLO, definitieve conceptkerndoelen mens en natuur, nov. 2025 (bijlage Eerste Kamer). |
| Doelgroep / niveau | onderbouw leerjaar 1–3, gemengde groepen. Basislijn eenvoudig; één blok **uitdaging** (s11: cichliden in het Victoriameer). Schakelaar **Basis / Uitdaging** (`?niveau=basis`). Nergens havo/vwo genoemd |
| Versie / datum | 1.0 · 20 oktober 2026 |
| Prompt | v6 |
| Stem / model | Roos (`7qdUFMklKPaaAVMsBTBt`), `eleven_v4`, één take per alinea; flow `6e2TdUgGchhWRuLN3VM0` (`stem/tts.json`, `stem/generaties.json`) |
| Woordtijden | Scribe per take; alle 10 woord voor woord gelijk aan de stem-invoer |
| Duur | audio 170 s; speeltijd Uitdaging ± 3:55, Basis ± 3:35, Vragen uit ± 3:00 |
| Beeldstijl | Part C, vlak. Rode draad: muizen (`muis(x,y,s,licht)`, vachtkleur = `VACHT(l)` van donkerbruin naar zandkleur) in het bos (Macro-dag `bosAchter`) en op het witte strand (`strandAchter`) met uil en reiger. Mutatie = paars vakje met gouden sterretje op de genstreep. Selectie = 35 % dimmen + groene cirkel om wie overblijft; grafiek en raster per generatie **berekend** met `pop()` (seeded model). Soortvorming: gescheiden kaarten bos/strand, uitwaaierende boom. Paard, ezel, muilezel (`paard()`), cichliden (`cichlide`). |
| Herkomst | uitlegfilm-prompt v6 Part D, reeksmodus 20 okt 2026; werkwijze en bouwstraat als 32B film 1 |

## Bronbestanden
Zelfde opzet als 32B film 1 (`../1-levenscyclus-genen-en-milieu/bron/info.md`, ook voor het opzetten van de werkmap). Scènes in `src/scenes3.js`; gedeelde tekeningen in `src/lib32b.js`; speler en bibliotheek in `src/_base/`; bouwstraat in `bouw/`.

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Schema | kever, vis, boom, paddenstoel; boom van afstamming uit een paar cellen; vraagteken |
| q02 | Cold open | vraag | hoe ontstaat een nieuwe soort? |
| s03 | Titel | Schema | titel met vijf muizen van donker naar licht |
| s04 | H1 Iedereen een beetje anders | Macro-dag bos | muizen met variatie; genstreep met mutatie (✶); doet niets · schadelijk · heel soms handig; lichte muis omcirkeld |
| s05 | H2 Wie overleeft? | Macro-dag bos → strand | muizen verspreid; strand met wit zand, uil en reiger; vraagteken |
| q06 | H2 | vraag | welke muizen het vaakst gepakt? |
| s07 | H2 | Macro-dag strand | donkere muizen dimmen, lichte groen omcirkeld; 'meer jongen · erven'; generaties 0–12 met berekend aandeel en grafiek; 'Ik word nu licht' doorgestreept |
| s08 | H3 Van één soort naar twee | Schema | kaarten bos/strand gescheiden, muizen veranderen; 'twee soorten'; paard + ezel → muilezel |
| q09 | H3 | vraag | paard en ezel één soort? |
| s10 | H3 | Schema | muilezel 'geen jongen'; definitie soort; boom van soortvorming; biodiversiteit |
| s11 | H3, uitdaging | Schema | Victoriameer, cichliden van een paar naar veel; vijf plekken/voedsel |
| s12 | Samenvatting | Schema | vier kaarten mutatie → selectie → gescheiden → nieuwe soorten; haak 'geen enkel dier doet het expres' |
| s13 | Eindkaart | Schema | Probeer het zelf: verstoppertje, ronde 2, zoek de soort; open vraag; 12 s |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q02 | Hoe ontstaat een nieuwe soort? | dier verandert omdat het moet · groep verandert over generaties · twee soorten samen | b |
| q06 | Welke muizen worden op wit zand het vaakst gepakt? | donkere · lichte · even vaak | a |
| q09 | Paard + ezel = muilezel: één soort? | ja, jong samen · nee, muilezel krijgt zelf geen jongen · ja, lijken op elkaar | b |
| eindkaart | 'De muizen werden licht omdat ze zich wilden verstoppen': wat klopt niet? | open | — |

## Begrippen
variatie, mutatie, natuurlijke selectie, soort, soortvorming, biodiversiteit · uitdaging: snelle soortvorming (cichliden).

## Waar wat in de HTML zit (`index.html`, versie 1.0)
Geen blobs. Regelnummers: FILMDATA 144 · lib32b 898 · tuinDag 906 · scenes-bestand 1005 · SCENES 1040 · s01 1042 · s03 1052 · s04 1056 · s05 1067 · s07 1075 · s08 1093 · s10 1106 · s11 1117 · s12 1126 · s13 1131 · GLOSSARY 1140 · DATA 1150.

## Zo pas je deze film aan
Als 32B film 1 met `scenes3.js`: scène = functie `sNN` in `SCENES`, cues via `q.at('woord', n)` (daarna `cuecheck.py`); alinea opnieuw inspreken = Roos/eleven_v4/één take → Scribe → `audio/sNN.mp3` (−16 LUFS) en `stem/woordtijden/sNN.json` vervangen → `bouw.py`; vragen in `script_v2.md` + `src/vragen.json`; checkvragen in `src/config.json`; docentdeel in `docentdeel.md`. Na elke bouw `python3 scripts/spelerfix.py --check <film>`.

## Uitspraak
Wachtlijst: cichliden (s11), Victoriameer (s11), biodiversiteit (s10), soortvorming (s10), mutatie / mutaties (s04, s12), paddenstoelen (s01). Zie `uitspraak.md`.

## Aandachtspunten
- Het strandmuis-voorbeeld is gebaseerd op *Peromyscus polionotus*; de stap naar 'twee soorten' is een gedachte-uitbreiding (docentdeel).
- De 'Verstoppertje'-simulatie op de eindkaart is nog geen werkblad of tool op de site.
- Eindcontrole niet door een aparte helper (zie `reviews/review_eind.md`).
