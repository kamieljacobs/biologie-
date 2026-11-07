# Filmbrief — PFAS, DDT en microplastic: ophoping in voedselketens

| Veld | |
|---|---|
| TOPIC | het werk van een milieukundige bij stoffen die blijven hangen: meten wat je niet ziet (monster, nanogrammen, bepalingsgrens), uitzoeken waar een stof in een dier zit (DDT in vet, PFAS aan eiwit) en langs welke route hij binnenkomt (bodem → worm → kip → ei), aantonen of een stof per stap in de keten toeneemt (stikstofisotopen; ja bij DDT en meestal bij PFOS, niet aangetoond bij microplastic), van onderzoek naar norm (geen-effectniveau ÷ veiligheidsfactor; bij PFAS uit onderzoek bij mensen, per week) en wat je dan doet (advies, verbod, 'de vervuiler betaalt', voorzorg) |
| AUDIENCE | havo/vwo bovenbouw, oriëntatie op studie (Wat word jij? · Milieukunde, film 1a) |
| NIVEAU | havo en vwo, één versie, havo-taal; één rekenstukje (weeknorm × lichaamsgewicht tegen één ei) met de som op het scherm; isotopen als verdieping |
| LENGTH | content decides, richtwaarde ± 6–7 min spraak (± 850–1000 woorden) |
| USE | beide |
| SERIES | nog geen reeksbrief: voorstel in `werk/REEKSBRIEF-voorstel.md` |
| CENTRAL PUZZLE | Waarom zitten er meer gifstoffen in een zeearend dan in het water waar hij vist? (planobject vervolg.html, door Kamiel gehouden 31 okt 2026) |
| DAILY-LIFE HOOK | Thijs (15) loopt snuffelstage bij een omgevingsdienst; Milieukundige Iris onderzoekt de eieren van buurman Joost, die kippen in zijn tuin houdt. De zeearend aan de plas achter Joosts huis is de puzzel. |
| LEAVE OUT | uitleg *dat* stoffen ophopen langs plankton → vis → zeehond → orka en de ADI-som met appels (*Eén aarde*, H2); pcb's bij zeehonden (*Plek genoeg?*); Rachel Carson en *Silent Spring* (*Geschiedenis van de biologie*); hoe de lever afbreekt en ontgift (*De lever als fabriek*); stikstofdepositie (*Stikstof*); echte fabrieksnaam of plaats bij de eieren; gezondheidsangst; microplastic als 'gif' |
| VOICE | Roos, eleven_v4 |
| CHECKPOINT | twijfelscènes op een blad voor Kamiel (regels.json V1) |
| NOTES | Opbouw = het oorspronkelijke planobject (Kamiel 31 okt 2026: houden, drie stoffen): H1 Afbreekbaar of persistent: welke stoffen blijven · H2 Bioaccumulatie: ophopen in vetweefsel · H3 Biomagnificatie: elke stap in de keten meer · H4 Normen, vergunningen en wie betaalt: milieukunde en beleid. Elk hoofdstuk wordt vanuit het wérk verteld (meten · monster kiezen en route vinden · aantonen in de keten · norm en maatregel), zie Overlap. Titel H2 in de scripts: 'ophopen in vet of eiwit' (afwijking, op het twijfelblad). 'Nieuw' t.o.v. de lesstof (planobject): *Alles gaat rond* volgt stoffen die rondgaan; deze film gaat over stoffen die blijven hangen. Bouwt op: *Eén aarde* (accumulatie, ADI), *De lever als fabriek* (afbreken, uitscheiden), *Stikstof gaat rond* / *Wie eet wie?* (voedselketen). De `bouwt`-links in het planobject wijzen nog naar *Alles gaat rond* (archief): bij doorvoeren vervangen door de v2-films. |

## Overlap (grep, 31 okt 2026)
- **Eén aarde** (Ecologie 3, `films/ecologie/3-een-aarde/bron/script_v2.md` r. 41–46): 'Pcb's en PFAS breken bijna niet af: ze zijn persistent. Ze lossen op in vet of binden aan eiwitten, en worden slecht uitgescheiden. … accumulatie. Een vis eet heel veel plankton, een zeehond heel veel vissen, en een orka heel veel zeehonden. Bij elke stap stijgt de concentratie. Niet omdat een toppredator groot is …'; orka's bij Schotland; 'Volgens het RIVM krijgen veel mensen in Nederland er al meer van binnen dan veilig is'; ADI per kilo lichaamsgewicht met de appelsom (vraag + antwoord). **Grootste overlap.** Keuze: deze film legt het mechanisme níet opnieuw uit (één zin terug met filmtitel) en neemt de begrippen persistent en accumulatie als bekend. Hij laat zien hoe een milieukundige het *weet*: meten (H1), waar in het dier en langs welke route (H2), aantonen per stap met isotopen en de uitzondering microplastic (H3), en waar het normgetal vandaan komt dat in *Eén aarde* gegeven is (H4). De misconceptie 'groot dier = meer gif' wordt níet opnieuw bevraagd.
- **Wie eet wie?** (Ecologie 3 v2, r. 102): één zin accumulatie, verwijst naar *Eén aarde*. Geen overlap.
- **Plek genoeg?** (archief, r. 216–223): pcb's in vet, gewone zeehond 1976. Niet gebruiken.
- **Alles gaat rond** (archief, r. 175–177): pcb's niet afgebroken. Niet gebruiken.
- **Geschiedenis van de biologie** (extra, r. 107): DDT, Carson 1962, dunne schalen bij roofvogels, verbod VS 1972. → Hier de zeearend als meetreeks (broedsucces, herstel na verbod), niet het verhaal van Carson; één zin terug mag.
- **De lever als fabriek** (Voeding 5): de lever maakt stoffen oplosbaar zodat de nier ze uitplast. → Eén zin: 'je lichaam breekt PFAS niet af'; geen leveruitleg.
- **Microplastic**: nergens op de site.
- **Stikstof** (gedeelde film Ecologie/Milieukunde): meten met buisjes, marges, wie beslist (provincie). → Hier geen depositie; wel dezelfde houding (meten, onzekerheid, bestuur beslist).

