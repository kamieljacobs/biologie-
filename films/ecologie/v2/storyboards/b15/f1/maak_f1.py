"""Bouwt films/f1.json (Ecologie v2 · film 1 Hoeveel passen er?) en telt woorden/duur."""
import json, re, os
S = []
def sc(id, hfst, look, tekst, beweging, laag='basis', **kw):
    d = dict(id=id, hoofdstuk=hfst, laag=laag, look=look, tekst=tekst, beweging=beweging); d.update(kw); S.append(d)
def q(id, hfst, vraag, opties, juist, laag='basis', **kw):
    sc(id, hfst, 'Schema', 'Wat denk je? ' + vraag, 'Vraagkaart met aftellijn.', laag, opties=' · '.join(f'{"ABCD"[i]} {o}' for i, o in enumerate(opties)), juist=juist, **kw)

O, H1, H2, H3, H4, H5, R = 'Opening', 'H1 Wie tel je mee?', 'H2 Erbij en eraf', 'H3 Steeds sneller', 'H4 Wanneer is het vol?', 'H5 Wat houdt het aantal in toom?', 'Samenvatting'
sc('e1s01', O, 'Macro', 'Een boer loopt langs de sloot naast zijn weiland. Een wilg is omgeknaagd. Twintig jaar geleden zat hier geen bever.',
   'Schemer; de boer loopt het beeld in en blijft staan bij de stomp met de typische zandlopervorm; spaanders in het gras.')
sc('e1s02', O, 'Macro', 'Nu vind je in steeds meer sloten knaagsporen. Komen er elk jaar meer bij? Hoeveel bevers passen er eigenlijk in Nederland?',
   'Een bever zwemt door de sloot, alleen kop en rug boven water, een V-spoor achter zich; de boer kijkt.')
sc('e1s03', O, 'Schema', '', 'Titelkaart: titel en puzzel; rechts een knagende bever.')
sc('e1s04', H1, 'Macro', 'In het jaar 1826 werd in Nederland de laatste bever gedood. In het jaar 1988 gaat in de Biesbosch een kist open. Er zit een bever in, gevangen in Duitsland. Tot het jaar 1991 komen er tweeënveertig.',
   'Een houten transportkist op de oever; het deksel staat open, een bever loopt over de rand het water in.')
sc('e1s05', H1, 'Macro', 'Al die bevers in de Biesbosch samen vormen een populatie: dieren van één soort, in één gebied, die zich onderling voortplanten. Hoeveel het er zijn, is de populatiegrootte. Hoeveel er op een stuk leefgebied wonen, is de populatiedichtheid. Bij bevers tel je die vaak per kilometer oever.',
   'Een kreek met bevers langs de oever; een gouden maatlat van één kilometer schuift langs de oever en telt de bevers erin.')
sc('e1s06', H1, 'Macro', "Maar tellen is lastig. Bevers zijn 's nachts actief. Ze wonen in een burcht met de ingang onder water. Je kunt bewoonde burchten tellen, en knaagsporen. Of je laat de bevers zelf iets achterlaten.",
   'Doorsnede van een oever met een burcht: hoop takken boven water, woonkamer boven de waterlijn, gang naar een ingang onder water.',
   twijfel='De beverburcht met doorsnede is een nieuwe tekening voor de bibliotheek (ook gebruikt in H5).', waarom='Nieuwe bibliotheektekeningen keurt Kamiel; er was geen referentieplaat van een burcht.')
sc('e1s07', H1, 'Macro', 'Daarbij helpen gewone mensen mee. Ziet een boer knaagsporen aan zijn sloot, dan meldt hij dat met zijn telefoon, met een foto en de plek. Al die meldingen samen laten zien waar bevers wonen. Hoeveel het er precies zijn, zie je er niet aan.',
   'De boer hurkt bij de stomp en maakt een foto met zijn telefoon; op een kaartje ernaast verschijnt een stip bij zijn sloot, daarna veel stippen langs de rivieren.')
sc('e1s08', H1, 'Schema', 'In een haar of een keutel zit DNA. Elk dier heeft zijn eigen DNA-profiel. Zo herken je een bever, zonder hem te vangen of te zien.',
   'Een haar aan een draadje over een beverwissel; ernaast verschijnen drie DNA-profielen als streepjescodes, één per bever.')
sc('e1s09', H1, 'Schema', 'Een onderzoeker verzamelt in een gebied haren. Ze vindt veertig verschillende bevers. Een maand later doet ze het nog eens. Nu vindt ze dertig bevers. Twaalf daarvan kende ze al.',
   'Ronde 1: veertig bevericoontjes krijgen een gouden merkje; ronde 2: dertig icoontjes, waarvan twaalf met merkje.')
q('e1q10', H1, 'Hoeveel bevers leven er ongeveer in dit gebied?', ['Zeventig', 'Honderd', 'Achtenvijftig'], 'B')
sc('e1s11', H1, 'Schema', 'Kijk naar de tweede ronde. Twaalf van de dertig bevers waren al bekend: twee op de vijf. Dan is waarschijnlijk ook twee op de vijf van álle bevers bekend. Veertig bekende bevers zijn dus twee vijfde van de populatie. Dan leven er ongeveer honderd. Dit heet vangen, merken en terugvangen. Het klopt alleen als er tussen de twee rondes geen bevers bijkomen of verdwijnen, en als elke bever evenveel kans heeft om gevonden te worden.',
   'Twaalf van de dertig lichten goud op; de breuk 12/30 = 2/5 schuift naar 40 = 2/5 van ?; het vraagteken wordt 100.')
