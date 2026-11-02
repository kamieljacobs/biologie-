import json
film = {
 "slug": "tuin-2-natuur-in-de-stad", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Natuur in de stad", "sub": "hitte, water en bijen",
 "puzzle": "Op een hete dag is het asfalt van het schoolplein vijftig graden. Hoe maak je het koeler zonder airco?",
 "meta": "tuin- en landschapsinrichting · ontwerpen tegen hitte en wateroverlast", "version": "1.0 · november 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Tuin- en landschapsinrichting",
 "lead": "Lotte loopt stage bij een hoveniersbedrijf. Hovenier Jeroen gaat een kaal, stenig schoolplein opnieuw ontwerpen, maar laat eerst meten. Je ziet waarom een stad 's nachts warm blijft (het hitte-eiland), hoe een boom koelt met schaduw én met verdamping via de huidmondjes, waarom dat in een droge zomer minder werkt, waar je de regen laat (bodem als spons, wadi, groen dak) en wat wilde bijen nodig hebben: kale grond om te nestelen en bloei van maart tot oktober, met vooral inheemse planten.",
 "endHaak": "welke plek bij jou in de buurt zou jij als eerste groener maken, en wat zou je daar het eerst meten?",
 "minis": {"Hoofdstuk 1": "Waarom blijft de stad 's nachts warm?", "Hoofdstuk 2": "Hoe koelt een boom, en wanneer minder?", "Hoofdstuk 3": "Waar laat je de regen?", "Hoofdstuk 4": "Wat hebben wilde bijen nodig?", "Recap": "Hoe maak je het plein koeler zonder airco?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Lotte (stagiair) en Hovenier Jeroen (castboek). Decor: ElevenLabs (schoolplein, middag en avond). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · november 2026.",
 "questions": {
  "q04": {"q": "Nu is het nacht. Boven de stad zie je het weiland eromheen. Waar is het nu warmer?", "correct": 1, "explain": "Asfalt, tegels en beton nemen overdag veel zonnewarmte op en geven die na zonsondergang langzaam af; er is weinig groen dat water verdampt. Daarom koelt een stad 's nachts minder af dan het land: het hitte-eiland. Mensen en auto's geven ook wat warmte, maar dat is niet de enige oorzaak."},
  "q07": {"q": "Onder de enige boom zijn de tegels 31 graden, in de zon 50. Voor de tegels komt dat door de schaduw. Maar het blad doet zelf ook iets. Wat doet het?", "correct": 1, "explain": "Een plant verdampt water via de huidmondjes. Verdampen kost warmte, uit het blad en de lucht eromheen. Zo koelt verdamping, net als zweet op je huid."},
  "q10": {"q": "Koelt deze boom ook zo goed in augustus, na weken zonder regen?", "correct": 0, "explain": "Krijgt een boom te weinig water, dan gaan zijn huidmondjes steeds verder dicht. Hij verdampt minder, koelt minder, en zijn blad wordt warmer. Een boom koelt het best met water in de grond."},
  "q13": {"q": "Bij een harde zomerbui staat het water tot aan de deur van de school. De stagiair zegt: het riool is te klein. Wat doet de hovenier?", "correct": 2, "explain": "Een riool kan maar een beperkte hoeveelheid water per uur aan; een groter riool is duur en bij de zwaarste buien toch te klein. Onverharde grond neemt water veel makkelijker op: de hovenier laat zoveel mogelijk regen de grond in zakken (wadi, groen dak, minder tegels)."},
  "q17": {"q": "De stagiair wil een groot bijenhotel ophangen. Is dat genoeg voor de wilde bijen?", "correct": 0, "explain": "De meeste wilde bijen graven een nest in kale, zonnige grond. Een bijenhotel helpt maar een klein deel van de soorten; een stukje kaal zand helpt veel meer soorten."},
  "q20": {"q": "Inheems: de plant komt hier van nature voor. Uitheems: de mens heeft hem uit een ander gebied meegenomen. Welke planten kiest de hovenier?", "correct": 2, "explain": "Inheemse planten en bijen leven al lang samen; sommige bijen halen stuifmeel van maar één groepje planten. Een paar uitheemse soorten bloeien laat en maken het seizoen langer. Dus een mengsel, met vooral inheemse."}
 },
 "glossary": [
  {"t": "tuin- en landschapsinrichting", "d": "Het vak dat tuinen, parken, pleinen en straten ontwerpt, aanlegt en beheert. Een ontwerper meet eerst (temperatuur, water, bodem) en baseert het ontwerp op die metingen."},
  {"t": "hitte-eiland", "d": "Een stad koelt 's nachts minder af dan het land eromheen, doordat asfalt, tegels en beton overdag zonnewarmte opnemen en die langzaam afgeven, en er weinig groen is dat water verdampt. In een grote stad kan het verschil in de lucht oplopen tot zo'n 7 °C, vooral in een heldere, windstille nacht."},
  {"t": "luchttemperatuur", "d": "De temperatuur van de lucht, gemeten in een wit meethutje op 1,5 meter boven een grasveld (zoals het KNMI meet). Een infraroodthermometer meet iets anders: de temperatuur van een oppervlak, zoals asfalt in de zon."},
  {"t": "transpiratie", "d": "Het verdampen van water uit een plant, vooral via de huidmondjes in het blad. Verdampen kost warmte, dus het koelt het blad en de lucht eromheen."},
  {"t": "huidmondje", "d": "Een kleine opening, vooral aan de onderkant van een blad, tussen twee sluitcellen. Door het huidmondje gaat waterdamp naar buiten. Bij droogte gaan de huidmondjes verder dicht: de plant verdampt minder en koelt minder."},
  {"t": "gevoelstemperatuur", "d": "Hoe warm het voor je lichaam voelt; daarin tellen ook zon, straling van warme oppervlakken en wind mee. Onder een boom kan het op een hete dag 10 tot 15 graden koeler voelen dan in de zon, ook al is de lucht maar een paar graden koeler."},
  {"t": "wadi", "d": "Een verlaagd grasveld met planten op het laagste punt. Het regenwater van tegels en daken stroomt erheen, blijft even staan en zakt dan de bodem in; na een dag of twee is de wadi weer droog."},
  {"t": "groen dak", "d": "Een dak met vetplantjes, een laag grond en een laag die water vasthoudt. Bij een gewone bui houdt het het meeste water vast; bij een wolkbreuk minder, maar dan loopt het water later en langzamer weg."},
  {"t": "inheems en uitheems", "d": "Een inheemse plant komt hier van nature voor; een uitheemse plant heeft de mens uit een ander gebied meegenomen. Voor wilde bijen: vooral inheemse planten, met een paar uitheemse die laat bloeien."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
