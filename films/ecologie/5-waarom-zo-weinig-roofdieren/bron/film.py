import json
true, false = True, False
film = {
 "slug": "5-waarom-zo-weinig-roofdieren",
 "hoofdstuk": "ecologie",
 "hoofdstukNaam": "Ecologie",
 "title": "Waarom zo weinig roofdieren?",
 "sub": "energiestroom, piramides en tien procent",
 "puzzle": "Waarom zijn er zo weinig roofdieren?",
 "meta": "ecologie 5/8",
 "version": "1.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Ecologie · film 5 van 8",
 "lead": "Energie stroomt één kant op: van de zon via het gras naar de dieren, en ze verlaat het ecosysteem als warmte. Stoffen gaan rond. Bij elke stap gaat het meeste op aan dissimilatie, en komt er gemiddeld maar ongeveer tien procent in het volgende niveau terecht. Daarom zijn er zo weinig roofdieren: hoog in de piramide is er te weinig energie over.",
 "endHaak": "volgende film: Koolstof gaat rond",
 "minis": {
  "Hoofdstuk 1": "Hoeveel van het zonlicht wordt gras?",
  "Hoofdstuk 2": "Hoeveel van het gras wordt koe?",
  "Hoofdstuk 3": "Gaat energie rond, net als stoffen?",
  "Hoofdstuk 4": "Hoeveel komt er bij het volgende niveau aan?",
  "Hoofdstuk 5": "Waarom moet een spitsmuis bijna steeds eten?",
  "Recap": "Waarom zijn er zo weinig roofdieren?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Dieren: uitknippoppen uit de dierenbibliotheek en de ecologiepoppen; personages uit het castboek. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q08": {
   "q": "Wanneer breekt het gras zelf glucose af, met dissimilatie?",
   "correct": 1,
   "explain": "Een grasplant leeft, en elke levende cel heeft energie nodig. Dus dissimileert het gras dag en nacht. Overdag doet het daarnaast fotosynthese, en die is dan groter."
  },
  "q20": {
   "q": "Opname 200 MJ per dag. Feces 60 MJ. Dissimilatie 135 MJ. Hoeveel procent van de opname wordt productie?",
   "correct": 0,
   "explain": "Het rund neemt op een dag ongeveer tweehonderd megajoule op. Ongeveer zestig gaat naar de feces, en honderdvijfendertig naar dissimilatie. Dan blijft er vijf megajoule over voor productie."
  },
  "q25": {
   "q": "De energie in de mest. Komt die terug in het gras?",
   "correct": 2,
   "explain": "De reducenten breken de mest af tot koolstofdioxide, water en mineralen. Die stoffen gaan terug naar het gras. Stoffen gaan rond."
  },
  "q34": {
   "q": "Welke piramide staat nooit op zijn kop?",
   "correct": 0,
   "explain": "Elk niveau krijgt zijn energie alleen van het niveau eronder, en raakt er onderweg het meeste van kwijt. Daarom is in de piramide van energie elk niveau smaller dan het niveau eronder. Altijd."
  },
  "q40": {
   "q": "Welk dier eet per gram lichaam het meest?",
   "correct": 1,
   "explain": "De spitsmuis eet per gram vele keren zo veel als de hagedis. Ze is endotherm, warmbloedig. Ze houdt haar lichaam warm met warmte uit haar eigen dissimilatie."
  }
 },
 "glossary": [
  {
   "t": "energiestroom",
   "d": "Doorgifte van energie door een ecosysteem in één richting: van zonlicht via producenten naar consumenten en reducenten; bij elke stap gaat het grootste deel verloren als warmte door dissimilatie."
  },
  {
   "t": "bruto primaire productie (BPP)",
   "d": "Alle organische stof (of energie) die producenten per oppervlakte en per tijd met fotosynthese vastleggen."
  },
  {
   "t": "netto primaire productie (NPP)",
   "d": "BPP min de dissimilatie van de producenten zelf: de aangroei die beschikbaar is voor consumenten en reducenten (NPP = BPP − R)."
  },
  {
   "t": "biomassa",
   "d": "Massa van de organische stof van (een groep) organismen in een gebied, meestal als drooggewicht per oppervlakte."
  },
  {
   "t": "drooggewicht (droge stof)",
   "d": "Massa van biologisch materiaal nadat al het water is verdampt (gedroogd tot constant gewicht)."
  },
  {
   "t": "energiestroomschema",
   "d": "Schema dat laat zien hoe de opgenomen energie van een organisme of trofisch niveau verdeeld wordt over feces, dissimilatie en productie."
  },
  {
   "t": "feces",
   "d": "Onverteerd voedsel dat het lichaam verlaat (ontlasting); de energie erin is niet opgenomen en gaat naar detrituseters en reducenten."
  },
  {
   "t": "productie (van een consument)",
   "d": "Opname min feces min dissimilatie: wat wordt ingebouwd in groei en voortplanting (en melk)."
  },
  {
   "t": "secundaire productie",
   "d": "Toename van biomassa van consumenten per oppervlakte en per tijd: opname min feces min dissimilatie.",
   "vwo": true
  },
  {
   "t": "trofisch niveau",
   "d": "Plaats in de voedselketen: producenten zijn het eerste niveau, consumenten van de eerste orde het tweede, consumenten van de tweede orde het derde, enzovoort."
  },
  {
   "t": "voedselketen (pijlrichting)",
   "d": "Reeks organismen waarin elk het volgende tot voedsel dient; de pijl wijst van wat gegeten wordt naar wie eet, in de richting van de energiestroom."
  },
  {
   "t": "piramide van aantallen, biomassa en energie",
   "d": "Diagram met per trofisch niveau het aantal individuen, de biomassa op één moment of de energie per jaar; de piramide van energie wordt naar boven toe altijd smaller."
  },
  {
   "t": "endotherm (warmbloedig)",
   "d": "Houdt de lichaamstemperatuur vrijwel constant met warmte uit de eigen dissimilatie, zoals zoogdieren en vogels."
  },
  {
   "t": "ectotherm (koudbloedig)",
   "d": "Lichaamstemperatuur volgt de omgeving; warmt op met warmte van buiten (zon), zoals reptielen en insecten."
  },
  {
   "t": "voedselconversie",
   "d": "Mate waarin een dier voer omzet in lichaamsmassa; de voedselconversiefactor is het aantal kg voer voor 1 kg groei (hoe lager, hoe efficiënter)."
  },
  {
   "t": "productiviteit per ecosysteem",
   "d": "NPP per vierkante meter per jaar verschilt per ecosysteem door abiotische factoren als licht, temperatuur, water en mineralen.",
   "vwo": true
  }
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
