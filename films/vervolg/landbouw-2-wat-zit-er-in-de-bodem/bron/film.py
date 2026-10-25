import json
film = {
 "slug": "landbouw-2-wat-zit-er-in-de-bodem", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Wat zit er in de bodem?", "sub": "zand, klei, bodemleven en bemesting",
 "puzzle": "Waarom groeit dezelfde plant op zand heel anders dan op klei?",
 "meta": "landbouw en tuinbouw · bodem en bemesting", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Landbouw en dierhouderij",
 "lead": "Yasmin en Opa Henk zetten dezelfde tomatenplant in zandgrond en in kleigrond, en na een maand groeien ze heel anders. Met vier proefjes zie je waarom: kleideeltjes zijn heel klein en negatief geladen, dus klei houdt water en positieve ionen zoals kalium vast, terwijl zand ze laat wegspoelen. Bodemleven maakt van dode bladeren weer mineralen en geeft de grond structuur. De voedingsstof die het meest tekortschiet, bepaalt de groei. En omdat nitraat nergens aan blijft hangen, moet een teler slim bemesten: genoeg oogst, en schoon grondwater.",
 "endHaak": "welke grond heb jij in je eigen tuin of buurt, en wat zou je daar telen?",
 "minis": {"Hoofdstuk 1": "Waarom houdt klei water en kalium beter vast dan zand?", "Hoofdstuk 2": "Hoe wordt een dood blad weer voedsel voor een plant?", "Hoofdstuk 3": "Helpt extra mest altijd?", "Hoofdstuk 4": "Waarom spoelt nitraat uit, en fosfaat veel minder?", "Recap": "Waarom bleef de plant op zand achter?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Yasmin en Opa Henk (castboek). Decor: ElevenLabs (moestuin, in de stijl van de kasdecors van Meer oogst). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Dezelfde tomatenplant groeit in zandgrond heel anders dan in kleigrond, met evenveel water en mest. Hoe kan dat?", "correct": 1, "explain": "Zand en klei houden water en mineralen anders vast: door zand spoelen ze sneller weg. Een plant haalt geen voedsel uit de grond; suiker maakt hij zelf in het blad."},
  "q07": {"q": "Yasmin giet evenveel water in een trechter met zandgrond en een trechter met kleigrond. Waar komt het meeste water onderuit?", "correct": 2, "explain": "Uit het zand: tussen de grove korrels zakt water vlot weg. Klei houdt meer water vast, maar een deel zit zo stevig vast dat een wortel er niet bij kan."},
  "q13": {"q": "Een regenworm trekt een dood blad zijn gang in. Kan een wortel de stikstof uit dat blad opnemen?", "correct": 0, "explain": "Pas als bacteriën en schimmels het blad hebben afgebroken. Dan komt de stikstof vrij als opgeloste ionen: mineralisatie."},
  "q18": {"q": "Strook B krijgt stikstof, strook C stikstof en extra kalium. Er was al genoeg kalium. Hoe groeit C, vergeleken met B?", "correct": 2, "explain": "Even goed: kalium was al genoeg. De voedingsstof die het meest tekortschiet bepaalt de groei (wet van het minimum); meer van iets wat al genoeg is, helpt niet."},
  "q23": {"q": "Na kunstmest en een flinke 'herfstbui' druppelt er water uit een bak tuingrond. Wat zit erin?", "correct": 1, "explain": "Veel nitraat: dat ion is negatief, net als klei en humus, en blijft nergens aan hangen. Kalium blijft aan de klei plakken; fosfaat vormt met ijzer, aluminium of calcium stoffen die slecht oplossen."},
  "q27": {"q": "Eind september zijn de aardappels gerooid en ligt de akker kaal, met nog stikstof in de grond. Wat kan de boer het beste doen?", "correct": 2, "explain": "Snel een vanggewas zaaien, zoals rogge of gras. Dat neemt een groot deel van de overgebleven stikstof op, zodat er in de winter veel minder nitraat uitspoelt."}
 },
 "glossary": [
  {"t": "zand, silt en klei", "d": "Bodemdeeltjes ingedeeld naar grootte: zand 50 µm tot 2 mm, silt 2–50 µm, klei kleiner dan 2 µm (Nederlandse indeling)."},
  {"t": "mineralen", "d": "Opgeloste ionen uit de bodem die een plant via de wortels opneemt, zoals nitraat, fosfaat en kalium."},
  {"t": "ion", "d": "Een geladen deeltje. Kalium en ammonium zijn positief geladen, nitraat en fosfaat negatief."},
  {"t": "humus", "d": "Donkere, ver verteerde organische stof uit dode planten en dieren; negatief geladen en houdt veel water vast."},
  {"t": "veen", "d": "Grond van plantenresten die in natte grond zonder zuurstof niet verteerden; ontwaterd breken micro-organismen het af en zakt de bodem."},
  {"t": "mineralisatie", "d": "Het afbreken van dode resten door bacteriën en schimmels, waarbij voedingsstoffen vrijkomen als ionen die een plant kan opnemen."},
  {"t": "mycorrhiza", "d": "Samenwerking tussen een plant en schimmels in haar wortels: de schimmeldraden halen vooral fosfaat op, de schimmel krijgt suiker. Zo'n zeven op de tien soorten landplanten doen dit."},
  {"t": "wet van het minimum", "d": "De voedingsstof die het meest tekortschiet, bepaalt de groei; meer geven van wat al genoeg is, helpt niet (Sprengel, Liebig)."},
  {"t": "uitspoelen", "d": "Met het regenwater meezakken naar het grondwater; nitraat spoelt makkelijk uit, fosfaat veel minder."},
  {"t": "vanggewas", "d": "Gewas dat na de oogst wordt gezaaid om overgebleven stikstof op te nemen, zodat die in de winter niet uitspoelt (bijvoorbeeld rogge of gras)."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
