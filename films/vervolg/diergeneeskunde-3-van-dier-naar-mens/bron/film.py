import json
film = {
 "slug": "diergeneeskunde-3-van-dier-naar-mens", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Van dier naar mens", "sub": "zoönosen en One Health",
 "puzzle": "Hoe kon een ziekte van geiten in Brabant duizenden mensen ziek maken?",
 "meta": "diergeneeskunde · volksgezondheid", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Diergeneeskunde",
 "lead": "In 2009 werden in Brabant bijna 2500 mensen ziek van Q-koorts. De bacterie kwam uit stallen met melkgeiten en waaide met het stof mee. Zo'n ziekte van dier naar mens heet een zoönose. Een ziekteverwekker moet passen op de cellen van een nieuwe gastheer, en mutaties kunnen dat veranderen: daarom houden dierenartsen vogelgriep scherp in de gaten. Een uitbraak stop je met melden, vaccineren, opsporen en soms ruimen. En One Health laat zien dat minder antibiotica bij dieren minder resistentie bij mensen betekent.",
 "endHaak": "welke ziekte van dieren zou jij als eerste in de gaten houden, en waarom?",
 "minis": {"Hoofdstuk 1": "Hoe kwam Q-koorts van de geit bij de mens?", "Hoofdstuk 2": "Wat heeft een virus nodig om over te springen?", "Hoofdstuk 3": "Hoe stop je een uitbraak?", "Hoofdstuk 4": "Wat is One Health?", "Recap": "Waarom zorgt een dierenarts ook voor mensen?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Dierenarts Mila en Lotte (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "In 2009 worden in Brabant bijna 2500 mensen ziek van Q-koorts. Waar komt de besmetting vandaan?", "correct": 1, "explain": "Uit stallen met melkgeiten: de bacterie zit in de placenta en het vruchtwater van geiten die verwerpen, droogt op en waait met het stof mee."},
  "q08": {"q": "Waarom maken onderzoekers zich zorgen als vogelgriep vaker mensen besmet, ook als de meesten maar licht ziek worden?", "correct": 0, "explain": "Bij elke vermenigvuldiging kan het virus veranderen. Een variant die beter op mensencellen past, kan van mens op mens gaan."},
  "q13": {"q": "Een varkenshouder die in het ziekenhuis wordt opgenomen, wordt eerst getest op MRSA. Waarom juist hij?", "correct": 2, "explain": "Wie dicht bij varkens werkt, draagt de veegerelateerde MRSA vaak in de neus zonder ziek te zijn, en kan hem doorgeven aan kwetsbare patiënten."}
 },
 "glossary": [
  {"t": "zoönose", "d": "Een infectieziekte die van dieren op mensen kan overspringen, zoals Q-koorts, hondsdolheid en vogelgriep."},
  {"t": "Q-koorts", "d": "Zoönose door de bacterie Coxiella burnetii; in Nederland 2007–2010 een grote uitbraak vanuit melkgeitenbedrijven, vooral in Brabant."},
  {"t": "verwerpen", "d": "Een drachtig dier krijgt een dood of te vroeg geboren jong; bij Q-koorts komen dan grote aantallen bacteriën vrij."},
  {"t": "receptor", "d": "Eiwit op het oppervlak van een cel waarop een virus moet passen om de cel binnen te komen, als een sleutel in een slot."},
  {"t": "gastheer", "d": "Het organisme waarin een ziekteverwekker leeft en zich vermeerdert; bij een zoönose springt hij over op een nieuwe gastheer."},
  {"t": "ruimen", "d": "Dieren op besmette bedrijven doden om de verspreiding van een dierziekte te stoppen."},
  {"t": "One Health", "d": "Het idee dat de gezondheid van mensen, dieren en hun omgeving één geheel is en samen moet worden aangepakt."},
  {"t": "veegerelateerde MRSA", "d": "Variant van de resistente bacterie MRSA die vooral bij varkens en kalveren voorkomt; mensen die met deze dieren werken, dragen hem vaak zonder ziek te zijn."},
  {"t": "vaste dierenarts", "d": "De dierenarts met wie een veehouder een gezondheidsplan maakt; alleen een dierenarts mag antibiotica voorschrijven."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
