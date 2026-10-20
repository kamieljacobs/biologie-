import json
film = {
 "slug": "neurowetenschappen-1-je-brein-vult-het-in", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Je brein vult het in", "sub": "waarneming, illusies en aandacht",
 "puzzle": "Waarom zie je een gezicht in een stopcontact?",
 "meta": "neurowetenschappen · psychologie", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Neurowetenschappen",
 "lead": "Je ogen sturen maar een beetje informatie naar je hersenen: scherp zie je alleen een klein stukje, en je ogen springen steeds. Toch zie je een rustig, scherp beeld. Je hersenen voorspellen, vullen in en rekenen terug. Dat zie je aan de blinde vlek, aan een schaduwillusie en aan gezichten in stopcontacten. Aandacht kiest wat doordringt: de helft van de kijkers mist een gorilla. En als signalen wegvallen, maken de hersenen soms zelf iets, zoals bij fantoompijn en het syndroom van Charles Bonnet. Neurowetenschappers en psychologen gebruiken illusies als gereedschap.",
 "endHaak": "zoek vandaag drie voorwerpen met een gezicht.",
 "minis": {"Hoofdstuk 1": "Wat krijgen je hersenen eigenlijk binnen?", "Hoofdstuk 2": "Wat vullen je hersenen zelf in?", "Hoofdstuk 3": "Waarom mis je een gorilla?", "Hoofdstuk 4": "Wat als er signalen wegvallen?", "Recap": "Waarom zie je een gezicht in een stopcontact?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Sam, Daan, Yasmin, Lotte en Noor (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Sam ziet een gezicht in het stopcontact, hoewel hij weet dat het plastic is. Hoe komt dat?", "correct": 1, "explain": "Zijn ogen werken prima. Zijn hersenen reageren vanzelf, en heel snel, op alles wat op een gezicht lijkt."},
  "q07": {"q": "Je ogen springen drie tot vier keer per seconde. Waarom zie je de wereld niet schokken?", "correct": 2, "explain": "Tijdens een sprong dempen je hersenen het beeld sterk; wat je ziet, zetten ze zelf in elkaar uit stukjes van daarnet en uit wat ze verwachten."},
  "q11": {"q": "Welk vakje is in het plaatje echt donkerder, A of B?", "correct": 1, "explain": "Ze zijn precies even donker. Je hersenen rekenen de schaduw terug, en daardoor lijkt B lichter."},
  "q15": {"q": "Kijkers tellen hoe vaak het witte team overgooit. Hoeveel van hen zien de gorilla niet?", "correct": 1, "explain": "Ongeveer de helft. Hun aandacht ging naar het tellen, en wat je niet zoekt, dringt vaak niet door."},
  "q19": {"q": "Iemand mist een hand en voelt er toch pijn in. Waar komt die pijn vandaan?", "correct": 0, "explain": "Uit het zenuwstelsel: de zenuwen in de stomp en de hersenen, die de hand nog steeds tekenen. De pijn is echt."}
 },
 "glossary": [
  {"t": "gele vlek", "d": "Plek in het netvlies met de meeste kegeltjes; alleen in het midden ervan zie je scherp, ongeveer zo groot als een duimnagel aan een gestrekte arm."},
  {"t": "oogsprong", "d": "Snelle beweging van het oog naar een nieuw punt, ongeveer drie tot vier keer per seconde; tijdens de sprong dempen de hersenen het beeld."},
  {"t": "voorspelmachine", "d": "Model waarin de hersenen steeds voorspellen wat er komt en dat vergelijken met wat binnenkomt; alleen een verschil valt op."},
  {"t": "blinde vlek", "d": "Plek waar de oogzenuw het oog verlaat, zonder lichtgevoelige cellen; de hersenen vullen het gat in met de omgeving."},
  {"t": "illusie", "d": "Waarneming die afwijkt van wat er werkelijk is; laat zien welke regels de hersenen zelf toevoegen."},
  {"t": "pareidolie", "d": "Een gezicht of figuur zien in iets willekeurigs, zoals een stopcontact."},
  {"t": "gezichtsgebied", "d": "Gebied in de hersenschors (onderkant van de slaapkwab) dat sterk reageert op gezichten, ook op dingen die er maar een beetje op lijken."},
  {"t": "aandachtsblindheid", "d": "Iets wat in je blikveld is niet opmerken omdat je aandacht ergens anders is."},
  {"t": "fantoompijn", "d": "Echte pijn in een lichaamsdeel dat er niet meer is, bijvoorbeeld na een amputatie."},
  {"t": "kaart van het lichaam", "d": "In de hersenschors heeft elk lichaamsdeel een eigen gebied; het gebied voor de hand ligt naast het gebied voor het gezicht."},
  {"t": "spiegeltherapie", "d": "Behandeling waarbij je in een spiegel je andere hand ziet bewegen op de plek van de verdwenen hand; helpt sommige mensen."},
  {"t": "syndroom van Charles Bonnet", "d": "Mensen die slechtziend worden, zien soms beelden die er niet zijn (bloemen, patronen, gezichten) en weten dat het niet echt is."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
