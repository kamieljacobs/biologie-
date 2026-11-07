import json, os
film = {
 "slug": "geschiedenis-van-de-biologie", "hoofdstuk": "extra", "hoofdstukNaam": "Nieuwsgierig?",
 "title": "Geschiedenis van de biologie", "sub": "Ontdekkingen die ons denken veranderden",
 "puzzle": "Hoe kom je achter iets nieuws, als bijna iedereen iets anders gelooft?",
 "meta": "geschiedenis van de biologie", "version": "1.0 · oktober 2026", "titleLook": "schema", "alleen": "havo · vwo",
 "seriesline": "Biologie bij Kamiel · Nieuwsgierig?",
 "lead": "Van Aristoteles tot CRISPR: tien ontdekkingen, de onderzoekers die ze deden en hoe ze het vonden. Steeds weer: zelf kijken, meten en laten nadoen in plaats van geloven wat in de boeken staat. En steeds weer verschoof het beeld van de mens: van de top van de ladder, via de primaten en de stamboom, naar een plek in het voedselweb. Met eerlijke kanttekeningen: wie geen erkenning kreeg, en hoe ontdekkingen werden misbruikt.",
 "endHaak": "welke ontdekking veranderde volgens jou het meest, en waarom?",
 "minis": {"Hoofdstuk 1": "Hoe kwam men erachter dat het hart een pomp is?", "Hoofdstuk 2": "Wat liet de microscoop zien, en waar staat de mens?", "Hoofdstuk 3": "Hoe veranderen soorten, en wat deed dat idee met de samenleving?", "Hoofdstuk 4": "Waar komt ziekte vandaan?", "Hoofdstuk 5": "Wat doen we met macht over het leven?", "Recap": "Wat moet je onthouden?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personage: Noor (castboek). Onderzoekers als gestileerde figuren met een attribuut, geen portretten. Stijl: Stijlkaart biologiefilms (Part C). Bronnen: zie het docentdeel. Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "In 1676 schreef een lakenhandelaar uit Delft aan de Royal Society in Londen dat er in een druppel water ontelbaar veel diertjes zwemmen. Wat deden de geleerden?", "correct": 1, "explain": "Ze probeerden het zelf. Eerst lukte dat niet; in november 1677 zag Robert Hooke de diertjes ook. Pas toen geloofden ze het: herhalen is de kern van wetenschap."},
  "q08": {"q": "Harvey schatte hoeveel bloed het hart per slag wegpompt, en telde de slagen. Hoeveel bloed pompt het hart dan in één uur?", "correct": 1, "explain": "Al in een half uur meer dan al het bloed in je lichaam; met wat we nu weten zo'n 300 liter per uur. Dat kan de lever nooit bijmaken: het bloed moet rondgaan."},
  "q14": {"q": "Darwin hield zijn idee ruim twintig jaar bijna voor zichzelf. Waarom publiceerde hij in 1858 ineens toch?", "correct": 0, "explain": "Alfred Russel Wallace stuurde hem vanuit wat nu Indonesië is een stuk met precies hetzelfde idee. Hun stukken werden samen voorgelezen; een jaar later verscheen Darwins boek."},
  "q19": {"q": "Wenen, 1847: op de afdeling van artsen en studenten stierven ongeveer vier keer zoveel moeders aan kraamvrouwenkoorts als op die van de vroedvrouwen. Wat was het verschil?", "correct": 0, "explain": "De artsen ontleedden lijken en onderzochten daarna, zonder handen te wassen, de vrouwen. Na handen wassen met chloorkalk daalde de sterfte naar ongeveer 2 procent."},
  "q27": {"q": "Artsen veranderen met CRISPR het DNA in bloedstamcellen van patiënten met sikkelcelziekte. In 2018 werd het DNA van embryo's veranderd. Wat is het grote verschil?", "correct": 0, "explain": "Bij een embryo zit de verandering in alle cellen, ook in de latere ei- of zaadcellen: alle volgende generaties erven hem. Bij de patiënt veranderen alleen bloedcellen; die worden niet doorgegeven."}
 },
 "glossary": [
  {"t": "replicatie (herhalen)", "d": "Een ander doet het onderzoek na en vindt hetzelfde. Pas dan geldt een waarneming als betrouwbaar; Hooke herhaalde in 1677 de waarneming van Van Leeuwenhoek."},
  {"t": "ladder van de natuur", "d": "Oud idee (Aristoteles) dat alle levende wezens op een rangorde staan, van planten via dieren tot de mens bovenaan. Vervangen door de stamboom van de evolutie."},
  {"t": "bloedsomloop", "d": "Het bloed stroomt steeds rond: het hart pompt het door de slagaders, via de haarvaten terug door de aders. Harvey (1628) toonde het aan met een berekening."},
  {"t": "cel", "d": "Kleinste bouwsteen van een organisme. De naam komt van Hooke (1665), die in kurk lege hokjes zag, naar de kamertjes van monniken."},
  {"t": "tweedelige naam", "d": "Wetenschappelijke naam van een soort: geslachtsnaam plus soortnaam, zoals Homo sapiens. Linnaeus maakte er een vast systeem van (planten 1753, dieren 1758)."},
  {"t": "primaten", "d": "Groep zoogdieren waartoe apen, halfapen en de mens horen. Linnaeus zette de mens in deze groep."},
  {"t": "natuurlijke selectie", "d": "Individuen verschillen; wie beter past bij de omgeving krijgt meer nakomelingen, zodat erfelijke eigenschappen in een populatie veranderen. Darwin en Wallace, 1858."},
  {"t": "sociaal-darwinisme", "d": "Het (onjuiste) toepassen van 'de sterkste overleeft' op de samenleving, om armoede en ongelijkheid natuurlijk te noemen. Evolutie beschrijft de natuur, geen moraal."},
  {"t": "eugenetica", "d": "Idee (Galton, 1883) om de mens te 'verbeteren' door te bepalen wie kinderen krijgt. Leidde tot gedwongen sterilisaties (VS) en misdaden in nazi-Duitsland."},
  {"t": "spontane generatie", "d": "Het oude idee dat leven vanzelf uit dode stof ontstaat. Pasteur weerlegde het met zijn zwanenhalsfles: leven komt van ander leven."},
  {"t": "kraamvrouwenkoorts", "d": "Infectie na een bevalling, vroeger vaak dodelijk. Semmelweis (1847) liet zien dat handen wassen de sterfte sterk verlaagt."},
  {"t": "antibioticum", "d": "Stof die bacteriën doodt of remt, zoals penicilline uit een schimmel (Fleming, 1928; medicijn dankzij Florey, Chain en Heatley)."},
  {"t": "resistentie", "d": "Bacteriën worden ongevoelig voor een antibioticum doordat overlevers met een erfelijke eigenschap zich vermenigvuldigen. Fleming waarschuwde al in 1945."},
  {"t": "dubbele helix", "d": "De vorm van DNA: twee strengen om elkaar heen gedraaid. Model van Watson en Crick (1953), mede op basis van foto 51 van Franklin en Gosling."},
  {"t": "ophoping in de voedselketen", "d": "Een stof die slecht afbreekt (zoals DDT) komt bij elke stap in de keten in hogere concentratie voor, met de hoogste in toppredatoren."},
  {"t": "CRISPR-Cas9", "d": "Systeem uit bacteriën waarmee je DNA op een gekozen plek knipt en kunt veranderen (Charpentier en Doudna, 2012)."},
  {"t": "kiembaan", "d": "Eicellen, zaadcellen en embryo's. Een verandering in de kiembaan is erfelijk; in Nederland mag je die niet gebruiken voor een zwangerschap (Embryowet)."}
 ],
 "sections": open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'sections.html'), encoding='utf-8').read()
}
json.dump(film, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'film.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
