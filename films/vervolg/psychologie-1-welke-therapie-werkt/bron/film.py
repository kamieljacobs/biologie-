import json
film = {
 "slug": "psychologie-1-welke-therapie-werkt", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Welke therapie werkt?", "sub": "therapievormen, en hoe je meet of ze helpen",
 "puzzle": "Je eerste werkdag als psycholoog. Henk vraagt: welke therapie werkt het best voor mij? Wat zeg je?",
 "meta": "psychologie · therapie", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Psychologie · onderwerp 6",
 "lead": "Therapieën verschillen in waar ze zich op richten: gedachten en gedrag, herinneringen, relaties of oude patronen. Of een therapie werkt, weet je pas door te vergelijken met een controlegroep, en met welke groep maakt uit: tegen een wachtlijst lijkt therapie anderhalf keer zo sterk als tegen gewone zorg. Bij depressie werken veel vormen ongeveer even goed; per klacht is er wel een best onderbouwde aanpak, zoals exposure bij een fobie.",
 "endHaak": "welke vraag zou jij als psycholoog als eerste stellen als iemand zegt: deze therapie werkt?",
 "minis": {"Hoofdstuk 1": "Waar richten therapieën zich op?", "Hoofdstuk 2": "Hoe weet je of een therapie werkt?", "Hoofdstuk 3": "Wat werkt waarvoor, en waarom vaak even goed?", "Recap": "Wat zeg je tegen Henk?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Opa Henk, Lotte en Sam (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Een man is somber, gaat drie maanden in therapie en voelt zich daarna veel beter. Heeft de therapie gewerkt?", "correct": 1, "explain": "Dat weet je pas door te vergelijken: een deel van de mensen wordt ook zonder therapie beter."},
  "q06": {"q": "Tegen welke groep lijkt een therapie het sterkst?", "correct": 0, "explain": "Tegen een wachtlijst: wie wacht, knapt minder op dan wie gewone zorg krijgt."},
  "q09": {"q": "Heel verschillende therapieën werken vaak ongeveer even goed. Wat is een mogelijke verklaring?", "correct": 0, "explain": "Ze hebben veel gemeen: een uitleg, een plan, hoop en een goede band. Maar niet elke therapie werkt even goed voor elke klacht."}
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
  {"t": "therapeutische relatie", "d": "De band en samenwerking tussen cliënt en therapeut."},
  {"t": "GZ-psycholoog", "d": "Psycholoog met een extra opleiding van twee jaar die zelfstandig mag behandelen (BIG-geregistreerd)."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
