# LET OP (22 okt 2026): f2.json, f3.json en f4.json zijn na de review direct aangepast; de JSON is nu leidend. Dit script niet opnieuw draaien (het overschrijft de reviewwijzigingen).
import json, re, sys
OUT = '/home/claude/evo2/films/'

def bouw(film, meta, scenes, extra):
    S = []
    for sc in scenes:
        d = {"id": sc[0], "hoofdstuk": sc[1], "laag": "basis", "look": sc[2], "tekst": sc[3], "beweging": sc[4]}
        if len(sc) > 5: d["opties"] = sc[5]; d["juist"] = sc[6]
        S.append(d)
    woorden = sum(len(re.findall(r"[\wÀ-ÿ'’-]+", d["tekst"])) for d in S)
    nq = sum(1 for d in S if 'q' in d["id"][2:])
    nh = len(meta["hoofdstukken"])
    sec = woorden / 140 * 60 + nq * 10 + nh * 4 + 8
    out = dict(meta); out["duur"] = {"basis_min": round(sec / 60, 1), "met_vwo_min": round(sec / 60, 1), "woorden": woorden}
    out["hoofdstukken"] = meta["hoofdstukken"]; out["scenes"] = S; out.update(extra)
    # volgorde van sleutels zoals in REEKSONTWERP
    keys = ["film", "titel", "slug", "puzzel", "haak", "duur", "hoofdstukken", "scenes", "checkvragen", "begrippen", "getallen", "uitspraak", "nieuw_in_bibliotheek", "keuzes_en_twijfels"]
    out = {k: out[k] for k in keys}
    json.dump(out, open(OUT + f'f{film}.json', 'w'), ensure_ascii=False, indent=1)
    # controles
    print(f'film {film}: {len(S)} scènes, {woorden} woorden, {nq} vragen, {sec/60:.1f} min')
    for i, d in enumerate(S):
        if 'q' in d["id"][2:]:
            nxt = S[i + 1]["tekst"]; eerste = re.split(r'(?<=[.?!])\s', nxt)[0]
            bad = re.search(r'\b(vraag|voorspel|antwoord|klopt|inderdaad|zoals je|juist|goed zo|precies)\b', eerste, re.I)
            print('  na', d["id"], d["juist"], '→', eerste[:90], '  !!' if bad else '')
        lang = [z for z in re.split(r'(?<=[.?!])\s', d["tekst"]) if len(z.split()) > 17]
        for z in lang: print('  LANG', d["id"], len(z.split()), z[:80])
        for w in ['past zich aan', 'passen zich aan', 'sterkste', 'wil ', 'willen', 'proberen', 'om te ']:
            if w in d["tekst"]: print('  LET OP', d["id"], repr(w))

