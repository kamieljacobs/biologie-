import json
true, false = True, False
film = {
 "slug": "4-waar-blijft-het-blad",
 "hoofdstuk": "ecologie",
 "hoofdstukNaam": "Ecologie",
 "title": "Waar blijft het blad?",
 "sub": "opruimers, reducenten en mineralisatie",
 "puzzle": "Waar blijven alle herfstbladeren?",
 "meta": "ecologie 4/8",
 "version": "1.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Ecologie · film 4 van 8",
 "lead": "Waar blijft het blad? Detrituseters maken het klein. Reducenten breken het af tot koolstofdioxide, water en mineralen. Eikenblad is taai, met veel lignine en looizuren: het duurt een paar jaar voor het helemaal weg is. Maar elk jaar verdwijnt er ongeveer evenveel oud blad als er nieuw blad valt. Daarom blijft de laag dun. De stoffen uit het blad van vorig jaar zitten in het blad van dit jaar. Alleen in nat, zuur veen zonder zuurstof stopt de kringloop bijna.",
 "endHaak": "volgende film: Waarom zo weinig roofdieren?",
 "minis": {
  "Hoofdstuk 1": "Is een schimmel op een dood blad een producent?",
  "Hoofdstuk 2": "Waar is het deel van het blad gebleven dat weg is?",
  "Hoofdstuk 3": "Waarom wordt een composthoop warm, en waarom gaat een natte hoop stinken?",
  "Hoofdstuk 4": "Waarom blijft een lichaam in het veen eeuwen bewaard?",
  "Recap": "Waar blijven alle herfstbladeren?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Dieren: uitknippoppen uit de dierenbibliotheek en de ecologiepoppen; personages uit het castboek. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q07": {
   "q": "Welke van deze stoffen is anorganisch?",
   "correct": 2,
   "explain": "Nitraat is een klein mineraal zonder energierijke koolstofketen. De eik nam het op uit de bodem. Met licht maakte hij uit koolstofdioxide, water en mineralen zelf zijn organische stoffen."
  },
  "q11": {
   "q": "Op een dood blad groeit een witte schimmel. Is die schimmel een producent?",
   "correct": 0,
   "explain": "Een schimmel heeft geen bladgroen en kan dus geen fotosynthese doen. Hij groeit met draden het blad in en neemt de organische stoffen daaruit op. Een schimmel is heterotroof, net als jij."
  },
  "q20": {
   "q": "Een derde van het blad is weg. Waar is dat deel gebleven?",
   "correct": 1,
   "explain": "Een stof kan niet zomaar verdwijnen. Een deel zit nu even in de lichamen van de opruimers. De rest van de koolstof is als koolstofdioxide de lucht in gegaan."
  },
  "q24": {
   "q": "Een leerling zegt: 'De energie uit het blad komt met de mineralen terug in de eik.' Wat vind jij?",
   "correct": 2,
   "explain": "Stoffen gaan dus rond: van de eik naar het blad, naar de bodem en weer naar de eik. Energie gaat één kant op. Die komt binnen als licht en vertrekt als warmte."
  },
  "q32": {
   "q": "Een composthoop die veel te nat is, gaat stinken. Wat is daar de oorzaak van?",
   "correct": 0,
   "explain": "Water vult de ruimtes tussen het afval. Daardoor komt er bijna geen lucht meer in. Zonder zuurstof gaat de afbraak traag, en bacteriën maken dan stinkende gassen."
  },
  "q39": {
   "q": "Waarom bleef het lichaam in het veen zo lang bewaard?",
   "correct": 2,
   "explain": "In nat, zuur veen zonder zuurstof breken bacteriën en schimmels bijna niets af. Dat geldt voor plantenresten, en ook voor een lichaam. Steek je veen af en laat je het drogen, dan krijg je turf."
  }
 },
 "glossary": [
  {
   "t": "organische stof",
   "d": "Grote, energierijke verbinding met koolstof die door organismen wordt gemaakt, zoals cellulose, lignine, zetmeel, eiwit en vet."
  },
  {
   "t": "anorganische stof",
   "d": "Kleine, (bijna) energieloze stof zoals koolstofdioxide, water en mineralen (nitraat, fosfaat, ammonium)."
  },
  {
   "t": "autotroof",
   "d": "Maakt zelf organische stoffen uit anorganische stoffen; planten doen dat met licht (fotosynthese). Autotrofe organismen zijn de producenten."
  },
  {
   "t": "heterotroof",
   "d": "Moet organische stoffen opnemen uit andere organismen of dode resten: dieren, schimmels en de meeste bacteriën (consumenten, detrituseters, reducenten)."
  },
  {
   "t": "producent · consument · reducent",
   "d": "Maakt organische stof (plant) · haalt organische stof uit andere organismen (dier) · breekt dode organische stof af tot anorganische stoffen (bacterie, schimmel)."
  },
  {
   "t": "detritus",
   "d": "Dode resten van planten en dieren en uitwerpselen, zoals afgevallen blad."
  },
  {
   "t": "detrituseter",
   "d": "Dier dat detritus eet en het zo kleiner maakt, zoals een pissebed of regenworm."
  },
  {
   "t": "mineralisatie",
   "d": "Het afbreken van organische stof tot anorganische stoffen (mineralen, koolstofdioxide en water) door reducenten."
  },
  {
   "t": "voorwaarden voor afbraak",
   "d": "Reducenten werken het best als het warm en vochtig is, er genoeg zuurstof is en het niet te zuur is."
  },
  {
   "t": "veen · hoogveen · turf",
   "d": "Laag van onvolledig afgebroken plantenresten · veen dat door veenmos en regenwater omhoog groeit (nat, zuur, zuurstofarm) · gestoken en gedroogd veen."
  },
  {
   "t": "compost",
   "d": "Door reducenten (en detrituseters) afgebroken organisch afval."
  },
  {
   "t": "chemo-autotroof",
   "d": "Haalt energie uit een chemische reactie in plaats van uit licht en maakt daarmee organische stoffen uit koolstofdioxide (bijvoorbeeld bacteriën bij hete bronnen in de diepzee).",
   "vwo": true
  },
  {
   "t": "C/N-verhouding",
   "d": "Verhouding tussen koolstof en stikstof in organisch materiaal; hoe hoger, hoe langzamer de afbraak (eikenblad hoog; vers gras laag).",
   "vwo": true
  }
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
