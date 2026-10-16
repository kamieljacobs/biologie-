import json
film = {
 "slug": "psychologie-1-welke-therapie-werkt", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Welke therapie werkt?", "sub": "therapievormen, hoe ze werken en hoe je meet of ze helpen",
 "puzzle": "Je eerste werkdag als psycholoog. Henk vraagt: welke therapie werkt het best voor mij? Wat zeg je?",
 "meta": "psychologie · therapie", "alleen": "vwo", "version": "2.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Psychologie · onderwerp 6",
 "lead": "Therapieën verschillen in waar ze zich op richten: gedachten en gedrag, herinneringen, relaties of oude patronen. Of een therapie werkt, weet je pas door te vergelijken met een controlegroep, en met welke groep maakt uit: tegen een wachtlijst lijkt therapie anderhalf keer zo sterk als tegen gewone zorg. Bij depressie werken veel vormen ongeveer even goed; per klacht is er wel een best onderbouwde aanpak, zoals exposure bij een fobie.",
 "endHaak": "welke vraag zou jij als psycholoog als eerste stellen als iemand zegt: deze therapie werkt?",
 "minis": {"Hoofdstuk 1": "Waar richten therapieën zich op?", "Hoofdstuk 2": "Hoe weet je of een therapie werkt, en waar zitten de valkuilen?", "Hoofdstuk 3": "Hoe doorbreekt therapie somberheid en angst?", "Hoofdstuk 4": "Wat verandert er in je hersenen?", "Hoofdstuk 5": "Wat werkt waarvoor, en voor wie niet?", "Recap": "Wat zeg je tegen Henk?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Opa Henk, Lotte en Sam (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Een man is somber, gaat drie maanden in therapie en voelt zich daarna veel beter. Heeft de therapie gewerkt?", "correct": 1, "explain": "Dat weet je pas door te vergelijken: een deel van de mensen wordt ook zonder therapie beter."},
  "q06": {"q": "Tegen welke groep lijkt een therapie het sterkst?", "correct": 0, "explain": "Tegen een wachtlijst: wie wacht, knapt minder op dan wie gewone zorg krijgt."},
  "q09": {"q": "Ongeveer de helft van de ingediende onderzoeken naar antidepressiva was duidelijk positief. Welk deel van de gepubliceerde artikelen was positief?", "correct": 1, "explain": "Bijna allemaal (ongeveer 94 procent): onderzoeken zonder effect verdwenen in de la of werden positiever opgeschreven."},
  "q12": {"q": "Lotte rent weg als ze een spin ziet; haar angst zakt meteen. Wat gebeurt er op lange termijn met haar angst?", "correct": 0, "explain": "Die blijft of groeit: ze ontdekt nooit dat de spin niets doet. Vermijden houdt angst in stand."},
  "q15": {"q": "Een SSRI verandert de serotonine in de synaps binnen enkele uren. Wanneer merkt iemand meestal dat zijn stemming verbetert?", "correct": 1, "explain": "Meestal pas na een paar weken. Dat past niet bij het simpele idee van een serotoninetekort."},
  "q18": {"q": "Heel verschillende therapieën werken vaak ongeveer even goed. Wat is een mogelijke verklaring?", "correct": 0, "explain": "Ze hebben veel gemeen: een uitleg, een plan, hoop en een goede band. Maar niet elke therapie werkt even goed voor elke klacht."}
 },
 "glossary": [
  {"t": "cognitieve gedragstherapie (CGT)", "d": "Therapie die je gedachten en gedrag onderzoekt en verandert."},
  {"t": "exposure", "d": "Stap voor stap opzoeken wat je eng vindt, zodat je merkt dat wat je vreest meestal niet gebeurt; onderdeel van CGT."},
  {"t": "EMDR", "d": "Therapie voor nare herinneringen: je denkt aan het ergste moment terwijl je met je ogen een hand of lampje volgt."},
  {"t": "ACT", "d": "Acceptance and commitment therapy: gedachten leren opmerken en toch doen wat je belangrijk vindt."},
  {"t": "interpersoonlijke therapie", "d": "Therapie die zich richt op relaties en grote veranderingen in je leven."},
  {"t": "psychodynamische therapie", "d": "Therapie die zoekt naar patronen uit je verleden die nu nog meespelen."},
  {"t": "schematherapie", "d": "Therapie gericht op diepe, oude overtuigingen over jezelf en anderen."},
  {"t": "systeemtherapie", "d": "Therapie die kijkt naar de mensen om iemand heen, zoals het gezin."},
  {"t": "placebo-effect", "d": "Verbetering doordat je verwacht dat een behandeling helpt."},
  {"t": "gerandomiseerd onderzoek (RCT)", "d": "Onderzoek waarin het lot bepaalt wie de behandeling krijgt en wie in de controlegroep zit."},
  {"t": "wachtlijstgroep", "d": "Controlegroep die (nog) geen behandeling krijgt en afwacht."},
  {"t": "effectgrootte", "d": "Het verschil tussen twee groepen, gedeeld door de spreiding; vuistregel 0,2 klein, 0,5 middel, 0,8 groot."},
  {"t": "meta-analyse", "d": "Het samenvoegen van de resultaten van alle studies over één vraag."},
  {"t": "dubbelblind", "d": "Deelnemer en onderzoeker weten niet wie de echte behandeling krijgt; bij therapie kan alleen de beoordelaar blind zijn."},
  {"t": "publicatiebias", "d": "Vertekening doordat onderzoeken zonder duidelijk effect minder vaak worden gepubliceerd."},
  {"t": "gedragsactivatie", "d": "Deel van CGT: stap voor stap weer dingen doen die plezier of voldoening geven, om de cirkel van somberheid te doorbreken."},
  {"t": "vermijding", "d": "Wegblijven van wat je eng vindt; geeft op korte termijn opluchting maar houdt angst in stand."},
  {"t": "uitdoving (extinctie)", "d": "Nieuw leren dat iets veilig is; de oude angstherinnering blijft bestaan, dus angst kan terugkomen."},
  {"t": "amygdala", "d": "Hersengebied diep in de slaapkwab (links en rechts) dat snel reageert op gevaar."},
  {"t": "prefrontale schors", "d": "Voorste deel van de hersenschors; een deel boven de ogen kan de amygdala afremmen."},
  {"t": "SSRI", "d": "Antidepressivum dat de heropname van serotonine door de zendende zenuwcel remt."},
  {"t": "stapsgewijze zorg", "d": "Zorg in stappen: huisarts, basis-GGZ, specialistische GGZ; omhoog en omlaag waar nodig."},
  {"t": "therapeutische relatie", "d": "De band en samenwerking tussen cliënt en therapeut."},
  {"t": "GZ-psycholoog", "d": "Psycholoog met een extra opleiding van twee jaar die zelfstandig mag behandelen (BIG-geregistreerd)."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
