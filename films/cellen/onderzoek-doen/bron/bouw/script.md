# Onderzoek doen in de biologie — remake 2.0 — script v2 (+ 2.1)

2.1 (31 okt 2026): nieuw hoofdstuk 5 Betrouwbaar en valide (Kamiel goedgekeurd, tekst uit `../hoofdstuk-betrouwbaar-valide.md`); de eerste zin van s24 is weg (geknipt, niet opnieuw ingesproken); oude H5–H7 → H6–H8. Let op: `make_segments.py` nummert opnieuw (s01…); in `segments.json` hebben de nieuwe alinea's de vaste ids b01–b09 en s24 de geknipte tekst. Draai make_segments dus niet opnieuw zonder de ids en de knip over te nemen.

v2 (30 okt 2026): verwerkt `reviews/expert.md` (methodoloog, 22 punten) en `reviews/didactiek.md` (didactiek, taal, curriculum, 34 punten); zie `reviews/verwerking.md`. Belangrijkste wijzigingen: de kiemproef is nu realistisch (tuinkers kiemt ook in het donker: de hypothese wordt verworpen en de lange gele kiemplantjes leveren een nieuwe vraag op, zodat de cyclus rond is); één hypothese overal ("licht bevordert het kiemen"); werkplan als stap in de cyclus (acht stappen); H2 eigen vraag over controlegroep tegenover constante variabele; het paard nu als voorbeeld van blind meten (de vraagsteller beïnvloedt), daarna placebo en dubbelblind; Pasteur geschrapt; Semmelweis met de kliniek van de vroedvrouwen als vergelijking; Van Helmont met drie aparte soorten fouten; de vraag in H4 toetst nu spreiding (kiemproef), de Grants alleen kort als voorbeeld van een histogram; roken ingekort met verwijzing naar de extra film; geen zinnen meer die na een vraag op de optieletters leunen. Checkvragen, misvattingen, dekking en getallen staan in `docent_v2.md`.

Niveau: havo 4 + vwo 4. Type G. Looks: zie het beeldplan in `script_remake_v1.md` (Schema; Macro-nacht voor het paard en kort voor de vinken). Stem Roos (eleven_v4). Lege regel = nieuwe alinea = nieuwe take. De leerling met de kiemproef is een castpersonage (Yasmin), niet bij naam genoemd.

