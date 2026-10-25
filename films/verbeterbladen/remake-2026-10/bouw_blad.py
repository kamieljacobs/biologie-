#!/usr/bin/env python3
"""Keuringsblad lichte remakes (25 okt 2026): twijfelscènes van Wat is DNA?, DNA kopiëren, Celdeling,
Geslachtsorganen en puberteit. Bouwt keuringsblad.html uit ../sjabloon.html met de keyframes als data-URI.
Besluiten in db-collectie `besluit` (doc-id = <sleutel>__<id>): doen = voorstel, niet = alternatief, anders = opmerking.
Gebruik: python3 films/verbeterbladen/remake-2026-10/bouw_blad.py
"""
import base64, json, os

HIER = os.path.dirname(os.path.abspath(__file__))
R = os.path.dirname(os.path.dirname(os.path.dirname(HIER)))


def img(film_map, naam):
    p = os.path.join(R, film_map, 'bron/remake-2026-10/keyframes', naam)
    return 'data:image/webp;base64,' + base64.b64encode(open(p, 'rb').read()).decode()


def v(id, kf, soort, twijfel, voorstel, alternatief, omvang='klein'):
    return dict(id=id, kf=kf, soort=soort, omvang=omvang, bron='twijfel', probleem=twijfel,
                voorstel=voorstel, alternatief=alternatief)


