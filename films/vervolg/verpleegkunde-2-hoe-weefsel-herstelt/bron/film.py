import json
film = {
 "slug": "verpleegkunde-2-hoe-weefsel-herstelt", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Hoe weefsel herstelt", "sub": "van schaafwond tot gescheurde pees",
 "puzzle": "Waarom is Lottes knie na een week bijna dicht, en kan Sam na drie maanden nog niet rennen?",
 "meta": "verpleegkunde · fysiotherapie", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Verpleegkunde en Fysiotherapie",
 "lead": "Op dezelfde zaterdag schaaft Lotte haar knie open en scheurt Sam zijn achillespees. Elke wond herstelt in vier fasen: stolling, ontsteking, opbouw en verbouwen. Maar het tempo verschilt enorm: snel herstel vraagt veel bloed én cellen die kunnen delen. De huid heeft allebei, een pees weinig, kraakbeen heeft geen bloedvaten en hartspiercellen delen bijna niet. Verpleegkundige Jesse voorkomt dat Opa Henk doorligt, en een fysiotherapeut bouwt de belasting van Sams pees week voor week op, zodat de nieuwe eiwitdraden in de lengte gaan liggen.",
 "endHaak": "welke blessure had jij ooit, en hoe lang duurde het herstel?",
 "minis": {"Hoofdstuk 1": "Welke vier fasen doorloopt elke wond?", "Hoofdstuk 2": "Waarom herstelt huid snel en kraakbeen nauwelijks?", "Hoofdstuk 3": "Waarom draait Jesse Opa Henk om de paar uur?", "Hoofdstuk 4": "Waarom moet een herstellende pees juist belast worden?", "Recap": "Wat doen verpleegkundigen en fysiotherapeuten bij herstel?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Lotte, Sam, Opa Henk, Verpleegkundige Jesse en Fysiotherapeut Femke (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Lottes schaafwond is na een week bijna dicht; Sam kan na drie maanden nog niet rennen. Waar komt dat verschil vooral door?", "correct": 0, "explain": "Een pees krijgt veel minder bloed dan de huid en heeft weinig cellen. Snel herstel vraagt veel bloed én cellen die kunnen delen."},
  "q06": {"q": "Kraakbeen in je knie heeft helemaal geen bloedvaten. Wat verwacht je als het beschadigd raakt?", "correct": 1, "explain": "Beschadigd kraakbeen groeit bijna niet terug: er komt geen bloed met zuurstof, bouwstoffen en cellen naar de plek. Daarom houden mensen na een knieblessure soms jarenlang klachten."},
  "q09": {"q": "Wat doet Verpleegkundige Jesse om te voorkomen dat Opa Henk doorligt?", "correct": 2, "explain": "Hem vaak van houding laten wisselen, zodat de druk niet steeds op dezelfde plek (hiel, stuitje) staat en de haarvaatjes daar weer open kunnen. Daarbij een drukverdelende matras, hielen vrijleggen en elke dag de huid bekijken."}
 },
 "glossary": [
  {"t": "wondgenezing", "d": "Herstel van beschadigd weefsel in vier elkaar overlappende fasen: stolling, ontsteking, opbouw en verbouwen."},
  {"t": "stolling", "d": "Binnen minuten maken bloedplaatjes en fibrinedraden een prop in de wond, die opdroogt tot een korstje; zie Wat er in je bloed zit."},
  {"t": "ontsteking", "d": "Witte bloedcellen ruimen bacteriën en dode cellen op; de wond wordt rood, warm en wat dik. Hoort bij normaal herstel en is niet altijd een infectie."},
  {"t": "opbouwfase", "d": "Cellen maken nieuwe bloedvaatjes en eiwitdraden van collageen, en de opperhuid schuift over de wond; duurt weken."},
  {"t": "verbouwen", "d": "Maandenlang worden de collageendraden opnieuw gelegd en in de richting van de belasting gezet; een litteken wordt hooguit ± 80% zo sterk als het oorspronkelijke weefsel."},
  {"t": "collageen", "d": "Eiwit dat lange, sterke draden vormt; de bouwstof van pezen, banden, de lederhuid en littekens."},
  {"t": "litteken", "d": "Herstelweefsel van collageen in plaats van het oorspronkelijke weefsel; minder sterk en, in de hartspier, niet samentrekkend."},
  {"t": "doorliggen (decubitus)", "d": "Weefsel dat afsterft doordat langdurige druk tussen bot en matras de haarvaatjes dichtdrukt; vooral bij hiel en stuitje. Voorkomen door wisselligging, een drukverdelende matras en de huid te controleren."},
  {"t": "achillespees", "d": "Pees tussen de kuitspier en het hielbeen; heeft weinig bloedvaten en cellen en herstelt daardoor langzaam."},
  {"t": "fysiotherapeut", "d": "Zorgverlener die beweging en belasting na een blessure of operatie stap voor stap opbouwt en de voortgang test; hbo-opleiding van vier jaar."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
