import json
film = {
 "slug": "farmacie-1-van-pil-tot-plek", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Van pil tot plek en weer terug", "sub": "wat je lichaam met een medicijn doet",
 "puzzle": "Waarom slikt Opa Henk zijn bloeddrukpil één keer per dag en paracetamol tot vier keer?",
 "meta": "farmacie · verpleegkunde", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Farmacie en Verpleegkunde",
 "lead": "Noor vult de pillendoos van Opa Henk. Zijn bloeddrukpil gaat er één keer per dag in, paracetamol mag tot vier keer. Dat verschil zit niet in hoe sterk een pil is, maar in wat je lichaam ermee doet. Een medicijn moet eerst door de membranen van je darmcellen, dan langs de lever, die al een deel afbreekt. Daarna bepaalt de halfwaardetijd hoe lang het in je bloed blijft. Slechte nieren of grapefruitsap kunnen de bloedspiegel te hoog maken. Dat heet farmacokinetiek: apothekers rekenen ermee, verpleegkundigen moeten het weten als ze medicijnen geven.",
 "endHaak": "welk medicijn in jullie kastje moet je op een vaste tijd nemen, en waarom?",
 "minis": {"Hoofdstuk 1": "Waarom komt een vetoplosbare stof makkelijker door de darmwand?",
           "Hoofdstuk 2": "Waarom spuit je nitroglycerine onder je tong in plaats van het te slikken?",
           "Hoofdstuk 3": "Hoeveel is er na drie halfwaardetijden nog over van honderd eenheden?",
           "Hoofdstuk 4": "Waarom staat in de bijsluiter van simvastatine: geen grapefruitsap?",
           "Recap": "Waarom krijgt iemand met slecht werkende nieren soms een lagere dosis?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Noor, Opa Henk en Apotheker Ravi (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Opa Henk neemt zijn bloeddrukpil één keer per dag, en paracetamol tot vier keer per dag. Waar komt dat verschil vandaan?", "correct": 1,
          "explain": "Hoe vaak je een pil neemt, hangt vooral af van hoe snel je lichaam de stof opruimt. Paracetamol is na een paar uur grotendeels weg; de bloeddrukpil blijft dagen in je bloed."},
  "q06": {"q": "Nitroglycerine wordt na het slikken grotendeels door de lever afgebroken. Hoe neemt een patiënt het daarom?", "correct": 2,
          "explain": "Onder de tong. Daar komt de stof via kleine bloedvaten direct in het bloed, zonder eerst langs de lever te gaan; het werkt binnen een paar minuten."},
  "q09": {"q": "De halfwaardetijd van paracetamol is ongeveer twee uur. Je hebt honderd eenheden in je bloed. Na hoeveel uur is er nog een kwart over?", "correct": 0,
          "explain": "Na twee uur is er vijftig over, na nog eens twee uur vijfentwintig: een kwart na vier uur."}
 },
 "glossary": [
  {"t": "opname", "d": "Het binnenkomen van een stof in het bloed; bij een pil vooral in de dunne darm, door de membranen van de darmcellen heen."},
  {"t": "membraan", "d": "Dun, dubbel laagje vet rond elke cel; vetoplosbare stoffen gaan er makkelijk doorheen, stoffen die alleen in water oplossen slecht. Zie Diffusie en osmose."},
  {"t": "poortader", "d": "Ader die het bloed uit de darmen eerst naar de lever brengt, voordat het de rest van het lichaam bereikt. Zie De lever als fabriek."},
  {"t": "first-pass-effect", "d": "Een deel van een geslikt medicijn wordt al in de darmwand en de lever afgebroken voordat het de rest van het lichaam bereikt. Bij nitroglycerine is dat bijna alles."},
  {"t": "bloedspiegel", "d": "De hoeveelheid (concentratie) van een medicijn in je bloed; boven een bepaalde grens werkt het, te hoog kan schadelijk zijn."},
  {"t": "halfwaardetijd", "d": "De tijd waarin de helft van een stof uit het bloed verdwijnt; paracetamol ongeveer twee uur, de bloeddrukpil amlodipine ongeveer anderhalve dag."},
  {"t": "stabiele spiegel", "d": "Bij elke dag een pil stapelt de stof zich eerst op; na vier tot vijf halfwaardetijden komt er per dag evenveel bij als er verdwijnt (steady state)."},
  {"t": "interactie", "d": "Stoffen zitten elkaar in de weg, bijvoorbeeld omdat ze door hetzelfde enzym worden afgebroken; grapefruitsap remt zo de afbraak van simvastatine."},
  {"t": "farmacokinetiek", "d": "Wat je lichaam met een medicijn doet: opname, verdeling, afbraak en uitscheiding. Bepaalt hoe vaak, hoeveel en op welke manier je een medicijn neemt."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
