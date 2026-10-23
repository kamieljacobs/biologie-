# LET OP (22 okt 2026): f8.json is nu leidend; daarin zijn de reviewpunten (review_reeks.md) direct verwerkt. Dit script niet meer draaien, anders gaan die wijzigingen verloren.
import json
S = []
def sc(id, h, look, tekst, beweging, opties=None, juist=None, laag='basis'):
    d = {"id": id, "hoofdstuk": h, "laag": laag, "look": look, "tekst": tekst, "beweging": beweging}
    if opties: d["opties"] = opties; d["juist"] = juist
    S.append(d)
O, H1, H2, H3, H4, R = 'Opening', '1 Een stamboom lezen', '2 Kenmerken op de takken', '3 Dezelfde vorm, andere tak', '4 Namen en groepen', 'Samenvatting'
sc('e8s01', O, 'Macro', "Een dolfijn en een haai. Gestroomlijnd lijf, een vin op de rug, borstvinnen, een krachtige staart. Van een afstand zie je bijna geen verschil.", "Dolfijn en haai zwemmen naast elkaar door het blauw, met dezelfde golf door het lijf.")
sc('e8s02', O, 'Macro', "Mevrouw Visser vraagt het aan de klas: is een dolfijn familie van een haai?", "Mevrouw Visser staat voor het bord met de twee silhouetten; de vraag verschijnt erboven.")
sc('e8s03', O, 'Schema', "", "Titelkaart: titel en puzzel links, dolfijn en haai rechts.")
sc('e8s04', H1, 'Schema', "In film zeven zag je het: walvis en nijlpaard hebben een gemeenschappelijke voorouder. In een stamboom teken je dat als een vertakking. Zo'n stamboom heet een cladogram.", "Twee lijnen lopen omlaag en komen samen in één knooppunt.")
sc('e8s05', H1, 'Schema', "Elk knooppunt staat voor een gemeenschappelijke voorouder: een populatie die zich splitste in twee lijnen. Volg je een lijn van een soort omlaag naar de wortel, dan volg je zijn afstammingslijn.", "Het knooppunt licht goud op; daarna loopt een gouden lijn van de walvis naar de wortel.")
sc('e8s06', H1, 'Schema', "Voeg de koe toe. Walvis en nijlpaard delen een jongere voorouder dan walvis en koe. Hoe jonger de laatste gemeenschappelijke voorouder, hoe nauwer verwant.", "De boom groeit met de koe; het jongste knooppunt is goud, het oudere teal.")
sc('e8q07', H1, 'Schema', "Wat denk je? In deze boom staat de walvis naast de koe, en het nijlpaard aan de rand. Wie is nu het nauwst verwant aan de walvis?", "Vraagkaart: dezelfde boom, maar twee takken zijn gedraaid zodat de volgorde van de namen verandert.",
   "A Het nijlpaard: walvis en nijlpaard delen nog steeds het jongste knooppunt · B De koe: die staat er het dichtst naast · C Dat verschilt per tekening", "A")
