# Filmbrief — Eten als behandeling: de diëtist in het ziekenhuis

| Veld | |
|---|---|
| TOPIC | het werk van een diëtist in het ziekenhuis bij twee soorten patiënten. (1) Ondervoeding: herkennen bij opname (screening: onbedoeld afvallen, minder eetlust; ook wie niet mager is), waarom het gevaarlijk is (zonder eten maakt het lichaam glucose uit aminozuren uit de spieren; in bed liggen versnelt spierverlies; trager herstel, langer opgenomen), wat helpt (meer eiwit en energie dan gezond, verrijken, drinkvoeding, sondevoeding als het na een paar dagen niet lukt, bewegen). (2) Nierfalen: wat de nieren niet meer kwijt kunnen (ureum uit eiwit, kalium, fosfaat, zout en water) en hoe het eten daarop aangepast wordt; eiwit vóór dialyse niet méér dan nodig, tijdens dialyse juist meer (aminozuren verdwijnen in de dialysevloeistof). |
| AUDIENCE | havo/vwo bovenbouw, oriëntatie op studie (Wat word jij? · Voeding en diëtetiek, film 3) |
| NIVEAU | havo en vwo, één versie, havo-taal; boven het boekniveau waar nodig (verdieping voor gemotiveerde leerlingen), geen rekenstuk |
| LENGTH | content decides, richtwaarde ± 6–7 min spraak (± 850–1000 woorden) |
| USE | beide |
| SERIES | `films/vervolg/REEKS-voeding.md` (cast, kleuren, toon, reekszin opleidingen) |
| CENTRAL PUZZLE | 'Iemand ligt een week in het ziekenhuis en eet bijna niets. Waarom is dat gevaarlijker dan het lijkt?' (nieuwe startvraag uit `PLANNING-milieu-tuin-voeding.md` 3b, goedgekeurd 31 okt 2026) |
| DAILY-LIFE HOOK | Noor (16) loopt weer mee met Diëtist Hanneke, nu op een dag in het ziekenhuis. Het dienblad dat bijna vol terugkomt. |
| LEAVE OUT | diabetes en insuline (*Suiker in balans*), allergie en coeliakie (*Vaccins, allergie en bloedgroepen*, *Van darm naar bloed*), hoe dialyse werkt (diffusie, dialysevloeistof, shunt: *Uitscheiding en evenwicht*), hoe de lever ureum maakt (*De lever als fabriek*, *Uitscheiding en evenwicht*), essentiële aminozuren en 'geen eiwitvoorraad' opnieuw opbouwen (*Wat zit er in je eten?*), cortisol (*Stress*), eetstoornissen, ic-beelden, naalden en slangen in close-up, magere lichamen als schok, merknamen van drinkvoeding, een echt ziekenhuis bij naam |
| VOICE | Roos, eleven_v4 |
| CHECKPOINT | twijfelscènes op een blad voor Kamiel (regels.json V1) |
| NOTES | Opbouw goedgekeurd door Kamiel (31 okt 2026, planning 3b): H1 Ondervoed in een ziekenhuisbed: hoe je het herkent · H2 Als eten wegvalt: het lichaam breekt spier af · H3 Als de nieren stoppen: minder zout en kalium, en eiwit dat ineens anders moet · H4 Samen met het team: van menu tot sonde. Bouwt op *Uitscheiding en evenwicht*, *Wat zit er in je eten?*, *De lever als fabriek*, *Van darm naar bloed*. |

## Vakinhoudelijke correctie uit de planning, nagegaan (getallen.md 20–24)
- Klopt: tijdens dialyse is méér eiwit nodig dan gezond (1 tot 1,2 g per kg; o.a. ± 12 g aminozuren verloren per hemodialyse), vóór dialyse minder dan bij dialyse.
- **Nuance voor Nederland:** 'weinig eiwit' vóór dialyse is te sterk. De Nederlandse richtlijn (NIV/NHG 2018; NfN/NIV 2020) adviseert bij eGFR < 30 een *normale* hoeveelheid, 0,8 g per kg, en raadt een strengere beperking (0,6 of minder) af; boven 1,3 g per kg vermijden. De Amerikaanse KDOQI-richtlijn (2020) gaat lager (0,55–0,6). Nederlanders eten gemiddeld ± 1,0 g per kg. De film zegt daarom: vóór dialyse 'niet méér eiwit dan je lichaam nodig heeft, en dat is minder dan de meeste mensen eten'; tijdens dialyse 'juist meer'. Op het twijfelblad.
- Pas bij ± 30 % nierfunctie of minder hoeft iemand op eiwit te letten (Nieren.nl). De film zegt dat niet in getallen, alleen 'als de nieren ver achteruit zijn'.

