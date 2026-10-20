import json
film = {
 "slug": "vwo-2018-2", "hoofdstuk": "examens", "hoofdstukNaam": "Examen",
 "title": "Examenbespreking vwo 2018-II", "sub": "alle 38 vragen: stof, aanpak en antwoord",
 "puzzle": "Hoe haal je alle punten uit een examenvraag?",
 "meta": "centraal examen · 2018 tijdvak 2", "alleen": "vwo", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Examens bespreken · vwo",
 "lead": "We lopen het vwo-examen biologie van 2018, tweede tijdvak, helemaal door: de lauwbloedige koningsvis, nieuwe eilandjes voor de alvleesklier, het fragiele-X-syndroom van grootvader naar kleinkind, waterstofgas uit bacteriën en muizenplagen in Friesland. Bij elke vraag: wat er gevraagd wordt, de stof die je nodig hebt, hoe je de vraag aanpakt en het antwoord met de puntverdeling uit het correctievoorschrift. De figuren uit het examen zijn nagetekend en worden stap voor stap gelezen.",
 "endHaak": "welk type vraag kostte jou in dit examen de meeste punten, en welke tip ga je de volgende keer gebruiken?",
 "minis": {
  "Opening": "Hoeveel vragen en punten heeft dit examen?",
  "Zo lees je een examenvraag": "Welke drie gewoontes leveren veel punten op?",
  "De lauwbloedige koningsvis": "Hoe beperkt een wondernet het warmteverlies in de kieuwen?",
  "Nieuwe eilandjes voor de alvleesklier": "Waardoor bepaalt insuline de minimale grootte van de poriën in de capsule?",
  "Een bijzondere band tussen grootvader en kleinkind": "Waarom heeft een vrouw met de volledige mutatie twee bandjes op de gel, maar een man er één?",
  "Biologische productie van waterstofgas": "Waarom zijn de purperbacteriën foto-heterotroof?",
  "Wat te doen aan de muizenplagen?": "Waarom eindigt de lijn met ingreep op ongeveer de helft?",
  "Wat neem je mee?": "Welke tip gebruik jij bij het volgende examen?"
 },
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Noor, Mevrouw Visser, Lotte (als Ruth), Opa Henk en Teun (castboek). Examenvragen en correctievoorschrift: © College voor Toetsen en Examens (CvTE), vwo biologie 2018 tijdvak 2; figuren nagetekend. Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {},
 "glossary": [
  {"t": "oppervlakte-inhoudverhouding", "d": "Hoeveel oppervlak een organisme heeft per eenheid volume. Kleine dieren hebben een grote verhouding en verliezen daardoor naar verhouding veel warmte."},
  {"t": "myoglobine", "d": "Eiwit in spiercellen dat zuurstof bindt en vrijgeeft als de zuurstofdruk in de spier daalt: een zuurstofvoorraad voor de spier."},
  {"t": "valide", "d": "Een meting of onderzoek is valide als je meet wat je wilt meten. Spreiding in de uitkomsten zegt daar niets over."},
  {"t": "tegenstroomprincipe", "d": "Twee stromen lopen in tegengestelde richting langs elkaar, zodat warmte of stoffen over de hele lengte overgaan; bij de koningsvis houdt het wondernet zo de warmte in het lichaam."},
  {"t": "convergente evolutie", "d": "Niet-verwante soorten gaan door vergelijkbare selectiedruk op elkaar lijken, zoals endothermie bij de koningsvis en bij zoogdieren. Niet te verwarren met co-evolutie: twee soorten die op elkaar inwerken evolueren samen."},
  {"t": "leesraamverschuiving", "d": "Door het erbij of eraf gaan van een aantal nucleotiden dat geen drievoud is, worden alle codons daarna anders gelezen (frameshift)."},
  {"t": "X-inactivatie", "d": "In elke lichaamscel van een vrouw wordt willekeurig één van de twee X-chromosomen uitgezet. Daardoor verschilt per cel welk allel van een X-gebonden gen tot expressie komt."},
  {"t": "draagkracht", "d": "Het maximale aantal individuen van een soort dat in een gebied langdurig kan leven."},
  {"t": "foto-heterotroof", "d": "Leefwijze waarbij een organisme energie haalt uit licht en koolstof uit organische stoffen (niet uit koolstofdioxide)."},
  {"t": "generalist en specialist", "d": "Een generalist (vos) eet veel verschillende prooisoorten en schakelt makkelijk over; een specialist (wezel) eet maar een of enkele prooisoorten."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
