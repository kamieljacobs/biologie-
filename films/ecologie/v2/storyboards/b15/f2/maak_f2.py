"""Bouwt films/f2.json (Ecologie v2 · film 2 Waar past een soort?) en telt woorden/duur."""
import json, re, os
S = []
def sc(id, hfst, look, tekst, beweging, laag='basis', **kw):
    d = dict(id=id, hoofdstuk=hfst, laag=laag, look=look, tekst=tekst, beweging=beweging); d.update(kw); S.append(d)
def q(id, hfst, vraag, opties, juist, laag='basis', **kw):
    sc(id, hfst, 'Schema', 'Wat denk je? ' + vraag, 'Vraagkaart met aftellijn.', laag, opties=' · '.join(f'{"ABCD"[i]} {o}' for i, o in enumerate(opties)), juist=juist, **kw)

O, H1, H2, H3, H4, R = 'Opening', 'H1 Wat is er anders?', 'H2 Binnen de grenzen', 'H3 De zwakste schakel', 'H4 Eén boom, twee mezen', 'Samenvatting'
sc('x01', O, 'Macro', 'Twee beken, een paar kilometer van elkaar. Links tilt je een steen op in snel, helder water: een steenvlieglarve.',
   'Split screen. Links: Noor staat tot haar knieën in een heldere, ondiepe bosbeek en houdt een steen omhoog; eronder een steenvlieglarve met twee staartdraden. Rechts: dezelfde handeling in troebel, traag water.')
sc('x02', O, 'Macro', 'Rechts zit onder de steen alleen slib, met rode muggenlarven. Een steenvlieglarve vind je daar nooit. Waarom leeft hij in de ene beek wel, en in de andere niet?',
   'Rechts zoomt het beeld in op het slib: kronkelende rode larven; links blijft de steenvlieglarve in beeld.')
sc('x03', O, 'Schema', '', 'Titelkaart: titel en puzzel; rechts de twee beken als kleine split screen.')
sc('x04', H1, 'Macro', 'Elke beek is een ecosysteem: het water, de bodem, het licht, en alles wat er leeft. Alle populaties samen heten de levensgemeenschap. De plek waar één soort leeft, is haar habitat. Voor de steenvlieglarve is dat de onderkant van stenen in stromend water.',
   'Beek A in doorsnede: water, stenen, bladeren, larven; drie labels verschijnen één voor één (ecosysteem, levensgemeenschap, habitat).')
sc('x04b', H1, 'Macro', 'De twee beken hebben dus elk een andere levensgemeenschap. Links leven steenvlieglarven, eendagsvlieglarven en forellen. Rechts vooral rode muggenlarven en slijkwormen. Je vergelijkt nu wat er in elke beek anders is.',
   'Split screen: links een rij dieren van de snelle beek, rechts van de trage; een gouden lijn trekt de grens tussen de helften.')
sc('x05', H1, 'Schema', 'Wat is er anders aan de rechterbeek? Eerst de niet-levende factoren. Het water is warmer. Het stroomt trager. Er zit minder zuurstof in. Dat zijn abiotische factoren, net als licht, pH en de bodem.',
   'Split screen in Schema: links en rechts dezelfde rij meters (temperatuur, stroming, zuurstof); rechts schuiven de waarden.')
sc('x05b', H1, 'Schema', 'Die drie hangen samen. In warm water lost minder zuurstof op dan in koud water. In snel water komt er bij elke stroomversnelling nieuwe zuurstof uit de lucht bij. Traag, warm water is dus vaak zuurstofarm. En afvalwater maakt het erger: bacteriën die het afbreken, gebruiken ook zuurstof.',
   'Twee glazen water naast elkaar (koud en warm) met zuurstofbolletjes in teal: in het koude glas veel, in het warme weinig; daarna een stroomversnelling waarin bolletjes het water in gaan.')
sc('x06', H1, 'Schema', 'Dan de factoren die met andere organismen te maken hebben: voedsel, rovers, concurrenten, parasieten. Dat zijn biotische factoren. Ook de mens is een biotische factor: rechts loost hij afvalwater uit het dorp. Dat verandert abiotische factoren, zoals het zuurstofgehalte.',
   'Onder de meters verschijnt een tweede rij pictogrammen (voedsel, rover, concurrent, parasiet, mens); rechts een pijp met afvalwater.')
sc('x06b', H1, 'Macro', 'Biotisch is ook wie jou eet. In de linkerbeek jagen forellen op larven. Een steenvlieglarve kruipt dus onder stenen weg. Rovers maken een beek niet onleefbaar, maar ze bepalen wel waar en hoe een larve leeft.',
   'Beek A van opzij: een forel zwemt langs; de steenvlieglarve kruipt verder onder de steen.')
q('xq07', H1, 'In beide beken drijven dode bladeren. Wat voor factor is dat bladafval voor een larve die het eet?', ['Biotisch: het is voedsel, en het komt van een organisme', 'Abiotisch: het blad leeft niet meer'], 'A')
sc('x08', H1, 'Macro', 'Een dood blad leeft niet meer. Toch telt het als biotische factor: het komt van een boom, en voor de larve is het voedsel. Steenvlieglarven knagen aan zulke bladeren. Abiotisch zijn dingen als temperatuur, licht, zuurstof en stroming.',
   'Een steenvlieglarve knaagt aan een eikenblad onder de steen; het blad wordt kleiner.')
