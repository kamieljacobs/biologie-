# LET OP (22 okt 2026): f2.json, f3.json en f4.json zijn na de review direct aangepast; de JSON is nu leidend. Dit script niet opnieuw draaien (het overschrijft de reviewwijzigingen).
import json, re
S = []  # (id, hoofdstuk, laag, look, tekst, beweging, opties, juist)
def sc(i, h, look, tekst, bew, laag='basis', opties=None, juist=None):
    d = {"id": i, "hoofdstuk": h, "laag": laag, "look": look, "tekst": tekst, "beweging": bew}
    if opties: d["opties"] = opties; d["juist"] = juist
    S.append(d)

O = 'Opening'
sc('e4s01', O, 'Schema', "Opa Henk haalt een doosje antibiotica op bij apotheker Ravi. Iedereen kent het advies: maak je kuur af. Maar klopt dat wel? En waarom krijg je bij griep geen antibioticum?",
   "Ravi schuift het doosje over de balie; Opa Henk pakt het aan.")
sc('e4s02', O, 'Schema', "", "Titelkaart: titel en puzzel verschijnen, rechts een gouden (resistente) bacterie tussen teal bacteriën.")
H1 = 'H1 Bacteriën evolueren snel'
sc('e4s03', H1, 'Micro', "Bacteriën planten zich voort door te delen. Eén bacterie wordt twee, twee worden vier. Onder ideale omstandigheden kan een darmbacterie als E. coli dat elke twintig minuten.",
   "Een staafje snoert in het midden in en wordt twee; die twee splitsen weer.")
sc('e4s04', H1, 'Micro', "In je darmen leven tienduizenden miljarden bacteriën. Bij elke deling wordt het DNA gekopieerd, en heel af en toe gaat daarbij iets mis: een mutatie. Hoe dat precies gebeurt, zie je in de DNA-reeks.",
   "Uitzoomen over een dichte kolonie; hier en daar licht één bacterie op met een nieuw allel (paars).")
sc('e4q05', H1, 'Schema', "Wat denk je? Waarom kan een populatie bacteriën veel sneller evolueren dan een populatie mensen?",
   "Vraagkaart met aftellijn.", opties="A Bacteriën passen zich aan als het nodig is · B Korte generatietijd en enorme aantallen · C Bacteriën hebben meer genen dan mensen", juist="B")
sc('e4s06', H1, 'Schema', "Een mens krijgt ongeveer elke dertig jaar een nieuwe generatie. Een bacterie kan in één dag tientallen generaties halen. Meer generaties en meer individuen betekent meer mutaties en vaker selectie. Daarom verandert de genenpool van bacteriën zo snel.",
   "Twee tijdlijnen: de mensenlijn zet één streepje, de bacterielijn vult zich met tientallen streepjes; daarnaast de pot van de kolonie.")
H2 = 'H2 Het antibioticum kiest'
sc('e4s07', H2, 'Schema', "Opa Henk heeft een blaasontsteking. Dr. Kim laat zijn urine onderzoeken. Er zitten bacteriën in, en ze schrijft een antibioticum voor.",
   "Dr. Kim houdt het potje omhoog; een zoomcirkel opent naar de bacteriën.")
sc('e4s08', H2, 'Micro', "Kijk naar die bacteriën. De meeste zijn gevoelig voor het antibioticum. Maar een paar hebben door toeval een allel waardoor het middel niet werkt. Dat allel was er al, lang voordat Opa Henk zijn eerste pil nam.",
   "De kolonie ligt stil; drie oker (resistente) bacteriën krijgen een gouden rand.")
sc('e4q09', H2, 'Schema', "Wat denk je? Opa Henk slikt het antibioticum. Wat gebeurt er met de bacteriën in zijn blaas?",
   "Vraagkaart met aftellijn.", opties="A Ze worden langzaam immuun voor het middel · B Het middel veroorzaakt resistentie-mutaties · C Gevoelige gaan dood, resistente delen verder", juist="C")
