import json
film = {
 "slug": "11-slimme-dieren", "hoofdstuk": "gedrag", "hoofdstukNaam": "Gedrag",
 "title": "Slimme dieren", "sub": "Cognitie, inzichtelijk leren en de spiegeltest",
 "puzzle": "Rond 1904 leek het paard Hans te kunnen rekenen. Een commissie vond geen bedrog. Hoe wist Hans het antwoord?",
 "meta": "gedrag · cognitie", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Gedrag · film 11 van 12",
 "lead": "Cognitie is hoe een dier informatie opneemt, onthoudt en gebruikt om problemen op te lossen. De slimme Hans las onbewuste signalen van de vraagsteller: test daarom eerlijk, met controles, en kies geen slimmere verklaring dan nodig (regel van Morgan). Chimpansees en kraaien lossen problemen op, soms met inzicht. De spiegeltest onderzoekt zelfherkenning, maar past niet bij elk dier.",
 "endHaak": "hoe zou jij testen of een dier jou herkent, zonder dat het jou kan aflezen?",
 "minis": {"Hoofdstuk 1": "Hoe test je eerlijk of een dier slim is?", "Hoofdstuk 2": "Wat is inzichtelijk leren?", "Hoofdstuk 3": "Herkennen dieren zichzelf?", "Recap": "Wat betekent slim bij dieren?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personage: Bilal (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Hoe wist Hans het antwoord?", "correct": 1, "explain": "Hij las kleine, onbewuste signalen van de vraagsteller."},
  "q06": {"q": "Welke voorwerpen gooiden de kraaien vooral in de buis?", "correct": 1, "explain": "De zinkende: daarmee stijgt het water."},
  "q09": {"q": "Wat deden sommige eksters met een stickertje op de keel voor de spiegel?", "correct": 1, "explain": "Twee van de vijf probeerden het van hun eigen keel te krijgen."}
 },
 "glossary": [
  {"t": "cognitie", "d": "Hoe een dier informatie opneemt, onthoudt en gebruikt om problemen op te lossen."},
  {"t": "Clever Hans-effect", "d": "Een dier (of mens) reageert op onbewuste signalen van de onderzoeker; daarom test je blind en met controles."},
  {"t": "regel van Morgan", "d": "Verklaar gedrag niet met een slimmer vermogen als een eenvoudiger vermogen het ook verklaart."},
  {"t": "proefondervindelijk leren", "d": "Leren door proberen: wat werkt, doet het dier vaker (trial-and-error)."},
  {"t": "inzichtelijk leren", "d": "Een plotselinge oplossing voor een nieuw probleem, zonder alles uit te proberen; bouwt voort op eerdere ervaring."},
  {"t": "spiegeltest", "d": "Merkteken dat het dier alleen in de spiegel ziet; zit het dier er dan aan, dan lijkt het zichzelf te herkennen."},
  {"t": "poetsvis", "d": "vwo · Vis die parasieten van andere vissen eet; slaagde in 2019 voor de spiegeltest, wat de betekenis van de test ter discussie stelt."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
