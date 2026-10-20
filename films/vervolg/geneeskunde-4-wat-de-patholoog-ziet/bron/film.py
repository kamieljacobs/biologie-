import json
film = {
 "slug": "geneeskunde-4-wat-de-patholoog-ziet", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Wat de patholoog ziet", "sub": "van moedervlek tot diagnose",
 "puzzle": "Wie beslist of een moedervlek kanker is?",
 "meta": "geneeskunde · pathologie", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Geneeskunde",
 "lead": "Een moedervlek op de arm van Mevrouw Visser verandert: groter, een grillige rand, twee kleuren. De dermatoloog haalt hem weg, maar het antwoord komt uit het lab. Daar wordt het stukje huid gefixeerd, in paraffine gegoten, in plakjes dunner dan een cel gesneden en gekleurd. De patholoog ziet onder de microscoop of de cellen zich nog gedragen: grote, ongelijke kernen, veel delingen en groei de diepte in wijzen op een melanoom. Ze meet ook hoe diep het reikt, en die dikte bepaalt de behandeling.",
 "endHaak": "zou jij liever de patiënt zien, of het weefsel?",
 "minis": {"Hoofdstuk 1": "In welke laag van de huid ontstaat een melanoom?", "Hoofdstuk 2": "Waarom moet een coupe gekleurd worden?", "Hoofdstuk 3": "Waaraan herken je kwaadaardige cellen?", "Hoofdstuk 4": "Waarom meet de patholoog de dikte?", "Recap": "Wie gaf het antwoord over de moedervlek?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Mevrouw Visser en Dr. Kim (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "De dermatoloog heeft de moedervlek van Mevrouw Visser weggehaald. Wie beslist uiteindelijk of het kanker is?", "correct": 1, "explain": "De patholoog: aan de buitenkant kun je een vermoeden hebben, maar pas onder de microscoop zie je hoe de cellen eruitzien en waar ze groeien."},
  "q06": {"q": "Onder de microscoop zie je in een vers gesneden coupe bijna niets. Waarom?", "correct": 0, "explain": "Cellen zijn bijna doorzichtig. Pas na kleuren, kernen blauwpaars en de rest roze, zie je kernen en cellen goed. Een lichtmicroscoop is groot genoeg om cellen te zien."},
  "q09": {"q": "Welke kenmerken in het weefsel wijzen op kanker?", "correct": 2, "explain": "Grote, ongelijke kernen, veel delingen en groei omhoog en de diepte in. Pigment en groepjes onderin de opperhuid zie je ook bij een gewone moedervlek."}
 },
 "glossary": [
  {"t": "patholoog", "d": "Arts die ziekten herkent in weefsel en cellen, vooral met de microscoop; stelt bijna elke diagnose kanker."},
  {"t": "pigmentcel", "d": "Cel onderin de opperhuid die de bruine kleurstof melanine maakt, die beschermt tegen zonlicht (melanocyt)."},
  {"t": "moedervlek", "d": "Goedaardig groepje pigmentcellen in de huid."},
  {"t": "melanoom", "d": "Kwaadaardige huidkanker die ontstaat uit pigmentcellen die ongeremd delen."},
  {"t": "fixeren", "d": "Weefsel in formaline leggen zodat het niet bederft en de cellen hun vorm houden."},
  {"t": "coupe", "d": "Flinterdun plakje weefsel (een paar micrometer, dunner dan een cel), gesneden uit een blokje paraffine en op een glaasje gelegd."},
  {"t": "HE-kleuring", "d": "Standaardkleuring met twee kleurstoffen: hematoxyline kleurt de kernen blauwpaars, eosine kleurt de rest roze."},
  {"t": "vriescoupe", "d": "Snelle coupe van ingevroren weefsel, tijdens een operatie; binnen ongeveer een half uur een eerste antwoord."},
  {"t": "dikte van een melanoom", "d": "Hoe diep het melanoom reikt, in millimeters (Breslow-dikte); hoe dieper, hoe groter de kans op uitzaaiing en hoe ruimer de behandeling."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
