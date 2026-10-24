# DNA en overerving — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/32b/6-dna-en-overerving/index.html` (audio in `audio/`: 11 mp3's, niet ingebed) |
| Reeks / nummer | Kerndoelen onderbouw, 32B film 6. Kerndoel 32B, aanvulling: *beschrijven dat DNA-moleculen informatie bevatten van erfelijke eigenschappen* en *beschrijven hoe erfelijke eigenschappen worden doorgegeven aan een volgende generatie* (toegankelijk gemaakt met basis + uitdaging). Bron: SLO, definitieve conceptkerndoelen mens en natuur, nov. 2025 (bijlage Eerste Kamer). |
| Doelgroep / niveau | onderbouw leerjaar 1–3, gemengde groepen. Basislijn eenvoudig; één blok **uitdaging** (s12: genen als letters, schema Aa × Aa). Schakelaar **Basis / Uitdaging** (`?niveau=basis`). Nergens havo/vwo genoemd |
| Versie / datum | 1.0 · 20 oktober 2026 |
| Prompt | v6 |
| Stem / model | Roos (`7qdUFMklKPaaAVMsBTBt`), `eleven_v4`, één take per alinea; flow `jLkRVAYH7ipUpbsDpHo0` (`stem/tts.json`, `stem/generaties.json`) |
| Woordtijden | Scribe per take; alle 11 woord voor woord gelijk aan de stem-invoer |
| Duur | audio 165 s; speeltijd Uitdaging ± 3:50, Basis ± 3:25, Vragen uit ± 2:50 |
| Beeldstijl | Part C. Rode draad: Yasmin en haar cavia's (`cavia(kleur)`). Genen als vakjes in de paarse familie: zwart-gen donkerpaars (GZ), wit-gen lichtlila (GW); een paar = `genPaar`. DNA als draaiende ladder met letters (`dnaLadder`), gen goud gemarkeerd. Toeval = gouden munt die draait en het doorgegeven gen toont (`munt`). Kans: 'gemiddeld 1 op 4' tegenover 'echte nestjes'. Uitdaging: kruisingsschema met AA/Aa/aA/aa. |
| Herkomst | uitlegfilm-prompt v6 Part D, reeksmodus 20 okt 2026; werkwijze en bouwstraat als 32B film 1 |

## Bronbestanden
Zelfde opzet als 32B film 1 (`../1-levenscyclus-genen-en-milieu/bron/info.md`, ook voor het opzetten van de werkmap). Scènes in `src/scenes6.js`; gedeelde tekeningen in `src/lib32b.js`; speler en bibliotheek in `src/_base/`; bouwstraat in `bouw/`.

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Schema (kamer) | Yasmin, bak met twee zwarte cavia's, drie jongen, één wit (gouden cirkel); vraagteken |
| q02 | Cold open | vraag | hoe kan een wit jong twee zwarte ouders hebben? |
| s03 | Titel | Schema | titel met DNA-ladder |
| s04 | H1 De bouwtekening | Micro → Schema | celkern met chromosomen; DNA-ladder met letters; vier letters, miljarden lang; gen (goud) = recept; cavia, kleurstof |
| s05 | H2 Twee van elk | Schema | genpaar van moeder en vader; zwart-gen, wit-gen; twee zwart = zwart, twee wit = wit; één van elk = ? |
| q06 | H2 | vraag | één zwart- en één wit-gen: welke kleur? |
| s07 | H2 | Schema | genpaar → zwarte cavia; dominant (goud), recessief; 'wit-gen zit verborgen' |
| s08 | H3 Doorgeven | Schema | moeder en vader met genpaar, munten (toeval), jong met twee wit-genen; kans: gemiddeld 1 op 4 tegenover echte nestjes |
| s09 | H3 | Schema | twee witte cavia's met wit-wit; vraagteken |
| q10 | H3 | vraag | twee witte cavia's: welke kleur jongen? |
| s11 | H3 | Schema | vier witte jongen; 'alleen wit-genen', 'alleen wit doorgeven' |
| s12 | H3, uitdaging | Schema | A = zwart, a = wit; ouders Aa × Aa; schema met AA, Aa, aA, aa (wit in goud) |
| s13 | Samenvatting | Schema | vier kaarten (DNA, twee van elk, dominant/recessief, toeval); haak |
| s14 | Eindkaart | Schema | Probeer het zelf: muntjes-kruising, tongrollen, DNA uit fruit; open vraag; 12 s |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q02 | Twee zwarte cavia's krijgen een wit jong: hoe kan dat? | jong ziek · beide ouders verborgen wit-gen · te weinig zon | b |
| q06 | Eén zwart-gen en één wit-gen: welke kleur? | zwart · wit · grijs | a |
| q10 | Twee witte cavia's: welke kleur hebben de jongen? | allemaal wit · door elkaar · allemaal zwart | a |
| eindkaart | Zwart × wit geeft alleen zwarte jongen: wat weet je over de zwarte ouder? | open | — |

## Begrippen
DNA, gen, dominant, recessief, overerving · uitdaging: genen als letters.

## Waar wat in de HTML zit (`index.html`, versie 1.0)
Geen blobs. Regelnummers: FILMDATA 143 · lib32b 897 · tuinDag 905 · scenes-bestand 1004 · SCENES 1017 · s01 1019 · s03 1026 · s04 1029 · s05 1039 · s07 1047 · s08 1053 · s09 1063 · s11 1064 · s12 1069 · s13 1076 · s14 1081 · GLOSSARY 1090 · DATA 1099.

## Zo pas je deze film aan
Als 32B film 1 met `scenes6.js`: scène = functie `sNN` in `SCENES`, cues via `q.at('woord', n)` (daarna `cuecheck.py`); alinea opnieuw inspreken = Roos/eleven_v4/één take → Scribe → `audio/sNN.mp3` (−16 LUFS) en `stem/woordtijden/sNN.json` vervangen → `bouw.py`; vragen in `script_v2.md` + `src/vragen.json`; checkvragen in `src/config.json`; docentdeel in `docentdeel.md`. Na elke bouw `python3 scripts/spelerfix.py --check <film>`.

## Uitspraak
Wachtlijst: cavia's (s01, s08, s09, s11, s12), dominant / recessief (s07, s12, s13), zwart-gen / wit-gen(en) (s05, s07, s08, s11), grote A / kleine a (s12). Zie `uitspraak.md`.

## Aandachtspunten
- Cavia-vachtkleur is in werkelijkheid meer-genig; de film gebruikt één gen als model (docentdeel).
- Tongrollen op de eindkaart is bewust een 'pas op'-voorbeeld (geen enkelvoudig kenmerk).
- Eindcontrole niet door een aparte helper (zie `reviews/review_eind.md`).
