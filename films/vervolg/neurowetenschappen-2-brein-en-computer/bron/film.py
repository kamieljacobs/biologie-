import json
film = {
 "slug": "neurowetenschappen-2-brein-en-computer", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Brein en computer", "sub": "van neuron tot kunstmatig netwerk",
 "puzzle": "Een AI leert plaatjes herkennen. Leert hij zoals jouw hersenen?",
 "meta": "neurowetenschappen · computationeel", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Neurowetenschappen",
 "lead": "Een neuron telt prikkelende en remmende signalen op en vuurt een pulsje als de som boven een drempel komt. McCulloch en Pitts maakten daar in 1943 een rekensom van; latere versies kregen gewichten. Leren is in zo'n netwerk: gewichten aanpassen na een fout, zoals het perceptron van Rosenblatt deed. Moderne netwerken hebben lagen, net als de visuele schors, maar ze leren anders: vanaf nul met veel meer voorbeelden, met veel meer energie, en met een foutsignaal dat precies door alle lagen terugrekent. Neurowetenschappers programmeren om metingen van honderden cellen te lezen, en om met een chip in de hersenen een robotarm te sturen.",
 "endHaak": "welke app op jouw telefoon gebruikt een neuraal netwerk?",
 "minis": {"Hoofdstuk 1": "Hoe beslist een neuron of het vuurt?", "Hoofdstuk 2": "Hoe leert een netwerk van fouten?", "Hoofdstuk 3": "Waar lijkt AI op het brein, en waar niet?", "Hoofdstuk 4": "Waarom programmeren neurowetenschappers?", "Recap": "Leert een AI zoals jij?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Daan, Dr. Kim en Teun (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Een neuraal netwerk vindt Daans kattenfoto's. Leert het zoals jouw hersenen?", "correct": 1, "explain": "Deels: de makers leenden ideeën van de hersenen (neuron als rekensom, lagen, gewichten), maar het leert op een andere manier."},
  "q06": {"q": "Signalen +2, +2, +1 en −3; de drempel is 3. Vuurt dit neuron?", "correct": 2, "explain": "Nee: 2 + 2 + 1 − 3 = 2, en dat is onder de drempel. Een half pulsje bestaat niet."},
  "q09": {"q": "Het netwerk zegt 'kruis', maar het was een rondje. Wat verandert er?", "correct": 1, "explain": "De verbindingen van de zwarte hokjes worden een beetje zwakker, zodat de som de volgende keer lager uitvalt."},
  "q13": {"q": "Wie heeft meer voorbeelden nodig om een nieuw dier te leren herkennen: een kind of een netwerk dat vanaf nul leert?", "correct": 1, "explain": "Het netwerk: dat leerde van ongeveer duizend foto's per soort. Een kind begint wel niet bij nul: het heeft al jaren rondgekeken."},
  "q18": {"q": "Een chipje in de bewegingsschors meet tientallen cellen. Hoe weet de computer welke beweging iemand wil maken?", "correct": 1, "explain": "Een programma leert welk vuurpatroon bij welke bedoelde beweging hoort, met gewichten, en stuurt daarmee een robotarm."}
 },
 "glossary": [
  {"t": "neuron", "d": "Zenuwcel; telt prikkelende en remmende signalen op en vuurt een pulsje als de som boven een drempel komt."},
  {"t": "drempel", "d": "Waarde waarboven (bij een kunstmatig neuron: op of waarboven) het neuron vuurt; eronder gebeurt niets."},
  {"t": "alles-of-niets", "d": "Een pulsje is er helemaal of helemaal niet, en is altijd even groot."},
  {"t": "kunstmatig neuron", "d": "Rekensom die signalen met hun gewichten optelt en met een drempel vergelijkt: uitkomst één of nul."},
  {"t": "gewicht", "d": "Sterkte van een verbinding in een kunstmatig netwerk; plus voor prikkelend, min voor remmend. Lijkt op de sterkte van een synaps."},
  {"t": "perceptron", "d": "Eenvoudig netwerk van Rosenblatt (1958) dat zijn gewichten na elke fout een beetje aanpast."},
  {"t": "neuraal netwerk", "d": "Programma met lagen kunstmatige neuronen dat leert door gewichten aan te passen."},
  {"t": "laag", "d": "Groep kunstmatige neuronen; de eerste lagen reageren op randjes, latere op vormen en onderdelen."},
  {"t": "fout terugrekenen", "d": "Methode waarmee de computer uitrekent hoeveel elk gewicht aan een fout bijdroeg, door alle lagen terug (backpropagation)."},
  {"t": "meetnaald", "d": "Dunne naald met honderden meetpunten die de pulsjes van honderden neuronen tegelijk meet."},
  {"t": "chip die een robotarm stuurt", "d": "Brein-computerinterface: systeem dat hersensignalen meet en een programma laat leren welke bedoelde beweging erbij hoort, om bijvoorbeeld een robotarm te sturen."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
