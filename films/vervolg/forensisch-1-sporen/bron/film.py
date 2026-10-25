import json
film = {
 "slug": "forensisch-1-sporen", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Sporen op de plaats delict", "sub": "is dit bloed?",
 "puzzle": "Op de vloer van een huis waar is ingebroken ligt een bruine vlek. Is het bloed? En van een mens?",
 "meta": "forensisch onderzoek · hbo en wo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Forensisch onderzoek",
 "lead": "Bilal loopt stage bij de forensische opsporing. In een huis waar is ingebroken ziet hij een bruine vlek. Een kleurtest en luminol zoeken naar heem, het deel van hemoglobine met een ijzeratoom: dat versnelt een reactie met waterstofperoxide, zoals een enzym. Maar ook planten en dierenbloed doen dat, dus zo'n test is een voorproef: het kán bloed zijn. Een sneltest met antistoffen zegt of het menselijk hemoglobine is, met een testlijn en een controlelijn. Uit de vorm van een spatje reken je de inslaghoek uit: sin α = breedte / lengte. En alles gaat zo naar het lab dat er niets bij komt: nieuwe handschoenen, drogen, papier en een keten van bewaring.",
 "endHaak": "van wie is het bloed op het mes?",
 "minis": {"Hoofdstuk 1": "Waarom zegt een kleurtest alleen dat iets bloed kán zijn?",
           "Hoofdstuk 2": "Hoe weet je of bloed van een mens is, en niet van de hond?",
           "Hoofdstuk 3": "Wat vertelt de vorm van een spatje?",
           "Hoofdstuk 4": "Hoe krijg je een spoor in het lab zonder dat er iets bij komt?",
           "Recap": "Is die bruine vlek bloed?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Bilal en Dr. Kim (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Bilal ziet een bruine vlek op de vloer. Waar zoekt een test naar om te zien of het bloed is?", "correct": 1,
          "explain": "Een test zoekt hemoglobine. Het heem daarin, met een ijzeratoom, versnelt een reactie met waterstofperoxide. De kleur zegt weinig: ook koffie of roest kan bruin zijn."},
  "q06": {"q": "Bilal druppelt eerst een kleurloze vloeistof op het staafje, wacht even en voegt dan pas waterstofperoxide toe. Waarom wacht hij eerst?", "correct": 2,
          "explain": "Zonder waterstofperoxide hoort er niets te gebeuren. Kleurt het staafje al roze vóór de peroxide, dan kleurt er iets anders (bijvoorbeeld koperzout) en telt de test niet."},
  "q11": {"q": "Het strookje is in het lab getest met hondenbloed: alleen bij C kleurt een streep. Wat betekent dat?", "correct": 0,
          "explain": "De streep bij C laat zien dat de test werkte. Bij T bleef niets hangen: geen menselijk hemoglobine, of te weinig om te zien."},
  "q15": {"q": "Op de muur zit een rond spatje en een ovaal met een staartje. Welke druppel kwam het schuinst aan?", "correct": 1,
          "explain": "Een druppel die recht op de muur komt, spat naar alle kanten gelijk uit: rond. Komt hij schuin aan, dan glijdt hij door tot een ovaal. Het staartje wijst waar hij heen vloog."},
  "q20": {"q": "Bilal pakte met handschoenen het staafje van de vlek en wil nu het glas bemonsteren. Wat doet hij eerst?", "correct": 2,
          "explain": "Wat van de vlek aan een handschoen zit, kan meereizen naar het glas. Daarom na elk spoor nieuwe handschoenen."},
  "q23": {"q": "Het wattenstaafje met bloed is nog vochtig. Waarin gaat het mee naar het lab?", "correct": 0,
          "explain": "In een dichte zak gaat een vochtig spoor schimmelen, en schimmel breekt het spoor af. Dus eerst drogen, dan in papier of een doosje dat ademt, elk spoor apart."}
 },
 "glossary": [
  {"t": "spoor", "d": "Alles wat iemand op een plaats achterlaat en wat iets kan zeggen over wat er gebeurde: bloed, speeksel, een vingerafdruk, een vezel, een insect."},
  {"t": "hemoglobine en heem", "d": "Hemoglobine is het eiwit in rode bloedcellen dat zuurstof bindt. Het heeft vier heemgroepen, elk met een ijzeratoom. Heem versnelt een reactie met waterstofperoxide, zoals een enzym: daarop werken de kleurtest en luminol."},
  {"t": "voorproef (indicatieve test)", "d": "Snelle test die zegt dat iets bloed (of speeksel) kán zijn; een positieve uitslag is nog geen bewijs, want ook andere stoffen kunnen reageren."},
  {"t": "luminol", "d": "Vloeistof die je in het donker spuit: waar heem zit, komt er blauw licht vrij. Zo vind je bloed dat je niet ziet, ook sterk verdund. Het licht zegt niet dat het bloed is, en weinig over de hoeveelheid."},
  {"t": "sneltest op menselijk bloed", "d": "Strookje met antistoffen tegen menselijk hemoglobine met een gekleurd deeltje eraan. Bij de testlijn (T) houdt een tweede antistof het hemoglobine vast; de controlelijn (C) vangt de gekleurde antistoffen die niets vasthielden en moet altijd kleuren."},
  {"t": "amylasetest", "d": "Voorproef op speeksel: amylase knipt zetmeel waaraan een blauwe kleurstof zit, en de kleurstof komt los. Ook andere lichaamsvochten bevatten amylase."},
  {"t": "inslaghoek", "d": "De hoek waaronder een druppel op een oppervlak kwam. Uit een ovale vlek (zonder staartje): sin α = breedte / lengte. Bij een bijna ronde vlek geeft een kleine meetfout een grote fout in de hoek."},
  {"t": "eliminatiedatabank", "d": "Databank met het DNA van mensen die met sporen werken. Vindt het lab hun DNA op een spoor, dan is dat waarschijnlijk besmetting door een eigen medewerker."},
  {"t": "keten van bewaring", "d": "Vastleggen wie een bewijsstuk wanneer had (nummer, zegel, formulier), zodat niemand kan zeggen dat het verwisseld of besmet is."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
