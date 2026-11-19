import json
film = {
 "slug": "sport-6-de-stem-in-je-hoofd", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "De stem in je hoofd", "sub": "spanning op het startblok",
 "puzzle": "Op het startblok begint je hoofd te praten. Waarom helpt het om jezelf dan bij je naam aan te spreken?",
 "meta": "sport en topsport · sportpsychologie", "version": "1.0 · november 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Sport en topsport",
 "lead": "Een zwemmer van zestien staat in de finale van de 100 meter vrij. In de twintig minuten voor de start volg je wat er in zijn hoofd gebeurt: bij het inzwemmen helpt zijn innerlijke stem met het raceplan, tot hij gaat malen en piekeren (chatter) en ruimte inneemt in het werkgeheugen. In de wachtruimte denkt hij terug aan de sportpsycholoog: dezelfde zorg met 'ik' of met 'je' is een manier van afstand nemen, en in de proef van Ethan Kross sprak de naamgroep beter en maalde ze achteraf minder. Achter het blok bonkt zijn hart: is dat uitdaging of bedreiging? En op het blok doet hij zijn routine. Waarom werkt een ritueel beter als je het een ritueel noemt?",
 "endHaak": "welke zin zeg jij tegen jezelf vlak voor een toets of wedstrijd, en hoe klinkt die met 'je' of met je naam?",
 "minis": {"Hoofdstuk 1 — Je innerlijke stem": "Wat gebeurt er op je werkbank als je piekert?",
           "Hoofdstuk 2 — Afstand nemen": "Wat veranderde er toen studenten 'je' of hun naam gebruikten?",
           "Hoofdstuk 3 — Uitdaging of bedreiging": "Helpt of hindert een snelle hartslag?",
           "Hoofdstuk 4 — Routines en rituelen": "Waarom werkt een ritueel beter als je het zo noemt?",
           "Recap": "Waarom helpt het om jezelf bij je naam aan te spreken?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: de zwemmer, de sportpsycholoog en de zwemtrainer; figuranten uit het castboek als finalisten, studenten, beoordelaars en proefpersonen. Decors: zwembad, wachtruimte en de kamer van de sportpsycholoog, getekend in de film. Onderzoek uit o.a. Kross e.a. 2014, Ayduk &amp; Kross 2010, Bruehlman-Senecal &amp; Ayduk 2015, Hardy e.a. 2019, Eysenck e.a. 2007, Jamieson e.a. 2012, Moore e.a. 2015, Rupprecht e.a. 2021 en Brooks e.a. 2016 (zie Getallen en bronnen). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · november 2026.",
 "questions": {
  "q05": {"q": "De zwemmer blijft een kwartier lang piekeren over alles wat mis kan gaan. Wat betekent dat voor zijn race?", "correct": 2,
          "explain": "Piekeren kan ruimte kosten in je werkgeheugen, de kleine werkruimte waarin je dingen even vasthoudt en gebruikt. In proeven werkt het werkgeheugen minder goed als mensen angstig zijn, dus blijft er minder ruimte over voor het raceplan. Een stil hoofd is niet het doel: de innerlijke stem kan juist nuttig zijn."},
  "q09": {"q": "Studenten bereidden in vijf minuten een speech voor: de ene groep met 'ik', de andere met hun eigen naam of met 'je'. Hoe ging het bij de naamgroep?", "correct": 0,
          "explain": "De naamgroep sprak beter volgens de beoordelaars, en achteraf schaamden ze zich minder en maalden ze minder (Kross e.a. 2014). Niemand had hun gevraagd positief te denken: alleen het woord verschilde. Kross denkt dat de afstand het verschil maakt."},
  "q13": {"q": "Het hart van de zwemmer bonkt achter het blok. Wat betekent die snelle hartslag voor zijn race?", "correct": 1,
          "explain": "Een snelle hartslag kan helpen of hinderen. Het hangt af van de vraag: heb ik genoeg in huis voor wat er gevraagd wordt? Bij uitdaging pompt het hart in metingen vaak meer bloed rond en staan de vaten wijder, bij bedreiging knijpen de vaten meer samen. In sport gaat uitdaging vaak samen met beter presteren, maar de gemeten effecten zijn klein."},
  "q18": {"q": "Twee groepen deden vóór een spannende taak dezelfde handelingen. Bij de ene groep heette dat een ritueel, bij de andere een paar willekeurige handelingen. Wat gebeurde er?", "correct": 2,
          "explain": "Als het 'ritueel' heette, werkte het beter (Brooks e.a. 2016). In één reeks proeven had wie vooraf een ritueel deed daarna een rustiger hart en minder spanning, en zong beter voor een vreemde dan wie niets deed. Geluk zit er niet in: de betekenis die je eraan geeft maakt het verschil."}
 },
 "glossary": [
  {"t": "innerlijke stem", "d": "In jezelf praten zonder geluid. Je kunt er je race mee plannen en jezelf mee bijsturen."},
  {"t": "chatter", "d": "De innerlijke stem die gaat malen, piekeren en zichzelf verwijten (Ethan Kross)."},
  {"t": "werkgeheugen", "d": "De kleine werkruimte in je hoofd waarin je dingen even vasthoudt en gebruikt. Er past maar weinig op."},
  {"t": "afstand nemen", "d": "Naar je eigen situatie kijken alsof je er buiten staat: met je naam of 'je', als een vlieg op de muur, of vooruit in de tijd."},
  {"t": "uitdaging", "d": "Je denkt dat je genoeg in huis hebt voor wat er gevraagd wordt. In metingen pompt het hart dan vaak meer bloed rond en staan de vaten wijder."},
  {"t": "bedreiging", "d": "Je denkt dat je niet genoeg in huis hebt voor wat er gevraagd wordt. In metingen knijpen de vaten dan meer samen."},
  {"t": "routine", "d": "Een vaste volgorde van handelingen en gedachten vóór de start. Kan je aandacht bij je race houden."},
  {"t": "ritueel", "d": "Een vaste reeks handelingen zonder direct nut, waar je zelf betekenis aan geeft."},
  {"t": "sportpsycholoog", "d": "Psycholoog die sporters helpt met spanning, twijfel, aandacht en tegenvallers. Opleiding: bachelor psychologie, master met sportpsychologie en daarna een praktijkopleiding."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
