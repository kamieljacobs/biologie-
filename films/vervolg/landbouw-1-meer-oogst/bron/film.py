import json
film = {
 "slug": "landbouw-1-meer-oogst", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Meer oogst", "sub": "licht, CO₂ en temperatuur in de kas",
 "puzzle": "Waarom blazen tuinders extra CO₂ in hun kas?",
 "meta": "landbouw en tuinbouw · kasteelt", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Landbouw en dierhouderij",
 "lead": "In een Nederlandse tomatenkas zit twee keer zoveel koolstofdioxide als buiten. Waarom? Een plant groeit zo snel als de factor die het meest tekortschiet toelaat, en bij gewone lucht is dat vaak koolstofdioxide: het enzym rubisco werkt traag en pakt soms zuurstof in plaats van CO₂. Maar extra CO₂ helpt alleen als er ook genoeg licht is. Een tuinder regelt licht, temperatuur, CO₂ en vocht als één systeem, stuurt de suiker van bron naar put richting de vruchten, en weegt af wat dat kost aan energie, water en licht.",
 "endHaak": "welke factor houdt de planten in jouw vensterbank tegen?",
 "minis": {"Hoofdstuk 1": "Waarom is CO₂ zo vaak de lage duig?", "Hoofdstuk 2": "Waarom doseert de computer minder als de ramen openstaan?", "Hoofdstuk 3": "Hoe stuurt een tuinder de suiker naar de vruchten?", "Hoofdstuk 4": "Is een Nederlandse tomaat duurzaam?", "Recap": "Waarom komt er CO₂ uit het buisje van Yasmin?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Yasmin en Opa Henk (castboek). Decors: ElevenLabs (recraft-v4.1, brand kit filmdecor). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Waarom blaast een tuinder extra koolstofdioxide in zijn kas?", "correct": 0, "explain": "Een plant bouwt zichzelf op uit koolstofdioxide en water. In een dichte kas raakt de koolstofdioxide op een zonnige dag op; extra koolstofdioxide laat de planten sneller suiker maken."},
  "q08": {"q": "Op een donkere decemberdag blaast de tuinder extra koolstofdioxide in de kas. Groeien de planten veel sneller?", "correct": 1, "explain": "Nee: bij weinig licht is licht de beperkende factor. Er is te weinig energie uit licht om van de extra koolstofdioxide suiker te maken."},
  "q11": {"q": "Wat doet de klimaatcomputer als de ramen ver openstaan?", "correct": 2, "explain": "Hij doseert minder koolstofdioxide: wat je doseert terwijl de ramen openstaan, waait grotendeels weg."},
  "q16": {"q": "De plant groeit te veel in blad en zet te weinig vruchten. Wat doet de tuinder?", "correct": 1, "explain": "Hij haalt bladeren weg en laat meer vruchten aan de tros: minder blad betekent minder concurrentie om de suiker. Maar haal je te veel blad weg, dan vangt de plant te weinig licht."},
  "q19": {"q": "Waarom haalt een Nederlandse kas zoveel meer tomaten per vierkante meter dan het Spaanse gemiddelde?", "correct": 2, "explain": "In een Nederlandse kas worden licht, koolstofdioxide, temperatuur en water veel nauwkeuriger geregeld; in Spanje groeien veel tomaten buiten of onder eenvoudig plastic."}
 },
 "glossary": [
  {"t": "beperkende factor", "d": "De factor die het meest tekortschiet en daardoor bepaalt hoe snel een plant groeit (licht, CO₂, temperatuur of water); vergelijk de laagste duig van een ton."},
  {"t": "rubisco", "d": "Het enzym dat bij fotosynthese koolstofdioxide vastlegt; het meest voorkomende eiwit op aarde, traag, en het pakt soms zuurstof in plaats van CO₂."},
  {"t": "CO₂-dosering", "d": "Extra koolstofdioxide in de kas blazen, bij tomaat tot ± 700–900 deeltjes per miljoen (buiten ruim 400); boven ± 1000 helpt het nauwelijks meer."},
  {"t": "klimaatcomputer", "d": "Computer die in de kas licht, temperatuur, luchtvochtigheid en CO₂ meet en lampen, verwarming, ramen en dosering regelt."},
  {"t": "huidmondjes", "d": "Openingen in het blad waardoor CO₂ binnenkomt en waterdamp ontsnapt; bij droge lucht sluit de plant ze."},
  {"t": "bron en put", "d": "Een bron maakt suiker (een volgroeid blad), een put verbruikt suiker (vrucht, jong blad, wortel); de suiker gaat via de zeefvaten van bron naar put."},
  {"t": "generatief en vegetatief", "d": "Een plant die vooral vruchten zet, groeit generatief; een plant die vooral blad en stengel maakt, vegetatief. De tuinder stuurt daartussen."},
  {"t": "ethyleen", "d": "Plantenhormoon (een gas) dat rijpende vruchten maken; het zet het rijpen van de rest van de tros aan."},
  {"t": "biologische bestrijding", "d": "Plagen bestrijden met andere organismen, zoals sluipwespen tegen witte vlieg, in plaats van met gif."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
