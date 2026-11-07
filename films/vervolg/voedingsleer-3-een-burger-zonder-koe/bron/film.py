import json
film = {
 "slug": "voedingsleer-3-een-burger-zonder-koe", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Een burger zonder koe", "sub": "eiwit van de toekomst",
 "puzzle": "Stel: een erwtenburger heeft evenveel eiwit als een hamburger. Is hij dan net zo goed?",
 "meta": "voeding en diëtetiek · levensmiddelentechnologie", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Voeding en diëtetiek",
 "lead": "Stel: een erwtenburger heeft evenveel eiwit als een hamburger. Is hij dan net zo goed? Noor loopt een dag mee in een proeffabriek bij Levensmiddelentechnoloog Lars, die een burger van erwteneiwit ontwerpt. Je ziet waarom er zo weinig van het eiwit in het voer van een rund in het vlees terechtkomt, waarom eiwit niet gewoon eiwit is (het beperkende aminozuur en de verteerbaarheid), hoe je eiwit uit een erwt haalt en er in een extruder draden van maakt, en wat er daarna nog bij moet: vitamine B12, ijzer en minder zout. Tot slot: meelwormen en kweekvlees.",
 "endHaak": "welke vleesvervanger in jouw supermarkt zou je nu eens omdraaien om het etiket te lezen?",
 "minis": {"Hoofdstuk 1": "Hoeveel van het eiwit in het voer komt in het vlees?", "Hoofdstuk 2": "Waarom is evenveel gram eiwit nog niet even goed?", "Hoofdstuk 3": "Hoe maak je van erwtenpoeder iets met vezels?", "Hoofdstuk 4": "Wat moet er nog bij, en waar let je op?", "Recap": "Is de erwtenburger net zo goed?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Noor en Levensmiddelentechnoloog Lars (castboek). Decor: ElevenLabs (proeffabriek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q05": {"q": "In het voer van vleesrunderen zit 100 gram eiwit. Hoeveel gram eiwit komt er uiteindelijk in hun vlees?", "correct": 0, "explain": "Zo'n 3 gram van de 100. De rest gaat onder andere onverteerd met de mest mee, wordt afgebroken als brandstof of zit in botten en huid; en moederkoeien en kalveren eten mee."},
  "q09": {"q": "Rundvlees scoort hoog, soja iets lager, erwteneiwit meestal nog lager. Waarom scoort erwteneiwit lager?", "correct": 2, "explain": "Erwteneiwit heeft alle negen essentiële aminozuren, maar van methionine weinig: dat is het beperkende aminozuur. Daarnaast telt hoeveel je verteert."},
  "q12": {"q": "Welke keuze tilt de score per gram eiwit van de erwtenburger het meest omhoog?", "correct": 1, "explain": "Tarwe-eiwit erbij: tarwe heeft meer methionine en erwt meer lysine, dus in de juiste verhouding vullen ze elkaar aan. Meer erwteneiwit of fijner malen verandert de verhouding van de aminozuren niet."},
  "q16": {"q": "De extruder verhit het eiwit boven honderd graden, onder druk. Wat doet die hitte met het eiwit?", "correct": 2, "explain": "De keten vouwt open (denatureren); er wordt niets geknipt. Daardoor verteert het eiwit vaak beter. Alleen te heet en te lang beschadigt aminozuren."},
  "q20": {"q": "Een hamburger levert meer dan eiwit alleen. Wat moet de technoloog nog aan de erwtenburger toevoegen?", "correct": 1, "explain": "B12 maken alleen bacteriën, dus een erwt heeft geen B12. IJzer zit wel in erwten, maar je darm neemt ijzer uit planten slechter op. Daarom verrijkt hij met allebei."},
  "q23": {"q": "Twee vleesvervangers hebben allebei 20 gram eiwit per 100 gram. Waar let je nog op?", "correct": 0, "explain": "Of er ijzer en B12 zijn toegevoegd (niet elke vleesvervanger is verrijkt), en kies er een met minder dan 1,1 gram zout per 100 gram."}
 },
 "glossary": [
  {"t": "levensmiddelentechnoloog", "d": "Iemand die voedingsmiddelen ontwerpt, maakt en verbetert, van grondstof tot product. De opleiding heet Voedingsmiddelentechnologie (hbo) of Food Technology (wo)."},
  {"t": "essentieel aminozuur", "d": "Een aminozuur dat je lichaam niet zelf kan maken; je moet het uit je eten halen. Er zijn er negen."},
  {"t": "beperkend aminozuur", "d": "Het essentiële aminozuur dat in verhouding tot wat je nodig hebt het eerst op is. Het bepaalt hoeveel eiwit je ermee kunt bouwen. Bij erwten is dat methionine, bij tarwe lysine."},
  {"t": "verteerbaarheid", "d": "Welk deel van het eiwit je darm echt afbreekt en opneemt. Een deel komt nooit in je bloed."},
  {"t": "eiwitkwaliteit", "d": "Hoe goed een eiwit voorziet in de essentiële aminozuren die je nodig hebt, na vertering. Onderzoekers meten het met een score (DIAAS)."},
  {"t": "denatureren", "d": "Een eiwit verliest zijn vorm, bijvoorbeeld door hitte of zuur. De volgorde van de aminozuren blijft hetzelfde: er wordt niets geknipt."},
  {"t": "extrusie", "d": "Eiwit met water kneden en verhitten onder druk in een machine met een schroef (extruder), en het daarna door een koele, platte uitgang laten stromen. Daarbij ontstaan draden die op vleesvezels lijken."},
  {"t": "verrijken", "d": "Een vitamine of mineraal aan een product toevoegen, bijvoorbeeld vitamine B12 en ijzer aan een vleesvervanger."},
  {"t": "vitamine B12", "d": "Vitamine die alleen bacteriën maken. Dieren krijgen hem via bacteriën (bij een koe in de pens, een deel van de maag) en slaan hem op; planten hebben geen B12."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
