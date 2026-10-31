import json
film = {
 "slug": "tuin-1-welke-plant-waar", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Welke plant waar?", "sub": "determineren, vermeerderen en standplaats",
 "puzzle": "Waarom gaat een rododendron dood in een kalkrijke tuin?",
 "meta": "tuin- en landschapsinrichting · planten en standplaats", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Tuin- en landschapsinrichting",
 "lead": "De nieuwe rododendron van Opa Henk krijgt geel blad: alleen de nerven blijven groen. Hovenier Jeroen komt kijken, met stagiair Lotte. Je ziet hoe een hovenier werkt: eerst een plant op naam brengen met een determineersleutel (ook zonder bloem), dan vermeerderen (zaaien geeft een nieuwe mix van genen, stekken en scheuren geven klonen, en auxine laat een stek onderaan wortelen), en tot slot de plant op een plek zetten die past. Want naast het nieuwe terras is de grond basisch, en daar zit het ijzer vast. Dezelfde genen als de moederplant in de kas, op een plek die niet past.",
 "endHaak": "welke plant in jouw straat of schoolplein staat op een plek die niet bij hem past, en waaraan zie je dat?",
 "minis": {"Hoofdstuk 1": "Hoe vind je de naam van een plant zonder bloem?", "Hoofdstuk 2": "Waarom zaait een kweker niet, maar stekt hij?", "Hoofdstuk 3": "Waarom wordt het jonge blad geel tussen de nerven?", "Hoofdstuk 4": "Wat doet een hovenier eerst bij een nieuwe tuin?", "Recap": "Waarom gaat een rododendron dood in een kalkrijke tuin?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Lotte, Hovenier Jeroen en Opa Henk (castboek). Decor: ElevenLabs (tuin van Opa Henk met nieuw terras). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q04": {"q": "Zonder bloem kun je een plant toch niet op naam brengen?", "correct": 2, "explain": "Wel: ook blad, stengel en groeivorm hebben kenmerken. Een determineersleutel laat je steeds kiezen tussen twee tegengestelde kenmerken, tot je bij één naam uitkomt."},
  "q08": {"q": "Krijg je uit zaadjes van deze struik drie struiken die net zo bloeien?", "correct": 1, "explain": "Nee. Zaad ontstaat na bestuiving en bevruchting: genen uit het stuifmeel en uit de eicel komen samen, dus elke zaailing is een nieuwe mix. Wil je precies dezelfde struik, dan stek je."},
  "q10": {"q": "Waar groeien de nieuwe wortels van een stek?", "correct": 0, "explain": "Onderaan. Auxine uit de top en de jonge bladeren gaat naar de voet van de stek en zet daar cellen aan tot wortels. Daarom laat je een paar bladeren zitten."},
  "q14": {"q": "Welk tekort zie je aan dit blad: jong blad geel, nerven groen?", "correct": 1, "explain": "Vooral ijzer. In basische grond is er wel ijzer, maar het verandert in vaste korreltjes die de wortels niet kunnen opnemen. Zonder dat ijzer maakt het blad te weinig bladgroen; extra mest helpt dus niet."},
  "q17": {"q": "Wat gebeurt er als je de gele rododendron in de volle zon zet?", "correct": 2, "explain": "Hij blijft geel: ijzer is de beperkende factor, en meer licht helpt dan niet. Een rododendron wil juist halfschaduw; felle middagzon kan het blad verbranden."},
  "q20": {"q": "Wat doet een hovenier eerst bij een nieuwe tuin?", "correct": 0, "explain": "Eerst de plek meten: zuurgraad, licht en vocht. Dan kiest hij planten die bij elke plek passen en legt dat vast in een beplantingsplan."}
 },
 "glossary": [
  {"t": "determineren", "d": "Met een sleutel de naam van een organisme vinden door steeds te kiezen tussen twee tegengestelde kenmerken, tot je bij één naam uitkomt."},
  {"t": "geslachtelijke voortplanting", "d": "Voortplanting via bevruchting: in het zaad komen genen uit het stuifmeel en uit de eicel samen. Elke zaailing is een nieuwe mix en kan van de ouder verschillen."},
  {"t": "stek", "d": "Een afgesneden stukje stengel met een paar bladeren dat wortels maakt en uitgroeit tot een nieuwe plant."},
  {"t": "scheuren", "d": "Een pol van een vaste plant uitgraven en in stukken delen, elk met wortels en scheuten."},
  {"t": "kloon", "d": "Een plant met dezelfde genen als de plant waar hij van komt, bijvoorbeeld door stekken of scheuren (ongeslachtelijke vermeerdering)."},
  {"t": "auxine", "d": "Plantenhormoon dat in de top en jonge bladeren wordt gemaakt en naar beneden gaat. Aan de voet van een stek zet het cellen aan tot wortels; stekpoeder bevat een kunstmatig auxine."},
  {"t": "zuurgraad (pH)", "d": "Hoe zuur of basisch de grond is: onder 7 zuur, boven 7 basisch. Een rododendron groeit het best bij ongeveer 4,5 tot 6."},
  {"t": "standplaats", "d": "De plek waar een plant staat, met de omstandigheden daar: zuurgraad, licht en vocht. Past één factor niet (de beperkende factor), dan helpt meer van iets anders niet."},
  {"t": "beplantingsplan", "d": "Een tekening van de tuin van bovenaf met een lijst die vastlegt welke plant waar komt, hoeveel, en waarom."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
