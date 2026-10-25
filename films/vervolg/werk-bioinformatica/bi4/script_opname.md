# Van letters naar vorm: eiwitstructuur voorspellen — script v2 (25 okt 2026, definitief voor de opname, behalve de opleidingenzin)

Wat word jij? · Bio-informatica (film 4), havo/vwo bovenbouw, één niveau, hbo/wo-oriëntatie. Voice Roos (eleven_v4). Look: Schema met cast (Sam, 16, meeloopweek, `gewoon`; Dr. Kim, onderzoeker, `gewoon`; een collega uit het natte lab als figurant in `lab`, zonder naam — of Dr. Kim zelf in het lab, zie twijfels). Micro voor de keten die vouwt (kralen #C9A35C). Reeksobject: scherm met sequenties. Doorlopend UI-element: een gesloten envelop met een zegel rechtsboven ('gemeten · nog geheim') die in de recap opengaat. Bouwt voort op Van DNA naar eiwit, Alles versneld, Antistoffen op maat en Sleutel, slot en dosis; uitlijnen uit de eerste film van deze reeks. Echte personen genoemd, niet getekend. Getallen: `getallen.md`.
v1 = variant C (winnaar blinde beoordelaar) met overnames uit A en B. v2 = v1 na `reviews/review_v1.md`: alle MOET-punten, de meeste KAN-punten (zie `brief.md`). Opnamenoot: 'Wat denk je?' en de vraagzin ervoor horen bij de vraagtake, niet bij de vertellingsalinea (Vragen uit).

---

## Cold open [Schema: gang van het lab; een collega in labjas (figurant) geeft Dr. Kim een envelop met een zegel; Dr. Kim geeft Sam een briefje met ± 30 letters; Sam kijkt van het briefje naar de envelop]
In deze envelop zit de vorm van een eiwit, net gemeten. Nog niemand buiten het lab heeft hem gezien. Sam krijgt alleen de volgorde van de aminozuren. In de cel vouwt die keten tot die vorm. Kan een computer hem voorspellen, voordat de envelop opengaat?

## Titel
Van letters naar vorm

## Hoofdstuk 1 — Wat staat er op het spel? [Micro → Schema: kralenketting die vouwt tot een kluwen met een holte; kaartjes 'Alles versneld' en 'Antistoffen op maat'; daarna hetzelfde eiwit twee keer: keurig gevouwen met een stofje in de holte, en als slappe keten waar het stofje langs glijdt]
Waarom zo veel moeite voor een vorm? In Van DNA naar eiwit maakte het ribosoom een keten van aminozuren. Die keten vouwt zich tot een eiwitstructuur: de ruimtelijke vorm. Die hangt meestal af van de volgorde. En de vorm bepaalt wat het eiwit kan. Een enzym heeft een holte voor zijn substraat. Een antistof grijpt één vorm. Dat zag je in Alles versneld en Antistoffen op maat.

Dit eiwit is een enzym van een ziekteverwekker. Een medicijn zou in de holte kunnen passen, zoals een sleutel in een slot. Dat zag je in Sleutel, slot en dosis. Maar stel: op één plek in de holte zit een ander aminozuur. Wat denk je?
[VRAAG] (a) niets: de keten is even lang, dus het enzym werkt hetzelfde · (b) de holte krijgt een andere vorm, en het enzym werkt anders · (c) het enzym merkt de verandering en bouwt zijn holte weer terug

Antwoord b. Eén ander aminozuur kan de vorm van de holte veranderen, en daarmee de werking. Een enzym bouwt zijn holte niet terug: het vouwt zoals zijn nieuwe volgorde het laat vouwen. Dan past het medicijn misschien ook niet meer. Daarom wil het lab de vorm precies weten. En daarom wil Sam hem voorspellen.

## Hoofdstuk 2 — Wat zit er in de envelop? [Schema: terugblik in het lab: kristalplaatje, een kalender waarvan de maanden omslaan; röntgenbundel → stippen → kluwen; ernaast een vriezer en 'cryo-EM: bevroren, zonder kristal · scherp sinds ± 2013'; '1958 · myoglobine'; twee balken PDB ± 250 000 vs > 200 000 000 bekende eiwitten (niet op schaal); daarna Sams scherm: zijn eerste idee, een teller die vormen afloopt, 3¹⁰⁰ ≈ 5 × 10⁴⁷ en een heelal-klokje dat veel te kort is, label 'vereenvoudigd']
Hoe kwam die vorm in de envelop? De collega maakte een kristal van heel veel dezelfde eiwitten. Ze stuurde er röntgenstraling doorheen. Uit het stippenpatroon rekende ze de vorm terug. Zo zagen onderzoekers in 1958 voor het eerst de vorm van een eiwit: myoglobine. Sinds ruim tien jaar kan dat ook heel scherp met bevroren eiwitten, zonder kristal: cryo-elektronenmicroscopie.

Zulk werk kan jaren duren, met dure apparaten. Daarom zijn er pas zo'n kwart miljoen structuren gemeten. Ze staan in de openbare databank PDB. Bekende eiwitten zijn er meer dan tweehonderd miljoen. Sams eerste idee: laat de computer elke mogelijke vorm proberen. Is dat sneller dan het lab? Wat denk je?
[VRAAG] (a) nee: het aantal mogelijke vormen is veel te groot · (b) ja: met genoeg computers duurt het hooguit een paar jaar · (c) ja: het eiwit in de cel doorloopt ook alle vormen, en is snel klaar

Antwoord a. Neem een eiwit van honderd aminozuren. Stel dat elke schakel maar drie kanten op kan draaien. Dan zijn er drie tot de macht honderd vormen. Dat is een vijf met zevenenveertig nullen. Bij een biljoen per seconde duurt het veel langer dan het heelal oud is. Het eiwit zelf doorloopt ook niet alle vormen: het vouwt veel sneller. Er moet dus een slimmere manier zijn.

## Hoofdstuk 3 — De voorspelling maken [Schema: Sam plakt de letters in AlphaFold; een balk 'zoekt verwante eiwitten'; uitlijning van zes regels, twee gouden kolommen die samen veranderen; Micro: de twee kralen tegen elkaar; daarna terugblik 'zo leerde het': een stapel kaarten (volgorde + gemeten vorm), gok → vergelijk → bijstellen, teller '> 100 000'; tot slot een scorebord 'CASP · blind · beste team · moeilijke eiwitten' met jaren: 2016 < 40 (alleen in beeld), 2018 ± 60, 2020 ± 90, streep 'zo goed als meten'; naamkaartje 'Google DeepMind' (geen logo); naamkaartjes Hassabis, Jumper, Baker zonder portret]
Sam plakt de letters in AlphaFold, een programma van Google DeepMind. Het zoekt eerst verwante eiwitten uit andere soorten. Die legt het onder elkaar, met gelijke letters onder elkaar: uitlijnen, zoals in de eerste film van deze reeks. Op twee plekken veranderen de letters steeds samen. Wat leert het programma daaruit? Wat denk je?
[VRAAG] (a) die twee aminozuren liggen ver uit elkaar, anders zouden ze botsen · (b) op die twee plekken verschilt het eiwit het meest tussen soorten · (c) die twee aminozuren liggen in de vorm waarschijnlijk tegen elkaar

Antwoord c. Plekken die samen veranderen, liggen in de vorm waarschijnlijk tegen elkaar. Twee aminozuren die elkaar raken, moeten bij elkaar passen. Verandert de één, dan blijft het eiwit vooral werken als de ander mee verandert. Samen geven zulke paren een schets van de vorm. Hoe minder verwante eiwitten, hoe minder hints, en hoe slechter de gok.

Maar hoe weet het programma wat het met die hints moet? Het heeft geleerd van voorbeelden: meer dan honderdduizend gemeten structuren uit de PDB. Bij elk voorbeeld gokte het een vorm. Die vergeleek het met de echte. Daarna stelde het zichzelf een klein beetje bij. Dat herhaalde het heel vaak. Niemand schreef het vouwen stap voor stap voor. De meeste patronen haalde het zelf uit de voorbeelden.

Is dit eerlijk getest? Ja, precies zoals Sam nu doet. In de wedstrijd CASP voorspellen teams sinds 1994 vormen die net gemeten zijn. Die zijn nog geheim. De score gaat tot honderd. Rond de negentig is ongeveer zo goed als meten. Bij moeilijke eiwitten haalde AlphaFold in 2018 zo'n zestig, en in 2020 zo'n negentig. Daarvoor kregen Demis Hassabis en John Jumper in 2024 de Nobelprijs voor Scheikunde. Ze deelden hem met David Baker, die eiwitten ontwerpt.

## Hoofdstuk 4 — De envelop gaat open [Schema: Sams voorspelling, gekleurd per stuk (blauw zeker → oranje onzeker); de envelop gaat open, de gemeten vorm schuift eroverheen; het blauwe deel valt bijna precies samen, de holte klopt; één oranje lus ligt anders; daarna hetzelfde enzym open en dicht met label 'echt eiwit beweegt'; Dr. Kim wijst naar de lus; tot slot databank-kaart '± 200 miljoen voorspellingen · gratis']
Eerst kijkt Sam naar de kleuren. AlphaFold geeft per stuk aan hoe zeker het is: blauw zeker, oranje onzeker. Bijna alles is blauw. Dan gaat de envelop open. Waar zit het grootste verschil? Wat denk je?
[VRAAG] (a) in de oranje stukken: daar was het programma onzeker · (b) in de holte: daar moet het medicijn passen, en die is het lastigst · (c) nergens echt: bij een score van negentig klopt bijna elk stuk

Antwoord a. Het blauwe deel en de holte vallen bijna precies over de meting. Eén oranje lus boven de holte ligt anders. AlphaFold scoorde in 2020 rond de negentig, maar dat was een gemiddelde over veel eiwitten. Per stuk kan het veel slechter zijn. Zo'n oranje stuk heeft soms geen vaste vorm, of het programma had te weinig hints. De kleur zegt niet welke van de twee het is.

En er is iets wat geen van beide laat zien. Een echt eiwit beweegt. Een enzym kan wel even van vorm veranderen als er iets bindt. Ook hoe een medicijn precies bindt, of wat één veranderd aminozuur doet, is lastig. Nieuwere versies proberen het, maar ook dan blijft het een gok die je toetst. Een voorspelling is dus een hypothese. Zo kiezen labs sneller wat ze gaan meten en testen. Zo'n tweehonderd miljoen voorspellingen staan gratis online.

## Recap [Schema: briefje met letters → Sams gekleurde voorspelling → open envelop met de meting eroverheen; drie kaartjes: 'niet alles uitproberen', 'leren van voorbeelden', 'hints uit uitlijnen'; opleidingskaartjes en drie werkplekken]
Kon de computer de vorm voorspellen voordat de envelop openging? Grotendeels wel. Niet door alle vormen te proberen: dat zijn er veel te veel. AlphaFold leerde van gemeten structuren en haalt hints uit verwante eiwitten. In ons voorbeeld klopte het zekere deel bijna precies, het onzekere deel niet. Daarom toets je een voorspelling, net als in de wedstrijd.

Dit werk leer je bijvoorbeeld bij de hbo-opleiding Bio-informatica in Nijmegen: vier jaar. Of je doet eerst een bachelor als biologie of moleculaire levenswetenschappen in Nijmegen, en daarna de master Bioinformatics in Wageningen. Je werkt dan in een ziekenhuis, op een onderzoeksinstituut of bij een bedrijf. Met eiwitvormen werk je vaak samen met het lab dat ze meet.

## Eindkaart
De vorm van een eiwit volgt meestal uit de volgorde, en bepaalt wat het eiwit kan (en waar een medicijn past).
Meten kan jaren kosten; alle vormen uitproberen kan niet.
AlphaFold leerde van gemeten structuren en leest hints uit uitgelijnde, verwante eiwitten.
Blind toetsen (CASP): in 2020 ongeveer zo goed als meten.
Betrouwbaarheid verschilt per stuk; één vorm, geen beweging; een voorspelling toets je.

