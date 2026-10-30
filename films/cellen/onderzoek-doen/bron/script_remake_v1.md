# Onderzoek doen in de biologie — remake 2.0 — script v1

v1 (30 okt 2026), lichte remake op prompt v13 (B16). Kamiel 30 okt 2026: de oude film (21 min, vwo 5–6) was voor een deel te diepgaand voor havo 4 / vwo 4, en te veel rond casussen gebouwd ("de casus mag niet boven de inhoud gaan"). Het moeilijke deel gaat naar een aparte extra film (*Kun je onderzoek vertrouwen?*, zie `films/extra/kun-je-onderzoek-vertrouwen/bron/script_v1.md`). Ethiek blijft in de basis (Kamiel: "ethiek mag wel bij basis").

Vaste vorm per hoofdstuk: (1) het begrip als kop en mini-vraag, (2) de historische casus kort, hooguit een derde van het hoofdstuk, (3) het begrip algemeen gemaakt op een kaart, (4) toegepast op de kiemproef, de doorlopende leerlingenproef van de film, (5) betrouwbaar? valide?

Niveau: havo 4 + vwo 4 (één niveau, geen vwo-blokken). Type G (methode en redeneren). Looks: zie Beeldplan. Doorlopend: één labjournaal-bord dat per hoofdstuk aangroeit met de kiemproef. Stem Roos (eleven_v4). Lege regel = nieuwe alinea = nieuwe take. Castpersonage: een leerling (havo 4) met de kiemproef, op het scherm, niet bij naam genoemd.

