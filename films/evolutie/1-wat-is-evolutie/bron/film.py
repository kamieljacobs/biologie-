import json
true, false = True, False
film = {
 "slug": "1-wat-is-evolutie",
 "hoofdstuk": "evolutie",
 "hoofdstukNaam": "Evolutie",
 "title": "Wat is evolutie eigenlijk?",
 "sub": "variatie, allelen en de genenpool",
 "puzzle": "Waarom lijken broers en zussen op elkaar, maar nooit precies?",
 "meta": "evolutie 1/8",
 "version": "1.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Evolutie · film 1 van 8",
 "lead": "Variatie is het verschil tussen individuen van één soort. Een deel is erfelijk, een deel komt uit de omgeving. Nieuwe allelen ontstaan door mutatie. Meiose en bevruchting maken er steeds nieuwe combinaties mee. Daarom lijken broers en zussen op elkaar, maar nooit precies. Dezelfde ouders, maar elk een andere greep uit hun allelen. Alle allelen van een populatie samen vormen de genenpool. Evolutie is een verandering van de allelfrequenties in die pot, over generaties.",
 "endHaak": "volgende film: Natuurlijke selectie",
 "minis": {
  "Hoofdstuk 1": "Zijn alle verschillen erfelijk?",
  "Hoofdstuk 2": "Hoe krijgt elk kind een andere mix?",
  "Hoofdstuk 3": "Hoe groot is een populatie?",
  "Hoofdstuk 4": "Wat verandert er als een soort evolueert?",
  "Recap": "Waarom lijken broers en zussen op elkaar, maar nooit precies?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Dieren: uitknippoppen uit de dierenbibliotheek; personages uit het castboek. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q10": {
   "q": "Twee oranje beestjes uit hetzelfde legsel. Het ene groeit op in de kou, het andere in de warmte. Hoe zit het met hun stippen?",
   "correct": 2,
   "explain": "Kou geeft een oranje beestje meer en grotere stippen. In een proef hadden beestjes bij veertien graden er allemaal negentien. Bij achtentwintig graden waren het er gemiddeld acht."
  },
  "q16": {
   "q": "Yasmin en Bilal hebben dezelfde ouders. Waarom hebben ze toch niet dezelfde allelen?",
   "correct": 1,
   "explain": "Elke ouder heeft van elk gen twee allelen. Bij de meiose komt in een eicel of zaadcel maar één van de twee terecht. Welke, dat is toeval."
  },
  "q23": {
   "q": "Hoe groot is de populatie waar dit beestje bij hoort?",
   "correct": 2,
   "explain": "De grens van een populatie ligt niet vast. De onderzoeker kiest hem, passend bij zijn vraag. Wie één tuin volgt, telt de beestjes in die tuin."
  },
  "q29": {
   "q": "Twee van de tien beestjes zijn zwart. Welk deel van de knikkers in de pot is blauw?",
   "correct": 0,
   "explain": "Twintig knikkers in de pot, en maar twee ervan zijn blauw. Dat is tien procent. Dat aandeel heet de allelfrequentie."
  },
  "q33": {
   "q": "Tien procent van de allelen is blauw. Twintig generaties later is dat dertig procent. Wat is er veranderd?",
   "correct": 1,
   "explain": "Een beestje dat oranje uit de pop komt, blijft zijn hele leven oranje. Zijn allelen veranderen niet. Wat verschilt, is welke beestjes jongen krijgen, en hoeveel."
  }
 },
 "glossary": [
  {
   "t": "variatie",
   "d": "Verschillen tussen individuen van één soort. Een deel is erfelijk, een deel komt uit de omgeving."
  },
  {
   "t": "allel",
   "d": "Een variant van een gen."
  },
  {
   "t": "mutatie",
   "d": "Een verandering in het DNA; zo kan een nieuw allel ontstaan."
  },
  {
   "t": "recombinatie",
   "d": "Nieuwe combinaties van bestaande allelen door meiose en bevruchting."
  },
  {
   "t": "populatie",
   "d": "Een groep individuen van één soort in één gebied die zich onderling voortplanten. De onderzoeker kiest de grens."
  },
  {
   "t": "genenpool",
   "d": "Alle allelen van alle individuen in een populatie samen."
  },
  {
   "t": "allelfrequentie",
   "d": "Het aandeel van een allel in de genenpool."
  },
  {
   "t": "evolutie",
   "d": "Verandering van de allelfrequenties in een populatie, over generaties."
  }
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
