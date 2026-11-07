import json
film = {
 "slug": "labtechniek-2-van-buisje-tot-uitslag", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Van buisje tot uitslag", "sub": "werken in een diagnostisch lab",
 "puzzle": "Je coronatest ging naar een lab. Wat gebeurde daar in de uren tot je uitslag?",
 "meta": "laboratoriumtechniek · mbo en hbo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Laboratoriumtechniek",
 "lead": "Dr. Kim neemt bij Opa Henk een keel-neusswab af, en Yasmin, stagiair-analist, volgt het buisje door het ziekenhuislab. Veel labfouten ontstaan al vóór het meten, dus begint het werk bij de ontvangst. Met een pipet van tien microliter maakt ze een verdunningsreeks van standaarden. Een robot zet de real-time PCR klaar: de Ct-waarde zegt na hoeveel cycli het licht boven de drempel komt, en met een ijklijn reken je die om naar een hoeveelheid. Tot slot de controles en de controlekaart: wanneer keur je een run af?",
 "endHaak": "welke stap in deze keten zou jij het spannendst vinden om te doen, en welke het lastigst?",
 "minis": {"Hoofdstuk 1 — Het monster komt binnen": "Waarom controleert het lab elk buisje bij binnenkomst?",
           "Hoofdstuk 2 — Nauwkeurig pipetteren": "Wat doet een fout in de eerste verdunning met de rest?",
           "Hoofdstuk 3 — Real-time PCR en de ijklijn": "Betekent een hogere Ct-waarde meer of minder virus?",
           "Hoofdstuk 4 — Klopt de run?": "Wanneer keurt een analist een run af?",
           "Recap": "Welke opleiding leidt tot dit werk?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Yasmin (stagiair-analist), Dr. Kim en Opa Henk (castboek). Rekenvoorbeeld nagerekend met Python. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Waar gaat het in een lab het vaakst mis?", "correct": 2, "explain": "Vóór het meten: in onderzoeken naar labfouten ontstaat ongeveer de helft tot twee derde in de fase vóór de analyse (afnemen, labelen, vervoer)."},
  "q06": {"q": "Alleen in de eerste verdunningsstap pipetteert Yasmin 2 % te weinig. Wat betekent dat voor de laatste buisjes?", "correct": 0, "explain": "Ze zijn allemaal ook 2 % te laag: elk buisje krijgt zijn RNA uit het vorige, dus de fout gaat mee maar groeit niet. Alleen fouten in elke stap stapelen op."},
  "q09": {"q": "Opa Henk: Ct 25. Een ander monster: Ct 30. Welk monster bevatte meer virus?", "correct": 1, "explain": "Dat van Opa Henk: hoe meer virus er in het begin was, hoe eerder het licht boven de drempel komt. Vijf cycli eerder is ongeveer 2⁵ ≈ 32 keer zoveel."},
  "q12": {"q": "De positieve controle ligt voor de tweede keer achter elkaar boven twee standaardafwijkingen. Wat doet Yasmin?", "correct": 2, "explain": "De run afkeuren en de oorzaak zoeken: één punt buiten de band is een waarschuwing, twee achter elkaar aan dezelfde kant wijst op een fout die blijft."}
 },
 "glossary": [
  {"t": "pre-analytische fase", "d": "Alles vóór het meten: aanvragen, afnemen, labelen, vervoeren en ontvangen van een monster. Hier ontstaat ongeveer de helft tot twee derde van de labfouten."},
  {"t": "verdunningsreeks", "d": "Een reeks buisjes waarin je steeds een vaste fractie van het vorige buisje neemt (bijvoorbeeld 1 op 10), zodat je weet hoeveel keer je het oorspronkelijke monster hebt verdund."},
  {"t": "microliter (µl)", "d": "Een miljoenste liter; 10 µl is een druppeltje van nog geen 3 mm."},
  {"t": "standaard", "d": "Een monster met een bekende hoeveelheid van de stof die je meet, dat meegaat in dezelfde run."},
  {"t": "real-time PCR", "d": "PCR waarbij het apparaat na elke cyclus het licht meet, zodat je ziet wanneer het DNA zich ophoopt (ook qPCR). Bij RNA-virussen gaat er een stap aan vooraf: RNA omzetten in DNA."},
  {"t": "Ct-waarde", "d": "Het aantal cycli tot het licht boven de drempel komt. Lage Ct = veel uitgangsmateriaal; ongeveer 3,3 cycli verschil = factor 10. Alleen te vergelijken binnen dezelfde test."},
  {"t": "ijklijn", "d": "Een reeks standaarden met bekende concentratie, waarmee je een gemeten signaal (hier de Ct-waarde) omrekent naar een concentratie."},
  {"t": "positieve/negatieve controle", "d": "Een monster waarvan je de uitslag al weet, dat meegaat om te zien of de test werkt. Negatief (water): geen signaal; positief (bekende hoeveelheid): wel signaal. Een interne controle zit in elk monster, vaak een menselijk gen."},
  {"t": "controlekaart", "d": "Grafiek met de uitkomst van dezelfde controle per run, met lijnen op 2 en 3 standaardafwijkingen van het gemiddelde. Eén punt buiten 2 sd = waarschuwing; twee achter elkaar aan dezelfde kant of één buiten 3 sd = run afkeuren."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
