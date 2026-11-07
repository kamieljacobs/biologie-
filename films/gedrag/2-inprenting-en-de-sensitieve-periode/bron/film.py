import json
film = {
 "slug": "2-inprenting-en-de-sensitieve-periode", "hoofdstuk": "gedrag", "hoofdstukNaam": "Gedrag",
 "title": "Inprenting en de sensitieve periode", "sub": "Waarom vroeg zo veel uitmaakt",
 "puzzle": "Zeven jonge ganzen lopen achter een man aan, ook de vijver in. Hun echte moeder negeren ze. Waarom?",
 "meta": "gedrag · inprenting en sensitieve periodes", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Gedrag · film 2 van 9",
 "lead": "Een jong gansje leert in de eerste uren na het uitkomen wie zijn moeder is: het eerste wat beweegt, geluid maakt en dichtbij is. Dat heet inprenting. Het kan alleen in een kort tijdvenster, een sensitieve periode. Ook mensen hebben sensitieve periodes, bijvoorbeeld bij zien (lui oog) en bij het horen van taalklanken.",
 "endHaak": "welke ervaring in jouw jeugd heeft extra zwaar geteld?",
 "minis": {"Hoofdstuk 1": "Hoe weet een gansje wie zijn moeder is?", "Hoofdstuk 2": "Hebben mensen ook zo'n tijdvenster?", "Recap": "Waarom volgden de gansjes Lorenz?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personage: Noor (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Zeven jonge ganzen lopen achter een man aan en negeren hun echte moeder. Waarom?", "correct": 1, "explain": "Het antwoord zie je in hoofdstuk 1."},
  "q06": {"q": "Een eendje ziet de eerste twee dagen niets. Dan ziet het voor het eerst de nep-eend. Wat doet het?", "correct": 1, "explain": "Na ongeveer anderhalve dag worden eendjes bang voor alles wat nieuw is: de sensitieve periode is voorbij."},
  "q10": {"q": "Een Japanse baby van zes maanden en een van een jaar horen ra en la. Wie hoort het verschil?", "correct": 1, "explain": "Rond een jaar hebben de hersenen zich afgestemd op de klanken van de eigen taal."}
 },
 "glossary": [
  {"t": "inprenting", "d": "Snel leren in een korte periode vlak na de geboorte of het uitkomen, met een effect dat lang blijft, zoals een gansje dat leert wie zijn moeder is."},
  {"t": "sensitieve periode", "d": "Een tijdvenster waarin een bepaalde ervaring veel invloed heeft op het gedrag of de ontwikkeling; daarna veel minder. Ook: gevoelige periode."},
  {"t": "lui oog", "d": "Een oog dat zelf gezond is, maar waarvan de hersenen het beeld weinig gebruiken. Afplakken van het goede oog helpt vooral bij jonge kinderen."},
  {"t": "seksuele inprenting", "d": "vwo · Een jong dier leert hoe een geschikte partner eruitziet; dat bepaalt later naar wie het baltst."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
