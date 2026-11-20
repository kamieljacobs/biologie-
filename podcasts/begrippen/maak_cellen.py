#!/usr/bin/env python3
"""Maakt podcasts/begrippen/cellen.json: de begrippen van thema Cellen als gesproken items.

Bron: podcasts/cellen/begrippen_bron.json (GLOSSARY van de zes films). Uitleg = gesproken
versie van de filmdefinitie (korte zinnen, ≤ 30 woorden, geen haakjes of notities).
Bestaande generation_id/audio/splits blijven staan zolang begrip en uitleg gelijk blijven.
"""
import json, os, sys
HIER = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HIER))
sys.path.insert(0, os.path.dirname(HIER))
from maak_segmenten import regels, stemtekst

FILMS = [
    ('van-molecuul-tot-biosfeer', 'Van molecuul tot biosfeer', 'films/cellen/van-molecuul-tot-biosfeer.html'),
    ('celorganellen', 'Celorganellen', 'films/cellen/celorganellen/index.html'),
    ('microben', 'Wat groeit er op je boterham?', 'films/cellen/microben.html'),
    ('diffusie-osmose', 'Diffusie en osmose', 'films/cellen/diffusie-osmose/index.html'),
    ('stamcellen', 'Stamcellen', 'films/cellen/stamcellen.html'),
    ('onderzoek-doen', 'Onderzoek doen in de biologie', 'films/cellen/onderzoek-doen/index.html'),
]