sc('e1s12', H2, 'Macro', 'Een beverfamilie is een ouderpaar met de jongen van de laatste twee jaar. Aan het eind van het voorjaar worden er meestal twee of drie jongen geboren. Er gaan ook bevers dood, bijvoorbeeld in het verkeer.',
   'Bij de burcht: twee ouders, twee eenjarigen en drie kleine jongen die het water in glijden.')
sc('e1s13', H2, 'Macro', 'Als ze ongeveer twee jaar oud zijn, verlaten de jongen de familie. Ze zwemmen vaak tien tot twintig kilometer, op zoek naar een eigen stuk oever. Zo kwam er ook een bever in de sloot van de boer.',
   'Een jonge bever zwemt weg van de burcht langs de rivier; een gouden stippellijn volgt hem tot een kaartje met de sloot.')
sc('e1s14', H2, 'Schema', 'Vier dingen veranderen dus de grootte van een populatie. Geboorte en immigratie komen erbij. Sterfte en emigratie gaan eraf. Immigratie is binnenkomen van buiten het gebied, emigratie is vertrekken. De groei is alles wat erbij komt, min alles wat eraf gaat.',
   'Een cirkel "populatie" met vier pijlen: geboorte en immigratie erin (groen), sterfte en emigratie eruit (koraal).')
sc('e1s15', H2, 'Schema', 'Een voorbeeld. Een populatie telt vierhonderd bevers. In een jaar worden er honderdtwintig geboren, en gaan er zestig dood. Er komen tien bevers van buiten bij, en dertig vertrekken.',
   'De vier getallen verschijnen één voor één in een tabel naast de vier pijlen.')
q('e1q16', H2, 'Met hoeveel procent groeit deze populatie in een jaar?', ['Dertig procent', 'Vijftien procent', 'Tien procent'], 'C')
sc('e1s17', H2, 'Schema', 'Tel eerst alles wat erbij komt: honderdtwintig plus tien is honderddertig. Dan alles wat eraf gaat: zestig plus dertig is negentig. Er komen veertig bevers bij. Veertig van de vierhonderd is tien procent. Dat is de groeisnelheid: de groei in een jaar, als deel van de populatie aan het begin.',
   'De tabel rekent zichtbaar: 130 − 90 = 40; 40 / 400 = 10 %.')
sc('e1s18', H3, 'Schema', 'Zet de schattingen voor heel Nederland in een grafiek. In het jaar 2000 tellen ze er ongeveer honderddertig. In het jaar 2004 minstens tweehonderdtwintig.',
   'Assen met jaartallen 1985–2025; de eerste twee punten verschijnen laag bij de x-as.')
sc('e1s19', H3, 'Schema', 'In het jaar 2019 zijn het er ongeveer drieënhalfduizend. In het jaar 2023 ongeveer zesduizend. De lijn loopt steeds steiler omhoog.',
   'Twee punten hoog rechts; een goudgele lijn trekt zich door alle punten en buigt steil omhoog.')
sc('e1s20', H3, 'Schema', 'Hoe komt dat? Elk jaar groeit de populatie met ongeveer hetzelfde percentage. Tussen het jaar 1995 en 2012 was dat ongeveer twintig procent per jaar. Twintig procent van tweehonderd is veertig bevers. Twintig procent van tweeduizend is vierhonderd. Hoe meer bevers, hoe meer jongen erbij. Dit heet exponentiële groei. De grafiek krijgt de vorm van een J: een J-curve.',
   'Twee trapjes onder de lijn: bij 200 een kort trapje (+40), bij 2000 een hoog trapje (+400); de lijn krijgt de letter J als silhouet.')
q('e1q21', H3, 'Een populatie groeit elk jaar met twintig procent. Na hoeveel jaar is ze ongeveer twee keer zo groot?', ['Na ongeveer vier jaar', 'Na vijf jaar', 'Na tien jaar'], 'A')
sc('e1s22', H3, 'Schema', 'Bij twintig procent groei per jaar worden honderd bevers er na een jaar honderdtwintig. Daarna honderdvierenveertig, honderddrieënzeventig en tweehonderdzeven. Na vier jaar is het al meer dan het dubbele. Daar is een vuistregel voor: de regel van zeventig. Deel zeventig door de groeisnelheid in procenten. Zeventig gedeeld door twintig is drie en een half jaar. Dat is de verdubbelingstijd. Bij snelle groei geeft de regel iets te weinig: precies is het bijna vier jaar.',
   'Vier staven groeien naast elkaar (100, 120, 144, 173, 207); een gouden streep op 200 wordt in jaar 4 gepasseerd.')
sc('e1s23', H3, 'Schema', 'Lees de echte lijn nog eens. Het zijn schattingen, gemaakt met verschillende methoden. Van het jaar 2004 tot 2019 groeide het aantal bevers met ongeveer twintig procent per jaar. Van het jaar 2019 tot 2023 met ongeveer veertien procent per jaar.',
   'Op de nationale grafiek kleurt het stuk 2019–2023 goud; twee labels: "± 20 % per jaar" bij 2004–2019 en "± 14 % per jaar" bij 2019–2023.')
q('e1q24', H3, 'Welke conclusie mag je uit deze gegevens trekken?', ['In het jaar 2023 is de draagkracht van Nederland bereikt', 'Het aantal bevers groeit nog, maar met een lager percentage dan eerder', 'Na het jaar 2019 komen er geen bevers meer bij'], 'B')
sc('e1s25', H3, 'Schema', 'Het aantal stijgt nog steeds, met honderden bevers per jaar. Alleen het percentage is lager geworden. Dat de draagkracht van heel Nederland al bereikt is, staat niet in deze gegevens. Wel zie je dat de groei iets afremt.',
   'Het gouden stuk lijn blijft stijgen; een grijs label "draagkracht?" boven de grafiek blijft een vraagteken.')
