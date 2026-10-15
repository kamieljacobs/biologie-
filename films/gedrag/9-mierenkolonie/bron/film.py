import json
film = {
 "slug": "9-mierenkolonie", "hoofdstuk": "gedrag", "hoofdstukNaam": "Gedrag",
 "title": "Een mierenkolonie zonder baas", "sub": "Taakverdeling, geurspoor en zelforganisatie",
 "puzzle": "Sam laat een kruimel koek vallen. Een kwartier later loopt er een rechte mierenstraat naartoe. Wie heeft al die mieren gestuurd?",
 "meta": "gedrag · sociale insecten", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Gedrag · film 9 van 12",
 "lead": "Een mierenkolonie heeft een koningin, maar geen baas. Werksters verdelen het werk, vaak naar leeftijd, en schakelen om als dat nodig is. Met feromonen leggen ze een geurspoor: een spoor naar goed voedsel wordt sterker (positieve terugkoppeling) en verdampt als het voedsel op is. Zo vinden mieren samen een korte route: zelforganisatie.",
 "endHaak": "waar zie jij bij mensen zelforganisatie, zonder dat iemand de leiding heeft?",
 "minis": {"Hoofdstuk 1": "Wie doet wat in een mierennest?", "Hoofdstuk 2": "Hoe ontstaat een mierenstraat?", "Hoofdstuk 3": "Hoe kan een kolonie slim zijn zonder baas?", "Recap": "Wie stuurde de mieren naar de kruimel?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personage: Sam (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Wie heeft al die mieren daarheen gestuurd?", "correct": 1, "explain": "Niemand: de mieren vonden de weg samen."},
  "q05": {"q": "Een onderzoeker haalt alle voedselzoekers weg. Wat gebeurt er?", "correct": 1, "explain": "Werksters die eerst ander werk deden, gaan voedsel zoeken: de taakverdeling is flexibel."},
  "q08": {"q": "Twee bruggen naar voedsel. Welke gebruiken de meeste mieren na een tijdje?", "correct": 1, "explain": "De korte: daar komt sneller geur bij."}
 },
 "glossary": [
  {"t": "sociale insecten", "d": "Insecten die in een kolonie leven met taakverdeling en één of enkele koninginnen die de eitjes leggen (mieren, bijen, wespen, termieten)."},
  {"t": "werkster", "d": "Vrouwtje dat zelf meestal geen eitjes legt en het werk in de kolonie doet."},
  {"t": "taakverdeling", "d": "Verschillende mieren doen verschillend werk, vaak afhankelijk van hun leeftijd; flexibel als er ergens werk te veel is."},
  {"t": "feromoon", "d": "Geurstof die een dier afgeeft en die het gedrag van soortgenoten beïnvloedt (bv. geurspoor, alarmstof)."},
  {"t": "positieve terugkoppeling", "d": "Een effect versterkt zichzelf: meer geur → meer mieren → meer geur."},
  {"t": "zelforganisatie", "d": "Geordend gedrag van een groep dat ontstaat uit eenvoudige regels per individu, zonder leider."},
  {"t": "oogstmieren", "d": "vwo · Woestijnmieren die zaadjes verzamelen; hoeveel mieren uitgaan hangt af van hoe vaak voedselzoekers met zaad terugkomen."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
