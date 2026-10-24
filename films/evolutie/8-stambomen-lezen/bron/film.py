import json
true, false = True, False
film = {
 "slug": "8-stambomen-lezen",
 "hoofdstuk": "evolutie",
 "hoofdstukNaam": "Evolutie",
 "title": "Stambomen lezen",
 "sub": "verwantschap, kenmerken en namen",
 "puzzle": "Is een dolfijn familie van een haai?",
 "meta": "evolutie 8/8",
 "version": "1.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Evolutie · film 8 van 8",
 "lead": "Is een dolfijn familie van een haai? Alleen heel ver. Hun stroomlijn en rugvin zijn analoog: dezelfde selectiedruk in water, niet dezelfde voorouder. De dolfijn is een tandwalvis: een zoogdier, en dus verwant aan het nijlpaard uit de vorige film. Lees een stamboom aan de vertakkingen. En gedeelde nieuwe kenmerken, botten en DNA vertellen wie bij wie hoort.",
 "endHaak": "welke dieren bij jou in de buurt delen een recente voorouder?",
 "minis": {
  "Hoofdstuk 1": "Wie is het nauwst verwant, en hoe zie je dat?",
  "Hoofdstuk 2": "Wie is nauwer verwant aan een krokodil: een hagedis of een vogel?",
  "Hoofdstuk 3": "Waarom lijken haai, dolfijn en ichthyosaurus zo op elkaar?",
  "Hoofdstuk 4": "Waarom heet de mens Homo sapiens?",
  "Recap": "Is een dolfijn familie van een haai?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Dieren: uitknippoppen uit de dierenbibliotheek; personages uit het castboek. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q08": {
   "q": "In deze boom staat de walvis naast de koe. Wie is het nauwst verwant aan de walvis?",
   "correct": 0,
   "explain": "Een knooppunt is een scharnier. Draai je de takken om, dan verandert alleen de volgorde van de namen. De boom blijft dezelfde."
  },
  "q17": {
   "q": "Wie is nauwer verwant aan de krokodil?",
   "correct": 2,
   "explain": "Krokodil en vogel delen kenmerken die de hagedis mist. Een hart met vier kamers. Een spiermaag, waarin steentjes het voedsel vermalen."
  },
  "q23": {
   "q": "Waarom hebben haai, dolfijn en ichthyosaurus bijna dezelfde vorm?",
   "correct": 1,
   "explain": "Zet ze in de boom. De dolfijn staat bij de zoogdieren, de ichthyosaurus bij de reptielen, de haai helemaal apart. De voorouders van dolfijn en ichthyosaurus liepen op vier poten over het land."
  },
  "q32": {
   "q": "De leeuw heet Panthera leo, de tijger Panthera tigris. Wat zegt het eerste woord?",
   "correct": 2,
   "explain": "Elke soort heeft een wetenschappelijke naam van twee woorden: eerst de geslachtsnaam, met een hoofdletter, dan de soortaanduiding. Samen zijn ze de naam van de soort. Dat heet binomiale naamgeving."
  }
 },
 "glossary": [
  {
   "t": "cladogram",
   "d": "Stamboom die laat zien welke soorten de meest recente gemeenschappelijke voorouder delen. Je leest hem aan de vertakkingen, niet aan de volgorde van de namen."
  },
  {
   "t": "gemeenschappelijke voorouder",
   "d": "Populatie waarvan twee of meer soorten afstammen; in een cladogram een knooppunt."
  },
  {
   "t": "afstammingslijn",
   "d": "De lijn van een soort via al zijn voorouders terug naar de wortel van de stamboom."
  },
  {
   "t": "verwantschap",
   "d": "Hoe kort geleden twee soorten hun laatste gemeenschappelijke voorouder hadden: hoe jonger die voorouder, hoe nauwer verwant."
  },
  {
   "t": "buitengroep",
   "d": "Soort buiten de onderzochte groep, waarmee je ziet welke kenmerken oud en welke nieuw zijn."
  },
  {
   "t": "homologe organen",
   "d": "Zelfde bouw, vaak andere functie; wijzen op een gemeenschappelijke voorouder (film 7)."
  },
  {
   "t": "analoge organen",
   "d": "Zelfde functie, andere bouw; zeggen niets over verwantschap."
  },
  {
   "t": "convergente evolutie",
   "d": "Niet nauw verwante groepen krijgen door dezelfde selectiedruk los van elkaar dezelfde vorm of eigenschap."
  },
  {
   "t": "classificatie",
   "d": "Indelen van organismen in groepen: rijk, stam, klasse, orde, familie, geslacht, soort."
  },
  {
   "t": "soort",
   "d": "Groep individuen die in de natuur samen vruchtbare nakomelingen kunnen krijgen (film 6)."
  },
  {
   "t": "geslacht",
   "d": "Groep nauw verwante soorten, zoals Panthera (leeuw, tijger, luipaard, jaguar)."
  },
  {
   "t": "binomiale naamgeving",
   "d": "Wetenschappelijke naam van twee woorden: geslachtsnaam (met hoofdletter) plus soortaanduiding, samen de naam van de soort, bijvoorbeeld Homo sapiens."
  }
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