sc('e1s26', H4, 'Macro', 'Een territorium markeert een bever met geurhoopjes van modder en bevergeil langs de oever. Een vreemde bever die daar aankomt, wordt weggejaagd. Er is dus niet alleen voedsel nodig, maar vooral een eigen stuk oever.',
   'Een bever schraapt een hoopje modder op de oever; verderop draait een jonge bever om en zwemt weg.')
sc('e1s27', H4, 'Macro', 'Kijk nu naar één gebied: de Millingerwaard, in de Gelderse Poort bij Nijmegen. Een beverfamilie verdedigt een stuk oever: haar territorium. Rond het jaar 2005 waren daar alle geschikte oevers bezet.',
   'Een rivierlandschap van boven als kaart-in-Macro: langs de oevers negen gekleurde stukken, elk met een burcht; geen gat meer over.')
q('e1q28', H4, 'Alle oevers zijn bezet. Wat gebeurt er de jaren daarna met het aantal bevers in dit gebied?', ['Het groeit door tot alle wilgen op zijn', 'Het zakt naar nul', 'Het blijft ongeveer gelijk'], 'C')
sc('e1s29', H4, 'Schema', 'Na het jaar 2005 bleef het aantal volwassen bevers daar ongeveer gelijk: zo\'n achttien, in negen territoria. Er worden nog steeds jongen geboren. Maar er is geen plek meer voor een nieuwe familie. Jonge bevers trekken weg, of ze sterven. Het grootste aantal dat een gebied op lange termijn kan onderhouden, heet de draagkracht.',
   'De lijn van dit gebied stijgt en wordt vlak bij een gouden stippellijn "draagkracht"; kleine pijltjes "weg" verlaten het gebied.')
sc('e1s30', H4, 'Schema', 'Eerst groeit het aantal snel, dan langzamer, dan niet meer. De lijn krijgt de vorm van een S. Dit heet logistische groei: een S-curve. Een populatie groeit dus niet door tot alles op is. Ze groeit tot de draagkracht.',
   'Naast de J verschijnt de S, met dezelfde start; de S buigt af onder de draagkrachtlijn. Label "model".')
sc('e1s31', H4, 'Schema', 'Soms schiet een populatie eerst over de draagkracht heen. Dat heet overshoot. Er zijn dan meer dieren dan het gebied kan voeden. Er sterven er meer, en er worden minder jongen geboren. Dan zakt het aantal weer terug.',
   'Een tweede modellijn schiet boven de draagkrachtlijn uit, het stuk erboven kleurt koraal, en zakt terug.')
sc('e1s32', H5, 'Schema', 'Waardoor remt de groei af? Sommige factoren worden sterker naarmate er meer dieren in een gebied wonen. Minder plek voor een territorium. Minder voedsel per dier. Ziekte die makkelijker overspringt. Dat zijn dichtheidsafhankelijke factoren.',
   'Links een oever met weinig bevers, rechts dezelfde oever vol; bij "vol" verschijnen drie pictogrammen (territorium, wilg, ziekte).')
q('e1q33', H5, 'Een hoogwater in het voorjaar verdrinkt jonge bevers in hun burcht. Wat voor factor is dat?', ['Dichtheidsafhankelijk: bij meer bevers gaan er meer dood', 'Dichtheidsonafhankelijk: het treft hetzelfde deel, hoeveel bevers er ook zijn', 'Biotisch: het gaat over bevers'], 'B')
sc('e1s34', H5, 'Macro', 'Hoog water houdt geen rekening met het aantal bevers. Het treft een vast deel van de jongen, of er nu weinig of veel zijn. Zo\'n factor heet dichtheidsonafhankelijk. Een strenge winter is er ook een.',
   'Het water in de doorsnede van de burcht stijgt tot boven de woonkamer; één ouder zwemt met een jong naar boven.')
sc('e1s35', H5, 'Schema', 'De dichtheidsafhankelijke factoren duwen het aantal omlaag als het hoog is, en laten het groeien als het laag is. Dat heet populatieregulatie. Het aantal schommelt rond de draagkracht. Die beweging heet dynamiek. Blijft het over de jaren rond hetzelfde niveau, dan is er een biologisch evenwicht.',
   'De vlakke S-lijn golft rustig om de draagkrachtlijn; twee kleine pijlen (omlaag boven, omhoog onder) duwen hem terug.')
sc('e1s36', H5, 'Macro', 'Mensen kunnen een populatie helpen. Een stuw of een drukke weg is een barrière: jonge bevers komen er niet langs. Een loopplank langs de stuw heft die barrière op. Dan bereiken ze nieuwe oevers. En waar een soort helemaal verdwenen is, kun je hem terugzetten: herintroductie. Zo begon het in de Biesbosch.',
   'Een jonge bever loopt via een plank langs een stuw naar het water erachter; aan de overkant liggen lege oevers.')
# ---- vwo
sc('e1s37', H5, 'Macro', 'Een veldmuis krijgt in een goed jaar elke maand vier tot acht jongen. Die zijn na een maand zelf geslachtsrijp. Een bever krijgt één keer per jaar een paar jongen, en zorgt er twee jaar voor. De veldmuis is een r-strateeg: veel nakomelingen, weinig zorg, snelle groei. De bever is een K-strateeg: weinig nakomelingen, veel zorg, een aantal dicht bij de draagkracht.',
   'Links een veldmuis met een rij jongen, rechts een bever met twee jongen.', laag='vwo',
   twijfel='De veldmuis is een nieuwe tekening voor de bibliotheek (eerst op testvel tv1).', waarom='Een nieuw dier in de bibliotheek keurt Kamiel; er is geen ElevenLabs-plaat van gemaakt.')