sc('e4s10', H2, 'Micro', "De gevoelige bacteriën gaan dood. De resistente bacteriën merken weinig van het middel. Ze delen gewoon verder, en hun nakomelingen erven het resistentie-allel. Geen enkele bacterie is zelf veranderd: de populatie is veranderd.",
   "Antibioticummoleculen (koraal) dringen in; teal staafjes worden gestippeld en vervagen; de oker staafjes delen.")
sc('e4s11', H2, 'Schema', "In de pot zie je wat er gebeurde. Eerst was het resistentie-allel zeldzaam. Na de kuur is het bijna overal. Het antibioticum was de selectiedruk. Elke keer dat je het gebruikt, krijgen de resistente bacteriën een voordeel.",
   "Twee potten naast elkaar (voor en na), de allelbalk schuift van bijna helemaal teal naar bijna helemaal oker.")
sc('e4s12', H2, 'Micro', "En griep? Griep komt door een virus. Een virus is geen bacterie: een antibioticum doet er niets tegen. Je wordt dus niet sneller beter. Maar het middel komt wel overal in je lichaam, ook bij de bacteriën in je darmen.",
   "Griepvirussen blijven ongeschonden tussen de antibioticummoleculen; de camera schuift naar de darmbacteriën.")
sc('e4q13', H2, 'Schema', "Wat denk je? Iemand neemt een antibioticum tegen griep. Wat doet dat?",
   "Vraagkaart met aftellijn.", opties="A Het selecteert resistente bacteriën in je darmen · B Niets: er zijn geen ziekmakende bacteriën · C Het griepvirus wordt er resistent door", juist="A")
sc('e4s14', H2, 'Micro', "In je darmen zitten vaak ook een paar resistente bacteriën. Het antibioticum ruimt hun concurrenten op. Je hebt dus de nadelen van het middel, zonder het voordeel. Dat is de oplossing van de puzzel: tegen griep helpt een antibioticum niet, maar selecteren doet het wel.",
   "In de darmkolonie vervagen de teal bacteriën; de oker bacteriën vullen de vrijgekomen ruimte.")
sc('e4s15', H2, 'Schema', "En die kuur? Het oude advies 'maak hem altijd af' was bedoeld tegen resistentie. Maar elke extra dag is ook extra selectiedruk. Daarom zeggen artsen nu: neem het precies zoals je arts het voorschrijft. Wil je eerder stoppen, overleg dan eerst. En breng een restje terug naar de apotheek.",
   "Apotheker Ravi wijst op het etiket met het aantal dagen; Opa Henk knikt.")
H3 = 'H3 De pot lekt'
sc('e4s16', H3, 'Micro', "Bacteriën hebben nog een truc. Naast hun grote DNA-molecuul hebben ze vaak kleine ringetjes DNA: plasmiden. Op een plasmide ligt soms een resistentiegen.",
   "Inzoomen op één oker bacterie; het plasmide-ringetje licht op, het oker stukje is het resistentiegen.")
sc('e4s17', H3, 'Micro', "Een bacterie kan een kopie van zo'n plasmide doorgeven aan een buurbacterie, via een dun buisje. Die buurbacterie hoeft niet eens dezelfde soort te zijn.",
   "Een geslachtsdraad (pilus) groeit naar een buurbacterie; een kopie van het ringetje schuift erdoorheen.")
sc('e4q18', H3, 'Schema', "Wat denk je? Een E. coli met een plasmide voor resistentie ligt naast een bacterie van een andere soort. Wat kan er gebeuren?",
   "Vraagkaart met aftellijn.", opties="A Niets: genen gaan alleen naar dochtercellen · B De E. coli verliest zijn resistentie · C De andere soort krijgt een kopie en wordt resistent", juist="C")
