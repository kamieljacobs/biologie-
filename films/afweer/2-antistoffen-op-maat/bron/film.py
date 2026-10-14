import json
film = {
 "slug": "2-antistoffen-op-maat", "hoofdstuk": "afweer", "hoofdstukNaam": "Afweer",
 "title": "Antistoffen op maat", "sub": "Hoe je afweer een ziekteverwekker herkent en onthoudt",
 "puzzle": "Sam heeft waterpokken. Zijn zus Noor speelt elke dag met hem, maar wordt niet ziek. Ze had waterpokken toen ze klein was. Hoe kan dat?",
 "meta": "afweer 2/4", "version": "1.0 · oktober 2026", "titleLook": "micro",
 "seriesline": "Biologie bij Kamiel · reeks Bescherming en afweer · film 2 van 4",
 "lead": "Elke B-cel heeft receptoren die op één antigeen passen. Je beenmerg maakt miljoenen soorten B-cellen, al vóór een infectie; de passende wordt gekozen en vermenigvuldigd (klonale selectie), na een startsein van een T-helpercel. Plasmacellen maken antistoffen: die maken virussen onschadelijk, laten ziekteverwekkers samenklonteren en markeren ze voor fagocyten, maar doden zelf niets. Geheugencellen zorgen voor een snellere en sterkere secundaire reactie: je bent immuun.",
 "endHaak": "het lijkt maatwerk, maar de passende B-cel was er al",
 "minis": {"Hoofdstuk 1": "Hoe heeft je lichaam een B-cel die past op een virus dat het nooit zag?", "Hoofdstuk 2": "Wat doen antistoffen precies?", "Hoofdstuk 3": "Waarom word je de tweede keer niet ziek?", "Recap": "Waarom wordt Noor niet ziek?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Noor had waterpokken toen ze klein was. Nu wordt ze niet ziek, hoe vaak ze ook bij Sam zit. Hoe kan dat?", "correct": 0, "explain": "Onthoud je keuze. Het antwoord zie je in hoofdstuk 3 en aan het eind."},
  "q06": {"q": "Je lichaam heeft het waterpokkenvirus nog nooit gezien. Hoe komt het dan toch aan een B-cel die past?", "correct": 0, "explain": "Je beenmerg maakt steeds nieuwe B-cellen, elk met een andere receptor. De passende bestaat dus al; hij wordt alleen gekozen."},
  "q12": {"q": "Er zitten antistoffen vast op een bacterie. Wat gebeurt er dan met die bacterie?", "correct": 1, "explain": "Antistoffen doden zelf niets. Ze markeren de bacterie en laten bacteriën samenklonteren, zodat fagocyten ze makkelijker opeten."},
  "q16": {"q": "Een tijd later kom je hetzelfde virus opnieuw tegen. Hoe ziet de grafiek van de antistoffen er dan uit?", "correct": 0, "explain": "Geheugencellen worden snel plasmacellen: de secundaire afweerreactie komt eerder en is veel hoger. Het virus is opgeruimd voordat je ziek wordt."},
  "q19": {"q": "Je bent immuun voor waterpokken. Toch kun je griep elk jaar opnieuw krijgen. Hoe kan dat?", "correct": 2, "explain": "Door mutaties veranderen de antigenen van het griepvirus steeds een beetje. Je geheugencellen passen dan minder goed. Het waterpokkenvirus verandert bijna niet."}
 },
 "glossary": [
  {"t": "antigeen", "d": "Vormpje op een cel of ziekteverwekker (meestal een stukje eiwit) dat door de afweer herkend kan worden; vreemde antigenen roepen een afweerreactie op."},
  {"t": "lymfocyten", "d": "Witte bloedcellen van de specifieke afweer: B-cellen en T-cellen."},
  {"t": "B-cel", "d": "Lymfocyt met receptoren die op één antigeen passen; wordt na activatie plasmacel of geheugencel."},
  {"t": "receptor", "d": "Eiwit op een cel dat precies op één vormpje (antigeen) past."},
  {"t": "klonale selectie", "d": "De B-cel die past wordt gekozen en deelt vaak: er ontstaat een kloon van gelijke cellen."},
  {"t": "plasmacel", "d": "Cel uit de kloon die antistoffen maakt, zo'n tweeduizend per seconde."},
  {"t": "antistof", "d": "Y-vormig eiwit met twee bindplaatsen dat op één antigeen past; maakt onschadelijk, laat klonteren en markeert voor fagocyten."},
  {"t": "humorale afweer", "d": "Specifieke afweer met antistoffen in bloed en weefselvocht."},
  {"t": "geheugencel", "d": "Langlevende cel uit de kloon die bij een volgende besmetting snel plasmacellen vormt."},
  {"t": "primaire en secundaire afweerreactie", "d": "Eerste reactie: traag (eerste antistoffen na ongeveer een week) en laag. Tweede reactie: binnen enkele dagen en veel sterker."},
  {"t": "immuun", "d": "Een ziekteverwekker komt wel binnen, maar wordt opgeruimd voordat je ziek wordt."},
  {"t": "T-helpercel", "d": "Lymfocyt die B-cellen (en T-killercellen) het startsein geeft als hij hetzelfde antigeen herkent."},
  {"t": "variabel en constant deel", "d": "Een antistof (immunoglobuline) heeft vier ketens; bijna de hele Y is constant, de uiteinden van de armen zijn variabel en vormen de bindplaatsen.", "vwo": True}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