sc('e1s38', H5, 'Macro', 'Daarom schieten veldmuizen soms ver over de draagkracht heen. In het jaar 2026 vraten ze in Friesland en Zuid-Holland het gras kaal, op ongeveer achttienduizend hectare. Daarna stort zo\'n plaag in: door voedselgebrek, ziekte en kou.',
   'Een grasland vol muizengaatjes en kale plekken; de boer kijkt; daarna wordt het veld leeg.', laag='vwo')
sc('e1s39', H5, 'Schema', 'Je kunt ook kijken naar de leeftijdsopbouw: hoeveel dieren er in elke leeftijdsklasse zitten. Een groeiende populatie heeft een brede basis: veel jonge dieren. Een populatie rond de draagkracht heeft een smallere basis. Haar piramide lijkt meer op een zuil.',
   'Twee leeftijdspiramides naast elkaar bouwen zich staaf voor staaf op: links breed onderaan, rechts bijna recht.', laag='vwo')
sc('e1s40', H5, 'Macro', 'Vanaf het jaar 2016 worden in het Markermeer nieuwe eilanden gemaakt: de Marker Wadden. Eerst was er alleen kaal zand en slib. Na vijf jaar telden onderzoekers er al ongeveer vierhonderd soorten. Riet werd gezaaid, maar de meeste soorten kwamen vanzelf: vliegend, met de wind, drijvend, of als slakje aan een vogelpoot.',
   'Kaart van het Markermeer met de eilanden; pijlen van de kust naar de eilanden (vogel, wind, water) verschijnen één voor één.', laag='vwo')
q('e1q41', H5, 'Er komen twee nieuwe eilanden: een groot eiland dicht bij de kust, en een klein eiland ver op zee. Waar leven na twintig jaar de meeste soorten?', ['Op het grote eiland dichtbij', 'Op het kleine eiland ver weg', 'Op allebei evenveel: na twintig jaar heeft elke soort ze bereikt'], 'A', laag='vwo')
sc('e1s42', H5, 'Schema', 'Op een eiland vestigen zich steeds nieuwe soorten, en er sterven ook soorten uit. Dicht bij de kust komen er meer nieuwe soorten aan. Op een groot eiland zijn de populaties groter, dus sterven er minder uit. Waar vestigen en uitsterven even snel gaan, blijft het aantal soorten gelijk. Dit is de eilandtheorie. Een klein, ver eiland heeft de minste soorten.',
   'Twee lijnen in één grafiek: vestigen daalt, uitsterven stijgt; het snijpunt schuift naar rechts voor groot/dichtbij en naar links voor klein/ver.', laag='vwo')
sc('e1s43', H5, 'Schema', 'Immigratie helpt ook binnen één soort. In een kleine populatie verdwijnen door toeval allelen, en verwante dieren paren vaker met elkaar. Een dier van buiten brengt nieuwe allelen mee. Hoe dat werkt, zie je in de films over toeval en inteelt in de evolutiereeks. Terug naar de bevers in heel Nederland.',
   'Twee kleine beverpopulaties als potjes met gekleurde knikkers; één bever zwemt over, zijn knikker valt in het andere potje.', laag='vwo')
# ---- samenvatting
sc('e1s44', R, 'Schema', 'Hoeveel bevers passen er dus in Nederland? Dat hangt af van de draagkracht: hoeveel geschikte oever er is, en hoeveel oever een familie nodig heeft. Een familie gebruikt meestal twee tot vier kilometer oever. Waar het heel geschikt is, minder dan één. Een familie telt meestal vier tot zes bevers.',
   'Een oeverlijn als lint, in stukken verdeeld; in elk stuk een beverfamilie-icoontje.')
sc('e1s45', R, 'Schema', 'Een rekenvoorbeeld met twee aannames. Een familie heeft twee kilometer oever nodig, en telt ongeveer vijf bevers. Is er drieduizend kilometer geschikte oever, dan passen er vijftienhonderd families: ongeveer zevenduizendvijfhonderd bevers. Is er zesduizend kilometer, dan ongeveer vijftienduizend. Het antwoord hangt dus af van hoeveel geschikte oever er echt is.',
   'Twee rekensommen onder elkaar: 3000 km ÷ 2 km × 5 ≈ 7500 en 6000 km ÷ 2 km × 5 ≈ 15 000; label "rekenvoorbeeld, aangenomen getallen".',
   twijfel='Het antwoord op de puzzel rust op aangenomen oeverlengtes (3000 en 6000 km); er is geen gepubliceerde schatting van de landelijke draagkracht gevonden.', waarom='Of een rekenvoorbeeld met aangenomen getallen goed genoeg is als antwoord op de titelvraag, is een didactische keuze voor Kamiel.')
sc('e1s46', R, 'Macro', 'De lijn voor heel Nederland stijgt nog. Maar waar het al vol is, zoals in de Millingerwaard, zie je de S. Zo gaat het ook langs de sloot van de boer, als de oevers daar vol raken. Een populatie groeit niet eeuwig door. Ze groeit tot de draagkracht, en schommelt daar omheen.',
   'Terug bij de sloot in de schemer: de boer kijkt naar de bever die tussen de wilgen zwemt; in de lucht een kleine S-lijn.')
sc('e1s47', R, 'Schema', '', 'Eindkaart met drie kernzinnen en een groene annotatiehaak.')