sc('x09', H2, 'Schema', 'Kijk naar één factor: zuurstof. Elke soort overleeft alleen tussen twee grenzen. Onder de minimumtolerantiegrens is er te weinig. Bij veel factoren is er ook een maximumtolerantiegrens: bij temperatuur is het daarboven te warm. Daartussen ligt een gebied waar de soort het best groeit en zich voortplant: het optimum. Samen heet dat het tolerantiegebied. In een grafiek is dat de optimumkromme.',
   'Een optimumkromme tekent zich: x-as zuurstof (mg per liter), y-as groei; minimumtolerantiegrens, optimum en tolerantiegebied worden aangegeven; de maximumgrens ligt rechts buiten de getekende as.')
sc('x10', H2, 'Schema', 'Leg de twee beken erop. In de linkerbeek zit ongeveer tien milligram zuurstof per liter. Dat valt in het optimum van de steenvlieglarve. In de rechterbeek zit maar drie milligram. Dat ligt onder zijn minimumgrens.',
   'Twee verticale lijnen op de kromme: A (blauw) bij 10 mg/l in de top, B (koraal) bij 3 mg/l buiten de kromme.')
sc('x10b', H2, 'Micro', 'Waarom heeft juist deze larve zoveel zuurstof nodig? Hij ademt met kieuwbosjes onder zijn borststuk. Die werken alleen goed als er steeds vers, zuurstofrijk water langs stroomt. In stilstaand, zuurstofarm water krijgt hij te weinig binnen.',
   'Zoomcirkel op de onderkant van de larve: kieuwbosjes tussen de poten; water met teal zuurstofbolletjes stroomt erlangs.')
sc('x11', H2, 'Schema', 'De rode muggenlarve heeft een veel bredere kromme. In zijn bloed zit hemoglobine, net als bij jou. Daarmee haalt hij ook in zuurstofarm water nog genoeg zuurstof binnen. Hij leeft in beide beken.',
   'Een tweede, brede kromme schuift eroverheen; beide beeklijnen vallen erbinnen; inzet: rode muggenlarve.')
sc('x11b', H2, 'Schema', 'Zo heeft elke soort voor elke factor een eigen kromme: voor temperatuur, voor stroming, voor pH. De steenvlieglarve verdraagt geen warm water. De rode muggenlarve wel. Een soort kan alleen ergens leven als alle factoren tegelijk binnen haar grenzen liggen.',
   'Drie kleine krommen naast elkaar (zuurstof, temperatuur, stroming) voor de steenvlieg; de waarden van beek B vallen bij alle drie buiten de kromme.')
sc('x12', H2, 'Macro', 'Een soort met een smalle tolerantie vertelt dus iets over het water. Zie je steenvlieglarven, dan is het water koel, schoon en zuurstofrijk. Zo\'n soort heet een indicatorsoort. Waterschappen tellen daarom beestjes in sloten en beken. Een rode muggenlarve zegt weinig: die leeft bijna overal.',
   'Noor sorteert op de oever de vangst in een witte bak: steenvlieg-, eendagsvlieg- en rode muggenlarven; de steenvlieglarve krijgt een gouden rand.')
sc('x13', H2, 'Schema', 'Onderzoekers zetten zulke grenzen in een tabel. Hier staan drie larven, met hun grenzen voor zuurstof en temperatuur. Je vindt een derde beek: zes milligram zuurstof per liter, en negentien graden.',
   'Tabel in examenstijl: steenvlieglarve 7–14 mg/l, 4–18 °C; eendagsvlieglarve 5–14 mg/l, 4–22 °C; rode muggenlarve 1–14 mg/l, 4–30 °C. Onder de tabel: beek C, 6 mg/l, 19 °C. Label "voorbeeldwaarden".')
q('xq14', H2, 'Welke larven kunnen in beek C leven: zes milligram zuurstof per liter en negentien graden?', ['Alle drie: zes milligram is genoeg', 'Alleen de rode muggenlarve', 'De eendagsvlieglarve en de rode muggenlarve'], 'C')
sc('x15', H2, 'Schema', 'Loop de tabel per soort langs. Voor de steenvlieglarve ligt zes milligram onder zijn minimum van zeven. Negentien graden ligt ook boven zijn maximum. Eén factor buiten de grens is al genoeg om hem buiten te sluiten. De eendagsvlieglarve en de rode muggenlarve zitten met beide waarden binnen hun grenzen.',
   'Per rij kleuren de cellen: bij de steenvlieg worden beide cellen koraal; bij de andere twee groen.')
sc('x16', H3, 'Schema', 'De factor die het verst buiten het optimum ligt, beperkt een soort het meest. Dat is de beperkende factor. Voor de steenvlieglarve in de rechterbeek is dat zuurstof. Meer schaduw of meer voedsel helpt hem daar niet.',
   'Een ketting van vier schakels (temperatuur, stroming, voedsel, zuurstof); de schakel zuurstof is dun en koraal.')