## Trekking mutaties (scripts/dobbelsteen.py --zaad mk1-ophoping, 31 okt 2026)
- Variant A: klassiek, volgt het plan.
- Variant B: kleine mutaties: **opening** en **voorbeeld**. Opening: begint midden in het werk, in Joosts kippenren met een ei in Thijs' hand, en pas dan de zeearend als puzzel. Voorbeeld: het rekenvoorbeeld rekent met Thijs zelf (stel 60 kilo), in H1 ligt een winkelei naast Joosts ei (het winkelei 'onder de bepalingsgrens'), en in H3 staat de korte keten bodem → worm → ei naast de lange keten water → arend: in de worm zit meer dan in de grond, maar in het ei minder dan in de worm (B6), dus niet elke stap is meer. (Eerst bedacht: bodem → worm → kip → ei als keten die oploopt; geschrapt, want B6 meet in wormen méér dan in eieren.)
- Variant C: grote mutatie **dossier** (één dossier of object dat stap voor stap wordt opgebouwd). P1-toets: past, want het werk van een milieukundige ís een dossier opbouwen, van monster tot besluit: elk hoofdstuk voegt een blad toe (meetrapport · route · keten · norm en maatregel) en de kijker ziet het bewijs groeien tot een besluit. Daarnaast ligt een oud, gesloten dossier uit het archief (zeearend en DDT, jaren zeventig) dat laat zien hoe zo'n zaak afloopt. Geen herloting.
- Proefregels uit `films/logboek/regels.json`: P1 (zie hierboven), P2 (elke misconceptie een vraag; Iris een eigen beurt; het woord 'milieukundige' valt), V1 (alleen twijfelscènes naar Kamiel).

## Leerdoelen (de leerling kan …) — voorstel Claude, niet gekeurd
1. uitleggen wat persistent betekent en DDT, PFAS en microplastic daarop vergelijken (DDT en PFAS breken nauwelijks af; microplastic valt uiteen in kleinere stukjes);
2. uitleggen hoe een milieukundige een stof meet die je niet ziet (monster, nanogrammen) en wat 'onder de bepalingsgrens' betekent;
3. uitleggen dat een stof zich ophoopt waar hij aan bindt (DDT in vet, PFAS aan eiwit in bloed en lever) en dat de route naar een dier via een ander dier kan lopen (worm → kip → ei);
4. uitleggen hoe je aantoont dat een stof per stap in de keten toeneemt (plek in de keten bepalen, concentratie ertegen uitzetten) en dat dat voor microplastic niet is aangetoond;
5. uitleggen hoe een norm wordt afgeleid (geen-effectniveau ÷ veiligheidsfactor, per kilo lichaamsgewicht) en met een weeknorm uitrekenen of iets te veel is;
6. maatregelen noemen (advies, verbod, 'de vervuiler betaalt', voorzorg) en uitleggen waarom een verbod pas na jaren effect heeft.

## Misconcepties
1. Kun je iets niet meten (onder de bepalingsgrens), dan zit het er niet in → H1, vraag 1.
2. Alle gifstoffen hopen op in vet → H2, vraag 2.
3. De stof in een ei komt rechtstreeks uit de bodem of het water / de dichtstbijzijnde fabriek is de bron → H2 vraag 3, H4 vraag 6.
4. Elke stof die je in dieren vindt, hoopt per stap in de keten op (microplastic) → H3, vraag 4.
5. Een norm komt rechtstreeks uit een proef: de dosis zonder effect bij een dier geldt ook voor mensen → H4, vraag 5.
6. Als een stof verboden wordt, is het probleem meteen weg → H3/H4 (zeearend: herstel pas na ± tien jaar), recap.

## Te beslissen door Kamiel (twijfelblad)
- Cast: Thijs + nieuw personage Milieukundige Iris; Joost als buurman met kippen.
- Afwijking titel H2 ('vet of eiwit').
- Eieren als casus naast de zeearend-startvraag.
- Rol van een omgevingsdienst bij eieren (vereenvoudigd).
