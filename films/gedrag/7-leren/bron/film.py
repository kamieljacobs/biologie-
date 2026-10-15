import json
film = {
 "slug": "7-leren", "hoofdstuk": "gedrag", "hoofdstukNaam": "Gedrag",
 "title": "Leren: van Pavlov tot je telefoon", "sub": "Gewenning, klassieke en operante conditionering",
 "puzzle": "Daan pakt zijn telefoon bij elk trilletje, ook al is het meestal niks. Waarom blijft hij kijken?",
 "meta": "gedrag · leren en conditionering", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Gedrag · film 7 van 12",
 "lead": "Gewenning: je reageert niet meer op een herhaalde, onschuldige prikkel. Klassieke conditionering: een neutrale prikkel (een geluid) gaat een vergelijkbare reactie oproepen als een onvoorwaardelijke prikkel (eten); zonder eten dooft dat uit. Operante conditionering: gedrag met een prettig gevolg neemt toe, met een onprettig gevolg neemt af. Elke keer belonen leert snel; onvoorspelbaar belonen maakt gedrag hardnekkig, zoals bij je telefoon.",
 "endHaak": "welke van jouw gewoontes is door onvoorspelbare beloning ontstaan?",
 "minis": {"Hoofdstuk 1": "Wat is de eenvoudigste vorm van leren?", "Hoofdstuk 2": "Hoe leerde Pavlovs hond kwijlen bij een geluid?", "Hoofdstuk 3": "Hoe leer je gedrag door de gevolgen?", "Recap": "Waarom pakt Daan zijn telefoon?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personage: Daan (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Waarom blijft Daan kijken, ook al is het meestal niks?", "correct": 1, "explain": "Het antwoord zie je in hoofdstuk 3."},
  "q06": {"q": "Pavlov liet het geluid steeds klinken zonder eten. Wat gebeurde er met het kwijlen?", "correct": 1, "explain": "Het kwijlen werd steeds minder: uitdoving."},
  "q09": {"q": "Het voer stopt. Welke rat bleef het langst drukken?", "correct": 1, "explain": "Onvoorspelbaar beloond gedrag dooft langzamer uit."}
 },
 "glossary": [
  {"t": "gewenning", "d": "Niet meer reageren op een prikkel die steeds terugkomt en geen gevolgen heeft."},
  {"t": "klassieke conditionering", "d": "Een neutrale prikkel gaat een vergelijkbare reactie oproepen als een onvoorwaardelijke prikkel, doordat ze vaak samen voorkomen."},
  {"t": "onvoorwaardelijke / voorwaardelijke prikkel", "d": "Prikkel die van nature een reactie oproept (eten) / prikkel die dat pas na leren doet (het geluid)."},
  {"t": "uitdoving", "d": "Een aangeleerde reactie wordt zwakker als de koppeling (of beloning) niet meer volgt."},
  {"t": "operante conditionering", "d": "Leren door de gevolgen van gedrag: bekrachtiging maakt gedrag vaker, straf minder vaak."},
  {"t": "bekrachtiging / straf", "d": "Een gevolg waardoor gedrag vaker optreedt (iets prettigs, of iets vervelends dat ophoudt) / minder vaak optreedt."},
  {"t": "voorspellingsfout", "d": "vwo · Verschil tussen de verwachte en de echte beloning; dopamine-neuronen signaleren dit verschil."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
