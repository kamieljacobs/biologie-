import json
film = {
 "slug": "5-binnen-de-grenzen", "hoofdstuk": "milieu", "hoofdstukNaam": "Mens en milieu",
 "title": "Binnen de grenzen", "sub": "Biodiversiteit, ecosysteemdiensten en planetaire grenzen",
 "puzzle": "Wat als de bijen verdwijnen?",
 "meta": "mens en milieu · systeem aarde", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Mens en milieu · film 3",
 "lead": "Zonder bestuivers blijft graan, maar worden fruit, groente en noten schaars. Veel soorten bestuivers samen geven een betrouwbaardere oogst dan honingbijen alleen. Die verscheidenheid heet biodiversiteit: genen, soorten en ecosystemen. Wat de mens uit de natuur haalt, heten ecosysteemdiensten: leveren, regelen (zoals bestuiving en waterberging) en beleven. Wereldwijd gaat de biodiversiteit hard achteruit, vooral doordat natuur akker, stad of weg wordt. De aarde werkt als één systeem; van de negen planetaire grenzen zijn er zeven overschreden. De ozonlaag laat zien dat samenwerken werkt.",
 "endHaak": "welke ecosysteemdienst gebruik jij vandaag, zonder dat je het merkt?",
 "minis": {"Hoofdstuk 1": "Wie bestuift ons eten, en waarom helpen veel soorten?", "Hoofdstuk 2": "Wat levert de natuur ons?", "Hoofdstuk 3": "Hoe hard gaat de biodiversiteit achteruit, en waardoor?", "Hoofdstuk 4": "Wat zijn de planetaire grenzen?", "Recap": "Wat moet je onthouden?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personage: Lotte (castboek). Stijl: Stijlkaart biologiefilms (Part C). Getallen afgerond; bronnen in het docentdeel. Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Stel dat alle bestuivende insecten verdwijnen. Wat gebeurt er met ons voedsel?", "correct": 1, "explain": "Tarwe, rijst en maïs bestuiven zichzelf of via de wind. Maar ruim drie kwart van de belangrijkste gewassen heeft baat bij bestuivers: fruit, groente en noten worden schaars."},
  "q10": {"q": "Welke soort ecosysteemdienst levert de nevengeul bij Nijmegen bij hoogwater?", "correct": 2, "explain": "Regelen: de geul vangt water op en voert het af. Wandelen en zwemmen op het eiland is beleving, een tweede dienst op dezelfde plek."},
  "q13": {"q": "Populaties gewervelde dieren zijn sinds 1970 gemiddeld 73 procent kleiner. Wat betekent dat?", "correct": 1, "explain": "Het is een gemiddelde over bijna 35.000 populaties. Sommige groeien, andere zijn bijna verdwenen. Het zegt niet hoeveel dieren of soorten er weg zijn."},
  "q17": {"q": "Wat is wereldwijd de grootste oorzaak van het verlies van biodiversiteit?", "correct": 2, "explain": "Veranderd land- en zeegebruik: natuur wordt akker, weide, stad of weg. Daarna volgen het oogsten van soorten, klimaatverandering, vervuiling en invasieve exoten."},
  "q23": {"q": "De mensheid bleef binnen de grens voor de ozonlaag. Hoe komt dat?", "correct": 0, "explain": "In 1987 spraken landen af de cfk's te verminderen, later werden ze verboden. Sindsdien herstelt de ozonlaag langzaam."},
  "q27": {"q": "Een deel van het Amazonegebied gaf meer koolstof af dan het opnam. Wat doet dat met de opwarming?", "correct": 1, "explain": "Meer CO₂ versterkt de opwarming; die maakt het bos nog droger, zodat het nog minder opneemt. Positieve terugkoppeling = versterkend, niet 'goed'."}
 },
 "glossary": [
  {"t": "biodiversiteit", "d": "De verscheidenheid aan leven: genen, soorten en ecosystemen. Het gaat om het aantal verschillende soorten, niet om het aantal individuen."},
  {"t": "bestuiving", "d": "Het overbrengen van stuifmeel naar de stamper van een bloem, door de wind of door dieren zoals bijen, hommels en zweefvliegen."},
  {"t": "ecosysteemdienst", "d": "Iets wat de mens uit de natuur haalt zonder ervoor te betalen: leveren (productie: voedsel, hout), regelen (regulatie: bestuiving, water zuiveren en opvangen, koolstof vastleggen) en beleven (cultureel: wandelen, rust)."},
  {"t": "Rode Lijst", "d": "Lijst van soorten die in een land sterk achteruitgegaan, bedreigd of verdwenen zijn."},
  {"t": "directe oorzaken van biodiversiteitsverlies", "d": "Op volgorde: veranderd land- en zeegebruik, het oogsten van soorten (overbevissing, jacht), klimaatverandering, vervuiling en invasieve exoten."},
  {"t": "atmosfeer · hydrosfeer · lithosfeer · biosfeer", "d": "De vier delen van het systeem aarde: lucht, water, bodem en gesteente, en alles wat leeft."},
  {"t": "planetaire grenzen", "d": "Negen grenzen aan hoeveel de mens het systeem aarde kan veranderen voordat de stabiele toestand in gevaar komt. In 2025 waren er zeven overschreden."},
  {"t": "cfk's", "d": "Stoffen uit oude spuitbussen en koelkasten die ozon afbreken; sinds 1987 wereldwijd uitgefaseerd."},
  {"t": "biosfeerintegriteit", "d": "De planetaire grens voor de levende natuur: onder meer hoe snel soorten uitsterven.", "vwo": True},
  {"t": "positieve terugkoppeling", "d": "Een gevolg dat zijn eigen oorzaak versterkt, zoals een bos dat door opwarming droger wordt en daardoor minder CO₂ opneemt.", "vwo": True}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