sc('e4s19', H3, 'Schema', "Resistentie springt zo over naar een andere soort. Een bekend voorbeeld is ESBL: een enzym dat veel penicillines afbreekt. De genen ervoor liggen meestal op plasmiden, en gaan van E. coli naar bijvoorbeeld Klebsiella. Het is alsof er een gaatje zit tussen twee potten.",
   "Twee potten (E. coli en Klebsiella); een oker knikker rolt door een buisje van de ene naar de andere pot.")
sc('e4s20', H3, 'Schema', "In een ziekenhuis liggen veel zieke mensen bij elkaar, en worden veel antibiotica gebruikt. Daar is de selectiedruk het grootst. Daarom testen ziekenhuizen op resistente bacteriën, en wassen artsen voortdurend hun handen.",
   "Ziekenhuisicoon; rondom lichten patiënt, handen en bed op als plekken waar plasmiden overspringen.")
H4 = 'H4 De mens kiest'
sc('e4s21', H4, 'Macro', "Bij een antibioticum kiest de mens per ongeluk. Maar vaak kiest de mens met opzet. Minstens vijftienduizend jaar geleden leefden mensen al samen met wolven. Alle honden stammen af van wolven uit die tijd.",
   "Een wolf staat op een heuvel bij nacht; de camera schuift naar de rij honden.")
sc('e4s22', H4, 'Macro', "Fokkers lieten steeds de dieren met de gewenste kenmerken jongen krijgen. Dat heet kunstmatige selectie. Zo ontstonden rassen: groepen honden met eigen erfelijke kenmerken. De meeste rassen zijn pas ongeveer tweehonderd jaar oud.",
   "Wolf, herder, teckel, mops en chihuahua op dezelfde schaal komen één voor één in beeld.")
sc('e4q23', H4, 'Schema', "Wat denk je? Hoe kan uit een wolf ooit een chihuahua ontstaan?",
   "Vraagkaart met aftellijn.", opties="A Fokkers lieten steeds de kleinste honden jongen krijgen · B Binnen wonen en weinig rennen maakte honden kleiner · C Eén grote mutatie maakte in één keer een chihuahua", juist="A")
sc('e4s24', H4, 'Schema', "Elke keer mochten de kleinste honden jongen krijgen. Allelen voor een kleine bouw werden zo, generatie na generatie, vaker in de genenpool. Het mechanisme is precies als bij natuurlijke selectie. Alleen bepaalt nu de fokker wie zich voortplant.",
   "Een hand (goud) pakt de kleine knikkers uit de pot; de nieuwe pot heeft een hogere oker fractie.")
sc('e4s25', H4, 'Schema', "Bij planten heet dit veredeling. Kijk naar de wilde kool, een plant van de kalkkliffen langs het Kanaal. Uit die ene soort kweekten mensen boerenkool, spruitjes, koolrabi, broccoli en bloemkool. Bij elke groente werd een ander deel steeds groter.",
   "De wilde kool in het midden; vijf groenten groeien er in een boog omheen, het vergrote deel krijgt een gouden ring.")
H5 = 'H5 Inteelt en de genenbank'
sc('e4s26', H5, 'Schema', "Dierenarts Mila ziet veel rashonden met erfelijke ziekten. Hoe komt dat? Een ras is een kleine groep die alleen onderling paart. Vaak hebben veel pups dezelfde populaire vader. Dan zijn ouders al snel familie van elkaar. Dat heet inteelt.",
   "Mila knielt bij een mops die moeilijk ademt; achter haar een stamboom-icoon met één vader die vaak terugkomt.")
sc('e4q27', H5, 'Schema', "Wat denk je? Waarom hebben rashonden vaker erfelijke ziekten?",
   "Vraagkaart met aftellijn.", opties="A Bij inteelt ontstaan meer mutaties · B Rashonden zijn zwakker door het leven in huis · C Jongen krijgen vaker twee dezelfde recessieve allelen", juist="C")