sc('e8s08', H1, 'Schema', "Een knooppunt is een scharnier. Draai je de takken om, dan verandert alleen de volgorde van de namen. De boom blijft dezelfde. Lees een stamboom dus aan de vertakkingen, nooit aan de volgorde van de namen.", "Het knooppunt draait als een scharnier; de namen wisselen van plek, de lijnen blijven verbonden.")
sc('e8s09', H1, 'Schema', "Nog een valkuil. De chimpansee staat in de boom naast de mens. Maar een soort die nu leeft, is nooit de voorouder van een andere soort die nu leeft.", "Mens en chimpansee staan bovenaan; een rode pijl van chimpansee naar mens wordt doorgestreept.")
sc('e8s10', H1, 'Schema', "Mens en chimpansee hebben allebei evenveel tijd gehad om te veranderen. Ze delen een gemeenschappelijke voorouder, ongeveer 6 tot 8 miljoen jaar geleden. Die voorouder was geen mens en geen chimpansee.", "Beide takken worden even lang; het knooppunt krijgt een vraagteken-silhouet en een tijdlabel.")
sc('e8s11', H2, 'Schema', "Hoe weten biologen waar een tak hoort? Ze kijken naar kenmerken. Een kenmerk dat in een voorouder ontstond, erven alle soorten op zijn takken. Je zet het als streepje op de tak waar het verscheen.", "Een boom met haai, hagedis en mens; streepjes schuiven op hun tak.")
sc('e8s12', H2, 'Schema', "Een wervelkolom hebben ze alle drie. Longen en vier poten alleen hagedis en mens. Haar en melk alleen de mens. Elk nieuw kenmerk maakt de groep kleiner.", "Bij elk genoemd kenmerk licht het streepje op en worden de soorten erboven omcirkeld.")
sc('e8s13', H2, 'Schema', "De haai hoort er bewust bij. Hij is de buitengroep: een soort die buiten de groep valt die je onderzoekt. Hij laat zien welke kenmerken al oud zijn, zoals de wervelkolom, en welke nieuw.", "De haai-tak krijgt een stippellijnkader met 'buitengroep'.")
sc('e8s14', H2, 'Macro', "Nu een lastige. Een krokodil en een hagedis lijken veel op elkaar. Allebei schubben, vier poten opzij, en ze leggen eieren. Een vogel heeft veren en vleugels.", "Krokodil, hagedis en vogel staan naast elkaar aan een rivieroever.")
sc('e8q15', H2, 'Schema', "Wat denk je? Wie is nauwer verwant aan de krokodil?", "Vraagkaart met krokodil, hagedis en vogel.",
   "A De hagedis: die lijkt er het meest op · B Ze zijn alle drie even nauw verwant · C De vogel", "C")
sc('e8s16', H2, 'Schema', "Krokodil en vogel delen kenmerken die de hagedis mist. Een hart met vier kamers. Een spiermaag, waarin steentjes het voedsel vermalen. En ook hun DNA wijst die kant op.", "In de boom komen krokodil en vogel samen op één knooppunt; drie streepjes lichten goud op.")
sc('e8s17', H2, 'Schema', "Schubben zijn een oud kenmerk: dat hadden de voorouders van alle drie al. Een gedeeld oud kenmerk zegt dus niets over wie dichter bij elkaar staat. Alleen gedeelde nieuwe kenmerken tellen.", "Het streepje 'schubben' schuift omlaag naar de oudste tak, onder alle drie.")
sc('e8s18', H3, 'Schema', "Terug naar de haai en de dolfijn. Kijk eens onder de huid. De haai heeft een skelet van kraakbeen en kieuwen. De dolfijn heeft botten en longen, en in zijn borstvin zitten dezelfde botten als in jouw arm.", "Haai en dolfijn worden doorschijnend: kraakbeenstralen in de haaienvin, armbotten in teal, oker en paars in de dolfijnvin.")
sc('e8s19', H3, 'Schema', "En er is nog een derde zwemmer: de ichthyosaurus. Een reptiel dat leefde van ongeveer 250 tot 90 miljoen jaar geleden. Hetzelfde stroomlijnlijf, dezelfde rugvin.", "Tussen haai en dolfijn zwemt een ichthyosaurus in; zijn label met tijd verschijnt.")
sc('e8q20', H3, 'Schema', "Wat denk je? Waarom hebben haai, dolfijn en ichthyosaurus bijna dezelfde vorm?", "Vraagkaart met de drie silhouetten over elkaar.",
   "A Ze hebben die vorm geërfd van één gemeenschappelijke voorouder die al zo zwom · B Ze zijn alle drie ver familie, maar in zee was een stroomlijn een selectievoordeel · C Ze pasten zich aan omdat ze snel moesten zwemmen", "B")
