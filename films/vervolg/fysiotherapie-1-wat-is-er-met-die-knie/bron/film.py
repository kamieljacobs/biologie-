import json
film = {
 "slug": "fysiotherapie-1-wat-is-er-met-die-knie", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Wat is er met die knie?", "sub": "hoe een fysiotherapeut onderzoekt",
 "puzzle": "Hoe weet een fysiotherapeut wat er kapot is, zonder in de knie te kijken?",
 "meta": "fysiotherapie · onderzoek", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Fysiotherapie",
 "lead": "Lotte draait bij het voetbal weg terwijl haar voet blijft staan. Een plop, en binnen een uur is haar knie dik. Fysiotherapeut Femke onderzoekt haar zonder scan: eerst het verhaal en de alarmsignalen, dan meten en testen, en steeds vergelijken met de gezonde knie. Een röntgenfoto laat alleen botten zien, en een gescheurde kruisband vraagt niet altijd een operatie.",
 "endHaak": "welke blessure ken jij uit je eigen sport, en hoe zou een fysiotherapeut die onderzoeken?",
 "minis": {"Hoofdstuk 1": "Waarom begint Femke met praten?", "Hoofdstuk 2": "Wat doet de voorste kruisband?", "Hoofdstuk 3": "Waarom test ze ook de gezonde knie?", "Hoofdstuk 4": "Wanneer is een foto zinvol?", "Recap": "Welke vier stappen zette Femke?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Fysiotherapeut Femke, Lotte en Dr. Kim als huisarts (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Lotte komt zonder verwijzing. Wat doet Femke als eerste?", "correct": 0, "explain": "Ze laat Lotte vertellen wat er gebeurde (anamnese) en vraagt naar alarmsignalen: hoort deze klacht bij de fysiotherapeut of bij een arts?"},
  "q05": {"q": "Wat zit er waarschijnlijk in een knie die binnen een uur opzwelt?", "correct": 2, "explain": "Bloed: er is iets gescheurd met bloedvaatjes erin. Een ontsteking komt pas na uren tot een dag op gang."},
  "q09": {"q": "Waarom test Femke ook Lottes gezonde knie?", "correct": 2, "explain": "Sommige mensen hebben van nature soepele banden; pas het verschil met de gezonde kant zegt iets."},
  "q12": {"q": "Moet Lotte met een gescheurde voorste kruisband geopereerd worden?", "correct": 1, "explain": "Niet per se. Met sterke spieren rond de knie kan het ook zonder; wie instabiel blijft of veel draaiende sport wil doen, kiest vaak alsnog voor een operatie."}
 },
 "glossary": [
  {"t": "anamnese", "d": "Het gesprek waarin een zorgverlener vraagt wat er gebeurde en welke klachten er zijn; vaak het belangrijkste deel van het onderzoek."},
  {"t": "alarmsignalen", "d": "Klachten die wijzen op iets ernstigs (zoals een infectie of breuk), waarvoor iemand naar een arts moet."},
  {"t": "directe toegankelijkheid", "d": "Je mag zonder verwijzing van de huisarts naar een fysiotherapeut; die screent dan eerst of de klacht bij hem of haar hoort."},
  {"t": "kruisbanden", "d": "Twee banden middenin de knie die schuin over elkaar lopen; de voorste voorkomt dat het scheenbeen naar voren schuift onder het dijbeen."},
  {"t": "meniscus", "d": "Halve maan van kraakbeen tussen dijbeen en scheenbeen; vangt schokken op. Alleen de buitenrand heeft bloedvaten, dus een scheur binnenin geneest slecht."},
  {"t": "zijbanden", "d": "Banden aan de binnen- en buitenkant van de knie die het gewricht opzij stevig houden."},
  {"t": "hoekmeter", "d": "Meetlat met twee armen waarmee je de bewegingsuitslag van een gewricht in graden meet."},
  {"t": "kruisbandtest", "d": "Test waarbij de fysiotherapeut het scheenbeen naar voren trekt bij een licht gebogen knie; een zachte stop wijst op een scheur (Lachmantest)."},
  {"t": "röntgenfoto", "d": "Foto met röntgenstraling waarop botten goed zichtbaar zijn, maar banden en kraakbeen niet."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