FILMS = [
 dict(film='films/dna/1-wat-is-dna.html', map='films/dna/1-wat-is-dna', titel='Wat is DNA?', kort='DNA 1',
  sleutel='dna1', promptversie_nu='prompt v5 → v10',
  advies=dict(aanpak='lichte remake',
   waarom='Basenparing wordt uitgelegd in plaats van beweerd: de basen hebben hun echte vorm, dus je ziet waarom alleen A–T en C–G passen. Doorlopende zoom van Noors buisje tot het molecuul; de havolijn ziet nu ook hoe twee meter DNA in de kern past. Vier vakfouten eruit met A-bronnen (o.a. 3,2 miljard basenparen per set, niet per cel).',
   werk='26 scènes · ± 5:45 havo / 7:35 vwo gesproken (oud 5:30)', credits='± 5.300 (23 takes)'),
  kern=[('k1-kern-dna-rond-eiwitten.webp', 'DNA rond eiwitten in de kern'), ('k2-helix-ontwinden.webp', 'Helix ontwinden'),
        ('k3-nucleotide.webp', 'Nucleotide'), ('k5-ladder-wordt-helix.webp', 'Ladder wordt helix'),
        ('k6-schaal-tennisbal.webp', 'Schaal: tennisbal')],
  voorstellen=[
   v('t1', 't1-opening-noor-dna-in-buisje.webp', 'personage',
     'Nieuwe gebeurtenis voor Noor, die ook in DNA 2 de leerling is. Nieuwe tekeningen (buisje, labtafel). De oude puzzel over een lab dat je naam uitleest valt weg.',
     'Opening: Noor doet het bekende practicum (zout water spoelen, afwasmiddel, koude alcohol) en ziet haar eigen DNA als witte draadjes. Dat kun je in de klas nadoen.',
     'De oude opening met het wattenstaafje, of een figurant in plaats van Noor.'),
   v('t2', 't3-pastest-basen.webp', 'hele DNA-reeks',
     'Geldt voor alle acht DNA-films. DNA 2 tekent de basen nu nog met de oude paarrand (punt en inkeping), DNA 1 met ringen. Twee vormen na elkaar verwart. De paarrand toont een verkeerde reden (puzzelstukje).',
     'Ringvorm in de hele reeks: A en G groot met twee ringen, T en C klein met één, stippen voor de bindingsplekken. DNA 2 past zich aan.',
     'Overal de paarrand houden (dan vervalt de uitleg groot + klein), of ringvorm alleen bij de uitleg in DNA 1 en daarna een eenvoudig staafje.', 'groot'),
   v('t3', 't3-pastest-basen.webp', 'didactiek',
     'De bindingsplekken zijn een vereenvoudiging (de stippen staan niet op de echte plekken). Ik kon niet nagaan of jouw methode voor havo verder gaat dan "A past bij T". Het woord waterstofbrug is nu alleen vwo.',
     'Kernscène: drie kandidaten tegenover een A. G is te breed, C heeft de goede breedte maar de bindingsplekken liggen niet tegenover elkaar, T past en vormt twee gouden bruggen. "Model" staat in beeld.',
     'Alleen de breedte laten zien (zonder stippen), of de stippen in de basis meteen waterstofbruggen noemen.'),
   v('t4', 't4-vwo-at-laat-eerst-los.webp', 'vakinhoud vwo',
     'Methodes en examens verklaren het met het aantal waterstofbruggen; onderzoek laat zien dat vooral de stapeling van de basen het verschil maakt. De bronnen zijn het oneens.',
     'De film noemt het verschijnsel ("een stuk met veel A en T laat eerder los; een A–T-paar houdt minder stevig vast, met twee bruggen in plaats van drie") zonder "omdat". De nuance staat in het docentdeel.',
     'De schoolverklaring letterlijk ("omdat A en T maar twee bruggen hebben"), of een klein label in beeld: "en de basen stapelen minder stevig".'),
   v('t5', 't2-wangcellen.webp', 'nieuwe tekening',
     'Nieuw bibliotheekobject, gemaakt zonder referentieplaat en op één meetbron.',
     'Wangcellen zoals in een uitstrijkje: groot, plat, veelhoekig, met een kleine kern.',
     'Eerst een ElevenLabs-referentieplaat van een uitstrijkje (± 190 credits), of de algemene cel uit de bibliotheek.'),
   v('script', None, 'script',
     'De belangrijkste inhoudelijke scriptwijzigingen. Meer in script_v2.md.',
     'Nieuwe opening (T1) · "een paar duizend cellen" wordt "tienduizenden of meer" · "twee meter" niet meer in de opening (verklapte vraag 1) · opwikkelen om eiwitten nu ook voor havo · basenparing met de echte reden · "3,2 miljard per cel" wordt "ruim drie miljard per set, jouw cellen hebben twee sets" · "twee procent genen" wordt "minder dan twee procent codeert" · bladgroenkorrels bij DNA buiten de kern · weg: "Voor vwo gaan we drie stappen verder" en antwoordletters.',
     'Laat weten welke wijziging je niet wilt (Anders + opmerking).'),
  ]),
 dict(film='films/dna/2-dna-kopieren.html', map='films/dna/2-dna-kopieren', titel='DNA kopiëren', kort='DNA 2',
  sleutel='dna2', promptversie_nu='prompt v5 → v10',
  advies=dict(aanpak='lichte remake',
   waarom='De replicatie is nu één simulatie die je ziet gebeuren: helicase opent de helix, één nucleotide wordt gevolgd (past hij niet, dan schiet hij weg), de polymerase sluit en koppelt, primers per fragment, Okazaki-fragmenten, ligase. Vakfouten eruit: in het oude basisbeeld groeiden beide strengen dezelfde kant op, "het enzym zoekt niets uit", "duizenden" startpunten.',
   werk='27 scènes · ± 5:15 havo / 7:40 vwo gesproken (oud 5:35)', credits='± 5.400 (25 takes)'),
  kern=[('02-zoomstrook.webp', 'Doorlopende zoom naar de helix'), ('03-bubbel-helicase.webp', 'Helicase opent'),
        ('04-een-nucleotide-volgen.webp', 'Eén nucleotide volgen'), ('06-vork-1-primers.webp', 'Vork 1: primers'),
        ('07-vork-2-leidend.webp', 'Vork 2: leidende streng'), ('08-vork-3-terug.webp', 'Vork 3: terug bouwen'),
        ('09-vork-4-okazaki.webp', 'Vork 4: Okazaki-fragmenten'), ('10-vork-5-ligase.webp', 'Vork 5: ligase'),
        ('11-startpunten.webp', 'Startpunten vloeien samen'), ('13-meselson-stahl.webp', 'Meselson en Stahl')],
  voorstellen=[
   v('t1', '01-schaafwond.webp', 'personage',
     'Nieuwe gebeurtenis voor Noor en een nieuwe tekening. Een verse wond is voor een paar leerlingen onprettig.',
     'Opening: een schaafwond op Noors onderarm die heelt (vers, korst, roze, weg), met een zoomcirkel naar de cellen die delen.',
     'De knie uit de oude film (extra tekenwerk), of de wond pas vanaf de korst tonen.'),
   v('t2', '05-basisvork-A-B.webp', 'didactiek havo',
     'Het oude basisbeeld was fout (beide strengen dezelfde kant op). A herstelt dat eerlijk maar voegt ± 15 s en een idee toe dat havo niet hoeft te kennen.',
     'A: havo ziet de echte vork. Langs de ene streng groeit de nieuwe streng met de rits mee, langs de andere in korte stukjes terug. Zonder de woorden leidende streng, Okazaki of 5′/3′.',
     'B: geen extra alinea; in de basis is alleen de bovenste streng scherp, de onderste gedimd.'),
   v('t3', '12-telomeer.webp', 'inhoud',
     'De telomeer heeft in deze film geen functie in het verhaal, staat niet in de syllabus en komt terug in DNA 5 (Mutaties).',
     'De telomeer blijft (met de veter), met in beeld "bij elke deling iets korter".',
     'Schrappen (± 10 s) en het begrip naar DNA 5.'),
   v('t4', '14-replicatie-transcriptie.webp', 'inhoud',
     'Reverse transcriptase staat niet in de syllabus, maar de oude checkvraag ging erover en het kan in je methode staan.',
     'Alleen DNA-polymerase en RNA-polymerase vergelijken; reverse transcriptase en de verwijzing naar PCR vervallen.',
     'Eén zin houden: "sommige virussen kunnen het omgekeerde: van RNA naar DNA".'),
   v('t5', '09-vork-4-okazaki.webp', 'term',
     'Ik kan niet nagaan welke term Malmberg en Noordhoff gebruiken.',
     '"Leidende streng" en "volgende streng", zoals in de oude film.',
     '"Achterlopende streng", of in beeld beide termen.'),
   v('script', None, 'script',
     'De belangrijkste inhoudelijke scriptwijzigingen. Meer in script_v2.md.',
     'Het enzym kiest niet zelf: een nucleotide die past, past ook in het enzym, alleen dan sluit het (met A-bronnen) · "foutloos" wordt "bijna zonder fouten" · "honderdduizenden cellen" weg (geen bron) · "duizenden" wordt "tienduizenden" startpunten · vraag met A T G C in plaats van A C G T · foutkans (1 op een miljard) ook voor havo · primer per Okazaki-fragment · geen antwoordletters en "Voor vwo" meer.',
     'Laat weten welke wijziging je niet wilt (Anders + opmerking).'),
  ]),
 dict(film='films/voortplanting/celdeling/index.html', map='films/voortplanting/celdeling', titel='Celdeling', kort='Celdeling',
  sleutel='celdeling', promptversie_nu='± v8 → v10',
  advies=dict(aanpak='lichte remake',
   waarom='Mitose en meiose volgen één chromosoompaar door de hele film (vaderskant teal, moederskant oker, zoals Chromosomen): je ziet de draad dubbel worden, condenseren tot een X en met het centromeer vóórop splitsen. Crossing-over staat nu op het moment dat het gebeurt. Korter wordt de film nauwelijks; de winst zit in de opdeling.',
   werk='± 14,2 min gesproken (oud 14,8), alle 33 alinea\'s opnieuw', credits='± 10.000'),
  kern=[('k1-s13-condenseren-een-paar.webp', 'Eén paar condenseert'), ('k2-s16-metafase-mitose.webp', 'Metafase mitose'),
        ('k3-s17-anafase-centromeer-voorop.webp', 'Anafase: centromeer vóórop'), ('k4-s23-crossing-over.webp', 'Crossing-over'),
        ('k5-s27-drie-metafasen.webp', 'Drie metafasen naast elkaar')],
  voorstellen=[
   v('t1', 't1-deel2-hoofdstukkaart.webp', 'lesgebruik',
     'Of één film in twee delen of twee losse films beter in jouw lessen past, kan ik niet beoordelen.',
     'Eén film in twee delen: Deel 1 Celcyclus en mitose (± 8 min met vragen) en Deel 2 Meiose (± 6 min). Na deel 1 kun je stoppen.',
     'Twee losse films, elk met eigen pagina, opening en recap (± 2 alinea\'s extra).', 'groot'),
   v('t2', 't2-x01-linda-tijdlijn.webp', 'personage',
     'Een vast personage in een wat persoonlijke rol (vruchtbaarheid). En Linda\'s leeftijd bij Noors geboorte staat nog nergens: ik reken 27 bij die eisprong (44 − 16 = 28).',
     'De extra uitdaging over de eicel met Noors familie: de eicel waaruit Noor groeide, stond ruim 27 jaar stil in Linda\'s eierstok.',
     'Een anonieme vrouw van veertig, zoals in de oude film.'),
   v('t3', None, 'kleur',
     'Oker is moederskant, maar in deze film ook de kleur van het extra-uitdagingblok en van de cohesineringen.',
     'De cohesineringen worden goud-grijs, zodat oker in de extra uitdaging alleen balk en moederskant is.',
     'Alles oker laten.'),
   v('t4', 'k4-s23-crossing-over.webp', 'vakinhoud',
     'De stem zegt "minstens één keer, vaak een paar keer"; het beeld laat er één zien. Dat kan de misvatting "precies één" geven.',
     'Eén crossing-over per paar tekenen: didactisch het duidelijkst.',
     'Bij het lange paar twee crossing-overs (één per arm), bij het korte paar één.'),
   v('script', None, 'script',
     'De belangrijkste inhoudelijke scriptwijzigingen. Meer in script_v2.md.',
     '"Zevenendertig biljoen" wordt "tientallen biljoenen" · "bacterie" wordt "eencellige" (een bacterie deelt niet door mitose) · crossing-over op zijn moment, "minstens één keer, vaak een paar keer" (met 4 bronnen) · eicel: de laatste stap pas bij de bevruchting · zoetwaterpoliep en stek eruit · na elke vraag een hele zin in plaats van een kort antwoord · recap begint bij de vraag van het begin.',
     'Laat weten welke wijziging je niet wilt (Anders + opmerking).'),
  ]),
 dict(film='films/voortplanting/2-geslachtsorganen-puberteit.html', map='films/voortplanting/2-geslachtsorganen-puberteit',
  titel='Geslachtsorganen en puberteit', kort='Geslachtsorganen', sleutel='geslacht', promptversie_nu='prompt v8 → v10',
  advies=dict(aanpak='lichte remake',
   waarom='De hormoonketen wordt één proces dat je ziet: een doorlopende zoom naar de hypothalamus, GnRH-stoten die naar de hypofyse zakken, één gevolgd LH-deeltje dat door het lichaam reist en alleen in zaadbal en eierstok iets doet. Organen op echte plek en maat, de echte route van de zaadleider. Vier vakpunten zelf verbeterd met bronnen.',
   werk='28 scènes · ± 8:05 vwo / 7:15 havo gesproken (oud 6:58 / 6:10)', credits='± 5.700'),
  kern=[('k1-zoom-hoofd.webp', 'Zoom naar de hypothalamus'), ('k2-stoten-gnrh.webp', 'Stoten GnRH'),
        ('k3-zaadbal-eierstok.webp', 'LH in zaadbal en eierstok'), ('k4-eicelvoorraad.webp', 'Eicelvoorraad'),
        ('k5-cyclus-keten.webp', 'Cyclus als keten')],
  voorstellen=[
   v('t1', 't1-hypofyse-poort.webp', 'didactiek',
     'Is dit voor havo te veel detail, of maakt het juist het proces zichtbaar? Methodes tekenen meestal één pijl.',
     'Hypofyse met de bloedvaatjes in het steeltje: GnRH-cellen in de hypothalamus, kleine vaatjes naar de voorkwab, cellen die FSH en LH maken. Het woord poortader valt niet.',
     'Zelfde tekening zonder de zenuwcellen en het celpatroon: alleen een gouden wolkje dat door het steeltje zakt.'),
   v('t2', 't2-kijkje-sam-noor.webp', 'gevoelig · personage',
     'Een kijkje in het bekken bij een vast personage van 16. Bij Noor bestaat dit al, bij een jongen nog niet. Over de kleding heen leest het ook nog lastig.',
     'Sam van opzij met een klein kijkje in hoofd en bekken (alleen de zaadbal licht op); Noor van voren met de bestaande kijkjes.',
     'A: Sam en Noor zonder bekkenkijkje, het LH-deeltje gaat over in een losse doorsnede. B: het anonieme anatomische lichaam in plaats van Sam.', 'groot'),
   v('t3', 't3-man-doorsnede.webp', 'anatomie',
     'Nieuwe anatomische plaat (labels alleen na jouw akkoord) en wijkt af van het goedgekeurde schema uit 1.1. Ronde 1: penis, balzak en lieskanaal zijn nog grof.',
     'Doorsnede van de man op schaal met de echte route: de zaadleider gaat door het lieskanaal in een boog over de urineleider naar de achterkant van de blaas, en de wand knijpt de zaadcel vooruit.',
     'Het schema uit 1.1 houden met alleen de route en de wandgolf erbij.', 'groot'),
   v('t4', 't4-zwellichamen.webp', 'gevoelig',
     'Gevoelig in de klas; dat is een keuze die ik niet alleen kan maken.',
     'Zwellichamen als dwarsdoorsnede: holten lopen vol bloed. Nooit een zijaanzicht van een erectie.',
     'Zoals in 1.1: het zwellichaam in de zijdoorsnede kleurt alleen rood.'),
   v('t5', 't5-buitenkant.webp', 'gevoelig',
     'Gevoelig en een nieuwe tekening. In 1.1 waren de onderdelen niet herkenbaar.',
     'Een vlak schema van de buitenkant van de vrouw in een eigen paneel, los van het personage, met de anus als oriëntatie.',
     'Het ovaal uit 1.1 met betere plaatsing van de drie openingen, of hetzelfde schema zonder anus.'),
   v('t6', 'k5-cyclus-keten.webp', 'didactiek',
     'Zonder terugkoppeling ziet een havoleerling nergens hoe de cyclus zichzelf regelt (Van bevruchting tot baby is vwo).',
     'De cyclus als keten vanaf dezelfde hypofyse, zonder terugkoppeling.',
     'Eén zin en één remlijn erbij: "Veel oestrogeen remt de hypofyse weer" (± 5 s, voor havo en vwo).'),
   v('t7', None, 'vwo-stof',
     'Kisspeptine en leptine staan niet in de syllabus; volgens de prompt is een vwo-blok examenstof.',
     'Het vwo-blok blijft zoals in 1.1, met één zin erbij: "Leptine geeft geen startsein, maar wel toestemming."',
     'Label "verdieping" in plaats van "vwo", of het blok inkorten tot alleen leptine.'),
   v('t8', None, 'lengte',
     'De film is ruim een minuut langer, vooral door het hormoonproces dat nu te zien is.',
     'De nieuwe lengte houden (± 8 min vwo / 7:15 havo gesproken).',
     'Secundaire kenmerken en de organen van de vrouw korter (± 25 s minder).'),
   v('script', None, 'script',
     'De belangrijkste inhoudelijke scriptwijzigingen. Meer in script_v2.md.',
     'FSH en LH gaan door het hele lichaam, alleen organen met receptoren reageren (nieuw begrip) · GnRH-stoten in het begin vooral \'s nachts · meisjes beginnen "iets eerder", de groeispurt komt twee jaar eerder (met bronnen) · zaadblaasjes "ruim de helft" in plaats van twee derde (met bronnen) · echte route van de zaadleider · één bijzin over meiose · verwijzing naar Van bevruchting tot baby weg · geen antwoordletters meer.',
     'Laat weten welke wijziging je niet wilt (Anders + opmerking).'),
  ]),
]

out = []
for f in FILMS:
    vs = []
    for x in f['voorstellen']:
        x = dict(x)
        kf = x.pop('kf')
        x['img'] = img(f['map'], kf) if kf else None
        vs.append(x)
    out.append(dict(film=f['film'], titel=f['titel'], kort=f['kort'], sleutel=f['sleutel'], promptversie_nu=f['promptversie_nu'],
                    advies=f['advies'], herinspreken=[], voorstellen=vs,
                    kern=[dict(img=img(f['map'], n), titel=t) for n, t in f['kern']]))

s = open(os.path.join(HIER, 'sjabloon_remake.html')).read()
s = s.replace('__DATA__', json.dumps(out, ensure_ascii=False))
open(os.path.join(HIER, 'keuringsblad.html'), 'w').write(s)
print('keuringsblad.html', len(s) // 1024, 'kB')
