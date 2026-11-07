import json
film = {
 "slug": "tandheelkunde-3-bloedend-tandvlees", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Bloedend tandvlees", "sub": "als een ontsteking blijft",
 "puzzle": "Wat heeft ontstoken tandvlees met je hart en met diabetes te maken?",
 "meta": "mondzorg · parodontologie", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Tandheelkunde en mondzorg",
 "lead": "Het tandvlees van Opa Henk bloedt bij het poetsen. Dat komt niet van het poetsen, maar van een ontsteking door plak: gingivitis, en die is omkeerbaar. Blijft de ontsteking, dan breekt de eigen afweer het kaakbot af (parodontitis). Mondhygiënist Ilse meet de pockets, maakt ze schoon en ziet Henk vaak terug. Parodontitis en diabetes versterken elkaar. Met hart- en vaatziekten is er een samenhang, maar of het een het ander veroorzaakt, is nog niet bewezen.",
 "endHaak": "welke andere ziekten komen vaak samen voor, zonder dat de een de ander veroorzaakt?",
 "minis": {"Hoofdstuk 1": "Waarom bloedt ontstoken tandvlees?", "Hoofdstuk 2": "Wat is een pocket?", "Hoofdstuk 3": "Waarom bloeden rokers minder?", "Hoofdstuk 4": "Veroorzaakt tandvleesontsteking hartziekten?", "Recap": "Wat veranderde er bij Opa Henk?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Mondhygiënist Ilse, Opa Henk en Dr. Kim (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Het tandvlees van Opa Henk bloedt bij het poetsen. Wat is het beste advies?", "correct": 1, "explain": "Juist goed poetsen, ook tussen de tanden: het bloeden komt van een ontsteking door plak, en die verdwijnt als de plak weg is."},
  "q10": {"q": "Komt het verdwenen kaakbot terug als Ilse de pockets goed schoonmaakt?", "correct": 0, "explain": "Meestal niet. Wel stopt de afbraak als de ontsteking stopt, zodat Henk zijn tanden meestal kan houden."},
  "q16": {"q": "Mensen met parodontitis krijgen vaker een hartinfarct. Veroorzaakt ontstoken tandvlees hart- en vaatziekten?", "correct": 2, "explain": "Dat weten we nog niet zeker. Ook na correctie voor roken, diabetes en leeftijd blijft er een verband, maar een proef waarin behandelen hartinfarcten voorkomt, ontbreekt."}
 },
 "glossary": [
  {"t": "gingivitis", "d": "Ontsteking van het tandvlees door plak: rood, gezwollen, bloedt makkelijk; verdwijnt als de plak weg is."},
  {"t": "parodontitis", "d": "Ontsteking die dieper gaat: de eigen afweer breekt het kaakbot rond de tand af; dat bot komt meestal niet terug."},
  {"t": "pocket", "d": "Verdiepte ruimte tussen tandvlees en wortel; gezond is 1 tot 3 millimeter, vanaf 4 tot 5 millimeter is er zorg."},
  {"t": "pocketsonde", "d": "Dun meetstaafje met streepjes waarmee een mondhygiënist of tandarts de diepte langs de tand meet."},
  {"t": "tandsteen", "d": "Verharde, verkalkte plak; kan alleen door een mondhygiënist of tandarts worden verwijderd."},
  {"t": "ontsteking", "d": "Afweerreactie: bloedvaatjes worden wijder en lekken, witte bloedcellen komen erop af; zie De eerste verdediging."},
  {"t": "samenhang", "d": "Twee dingen komen vaak samen voor; dat bewijst nog niet dat het een het ander veroorzaakt."},
  {"t": "oorzaak", "d": "Iets wat een gevolg teweegbrengt; bewijs komt vooral uit proeven waarin je één ding verandert en de rest gelijk houdt."},
  {"t": "parodontoloog", "d": "Tandarts die zich na de studie een paar jaar heeft verdiept in tandvlees en kaakbot (erkend door de NVvP)."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
