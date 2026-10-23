# LET OP (22 okt 2026): f6.json is nu leidend; daarin zijn de reviewpunten (review_reeks.md) direct verwerkt. Dit script niet meer draaien, anders gaan die wijzigingen verloren.
import json, re
S = []
def sc(i, h, look, tekst, bew, laag='basis', opties=None, juist=None):
    d = {"id": i, "hoofdstuk": h, "laag": laag, "look": look, "tekst": tekst, "beweging": bew}
    if opties: d["opties"] = opties; d["juist"] = juist
    S.append(d)
O = 'Opening'
sc('e6s01', O, 'Macro', "Veehouder Gerrit heeft een muilezel. Sterk, rustig en slim. Zijn vader is een paard, zijn moeder een ezel. Maar deze muilezel krijgt nooit jongen. Is een muilezel dan een soort?",
   "Gerrit klopt de muilezel op de hals; in de wei achter hen een paard en een ezel.")
sc('e6s02', O, 'Schema', "", "Titelkaart: titel en puzzel, rechts paard, muilezel en ezel op schaal.")
H1 = 'H1 Wat is een soort?'
sc('e6s03', H1, 'Macro', "Een soort herken je niet aan het uiterlijk. Een chihuahua en een wolf lijken nauwelijks op elkaar, maar ze kunnen samen jongen krijgen. En die jongen kunnen zelf ook weer jongen krijgen.",
   "Wolf en chihuahua naast elkaar op schaal; tussen hen verschijnt een pup, daaronder weer pups.")
sc('e6s04', H1, 'Schema', "Daarom gebruiken biologen deze afspraak. Een soort is een groep individuen die samen vruchtbare nakomelingen kunnen krijgen. Hond en wolf zijn dus één soort. Een hondenras is een groep binnen die soort, net als een ondersoort in de natuur.",
   "De definitie bouwt zich op als kaart; het woord 'vruchtbare' krijgt een gouden onderstreping.")
sc('e6q05', H1, 'Schema', "Wat denk je? Een paard en een ezel krijgen samen een muilezel. Die is gezond, maar onvruchtbaar. Zijn paard en ezel één soort?",
   "Vraagkaart met aftellijn.", opties="A Ja, want ze krijgen samen een jong · B Nee, want hun jong kan zelf geen jongen krijgen · C Ja, want ze lijken veel op elkaar", juist="B")
sc('e6s06', H1, 'Macro', "Paard en ezel krijgen samen wel een jong, maar dat jong is onvruchtbaar. Daarmee houdt het op: er stromen geen genen van paarden naar ezels. Paard en ezel zijn twee soorten. Een muilezel is een hybride: een kruising tussen twee soorten.",
   "Paard en ezel links en rechts; de muilezel in het midden; een pijl van de muilezel naar een volgende generatie eindigt in een rood kruis.")
sc('e6s07', H1, 'Schema', "Waarom is hij onvruchtbaar? Een paard heeft vierenzestig chromosomen, een ezel tweeënzestig. Een muilezel krijgt van elk de helft: drieënzestig. Bij de meiose moeten chromosomen in paren gaan liggen. Die van het paard en die van de ezel passen niet goed op elkaar. Er ontstaan dan bijna geen werkende geslachtscellen.",
   "Licht- en donkerpaarse chromosomen proberen paren te vormen; een paar past, twee blijven los, één heeft geen partner (goud omrand).")
sc('e6s08', H1, 'Schema', "Dus, is een muilezel een soort? Nee. Een muilezel is geen groep die zich voortplant. Elke muilezel is opnieuw gemaakt door een paard en een ezel.",
   "Drie generatiebalken: paard × ezel geeft telkens een nieuwe muilezel; tussen muilezels onderling staat een rood kruis.")
H2 = 'H2 Eén pot wordt twee'
sc('e6s09', H2, 'Schema', "Hoe ontstaat een nieuwe soort? Begin met één populatie, met één genenpool. Zolang de dieren met elkaar paren, mengen hun allelen steeds opnieuw. Dat heet genenstroom.",
   "Een kaart met één populatie (stippen) en één pot eronder; knikkers wervelen door de pot.")