Leerdoelen (havo 4 + vwo 4)
1. de stappen van de onderzoekscyclus noemen en in volgorde zetten (met werkplan)
2. een goede onderzoeksvraag herkennen, en hypothese en verwachting (als … dan …) onderscheiden; uitleggen wat falsifieerbaar is en dat een verworpen hypothese ook een resultaat is
3. in een proefopzet de onafhankelijke, afhankelijke en constante variabelen aanwijzen, en constante variabelen onderscheiden van een controlegroep
4. uitleggen waarom onderzoekers blind of dubbelblind werken, een placebo gebruiken en randomiseren
5. toevallige en systematische fouten onderscheiden, en uitleggen wat herhalen en een grotere steekproef wel en niet oplossen; nauwkeurig ≠ betrouwbaar
6. betrouwbaarheid en validiteit onderscheiden en toepassen op een onderzoek
7. bij resultaten de passende grafiek kiezen (staafdiagram, lijngrafiek, histogram), gemiddelde en spreiding lezen, en conclusie en discussie scheiden
8. correlatie en causaliteit onderscheiden; omgekeerde causaliteit en een verstorende variabele herkennen
9. de ethische regels bij onderzoek met mensen en dieren noemen (informed consent, de drie V's) en fraude onderscheiden van een eerlijke fout

---

## Cold open [Macro-nacht: paard voor een bord met sommen, vraagsteller ernaast, publiek eromheen; casuskaart Berlijn 1904]
Berlijn, in het jaar 1904. Een paard tikt het antwoord op een som met zijn hoef. Een commissie van deskundigen kijkt mee. Die vindt geen bedrog. Hoe kan een paard dat? Wat denk je?
[VRAAG] (a) het paard kon echt een beetje tellen · (b) het paard reageerde op de lichaamstaal van de vraagsteller · (c) de eigenaar gaf het paard bewust stiekem tekens

## Titel
Onderzoek doen in de biologie. Hoe weet je of iets waar is?

## Hoofdstuk 1 — De onderzoekscyclus [Schema: cyclus met acht vakjes die één voor één oplichten; het onderzoeksbord met de kiemproef; leerling aan de vensterbank]
Hoe pak je een onderzoek aan? Biologen volgen een vaste route: de onderzoekscyclus.

Je ziet dat tuinkers op de vensterbank snel opkomt. Dat is een waarneming. Je vraagt je af of licht het kiemen helpt. Dat is je onderzoeksvraag. Je bedenkt een mogelijk antwoord: de hypothese. Je schrijft op hoe je het gaat testen: het werkplan. Je voert de proef uit, en verzamelt de resultaten. Dan trek je een conclusie. In de discussie kijk je kritisch terug. Vaak levert dat een nieuwe vraag op.

## Hoofdstuk 2 — Van vraag naar verwachting [Schema: kaartjes ONDERZOEKSVRAAG, HYPOTHESE, VERWACHTING op één lijn; casuskaart Wenen 1847 met twee kraamklinieken als ziekenhuisicoon en sterftebalkjes; daarna het onderzoeksbord]
Hoe maak je van een vraag iets wat je kunt testen? Een goede onderzoeksvraag gaat over één factor, en over iets wat je kunt meten. "Wat doet licht met tuinkers?" is te vaag. "Kiemen er in het licht meer tuinkerszaadjes dan in het donker?" kun je onderzoeken.

Een hypothese is een mogelijk antwoord op je vraag. Bijvoorbeeld: licht bevordert het kiemen van tuinkers. Bij je hypothese hoort een verwachting: wat je in deze proef zult meten als de hypothese klopt. Vaak met als … dan. Als licht het kiemen bevordert, dan kiemen er in het licht meer zaadjes dan in het donker.

Welke zin is een verwachting, en geen hypothese? Wat denk je?
[VRAAG] (a) als licht het kiemen bevordert, dan kiemen er in het licht meer zaadjes dan in het donker · (b) licht bevordert het kiemen van tuinkers · (c) licht is goed voor alle planten

Antwoord a. Een verwachting zegt wat je in deze proef zult meten. "Licht bevordert het kiemen" is de hypothese: het idee zelf. Misschien dacht je: een hypothese en een verwachting zijn hetzelfde. Maar de hypothese is het idee. De verwachting is wat je dan zou moeten meten.

Een goede hypothese is falsifieerbaar: er is een uitkomst denkbaar die haar weerlegt. Kiemen er in het donker ook bij herhaling evenveel zaadjes, dan verwerp je je hypothese. Dat is geen mislukte proef. Je weet dan iets nieuws.

Zo werkte de arts Ignaz Semmelweis, in Wenen in het jaar 1847. Bij de artsen stierven veel meer kraamvrouwen aan koorts dan bij de vroedvrouwen. De artsen kwamen vaak uit de snijzaal. Zijn hypothese: iets van lijken, op de handen, veroorzaakt de koorts. Zijn verwachting: als artsen hun handen wassen met chloorkalk, dan daalt de sterfte. Dat gebeurde: van ongeveer achttien procent naar één à twee procent.

## Hoofdstuk 3 — Een eerlijke proef [Schema: twee bakjes tuinkers op één basislijn met de labels ONAFHANKELIJK / AFHANKELIJK / CONTROLE; dobbelsteen voor randomiseren; Macro-nacht: het paard met een vraagsteller die het antwoord zelf niet weet; groepjes proefpersonen met pillen]
Wanneer is een proef eerlijk? Als er tussen de groepen maar één ding verschilt. Wat je zelf verandert, is de onafhankelijke variabele: licht of donker. Wat je meet, is de afhankelijke variabele: hoeveel zaadjes er kiemen. Al het andere houd je gelijk: dezelfde zaadjes, evenveel water, dezelfde temperatuur. Dat zijn de constante variabelen.

Je zet een bakje in het donker, verder precies hetzelfde. Wat is dat bakje? Wat denk je?
[VRAAG] (a) een constante variabele · (b) de afhankelijke variabele · (c) de controlegroep

Antwoord c. Het bakje in het donker is de controlegroep: zonder de factor die je onderzoekt, verder precies gelijk. Misschien dacht je: wat gelijk blijft, is een constante variabele. Maar constante variabelen zijn factoren, zoals water en temperatuur. Een controlegroep is een hele groep om mee te vergelijken. Verdeel de zaadjes ook willekeurig over de bakjes: randomiseren.

Terug naar het paard. Hoe kon het rekenen? Antwoord b: het reageerde op lichaamstaal. De psycholoog Oskar Pfungst liet een vraagsteller een som stellen waarvan hij zelf het antwoord niet wist. Toen tikte het paard bijna nooit het goede antwoord. Bij het juiste aantal tikken bewoog de vraagsteller heel even, zonder het te merken, en het paard stopte. Misschien dacht je: de eigenaar speelde vals. Maar ook hij gaf die tekens zonder het te weten. Niemand bedroog.

Daarom werken onderzoekers blind: wie meet of telt, weet niet in welke groep iets hoort. Bij de kiemproef laat je iemand tellen die niet weet welk bakje in het licht stond. In medisch onderzoek weten ook de proefpersonen het niet. De controlegroep krijgt dan een placebo, een nepbehandeling. Weten proefpersoon en onderzoeker het allebei niet, dan heet het dubbelblind.

## Hoofdstuk 4 — Meten en meetfouten [Schema: meetlat met stippen rond de echte waarde (toevallig) en stippen die naar één kant verschoven zijn (systematisch); weegschaal; casuskaart zeventiende eeuw met pot en wilg, afgevallen bladeren; bakje met drie zaadjes naast een bakje met vijftig; twee stempels BETROUWBAAR? en VALIDE?]
Hoe goed is je meting? Er zijn twee soorten meetfouten. Een toevallige fout valt de ene keer te hoog uit, de andere keer te laag. Die middelt uit als je vaker meet. Een systematische fout zit er steeds in dezelfde richting naast. Die middelt niet uit, hoe vaak je ook meet.

Je weegschaal staat niet goed op nul. Hij geeft steeds twee gram te veel. Helpt het om vaker te wegen? Wat denk je?
[VRAAG] (a) ja: als je vaak genoeg weegt, middelt de fout uit · (b) nee: de fout zit er elke keer in dezelfde richting naast · (c) alleen als je ook meer bakjes neemt

Antwoord b. Dit is een systematische fout. Het gemiddelde blijft twee gram te hoog. Zet de weegschaal op nul. Misschien dacht je: meer metingen lossen alles op. Dat geldt alleen voor toevallige fouten.

Tegen toeval helpt wel een grotere steekproef. Met drie zaadjes per bakje kan één zaadje het hele verschil maken. Met vijftig zaadjes per bakje, en de proef een paar keer herhaald, wordt je resultaat betrouwbaarder. Betrouwbaar betekent: bij herhalen vind je ongeveer hetzelfde. Nauwkeurig is iets anders: hoe fijn je meetinstrument meet, bijvoorbeeld op een tiende gram. Ook een heel nauwkeurige weegschaal kan systematisch verkeerd staan.

## Hoofdstuk 5 — Betrouwbaar en valide [Schema: begripkaarten BETROUWBAAR en VALIDE, de drie validiteitsvragen één voor één, kiemproef als rode draad; Okselfris als examenvoorbeeld (wattenschijfjes in potjes, geen gezichten); positieve controle als extra bakje; tuinkers → sla/buiten, muis → mens; contrast: meer bakjes (betrouwbaar ↑) maar dezelfde verkeerde meting (valide =); Van Helmont als toepassing]
Bij elk onderzoek stel je twee vragen. Is het betrouwbaar? En is het valide? Op het examen krijg je vaak een zwak punt of een verbetering van een onderzoek, en moet je zeggen bij welke van de twee het hoort.

Betrouwbaarheid gaat over toeval. Je maakt een onderzoek betrouwbaarder door meer planten, proefpersonen of monsters te nemen. Door elke meting te herhalen en het gemiddelde te nemen. Door steeds op precies dezelfde manier te meten, volgens een vast werkplan: bijvoorbeeld pas tellen als het worteltje zichtbaar is, elke dag op hetzelfde tijdstip. En door naast het gemiddelde ook de spreiding te laten zien.

Doe jij je proef opnieuw en vind je hetzelfde, dan is je resultaat herhaalbaar. Doet een ander lab de proef na, met eigen zaadjes en eigen bakjes, en vindt dat ook hetzelfde, dan is het reproduceerbaar. Pas dan vertrouwen onderzoekers een resultaat echt.

Validiteit gaat over iets anders: klopt je conclusie? Daarvoor stel je drie vragen.

Eén: meet je wat je wilt weten? Wil je weten of licht de groei van tuinkers helpt, dan zegt het tellen van gekiemde zaadjes weinig. Dan meet je de lengte of de massa van de plantjes. In een examen roken mensen aan wattenschijfjes die onder oksels hadden gezeten, niet aan de oksels zelf. Zo roken ze alleen de okselgeur, en niet iemands parfum, haar of gezicht.

Twee: komt het verschil echt door jouw variabele? Stonden de bakjes in het licht ook warmer, op de vensterbank, dan weet je niet of licht of warmte het verschil maakte. Een controlegroep die alleen in licht verschilt, maakt je proef valide. Soms voeg je ook een groep toe waarvan je de uitkomst al weet, om te laten zien dat je meting werkt.

Drie: geldt het ook buiten je proef? Je onderzocht tuinkers in een klaslokaal. Of het ook voor sla geldt, of voor planten buiten, weet je nog niet. En wat bij muizen werkt, werkt niet vanzelf bij mensen.

Onthoud vooral dit verschil: vaker meten maakt een onderzoek betrouwbaarder, maar niet meer valide. Meet je het verkeerde, dan wordt je conclusie niet beter, hoe vaak je ook meet.

Kijk met die twee vragen naar een beroemde proef.

In de zeventiende eeuw zette Jan Baptist van Helmont een wilg in een pot met gewogen aarde, en gaf vijf jaar alleen water. De boom werd ruim dertig keer zo zwaar, de aarde niet. Zijn conclusie: de boom groeit van water.

Hij woog nauwkeurig. Maar met maar één boom is het resultaat weinig betrouwbaar. De afgevallen bladeren woog hij niet: een systematische fout. En aan de lucht dacht hij niet. De droge stof van hout komt vooral uit koolstofdioxide uit de lucht. Je kunt dus heel precies meten, en toch de verkeerde conclusie trekken.

## Hoofdstuk 6 — Van resultaat naar conclusie [Schema: tabel van de kiemproef die een staafdiagram wordt; lijngrafiek kiemen per dag; Macro-nacht kort: eiland met vinken, daarna Schema-histogram van snavelhoogtes; kaartjes CONCLUSIE en DISCUSSIE; onderzoeksbord vult zich met de uitkomst en de lange gele kiemplantjes]
Je hebt je metingen. Eerst een tabel, dan een grafiek. Op de x-as zet je de onafhankelijke variabele, met grootheid en eenheid. Losse groepen, zoals licht en donker: een staafdiagram. Een getal dat geleidelijk verandert, zoals de tijd in dagen: een lijngrafiek.

Kijk niet alleen naar het gemiddelde, maar ook naar de spreiding: hoe ver de metingen uit elkaar liggen. Dat zie je goed in een histogram: hoe vaak elke waarde voorkomt. Zo maten Peter en Rosemary Grant de snavels van honderden vinken op de Galapagos.

Jouw resultaten: in het licht kiemen gemiddeld eenenveertig van de vijftig zaadjes, in het donker achtendertig. Maar per bakje liep het uiteen van dertig tot vijftig. Wat concludeer je? Wat denk je?
[VRAAG] (a) licht bevordert het kiemen: het gemiddelde is hoger · (b) donker bevordert het kiemen · (c) er is geen duidelijk verschil: de spreiding is groter dan het verschil

Antwoord c. Het verschil van drie zaadjes valt weg in de spreiding van wel twintig. Misschien dacht je: een hoger gemiddelde is genoeg. Maar zo'n klein verschil kan toeval zijn. Tuinkers kiemt namelijk ook goed in het donker. Je hypothese is verworpen. En dat is een echt resultaat.

In je verslag scheid je conclusie en discussie. De conclusie beantwoordt je onderzoeksvraag, niet meer en niet minder: licht maakt voor het kiemen van tuinkers weinig uit. In de discussie noem je de beperkingen. Je onderzocht tuinkers, niet alle planten. En je noemt wat je opviel. In het donker werden de kiemplantjes lang, dun en geel. Waarom? Dat is een nieuwe onderzoeksvraag. De cyclus begint opnieuw.

## Hoofdstuk 7 — Samen of oorzaak? [Schema: experiment (onderzoeker draait aan een knop) tegenover observationeel (onderzoeker met verrekijker); twee lijnen die samen stijgen; drie pijlschema's: A → B, B → A, C → A en B; ijsjes en verdrinkingen met de zon als C]
Jouw kiemproef was een experiment: je veranderde zelf het licht. Maar soms kan dat niet. Dan doe je observationeel onderzoek: je kijkt wat samengaat. Twee dingen die samengaan, hebben een correlatie. Maar veroorzaakt het ene ook het andere? Dat heet causaliteit.

Soms is het andersom: het vermeende gevolg is de oorzaak. Dat heet omgekeerde causaliteit. En soms veroorzaakt een derde factor allebei: een verstorende variabele. In de zomer eten mensen meer ijsjes, en verdrinken er meer mensen. IJsjes zijn niet gevaarlijk. Warm weer zorgt voor allebei.

Leerlingen die ontbijten, halen gemiddeld hogere cijfers. Welke verklaring is een verstorende variabele? Wat denk je?
[VRAAG] (a) wie veel rust en regelmaat thuis heeft, ontbijt vaker én leert beter · (b) ontbijt geeft je hersenen energie, dus je leert beter · (c) wie goede cijfers haalt, heeft minder stress en meer zin in ontbijt

Antwoord a. Rust en regelmaat zijn een derde factor, die allebei kan veroorzaken. Dat goede cijfers zin in ontbijt geven, zou omgekeerde causaliteit zijn. En dat ontbijt je helpt leren, kan ook waar zijn. Maar uit deze correlatie alleen weet je niet welke verklaring klopt.

Soms mag een experiment niet. Rond het jaar 1950 bleek dat longkankerpatiënten vaker en meer rookten dan andere mensen. Mensen laten roken voor een proef, dat mag niet. Hoe onderzoekers toch aantoonden dat roken een oorzaak is, zie je in de extra film.

## Hoofdstuk 8 — Eerlijk onderzoek [Schema: casuskaart Baltimore 1951 met kweekfles met cellen; toestemmingsformulier met handtekening; kaartjes VERVANGING, VERMINDERING, VERFIJNING met een muissilhouet; twee groepjes muizen (3 tegen 20); kaartjes VERZINNEN, VERVALSEN, OVERNEMEN]
Onderzoek moet ook eerlijk zijn tegenover mensen en dieren. In het jaar 1951 ging een stukje tumor van de Amerikaanse Henrietta Lacks naar het lab, zonder dat zij het wist. Haar cellen worden nog altijd wereldwijd gebruikt. Haar familie hoorde het pas ruim twintig jaar later.

Wie nu meedoet aan medisch-wetenschappelijk onderzoek, geeft vooraf toestemming, na uitleg over wat er gebeurt en wat de risico's zijn. Dat heet informed consent. En je mag altijd stoppen.

Voor een dierproef is in Nederland een vergunning nodig. Het belang van het onderzoek moet opwegen tegen het ongerief voor het dier. Onderzoekers volgen de drie V's. Vervanging: kan het ook zonder dieren? Vermindering: gebruik zo min mogelijk dieren. Verfijning: beperk het ongerief zoveel mogelijk.

Een onderzoeker wil maar drie muizen per groep gebruiken, om dieren te sparen. Is dat een goed idee? Wat denk je?
[VRAAG] (a) ja: zo min mogelijk dieren is altijd beter · (b) nee: met zo weinig dieren is het resultaat waarschijnlijk niet betrouwbaar · (c) dat maakt niet uit: het gaat om de vraag, niet om het aantal

Antwoord b. Met drie muizen is een verschil al snel toeval. Dan zijn de dieren misschien voor niets gebruikt. Misschien dacht je: minder dieren is altijd beter. Maar vermindering betekent: zo min mogelijk, en toch genoeg. Ethiek en een goede proefopzet horen bij elkaar.

En wees eerlijk over je gegevens. Fraude is gegevens verzinnen, gegevens vervalsen, of werk van anderen overnemen. Een fout maken is iets anders. Een fout meld en verbeter je. Fraude verberg je.

## Recap [Schema: het paard; het volle onderzoeksbord van de kiemproef met de verworpen hypothese en de nieuwe vraag; stempels BETROUWBAAR en VALIDE]
Hoe weet je of iets waar is? Het paard leek te rekenen. Pas een eerlijke proef, met een vraagsteller die het antwoord zelf niet wist, liet zien wat er echt gebeurde.
Een toetsbare hypothese. Eén onafhankelijke variabele, de rest constant, en een controlegroep. Blind meten. Een grote steekproef, en letten op systematische fouten. Een conclusie die niet verder gaat dan je gegevens. Correlatie niet verwarren met oorzaak. En eerlijk blijven.
Lees je ergens dat onderzoek iets bewijst? Vraag dan: is het betrouwbaar, en is het valide? Bij je eigen onderzoek stel je jezelf dezelfde vragen.

## Eindkaart
Cyclus: vraag → hypothese → werkplan → resultaten → conclusie.
Eerlijke proef: één variabele, controlegroep, blind meten.
Toevallige fout: herhalen helpt · systematische fout: niet.
Betrouwbaar: bij herhaling hetzelfde · valide: je meet wat je wilt.
Correlatie is nog geen oorzaak.
Ethiek: toestemming, de drie V's, geen fraude.
