import json
film = {
 "slug": "4-vaccins-allergie-en-bloedgroepen", "hoofdstuk": "afweer", "hoofdstukNaam": "Afweer",
 "title": "Vaccins, allergie en bloedgroepen", "sub": "Hoe je afweer eigen en vreemd uit elkaar houdt",
 "puzzle": "Noor krijgt een vaccinatie. Over een half jaar moet ze terug voor een tweede prik. Waarom is één prik niet genoeg?",
 "meta": "afweer 4/4", "version": "1.0 · oktober 2026", "titleLook": "micro",
 "seriesline": "Biologie bij Kamiel · reeks Bescherming en afweer · film 4 van 4",
 "lead": "Een vaccin bevat antigenen zonder de ziekte: je afweer maakt zelf geheugencellen (actieve immunisatie); bij een tweede prik volgt een snelle, sterke secundaire reactie. Kant-en-klare antistoffen werken meteen, maar tijdelijk (passieve immunisatie). Bij een allergie reageert je afweer te sterk op iets onschuldigs: antistoffen op mestcellen, en bij een volgend contact histamine. Rode bloedcellen dragen antigenen A, B en D; antistoffen tegen A en B heb je al, tegen D pas na contact. Daarom moeten bij een transfusie de vormpjes passen.",
 "endHaak": "steeds dezelfde vraag: eigen of vreemd?",
 "minis": {"Hoofdstuk 1": "Waarom zijn er soms twee prikken nodig?", "Hoofdstuk 2": "Waarom krijgt iemand hooikoorts van onschuldig stuifmeel?", "Hoofdstuk 3": "Wie mag bloed geven aan wie?", "Recap": "Waarom krijgt Noor een tweede prik?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Noor moet over een half jaar terug voor een tweede prik. Waarom is één prik niet genoeg?", "correct": 1, "explain": "Onthoud je keuze. Het antwoord zie je in hoofdstuk 1 en aan het eind."},
  "q09": {"q": "Iemand krijgt een injectie met kant-en-klare antistoffen tegen tetanus. Hoe lang beschermen die?", "correct": 0, "explain": "Hij maakt de antistoffen niet zelf: er ontstaan geen geheugencellen, en na een paar weken zijn de antistoffen afgebroken. Passieve immunisatie."},
  "q12": {"q": "Sommige mensen krijgen hooikoorts van stuifmeel, dat eigenlijk onschuldig is. Wat zegt dat over hun afweer?", "correct": 2, "explain": "Een allergie is een te sterke reactie op iets onschuldigs: antistoffen op mestcellen laten bij een volgend contact histamine vrijkomen."},
  "q19": {"q": "Iemand met bloedgroep A mag geen bloed van B krijgen, maar wel van O. Waarom?", "correct": 1, "explain": "Op rode bloedcellen van O zit geen A en geen B, dus de antistoffen van de ontvanger hebben niets om op te binden. Het plasma van O bevat wél antistoffen tegen A en B."}
 },
 "glossary": [
  {"t": "vaccin", "d": "Middel met antigenen van een ziekteverwekker (verzwakt, gedood, een stukje, onschadelijk gemaakt gif) of een mRNA-recept voor één eiwit; je afweer maakt geheugencellen zonder dat je ziek wordt."},
  {"t": "actieve immunisatie", "d": "Je lichaam maakt zelf antistoffen en geheugencellen: natuurlijk na een infectie, kunstmatig na een vaccin. Werkt traag, maar lang."},
  {"t": "passieve immunisatie", "d": "Je krijgt kant-en-klare antistoffen: natuurlijk via placenta of moedermelk, kunstmatig met een serum. Werkt meteen, maar tijdelijk: geen geheugencellen."},
  {"t": "groepsimmuniteit", "d": "Als genoeg mensen immuun zijn, kan een ziekte zich bijna niet verspreiden; ook wie niet gevaccineerd kan worden, is dan beschermd."},
  {"t": "allergie", "d": "Te sterke afweerreactie op een onschuldig allergeen: antistoffen op mestcellen; bij een volgend contact komt histamine vrij."},
  {"t": "auto-immuunziekte", "d": "De afweer valt eigen cellen aan, zoals bij diabetes type 1 de cellen in de alvleesklier die insuline maken."},
  {"t": "bloedgroepen", "d": "Antigenen A en B op rode bloedcellen bepalen bloedgroep A, B, AB of O; in het plasma zitten antistoffen tegen de antigenen die je niet hebt."},
  {"t": "resusfactor", "d": "Antigeen D op rode bloedcellen. Antistoffen tegen D maak je pas na contact met resuspositief bloed."},
  {"t": "agglutinatie", "d": "Samenklonteren van rode bloedcellen doordat antistoffen ze aan elkaar binden; zo bepaal je een bloedgroep met antiserum."},
  {"t": "universele donor", "d": "O resusnegatief: op de rode bloedcellen zit geen A, B of D. Het plasma van O bevat wel antistoffen tegen A en B."},
  {"t": "resusantagonisme", "d": "Antistoffen tegen D van een resusnegatieve moeder breken de rode bloedcellen van een volgend resuspositief kind af; een anti-D-injectie voorkomt dat.", "vwo": True},
  {"t": "IgE", "d": "Klasse antistoffen bij allergie; zit met het constante deel vast op mestcellen.", "vwo": True}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
