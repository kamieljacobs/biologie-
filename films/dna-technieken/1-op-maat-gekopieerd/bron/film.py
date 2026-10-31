import json
film = {
 "slug": "1-op-maat-gekopieerd", "bestand": "index.html", "root": "../../../", "audiomap": "audio",
 "hoofdstuk": "dna", "hoofdstukNaam": "DNA",
 "title": "Op maat gekopieerd", "sub": "PCR, de polymerase-kettingreactie",
 "puzzle": "In je buisje zat het stuk DNA maar een paar honderd keer. Hoe wordt dat één heldere band op de gel?",
 "meta": "dna-technieken 1/2", "version": "2.0 · 31 oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · DNA-technieken · film 1 van 2 · hoort bij het practicum <a href=\"../../../tools/dna-profielen/index.html\">DNA-profielen vergelijken</a> · volgende: <a href=\"../2-op-lengte-gesorteerd/index.html\">Op lengte gesorteerd</a>",
 "lead": "Hoe PCR van een paar honderd moleculen één scherpe band maakt, en waarom de eerste kopieën te lang zijn. Met dezelfde getallen als het practicum: vWA op chromosoom 12, het bloedspoor in baan Sp, 172 basenparen. Hoofdstuk 3 is verdieping: in de havo-stand slaat de speler het over, de samenvatting aan het eind ervan hoort iedereen.",
 "endHaak": "Volgende film: hoe sorteert de gel de stukken op lengte?",
 "minis": {
  "Hoofdstuk 1": "Wat heb je nodig om DNA te kopiëren?",
  "Hoofdstuk 2": "Hoe maak je van één molecuul er twee?",
  "Hoofdstuk 3": "Waarom zijn de eerste kopieën te lang?",
  "Hoofdstuk 4": "Waar blijven de lange producten?",
  "Hoofdstuk 5": "Waarom zet je een negatieve controle mee?",
  "Hoofdstuk 6": "Hoe wordt een paar honderd moleculen één scherpe band?"
 },
 "footer": "Stem: Roos (ElevenLabs), één doorlopende take uit versie 1.0, voor versie 2.0 in alinea's geknipt (tekst en take ongewijzigd). Script, animatie en speler: Kamiel met Claude. Personage: Noor uit het castboek (alleen haar hand). Tekeningen: gedeelde bibliotheek (PCR-buisje, thermocycler, micropipet, DNA-polymerase, basevorm van de DNA-reeks, chromosoom, bacterie). Getallen uit het practicum DNA-profielen vergelijken. Model: vereenvoudigd en niet op schaal; elke cyclus een perfecte verdubbeling, tenzij anders vermeld. Stijl: Part C van de filmprompt (v13). Versie 2.0 · 31 oktober 2026.",
 "questions": {
  "q08": {"q": "Wat gebeurt er als je de primers vergeet?", "correct": 1,
          "explain": "Er wordt niets gekopieerd. Een polymerase kan een streng alleen verlengen; zonder primer is er geen begin."},
  "q12": {"q": "Wat doet die hitte verder met het DNA?", "correct": 1,
          "explain": "Vrijwel niets: de bindingen binnen een streng zijn veel sterker dan de waterstofbruggen ertussen. De strengen blijven heel."},
  "q21": {"q": "Waar stopt het polymerase deze keer?", "correct": 1,
          "explain": "Aan het eind van de template-streng. Aan die kant eindigt het template precies bij de primer van cyclus één; het polymerase weet niets en telt niets."},
  "q27": {"q": "Hoeveel lange producten zijn er na 30 cycli, uit dat ene molecuul?", "correct": 0,
          "explain": "Zestig. Lange producten ontstaan alleen op de twee originele strengen: elke cyclus twee erbij, dus 2 × 30 = 60."},
  "q33": {"q": "Wat betekent een band in de negatieve controle, op de hoogte van een allel?", "correct": 1,
          "explain": "Er is DNA in de PCR gekomen dat daar niet hoort. Elk stuk DNA met de juiste plekken voor de primers wordt gekopieerd, ook een paar moleculen uit een huidcel of een druppeltje."},
  "q39": {"q": "Een ander allel heeft 14 herhalingen in plaats van 16. Waar komt die band?", "correct": 1,
          "explain": "Verder. Minder herhalingen geeft een korter product (164 in plaats van 172 basenparen), en een korter stuk komt verder in de gel."}
 },
 "glossary": [
  {"t": "template", "d": "De DNA-streng die wordt gekopieerd: eerst het DNA uit het spoor, later ook de kopieën zelf."},
  {"t": "primer", "d": "Kort stukje enkelstrengs DNA (± 20 nucleotiden) dat op één plek past. Het is het begin (5′-uiteinde) van elke nieuwe streng."},
  {"t": "DNA-polymerase (Taq)", "d": "Enzym dat nucleotiden aan het 3′-uiteinde vastzet. Taq komt uit de bacterie Thermus aquaticus en overleeft 95 °C."},
  {"t": "denatureren", "d": "Stap 1, 95 °C: de waterstofbruggen breken en de strengen gaan uit elkaar. De strengen zelf blijven heel."},
  {"t": "primers binden (annealing)", "d": "Stap 2, 55–60 °C: primers blijven zitten waar alle basen passen."},
  {"t": "verlengen (extensie)", "d": "Stap 3, 72 °C: Taq verlengt de primer, telkens met een passende nucleotide."},
  {"t": "5′- en 3′-uiteinde", "d": "De twee verschillende uiteinden van een streng. Nieuwe nucleotiden komen er altijd bij aan het 3′-uiteinde."},
  {"t": "lang product", "d": "Kopie van een origineel: begint bij een primer en loopt door tot de verlengstap voorbij is. Er komen er maar twee per cyclus bij (lineair)."},
  {"t": "streng / molecuul op maat", "d": "Van primer tot primer. Ontstaat als een kopie van een kopie wordt gemaakt. Moleculen op maat heten ook korte producten en verdubbelen elke cyclus (exponentieel)."},
  {"t": "plateau", "d": "In het echt vlakt de hoeveelheid DNA af, onder meer omdat het polymerase te veel templates tegelijk krijgt en strengen op maat weer aan elkaar binden."},
  {"t": "negatieve controle", "d": "Hetzelfde PCR-mengsel met water in plaats van DNA. Een band hierin betekent besmetting."},
  {"t": "STR en allel", "d": "Short tandem repeat: een korte herhaling (hier TCTA). Allelen verschillen in het aantal herhalingen, dus in de lengte van het product."}
 ]
}
film['sections'] = open('sections.html', encoding='utf-8').read()
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