# =====================================================================================================
# FILM 2 · NATUURLIJKE SELECTIE
# =====================================================================================================
O, H1, H2, H3, H4, R = 'Opening', 'H1 Te veel jongen', 'H2 Droogte op Daphne Major', 'H3 Wie wint?', 'H4 Aangepast, zonder doel', 'Samenvatting'
f2 = [
 ('e2s01', O, 'Macro', "Een merel zoekt in een struik naar rupsen. Op dit blad zit er een. Zie je hem?",
  "De merel draait zijn kop; op het blad ligt een groene rups langs de middennerf, eerst bijna onzichtbaar."),
 ('e2s02', O, 'Macro', "Een rups is niet sterk en niet snel. Toch overleven er elk jaar rupsen die de merel niet vindt. In de natuur draait het toch om de sterkste? Waarom wint dan niet altijd het sterkste dier?",
  "De merel pikt een bruine rups van een ander blad; de groene blijft liggen en krijgt een gouden rand."),
 ('e2s03', O, 'Schema', "", "Titelkaart: titel en puzzel; rechts de grondvink met een Tribulus-vruchtje."),
 # H1
 ('e2s04', H1, 'Macro', "Op een klein eiland in de Galápagos leeft de middelste grondvink. Een vrouwtje legt twee tot vijf eieren per keer. In een nat jaar broedt ze meerdere keren achter elkaar.",
  "Een vrouwtje landt bij een nest in een cactus; vier eieren worden zichtbaar, daarna een tweede legsel."),
 ('e2q05', H1, 'Schema', "Wat denk je? Het aantal vinken op het eiland blijft over de jaren ongeveer gelijk. Hoe kan dat?",
  "Vraagkaart met aftellijn.",
  "A De vinken krijgen alleen zoveel jongen als nodig is · B De ouders stoppen met broeden als het eiland vol is · C De meeste jongen sterven voordat ze zelf jongen krijgen", "C"),
 ('e2s06', H1, 'Schema', "Als elk jong zou overleven, verdubbelt de populatie keer op keer. Maar het eiland heeft maar zoveel zaden. De meeste jongen sterven voordat ze zelf gaan broeden. Er worden dus altijd meer nakomelingen geboren dan er kunnen overleven. Dat heet overproductie.",
  "Een gouden lijn 'als alle jongen overleven' schiet omhoog; de echte lijn (groen) blijft onder de streep 'zoveel zaden'."),
 ('e2s07', H1, 'Macro', "Wie blijft er dan over? Dat is geen loterij. Geen twee vinken zijn hetzelfde.",
  "Een rijtje vinken op een tak; hun snavels verschillen zichtbaar in hoogte; één snavel licht goud op."),
 # H2
 ('e2s08', H2, 'Macro', "Dit eiland heet Daphne Major. Sinds het jaar 1973 vangen en meten de onderzoekers Peter en Rosemary Grant er bijna elke vink.",
  "Langzaam inzoomen op de vulkaankegel in zee; kleine vinken vliegen tussen de struikjes."),
 ('e2s09', H2, 'Schema', "Ze meten onder andere de snavelhoogte: hoe hoog de snavel aan de basis is. De meeste vinken zitten rond de negen millimeter. Sommige hebben acht, andere elf. Dat is variatie. En die is grotendeels erfelijk: jongen lijken in snavelhoogte op hun ouders.",
  "Drie vinkenkoppen (8, 9,3 en 11 mm) boven het histogram; de staafjes groeien op van links naar rechts."),
 ('e2s10', H2, 'Macro', "Dan komt het jaar 1977. Er valt bijna geen regen. Er groeien nauwelijks nieuwe zaden, en de vinken eten eerst alle kleine, zachte zaadjes op.",
  "De struikjes op het eiland worden dor; de zachte zaadjes op de grond verdwijnen één voor één."),
 ('e2s11', H2, 'Macro', "Wat overblijft zijn de vruchtjes van Tribulus: ongeveer acht millimeter lang, hard, met scherpe stekels.",
  "Close-up: een vink pikt aan een Tribulus-vruchtje; het vruchtje kantelt maar breekt niet."),
 ('e2q12', H2, 'Schema', "Wat denk je? Welke vinken hebben de meeste kans om de droogte te overleven?",
  "Vraagkaart met aftellijn.",
  "A De vinken met de hoogste snavels · B De sterkste en snelste vinken · C Elke vink evenveel: de droogte treft iedereen", "A"),
 ('e2s13', H2, 'Macro', "Een hoge snavel kraakt een Tribulus-vruchtje sneller open. Een vink met een lage snavel krijgt het nauwelijks open, hoe hard hij ook werkt.",
  "Twee vinken naast elkaar: de vink met de hoge (gouden) snavel kraakt het vruchtje; de lage snavel glijdt eraf."),
 ('e2s14', H2, 'Schema', "Aan het begin van het jaar 1977 leven er ongeveer twaalfhonderd middelste grondvinken op het eiland. Een jaar later zijn er nog ongeveer honderdtachtig over.",
  "Een teller loopt van 1200 naar 180; in het raster van stippen dimt de ene na de andere vink."),
 ('e2s15', H2, 'Schema', "Kijk naar de overlevers. Hun snavels zijn gemiddeld ruim een halve millimeter hoger dan die van de vinken vóór de droogte. Dat lijkt weinig. Maar bij een hard vruchtje maakt het veel uit.",
  "Het histogram verliest vooral links staafjes; de gemiddelde-streep schuift een stukje naar rechts; de oude verdeling blijft als stippellijn."),
 ('e2q16', H2, 'Schema', "Wat denk je? De overlevers krijgen in het jaar 1978 jongen. Hoe hoog zijn de snavels van die jongen?",
  "Vraagkaart met aftellijn.",
  "A Net als vóór de droogte: het effect verdwijnt weer · B Gemiddeld hoger, maar nog steeds verschillend · C Allemaal hoog: de lage snavels zijn verdwenen", "B"),
 ('e2s17', H2, 'Schema', "De jongen van het jaar 1978 hebben gemiddeld een hogere snavel. Ongeveer vier procent hoger dan de vinken van vóór de droogte. Er zijn nog steeds lage, gemiddelde en hoge snavels. Het hele histogram is een stukje opgeschoven.",
  "Een nieuw histogram (jongen 1978) groeit op, met dezelfde breedte, iets naar rechts; de stippellijn van 1976 blijft staan."),
 ('e2s18', H2, 'Schema', "Snavelhoogte hangt af van veel genen. Vereenvoudigd kun je het zo zien: allelen voor een hoge snavel zijn vaker geworden in de genenpool. De allelfrequentie is veranderd. Dat is evolutie, in één generatie.",
  "De pot van 1976 en die van 1978 naast elkaar; de allelbalk schuift van 45 naar 60 procent teal."),
 # H3
 ('e2s19', H3, 'Schema', "Wat gebeurde er op Daphne Major? Er waren drie dingen nodig. Eén: erfelijke variatie. De vinken verschilden, en dat verschil ging over op de jongen. Twee: meer nakomelingen dan er kunnen overleven. Drie: selectiedruk. De droogte bepaalde wie bleef leven.",
  "Drie kaarten bouwen op één basislijn op, elk met een klein icoon: snavels, eieren, een dor takje."),
 ('e2s20', H3, 'Schema', "Samen heet dat natuurlijke selectie. Een hoge snavel gaf een selectievoordeel. Dat is een erfelijke eigenschap waardoor je meer kans hebt om te overleven en jongen te krijgen.",
  "Onder de drie kaarten verschijnt een groene haak met 'natuurlijke selectie'; de hoge snavel krijgt het label 'selectievoordeel'."),
 ('e2s21', H3, 'Schema', "Biologen meten dat succes met fitness. Fitness is het aantal nakomelingen dat zelf overleeft en zich voortplant. Het gaat dus niet om hoe groot, sterk of snel je bent.",
  "Een vink met daaronder een rijtje jongen; alleen de jongen die zelf weer jongen krijgen tellen mee (de rest dimt)."),
 ('e2q22', H3, 'Schema', "Wat denk je? Twee vinken. Welke vink heeft de hoogste fitness?",
  "Vraagkaart met aftellijn.",
  "A Kleine vink: leeft 4 jaar, 6 jongen die zelf broeden · B Grote, sterke vink: leeft 10 jaar, 2 jongen die broeden · C Allebei even hoog: fitness gaat over de soort", "A"),
 ('e2s23', H3, 'Schema', "De kleine vink met zes broedende jongen geeft de meeste allelen door. Een lang leven telt alleen als het meer nakomelingen oplevert. Daarom wint in de natuur niet altijd het sterkste dier. Het dier dat wint, krijgt de meeste nakomelingen die zelf ook weer jongen krijgen. Soms is dat de sterkste. Vaak niet.",
  "De grote vink met twee jongen naast de kleine vink met zes; boven de kleine verschijnt in groen 'hoogste fitness'."),
 # H4
 ('e2s24', H4, 'Macro', "Terug naar de rups. In een populatie rupsen zijn er groenere en bruinere. De merel vindt de bruine het eerst. Groene rupsen worden vaker vlinder en krijgen meer nakomelingen.",
  "Op een tak met bladeren zitten vijf rupsen; de merel pikt twee bruine weg (gedimd); drie groene blijven."),
 ('e2s25', H4, 'Macro', "Zo is groen generatie na generatie de gewone kleur geworden. Een erfelijke eigenschap die door natuurlijke selectie algemeen is geworden, heet een adaptatie. De groene kleur van deze rups is camouflage: hij valt weg tegen het blad.",
  "Een generatieteller loopt op; steeds meer rupsen zijn groen; label 'adaptatie' bij de rups."),
 ('e2q26', H4, 'Schema', "Wat denk je? Een groene rups valt op een rood blad. Wat gebeurt er met hem?",
  "Vraagkaart met aftellijn.",
  "A Hij wordt binnen een paar dagen rood · B Zijn jongen worden roder, omdat hij dat nodig had · C Zijn kleur blijft groen: de merel ziet hem nu makkelijker", "C"),
 ('e2s27', H4, 'Schema', "Een individu verandert niet door selectie. De rups blijft groen, ook op een rood blad. Selectie heeft geen doel en maakt niets nieuws. Ze werkt alleen met de variatie die er al is. Nieuwe allelen ontstaan door toevallige mutaties. Hoe dat gebeurt, zie je in de DNA-reeks.",
  "Drie misvattingen staan doorgestreept op kaarten; de goede zin staat eronder met een groene haak."),
 ('e2s28', H4, 'Schema', "Ook op Daphne Major had selectie geen vaste richting. Na de droogte hadden hoge snavels het voordeel. Na de natte El Niño-jaren van het jaar 1983 lagen er vooral kleine, zachte zaadjes. Toen deden juist vinken met een kleinere snavel het beter. Wat een voordeel is, hangt af van de omgeving.",
  "Lijngrafiek gemiddelde snavelhoogte: omhoog na 1977, omlaag na 1983 (gestileerd, label 'vereenvoudigd')."),
 # Samenvatting
 ('e2s29', R, 'Schema', "Natuurlijke selectie heeft drie dingen nodig: erfelijke variatie, meer nakomelingen dan er kunnen overleven, en selectiedruk. Wie de meeste nakomelingen grootbrengt die zelf jongen krijgen, geeft de meeste allelen door. Voor een rups is dat de groene. Voor een vink in een droog jaar is het die met de hoogste snavel. Niet de sterkste.",
  "Samenvatting: de rups, de vink en de pot naast elkaar; de allelbalk schuift nog één keer."),
 ('e2s30', R, 'Schema', "", "Eindkaart: drie kernzinnen met een groene haak; volgende film: Vormen van selectie."),
]
meta2 = {"film": 2, "titel": "Natuurlijke selectie", "slug": "2-natuurlijke-selectie",
 "puzzel": "Waarom wint niet altijd het sterkste dier?",
 "haak": "Een groene rups op een groen blad, een merel die zoekt: de rups die blijft, is niet de sterkste maar de onzichtbare.",
 "hoofdstukken": [
  {"nr": 1, "titel": "Te veel jongen", "minivraag": "Waarom blijft het aantal vinken gelijk als ze zoveel jongen krijgen?", "type": "F", "look": "Macro"},
  {"nr": 2, "titel": "Droogte op Daphne Major", "minivraag": "Welke vinken overleven een jaar zonder regen?", "type": "F", "look": "Schema"},
  {"nr": 3, "titel": "Wie wint?", "minivraag": "Wat bedoelt een bioloog met fitness?", "type": "F", "look": "Schema"},
  {"nr": 4, "titel": "Aangepast, zonder doel", "minivraag": "Wordt een rups groen omdat hij dat nodig heeft?", "type": "F", "look": "Macro"}]}
