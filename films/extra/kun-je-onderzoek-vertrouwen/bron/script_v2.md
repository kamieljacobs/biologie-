# Kun je onderzoek vertrouwen? — script v2

v2 (30 okt 2026): verwerkt de expertreview (methodoloog, 23 punten) en de review didactiek, taal en curriculum (24 punten); zie `reviews/verwerking.md`. Belangrijkste wijzigingen: p-waarde overal als "kans op zo'n grote of grotere afwijking als alleen toeval speelt", nooit als kans op de hypothese; nulhypothese bij Mendel expliciet 3 : 1; "niet significant ≠ bewezen"; grenswaarde 3,84 bij een grens van 0,05; "te mooi" is nu een eigen kort hoofdstuk met een vraag (bevestigingsbias, geen systematische fout); de chronologie bij roken klopt (cohort vanaf 1951, Fishers kritiek later); Bradford Hill: negen gezichtspunten, geen afvinklijst; Kettlewell en Majerus voorzichtiger en korter; peer review vangt geen verzonnen gegevens; p-hacking met de kans van ± 64 %; effectgrootte en "alle studies samen" toegevoegd; cold-openvraag eenduidiger (zwakke opzet en selectief publiceren). Checkvragen, misvattingen, dekking en getallen staan in `docent_v2.md`.

Niveau: vwo 5–6 en profielwerkstuk (verdieping, buiten de examenstof). Bouwt voort op de basisfilm. Type G. Looks: Schema, Macro-nacht alleen voor de berkenspanners. Stem Roos (eleven_v4). Lege regel = nieuwe alinea = nieuwe take.

Leerdoelen (vwo 5–6, verdieping)
1. uitleggen wat een nulhypothese is, en een p-waarde lezen als de kans op zo'n grote of grotere afwijking als alleen toeval speelt; significant ≠ bewezen, niet significant ≠ bewezen dat er niets is; significant ≠ groot effect
2. een chi-kwadraattoets uitvoeren met waargenomen en verwachte aantallen, en de uitkomst vergelijken met de grenswaarde
3. uitleggen waarom resultaten die té mooi zijn ook verdacht zijn (bevestigingsbias)
4. patiënt-controleonderzoek en cohortonderzoek onderscheiden, en uitleggen welke argumenten een oorzaak waarschijnlijker maken (sterk en herhaald verband, oorzaak vóór gevolg, dosis-effectrelatie, mechanisme)
5. uitleggen hoe wetenschap zichzelf verbetert (peer review, herhaling) en waar dat hapert (publicatiebias, p-hacking, fraude); preregistratie als oplossing noemen

---

## Cold open [Schema: 53 kaartjes "kankerstudie" in een raster; ze draaien één voor één om: 6 groen, 47 grijs; casuskaart 2012]
In het jaar 2012 probeerde een biotechbedrijf drieënvijftig spraakmakende kankerstudies te herhalen. Het lukte maar zes keer. Al die studies stonden in goede tijdschriften. Hoe kan dat? Wat denk je?
[VRAAG] (a) de meeste onderzoekers hadden gefraudeerd · (b) zwakke proefopzet, en vooral opvallende uitkomsten worden gepubliceerd · (c) het lukt nooit om een proef precies na te doen

## Titel
Kun je onderzoek vertrouwen? Toeval, oorzaak en de wetenschap als systeem.

## Hoofdstuk 1 — Toeval of echt? [Schema: zakje met drie ronde en één gerimpelde knikker; teller; histogram dat aangroeit bij 1000 gesimuleerde proeven; Mendels uitkomst als gouden streep; de staarten links en rechts kleuren; de chi-kwadraatformule die zich per groep invult; casuskaart Brno, rond 1860]
Elke meting wijkt een beetje af van wat je verwacht. Is die afwijking echt, of toeval? Daarvoor gebruiken biologen statistiek.

Een voorbeeld. Gregor Mendel telde rond het jaar 1860 de erwten uit een kruising: ruim zevenduizend. Bij drie staat tot één verwacht je 1831 gerimpelde erwten. Hij vond er 1850: negentien meer. Is dat veel?

Stap één: je neemt aan dat er niets bijzonders is. Hier betekent dat: de verhouding is drie staat tot één, en elke afwijking komt door toeval. Dat heet de nulhypothese. Elke erwt is dan als een blinde greep uit een zakje met drie ronde en één gerimpelde knikker.

Stap twee: je laat de computer de proef duizend keer overdoen, met alleen toeval. De ene keer komen er 1810 gerimpelde uit, de andere keer 1860. Zo ziet toeval eruit.

Stap drie: hoe vaak ligt een uitkomst minstens zo ver van de verwachting als die van Mendel? Ongeveer zes van de tien keer. Die kans heet de p-waarde. Bij Mendel is p ongeveer nul komma zes. Zo'n afwijking komt bij toeval heel vaak voor.

Biologen leggen de grens meestal bij nul komma nul vijf: één op de twintig. Is p kleiner, dan heet een afwijking significant. Dan ga je twijfelen aan de nulhypothese.

