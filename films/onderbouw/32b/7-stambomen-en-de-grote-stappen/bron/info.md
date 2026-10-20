# Stambomen en de grote stappen in de evolutie — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/32b/7-stambomen-en-de-grote-stappen/index.html` (audio in `audio/`: 13 mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, 32B film 7. Kerndoel 32B, aanvulling: *vergelijken van stambomen die zijn gemodelleerd op basis van fenotypische en genetische kenmerken* en *beschrijven van grote stappen in de evolutie: RNA naar DNA, ontstaan van eukaryoten, van ongeslachtelijke naar geslachtelijke voortplanting en van protist naar meercellige* (toegankelijk gemaakt met basis + uitdaging). Bron: SLO, definitieve conceptkerndoelen mens en natuur, nov. 2025 (bijlage Eerste Kamer). |
| Doelgroep / niveau | onderbouw leerjaar 1–3, gemengde groepen. Basislijn eenvoudig; één blok **uitdaging** (s09: walvis, uiterlijk tegenover kenmerken en DNA). Schakelaar **Basis / Uitdaging** (`?niveau=basis`). Nergens havo/vwo genoemd |
| Versie / datum | 1.0 · 20 oktober 2026 |
| Stem / model | Roos (`7qdUFMklKPaaAVMsBTBt`), `eleven_v4`, één take per alinea; flow `MYdbN9v4oTv00iY0fBz8` (`stem/tts.json`, `stem/generaties.json`) |
| Woordtijden | Scribe per take; alle 13 woord voor woord gelijk aan de stem-invoer |
| Duur | audio 188 s; speeltijd Uitdaging ± 4:10, Basis ± 3:55, Vragen uit ± 3:15 |
| Beeldstijl | Part C, Schema. Rode draad: Daan in het natuurmuseum (`museum`). Stamboom als cladogram (`boom`, takken #8FA0B5, splitsing = gouden stip als voorouder), dieren als vlakke iconen (`icoon`: kip, muis, chimpansee, Daan, vleermuis, vogel, walvis, nijlpaard, vis). Kenmerkentabel met vinkjes (groen) en kruisjes (koraal); DNA-letters paars, gelijk = groen. Tijdlijn van 4 miljard jaar (`tijdlijn`) met de stappen: RNA → DNA (paars), celkern (goud), twee ouders (koraal), meercellig (teal); prokaryoot, eukaryoot met mitochondrium, pantoffeldiertje. |
| Herkomst | uitlegfilm-prompt v6 Part D, reeksmodus 20 okt 2026; werkwijze en bouwstraat als 32B film 1 |

## Bronbestanden
Zelfde opzet als 32B film 1 (`../1-levenscyclus-genen-en-milieu/bron/info.md`, ook voor het opzetten van de werkmap). Scènes in `src/scenes7.js`; gedeelde tekeningen in `src/lib32b.js`; speler en bibliotheek in `src/_base/`; bouwstraat in `bouw/`.

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Schema: museum | Daan bij een stamboom met kip, muis, chimpansee, mens; vraagteken |
| q02 | Cold open | vraag | wie is het nauwst verwant aan de mens? |
| s03 | Titel | Schema | titel met groeiende stamboom |
| s04 | H1 Een stamboom lezen | Schema | stamboom; lang geleden / nu; splitsing = voorouder; recente gezamenlijke voorouder mens–chimpansee; kip splitst vroeg af |
| s05 | H1 | Schema | 'mens stamt af van chimpansee' doorgestreept; gezamenlijke voorouder |
| s06 | H2 Hoe maak je een stamboom? | Schema | kenmerkentabel (haren, ruggengraat, melk) met vinkjes; DNA-letters vergelijken; vogel, vleermuis, muis met vraagteken |
| q07 | H2 | vraag | vleermuis: nauwer verwant aan vogel of muis? |
| s08 | H2 | Schema | stamboom vogel/vleermuis/muis; kader zoogdieren; DNA lijkt op muis; vleugels apart ontstaan |
| s09 | H2, uitdaging | Schema | walvis tussen vis en nijlpaard; ademt lucht, geeft melk; DNA ≈ nijlpaard; walvis schuift naar het nijlpaard |
| s10 | H3 De grote stappen | Schema: tijdlijn | eerste cellen; RNA → DNA (waarschijnlijk); zonder kern; eukaryoot met kern; Daan |
| s11 | H3 | Schema: tijdlijn | eicel + zaadcel (twee ouders); pantoffeldiertje; cellen samen (meercellig); vis en boom |
| s12 | H3 | Schema: tijdlijn | stappen als vraagtekens |
| q13 | H3 | vraag | welke stap kwam als laatste? |
| s14 | H3 | Schema: tijdlijn | DNA → celkern → meercellig; dieren in het laatste zesde deel |
| s15 | Samenvatting | Schema | stamboom-kaart, kenmerken + DNA, vier stappen, Daan |
| s16 | Eindkaart | Schema | Probeer het zelf: stamboom bouwen, tijdlijn op schaal, museum; open vraag; 12 s |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q02 | Wie is het nauwst verwant aan de mens? | chimpansee · muis · kip | a |
| q07 | Is de vleermuis nauwer verwant aan de vogel dan aan de muis? | ja, vliegen · nee, zoogdier zoals de muis · niet te weten | b |
| q13 | Welke stap kwam als laatste? | cellen met een kern · DNA als bouwtekening · organismen van heel veel cellen | c |
| eindkaart | Dolfijn lijkt op een haai: hoe onderzoek je of ze nauw verwant zijn? | open | — |

## Begrippen
stamboom, gezamenlijke voorouder, verwant, eukaryoot, meercellig · uitdaging: uiterlijk tegenover DNA.

## Waar wat in de HTML zit (`index.html`, versie 1.0)
Geen blobs. Regelnummers: FILMDATA 146 · lib32b 900 · tuinDag 908 · scenes-bestand 1007 · SCENES 1039 · s01 1041 · s03 1045 · s04 1049 · s05 1056 · s06 1061 · s08 1068 · s09 1075 · s10 1083 · s11 1091 · s12 1099 · s14 1100 · s15 1104 · s16 1110 · GLOSSARY 1121 · DATA 1130.

## Zo pas je deze film aan
Als 32B film 1 met `scenes7.js`: scène = functie `sNN` in `SCENES`, cues via `q.at('woord', n)` (daarna `cuecheck.py`); alinea opnieuw inspreken = Roos/eleven_v4/één take → Scribe → `audio/sNN.mp3` (−16 LUFS) en `stem/woordtijden/sNN.json` vervangen → `bouw.py`; vragen in `script_v2.md` + `src/vragen.json`; checkvragen in `src/config.json`; docentdeel in `docentdeel.md`. Na elke bouw `python3 scripts/spelerfix.py --check <film>`.

## Uitspraak
Wachtlijst: eukaryoten (s10), chimpansee (s01, s04, s05), pantoffeldiertjes (s11), meercellige (s11), nijlpaard (s09). Zie `uitspraak.md`.

## Aandachtspunten
- Eén scène per grote stap is kort; het docentdeel geeft de jaartallen.
- Het woord 'protist' wordt niet genoemd; de film zegt 'één cel, zoals pantoffeldiertjes'.
- Eindcontrole niet door een aparte helper (zie `reviews/review_eind.md`).
