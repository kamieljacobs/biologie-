import json
true, false = True, False
film = {
 "slug": "5-toeval-en-uitwisseling",
 "hoofdstuk": "evolutie",
 "hoofdstukNaam": "Evolutie",
 "title": "Toeval en uitwisseling",
 "sub": "drift, flessenhals en genenstroom",
 "puzzle": "Kan een allel vaak worden zonder dat het iets oplevert?",
 "meta": "evolutie 5/8",
 "version": "1.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Evolutie · film 5 van 8",
 "lead": "De volgende generatie krijgt een greep uit de pot, en die greep is toeval. Dat is genetische drift: sterk in kleine populaties, zwak in grote. Bij een flessenhals of founder-effect wordt een populatie ineens klein, en gaat variatie verloren. Genenstroom maakt populaties meer gelijk. Op Pingelap kwam het allel voor achromatopsie door een flessenhals in een kleine populatie terecht. Daarna maakte drift het gewoon. Een allel kan dus vaak worden zonder dat het iets oplevert.",
 "endHaak": "volgende film: Hoe één soort er twee wordt",
 "minis": {
  "Hoofdstuk 1": "Verandert de pot als er geen selectie is?",
  "Hoofdstuk 2": "Wat gebeurt er als een populatie ineens klein wordt?",
  "Hoofdstuk 3": "Wat gebeurt er als populaties dieren uitwisselen?",
  "Hoofdstuk 4": "Welke kracht kan een nutteloos allel gewoon maken?",
  "Hoofdstuk 5": "Hoe meet je of de pot verandert?",
  "Recap": "Kan een allel vaak worden zonder dat het iets oplevert?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Dieren: uitknippoppen uit de dierenbibliotheek; personages uit het castboek. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q08": {
   "q": "Tien dieren, de helft van de allelen blauw. Geen selectie. Elke generatie trek je blind. Na zestig generaties?",
   "correct": 2,
   "explain": "Een computer trekt zestig generaties lang blind uit een pot van tien dieren, half blauw en half geel. Dat doet hij acht keer. De lijnen zwalken alle kanten op."
  },
  "q15": {
   "q": "Een populatie gaat door een flessenhals: van duizend naar twintig dieren. Wat gebeurt er met de genetische variatie?",
   "correct": 0,
   "explain": "Twintig mensen dragen samen maar veertig allelen van elk gen. Zeldzame allelen vallen dan vaak weg. En wat er overblijft, kan door toeval ineens vaak zijn."
  },
  "q25": {
   "q": "Twee populaties: 90 en 10 procent blauw. Elke generatie verhuist één op de twintig dieren. Wat gebeurt er met de twee populaties?",
   "correct": 1,
   "explain": "Neem twee populaties: in de ene is negentig procent van de allelen blauw, in de andere tien procent. Elke generatie verhuist één op de twintig dieren naar de andere kant. De lijnen schuiven naar elkaar toe."
  },
  "q32": {
   "q": "Welke kracht kan een allel vaak maken, ook als het niets oplevert of zelfs schaadt?",
   "correct": 2,
   "explain": "Selectie laat allelen met een voordeel vaker worden. Drift kijkt niet naar voordeel of nadeel. In een kleine populatie kan toeval een nutteloos of schadelijk allel heel gewoon maken."
  },
  "q40": {
   "q": "Eén op de 2500 baby's heeft een recessieve ziekte. Welk deel van de mensen is drager van het allel?",
   "correct": 1,
   "explain": "Neem de wortel: q is één vijftigste. Dan is p bijna één. Dragers hebben één van elk: twee p q."
  },
  "q45": {
   "q": "Waarom blijft het sikkelcelallel daar zo gewoon?",
   "correct": 0,
   "explain": "Dragers hebben één sikkelcelallel en één normaal allel. Zij krijgen zo'n negen keer minder vaak ernstige malaria. Waar malaria veel voorkomt, overleven dragers het best."
  }
 },
 "glossary": [
  {
   "t": "genetische drift",
   "d": "Verandering van allelfrequenties door toeval. Sterk in kleine populaties, zwak in grote."
  },
  {
   "t": "flessenhalseffect",
   "d": "Een populatie wordt ineens heel klein; welke allelen overblijven is toeval en er gaat variatie verloren."
  },
  {
   "t": "founder-effect",
   "d": "Een paar individuen beginnen een nieuwe populatie; hun allelen zijn een toevallige greep uit de oude genenpool."
  },
  {
   "t": "genenstroom",
   "d": "Uitwisseling van allelen tussen populaties doordat individuen verhuizen. Populaties gaan daardoor op elkaar lijken."
  },
  {
   "t": "genetische variatie",
   "d": "De verschillende allelen in een populatie."
  },
  {
   "t": "Hardy-Weinberg",
   "d": "Zonder drift, selectie, genenstroom en mutatie en bij willekeurig paren blijven de genotypen p² : 2pq : q², met p + q = 1. Een meetlat: wijkt een populatie af, dan werkt er een kracht.",
   "vwo": true
  },
  {
   "t": "genotypefrequentie",
   "d": "Het aandeel van een genotype (bv. AA, Aa of aa) in een populatie.",
   "vwo": true
  },
  {
   "t": "heterozygotenvoordeel",
   "d": "Heterozygoten hebben een hogere fitness dan beide homozygoten, zodat selectie beide allelen in stand houdt (sikkelcel en malaria).",
   "vwo": true
  }
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
