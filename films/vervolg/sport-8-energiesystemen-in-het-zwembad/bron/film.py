import json
film = {
 "slug": "sport-8-energiesystemen-in-het-zwembad", "hoofdstuk": "vervolg", "hoofdstukNaam": "Wat word jij?",
 "title": "Energiesystemen in het zwembad", "sub": "de race, meter voor meter",
 "puzzle": "Een 50 meter en een 1500 meter: zelfde zwemmer, zelfde slag. Waarom deelt hij ze zo anders in?",
 "meta": "sport en topsport · inspanningsfysiologie", "version": "1.0 · november 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Wat word jij? · Sport en topsport",
 "lead": "Je volgt een zestienjarige zwemmer op één wedstrijddag: de serie van de 200 meter vrij, de pauze, de finale, en daarna de sprinttraining op maandag. Een mengpaneel met drie schuifjes laat zien hoe fosfaataccu, gisting en zuurstof vanaf de start samen energie leveren en hoe hun aandeel binnen een race en per afstand verschuift. Je ziet wat er op de laatste meters in een spiervezel gebeurt (en waarom 'verzuurd' maar half klopt), wat uitzwemmen tussen twee races doet, waarom indelen telt, hoe snel de fosfaataccu zich weer vult en wie dit allemaal meet.",
 "endHaak": "hoe zou jij een 400 meter indelen, als je weet wat je schuifjes doen?",
 "minis": {"Hoofdstuk 1 — Samen, niet na elkaar": "Werken de energiebronnen na elkaar?",
           "Hoofdstuk 2 — De laatste vijfentwintig meter": "Is het melkzuur?",
           "Hoofdstuk 3 — Tussen serie en finale": "Uitzwemmen of stilzitten?",
           "Hoofdstuk 4 — De finale: indelen": "Is snel starten altijd winst?",
           "Hoofdstuk 5 — Maandag: de fosfaataccu vult zich": "Hoe snel is de accu weer vol?",
           "Recap": "Waarom deelt hij een 50 en een 1500 meter anders in?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages uit het castboek, zonder naam: de zwemmer (16) en de zwemtrainer. De splittijden en slagen zijn een verzonnen voorbeeld. Onderzoek uit o.a. Figueiredo e.a. 2011, Hellard e.a. 2018, Almeida e.a. 2020, Allen e.a. 2008, Toubekis e.a. 2005 en 2008, Pratama &amp; Yimlamai 2020, Robertson e.a. 2009, Thompson e.a. 2003, McGibbon e.a. 2018 en Bogdanis e.a. 1995 (zie Getallen en bronnen). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · november 2026.",
 "questions": {
  "q04": {"q": "Welke bron levert in de eerste seconden het meest?", "correct": 2, "explain": "Alle drie leveren vanaf de start; in de eerste seconden de fosfaataccu het meest, maar het deel uit zuurstof loopt in de eerste 25 tot 50 meter snel op. Over de eerste 50 meter van een 200 meter kwam (geschat, één onderzoek) zo'n twee vijfde uit de fosfaataccu en bijna de helft al uit zuurstof. Geen estafette dus."},
  "q08": {"q": "Wat maakt zijn spieren op het eind vooral zwakker?", "correct": 0, "explain": "Los fosfaat en zuur hopen zich op in de spiervezel (vooral in snelle vezels) en maken de eiwitdraden minder krachtig; ook komt er minder calcium vrij. Lactaat in het bloed is vooral een teken dat gisting hard heeft gewerkt; het lactaat zelf doet weinig. Over het precieze aandeel zijn onderzoekers het nog niet eens."},
  "q11": {"q": "Na welke pauze was de tweede 100 meter het snelst?", "correct": 0, "explain": "In één onderzoek met 11 zwemmers was de tweede 100 meter na vijf minuten rustig uitzwemmen ruim een seconde sneller dan na stilzitten; tien minuten hielp minder. Bij een 200 meter vonden anderen geen verschil: uitzwemmen kan helpen, maar het bewijs is gemengd."},
  "q14": {"q": "Welke 200 meter is sneller?", "correct": 1, "explain": "De finale: 2:01,2 tegen 2:02,7 (voorbeeld). Hij vertrekt een seconde rustiger, maar zakt veel minder in. Bij een 200 meter telt vooral hoe goed je je snelheid vasthoudt; een te snel begin kan je later opbreken."},
  "q18": {"q": "Hoe lang duurt het voordat de fosfaataccu weer voor twee derde gevuld is?", "correct": 2, "explain": "In een onderzoek met een fietssprint van 30 seconden was de accu daarna voor ongeveer een vijfde gevuld, na anderhalve minuut voor zo'n twee derde en na zes minuten nog niet helemaal. Met tien seconden rust is hij maar een klein beetje bijgevuld."}
 },
 "glossary": [
  {"t": "fosfaataccu", "d": "Een kleine voorraad creatinefosfaat in de spier waarmee heel snel ATP wordt gemaakt, zonder zuurstof. Hij is na een sprint grotendeels leeg en vult zich weer met behulp van zuurstof, in minuten."},
  {"t": "gisting", "d": "ATP maken uit glucose zonder zuurstof; daarbij ontstaat lactaat (melkzuur). Levert snel, maar per glucose weinig ATP."},
  {"t": "aerobe dissimilatie", "d": "ATP maken met zuurstof in de mitochondriën. Levert veel ATP, en neemt een groter deel van de energie voor zijn rekening naarmate een race langer duurt."},
  {"t": "lactaat", "d": "Stof die bij gisting ontstaat. Veel lactaat in het bloed na een race is vooral een teken dat gisting hard heeft gewerkt; het lactaat zelf maakt de spier nauwelijks zwakker."},
  {"t": "vermoeidheid in de spiervezel", "d": "Op het eind van een zware race hopen los fosfaat en zuur (H⁺) zich op in de vezel en komt er minder calcium vrij; daardoor trekken de eiwitdraden minder krachtig. Over het precieze aandeel zijn onderzoekers het nog niet eens."},
  {"t": "splittijd", "d": "De tijd per stuk van de race, meestal per 50 meter."},
  {"t": "indeling", "d": "Hoe je je snelheid over de race verdeelt; trainers zeggen ook 'pacing'."},
  {"t": "eindsprint", "d": "De laatste baan sneller zwemmen dan de banen ervoor."},
  {"t": "uitzwemmen", "d": "Na een race rustig doorzwemmen, bijvoorbeeld in het uitzwembad. Tussen twee races kan het helpen, maar het bewijs is gemengd."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