sc('x17', H3, 'Macro', 'Bij planten werkt het net zo. Twee stukjes oever langs dezelfde beek: allebei zon, allebei genoeg water. Toch groeit links weinig, en rechts veel.',
   'Split screen van twee oeverstroken; links lage, ijle planten; rechts hoge, dichte planten; zon en water gelijk.')
q('xq18', H3, 'Wat helpt de planten op de linkeroever het meest?', ['Extra water', 'Extra van het mineraal dat er het minst is', 'Extra licht'], 'B')
sc('x19', H3, 'Schema', 'Water en licht zijn er al genoeg. Op de linkeroever zit weinig stikstof in de bodem. Die is daar de beperkende factor. De plant groeit zo hard als het mineraal dat het minst aanwezig is toelaat. Dat heet de wet van het minimum. Pas als je stikstof toevoegt, groeit de plant harder. Dan wordt misschien een andere factor beperkend.',
   'Een ton met duigen van verschillende hoogte (licht, water, kalium, fosfaat, stikstof); het water loopt over bij de laagste duig "stikstof"; die groeit, nu loopt het over bij fosfaat.')
sc('x19b', H3, 'Schema', 'Ook licht kan de beperkende factor zijn. Dieper in het water komt minder licht. Wieren op de bodem van een diepe plas groeien dan langzaam, ook als er mineralen genoeg zijn. Bij een factor die al genoeg is, helpt extra niets.',
   'Doorsnede van een plas: licht (goud) neemt af met de diepte; wieren bovenin dicht, onderin ijl.')
sc('x20', H4, 'Macro', 'Nu een ander soort vraag. In één eik zoeken een koolmees en een pimpelmees naar rupsen. Ze leven in hetzelfde bos, in dezelfde boom: hetzelfde habitat.',
   'Een eik in het voorjaar; een pimpelmees hangt ondersteboven aan een dunne buitentwijg, een koolmees zit op een dikke tak dichter bij de stam.')
q('xq21', H4, 'Twee soorten eten in dezelfde boom. Wat gebeurt er op den duur?', ['Ze delen het voedsel gewoon eerlijk', 'Ze kunnen nooit samen in één bos leven', 'Eén soort verdwijnt, tenzij ze een deel van het werk anders doen'], 'C')
sc('x22', H4, 'Schema', 'Een bioloog testte wat er gebeurt als twee soorten precies hetzelfde voedsel eten. Hij gebruikte eencelligen: twee soorten pantoffeldiertjes. Elk apart groeit goed. Samen in één buis met hetzelfde voedsel verdwijnt één soort. Dat heet het concurrentie-uitsluitingsprincipe. Twee soorten met precies dezelfde niche kunnen niet blijvend samenleven. Met een andere soort, die op een andere plek in de buis eet, blijven ze allebei.',
   'Drie buisjes: A alleen (lijn stijgt), B alleen (lijn stijgt), A + B samen (A stijgt, B zakt naar nul); vierde buisje: A boven, C onderin, beide blijven.',
   twijfel='Het pantoffeldiertje (Gause) is een nieuwe, sterk vereenvoudigde Micro-tekening.', waarom='Een nieuwe tekening in de bibliotheek keurt Kamiel; zonder referentieplaat getekend als ovaal met kern.')
sc('x23', H4, 'Schema', 'De niche van een soort is haar hele manier van leven: wat ze eet, waar en wanneer ze zoekt, wie haar eet. De pimpelmees weegt ongeveer elf gram. Hij hangt aan de dunste twijgen en neemt kleinere rupsen en meer spinnen. De koolmees is groter en zwaarder. Hij neemt grotere rupsen, en zoekt in de winter ook op de grond. Zelfde habitat, andere niche.',
   'Split screen in de eik: links pimpelmees op dunne twijgen met kleine rups en spin; rechts koolmees bij dikker hout en op de grond met een grote rups en een beukennootje.')
sc('x24', H4, 'Macro', 'Toch overlappen hun niches een beetje. Allebei broeden ze in een boomholte of nestkast. Dan is er concurrentie tussen soorten: interspecifieke concurrentie. De koolmees wint vaak, omdat hij groter is. Door een opening van achtentwintig millimeter past alleen de pimpelmees.',
   'Twee nestkasten aan een boom; een koolmees past niet door de kleine opening, de pimpelmees glipt naar binnen.',
   twijfel='"De koolmees wint vaak" rust op één algemene bron (Wikipedia: hoofdconcurrent om nestplaatsen); geen Nederlandse telling gevonden.', waarom='Een feit zonder harde bron laat ik niet stil staan; Kamiel kan de zin houden of schrappen.')
q('xq24b', H4, 'Wanneer is de concurrentie tussen twee soorten het grootst?', ['Als hun niches veel overlappen', 'Als ze in verschillende bossen leven', 'Als de ene soort veel groter is dan de andere'], 'A')
sc('x24c', H4, 'Schema', 'Hoe meer twee niches overlappen, hoe feller de concurrentie. Koolmees en pimpelmees overlappen een beetje, bij de nestholtes en in het voorjaar bij de rupsen. Daarom concurreren ze, maar verdwijnt er geen van beide.',
   'Twee cirkels (niche pimpelmees, niche koolmees) schuiven deels over elkaar; het overlapgebied kleurt koraal met de labels "nestholte" en "rupsen".')