Een onderzoek vindt p is nul komma nul drie. Wat betekent dat? Wat denk je?
[VRAAG] (a) er is drie procent kans dat de hypothese niet klopt · (b) als alleen toeval speelt, krijg je zo'n grote of grotere afwijking maar in drie procent van de gevallen · (c) het effect is drie procent groot

Antwoord b. De p-waarde rekent vanuit de nulhypothese: stel dat alleen toeval speelt, hoe vaak krijg je dan zo'n uitkomst? Misschien dacht je: drie procent kans dat het niet klopt. Zo lijkt het, maar die kans zegt de p-waarde niet. En de p-waarde zegt ook niet hoe groot een effect is. Een piepklein verschil wordt significant als je maar genoeg metingen doet.

En Mendel? Zijn uitkomst is niet significant. Dat bewijst de drie staat tot één niet. Je hebt alleen geen reden gevonden om eraan te twijfelen.

In de praktijk simuleer je niet. Je doet een chi-kwadraattoets. Per groep neem je het verschil tussen waargenomen en verwacht. Dat verschil doe je in het kwadraat. Dan deel je door het verwachte aantal. Alle groepen opgeteld: bij Mendel nul komma zesentwintig. Bij twee groepen en een grens van nul komma nul vijf is de grenswaarde drie komma vierentachtig. Mendel zit daar ver onder: niet significant.

## Hoofdstuk 2 — Te mooi om waar te zijn [Schema: een munt; tien rijtjes van honderd worpen met steeds 49, 50 of 51 keer kop; daarnaast Mendels proeven als stippen die allemaal vlak bij de verwachting liggen; casuskaart 1936]
Toeval zorgt voor afwijkingen. Kleine meestal, en soms grote. Wat betekent het dan als er bijna geen afwijkingen zijn?

Iemand gooit tien keer honderd keer een munt op. Elke keer meldt hij negenenveertig, vijftig of eenenvijftig keer kop. Wat denk je?
[VRAAG] (a) een eerlijke munt: het zit telkens netjes rond de helft · (b) te netjes: bij echt toeval wijkt het vaker af · (c) een vervalste munt

Antwoord b. Elke uitkomst op zich is heel gewoon. Maar tien keer achter elkaar zo dicht bij de helft is bij echt toeval bijna onmogelijk. Misschien dacht je: hoe dichter bij de verwachting, hoe betrouwbaarder. Maar echte metingen hebben spreiding.

In het jaar 1936 keek de statisticus Ronald Fisher zo naar alle proeven van Mendel samen. Bijna allemaal zaten ze opvallend dicht bij de verwachting. Of hier echt iets mis was, is nog altijd omstreden. Een mogelijke verklaring: twijfelgevallen werden, zonder opzet, ingedeeld bij de groep die je verwacht. Of je stopt met tellen zodra de verhouding er mooi uitziet. Dat heet bevestigingsbias: je ziet wat je verwacht.

## Hoofdstuk 3 — Van verband naar oorzaak [Schema: twee groepen silhouetten (patiënten en controle) met rokers en zware rokers gekleurd; pijl terug in de tijd; daarna een grote groep artsen met een tijdlijn vooruit; trapgrafiek sigaretten per dag tegen risico; stoppen-lijn die daalt; bord met vier gezichtspunten van Bradford Hill; casuskaart Londen 1950]
Een correlatie is nog geen oorzaak. Maar hoe maak je een oorzaak dan toch waarschijnlijk, als een experiment niet mag? Dat zie je bij roken en longkanker.

In het jaar 1950 deden Richard Doll en Austin Bradford Hill een patiënt-controleonderzoek. Je vergelijkt mensen met de ziekte met een controlegroep zonder de ziekte. En je kijkt terug: wat deden ze vroeger? Ook in de controlegroep rookten bijna alle mannen. Maar de patiënten rookten vaker, en vooral veel meer.

Terugkijken heeft een zwakte. Misschien veroorzaakt een beginnende ziekte juist zin in roken. Dat is omgekeerde causaliteit. Welke opzet sluit dat het best uit? Wat denk je?
[VRAAG] (a) een patiënt-controleonderzoek met veel meer patiënten · (b) eerst meten wie rookt, en mensen daarna jaren volgen · (c) patiënten nog preciezer vragen hoeveel ze vroeger rookten

Antwoord b. Dat deden Doll en Hill vanaf het jaar 1951: een cohortonderzoek. Ze vroegen ongeveer veertigduizend Britse artsen naar hun rookgedrag, en volgden hen jarenlang. Het roken was gemeten vóórdat iemand ziek werd. Misschien dacht je: meer patiënten maakt het beter. Dat maakt het betrouwbaarder, maar terugkijken blijft terugkijken. Wel let op: ook een cohort sluit een verstorende variabele niet uit.

Daar wees Ronald Fisher later op. Misschien zorgt een erfelijke aanleg voor allebei: roken én longkanker. Maar hoe meer sigaretten per dag, hoe groter de kans op longkanker: een dosis-effectrelatie. En wie stopte, liep daarna minder risico. Fishers verklaring werd daardoor steeds onwaarschijnlijker. Fisher was overigens adviseur van de tabaksindustrie. Zijn vragen waren terecht, maar ook wie betaalt, kan meekleuren wat je ziet.

