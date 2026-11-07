# Eindreview beeld en tekst: Sleutel, slot en dosis (20 okt 2026)

Frisse review van de gebouwde film: de contactsheet plus losse tijden (s04:10.5/12/15/23.6/26.2/30/36, s05:12, s07:20, s11:3/15/27/31/33/37/39, s12:12), script_v2, film.json en sections.html.

## MOET

1. **Footer noemt alleen Sam.** Bilal (s07, 'mensen · vrijwilligers') en Yasmin (s13, farmacoloog in practicumkleding) komen ook in beeld. Reparatie in film.py: "Personages: Sam, Bilal en Yasmin (castboek)."
2. **s07 (H2), 12,8–19 s, 'Farmacologen meten … bij proefdieren': de muis heeft de lichtvezel op zijn kop.** `muis()` uit engine/teken.js tekent standaard de optogenetica-vezel uit een andere film. Hier is dat misleidend: het lijkt alsof het dier een implantaat heeft. Bovendien loopt de vezel dwars door 'FARMACOLOGEN METEN CURVES'. Reparatie: geef `muis()` een optie zonder vezel (bv. `vezel = false` als 8e parameter, en het blok `// lichtvezel` alleen tekenen als hij aan staat), of maak een lokale `muisKaal()` in teken_f2.js.
3. **s04 (H1), 12,2–17,5 s, 'Ibuprofen gaat in een enzym zitten': de naam 'ibuprofen' staat niet bij de ibuprofen.** Het gele blokje zit in het enzym (760, 520), maar de tag 'ibuprofen' zweeft op (1040, 380) tussen de pijnstofjes en valt erover. Daardoor lijkt het alsof de zigzagjes ibuprofen zijn. Reparatie: `naamBij(ctx, 'ibuprofen', '', 870, 470, b, 'left', C.goud)` direct naast het blokje, en de tag weg.
4. **s12 (Recap), vanaf 'medicijn' (±6,8 s): het grafiekje staat over de tafel, de tabletstrip en het glas heen** (`grafAssen(ctx, 1150, 560, 380, 180 …)` en de curve). Reparatie: verplaats het naar de vrije ruimte rechts onder de klok, bv. `grafAssen(ctx, 1500, 760, 340, 160, …)` met de curve op dezelfde coördinaten. Of laat het weg, want 'farmacodynamiek' staat al groot in beeld.

## KAN

- **s11, 32,2–33,5 s ('Een arts weegt'):** de balans en 'DE ARTS WEEGT AF' faden over de cellen en 'RECEPTOR IN BIJNA ELKE CEL' heen. Dat zijn twee tekstbalken tegelijk. Gebruik `wissel()`: eerst de cellen weg, dan de balans.
- **s04, morfine/naloxon (26,9–36 s):** de tags 'morfine' en 'naloxon' staan linksboven, los van de moleculen. Liever `naamBij` bij één rood en één groen molecuul.
- **s08, lithiumpaneel:** 'BIJ EEN BIPOLAIRE STOORNIS' raakt de bovenkant van de tag 'lithium'. Zet de metaregel 15 px hoger.
- **Vraagkaart q06:** het goede antwoord (a) is ook de langste optie. q02 (b) en q09 (c) zijn dat niet, dus de spreiding is goed. Voor evenwicht kan (c) langer: "hij heeft tien keer minder bijwerkingen, want je slikt minder stof".
- **Docentdeel, rij 'Therapeutische breedte':** de link wijst naar de pagina farmacokinetiek van het Kompas. Een begripsuitleg (bv. de KNMP of een leerboek) past beter, of schrijf 'algemene leerboekkennis' zoals bij penicilline.

## Goed

- De cel in H1 is rond, met vier doelwitten op de juiste plek: receptor en ionkanaal in het membraan, transporteiwit in het membraan, enzym binnenin. Namen staan direct bij de onderdelen en er zijn geen wijslijnen.
- De dosis-responscurve klopt: bij 400 mg zit je op ±84 % van het maximum, de tweede curve ligt 10× verder naar links en is even hoog, met de chips 'krachtiger per milligram', 'niet beter' en 'maximaal effect: even hoog'.
- Therapeutische breedte: brede kloof bij penicilline, smalle bij lithium. De bloedspiegelbalk heeft twee grenzen.
- De vakinhoud en de v2-zinnen kloppen met de bronnen (AAFP 2020 voor het plafond rond 400 mg; prednison "kan … brozer").
- De goede antwoorden van de vraagkaarten kloppen met het script (b, a, c) en staan op verschillende letters. Checkvragen en glossary zijn correct.
