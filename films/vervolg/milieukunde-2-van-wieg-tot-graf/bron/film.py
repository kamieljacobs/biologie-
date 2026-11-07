import json
film = {
 "slug": "milieukunde-2-van-wieg-tot-graf", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Van wieg tot graf", "sub": "de levenscyclusanalyse",
 "puzzle": "Papieren tasje of plastic tas: welke is beter voor het milieu?",
 "meta": "milieukunde · levenscyclusanalyse", "version": "1.0 · november 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Milieukunde",
 "lead": "Thijs loopt snuffelstage bij de omgevingsdienst. De gemeente wil een poster 'Kies papier, beter voor het milieu' en vraagt Milieukundige Iris om het na te rekenen. Je ziet hoe een milieukundige een tas volgt van wieg tot graf (een levenscyclusanalyse), waarom ze klimaat, stikstof, land en water naast elkaar zet en niet optelt, hoe ze de vergelijking eerlijk maakt met een functionele eenheid en het aantal keer gebruiken, waarom twee studies tot een andere uitkomst komen, en wat ze de gemeente uiteindelijk adviseert.",
 "endHaak": "welk ding van elke dag zou jij van wieg tot graf willen volgen?",
 "minis": {"Hoofdstuk 1": "Waar in het leven van een tas zit de milieulast?", "Hoofdstuk 2": "Hoe vergelijk je klimaat met land en water?", "Hoofdstuk 3": "Hoe maak je de vergelijking eerlijk?", "Hoofdstuk 4": "Wat zet je op de poster?", "Recap": "Papier of plastic?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Thijs en Milieukundige Iris (castboek). Getallen uit drie levenscyclusanalyses: Environment Agency (VK) 2011, Miljøstyrelsen (Denemarken) 2018 en TNO 2015, met UNEP 2020 als overzicht. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · november 2026.",
 "questions": {
  "q04": {"q": "Plastic begint als aardolie, papier als boom. Bij welke stap in het leven van een tas komt het meeste broeikasgas vrij?", "correct": 2, "explain": "In het Britse onderzoek kwam het meeste broeikasgas van de grondstof en het maken van de tas, ook bij tasjes die per schip uit China kwamen. Een papieren tasje weegt veel meer: meer materiaal, hout en energie."},
  "q07": {"q": "Bomen groeien weer aan. Hoe scoort een papieren tas op land en water, vergeleken met een plastic tas?", "correct": 0, "explain": "In het Nederlandse onderzoek (TNO 2015) nam de papieren tas honderden keren meer land in en gebruikte hij tientallen keren meer water. Op klimaat en stikstof deed papier het daar juist beter."},
  "q10": {"q": "Twee keer wint plastic, twee keer papier. De gemeente wil één cijfer. Wat doet de milieukundige met haar vier uitkomsten?", "correct": 1, "explain": "Kilo's CO₂ en vierkante meters land kun je niet zomaar optellen: je moet eerst kiezen hoe zwaar elk effect weegt, en dat is een keuze, geen meting. Volgens de norm hoort zo'n eindcijfer niet in een openlijke vergelijking."},
  "q14": {"q": "Een papieren tasje zit na drie tot vier keer gebruik gelijk op klimaat. Hoe vaak moet een katoenen tas mee om gelijk te spelen met één dun plastic tasje?", "correct": 2, "explain": "Katoen telen kost veel land, water en energie. Volgens de milieuorganisatie van de VN (UNEP 2020) moet een katoenen tas 50 tot 150 keer mee om op klimaat gelijk te komen."},
  "q17": {"q": "Een Brits en een Deens onderzoek komen tot een andere uitkomst voor het papieren tasje. Wat doet de milieukundige?", "correct": 0, "explain": "Ze legt de aannames naast elkaar: afval storten of verbranden (met energie), en hoe zwaar de tassen waren. Geen van beide studies heeft het fout; ze maakten andere keuzes en schreven die op."},
  "q20": {"q": "De gemeente wil een poster. Wat adviseert de milieukundige?", "correct": 1, "explain": "Geen tas wint op alle milieueffecten; wat het meeste scheelt, is hoe vaak je een tas gebruikt. De beste tas is de tas die je al hebt. Wil de gemeente toch zeggen dat papier beter is, dan moet de analyse eerst door anderen worden nagekeken."}
 },
 "glossary": [
  {"t": "milieukunde", "d": "Het vak dat onderzoekt hoe de mens het milieu verandert (bodem, water, lucht, levende wezens) en hoe je dat meet, beoordeelt en oplost."},
  {"t": "levenscyclusanalyse", "d": "Een product volgen van wieg tot graf: grondstof, maken, vervoer, gebruik en afval. Per stap noteer je wat erin gaat (grondstoffen, energie, water) en wat eruit komt (uitstoot, afval), en je rekent uit welke milieueffecten dat geeft. Afgekort: LCA."},
  {"t": "van wieg tot graf", "d": "Het hele leven van een product, van het winnen van de grondstof tot het afval. In het Engels: cradle to grave."},
  {"t": "milieueffect", "d": "Een soort schade aan het milieu, met een eigen eenheid: bijvoorbeeld klimaat (kg CO₂), stikstof naar zee (kg N), land (m² per jaar) en water (liter). Een rekenmethode als ReCiPe kent er zo'n achttien."},
  {"t": "CO₂-equivalent", "d": "Andere broeikasgassen, zoals methaan, omgerekend naar de hoeveelheid CO₂ die evenveel opwarming geeft. Zo kun je alle broeikasgassen in kilo's CO₂ uitdrukken."},
  {"t": "weging", "d": "Kiezen hoe zwaar elk milieueffect telt, zodat je ze tot één eindcijfer kunt optellen. Dat is een waardekeuze, geen meting; volgens de ISO-norm hoort zo'n eindcijfer niet in een openbare vergelijking."},
  {"t": "functionele eenheid", "d": "Wat een product moet doen, als vaste maat voor de vergelijking. Bijvoorbeeld: een maand boodschappen naar huis dragen (483 dingen: 82 dunne plastic of 65 papieren tasjes in het Britse onderzoek)."},
  {"t": "aanname", "d": "Een keuze die je in een analyse maakt omdat je het niet precies weet of moet kiezen: hoe zwaar een tas is, of het afval gestort of verbrand wordt, hoe vaak iemand een tas gebruikt. Een goede analyse schrijft haar aannames op."},
  {"t": "kritische toets", "d": "Een analyse die openlijk zegt dat het ene product beter is dan het andere, hoort volgens de ISO-norm eerst door onafhankelijke deskundigen te worden nagekeken."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
