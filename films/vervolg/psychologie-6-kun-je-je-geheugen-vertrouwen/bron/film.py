import json
film = {
 "slug": "psychologie-6-kun-je-je-geheugen-vertrouwen", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Kun je je geheugen vertrouwen?", "sub": "getuigen, valse herinneringen en rechtspsychologie",
 "puzzle": "Noor wijst bij de politie de dief aan en weet het zeker. Kan ze zich dan toch vergissen?",
 "meta": "psychologie · rechtspsychologie", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Psychologie",
 "lead": "Een herinnering is geen opname: je bouwt hem bij het ophalen opnieuw op uit brokjes, en vult gaten op met wat logisch lijkt. Daardoor kan informatie van later erin terechtkomen. Loftus en Palmer lieten zien dat één woord in een vraag het antwoord verandert, en met een verzonnen jeugdverhaal kon Loftus mensen iets laten 'herinneren' wat nooit gebeurd is. Bij een confrontatie met foto's helpen vaste regels, en de eerste zekerheid bij een eerlijke confrontatie zegt veel, latere zekerheid weinig. Rechtspsychologen onderzoeken dit en adviseren politie en rechter.",
 "endHaak": "welke herinnering vertel jij vaak, en wat is er later bij gekomen?",
 "minis": {"Hoofdstuk 1": "Is een herinnering een opname?", "Hoofdstuk 2": "Kan één woord een herinnering veranderen?", "Hoofdstuk 3": "Wat maakt een confrontatie eerlijk?", "Hoofdstuk 4": "Wat doet een rechtspsycholoog?", "Recap": "Kan Noor zich vergissen?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Noor, Dr. Kim, Daan, Yasmin en Teun (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Noor wijst de dief aan en weet het zeker. Kan ze zich dan toch vergissen?", "correct": 1, "explain": "Ja. Een herinnering wordt bij het ophalen opnieuw opgebouwd en kan veranderen, ook als je hem goed zag en je zeker voelt."},
  "q06": {"q": "Een week later: 'Zag je gebroken glas?' Wat gebeurde er?", "correct": 1, "explain": "Er lag geen glas, maar in de groep met 'knalden' zei ongeveer één op de drie ja, tegen één op de zeven bij 'raakten'."},
  "q10": {"q": "Bij een eerlijke confrontatie: wanneer is de zekerheid van een getuige het beste teken dat ze gelijk heeft?", "correct": 1, "explain": "Meteen bij het eerste aanwijzen, als de confrontatie eerlijk was. Daarna groeit de zekerheid vaak, bijvoorbeeld na 'goed zo'."},
  "q13": {"q": "Welke vraag stuurt het minst?", "correct": 2, "explain": "Een open vraag. 'Had hij een mes?' kan een mes in de herinnering zetten; 'Wat had hij in zijn hand?' zegt al dat hij iets vasthield."}
 },
 "glossary": [
  {"t": "reconstructie", "d": "Een herinnering wordt bij het ophalen opnieuw opgebouwd uit brokjes; gaten worden opgevuld met wat logisch lijkt."},
  {"t": "reconsolidatie", "d": "Een opgehaalde herinnering kan even veranderlijk worden en wordt daarna opnieuw vastgelegd; nieuwe informatie kan er dan in terechtkomen."},
  {"t": "misinformatie-effect", "d": "Informatie die je na een gebeurtenis krijgt (bijvoorbeeld een woord in een vraag) verandert wat je je herinnert of antwoordt."},
  {"t": "valse herinnering", "d": "Een herinnering aan iets wat nooit gebeurd is, soms met levendige details (lost-in-the-mall-onderzoek)."},
  {"t": "ooggetuige", "d": "Iemand die een gebeurtenis zelf heeft gezien en daarover verklaart."},
  {"t": "confrontatie", "d": "De politie laat een getuige een rij foto's of personen zien om de dader aan te wijzen."},
  {"t": "dubbelblind", "d": "Bij een confrontatie: de agent die de foto's laat zien weet zelf niet wie de verdachte is, zodat hij niet kan sturen."},
  {"t": "suggestieve vraag", "d": "Vraag die al iets invult of een antwoord voorzegt, zoals 'Had hij een mes?'."},
  {"t": "studioverhoor", "d": "Verhoor van kinderen (tot twaalf jaar) in een speciale, gefilmde verhoorstudio door speciaal opgeleide agenten."},
  {"t": "rechtspsycholoog", "d": "Psycholoog die onderzoekt en adviseert over getuigen, verhoren en geheugen in het recht."},
  {"t": "forensisch psycholoog", "d": "Psycholoog die de verdachte zelf onderzoekt, bijvoorbeeld voor een rapport over gedrag of risico."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
