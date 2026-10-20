import json
film = {
 "slug": "psychologie-4-meten-wat-je-niet-kunt-zien", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Meten wat je niet kunt zien", "sub": "operationaliseren, vragenlijsten, betrouwbaar en valide",
 "puzzle": "Lottes hartslag schiet omhoog als er een spin op tafel staat. Is dat het bewijs dat ze bang is?",
 "meta": "psychologie · meten", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Psychologie",
 "lead": "Angst kun je niet direct zien of wegen. Psychologen maken zo'n begrip meetbaar (operationaliseren) via drie wegen: wat iemand zegt, wat iemand doet en wat het lichaam doet. Een goede vragenlijst heeft heldere vragen, een vaste schaal en veel vragen. Een meting moet betrouwbaar zijn (opnieuw meten geeft ongeveer hetzelfde) én valide (je meet wat je wilt meten), en wat goed werkt voor een groep kan te wankel zijn voor één persoon.",
 "endHaak": "welk begrip uit je eigen leven zou je willen meten, en via welke van de drie wegen?",
 "minis": {"Hoofdstuk 1": "Hoe maak je angst meetbaar?", "Hoofdstuk 2": "Wat maakt een vraag goed?", "Hoofdstuk 3": "Wat is het verschil tussen betrouwbaar en valide?", "Hoofdstuk 4": "Waarom werkt een test wel voor een groep, maar niet voor jou?", "Hoofdstuk 5": "Wat meet je met gedrag en tijd?", "Recap": "Bewijst Lottes hartslag haar angst?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Lotte en Dr. Kim (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Lottes hartslag schiet omhoog als er een spin op tafel staat. Is dat het bewijs dat ze bang is?", "correct": 1, "explain": "Nee: een hartslag stijgt ook door schrik, opwinding of inspanning. Hij laat zien dat er iets gebeurt, niet wat."},
  "q07": {"q": "Welke vraag is het best om spinnenangst te meten?", "correct": 2, "explain": "Vraag c gaat over één ding en over concreet gedrag in een vaste periode. Vraag a is dubbel, vraag b vaag."},
  "q10": {"q": "Een weegschaal geeft elke keer precies twee kilo te veel aan. Is die betrouwbaar, valide, of allebei?", "correct": 0, "explain": "Betrouwbaar (steeds hetzelfde), maar niet valide (het getal klopt niet)."},
  "q14": {"q": "Een test geeft jou vandaag 70 en over twee weken 45. Waar is zo'n test nog bruikbaar voor?", "correct": 1, "explain": "Voor het gemiddelde van een grote groep: daar vallen de toevallige fouten tegen elkaar weg. Voor één persoon is hij te wankel, ook als je hem twee keer doet."}
 },
 "glossary": [
  {"t": "operationaliseren", "d": "Een begrip (zoals angst) omzetten in iets wat je kunt meten of tellen."},
  {"t": "zelfrapportage", "d": "Meten wat iemand zelf zegt, bijvoorbeeld met een vragenlijst."},
  {"t": "gedragstest", "d": "Meten wat iemand doet, bijvoorbeeld hoe dicht iemand bij een spin durft te komen."},
  {"t": "huidgeleiding", "d": "Lichaamsmaat: meer zweet aan de vingers geleidt beter; stijgt bij spanning, maar ook bij andere opwinding."},
  {"t": "dubbele vraag", "d": "Vraag die over twee dingen tegelijk gaat, zodat je niet goed kunt antwoorden."},
  {"t": "sturende vraag", "d": "Vraag die al laat merken welk antwoord verwacht wordt."},
  {"t": "sociaal wenselijk antwoorden", "d": "Een antwoord geven dat netjes overkomt in plaats van het eerlijke antwoord."},
  {"t": "betrouwbaar", "d": "Opnieuw meten geeft ongeveer dezelfde uitkomst (test-hertest; antwoorden op de vragen hangen samen)."},
  {"t": "valide", "d": "De meting meet echt wat je wilt meten."},
  {"t": "Stroop-effect", "d": "Vertraging bij het noemen van de inktkleur van een kleurwoord in een andere kleur, omdat lezen vanzelf gaat."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