sc('x25', H4, 'Macro', 'Het felst is concurrentie binnen één soort: intraspecifieke concurrentie. Twee koolmezen gebruiken precies hetzelfde: dezelfde rupsen, dezelfde nestkast. Hun niches overlappen helemaal.',
   'Twee koolmezen tegenover elkaar bij één nestkast, vleugels half open.')
sc('x26', H4, 'Macro', 'De bouw van elke mees past bij zijn niche. Een lichte pimpelmees kan aan een dunne twijg hangen. Een steenvlieglarve is plat en houdt zich vast in de stroming. Zulke erfelijke kenmerken heten adaptaties. Ze zijn ontstaan door natuurlijke selectie. Een dier past zich niet aan omdat het dat wil.',
   'Close-up van de pimpelmees ondersteboven aan een twijg; inzet: de platte steenvlieglarve tegen een steen met de stroming eroverheen.')
# vwo
sc('x27', H4, 'Schema', 'Binnen zijn grenzen kan een dier wel wennen. Breng je een beekvis langzaam over naar warmer water, dan past zijn lichaam zich in een paar weken aan. Zijn kromme schuift een stukje op. Zet je hem er in één keer in, dan gaat hij dood. Dit wennen tijdens het leven heet acclimatisatie. Het is niet erfelijk.',
   'Een optimumkromme van een vis schuift langzaam een stukje naar rechts (warmer); een pijl "langzaam" tegenover een koraal kruis "in één keer".', laag='vwo')
sc('x27b', H4, 'Schema', 'Daarom bouwt men naast een sluis soms een vismigratierivier. Zoet en zout water mengen daar geleidelijk. Een vis die erdoor zwemt, krijgt de tijd om te acclimatiseren. Gaat hij in één keer van zoet naar zout, dan krijgt hij een schok.',
   'Een geleidelijke kleurovergang van zoet (licht) naar zout (donker); een zeeforel zwemt erdoor.', laag='vwo')
sc('x28', H4, 'Schema', 'Op welk signaal reageert een plant of insect als de winter nadert? De temperatuur is geen goed signaal: die schommelt van dag tot dag. De daglengte verandert elk jaar precies hetzelfde. Veel soorten reageren op de daglengte. Dat heet fotoperiodiciteit. Zo leggen tijgermuggen in de herfst eitjes die de winter overleven.',
   'Twee lijnen over één jaar: daglengte (gladde golf) en temperatuur (grillige lijn); bij korte dagen een gouden markering "signaal".', laag='vwo')
q('xq29', H4, 'Een plant bloeit elk jaar rond dezelfde datum, ook na een warme winter. Op welke factor reageert hij waarschijnlijk?', ['De temperatuur', 'De daglengte'], 'B', laag='vwo')
sc('x30', H4, 'Schema', 'Een warme winter verschuift de temperatuur, maar niet de daglengte. Bloeit een plant toch op dezelfde datum, dan gebruikt hij de daglengte als signaal. Terug naar de twee beken.',
   'De grillige temperatuurlijn van een warme winter ligt hoger; de daglengtegolf blijft gelijk; de bloeidatum valt op dezelfde plek.', laag='vwo')
# samenvatting
sc('x31', R, 'Schema', 'Een soort kan alleen leven waar elke factor binnen haar tolerantiegebied ligt. In de rechterbeek is zuurstof de beperkende factor voor de steenvlieglarve. Daarom vind je hem daar niet. De rode muggenlarve verdraagt veel meer, en leeft in allebei.',
   'Split screen van de twee beken komt terug met de meters; bij B kleurt de zuurstofmeter koraal, de steenvlieg is weg, de muggenlarven blijven.')
sc('x32', R, 'Macro', 'Twee soorten mezen leven in hetzelfde bos zonder dat er een verdwijnt, omdat hun niches verschillen. En een plant met genoeg licht en water groeit zo hard als het mineraal dat het minst aanwezig is.',
   'De eik met beide mezen aan het werk; in de hoek de ton met de laagste duig.')
sc('x33', R, 'Macro', 'Daarom zegt een schepnet vol beestjes iets over het water. Je hoeft het niet te meten: de soorten hebben het al gedaan.',
   'Noor houdt het schepnet boven een witte bak met steenvlieg- en eendagsvlieglarven; ze glimlacht.')
sc('x34', R, 'Schema', '', 'Eindkaart met drie kernzinnen en een groene annotatiehaak.')

# nummering: doorlopend e2s01.. / e2q..
for i, s in enumerate(S, 1): s['id'] = f"e2{'q' if s['id'].startswith('xq') else 's'}{i:02d}"

hoofdstukken = [
 dict(nr=1, titel='Wat is er anders?', minivraag='Welke factoren verschillen tussen de twee beken?', type='F', look='Schema'),
 dict(nr=2, titel='Binnen de grenzen', minivraag='Hoeveel zuurstof heeft een steenvlieglarve nodig?', type='F', look='Schema'),
 dict(nr=3, titel='De zwakste schakel', minivraag='Wat helpt een plant met genoeg licht en water?', type='F', look='Schema'),
 dict(nr=4, titel='Eén boom, twee mezen', minivraag='Hoe kunnen twee soorten mezen in één bos leven?', type='F', look='Macro')]