hoofdstukken = [
 dict(nr=1, titel='Wie tel je mee?', minivraag='Hoe tel je dieren die je bijna nooit ziet?', type='F', look='Macro'),
 dict(nr=2, titel='Erbij en eraf', minivraag='Waardoor wordt een populatie groter of kleiner?', type='F', look='Schema'),
 dict(nr=3, titel='Steeds sneller', minivraag='Waarom loopt de lijn steeds steiler?', type='F', look='Schema'),
 dict(nr=4, titel='Wanneer is het vol?', minivraag='Wat gebeurt er als alle plekken bezet zijn?', type='F', look='Schema'),
 dict(nr=5, titel='Wat houdt het aantal in toom?', minivraag='Welke factoren remmen de groei, en welke niet?', type='F', look='Schema')]

checkvragen = [
 dict(niveau='basis', vraag='In een gebied worden 60 haren met verschillende DNA-profielen gevonden. Een maand later 50, waarvan 20 met een profiel dat al bekend was. Bereken de populatiegrootte en noem één voorwaarde voor deze methode.', antwoord='N = 60 × 50 / 20 = 150 bevers. Voorwaarde: tussen de rondes geen geboorte, sterfte, immigratie of emigratie (gesloten populatie); elk dier evenveel kans om gevonden te worden.'),
 dict(niveau='basis', vraag='Een populatie telt 500 dieren. In een jaar: 150 geboren, 90 dood, 20 immigranten, 30 emigranten. Bereken de groeisnelheid en de verdubbelingstijd met de regel van 70.', antwoord='Groei = (150 + 20) − (90 + 30) = 50; 50 / 500 = 10 % per jaar; verdubbelingstijd ≈ 70 / 10 = 7 jaar.'),
 dict(niveau='basis', vraag='Leg uit waarom het aantal bevers in de Millingerwaard sinds 2005 niet meer groeit, terwijl er elk jaar jongen worden geboren.', antwoord='Alle geschikte oevers zijn bezet (draagkracht bereikt): er is geen plek voor nieuwe territoria. De jongen trekken weg (emigratie) of sterven, dus geboorte + immigratie ≈ sterfte + emigratie.'),
 dict(niveau='basis', vraag='Een strenge winter en een ziekte doden allebei bevers. Welke is dichtheidsafhankelijk? Leg uit.', antwoord='De ziekte: bij een hogere dichtheid is er meer contact, dus springt ze makkelijker over en sterft een groter deel. De strenge winter treft een vast deel, onafhankelijk van de dichtheid.'),
 dict(niveau='basis', vraag='Schets in één diagram een J-curve en een S-curve en geef de draagkracht aan. Leg uit wanneer een populatie volgens de J-curve groeit.', antwoord='J: steeds steiler; S: eerst steil, buigt af naar een horizontale lijn op de draagkracht. J zolang er geen beperkende factoren zijn (veel ruimte en voedsel), bv. kort na een herintroductie.'),
 dict(niveau='vwo', vraag='Is de veldmuis een r- of een K-strateeg? Noem twee kenmerken en leg uit waarom zijn aantal sterk schommelt.', antwoord='r-strateeg: veel jongen per worp, korte generatietijd (na een maand geslachtsrijp), weinig zorg. Door de snelle groei schiet de populatie over de draagkracht heen (overshoot) en stort dan in.'),
 dict(niveau='vwo', vraag='Leg met de eilandtheorie uit waarom een klein eiland ver van de kust de minste soorten heeft.', antwoord='Ver weg: weinig nieuwe soorten komen aan (lage immigratie); klein: kleine populaties sterven makkelijker uit (hoge uitsterfsnelheid). Het evenwicht tussen vestigen en uitsterven ligt dan bij weinig soorten.')]

begrippen = [
 ('populatie', 'Alle individuen van één soort in één gebied die zich onderling voortplanten.', 'basis'),
 ('populatiegrootte', 'Het aantal individuen in een populatie.', 'basis'),
 ('populatiedichtheid', 'Het aantal individuen per oppervlakte (of per kilometer oever) leefgebied.', 'basis'),
 ('vangen, merken en terugvangen', 'Schatting van de populatiegrootte: N = aantal gemerkt × aantal tweede vangst / aantal teruggevangen. Een DNA-profiel uit haar of keutel kan het merk zijn.', 'basis'),
 ('geboorte, sterfte, immigratie, emigratie', 'De vier factoren die de grootte van een populatie veranderen; groei = (geboorte + immigratie) − (sterfte + emigratie).', 'basis'),
 ('groeisnelheid', 'De groei in een jaar als percentage van de populatie aan het begin van dat jaar.', 'basis'),
 ('verdubbelingstijd', 'De tijd waarin een populatie twee keer zo groot wordt; benadering: 70 gedeeld door de groeisnelheid in procenten (regel van 70).', 'basis'),
 ('exponentiële groei (J-curve)', 'Groei met een vast percentage per tijdseenheid: hoe groter de populatie, hoe meer erbij komt.', 'basis'),
 ('logistische groei (S-curve)', 'Groei die afremt en stopt bij de draagkracht.', 'basis'),
 ('draagkracht', 'Het grootste aantal individuen van een soort dat een gebied op lange termijn kan onderhouden.', 'basis'),
 ('territorium', 'Gebied dat een dier of familie verdedigt tegen soortgenoten.', 'basis'),
 ('overshoot', 'Een populatie groeit tijdelijk boven de draagkracht uit en zakt daarna terug.', 'basis'),
 ('dichtheidsafhankelijke factor', 'Factor die sterker werkt naarmate de populatiedichtheid hoger is (voedsel, ruimte, ziekte, concurrentie).', 'basis'),
 ('dichtheidsonafhankelijke factor', 'Factor die werkt onafhankelijk van de dichtheid (hoogwater, strenge winter).', 'basis'),
 ('populatieregulatie', 'Dichtheidsafhankelijke factoren houden een populatie rond de draagkracht.', 'basis'),
 ('dynamiek', 'Het voortdurend schommelen van de populatiegrootte.', 'basis'),
 ('biologisch evenwicht', 'De populatiegrootte schommelt over de jaren rond hetzelfde niveau.', 'basis'),
 ('herintroductie', 'Een soort terugzetten in een gebied waar ze verdwenen was.', 'basis'),
 ('barrière', 'Iets wat dieren tegenhoudt bij het verplaatsen (stuw, weg); opheffen met een passage helpt dieren nieuwe gebieden te bereiken.', 'basis'),
 ('r-strategie', 'Veel nakomelingen, weinig zorg, snelle groei; aantallen schommelen sterk.', 'vwo'),
 ('K-strategie', 'Weinig nakomelingen, veel zorg, populatie dicht bij de draagkracht.', 'vwo'),
 ('leeftijdsopbouw', 'Verdeling van een populatie over leeftijdsklassen; een brede basis wijst op groei.', 'vwo'),
 ('eilandtheorie', 'Het aantal soorten op een eiland is een evenwicht tussen vestigen (hoger dicht bij de bron) en uitsterven (lager op een groot eiland).', 'vwo')]
