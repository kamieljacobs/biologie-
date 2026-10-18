import json
film = {
 "slug": "4-ingrijpen-of-laten-gaan", "hoofdstuk": "ecologie", "hoofdstukNaam": "Ecologie",
 "title": "Ingrijpen of laten gaan?", "sub": "Plagen bestrijden en natuur beheren",
 "puzzle": "Een lieveheersbeestje tegen luizen: wat kan daar misgaan?",
 "meta": "ecologie · plaagbestrijding en natuurbeheer", "version": "1.0 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Ecologie · film 4",
 "lead": "Een monocultuur is een gedekte tafel voor een plaag. Spuiten werkt snel, maar geeft resistentie (natuurlijke selectie) en doodt ook de natuurlijke vijanden. Biologische bestrijding werkt in de kas, maar een vijand van ver weg kan zelf een exoot worden: het Aziatisch lieveheersbeestje en de rietpad. Geïntegreerde bestrijding, bloemranden en strokenteelt werken mét de natuur. In natuurgebieden houden begrazing, maaien en verbinden de biodiversiteit hoog; dat maakt ecosystemen stabiel en veerkrachtig. Maar voorbij een omslagpunt slaat een ecosysteem om, zoals het Veluwemeer, en terug is moeilijk.",
 "endHaak": "welke maatregel uit deze film zou jij aanraden aan opa Henk, en waarom?",
 "minis": {"Hoofdstuk 1": "Hoe ontstaat een plaag, en waarom helpt spuiten maar even?", "Hoofdstuk 2": "Wanneer werkt een natuurlijke vijand, en wanneer maakt hij het erger?", "Hoofdstuk 3": "Hoe beheer je natuur, en wat is een omslagpunt?", "Recap": "Wat moet je onthouden?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_v4). Script, animatie en speler: Kamiel met Claude. Personages: Opa Henk en Noor (castboek). Stijl: Stijlkaart biologiefilms (Part C). Versie 1.0 · oktober 2026.",
 "questions": {
  "q02": {"q": "Vanaf 1996 werd in Nederland een lieveheersbeestje uit Azië verkocht tegen luizen in kassen. Wat gebeurde er daarna?", "correct": 2, "explain": "Het ontsnapte, vestigde zich buiten (eerste in het wild in 2002, in Nijmegen) en is nu op veel plekken het lieveheersbeestje dat je het vaakst ziet."},
  "q11": {"q": "In 1935 zette Australië rietpadden uit tegen kevers in het suikerriet. Hoe liep dat af?", "correct": 0, "explain": "De padden konden niet bij de kevers (hoog in het riet, larven in de grond), aten van alles en werden zelf een plaag: nu meer dan 200 miljoen."},
  "q20": {"q": "Een meer is troebel geworden. Je brengt het fosfaat terug tot het niveau van vlak voor de omslag. Wat gebeurt er?", "correct": 1, "explain": "Het blijft troebel: algen en brasems houden die toestand in stand (positieve terugkoppeling). Het fosfaat moet veel verder omlaag."}
 },
 "glossary": [
  {"t": "plaag", "d": "Een soort die zo talrijk wordt dat ze schade doet, bijvoorbeeld aan een gewas."},
  {"t": "monocultuur", "d": "Eén gewas op een groot oppervlak: veel voedsel voor een plaag, weinig natuurlijke vijanden."},
  {"t": "biodiversiteit", "d": "De verscheidenheid aan leven: genen, soorten en ecosystemen. Het gaat om het aantal verschillende soorten, niet om het aantal individuen."},
  {"t": "bestrijdingsmiddel", "d": "Stof die een plaag doodt (chemische bestrijding); werkt snel, maar raakt ook andere soorten."},
  {"t": "resistentie", "d": "Een bestrijdingsmiddel werkt niet meer, doordat individuen met een erfelijke eigenschap overleven en zich voortplanten: natuurlijke selectie, geen gewenning."},
  {"t": "natuurlijke vijand", "d": "Predator, parasiet of ziekteverwekker die een plaag klein houdt."},
  {"t": "biologische bestrijding", "d": "Een plaag bestrijden met haar natuurlijke vijanden; werkt het best bij een kleine plaag."},
  {"t": "sluipwesp", "d": "Wesp die een ei legt in een ander insect; de larve eet dat van binnenuit op. Encarsia wordt in kassen ingezet tegen witte vlieg."},
  {"t": "exoot", "d": "Soort die door de mens buiten haar natuurlijke verspreidingsgebied terechtkomt en zich daar vestigt."},
  {"t": "inheemse soort", "d": "Soort die van nature in een gebied thuishoort."},
  {"t": "geïntegreerde bestrijding", "d": "Maatregelen combineren: minder vatbare rassen, wisselen van gewas, natuurlijke vijanden en pas spuiten boven een schadegrens."},
  {"t": "strokenteelt", "d": "Smalle stroken met verschillende gewassen naast elkaar; meer biodiversiteit op de akker."},
  {"t": "begrazing", "d": "Grazers houden snelgroeiende planten en jonge bomen kort; te veel grazers vertrappen de bodem en eten zeldzame planten."},
  {"t": "maaien en afvoeren", "d": "Het maaisel weghalen haalt voedingsstoffen weg (verschralen), zodat planten van arme grond terugkomen."},
  {"t": "ecoduct", "d": "Natuurbrug over een weg die natuurgebieden verbindt."},
  {"t": "stabiliteit", "d": "Een ecosysteem blijft ongeveer hetzelfde, ook als er iets verandert; hoger bij veel soorten en verbindingen in het voedselweb."},
  {"t": "veerkracht", "d": "Hoe snel een ecosysteem herstelt na een verstoring."},
  {"t": "omslagpunt", "d": "Het punt waarop een ecosysteem plotseling overgaat in een andere toestand, bijvoorbeeld van helder naar troebel water."},
  {"t": "positieve terugkoppeling", "d": "Een versterkend effect dat een toestand in stand houdt, zoals brasems die troebel water nog troebeler maken."},
  {"t": "hysterese", "d": "vwo · Een systeem heeft twee omslagpunten: de toestand hangt af van de geschiedenis; terug kan pas bij een veel lagere waarde."}
 ],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
