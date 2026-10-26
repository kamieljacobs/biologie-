# Filmbrief · Zenuwstelsel 9 · Spieren en beweging (werktitel *Trekken, nooit duwen*)

Status: **goedgekeurd** (Kamiel 26 okt 2026, 18:35: 'Bouw de film … volgens PROMPT_v10'). Raadsel C. Leerdoel 6 blijft basis, kort, met een verwijzing naar *De spleet*. Nectar § 19.5 *Controle* aangenomen als spierspoeltjes en reflexen (leerdoel 10), **niet gecontroleerd**: Claude kon de methode niet openen. Kamiel keurt alleen de twijfelscènes van het storyboard (B7). Bouwen volgens `films/PROMPT_v10.md` (Part B + C), nieuwe film dus met B15 (drie scriptvarianten, blinde beoordelaar). Na afloop `jaarplanner-dekking.json` bijwerken (havo § 5.6, vwo § 19.1–19.2), pas aan het eind en na een `git pull`.

Aanleiding: de dekkingscheck in de jaarplanner (`jaarplanner-dekking.json`) liet zien dat geen enkele film skelet, gewrichten, antagonistische spieren en spiersamentrekking echt behandelt: havo § 5.6 (Biologie voor jou) en vwo § 19.1–19.2 (Nectar) staan op 'geen'. De onderbouwfilm *Skelet en spieren* (films/onderbouw/32a/6-skelet-en-spieren) telt niet mee voor de bovenbouw.

| Veld | |
| --- | --- |
| TOPIC | Skelet, gewrichten en spieren: hoe beweging ontstaat, van gewricht tot actine en myosine |
| AUDIENCE | havo 4 + vwo (4/5/6) |
| NIVEAU | havo + vwo, vwo-blokken gelabeld |
| LENGTH | ± 10 min met vwo-blokken |
| USE | beide |
| METHOD + CHAPTER | Biologie voor jou havo 4 § 5.6 Spieren en beweging (SE); Nectar 4.1 vwo § 19.1 Bouw van pezen en spieren, § 19.2 Bewegingen in spiervezels, § 19.5 Controle |
| SERIES | Zenuwstelsel (speler, uitspraaklijst en begrippen van die reeks hergebruiken) |
| VOICE | Roos (ElevenLabs) |
| CHECKPOINT | storyboardkeuring alleen twijfelscènes (B7) |

## Leerdoelen (concept)

De leerling kan …

1. *(basis)* de functies van het skelet noemen en bot en kraakbeen onderscheiden.
2. *(basis)* de bouw van een gewricht beschrijven (gewrichtskop, -kom, kraakbeen, kapsel, gewrichtssmeer, banden) en een kogel- en scharniergewricht herkennen.
3. *(basis)* uitleggen dat een spier alleen kan trekken, daarom via een pees aan bot vastzit en in antagonistische paren werkt (buiger/strekker, biceps/triceps).
4. *(basis)* de bouw van een skeletspier beschrijven: spier → spierbundel → spiervezel (meerkernig) → myofibril.
5. *(basis)* uitleggen dat een spier korter wordt doordat actine en myosine langs elkaar schuiven (de filamenten zelf blijven even lang), en dat daar ATP voor nodig is.
6. *(basis)* uitleggen hoe een motorische zenuwcel via de motorische eindplaat een spier laat samentrekken.
7. *(basis, Kamiel 26 okt 2026)* uitleggen hoe je de kracht doseert via het aantal motorische eindplaatjes / motorische eenheden dat prikkels geeft: meer spiervezels tegelijk = meer kracht.
8. *(vwo)* de sarcomeer en de kruisbruggencyclus uitleggen: Ca²⁺ uit het sarcoplasmatisch reticulum, troponine/tropomyosine, ATP voor het loslaten van de myosinekop.
9. *(vwo)* de bouw van een pees (collageenvezels) aan de functie koppelen, en de kracht ook doseren via de frequentie van de impulsen.
10. *(vwo, Nectar § 19.5 aangenomen, **niet gecontroleerd**)* uitleggen dat spierspoeltjes meten hoe ver een spier wordt uitgerekt, en dat een plotselinge rek via het ruggenmerg een rekreflex geeft (kniepeesreflex) die de spier laat samentrekken.

Leerdoel 6 in de film (Kamiel 26 okt 2026): kort, in de basis: het motorische neuron eindigt in een motorische eindplaat en geeft daar een signaalstof af; hoe dat overspringen werkt, staat in *De spleet* (de film noemt die film met naam, op Kamiels verzoek; B1 staat een verwijzing naar een andere film toe).

## Misvattingen

- Spieren kunnen ook duwen.
- De filamenten worden zelf korter.
- Bot is dood materiaal.
- ATP is alleen nodig om samen te trekken (lijkstijfheid laat het omgekeerde zien).
- Spierpijn komt door melkzuur.

## Raadsel

**Gekozen: C** (Kamiel 26 okt 2026): *Hoe tilt dezelfde biceps een veertje én een volle tas?* Cold open met een leerling die eerst een veertje en dan een volle schooltas optilt; de recap beantwoordt het met het aantal motorische eenheden (basis) en de frequentie (vwo).

Kandidaten waren:

- **A.** Je kunt je arm buigen. Maar met welke spier strek je hem weer?
- **B.** Waarom wordt een lichaam na de dood stijf, terwijl de spieren dan geen energie meer hebben? (lijkstijfheid; gevoelig: dood)
- **C.** Hoe tilt dezelfde biceps een veertje én een volle tas? (doseren; past nu bij de basis)

## Typen hoofdstukken

B (bouw en functie: skelet, gewricht, spier) en A (mechanisme: glijdende filamenten, één doorlopende zoom van arm tot sarcomeer). Hergebruik: tekeningen uit de onderbouwfilm *Skelet en spieren*, `spierVezel`/`spierBundel` uit `bibliotheek/lib_bio.js`, skelet en spieren uit `personages/lib_anatomie.js`.

## Open vragen aan Kamiel

1. ~~Welk raadsel~~ → C.
2. ~~Leerdoel 6 bij havo~~ → basis, kort, met verwijzing naar *De spleet*.
3. ~~Nectar § 19.5~~ → aangenomen: spierspoeltjes en reflexen (leerdoel 10), niet gecontroleerd.
4. Planning: vwo 6 heeft § 19.1–19.2 in de week van 1 nov 2026; havo 4 § 5.6 eind maart 2027. De film moet dus vóór 2 nov 2026 af zijn.
