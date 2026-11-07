import json
film = {
 "slug": "pedagogiek-1-een-brein-in-aanbouw", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Een brein in aanbouw", "sub": "van baby tot twintiger",
 "puzzle": "Waarom nemen pubers meer risico, ook als ze weten dat het gevaarlijk is?",
 "meta": "pedagogiek · ontwikkeling", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Pedagogiek",
 "lead": "In de eerste levensjaren ontstaan veel meer verbindingen tussen neuronen dan later nodig zijn; ervaring bepaalt welke blijven. Daarna maken snoeien en myeline de hersenen efficiënter, en de voorhoofdskwab is als laatste klaar. In de puberteit reageert het beloningssysteem extra sterk, vooral met leeftijdgenoten erbij: in een rijspel namen pubers met vrienden erbij veel meer risico, volwassenen bijna niet. Een pedagoog gebruikt die kennis: begeleiden in plaats van alleen verbieden, met ruimte die stap voor stap groeit.",
 "endHaak": "waar kreeg jij de afgelopen jaren stap voor stap meer ruimte?",
 "minis": {"Hoofdstuk 1": "Hoe groeit een babybrein?", "Hoofdstuk 2": "Waarom maakt opruimen je hersenen beter?", "Hoofdstuk 3": "Waarom nemen pubers met vrienden meer risico?", "Hoofdstuk 4": "Wat doe je ermee als ouder of pedagoog?", "Recap": "Waarom fietst Bilal door rood?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Bilal, Sam, Daan en de baby (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Bilal wacht alleen altijd bij rood, maar met vrienden fietst hij door. Waarom?", "correct": 1, "explain": "Hij weet best dat het gevaarlijk is, maar met vrienden erbij voelt het spannender en leuker: de beloning weegt zwaarder."},
  "q06": {"q": "Een kind van twee heeft veel meer verbindingen tussen neuronen dan jij. Wat zegt dat?", "correct": 2, "explain": "Veel daarvan gaan nog verdwijnen: weinig gebruikte verbindingen worden gesnoeid, en dat maakt de hersenen efficiënter."},
  "q09": {"q": "Welk deel van je hersenen is als laatste klaar?", "correct": 1, "explain": "De voorhoofdskwab, die helpt vooruit denken, afwegen en jezelf inhouden; hij verandert nog tot in je twintiger jaren."},
  "q13": {"q": "In het rijspel: wie nam meer risico met leeftijdgenoten erbij?", "correct": 0, "explain": "Vooral de pubers. Jongvolwassenen iets meer, volwassenen bijna niet."},
  "q17": {"q": "Waarom mag je met 17 al rijexamen doen, maar tot je 18e alleen rijden met een coach?", "correct": 2, "explain": "Zodat je ervaring opdoet terwijl een ervaren volwassene meekijkt: een rem van buiten, zolang die van binnen nog groeit."}
 },
 "glossary": [
  {"t": "verbindingen (synapsen)", "d": "Plekken waar neuronen signalen aan elkaar doorgeven; in de eerste jaren ontstaan er veel meer dan later nodig zijn."},
  {"t": "sensitieve periode", "d": "Tijd waarin ervaring extra veel effect heeft op de ontwikkeling, zoals het afstemmen op de klanken van je moedertaal."},
  {"t": "snoeien", "d": "Weinig gebruikte verbindingen verdwijnen en vaak gebruikte blijven; maakt de hersenen efficiënter."},
  {"t": "myeline", "d": "Isolatielaag om uitlopers van neuronen waardoor signalen veel sneller gaan; groeit door tot in je twintiger jaren."},
  {"t": "voorhoofdskwab", "d": "Voorste deel van de hersenen; helpt vooruit denken, afwegen en jezelf inhouden; als laatste uitgerijpt."},
  {"t": "beloningssysteem", "d": "Gebieden diep in de hersenen die reageren op iets leuks of spannends; in de puberteit extra gevoelig, vooral met leeftijdgenoten erbij."},
  {"t": "model 'beloning vooruit, rem later'", "d": "Verklaring voor risicogedrag van pubers (dual-systems-model); omstreden en niet voor elke puber gelijk."},
  {"t": "begeleid rijden", "d": "Vanaf 17 rijexamen doen en tot je 18e alleen rijden met een coach naast je (2toDrive)."},
  {"t": "pedagoog", "d": "Deskundige in opvoeden en opgroeien; adviseert ouders, scholen en jeugdhulp."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