sc('e6s10', H2, 'Schema', "Stel: er komt een barrière. Een rivier verlegt zijn loop, een zee stijgt, een bergrug of een woestijn ontstaat. De dieren aan de ene kant komen de andere kant niet meer tegen. Dat heet geografische isolatie.",
   "Een rivier snijdt de kaart in tweeën; de stippen links en rechts schuiven uit elkaar.")
sc('e6sXa', H2, 'Schema', "Wat een barrière is, hangt af van het dier. Een smalle rivier houdt een muis tegen, maar geen vogel. Voor een slak kan een drukke weg al genoeg zijn.",
   "Over de rivier vliegt een vogel heen; een muis blijft aan de oever staan; een slak stopt bij een weg.")
sc('e6q11', H2, 'Schema', "Wat denk je? De rivier blijft duizenden generaties liggen. Wat gebeurt er met de twee genenpools?",
   "Vraagkaart met aftellijn.", opties="A Ze blijven gelijk, want ze komen uit dezelfde pot · B Ze passen zich samen aan, want het is één soort · C Ze gaan steeds meer van elkaar verschillen", juist="C")
sc('e6s12', H2, 'Schema', "Nu de genenstroom stopt, is één pot twee potten geworden. In elke pot ontstaan andere mutaties. Elke kant heeft eigen selectiedruk: misschien is het links kouder of zijn er andere roofdieren. En toeval werkt in elke pot anders.",
   "De pot splitst in twee; links groeit het teal-aandeel, rechts het oker-aandeel; in elke pot verschijnt een paarse knikker (mutatie).")
sc('e6s13', H2, 'Schema', "Generatie na generatie lopen de allelfrequenties verder uit elkaar. Dat heet divergente evolutie. Eerst merk je het nauwelijks. Na veel generaties zijn de verschillen groot.",
   "De twee allelbalken schuiven verder uit elkaar; een generatieteller loopt op.")
H3 = 'H3 Wanneer is het echt een tweede soort?'
sc('e6sXb', H2, 'Macro', "Honden en wolven leven al minstens vijftienduizend jaar apart. Toch zijn ze nog één soort. Waar ze elkaar tegenkomen, krijgen ze soms samen jongen, dus er is nog genenstroom. En vijftienduizend jaar is voor een wolf maar een paar duizend generaties.",
   "Een wolf aan de bosrand en een herder op het erf; een stippellijn met een pup ertussen.")
sc('e6s14', H3, 'Schema', "Stel dat de rivier weer verdwijnt. De twee groepen komen elkaar opnieuw tegen. Zijn het nu twee soorten? Dat hangt ervan af of ze nog samen vruchtbare jongen kunnen krijgen. Is dat niet meer zo, dan is er reproductieve isolatie.",
   "De rivier droogt op; de stippen van beide kanten mengen zich op de kaart, maar de kleuren blijven gescheiden.")
sc('e6s15', H3, 'Schema', "Soms gebeurt er al niets vóór de bevruchting. Ze zijn op een ander moment vruchtbaar. Ze leven op een andere plek in hetzelfde gebied. Ze herkennen elkaars balts of lied niet. Of hun geslachtsorganen passen niet op elkaar.",
   "Vier tegels lichten één voor één op: klok (tijd), boom en vijver (plek), muzieknoot (gedrag), slot en sleutel (bouw).")
sc('e6s16', H3, 'Schema', "Soms gaat het mis ná de bevruchting. Er ontstaat wel een jong, maar het sterft jong of is onvruchtbaar. Precies zoals de muilezel. Ook dan stroomt er geen gen meer van de ene naar de andere groep.",
   "Een vijfde tegel met de muilezel; een gebroken pijl van de muilezel naar een volgende generatie.")
sc('e6q17', H3, 'Schema', "Wat denk je? Twee kikkersoorten leven in dezelfde vijver. De ene paart in april, de andere in juni. Wat voor isolatie is dit?",
   "Vraagkaart met aftellijn.", opties="A Vóór de bevruchting: ander moment vruchtbaar · B Geografisch: ze leven op een andere plek · C Ná de bevruchting: hun jongen zijn onvruchtbaar", juist="A")
