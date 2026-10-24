import json
true, false = True, False
film = {
 "slug": "x4-hoe-werden-we-mens",
 "hoofdstuk": "evolutie",
 "hoofdstukNaam": "Evolutie",
 "title": "Hoe werden we mens?",
 "sub": "van gemeenschappelijke voorouder tot neanderthaler",
 "puzzle": "Waarom zijn wij nu de enige mensensoort?",
 "meta": "evolutie extra 4/4",
 "version": "1.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Evolutie · extra film 4 van 4 (buiten het PTA)",
 "lead": "Waarom zijn wij nu de enige mensensoort? De anderen stierven uit, om redenen die we nog niet zeker weten. Maar van twee van hen leeft een stukje voort in het DNA van veel mensen. Er is geen ladder van aap naar mens. Er is een struik, en wij zijn de enige mensentak die nog groeit.",
 "endHaak": "terug naar de kernreeks: Wat is evolutie?",
 "minis": {
  "Hoofdstuk 1": "Stamt de mens af van de chimpansee?",
  "Hoofdstuk 2": "Wat kwam eerst: rechtop lopen of grote hersenen?",
  "Hoofdstuk 3": "Wie was Homo erectus?",
  "Hoofdstuk 4": "Wie was de neanderthaler, en waarom is hij er niet meer?",
  "Hoofdstuk 5": "Waren wij altijd de enige?",
  "Recap": "Waarom zijn wij nu de enige mensensoort?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Dieren: uitknippoppen uit de dierenbibliotheek; personages uit het castboek. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q06": {
   "q": "Hoe zag de gemeenschappelijke voorouder van mens en chimpansee eruit?",
   "correct": 2,
   "explain": "De gemeenschappelijke voorouder die we delen met de chimpansee leefde zes tot acht miljoen jaar geleden in Afrika. Hij was geen chimpansee en geen mens. Beide lijnen veranderden daarna even lang: de mens stamt dus niet af van de chimpansee."
  },
  "q09": {
   "q": "Wat kwam eerst in onze lijn?",
   "correct": 1,
   "explain": "Ethiopië, 3,2 miljoen jaar geleden: Lucy, een Australopithecus afarensis van ongeveer een meter. Lange armen en kromme vingers, goed voor klimmen, maar een bekken en dijbeen zoals de jouwe."
  },
  "q16": {
   "q": "Lucy en Homo erectus liepen allebei rechtop. Wat was er nieuw bij Homo erectus?",
   "correct": 1,
   "explain": "Ondanks zijn naam: de soort van Lucy liep al bijna twee miljoen jaar eerder rechtop. Nieuw waren de hersenen, ongeveer twee keer zo groot als bij Lucy."
  },
  "q23": {
   "q": "Hoe liep een neanderthaler?",
   "correct": 2,
   "explain": "Neanderthalers liepen gewoon op twee gestrekte benen. Het voorovergebogen beeld komt van een reconstructie uit het jaar 1911. De onderzoeker zag de neanderthaler als primitief, en het skelet was van een oude man met zware artrose."
  },
  "q31": {
   "q": "Kregen Homo sapiens en neanderthalers samen kinderen?",
   "correct": 0,
   "explain": "De Zweedse onderzoeker Svante Pääbo haalde DNA uit botten van neanderthalers. In het jaar 2010 las zijn team hun hele genoom. Daarvoor kreeg hij in het jaar 2022 de Nobelprijs."
  },
  "q41": {
   "q": "Leefden Homo erectus en Homo sapiens ooit tegelijk?",
   "correct": 1,
   "explain": "Homo erectus leefde op Java nog tot ongeveer 110 000 jaar geleden, toen Homo sapiens al bestond. Het plaatje van een aap die stap voor stap mens wordt, klopt dus niet."
  }
 },
 "glossary": [
  {
   "t": "gemeenschappelijke voorouder",
   "d": "Populatie waarvan twee of meer soorten afstammen; in een stamboom een knooppunt (zie Stambomen lezen)."
  },
  {
   "t": "mensachtigen",
   "d": "Soorten uit onze tak van de stamboom na de splitsing met de chimpanseelijn, zoals Australopithecus afarensis, Homo erectus, de neanderthaler en Homo sapiens."
  },
  {
   "t": "rechtop lopen",
   "d": "Lopen op twee benen; te zien aan het bekken, een dijbeen dat schuin naar de knie loopt en een grote teen in lijn met de andere tenen."
  },
  {
   "t": "handbijl",
   "d": "Stenen werktuig, aan twee kanten bijgeslagen tot een druppelvorm; de oudste zijn ongeveer 1,76 miljoen jaar oud."
  },
  {
   "t": "zustergroep",
   "d": "De groep die in een stamboom het dichtst naast een andere groep staat: ze delen een gemeenschappelijke voorouder, maar de ene is geen voorouder van de andere."
  },
  {
   "t": "oud DNA",
   "d": "DNA uit botten of tanden van organismen die lang geleden leefden; zo werd het genoom van de neanderthaler gelezen."
  },
  {
   "t": "genenstroom",
   "d": "Uitwisseling van allelen tussen populaties of delen van een populatie, doordat individuen verhuizen en paren (zie film 5)."
  }
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
