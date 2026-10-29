import json
G = json.load(open('../glossary.json', encoding='utf-8'))
G += [{"t": "normwaarde", "d": "De waarde waarop iets in je lichaam wordt gehouden, zoals een lichaamstemperatuur van ongeveer 37 °C."},
      {"t": "negatieve terugkoppeling", "d": "Regeling waarbij een afwijking van de normwaarde wordt tegengewerkt: te warm → afkoelen, te koud → opwarmen."}]
film = {
 "slug": "5-het-hoofdkantoor", "hoofdstuk": "regeling", "hoofdstukNaam": "Regeling",
 "title": "Het hoofdkantoor", "sub": "wat je hersenen doen als je een nummer hoort",
 "puzzle": "Twee tonen, en je weet: dit is jouw nummer. Je voet tikt, je zingt mee, je krijgt kippenvel. Waar in je hoofd zit de baas?",
 "meta": "zenuwstelsel · de hersenen", "version": "2.0 · 29 oktober 2026", "titleLook": "schema", "alleen": "vwo",
 "seriesline": "Biologie bij Kamiel · Het zenuwstelsel · film 5 · 5 vwo",
 "lead": "Wat je hersenen doen in de eerste seconden van een nummer dat je kent. Per hoofdstuk licht een afdeling op: de bouw (grote en kleine hersenen, hersenstam, grijze en witte stof), horen en herkennen (primaire en associatieve schors), kruislings sturen en de homunculus, de maat houden met de kleine hersenen, en wat vanzelf gaat: ademhaling, hartslag en de hypothalamus met de temperatuurregeling.",
 "endHaak": "er is geen baas: de afdelingen werken samen",
 "minis": {"Hoofdstuk 1": "Hoe zijn je hersenen gebouwd?", "Hoofdstuk 2": "Wat is het verschil tussen horen en herkennen?", "Hoofdstuk 3": "Welke kant stuurt welke hand?", "Hoofdstuk 4": "Wie houdt de maat?", "Hoofdstuk 5": "Wat gaat er vanzelf?", "Hoofdstuk 6": "Waar zit de baas?"},
 "footer": "Stem: Roos (ElevenLabs, eleven_multilingual_v2). Script en animatie: Kamiel Jacobs met Claude. Personage: castboek (geen naam in beeld of stem). Stijl: Part C. Versie 2.0 · 29 oktober 2026 (lichte remake, prompt v13; 1.2 · 28 oktober 2026). <a href=\"../../index.html#regeling\">Naar de reeks</a>.",
 "questions": {
  "v1": {"q": "Je luistert naar een nummer dat je kent. Hoeveel van je hersenen doet mee?", "correct": 2, "explain": "Gebieden verspreid door je hele hersenen. 'Maar tien procent' is een fabel: bijna geen plek kun je missen zonder iets kwijt te raken."},
  "v2": {"q": "Gezonde oren en primaire gehoorschors, maar de associatieve schors eromheen is aan beide kanten beschadigd. Wat merkt hij bij zijn lievelingsnummer?", "correct": 1, "explain": "De tonen komen binnen in de primaire gehoorschors, maar zonder associatieve schors blijven het losse geluiden. Horen is iets anders dan herkennen."},
  "v3": {"q": "Je tikt de maat met je rechterhand. Welke hersenhelft stuurt die hand?", "correct": 1, "explain": "De linkerhelft: de banen van de motorische schors kruisen in de hersenstam naar de andere kant."},
  "v4": {"q": "Schade aan de kleine hersenen, maar de arm kan nog bewegen. Wat gaat er mis?", "correct": 1, "explain": "De kleine hersenen sturen bewegingen bij. Zonder die correctie beweeg je nog wel, maar schokkerig en net te laat."},
  "v5": {"q": "Je slaapt en denkt nergens aan. Wat houdt je ademhaling gaande?", "correct": 1, "explain": "Het verlengde merg in je hersenstam stuurt dag en nacht signalen naar je middenrif. Je longen kunnen dat niet zelf."}
 },
 "glossary": G,
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
