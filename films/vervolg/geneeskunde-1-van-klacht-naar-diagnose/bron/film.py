import json
film = {
 "slug": "geneeskunde-1-van-klacht-naar-diagnose", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Van klacht naar diagnose", "sub": "hoe een arts redeneert",
 "puzzle": "Iemand is kortademig. Ligt het aan het hart, de longen of het bloed?",
 "meta": "geneeskunde · diagnostiek", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Geneeskunde",
 "lead": "Kortademigheid kan uit het hart, de longen of het bloed komen: zuurstof gaat door een keten, en elke schakel kan haperen. Een arts redeneert van klacht naar oorzaak. Eerst vragen (anamnese) en onderzoeken, dan een lijst met mogelijke oorzaken (differentiaaldiagnose) die ze met gericht onderzoek toetst. Bij Opa Henk blijkt het hartfalen: het hart pompt zwak, vocht hoopt zich op in de longen en de enkels. Daarna kiezen arts en patiënt samen een behandeling.",
 "endHaak": "welke vraag zou jij als arts als eerste stellen bij hoofdpijn?",
 "minis": {"Hoofdstuk 1": "Waarom kan kortademigheid uit drie systemen komen?", "Hoofdstuk 2": "Wat vraagt en meet de arts?", "Hoofdstuk 3": "Hoe toetst een arts haar hypotheses?", "Hoofdstuk 4": "Wie kiest de behandeling?", "Recap": "Wat had Opa Henk?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Opa Henk en Dr. Kim (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Welke vraag helpt Dr. Kim het meest om te kiezen tussen hart, longen en bloed?", "correct": 1, "explain": "Erger bij plat liggen en dikke enkels wijzen op vocht dat zich ophoopt: een hart dat slecht pompt."},
  "q06": {"q": "Benauwd wakker, geknisper onderin de longen, een putje in de enkel. Waar wijst dat op?", "correct": 2, "explain": "Op een hart dat het bloed niet goed rondpompt: vocht in de longen en in de enkels."},
  "q09": {"q": "Hoe komen Dr. Kim en Henk tot een keuze die bij Henk past?", "correct": 0, "explain": "Samen beslissen: de arts brengt de kennis over wat werkt, de patiënt wat voor hem telt."}
 },
 "glossary": [
  {"t": "anamnese", "d": "Het gesprek waarin de arts vraagt naar de klacht: sinds wanneer, wanneer erger, wat nog meer."},
  {"t": "lichamelijk onderzoek", "d": "Kijken, luisteren (stethoscoop), voelen en meten, zoals bloeddruk en zuurstof in het bloed."},
  {"t": "differentiaaldiagnose", "d": "Lijst met mogelijke oorzaken van een klacht, van waarschijnlijk naar minder waarschijnlijk, die de arts met onderzoek toetst."},
  {"t": "hartfalen", "d": "Het hart pompt te zwak; bloed hoopt zich op in de longvaten en de nieren houden water vast, met vocht in longen en enkels."},
  {"t": "oedeem", "d": "Vocht in het weefsel; bij indrukken blijft een putje staan, bijvoorbeeld in de enkels."},
  {"t": "echo van het hart", "d": "Onderzoek met geluidsgolven dat laat zien hoe goed de hartkamers knijpen."},
  {"t": "samen beslissen", "d": "Arts en patiënt kiezen samen een behandeling: de arts brengt kennis over wat werkt, de patiënt wat voor hem telt."},
  {"t": "plastabletten", "d": "Medicijnen die de nieren meer water laten uitscheiden, zodat vocht wordt afgevoerd."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
