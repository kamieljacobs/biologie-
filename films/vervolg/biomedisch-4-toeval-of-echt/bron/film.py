import json
film = {
 "slug": "biomedisch-4-toeval-of-echt", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Toeval of echt?", "sub": "statistiek in de biologie",
 "puzzle": "De nieuwe meststof gaf gemiddeld 3 cm langere planten. Is dat echt, of toeval?",
 "meta": "biomedische wetenschappen · bio-informatica", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Biomedische wetenschappen en Bio-informatica",
 "lead": "Opa Henk zweert bij zijn nieuwe meststof, en Noor test het met twintig tomatenplantjes: gemiddeld 3 centimeter langer. Echt, of toeval? Een gemiddelde zegt pas iets samen met de spreiding. Hoe meer plantjes, hoe minder het gemiddelde wiebelt, maar elk extra plantje helpt minder. De p-waarde vertelt hoe vaak je een minstens zo groot verschil krijgt als de meststof niets doet; het is niet de kans dat de meststof niets doet. Tot slot reken je het zelf na, in een spreadsheet of met een paar regels Python.",
 "endHaak": "welke bewering uit de reclame of het nieuws zou jij zo willen narekenen?",
 "minis": {"Hoofdstuk 1 — Spreiding": "Wanneer is 3 cm verschil veel?", "Hoofdstuk 2 — Hoeveel plantjes?": "Hoeveel plantjes maken de wiebel half zo groot?", "Hoofdstuk 3 — Wat de p-waarde zegt": "Wat betekent p = 0,04 precies?", "Hoofdstuk 4 — Zelf rekenen": "Hoe doe je een t-toets in een spreadsheet?", "Recap": "Wat weet Noor nu wel en niet?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Opa Henk, Noor, Daan en Dr. Kim (castboek). Getallen nagerekend met Python (scipy). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Met meststof gemiddeld 43 cm, zonder 40 cm. Weet je nu genoeg?", "correct": 1, "explain": "Nee: of 3 cm veel is, hangt af van hoeveel de plantjes binnen een groep van elkaar verschillen (de spreiding)."},
  "q06": {"q": "Hoeveel plantjes per groep maken de standaardfout half zo groot (nu tien)?", "correct": 0, "explain": "Veertig: de standaardfout is de standaardafwijking gedeeld door √n, en √4 = 2. Vier keer zoveel metingen geeft een half zo grote wiebel."},
  "q09": {"q": "Husselen van de stickers geeft p ≈ 0,04. Wat betekent dat?", "correct": 2, "explain": "Als de meststof niets doet, krijg je maar in ongeveer 4 van de 100 verdelingen een verschil van 3 cm of meer. Het is geen kans dat de meststof wel of niet werkt."}
 },
 "glossary": [
  {"t": "gemiddelde", "d": "De som van de metingen gedeeld door het aantal; zegt alleen iets samen met de spreiding."},
  {"t": "spreiding", "d": "Hoe ver de metingen uit elkaar en van hun gemiddelde liggen."},
  {"t": "standaardafwijking", "d": "Maat voor de spreiding: een soort gemiddelde afstand van de metingen tot hun gemiddelde (iets groter dan de gewone gemiddelde afstand). Bij Noor ± 3 cm."},
  {"t": "standaardfout", "d": "Hoeveel een gemiddelde wiebelt als je de proef herhaalt: standaardafwijking gedeeld door √n."},
  {"t": "nulhypothese", "d": "De aanname dat er geen effect is (de meststof doet niets); de p-waarde wordt uitgerekend alsof die klopt."},
  {"t": "p-waarde", "d": "De kans op een verschil dat minstens zo groot is als gemeten, als de nulhypothese klopt. Niet de kans dat de nulhypothese waar is, en geen maat voor de grootte van het effect."},
  {"t": "significant", "d": "p kleiner dan een vooraf gekozen grens, in de biologie meestal 0,05; zegt niets over hoe groot of belangrijk een effect is."},
  {"t": "betrouwbaarheidsinterval", "d": "Bereik van waarden voor het echte gemiddelde of verschil dat bij de metingen past; bij 95 % vangt de methode bij herhaling in 95 van de 100 proeven de echte waarde."},
  {"t": "t-toets", "d": "Toets die het verschil tussen twee gemiddelden vergelijkt met de standaardfout van dat verschil; in een spreadsheet met T.TEST, in Python met scipy.stats.ttest_ind."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
