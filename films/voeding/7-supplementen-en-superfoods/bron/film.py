import json
film = {
 "slug": "7-supplementen-en-superfoods", "hoofdstuk": "voeding", "hoofdstukNaam": "Voeding",
 "title": "Supplementen en superfoods", "sub": "Wat je lichaam echt nodig heeft, en hoe je een claim toetst",
 "puzzle": "Opa slikt elke dag een tablet vitamine C. Hij is al jaren niet verkouden geweest. Bewijst dat dat vitamine C werkt?",
 "meta": "voeding 7/7", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Voeding · film 7 van 7",
 "lead": "Wie gevarieerd eet, krijgt bijna alle vitaminen en mineralen binnen. Een supplement is zinvol voor bepaalde groepen: vitamine D (o.a. jonge kinderen, donkere huid, weinig buiten, 70+), B12 bij veganisten, foliumzuur rond de bevruchting, ijzer bij een tekort. Meer is niet beter: vetoplosbare vitaminen stapelen zich op, en losse bètacaroteenpillen gaven rokers meer longkanker. Een claim toets je met een controlegroep, loting, placebo en dubbelblind onderzoek, en je kijkt naar de grootte van het effect en wie betaalde.",
 "endHaak": "vergeleken met wat, hoeveel effect, en wie betaalde?",
 "minis": {"Hoofdstuk 1": "Wie heeft echt iets aan een supplement?", "Hoofdstuk 2": "Kan meer ook kwaad?", "Hoofdstuk 3": "Hoe weet je of een claim klopt?", "Hoofdstuk 4": "Creatine, vitamine D, B3, NMN en magnesium: wat is bewezen?", "Recap": "Bewijst opa dat vitamine C werkt?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Opa is al jaren niet verkouden geweest en slikt elke dag vitamine C. Is dat het bewijs dat vitamine C werkt?", "correct": 1, "explain": "Onthoud je keuze. Het antwoord zie je aan het eind."},
  "q06": {"q": "Wie heeft het meeste aan een supplement met vitamine B12?", "correct": 2, "explain": "B12 zit bijna alleen in dierlijke producten. Wie veganistisch eet, krijgt het nauwelijks binnen."},
  "q09": {"q": "Iemand slikt maandenlang veel meer dan de aanbevolen hoeveelheid. Bij welke vitamine loopt hij het meeste risico?", "correct": 0, "explain": "Vitamine D (net als A, E en K) lost op in vet en stapelt zich op. Een teveel aan vitamine C plas je uit."},
  "q15": {"q": "Dagelijks vitamine C maakt een verkoudheid gemiddeld een halve dag korter, maar je wordt niet minder vaak verkouden. Wat zeg je dan?", "correct": 1, "explain": "Het effect komt in veel onderzoeken terug, dus het is echt. Maar het is klein."},
  "q19": {"q": "Zonder pil kregen ongeveer 3 op de 100 rokers longkanker; met bètacaroteen 18 % meer. Hoeveel is dat?", "correct": 2, "explain": "18 % van 3 is ongeveer 0,5: ongeveer 3,5 op de 100. Relatief 18 %, absoluut een half op de honderd."},
  "q25": {"q": "Niacine en NMN worden in je cellen allebei NAD+. Waarom staat de ene claim op weerlegd en de andere op hypothese?", "correct": 0, "explain": "Het vak zegt hoe goed een claim getest is. Niacine is in grote, lange proeven getest en hielp niet; NMN is bij mensen nooit lang getest."}
 },
 "glossary": [
  {"t": "supplement", "d": "Pil, poeder of druppels met extra vitaminen, mineralen of andere stoffen naast je gewone eten."},
  {"t": "vitamine D", "d": "Gemaakt in de huid onder invloed van zonlicht; nodig voor de opname van calcium (sterke botten). Advies voor o.a. jonge kinderen, zwangeren, donkere huid, weinig buiten, vrouwen vanaf 50, iedereen vanaf 70."},
  {"t": "vitamine B12", "d": "Zit bijna alleen in dierlijke producten; supplement aanbevolen bij veganistisch eten."},
  {"t": "foliumzuur", "d": "Vitamine die de kans op een open ruggetje verkleint; advies vanaf 4 weken vóór tot 8 weken na de bevruchting."},
  {"t": "wateroplosbaar en vetoplosbaar", "d": "Een teveel aan wateroplosbare vitaminen (zoals C) plas je meestal uit; vetoplosbare (A, D, E, K) stapelen zich op in lever en vetweefsel."},
  {"t": "gezondheidsclaim", "d": "Bewering op een verpakking over een effect op de gezondheid; in de EU alleen toegestaan als die getoetst en goedgekeurd is."},
  {"t": "controlegroep", "d": "Groep die alles krijgt behalve het middel dat je test (bijvoorbeeld een placebo), om mee te vergelijken."},
  {"t": "placebo en placebo-effect", "d": "Nep-pil die er hetzelfde uitziet als de echte; ook daarvan voelen mensen zich vaak beter."},
  {"t": "dubbelblind", "d": "Deelnemers én onderzoekers weten niet wie de echte pil krijgt."},
  {"t": "effectgrootte", "d": "Hoe groot het verschil tussen proefgroep en controlegroep is; een echt effect kan klein zijn."},
  {"t": "relatief en absoluut risico", "d": "Relatief: hoeveel procent méér dan het risico dat er al was. Absoluut: hoeveel mensen per 100 of 1000 het extra treft.", "vwo": True},
  {"t": "meta-analyse", "d": "Overzicht dat de resultaten van alle goede onderzoeken samen weegt.", "vwo": True}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
