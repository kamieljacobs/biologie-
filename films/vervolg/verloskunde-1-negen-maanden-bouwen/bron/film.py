import json
film = {
 "slug": "verloskunde-1-negen-maanden-bouwen", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Negen maanden bouwen", "sub": "van intake tot rijpe longen",
 "puzzle": "Waarom moet je al foliumzuur slikken voordat je weet dat je zwanger bent?",
 "meta": "verloskunde · ontwikkeling van het kind", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Verloskunde",
 "lead": "Esra is zeven weken zwanger en heeft haar eerste afspraak bij Verloskundige Mirjam. Wat vraagt en adviseert een verloskundige bij de intake, en wat gebeurt er intussen in de buik? Van drie kiembladen en de kwetsbare weken van de orgaanvorming tot de longen die als laatste klaar zijn.",
 "endHaak": "wat zou jij een zwangere vriendin aanraden, en waarom?",
 "minis": {"Hoofdstuk 1": "Waarom komt het foliumzuuradvies zo vroeg?", "Hoofdstuk 2": "Welke organen komen uit welk kiemblad?", "Hoofdstuk 3": "Waarom zijn week 3 tot 8 het kwetsbaarst?", "Hoofdstuk 4": "Waarom heeft een te vroeg geboren kind moeite met ademen?", "Recap": "Wat doet Mirjam in deze weken vooral?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Verloskundige Mirjam en Esra (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Waarom adviseert de verloskundige foliumzuur al vóór de zwangerschap?", "correct": 0, "explain": "Het ruggetje (de neurale buis) sluit al ongeveer vier weken na de bevruchting, vaak voordat je weet dat je zwanger bent."},
  "q15": {"q": "Waarom geeft een stof die de aanleg van armen verstoort twintig weken na de bevruchting veel minder kans op schade dan vijf weken erna?", "correct": 1, "explain": "In week 20 zijn de armen al aangelegd; ze groeien alleen nog. De kwetsbare periode voor de aanleg ligt in week 3 tot 8 na de bevruchting."},
  "q20": {"q": "Waarom krijgt de moeder de longrijpingsprik, en niet de baby na de geboorte?", "correct": 2, "explain": "Het hormoon gaat via de placenta naar het kind en zet de productie van surfactant aan; dat duurt een tot twee dagen en moet dus vóór de geboorte beginnen."}
 },
 "glossary": [
  {"t": "intake", "d": "Eerste afspraak bij de verloskundige: termijn bepalen, vragen naar gezondheid, medicijnen en leefstijl, adviezen en een bloedtest."},
  {"t": "zwangerschapsduur", "d": "Gerekend vanaf de eerste dag van de laatste menstruatie; de bevruchting is ongeveer twee weken later. Een zwangerschap duurt zo gerekend ongeveer veertig weken."},
  {"t": "neurale buis", "d": "Buis op de rug van het embryo waaruit hersenen en ruggenmerg groeien; sluit ongeveer vier weken na de bevruchting. Sluit hij niet, dan ontstaat een open ruggetje."},
  {"t": "foliumzuur", "d": "Vitamine B11; slikken vanaf vóór de zwangerschap verkleint de kans op een open ruggetje."},
  {"t": "alles-of-niets-principe", "d": "In de eerste twee weken na de bevruchting herstelt een beschadigd embryo helemaal, of het overleeft niet."},
  {"t": "kiembladen", "d": "Drie cellagen in het jonge embryo: buitenste (huid, zenuwstelsel), middelste (spieren, botten, hart, bloed) en binnenste (darmkanaal, longen, lever)."},
  {"t": "organogenese", "d": "Het aanleggen van de organen, ongeveer week 3 tot 8 na de bevruchting; de kwetsbaarste periode voor schadelijke stoffen en infecties."},
  {"t": "foetus", "d": "Het kind vanaf ongeveer acht weken na de bevruchting, als alle organen zijn aangelegd en vooral nog groeien en rijpen."},
  {"t": "surfactant", "d": "Stof in de longblaasjes die de oppervlaktespanning van het waterlaagje verlaagt, zodat de blaasjes bij het uitademen open blijven; wordt pas in de laatste maanden gemaakt."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
