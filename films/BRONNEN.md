# Bronnen en controle van de vakinhoud

Kamiel (25 okt 2026): "als ik met uitgevers in gesprek ga, krijg ik vragen over hoe ik weet dat de inhoud van mijn filmpjes klopt." Dit bestand is het antwoord: welke bronnen tellen, hoe elke bewering wordt nagegaan, en waar dat per film is vastgelegd. Het geldt voor elke nieuwe film en voor elke film die opnieuw wordt aangepakt (feedback, reviewronde, opwaardering naar een nieuwe prompt).

## 1. Welke bronnen tellen

Elke bron krijgt een niveau. Alleen niveau A en B tellen mee als bewijs; niveau C mag hooguit als wegwijzer dienen om een echte bron te vinden.

| Niveau | Wat | Voorbeelden |
|---|---|---|
| **A** · gezaghebbend | Door vakgenoten gecontroleerd, of van een instantie die zelf de gegevens verzamelt of de norm stelt. | Wetenschappelijke artikelen (bij voorkeur reviewartikelen), CvTE-syllabus en examenprogramma, SLO-kerndoelen, BINAS, standaardleerboeken (Campbell Biology, Alberts), RIVM, WHO, CBS, NFI, Gezondheidsraad, universiteiten en onderzoeksinstituten over hun eigen onderzoek, natuurhistorische musea met eigen collectie en onderzoek, officiële registers (bv. International Shark Attack File). |
| **B** · betrouwbaar secundair | Redactie met vakkennis, verwijst zelf naar niveau A, auteur of organisatie bekend. | Lesmethodes, Kennislink/NEMO, NOS en kwaliteitskranten op hun wetenschapspagina's, BBC Science Focus, National Geographic, Smithsonian, aquaria en dierentuinen met wetenschappelijke staf, beroepsverenigingen en opleidingen (bij 'Wat word jij?'). |
| **C** · geen bewijs | Geen controle, geen bronvermelding, commercieel belang, of onbekende maker. | Blogs, lijstjessites, fora, YouTube zonder bronnen, sites die iets verkopen, Wikipedia (wel goed om de bronnen onderaan te vinden), antwoorden van een AI zonder controleerbare bron. |

Vier vragen bij twijfel:

1. **Wie** staat erachter, en weet die partij dit uit eigen onderzoek of eigen gegevens?
2. **Is het gecontroleerd** door anderen (peer review, redactie, examencommissie)?
3. **Hoe oud** is het? Voor getallen die veranderen (aantallen, records, beleid, opleidingen) de nieuwste stand; voor vaste biologie mag een oudere standaardbron.
4. **Kun je het zelf openen** en de bewering op de pagina terugvinden? Een bron die niet te vinden is of iets anders zegt, telt niet. Een bron die een AI noemt, wordt altijd zelf geopend.

## 2. Cross-referencing: elke bewering twee keer

- Elke bewering die een leerling als feit kan onthouden (een getal, een mechanisme, een vergelijking, een 'altijd' of 'nooit', een historisch feit) wordt nagegaan in **minstens twee onafhankelijke bronnen, waarvan minstens één van niveau A**.
- **Onafhankelijk** betekent: de tweede bron haalt het niet uit de eerste. Twee nieuwssites die hetzelfde persbericht overnemen, tellen als één. Ga waar het kan naar de oorsprong (het artikel, het register, de dataset).
- **Uitzondering: de oorsprong zelf.** Komt een getal uit een officieel register of een dataset (bv. het jaaroverzicht van de International Shark Attack File, CBS-cijfers), dan is dat register zelf geopend genoeg: elke andere bron neemt het toch over. Noteer dan in de toelichting dat het om de oorsprong gaat.
- **Examenstof** wordt daarnaast naast de CvTE-syllabus (havo/vwo) of de SLO-kerndoelen (onderbouw) gelegd: de film mag eenvoudiger zijn, maar mag niet strijdig zijn met wat op het examen goed gerekend wordt, en gebruikt dezelfde begrippen.
- **Getallen**: noteer het bereik dat de bronnen geven en welke waarde de film kiest. Kies de voorzichtige formulering ("zo'n", "tot", "in het beste geval") als bronnen verschillen.
- **Spreken bronnen elkaar tegen?** Zoek een derde (liefst een reviewartikel). Blijft het omstreden, dan zegt de film dat ("wetenschappers denken…") of laat het weg, en het docentdeel noemt de discussie.
- **Vereenvoudigingen** mogen, maar worden benoemd: wat de film weglaat of afrondt, en waarom dat voor de doelgroep verantwoord is.