## Overlap (grep, 31 okt 2026)
- *Uitscheiding en evenwicht* (Gaswisseling 3): Ruud aan de dialyse, drie keer per week vier uur; ureum, kalium, zuur en water hopen op; dialysevloeistof met minder kalium; vochtbeperking 'vaak niet meer dan een halve tot een hele liter'; nierfalen < 15 % nierfunctie. → Niet opnieuw uitleggen hoe dialyse werkt; één zin terugverwijzing. Het dieet staat daar niet in. Ruud is geen castpersonage (getekend met de oude `person()`), dus niet hergebruiken.
- *Wat zit er in je eten?* (Voeding 1, s88): 'een aparte eiwitvoorraad heb je niet … dan haalt je lichaam het uit eigen eiwit, vooral uit je spieren'. → H2 bouwt daarop voort (nieuw: bij vasten gaat het om glucose voor de hersenen, en in bed liggen versnelt het); één zin terugverwijzing.
- *De lever als fabriek* (Voeding 5) en *Uitscheiding en evenwicht*: aminozuren → ureum in de lever. → Alleen noemen: 'eiwit wordt uiteindelijk ureum'.
- *Stress* (Hormonen 4): cortisol laat de lever glucose maken uit aminozuren uit spieren. Niet nodig; geen cortisol in deze film.
- *Bij de diëtist* (vd1) en *Waarom afvallen zo moeilijk is* (vd2): Hanneke in haar eigen praktijk met Joost. Nieuw: Hanneke in het ziekenhuis. Ondervoeding: 0 treffers op de site.

## Trekking mutaties (scripts/dobbelsteen.py --zaad vd3-ziekenhuis, 31 okt 2026)
- Variant A: klassiek, volgt het plan.
- Variant B: kleine mutaties: **opening** en **voorbeeld**. Opening: de film begint bij het dienblad dat bijna onaangeroerd terugkomt naar de keuken, niet bij Noor. Voorbeeld: het nierdieet wordt uitgelegd aan één concrete dag eten van de patiënt (ontbijt, lunch, avondeten, waarbij kalium, fosfaat en zout per product oplichten), en de spierafbraak aan één concreet getal uit een bedrustonderzoek bij ouderen.
- Variant C: grote mutatie **dossier** (één dossier dat stap voor stap wordt opgebouwd). P1-toets: past, want het voedingsdossier ís het werkinstrument van de ziekenhuisdiëtist: screeningsscore, gewicht, wat iemand eet, labwaarden, voedingsplan en de bijstelling ervan. De kijker vult het dossier zoals de diëtist dat doet; de bijstelling van het plan bij de start van de dialyse (eiwit omlaag → omhoog) is het concept zelf. Gevolg: één patiënt voor de hele film (een man die met slecht werkende nieren wordt opgenomen, eet een week bijna niets door misselijkheid, en tijdens de opname met dialyse begint), dus ondervoeding en nierfalen in één geval. Volgorde van de opbouw blijft H1–H4. Geen herloting. Kanttekening voor de beoordelaar: 'dossier' verloor in de eerste patroonronde (0 van 7 lijstvormen); hier is het een werkvorm, geen lijst eromheen.
- Proefregels uit `films/logboek/regels.json`: P1 (zie hierboven), P2 (elke misconceptie een vraag; Hanneke een eigen beurt; het woord 'diëtist' valt), V1 (alleen twijfelscènes naar Kamiel).

## Leerdoelen (de leerling kan …) — voorstel Claude, niet gekeurd
1. uitleggen hoe ondervoeding in het ziekenhuis wordt herkend (onbedoeld afvallen, minder eetlust; screening bij opname) en waarom ook iemand die niet mager is ondervoed kan zijn;
2. uitleggen wat het lichaam doet als het een paar dagen bijna geen eten krijgt (glycogeen op na ongeveer een dag, glucose voor de hersenen uit aminozuren uit de spieren) en waarom in bed liggen het spierverlies versnelt;
3. de gevolgen van ondervoeding noemen (trager herstel, zwakkere afweer, langer opgenomen) en uitleggen waarom een zieke meer eiwit nodig heeft dan een gezond mens;
4. uitleggen welke stoffen zich ophopen als de nieren falen (ureum uit eiwit, kalium, fosfaat, zout en water) en hoe het eten daarop wordt aangepast;
5. uitleggen waarom het eiwitadvies verandert als iemand gaat dialyseren (vóór dialyse niet te veel; tijdens dialyse meer, door verlies van aminozuren);
6. beschrijven hoe een diëtist samenwerkt met verpleegkundigen en artsen, en de stappen van gewoon eten naar verrijken, drinkvoeding en sondevoeding.

## Misconcepties
1. Ondervoed ben je alleen als je mager bent → H1.
2. Wie een week weinig eet, teert alleen op zijn vet; de spieren blijven gespaard → H2.
3. Groente en fruit zijn voor iedereen gezond, ook in elke hoeveelheid voor een nierpatiënt → H3.
4. Eiwit is slecht voor de nieren, dus een nierpatiënt eet altijd zo weinig mogelijk eiwit → H3.
5. Als de dialysemachine het bloed schoonmaakt, hoeft het eten niet meer aangepast → H3.
6. Eten in het ziekenhuis is bijzaak; de behandeling doet het werk / sondevoeding is pas iets voor het allerlaatst → H4.

## Te beslissen door Kamiel (twijfelblad, zie twijfels-voorlopig.md)
- Hanneke in het ziekenhuis (tot nu toe eigen praktijk).
- Patiënten: Mevrouw Jansen (ondervoeding), Erik (nierpatiënt, anoniem).
- 'Minder eiwit' vóór dialyse genuanceerd tot 'niet meer dan nodig'.
- Decor: ziekenhuiskamer (nieuw).
