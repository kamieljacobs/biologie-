import json
film = {
 "slug": "microben", "hoofdstuk": "cellen", "hoofdstukNaam": "Cellen",
 "title": "Wat groeit er op je boterham?", "sub": "bacteriën, virussen en schimmels",
 "puzzle": "Een boterham ligt een week vergeten in je trommel. Wat groeit erop, en waar komt het vandaan?",
 "meta": "cellen · Biologie voor jou § 4.2", "alleen": "havo 4", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Cellen",
 "lead": "Noor vindt haar broodtrommel terug, een week vergeten. Op de boterham zit groen en wit pluis, en de trommel was dicht. Met een proef van Mevrouw Visser ontdek je wat schimmels, bacteriën en virussen zijn, hoe ze groeien, en waarom een antibioticum niet helpt tegen je verkoudheid.",
 "endHaak": "welke microben heb jij vandaag al gebruikt, zonder dat je het merkte?",
 "minis": {"Hoofdstuk 1": "Hoe komt schimmel in een dicht zakje?", "Hoofdstuk 2": "Hoe ziet een schimmel eruit als je inzoomt?", "Hoofdstuk 3": "Hoe wordt één bacterie een zichtbaar puntje?", "Hoofdstuk 4": "Waarom groeit een virus niet op een voedingsbodem?", "Hoofdstuk 5": "Zijn bacteriën en schimmels vriend of vijand?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Noor, Teun en Mevrouw Visser (castboek). Stijl: Stijlkaart biologiefilms (Part C).",
 "questions": {
  "q02": {"q": "Op Noors boterham zit groen en wit pluis, en de trommel was dicht. Hoe kwam het daar?", "correct": 1, "explain": "Het pluis is een schimmel. Schimmels verspreiden zich met sporen die overal in de lucht zweven; ze zaten al op het brood toen de trommel dichtging. Schimmel ontstaat niet vanzelf uit oud brood."},
  "q06": {"q": "Drie dichte zakjes: droog, nat, nat in de koelkast. Welk sneetje schimmelt het eerst?", "correct": 1, "explain": "Het natte sneetje op kamertemperatuur. Schimmel groeit het best als het warm en vochtig is; in de koelkast groeit hij langzamer. Ook in dichte zakjes groeit schimmel, want de sporen zaten er al op."},
  "q12": {"q": "Op de boterham zitten maar een paar plekken. Kan Noor die eraf snijden?", "correct": 2, "explain": "Nee. De schimmeldraden groeien onzichtbaar dieper het brood in, en sommige schimmels maken gifstoffen. Gooi beschimmeld brood weg, ook bij een klein plekje."},
  "q16": {"q": "In de tuin staat een paddenstoel. Wat is dat?", "correct": 0, "explain": "Het vruchtlichaam van een schimmel. Daarin ontstaan de sporen; het grootste deel van de schimmel zit als draden (mycelium) in de grond. Schimmels zijn geen planten."},
  "q21": {"q": "Wat heeft jouw cel wél, en een bacterie niet?", "correct": 0, "explain": "Een kern. Een bacterie is een prokaryoot: het DNA ligt los, meestal als één ring. DNA en ribosomen heeft een bacterie wel; haar ribosomen zijn kleiner."},
  "q24": {"q": "Een bacterie deelt zich elke twintig minuten. Je begint met één. Hoeveel zijn het er na één uur?", "correct": 2, "explain": "Acht: twee, vier, acht. Elke deling verdubbelt het aantal, omdat elke cel zich telkens weer splitst."},
  "q27": {"q": "Stel dat Noor op een schaaltje niest. Groeien haar verkoudheidsvirussen dan op de voedingsbodem?", "correct": 1, "explain": "Nee. Een virus kan zich alleen vermeerderen in een levende cel van een gastheer; voor een verkoudheidsvirus zijn dat cellen van een mens. Een virus is geen cel, en dus ook geen kleine bacterie."},
  "q31": {"q": "Noor wil een antibioticum tegen haar verkoudheid. Helpt dat?", "correct": 0, "explain": "Nee. Antibiotica grijpen aan op onderdelen die bij bacteriën anders zijn dan bij jou, zoals de celwand en de kleinere ribosomen. Een virus heeft die niet."},
  "q34": {"q": "In en op je lichaam leven ongeveer evenveel bacteriën als je zelf cellen hebt (schatting 2016). Wat zegt dat?", "correct": 1, "explain": "Lang niet alle bacteriën maken je ziek: toch ben je meestal gewoon gezond. Er bestaan ziekmakers, maar ook reducenten, partners en bacteriën die ons eten maken."}
 },
 "glossary": [
  {"t": "schimmel", "d": "Eukaryoot organisme met een eigen rijk; meestal opgebouwd uit draden (hyfen). Verteert zijn voedsel buiten zijn cellen en verspreidt zich met sporen."},
  {"t": "hyfe", "d": "Schimmeldraad van een paar micrometer dik (meestal 5–10 µm), met kernen en een celwand waarin chitine zit. Groeit aan de top en vertakt."},
  {"t": "mycelium", "d": "Alle hyfen van een schimmel samen."},
  {"t": "spore", "d": "Piepkleine cel waaruit een nieuwe schimmel kan groeien; sporen zweven overal in de lucht."},
  {"t": "vruchtlichaam", "d": "Het deel van een schimmel waarin de sporen ontstaan, zoals een paddenstoel."},
  {"t": "gist", "d": "Eencellige schimmel die zich voortplant door knopvorming."},
  {"t": "prokaryoot", "d": "Organisme zonder celkern, zoals een bacterie; het DNA ligt los in de cel, meestal als één ring."},
  {"t": "eukaryoot", "d": "Organisme met cellen die een kern hebben, zoals schimmels, planten, dieren en de mens."},
  {"t": "plasmide", "d": "Klein ringetje DNA in een bacterie, naast het grote ringvormige chromosoom."},
  {"t": "tweedeling", "d": "Voortplanting van een bacterie: ze kopieert haar DNA, groeit en splitst in twee cellen."},
  {"t": "kolonie", "d": "Zichtbaar hoopje bacteriën op een voedingsbodem, vaak gegroeid uit één cel."},
  {"t": "virus", "d": "Geen cel: een eiwitmantel met DNA of RNA, soms met een envelop. Kan zich alleen vermeerderen in een levende cel van een gastheer."},
  {"t": "reducent", "d": "Organisme dat dode resten afbreekt, zodat de stoffen weer vrijkomen."},
  {"t": "symbiose", "d": "Nauw samenleven van twee soorten: mutualisme (beide voordeel) of parasitisme (de parasiet voordeel, de gastheer nadeel)."},
  {"t": "parasiet", "d": "Organisme dat leeft ten koste van een ander: het heeft er voordeel van, de gastheer nadeel."},
  {"t": "antibioticum", "d": "Stof die bacteriën remt of doodt door aan te grijpen op onderdelen die bij bacteriën anders zijn dan bij jou, zoals de celwand. Werkt niet tegen virussen."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