begrippen = [dict(begrip=b, uitleg=u, niveau=n) for b, u, n in begrippen]

getallen = [
 dict(waarde='laatste bever in Nederland gedood in 1826 (bij de IJssel)', bron='Natura 2000-profiel H1337 Bever (2008); DutchNews 2019'),
 dict(waarde='herintroductie Biesbosch 1988–1991: 42 bevers (39 wild gevangen in Duitsland, 3 uit Natuurpark Lelystad)', bron='Faunabeheerplan Bever Zuid-Holland 2023–2029, p. 20; NIOO-blog 2025 (start 1988)'),
 dict(waarde='landelijk minimaal 128 bevers in 2000, minimaal 220 in maart 2004', bron='Natura 2000-profiel H1337; Niewold 2004, Alterra-rapport 982'),
 dict(waarde='± 3500 bevers in 2019; ± 6000 (ouder dan 1 jaar) in 2023', bron='Faunabeheerplan Bever ZH 2023–2029, p. 21–22; DutchNews 2019; NIOO-blog maart 2025 (± 6000); IPLO 2025 noemt ruim 7000'),
 dict(waarde='groei ± 20 % per jaar in 1995–2012 (zelf nagerekend: 220 → 3500 in 15 jaar = 20 % per jaar)', bron='Faunabeheerplan Bever ZH 2023–2029, p. 24'),
 dict(waarde='worp 1–5 jongen, meestal 2–3 (gemiddeld 2–3), één worp per jaar; draagtijd ± 107 dagen', bron='Faunabeheerplan Bever ZH p. 17 (meestal drie); ARK "Bevers terug" (gemiddeld 2); Wikipedia Eurasian beaver (gemiddeld 3)'),
 dict(waarde='jongen verlaten de familie in het voorjaar aan het eind van hun tweede jaar; familie = ouderpaar + jongen van 2–3 jaar; 4–6 dieren', bron='Faunabeheerplan Bever ZH p. 17; ARK "Bevers terug" (4–6, max 6)'),
 dict(waarde='dispersie meestal 10–20 km, zwemmend tot ± 100 km', bron='Niewold 2004 (Alterra 982); Faunabeheerplan ZH p. 17'),
 dict(waarde='familie gebruikt 2–4 km oever (in Europa tot 10 km; Millingerwaard < 1 km)', bron='ARK "Bevers terug" (2–4 km); Kaandorp & Lange, Zoogdier 21-3 (< 1 km, tot 10 km in Europa)'),
 dict(waarde='Millingerwaard/Kekerdomse Waard: 18 volwassen bevers in 9 territoria (2009), stabiel sinds 2005, draagkracht lijkt bereikt', bron='Kaandorp & Lange, Zoogdier 21-3 (2010) p. 8–11'),
 dict(waarde='Lincoln-Petersen N = nK/k; voorwaarden: gesloten populatie, merken blijven, gelijke vangkans', bron='Wikipedia Mark and recapture'),
 dict(waarde='veldmuis: 6–8 jongen per maand in een gunstig jaar, na ± een maand geslachtsrijp; plaag 2026: zichtbare schade op ± 18 000 ha grasland (Friesland, Zuid-Holland)', bron='WUR-nieuws "Satellietbeelden tonen muizenschade op 18.000 hectare grasland" (2026); Steenuilenoverleg, Uilen 5 (2014); RVO veldmuis (4–7 per worp)'),
 dict(waarde='veldmuisplaag stort in door voedselgebrek, winterweer en ziekte; pieken om de 3–5 jaar', bron='WUR-nieuws 2026; Uilen 5 (2014)'),
 dict(waarde='Marker Wadden: aanleg vanaf 2016 (Boskalis); ± 400 soorten in 2021', bron='Bionieuws 20-10-2018 via EcoShape; NOS 23-6-2023; Vroege Vogels (BNNVARA) 2021'),
 dict(waarde='slakjes kunnen meeliften aan de poten van vogels naar de Marker Wadden', bron='Neckheim & Van Leeuwen, Spirula 424 (2020)'),
 dict(waarde='eilandtheorie: vestigen daalt en uitsterven stijgt met het aantal soorten; dichtbij hogere immigratie, groot eiland lagere extinctie', bron='MacArthur & Wilson 1967 (Wikipedia: The Theory of Island Biogeography); vwo-CE 2025-II vraag 40'),
 dict(waarde='rekenvoorbeeld 3000 en 6000 km geschikte oever, 2 km en 5 bevers per familie: AANGENOMEN getallen, geen bron', bron='geen bron: rekenvoorbeeld (zie twijfel e1s40)')]

