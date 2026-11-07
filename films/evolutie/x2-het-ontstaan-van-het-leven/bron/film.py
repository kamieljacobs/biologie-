import json
true, false = True, False
film = {
 "slug": "x2-het-ontstaan-van-het-leven",
 "hoofdstuk": "evolutie",
 "hoofdstukNaam": "Evolutie",
 "title": "Het ontstaan van het leven",
 "sub": "van moleculen naar de eerste cel",
 "puzzle": "Hoe word je van losse moleculen een cel die zichzelf kopieert?",
 "meta": "evolutie extra 2/4",
 "version": "1.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Evolutie · extra film 2 van 4 (buiten het PTA)",
 "lead": "Van losse moleculen naar een cel die zichzelf kopieert? Bouwstenen kunnen vanzelf ontstaan. RNA draagt informatie én doet werk, en kopiëren met fouten geeft selectie. Vetzuren vormen een omhulsel. Hoe het precies ging, en waar, weten we nog niet. Wel weten we waar de ketting van cellen samenkomt: bij LUCA. Wat daaruit groeide, zie je in de film Van eerste cel tot nu.",
 "endHaak": "volgende extra film: Van eerste cel tot nu",
 "minis": {
  "Hoofdstuk 1": "Kunnen de stoffen van het leven ontstaan zonder leven?",
  "Hoofdstuk 2": "Wat kwam eerst: de bouwtekening of het gereedschap?",
  "Hoofdstuk 3": "Hoe krijgt een kopieerder een binnen en een buiten?",
  "Hoofdstuk 4": "Wat vertelt het leven van nu over de eerste cellen?",
  "Recap": "Hoe word je van losse moleculen een cel die zichzelf kopieert?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Dieren: uitknippoppen uit de dierenbibliotheek; personages uit het castboek. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q09": {
   "q": "Na een week vonken: wat zat er in Millers kolf?",
   "correct": 1,
   "explain": "Het water werd dieprood. Miller vond er aminozuren in, zoals glycine en alanine: bouwstenen van eiwitten. Gemaakt zonder één levende cel."
  },
  "q16": {
   "q": "DNA heeft eiwitten nodig, en eiwitten hebben DNA nodig. Wat zou dat kringetje kunnen doorbreken?",
   "correct": 0,
   "explain": "Veel onderzoekers kijken naar RNA. RNA draagt informatie, net als DNA. Maar het is meestal één losse streng, en die kan op zichzelf terugvouwen."
  },
  "q23": {
   "q": "Wat gebeurt er na veel rondes kopiëren met de strengen in het plasje?",
   "correct": 2,
   "explain": "De meeste fouten maken een streng trager, een enkele sneller. Die maakt meer kopieën, en die erven de fout. Zo raken snelle strengen in de meerderheid."
  },
  "q29": {
   "q": "Je doet heel veel vetzuren in water. Wat gebeurt er?",
   "correct": 1,
   "explain": "In water met de juiste zuurgraad vormen vetzuren vanzelf blaasjes. De staarten gaan bij elkaar zitten, weg van het water. De koppen zitten buiten en binnen."
  },
  "q36": {
   "q": "Waarom gebruiken een bacterie, een eik en jij dezelfde code?",
   "correct": 0,
   "explain": "Een andere code kan ook: in je mitochondriën betekenen een paar codes iets anders. Dat alles toch vrijwel dezelfde code heeft, wijst op een erfenis: LUCA, de laatste gemeenschappelijke voorouder van alles wat nu leeft."
  }
 },
 "glossary": [
  {
   "t": "experiment van Miller",
   "d": "Proef uit 1953: water, methaan, ammoniak en waterstof, warmte en een week vonken in een gesloten glazen opstelling. Er ontstonden aminozuren, zonder levende cel."
  },
  {
   "t": "aminozuur",
   "d": "Bouwsteen van eiwitten. Kan zonder leven ontstaan uit simpele stoffen en energie, en zit ook in meteorieten."
  },
  {
   "t": "ribozym",
   "d": "RNA-molecuul dat door zijn vouwing een reactie versnelt, zoals een enzym. In ribosomen zet RNA de aminozuren aan elkaar."
  },
  {
   "t": "RNA-wereld",
   "d": "Hypothese dat er vóór DNA en eiwitten leven was met RNA als bouwtekening én gereedschap. Gesteund door proeven, niet bewezen."
  },
  {
   "t": "vetzuur",
   "d": "Molecuul met een kop die oplost in water en een staart die dat niet doet. In water vormen vetzuren vanzelf blaasjes met een dubbele laag."
  },
  {
   "t": "protocel",
   "d": "Model van een voorloper van de cel: een blaasje van vetzuren met daarin RNA dat zichzelf kopieert. Nog geen cel."
  },
  {
   "t": "genetische code",
   "d": "De regel waarmee een cel DNA afleest: drie letters staan voor één aminozuur. Vrijwel gelijk in alle organismen."
  },
  {
   "t": "LUCA",
   "d": "De laatste gemeenschappelijke voorouder van alles wat nu leeft (last universal common ancestor): de cel waarin alle takken van de stamboom samenkomen. Niet de eerste cel."
  },
  {
   "t": "stromatoliet",
   "d": "Gesteente met fijne laagjes, opgebouwd door matten van microben. De oudste breed aanvaarde zijn ongeveer 3,5 miljard jaar oud."
  }
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