sc('e6s18', H3, 'Schema', "De kikkers delen de vijver, dus de scheiding zit niet in de plek. Hij zit in de tijd: de vrouwtjes van de ene soort zijn al klaar als de mannetjes van de andere soort gaan roepen. Er komt dus niet eens een bevruchting.",
   "Een kalenderbalk april–juni; twee kikkersilhouetten op hun eigen maand; geen overlap.")
sc('e6s19', H3, 'Schema', "Zo verloopt het meestal. Eerst een barrière, dan verschillen die zich opstapelen, en ten slotte reproductieve isolatie. Dan is één soort er twee geworden. Daar zijn vaak duizenden generaties voor nodig.",
   "Een tijdlijn met drie stappen: barrière, divergentie, reproductieve isolatie; onder elke stap de potten.")
V = 'VWO Zonder barrière'
sc('e6s20', V, 'Schema', "Wat je net zag, heet allopatrische soortvorming: soortvorming op gescheiden plaatsen. Maar soms ontstaan nieuwe soorten op dezelfde plek, zonder barrière in het landschap. Dat heet sympatrische soortvorming.",
   "Twee kaarten naast elkaar: links met rivier (allopatrisch), rechts één meer zonder grens (sympatrisch).", laag='vwo')
sc('e6s21', V, 'Macro', "Het Victoriameer in Afrika. Rond vijftienduizend jaar geleden liep het weer vol nadat het bijna droog had gestaan. Sindsdien zijn er ongeveer vijfhonderd soorten cichliden ontstaan.",
   "Uitzicht over het meer bij nacht; in het water bewegen vissen in veel kleuren.", laag='vwo')
sc('e6s22', V, 'Macro', "Kijk naar twee van die soorten. Bij Pundamilia pundamilia zijn de mannetjes blauw. Bij Pundamilia nyererei zijn ze rood. In ondiep water is blauw licht goed te zien, dieper in het meer vooral rood licht.",
   "Doorsnede van de oever: ondiep blauw water met een blauw mannetje, dieper roder water met een rood mannetje.", laag='vwo')
sc('e6q23', V, 'Schema', "Wat denk je? Er is geen muur in het water. Hoe kunnen de blauwe en de rode vissen toch apart blijven?",
   "Vraagkaart met aftellijn.", opties="A Er moet een barrière zijn die we niet zien · B Vrouwtjes kiezen een mannetje met de kleur die zij het best zien · C Het zijn geen echte soorten, maar kleurvarianten", juist="B")
sc('e6s24', V, 'Macro', "De ogen van de vrouwtjes zijn afgestemd op het licht waar ze leven. Diep zien ze rood het best, ondiep blauw. Ze kiezen dus vooral een mannetje van hun eigen kleur. Zo stopt partnerkeuze de genenstroom, zonder rivier of berg. In troebel water, waar de kleuren niet te zien zijn, ontstaat geen scheiding.",
   "Een vrouwtje (geelbruin) zwemt langs een blauw en een rood mannetje en kiest het rode; boven de vissen schuift een lichtbalk van blauw naar rood met de diepte.", laag='vwo')
sc('e6s25', V, 'Schema', "Allopatrisch of sympatrisch: in beide gevallen stopt de genenstroom, en lopen twee genenpools uit elkaar. Het verschil is alleen wat de genenstroom stopt.",
   "Twee potten met een gouden streep ertussen; links staat 'rivier', rechts 'partnerkeuze'.", laag='vwo')
SAM = 'Samenvatting'
sc('e6s26', SAM, 'Schema', "Een soort is een groep die samen vruchtbare nakomelingen kan krijgen. Paard en ezel krijgen wel een jong, maar de muilezel is onvruchtbaar. Daarom is de muilezel geen soort, maar een hybride. Een nieuwe soort ontstaat als de genenstroom stopt. Twee genenpools lopen dan uit elkaar, tot de groepen ook samen geen vruchtbare jongen meer krijgen.",
   "Drie tegels: definitie soort, muilezel als hybride, één pot wordt twee.")
sc('e6s27', SAM, 'Schema', "", "Eindkaart: drie kernzinnen met een groene annotatiehaak.")

