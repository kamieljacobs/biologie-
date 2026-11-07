import json
true, false = True, False
film = {
 "slug": "8-van-zand-tot-bos",
 "hoofdstuk": "ecologie",
 "hoofdstukNaam": "Ecologie",
 "title": "Van zand tot bos",
 "sub": "successie, van pionier tot climax",
 "puzzle": "Hoe wordt kaal zand vanzelf een bos?",
 "meta": "ecologie 8/8",
 "version": "1.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Ecologie · film 8 van 8",
 "lead": "Terug naar het paaltje. Kaal zand wordt vanzelf bos, doordat de soorten zelf de plek veranderen. Pioniers maken humus en houden het zand vast. Daarna groeien soorten die de pioniers wegconcurreren. Na een brand gaat het veel sneller, want de bodem en de zaadbank zijn er al. En een bos is nooit helemaal af: het blijft een evenwicht dat steeds een beetje verandert. Niemand plant het bos. De plek verandert zichzelf.",
 "endHaak": "welke pioniers groeien er op een kale plek bij jou in de buurt?",
 "minis": {
  "Hoofdstuk 1": "Wie kan er leven op kaal, stuivend zand?",
  "Hoofdstuk 2": "Waarom verdwijnen de eerste soorten weer?",
  "Hoofdstuk 3": "Wanneer stopt de successie?",
  "Hoofdstuk 4": "Waarom groeit na een brand alles veel sneller terug?",
  "Recap": "Hoe wordt kaal zand vanzelf een bos?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Dieren: uitknippoppen uit de dierenbibliotheek en de ecologiepoppen; personages uit het castboek. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q07": {
   "q": "Waarom staan er op blad één geen eiken?",
   "correct": 2,
   "explain": "Gaaien en wind brengen wel zaden en sporen. Maar alleen een paar soorten overleven hier. Eerst buntgras, een grijs pollenpolletje, en algen."
  },
  "q16": {
   "q": "Waarom is het buntgras op blad vier verdwenen?",
   "correct": 0,
   "explain": "Op blad vier valt op de grond nog maar een deel van het licht. Heide en jonge dennen groeien over het buntgras heen. Het verliest de concurrentie om licht, water en voedingsstoffen."
  },
  "q24": {
   "q": "Is het bos op blad zes nu af?",
   "correct": 1,
   "explain": "Ook een climaxbos verandert. Een storm gooit een oude eik om. In het gat valt licht op de grond, en daar beginnen pioniers opnieuw."
  },
  "q32": {
   "q": "Waarom groeit er op de brandplek veel sneller iets terug dan op het kale zand?",
   "correct": 2,
   "explain": "Onder de zwarte laag ligt nog steeds een bodem met humus. Die houdt water en voedingsstoffen vast. En in de grond zitten zaden die jarenlang kiemkrachtig blijven: de zaadbank."
  }
 },
 "glossary": [
  {
   "t": "successie",
   "d": "Geleidelijke verandering van de levensgemeenschap op één plek, doordat soorten elkaar opvolgen."
  },
  {
   "t": "primaire successie",
   "d": "Successie die begint op kale grond zonder humus, zoals stuifzand."
  },
  {
   "t": "secundaire successie",
   "d": "Successie op een bodem die er al is (met humus, zaden en wortels), bijvoorbeeld na brand of op een verlaten akker; gaat sneller."
  },
  {
   "t": "pioniersoort",
   "d": "Soort die zich als eerste vestigt op kale of verstoorde grond: brede tolerantie, veel kleine en lang kiemkrachtige zaden of sporen; verandert de standplaats en verdwijnt later door concurrentie."
  },
  {
   "t": "tolerantie",
   "d": "Het bereik van een abiotische factor waarbinnen een soort kan leven (uitgelegd in de film Waar past een soort?)."
  },
  {
   "t": "humus",
   "d": "Donker, afgebroken organisch materiaal in de bovenste bodemlaag; houdt water en voedingsstoffen vast."
  },
  {
   "t": "climaxecosysteem",
   "d": "Relatief stabiel eindstadium van een successie, in Nederland meestal bos; blijft dynamisch."
  },
  {
   "t": "zaadbank",
   "d": "Voorraad kiemkrachtige zaden in de bodem."
  },
  {
   "t": "biologisch evenwicht",
   "d": "Toestand waarin de aantallen van soorten in een ecosysteem schommelen binnen grenzen."
  },
  {
   "t": "dynamiek",
   "d": "Voortdurende kleine veranderingen in een ecosysteem, bijvoorbeeld door storm, ziekte of vraat."
  },
  {
   "t": "invasieve exoot",
   "d": "Uitheemse soort die zich snel uitbreidt en inheemse soorten verdringt (uitgewerkt in de film Ingrijpen of laten gaan?)."
  },
  {
   "t": "abiotische en biotische sturing",
   "d": "In het begin van een successie bepalen vooral abiotische factoren welke soorten er groeien, later vooral biotische factoren zoals concurrentie.",
   "vwo": true
  }
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
