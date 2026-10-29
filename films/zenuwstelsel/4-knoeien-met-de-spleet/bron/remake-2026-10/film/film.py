import json
film = {
 "slug": "4-knoeien-met-de-spleet-nieuw", "audiomap": "4-knoeien-met-de-spleet", "hoofdstuk": "regeling", "hoofdstukNaam": "Regeling",
 "title": "Knoeien met de synaps", "sub": "Wat koffie, wijn en medicijnen doen in de synaps",
 "puzzle": "'s Ochtends maakt koffie je wakker, 's avonds maakt wijn je losser en trager. Allebei werken ze in dezelfde spleet. Hoe kan dat zo verschillend uitpakken?",
 "meta": "zenuwstelsel · film 4", "version": "2.0 · 29 oktober 2026", "titleLook": "schema", "alleen": "vwo",
 "seriesline": "Biologie bij Kamiel · Zenuwstelsel · film 4 · 5 vwo",
 "lead": "Elke stof die je stemming of gedrag verandert, grijpt in op één van vier plekken in de synaps: de afgifte, de receptor, het opruimen of de aanmaak. Koffie en wijn zijn de ingang; daarna komen nicotine, een SSRI en levodopa op de ingreepkaart. Tot slot: hoe een cel zich aanpast (gewenning en ontwenning) en wat het beloningssysteem met verslaving te maken heeft.",
 "endHaak": "welke plek op de kaart raakt de laatste stof die jij nam: koffie, thee of cola?",
 "minis": {"Hoofdstuk 1": "Waar kan een stof ingrijpen?", "Hoofdstuk 2": "Hoe maakt koffie je wakker?", "Hoofdstuk 3": "Waarom word je van wijn eerst losser?", "Hoofdstuk 4": "Waar grijpen medicijnen in?", "Hoofdstuk 5": "Wat doet een cel als het te veel wordt?", "Samenvatting": "Wat moet je onthouden?"},
 "footer": "Stem: Roos (ElevenLabs, eleven_multilingual_v2). Script en animatie: Kamiel met Claude. Personages: Linda, Noor en Daan (castboek). Stijl: Part C (prompt v13). Versie 2.0 · 29 oktober 2026, lichte remake in de donkere stijl (1.0 · 4 oktober 2026). <a href=\"../../index.html#regeling\">Naar de reeks</a>.",
 "questions": {
  "q04": {"q": "Een stof komt in je bloed en verandert hoe je je voelt. Op hoeveel plekken in een synaps kan zo'n stof ingrijpen?", "correct": 2, "explain": "Op vier plekken: de afgifte, de receptor, het opruimen en de aanmaak. Niet alleen op de receptor."},
  "q07": {"q": "Hoe maakt cafeïne je wakker?", "correct": 1, "explain": "Cafeïne blokkeert de receptor van adenosine, de stof die je slaperig maakt. Het geeft geen energie."},
  "q11": {"q": "Alcohol remt je hersenen. Waarom word je na één glas eerst juist losser en spraakzamer?", "correct": 1, "explain": "De cellen die je gedrag afremmen zijn als eerste gevoelig voor alcohol. Valt die rem weg, dan word je losser."},
  "q14": {"q": "Een SSRI remt de heropname van serotonine. Wat gebeurt er dan in de spleet?", "correct": 1, "explain": "Er komt niet meer serotonine bij: de serotonine blijft langer in de spleet, omdat het terugpompen is geremd."},
  "q17": {"q": "Een zenuwcel krijgt wekenlang veel meer signaal dan normaal. Wat doet die cel?", "correct": 1, "explain": "Hij haalt receptoren weg of maakt ze minder gevoelig, zodat het signaal weer normaal wordt: gewenning."}
 },
 "glossary": [
  {"t": "psychoactieve stof", "d": "Stof die via het zenuwstelsel je waarneming, stemming of gedrag verandert."},
  {"t": "agonist", "d": "Stof die in een receptor past en hem aanzet, zoals de echte neurotransmitter."},
  {"t": "antagonist", "d": "Stof die in een receptor past maar hem niet aanzet; blokkeert de echte neurotransmitter."},
  {"t": "heropnameremmer", "d": "Stof die het terugpompen van neurotransmitter in het eindknopje remt, zodat de stof langer in de spleet blijft."},
  {"t": "adenosine", "d": "Stof die zich tijdens het waken ophoopt in de hersenen en zenuwcellen remt (slaapdruk)."},
  {"t": "cafeïne", "d": "Antagonist op de adenosinereceptor; verbergt vermoeidheid."},
  {"t": "GABA", "d": "De belangrijkste remmende neurotransmitter in de hersenen."},
  {"t": "glutamaat", "d": "De belangrijkste exciterende neurotransmitter in de hersenen."},
  {"t": "alcohol (ethanol)", "d": "Versterkt de werking van GABA en remt die van glutamaat; het netwerk wordt trager."},
  {"t": "nicotine", "d": "Agonist op (nicotinerge) acetylcholinereceptoren; laat ook dopamine vrijkomen."},
  {"t": "serotonine", "d": "Neurotransmitter die onder andere bij stemming, slaap en eetlust een rol speelt."},
  {"t": "SSRI", "d": "Antidepressivum dat de heropname van serotonine remt (selectieve serotonine-heropnameremmer)."},
  {"t": "dopamine", "d": "Neurotransmitter die onder andere bij beweging en beloning een rol speelt."},
  {"t": "levodopa (L-dopa)", "d": "Grondstof voor dopamine; komt, anders dan dopamine, wel de hersenen in; medicijn bij de ziekte van Parkinson."},
  {"t": "ziekte van Parkinson", "d": "Aandoening waarbij zenuwcellen afsterven die dopamine maken; leidt tot bewegingsproblemen."},
  {"t": "bloed-hersenbarrière", "d": "De wand van de haarvaten in de hersenen, die veel stoffen uit het bloed tegenhoudt."},
  {"t": "tolerantie (gewenning)", "d": "Afname van het effect van een stof bij herhaald gebruik, doordat de cel receptoren weghaalt of minder gevoelig maakt."},
  {"t": "ontwenning", "d": "Klachten na het stoppen met een stof, doordat de aangepaste cel nu te weinig signaal krijgt."},
  {"t": "beloningssysteem", "d": "Keten van hersengebieden (ventraal tegmentum → nucleus accumbens → prefrontale schors) waar dopamine vrijkomt bij iets dat goed was; stuurt herhalen aan."},
  {"t": "verslaving", "d": "Toestand waarin het verlangen naar een stof of gedrag voor het effect uit gaat, door aanpassing van synapsen en het beloningssysteem."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
