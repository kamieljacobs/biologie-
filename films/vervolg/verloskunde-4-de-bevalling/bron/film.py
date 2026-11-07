import json
film = {
 "slug": "verloskunde-4-de-bevalling", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "De bevalling", "sub": "van eerste wee tot eerste ademteug",
 "puzzle": "Een baby ademt negen maanden niet. Wat verandert er in zijn hart bij de eerste ademteug?",
 "meta": "verloskunde · bevalling en geboorte", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Verloskunde",
 "lead": "Esra bevalt thuis van haar dochter Lina, met Verloskundige Mirjam erbij. Van het bevalplan, de ontsluiting en een hoofd dat een kwartslag draait, via het luisteren naar het hart tijdens de weeën, tot de eerste ademteug en de placenta die volgt.",
 "endHaak": "welk moment van een bevalling lijkt jou het spannendst voor een verloskundige?",
 "minis": {"Hoofdstuk 1": "Welke keuzes staan in een bevalplan?", "Hoofdstuk 2": "Waarom draait het hoofd van het kind?", "Hoofdstuk 3": "Waarom luistert de verloskundige naar het hart?", "Hoofdstuk 4": "Waarom gaan de kortsluitingen dicht?", "Hoofdstuk 5": "Waarom bloedt een moeder na de placenta niet leeg?", "Recap": "Wat verandert er bij de eerste ademteug?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Verloskundige Mirjam, Esra en baby Lina (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Wat moet er bij de eerste ademteug in het hart van de baby veranderen?", "correct": 1, "explain": "De twee kortsluitingen, het foramen ovale en de ductus Botalli, moeten dicht, zodat het bloed door de longen gaat."},
  "q09": {"q": "De ingang van het bekken is breed van links naar rechts, de uitgang van voor naar achter. Wat doet het hoofd?", "correct": 0, "explain": "Het hoofd draait een kwartslag en buigt de kin op de borst, zodat het steeds met de kleinste omtrek door de breedste richting gaat."},
  "q17": {"q": "Waarom bloedt een moeder niet leeg uit de plek waar de placenta vastzat?", "correct": 2, "explain": "De baarmoeder trekt samen; de kriskras lopende spiervezels knijpen de bloedvaten dicht. Oxytocine helpt daarbij."}
 },
 "glossary": [
  {"t": "bevalplan", "d": "Afspraken over waar je bevalt (thuis, geboortecentrum, ziekenhuis) en hoe je met pijn omgaat."},
  {"t": "ruggenprik", "d": "Verdoving via de rug van de zenuwen die de pijn van de baarmoeder naar het ruggenmerg brengen; alleen in het ziekenhuis, onder zorg van de gynaecoloog."},
  {"t": "ontsluiting", "d": "Eerste fase van de bevalling: de baarmoederhals wordt korter en gaat open tot tien centimeter."},
  {"t": "uitdrijving", "d": "Fase na volledige ontsluiting waarin de moeder perst en het kind geboren wordt."},
  {"t": "harttonen", "d": "De hartslag van het kind, normaal tussen 110 en 160 per minuut; bewaakt tijdens de bevalling omdat het kind tijdens een wee minder zuurstof krijgt."},
  {"t": "foramen ovale", "d": "Opening met een klepje tussen de boezems van het ongeboren kind; wordt bij de geboorte dichtgeduwd door de hogere druk links."},
  {"t": "ductus Botalli", "d": "Bloedvat tussen longslagader en aorta bij het ongeboren kind; knijpt in de eerste dagen na de geboorte samen."},
  {"t": "Apgar-score", "d": "Score na één en vijf minuten: hartslag, ademhaling, spierspanning, reactie en kleur, elk 0, 1 of 2 punten."},
  {"t": "nageboorte", "d": "De placenta, die na het kind geboren wordt; daarna knijpt de baarmoeder de bloedvaten van de placentaplek dicht."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
