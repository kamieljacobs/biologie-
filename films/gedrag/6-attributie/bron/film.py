import json
film = {
 "slug": "6-attributie", "hoofdstuk": "gedrag", "hoofdstukNaam": "Gedrag",
 "title": "Wiens schuld is het?", "sub": "Interne en externe attributie",
 "puzzle": "Noor haalt een 4 voor biologie. Drie gedachten schieten door haar hoofd. Welke helpt haar het meest bij de volgende toets?",
 "meta": "gedrag · attributie", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Gedrag · film 6 van 12",
 "lead": "Attributie is hoe je een oorzaak toeschrijft: intern (de persoon) of extern (de situatie), blijvend of tijdelijk, beheersbaar of niet. Een oorzaak waar je invloed op hebt, helpt je vaak gemotiveerd te blijven. Bij succes kijken we vaak naar onszelf, bij falen naar de situatie (zelfdienende vertekening). Bij anderen onderschatten we de situatie: de fundamentele attributiefout.",
 "endHaak": "welke verklaring gaf jij na je laatste toets?",
 "minis": {"Hoofdstuk 1": "Ligt het aan jou of aan de situatie?", "Hoofdstuk 2": "Welke verklaring helpt je verder?", "Hoofdstuk 3": "Hoe verklaren we het gedrag van anderen?", "Recap": "Welke gedachte helpt Noor?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Noor en Sam (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Noor haalt een 4. Welke gedachte helpt haar het meest bij de volgende toets?", "correct": 1, "explain": "Het antwoord zie je in hoofdstuk 2."},
  "q07": {"q": "Wat dachten de lezers over de echte mening van een schrijver die (opgelegd) vóór Castro schreef?", "correct": 1, "explain": "We onderschatten de situatie en overschatten het karakter: de fundamentele attributiefout."}
 },
 "glossary": [
  {"t": "attributie", "d": "Het toeschrijven van een oorzaak aan gedrag of een gebeurtenis."},
  {"t": "intern / extern", "d": "De oorzaak ligt bij de persoon (aanleg, inzet, karakter) of in de situatie (toets, lawaai, pech)."},
  {"t": "blijvend / tijdelijk", "d": "Blijft de oorzaak bestaan, of kan het de volgende keer anders zijn?"},
  {"t": "beheersbaar", "d": "Kun je er zelf iets aan doen?"},
  {"t": "zelfdienende vertekening", "d": "Self-serving bias: succes toeschrijven aan jezelf, falen aan de situatie."},
  {"t": "fundamentele attributiefout", "d": "Bij het gedrag van anderen de invloed van de situatie onderschatten en die van het karakter overschatten."},
  {"t": "actor-observer-effect", "d": "vwo · Het idee dat je eigen gedrag vaker extern en dat van anderen vaker intern verklaart; in een meta-analyse (2006) gemiddeld bijna geen effect."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
