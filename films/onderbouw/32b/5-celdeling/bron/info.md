# Celdeling — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/32b/5-celdeling/index.html` (audio in `audio/`: 12 mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, 32B film 5. Kerndoel 32B, aanvulling: *beschrijven van de celdeling: mitose en meiose* (toegankelijk gemaakt met basis + uitdaging). Bron: SLO, definitieve conceptkerndoelen mens en natuur, nov. 2025 (bijlage Eerste Kamer). |
| Doelgroep / niveau | onderbouw leerjaar 1–3, gemengde groepen. Basislijn eenvoudig; één blok **uitdaging** (s13: chromosomenparen, toeval bij meiose). Schakelaar **Basis / Uitdaging** (`?niveau=basis`). Nergens havo/vwo genoemd |
| Versie / datum | 1.0 · 20 oktober 2026 |
| Stem / model | Roos (`7qdUFMklKPaaAVMsBTBt`), `eleven_v4`, één take per alinea; flow `m1oalr5QLbIAa9xkrVnY` (`stem/tts.json`, `stem/generaties.json`) |
| Woordtijden | Scribe per take; alle 12 woord voor woord gelijk aan de stem-invoer |
| Duur | audio 170 s; speeltijd Uitdaging ± 3:55, Basis ± 3:35, Vragen uit ± 3:00 |
| Beeldstijl | Part C. Micro (#121A26) voor de cel: rond membraan, weinig rustige korreltjes, chromatine als zachte draden (BEELDAFSPRAKEN). De mitose is één doorlopende functie `mitose(cx,cy,R,p)` van fase p 0..1 (kern + draden → kopiëren tot X → kern open → rij in het midden → uit elkaar → nieuwe kernen → insnoeren); de scène stuurt p met de woorden. Chromosomen paars (`chromosoom`), mitose = teal-accent, meiose = koraal-accent; uitdaging met paren van moeder (paars) en vader (oker). Sams knie (`knie(heel)`), telborden 46/23. |
| Herkomst | uitlegfilm-prompt v6 Part D, reeksmodus 20 okt 2026; werkwijze en bouwstraat als 32B film 1 |

## Bronbestanden
Zelfde opzet als 32B film 1 (`../1-levenscyclus-genen-en-milieu/bron/info.md`, ook voor het opzetten van de werkmap). Scènes in `src/scenes5.js`; gedeelde tekeningen in `src/lib32b.js`; speler en bibliotheek in `src/_base/`; bouwstraat in `bouw/`.

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Macro-dag → Schema | Sam valt, knie geschaafd, een week later dicht; vraagteken |
| q02 | Cold open | vraag | waar komen de nieuwe huidcellen vandaan? |
| s03 | Titel | Schema + Micro-cirkel | titel; mitose in een cirkel |
| s04 | H1 Eén cel wordt twee | Micro | huidcellen, twee delen; cel met kern en draden, chromosomen, kopiëren tot X |
| s05 | H1 | Micro | kern open, rij, uit elkaar, nieuwe kernen, insnoeren; 'dezelfde bouwtekening'; mitose; groeien en herstellen |
| s06 | H2 Hoeveel chromosomen? | Schema | 46 per cel → 46 + 46 (mitose); eicel + zaadcel '46?', baby met vraagteken |
| q07 | H2 | vraag | hoeveel chromosomen heeft het kind? |
| s08 | H2 | Schema | 23 + 23 = 46; meiose: 46 → vier keer 23 |
| s09 | H3 Mitose of meiose? | Schema | mitose: huid, botten, darmen, miljarden per dag; meiose: eierstokken, zaadballen, 1 → 4 |
| s10 | H3 | Macro-dag | boonplant met groeiend nieuw blad; vraagteken |
| q11 | H3 | vraag | welke deling voor een nieuw blad? |
| s12 | H3 | Schema | zoomcirkel bladcellen; 'mitose: groei'; bloem 'meiose: in de bloem' |
| s13 | H3, uitdaging | Schema | drie paren (moeder paars, vader oker) gaan uit elkaar; vier verschillende geslachtscellen |
| s14 | Samenvatting | Schema | kaarten mitose/meiose; Sams knie 'dicht door mitose' |
| s15 | Eindkaart | Schema | Probeer het zelf: uienwortelpuntje, sokken, rekenen; open vraag; 12 s |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q02 | Waar komen de nieuwe huidcellen vandaan? | uit het bloed · huidcellen eromheen delen · oude cellen groeien | b |
| q07 | Eicel en zaadcel elk 46: hoeveel heeft het kind? | 46 · 92 en elke generatie dubbel · geslachtscellen hebben er 23, samen 46 | c |
| q11 | Welke deling zorgt voor een nieuw blad? | mitose · meiose · allebei | a |
| eindkaart | Huidcel 46: hoeveel in een zaadcel en in een cel van een baby? | open | — |

## Begrippen
celdeling, chromosoom, mitose, meiose, geslachtscel · uitdaging: chromosomenparen.

## Waar wat in de HTML zit (`index.html`, versie 1.0)
Geen blobs. Regelnummers: FILMDATA 144 · lib32b 898 · tuinDag 906 · scenes-bestand 1005 · SCENES 1035 · s01 1037 · s03 1042 · s04 1046 · s05 1057 · s06 1065 · s08 1071 · s09 1079 · s10 1087 · s12 1091 · s13 1098 · s14 1107 · s15 1112 · GLOSSARY 1124 · DATA 1133.

## Zo pas je deze film aan
Als 32B film 1 met `scenes5.js`: scène = functie `sNN` in `SCENES`, cues via `q.at('woord', n)` (daarna `cuecheck.py`); alinea opnieuw inspreken = Roos/eleven_v4/één take → Scribe → `audio/sNN.mp3` (−16 LUFS) en `stem/woordtijden/sNN.json` vervangen → `bouw.py`; vragen in `script_v2.md` + `src/vragen.json`; checkvragen in `src/config.json`; docentdeel in `docentdeel.md`. Na elke bouw `python3 scripts/spelerfix.py --check <film>`.

## Uitspraak
Wachtlijst: chromosomen / chromosoom (s04–s06, s08, s13, s14), zesenveertig / drieëntwintig (s06, s08, s14), gehalveerd (s08), zaadballen (s09). Zie `uitspraak.md`.

## Aandachtspunten
- Meiose: 'vier geslachtscellen' is vereenvoudigd voor de eicel (poollichaampjes, docentdeel).
- Eindcontrole niet door een aparte helper (zie `reviews/review_eind.md`).
