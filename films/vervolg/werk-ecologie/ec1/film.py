import json
film = {
 "slug": "ecologie-1-tellen-in-het-veld", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Tellen in het veld", "sub": "hoe ecologen populaties meten",
 "puzzle": "Hoeveel wolven leven er op de Veluwe, als je ze bijna nooit ziet?",
 "meta": "ecologie en natuurbeheer · mbo, hbo en wo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Ecologie en natuurbeheer",
 "lead": "Daan loopt snuffelstage bij een natuurbeheerder. Hij wil een wolf zien, maar ecoloog Bas laat hem eerst tellen. Met vangen, merken en terugvangen schat je hoe groot een populatie is: aantal ≈ gemerkt × gevangen ÷ teruggevangen, zolang gemerkte dieren even makkelijk te vangen zijn en er niemand bij komt of weggaat. Vrijwilligers lopen elke week dezelfde telroute (een transect): dat geeft geen totaal, maar een index waarmee je de jaren vergelijkt. Wolven tel je aan wat ze achterlaten: elk nieuw DNA-profiel uit een keutel is een wolf, dus het aantal is een minimum. Omgevings-DNA uit water zegt óf een soort er was, niet hoeveel. En meer gevonden is niet vanzelf meer dieren: een trend heeft een marge.",
 "endHaak": "hoe kan een voedingsstof soorten van de heide laten verdwijnen?",
 "minis": {"Hoofdstuk 1": "Hoe tel je vlinders die je niet allemaal kunt vangen?",
           "Hoofdstuk 2": "Waarom loopt een vrijwilliger elk jaar precies dezelfde route?",
           "Hoofdstuk 3": "Hoe tel je wolven die je bijna nooit ziet?",
           "Hoofdstuk 4": "Betekent meer gevonden ook meer dieren?",
           "Recap": "Hoeveel wolven leven er op de Veluwe?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Daan en Ecoloog Bas (castboek; Bas is een voorstel). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Wolven zie je bijna nooit. Hoe tellen ecologen hoeveel wolven er in een gebied leven?", "correct": 2,
          "explain": "Ecologen lezen sporen: vooral het DNA uit keutels. Elk verschillend DNA-profiel is een andere wolf. Een camera ziet hoeveel wolven er tegelijk langskomen, maar zelden wélke wolf het is; en hoe vaak mensen een wolf zien, zegt weinig over het aantal."},
  "q07": {"q": "Gemerkte vlinders worden na het merken schuw. Wat doet dat met de schatting van het aantal vlinders?", "correct": 1,
          "explain": "Je vangt dan minder gemerkte vlinders terug, dus lijkt een kleiner deel van de populatie gemerkt. Met 3 in plaats van 6 geeft de som 40 × 30 ÷ 3 = 400: twee keer te veel."},
  "q12": {"q": "De vrijwilliger wil volgend jaar een mooiere route lopen, langs de bloemen. Is dat een goed idee?", "correct": 0,
          "explain": "Langs de bloemen zie je meer vlinders, ook als er niet meer zijn. Dan kun je dit jaar niet meer vergelijken met vorige jaren. Monitoring werkt alleen als je steeds op dezelfde manier meet."},
  "q16": {"q": "In acht keutels vindt het lab drie verschillende DNA-profielen. Hoeveel wolven leven er in het gebied?", "correct": 2,
          "explain": "Eén wolf laat veel keutels achter, dus acht keutels kunnen van drie wolven zijn. Een wolf van wie je niets vindt, telt niet mee. Drie is daarom een minimum: er kunnen er meer zijn."},
  "q20": {"q": "In 2025 vond het lab 131 verschillende wolven in Nederland, in 2024 waren het er 101. Wat mag je daaruit concluderen?", "correct": 1,
          "explain": "131 is het aantal verschillende profielen in één jaar: een minimum. Wordt er harder gezocht of komen er meer monsters binnen, dan vind je meer wolven, ook als het aantal gelijk blijft. Of dertig verschil 'genoeg' is, hangt af van de marge, niet van het getal alleen."}
 },
 "glossary": [
  {"t": "populatie", "d": "Alle individuen van één soort in één gebied."},
  {"t": "vangen, merken en terugvangen", "d": "Je vangt een aantal dieren, merkt ze en laat ze vrij; later vang je opnieuw. Het aandeel gemerkte dieren in de tweede vangst is ongeveer het aandeel in de hele populatie: aantal ≈ gemerkt × gevangen ÷ teruggevangen. Werkt alleen als gemerkte dieren even makkelijk te vangen zijn en er niemand bij komt of weggaat."},
  {"t": "transect", "d": "Een vaste telroute die je steeds op dezelfde manier loopt; je telt alleen wat in een vaste strook (bij vlinders een denkbeeldige doos van vijf meter breed en vijf meter vooruit) te zien is."},
  {"t": "proefvlak", "d": "Een vast vierkant (bijvoorbeeld tien bij tien meter) waarin je alles telt."},
  {"t": "index", "d": "Een getal waarmee je jaren met elkaar vergelijkt, bijvoorbeeld 1992 = 100. Het is geen totaal aantal dieren."},
  {"t": "monitoring", "d": "Steeds op dezelfde manier herhaald meten, zodat je een verandering kunt zien."},
  {"t": "DNA-profiel", "d": "Het patroon van herhalingen op een aantal plekken in het DNA; bij elk individu anders (zie de film DNA lezen). Bij wolven gemaakt uit DNA in keutels, haren of speeksel."},
  {"t": "omgevings-DNA (eDNA)", "d": "DNA dat dieren in water of bodem achterlaten (huidcellen, slijm, poep). Het laat zien óf een soort er de afgelopen weken was, niet hoeveel dieren."},
  {"t": "trend", "d": "De richting waarin een aantal over meerdere jaren gaat, met een marge van onzekerheid."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
