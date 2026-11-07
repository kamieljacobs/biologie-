import json
true, false = True, False
film = {
 "slug": "2-natuurlijke-selectie",
 "hoofdstuk": "evolutie",
 "hoofdstukNaam": "Evolutie",
 "title": "Natuurlijke selectie",
 "sub": "waarom niet de sterkste wint",
 "puzzle": "Waarom wint niet altijd het sterkste dier?",
 "meta": "evolutie 2/8",
 "version": "1.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Evolutie · film 2 van 8",
 "lead": "Natuurlijke selectie heeft drie dingen nodig: erfelijke variatie, meer nakomelingen dan er kunnen overleven, en selectiedruk. Tel de jongen die zelf ook weer jongen krijgen. Wie daarvan de meeste heeft, geeft de meeste allelen door. Voor een rups is dat de groene. Voor een vink in een droog jaar is het die met de hoogste snavel. Niet de sterkste.",
 "endHaak": "volgende film: Vormen van selectie",
 "minis": {
  "Hoofdstuk 1": "Waarom blijft het aantal vinken gelijk als ze zoveel jongen krijgen?",
  "Hoofdstuk 2": "Welke vinken overleven een jaar zonder regen?",
  "Hoofdstuk 3": "Wat bedoelt een bioloog met fitness?",
  "Hoofdstuk 4": "Wordt een rups groen omdat hij dat nodig heeft?",
  "Recap": "Waarom wint niet altijd het sterkste dier?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Dieren: uitknippoppen uit de dierenbibliotheek; personages uit het castboek. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q06": {
   "q": "Het aantal vinken op het eiland blijft over de jaren ongeveer gelijk. Hoe kan dat?",
   "correct": 2,
   "explain": "Als elk jong zou overleven, zou de populatie steeds verdubbelen. Maar het eiland heeft maar zoveel zaden. De meeste jongen sterven voordat ze zelf gaan broeden."
  },
  "q14": {
   "q": "Welke vinken hebben de meeste kans om de droogte te overleven?",
   "correct": 0,
   "explain": "Een hoge snavel kraakt een Tribulus-vruchtje sneller open. Een vink met een lage snavel krijgt het nauwelijks open, hoe hard hij ook werkt."
  },
  "q19": {
   "q": "De overlevers krijgen in het jaar 1978 jongen. Hoe hoog zijn de snavels van die jongen?",
   "correct": 1,
   "explain": "De jongen van het jaar 1978 hebben gemiddeld een hogere snavel. Ongeveer vier procent hoger dan de vinken van vóór de droogte. Er zijn nog steeds lage, gemiddelde en hoge snavels."
  },
  "q26": {
   "q": "Twee vinken. Welke vink heeft de hoogste fitness?",
   "correct": 0,
   "explain": "Neem een vink die vier jaar leeft. Hij brengt zes jongen groot die zelf ook broeden. Een sterke vink leeft tien jaar, maar heeft maar twee broedende jongen."
  },
  "q31": {
   "q": "Een groene rups leeft op een rood blad. Wat erven zijn jongen van hem?",
   "correct": 1,
   "explain": "Wat een individu in zijn leven meemaakt, verandert zijn allelen niet. Zijn jongen erven alleen de allelen die hij al had. Selectie heeft geen doel."
  }
 },
 "glossary": [
  {
   "t": "overproductie",
   "d": "Er komen meer nakomelingen ter wereld dan er kunnen overleven, omdat voedsel en ruimte beperkt zijn."
  },
  {
   "t": "variatie",
   "d": "Individuen van een populatie verschillen van elkaar, zoals in snavelhoogte; een deel van die verschillen is erfelijk."
  },
  {
   "t": "histogram",
   "d": "Staafdiagram dat laat zien hoeveel individuen elke waarde van een kenmerk hebben, zoals elke snavelhoogte."
  },
  {
   "t": "selectiedruk",
   "d": "Een factor uit de omgeving (biotisch of abiotisch) die bepaalt welke individuen meer kans hebben om te overleven en zich voort te planten, zoals de droogte van 1977 of een merel die rupsen zoekt."
  },
  {
   "t": "selectievoordeel",
   "d": "Een grotere kans om te overleven en nakomelingen te krijgen dan andere individuen, door een erfelijke eigenschap (zoals een hoge snavel in een droog jaar)."
  },
  {
   "t": "natuurlijke selectie",
   "d": "Bij erfelijke variatie, overproductie en selectiedruk krijgen individuen met een selectievoordeel meer nakomelingen, zodat hun allelen in de volgende generaties vaker voorkomen. Selectie maakt zelf geen nieuwe allelen."
  },
  {
   "t": "fitness",
   "d": "Het aantal nakomelingen van een individu dat zelf overleeft en zich voortplant. Niet: kracht, grootte of conditie."
  },
  {
   "t": "adaptatie",
   "d": "Een erfelijke eigenschap die door natuurlijke selectie algemeen is geworden omdat ze in een bepaalde omgeving een selectievoordeel geeft."
  },
  {
   "t": "camouflage",
   "d": "Een kleur of vorm waardoor een organisme wegvalt tegen zijn omgeving en minder snel wordt gezien."
  },
  {
   "t": "evolutie",
   "d": "Verandering van de allelfrequenties in een populatie over generaties. Populaties evolueren, individuen niet (uit film 1)."
  }
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
