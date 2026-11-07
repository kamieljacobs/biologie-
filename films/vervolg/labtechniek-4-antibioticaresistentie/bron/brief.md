# Filmbrief — Antibioticaresistentie: kweken, testen en selectie
| Veld | |
|---|---|
| TOPIC | steriel werken, voedingsbodems, kolonies tellen met een verdunningsreeks, antibiogram (remzone en MIC, gevoelig–resistent), en hoe resistentie ontstaat: mutatie, selectie en plasmiden |
| AUDIENCE | havo/vwo bovenbouw, oriëntatie op studie (Wat word jij? · Laboratoriumtechniek, film 4); dezelfde film is de extra film bij het thema Evolutie |
| NIVEAU | havo + vwo, één niveau (geen vwo-blokken) |
| LENGTH | content decides (± 5 min) |
| USE | beide |
| CENTRAL PUZZLE | Een antibioticum werkt ineens niet meer. Hoe zie je dat in het lab, en hoe ontstaat het? |
| NOTES | Plan 24 okt 2026 (`vervolg.html`, labtechniek.basis[3], id 'resistentie', `extra: 'evolutie'`): samengevoegd uit 'Steriel werken en bacteriën kweken' en de extra film 'Antibioticaresistentie'. Reeksbrief `hw/lab/REEKS.md`: Yasmin is in alle vier de films de stagiair-analist, Dr. Kim de arts. Grens met *Welk antibioticum?* (Geneeskunde 3): daar de keuze van de arts, hier het lab en de evolutie. Grens met lt1: Gramkleuring mag kort, geen microscopie-uitleg. Grens met lt2: geen ijklijn, geen PCR. |

## Leerdoelen (de leerling kan …)
1. uitleggen waarom je steriel werkt en wat een positieve en een negatieve controle op een kweekplaat laten zien
2. uitleggen waarom één bacterie na een nacht een zichtbare kolonie wordt, en uit een verdunningsreeks met kolonietelling het aantal bacteriën per milliliter berekenen (met de telbare reeks van 30 tot 300 kolonies)
3. een antibiogram lezen: de remzone meten en met een breekpunt vergelijken, en de MIC als de laagste concentratie waarbij geen groei meer te zien is
4. uitleggen dat resistentie ontstaat door een toevallige mutatie (of door een plasmide) en daarna door selectie in de populatie vaker wordt — niet doordat een bacterie aan het middel 'went'
5. uitleggen hoe een plasmide met een resistentiegen via conjugatie naar een andere bacterie, ook van een andere soort, overgaat

## Misconcepties
1. bacteriën worden resistent doordat ze aan een antibioticum wennen of eraan gewend raken → H4 (vraag, afleider) en de eindkaart
2. het antibioticum veroorzaakt de resistentiemutatie → H4 (de mutanten zijn er al vóór de plaat; aangetoond door Luria en Delbrück, niet door deze ene plaat)
3. jij wordt resistent, niet de bacterie → H4, kort (staat uitgebreider in *Welk antibioticum?*)
4. hoe meer kolonies op een plaat, hoe betrouwbaarder de telling → H2 (vraag over de telbare plaat)
5. een heldere ring rond een schijfje betekent altijd 'gevoelig' → H3 (de ring wordt gemeten en met een breekpunt vergeleken)
6. een kolonie is één bacterie → H2 (één cel, miljoenen nakomelingen)

## Rode draad
Yasmin loopt stage in het medisch microbiologisch lab. Eén monster door de hele film: urine van Opa Henk, die na een kuur opnieuw klachten heeft. Zij zet de kweek op (H1), telt (H2), maakt het antibiogram (H3) en ziet in H4 wat er evolutionair gebeurde: op de plaat met het middel groeien zeven kolonies uit een miljard cellen. Dr. Kim belt in de recap voor de uitslag. Menselijk moment: Opa Henk die zijn potje brengt, aan het begin en in de recap; het draagt het concept (dezelfde patiënt, een tweede kuur die niet aansloeg).

## Keuzes
- Opbouw volgens het plan: (1) steriel werken, (2) voedingsbodems, kolonies en tellen, (3) antibiogram, (4) mutatie, selectie en plasmiden.
- Getallen zijn realistisch en nagerekend in `reken/verdunning.py`: 68 kolonies op de 10⁻⁵-plaat bij 0,1 ml → 6,8 × 10⁷ kve/ml; 7 kolonies uit 10⁹ cellen → orde 10⁻⁸ per cel; MIC-reeks in verdubbelingsstappen met MIC = 0,5 mg/L.
- Dezelfde definitie van 'resistent' als de evolutiefilms en de reeksbrief: de bacterie groeit door bij een concentratie antibioticum die in het lichaam haalbaar is. Resistentie wordt in een populatie vaker door selectie; het allel ontstaat door een toevallige mutatie of komt binnen via een plasmide, niet door het middel.
- Overlap met *Welk antibioticum?* vermeden: geen aangrijpingspunten van antibiotica (celwand/ribosoom/DNA), geen smal-of-breed-afweging, geen MRSA-isolatie. De remzone komt daar al voor als beeld; hier wordt hij gemeten en met een breekpunt vergeleken, en de MIC is nieuw.
- Overlap met *De mens als selectiefactor* vermeden: daar de selectiedruk in het lichaam en ESBL als voorbeeld; hier dezelfde selectie zichtbaar op één plaat, met de telling erbij, en conjugatie met pilus in beeld.
- Recap noemt de opleidingen: mbo Analist (biologisch-medisch analist, niveau 4, drie tot vier jaar) en hbo Biologie en Medisch Laboratoriumonderzoek (240 EC, vier jaar, Bachelor of Science), met waar het werk zit.
- Vijf vraagkaarten (cold open en H1–H4); het goede antwoord staat op b, c, a, b, a. q06 is na de eindreview een toepassingsvraag (drie kolonies op de extra plaat), zodat de stem het antwoord niet voorzegt.