# (id, getoond begrip, gesproken begrip, uitleg, vwo, films, stem-override voor het begrip of None)
B = [
 # Van molecuul tot biosfeer
 ('levenskenmerken', 'levenskenmerken', 'Levenskenmerken', 'De kenmerken van levende wezens. Ze bestaan uit cellen, hebben een stofwisseling, groeien, planten zich voort, reageren op prikkels en houden hun binnenkant constant.', 0, ['van-molecuul-tot-biosfeer'], None),
 ('homeostase', 'homeostase', 'Homeostase', 'Het constant houden van je binnenkant, het inwendig milieu. Bijvoorbeeld je lichaamstemperatuur. Een cel of organisme houdt zichzelf zo in evenwicht.', 0, ['van-molecuul-tot-biosfeer', 'celorganellen'], None),
 ('organisatieniveaus', 'organisatieniveaus', 'Organisatieniveaus', 'De ladder van klein naar groot. Molecuul, organel, cel, weefsel, orgaan, orgaanstelsel, organisme, populatie, levensgemeenschap, ecosysteem en biosfeer.', 0, ['van-molecuul-tot-biosfeer'], None),
 ('weefsel', 'weefsel', 'Weefsel', 'Een groep cellen met dezelfde bouw en dezelfde taak. Bijvoorbeeld spierweefsel.', 0, ['van-molecuul-tot-biosfeer', 'stamcellen'], None),
 ('orgaanstelsel', 'orgaanstelsel', 'Orgaanstelsel', 'Organen die samenwerken. Het hart en de bloedvaten vormen samen het bloedvatenstelsel. In sommige boeken heet het een organenstelsel.', 0, ['van-molecuul-tot-biosfeer'], None),
 ('differentiatie', 'differentiatie', 'Differentiatie', 'Cellen met hetzelfde DNA worden verschillend, doordat in elk celtype andere genen aan staan. Zo krijgt elke cel een eigen bouw en taak. Het DNA zelf blijft hetzelfde.', 0, ['van-molecuul-tot-biosfeer', 'stamcellen'], None),
 ('populatie', 'populatie', 'Populatie', 'Alle individuen van één soort in één gebied, die zich onderling kunnen voortplanten.', 0, ['van-molecuul-tot-biosfeer'], None),
 ('levensgemeenschap', 'levensgemeenschap', 'Levensgemeenschap', 'Alle populaties in één gebied samen. Dus alle soorten die daar leven.', 0, ['van-molecuul-tot-biosfeer'], None),
 ('ecosysteem', 'ecosysteem', 'Ecosysteem', 'Een levensgemeenschap samen met de levenloze omgeving: bodem, water, licht en temperatuur. Ze beïnvloeden elkaar.', 0, ['van-molecuul-tot-biosfeer'], None),
 ('biotisch-abiotisch', 'biotische en abiotische factoren', 'Biotische en abiotische factoren', 'Biotisch zijn invloeden van levende wezens. Abiotisch zijn invloeden van de levenloze omgeving, zoals licht, water en temperatuur.', 0, ['van-molecuul-tot-biosfeer'], None),
 ('biosfeer', 'biosfeer', 'Biosfeer', 'Alle ecosystemen op aarde samen.', 0, ['van-molecuul-tot-biosfeer'], None),
 ('emergente-eigenschap', 'emergente eigenschap', 'Emergente eigenschap', 'Een eigenschap van het geheel, die de losse delen niet hebben. Losse hartspiercellen pompen geen bloed rond. Samen, als hart, wel.', 0, ['van-molecuul-tot-biosfeer', 'stamcellen'], 'Emergénte eigenschap'),
 ('virus', 'virus', 'Virus', 'Geen cel, maar een pakketje erfelijk materiaal in een eiwitmantel. Het heeft geen eigen stofwisseling. Het kan zich alleen vermeerderen in een levende cel van een gastheer.', 0, ['van-molecuul-tot-biosfeer', 'microben'], None),
 # Celorganellen
 ('prokaryoot', 'prokaryoot', 'Prokaryoot', 'Een cel of organisme zonder celkern en zonder organellen met een membraan. Het DNA ligt los in de cel. Een bacterie is een prokaryoot.', 0, ['celorganellen', 'microben'], None),
 ('eukaryoot', 'eukaryoot', 'Eukaryoot', 'Een organisme met cellen die een kern en organellen hebben. Schimmels, planten, dieren en jij zijn eukaryoten.', 0, ['celorganellen', 'microben'], None),
 ('organel', 'organel', 'Organel', 'Een onderdeel van de cel met een eigen bouw en een eigen taak. Zoals de kern of een mitochondrium.', 0, ['celorganellen'], None),
 ('celmembraan', 'celmembraan', 'Celmembraan', 'Het dunne vlies om de cel. Een dubbele laag vetachtige moleculen met eiwitten erin. Het laat sommige stoffen door en andere niet.', 0, ['celorganellen', 'diffusie-osmose'], None),
 ('cytoplasma', 'cytoplasma', 'Cytoplasma', 'De stroperige vulling van de cel, binnen het membraan. Daarin liggen de organellen.', 0, ['celorganellen'], None),
 ('celkern', 'celkern (kern)', 'Celkern', 'Het grootste organel van de cel. Daarin ligt het DNA. Om de kern zit een dubbel kernmembraan met kernporiën.', 0, ['celorganellen'], None),
 ('kernmembraan', 'kernmembraan', 'Kernmembraan', 'Het dubbele membraan om de celkern.', 0, ['celorganellen'], None),
 ('kernporien', 'kernporiën', 'Kernporiën', 'Openingen in het kernmembraan. Daardoor gaan werkkopieën van het DNA de kern uit.', 0, ['celorganellen'], None),
 ('dna', 'DNA', 'DNA', 'De bouwtekening voor bijna elk eiwit dat de cel maakt. Het DNA blijft in de kern.', 0, ['celorganellen'], 'Deeënaa'),
 ('ribosoom', 'ribosoom', 'Ribosoom', 'Een klein deeltje dat eiwitten maakt. Het ligt los in het cytoplasma, of op het ruw ER.', 0, ['celorganellen'], None),
 ('er', 'endoplasmatisch reticulum (ER)', 'Endoplasmatisch reticulum', 'Een netwerk van membranen in de cel, kort het ER. Ruw ER heeft ribosomen. Eiwitten voor buiten de cel worden erin gevouwen en gecontroleerd.', 0, ['celorganellen'], None),
 ('golgisysteem', 'golgisysteem', 'Golgisysteem', 'Een stapel platte zakjes. Het bewerkt eiwitten, sorteert ze en verpakt ze in blaasjes.', 0, ['celorganellen'], None),
 ('blaasje', 'blaasje', 'Blaasje', 'Een klein zakje van membraan dat stoffen vervoert in de cel. De vakterm is vesikel.', 0, ['celorganellen'], None),
 ('exocytose', 'exocytose', 'Exocytose', 'Een blaasje versmelt met het celmembraan, en de inhoud komt buiten de cel.', 1, ['celorganellen'], None),
 ('endocytose', 'endocytose', 'Endocytose', 'Een stukje celmembraan stulpt naar binnen, en haalt zo iets de cel in.', 1, ['celorganellen'], None),
 ('mitochondrium', 'mitochondrium (mv. mitochondriën)', 'Mitochondrium', 'Het organel waar de verbranding van glucose met zuurstof wordt afgemaakt. Daarbij ontstaat ATP, en komt koolstofdioxide vrij.', 0, ['celorganellen'], None),
 ('cristae', 'cristae', 'Cristae', 'De plooien in het binnenmembraan van een mitochondrium. Ze vergroten het oppervlak voor de eiwitten die ATP maken.', 0, ['celorganellen'], None),
 ('atp', 'ATP', 'ATP', 'De energiedrager van de cel. Als de cel energie gebruikt, gaat er een fosfaatgroep af, en wordt ATP ADP.', 0, ['celorganellen', 'diffusie-osmose'], None),
 ('stofwisseling', 'stofwisseling', 'Stofwisseling', 'Alle omzettingen van stoffen in de cel. Opbouw heet assimilatie. Afbraak heet dissimilatie.', 0, ['celorganellen'], None),
 ('lysosoom', 'lysosoom', 'Lysosoom', 'Een blaasje vol afbraakenzymen, met een zure binnenkant. Het breekt afval af tot bouwstenen, die de cel opnieuw gebruikt.', 0, ['celorganellen'], 'Liezosoom'),
 ('vacuole', 'vacuole', 'Vacuole', 'Een grote holte vol water in een plantencel. Ze duwt tegen de celwand en houdt de plant stevig.', 0, ['celorganellen'], None),
 ('celwand', 'celwand', 'Celwand', 'Een stevige laag cellulose buiten het celmembraan van een plantencel. Hij geeft stevigheid en laat bijna alles door, als een zeef.', 0, ['celorganellen'], None),
 ('chloroplast', 'chloroplast (bladgroenkorrel)', 'Chloroplast', 'Ook wel bladgroenkorrel. Een groen organel waar fotosynthese gebeurt. Met lichtenergie wordt uit water en koolstofdioxide glucose gemaakt.', 0, ['celorganellen'], None),
 ('grana', 'grana', 'Grana', 'Stapels schijfjes in een chloroplast. Daarin zitten de eiwitten die licht vangen.', 1, ['celorganellen'], None),
 ('cytoskelet', 'cytoskelet (celskelet)', 'Cytoskelet', 'Ook wel celskelet. Een netwerk van eiwitdraden in de cel. Het geeft de cel vorm, en werkt als rails voor transport.', 0, ['celorganellen'], None),
 ('motoreiwit', 'motoreiwit', 'Motoreiwit', 'Een eiwit dat met een blaasje over een draad van het cytoskelet loopt.', 1, ['celorganellen'], None),
 ('receptor', 'ontvanger-eiwit (receptor)', 'Receptor', 'Ook wel ontvanger-eiwit. Een eiwit in het membraan waarop een hormoon of een ander signaal precies past.', 0, ['celorganellen'], 'Reseptor'),
 # Microben
 ('schimmel', 'schimmel', 'Schimmel', 'Een eukaryoot met een eigen rijk. Meestal opgebouwd uit draden. Een schimmel verteert zijn voedsel buiten zijn cellen, en verspreidt zich met sporen.', 0, ['microben'], None),
 ('hyfe', 'hyfe', 'Hyfe', 'Een schimmeldraad, een paar duizendste millimeter dik. Er zitten kernen in, en een celwand. Een hyfe groeit aan de punt en vertakt zich.', 0, ['microben'], None),
 ('mycelium', 'mycelium', 'Mycelium', 'Alle hyfen van een schimmel samen.', 0, ['microben'], None),
 ('spore', 'spore', 'Spore', 'Een piepkleine cel waaruit een nieuwe schimmel kan groeien. Sporen zweven overal in de lucht.', 0, ['microben'], None),
 ('vruchtlichaam', 'vruchtlichaam', 'Vruchtlichaam', 'Het deel van een schimmel waarin de sporen ontstaan. Een paddenstoel is een vruchtlichaam.', 0, ['microben'], None),
 ('gist', 'gist', 'Gist', 'Een schimmel die uit één cel bestaat. Gist plant zich voort door knopvorming.', 0, ['microben'], None),
 ('plasmide', 'plasmide', 'Plasmide', 'Een klein ringetje DNA in een bacterie, naast het grote ringvormige chromosoom.', 0, ['microben'], None),
 ('tweedeling', 'tweedeling', 'Tweedeling', 'Zo plant een bacterie zich voort. Ze kopieert haar DNA, groeit, en splitst zich in twee cellen.', 0, ['microben'], None),
 ('kolonie', 'kolonie', 'Kolonie', 'Een zichtbaar hoopje bacteriën op een voedingsbodem. Vaak gegroeid uit één enkele cel.', 0, ['microben'], None),
 ('reducent', 'reducent', 'Reducent', 'Een organisme dat dode resten afbreekt. Zo komen de stoffen weer vrij.', 0, ['microben'], None),
 ('symbiose', 'symbiose', 'Symbiose', 'Het nauw samenleven van twee soorten. Bij mutualisme hebben ze er allebei voordeel van. Bij parasitisme heeft de parasiet voordeel en de gastheer nadeel.', 0, ['microben'], None),
 ('parasiet', 'parasiet', 'Parasiet', 'Een organisme dat leeft ten koste van een ander. De parasiet heeft er voordeel van, de gastheer nadeel.', 0, ['microben'], None),
 ('antibioticum', 'antibioticum', 'Antibioticum', 'Een stof die bacteriën remt of doodt, bijvoorbeeld door hun celwand aan te pakken. Een antibioticum werkt niet tegen virussen.', 0, ['microben'], None),
 # Diffusie en osmose
 ('deeltjesbeweging', 'deeltjesbeweging', 'Deeltjesbeweging', 'Alle deeltjes in een vloeistof of gas bewegen altijd willekeurig door elkaar. Hoe warmer, hoe sneller.', 0, ['diffusie-osmose'], None),
 ('diffusie', 'diffusie', 'Diffusie', 'De netto verplaatsing van deeltjes van een hoge naar een lage concentratie, door hun willekeurige beweging.', 0, ['diffusie-osmose'], None),
 ('concentratie', 'concentratie', 'Concentratie', 'Hoeveel deeltjes van een stof er in een bepaalde hoeveelheid oplossing zitten.', 0, ['diffusie-osmose'], None),
 ('concentratieverschil', 'concentratieverschil (concentratiegradiënt)', 'Concentratieverschil', 'Ook wel concentratiegradiënt. Het verschil in concentratie tussen twee plekken. Hoe groter het verschil, hoe sneller de diffusie.', 0, ['diffusie-osmose'], None),
 ('evenwicht', 'evenwicht', 'Evenwicht', 'Er gaan evenveel deeltjes heen als terug. Netto verandert er niets, maar de deeltjes blijven bewegen.', 0, ['diffusie-osmose'], None),
 ('longblaasje', 'longblaasje', 'Longblaasje', 'Een klein blaasje in de long met een flinterdunne wand. Zuurstof en koolstofdioxide gaan er door diffusie doorheen.', 0, ['diffusie-osmose'], None),
 ('fosfolipide', 'fosfolipide', 'Fosfolipide', 'De bouwsteen van het celmembraan. Een kop die van water houdt, en twee vetstaarten die water afstoten. De koppen liggen naar het water, de staarten naar binnen.', 0, ['diffusie-osmose'], None),
 ('hydrofiel-hydrofoob', 'hydrofiel / hydrofoob', 'Hydrofiel en hydrofoob', 'Hydrofiel betekent: houdt van water, lost goed op in water. Hydrofoob betekent: stoot water af, lost goed op in vet.', 0, ['diffusie-osmose'], None),
 ('selectief-doorlatend', 'selectief doorlatend (selectief permeabel)', 'Selectief doorlatend', 'Laat sommige stoffen door en andere niet. Kleine stoffen die in vet oplossen gaan er makkelijk door. Ionen en glucose niet zomaar.', 0, ['diffusie-osmose'], None),
 ('semipermeabel', 'semipermeabel', 'Semipermeabel', 'Laat water door, maar opgeloste stoffen zoals zout niet.', 0, ['diffusie-osmose'], 'Semi-permeabel'),
 ('kanaaleiwit', 'kanaaleiwit', 'Kanaaleiwit', 'Een eiwit in het membraan dat een tunnel vormt voor één soort deeltje. Bijvoorbeeld een waterkanaal.', 1, ['diffusie-osmose'], None),
 ('dragereiwit', 'dragereiwit', 'Dragereiwit', 'Een eiwit in het membraan dat een deeltje vastpakt, en het aan de andere kant weer afzet.', 1, ['diffusie-osmose'], None),
 ('gefaciliteerde-diffusie', 'gefaciliteerde diffusie', 'Gefaciliteerde diffusie', 'Diffusie via een kanaaleiwit of een dragereiwit. Van hoog naar laag, en zonder ATP.', 1, ['diffusie-osmose'], None),
 ('osmose', 'osmose', 'Osmose', 'Water gaat door een semipermeabel membraan naar de kant met de meeste opgeloste deeltjes die er niet door kunnen. Dus naar de hoogste osmotische waarde.', 0, ['diffusie-osmose'], None),
 ('osmotische-waarde', 'osmotische waarde', 'Osmotische waarde', 'Een maat voor de concentratie opgeloste deeltjes in een oplossing. Je telt deeltjes. Keukenzout valt in water uiteen in twee deeltjes, en telt dus dubbel.', 0, ['diffusie-osmose'], None),
 ('osmotische-druk', 'osmotische druk', 'Osmotische druk', 'De druk die nodig is om osmose precies tegen te houden.', 0, ['diffusie-osmose'], None),
 ('plasmolyse', 'plasmolyse', 'Plasmolyse', 'Een plantencel in een geconcentreerde oplossing verliest water. Het celmembraan laat dan los van de celwand.', 0, ['diffusie-osmose'], 'Plasmolieze'),
 ('turgor', 'turgor', 'Turgor', 'De druk van de celinhoud tegen de celwand. Turgor maakt een plant stevig.', 0, ['diffusie-osmose'], None),
 ('hemolyse', 'hemolyse', 'Hemolyse', 'Het barsten van rode bloedcellen. Bijvoorbeeld in zuiver water.', 0, ['diffusie-osmose'], 'Heemolieze'),
 ('isotonisch', 'isotonisch', 'Isotonisch', 'Een oplossing met dezelfde osmotische waarde als de cel. Er gaat netto geen water in of uit.', 0, ['diffusie-osmose'], None),
 ('hypotonisch', 'hypotonisch', 'Hypotonisch', 'Een oplossing met een lagere osmotische waarde dan de cel. Water gaat de cel in.', 0, ['diffusie-osmose'], 'Hiepotonisch'),
 ('hypertonisch', 'hypertonisch', 'Hypertonisch', 'Een oplossing met een hogere osmotische waarde dan de cel. Water gaat de cel uit.', 0, ['diffusie-osmose'], 'Hiepertonisch'),
 ('passief-transport', 'passief transport', 'Passief transport', 'Transport dat vanzelf gaat, zonder energie van de cel. Diffusie en osmose zijn passief transport.', 0, ['diffusie-osmose'], None),
 ('actief-transport', 'actief transport', 'Actief transport', 'Transport tegen het concentratieverschil in, bergop. Een pomp in het membraan doet het werk, en dat kost ATP.', 0, ['diffusie-osmose'], None),
 ('natrium-kaliumpomp', 'natrium-kaliumpomp', 'Natrium-kaliumpomp', 'Een pomp in het celmembraan die met ATP natrium naar buiten pompt, en kalium naar binnen.', 1, ['diffusie-osmose'], None),
 # Stamcellen
 ('gedifferentieerde-cel', 'gedifferentieerde cel', 'Gedifferentieerde cel', 'Een gespecialiseerde cel, zoals een zenuwcel of een spiercel. Zo’n cel deelt zich vaak niet of nauwelijks meer.', 0, ['stamcellen'], None),
 ('stamcel', 'stamcel', 'Stamcel', 'Een ongespecialiseerde cel die zich blijft delen. Bij een deling blijft er gemiddeld één stamcel over. De andere cel specialiseert zich.', 0, ['stamcellen'], None),
 ('kiemlaag', 'kiemlaag', 'Kiemlaag', 'De onderste laag van de opperhuid, met stamcellen. De nieuwe cellen schuiven omhoog, verhoornen, sterven af en schilferen af.', 0, ['stamcellen'], None),
 ('volwassen-stamcel', 'volwassen stamcel', 'Volwassen stamcel', 'Een stamcel in een weefsel, zoals in het beenmerg, de huid of de darm. Hij maakt alleen de celsoorten van dat weefsel.', 0, ['stamcellen'], None),
 ('embryonale-stamcel', 'embryonale stamcel', 'Embryonale stamcel', 'Een stamcel uit de binnenste celmassa van een embryo van ongeveer vijf dagen. Hij kan elke celsoort van het lichaam worden.', 0, ['stamcellen'], None),
 ('stamceltransplantatie', 'stamceltransplantatie', 'Stamceltransplantatie', 'Een patiënt krijgt bloedstamcellen van een passende donor, bijvoorbeeld bij leukemie. Daarna heeft het bloed het DNA van de donor.', 0, ['stamcellen'], None),
 ('afstoting', 'afstoting', 'Afstoting', 'Het afweersysteem ruimt lichaamsvreemde cellen op. Daarom moet een donor bijna dezelfde herkenningseiwitten hebben als de patiënt.', 0, ['stamcellen'], None),
 ('ips-cel', 'geïnduceerde stamcel (iPS-cel)', 'iPS-cel', 'Een geïnduceerde stamcel. Een gewone lichaamscel die in het lab is teruggezet tot een stamcel, die bijna elke celsoort kan worden.', 0, ['stamcellen'], 'ie-pee-es-cel'),
 ('transcriptiefactor', 'transcriptiefactor', 'Transcriptiefactor', 'Een eiwit dat aan de promotor van een gen bindt. Zo bepaalt het of RNA-polymerase het gen kan overschrijven.', 1, ['stamcellen'], 'Transcriptsie-factor'),
 ('epigenetica', 'epigenetica', 'Epigenetica', 'Chemische markeringen op het DNA en op de histonen. Ze zetten genen langdurig aan of uit, ook na een deling.', 1, ['stamcellen'], None),
 ('potentie', 'toti-, pluri-, multi-, unipotent', 'Totipotent, pluripotent, multipotent, unipotent', 'Hoeveel een cel nog kan worden. Totipotent: alles, ook de placenta. Pluripotent: elke celsoort van het lichaam. Multipotent: een paar celsoorten. Unipotent: één celsoort.', 1, ['stamcellen'], None),
 # Onderzoek doen
 ('onderzoekscyclus', 'onderzoekscyclus', 'Onderzoekscyclus', 'De vaste route van een onderzoek. Waarneming, onderzoeksvraag, hypothese, werkplan, uitvoering, resultaten, conclusie en discussie. Vaak volgt een nieuwe vraag.', 0, ['onderzoek-doen'], None),
 ('onderzoeksvraag', 'onderzoeksvraag', 'Onderzoeksvraag', 'Een vraag over één factor, en iets wat je kunt meten.', 0, ['onderzoek-doen'], None),
 ('hypothese', 'hypothese', 'Hypothese', 'Een mogelijk antwoord op de onderzoeksvraag, dat je kunt toetsen.', 0, ['onderzoek-doen'], None),
 ('verwachting', 'verwachting', 'Verwachting', 'Wat je in deze proef zult meten als de hypothese klopt. Vaak met als, dan.', 0, ['onderzoek-doen'], None),
 ('falsifieerbaar', 'falsifieerbaar', 'Falsifieerbaar', 'Er is een uitkomst denkbaar die de hypothese weerlegt.', 0, ['onderzoek-doen'], None),
 ('werkplan', 'werkplan', 'Werkplan', 'Een beschrijving van hoe je de proef uitvoert. Met de materialen, de variabelen en de metingen.', 0, ['onderzoek-doen'], None),
 ('onafhankelijke-variabele', 'onafhankelijke variabele', 'Onafhankelijke variabele', 'Wat je zelf verandert in je proef.', 0, ['onderzoek-doen'], None),
 ('afhankelijke-variabele', 'afhankelijke variabele', 'Afhankelijke variabele', 'Wat je meet in je proef.', 0, ['onderzoek-doen'], None),
 ('constante-variabele', 'constante variabele', 'Constante variabele', 'Een factor die je gelijk houdt, zodat alleen de onafhankelijke variabele verschilt. Ook wel controlevariabele.', 0, ['onderzoek-doen'], None),
 ('controlegroep', 'controlegroep', 'Controlegroep', 'Een groep zonder de factor die je onderzoekt, en verder precies gelijk. Om mee te vergelijken.', 0, ['onderzoek-doen'], None),
 ('randomiseren', 'randomiseren', 'Randomiseren', 'Het toeval laten bepalen wat of wie in welke groep komt.', 0, ['onderzoek-doen'], None),
 ('blind-dubbelblind', 'blind · dubbelblind', 'Blind en dubbelblind', 'Blind: wie meet of meedoet, weet niet in welke groep iets hoort. Dubbelblind: de proefpersoon en de onderzoeker weten het allebei niet.', 0, ['onderzoek-doen'], None),
 ('placebo', 'placebo', 'Placebo', 'Een nepbehandeling voor de controlegroep in medisch onderzoek.', 0, ['onderzoek-doen'], None),
 ('toevallige-fout', 'toevallige fout', 'Toevallige fout', 'Een meetfout die de ene keer te hoog en de andere keer te laag uitvalt. Bij herhalen middelt hij uit.', 0, ['onderzoek-doen'], None),
 ('systematische-fout', 'systematische fout', 'Systematische fout', 'Een meetfout die steeds dezelfde kant op zit. Hij middelt niet uit, ook niet als je vaker meet.', 0, ['onderzoek-doen'], None),
 ('steekproef', 'steekproef', 'Steekproef', 'Het deel dat je onderzoekt, bijvoorbeeld vijftig zaadjes. Hoe groter de steekproef, hoe minder toeval de uitkomst bepaalt.', 0, ['onderzoek-doen'], None),
 ('betrouwbaar', 'betrouwbaar', 'Betrouwbaar', 'Als je het herhaalt, vind je ongeveer hetzelfde. De uitkomst hangt niet af van toeval. Meer metingen en een vast werkplan maken een onderzoek betrouwbaarder.', 0, ['onderzoek-doen'], None),
 ('herhaalbaar', 'herhaalbaar', 'Herhaalbaar', 'Doe je dezelfde proef zelf opnieuw, dan vind je hetzelfde resultaat.', 0, ['onderzoek-doen'], None),
 ('reproduceerbaar', 'reproduceerbaar', 'Reproduceerbaar', 'Een ander lab doet de proef na, met eigen materiaal, en vindt hetzelfde resultaat.', 0, ['onderzoek-doen'], None),
 ('nauwkeurig', 'nauwkeurig', 'Nauwkeurig', 'Hoe fijn je meetinstrument meet. Bijvoorbeeld op een tiende gram.', 0, ['onderzoek-doen'], None),
 ('valide', 'valide', 'Valide', 'Je meet echt wat je wilt weten, en het verschil komt echt door jouw variabele. Vaker meten maakt een onderzoek niet meer valide.', 0, ['onderzoek-doen'], None),
 ('spreiding', 'spreiding', 'Spreiding', 'Hoe ver de metingen uit elkaar liggen.', 0, ['onderzoek-doen'], None),
 ('histogram', 'histogram', 'Histogram', 'Een grafiek die laat zien hoe vaak elke waarde voorkomt.', 0, ['onderzoek-doen'], None),
 ('conclusie-discussie', 'conclusie · discussie', 'Conclusie en discussie', 'De conclusie is het antwoord op de onderzoeksvraag. In de discussie staan de beperkingen, opvallende dingen en nieuwe vragen.', 0, ['onderzoek-doen'], None),
 ('observationeel-onderzoek', 'observationeel onderzoek', 'Observationeel onderzoek', 'Onderzoek waarin je niets verandert, maar kijkt wat er samengaat.', 0, ['onderzoek-doen'], None),
 ('correlatie-causaliteit', 'correlatie · causaliteit', 'Correlatie en causaliteit', 'Correlatie: twee dingen gaan samen. Causaliteit: het ene veroorzaakt het andere. Correlatie is nog geen oorzaak.', 0, ['onderzoek-doen'], None),
 ('omgekeerde-causaliteit', 'omgekeerde causaliteit', 'Omgekeerde causaliteit', 'Wat je voor het gevolg hield, is eigenlijk de oorzaak.', 0, ['onderzoek-doen'], None),
 ('verstorende-variabele', 'verstorende variabele', 'Verstorende variabele', 'Een derde factor die allebei de dingen veroorzaakt.', 0, ['onderzoek-doen'], None),
 ('informed-consent', 'informed consent', 'Informed consent', 'Toestemming die iemand vooraf geeft om mee te doen aan medisch onderzoek, nadat hij goed is geïnformeerd.', 0, ['onderzoek-doen'], None),
 ('drie-vs', "de drie V's", "De drie V's", 'Vervanging, vermindering en verfijning van dierproeven.', 0, ['onderzoek-doen'], "De drie vee's"),
 ('fraude', 'fraude', 'Fraude', 'Gegevens verzinnen, gegevens vervalsen, of werk van anderen overnemen. Bewust misleiden, anders dan een eerlijke fout.', 0, ['onderzoek-doen'], None),
]


