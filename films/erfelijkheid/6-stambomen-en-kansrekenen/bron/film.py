import json
film = {
 "slug": "6-stambomen-en-kansrekenen",
 "hoofdstuk": "erfelijkheid",
 "hoofdstukNaam": "Erfelijkheid",
 "title": "Stambomen",
 "sub": "en kansrekenen",
 "puzzle": "Een vrouw wil een kind. Haar broer heeft taaislijmziekte, zij en haar ouders niet. Draagt zij het allel bij zich, en hoe groot is de kans dat haar kind de ziekte krijgt?",
 "meta": "erfelijkheid 6/6",
 "version": "2.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Erfelijkheid · film 6 van 6 · vorige: <a href=\"5-overerving-via-x-chromosomen-en-mitochondrien.html\">X-chromosomen en mitochondriën</a> · terug naar het begin: <a href=\"1-chromosomen.html\">Chromosomen</a>",
 "lead": "Een vrouw van vierendertig wil een kind; haar broer heeft taaislijmziekte. Met een stamboom lees je af hoe een eigenschap overerft: dominant of recessief, op een autosoom of op het X-chromosoom. Daarna reken je met twee regels uit hoe groot de kans is dat zij drager is, en dat haar kind de ziekte krijgt. En je ziet waarom een dominante eigenschap geen generatie overslaat.",
 "endHaak": "Toeval heeft geen geheugen: elk kind is een nieuwe trekking.",
 "minis": {
  "Hoofdstuk 1": "Hoe lees je een familie op papier?",
  "Hoofdstuk 2": "Kan een eigenschap een generatie overslaan?",
  "Hoofdstuk 3": "Welk genotype heeft iedereen in de stamboom?",
  "Hoofdstuk 4": "Hoe groot is de kans dat zij drager is?",
  "Hoofdstuk 5": "Wanneer vermenigvuldig je, en wanneer tel je op?",
  "Hoofdstuk 6": "Hoe groot is de kans dat haar kind de ziekte krijgt?",
  "Recap": "Het stappenplan in vier stappen"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages uit het castboek. Stijl: Part C van de filmprompt (v13). Versie 2.0 · oktober 2026 (lichte remake; de oude versie staat in bron/oud).",
 "questions": {
  "q08": {"q": "Deze man heeft de ziekte van Huntington niet, maar zijn vader wel. Kan zijn kind de ziekte krijgen?", "correct": 1,
          "explain": "Nee. Huntington is dominant: wie de ziekte niet heeft, is aa. Hij heeft geen A om door te geven. Krijgt geen enkel kind van een zieke ouder de A, dan is het allel uit die tak van de familie verdwenen."},
  "q16": {"q": "Haar ouders zijn allebei Aa. De vrouw zelf is gezond. Hoe groot is de kans dat zij drager is?", "correct": 2,
          "explain": "Twee derde. Van de kinderen van Aa × Aa is een kwart AA, de helft Aa en een kwart aa. Zij is gezond, dus aa valt af: van wat overblijft is twee derde Aa."},
  "q21": {"q": "Twee dragers hebben al een kind met taaislijmziekte. Hoe groot is de kans dat hun volgende kind het ook krijgt?", "correct": 1,
          "explain": "Een kwart. Elk kind krijgt opnieuw van elke ouder een willekeurig allel. Wat er bij het vorige kind gebeurde, verandert die kans niet."},
  "q25": {"q": "De vrouw is gezond (kans ⅔ dat ze drager is), haar partner is drager. Hoe groot is de kans dat hun kind taaislijmziekte krijgt?", "correct": 0,
          "explain": "Een zesde: ⅔ (zij is drager) × ½ (zij geeft a) × ½ (hij geeft a). Een kwart klopt alleen als vaststaat dat zij drager is."}
 },
 "glossary": [
  {"t": "stamboom", "d": "Schema van een familie: vierkant = man, rondje = vrouw, ingekleurd = heeft de eigenschap. Elke generatie staat op één hoogte (I, II, III)."},
  {"t": "generatie", "d": "Alle personen die in een stamboom op één hoogte staan; genummerd met Romeinse cijfers."},
  {"t": "drager", "d": "Iemand met Aa bij een recessieve eigenschap: heeft de eigenschap zelf niet, maar kan het allel a doorgeven."},
  {"t": "A_", "d": "Notatie voor een gezond persoon van wie je alleen weet dat er minstens één A is (AA of Aa)."},
  {"t": "autosoom", "d": "Een van de chromosomen 1–22, niet X of Y."},
  {"t": "productregel", "d": "De kans dat onafhankelijke gebeurtenissen allemaal gebeuren = het product van de kansen (en → vermenigvuldigen)."},
  {"t": "somregel", "d": "De kans dat het ene óf het andere gebeurt, als ze elkaar uitsluiten = de som van de kansen (óf → optellen)."}
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