sc('e8s21', H3, 'Schema', "Zet ze in de boom. De dolfijn staat bij de zoogdieren, de ichthyosaurus bij de reptielen, de haai helemaal apart. Hun gemeenschappelijke voorouder leefde lang geleden en had nog geen stroomlijnlijf.", "De drie zwemmers schuiven naar hun eigen tak in een grote boom; de takken liggen ver uit elkaar.")
sc('e8s22', H3, 'Schema', "In water geeft een gestroomlijnd lijf minder weerstand. In elke lijn hadden individuen met een iets gladdere vorm meer nakomelingen. Zo werd die vorm drie keer los van elkaar algemeen.", "In elke tak schuift een rijtje silhouetten generatie na generatie naar dezelfde vorm.")
sc('e8s23', H3, 'Schema', "Organen met dezelfde functie maar een andere bouw heten analoge organen. Ze ontstaan door dezelfde selectiedruk in groepen die niet nauw verwant zijn. Dat heet convergente evolutie.", "De drie rugvinnen staan naast elkaar met verschillende binnenbouw; een groene haak eronder.")
sc('e8s24', H3, 'Schema', "Homologe organen wijzen dus op verwantschap. Analoge organen niet. Daarom kijken biologen niet naar het uiterlijk, maar naar de bouw en het DNA.", "Twee kolommen: homoloog (vier armen) en analoog (drie vinnen); de linkerkolom krijgt een gouden haak.")
sc('e8s25', H4, 'Schema', "Om al die soorten te ordenen, delen biologen ze in groepen in. Leeuw en tijger horen bij hetzelfde geslacht, Panthera.", "Leeuw en tijger staan naast elkaar in een afgerond vak met 'geslacht Panthera'.")
sc('e8s26', H4, 'Schema', "Panthera hoort bij de familie van de katachtigen, samen met bijvoorbeeld de huiskat. Die familie hoort bij de orde roofdieren, de klasse zoogdieren, de stam gewervelde dieren en het rijk dieren.", "Om het vak groeien steeds grotere vakken: familie, orde, klasse, stam, rijk.")
sc('e8s27', H4, 'Schema', "De kleinste groep is de soort: individuen die samen vruchtbare nakomelingen kunnen krijgen. Een leeuw en een tijger zijn twee soorten.", "Het vak 'geslacht' splitst in twee kleinere vakken: leeuw en tijger.")
sc('e8q28', H4, 'Schema', "Wat denk je? De leeuw heet Panthera leo en de tijger Panthera tigris. Wat zegt het eerste woord?", "Vraagkaart met de twee namen schuin gedrukt.",
   "A De soort · B De familie · C Het geslacht", "C")
sc('e8s29', H4, 'Schema', "Elke soort heeft een wetenschappelijke naam van twee woorden: eerst de geslachtsnaam, met een hoofdletter, dan de soortaanduiding. Samen zijn ze de naam van de soort. Dat heet binomiale naamgeving.", "Panthera licht op als geslachtsnaam; leo en tigris als soortaanduiding; de hele naam wordt goud.")
sc('e8s30', H4, 'Schema', "Carl Linnaeus begon daarmee in het jaar 1758. Hij noemde de mens Homo sapiens: de wijze mens. Homo is het geslacht.", "Een boekje opent met 'Homo sapiens'; daaronder het jaartal.")
sc('e8s31', H4, 'Schema', "Een goede indeling volgt de stamboom. Hoe kleiner de groep die twee soorten delen, hoe nauwer ze verwant zijn. Leeuw en tijger delen een geslacht. Leeuw en huiskat alleen een familie.", "Naast de vakken staat een kleine boom; het jongste knooppunt hoort bij het kleinste vak.")
sc('e8s32', R, 'Schema', "Is een dolfijn familie van een haai? Alleen heel ver. Hun vorm is analoog: dezelfde selectiedruk in water, niet dezelfde voorouder. De dolfijn hoort bij de zoogdieren, net als de walvis. Lees een stamboom aan de vertakkingen. En gedeelde nieuwe kenmerken, botten en DNA vertellen wie bij wie hoort.", "Eindkaart: drie kernzinnen met een groene haak; geen beeld.")

