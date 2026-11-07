import json
film = {
 "slug": "verloskunde-5-de-kraamweek", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "De kraamweek", "sub": "borstvoeding, eerste testen en hoe het met de moeder gaat",
 "puzzle": "Waarom gaat er melk lopen als de baby huilt?",
 "meta": "verloskunde · kraamweek", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Verloskunde",
 "lead": "Lina is vijf dagen oud. Hoe regelen prolactine en oxytocine de borstvoeding, waarom krimpt de baarmoeder, hoe werkt de gehoortest, en waarom vraagt Verloskundige Mirjam niet alleen naar de baby maar ook: hoe gaat het met jou?",
 "endHaak": "welk deel van het werk van Mirjam zou jij het liefst doen?",
 "minis": {"Hoofdstuk 1": "Waarom komt de melk pas na de geboorte op gang?", "Hoofdstuk 2": "Wat gebeurt er met de baarmoeder na de bevalling?", "Hoofdstuk 3": "Hoe werkt de gehoortest bij een baby?", "Hoofdstuk 4": "Wat is het verschil tussen kraamtranen en een postnatale depressie?", "Recap": "Waarom liep de melk bij het huilen?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Verloskundige Mirjam, Esra en baby Lina (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Lina huilt van de honger en bij Esra loopt al melk. Hoe kan dat?", "correct": 1, "explain": "Door het huilen maken haar hersenen oxytocine; dat laat de spiercellen rond de melkklierblaasjes samentrekken. De toeschietreflex heeft geleerd te reageren op het huilen."},
  "q06": {"q": "Waarom komt de melk pas na de geboorte goed op gang?", "correct": 0, "explain": "Progesteron uit de placenta remt de melkproductie. Na de geboorte valt die rem weg."},
  "q13": {"q": "Lina weegt op dag drie 3200 gram, bij de geboorte 3400. Moet Mirjam zich zorgen maken?", "correct": 2, "explain": "Nee: dat is ongeveer zes procent. In de eerste dagen is tot ongeveer tien procent afvallen normaal."}
 },
 "glossary": [
  {"t": "prolactine", "d": "Hormoon uit de hypofyse dat de melkproductie regelt; hoe vaker de baby drinkt, hoe meer prolactine en melk."},
  {"t": "oxytocine", "d": "Hormoon uit de hypofyse dat de spiercellen rond de melkklierblaasjes en de baarmoederspier laat samentrekken."},
  {"t": "toeschietreflex", "d": "Het uitknijpen van melk onder invloed van oxytocine; kan aangeleerd worden (huilen van de baby) en geremd door stress."},
  {"t": "colostrum", "d": "De eerste, dikke gele melk met veel antistoffen die de darm van de baby bedekken en beschermen."},
  {"t": "naweeën", "d": "Krampen van de baarmoeder na de bevalling, vooral bij het voeden, door oxytocine."},
  {"t": "kraamverzorgende", "d": "Helpt de eerste dagen thuis: controleert moeder en baby, en helpt met voeden; de verloskundige houdt de eindverantwoordelijkheid."},
  {"t": "gehoortest", "d": "Test met een dopje in het oor dat tikjes geeft; een gezond slakkenhuis maakt een zwakke echo terug (oto-akoestische emissie)."},
  {"t": "kraamtranen", "d": "Huilerig en emotioneel in de eerste dagen na de bevalling; komt vaak voor en gaat binnen twee weken vanzelf over."},
  {"t": "postnatale depressie", "d": "Somberheid en verlies van plezier die weken aanhoudt na een bevalling; ongeveer één op de tien moeders; hulp is nodig."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