## 3. Het bronnenlogboek per film

Elke film krijgt naast `info.md` en `script.md` een bestand `bron/bronnen.md`. Opbouw (zie het voorbeeld in `films/onderbouw/33c/1-hoe-vindt-een-haai-zijn-prooi/bron/bronnen.md`):

1. **Kop**: welke versie van de film is gecontroleerd, wanneer, door wie, en de samenvatting van de status.
2. **Bronnen**: genummerd `B1`, `B2`, … met niveau, maker, titel, jaar, link en datum van raadplegen.
3. **Beweringen**: één tabel met een rij per bewering, in deze kolommen (vaste volgorde, het script leest ze):

   `| Nr | Waar | Bewering in de film | Bronnen | Status | Toelichting |`

   - *Waar* = segment (`s05`, `q10`) of plek in het docentdeel (`docent`).
   - *Bronnen* = de nummers, bv. `B3, B7`.
   - *Status* = één van:
     - `✓` bevestigd door minstens twee onafhankelijke bronnen (≥ 1 niveau A);
     - `≈` klopt, met een nuance of vereenvoudiging (die staat in de toelichting en in het docentdeel);
     - `!` klopt niet of is te stellig → de film of het docentdeel moet worden aangepast. Rust de verbetering op ≥ 2 onafhankelijke bronnen (≥ 1 niveau A), dan past Claude hem zelf aan en documenteert hem onder Aanpassingen (was → nu → bronnen), zonder keuring door Kamiel (25 okt 2026); anders is het een voorstel aan Kamiel;
     - `?` nog niet (voldoende) nagegaan.
   - *Toegeschreven bewering*: zegt de film zelf van wie een bevinding komt ('in 2017 liet Radar tonijn testen in 21 restaurants'), dan is die ene oorspronkelijke publicatie genoeg: status `≈`, toeschrijving en jaar in de toelichting. De film maakt er dan geen algemene bewering van ('tonijn is vaak nep') zonder ✓-bronnen (Kamiel 25 okt 2026).
4. **Aanpassingen**: wat er na de controle in de film of het docentdeel moet veranderen, en of dat gebeurd is.
5. **Menselijke controle**: welke beweringen een mens zelf heeft nagelezen (zie 4).

## 4. Wie controleert wat

Eerlijk vastleggen wie wat gedaan heeft, want dat vraagt een uitgever.

- **Eerste ronde (Claude)**: haalt alle beweringen uit het script, zoekt per bewering de bronnen, opent ze, legt ze naast elkaar en vult het logboek. Claude noemt nooit een bron die het niet zelf heeft geopend.
- **Steekproef (Kamiel)**: opent per film minstens drie bronnen zelf en vinkt in het logboek af dat de bewering daar echt staat; altijd alle beweringen met status `≈` of `!`, en anders de getallen. Ongeveer tien minuten per film. Pas dan heet een film **gecontroleerd**.
- **Vakexpert (waar het kan)**: bij 'Wat word jij?' en bij onderwerpen buiten de eigen expertise kijkt iemand uit het vak mee (opleiding, beroepsvereniging, collega). Naam, functie en datum in de kop, alleen met toestemming.
- **Na publicatie**: meldingen via de feedbackknop (`fout gevonden`) worden in het logboek verwerkt: bewering toevoegen of status aanpassen, film verbeteren, regel in het foutenlogboek (`films/logboek/fouten.jsonl`, soort `inhoud`).

## 5. Overzicht

`python3 scripts/bronnencheck.py` telt per film het aantal beweringen per status en meldt films zonder logboek, beweringen met `!` of `?`, beweringen met minder dan twee bronnen of zonder bron van niveau A, en films zonder menselijke steekproef. `--md` schrijft het overzicht naar `films/BRONNEN-OVERZICHT.md` (handig om een uitgever te laten zien).

## 6. Wat je een uitgever kunt vertellen

> Elke bewering in een film wordt nagegaan in minstens twee onafhankelijke bronnen, waarvan minstens één gezaghebbend: wetenschappelijke literatuur, officiële instanties of standaardnaslagwerken. Examenstof leggen we daarnaast naast de syllabus. Per film staat in een bronnenlogboek welke bewering met welke bron is gecontroleerd, door wie en wanneer, inclusief de vereenvoudigingen die we bewust maken. De eerste controle gebeurt met hulp van AI; daarna controleer ik zelf steekproefsgewijs de bronnen. Wordt er toch een fout gemeld, dan passen we de film en het logboek aan.

Gebruik deze tekst alleen voor films die werkelijk zo gecontroleerd zijn (zie het overzicht).
