import json
film = {
 "slug": "index",
 "audioPad": "audio",
 "hoofdstuk": "voortplanting",
 "hoofdstukNaam": "Voortplanting",
 "title": "Zwanger",
 "sub": "hoe een kind zijn moeder stuurt",
 "puzzle": "Hoe kan een piepklein klompje cellen het lichaam van een volwassen vrouw sturen?",
 "meta": "voortplanting · zwangerschap en geboorte",
 "version": "1.0 · november 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Voortplanting · na <a href=\"../bevruchting/index.html\">Bevruchting</a> · daarna <a href=\"../3-anticonceptie-soa-voortplantingstechniek.html\">Anticonceptie, soa's en voortplantingstechniek</a>",
 "lead": "Op de dag dat ze ongesteld had moeten worden, gebeurt er niets. Een piepklein embryo houdt het slijmvlies vast. In deze film zie je hoe het embryo zich innestelt en met hCG het gele lichaam in leven houdt, hoe de placenta het bloed van moeder en kind dichtbij brengt zonder het te mengen, hoe het kind in veertig weken groeit, hoe een positieve terugkoppeling de bevalling op gang houdt, en hoe de melk toeschiet.",
 "endHaak": "Hoe voorkom je een zwangerschap, en hoe kan de techniek helpen als het niet vanzelf lukt?",
 "minis": {
  "Cold open": "Hoe stuurt een piepklein embryo het lichaam van zijn moeder?",
  "Hoofdstuk 1": "Waarom blijft de menstruatie weg?",
  "Hoofdstuk 2": "Hoe komt zuurstof bij het kind, als het bloed niet mengt?",
  "Hoofdstuk 3": "Wanneer is een embryo een foetus?",
  "Hoofdstuk 4": "Waarom worden de weeën steeds sterker?",
  "Hoofdstuk 5": "Hoe weet de borst dat er melk nodig is?",
  "Recap": "Hoe stuurt een kind het lichaam van zijn moeder?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Lichte remake van een deel van Van bevruchting tot baby (november 2026). Tekeningen: gedeelde bibliotheek (holle bal, baarmoederwand, geel lichaam, zwangerschapstest, placenta en vlok, vrouwelijke organen zwanger, embryo, hersenen) en nieuw: het kind in de baarmoeder, de vruchtzak, de bevalling in doorsnede, de ontsluiting en een melkkliertje. Stijl: Part C (prompt v13).",
 "questions": {
  "q10": {"q": "Een vrouw doet vier dagen na de bevruchting een zwangerschapstest. Die is negatief. Is ze dan zeker niet zwanger?", "correct": 1,
          "explain": "Pas na de innesteling, vanaf ongeveer dag zes, maakt het embryo hCG dat in het bloed komt, en daarna in de urine. Betrouwbaar testen kan vanaf ongeveer de dag van de verwachte menstruatie."},
  "q18": {"q": "Het bloed van moeder en kind mengt niet. Kan alcohol dan toch bij het kind komen?", "correct": 2,
          "explain": "Het laagje tussen moeder- en kindbloed kiest niet. Kleine moleculen zoals alcohol en nicotine gaan er bijna net zo makkelijk doorheen als zuurstof."},
  "q23": {"q": "Antistoffen van de moeder komen in het bloed van het kind. Hoe gaat dat, terwijl het bloed niet mengt?", "correct": 0,
          "explain": "Antistoffen zijn grote eiwitten en diffunderen niet zomaar. De cellen van het laagje nemen ze op in blaasjes en geven ze door; dat kost energie."},
  "q39": {"q": "Een wee maakt de volgende wee sterker. Hoe komt deze lus tot een einde?", "correct": 1,
          "explain": "Na de geboorte drukt er niets meer op de baarmoederhals, dus het rek-signaal valt weg. Een positieve terugkoppeling stopt niet vanzelf: er moet iets gebeuren dat de lus doorbreekt."}
 },
 "glossary": [
  {"t": "innesteling", "d": "Het embryo (een holle bal van ± 100 cellen) zakt vanaf ± dag 6 na de bevruchting in het slijmvlies van de baarmoeder."},
  {"t": "hCG", "d": "Hormoon dat het embryo maakt na de innesteling. Lijkt op LH en houdt het gele lichaam in leven, zodat het progesteron blijft en de menstruatie wegblijft. Een zwangerschapstest meet hCG in de urine."},
  {"t": "placenta", "d": "Orgaan van moeder en kind samen. In de vlokken komt het bloed van moeder en kind heel dicht bij elkaar, gescheiden door een dun laagje cellen: het mengt niet. Maakt na ± 2 maanden zelf genoeg progesteron."},
  {"t": "navelstreng", "d": "Verbinding tussen kind en placenta: twee bloedvaten brengen bloed met weinig zuurstof naar de placenta, één bloedvat brengt bloed met veel zuurstof terug."},
  {"t": "vruchtvliezen", "d": "De dunne wand van de zak waarin het kind groeit."},
  {"t": "vruchtwater", "d": "Vocht in de vruchtzak: vangt stoten op, houdt de temperatuur gelijk, geeft ruimte om te bewegen."},
  {"t": "embryo", "d": "Het kind zolang de organen worden aangelegd: tot ± week 10 van de zwangerschap (8 weken na de bevruchting)."},
  {"t": "foetus", "d": "Het kind vanaf ± week 10 tot de geboorte: de organen zijn aangelegd, het kind groeit en de organen rijpen."},
  {"t": "oxytocine", "d": "Hormoon uit de hypofyse. Laat bij de bevalling de spieren van de baarmoederwand samentrekken (weeën) en bij het voeden de spiertjes rond de melkklieren (de melk schiet toe)."},
  {"t": "wee", "d": "Samentrekking van de spieren in de wand van de baarmoeder."},
  {"t": "positieve terugkoppeling", "d": "Een effect versterkt zijn eigen oorzaak: meer rek → meer oxytocine → sterkere weeën → meer rek. Stopt pas als iets de lus doorbreekt (de geboorte)."},
  {"t": "ontsluiting", "d": "Eerste fase van de bevalling: de weeën trekken de baarmoederhals open tot ± 10 cm."},
  {"t": "uitdrijving", "d": "Tweede fase: de moeder perst mee met de weeën en het kind wordt geboren."},
  {"t": "nageboorte", "d": "Derde fase: de placenta laat los en komt met de vruchtvliezen naar buiten."},
  {"t": "prolactine", "d": "Hormoon uit de hypofyse dat de borst melk laat maken; hoe vaker de baby drinkt, hoe meer prolactine.", "vwo": True}
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
