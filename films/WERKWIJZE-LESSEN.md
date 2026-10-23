# Lessen voor de werkwijze (sinds 23 okt 2026)

Kamiel (23 okt 2026): de opmerkingen bij keuringen en reviews moeten uiteindelijk de werkwijze veranderen, niet alleen de ene film.

## Hoe een opmerking een les wordt
1. Elke opmerking wordt eerst in de film zelf verwerkt.
2. Opmerkingen die Kamiel op een keuringsblad aanvinkt met **geldt voor alle films** (veld `algemeen: true` in de db-collectie `keuring`), en opmerkingen die Claude zelf als algemeen herkent, krijgen een **oorzaakvraag**: welke stap in de werkwijze had dit moeten tegenhouden?
3. Gaat het over hoe iets eruitziet: regel erbij in `films/BEELDAFSPRAKEN.md` (geldt meteen).
4. Gaat het over hoe we werken (onderzoek, script, controle, bouwen): als kandidaat hieronder, met de opmerking, de oorzaak en de voorgestelde aanpassing van een stap. Geen losse uitzonderingsregel per fout; liever één betere stap die ook nog onbekende fouten vangt.
5. Na elke keuringsronde krijgt Kamiel een kort lijstje van wat als algemeen is aangemerkt. Bij een nieuwe promptversie keurt hij de kandidaten; goedgekeurde gaan de prompt in en verhuizen hier naar 'Verwerkt in prompt'.

## Kandidaten voor de volgende promptversie
- **Indeling en verwantschap altijd tegen een bron** (Evolutie v2, review 22 okt: "de dolfijn hoort bij de zoogdieren, net als de walvis", terwijl een dolfijn zelf een walvis is). Oorzaak: beweringen over groepen en verwantschap werden uit het hoofd geschreven en niet als 'getal' behandeld. Voorstel B4/B11: elke bewering over indeling, verwantschap of 'X is een Y' komt in de getallentabel met bron.
- **Haken uit de seriebrief net zo streng controleren als getallen** (Evolutie v2, film 3: "een staart die hem trager maakt" bleek niet te kloppen; metingen in dezelfde vogels met en zonder sleep, Askew 2014). Oorzaak: de brief werd als gegeven behandeld. Voorstel B2: ook DAILY-LIFE HOOKS en puzzels uit de brief worden nagelopen; afwijken wordt gemeld in keuzes en twijfels.
- **Eén definitie per begrip over de hele reeks** (Evolutie v2: genenstroom anders in film 5 en 6; soortdefinitie zonder 'in de natuur' botste met leeuw/tijger in film 8). Oorzaak: films parallel geschreven door verschillende helpers. Voorstel B7: in reeksmodus eerst een gedeelde begrippenlijst van de reeks vastleggen, en vóór de keuring een consistentiecheck over alle films door een frisse reviewer (die vond hier 60 punten).

## Verwerkt in prompt
(nog niets)