extra2 = {
 "checkvragen": [
  {"niveau": "basis", "vraag": "Noem de drie voorwaarden voor natuurlijke selectie en geef bij elke voorwaarde het voorbeeld van Daphne Major.", "antwoord": "Erfelijke variatie (snavelhoogte verschilt en gaat over op de jongen); meer nakomelingen dan er kunnen overleven (2–5 eieren per legsel, meerdere legsels, maar de populatie groeit niet); selectiedruk (de droogte van 1977: alleen harde Tribulus-vruchtjes over)."},
  {"niveau": "basis", "vraag": "Na de droogte van 1977 hadden de jongen van 1978 gemiddeld hogere snavels. Leg uit waarom dit evolutie is en waarom de individuele vinken niet geëvolueerd zijn.", "antwoord": "De allelfrequentie in de populatie veranderde: vinken met allelen voor een hoge snavel overleefden vaker en kregen meer jongen. Een vink houdt zijn hele leven dezelfde snavel; alleen de samenstelling van de populatie veranderde van generatie op generatie."},
  {"niveau": "basis", "vraag": "Muis P is groot en sterk, wordt drie jaar en brengt twee jongen groot. Muis Q is klein, wordt één jaar en brengt acht jongen groot die zelf jongen krijgen. Welke muis heeft de hoogste fitness? Leg uit.", "antwoord": "Muis Q: fitness is het aantal nakomelingen dat zelf overleeft en zich voortplant, niet kracht of levensduur."},
  {"niveau": "basis", "vraag": "Een leerling zegt: 'Rupsen zijn groen geworden zodat vogels ze niet zien.' Verbeter deze zin.", "antwoord": "Er waren erfelijk groenere en minder groene rupsen; vogels aten de opvallende rupsen vaker op, dus groene rupsen kregen meer nakomelingen en het allel voor groen werd vaker. Geen doel: selectie kiest uit bestaande variatie."},
  {"niveau": "basis", "vraag": "Leg uit waarom na de natte jaren rond 1983 juist vinken met een kleinere snavel in het voordeel waren.", "antwoord": "De omgeving (de selectiedruk) was veranderd: er waren vooral kleine, zachte zaadjes, en die eet een vink met een kleine snavel sneller en efficiënter. Wat een selectievoordeel is, hangt af van de omgeving."}],
 "begrippen": [
  {"begrip": "overproductie", "uitleg": "Er worden meer nakomelingen geboren dan er kunnen overleven, omdat voedsel en ruimte beperkt zijn.", "niveau": "basis"},
  {"begrip": "variatie", "uitleg": "Individuen van een populatie verschillen van elkaar, zoals in snavelhoogte; een deel van die verschillen is erfelijk.", "niveau": "basis"},
  {"begrip": "selectiedruk", "uitleg": "Een factor uit de omgeving (biotisch of abiotisch) die bepaalt welke individuen meer kans hebben om te overleven en zich voort te planten, zoals de droogte van 1977 of een merel die rupsen zoekt.", "niveau": "basis"},
  {"begrip": "selectievoordeel", "uitleg": "Een erfelijke eigenschap waardoor een individu meer kans heeft om te overleven en nakomelingen te krijgen dan andere individuen.", "niveau": "basis"},
  {"begrip": "natuurlijke selectie", "uitleg": "Bij erfelijke variatie, overproductie en selectiedruk krijgen individuen met een selectievoordeel meer nakomelingen, zodat hun allelen in de volgende generaties vaker voorkomen.", "niveau": "basis"},
  {"begrip": "fitness", "uitleg": "Het aantal nakomelingen van een individu dat zelf overleeft en zich voortplant. Niet: kracht, grootte of conditie.", "niveau": "basis"},
  {"begrip": "adaptatie", "uitleg": "Een erfelijke eigenschap die door natuurlijke selectie algemeen is geworden omdat ze in een bepaalde omgeving een selectievoordeel geeft.", "niveau": "basis"},
  {"begrip": "camouflage", "uitleg": "Een kleur of vorm waardoor een organisme wegvalt tegen zijn omgeving en minder snel wordt gezien.", "niveau": "basis"},
  {"begrip": "evolutie", "uitleg": "Verandering van de allelfrequenties in een populatie over generaties. Populaties evolueren, individuen niet (uit film 1).", "niveau": "basis"}],
 "getallen": [
  {"waarde": "middelste grondvink ± 12,5 cm; man zwart, vrouw bruin gestreept", "bron": "Wikipedia, Medium ground finch"},
  {"waarde": "2–5 eieren per legsel; normaal 1–5 legsels per seizoen, in het natte jaar 1982–83 tot 10", "bron": "Gibbs & Grant, Ecological consequences of an exceptionally strong El Niño event on Darwin's finches (Ecology 1987; abstract via AGRIS); legselgrootte archief A2 (Grant & Grant)"},
  {"waarde": "Grants meten op Daphne Major sinds 1973", "bron": "Grant & Grant 2014, 40 Years of Evolution (archief A2, info.md)"},
  {"waarde": "januari 1977 ± 1200 middelste grondvinken, een jaar later 180 (± 85 % weg)", "bron": "Science Friday, 'Evolution happens more quickly than you think' (Grants); Boag & Grant 1981 Science (archief A2/A9)"},
  {"waarde": "snavelhoogte populatie vóór selectie 9,31 mm, overlevers die broedden 9,84 mm (verschil 0,53 mm = 'ruim een halve millimeter')", "bron": "Grant (1986) in Univ. of Vermont-leestekst 05_GalapagosFinches.pdf (tabel 5.6); OpenLearn noemt 9,2 → 9,9"},
  {"waarde": "jongen 1978: gemiddeld 9,70 mm, dus ± 0,4 mm (± 4 %) hoger dan 1976 ('ongeveer vier procent')", "bron": "05_GalapagosFinches.pdf (voorspeld 9,72, gemeten 9,70); PBS Evolution: '3 tot 4 % groter'"},
  {"waarde": "snavelhoogtes van ongeveer 8 tot 11 mm in de populatie (in beeld: 8, 9,3 en 11 mm)", "bron": "05_GalapagosFinches.pdf (grootteklassen < 7 tot > 11 mm, het meeste tussen 8 en 11)"},
  {"waarde": "Tribulus cistoides: deelvrucht ± 8 mm lang, hard, met stekels", "bron": "Grant & Grant 2006, Science 313:224 (bijschrift fig. 1)"},
  {"waarde": "in 1977 bijna geen regen (± 20 maanden vrijwel droog)", "bron": "05_GalapagosFinches.pdf; PBS: 551 dagen zonder regen"},
  {"waarde": "na El Niño 1982–83 selectie richting kleinere snavels en lichaam", "bron": "Gibbs & Grant 1987, Nature 327 (titel 'Oscillating selection on Darwin's finches'; abstract niet zelf geopend, samenvatting uit archief A2/A9)"},
  {"waarde": "merel ± 25 cm, ± 2× een grondvink", "bron": "algemene veldgidskennis (niet apart gecontroleerd, alleen voor de tekening)"}],
 "uitspraak": [
  {"woord": "Galápagos", "invoer": "Galápagos", "ipa": "ɣaːˈlaːpaɣɔs", "bron": "eigen transcriptie (klemtoon op 'la'); archief A2 sprak het zo in"},
  {"woord": "Daphne Major", "invoer": "Daphne Major", "ipa": "ˈdɛfni ˈmeːdʒər", "bron": "Engelse eilandnaam; archief A2 (Engels); nl.wiktionary niet bereikbaar vanuit deze sessie"},
  {"woord": "Peter en Rosemary Grant", "invoer": "Peter en Rosemary Grant", "ipa": "ˈpitər ɛn ˈroʊzməri ɡrænt", "bron": "Engels; archief A2 (Rosemary Grant Engels)"},
  {"woord": "Tribulus", "invoer": "Tribulus", "ipa": "ˈtribylʏs", "bron": "Latijnse plantennaam, klemtoon op de eerste lettergreep; archief A2 zoals geschreven"},
  {"woord": "El Niño-jaren", "invoer": "El Ninjo-jaren", "ipa": "ɛl ˈniɲo", "bron": "Spaans; archief A2 gebruikte 'El Ninjo'"},
  {"woord": "fitness", "invoer": "fitness", "ipa": "ˈfɪtnəs", "bron": "Engels leenwoord, Van Dale; archief A2 zoals geschreven"},
  {"woord": "camouflage", "invoer": "camouflage", "ipa": "kaːmuˈflaːʒə", "bron": "Van Dale (klemtoon op 'fla'); eleven_v4 spreekt gewone spelling meestal goed (UITSPRAAK.md 18 okt)"},
  {"woord": "adaptatie", "invoer": "adaptatie", "ipa": "aːdɑpˈtaː(t)si", "bron": "Van Dale (klemtoon op 'ta'); gewone spelling bij v4"},
  {"woord": "allelfrequentie", "invoer": "allelfrequentie", "ipa": "ɑˈleːlfrəˌkʋɛnsi", "bron": "eigen transcriptie; allel staat in de Erfelijkheid-reeks"},
  {"woord": "jaartallen", "invoer": "in het jaar 1973 / 1977 / 1978 / 1983", "ipa": "", "bron": "uitspraaklijst (vaste regel)"},
  {"woord": "DNA-reeks", "invoer": "deeënaa-reeks", "ipa": "", "bron": "uitspraaklijst"}],
 "nieuw_in_bibliotheek": [
  "grondvink(ctx, x, y, s, {snavel: mm, kleed, snavelKleur, pik, tak}) — middelste grondvink (Geospiza fortis), snavelhoogte instelbaar in mm, 1 eenheid = 0,5 mm (teken_evo2.js)",
  "tribulus(ctx, x, y, s, {rot}) — deelvrucht van Tribulus cistoides (± 8 mm, twee stekels); zaadje() — klein zacht zaad op dezelfde schaal",
  "rups(ctx, x, y, s, {kleur, krom}) — rups als één doorlopende lijfvorm met segmentbanden, borst-, buikpoten en naschuivers (C9-les)",
  "blad(ctx, x, y, w, {rot, kleur}) — loofblad met hoofd- en zijnerven",
  "merel(ctx, x, y, s, {pik}) — merel (man), ± 2× de grondvink, oranjegele snavel en oogring",
  "daphneMajor(ctx, x, y, w, {droog}) — tufkegel met krater in zee, struikjes groen of dor"],
 "keuzes_en_twijfels": [
  "Puzzel A gekozen. Haak (rups/merel) als cold open en terug in H4 en de samenvatting; de vink is de hoofdcasus.",
  "H1 (overproductie) gebruikt al de grondvinken (nest in een cactus) zodat de casus doorloopt; Daphne Major wordt pas in H2 bij naam genoemd. Malthus bewust weggelaten (geen geschiedenis van Darwin in deze reeks).",
  "Snavelhoogte is polygeen. De pot/allelbalk in e2s18 is daarom vereenvoudigd en zegt dat ook ('Snavelhoogte hangt af van veel genen. Vereenvoudigd …'). Getallen in de allelbalk (45 → 60 %) zijn illustratief, geen meting: label 'vereenvoudigd' in beeld.",
  "Populatiegetallen: 'ongeveer twaalfhonderd → ongeveer honderdtachtig' volgens Science Friday (Grants). Andere lesbronnen noemen afwijkende aantallen (OpenLearn ± 1400 → enkele honderden in ruim twee jaar; tabel Grant 1986: 751 gemeten → 90 overlevers). Ik houd de veelgebruikte afgeronde getallen aan; het origineel (Boag & Grant 1981) kon ik niet openen.",
  "Snavelhoogte: 'ruim een halve millimeter' (9,31 → 9,84) en jongen 'ongeveer vier procent hoger' (9,31 → 9,70). De fokkersvergelijking (R = h²S) blijft weg (seriebrief).",
  "El Niño-omkering (e2s28): bron is Gibbs & Grant 1987 via het archief; de titel bevestigd, het abstract kon ik niet openen. Grafiek gestileerd en gelabeld 'vereenvoudigd'.",
  "'Adaptatie' wordt gedefinieerd als eigenschap (resultaat), niet als handeling; nergens 'past zich aan'. Controleer of je in de les 'aanpassing' of 'adaptatie' wilt (BvJ en Nectar gebruiken beide).",
  "Fitnessvraag (e2q22) gebruikt vinken in plaats van muizen (archief A6) zodat de casus doorloopt.",
  "Niet zeggen: 'survival of the fittest' als 'de sterkste overleeft'; 'de vinken pasten hun snavel aan'; 'de droogte veroorzaakte grotere snavels'; 'evolutie is altijd langzaam' (hier: meetbaar in één generatie); 'Darwin zag de vinkensnavels op de Galápagos en begreep het meteen' (mythe); 'alle vinken met lage snavels gingen dood' (er overleefden ook lage snavels, alleen minder vaak).",
  "Testvel: twee rondes (out/teken_evo2,teken_evo3,tv2/: vel1–3 en zoom). Ronde 2 hertekend: Tribulus (was een broodje, nu wig met doornen), pijlstaartvlinder (vleugels lazen als cicade), edelhert (benen als stokjes zonder hak), staarten van grondvink en merel (te lang), achtervleugels berkenspanner. Geen referentiemap beschikbaar; alles op tekstbeschrijvingen en maten gebaseerd.",
  "Rups: geen specifieke soort genoemd (groene spannerrups); rups-casus alleen als haak, geen getallen. De berkenspanner zit in film 3 en wordt hier niet genoemd.",
  "Alle vraagantwoorden wisselen: C, A, B, A, C."]}

