import json
true, false = True, False
film = {
 "slug": "x1-de-reis-van-darwin",
 "hoofdstuk": "evolutie",
 "hoofdstukNaam": "Evolutie",
 "title": "De reis van Darwin",
 "sub": "botten, nandoes en eilanden",
 "puzzle": "Wat zag Darwin onderweg, en waarom duurde het twintig jaar voor hij het opschreef?",
 "meta": "evolutie extra 1/4",
 "version": "1.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Evolutie · extra film 1 van 4 (buiten het PTA)",
 "lead": "Wat zag Darwin? Reuzen naast hun kleine familie, nandoes die elkaar aflossen, eilanddieren die lijken op het vasteland. Waarom twintig jaar? Hij werkte zijn reis uit, bestudeerde zeepokken en verzamelde bewijs. Toen kwam Wallace. Hoe natuurlijke selectie werkt, zie je in de film Natuurlijke selectie.",
 "endHaak": "volgende extra film: Het ontstaan van het leven",
 "minis": {
  "Hoofdstuk 1": "Wat dacht Darwin over soorten toen hij vertrok?",
  "Hoofdstuk 2": "Waarom liggen de reuzen precies waar nu hun kleine familie leeft?",
  "Hoofdstuk 3": "Op wie lijken de dieren van de Galápagos?",
  "Hoofdstuk 4": "Waarom publiceerde Darwin twintig jaar lang niets?",
  "Hoofdstuk 5": "Wie kwam op hetzelfde idee, en hoe liep dat af?",
  "Recap": "Wat zag Darwin onderweg, en waarom duurde het twintig jaar voor hij het opschreef?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Dieren: uitknippoppen uit de dierenbibliotheek; personages uit het castboek. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q07": {
   "q": "Wat dacht Darwin over soorten toen hij vertrok?",
   "correct": 1,
   "explain": "Darwin ging niet op reis om iets te bewijzen. Net als de meeste onderzoekers dacht hij dat soorten vastliggen. Zijn opa had al over veranderende soorten geschreven, maar zonder overtuigend bewijs."
  },
  "q13": {
   "q": "Darwin vindt de reuzen precies waar nu hun kleine familie leeft. Wat past daar het best bij?",
   "correct": 2,
   "explain": "Als elke soort los gemaakt is, zegt de plek niets. Een reuzenluiaard kan dan overal liggen. Maar Darwin vindt de reuzen juist waar nu hun kleine familie leeft."
  },
  "q22": {
   "q": "De Galápagos en de Kaapverdische eilanden zijn allebei vulkanisch, droog en ongeveer even hoog. Op welke dieren lijken de Galápagos-dieren het meest?",
   "correct": 0,
   "explain": "De eilanden lijken op elkaar, de dieren niet. De Galápagos-dieren lijken op die van Zuid-Amerika, de Kaapverdische op die van Afrika. Bijna alles draagt het stempel van het vasteland ernaast."
  },
  "q25": {
   "q": "Wanneer begreep Darwin dat de vinken van de Galápagos bijzonder waren?",
   "correct": 1,
   "explain": "En de beroemde vinken? Darwin nam ze mee, maar lette er weinig op. Hij hield ze bijna niet per eiland apart."
  },
  "q33": {
   "q": "Waarom wachtte Darwin zo lang met publiceren?",
   "correct": 0,
   "explain": "Lang heette het: Darwin durfde niet. Historici zijn het daar niet over eens. Vast staat: eerst werkte hij zijn reis uit in boeken."
  },
  "q38": {
   "q": "Darwin leest in de brief van Wallace zijn eigen idee. Wat gebeurde er daarna?",
   "correct": 2,
   "explain": "In juni, het jaar 1858, krijgt Darwin het stuk van Wallace. Hij stuurt het door naar Lyell en schrijft erbij: al mijn originaliteit wordt verpletterd. Lyell en Joseph Hooker regelen dat het stuk van Wallace en twee teksten van Darwin samen worden voorgelezen."
  }
 },
 "glossary": [
  {
   "t": "fossiel",
   "d": "Versteend overblijfsel of spoor van een organisme in een aardlaag (zie ook de film Hoe weten we dat?)."
  },
  {
   "t": "uitgestorven",
   "d": "Een soort is uitgestorven als er geen levende exemplaren meer van zijn, zoals Megatherium en Glyptodon."
  },
  {
   "t": "gemeenschappelijke voorouder",
   "d": "Een populatie waarvan twee of meer soorten afstammen."
  },
  {
   "t": "natuurlijke selectie",
   "d": "Individuen met erfelijke eigenschappen die in hun omgeving meer overlevende nakomelingen opleveren, geven die eigenschappen vaker door; zo verandert een populatie over generaties. Uitgelegd in de film Natuurlijke selectie."
  }
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