uitspraak = [
 dict(woord='Biesbosch', invoer='Biesbosch', ipa='ˈbizbɔs', bron='eigen transcriptie (Nederlandse plaatsnaam, klemtoon op Bies); nl.wiktionary niet bereikbaar vanuit deze sessie'),
 dict(woord='Millingerwaard', invoer='Millingerwaard', ipa='ˈmɪlɪŋərˌʋaːrt', bron='eigen transcriptie; op de wachtlijst'),
 dict(woord='Gelderse Poort', invoer='Gelderse Poort', ipa='ˈɣɛldərsə ˈpoːrt', bron='eigen transcriptie'),
 dict(woord='exponentiële', invoer='exponentiële', ipa='ˌɛks.poː.nɛnˈʃeː.lə', bron='en.wiktionary (mirror) exponentieel: /ˌɛks.poː.nɛnˈʃeːl/; staat al op de wachtlijst (Plek genoeg?)'),
 dict(woord='J-curve', invoer='jee-curve', ipa='ˈjeː ˌkyːrvə', bron='WACHTLIJST.md (Plek genoeg?): voorstel jee-curve; de letter J is /jeː/'),
 dict(woord='S-curve', invoer='es-curve', ipa='ˈɛs ˌkyːrvə', bron='eigen transcriptie, naar analogie van es-vormige (uitspraak.json)'),
 dict(woord='logistische', invoer='logistische', ipa='loːˈɣɪs.ti.sə', bron='eigen transcriptie (klemtoon gis); wiktionary niet bereikbaar'),
 dict(woord='overshoot', invoer='oovershoet', ipa='ˈoːvərʃut', bron='Engels leenwoord (en: /ˈəʊvəʃuːt/); invoer voorkomt een Nederlandse oo-uitspraak; op de wachtlijst'),
 dict(woord='r-strateeg', invoer='er-strateeg', ipa='ˈɛr straˌteːx', bron='eigen transcriptie; de letter r = /ɛr/'),
 dict(woord='K-strateeg', invoer='kaa-strateeg', ipa='ˈkaː straˌteːx', bron='eigen transcriptie; de letter K = /kaː/'),
 dict(woord='Marker Wadden', invoer='Marker Wadden', ipa='ˈmɑrkər ˈʋɑdə(n)', bron='eigen transcriptie'),
 dict(woord='jaartallen', invoer='in het jaar 1988 (cijfers)', ipa='—', bron='Kamiels voorkeur: jaartal als cijfers na "het jaar"')]

data = dict(film=1, titel='Hoeveel passen er?', slug='1-hoeveel-passen-er',
 puzzel='Hoeveel bevers passen er in Nederland? (en: waarom groeit een populatie niet eeuwig door?)',
 haak='Een boer vindt aan zijn sloot een omgeknaagde wilg; twintig jaar geleden zat daar geen bever.',
 hoofdstukken=hoofdstukken, scenes=S, checkvragen=checkvragen, begrippen=begrippen, getallen=getallen, uitspraak=uitspraak,
 nieuw_in_bibliotheek=[
  'e1Veldmuis(ctx, x, y, s, o) — veldmuis (Microtus arvalis) zij-aanzicht, staan/rennen; vlakke uitknipfiguur (niet geanimeerd), testvel tv1 · TWIJFEL',
  'e1Burcht(ctx, x, y, s, o) — beverburcht als takkenhoop met doorsnede (woonkamer, gang, ingang onder water)',
  'e1Wilg(ctx, x, y, s, o) / e1Stomp — knotwilg/schietwilg en een omgeknaagde stomp met zandlopervorm en spaanders',
  'e1Kist — houten transportkist met open deksel',
  'e1Grafiek-helpers: e1As, e1Lijn, e1Punt, e1Piramide, e1Popcirkel (populatie met vier pijlen), e1Profiel (DNA-streepjescode), e1Icoon (beverpictogram voor telgrafieken)',
  'e1KaartMarkermeer — schematische kaart Markermeer met de Marker Wadden'],
 keuzes_en_twijfels=[])
data['b15'] = dict(trekking='Eerste trek: A klassiek · B metafoor, perspectief · C raadsel. Opnieuw getrokken (proefregel P1): een raadsel is een lijstvorm die het concept niet naspeelt. Tweede trek: A klassiek · B volgorde, rol van het personage · C casus.',
 varianten=dict(A='Klassiek: populatie → in en uit → J en S → regulatie en beheer, de bever als lopend voorbeeld.',
                B='Volgorde (grafiek eerst, dan "hoe weet je dat?") en de boer als vrager en waarnemer van de bevers aan zijn sloot.',
                C='Casus: één groeiende grafiek van de Nederlandse bevers van 1988 tot nu; elk hoofdstuk een stuk lijn en een begrip.'),
 scores=dict(A=44, B=51, C=45), max=65, blindlabels=dict(A='Y', B='Z', C='X'), winnaar='B (gecombineerd met C)',
 reden='Duidelijke winst 51-45-44: de boer draagt het concept als castpersonage, elk hoofdstuk heeft een vraag, tabel én grafiek in examenstijl. Zwakste punt van B (methode vóór de groei; geen eindsom) is opgelost met de volgorde van A en de eindsom van C.',
 beoordelaar_model='sonnet',
 overgenomen=['C: de kist van 1988 als opening van H1 en één nationale grafiek met echte schattingen', 'C: de eindsom oever ÷ oever per familie × bevers per familie', 'C: immigratie verrijkt een kleine populatie genetisch (vwo)', 'A: populatie en tellen vóór de groei (volgorde van B teruggedraaid op advies van de beoordelaar)', 'A: de vraag "is hoogwater dichtheidsafhankelijk?"', 'A: rekenvoorbeelden met getallen in plaats van letters', 'beoordelaar: H4 gesplitst in "vol" (S, draagkracht, overshoot) en "in toom" (regulatie, beheer); "in elke sloot" vervangen door "in steeds meer sloten"; oever per familie gecontroleerd (2–4 km, Millingerwaard < 1 km)'])

