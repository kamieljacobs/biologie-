import json
gl = json.load(open('glossary.json', encoding='utf-8'))
film = {
 "slug": "2-het-kabelnetwerk", "bestand": "2-het-kabelnetwerk-nieuw", "hoofdstuk": "regeling", "hoofdstukNaam": "Regeling",
 "title": "Het kabelnetwerk", "sub": "hoe een zenuwcel een bericht verstuurt",
 "puzzle": "Je stoot je teen. Eerst voel je de stoot, pas bijna een seconde later de pijn. Twee berichten van één klap: hoe kan het dat ze niet tegelijk aankomen?",
 "meta": "zenuwstelsel 2/9 · het kabelnetwerk", "version": "2.0 · 29 oktober 2026", "titleLook": "schema", "alleen": "vwo",
 "seriesline": "Biologie bij Kamiel · Zenuwstelsel · film 2",
 "lead": "Je stoot 's nachts je teen tegen de tafelpoot: eerst de stoot, dan de pijn. De film volgt één uitloper tot het neuron, laat zien hoe het rustpotentiaal ontstaat, hoe een actiepotentiaal over het axon rolt, waarom myeline een kabel snel maakt en hoe een receptor een prikkel vertaalt naar impulsen.",
 "endHaak": "twee kabels, twee snelheden: daarom komt de pijn later",
 "minis": {"Hoofdstuk 1": "Hoe ziet een zenuwcel eruit?", "Hoofdstuk 2": "Waarom is een neuron in rust geladen?", "Hoofdstuk 3": "Wat gebeurt er als hij vuurt?", "Hoofdstuk 4": "Waarom is de ene kabel sneller?", "Hoofdstuk 5": "Hoe begint een impuls?", "Samenvatting": "Wat moet je onthouden?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_multilingual_v2). Script, animatie en speler: Kamiel met Claude. Personage: Noor (castboek). Stijl: Part C (prompt v13). Versie 2.0 · 29 oktober 2026 (lichte remake in de donkere stijl; stem van versie 1.0, vijf vragen opnieuw ingesproken); 1.1 · 28 oktober 2026; 1.0 · 4 oktober 2026.",
 "questions": {
  "q04": {"q": "Waar begint een impuls in een neuron, en welke kant gaat hij op?", "correct": 0, "explain": "Een impuls begint bij de dendrieten en loopt via het cellichaam en het axon naar de eindknopjes. Nooit andersom."},
  "q08": {"q": "Een gif legt de natrium-kaliumpomp stil. Wat gebeurt er op den duur met het rustpotentiaal?", "correct": 0, "explain": "Zonder pomp ruimt niemand op: het ladingsverschil tussen binnen en buiten loopt langzaam weg."},
  "q12": {"q": "Je drukt harder op je huid. Wat verandert er aan de impulsen?", "correct": 1, "explain": "Alles-of-niets: een actiepotentiaal is altijd even groot. De sterkte zit in de frequentie."},
  "q15": {"q": "Twee even lange axonen: dik met myeline, dun zonder myeline. Welke impuls komt het eerst aan?", "correct": 0, "explain": "Myeline geeft sprongsgewijze geleiding, en dik is sneller dan dun."},
  "q18": {"q": "Een drukreceptor in je huid. Waar reageert hij het makkelijkst op?", "correct": 0, "explain": "Elke receptor heeft een adequate prikkel: druk voor de huid, licht voor het oog. Een heel sterke andere prikkel kan hem soms ook prikkelen."}
 },
 "glossary": [{"t": g["t"], "d": g["d"][0].upper() + g["d"][1:]} for g in gl],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