sc('e4s28', H5, 'Schema', "Inteelt maakt geen nieuwe mutaties. De knikkers in de pot blijven dezelfde. Wat verandert, is hoe ze in paren komen. Verwante ouders dragen vaak hetzelfde zeldzame allel. Hun jongen zijn dan vaker homozygoot, en dan komt een recessieve ziekte tot uiting. Bij veel rassen is de inteelt gemiddeld even hoog als bij een pup van broer en zus.",
   "Knikkerparen vallen uit de pot: in de linkerrij (vrij paren) zelden twee oker, in de rechterrij (inteelt) vaak twee oker; de allelbalk blijft gelijk.")
sc('e4s29', H5, 'Schema', "Hetzelfde gebeurt bij gewassen. Boeren telen vaak maar een paar rassen, en oude rassen raken uit beeld. Daarom bewaart de genenbank in Wageningen zaden van oude rassen en wilde verwanten, diepgevroren. Een reservekopie ligt in een berg op Spitsbergen, met inmiddels meer dan 1,3 miljoen zaadmonsters.",
   "Een rek met zaadpotjes; één potje schuift naar voren en een kopie reist naar een kluis in een berg.")
sc('e4s30', H5, 'Schema', "Waarom die moeite? Komt er een nieuwe plantenziekte, dan zit het allel voor resistentie misschien in een oud ras. Variatie in de genenpool is een verzekering. Wat weg is, krijg je niet terug.",
   "Een akker met één ras wordt grijs door een ziekte; één plant uit een oud zaadpotje blijft groen.")
SAM = 'Samenvatting'
sc('e4s31', SAM, 'Schema', "Een antibioticum doodt bacteriën, geen virussen. Daarom helpt het niet tegen griep. Maar overal waar het komt, selecteert het: de resistente bacteriën blijven over, en plasmiden kunnen resistentie doorgeven aan andere soorten. Bij honden en kool kiest de mens met opzet. In alle gevallen verandert dezelfde pot: de mens bepaalt welke allelen vaker worden. In het Resistentielab zie je het zelf gebeuren.",
   "Drie tegels bouwen op: bacteriën, honden, kool; onder elke tegel dezelfde pot met een schuivende allelbalk.")
sc('e4s32', SAM, 'Schema', "", "Eindkaart: drie kernzinnen met een groene annotatiehaak en de tip Resistentielab.")

