import json
film = {
 "slug": "psychologie-2-kijken-in-een-denkend-brein", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Kijken in een denkend brein", "sub": "hoe onderzoekers ontdekken wat een hersengebied doet",
 "puzzle": "Een nieuwsbericht toont een hersenscan met één oranje vlek: het verliefdheidsgebied. Wat laat die vlek eigenlijk zien?",
 "meta": "psychologie · neurowetenschappen", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Psychologie en Neurowetenschappen",
 "lead": "Onderzoekers hebben vier soorten manieren om te ontdekken wat een hersengebied doet: kijken wat ontbreekt na schade, elektriciteit meten (EEG, een elektrode bij één cel), bloed meten (fMRI) en zelf ingrijpen (TMS, optogenetica). Geen methode is goed in alles: een EEG meet precies wanneer, fMRI precies waar, en alleen ingrijpen laat zien wat een gebied veroorzaakt of nodig heeft. Een gekleurde vlek op een scan is een vergelijking tussen twee taken na een statistische keuze, geen foto van een gedachte.",
 "endHaak": "welk nieuwsbericht over 'het gebied voor …' zou jij nu anders lezen?",
 "minis": {"Hoofdstuk 1": "Wat leer je van een beschadigd brein?", "Hoofdstuk 2": "Wat meet een EEG, en wat een elektrode bij één cel?", "Hoofdstuk 3": "Wat laat een fMRI-scan echt zien?", "Hoofdstuk 4": "Hoe laat je zien wat de oorzaak is?", "Recap": "Welke methode kies je?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Yasmin, Dr. Kim en Opa Henk (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Een hersenscan bij een nieuwsbericht toont één oranje vlek: het verliefdheidsgebied. Wat laat die vlek eigenlijk zien?", "correct": 1, "explain": "Daar stroomde wat meer bloed dan bij een andere taak. De rest van de hersenen staat niet uit, en een gevoel zit niet op één plek opgeslagen. Het waarom zie je in hoofdstuk 3."},
  "q11": {"q": "Yasmin ziet gezichten en af en toe een huis, met een EEG-kap op. Waar is een EEG goed in?", "correct": 0, "explain": "In wanneer: tot op een duizendste seconde. Waar het signaal vandaan komt is vaag, want de spanning spreidt zich uit door schedel en hoofdhuid."},
  "q17": {"q": "Onderzoekers legden een dode zalm in een scanner en lieten hem foto's zien van mensen. Wat vonden ze?", "correct": 1, "explain": "Een paar blokjes lichtten op, puur door toeval: wie meer dan honderdduizend blokjes apart toetst, vindt altijd iets. Met een correctie verdween de vlek."},
  "q21": {"q": "TMS op het gebied van Broca maakt benoemen trager; TMS op een gebied achterin niet. Wat mag je concluderen?", "correct": 0, "explain": "Het gebied van Broca helpt bij het benoemen. Niet dat het niets anders doet, en niet dat het onmisbaar is. 'Actief tijdens benoemen' had je met fMRI ook gezien; ingrijpen laat meer zien."},
  "q25": {"q": "Je wilt weten of een gebied achter je voorhoofd nodig is om je te concentreren. Welke methode kies je?", "correct": 2, "explain": "TMS: om te weten of iets nodig is, moet je ingrijpen. Verstoor het gebied, meet de concentratietaak, en vergelijk met een controleplek."}
 },
 "glossary": [
  {"t": "laesie", "d": "Beschadiging van (hersen)weefsel, bijvoorbeeld door een ongeluk, beroerte of tumor."},
  {"t": "laesieonderzoek", "d": "Afleiden wat een hersengebied doet door te kijken welke functie wegvalt als het beschadigd is."},
  {"t": "gebied van Broca", "d": "Gebied links voorin de hersenschors dat betrokken is bij het maken van spraak."},
  {"t": "EEG", "d": "Meting van de spanning op de hoofdhuid; de optelsom van miljoenen neuronen die tegelijk en in hetzelfde ritme actief zijn. Precies in de tijd, vaag in de plek."},
  {"t": "elektrode bij één cel", "d": "Dunne elektrode vlak bij een neuron die elk pulsje (actiepotentiaal) meet; alleen bij dieren of tijdens een hersenoperatie."},
  {"t": "fMRI", "d": "Scan die verschillen in zuurstofrijk bloed meet; actieve gebieden krijgen extra bloed. Precies in de plek (millimeters), traag in de tijd (piek na ongeveer vijf seconden)."},
  {"t": "voxel", "d": "Klein blokje van een paar millimeter waarin een scanner de hersenen verdeelt; bevat een paar miljoen neuronen."},
  {"t": "controletaak", "d": "Vergelijkingstaak (bijvoorbeeld huizen bij een onderzoek naar gezichten) die je van de taak aftrekt."},
  {"t": "correctie voor meervoudig toetsen", "d": "Strengere grens als je heel veel toetsen tegelijk doet, zodat toevalsuitkomsten niet als echt effect gelden."},
  {"t": "TMS", "d": "Transcraniële magnetische stimulatie: een spoel op het hoofd wekt met een magneetveld een stroompje op in de schors en kan een gebied kort verstoren."},
  {"t": "optogenetica", "d": "Met een ingebouwd gen voor een lichtgevoelig kanaaltje een bepaalde soort neuronen met licht aan- of uitzetten; vooral bij muizen."},
  {"t": "correlatie en oorzaak", "d": "Meten wat tegelijk gebeurt (EEG, fMRI) laat een samenhang zien; om een oorzaak aan te tonen moet je ingrijpen."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