Bradford Hill noemde later negen gezichtspunten die een oorzaak waarschijnlijker maken. Vier belangrijke: een sterk verband dat steeds opnieuw wordt gevonden, de oorzaak komt vóór het gevolg, een dosis-effectrelatie, en een biologisch mechanisme. Het is geen afvinklijst. Maar voor roken wezen ze allemaal dezelfde kant op.

## Hoofdstuk 4 — Hoe wetenschap zichzelf verbetert [Schema: kaartje HYPOTHESE met een stapel bevestigingen die nooit 'bewezen' wordt; tijdschrift met twee vakgenoten (peer review); Macro-nacht: berkenspanners licht en donker op lichte en zwarte stammen; de 53 kaartjes van de cold open; een la met 'niets gevonden'; twintig dobbelstenen; tijdlijn van een fraudezaak]
Een hypothese kun je nooit helemaal bewijzen. Elke nieuwe proef kan haar nog onderuit halen. Vertrouwen groeit pas als een resultaat keer op keer standhoudt. Daarvoor heeft de wetenschap twee vangnetten. Vóór publicatie beoordelen vakgenoten een artikel: peer review. En daarna proberen anderen het te herhalen.

Zo ging het met de berkenspanner, een nachtvlinder met een lichte en een donkere vorm. In de jaren vijftig vond Bernard Kettlewell dat vogels op zwarte stammen vaker de lichte vlinders opaten. Er kwam kritiek op zijn opzet. Tussen het jaar 2001 en het jaar 2007 deed Michael Majerus een deel opnieuw, met bijna vijfduizend vlinders, beter opgezet. Ook hij zag dat vogels vaker de slecht gecamoufleerde vlinders aten. Kritiek leidde tot een betere proef.

Maar soms hapert het systeem. Terug naar de drieënvijftig kankerstudies. Waarom lukte het zo vaak niet? Antwoord b. Veel studies hadden een zwakke opzet: weinig herhalingen, en niet blind gemeten. En tijdschriften publiceren liever opvallende uitkomsten. Onderzoek waarin niets gevonden werd, verdwijnt in de la. Dat heet publicatiebias. Misschien dacht je: dan waren het fraudeurs. Maar daarvoor was geen bewijs. Zwakke opzet, selectief publiceren en toeval samen zijn genoeg.

Je toetst twintig keer iets wat in werkelijkheid geen effect heeft. Hoe vaak verwacht je toch een significante uitkomst? Wat denk je?
[VRAAG] (a) nooit: zonder effect is p altijd groot · (b) ongeveer één keer · (c) ongeveer tien keer

Antwoord b. Met een grens van één op de twintig verwacht je bij twintig toetsen één toevalstreffer. De kans op minstens één is zelfs bijna twee op drie. Net zo lang analyseren tot er iets significants uitkomt, en alleen dat melden, heet p-hacking. Een oplossing: vóóraf vastleggen wat je gaat meten en hoe je het toetst. Dat heet preregistratie. En ook uitkomsten zonder effect publiceren. Dan kun je later alle studies samen bekijken, in plaats van één opvallende.

Soms is het wél fraude. In het jaar 2004 meldde een Zuid-Koreaanse onderzoeker dat hij stamcellen had gemaakt uit gekloonde menselijke embryo's, en in het jaar 2005 nog eens. De artikelen kwamen gewoon door de peer review. Peer review vangt veel, maar geen verzonnen gegevens. Jonge onderzoekers en journalisten zagen na publicatie dat foto's van verschillende cellijnen dezelfde waren. De gegevens bleken verzonnen, en de artikelen werden ingetrokken.

## Recap [Schema: de 53 kaartjes; het histogram van de simulatie; de vier gezichtspunten; het vangnet peer review + herhaling]
Kun je onderzoek vertrouwen? Eén studie bewijst weinig. Een p-waarde zegt hoe vaak toeval alleen zo'n uitkomst geeft, niet of je hypothese klopt. Te mooi is ook verdacht. Een correlatie wordt pas een waarschijnlijke oorzaak als veel argumenten dezelfde kant op wijzen. En een resultaat telt pas echt als anderen het kunnen herhalen.
Dus bij elk nieuw onderzoek: is het herhaald? Was het vooraf vastgelegd? En wie betaalde het?

## Eindkaart
Nulhypothese: alleen toeval · p-waarde: kans op zo'n grote of grotere afwijking als de nulhypothese klopt · p < 0,05: significant, niet bewezen, en niet per se een groot effect.
Chi-kwadraat: Σ (W − V)² / V; bij twee groepen en α = 0,05 grenswaarde 3,84.
Te mooi is ook verdacht: bevestigingsbias.
Patiënt-controle: terugkijken · cohort: eerst meten, dan volgen.
Oorzaak waarschijnlijker: sterk en herhaald verband, oorzaak vóór gevolg, dosis-effect, mechanisme.
Wetenschap als systeem: peer review, herhalen · hapert door zwakke opzet, publicatiebias, p-hacking, fraude · oplossing: preregistratie.
