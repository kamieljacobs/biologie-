import json
film = {
 "slug": "labtechniek-4-antibioticaresistentie", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Antibioticaresistentie", "sub": "kweken, testen en selectie",
 "puzzle": "Een antibioticum werkt ineens niet meer. Hoe zie je dat in het lab, en hoe ontstaat het?",
 "meta": "laboratoriumtechniek · mbo en hbo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Laboratoriumtechniek",
 "lead": "Opa Henk is na een kuur niet beter. In het lab zet Yasmin zijn urine op een voedingsbodem: steriel werken, met een negatieve en een positieve controle erbij. Eén bacterie wordt in een nacht een zichtbare kolonie, en met een verdunningsreeks reken je terug hoeveel er in het monster zaten; telbaar is een plaat met 30 tot 300 kolonies. Daarna het antibiogram: remzones meten en vergelijken met het breekpunt, en de MIC bepalen. Op één plaat met een miljard cellen groeien zeven kolonies: die hadden de mutatie al. Het antibioticum maakt resistentie niet, het selecteert. En via een plasmide gaat een resistentiegen zelfs naar een andere soort.",
 "endHaak": "wat zou er gebeuren als niemand meer op resistentie testte?",
 "minis": {"Hoofdstuk 1 — Steriel werken": "Waarom zet een analist een plaat mee waar niets op gaat?",
           "Hoofdstuk 2 — Kolonies en tellen": "Hoe wordt één bacterie een stipje dat je kunt zien?",
           "Hoofdstuk 3 — Het antibiogram": "Wanneer heet een bacterie gevoelig, en wanneer resistent?",
           "Hoofdstuk 4 — Hoe resistentie ontstaat": "Waarom groeien er zeven kolonies uit een miljard cellen?",
           "Hoofdstuk 5 — Plasmiden": "Hoe komt een resistentiegen bij een andere soort?",
           "Recap": "Wat vertelt het antibiogram van Opa Henk aan de arts?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Yasmin, Opa Henk en Dr. Kim (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Opa Henk is na een antibioticakuur niet beter. Wat kan het lab met zijn urine uitzoeken?", "correct": 1,
          "explain": "Het lab laat de bacterie groeien, bepaalt welke het is en test welke middelen nog werken. Niet jij wordt resistent, maar de bacterie."},
  "q06": {"q": "Stel: op de extra plaat, die Yasmin alleen even opende en sloot, staan de volgende dag drie kolonies. Wat weet ze dan?", "correct": 2,
          "explain": "De extra plaat is een negatieve controle. Groeit daar iets op, dan is er tijdens het werken iets uit de lucht of van de handen op gevallen, en dat kan ook op de andere platen zijn gebeurd. Blijft hij leeg, dan was het werk schoon."},
  "q10": {"q": "Op drie platen staan 680, 68 en 7 kolonies. Welke gebruikt Yasmin voor de telling?", "correct": 0,
          "explain": "Een plaat is telbaar tussen de 30 en de 300 kolonies. Bij meer groeien ze over elkaar heen en tel je te laag, bij minder weegt het toeval te zwaar."},
  "q14": {"q": "Tot en met 0,25 mg/L is het troebel, vanaf 0,5 helder. Bij welk buisje lees je de MIC af?", "correct": 1,
          "explain": "De MIC is de laagste concentratie waarbij je geen groei meer ziet: hier 0,5 milligram per liter."},
  "q17": {"q": "Yasmin brengt een miljard cellen op een plaat met antibioticum. Er groeien zeven kolonies. Hoe kan dat?", "correct": 0,
          "explain": "Die zeven hadden de mutatie al vóór de plaat; de andere cellen groeiden niet uit. Het middel maakt de mutatie niet, het selecteert."}
 },
 "glossary": [
  {"t": "steriel werken", "d": "Zo werken dat er geen bacteriën van buiten in je kweek komen: de entoog door de vlam, de plaat maar even open, en gevaarlijk werk in een veiligheidskabinet."},
  {"t": "voedingsbodem (agar)", "d": "Vaste bodem met voedingsstoffen waarop bacteriën kunnen groeien; op een plaat wordt een monster uitgestreken."},
  {"t": "kolonie", "d": "Een met het oog zichtbaar stipje van honderden miljoenen tot miljarden bacteriën, gegroeid uit één cel (of uit een klompje cellen dat aan elkaar zat) na een nacht in de warmtekast. Een plaat is telbaar tussen de 30 en de 300 kolonies."},
  {"t": "verdunningsreeks", "d": "Steeds een vaste fractie van het vorige buisje (hier 1 op 10), zodat je weet hoeveel keer je het oorspronkelijke monster hebt verdund."},
  {"t": "positieve en negatieve controle", "d": "Een monster waarvan je de uitslag al weet, dat meegaat om te zien of de test werkt: de positieve moet groeien, de negatieve moet leeg blijven."},
  {"t": "antibiogram", "d": "Overzicht van welke antibiotica een bacterie nog remmen: per middel wordt de remzone gemeten of de MIC bepaald, en vergeleken met het breekpunt."},
  {"t": "MIC en breekpunt", "d": "De MIC (minimale inhiberende concentratie) is de laagste concentratie waarbij je geen groei meer ziet. Het breekpunt is de vaste grens waarmee je een remzone of MIC vergelijkt: een grotere zone of een lagere MIC betekent gevoelig."},
  {"t": "resistent", "d": "De bacterie groeit door bij een concentratie antibioticum die in het lichaam haalbaar is. Resistentie wordt in een populatie vaker door selectie; het allel ontstaat door een toevallige mutatie of komt binnen via een plasmide, niet door het middel."},
  {"t": "conjugatie", "d": "Een bacterie legt een pilus aan naar een andere cel en geeft daardoor een kopie van een plasmide door, ook aan een andere soort; haar eigen plasmide houdt ze."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
