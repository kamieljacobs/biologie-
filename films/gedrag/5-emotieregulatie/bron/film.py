import json
film = {
 "slug": "5-emotieregulatie", "hoofdstuk": "gedrag", "hoofdstukNaam": "Gedrag",
 "title": "Emotieregulatie", "sub": "Wat doe je als een emotie je overspoelt?",
 "puzzle": "Bilal verliest een potje vlak voor de winst. Zijn hart bonkt en hij wil zijn controller door de kamer gooien. Wat helpt hem het best om rustig te worden?",
 "meta": "gedrag · emoties en emotieregulatie", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Gedrag · film 5 van 12",
 "lead": "Emoties maken je lichaam snel klaar en laten anderen zien hoe je je voelt. De amygdala reageert razendsnel op wat belangrijk is; de prefrontale cortex kan bijsturen. Je kunt bijsturen bij de situatie, je aandacht, de betekenis en je reactie. Onderdrukken verbergt een emotie, maar het lichaam reageert juist sterker; herwaarderen en benoemen pakken het gevoel zelf vaker aan. Regulatie leer je eerst samen (co-regulatie), dan zelf.",
 "endHaak": "welke strategie gebruik jij het vaakst, en werkt die altijd?",
 "minis": {"Hoofdstuk 1": "Waarom hebben we emoties?", "Hoofdstuk 2": "Wat kun je doen?", "Hoofdstuk 3": "Hoe leer je het?", "Recap": "Wat helpt Bilal?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personage: Bilal (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Bilal verliest vlak voor de winst. Wat helpt hem het best om rustig te worden?", "correct": 1, "explain": "Het antwoord zie je in hoofdstuk 2."},
  "q06": {"q": "Wat gebeurde er bij de groep die niets mocht laten merken?", "correct": 1, "explain": "Onderdrukken verandert de buitenkant; het lichaam reageert juist sterker en het gevoel blijft."}
 },
 "glossary": [
  {"t": "emotie", "d": "Een reactie van lichaam en hersenen op iets wat belangrijk voor je is; maakt je snel klaar om te handelen en geeft een signaal aan anderen."},
  {"t": "amygdala", "d": "Amandelvormig hersendeel diep in de hersenen dat razendsnel reageert op wat belangrijk is, zoals gevaar."},
  {"t": "prefrontale cortex", "d": "Het voorste deel van de hersenschors; weegt af en kan een emotionele reactie bijsturen of afremmen. Rijpt door tot in de twintiger jaren."},
  {"t": "emotieregulatie", "d": "Invloed uitoefenen op welke emoties je hebt, hoe sterk, en hoe je ze uit: via situatie, aandacht, betekenis of reactie."},
  {"t": "herwaarderen", "d": "Een situatie anders bekijken, zodat de emotie verandert."},
  {"t": "onderdrukken", "d": "Niets van je emotie laten merken; verandert vooral de buitenkant."},
  {"t": "co-regulatie", "d": "Samen met een ander tot rust komen: eerst door een verzorger, later ook met vrienden of een partner."},
  {"t": "orthosympathisch en parasympathisch", "d": "vwo · Delen van het autonome zenuwstelsel: actiestand (o.a. adrenaline uit het bijniermerg) en ruststand."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