# =====================================================================================================
# FILM 3 · VORMEN VAN SELECTIE
# =====================================================================================================
O, H1, H2, H3, H4, H5, R = 'Opening', 'H1 Gerichte selectie', 'H2 Stabiliserende selectie', 'H3 Splitsende selectie', 'H4 Seksuele selectie', 'H5 Co-evolutie', 'Samenvatting'
f3 = [
 ('e3s01', O, 'Macro', "Een pauw sleept een staart van ongeveer anderhalve meter achter zich aan. Die veren kosten energie om te maken, en ze vallen op voor roofdieren. Toch heeft elke pauwhaan zo'n staart.",
  "Een pauw stapt van links naar rechts door het gras; de sleep schuift over de grond achter hem aan."),
 ('e3s02', O, 'Schema', "Selectie werkt niet altijd op dezelfde manier. Neem baby's. Heel kleine baby's hebben het moeilijker dan grotere. Waarom worden baby's dan niet elke generatie zwaarder?",
  "Verloskundige Mirjam legt een baby op de weegschaal; het display telt op."),
 ('e3s03', O, 'Schema', "", "Titelkaart: titel en puzzel; rechts drie kleine histogrammen (verschoven, smal, twee toppen)."),
 # H1
 ('e3s04', H1, 'Macro', "Dit is een berkenspanner, een nachtvlinder. Overdag zit hij stil op een boomstam. Er bestaat een lichte vorm met zwarte spikkels en een bijna zwarte vorm. Het verschil komt door één gen met twee allelen.",
  "Inzoomen op een lichte stam met korstmos; de lichte vlinder valt weg, de zwarte valt op."),
 ('e3s05', H1, 'Macro', "Rond Manchester wordt in het jaar 1848 voor het eerst een zwarte berkenspanner gevangen. Fabrieken stoken dag en nacht steenkool. Roet maakt de stammen zwart, en de lichte korstmossen sterven af.",
  "De schors wordt donkerder van roet; korstmosvlekken verdwijnen; nu valt de lichte vlinder op."),
 ('e3q06', H1, 'Schema', "Wat denk je? Wat gebeurt er de jaren daarna met de berkenspanners rond Manchester?",
  "Vraagkaart met aftellijn.",
  "A De lichte vlinders worden donker van het roet · B Vogels eten vaker lichte vlinders: zwart wordt vaker · C Er verandert niets: de vlinders blijven zoals ze waren", "B"),
 ('e3s07', H1, 'Macro', "Op een zwarte stam vindt een vogel de lichte vlinders het eerst. Zwarte vlinders worden minder vaak opgegeten en krijgen meer nakomelingen. In het jaar 1895 is rond Manchester ongeveer achtennegentig procent van de berkenspanners zwart.",
  "Een koolmees landt op de zwarte stam en pikt de lichte vlinder; de zwarte blijft zitten. Teller: 98 % zwart."),
 ('e3s08', H1, 'Schema', "Dan komen er wetten voor schone lucht, zoals in het jaar 1956. De stammen worden weer licht. Nu hebben de lichte vlinders het voordeel, en het zwarte allel wordt weer zeldzaam. Tegenwoordig is nog maar een paar procent zwart.",
  "Grafiek 'aandeel zwart' (oker): stijgt van bijna 0 in 1848 naar 98 % in 1895, daalt na 1956 tot een paar procent (gestileerd)."),
 ('e3s09', H1, 'Schema', "Dit heet gerichte selectie. Eén kant van de variatie heeft een voordeel. Het gemiddelde schuift die kant op, generatie na generatie. Je zag het ook bij de vinken van Daphne Major.",
  "Het histogram schuift naar rechts; de oude verdeling blijft als stippellijn; groene haak 'gerichte selectie'."),
 # H2
 ('e3s10', H2, 'Schema', "Verloskundige Mirjam weegt een pasgeboren baby. Baby's verschillen in geboortegewicht. Dat komt door de voeding en gezondheid van de moeder, maar deels ook door erfelijke aanleg.",
  "Mirjam naast de babyweegschaal; het display toont het gewicht."),
 ('e3s11', H2, 'Schema', "In Londen hielden artsen het bij voor duizenden baby's, geboren tussen het jaar 1935 en het jaar 1946. Ze noteerden het geboortegewicht, en of de baby de eerste weken overleefde.",
  "Een histogram van geboortegewicht bouwt op, met de as in kilo's."),
 ('e3q12', H2, 'Schema', "Wat denk je? Welke baby's hadden toen de grootste kans om te overleven?",
  "Vraagkaart met aftellijn.",
  "A De baby's met een gemiddeld gewicht · B De zwaarste baby's · C De lichtste baby's: die worden makkelijker geboren", "A"),
 ('e3s13', H2, 'Schema', "Baby's van ongeveer drieënhalve kilo overleefden het vaakst. Veel lichtere baby's hadden het moeilijk. Maar heel zware baby's ook: dan was de geboorte gevaarlijker.",
  "Over het histogram tekent zich een groene overlevingscurve met een top rond 3,5 kg; de randen dimmen."),
 ('e3s14', H2, 'Schema', "Dit heet stabiliserende selectie. Beide uitersten hebben een nadeel. Het gemiddelde blijft staan, en de spreiding wordt kleiner.",
  "Het histogram wordt smaller en hoger rond hetzelfde midden; groene haak 'stabiliserende selectie'."),
 ('e3s15', H2, 'Schema', "Daarom werden baby's niet steeds zwaarder: zware baby's hadden net zo goed een nadeel als lichte. Met goede zorg is dat nu veranderd. Dankzij couveuses en keizersneden overleven baby's van twee en een half tot vier en een half kilo bijna allemaal even goed. Die selectiedruk is in landen met goede zorg grotendeels verdwenen.",
  "De overlevingscurve wordt vlakker tussen 2,5 en 4,5 kg; label 'nu, met goede zorg'."),
 # H3
 ('e3s16', H3, 'Macro', "In Kameroen leeft de zwartbuikzaadkraker. In één en dezelfde populatie heeft de ene vogel een kleine snavel en de andere een grote.",
  "Twee zaadkrakers op een stengel zegge; hun snavels verschillen duidelijk."),
 ('e3s17', H3, 'Macro', "Met een kleine snavel eet je sneller de zachte zaden van de ene zegge. Een grote snavel kraakt de harde zaden van een andere zegge. Een snavel ertussenin is in geen van beide goed.",
  "Links kleine zachte zaadjes bij de kleine snavel, rechts harde zaden bij de grote; een middelgrote snavel ertussen dimt."),
 ('e3q18', H3, 'Schema', "Wat denk je? Wat gebeurt er met de snavels in deze populatie?",
  "Vraagkaart met aftellijn.",
  "A Ze worden middelgroot: het beste van twee werelden · B Alle snavels worden groot: harde zaden leveren meer op · C Twee groepen, klein en groot, met weinig ertussen", "C"),
 ('e3s19', H3, 'Schema', "Vogels met een snavel in het midden overleven het slechtst. Het histogram krijgt twee toppen. Dit heet splitsende selectie. Bij deze vogel bepaalt vooral één gen of de snavel klein of groot wordt.",
  "Het histogram zakt in het midden in en splitst in twee toppen; groene haak 'splitsende selectie'."),
 # H4
 ('e3s20', H4, 'Macro', "Terug naar de pauw. Bij pauwen kiest het vrouwtje, de pauwin. De pauw zet zijn staart op als een waaier en laat de veren trillen.",
  "De pauw zet zijn sleep op tot een waaier en draait naar de pauwin; de oogvlekken trillen."),
 ('e3q21', H4, 'Schema', "Wat denk je? Waarom blijft zo'n opvallende staart generatie na generatie bestaan?",
  "Vraagkaart met aftellijn.",
  "A Hij schrikt roofdieren af · B Pauwinnen kiezen vaker een pauw met een volle staart · C De pauw laat hem groeien omdat hij hem nodig heeft", "B"),
 ('e3s22', H4, 'Macro', "Een pauw met veel minder oogvlekken wordt minder vaak gekozen. Wie gekozen wordt, krijgt meer jongen, ook als hij zelf wat korter leeft. Dit heet seksuele selectie: selectie door het andere geslacht. Welke delen van de staart het zwaarst wegen, onderzoeken biologen nog.",
  "De pauwin loopt langs twee pauwen en stopt bij de pauw met de volle waaier; de andere dimt."),
 ('e3s23', H4, 'Macro', "Seksuele selectie kan ook via strijd gaan. Edelherten vechten in de bronst met hun gewei om de hinden. Ongeveer een op de vier volwassen herten raakt elk jaar gewond. Maar een hert dat wint, krijgt veel nakomelingen.",
  "Twee edelherten staan tegenover elkaar; ze laten de koppen zakken en de geweien haken in elkaar."),
 ('e3s24', H4, 'Schema', "Een kenmerk kan dus een nadeel zijn om te overleven, en toch winnen bij het voortplanten. Fitness telt nakomelingen, geen levensjaren.",
  "Weegschaal-schema: links 'overleven' (koraal, iets omlaag), rechts 'voortplanten' (groen, zwaarder)."),
 # H5
 ('e3s25', H5, 'Macro', "Op Madagaskar groeit Darwins orchidee. De nectar zit onderin een buis van twintig tot vijfendertig centimeter lang.",
  "Een witte stervormige bloem in de nacht; de camera volgt de lange spoor naar beneden tot de nectar (goud)."),
 ('e3s26', H5, 'Macro', "Darwin bekeek deze bloem in het jaar 1862. Hij voorspelde: er moet een insect bestaan met een tong die bijna net zo lang is.",
  "Naast de bloem verschijnt een liniaal van 30 cm; een stippellijn tekent een tong die er nog niet is."),
 ('e3q27', H5, 'Schema', "Wat denk je? Waarom zijn de buis en de tong allebei zo lang geworden?",
  "Vraagkaart met aftellijn.",
  "A De bloem maakte haar buis langer voor deze vlinder · B Toeval: ze passen toevallig bij elkaar · C Ze waren generaties lang elkaars selectiedruk", "C"),
 ('e3s28', H5, 'Macro', "In het jaar 1903 werd de pijlstaartvlinder beschreven die erbij past. Zijn tong kan bijna dertig centimeter lang zijn. Een bloem met een langere buis dwingt de vlinder diep te steken. Zijn kop raakt dan het stuifmeel, en de bloem wordt vaker bestoven. Een vlinder met een langere tong haalt meer nectar.",
  "De pijlstaartvlinder hangt stil voor de bloem, rolt zijn tong uit en steekt hem tot onderin de spoor; stuifmeel blijft aan zijn kop."),
 ('e3s29', H5, 'Schema', "Zo zijn de twee soorten elkaars selectiedruk, generatie na generatie. Dat heet co-evolutie.",
  "Twee pijlen in een kring: 'langere buis' (groen) en 'langere tong' (oker) duwen elkaar rond; haak 'co-evolutie'."),
 # samenvatting
 ('e3s30', R, 'Schema', "Selectie werkt dus op verschillende manieren. Gerichte selectie schuift het histogram op. Stabiliserende selectie maakt het smaller. Splitsende selectie geeft twee toppen. Daarom werden baby's niet steeds zwaarder: het midden had de hoogste fitness. En de pauw verliest misschien iets bij het overleven, maar wint bij het voortplanten.",
  "De drie histogrammen naast elkaar op één basislijn, met daarboven de berkenspanner, de baby en de zaadkraker."),
 ('e3s31', R, 'Schema', "", "Eindkaart: drie kernzinnen met een groene haak; volgende film: De mens als selectiefactor."),
]
meta3 = {"film": 3, "titel": "Vormen van selectie", "slug": "3-vormen-van-selectie",
 "puzzel": "Waarom worden baby's niet steeds zwaarder?",
 "haak": "Een pauw sleept een staart van anderhalve meter mee die energie kost en opvalt, en toch heeft elke pauwhaan er een.",
 "hoofdstukken": [
  {"nr": 1, "titel": "Gerichte selectie", "minivraag": "Waarom werden de berkenspanners rond Manchester zwart?", "type": "F", "look": "Macro"},
  {"nr": 2, "titel": "Stabiliserende selectie", "minivraag": "Welke baby's overleefden het vaakst?", "type": "F", "look": "Schema"},
  {"nr": 3, "titel": "Splitsende selectie", "minivraag": "Kan een populatie twee kanten op tegelijk?", "type": "F", "look": "Macro"},
  {"nr": 4, "titel": "Seksuele selectie", "minivraag": "Waarom houdt een pauw een staart die hem niet helpt overleven?", "type": "F", "look": "Macro"},
  {"nr": 5, "titel": "Co-evolutie", "minivraag": "Wie bepaalt de lengte, de bloem of de vlinder?", "type": "F", "look": "Macro"}]}