tw = lambda s: len(re.findall(r"[\wÀ-ÿ'’,.\-]+", s)) if s else 0
wb = sum(tw(x['tekst']) for x in S if x['laag'] == 'basis'); wv = sum(tw(x['tekst']) for x in S if x['laag'] == 'vwo')
qb = sum(1 for x in S if x['id'][2] == 'q' and x['laag'] == 'basis'); qv = sum(1 for x in S if x['id'][2] == 'q' and x['laag'] == 'vwo')
basis = wb / 140 + (qb * 10 + 3 * 4 + 8) / 60; vwo = basis + wv / 140 + (qv * 10 + 4) / 60
KZ = [
 "Puzzel A gekozen (seriebrief). B (hond/wolf één soort, paard/ezel niet) zit in H1 (e6s03–e6s06), C (nieuwe soorten in één meer) in het vwo-blok.",
 "Ouders: in het Nederlands is een muilezel strikt paardenhengst × ezelin, een muildier ezelhengst × paardenmerrie (webwoordenboek.nl; Engels: hinny resp. mule). De opening zegt daarom 'zijn vader is een paard, zijn moeder een ezel'. In de spreektaal heet ook het muildier vaak 'muilezel'; de puzzel geldt voor beide (63 chromosomen). Tekening: muilezel met lange oren tussen paard en ezel in.",
 "Spelling in de ondertitels 'muilezel', stem-invoer 'muil-eezel' (goedgekeurd).",
 "Chromosomen: paard 64, ezel 62, muilezel 63 (horses.extension.org). 'Vrijwel altijd onvruchtbaar': enkele vruchtbare merrie-muilezels zijn beschreven (Marokko, China, Colorado 2007). De film zegt 'bijna geen werkende geslachtscellen' en 'krijgt nooit jongen' over Gerrits dier; de haak zegt niet dat het onmogelijk is.",
 "Hond en wolf als één soort volgt het biologische soortbegrip (vruchtbare nakomelingen), zoals het CE (HAVO 2018-1 v29). Sommige systematici houden Canis familiaris apart; dat laat ik weg.",
 "De geografische isolatie is bewust een schematische kaart zonder echte casus: de seriebrief noemt voor film 6 alleen paard/ezel en cichliden. Een echte allopatrische casus (bv. de bruinvis uit VWO 2022-2 of de Kaibab- en Abert-eekhoorn aan weerszijden van de Grand Canyon) kan als voorbeeld in de vertelling; ik heb gekozen voor geen extra casus om de film kort te houden.",
 "Kikkervoorbeeld (april/juni) komt uit de archieffilm; het is een leerboekvoorbeeld zonder specifieke soort. Bij navragen: Amerikaanse Lithobates-soorten (bv. L. sylvaticus vroeg, L. pipiens later) zijn het klassieke geval; niet met getallen gecontroleerd.",
 "Victoriameer: 'droog of bijna droog' rond 17.000–15.000 jaar geleden, ±500 soorten in de laatste 15.000 jaar (Eawag/Meier e.a. 2017, Nat. Commun.). Meier toont ook dat oudere hybridisatie (±150.000 jaar geleden) de genetische variatie leverde; dat laat ik weg uit de vertelling.",
 "Pundamilia: Seehausen e.a. 2008 (Nature 455) noemt het 'speciation through sensory drive' langs een dieptegradiënt; strikt genomen is dat geen zuiver sympatrische soortvorming (eerder parapatrisch). Schoolboeken (Nectar) gebruiken het als voorbeeld van sympatrische soortvorming; de film zegt 'zonder barrière in het landschap'. Twijfel genoteerd.",
 "Troebel water (eutrofiëring) liet in Seehausen 2008 één tussenvorm zien: ik noem het in één zin omdat het de rol van kleur bewijst; het is een uitbreiding die eventueel weg kan.",
 "Polyploïdie (soortvorming door chromosoomverdubbeling bij planten) en de ringsoort Ensatina uit de archieffilm zijn weggelaten: niet in de seriebrief, niet in het CE.",
 "Niet zeggen: 'een muilezel kan nooit jongen krijgen' (zeldzame uitzonderingen); 'soorten herken je aan het uiterlijk'; 'een barrière maakt direct een nieuwe soort'; 'de dieren passen zich aan de nieuwe kant aan'; 'cichliden ontstonden in een paar honderd jaar' (overdreven op internet, gaat over enkele soorten); 'het Victoriameer was helemaal leeg en alle vissen waren weg' (onzeker); 'hond en wolf zijn twee soorten omdat ze anders lijken'.",
 "Vwo-blok heeft een eigen vraag (e6q23) en begint met inhoud, niet met 'Voor vwo'. Basislijn (zonder e6s20–e6s25) is compleet.",
 "Vragen uit nagelopen: de eerste zin na elke vraag herhaalt de inhoud zonder naar de vraag te verwijzen.",
 "Extra scènes buiten de opzet: e6s11 (wat een barrière is hangt af van het dier: muis, vogel, slak) en e6s15 (waarom hond en wolf na 15.000 jaar nog één soort zijn: nog genenstroom, weinig generaties). Beide examenwaardig (HAVO 2018-1 v29, HAVO 2025-2 v35) en nodig om boven 6 min basis te komen.",
 "Zwaluw, muis en slak zijn klein en schematisch (ze staan in één beeld ver van elkaar); de slak is groter getekend dan op schaal t.o.v. de muis; label 'niet op schaal' nog toevoegen of de schaal gelijk trekken.",
 "Chromosoomschema e6s07 toont 7 van de 63 chromosomen en zegt 'paart niet' voor paren met ongelijke lengte: vereenvoudigd (in werkelijkheid verschillen paard- en ezelchromosomen door herschikkingen, niet alleen door lengte).",
 "Personages: Veehouder Gerrit (muilezel op het erf). Dierenarts Mila niet nodig."]
