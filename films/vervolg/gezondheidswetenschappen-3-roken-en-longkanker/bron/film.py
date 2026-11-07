import json
film = {
 "slug": "gezondheidswetenschappen-3-roken-en-longkanker", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Roken en longkanker", "sub": "hoe onderzoek een risico vindt",
 "puzzle": "Je kunt mensen niet laten roken voor een experiment. Hoe weet je dan dat roken kanker geeft?",
 "meta": "gezondheidswetenschappen · epidemiologie", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Gezondheidswetenschappen",
 "lead": "Yasmin loopt weer stage bij de GGD. Op het scherm van Epidemioloog Farid staat een getal over roken en longkanker, en Yasmin vraagt: hoe weten ze dat, als je mensen niet mag laten roken voor een proef? Samen zoeken ze uit waar het getal vandaan komt. Je ziet hoe een cohortonderzoek werkt (eerst meten wie rookt, dan jaren volgen), hoe een patiënt-controleonderzoek terugkijkt vanuit de ziekte, wat het verschil is tussen relatief en absoluut risico, en hoe een epidemioloog een verstorende factor opspoort. Tot slot: waarom je ook zonder experiment kunt zeggen dat roken longkanker veroorzaakt.",
 "endHaak": "welk verband uit het nieuws zou jij willen checken op een derde factor?",
 "minis": {"Hoofdstuk 1": "Hoe volg je groepen mensen jarenlang?", "Hoofdstuk 2": "Wat zie je als je terugkijkt vanuit de ziekte?", "Hoofdstuk 3": "Hoeveel keer, of hoeveel van de honderd?", "Hoofdstuk 4": "Wat als iets anders het verband verklaart?", "Recap": "Hoe weet je dat roken kanker geeft, zonder experiment?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Yasmin en Epidemioloog Farid (castboek). Decor: ElevenLabs (kantoor uit Gezondheidswetenschappen 1). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q06": {"q": "Wie bepaalde in het artsenonderzoek van Doll en Hill wie er rookte?", "correct": 1, "explain": "De artsen zelf: de onderzoekers vroegen het alleen en volgden iedereen daarna jarenlang. Zo'n gevolgde groep heet een cohort."},
  "q12": {"q": "Yasmin wil weten hoeveel rokers longkanker krijgen. Kan dat met de getallen uit het patiënt-controleonderzoek?", "correct": 2, "explain": "Nee: de onderzoekers kozen zelf hoeveel patiënten meededen, dus met meer patiënten verandert het percentage mee. Wel kun je vergelijken: patiënten rookten vaker en meer."},
  "q16": {"q": "In het artsenonderzoek liepen rokers ongeveer vijftien keer zoveel risico op longkanker. Wat betekent dat?", "correct": 0, "explain": "Relatief risico vergelijkt twee groepen: rokers hadden 15 keer zoveel kans. De kans zelf (absoluut risico) was ± 16 van de 100, niet bijna iedereen."},
  "q19": {"q": "Een krant schrijft: een stof verdubbelt de kans op een ziekte. Wat moet je nog weten om te snappen of dat veel is?", "correct": 1, "explain": "Hoe groot de kans zonder de stof al was. Van 1 naar 2 op de 10.000 is één persoon extra per 10.000: noem hoeveel keer én hoeveel van de honderd."},
  "q22": {"q": "Wie zes koppen koffie of meer per dag dronk, kreeg bijna vijf keer zo vaak longkanker als wie geen koffie dronk. Geeft koffie dus longkanker?", "correct": 2, "explain": "Nee: wie veel koffie drinkt, rookt vaker. Roken is een verstorende factor; bij mensen die nooit rookten is het verband vrijwel weg."},
  "q25": {"q": "Zonder experiment blijft er een beetje twijfel. Kun je toch zeggen dat roken longkanker veroorzaakt?", "correct": 0, "explain": "Ja: het verband is sterk, roken kwam vóór de ziekte, meer roken gaf meer risico en stoppen hielp. Alle aanwijzingen wijzen dezelfde kant op."}
 },
 "glossary": [
  {"t": "epidemiologie", "d": "Het vak dat onderzoekt hoe vaak een ziekte voorkomt in een bevolking, bij wie, en waardoor."},
  {"t": "observationeel onderzoek", "d": "Onderzoek waarin je kijkt naar wat mensen zelf al doen, zonder in te grijpen. Nodig als een experiment niet mag of niet kan, zoals mensen laten roken."},
  {"t": "cohortonderzoek", "d": "Je meet eerst bij een groep (het cohort) wie wel en niet blootgesteld is, bijvoorbeeld wie rookt, en volgt die mensen daarna jarenlang om te tellen wie ziek wordt. Zo krijg je de kans per groep."},
  {"t": "patiënt-controleonderzoek", "d": "Je begint bij mensen die de ziekte al hebben (patiënten) en een vergelijkbare groep zonder de ziekte (controles), en kijkt terug wat ze vroeger deden. Snel en handig bij een zeldzame ziekte, maar op zichzelf geeft het geen kans per roker."},
  {"t": "controlegroep", "d": "In een patiënt-controleonderzoek: mensen zonder de ziekte die verder zoveel mogelijk lijken op de patiënten (zelfde leeftijd, zelfde ziekenhuis), om mee te vergelijken."},
  {"t": "relatief risico", "d": "Hoeveel keer zo groot de kans in de ene groep is als in de andere, bijvoorbeeld rokers tegenover nooit-rokers. Het zegt niet hoe groot de kans zelf is."},
  {"t": "absoluut risico", "d": "De kans zelf: hoeveel van de honderd (of tienduizend) mensen in een groep de ziekte krijgt in een bepaalde tijd."},
  {"t": "verstorende factor", "d": "Een derde factor die samenhangt met allebei: met de mogelijke oorzaak en met de ziekte. Roken is een verstorende factor bij koffie en longkanker. Ook: verstorende variabele."},
  {"t": "dosis-effect", "d": "Hoe meer van iets (bijvoorbeeld sigaretten per dag), hoe groter het risico. Een van de aanwijzingen dat een verband een oorzaak is."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