KZ = [
 "Haak 'maak je kuur af': verwoord als het huidige advies (neem het zoals je arts het voorschrijft, eerder stoppen alleen in overleg, restje terug naar de apotheek). Bronnen: RIVM-IB 2017 (Ott) en BMJ 2017. Thuisarts zelf heb ik niet over de kuurduur kunnen lezen (pagina gaf het niet); NHG-formulering niet gecontroleerd.",
 "Puzzel A gekozen (seriebrief). B (rashonden) en C (oude rassen) komen terug als vraag e4q27 en in H5.",
 "Vijf hoofdstukken: de brief vraagt resistentie, plasmiden, kunstmatige selectie én inteelt/genenbank. Daardoor 8,4 min; dit is aan de bovenkant. Inkorten kan door e4s20 (ziekenhuis) of e4s30 te schrappen.",
 "Griep: de film zegt dat het antibioticum in je darmen selecteert. Dat klopt, maar de kijker kan denken dat elke kuur je darmen 'resistent maakt'; ik zeg 'een paar resistente bacteriën' en 'krijgen een voordeel', geen garantie.",
 "Hond: honden stammen af van een (mogelijk uitgestorven) wolvenpopulatie van toen, niet van de wolf van nu (Freedman e.a. 2014). Daarom 'wolven uit die tijd'; de huidige wolf in beeld is een neef. Zeg nooit 'de hond stamt af van de wolf van nu'.",
 "Inteelt-getal: Bannasch 2021 vond gemiddeld F ≈ 0,25 = het niveau van een nakomeling van broer × zus. UC Davis-persbericht formuleert het als 'net zo verwant als broers en zussen'; ik koos de precieze vorm (pup van broer en zus).",
 "Plasmide-overdracht heet conjugatie; dat woord laat ik weg (staat niet in de CE-syllabus). Ook transformatie en transductie blijven weg.",
 "MRSA bewust níét genoemd: het mecA-gen ligt bij MRSA op een chromosomaal element (SCCmec), niet op een plasmide; als voorbeeld van 'de pot lekt' zou het misleiden. ESBL wél (genen op plasmiden, ook tussen soorten; RIVM).",
 "Resistentielab: in index.html staat de tool nog zonder href ('bij film 6' van de oude reeks). De vertelling noemt hem; de link moet nog worden gezet.",
 "Generatietijd 20 min geldt voor het lab; in de darm delen bacteriën veel trager (uren). De film zegt 'onder ideale omstandigheden'.",
 "Niet zeggen (bronnenonderzoek): 'bacteriën worden immuun / wennen aan het antibioticum'; 'het antibioticum veroorzaakt de mutatie'; 'stop altijd zodra je je beter voelt' (geldt niet voor elke infectie); 'een kuur afmaken voorkomt resistentie' (geen bewijs); 'MRSA springt via plasmiden over'; 'Svalbard bewaart alle zaden van de wereld' (het is een reservekopie); 'de chihuahua is door één mutatie ontstaan'; 'inteelt geeft meer mutaties'; 'de hond stamt af van de huidige grijze wolf'.",
 "Wilde kool groeit niet in Nederland (wel langs de Kanaalkust en Helgoland); daarom 'kalkkliffen langs het Kanaal'.",
 "Hond en wolf komen ook in film 6 terug (soortbegrip). Dat wijkt af van 'elke casus in één film', maar de seriebrief vraagt het zelf (film 4: hondenrassen; film 6 puzzel B). Film 4 gebruikt ze voor kunstmatige selectie, film 6 alleen voor de definitie; dezelfde tekeningen.",
 "Vragen uit nagelopen: geen zin na een vraag verwijst naar de vraag; elke eerste zin zegt de inhoud opnieuw.",
 "Look: apotheek en spreekkamer (e4s01, e4s07, e4s15, e4s26) in Schema (biologie en samenleving, personen + iconen), niet Macro; bacteriën Micro; wolf/honden en de akker Macro-nacht.",
 "Telpoppetjes: geen. Personages: Opa Henk (patiënt), Apotheker Ravi, Dr. Kim, Dierenarts Mila. Veehouder Gerrit niet nodig in deze film."]