def main():
    R = regels()
    uit = os.path.join(HIER, 'cellen.json')
    oud = {}
    if os.path.exists(uit):
        oud = {b['id']: b for b in json.load(open(uit))['begrippen']}
    items = []
    for id_, toon, spreek, uitleg, vwo, films, stemkop in B:
        prompt = f'{stemkop or stemtekst(spreek, R)}.\n\n{stemtekst(uitleg, R)}'
        it = {'id': id_, 'begrip': toon, 'gesproken': spreek, 'uitleg': uitleg, 'stem': prompt,
              'vwo': bool(vwo), 'films': films}
        o = oud.get(id_)
        if o and o.get('stem') == prompt:
            for k in ('generation_id', 'audio', 'audio_o', 'splits', 'duur'):
                if k in o:
                    it[k] = o[k]
        items.append(it)
    ids = {b['id'] for b in items}
    assert len(ids) == len(items), 'dubbele id'
    films = [{'id': f, 'titel': t, 'href': h, 'begrippen': [b['id'] for b in items if f in b['films']]}
             for f, t, h in FILMS]
    for b in items:
        assert len(b['uitleg'].split()) <= 30, (b['id'], len(b['uitleg'].split()))
    json.dump({'thema': 'cellen', 'titel': 'Cellen', 'stem': 'Remko', 'voice_id': 'vjeU1L5RIGPyrwuboFwz',
               'model': 'eleven_v4', 'films': films, 'begrippen': items},
              open(uit, 'w'), ensure_ascii=False, indent=1)
    print(len(items), 'begrippen,', sum(len(b['stem']) for b in items), 'tekens')


if __name__ == '__main__':
    main()
