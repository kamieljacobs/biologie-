import json
film = {
 "slug": "4-dihybride-kruising-en-gekoppelde-overerving",
 "hoofdstuk": "erfelijkheid",
 "hoofdstukNaam": "Erfelijkheid",
 "title": "Dihybride kruising",
 "sub": "en gekoppelde overerving",
 "puzzle": "In de peulen van één erwtenplant zitten ook gele, gerimpelde en groene, ronde erwten, terwijl de grootouders alleen geel-rond en groen-gerimpeld hadden. Hoe kan dat?",
 "meta": "erfelijkheid 4/6",
 "version": "2.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Erfelijkheid · film 4 van 6 · volgende: <a href=\"5-overerving-via-x-chromosomen-en-mitochondrien.html\">Overerving via X-chromosomen en mitochondriën</a>",
 "lead": "Twee genen tegelijk. Liggen ze op verschillende chromosomen, dan worden ze bij de meiose los van elkaar verdeeld en ontstaan nieuwe combinaties, zoals bij Mendels erwten. Liggen ze op hetzelfde chromosoom, dan gaan ze meestal samen mee: gekoppelde genen, zoals bij het fruitvliegje. Vwo ziet daarnaast de kruisingsschema's met twee genen en hoe crossing-over de koppeling af en toe verbreekt.",
 "endHaak": "Wat gebeurt er als een gen op het X-chromosoom ligt?",
 "minis": {
  "Hoofdstuk 1": "Hoe ontstaan nieuwe combinaties van eigenschappen?",
  "Hoofdstuk 2": "Hoe ziet een kruisingsschema met twee genen eruit?",
  "Hoofdstuk 3": "Waarom zie je bij het fruitvliegje minder nieuwe combinaties?",
  "Hoofdstuk 4": "Hoe herken je gekoppelde genen in een kruisingsschema?",
  "Hoofdstuk 5": "Hoe ontstaan toch nieuwe combinaties van gekoppelde genen?",
  "Recap": "Hoe kan een erwt geel én gerimpeld zijn?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personage: Opa Henk uit het castboek (zonder naam in de film). Decor moestuin: hergebruikt uit Landbouw 2. Stijl: Part C van de filmprompt (v13). Versie 2.0 · oktober 2026.",
 "questions": {
  "q08": {"q": "Een erwtenplant is heterozygoot voor kleur (Gg) en voor vorm (Rr); de genen liggen op verschillende chromosomen. Hoeveel soorten gameten kan hij maken?", "correct": 1,
          "explain": "Vier: GR, Gr, gR en gr, elk ongeveer een kwart. Hoe elk chromosoompaar in de meiose ligt, is toeval, los van het andere paar."},
  "q13": {"q": "Beide ouders maken vier soorten gameten. Hoeveel vakjes krijgt het kruisingsschema?", "correct": 2,
          "explain": "Vier soorten gameten keer vier soorten: zestien vakjes, elk met dezelfde kans."},
  "q21": {"q": "Twee genen liggen op hetzelfde chromosoom (G naast V, g naast v) en elk chromosoom gaat in zijn geheel naar een gameet. Hoeveel soorten gameten?", "correct": 2,
          "explain": "Twee: GV en gv, elk de helft. De allelen op één chromosoom gaan samen mee: gekoppelde genen."},
  "q29": {"q": "Een vliegje met G naast v en g naast V (Gv/gV) wordt gekruist met gv/gv. Welke nakomelingen krijg je (zonder crossing-over)?", "correct": 1,
          "explain": "Het vliegje maakt alleen Gv- en gV-gameten. De nakomelingen zijn dus grijs met stompe vleugels en zwart met normale vleugels."}
 },
 "glossary": [
  {"t": "dihybride kruising", "d": "Kruising waarbij je twee genen tegelijk volgt.", "vwo": True},
  {"t": "onafhankelijke overerving", "d": "Genen op verschillende chromosomen worden bij de meiose los van elkaar over de gameten verdeeld. Een plant die voor twee genen heterozygoot is (GgRr), maakt vier soorten gameten, elk een kwart."},
  {"t": "gekoppelde genen", "d": "Genen die op hetzelfde chromosoom liggen. Ze gaan meestal samen naar dezelfde gameet. Welke allelen samen liggen, lees je af aan de ouders (notatie GV/gv of Gv/gV)."},
  {"t": "9 : 3 : 3 : 1", "d": "Fenotypeverhouding bij de kruising van twee dubbel heterozygoten met onafhankelijke genen.", "vwo": True},
  {"t": "productregel", "d": "Kansen die allebei moeten gebeuren, vermenigvuldig je. Per gen mag dat alleen als de genen onafhankelijk zijn.", "vwo": True},
  {"t": "crossing-over", "d": "Uitwisseling van een stuk tussen chromatiden van twee homologe chromosomen tijdens meiose I.", "vwo": True},
  {"t": "recombinant", "d": "Gameet of nakomeling met een nieuwe combinatie van allelen, ontstaan door crossing-over.", "vwo": True}
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
