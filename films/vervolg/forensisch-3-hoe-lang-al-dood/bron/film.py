import json
film = {
 "slug": "forensisch-3-hoe-lang-al-dood", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Hoe lang al dood?", "sub": "afkoeling, lijkstijfheid en vliegenlarven",
 "puzzle": "Iemand wordt overleden gevonden in zijn huis. Hoe kan een vlieg vertellen wanneer het gebeurd is?",
 "meta": "forensisch onderzoek · hbo en wo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Forensisch onderzoek",
 "lead": "Een buurvrouw zag haar buurman twee weken geleden voor het laatst; nu is hij overleden gevonden. Dr. Kim, forensisch arts, zoekt geen tijdstip maar een venster met twee grenzen: het postmortaal interval. Haar aanwijzingen werken als zandlopers. Een lichaam koelt af met eerst een plateau en daarna steeds trager, lijkvlekken worden na een halve dag vast, en spieren worden stijf omdat myosinekoppen zonder ATP het actine niet meer loslaten. Na een paar dagen zijn die klokken leeg. Dan blijft de vlieg over: bromvliegen leggen eitjes, en de larven groeien in een tempo dat van de temperatuur afhangt. Met graaddagen rekent een forensisch entomoloog een ondergrens uit.",
 "endHaak": "welke klok zou Kim gebruiken als het huis drie maanden leeg had gestaan?",
 "minis": {"Hoofdstuk 1": "Waarom zakt de temperatuur niet elk uur evenveel?",
           "Hoofdstuk 2": "Waarom wordt een stijve spier na een paar dagen weer slap?",
           "Hoofdstuk 3": "Waar komen de maden vandaan, en wat zegt hun leeftijd?",
           "Hoofdstuk 4": "Waarom tel je graaddagen in plaats van dagen?",
           "Recap": "Wat schrijft Kim in haar rapport?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Dr. Kim (forensisch arts), Bilal (stagiair forensisch onderzoek), Lieke (forensisch entomoloog) en Mevrouw Jansen (de buurvrouw). De overledene komt niet in beeld. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Hoe kan een vlieg vertellen wanneer iemand is overleden?", "correct": 2,
          "explain": "Bromvliegen leggen vaak al binnen een paar uur eitjes. De larven die eruit komen groeien in een tempo dat je kunt meten, dus hun leeftijd zegt iets over de tijd sinds het overlijden. Het aantal vliegen zegt weinig."},
  "q06": {"q": "Na het overlijden stopt de warmteproductie. Zakt de temperatuur dan elk uur evenveel?", "correct": 0,
          "explain": "Eerst blijft de kern een tijdje bijna even warm (het plateau), omdat de warmte eerst naar de huid moet. Daarna daalt hij, steeds trager naarmate het verschil met de kamer kleiner wordt. Een rechte lijn is alleen een vuistregel."},
  "q10": {"q": "Waarom wordt een spier na het overlijden stijf?", "correct": 1,
          "explain": "Een myosinekop heeft ATP nodig om het actine los te laten. Als de cel geen ATP meer maakt, blijven de koppen vastzitten: lijkstijfheid. ATP zet de koppen dus niet vast, en de spier spant niet aan."},
  "q13": {"q": "Na de eigen enzymen nemen bacteriën de afbraak over. Waar komen die vandaan?", "correct": 2,
          "explain": "In de darm leven bij leven al ontelbaar veel bacteriën. Na het overlijden verspreiden ze zich via de bloedvaten door het lichaam. Bacteriën ontstaan nooit vanzelf."},
  "q17": {"q": "De entomoloog rekent uit hoe oud de larven zijn. Wat zegt die leeftijd over het overlijden?", "correct": 0,
          "explain": "De vlieg kwam na het overlijden, soms pas later (binnen, 's nachts, achter een dicht raam). De leeftijd van de larven is dus een ondergrens: het overlijden was minstens zo lang geleden."},
  "q21": {"q": "Bij 22 graden krijgt een larve elke dag 22 − 8 = 14 graaddagen. Hoe lang hadden dezelfde larven nodig gehad voor 80 graaddagen?", "correct": 1,
          "explain": "80 gedeeld door 14 is ongeveer 5,7: bijna zes dagen. Het tempo hangt af van de temperatuur boven de drempel, niet van het aantal graden verschil met 15."}
 },
 "glossary": [
  {"t": "postmortaal interval (PMI)", "d": "De tijd sinds het overlijden. Een forensisch arts geeft het als een venster met een onder- en een bovengrens, niet als één tijdstip."},
  {"t": "spoor", "d": "Alles wat iemand op een plaats achterlaat en wat iets kan zeggen over wat er gebeurde, zoals bloed, speeksel, een vingerafdruk, een vezel of een insect."},
  {"t": "plateau (bij afkoeling)", "d": "De eerste periode na het overlijden waarin de kerntemperatuur bijna niet daalt, omdat de warmte eerst van binnen naar de huid moet. De lengte verschilt sterk."},
  {"t": "nomogram van Henssge", "d": "Rekenkaart waarmee een forensisch arts uit de lichaamstemperatuur, de kamertemperatuur, het gewicht en de kleding een tijdvenster van uren schat."},
  {"t": "lijkvlekken", "d": "Paarsrode vlekken op de laagste delen van het lichaam doordat het bloed zakt; na ongeveer een halfuur zichtbaar, na ongeveer een halve dag niet meer weg te drukken."},
  {"t": "lijkstijfheid", "d": "Stijve spieren na het overlijden: zonder ATP laten de myosinekoppen het actine niet meer los. Begint na ongeveer twee tot vier uur, is het sterkst na zes tot twaalf uur en verdwijnt na een dag of twee door afbraak."},
  {"t": "autolyse en verrotting", "d": "Autolyse is afbraak door de eigen enzymen van de cellen. Verrotting is afbraak door bacteriën, vooral de eigen darmbacteriën. Beide gaan sneller als het warmer is."},
  {"t": "larvestadium", "d": "Fase tussen twee vervellingen van een vliegenlarve (made). Een bromvlieg heeft drie larvestadia; daarna stopt de larve met eten, kruipt weg en verpopt."},
  {"t": "graaddagen", "d": "Per dag de temperatuur min een drempel (hier 8 graden), opgeteld. Een larve heeft een vast aantal graaddagen nodig om een stadium te bereiken, dus bij warmte gaat het sneller."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