nw = sum(len(x['tekst'].split()) for x in S)
nq = sum(1 for x in S if x['id'][2] == 'q')
basis = nw / 140 + nq * 10 / 60 + 4 * 4 / 60 + 8 / 60
F = {"film": 8, "titel": "Stambomen lezen", "slug": "8-stambomen-lezen",
 "puzzel": "Is een dolfijn familie van een haai?",
 "haak": "Dolfijn en haai lijken van een afstand bijna hetzelfde.",
 "duur": {"basis_min": round(basis, 1), "met_vwo_min": round(basis, 1), "woorden": nw},
 "hoofdstukken": [
  {"nr": 1, "titel": "Een stamboom lezen", "minivraag": "Wie is het nauwst verwant, en hoe zie je dat?", "type": "G", "look": "Schema"},
  {"nr": 2, "titel": "Kenmerken op de takken", "minivraag": "Wie is nauwer verwant aan een krokodil: een hagedis of een vogel?", "type": "G", "look": "Schema"},
  {"nr": 3, "titel": "Dezelfde vorm, andere tak", "minivraag": "Waarom lijken haai, dolfijn en ichthyosaurus zo op elkaar?", "type": "F", "look": "Schema"},
  {"nr": 4, "titel": "Namen en groepen", "minivraag": "Waarom heet de mens Homo sapiens?", "type": "B", "look": "Schema"}],
 "scenes": S,
 "checkvragen": [
  {"niveau": "basis", "vraag": "In een cladogram komen soort P en Q samen in het jongste knooppunt; R takt eerder af. Welke twee soorten zijn het nauwst verwant? Leg uit.", "antwoord": "P en Q: zij delen de meest recente gemeenschappelijke voorouder."},
  {"niveau": "basis", "vraag": "Een leerling zegt: 'In dit cladogram staat de koe naast de walvis, dus zijn ze het nauwst verwant.' Wat is er fout?", "antwoord": "Je leest een cladogram aan de vertakkingen, niet aan de volgorde van de namen; takken kun je om een knooppunt draaien zonder dat de boom verandert."},
  {"niveau": "basis", "vraag": "Stamt de mens af van de chimpansee? Leg uit.", "antwoord": "Nee. Een nu levende soort is geen voorouder van een andere nu levende soort; mens en chimpansee delen een gemeenschappelijke voorouder die geen van beide was."},
  {"niveau": "basis", "vraag": "Wat is een buitengroep en waarvoor gebruik je hem?", "antwoord": "Een soort die buiten de onderzochte groep valt. Hij laat zien welke kenmerken oud zijn (ook bij de buitengroep) en welke nieuw zijn binnen de groep."},
  {"niveau": "basis", "vraag": "De vleugel van een vogel en de vleugel van een vlinder hebben dezelfde functie. Zijn ze homoloog of analoog? Leg uit.", "antwoord": "Analoog: dezelfde functie, maar een totaal andere bouw (botten tegenover een vlies van chitine); ze zijn onafhankelijk ontstaan door vergelijkbare selectiedruk (convergente evolutie)."},
  {"niveau": "basis", "vraag": "Waarom zegt een gedeeld kenmerk als 'schubben' niets over de vraag of een krokodil nauwer verwant is aan een hagedis of aan een vogel?", "antwoord": "Schubben zijn een oud kenmerk dat de voorouder van alle drie al had; alleen gedeelde nieuwe kenmerken laten zien wie een jongere gemeenschappelijke voorouder deelt."},
  {"niveau": "basis", "vraag": "Gegeven: Felis catus, Felis silvestris, Panthera leo, Panthera pardus. Hoeveel geslachten en hoeveel soorten zijn dit?", "antwoord": "Twee geslachten (Felis en Panthera) en vier soorten."},
  {"niveau": "basis", "vraag": "Zet in volgorde van groot naar klein: familie, rijk, soort, klasse, geslacht, orde, stam.", "antwoord": "Rijk, stam, klasse, orde, familie, geslacht, soort."}],
 "begrippen": [
  {"begrip": "cladogram", "uitleg": "Stamboom die laat zien welke soorten de meest recente gemeenschappelijke voorouder delen. Je leest hem aan de vertakkingen, niet aan de volgorde van de namen.", "niveau": "basis"},
  {"begrip": "gemeenschappelijke voorouder", "uitleg": "Populatie waarvan twee of meer soorten afstammen; in een cladogram een knooppunt.", "niveau": "basis"},
  {"begrip": "afstammingslijn", "uitleg": "De lijn van een soort via al zijn voorouders terug naar de wortel van de stamboom.", "niveau": "basis"},
  {"begrip": "verwantschap", "uitleg": "Hoe kort geleden twee soorten hun laatste gemeenschappelijke voorouder hadden: hoe jonger die voorouder, hoe nauwer verwant.", "niveau": "basis"},
  {"begrip": "buitengroep", "uitleg": "Soort buiten de onderzochte groep, waarmee je ziet welke kenmerken oud en welke nieuw zijn.", "niveau": "basis"},
  {"begrip": "homologe organen", "uitleg": "Zelfde bouw, vaak andere functie; wijzen op een gemeenschappelijke voorouder (film 7).", "niveau": "basis"},
  {"begrip": "analoge organen", "uitleg": "Zelfde functie, andere bouw; zeggen niets over verwantschap.", "niveau": "basis"},
  {"begrip": "convergente evolutie", "uitleg": "Niet nauw verwante groepen krijgen door dezelfde selectiedruk los van elkaar dezelfde vorm of eigenschap.", "niveau": "basis"},
  {"begrip": "classificatie", "uitleg": "Indelen van organismen in groepen: rijk, stam, klasse, orde, familie, geslacht, soort.", "niveau": "basis"},
  {"begrip": "soort", "uitleg": "Groep individuen die samen vruchtbare nakomelingen kunnen krijgen (film 6).", "niveau": "basis"},
  {"begrip": "geslacht", "uitleg": "Groep nauw verwante soorten, zoals Panthera (leeuw, tijger, luipaard, jaguar).", "niveau": "basis"},
  {"begrip": "binomiale naamgeving", "uitleg": "Wetenschappelijke naam van twee woorden: geslachtsnaam (met hoofdletter) plus soortaanduiding, samen de naam van de soort, bijvoorbeeld Homo sapiens.", "niveau": "basis"}],
 "getallen": [
  {"waarde": "laatste gemeenschappelijke voorouder mens–chimpansee ongeveer 6 tot 8 miljoen jaar geleden (schattingen 13–5 Mj, recent 5,5–8)", "bron": "Wikipedia Chimpanzee–human last common ancestor (overzicht 1998–2026)"},
  {"waarde": "ichthyosauriërs: reptielen (geen dinosauriërs), van ongeveer 250 tot ongeveer 90 miljoen jaar geleden; ademden lucht, levendbarend; lichaamsvorm als dolfijn", "bron": "ZME Science (ichthyosaurus); Scientias.nl ('ongeveer 94 miljoen jaar geleden uitgestorven')"},
  {"waarde": "krokodilachtigen zijn nauwer verwant aan vogels dan aan hagedissen (archosauriërs)", "bron": "Yale News 2014 ('Birds are most closely related to crocodilians among living reptiles'); St. Augustine Alligator Farm"},
  {"waarde": "hart met vier kamers bij krokodilachtigen (en vogels), één kamer (ventrikel) bij hagedissen", "bron": "The Physiological Society (evolution of the vertebrate heart)"},
  {"waarde": "spiermaag (met maagstenen) bij vogels en krokodilachtigen", "bron": "Wikipedia Gizzard; UCMP Berkeley gastroliths"},
  {"waarde": "indelingsniveaus rijk, stam, klasse, orde, familie, geslacht, soort", "bron": "Biologie voor Jou samenvatting thema 4 (wikiwijs, BvJ 3k th4)"},
  {"waarde": "binomiale naam = geslachtsnaam + soortaanduiding (Homo sapiens)", "bron": "encyclo.nl (soortaanduiding)"},
  {"waarde": "Linnaeus, Systema Naturae 10e druk, 1758; Homo sapiens = 'wijze mens'", "bron": "Wikipedia 10th edition of Systema Naturae; Names for the human species"}],
 "uitspraak": [
  {"woord": "cladogram", "invoer": "cladogram", "ipa": "/ˌklaː.doːˈɣrɑm/ (afgeleid)", "bron": "naar 'diagram'; wachtlijst"},
  {"woord": "ichthyosaurus", "invoer": "ichthyosaurus", "ipa": "/ˌɪx.ti.joːˈzɑu̯.rʏs/ (afgeleid)", "bron": "nl.wiktionary niet bereikbaar; bij fouten 'ichtie-ozaurus'"},
  {"woord": "Panthera leo", "invoer": "Panthera leo", "ipa": "/ˈpɑn.te.raː ˈleː.joː/ (afgeleid)", "bron": "Latijn; wachtlijst"},
  {"woord": "Panthera tigris", "invoer": "Panthera tigris", "ipa": "/ˈpɑn.te.raː ˈti.ɣrɪs/ (afgeleid)", "bron": "Latijn; wachtlijst"},
  {"woord": "Homo sapiens", "invoer": "Homo sapiens", "ipa": "/ˈɦoː.moː ˈsaː.pi.jɛns/", "bron": "gangbaar NL; wachtlijst"},
  {"woord": "binomiale", "invoer": "binomiale", "ipa": "/ˌbi.noː.miˈjaː.lə/ (afgeleid)", "bron": "seriebrief risicowoord; wachtlijst"},
  {"woord": "convergente", "invoer": "convergente", "ipa": "/ˌkɔn.vɛrˈɣɛn.tə/", "bron": "archief A3: klemtoon GEN, Nederlandse g"},
  {"woord": "analoge", "invoer": "analoge", "ipa": "/ˌaː.naːˈloː.ɣə/ (afgeleid)", "bron": "wachtlijst"},
  {"woord": "Linnaeus", "invoer": "Linnéus", "ipa": "/lɪˈneː.ʏs/", "bron": "gangbare NL uitspraak; wachtlijst"},
  {"woord": "1758", "invoer": "in het jaar 1758", "ipa": "", "bron": "UITSPRAAK.md (jaartallen)"},
  {"woord": "Mevrouw Visser", "invoer": "Mevrouw Visser", "ipa": "", "bron": "gewoon"}],
 "nieuw_in_bibliotheek": [
  "haai — grijze rifhaai-type: vijf kieuwspleten, hoge rugvin, heterocerke staart (verticaal), o.rontgen = kraakbeenstralen in de borstvin",
  "dolfijn — tuimelaar: snuit en meloen, blaasgat, sikkelvormige rugvin, horizontale staartvin; o.rontgen = armbotten in vaste kleuren",
  "ichthyosaurus — Stenopterygius-type: lange smalle snuit, groot oog met scleraalring, rugvin, maanvormige verticale staartvin, vier vinpoten",
  "krokodil, hagedis, vogel (reiger) — archosauriërs-vraag; leeuw, tijger, huiskat — classificatie (Panthera, Felis)",
  "kenmerkStreep (cladogram met kenmerken), naamVak (geneste classificatievakken), schaduwSilhouet"],
 "keuzes_en_twijfels": [
  "Puzzel A (dolfijn en haai) als rode draad, B (krokodil) als vraag in H2, C (Homo sapiens) als minivraag H4; seriebrief gevolgd.",
  "cladogram() uit lib_evo.js gebruikt; de 'gedraaide boom' tekent hij goed omdat de functie de boom als genest array leest. Kenmerken op de takken en het draaien teken ik zelf over de lib-boom heen (lib_evo niet aangepast).",
  "Kenmerken krokodil–vogel: hart met vier kamers en spiermaag (beide gecontroleerd). Antorbitale opening bewust niet genoemd: krokodillen hebben hem dichtgegroeid.",
  "Mens–chimpansee 'ongeveer 6 tot 8 miljoen jaar': schattingen lopen uiteen (5–13 Mj; meta-analyse 2026 ~8 Mj). Alternatief: alleen 'miljoenen jaren'.",
  "'Haar en melk' als kenmerk van de zoogdieren; 'longen en vier poten' vereenvoudigd tot één streepje (formeel: vier poten = viervoeters; longen al ouder). Daarom staat op de tak alleen 'vier poten'.",
  "Indeling: BvJ noemt 'stam'; voor planten 'afdeling' — niet genoemd om één nieuw begrip tegelijk te houden.",
  "Ichthyosaurus 'ongeveer 250 tot 90 miljoen jaar': bronnen geven 250 en 90–94 Mj. Geen tijdlijn van miljarden jaren (seriebrief).",
  "Convergentie-uitleg in termen van selectie (individuen met gladdere vorm meer nakomelingen), geen 'pasten zich aan' (misvatting als optie C in vraag 3).",
  "De dolfijn als zoogdier verbindt met film 7 (walvis); de walvis zelf komt niet opnieuw als casus terug, alleen als naam in de boom."]}
json.dump(F, open('/home/claude/evo2/films/f8.json', 'w'), ensure_ascii=False, indent=1)
print(nw, nq, round(basis, 2), len(S))
