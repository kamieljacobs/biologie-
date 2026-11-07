import json
true, false = True, False
film = {
 "slug": "6-hoe-een-soort-er-twee-wordt",
 "hoofdstuk": "evolutie",
 "hoofdstukNaam": "Evolutie",
 "title": "Hoe één soort er twee wordt",
 "sub": "isolatie en soortvorming",
 "puzzle": "Is een muilezel een soort?",
 "meta": "evolutie 6/8",
 "version": "1.0 · oktober 2026",
 "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · reeks Evolutie · film 6 van 8",
 "lead": "Een soort is een groep die in de natuur samen vruchtbare nakomelingen kan krijgen. Paard en ezel krijgen wel een jong, maar de muilezel is onvruchtbaar. Daarom is de muilezel geen soort, maar een hybride. Een nieuwe soort ontstaat als de genenstroom stopt. Twee genenpools lopen dan uit elkaar, tot de groepen ook samen geen vruchtbare jongen meer krijgen.",
 "endHaak": "volgende film: Hoe weten we dat?",
 "minis": {
  "Hoofdstuk 1": "Zijn paard en ezel één soort?",
  "Hoofdstuk 2": "Wat gebeurt er als de genenstroom stopt?",
  "Hoofdstuk 3": "Wat houdt twee soorten uit elkaar?",
  "Hoofdstuk 4": "Kunnen er nieuwe soorten ontstaan in één meer?",
  "Recap": "Is een muilezel een soort?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Dieren: uitknippoppen uit de dierenbibliotheek; personages uit het castboek. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q06": {
   "q": "Een paard en een ezel krijgen samen een muilezel. Die is gezond, maar onvruchtbaar. Zijn paard en ezel één soort?",
   "correct": 1,
   "explain": "Paard en ezel krijgen samen wel een jong, maar dat jong is onvruchtbaar. Daarmee houdt het op: er stromen geen genen van paarden naar ezels. Paard en ezel zijn twee soorten."
  },
  "q14": {
   "q": "De rivier blijft duizenden generaties liggen. Wat gebeurt er met de twee genenpools?",
   "correct": 2,
   "explain": "Nu de genenstroom stopt, is één pot twee potten geworden. In elke pot ontstaan andere mutaties. Elke kant heeft eigen selectiedruk: misschien is het links kouder of zijn er andere roofdieren."
  },
  "q22": {
   "q": "Twee kikkersoorten leven in dezelfde vijver. De ene paart in april, de andere in juni. Wat voor isolatie is dit?",
   "correct": 0,
   "explain": "Neem twee kikkersoorten in dezelfde vijver. De ene paart in april, de andere in juni. De scheiding zit dus niet in de plek, maar in de tijd."
  },
  "q29": {
   "q": "Er is geen muur in het water. Hoe kunnen de blauwe en de rode vissen toch apart blijven?",
   "correct": 1,
   "explain": "De ogen van de vrouwtjes zijn afgestemd op het licht waar ze leven. Diep zien ze rood het best, ondiep blauw. Ze kiezen dus vooral een mannetje van hun eigen kleur."
  }
 },
 "glossary": [
  {
   "t": "soort",
   "d": "Groep individuen die in de natuur samen vruchtbare nakomelingen kunnen krijgen."
  },
  {
   "t": "hybride",
   "d": "Nakomeling van ouders van twee verschillende soorten, zoals de muilezel; vaak onvruchtbaar."
  },
  {
   "t": "ras",
   "d": "Groep binnen een soort met eigen erfelijke kenmerken, door de mens gefokt."
  },
  {
   "t": "ondersoort",
   "d": "Groep binnen een soort, in de natuur, met eigen erfelijke kenmerken en vaak een eigen gebied; kan nog vruchtbare nakomelingen krijgen met de rest van de soort."
  },
  {
   "t": "genenstroom",
   "d": "Uitwisseling van allelen tussen populaties of delen van een populatie, doordat individuen verhuizen en paren (zie film 5)."
  },
  {
   "t": "geografische isolatie",
   "d": "Populaties zijn van elkaar gescheiden door een barrière in het landschap (rivier, zee, gebergte), waardoor de genenstroom stopt."
  },
  {
   "t": "divergente evolutie",
   "d": "Twee populaties uit één voorouderpopulatie gaan steeds meer van elkaar verschillen."
  },
  {
   "t": "reproductieve isolatie",
   "d": "Twee groepen kunnen samen geen vruchtbare nakomelingen (meer) krijgen. Vóór de bevruchting: andere tijd, plek, gedrag of bouw. Ná de bevruchting: de nakomeling sterft of is onvruchtbaar."
  },
  {
   "t": "allopatrische soortvorming",
   "d": "Soortvorming in gescheiden gebieden, na geografische isolatie.",
   "vwo": true
  },
  {
   "t": "sympatrische soortvorming",
   "d": "Soortvorming in hetzelfde gebied, zonder barrière in het landschap, bijvoorbeeld door partnerkeuze.",
   "vwo": true
  }
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