# ---- tellen
def woorden(t): return len(re.findall(r"[\wÀ-ÿ'’]+", t))
spraak = [s for s in S if s['tekst'] and not re.match(r'e\d+q', s['id'])]
qs = [s for s in S if re.match(r'e\d+q', s['id'])]
wb = sum(woorden(s['tekst']) for s in S if s['laag'] == 'basis')
wv = sum(woorden(s['tekst']) for s in S if s['laag'] == 'vwo')
nqb = sum(1 for s in qs if s['laag'] == 'basis'); nqv = len(qs) - nqb
extra = 8 + 4 * len(hoofdstukken)
basis = wb / 140 * 60 + nqb * 10 + extra; met = (wb + wv) / 140 * 60 + (nqb + nqv) * 10 + extra
data['duur'] = dict(basis_min=round(basis / 60, 1), met_vwo_min=round(met / 60, 1), woorden=wb + wv, woorden_basis=wb, woorden_vwo=wv)
data['keuzes_en_twijfels'] = [
 'Puzzel A gekozen (hoeveel bevers passen er?), B wordt onderweg beantwoord (H4), C (vwo) in het vwo-blok eilandtheorie.',
 'Combinatie B + C na de blinde beoordeling (zie b15). De volgorde van B (grafiek eerst) is teruggedraaid: tellen en in/uit komen vóór de J-curve, zodat elk hoofdstuk op het vorige bouwt.',
 'Rol: boer = Veehouder Gerrit (vaste rol "boer, veehouder"), outfit gewoon, niet bij naam genoemd. De onderzoeker die haren verzamelt staat niet in beeld (geen nieuwe rol voor Dr. Kim of Ecoloog Bas).',
 'Vangen-merken-terugvangen gecombineerd met DNA uit haren ("genetisch merken"), want bevers vang je zelden; zo staan beide spec-methoden in één voorbeeld.',
 'Groeisnelheid 20 % (1995–2012) uit het faunabeheerplan ZH; zelf nagerekend met 220 (2004) → 3500 (2019) = 20 % per jaar. Tussen 2019 en 2023 is het ± 14 % per jaar: de landelijke groei remt al iets af (niet in de vertelling, wel bruikbaar als docentvraag).',
 'De landelijke aantallen komen uit verschillende telmethoden (minimumtellingen 2000/2004, schattingen 2019/2023); IPLO 2025 noemt ruim 7000. In beeld "ongeveer" en het label "schattingen".',
 'Overshoot in H4 als model (geen bevergegevens); het echte voorbeeld van overshoot (veldmuisplaag 2026) staat in het vwo-blok.',
 'Draagkracht in de Millingerwaard rust op één bron (Kaandorp & Lange 2010, met data 2009); de vertelling zegt "rond het jaar 2005" en "zo\'n achttien".',
 'Hoogwater als dichtheidsonafhankelijke factor: zo in de methodes (weer = dichtheidsonafhankelijk); vereenvoudigd, want bij hoge dichtheid liggen meer burchten op slechte plekken.',
 'Vwo-blokken: r/K en leeftijdsopbouw (e1s32–34) en eilandtheorie (e1s35–38) achter elkaar aan het eind van H5, met één regel terug naar de basis (e1s38). Drift en inteelt alleen als verwijzing naar de evolutiereeks.',
 'Afschot van bevers (Limburg) niet in de film: gevoelig en niet in de spec; beheer = barrières opheffen en herintroductie.',
 'Proefregel P2: elke misconceptie uit de spec die hier speelt ("een populatie groeit tot alles op is") is een vraag (e1q23). Begeleider-deel van P2 geldt niet (geen begeleider in deze film).',
 'Techniek: lib_eco.js gebruikt nu ECOK (hoofdredactie); de terugval in teken_eco1.js definieert alleen nog functies die ontbreken. dieren_overig.js geeft zonder teken_evo3.js de melding berkenspanner (onschuldig).',
 'Uitspraak: nl.wiktionary en woorden.org waren niet bereikbaar; IPA deels uit en.wiktionary (mirror), de rest eigen transcriptie: op de wachtlijst.']
data['keuzes_en_twijfels'] += [
 'Herstel na review (MOET 1): e1s30 J- en S-curve nu met dezelfde start en groeisnelheid; de J ligt overal op of boven de S.',
 'Herstel na review (MOET 2): e1s18 "minstens honderddertig" werd "ongeveer honderddertig" (bron: minimaal 128).',
 'Herstel na review (MOET 3): e1s12 jongen glijden het water in, labels staan direct bij ouderpaar en jongen.',
 'Herstel na review (MOET 4): e1s02 boer verplaatst, het Meta-label loopt niet meer over zijn benen.',
 'Herstel na review (KAN): e1s11 voorwaarde gelijke vangkans toegevoegd; e1s22 "schattingen, gemaakt met verschillende methoden"; e1s37 vier tot acht jongen per maand en twee beverjongen in beeld; e1s45 twee scenario\'s (3000 en 6000 km) in plaats van één aanname.']
os.makedirs('/root/eco2/films', exist_ok=True)
json.dump(data, open('/root/eco2/films/f1.json', 'w'), ensure_ascii=False, indent=1)
print('scènes', len(S), 'vragen', len(qs), data['duur'])