F = {"film": 6, "titel": "Hoe één soort er twee wordt", "slug": "6-hoe-een-soort-er-twee-wordt",
 "puzzel": "Is een muilezel een soort?", "haak": "Een muilezel krijgt nooit jongen (Veehouder Gerrit en zijn muilezel).",
 "duur": {"basis_min": round(basis, 1), "met_vwo_min": round(vwo, 1), "woorden": wb + wv},
 "hoofdstukken": [
  {"nr": 1, "titel": "Wat is een soort?", "minivraag": "Zijn paard en ezel één soort?", "type": "F", "look": "Macro"},
  {"nr": 2, "titel": "Eén pot wordt twee", "minivraag": "Wat gebeurt er als de genenstroom stopt?", "type": "F", "look": "Schema"},
  {"nr": 3, "titel": "Wanneer is het echt een tweede soort?", "minivraag": "Wat houdt twee soorten uit elkaar?", "type": "F", "look": "Schema"},
  {"nr": 4, "titel": "Zonder barrière (vwo)", "minivraag": "Kunnen er nieuwe soorten ontstaan in één meer?", "type": "F", "look": "Macro"}],
 "scenes": S,
 "checkvragen": [
  {"niveau": "basis", "vraag": "Een tijger en een leeuw kunnen in een dierentuin samen een liger krijgen. Ligermannetjes zijn onvruchtbaar. Zijn leeuw en tijger één soort? Leg uit.", "antwoord": "Nee: volgens het soortbegrip moeten ze samen vruchtbare nakomelingen krijgen; de nakomelingen zijn (grotendeels) onvruchtbaar, dus geen genenstroom: twee soorten. (Ligerwijfjes zijn soms vruchtbaar; in de natuur paren ze niet.)"},
  {"niveau": "basis", "vraag": "Waarom zijn een chihuahua en een wolf wel één soort?", "antwoord": "Ze kunnen samen nakomelingen krijgen die zelf ook weer vruchtbaar zijn; uiterlijk telt niet."},
  {"niveau": "basis", "vraag": "Waarom is een muilezel meestal onvruchtbaar?", "antwoord": "Hij heeft 63 chromosomen, 32 van het paard en 31 van de ezel; bij de meiose kunnen die niet goed paren, waardoor er (bijna) geen werkende geslachtscellen ontstaan."},
  {"niveau": "basis", "vraag": "Zet in de goede volgorde: reproductieve isolatie · barrière · verschillen stapelen zich op (mutatie, selectie, toeval) · genenstroom stopt.", "antwoord": "barrière → genenstroom stopt → verschillen stapelen zich op → reproductieve isolatie."},
  {"niveau": "basis", "vraag": "Twee vogelpopulaties zingen een ander lied en paren daardoor niet meer met elkaar. Is dit isolatie vóór of na de bevruchting?", "antwoord": "Vóór de bevruchting (gedrag)."},
  {"niveau": "vwo", "vraag": "Wat is het verschil tussen allopatrische en sympatrische soortvorming? Wat hebben ze gemeen?", "antwoord": "Allopatrisch: gescheiden door een geografische barrière; sympatrisch: in hetzelfde gebied, de genenstroom stopt door iets anders (bv. partnerkeuze). Gemeen: de genenstroom stopt en de genenpools lopen uiteen."},
  {"niveau": "vwo", "vraag": "In troebel water ontstaan bij Pundamilia geen aparte rode en blauwe soorten. Verklaar dit.", "antwoord": "De vrouwtjes kunnen de kleur van de mannetjes niet goed zien en kiezen dus niet op kleur; dan blijft er genenstroom tussen rood en blauw, zodat de genenpools niet uiteenlopen."}],
 "begrippen": [
  {"begrip": "soort", "uitleg": "Groep individuen die samen vruchtbare nakomelingen kunnen krijgen.", "niveau": "basis"},
  {"begrip": "hybride", "uitleg": "Nakomeling van ouders van twee verschillende soorten, zoals de muilezel; vaak onvruchtbaar.", "niveau": "basis"},
  {"begrip": "ras", "uitleg": "Groep binnen een soort met eigen erfelijke kenmerken, door de mens gefokt.", "niveau": "basis"},
  {"begrip": "ondersoort", "uitleg": "Groep binnen een soort, in de natuur, met eigen erfelijke kenmerken en vaak een eigen gebied; kan nog vruchtbare nakomelingen krijgen met de rest van de soort.", "niveau": "basis"},
  {"begrip": "genenstroom", "uitleg": "Uitwisseling van allelen tussen (delen van) populaties doordat individuen met elkaar paren.", "niveau": "basis"},
  {"begrip": "geografische isolatie", "uitleg": "Populaties zijn van elkaar gescheiden door een barrière in het landschap (rivier, zee, gebergte), waardoor de genenstroom stopt.", "niveau": "basis"},
  {"begrip": "divergente evolutie", "uitleg": "Twee populaties uit één voorouderpopulatie gaan steeds meer van elkaar verschillen.", "niveau": "basis"},
  {"begrip": "reproductieve isolatie", "uitleg": "Twee groepen kunnen samen geen vruchtbare nakomelingen (meer) krijgen. Vóór de bevruchting: andere tijd, plek, gedrag of bouw. Ná de bevruchting: de nakomeling sterft of is onvruchtbaar.", "niveau": "basis"},
  {"begrip": "allopatrische soortvorming", "uitleg": "Soortvorming in gescheiden gebieden, na geografische isolatie.", "niveau": "vwo"},
  {"begrip": "sympatrische soortvorming", "uitleg": "Soortvorming in hetzelfde gebied, zonder barrière in het landschap, bijvoorbeeld door partnerkeuze.", "niveau": "vwo"}],
 "getallen": [
  {"waarde": "paard 64, ezel 62, muilezel 63 chromosomen; muilezels vrijwel altijd onvruchtbaar, enkele vruchtbare merries beschreven", "bron": "horses.extension.org (Extension Foundation, 'Mules'); Pierce, Genetics Essentials, §6.3"},
  {"waarde": "muilezel = paardenhengst × ezelin; muildier = ezelhengst × paardenmerrie", "bron": "webwoordenboek.nl 'Is een ezel een paard?' (Nederlandse naamgeving)"},
  {"waarde": "schofthoogte paard ±160 cm, muilezel ±130 cm, ezel ±110 cm (tekenmaten, niet gezegd)", "bron": "rasstandaarden KWPN / Nederlandse standaardezel; benadering"},
  {"waarde": "Victoriameer viel droog/bijna droog en liep ±15.000 jaar geleden weer vol; sindsdien ±500 nieuwe cichlidensoorten", "bron": "Eawag-persbericht bij Meier e.a. 2017, Nature Communications 8:14363; Johnson e.a. 1996, Science"},
  {"waarde": "Pundamilia pundamilia blauw (ondiep), P. nyererei rood (dieper); vrouwtjes met roodgevoelige ogen kiezen rode mannetjes; in troebel water één tussenvorm", "bron": "Seehausen e.a. 2008, Nature 455:620–626 (via Practical Fishkeeping-samenvatting)"}],
 "uitspraak": [
  {"woord": "muilezel", "invoer": "muil-eezel", "ipa": "/ˈœy̯l.eː.zəl/", "bron": "UITSPRAAK.md (goedgekeurd)"},
  {"woord": "hybride", "invoer": "hybride", "ipa": "/ɦiˈbri.də/", "bron": "Van Dale (hy-BRI-de); wachtlijst"},
  {"woord": "chromosomen", "invoer": "chromosomen", "ipa": "/ˌxroː.moːˈzoː.mə(n)/", "bron": "eerdere films, zoals geschreven"},
  {"woord": "drieënzestig / vierenzestig / tweeënzestig", "invoer": "zoals geschreven", "ipa": "", "bron": "gewone telwoorden"},
  {"woord": "divergente", "invoer": "divergente", "ipa": "/ˌdi.vɛrˈɣɛn.tə/", "bron": "archief A3: klemtoon op GEN; wachtlijst"},
  {"woord": "allopatrische", "invoer": "allopatrische", "ipa": "/ˌɑ.loːˈpaː.tri.sə/", "bron": "seriebrief risicowoord; Wiktionary niet bereikbaar, klemtoon naar analogie van 'patrisch'; wachtlijst"},
  {"woord": "sympatrische", "invoer": "sympatrische", "ipa": "/ˌsɪm.pɑˈtri.sə/ of /sɪmˈpaː.tri.sə/", "bron": "twijfel: geen woordenboekbron; wachtlijst"},
  {"woord": "cichliden", "invoer": "cichliden", "ipa": "/sɪxˈli.də(n)/", "bron": "seriebrief risicowoord; geen Nederlandse IPA gevonden (Engels /ˈsɪklɪd/); twijfel, wachtlijst"},
  {"woord": "Pundamilia pundamilia / nyererei", "invoer": "Pundamielia pundamielia / njèrerei", "ipa": "/pun.daˈmi.li.a/ · /ɲe.reˈre.i/", "bron": "Swahili-wortel (Nyerere); twijfel, wachtlijst"},
  {"woord": "Victoriameer", "invoer": "Victoriameer", "ipa": "/vɪkˈtoː.ri.jaː.meːr/", "bron": "gewone spelling"},
  {"woord": "meiose", "invoer": "meiose", "ipa": "", "bron": "UITSPRAAK.md (zoals geschreven)"}],
 "nieuw_in_bibliotheek": [
  "viervoeter() + paardSkelet() — gedeelde engine (zie film 4) met hoef (schuine voorwand, platte zool), voorknie/kogel en sprong op echte hoogte",
  "paard(), ezel(), muilezel() — op één schaal (160 / 110 / 130 cm), liggende pupil; ezel: lange oren, kwaststaart, rechtopstaande manen, lichte snuit en buik, aalstreep en schouderkruis; muilezel: tussenvorm",
  "cichlide(vorm: blauw|rood|vrouw) — Pundamilia pundamilia, P. nyererei en een vrouwtje, met rugvin met stralen, eivlekken op de aarsvin, kieuwdeksel en gouden iris",
  "kaartBarriere(soort: rivier|berg) — landvlak met barrière en populatiestippen (twee potten eronder via pot())",
  "chromosoom() — staafje met centromeer voor de meiose bij de muilezel", "muis(), zwaluw(), slak(), kikker(kleur) — kleine dieren in zijaanzicht met echt oog (via _oogK, oog op schermschaal)", "teken_evo6.js bevat een identieke kopie van viervoeter() en de hondachtigen uit teken_evo4.js (hoofdredacteur voegt samen)"],
 "keuzes_en_twijfels": KZ}
cnt = 0
for x in S:
    cnt += 1; x['id'] = 'e6' + ('q' if x['id'][2] == 'q' else 's') + '%02d' % cnt
json.dump(F, open('/home/claude/evo2/films/f6.json', 'w'), ensure_ascii=False, indent=1)
print(wb, wv, round(basis, 2), round(vwo, 2))
