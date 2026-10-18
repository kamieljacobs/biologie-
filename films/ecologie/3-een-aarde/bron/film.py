import json
film = {
 "slug": "3-een-aarde", "hoofdstuk": "ecologie", "hoofdstukNaam": "Ecologie",
 "title": "Eén aarde", "sub": "Voetafdruk, klimaat, vermesting, gif, en wat er echt helpt",
 "puzzle": "Hoeveel aardes heb jij nodig?",
 "meta": "ecologie · mens en milieu", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Ecologie · film 3",
 "lead": "Als iedereen leefde als een Nederlander, waren er bijna drie aardes nodig. Extra CO₂ en methaan versterken het broeikaseffect: soorten verschuiven en raken uit de pas. Te veel stikstof en fosfaat geeft algenbloei, zuurstoftekort en minder soorten; persistente gifstoffen hopen zich op in de voedselketen, en met de ADI reken je uit hoeveel veilig is. Minder dierlijk voedsel, fossiele energie en verspilling schelen het meest. Nieuwe techniek, van kleine kerncentrales en kernfusie tot groene woestijnen, kan helpen, maar vaak pas later.",
 "endHaak": "welke van jouw keuzes maakt het meeste uit, en wat moet er groter veranderen dan jij alleen?",
 "minis": {"Hoofdstuk 1": "Hoeveel aardes gebruiken we, en waarom wordt het warmer?", "Hoofdstuk 2": "Wat doen mest en gif met de natuur?", "Hoofdstuk 3": "Welke keuzes schelen echt?", "Hoofdstuk 4": "Kan nieuwe techniek het oplossen?", "Recap": "Wat neem je mee?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Daan en Noor (castboek). Stijl: Stijlkaart biologiefilms (Part C). Getallen afgerond; bronnen in het docentdeel. Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Als iedereen leefde als een gemiddelde Nederlander: hoeveel aardes zijn er dan nodig?", "correct": 2, "explain": "Bijna drie aardes. De wereld als geheel gebruikt er nu bijna twee."},
  "q13": {"q": "ADI 0,02 mg per kg; Daan weegt 50 kg; een appel bevat 0,1 mg. Hoeveel appels per dag?", "correct": 1, "explain": "0,02 × 50 = 1 mg per dag; 1 ÷ 0,1 = 10 appels."},
  "q16": {"q": "Welke keuze scheelt per jaar de meeste broeikasgassen?", "correct": 0, "explain": "De helft minder vlees en zuivel: honderden kilo's per jaar. Tasjes en laders: hooguit een paar kilo."}
 },
 "glossary": [
  {"t": "ecologische voetafdruk", "d": "De oppervlakte land en zee die nodig is voor alles wat iemand gebruikt, inclusief bos om de CO₂ op te nemen."},
  {"t": "broeikaseffect", "d": "Broeikasgassen (CO₂, methaan, waterdamp) houden een deel van de warmtestraling van de aarde vast. Extra broeikasgas versterkt het effect."},
  {"t": "klimaatverandering", "d": "Verandering van het klimaat door het versterkte broeikaseffect, met gevolgen zoals verschuivende leefgebieden en verstoorde timing."},
  {"t": "eutrofiëring (vermesting)", "d": "Te veel mineralen (nitraat, fosfaat) in water of bodem: algenbloei, afbraak van dode algen, zuurstoftekort en minder soorten."},
  {"t": "stikstofdepositie", "d": "Stikstof (ammoniak, stikstofoxiden) die uit de lucht neerslaat op de natuur."},
  {"t": "persistent", "d": "Een stof die in het milieu en in organismen nauwelijks wordt afgebroken."},
  {"t": "accumulatie", "d": "Ophoping van een stof in een organisme, en in de voedselketen per trofisch niveau."},
  {"t": "ADI", "d": "Aanvaardbare dagelijkse inname: hoeveel je je hele leven elke dag mag binnenkrijgen zonder merkbaar risico, per kg lichaamsgewicht."},
  {"t": "duurzaam", "d": "Voorzien in wat we nu nodig hebben zonder dat volgende generaties er last van krijgen."},
  {"t": "kernsplijting · kernfusie", "d": "Zware kernen (uranium) splijten in een kerncentrale · lichte kernen (waterstof) smelten samen, zoals in de zon."},
  {"t": "methaanvormende micro-organismen", "d": "Micro-organismen in de pens die waterstof en CO₂ omzetten in methaan.", "vwo": True}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
