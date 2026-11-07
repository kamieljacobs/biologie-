import json
film = {
 "slug": "3-baltsen-en-kiezen", "hoofdstuk": "gedrag", "hoofdstukNaam": "Gedrag",
 "title": "Baltsen en kiezen", "sub": "Waarom een pauw zo'n opvallende staart heeft",
 "puzzle": "Een pauwenstaart kost veel energie en valt op, ook bij een vos. Waarom heeft een pauw dan zo'n staart?",
 "meta": "gedrag · seksuele selectie en balts", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Gedrag · film 3 van 12",
 "lead": "Seksuele selectie: een kenmerk blijft bestaan als het helpt om te paren, ook als het de overleving wat kleiner maakt. Vrouwtjes investeren meestal meer in elk jong en kiezen daarom kritischer; mannetjes vechten of showen. Balts is vaak een actie-reactieketen: elke handeling is de prikkel voor de volgende, zoals bij de stekelbaars.",
 "endHaak": "welke kenmerken bij mensen zouden door seksuele selectie kunnen bestaan?",
 "minis": {"Hoofdstuk 1": "Waarom kiezen vrouwtjes, en waarop?", "Hoofdstuk 2": "Hoe verloopt een balts?", "Recap": "Waarom heeft een pauw zo'n staart?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Een pauwenstaart kost veel energie en valt op. Waarom heeft een pauw dan zo'n staart?", "correct": 1, "explain": "Het antwoord zie je in hoofdstuk 1."},
  "q06": {"q": "Welke widavogels kregen de meeste nesten in hun territorium?", "correct": 1, "explain": "Vrouwtjes kiezen op staartlengte; de controlegroep laat zien dat knippen en plakken zelf geen verschil maakt."},
  "q09": {"q": "Tinbergen tikte met een glazen staafje tegen de staartwortel van het vrouwtje. Wat deed zij?", "correct": 1, "explain": "De prikkel telt, niet wie hem geeft: een actie-reactieketen."}
 },
 "glossary": [
  {"t": "seksuele selectie", "d": "Selectie op kenmerken die de kans op paren vergroten, ook als ze de overleving wat kleiner maken."},
  {"t": "balts", "d": "Gedrag waarmee dieren een partner lokken; vaak een vast ritueel."},
  {"t": "actie-reactieketen", "d": "Een reeks handelingen waarbij elke handeling van de één de prikkel is voor de volgende handeling van de ander."},
  {"t": "investering", "d": "Wat een ouder in een jong stopt: grote eicel, broeden, dragen, zogen. Wie meer investeert, kiest meestal kritischer."},
  {"t": "handicapprincipe", "d": "vwo · Een duur signaal (zoals een grote staart) is eerlijk, omdat alleen een gezond, sterk dier het zich kan veroorloven."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
