import json
film = {
 "slug": "voedingsleer-2-waarom-afvallen-zo-moeilijk-is", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Waarom afvallen zo moeilijk is", "sub": "energiebalans, honger en verzadiging",
 "puzzle": "Je eet een tijd minder. Waarom gaat je gewicht daarna toch weer omhoog?",
 "meta": "voeding en diëtetiek · energiebalans en honger", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Voeding en diëtetiek",
 "lead": "Joost eet een tijd minder en zijn riem gaat een gaatje strakker. Maar zijn trek wordt steeds groter, en maanden later zit de riem weer bijna in het oude gaatje. Diëtist Hanneke legt uit waarom: je lichaam verbruikt energie vooral in rust, de body mass index zegt niet alles (spieren tellen mee, en het gaat er ook om waar het vet zit), en honger is een samenspel van signalen uit maag, darm en vet die de hersenen verwerken. Na afvallen maakt het lichaam meer trek en verbruikt het wat minder. Dat is biologie, geen schuld. Wat helpt, is wat je lang volhoudt.",
 "endHaak": "Welke kleine verandering zou jij een jaar lang kunnen volhouden?",
 "minis": {"Hoofdstuk 1": "Waar gaat de meeste energie naartoe?", "Hoofdstuk 2": "Wat zegt de body mass index wel en niet?", "Hoofdstuk 3": "Waar komt honger vandaan?", "Hoofdstuk 4": "Wat helpt bij het volhouden?", "Recap": "Waarom komt gewicht terug na minder eten?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Diëtist Hanneke, Joost, Noor, Dennis en Erik (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Joost eet een tijd minder en valt af. Maanden later zit zijn riem weer bijna in het oude gaatje. Hoe kan dat?", "correct": 1, "explain": "Na het afvallen maakt zijn lichaam meer trek en verbruikt het wat minder. Dan eet je al snel weer meer dan je nodig hebt."},
  "q07": {"q": "Waar gaat de meeste energie van je lichaam naartoe?", "correct": 2, "explain": "Naar de ruststofwisseling: ongeveer twee derde. Verteren kost ongeveer een tiende; bewegen is bij de meeste mensen een kleiner deel dan de ruststofwisseling."},
  "q13": {"q": "Twee volwassenen hebben allebei een body mass index van 26. De een traint veel, de ander niet. Wat weet je dan zeker?", "correct": 2, "explain": "Alleen dat hun gewicht en lengte dezelfde verhouding hebben. Spieren wegen mee, en de index zegt niet waar het vet zit; vet in de buik geeft een grotere kans op ziekten."},
  "q17": {"q": "Waar komt honger vandaan?", "correct": 1, "explain": "Uit een samenspel van signalen: ghreline uit de maag geeft trek, een volle maag en darm geven een signaal van genoeg, en leptine uit vetcellen meldt hoeveel voorraad er is. De hypothalamus en de hersenstam verwerken ze."},
  "q21": {"q": "Joost is afgevallen tot het gewicht van zijn buurman. Wie verbruikt per dag meer energie?", "correct": 1, "explain": "De buurman, ook al wegen ze evenveel: na afvallen verbruikt het lichaam gemiddeld wat minder, vooral doordat de spieren zuiniger werken. Hoeveel precies, daarover verschillen onderzoekers."},
  "q27": {"q": "Twaalf jonge mannen sliepen twee nachten maar vier uur. Wat veranderde er in hun hormonen?", "correct": 0, "explain": "Er was meer ghreline en minder leptine, en de mannen hadden meer trek. Te weinig slaap kan de trek vergroten."}
 },
 "glossary": [
  {"t": "energiebalans", "d": "De verhouding tussen de energie die je binnenkrijgt met voedsel en de energie die je verbruikt."},
  {"t": "ruststofwisseling", "d": "De energie die je lichaam in rust verbruikt om in leven te blijven (basaal metabolisme); ongeveer twee derde van wat je verbruikt."},
  {"t": "BMI (body mass index)", "d": "Lichaamsgewicht in kilogram gedeeld door de lengte in meter in het kwadraat. Bij volwassenen: onder 18,5 ondergewicht, 18,5 tot 25 gezond."},
  {"t": "overgewicht en obesitas", "d": "Overgewicht: BMI 25 of hoger (volwassenen); obesitas: BMI 30 of hoger. Voor jongeren onder de 18 gelden andere grenzen."},
  {"t": "middelomtrek", "d": "De omtrek van je middel, gemeten met een meetlint. Zegt iets over vet in de buik; bij volwassen mannen is het risico groter vanaf 94 cm, bij vrouwen vanaf 80 cm."},
  {"t": "ghreline", "d": "Hormoon uit de maag dat trek geeft; het stijgt vlak voor het eten en daalt daarna."},
  {"t": "leptine", "d": "Hormoon uit vetcellen: hoe meer vet, hoe meer leptine. Het meldt de hersenen hoeveel voorraad er is; minder leptine geeft meer trek."},
  {"t": "verzadiging", "d": "Het gevoel dat je genoeg gegeten hebt; komt onder andere door een volle, uitgerekte maag en hormonen uit de darm."},
  {"t": "hypothalamus", "d": "Deel van de hersenen dat, samen met de hersenstam, de signalen over honger, verzadiging en voorraad verwerkt."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