tw = lambda s: len(re.findall(r"[\wÀ-ÿ'’,.\-]+", s)) if s else 0
woorden = sum(tw(x['tekst']) for x in S)
nq = sum(1 for x in S if x['id'][2] == 'q') ; nh = 5
basis = woorden / 140 + (nq * 10 + nh * 4 + 8) / 60
F = {"film": 4, "titel": "De mens als selectiefactor", "slug": "4-de-mens-als-selectiefactor",
 "puzzel": "Waarom helpt een antibioticum niet tegen griep, maar maakt het wel resistentie?",
 "haak": "\"Maak je antibioticakuur af\": Opa Henk haalt een kuur op bij apotheker Ravi. Het advies is intussen bijgesteld: neem het zoals je arts het voorschrijft.",
 "duur": {"basis_min": round(basis, 1), "met_vwo_min": round(basis, 1), "woorden": woorden},
 "hoofdstukken": [
  {"nr": 1, "titel": "Bacteriën evolueren snel", "minivraag": "Waarom gaat evolutie bij bacteriën zo snel?", "type": "F", "look": "Micro"},
  {"nr": 2, "titel": "Het antibioticum kiest", "minivraag": "Wie blijft er over als het antibioticum komt?", "type": "F", "look": "Micro"},
  {"nr": 3, "titel": "De pot lekt", "minivraag": "Kan resistentie overspringen naar een andere soort?", "type": "A", "look": "Micro"},
  {"nr": 4, "titel": "De mens kiest", "minivraag": "Hoe wordt een wolf een chihuahua?", "type": "F", "look": "Macro"},
  {"nr": 5, "titel": "Inteelt en de genenbank", "minivraag": "Waarom hebben rashonden vaker erfelijke ziekten?", "type": "I", "look": "Schema"}],
 "scenes": S,
 "checkvragen": [
  {"niveau": "basis", "vraag": "Leg uit waarom bacteriën sneller evolueren dan mensen.", "antwoord": "Ze hebben een korte generatietijd en zijn met enorm veel; daardoor ontstaan per tijdseenheid meer mutaties en vindt vaker selectie plaats."},
  {"niveau": "basis", "vraag": "Een leerling zegt: 'De bacteriën zijn aan het antibioticum gewend geraakt.' Verbeter deze zin.", "antwoord": "Bacteriën worden niet zelf immuun. Er waren al (door toevallige mutaties) resistente bacteriën; het antibioticum doodt de gevoelige, de resistente overleven en vermenigvuldigen zich, zodat het resistentie-allel vaker voorkomt."},
  {"niveau": "basis", "vraag": "Waarom kan een antibioticum tegen griep toch resistentie bevorderen?", "antwoord": "Het werkt niet tegen het griepvirus, maar wel op de bacteriën in je lichaam (darmen); daar doodt het gevoelige bacteriën, zodat resistente bacteriën een selectievoordeel krijgen."},
  {"niveau": "basis", "vraag": "Hoe kan een resistentiegen terechtkomen in een andere bacteriesoort?", "antwoord": "Via een plasmide: een bacterie geeft een kopie van een plasmide met het resistentiegen door aan een andere bacterie, ook van een andere soort."},
  {"niveau": "basis", "vraag": "Wat is het verschil tussen natuurlijke en kunstmatige selectie?", "antwoord": "Het mechanisme is hetzelfde; bij kunstmatige selectie bepaalt de mens (fokker, veredelaar) welke individuen zich voortplanten, bij natuurlijke selectie de omgeving."},
  {"niveau": "basis", "vraag": "Leg uit waarom inteelt leidt tot meer erfelijke ziekten. Noem ook wat inteelt níét doet.", "antwoord": "Verwante ouders dragen vaker hetzelfde (schadelijke, recessieve) allel, zodat nakomelingen vaker homozygoot zijn en de ziekte tot uiting komt. Inteelt veroorzaakt geen extra mutaties en verandert de allelfrequentie niet."},
  {"niveau": "basis", "vraag": "Waarom bewaart een genenbank zaden van oude rassen?", "antwoord": "Om genetische variatie te bewaren: daarin kunnen allelen zitten (bv. resistentie tegen een nieuwe ziekte) die moderne rassen niet meer hebben."}],
 "begrippen": [
  {"begrip": "generatietijd", "uitleg": "De tijd tussen het ontstaan van een individu en het moment dat het zelf nakomelingen krijgt; bij bacteriën de tijd tussen twee delingen.", "niveau": "basis"},
  {"begrip": "antibioticaresistentie", "uitleg": "Een bacterie is resistent als een antibioticum haar niet meer doodt of remt. Resistentie ontstaat in een populatie door selectie van bacteriën die al een resistentie-allel hadden.", "niveau": "basis"},
  {"begrip": "selectiedruk", "uitleg": "Een factor in de omgeving die bepaalt welke individuen meer nakomelingen krijgen, hier het antibioticum.", "niveau": "basis"},
  {"begrip": "plasmide", "uitleg": "Klein, ringvormig DNA-molecuul in een bacterie, naast het grote DNA-molecuul. Kan als kopie worden doorgegeven aan een andere bacterie, ook van een andere soort.", "niveau": "basis"},
  {"begrip": "kunstmatige selectie", "uitleg": "Selectie waarbij de mens bepaalt welke individuen zich voortplanten, waardoor gewenste allelen vaker worden. Bij planten heet het veredeling.", "niveau": "basis"},
  {"begrip": "veredeling", "uitleg": "Het verbeteren van planten (of dieren) voor de mens door kunstmatige selectie en gericht kruisen.", "niveau": "basis"},
  {"begrip": "ras", "uitleg": "Groep binnen één soort met eigen erfelijke kenmerken, ontstaan door kunstmatige selectie.", "niveau": "basis"},
  {"begrip": "inteelt", "uitleg": "Voortplanting tussen verwante individuen; geeft meer homozygote nakomelingen, waardoor schadelijke recessieve allelen vaker tot uiting komen.", "niveau": "basis"},
  {"begrip": "genenbank", "uitleg": "Instelling die zaden of ander erfelijk materiaal van rassen en wilde verwanten bewaart om genetische variatie te behouden.", "niveau": "basis"}],
 "getallen": [
  {"waarde": "E. coli kan onder ideale omstandigheden elke ±20 minuten delen (LB-medium, 37 °C); in de darm veel trager", "bron": "BioNumbers 103514 (Harvard); generatietijd darm niet genoemd in film"},
  {"waarde": "tienduizenden miljarden bacteriën in je lichaam (3,8 × 10¹³, vrijwel allemaal in de dikke darm)", "bron": "Sender, Fuchs & Milo 2016, PLoS Biology; BioNumbers 113000"},
  {"waarde": "mensengeneratie ±30 jaar; bacterie 'tientallen generaties per dag' (72 bij 20 min, alleen in het lab)", "bron": "afgeleid van BioNumbers 103514"},
  {"waarde": "resistentie bestond al vóór antibiotica (resistentiegenen in 30.000 jaar oude permafrost)", "bron": "D'Costa e.a. 2011, Nature 477 (niet in de film gezegd, achtergrond docent)"},
  {"waarde": "'maak je kuur af' heeft geen bewijs als middel tegen resistentie; langer gebruik bevordert resistentie; bij twijfel overleggen met arts", "bron": "RIVM Infectieziekten Bulletin 2017 (A. Ott, 'Een hardnekkige misvatting'); Llewelyn e.a. 2017, BMJ 358:j3418; NOS 2017"},
  {"waarde": "antibiotica helpen niet tegen virussen", "bron": "Thuisarts.nl, Antibiotica"},
  {"waarde": "ESBL: enzymen die penicillines en cefalosporines afbreken; vooral in E. coli en Klebsiella; genen op plasmiden die tussen (ook verschillende) soorten overgaan", "bron": "RIVM, Veelgestelde vragen over ESBL's"},
  {"waarde": "honden minstens 15.000 jaar gedomesticeerd (mogelijk 20.000–40.000)", "bron": "UC Davis Veterinary Genetics Laboratory, 'Rise of the modern dog'; Botigué e.a. 2017, Nature Communications"},
  {"waarde": "veel rassen pas ±200 jaar oud (doelgericht fokken vanaf de 19e eeuw)", "bron": "UC Davis VGL, idem"},
  {"waarde": "gemiddelde inteeltcoëfficiënt in 227 rassen ±25%, gelijk aan volle broer en zus; meer inteelt = meer ziekte", "bron": "Bannasch e.a. 2021, Canine Medicine and Genetics; persbericht UC Davis"},
  {"waarde": "wilde kool: kalkkliffen langs het Kanaal (Fr., GB, Spanje); boerenkool = blad, sluitkool = eindknop, spruitjes = zijknoppen, koolrabi = stengel, broccoli/bloemkool = bloeiwijze", "bron": "Wikipedia 'Brassica oleracea' (met bronnen: Maggioni e.a.)"},
  {"waarde": "CGN Wageningen bewaart zaden bij −20 °C; ±24.000 monsters; in 2008 18.000 monsters naar Svalbard", "bron": "WUR / Vroege Vogels 'Koud zaad'; getal 24.000 niet in de film"},
  {"waarde": "Svalbard Global Seed Vault: meer dan 1,3 miljoen zaadmonsters", "bron": "Crop Trust jaarverslag 2024; seedvault.no okt 2025"}],
 "uitspraak": [
  {"woord": "E. coli", "invoer": "E. kóólie", "ipa": "/e ˈkoː.li/", "bron": "UITSPRAAK.md (goedgekeurd eleven_v3); bij v4 testen"},
  {"woord": "plasmide / plasmiden", "invoer": "plasmide", "ipa": "/plɑsˈmi.də/", "bron": "woorden.org (betekenis); klemtoon naar analogie van 'chromatide'; wachtlijst"},
  {"woord": "ESBL", "invoer": "E-S-B-L", "ipa": "/e ɛs be ɛl/", "bron": "Nederlandse letternamen, zoals E-E-G; wachtlijst"},
  {"woord": "Klebsiella", "invoer": "Klebsiella", "ipa": "/klɛp.siˈjɛ.lɑ/", "bron": "geen Nederlandse woordenboekbron gevonden; twijfel, wachtlijst"},
  {"woord": "koolrabi", "invoer": "koolrabi", "ipa": "/koːlˈraː.bi/", "bron": "Van Dale (klemtoon op ra); wachtlijst"},
  {"woord": "chihuahua", "invoer": "chihuahua", "ipa": "/tʃiˈwɑ.wɑ/", "bron": "Spaans leenwoord; wachtlijst"},
  {"woord": "Spitsbergen", "invoer": "Spitsbergen", "ipa": "/ˈspɪts.bɛr.ɣə(n)/", "bron": "gewone spelling"},
  {"woord": "homozygoot", "invoer": "homozygoot", "ipa": "/ˌɦoː.moː.ziˈɣoːt/", "bron": "archief A8 noemde 'homozie-goot' als risico; v4 eerst gewone spelling"},
  {"woord": "penicillines", "invoer": "penicillines", "ipa": "/ˌpe.ni.siˈli.nəs/", "bron": "UITSPRAAK.md: -ine-uitgangen bij v4 gewoon"}],
 "nieuw_in_bibliotheek": [
  "viervoeter(ctx, x, y, s, P, o) — skeletgebaseerde viervoeter (gewrichtsketens, knie hoog/hiel laag), maten in schofthoogte, s = px per cm; gedeeld met film 6",
  "wolf(), hond(ras) — wolf (80 cm) en vier rassen op schaal: herder 62, teckel 23, mops 29, chihuahua 20 cm",
  "bacterie(ctx, x, y, len, rot, {type, plasmide, dood, deling, focus}) — E. coli-staafje met dubbele wand, ribosomen, nucleoïde, zweepdraden; gevoelig teal, resistent oker",
  "plasmideRing(), pilus() — plasmide met resistentiegen (oker boog) en overdracht via geslachtsdraad",
  "antibioticum() — bètalactam-molecuul (vierring + vijfring) in koraal; griepVirus() — envelop met uitsteeksels",
  "petrischaal() — schaal met kolonies en antibioticumschijfje (remzone)",
  "kool(soort) — wilde kool met kruisbloemen en zeven groenten (boerenkool, sluitkool, rode kool, spruitjes, koolrabi, broccoli, bloemkool)",
  "genenbankRek(), zaadPotje() — vriesrek met zaadmonsters; ziekenhuisIcoon(), medicijnDoosje()"],
 "keuzes_en_twijfels": KZ}
cnt = 0
for x in S:
    cnt += 1; x['id'] = 'e4' + ('q' if x['id'][2] == 'q' else 's') + '%02d' % cnt
json.dump(F, open('/home/claude/evo2/films/f4.json', 'w'), ensure_ascii=False, indent=1)
print(woorden, nq, round(basis, 2))