Leerdoelen (havo 4 + vwo 4)
1. de stappen van de onderzoekscyclus noemen en in volgorde zetten
2. een goede onderzoeksvraag herkennen, en hypothese en verwachting (als … dan …) onderscheiden; uitleggen wat falsifieerbaar is
3. in een proefopzet de onafhankelijke, afhankelijke en constante variabelen aanwijzen, en constante variabelen onderscheiden van een controlegroep
4. uitleggen waarom onderzoekers blind of dubbelblind werken, een placebo gebruiken en randomiseren
5. toevallige en systematische meetfouten onderscheiden, en uitleggen wat herhalen en een grotere steekproef wel en niet oplossen; nauwkeurig ≠ betrouwbaar
6. betrouwbaarheid en validiteit onderscheiden en toepassen op een onderzoek
7. bij resultaten de passende grafiek kiezen (staaf of lijn), gemiddelde en spreiding lezen, en conclusie en discussie scheiden
8. correlatie en causaliteit onderscheiden; omgekeerde causaliteit en een verstorende variabele herkennen
9. de ethische regels bij onderzoek met mensen en dieren noemen (informed consent, de drie V's) en fraude onderscheiden van een eerlijke fout

Uit de oude film naar de extra film: nulhypothese, p-waarde, simulatie, chi-kwadraattoets, Fisher en Mendel; patiënt-controle- en cohortonderzoek, Bradford Hill; inductie en deductie; peer review, Kettlewell en Majerus, replicatiecrisis, publicatiebias, p-hacking; Hwang.

## Beeldplan (30 okt 2026, op verzoek van Kamiel nagelopen tegen Part C)

Twee looks, zoals Part C voorschrijft (de look volgt het schaalniveau, niet het onderwerp):
- **Schema (± 80 %)**: alle begrippen, proefopstellingen, variabelen, meetfouten, grafieken en de kiemproef (lablibrary: bakjes met kiemplantjes, weegschaal, meetlat). Semmelweis, roken en Henrietta Lacks via de mens-en-maatschappijlibrary (plaatsicoon, groep silhouetten, kaartjes).
- **Macro-nacht (± 15 %)**: alleen waar een organisme of een populatie zelf het bewijs is. In de basis: het paard (cold open, H2) en de vinken op het eiland (H4: populatie, snavel in betekeniskleur, gestorven vinken gedimd tot 35 %). Overgang alleen via een snede naar een Schema-kaart (C6). Paard en grondvink staan al in de beeldbank (`bibliotheek/dieren/lib_dieren.js`).

Kleine afwijkingen (ter keuring):
1. **Twee kaartsoorten in de UI-laag.** Een kleine CASUS-kaart (oker rand, plaats en jaar, linksboven) bij het voorbeeld, en een grote BEGRIP-kaart (gouden annotatiehaak, het begrip met zijn betekenis) als het begrip algemeen wordt gemaakt. Zo ziet de leerling meteen wat voorbeeld is en wat stof. De begripkaart blijft het langst staan.
2. **Eén doorlopend onderzoeksbord** (B3: persistent diagram dat aangroeit): de zeven stappen van de cyclus als vakjes, die per hoofdstuk vollopen met de kiemproef. In de recap staat het complete onderzoeksplan. Getekend in Schema; alleen een kleine knipoog naar het oude labjournaal (vakjes als schriftblaadjes), geen ruitjesachtergrond.
3. **Echte personen zonder portret.** Semmelweis, Pasteur, Van Helmont, de Grants en Henrietta Lacks krijgen geen gezicht (geen castpersonage, geen nagetekend portret), alleen naam en jaar op de casuskaart en hun opstelling of object. Bij Henrietta Lacks alleen haar naam en een kweekfles met cellen.
4. **Kiemproef met een castpersonage** (B4: niet bij naam genoemd): Yasmin (rol 'leeftijdgenoot', ROLLEN.md), korte warme momenten aan de vensterbank in Schema-decor; keuze voor Kamiel. Tuinkerskiemplantjes zijn een nieuw beeldbankobject (twijfelscène).

---

## Cold open [Macro-nacht: paard voor een bord met sommen, vraagsteller ernaast, publiek eromheen (figuranten); casuskaart Berlijn 1904]
Berlijn, in het jaar 1904. Een paard tikt het antwoord op een som met zijn hoef. Een commissie van deskundigen kijkt mee. Die vindt geen bedrog. Hoe kan een paard dat? Wat denk je?
[VRAAG] (a) het paard kon echt een beetje tellen · (b) het paard las de lichaamstaal van de vraagsteller · (c) de eigenaar gaf stiekem tekens

## Titel
Onderzoek doen in de biologie. Hoe weet je of iets waar is?

## Hoofdstuk 0 — De onderzoekscyclus [Schema: cirkel met zeven stappen die één voor één oplichten; daarnaast het labjournaal-bord met de kiemproef; twee stempels BETROUWBAAR? en VALIDE?]
Biologen volgen een vaste denkroute: de onderzoekscyclus. Je ziet dat tuinkers op de vensterbank snel opkomt: een waarneming. Je vraagt je af: kiemt tuinkers beter in het licht? Je bedenkt een mogelijk antwoord, en wat je dan zou moeten meten. Je doet een proef. Uit de resultaten trek je een conclusie. In de discussie kijk je kritisch terug, en vaak volgt een nieuwe vraag.

Bij elk onderzoek stel je twee vragen. Is het betrouwbaar: vind je bij herhaling ongeveer hetzelfde? En is het valide: meet je echt wat je wilt weten?

## Hoofdstuk 1 — Van vraag naar verwachting [Schema: drie kaartjes ONDERZOEKSVRAAG, HYPOTHESE, VERWACHTING op één lijn; Semmelweis als kort zijpaneel: twee kraamklinieken als ziekenhuisicoon met sterftebalkjes; daarna weer het kiemproefbord]
Hoe maak je van een vraag iets wat je kunt testen? Een goede onderzoeksvraag gaat over één factor, en over iets wat je kunt meten. "Wat doet licht met tuinkers?" is te vaag. "Kiemen meer tuinkerszaadjes in het licht dan in het donker?" kun je onderzoeken.

Een hypothese is een mogelijk antwoord op je vraag. Bijvoorbeeld: licht zet het kiemen van tuinkers in gang. Een verwachting zegt wat je in deze proef zult meten als de hypothese klopt. Vaak met als … dan. Als licht het kiemen in gang zet, dan kiemen er in het licht meer zaadjes dan in het donker.

Welke zin is een verwachting, en geen hypothese? Wat denk je?
[VRAAG] (a) tuinkers heeft licht nodig om te kiemen · (b) als tuinkers licht nodig heeft, dan kiemen in het donker minder zaadjes · (c) licht is goed voor alle planten

Antwoord b. Die zin zegt wat je in deze proef zult meten. Zin a is een hypothese. Misschien dacht je: een hypothese is gewoon een voorspelling. Maar de hypothese is het idee. De verwachting is wat je dan zou moeten meten.

Een goede hypothese is falsifieerbaar: er is een uitkomst denkbaar die haar weerlegt. Kiemen er in het donker net zoveel zaadjes, dan verwerp je je hypothese. Dat is geen mislukte proef: je weet iets nieuws.

Zo werkte de arts Ignaz Semmelweis, in Wenen in het jaar 1847. Bij de artsen stierven veel meer kraamvrouwen aan koorts dan bij de vroedvrouwen. De artsen kwamen vaak rechtstreeks uit de snijzaal. Zijn hypothese: iets van lijken, op de handen, veroorzaakt de koorts. Zijn verwachting: als artsen hun handen wassen met chloorkalk, dan daalt de sterfte. Binnen een paar maanden daalde die van achttien procent naar ongeveer één procent.

Betrouwbaar? Redelijk: het ging om honderden bevallingen. Valide? Lastiger. Hij vergeleek vóór en ná. Veranderde er tegelijk nog iets anders, dan zag hij dat niet.

## Hoofdstuk 2 — Een eerlijke proef [Schema: twee bakjes tuinkers naast elkaar op één basislijn, labels ONAFHANKELIJK / AFHANKELIJK / CONTROLE; Pasteurs zwanenhalskolf en een gebroken kolf als lijntekening; het paard als silhouet met oogkleppen; groepjes proefpersonen met pillen; dobbelsteen voor randomiseren]
Wanneer is een proef eerlijk? Als er tussen de groepen maar één ding verschilt. Wat je zelf verandert, is de onafhankelijke variabele: bij jou licht of donker. Wat je meet, is de afhankelijke variabele: hoeveel zaadjes er kiemen. Al het andere houd je gelijk: dezelfde zaadjes, evenveel water, dezelfde temperatuur. Dat zijn de constante variabelen.

Louis Pasteur deed dat rond het jaar 1860 precies zo. Hij kookte bouillon in kolven met een gebogen hals. Lucht kon erin, stof met microben bleef in de bocht hangen. De bouillon bleef helder. Brak hij de hals af, dan werd hij troebel. Eén verschil: kan stof erbij of niet.

Haal twee dingen niet door elkaar. Constante variabelen zijn de factoren die je gelijk houdt. Een controlegroep is een hele groep die de behandeling niet krijgt, maar verder precies hetzelfde. Bij jou is het bakje in het donker de controlegroep.

Soms zit het probleem in de mensen. Terug naar het paard. Een psycholoog zette het oogkleppen op. Zag het paard de vraagsteller, dan was bijna negen op de tien antwoorden goed. Zag het hem niet, dan bijna niets.

Antwoord b. Het paard las lichaamstaal. Bij het juiste aantal tikken ontspande de vraagsteller onbewust, en het paard stopte. Misschien dacht je: de eigenaar speelde vals. Maar ook vreemden konden het paard laten rekenen. Niemand bedroog.

Daarom werken onderzoekers blind: de proefpersoon weet niet in welke groep hij zit. In medisch onderzoek krijgt de controlegroep dan een placebo, een nepbehandeling. Weet ook de onderzoeker het niet, dan heet het dubbelblind. En het toeval bepaalt wie in welke groep komt: randomiseren. Bij jouw kiemproef: laat iemand tellen die niet weet welk bakje in het licht stond.

## Hoofdstuk 3 — Meten en meetfouten [Schema: meetlat met stippen rond de echte waarde (toevallig) en stippen die allemaal naar één kant verschoven zijn (systematisch); weegschaal met veel decimalen; pot met wilg als lijntekening, afgevallen bladeren; één bakje met drie zaadjes naast een bakje met vijftig]
Hoe goed is je meting? Er zijn twee soorten meetfouten. Een toevallige fout valt de ene keer te hoog uit, de andere keer te laag. Die middelt uit als je vaker meet. Een systematische fout zit er steeds in dezelfde richting naast. Die middelt niet uit, hoe vaak je ook meet.

Je weegschaal staat niet goed op nul. Hij geeft steeds twee gram te veel. Helpt het om vaker te wegen? Wat denk je?
[VRAAG] (a) ja: als je vaak genoeg weegt, middelt de fout uit · (b) nee: de fout zit er elke keer in dezelfde richting naast · (c) alleen als je ook meer bakjes neemt

Antwoord b. Dit is een systematische fout. Het gemiddelde blijft twee gram te hoog. Zet de weegschaal op nul. Misschien dacht je: meer metingen lossen alles op. Dat geldt alleen voor toevallige fouten.

Wel helpt herhalen tegen toeval. Kiemen in het licht twee van de drie zaadjes, en in het donker één, dan zegt dat weinig. Met vijftig zaadjes per bakje, en de proef een paar keer herhaald, wordt je resultaat betrouwbaarder. Let op: nauwkeurig is iets anders. Nauwkeurig betekent: één meting is precies. Betrouwbaar betekent: bij herhalen vind je ongeveer hetzelfde.

In de zeventiende eeuw zette Jan Baptist van Helmont een wilg in een pot met gewogen aarde, en gaf vijf jaar alleen water. De boom werd ruim dertig keer zo zwaar, de aarde niet. Zijn conclusie: een plant groeit van water. Hij woog nauwkeurig. Maar hij had één boom, en woog de afgevallen bladeren niet: een systematische fout. En de lucht vergat hij. Droog hout is vooral gemaakt van koolstofdioxide uit de lucht.

Je kunt dus heel precies meten, en toch het verkeerde meten. Toevallige fouten maken een onderzoek minder betrouwbaar. Een systematische fout, of een verkeerde opzet, maakt het minder valide.

## Hoofdstuk 4 — Van resultaat naar conclusie [Schema: tabel van de kiemproef die een staafdiagram wordt; een lijngrafiek (kiemen per dag) ernaast; frequentieverdeling van snavelhoogtes met gemiddelde en spreiding; twee kaartjes CONCLUSIE en DISCUSSIE]
Je hebt je metingen. Eerst een tabel, dan een grafiek. Welke grafiek, hangt af van je onafhankelijke variabele. Losse groepen, zoals licht en donker: een staafdiagram. Een getal dat geleidelijk verandert, zoals de tijd in dagen: een lijngrafiek.

Kijk niet alleen naar het gemiddelde, maar ook naar de spreiding: hoe ver de metingen uit elkaar liggen. Een klein verschil in gemiddelde, met een grote spreiding, zegt weinig.

[Macro-nacht vanaf hier tot de vraag: kaal vulkaaneiland, populatie vinken, snavel in betekeniskleur, gestorven vinken gedimd; daarna snede naar de Schema-frequentieverdeling]
Peter en Rosemary Grant maten jarenlang de snavels van bijna elke vink op een eilandje van de Galapagos. In het jaar 1977 viel er bijna geen regen. Er bleven vooral harde zaden over, en de meeste vinken stierven. Dit is een frequentieverdeling: hoe vaak elke snavelhoogte voorkomt. Bij de overlevers schuift de verdeling naar rechts.

Waarom hebben de overlevers gemiddeld grotere snavels? Wat denk je?
[VRAAG] (a) de snavels groeiden door het kraken van harde zaden · (b) vinken met kleine snavels stierven vaker · (c) de vinken met grote snavels kregen meer jongen

Antwoord b. Misschien dacht je: de snavels groeiden mee met het voedsel. Maar de Grants hadden elke vogel al eerder gemeten. Een volwassen vink krijgt geen grotere snavel. De verdeling schuift omdat vinken met kleine snavels vaker stierven. En kijk naar de spreiding: ook vinken met kleine snavels overleefden soms.

In je verslag scheid je conclusie en discussie. De conclusie beantwoordt je onderzoeksvraag, niet meer en niet minder. In de discussie noem je de beperkingen. Jij onderzocht tuinkers, niet alle planten. Generaliseren mag maar zo ver als je gegevens reiken.

## Hoofdstuk 5 — Samen of oorzaak? [Schema: experiment (onderzoeker draait aan een knop) tegenover observationeel (onderzoeker met verrekijker); twee lijnen die samen stijgen; drie pijlschema's: A → B, B → A, C → A en B; ijsjes en verdrinkingen met de zon als C; sigaret en longen als kort zijpaneel]
Bij een experiment verander je zelf één ding. Soms kan dat niet: de Grants konden geen droogte maken. Dan doe je observationeel onderzoek: je kijkt wat samengaat. Twee dingen die samengaan, hebben een correlatie. Maar is het ene ook de oorzaak van het andere? Dat heet causaliteit.

Soms is het andersom: het vermeende gevolg is de oorzaak. Dat heet omgekeerde causaliteit. En soms veroorzaakt een derde factor allebei: een verstorende variabele. In de zomer worden meer ijsjes verkocht, en verdrinken er meer mensen. Ijsjes zijn niet gevaarlijk. Warm weer zorgt voor allebei.

Leerlingen die ontbijten, halen gemiddeld hogere cijfers. Welke verklaring is een verstorende variabele? Wat denk je?
[VRAAG] (a) ontbijt geeft je hersenen energie, dus je leert beter · (b) wie veel rust en regelmaat thuis heeft, ontbijt vaker én leert beter · (c) wie goede cijfers haalt, heeft minder stress en meer zin in ontbijt

Antwoord b: een derde factor die allebei kan veroorzaken. Zin c is omgekeerde causaliteit. Zin a is misschien waar. Maar uit deze correlatie alleen weet je niet welke van de drie klopt.

Hoe weet je het dan toch? Rond het jaar 1950 bleek dat bijna alle longkankerpatiënten rookten. Een experiment mag hier niet. Maar overal vonden onderzoekers hetzelfde verband: hoe meer sigaretten, hoe groter de kans. Wie stopte, liep minder risico. En in tabaksrook zitten stoffen die kanker veroorzaken. Al die stukjes samen laten zien: roken is een oorzaak.

## Hoofdstuk 6 — Eerlijk onderzoek [Schema: ziekenhuisicoon; toestemmingsformulier met handtekening; drie kaartjes VERVANGING, VERMINDERING, VERFIJNING met een muissilhouet; twee groepjes muizen (3 tegen 20); drie fraudekaartjes VERZINNEN, VERVALSEN, OVERNEMEN]
Onderzoek moet ook eerlijk zijn tegenover wie meedoet. In het jaar 1951 werd Henrietta Lacks in de Verenigde Staten behandeld voor kanker. Zonder dat zij het wist, ging een stukje van haar tumor naar het lab. Haar cellen delen zich eindeloos, en worden nog altijd over de hele wereld gebruikt. Haar familie hoorde het pas twintig jaar later.

Nu geeft iedereen die meedoet aan medisch onderzoek vooraf toestemming, na uitleg over wat er gebeurt en wat de risico's zijn. Dat heet informed consent. En je mag altijd stoppen.

Voor een dierproef is in Nederland een vergunning nodig. Het belang van het onderzoek moet opwegen tegen het ongerief voor het dier. Onderzoekers volgen de drie V's. Vervanging: kan het ook zonder dieren? Vermindering: gebruik zo min mogelijk dieren. Verfijning: beperk het ongerief zoveel mogelijk.

Een onderzoeker wil maar drie muizen per groep gebruiken, om dieren te sparen. Wat vind jij? Wat denk je?
[VRAAG] (a) goed: zo min mogelijk dieren is altijd beter · (b) niet goed: met zo weinig dieren is het resultaat niet betrouwbaar · (c) maakt niet uit: het gaat om de vraag, niet om het aantal

Antwoord b. Met drie muizen kan elk verschil toeval zijn, en zijn de dieren voor niets gebruikt. Vermindering betekent: zo min mogelijk, maar genoeg. Ethiek en een goede proefopzet horen bij elkaar.

En wees eerlijk over je gegevens. Fraude is gegevens verzinnen, gegevens vervalsen, of werk van anderen overnemen. Een fout maken is iets anders. Bij fraude misleid je bewust.

## Recap [Schema: het paard; het volle labjournaal-bord van de kiemproef met alle stappen ingevuld; stempels BETROUWBAAR en VALIDE]
Hoe weet je of iets waar is? Het paard leek te rekenen. Pas een eerlijke proef, met oogkleppen, liet zien wat er echt gebeurde.
Een toetsbare hypothese. Eén onafhankelijke variabele, de rest constant, en een controlegroep. Blind werken. Genoeg herhalingen, en letten op systematische fouten. Een conclusie die niet verder gaat dan je gegevens. Correlatie niet verwarren met oorzaak. En eerlijk blijven.
Lees je ergens dat onderzoek iets bewijst? Vraag dan: is het betrouwbaar, en is het valide? Bij je eigen onderzoek stel je jezelf dezelfde vragen.

## Eindkaart
Cyclus: waarneming → vraag → hypothese → verwachting → proef → resultaten → conclusie → discussie.
Eerlijke proef: één onafhankelijke variabele, constante variabelen, controlegroep, blind, randomiseren.
Toevallige fout: herhalen helpt · systematische fout: herhalen helpt niet.
Betrouwbaar: bij herhaling hetzelfde · valide: je meet wat je wilt weten.
Correlatie ≠ oorzaak: denk aan omgekeerde causaliteit en een verstorende variabele.
Ethiek: informed consent, de drie V's, geen fraude.

---

## Checkvragen (pagina, niet ingesproken)
1. **Je eigen proef.** Je onderzoekt of zoutwater de groei van waterkers remt. Noem de onafhankelijke, de afhankelijke en twee constante variabelen. Wat is je controlegroep? *(antwoord: zoutgehalte · lengte of massa na x dagen · zelfde zaadjes, zelfde licht, zelfde hoeveelheid vocht, zelfde temperatuur · bakje met gewoon water)*
2. **Semmelweis opnieuw.** Hij vergeleek vóór en ná. Hoe had hij een gelijktijdige controlegroep kunnen maken, en waarom was dat ethisch lastig? *(antwoord: de helft van de artsen laat wassen, de andere helft niet; maar als je vermoedt dat wassen levens redt, laat je een groep bewust risico lopen)*
3. **Van Helmont opnieuw.** Ontwerp zijn proef opnieuw. Wat meet je allemaal, hoeveel bomen neem je, en welke controle? *(antwoord: meerdere bomen, het water dat erin gaat, de gevallen bladeren, droge massa, een pot zonder boom)*
4. **Welke grafiek?** Je meet elke dag hoeveel zaadjes gekiemd zijn, in het licht en in het donker. Welke grafiek teken je, en wat zet je op de assen? *(antwoord: lijngrafiek; x-as dagen, y-as aantal gekiemde zaadjes, twee lijnen)*

## Misvattingen (docentdeel)
- "Een hypothese is een voorspelling." → de hypothese is het mogelijke antwoord; de verwachting is wat je in deze proef zou moeten meten (H1, vraag)
- "Een verworpen hypothese is een mislukte proef." (H1)
- "Constante variabelen en controlegroep zijn hetzelfde." (H2)
- "Bij bedrog gaat een onderzoek mis, anders niet." → onbewuste invloed, Hans (cold open, H2)
- "Vaker meten lost elke fout op." (H3, vraag)
- "Nauwkeurig = betrouwbaar." en "betrouwbaar = valide" (H3)
- "De snavels groeiden mee met het voedsel." (H4, vraag)
- "Een verband bewijst een oorzaak." (H5, vraag)
- "Zo min mogelijk proefdieren is altijd beter." (H6, vraag)
- "Een fout is hetzelfde als fraude." (H6)

## Dekking leerdoel → hoofdstuk → vraag
| Leerdoel | Hoofdstuk | Vraag |
|---|---|---|
| 1 cyclus | 0, recap | eindkaart, checkvraag 1 |
| 2 vraag/hypothese/verwachting | 1 | vraag H1 |
| 3 variabelen, controlegroep | 2 | checkvraag 1 |
| 4 blind, placebo, randomiseren | 2 | cold-openvraag |
| 5 meetfouten, herhalen | 3 | vraag H3, checkvraag 3 |
| 6 betrouwbaar/valide | 1–3, recap | checkvraag 2 |
| 7 grafiek, spreiding, conclusie/discussie | 4 | vraag H4, checkvraag 4 |
| 8 correlatie/causaliteit | 5 | vraag H5 |
| 9 ethiek | 6 | vraag H6 |

## Getallen en bronnen (nog in bron/bronnen.md uitwerken)
| Bewering | Waarde | Status |
|---|---|---|
| Clever Hans, Pfungst | 1904 commissie van deskundigen, ± 89 % vs ± 6 % goed | oud docentdeel; nog 2 bronnen openen |
| Semmelweis | april 1847 ± 18 %, juli ± 1 % | oud docentdeel; nog 2 bronnen openen |
| Pasteur zwanenhalskolf | rond 1860 (1859–1862) | ≈ |
| Van Helmont | stek 5 pond → ± 169 pond na 5 jaar ("ruim dertig keer") | oud docentdeel; nog 2 bronnen openen |
| Grants 1977 | droogte, meeste vinken stierven; overlevers grotere snavels | Open University (OpenLearn) geopend: ± 1400 → enkele honderden; nog 1 bron niveau A |
| Doll & Hill, roken | rond 1950 | ✓ algemeen bekend, nog bronnen noteren |
| Henrietta Lacks | 1951; familie hoorde het in de jaren zeventig ("twintig jaar later") | Biography.com geopend: jaren zeventig; nog 1 bron niveau A |
| Dierproeven NL | vergunning CCD, drie V's | nog 2 bronnen openen |

## Lengte (schatting)
± 1673 woorden spraak ≈ 11.9 min, plus titel- en hoofdstukkaarten en zes vraagmomenten ≈ 13 min. (Oud: 21 min, waarvan ± 9 min naar de extra film is gegaan.)
