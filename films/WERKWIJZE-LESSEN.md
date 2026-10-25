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

### Uit de eerste patroonanalyse (23 okt 2026, 77 regels, alleen Evolutie v2)
- **Frisse review als vaste stap vóór elke keuring** — 55 van 77 fouten ontstonden in het script; de eigen zelfreview miste er 23, de bronnencheck 19, de consistentiecheck 11. De frisse reviewer vond 61 van de 77. Voorstel B4/B7: niet 'als er agents zijn' maar altijd, en in reeksmodus over alle films tegelijk.
- **Stelligheidscheck** — 34× vakinhoud of te stellig, vaak een algemene regel die in een andere film wordt tegengesproken ('selectie gaat één kant op', 'alle soorten erven het kenmerk'). Voorstel B4: zoek in het script naar alle, altijd, nooit, niets, alleen, geen en laat elke zo'n zin toetsen tegen bron en de andere films.
- **Regels voor vraagopties** — 8× te raden in 6 films. Voorstel B4: opties ongeveer even lang, vakterm niet alleen in het goede antwoord, geen optie die per definitie waar is, de zin vóór de vraag geeft het antwoord niet weg.
- **Vragen uit automatisch controleren op scriptniveau** — 6× in 4 films, terwijl de regel al bestond. Voorstel B11: een script dat per vraag checkt of de volgende alinea woorden of getallen gebruikt die alleen op de vraagkaart staan.
- Goed nieuws: tekenfouten (7×) werden allemaal op het testvel gevangen; die stap werkt.
Kanttekening: één reeks, één reviewer; dit zijn eerste aanwijzingen, geen vaste patronen.

### Uit de productie van Evolutie v2 film 1–8 (24 okt 2026, frisse beeldreview na het bouwen)
- **Frisse beeldreview ook ná het bouwen, niet alleen bij het storyboard** — de makers keken elk hun eigen contactbladen na, toch vond een frisse reviewer per film 5–9 MOET-punten (32 in het logboek; `gemist_bij = contactblad` is nu 44×). Soorten die de maker steeds mist: beeld dat niet klopt met de zin op dat moment (nacht bij 'zonnig kozijn', drie gelijke snavels bij 8/9,3/11 mm, histogram dat pas na de zin vervormt), onderlinge maten (tweeling, mops, baby, tijger), labels over tekeningen of tegen de rand, lege schermen in de eerste seconden van een alinea. Voorstel B4/B11: na elke bouw een frisse reviewer met een vaste checklist (lees bij elke still de ondertitel en vraag: laat het beeld precies dit zien?).
- **Eenheden in metalabels voluit** — `metaText` zet alles in hoofdletters: µm werd 'MM', miljoen jaar 'MJ', meter 'M'. Voorstel Part C: eenheden in metalabels voluit schrijven (micrometer, miljoen jaar, meter).
- **Eerste seconde van een alinea nooit leeg** — 9× een (bijna) leeg beeld bij het begin van een alinea, vooral na een vraag of hoofdstukwissel. Voorstel Part C: het beeld van een alinea staat er op t = 0; alleen wat genoemd wordt komt later.

### Uit de productie van de extra films 9–12 (24 okt 2026, frisse beeldreview na het bouwen, nu als vaste stap C10.7)
- **Labels nooit tegen de rand van het beeld** — 5× in 3 films. Voorstel Part C: marge van ≥ 60 px tot de beeldrand voor elk label; opnemen in de checklist van C10.7.
- **Een personage dat in de film ouder wordt, krijgt een tekening die bij zijn leeftijd past** (Darwin van 22 tot 73 in film 9; de oude Darwin stond er al bij 29 jaar). Voorstel: leeftijd per scène in het storyboard noteren bij historische personen.
- **Wat de stem noemt, moet ook getekend zijn** (laagjes in de stromatoliet, botjes in de vin, twee membranen, moleculen die als stipjes verdwenen). Valt onder 'beeld = ondertitel', maar vooral bij kleine structuren in een vergroting.
- Goed nieuws: de reviewer vond per film 3–6 MOET-punten (eerder 5–9), en de makers herstelden ze in één ronde.

## Verwerkt in prompt
- **v10 aanvulling (25 okt 2026, Kamiel): geen verwijzingen naar tools in de film** — vooral niet uitgesproken: geen 'Probeer het zelf', 'in de tool', 'op de site', ook niet op een kaart (B4, D2, D4; controle in B11).
- **v10 (24 okt 2026, Kamiel akkoord): C10 Tekenkwaliteit** — bibliotheek eerst, bron wint van plaat, ElevenLabs-platen alleen om van te leren, testvel en keuring, receptkaarten (dieren als pop, micro, organen/lichaam, planten/ongewervelden), stilstaande omtrek alleen voor een dier dat in zijn scène niet beweegt, en **frisse beeldreview ná elke bouw** met vaste checklist (beeld = ondertitel, onderlinge maten, labels, beeld op t = 0, gang zonder glijden, inhoud binnen membraan). Daarmee verwerkt: 'Frisse beeldreview ook ná het bouwen', 'Eenheden in metalabels voluit', 'Eerste seconde van een alinea nooit leeg'. Volledige tekst: Claude doc https://claude.ai/artifact/S3P5sQcLVpbGufeScVyhoo; in de prompt als C10 (doc https://claude.ai/artifact/RJxQpjyccupQC9KXUxmETA).
