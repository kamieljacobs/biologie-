import json
film = {
 "slug": "ecologie-3-een-plan-voor-de-natuur", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Een plan voor de natuur", "sub": "van doel tot herstel",
 "puzzle": "Een maisakker naast de heide wordt natuur. Waarom haal je dan eerst de bovenste laag grond weg?",
 "meta": "ecologie en natuurbeheer · hbo en wo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Ecologie en natuurbeheer",
 "lead": "Daan loopt stage bij een natuurbeheerder. Bas, de ecoloog, maakt een plan voor een maisakker naast de heide. Eerst het doel: de heide hoort bij Natura 2000, en voor droge heide ligt vast dat er meer en betere moet komen; de tapuit wordt de doelsoort. De overheid beslist, de ecoloog adviseert. Dan de bodem: in de bouwvoor zit het fosfaat van jaren bemesten, en op rijke grond wint gras van heide. Maaien haalt ± 10 kg fosfor per hectare per jaar weg, uitmijnen ± 40 kg, afgraven alles in één keer. Op de Reijerscamp bij Wolfheze werd in 2006 afgegraven en een laagje heidegrond gestrooid. Daarna: waarom een los gebied traag nieuwe dieren krijgt, en hoe je met vegetatieopnamen meet of het plan werkt en bijstuurt.",
 "endHaak": "komt de tapuit terug?",
 "minis": {"Hoofdstuk 1": "Wie bepaalt welke natuur hier moet komen?",
           "Hoofdstuk 2": "Waarom wordt een akker niet vanzelf heide?",
           "Hoofdstuk 3": "Komen de dieren vanzelf als het gebied goed is?",
           "Hoofdstuk 4": "Hoe weet je of het plan werkt?",
           "Recap": "Waarom haal je eerst de bovenste laag weg?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Daan (stagiair) en Ecoloog Bas (castboek; voorstel). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Deze maisakker naast de heide wordt natuur. Toch laat Bas, de ecoloog, de donkere bovenlaag afgraven. Waarom?", "correct": 2,
          "explain": "In de donkere bovenlaag zit het fosfaat van jaren bemesten. Op zulke rijke grond groeit vooral snel gras, en dat wint het van heide."},
  "q08": {"q": "Wie beslist dat deze akker heide wordt?", "correct": 0,
          "explain": "De overheid beslist: Europa maakte de regels, het Rijk wijst de gebieden en hun doelen aan, de provincie maakt het beheerplan en zet de akker op de kaart. De ecoloog levert de kennis en het advies."},
  "q14": {"q": "Uitmijnen haalt ongeveer veertig kilo fosfor per hectare per jaar weg. Stel dat er vierhonderd kilo fosfor per hectare uit moet. Hoe lang duurt uitmijnen dan?", "correct": 1,
          "explain": "400 ÷ 40 = 10 jaar. Met maaien (± 10 kilo per jaar) zou het 400 ÷ 10 = 40 jaar duren. Het is een rekenvoorbeeld: in echte proeven duurt uitmijnen meestal tien tot twintig jaar."},
  "q20": {"q": "Op de Reijerscamp waren na tien jaar veel zeldzame loopkevers weer weg. Een proef in Drenthe kreeg sneller echte heidekevers. Hoe kan dat?", "correct": 0,
          "explain": "Volgens de onderzoekers lag de proef in Drenthe direct naast een grote heide, zodat de kevers konden binnenlopen. De Reijerscamp ligt verder van een grote heide."},
  "q24": {"q": "Na zes jaar: niets gedaan = bijna alles begroeid, alleen afgegraven = ongeveer een kwart, afgegraven met heidegrond = ruim de helft. Welk stuk lijkt het meest op droge heide?", "correct": 1,
          "explain": "Meer groen is niet beter: het gaat om de goede soorten. Op het stuk met heidegrond groeide een jonge heide; het stuk waar niets was gedaan, leek het minst op droge heide."}
 },
 "glossary": [
  {"t": "natuurdoel / doelsoort", "d": "Het type natuur of de soort waarvoor een gebied beheerd wordt. Hier: droge heide als natuurdoel, de tapuit als doelsoort."},
  {"t": "Natura 2000", "d": "Europees netwerk van beschermde natuurgebieden, op grond van de Vogelrichtlijn en de Habitatrichtlijn. Nederland heeft er ruim 160."},
  {"t": "habitattype", "d": "Een vast type natuur, met een eigen lijst van planten en eisen aan de bodem, bijvoorbeeld droge heide."},
  {"t": "instandhoudingsdoel", "d": "Wat er per Natura 2000-gebied moet gebeuren met een habitattype of soort: behoud of uitbreiding van de oppervlakte, en behoud of verbetering van de kwaliteit."},
  {"t": "bouwvoor", "d": "De bovenste laag van een akker (± 20–40 cm) die jarenlang geploegd en bemest is. Daarin zit veel fosfaat."},
  {"t": "verschralen", "d": "Een voedselrijke grond arm maken, zodat soorten van arme grond (zoals heide) een kans krijgen: maaien en afvoeren, uitmijnen of afgraven."},
  {"t": "uitmijnen", "d": "Gewassen blijven telen en de oogst afvoeren, met wel stikstof maar zonder fosfaat te geven. Zo haal je ± 40 kg fosfor per hectare per jaar weg."},
  {"t": "populatie", "d": "Alle individuen van één soort in één gebied. Een kleine, losse populatie sterft makkelijker uit en krijgt moeilijk nieuwe dieren erbij."},
  {"t": "monitoring en vegetatieopname", "d": "Monitoring: steeds op dezelfde manier herhaald meten, zodat je een verandering kunt zien. Een vegetatieopname: in een afgebakend vierkant alle plantensoorten noteren met hoeveel grond elke soort bedekt."},
  {"t": "adaptief beheer", "d": "Leren door te doen: je meet wat een maatregel doet en past het plan aan op wat je meet."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
