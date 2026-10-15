import json
film = {
 "slug": "7-hoe-een-plant-groeit", "hoofdstuk": "transport", "hoofdstukNaam": "Transport",
 "title": "Hoe een plant groeit", "sub": "En hoe hij naar het licht buigt",
 "puzzle": "Daan zet een zonnebloempje op de vensterbank. Twee dagen later buigt het naar het raam. Een plant heeft geen ogen en geen spieren: hoe kan hij naar het licht buigen?",
 "meta": "planten · groei en plantenhormonen", "version": "1.0 · oktober 2026", "titleLook": "schema", "alleen": "vwo",
 "seriesline": "Biologie bij Kamiel · Transport · planten",
 "lead": "Een plant groeit alleen in zijn meristemen: in de top van de stengel en in de wortelpunt (lengte) en in het cambium (dikte). Achter de top delen cellen zich, strekken ze zich met water en differentiëren ze. Auxine uit de top maakt de celwand soepel. Bij licht van één kant gaat auxine naar de schaduwkant en buigt de stengel naar het licht (fototropie). Ligt een plant op zijn kant, dan komt auxine aan de onderkant: de stengel buigt omhoog, de wortel omlaag (gravitropie), omdat wortelcellen veel gevoeliger zijn voor auxine.",
 "endHaak": "welke kant strekt meer, en waarom?",
 "minis": {"Hoofdstuk 1": "Waar groeit een plant?", "Hoofdstuk 2": "Hoe wordt een cel zo lang?", "Hoofdstuk 3": "Hoe weten we dat er een stof uit de top komt?", "Hoofdstuk 4": "Waarom buigt de stengel naar het licht?", "Hoofdstuk 5": "Waarom gaat de wortel de andere kant op?", "Hoofdstuk 6": "Welke plantenhormonen zijn er nog?", "Recap": "Hoe buigt een plant zonder ogen en spieren?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personage: Daan (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Een plant heeft geen ogen en geen spieren. Hoe kan het zonnebloempje toch naar het raam buigen?", "correct": 1, "explain": "Onthoud je keuze. Het antwoord zie je in hoofdstuk 4."},
  "q05": {"q": "Je slaat een spijker op één meter hoogte in een jonge boom. Waar zit die spijker tien jaar later?", "correct": 1, "explain": "Een stengel wordt alleen langer bij de top, in het meristeem."},
  "q10": {"q": "Darwin zet een kapje op het topje van een kiemplantje. Buigt het dan nog naar het licht?", "correct": 1, "explain": "Het topje merkt het licht op; het buigen gebeurt lager. Er gaat iets van de top naar beneden."},
  "q15": {"q": "In stengel én wortel zit meer auxine aan de onderkant. Wat doet de wortel?", "correct": 1, "explain": "Wortelcellen zijn veel gevoeliger: bij deze concentratie remt auxine de strekking aan de onderkant."}
 },
 "glossary": [
  {"t": "meristeem", "d": "Groeipunt waar cellen zich blijven delen: in de top van de stengel en in de wortelpunt (lengtegroei)."},
  {"t": "cambium", "d": "Ring van delende cellen in de stengel of stam van houtige planten; zorgt voor diktegroei."},
  {"t": "wortelmutsje", "d": "Laagje cellen dat het meristeem in de wortelpunt beschermt; bevat de statolieten."},
  {"t": "strekking", "d": "Het langer worden van een cel door wateropname in de vacuole; de turgor rekt de soepel gemaakte celwand uit."},
  {"t": "differentiatie", "d": "Cellen krijgen een eigen bouw en taak, bijvoorbeeld als houtvat of bastvat."},
  {"t": "turgor", "d": "De druk van de vacuole en het celvocht tegen de celwand."},
  {"t": "auxine", "d": "Plantenhormoon dat in de top wordt gemaakt en de strekking van cellen regelt; in de stengel bevordert het de strekking, in de wortel remt een hogere concentratie die."},
  {"t": "fototropie", "d": "Groeibeweging naar het licht toe (of ervan af) door ongelijke strekking."},
  {"t": "gravitropie", "d": "Groeibeweging onder invloed van de zwaartekracht: stengel omhoog, wortel omlaag."},
  {"t": "statolieten", "d": "Zware zetmeelkorrels die naar de onderkant van de cel zakken; zo merkt de plant waar onder is."},
  {"t": "gibberelline", "d": "Plantenhormoon voor stengelstrekking en het kiemen van zaden."},
  {"t": "cytokinine", "d": "Plantenhormoon dat celdeling bevordert, vooral in de meristemen."},
  {"t": "abscisinezuur", "d": "Plantenhormoon dat bij droogte de huidmondjes sluit."},
  {"t": "ethyleen", "d": "Gasvormig plantenhormoon dat vruchten laat rijpen."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
