import json
film = {
 "slug": "sport-9-topsport-en-school", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Topsport en school", "sub": "totale belasting, slaap en een school die meebeweegt",
 "puzzle": "Zelfde trainingen als altijd, maar het is toetsweek. Waarom gaat de schouder van een topzwemmer juist nu zeuren, als hij niet harder traint?",
 "meta": "sport en topsport · belasting en herstel", "version": "1.0 · november 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Sport en topsport",
 "lead": "Je spoelt terug vanaf één zeurende schouder op donderdag: naar de wekker van woensdag vijf uur, de korte nacht ervoor, de eerste toets op maandag en de twee roosters van drie weken eerder. Bij elke stap terug valt een blok op de stapel 'totale belasting' (een model). Je ziet hoe een trainer belasting meet, waarom een tiener 's avonds later moe wordt en een vroege training dan extra slaap kost, wat slaap doet voor herstel, afweer en leren, wat onderzoek bij (jonge) sporters laat zien over toetsweken, slaap en blessures, en hoe een Topsport Talentschool school en sport samen plant.",
 "endHaak": "hoe ziet jouw zwaarste week eruit als je alles op één stapel legt?",
 "minis": {"Hoofdstuk 1 — Donderdag: de schouder": "Heeft een blessure één oorzaak?",
           "Hoofdstuk 2 — Woensdag, vijf uur": "Haalt eerder naar bed gaan je slaap in?",
           "Hoofdstuk 3 — De nacht: wat er niet gebeurde": "Maakt een uurtje slaap minder uit?",
           "Hoofdstuk 4 — Maandag: de eerste toets": "Telt een toets als belasting?",
           "Hoofdstuk 5 — Drie weken eerder: twee roosters": "Kunnen school en sport samen plannen?",
           "Recap": "Waarom zeurde zijn schouder?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages uit het castboek, zonder naam: de zwemmer (16), de zwemtrainer, de mentor (op deze school ook topsportcoördinator) en klasgenoten als figuranten. De week van de zwemmer is een voorbeeld; de stapel 'totale belasting' is een model. Onderzoek uit o.a. Haddad e.a. 2017, Sargent e.a. 2014, Walsh e.a. 2021, Gudmundsdottir 2020, Carskadon &amp; Tarokh 2014, Gao e.a. 2019, Prather e.a. 2015, Soligard e.a. 2016, Mann e.a. 2016 en von Rosen e.a. 2017; over de Topsport Talentschool DUO, Eurydice en KNVB (zie Getallen en bronnen). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · november 2026.",
 "questions": {
  "q05": {"q": "De staaf van de toetsweek is even hoog als die van de weken ervoor. Wat is de meest waarschijnlijke verklaring voor de zeurende schouder?", "correct": 2, "explain": "Een blessure heeft zelden één oorzaak. Pech of de training van eerder kunnen meespelen, maar op de tablet is deze week niets nieuws te zien: wat erbij kwam, ligt buiten het water."},
  "q09": {"q": "Voor een training om zes uur gingen de zwemmers ruim twee uur eerder naar bed. Haalden ze daarmee hun nachtrust weer in?", "correct": 1, "explain": "Nee: voor een training sliepen ze gemiddeld 5,4 uur, voor een rustdag 7,1 uur (Sargent e.a. 2014). Eerder naar bed gaan haalt het verlies niet in; ook tienerzwemmers in IJsland sliepen voor een vroege training maar vijf à vijfenhalf uur."},
  "q13": {"q": "Een tiener die veel sport, slaapt maandenlang zeven uur per nacht en voelt zich prima. Wat lieten onderzoeken bij zulke jonge sporters zien?", "correct": 0, "explain": "Jonge sporters die structureel minder dan acht uur sliepen, waren vaker geblesseerd (meerdere onderzoeken samen, Gao e.a. 2019). Je fit voelen zegt dus niet dat je genoeg hersteld bent. Het is een samenhang."},
  "q16": {"q": "Een toets is werk voor je hoofd. Telt hij voor de belasting van je lichaam?", "correct": 1, "explain": "Ja: ook spanning telt als belasting, en korte nachten kosten herstel. Sportartsen rekenen spanning, wedstrijden en reizen mee; het hangt niet af van het cijfer dat je haalt."},
  "q20": {"q": "De mentor is op deze Topsport Talentschool ook topsportcoördinator. Wat had zij voor deze toetsweek kunnen doen?", "correct": 0, "explain": "Toetsen en trainingen samen met de trainer anders plannen: een toets naar een ander moment, een examen gespreid over twee schooljaren, soms ontheffing voor lichamelijke opvoeding. De stof blijft, alleen de verdeling verandert."}
 },
 "glossary": [
  {"t": "totale belasting", "d": "Alles wat je lichaam en hoofd moeten verwerken: training, school, toetsen, spanning en te weinig slaap. In het model van de film gaat het allemaal af van hetzelfde herstel."},
  {"t": "trainingsbelasting", "d": "Het aantal minuten van een training keer hoe zwaar die voelde, op een schaal van één tot tien (bijvoorbeeld 90 × 7 = 630)."},
  {"t": "ochtendlijst", "d": "Een korte lijst die een sporter elke ochtend invult, bijvoorbeeld over slaap, energie en druk van school. Hij laat belasting zien die niet op de training staat."},
  {"t": "herstel", "d": "Het bijkomen van je lichaam na belasting. Slaap is daar een groot deel van; ook je afweer en het vastleggen van wat je geleerd hebt hebben slaap nodig."},
  {"t": "biologische klok", "d": "Het ritme van ongeveer vierentwintig uur in je hypothalamus. In de puberteit gaat hij later staan, waardoor je 's avonds later moe wordt."},
  {"t": "slaapdruk", "d": "De behoefte aan slaap die overdag opbouwt. Bij tieners bouwt hij trager op."},
  {"t": "samenhang", "d": "Twee dingen komen samen voor (bijvoorbeeld weinig slaap en meer blessures). Dat bewijst nog niet dat het een het ander veroorzaakt."},
  {"t": "Topsport Talentschool", "d": "Een middelbare school (zo'n dertig in Nederland) waar leerlingen met een talentstatus van hun sportbond school en topsport kunnen combineren: rooster met ruimte voor trainingen, toetsen verplaatsen, examen spreiden."},
  {"t": "topsportcoördinator", "d": "Een medewerker van een Topsport Talentschool die de toetsen, het rooster en het contact met de sport van een topsporter regelt."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
