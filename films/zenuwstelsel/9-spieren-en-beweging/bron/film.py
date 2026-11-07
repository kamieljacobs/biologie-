import json
film = {
 "slug": "9-spieren-en-beweging", "hoofdstuk": "zenuwstelsel", "hoofdstukNaam": "Regeling",
 "title": "Spieren en beweging", "sub": "Hoe tilt dezelfde biceps een veertje én een volle tas?",
 "puzzle": "Plakkers op Noors bovenarm meten hoe actief haar biceps is. Hij tilt een veertje én een volle schooltas. Hoe doseert één spier zoveel verschil?",
 "meta": "zenuwstelsel · spieren en beweging", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Zenuwstelsel · film 9",
 "lead": "Een practicum bij mevrouw Visser draagt de film. Een armmodel laat zien dat een spier alleen kan trekken, en dat je daarom een buigspier én een strekspier nodig hebt. Daarna gaat het over bot en gewricht, over hoe een spier korter wordt doordat actine en myosine over elkaar schuiven, en over wat plakkers op Noors arm meten: hoe je zenuwstelsel de kracht doseert met motorische eenheden. In de vwo-stand ook de kruisbruggencyclus, de frequentie van de impulsen en de rekreflex.",
 "endHaak": "voel bij het optillen van je eigen tas welke spier hard wordt, en welke ontspant?",
 "minis": {"Hoofdstuk 1": "Is bot levend, en hoe zit een gewricht in elkaar?", "Hoofdstuk 2": "Kan een spier duwen?", "Hoofdstuk 3": "Hoe wordt een spier korter?", "Hoofdstuk 4": "Hoe doseer je kracht?", "Recap": "Wat moet je onthouden?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Noor, Sam en mevrouw Visser (castboek). Stijl: Part C. Versie 1.0 · oktober 2026 (prompt v10).",
 "questions": {
  "q03": {"q": "Bij de tas wordt het signaal van de biceps veel groter. Wat gebeurt er vooral in de spier?", "correct": 1, "explain": "Er gaan meer spiervezels meedoen: je zenuwstelsel schakelt steeds meer motorische eenheden in. Een spier kan niet duwen, en de vezels worden niet dikker."},
  "q07": {"q": "Bot voelt hard, als steen. Is bot eigenlijk levend weefsel?", "correct": 0, "explain": "Ja: er lopen bloedvaten door bot, en er zitten cellen in die bot afbreken en opbouwen. Daarom groeit een breuk weer dicht."},
  "q11": {"q": "Welk gewricht in je lichaam kan alle kanten op draaien?", "correct": 1, "explain": "De heup (en de schouder): een kogelgewricht, met een bolle kop in een kom. Knie en elleboog zijn scharniergewrichten."},
  "q15": {"q": "Noor duwt het touwtje van het armmodel terug. Wat doet de onderarm?", "correct": 2, "explain": "Er gebeurt niets: het touwtje knikt. Met een touw kun je niet duwen, en een spier kan alleen korter worden: alleen trekken."},
  "q19": {"q": "Noor strekt haar arm met haar hand op de tafel. Welke spier is actief?", "correct": 0, "explain": "De triceps: die trekt aan de onderarm achter de elleboog en strekt zo de arm. Haar hand duwt, maar de spier trekt."},
  "q25": {"q": "Een spier trekt samen en wordt korter. Hoe komt dat?", "correct": 2, "explain": "De actine- en myosinedraden schuiven verder over elkaar; de draden zelf blijven even lang."},
  "q34": {"q": "Met welke spier kun je in heel kleine stapjes bewegen?", "correct": 0, "explain": "Met een oogspier: daar hoort een zenuwcel bij maar een paar vezels. Kleine eenheden geven fijne stapjes."},
  "q39": {"q": "Sam laat onverwacht een boek in de tas vallen. Wat gebeurt er als eerste in de biceps?", "correct": 2, "explain": "Hij trekt meteen samen via het ruggenmerg: een rekreflex. Spierspoeltjes meten de plotselinge rek; dat gaat sneller dan via de hersenen."}
 },
 "glossary": [
  {"t": "skelet", "d": "Alle botten samen; het draagt je, beschermt organen en is het aanhechtingspunt voor spieren."},
  {"t": "bot", "d": "Levend weefsel met botcellen en bloedvaten; kalkzouten maken het hard, collageen een beetje buigzaam."},
  {"t": "rood beenmerg", "d": "Weefsel in bot waar bloedcellen worden gemaakt."},
  {"t": "kraakbeen", "d": "Glad, veerkrachtig weefsel zonder bloedvaten, zachter dan bot; bekleedt de botuiteinden in een gewricht."},
  {"t": "gewricht", "d": "Plek waar twee botten ten opzichte van elkaar bewegen: gewrichtskop, gewrichtskom, kraakbeen, gewrichtskapsel met gewrichtssmeer, gewrichtsbanden."},
  {"t": "kogelgewricht", "d": "Gewricht met een bolle kop in een kom; kan alle kanten op draaien (schouder, heup)."},
  {"t": "scharniergewricht", "d": "Gewricht dat alleen kan buigen en strekken (elleboog, knie)."},
  {"t": "pees", "d": "Taai koord van bindweefsel dat een spier aan een bot vastmaakt."},
  {"t": "buigspier en strekspier", "d": "Spieren met tegengestelde bewegingen, bijvoorbeeld biceps (buigt de elleboog) en triceps (strekt hem)."},
  {"t": "antagonisten", "d": "Twee spieren die tegengestelde bewegingen maken; een spier kan alleen trekken."},
  {"t": "spiervezel", "d": "Eén lange spiercel met veel kernen, ontstaan doordat veel cellen samensmolten."},
  {"t": "myofibril", "d": "Dunne draad in een spiervezel met actine- en myosinedraden die half in elkaar grijpen."},
  {"t": "actine en myosine", "d": "Eiwitdraden in de spier: dun (actine) en dik (myosine). Bij samentrekken schuiven ze verder over elkaar."},
  {"t": "ATP", "d": "Energiedrager; bij elke trek laat een myosinekop met ATP los en spant hij zich opnieuw."},
  {"t": "motorische zenuwcel", "d": "Zenuwcel die een spier een impuls geeft; ook wel bewegingszenuwcel (vwo: motorisch neuron)."},
  {"t": "motorische eindplaat", "d": "Plek waar een takje van een motorische zenuwcel op een spiervezel eindigt en acetylcholine afgeeft."},
  {"t": "motorische eenheid", "d": "Eén motorische zenuwcel met alle spiervezels die hij bedient; meer eenheden tegelijk = meer kracht."},
  {"t": "sarcomeer", "d": "vwo · Stukje myofibril tussen twee Z-lijnen, ongeveer 2 µm; wordt korter bij samentrekken."},
  {"t": "sarcoplasmatisch reticulum", "d": "vwo · Netwerk van buisjes en zakjes rond de myofibrillen dat calciumionen opslaat en afgeeft."},
  {"t": "troponine en tropomyosine", "d": "vwo · Eiwitten op de actine; calcium bindt aan troponine, waardoor tropomyosine opzij schuift en myosine kan binden."},
  {"t": "kruisbrug", "d": "vwo · Een myosinekop die aan actine vastzit; maakt de krachtslag."},
  {"t": "frequentie", "d": "vwo · Aantal impulsen per seconde; snel opeenvolgende trekkingen tellen op tot meer kracht."},
  {"t": "spierspoeltje", "d": "vwo · Zintuig in de spier dat meet hoe ver en hoe snel de spier wordt uitgerekt."},
  {"t": "rekreflex", "d": "vwo · Reflex waarbij een plotseling uitgerekte spier via het ruggenmerg meteen samentrekt (bijv. de kniepeesreflex)."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
