import json
film = {
 "slug": "fysiotherapie-3-trainen", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Trainen: hoe je lichaam zich aanpast", "sub": "belasting, herstel en meten",
 "puzzle": "Waarom word je fitter van trainen, en niet tijdens het trainen?",
 "meta": "bewegingswetenschappen · training", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Fysiotherapie en bewegingswetenschappen",
 "lead": "Noor begint met hardlopen en Bilal met krachttraining. Tien weken later zijn ze fitter en sterker, maar dat gebeurde in de rust na het trainen. Duurtraining geeft meer mitochondriën, meer haarvaten en een groter slagvolume; kracht groeit eerst via het zenuwstelsel en daarna via dikkere spiervezels. Training is specifiek en omkeerbaar, en bewegingswetenschappers meten het allemaal precies.",
 "endHaak": "hoe zou jij een trainingsschema van tien weken opbouwen, met dit model in je achterhoofd?",
 "minis": {"Hoofdstuk 1": "Wat is supercompensatie?", "Hoofdstuk 2": "Hoe pompt een getraind hart met minder slagen evenveel bloed?", "Hoofdstuk 3": "Waarom word je eerst sterker zonder dikkere spieren?", "Hoofdstuk 4": "Wat meet een bewegingswetenschapper?", "Recap": "Waar gebeurt de aanpassing?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Noor, Bilal en Fysiotherapeut Femke (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Wanneer wordt Noor eigenlijk fitter?", "correct": 2, "explain": "In de rust na het trainen: dan herstelt het lichaam en bouwt het net iets meer op dan er was."},
  "q06": {"q": "Noors rusthartslag daalt, maar haar lichaam krijgt evenveel zuurstof. Hoe kan dat?", "correct": 0, "explain": "Haar hart pompt per slag meer bloed (groter slagvolume); bloed per minuut = slagvolume × hartslag."},
  "q09": {"q": "Bilal is na twee weken sterker, maar zijn spieren zijn nog even dik. Hoe kan dat?", "correct": 1, "explain": "Zijn zenuwstelsel leert meer motorische eenheden tegelijk aan te zetten en beter te laten samenwerken."}
 },
 "glossary": [
  {"t": "supercompensatie", "d": "Model van trainen: na een training herstelt het lichaam tot net boven het oude niveau; train je op dat moment opnieuw, dan stapelt de winst."},
  {"t": "duurtraining", "d": "Lang achter elkaar matig intensief bewegen, zoals hardlopen of fietsen; traint vooral hart, bloedvaten en mitochondriën."},
  {"t": "mitochondrium", "d": "Celorganel waarin met zuurstof de meeste ATP wordt gemaakt; door duurtraining krijgen spiervezels er meer van."},
  {"t": "haarvaten", "d": "De kleinste bloedvaatjes; door training groeien er meer rond elke spiervezel, zodat zuurstof makkelijker de spier in komt."},
  {"t": "slagvolume", "d": "De hoeveelheid bloed die het hart per slag rondpompt; bloed per minuut = slagvolume × hartslag."},
  {"t": "motorische eenheid", "d": "Eén motorisch neuron met alle spiervezels die het aanstuurt; in het begin van krachttraining leer je er meer tegelijk aan te zetten."},
  {"t": "hypertrofie", "d": "Het dikker worden van spiervezels doordat er meer draden actine en myosine in komen."},
  {"t": "specificiteit", "d": "Je lichaam past zich aan aan precies de belasting die je geeft: hardlopen traint vooral je benen, niet je armen."},
  {"t": "omkeerbaarheid", "d": "Stop je met trainen, dan verdwijnt een deel van de winst weer, al na een paar weken."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