extra3 = {
 "checkvragen": [
  {"niveau": "basis", "vraag": "Teken voor gerichte, stabiliserende en splitsende selectie hoe het histogram van een kenmerk verandert, en geef bij elk een voorbeeld uit de film.", "antwoord": "Gericht: het histogram schuift naar één kant (berkenspanner, vinken 1977). Stabiliserend: zelfde gemiddelde, smaller (geboortegewicht). Splitsend: twee toppen, het midden zakt in (zwartbuikzaadkraker)."},
  {"niveau": "basis", "vraag": "Leg uit waarom het aandeel zwarte berkenspanners na 1956 weer afnam.", "antwoord": "Door schonere lucht werden de stammen weer licht. Vogels vonden nu de zwarte vlinders vaker; lichte vlinders kregen meer nakomelingen, dus het allel voor licht werd weer vaker (gerichte selectie, de andere kant op)."},
  {"niveau": "basis", "vraag": "Waarom is een lange pauwenstaart een voorbeeld van seksuele selectie en niet van gewone natuurlijke selectie op overleven?", "antwoord": "De staart helpt niet bij overleven (hij kost energie en valt op), maar pauwinnen kiezen vaker pauwen met een volle staart. Die krijgen meer nakomelingen: selectie door het andere geslacht."},
  {"niveau": "basis", "vraag": "Leg met het voorbeeld van Darwins orchidee en de pijlstaartvlinder uit wat co-evolutie is.", "antwoord": "Twee soorten zijn elkaars selectiedruk: bloemen met een langere buis worden beter bestoven door vlinders die diep moeten steken; vlinders met een langere tong halen meer nectar. Zo werden buis en tong over vele generaties samen langer."},
  {"niveau": "basis", "vraag": "In Italië verdween tussen 1954 en 1994 de stabiliserende selectie op geboortegewicht grotendeels. Geef een verklaring.", "antwoord": "Door betere zorg rond de geboorte (couveuses, keizersneden) overleven bijna alle baby's tussen 2,5 en 4,5 kg; de uitersten hebben geen (groot) nadeel meer, dus de selectiedruk is weg."}],
 "begrippen": [
  {"begrip": "gerichte selectie", "uitleg": "Eén uiterste van de variatie heeft een selectievoordeel; het gemiddelde van het kenmerk verschuift die kant op.", "niveau": "basis"},
  {"begrip": "stabiliserende selectie", "uitleg": "Beide uitersten hebben een nadeel; het gemiddelde blijft gelijk en de spreiding wordt kleiner.", "niveau": "basis"},
  {"begrip": "splitsende selectie", "uitleg": "Beide uitersten hebben een voordeel en het midden een nadeel; de verdeling krijgt twee toppen.", "niveau": "basis"},
  {"begrip": "seksuele selectie", "uitleg": "Selectie door het andere geslacht: door partnerkeuze of door strijd om partners krijgen individuen met bepaalde kenmerken meer nakomelingen, ook als die kenmerken een nadeel zijn bij het overleven.", "niveau": "basis"},
  {"begrip": "co-evolutie", "uitleg": "Twee soorten zijn elkaars selectiedruk en evolueren daardoor samen, zoals een bloem en haar bestuiver.", "niveau": "basis"},
  {"begrip": "selectienadeel", "uitleg": "Een eigenschap waardoor een individu minder kans heeft om te overleven of nakomelingen te krijgen.", "niveau": "basis"}],
 "getallen": [
  {"waarde": "pauw: sleep tot ± 1,5 m, ± 300 g; groei kost ± 3 % van het dagelijkse energiebudget", "bron": "Askew 2014 (University of Leeds, persbericht); Wikipedia Indian peafowl (lengte tot 2,0–2,3 m met sleep)"},
  {"waarde": "sleep remt opstijgen en lopen niet meetbaar (dus niet 'trager' zeggen)", "bron": "Askew 2014; Thavarajah e.a. 2016, Scientific Reports 6:36512"},
  {"waarde": "pauwen met sterk verminderde oogvlekken minder vaak gekozen; natuurlijke verschillen in aantal oogvlekken maken weinig uit", "bron": "Dakin & Montgomerie 2011, Animal Behaviour (ScienceDaily); Takahashi e.a. 2008 (geen voorkeur); Petrie 1991 (wel voorkeur, archief A6)"},
  {"waarde": "berkenspanner: eerste zwarte bij Manchester in 1848; mutatie (transposon in het gen cortex) ontstond rond 1819", "bron": "Wikipedia Peppered moth evolution; Universiteit van Liverpool 2016 (van 't Hof e.a., Nature)"},
  {"waarde": "1895: ± 98 % zwart rond Manchester", "bron": "Darwin200, Christ's College Cambridge; Wikipedia Industrial melanism (Clarke e.a. 1985)"},
  {"waarde": "Clean Air Act 1956; nu nog 'een paar procent' zwart in Engeland en Wales", "bron": "Science News 2011 ('only a few percent'); eje.cz 2024 (Clean Air Act 1956)"},
  {"waarde": "vogelpredatie als hoofdoorzaak bevestigd (Majerus 2001–2007; Cook e.a. 2012, 4864 vlinders)", "bron": "Wikipedia Peppered moth evolution"},
  {"waarde": "geboortegewicht: baby's geboren in Londen 1935–1946; hoogste overleving rond 8 lb (3,6 kg); film zegt 'ongeveer drieënhalve kilo'", "bron": "Ridley, Evolution (Blackwell) tutorial Natural selection and variation, fig. Karn & Penrose 1951; mun.ca noemt 7 lb (zie twijfels)"},
  {"waarde": "Italië 1954–1994: stabiliserende selectie bijna verdwenen, sterfte 2,5–4,5 kg vrijwel gelijk", "bron": "Ulizzi e.a., Human Biology 74(4) 2002 (abstract)"},
  {"waarde": "zwartbuikzaadkraker Pyrenestes ostrinus ± 15 cm, man rood met zwarte buik; kleine snavel → zachte Scleria goossensii, grote → harde Scleria verrucosa; Kameroen", "bron": "Wikipedia Black-bellied seedcracker; Springer Nature 'Cracking the problem of bill size' (2018)"},
  {"waarde": "snavelmaat vooral bepaald door één gen (één autosomale factor, groot dominant; kandidaat IGF1)", "bron": "Smith 1993, Nature 363:618 (abstract); von Holdt e.a. 2018"},
  {"waarde": "edelhert: ± 23 % van de herten > 5 jaar raakt elk jaar gewond in de bronst ('ongeveer een op de vier')", "bron": "Clutton-Brock e.a. (Rum), via wildlifeonline.me.uk Red deer mortality"},
  {"waarde": "Darwins orchidee: spoor 20–35 cm (Darwin mat 11½ inch ≈ 29 cm)", "bron": "Wikipedia Xanthopan; Beccaloni 2017 (Wallace Fund)"},
  {"waarde": "Darwin voorspelde de vlinder in 1862 (boek over orchideeën); beschreven als praedicta in 1903 (Rothschild & Jordan); sinds 2021 eigen soort Xanthopan praedicta", "bron": "Beccaloni 2017; Wikipedia Xanthopan; Arnold Arboretum (Harvard)"},
  {"waarde": "tong tot 28,5 cm ('bijna dertig centimeter')", "bron": "Guinness World Records, Longest insect tongue (2021)"},
  {"waarde": "bestuiving in het wild pas waargenomen in 1992 (Wasserthal), eerste foto in het wild 2003", "bron": "Arnold Arboretum (Harvard); Beccaloni noemt 1997 — niet in het script"},
  {"waarde": "kortere spoor → minder bestuivingssucces (experiment)", "bron": "Nilsson 1988, Nature (via PMC2500161)"}],
 "uitspraak": [
  {"woord": "berkenspanner", "invoer": "berkenspanner", "ipa": "ˈbɛrkə(n)ˌspɑnər", "bron": "Van Dale; samenstelling, gewone spelling"},
  {"woord": "Manchester", "invoer": "Manchester", "ipa": "ˈmæntʃɪstər", "bron": "Engelse plaatsnaam"},
  {"woord": "achtennegentig", "invoer": "acht en neguntig", "ipa": "ˌɑxtənˈneːɣəntəx", "bron": "uitspraaklijst: negentig → neguntig; patroon 'vijf en neguntig'"},
  {"woord": "jaartallen", "invoer": "in het jaar 1848 / 1895 / 1956 / 1935 / 1946 / 1862 / 1903", "ipa": "", "bron": "uitspraaklijst (vaste regel)"},
  {"woord": "couveuses", "invoer": "couveuses", "ipa": "kuˈvøːzəs", "bron": "Van Dale (klemtoon op 'veu'); gewone spelling bij v4, op de wachtlijst"},
  {"woord": "keizersneden", "invoer": "keizersneden", "ipa": "ˈkɛizərˌsneːdə(n)", "bron": "Van Dale"},
  {"woord": "zwartbuikzaadkraker", "invoer": "zwartbuik-zaadkraker", "ipa": "ˈzʋɑrdbœykˌzaːtkraːkər", "bron": "eigen transcriptie; koppelteken in de invoer zodat de stem de samenstelling niet inslikt"},
  {"woord": "Kameroen", "invoer": "Kameroen", "ipa": "kaːməˈrun", "bron": "Nederlandse landnaam, klemtoon op 'roen'"},
  {"woord": "zegge", "invoer": "zegge", "ipa": "ˈzɛɣə", "bron": "Van Dale (plant)"},
  {"woord": "pauwin / pauwinnen", "invoer": "pauwin / pauwinnen", "ipa": "pɑuˈʋɪn", "bron": "Van Dale (klemtoon op 'win')"},
  {"woord": "bronst", "invoer": "bronst", "ipa": "brɔnst", "bron": "Van Dale"},
  {"woord": "Madagaskar", "invoer": "Madagaskar", "ipa": "maːdaːˈɣɑskɑr", "bron": "Nederlandse landnaam"},
  {"woord": "orchidee", "invoer": "orchidee", "ipa": "ɔrxiˈdeː", "bron": "Van Dale (klemtoon op 'dee'); op de wachtlijst"},
  {"woord": "co-evolutie", "invoer": "koo-evolutie", "ipa": "ˌkoːeːvoːˈly(t)si", "bron": "archief A6 (wachtlijst 'koo-evolutie'); seriebrief risicowoord"},
  {"woord": "pijlstaartvlinder", "invoer": "pijlstaartvlinder", "ipa": "ˈpɛilstaːrtˌflɪndər", "bron": "Van Dale"}],
 "nieuw_in_bibliotheek": [
  "berkenspanner(ctx, x, y, s, {vorm: 'licht'|'zwart'}) — Biston betularia in rusthouding, typica met spikkels en getande dwarslijnen, carbonaria egaal zwart, geveerde antennes op de kop (teken_evo3.js)",
  "schors(ctx, x, y, w, h, {roet}) — boomstam close-up, licht met korstmos of zwart van roet",
  "pauw(ctx, x, y, s, {waaier: 0|1}) — pauwhaan met sleep in rust (schuin omlaag over de grond) of opgezet als waaier met vier ringen oogvlekken; pauwin() — vrouw zonder sleep",
  "edelhert(ctx, x, y, s, {kop: 0..1}) — edelhert in de bronst met manen, gewei met oog-, ijs-, middenspruit en kroon, hak en pols op de juiste hoogte; kop omlaag = vechthouding",
  "zaadkraker(ctx, x, y, s, {snavel: 'klein'|'groot'}) — zwartbuikzaadkraker (man), zelfde schaal als grondvink",
  "orchidee(ctx, x, y, s, {spoor: mm}) + orchideeBladeren() — Darwins orchidee met spoor op ware lengte en nectar onderin (goud)",
  "pijlstaart(ctx, x, y, s, {tong, tongEind}) — Xanthopan praedicta van opzij, roltong opgerold of uitgestoken naar een doelpunt",
  "babyWeegschaal(ctx, x, y, w, {kg}) — babyweegschaal met display (voor castpersonage 'baby' en Verloskundige Mirjam)"],
 "keuzes_en_twijfels": [
  "Puzzel A gekozen (baby's). De haak uit de seriebrief ('een staart die hem trager maakt') is aangepast: metingen tonen dat de sleep opstijgen en lopen niet meetbaar remt (Askew 2014; Thavarajah 2016). De film zegt daarom: kost energie en valt op.",
  "Volgorde H1–H5 zoals in het reeksontwerp. H5 co-evolutie is een vijfde hoofdstuk; de film komt daardoor op ± 8 minuten.",
  "Berkenspanner: twee vormen (één gen) passen niet goed in een continu histogram. Daarom eerst een lijngrafiek 'aandeel zwart' (e3s08) en daarna pas het algemene vervormende histogram (e3s09). Grafiek gestileerd: geen echte meetreeks, label 'vereenvoudigd'.",
  "'Een gen met twee allelen' is vereenvoudigd: er zijn ook tussenvormen (insularia) en het zwarte allel (carbonaria) is dominant. Niet genoemd om één nieuw begrip tegelijk te houden.",
  "Geboortegewicht-optimum: bronnen verschillen (Ridley: 8 lb = 3,6 kg; mun.ca: 7 lb = 3,2 kg; archief: 3,6 kg en gemiddelde 7,1 lb). Film zegt 'ongeveer drieënhalve kilo'. Het aantal (13.730) uit het archief kon ik niet nalopen en staat daarom niet in het script.",
  "Stabiliserende selectie en de puzzel: het antwoord legt uit waarom het gemiddelde niet schuift. Dat geboortegewicht ook sterk door omgeving (voeding, zwangerschapsduur) bepaald wordt, staat in e3s10 (één zin).",
  "Pauw: de keuze van pauwinnen voor oogvlekken is omstreden (Petrie 1991 wel; Takahashi 2008 niet; Dakin & Montgomerie 2011: alleen sterk verminderde oogvlekken worden afgewezen). Script zegt precies dat en noemt dat biologen het nog onderzoeken.",
  "Edelherten: 'ongeveer een op de vier herten raakt elk jaar gewond' geldt voor herten ouder dan vijf jaar op Rum (Clutton-Brock); in het script 'volwassen herten'.",
  "Co-evolutie: de vraag 'Wie past zich aan wie aan?' uit de seriebrief (puzzel C) is herschreven zodat 'past zich aan' niet als handeling klinkt.",
  "Orchidee: naam Angraecum sesquipedale en vlindernaam Xanthopan praedicta alleen in beeld (Meta), niet gesproken. Darwin noemen mag hier (co-evolutie), zonder zijn reis.",
  "Niet zeggen: 'de pauwenstaart maakt hem trager/hij kan er niet mee vliegen'; 'Kettlewell plakte dode vlinders op stammen, dus het is nep' (de selectie is later bevestigd); 'de vlinders werden zwart van het roet'; 'Darwin vond de vlinder' (hij voorspelde hem; Wallace deed dat in 1867 ook); 'baby's worden nu door evolutie steeds zwaarder'; 'de bloem maakte de buis langer om de vlinder te dwingen'; 'het sterkste hert krijgt alle hinden'.",
  "Antwoordposities: B, A, C, B, C."]}

bouw(2, meta2, f2, extra2)
bouw(3, meta3, f3, extra3)
import textwrap
VR = {}
for sc in f2 + f3:
    if len(sc) > 5:
        v = sc[3].replace('Wat denk je? ', '')
        opt = [re.sub(r'^[ABCD] ', '', o.strip()) for o in sc[5].split(' · ')]
        VR[sc[0]] = {"vraag": textwrap.wrap(v, 60), "opties": opt}
        for o in opt:
            if len(o) > 58: print('  OPTIE TE LANG', sc[0], len(o), o)
open('/home/claude/evo2/src/vragen23.js', 'w').write('const VR = ' + json.dumps(VR, ensure_ascii=False, indent=1) + ';\n')
