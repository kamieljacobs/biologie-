import json
film = {
 "slug": "index",
 "audioPad": "audio",
 "hoofdstuk": "voortplanting",
 "hoofdstukNaam": "Voortplanting",
 "title": "Bevruchting",
 "sub": "van twee cellen naar één",
 "puzzle": "Honderden zaadcellen bereiken de eicel. Toch komt er maar één binnen. Hoe kan dat?",
 "meta": "voortplanting · bevruchting",
 "version": "1.0 · november 2026",
 "titleLook": "micro",
 "seriesline": "Biologie bij Kamiel · reeks Voortplanting · na <a href=\"../2-geslachtsorganen-puberteit.html\">Geslachtsorganen en puberteit</a> en De cyclus · daarna Zwanger",
 "lead": "De eicel waaruit jij bent gegroeid, lag al klaar toen je oma zwanger was van je moeder. In deze film zie je waarom een eicel zo groot is en een zaadcel zo klein, hoe de zaadcellen de eileider bereiken, waarom er maar één binnenkomt, en hoe de zygote zich deelt tot een holle bal van zo'n honderd cellen.",
 "endHaak": "Hoe blijft het embryo in de baarmoeder zitten, en hoe groeit het uit tot een baby?",
 "minis": {
  "Cold open": "Honderden zaadcellen, maar één komt binnen. Hoe?",
  "Hoofdstuk 1": "Waarom is een eicel zo groot, en een zaadcel zo klein?",
  "Hoofdstuk 2": "Hoeveel zaadcellen halen de eicel?",
  "Hoofdstuk 3": "Waarom kan er geen tweede zaadcel bij?",
  "Hoofdstuk 4": "Waarom wordt het embryo eerst niet groter?",
  "Recap": "Honderden zaadcellen, maar één komt binnen. Hoe?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Lichte remake van een deel van Van bevruchting tot baby (november 2026). Tekeningen: gedeelde bibliotheek (eicel, zaadcel, vrouwelijke organen, eileider, holle bal) en nieuw: bevruchting van dichtbij en klievingsdelingen. Stijl: Part C (prompt v13).",
 "questions": {
  "q07": {"q": "Waarom is het voor een zaadcel juist handig dat hij bijna geen cytoplasma meekrijgt?", "correct": 1,
          "explain": "Een zaadcel hoeft alleen zijn DNA af te leveren. Mitochondriën, ribosomen en voedingsstoffen voor de eerste dagen brengt de eicel mee."},
  "q13": {"q": "Een stel heeft seks drie dagen vóór de eisprong. Kan de eicel dan bevrucht worden?", "correct": 1,
          "explain": "Zaadcellen leven in de eileider tot een dag of vijf. Komt de eicel in die tijd vrij, dan kan een zaadcel die nog leeft haar bevruchten."},
  "q18": {"q": "Een zaadcel heeft de verandering onderweg niet doorgemaakt. Hij zwemt wel naar de eicel, maar bevrucht haar niet. Welke stap gaat er mis?", "correct": 2,
          "explain": "Zonder die verandering van het membraan gaat het acrosoom niet open. Er komt geen tunneltje door de zona pellucida, dus ook geen versmelting."},
  "q25": {"q": "Het embryo bestaat uit zestien cellen. Hoe groot is het nu, vergeleken met de zygote?", "correct": 1,
          "explain": "Tussen de klievingsdelingen groeien de cellen niet. Het embryo blijft even groot, de cellen worden kleiner."}
 },
 "glossary": [
  {"t": "eicel", "d": "Vrouwelijke geslachtscel: de grootste cel van het lichaam (± 0,1 mm), met veel cytoplasma als voorraad voor de eerste dagen."},
  {"t": "zaadcel", "d": "Mannelijke geslachtscel: kop met de kern, middenstuk met mitochondriën en een staart; bijna geen cytoplasma."},
  {"t": "poollichaampje", "d": "Kleine cel met een set chromosomen die bij de meiose van een eicel wordt afgesnoerd en afsterft."},
  {"t": "bevruchting", "d": "Een zaadcel en een eicel versmelten; het erfelijk materiaal van beide komt samen. Meestal in het wijde deel van de eileider."},
  {"t": "zygote", "d": "De bevruchte eicel, met twee sets chromosomen (2n = 46): één van de eicel, één van de zaadcel."},
  {"t": "klievingsdeling", "d": "Eerste delingen van de zygote; tussen de delingen groeien de cellen niet, dus ze worden steeds kleiner."},
  {"t": "embryo", "d": "Het ongeboren kind in de eerste acht weken van de ontwikkeling."},
  {"t": "zona pellucida", "d": "Stevige, doorzichtige mantel om de eicel; na de eerste zaadcel verandert hij, zodat geen tweede zaadcel kan binden.", "vwo": True},
  {"t": "acrosoom", "d": "Blaasje met enzymen in de kop van een zaadcel.", "vwo": True},
  {"t": "acrosoomreactie", "d": "Het acrosoom gaat open als de zaadcel aan de zona pellucida bindt; de enzymen verteren een tunneltje door de mantel. Kan pas nadat het celmembraan van de zaadcel onderweg is veranderd.", "vwo": True}
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
