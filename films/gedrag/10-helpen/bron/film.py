import json
film = {
 "slug": "10-helpen", "hoofdstuk": "gedrag", "hoofdstukNaam": "Gedrag",
 "title": "Waarom helpen dieren elkaar?", "sub": "Altruïsme, verwantschapsselectie en wederkerig altruïsme",
 "puzzle": "Een grondeekhoorn slaat alarm als er een wezel aankomt, en loopt daardoor zelf meer gevaar. Waarom doet ze dat?",
 "meta": "gedrag · altruïsme", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Gedrag · film 10 van 12",
 "lead": "Altruïsme kost de helper fitness en levert een ander fitness op. Dat ontstaat niet 'voor de soort'. Verwantschapsselectie: door familie te helpen, help je ook genen die je met hen deelt; hoe nauwer verwant, hoe meer het loont. Wederkerig altruïsme: wie eerder hielp, wordt later terug geholpen, als dieren elkaar vaak tegenkomen, herkennen en onthouden.",
 "endHaak": "wie help jij zonder er iets voor terug te verwachten, en klopt dat echt?",
 "minis": {"Hoofdstuk 1": "Waarom is helpen een raadsel?", "Hoofdstuk 2": "Waarom helpen dieren hun familie?", "Hoofdstuk 3": "Waarom helpen dieren die geen familie zijn?", "Recap": "Waarom slaat de grondeekhoorn alarm?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Lotte en Yasmin (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Waarom slaat de grondeekhoorn alarm, terwijl ze zelf opvalt?", "correct": 1, "explain": "Er is vaak familie in de buurt: het antwoord zie je in hoofdstuk 2."},
  "q06": {"q": "Wie slaat het vaakst alarm?", "correct": 1, "explain": "Vrouwtjes met familie in de buurt."},
  "q09": {"q": "Buur A gaf eerder bloed, buur B nooit. Aan wie geeft de vleermuis het liefst?", "correct": 1, "explain": "Aan A: wie eerder gaf, krijgt later vaker terug."}
 },
 "glossary": [
  {"t": "altruïsme", "d": "Gedrag dat de helper fitness kost en een ander fitness oplevert."},
  {"t": "fitness", "d": "Kans om te overleven en nakomelingen te krijgen (bijdrage aan de volgende generatie)."},
  {"t": "verwantschapsselectie", "d": "Selectie op gedrag dat verwanten helpt; loont meer naarmate de ander nauwer verwant is."},
  {"t": "verwantschap (r)", "d": "Kans dat een gen bij twee individuen identiek is doordat ze het van dezelfde voorouder hebben: broer/zus ½, neef/nicht ⅛."},
  {"t": "wederkerig altruïsme", "d": "Ik help jou nu, jij helpt mij later; werkt als dieren elkaar vaak tegenkomen, herkennen en onthouden."},
  {"t": "regel van Hamilton", "d": "vwo · Helpen loont als r × B > C (verwantschap × voordeel voor de ander > kosten voor de helper)."},
  {"t": "haplodiploïdie", "d": "vwo · Mannetjes uit onbevruchte eitjes (één set chromosomen), vrouwtjes uit bevruchte; zussen zijn dan voor ¾ verwant."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
