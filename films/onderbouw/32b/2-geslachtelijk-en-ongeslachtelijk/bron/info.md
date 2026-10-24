# Geslachtelijk en ongeslachtelijk — bronmap

| Veld | Waarde |
|---|---|
| Bestand | `films/onderbouw/32b/2-geslachtelijk-en-ongeslachtelijk/index.html`. De audio staat in `audio/`: 11 mp3's. |
| Reeks / nummer | Kerndoelen onderbouw, 32B film 2. Kerndoel 32B bullet 2: *beschrijven hoe geslachtelijke en ongeslachtelijke voortplanting verloopt*. Bron: SLO, conceptkerndoelen mens en natuur, nov. 2025. |
| Doelgroep / niveau | Onderbouw leerjaar 1–3, gemengde groepen. De basislijn is eenvoudig, met één blok **uitdaging** (s11: bladluizen). Schakelaar **Basis / Uitdaging** (`?niveau=basis`). Nergens staat havo of vwo genoemd. |
| Versie / datum | 1.0 · 20 oktober 2026 |
| Prompt | v6 |
| Stem / model | Roos (`7qdUFMklKPaaAVMsBTBt`), `eleven_v4`, één take per alinea. Flow `sxpMLShQQgcAOnxdvx2o` (`stem/tts.json`, `stem/generaties.json`). |
| Woordtijden | Scribe per take; alle 11 kloppen woord voor woord. |
| Duur | 186 s audio. Speeltijd Uitdaging ± 3:55, Basis ± 3:40, Vragen uit ± 3:20. |
| Credits | TTS ± 2800 |
| Beeldstijl | Part C. Rode draad: de aardbeienplant van opa Henk (`aardbeiPlant`, `uitloper`, `aardbei`) in de Macro-dag-tuin uit film 1 (`tuinDag`). Kopieën zijn steeds **teal** (genstreep in één kleur), mixen zijn tinten **paars/oker** (`MIX`). Eicel oker, zaadcel teal, kern paars (`eicel`, `zaadcel`). Verder: kikkers uit `lib32b`, bloem met bij en een zoomcirkel op het vruchtbeginsel, groepen muisjes (`diertje`), bladluizen (`bladluis2`). |
| Herkomst | Uitlegfilm-prompt v6, Part D, reeksmodus, 20 okt 2026. Werkwijze en bouwstraat zoals in 32B film 1. |

## Bronbestanden
Dezelfde opzet als 32B film 1 (`../1-levenscyclus-genen-en-milieu/bron/info.md`, ook voor de werkmap). Het scènebestand is `src/scenes2.js`; de gedeelde tekeningen staan in `src/lib32b.js`.

## Opbouw

| Segment | Hoofdstuk | Look | Beeld |
|---|---|---|---|
| s01 | Cold open | Macro-dag → Schema | Opa Henk: 1 → 20 aardbeienplanten, "niets gezaaid". Twee kikkers (vader, moeder) met jongen. |
| q02 | Cold open | vraag | Waarom twee ouders? |
| s03 | Titel | Schema | Aardbeienplant met uitloper. |
| s04 | H1 Eén ouder | Macro-dag | Uitlopers groeien, nieuwe plantjes met wortels. Kaart "ongeslachtelijke voortplanting". Genstreep in teal: dezelfde genen, kloon. |
| s05 | H1 | Schema | Drie kaarten: knol (aardappel met spruiten), stek in water, deling (bacteriën 1 → 2 → 4 → 8). Raster van 18 kopieën: snel, geen partner, kopieën. |
| s06 | H2 Twee ouders | Schema | Kikker-vrouwtje en -mannetje, eicel, zaadcellen. Bevruchting (zaadcellen naar de eicel, kernen smelten), klompje cellen, kikkervisje. |
| s07 | H2 | Schema → Macro-dag | Bevruchting in het water. Bij van bloem naar bloem met stuifmeel, zoomcirkel "in de bloem", zaadje. Opa Henk met bloeiende aardbei, vruchten, zoom op de zaadjes. |
| s08 | H3 Waarom twee? | Schema | Genstrepen moeder (paars) en vader (oker), drie kinderen met een andere mix, broer en zus (Yasmin, Bilal). Twee groepen: kopieën en twee ouders. |
| q09 | H3 | vraag | Welke groep overleeft een ziekte? |
| s10 | H3 | Schema | Ziekte: bij de kopieën vallen er allemaal af, bij de mixen blijven er een paar over (groen omcirkeld). Kaarten snel/variatie. Aardbei doet allebei. |
| s11 | H3, uitdaging | Schema | Bladluizen: zomer kopieën (teal), herfst mannetje en vrouwtje, bevruchte eitjes (nieuwe mixen), overleven de winter. |
| s12 | Samenvatting | Schema | Twee kaarten, met de haak "jongen verschillen: dat helpt". |
| s13 | Eindkaart | Schema | Probeer het zelf: stekken, bloem uit elkaar, zoek ze allebei; open vraag. Blijft 12 s staan. |

## Vragen

| Id | Vraag | Opties | Goed |
|---|---|---|---|
| q02 | Waarom twee ouders? | meer jongen · een mengsel, ze verschillen · met één ouder niet groeien | b |
| q09 | Welke groep overleeft een nieuwe ziekte? | kopieën · jongen van twee ouders · maakt niet uit | b |
| eindkaart | Veld met alleen kopieën van één aardappel: waarom is een ziekte een groot risico? | open | — |

## Begrippen
ongeslachtelijke voortplanting, kloon, geslachtelijke voortplanting, geslachtscellen, bevruchting, variatie · uitdaging: afwisselen (bladluis).

## Waar wat in de HTML zit (`index.html`, versie 1.0)
Er zijn geen blobs. Regelnummers: FILMDATA 143 · lib32b 897 · tuinDag 905 · scenes-bestand 1004 · SCENES 1040 · s01 1042 · s03 1052 · s04 1057 · s05 1064 · s06 1078 · s07 1091 · s08 1104 · s10 1116 · s11 1129 · s12 1139 · s13 1144 · GLOSSARY 1153 · DATA 1163.

## Zo pas je deze film aan
Zie 32B film 1, met `scenes2.js` in plaats van `scenes1.js`. Cues hangen aan woorden (`q.at`); draai daarna `cuecheck.py`.

## Uitspraak
Wachtlijst:
- (on)geslachtelijk
- geslachtscellen
- bevruchting
- uitlopers
- stuifmeel
- kloon
- bladluizen

Zie `uitspraak.md`.

## Aandachtspunten
- Het overleven bij de ziekte (s10) is een vast getekend model, geen echte trekking: drie van de twaalf jongen blijven over.
- De eindcontrole is niet door een aparte helper gedaan (zie `reviews/review_eind.md`).
