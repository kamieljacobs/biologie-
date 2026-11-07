import json
film = {
 "slug": "voedingsleer-1-bij-de-dietist", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Bij de diëtist", "sub": "van eetdagboek tot nieuwe gewoonte",
 "puzzle": "Iedereen weet dat groente gezond is. Waarom eet bijna niemand genoeg?",
 "meta": "voeding en diëtetiek · gezonde voeding", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Voeding en diëtetiek",
 "lead": "Negen op de tien volwassenen zeggen dat ze weten wat gezond is, maar maar ongeveer drie op de tien halen 200 gram groente per dag. Noor loopt een dag mee met Diëtist Hanneke, bij wie Joost op verwijzing van zijn huisarts komt. Een diëtist meet eerst wat iemand eet, met een eetdagboek en door na te vragen, en weet dat zo'n dagboek bijna altijd te laag uitvalt. Ze legt het naast de Schijf van Vijf, die de richtlijnen van de Gezondheidsraad volgt. Dan begint het moeilijkste deel van het vak: niet vertellen wat gezond is, maar vragen wat iemand zelf wil, en samen kleine stappen maken die een gewoonte worden.",
 "endHaak": "welke kleine stap zou jij morgen al kunnen zetten?",
 "minis": {"Hoofdstuk 1": "Waarom valt een eetdagboek bijna altijd te laag uit?", "Hoofdstuk 2": "Waarom is de Schijf van Vijf geen mening?", "Hoofdstuk 3": "Waarom begint een diëtist met een vraag?", "Hoofdstuk 4": "Is een avond overslaan een mislukking?", "Recap": "Waarom is weten niet genoeg?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Diëtist Hanneke, Joost en Noor; op de foto Fleur (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Negen op de tien volwassenen zeggen dat ze weten wat gezond is. Toch halen maar ongeveer drie op de tien 200 gram groente per dag. Hoe kan dat?", "correct": 2, "explain": "Weten is nog geen doen. Prijs en smaak tellen ook mee, maar vooral gewoontes: wie weet wat gezond is, eet het daarom nog niet vanzelf."},
  "q07": {"q": "Joost heeft een paar dagen alles opgeschreven. Hoe dicht zit zijn eetdagboek bij wat hij echt at?", "correct": 0, "explain": "Er staat meestal te weinig in: zo'n 10 tot 30 procent, soms meer. Je vergeet iets, schat een portie te klein of eet anders zodra je moet opschrijven. Dat overkomt bijna iedereen."},
  "q11": {"q": "Joost eet vaak bruine bonen. In welk vak van de Schijf van Vijf horen die?", "correct": 1, "explain": "Bonen zijn peulvruchten. Er zit veel eiwit in, daarom zitten ze in hetzelfde vak als vlees, vis, ei, noten en zuivel, niet bij de groente."},
  "q15": {"q": "Joost haalt graag een pizza. Waar hoort die bij?", "correct": 2, "explain": "Zo'n pizza hoort bij geen enkel vak. Dat is geen verbod: je eet hem minder vaak. Vuistregel: per dag een paar keer iets kleins, hooguit drie keer per week iets groots."},
  "q18": {"q": "Noor vraagt of de Schijf van Vijf gewoon een mening is. Waarop is de schijf gebaseerd?", "correct": 1, "explain": "Op onderzoek naar eten en ziekte. De schijf volgt de richtlijnen van de Gezondheidsraad, waar wetenschappers al het onderzoek naast elkaar leggen."},
  "q21": {"q": "Joost weet best wat gezond is, en Hanneke ziet in het dagboek genoeg dat anders kan. Hoe begint ze het gesprek?", "correct": 0, "explain": "Met een vraag: wat wil hij zelf veranderen, en waarom? Noemt de cliënt zelf zijn reden, dan is de kans groter dat het lukt. Advies volgt daarna."},
  "q28": {"q": "Na drie weken belt Joost: een paar avonden lukte het niet, en hij voelt zich er rot over. Wat betekent dat?", "correct": 1, "explain": "Een paar keer overslaan is een uitglijder, geen mislukking. Een avond overslaan maakt een gewoonte niet kapot; telkens overslaan wel. Hij gaat gewoon door, met een plan voor als het misgaat."}
 },
 "glossary": [
  {"t": "diëtist", "d": "Zorgverlener die mensen helpt gezonder te eten: meet wat iemand eet, geeft advies op maat en begeleidt bij het veranderen. Beschermde titel: alleen met het hbo-diploma Voeding en Diëtetiek."},
  {"t": "eetdagboek", "d": "Een paar dagen alles opschrijven wat je eet en drinkt, ook een weekenddag. Valt meestal te laag uit: je vergeet iets, schat porties te klein of eet anders zodra je moet opschrijven."},
  {"t": "navragen (24-uursnavraag)", "d": "De diëtist vraagt stap voor stap wat je gisteren hebt gegeten en gedronken. Zo meet ook het RIVM wat Nederland eet."},
  {"t": "Schijf van Vijf", "d": "Het voorlichtingsmodel van het Voedingscentrum (vernieuwd op 9 april 2026; gebaseerd op de Richtlijnen goede voeding van de Gezondheidsraad, 2015, eiwitbronnen herzien in 2025) met vijf vakken: groente en fruit · brood, graanproducten en aardappelen · peulvruchten, noten, vis, ei, vlees en zuivel · vetten en oliën · dranken. Uit de schijf haal je elke dag het meeste van wat je eet; wat erbuiten valt, beperk je."},
  {"t": "peulvruchten", "d": "Bonen, linzen en kikkererwten. Er zit veel eiwit in; daarom staan ze in het vak met vlees, vis, ei, noten en zuivel, niet bij de groente."},
  {"t": "Richtlijnen goede voeding", "d": "Advies van de Gezondheidsraad: een commissie van wetenschappers legt al het onderzoek naar eten en ziekte naast elkaar. Bijvoorbeeld: eet dagelijks minstens 200 gram groente en 200 gram fruit."},
  {"t": "motiverende gespreksvoering", "d": "Gespreksstijl waarin de hulpverlener open vragen stelt, terugzegt wat ze hoort en de cliënt zelf zijn redenen laat noemen om te veranderen, in plaats van ertegenin te gaan. Het helpt, maar het is geen toverformule."},
  {"t": "als-dan-plan", "d": "Een plan dat een nieuwe handeling koppelt aan een vast moment: 'als ik 's avonds de tv aanzet, dan pak ik een bakje tomaatjes'. Iets toevoegen lukt daarbij meestal beter dan iets weglaten."},
  {"t": "gewoonte", "d": "Gedrag dat vanzelf gaat, uitgelokt door een vast moment of een vaste plek. In een Engels onderzoek duurde het gemiddeld ruim twee maanden voor iets nieuws vanzelf ging, bij de een drie weken, bij de ander meer dan een half jaar."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
