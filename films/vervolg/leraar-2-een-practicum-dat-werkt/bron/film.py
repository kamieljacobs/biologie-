import json
film = {
 "slug": "leraar-2-een-practicum-dat-werkt", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Een practicum dat werkt", "sub": "van kookboek naar echt onderzoek",
 "puzzle": "Waarom leren leerlingen vaak weinig van een practicum met een stappenplan?",
 "meta": "leraar biologie · practicum", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Leraar biologie",
 "lead": "Bij een kookboekpracticum volgen leerlingen netjes de stappen, maar denken ze weinig na over de ideeën erachter. Een leraar kan een practicum op vier niveaus geven: bevestigen, gestructureerd, begeleid en open onderzoek. Een goede onderzoeksvraag past bij de tijd, het materiaal en wat leerlingen al weten. Begeleiden doe je met vragen terug in plaats van antwoorden, en bij het beoordelen telt ook het proces.",
 "endHaak": "welk practicum herinner jij je nog, en waarom juist dat?",
 "minis": {"Hoofdstuk 1": "Wat is het verschil tussen kookboek en onderzoek?", "Hoofdstuk 2": "Welke vraag past in één les?", "Hoofdstuk 3": "Wat zeg je als een leerling vraagt of het klopt?", "Hoofdstuk 4": "Wat beoordeel je bij een practicum?", "Recap": "Wat hadden Lotte en Daan nodig?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Mevrouw Visser, Lotte, Daan, Noor en Yasmin (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Lotte en Daan volgden het werkblad precies, maar wisten een week later niet meer wat de proef liet zien. Hoe kan dat?", "correct": 0, "explain": "Ze volgden de stappen zonder na te denken over de vraag: handen bezig, hoofd niet."},
  "q06": {"q": "Welke vraag past het best bij een les van vijftig minuten?", "correct": 1, "explain": "'Maakt gist meer gas bij twintig of bij vijfendertig graden?': je verandert één ding en houdt de rest gelijk."},
  "q09": {"q": "Yasmin vraagt: klopt onze uitkomst? Wat zegt een goede leraar?", "correct": 2, "explain": "Een vraag terug: wat had je verwacht, en hoe kun je nagaan of het klopt? Dan blijven de leerlingen zelf denken."},
  "q12": {"q": "Welke groep laat het meest zien van onderzoek doen?", "correct": 1, "explain": "Groep B: hun proef ging mis, maar ze leggen uit waarom en hoe het beter kan. Dat laat zien dat ze snappen hoe onderzoek werkt."}
 },
 "glossary": [
  {"t": "kookboekpracticum", "d": "Practicum waarin leerlingen een stappenplan volgen met een bekende uitkomst; handen bezig, hoofd vaak niet."},
  {"t": "niveaus van onderzoekend leren", "d": "Bevestigen (uitkomst bekend), gestructureerd (vraag en werkwijze gegeven), begeleid (alleen de vraag gegeven) en open (ook de vraag zelf bedenken)."},
  {"t": "onderzoeksvraag", "d": "Vraag die je met een proef kunt beantwoorden; past bij de tijd, het materiaal en wat je al weet."},
  {"t": "variabele", "d": "Iets wat kan veranderen in een proef; je verandert er één en houdt de rest gelijk (zie Onderzoek doen)."},
  {"t": "gisting", "d": "Gist zet suiker zonder zuurstof om, waarbij koolstofdioxide ontstaat; daardoor zwelt de ballon op."},
  {"t": "beoordelen op proces", "d": "Niet alleen het resultaat telt, maar ook vraag, opzet, uitvoering, conclusie en discussie."},
  {"t": "toa", "d": "Technisch onderwijsassistent: zet practica klaar en helpt leraren en leerlingen in het practicumlokaal."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
