import json
film = {
 "slug": "sport-2-waarom-al-die-rustige-meters", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Waarom al die rustige meters?", "sub": "trainingszones bij zwemmen",
 "puzzle": "Een 100 meter duurt nog geen minuut. Waarom zwemt een sprinter dan toch elke week kilometers rustig?",
 "meta": "sport en topsport · trainingszones", "version": "1.0 · november 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Sport en topsport",
 "lead": "Een zwemmer tikt aan na een 100 meter vrije slag: 55,8 seconden. Toch staat er op het bord van de zwemtrainer vanmiddag 5000 meter, en het meeste rustig. Je ziet wat een trainingszone is (rustig, drempel, snel) en welke energiebron elke zone vooral gebruikt, waarom ook een 100 meter voor zo'n 40 tot 50 procent op zuurstof draait, wat duurtraining doet met spieren, hart en bloed, waarom lactaat geen afval maar brandstof is, hoe twee trainingsplannen in een echt onderzoek tegen elkaar uitpakten, wat trainers verwachten als je een zone weglaat, en hoe een zwemtrainer met een stappentest en een lactaatcurve de zones per zwemmer bepaalt.",
 "endHaak": "welke zone zou jij deze week het meest zwemmen, en waarom?",
 "minis": {"Hoofdstuk 1 — Drie zones, drie energiebronnen": "Hoeveel van een 100 meter draait op zuurstof?",
           "Hoofdstuk 2 — Wat elke zone bouwt": "Is lactaat afval?",
           "Hoofdstuk 3 — De wedstrijd: twee plannen": "Welke verdeling van de zones werkt beter?",
           "Hoofdstuk 4 — Een zone weglaten": "Wat mis je zonder rustige meters?",
           "Hoofdstuk 5 — Hoe een trainer de zones vindt": "Is dezelfde tijd dezelfde zone?",
           "Recap": "Waarom zwemt een sprinter kilometers rustig?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages uit het castboek: de zwemmer (Sam, in zwemkleding), de zwemtrainer en een tweede zwemmer als figurant. Decor: zwembad (zijaanzicht en bovenaanzicht van de banen), getekend in de film. Getallen uit o.a. Ribeiro e.a. 2015, Hellard e.a. 2018, Pla e.a. 2019, Brooks 2018 en 2020, Papadimitriou e.a. 2025, Pyne e.a. 2001 en Scruton e.a. 2015 (zie Getallen en bronnen). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · november 2026.",
 "questions": {
  "q05": {"q": "Een 100 meter is kort en hard. Hoeveel van de energie komt dan uit de aerobe dissimilatie?", "correct": 1, "explain": "Zo'n veertig tot vijftig procent. Dat is geschat uit de zuurstof die goed getrainde jonge zwemmers tijdens en direct na een maximale 100 meter opnamen (Ribeiro e.a. 2015, Hellard e.a. 2018). Ook een sprinter heeft dus een aerobe basis nodig."},
  "q09": {"q": "Na een snelle serie meet de zwemtrainer veel lactaat in het bloed, bij rustig inzwemmen weinig. Maken je spieren bij rustig zwemmen dan geen lactaat?", "correct": 1, "explain": "Wel. Ook bij rustig zwemmen maken je spieren lactaat, maar het wordt vrijwel meteen weer gebruikt: je hart en rustig werkende spiervezels verbranden het in hun mitochondriën. Lactaat is brandstof, geen afval; via zweet en plas verlies je er maar een klein beetje van."},
  "q13": {"q": "Plan één: ongeveer vier vijfde rustig, bijna geen drempel, wat meer snel. Plan twee: een kwart op de drempel, minder rustig en minder snel. Welk plan gaf gemiddeld de grootste verbetering op de 100 meter?", "correct": 2, "explain": "Plan één maakte de 100 meter gemiddeld bijna een procent sneller, en de zwemmers voelden zich minder moe; na plan twee waren ze bijna niet sneller (Pla e.a. 2019). Het is één onderzoek met 22 zwemmers en het verschil is klein."},
  "q16": {"q": "Stel dat de zwemmer zes weken alleen nog sprints zwemt, zonder rustige meters. Wat verwachten trainers dat hij dan het meest mist?", "correct": 0, "explain": "Trainers verwachten vooral trager herstel, tussen herhalingen en tussen races. Hoe groot dat effect is, is bij zwemmers niet gemeten; sprints trainen je mitochondriën ook, met minder meters."},
  "q19": {"q": "Twee zwemmers zwemmen een 200 meter in precies dezelfde tijd. Zwemmen ze dan in dezelfde zone?", "correct": 2, "explain": "Niet per se. Voor de ene zwemmer is die tijd rustig, voor de ander al drempel: dat zie je aan hun eigen lactaatcurve. Daarom test een zwemtrainer per zwemmer, en een paar keer per seizoen opnieuw."}
 },
 "glossary": [
  {"t": "trainingszone", "d": "Een intensiteit van trainen (van rustig tot maximaal) met een eigen doel. In deze film drie zones: rustig, drempel en snel; clubs gebruiken er drie tot vijf."},
  {"t": "aerobe basis", "d": "Hoe goed je lichaam langdurig energie met zuurstof kan leveren."},
  {"t": "aerobe dissimilatie", "d": "Verbranding van brandstof (zoals glucose, vet of lactaat) met zuurstof in de mitochondriën; levert veel ATP, maar niet heel snel."},
  {"t": "fosfaataccu", "d": "Kleine voorraad snelle energie in je spieren (creatinefosfaat) die ATP meteen weer oplaadt; genoeg voor een paar seconden volle inspanning."},
  {"t": "gisting", "d": "Afbraak van glucose zonder dat zuurstof nodig is; gaat snel en levert weinig ATP. Daarbij ontstaat melkzuur."},
  {"t": "lactaat", "d": "De vorm waarin melkzuur in je bloed zit; dit meten trainers. Lactaat is geen afval maar brandstof: hart en rustig werkende spiervezels verbranden het in hun mitochondriën."},
  {"t": "drempelzone", "d": "Stevig tempo, net onder het tempo waarbij lactaat in je bloed blijft oplopen. Bij een stappentest ligt die zone ongeveer tussen twee en vier millimol lactaat per liter bloed; dat verschilt per zwemmer en per club."},
  {"t": "stappentest", "d": "Test waarbij een zwemmer een aantal keer dezelfde afstand zwemt (bijvoorbeeld 7 × 200 m), elke keer iets sneller; na elke stap worden lactaat (een druppel bloed uit de oorlel), hartslag en tijd genoteerd."},
  {"t": "lactaatcurve", "d": "Grafiek van het lactaat in het bloed tegen de snelheid uit een stappentest: eerst vlak, dan steil omhoog. Na maanden trainen schuift de curve naar rechts."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