checkvragen = [
 dict(niveau='basis', vraag='Noem twee abiotische en twee biotische factoren die bepalen of een steenvlieglarve in een beek kan leven.', antwoord='Abiotisch: zuurstofgehalte, temperatuur, stroming (ook pH, bodem). Biotisch: voedsel (bladafval), rovers (vissen), concurrenten, parasieten, afvalwater van mensen.'),
 dict(niveau='basis', vraag='In een beek is het zuurstofgehalte 8 mg/l en de temperatuur 20 °C. Kan de steenvlieglarve uit de tabel daar leven? Gebruik het begrip beperkende factor.', antwoord='Nee: 8 mg/l ligt binnen 7–14, maar 20 °C ligt boven de maximumgrens van 18 °C. De temperatuur is hier de beperkende factor.'),
 dict(niveau='basis', vraag='Leg uit waarom de steenvlieglarve een indicatorsoort is en de rode muggenlarve niet.', antwoord='De steenvlieglarve heeft een smalle tolerantie (veel zuurstof, koel water); waar hij leeft, weet je dat het water schoon is. De rode muggenlarve heeft een brede tolerantie en leeft zowel in schoon als in vervuild water, dus zijn aanwezigheid zegt weinig.'),
 dict(niveau='basis', vraag='Een boer geeft een grasland extra water, maar het gras groeit niet harder. Geef een verklaring.', antwoord='Water was niet de beperkende factor; een ander factor (bijvoorbeeld een mineraal zoals stikstof) schiet het meest tekort en bepaalt de groei (wet van het minimum).'),
 dict(niveau='basis', vraag='Leg met de begrippen habitat en niche uit hoe koolmees en pimpelmees samen in één bos kunnen leven.', antwoord='Ze hebben hetzelfde habitat (het bos, dezelfde bomen), maar een andere niche: de pimpelmees zoekt aan dunne buitentwijgen naar kleinere prooi, de koolmees neemt grotere rupsen en zoekt ook op de grond. Doordat de niches niet helemaal overlappen, verdringt de een de ander niet (concurrentie-uitsluitingsprincipe).'),
 dict(niveau='vwo', vraag='Wat is het verschil tussen acclimatisatie en adaptatie? Geef bij elk een voorbeeld.', antwoord='Acclimatisatie: niet-erfelijke aanpassing van een individu tijdens zijn leven (vis die in weken went aan warmer water). Adaptatie: erfelijk kenmerk dat door natuurlijke selectie algemeen is geworden (platte vorm van de steenvlieglarve, licht gewicht van de pimpelmees).'),
 dict(niveau='vwo', vraag='Waarom is daglengte voor veel organismen een betrouwbaarder signaal voor de seizoenen dan temperatuur?', antwoord='De daglengte verandert elk jaar precies hetzelfde; de temperatuur schommelt van dag tot dag en van jaar tot jaar (CE vwo 2022-I, tijgermuggen).')]

begrippen = [(b, u, n) for b, u, n in [
 ('ecosysteem', 'Alle organismen in een gebied samen met hun abiotische omgeving en de relaties daartussen.', 'basis'),
 ('levensgemeenschap', 'Alle populaties van verschillende soorten die samen in een gebied leven.', 'basis'),
 ('habitat', 'Leefgebied van een soort: de plek met de abiotische en biotische omstandigheden waarin de soort voorkomt.', 'basis'),
 ('abiotische factor', 'Niet-levende factor uit de omgeving, zoals temperatuur, licht, zuurstof, stroming, pH of bodem.', 'basis'),
 ('biotische factor', 'Invloed van andere organismen, zoals voedsel, rovers, concurrenten, parasieten en de mens.', 'basis'),
 ('tolerantie', 'Vermogen om variatie in een milieufactor te verdragen; het tolerantiegebied ligt tussen minimum- en maximumtolerantiegrens.', 'basis'),
 ('optimum', 'De waarde van een factor waarbij een soort het best groeit en zich voortplant.', 'basis'),
 ('optimumkromme', 'Grafiek van groei of overleving tegen één factor, met minimumgrens, optimum en maximumgrens.', 'basis'),
 ('minimum- en maximumtolerantiegrens', 'Laagste en hoogste waarde van een factor waarbij een soort nog kan overleven.', 'basis'),
 ('beperkende factor', 'De factor die het verst van zijn optimum ligt en daardoor groei of voorkomen beperkt; verbeteren van andere factoren helpt dan niet.', 'basis'),
 ('wet van het minimum', 'De groei wordt bepaald door de voedingsstof (of factor) die het meest tekortschiet.', 'basis'),
 ('indicatorsoort', 'Soort met een smalle tolerantie, waarvan aan- of afwezigheid iets zegt over het milieu, zoals de waterkwaliteit.', 'basis'),
 ('niche', 'Rol en plaats van een soort in een ecosysteem: wat ze eet, waar en wanneer ze actief is, door wie ze gegeten wordt en welke omstandigheden ze nodig heeft.', 'basis'),
 ('concurrentie', 'Wedijver om dezelfde schaarse hulpbron; beide partijen hebben er nadeel van.', 'basis'),
 ('intraspecifieke concurrentie', 'Concurrentie tussen individuen van dezelfde soort; het felst, omdat de niches helemaal overlappen.', 'basis'),
 ('interspecifieke concurrentie', 'Concurrentie tussen soorten waarvan de niches overlappen.', 'basis'),
 ('concurrentie-uitsluitingsprincipe', 'Twee soorten met precies dezelfde niche kunnen niet blijvend samen in één gebied leven; één verdwijnt.', 'basis'),
 ('adaptatie', 'Erfelijk kenmerk dat door natuurlijke selectie past bij het habitat en de niche van een soort.', 'basis'),
 ('acclimatisatie', 'Niet-erfelijke aanpassing van een individu tijdens zijn leven aan een geleidelijk veranderde omstandigheid.', 'vwo'),
 ('fotoperiodiciteit', 'Processen zoals bloei, trek of voortplanting worden gestuurd door de daglengte.', 'vwo')]]
