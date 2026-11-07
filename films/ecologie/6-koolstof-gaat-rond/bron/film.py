import json
true, false = True, False
film = {
 "slug": "6-koolstof-gaat-rond",
 "hoofdstuk": "ecologie",
 "hoofdstukNaam": "Ecologie",
 "title": "Koolstof gaat rond",
 "sub": "de koolstofkringloop, snel en traag",
 "puzzle": "Hoe komt koolstof van een varen van driehonderd miljoen jaar geleden in de lucht boven jouw straat?",
 "meta": "ecologie 6/8",
 "version": "1.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Ecologie · film 6 van 8",
 "lead": "Koolstof gaat rond. In de snelle kringloop gaat het in dagen tot jaren van de lucht naar planten, dieren en reducenten en weer terug. Waar afbraak stopt, belandt het in de trage kringloop: veen, steenkool, olie en gas, kalksteen. Door fossiele brandstoffen te verbranden, halen wij in een paar honderd jaar terug wat daar miljoenen jaren lag. Zo kwam het atoom van de varen in de lucht boven jouw straat, en straks misschien in een blad.",
 "endHaak": "volgende film: Stikstof gaat rond",
 "minis": {
  "Hoofdstuk 1": "Geeft een plant ook koolstofdioxide af?",
  "Hoofdstuk 2": "Hoe lang kan koolstof ergens blijven liggen?",
  "Hoofdstuk 3": "Waarom stijgt de hoeveelheid koolstof in de lucht?",
  "Hoofdstuk 4": "Is een bos een opslag of een kringloop?",
  "Recap": "Hoe komt koolstof van een varen van driehonderd miljoen jaar geleden in de lucht boven jouw straat?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Dieren: uitknippoppen uit de dierenbibliotheek en de ecologiepoppen; personages uit het castboek. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q06": {
   "q": "Een plant staat een nacht onder een afgesloten glazen stolp, in het donker. Wat gebeurt er met de koolstofdioxide onder de stolp?",
   "correct": 1,
   "explain": "Ook in het donker dissimileert een plant, net als jij. Daarbij breekt ze glucose af, en komt er weer koolstofdioxide vrij. Overdag haalt de fotosynthese er meer uit de lucht dan de plant zelf afgeeft."
  },
  "q13": {
   "q": "Hoe lang zat het atoom in de steenkool, voordat het weer boven kwam?",
   "correct": 0,
   "explain": "De steenkool in Zuid-Limburg ontstond in het Carboon, rond driehonderd miljoen jaar geleden. Al die tijd lag het atoom stil. Pas in de vorige eeuw haalden mijnwerkers die steenkool naar boven."
  },
  "q20": {
   "q": "Waar zit van deze vijf de meeste koolstof?",
   "correct": 1,
   "explain": "De lucht bevat ongeveer negenhonderd gigaton koolstof, alle planten samen ongeveer vierhonderdvijftig. De bodem ongeveer tweeduizend. De oceaan ongeveer achtendertigduizend: het meeste is opgelost in het diepe water."
  },
  "q27": {
   "q": "Wat gebeurt er met het niveau in de badkuip?",
   "correct": 0,
   "explain": "De oceaan en de planten nemen samen ongeveer de helft van die extra koolstof op. De andere helft blijft in de lucht. Daarom stijgt het niveau, elk jaar weer."
  },
  "q33": {
   "q": "Waarom daalt de lijn juist van mei tot oktober?",
   "correct": 1,
   "explain": "Het meeste land en bos ligt op het noordelijk halfrond. In de lente en zomer groeit alles: fotosynthese haalt meer koolstofdioxide weg dan planten, dieren en reducenten samen afgeven. In de herfst en winter is het andersom."
  },
  "q38": {
   "q": "Is een bos een opslag of een kringloop?",
   "correct": 2,
   "explain": "Een bos is een opslag én een kringloop. Elk jaar stroomt er veel koolstof in en uit: fotosynthese erin, dissimilatie en afbraak eruit. Een jong, groeiend bos legt netto veel vast."
  }
 },
 "glossary": [
  {
   "t": "koolstofkringloop",
   "d": "Kringloop van koolstof tussen lucht, organismen, bodem, oceaan en gesteenten: fotosynthese legt CO₂ vast in organische stof, dissimilatie, afbraak en verbranding geven CO₂ weer af."
  },
  {
   "t": "koolstofreservoir (voorraad)",
   "d": "Plaats waar koolstof is opgeslagen (lucht, organismen, bodem, oceaan, fossiele brandstoffen, gesteente); hoeveelheid op één moment, in gigaton koolstof."
  },
  {
   "t": "stroom",
   "d": "Hoeveelheid koolstof die per tijd van het ene reservoir naar het andere gaat, in gigaton koolstof per jaar."
  },
  {
   "t": "snelle kringloop",
   "d": "Uitwisseling van koolstof tussen lucht, organismen, bodem en oppervlaktewater in dagen tot eeuwen."
  },
  {
   "t": "trage kringloop",
   "d": "Koolstof die in veen, steenkool, aardolie, aardgas en kalksteen miljoenen jaren buiten de snelle kringloop ligt."
  },
  {
   "t": "veen",
   "d": "Laag van onvolledig afgebroken plantenresten die ontstaat waar afbraak stopt (nat, zuurstofarm)."
  },
  {
   "t": "fossiele brandstof",
   "d": "Steenkool, aardolie en aardgas: brandstof uit resten van organismen van miljoenen jaren geleden; verbranden voegt koolstof die lang uit de kringloop was als CO₂ aan de lucht toe."
  },
  {
   "t": "kalksteen",
   "d": "Gesteente uit kalkskeletten en -schelpen van zeeorganismen; de grootste koolstofvoorraad op aarde."
  },
  {
   "t": "gigaton (Gt)",
   "d": "Duizend miljard kilo (10¹² kg); voorraden koolstof in Gt C, stromen in Gt C per jaar."
  },
  {
   "t": "Keelingcurve",
   "d": "Grafiek van de CO₂-concentratie gemeten op Mauna Loa sinds 1958: een stijgende trend met een seizoensgolf.",
   "vwo": true
  },
  {
   "t": "positieve terugkoppeling",
   "d": "Een gevolg dat zijn eigen oorzaak versterkt, bv. opwarming → oceaan neemt minder CO₂ op → meer CO₂ in de lucht → meer opwarming.",
   "vwo": true
  }
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