begrippen = [dict(begrip=b, uitleg=u, niveau=n) for b, u, n in begrippen]

getallen = [
 dict(waarde='steenvlieglarven: alle soorten gevoelig voor vervuiling; nimfen in goed zuurstofrijk water; kieuwen; 1–4 jaar als larve', bron='Wikipedia Plecoptera; Waterschap Limburg, "Waterdieren in Limburgse wateren" (bijna alleen in zeer schoon en koud water)'),
 dict(waarde='steenvliegen en platte eendagsvliegen in tolerantieklasse 1 (meest gevoelig), eendagsvliegen klasse 3, op een schaal tot 7', bron='BISEL-werkblad (IVN)'),
 dict(waarde='eendagsvlieglarven gevoelig voor vervuiling, goede indicatoren ("kanaries in de kolenmijn"); larve een jaar of langer in het water', bron='Vroege Vogels (BNNVARA), "Het jaar van de eendagsvlieg"'),
 dict(waarde='Chironomus-larven: hemoglobine stijgt bij zuurstoftekort; verdragen lage zuurstof, gisting pas onder ± 5 % verzadiging', bron='Grazioli et al. 2016, J. Limnol. 75(2); Waterschap Limburg: muggenlarven ook in vervuild water'),
 dict(waarde='tabelwaarden zuurstof/temperatuur (steenvlieg 7–14 mg/l, 4–18 °C; eendagsvlieg 5–14 mg/l, 4–22 °C; rode muggenlarve 1–14 mg/l, 4–30 °C): VOORBEELDWAARDEN, in beeld zo gelabeld', bron='voorbeeldwaarden uit de oude film Plek genoeg? (bron/info.md, pauzevraag H10); richting klopt met de bronnen hierboven'),
 dict(waarde='beek A ± 10 mg/l zuurstof, beek B ± 3 mg/l: voorbeeldwaarden (koud zuurstofrijk water ± 10–11 mg/l bij verzadiging)', bron='voorbeeldwaarden; verzadiging bij 10 °C ± 11 mg/l is standaard-limnologie (niet apart geopend)'),
 dict(waarde='wet van het minimum: Sprengel 1840, gepopulariseerd door Liebig; groei bepaald door de schaarste hulpbron', bron='Wikipedia (kiwix-mirror) Liebig\'s law of the minimum'),
 dict(waarde='Gause 1931–1935: P. caudatum verdwijnt naast P. aurelia; P. aurelia en P. bursaria leven samen (andere voedselplek)', bron='Batrachos, "Gause\'s competitive exclusion principle"'),
 dict(waarde='pimpelmees 10,5–12 cm, ± 11 g; hangt aan de buitenste twijgen; koolmees 12,5–14 cm, beukennootjes op de grond in de winter', bron='Wikipedia Eurasian blue tit; Wikipedia Great tit'),
 dict(waarde='koolmezen voeren grotere rupsen (uilen, Noctuidae 42 % tegenover 20 %), pimpelmezen meer bladrollers (39 % tegenover 16 %) en spinnen (8 % tegenover 3 %)', bron='García-Navas, Ferrer & Sanz 2013, Écoscience 20(1): 9–18 (via core.ac.uk)'),
 dict(waarde='koolmees en pimpelmees concurreren om nestholtes en voedsel; invlieggat 28 mm voor pimpelmees, 32 mm voor koolmees', bron='Wikipedia Eurasian blue tit; JATU productfiche nestkasten'),
 dict(waarde='daglengte betrouwbaarder seizoenssignaal dan temperatuur; tijgermug', bron='CE vwo 2022-I vraag 16–17 (examenatlas vwo.json, onderwerp biotische & abiotische factoren)'),
 dict(waarde='acclimatisatie: vissen aan een langzaam stijgend zoutgehalte; plotselinge overgang geeft een schok', bron='CE vwo 2021-I vraag 15 (examenatlas)')]

uitspraak = [
 dict(woord='steenvlieglarve', invoer='steenvlieglarve', ipa='ˈsteːmvlixˌlɑrvə', bron='eigen transcriptie (samenstelling, klemtoon op steen)'),
 dict(woord='eendagsvlieglarve', invoer='eendagsvlieglarve', ipa='ˈeːndɑxsvlixˌlɑrvə', bron='eigen transcriptie'),
 dict(woord='abiotische', invoer='abiotische', ipa='ˌaːbiˈjoːtisə', bron='Kamiels voorkeur: gewoon "abiotische", niet "aa-biotische" (UITSPRAAK.md)'),
 dict(woord='optimumkromme', invoer='optimumkromme', ipa='ˈɔptimʏmˌkrɔmə', bron='eigen transcriptie (klemtoon op op)'),
 dict(woord='niche', invoer='niesje', ipa='ˈniʃə', bron='Frans leenwoord; Nederlandse uitspraak /ˈniʃə/ (eigen transcriptie, wiktionary niet bereikbaar); op de wachtlijst'),
 dict(woord='habitat', invoer='habitat', ipa='ˈhaːbitɑt', bron='eigen transcriptie; op de wachtlijst (klemtoon ha of tat?)'),
 dict(woord='intraspecifieke', invoer='intraspecifieke', ipa='ˌɪntraspeːsiˈfikə', bron='eigen transcriptie; op de wachtlijst'),
 dict(woord='interspecifieke', invoer='interspecifieke', ipa='ˌɪntərspeːsiˈfikə', bron='eigen transcriptie; op de wachtlijst'),
 dict(woord='concurrentie-uitsluitingsprincipe', invoer='concurrentie-uitsluitingsprincipe', ipa='kɔŋkyˈrɛn(t)si ˈœytslœytɪŋsprɪnˌsipə', bron='eigen transcriptie; "tie" als "sie"'),
 dict(woord='hemoglobine', invoer='heemoglobine', ipa='ˌheːmoːɣloːˈbinə', bron='naar analogie van Kamiels keuze heemolieze (hemolyse); -ine voluit'),
 dict(woord='acclimatisatie', invoer='acclimatisatie', ipa='ɑklimaːtiˈzaː(t)si', bron='eigen transcriptie; "tie" als "sie"'),
 dict(woord='fotoperiodiciteit', invoer='fotoperiodiciteit', ipa='ˌfoːtoːˌpeːrijoːdisiˈtɛit', bron='eigen transcriptie; op de wachtlijst'),
 dict(woord='pantoffeldiertjes', invoer='pantoffeldiertjes', ipa='pɑnˈtɔfəlˌdirtjəs', bron='eigen transcriptie')]

data = dict(film=2, titel='Waar past een soort?', slug='2-waar-past-een-soort',
 puzzel='Waarom leven er in de ene beek wel steenvlieglarven en in de andere niet? (B: hoe leven twee mezen in één bos? C: welke factor bepaalt de plantengroei bij genoeg licht en water?)',
 haak='Een schepnet in twee beken: onder een steen in snel, helder water een steenvlieglarve; in traag, troebel water alleen rode muggenlarven.',
 hoofdstukken=hoofdstukken, scenes=S, checkvragen=checkvragen, begrippen=begrippen, getallen=getallen, uitspraak=uitspraak,
 nieuw_in_bibliotheek=[
  'e2Beek(ctx, x, y, w, h, o) — beek in doorsnede als Macro-paneel (o.soort "snel" | "traag"): stenen, grind of slib, water helder of troebel, stromingsstreepjes',
  'e2Meter(ctx, x, y, w, o) — horizontale meter (schaal + wijzer) voor een abiotische factor, Schema',
  'e2Kromme(ctx, x, y, w, h, o) — optimumkromme met minimumgrens, optimum, maximumgrens en tolerantiegebied',
  'e2Tabel — tolerantietabel in examenstijl',
  'e2Ton — ton met duigen (wet van het minimum)',
  'e2Buis — reageerbuis met pantoffeldiertjes en groeilijntje (Gause)',
  'e2Nestkast — nestkast met invlieggat (28 of 32 mm)',
  'e2Eik — eik in het voorjaar met dikke takken en dunne buitentwijgen (zelf getekend; ecoZomereik uit pop_eco_klein2 is te klein voor een decor met mezen)',
  'e2Paramecium — pantoffeldiertje (Micro, alleen in de buis, vereenvoudigd)'],
 keuzes_en_twijfels=[])
data['b15'] = dict(trekking='A klassiek · B camerabeweging, perspectief · C twee situaties naast elkaar (eerste trek; past bij proefregel P1: de vergelijking speelt het concept na).',
 varianten=dict(A='Klassiek: van ecosysteem en factoren via tolerantie en beperkende factor naar niche en concurrentie; beek en mezen achter elkaar.',
                B='Eén doorlopende camerarit stroomafwaarts, met meters rond de larve (perspectief van de soort).',
                C='Split screen: links de snelle, koude beek, rechts de trage, warme; elk begrip op beide helften; daarna twee mezen in één eik.'),
 scores=dict(A=48, B=39, C=49), max=65, blindlabels=dict(A='Z', B='X', C='Y'), winnaar='C (gecombineerd met A)',
 reden='Nipte winst (49-48-39): de vergelijking van twee beken speelt het concept na en geeft het sterkste cold open en de beste examenvorm. Zwakke punten van C (anonieme hand, weinig misconceptievragen) opgelost met A: Noor met het schepnet en een misconceptievraag per hoofdstuk.',
 beoordelaar_model='sonnet',
 overgenomen=['A: misconceptievraag per hoofdstuk (dood blad abiotisch?, meer water helpt?, delen ze gewoon?)', 'A: tabelvraag 6 mg/l en 19 °C (beek C)', 'A: pH en parasieten genoemd in H1', 'A: Noor als castpersonage met het schepnet (cold open en slot)', 'A: puzzels B en C apart beantwoord in de samenvatting', 'B: de blik onder de steen in de opening', 'beoordelaar: geen klaver als voorbeeld van stikstoftekort; cold open onder 20 s gehouden'])

def woorden(t): return len(re.findall(r"[\wÀ-ÿ'’]+", t))
qs = [s for s in S if re.match(r'e\d+q', s['id'])]
wb = sum(woorden(s['tekst']) for s in S if s['laag'] == 'basis'); wv = sum(woorden(s['tekst']) for s in S if s['laag'] == 'vwo')
nqb = sum(1 for s in qs if s['laag'] == 'basis'); nqv = len(qs) - nqb; extra = 8 + 4 * len(hoofdstukken)
basis = wb / 140 * 60 + nqb * 10 + extra; met = (wb + wv) / 140 * 60 + (nqb + nqv) * 10 + extra
data['duur'] = dict(basis_min=round(basis / 60, 1), met_vwo_min=round(met / 60, 1), woorden=wb + wv, woorden_basis=wb, woorden_vwo=wv)
data['keuzes_en_twijfels'] = [
 'Puzzel A gekozen (twee beken); B en C worden elk in een eigen hoofdstuk beantwoord en in de samenvatting herhaald.',
 'Combinatie C + A na de blinde beoordeling (nipte winst, zie b15).',
 'Castpersonage: Noor (16) met schepnet als "je" in de opening en het slot (rol "jij, bovenbouw"); niet bij naam genoemd. In het veld: outfit zomer.',
 'Bladafval als biotische factor: zo in de examenatlas (biotisch = invloed van/afkomstig van organismen, voedsel). De beoordelaar wees erop dat methodes dood organisch materiaal soms anders indelen: daarom zegt de film "telt als biotische factor: het komt van een boom, en voor de larve is het voedsel".',
 'Tolerantietabel en zuurstofwaarden van de beken zijn voorbeeldwaarden (zoals in CE-opgaven); in beeld staat "voorbeeldwaarden". De richting (steenvlieg smal, muggenlarve breed) rust op bronnen.',
 'Wet van het minimum met stikstof als voorbeeld op een oever (geen vlinderbloemige: klaver bindt zelf stikstof). De term "wet van het minimum" staat niet in de spec; toegevoegd als steun voor "beperkende factor" (Nectar en BvJ gebruiken vooral "beperkende factor").',
 'Gause genoemd als "een bioloog" (geen naam in de vertelling, wel in de begrippenlijst/docent). Pantoffeldiertjes kort als Micro-inzet in een buis.',
 'Mezen: het nicheverschil rust op García-Navas et al. 2013 (prooi in het broedseizoen) en Wikipedia (pimpelmees aan buitenste twijgen, koolmees ook op de grond). Precieze percentages niet in de vertelling.',
 'Adaptatie kort, met de zin "een dier past zich niet aan omdat het dat wil" tegen teleologie; natuurlijke selectie alleen benoemd (Evolutie 2).',
 'Vwo-blok acclimatisatie + fotoperiodiciteit (e2s27–e2s30) aan het eind van H4, eindigt met "Terug naar de twee beken".',
 'Proefregel P2: de misconcepties die hier spelen ("dood = abiotisch", "meer water helpt", "twee soorten delen gewoon") zijn elk een vraag.',
 'Uitspraak: nl.wiktionary niet bereikbaar; IPA eigen transcriptie, risicowoorden op de wachtlijst (niche, habitat, intra-/interspecifieke, fotoperiodiciteit).',
 'Techniek: lib_eco.js gebruikt nu ECOK (hoofdredactie); de terugval in teken_eco1.js definieert alleen nog functies die ontbreken. dieren_overig.js geeft zonder teken_evo3.js de melding berkenspanner (onschuldig).',
 'Herstel na review (MOET 2, Vragen uit): e2s28 begint nu met "Een bioloog testte wat er gebeurt als twee soorten precies hetzelfde voedsel eten" in plaats van "dat".',
 'Herstel na review (MOET 3): e2s08 de mens is de biotische factor; het afvalwater verandert abiotische factoren zoals zuurstof.',
 'Herstel na review (KAN): e2s24 waterpeil in de ton zichtbaar en labels onderaan de duigen; e2s26 geen kale takken meer boven de kroon, labels in de lucht; e2s21 schakel zuurstof dunner; e2s37 "Op welk signaal reageert…" in plaats van "Hoe weet…".',
 'Niet hersteld (KAN): e2q10 dood blad als biotische factor blijft, met de geruststellende uitleg in e2s11; Kamiel kan kiezen voor de forel als vraag.',
 'Coördinatorbesluit: de mezen (koolmees, pimpelmees, rupsen in de eik, nestholte) blijven alleen in deze film.']
os.makedirs('/root/eco2/films', exist_ok=True)
json.dump(data, open('/root/eco2/films/f2.json', 'w'), ensure_ascii=False, indent=1)
print('scènes', len(S), 'vragen', len(qs), data['duur'])
for s in S: print(s['id'], s['laag'][0], s['look'][:3], s.get('juist',''), '|', s['tekst'][:60])
